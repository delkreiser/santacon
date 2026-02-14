import React, { useState, useEffect, useReducer } from 'react';
import EVENT_CONFIG from './config/event.js';
import { isEventDay, isAfterEventDay, getCurrentStop } from './utils/dateUtils.js';
import Snowflakes from './components/Snowflakes.jsx';
import Navigation from './components/Navigation.jsx';
import HomePage from './components/HomePage.jsx';
import CarolsPage from './components/CarolsPage.jsx';
import QuestsPage from './components/QuestsPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import MailingListPage from './components/MailingListPage.jsx';
import AfterPartyPage from './components/AfterPartyPage.jsx';
import MajorAwardPage from './components/MajorAwardPage.jsx';
import BadgePopup, { MajorAwardModal } from './components/BadgePopup.jsx';

const scheduleData = EVENT_CONFIG.schedule;

// Quest system reducer — consolidates badges, venue quests, challenges, and popup state
const defaultQuestState = {
    badges: {
        jollyLeader: false, giftGiver: false, paparazzi: false,
        marathonSanta: false, superSanta: false, boulderLegend: false
    },
    badgePopupsShown: {
        jollyLeader: false, giftGiver: false, paparazzi: false,
        marathonSanta: false, superSanta: false, boulderLegend: false
    },
    venueQuests: {
        hotelBoulderado: false, velvetElk: false, pizzaCalore: false,
        taco: false, jungle: false
    },
    challenges: {
        highFive10: false, groupPhoto: false, giveGift: false, findElf: false,
        singCarol: false, buyDrink: false, compliment5: false, congaLine: false,
        photoCop: false, postSocial: false, boulderLegend: false, niceOrNaughty: false
    },
    badgePopupQueue: [],
    showingBadgePopup: false,
};

function loadQuestState() {
    const load = (key, fallback) => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : fallback;
        } catch { return fallback; }
    };
    return {
        ...defaultQuestState,
        badges: load('santacon_badges', defaultQuestState.badges),
        badgePopupsShown: load('santacon_badge_popups_shown', defaultQuestState.badgePopupsShown),
        venueQuests: load('santacon_venue_quests', defaultQuestState.venueQuests),
        challenges: load('santacon_challenges', defaultQuestState.challenges),
    };
}

function questReducer(state, action) {
    switch (action.type) {
        case 'SET_BADGES':
            return { ...state, badges: action.payload };
        case 'SET_VENUE_QUESTS':
            return { ...state, venueQuests: action.payload };
        case 'SET_CHALLENGES':
            return { ...state, challenges: action.payload };
        case 'QUEUE_BADGE_POPUPS':
            return { ...state, badgePopupQueue: [...state.badgePopupQueue, ...action.payload] };
        case 'SHOW_BADGE_POPUP':
            return { ...state, showingBadgePopup: true };
        case 'CLOSE_BADGE_POPUP': {
            const [closedBadge, ...remaining] = state.badgePopupQueue;
            return {
                ...state,
                badgePopupsShown: { ...state.badgePopupsShown, [closedBadge]: true },
                badgePopupQueue: remaining,
                showingBadgePopup: false,
            };
        }
        default:
            return state;
    }
}

function App() {
    // UI state
    const [activeTab, setActiveTab] = useState('home');
    const [carolType, setCarolType] = useState('nice');
    const [selectedCarol, setSelectedCarol] = useState(null);
    const [subscribeStatus, setSubscribeStatus] = useState('');
    const [lyricsFontSize, setLyricsFontSize] = useState(1.1);
    const [darkMode, setDarkMode] = useState(() => {
        try { return localStorage.getItem('santacon_dark_mode') === 'true'; }
        catch { return false; }
    });
    const [expandedStop, setExpandedStop] = useState(null);
    const [currentStop, setCurrentStop] = useState(null);
    const [expandedAbout, setExpandedAbout] = useState(null);
    const [showAllBadgesModal, setShowAllBadgesModal] = useState(false);
    const [badgeLegendExpanded, setBadgeLegendExpanded] = useState(false);

    // Quest system — single reducer for all gamification state
    const [quest, questDispatch] = useReducer(questReducer, null, loadQuestState);

    // Update current stop every minute
    useEffect(() => {
        setCurrentStop(getCurrentStop(scheduleData));
        const interval = setInterval(() => {
            setCurrentStop(getCurrentStop(scheduleData));
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    // Auto-expand current stop when it changes
    useEffect(() => {
        if (currentStop !== null) {
            setExpandedStop(currentStop.index);
        }
    }, [currentStop?.index]);

    // Scroll to top when changing tabs
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeTab]);

    // Persist quest state to localStorage
    useEffect(() => {
        localStorage.setItem('santacon_badges', JSON.stringify(quest.badges));
    }, [quest.badges]);

    useEffect(() => {
        localStorage.setItem('santacon_venue_quests', JSON.stringify(quest.venueQuests));
    }, [quest.venueQuests]);

    useEffect(() => {
        localStorage.setItem('santacon_challenges', JSON.stringify(quest.challenges));
    }, [quest.challenges]);

    useEffect(() => {
        localStorage.setItem('santacon_badge_popups_shown', JSON.stringify(quest.badgePopupsShown));
    }, [quest.badgePopupsShown]);

    // Check badge unlocks
    useEffect(() => {
        const { badges, challenges, venueQuests, badgePopupsShown } = quest;
        const newBadges = { ...badges };
        const newlyUnlocked = [];

        if (challenges.singCarol && !badges.jollyLeader) {
            newBadges.jollyLeader = true;
            if (!badgePopupsShown.jollyLeader) newlyUnlocked.push('jollyLeader');
        }

        if ((challenges.buyDrink || challenges.giveGift) && !badges.giftGiver) {
            newBadges.giftGiver = true;
            if (!badgePopupsShown.giftGiver) newlyUnlocked.push('giftGiver');
        }

        const photoCount = [
            challenges.groupPhoto,
            challenges.photoCop,
            challenges.postSocial,
            venueQuests.hotelBoulderado
        ].filter(Boolean).length;
        if (photoCount >= 3 && !badges.paparazzi) {
            newBadges.paparazzi = true;
            if (!badgePopupsShown.paparazzi) newlyUnlocked.push('paparazzi');
        }

        const now = new Date();
        if (isEventDay(now)) {
            const currentTime = now.getHours() * 60 + now.getMinutes();
            const marathonUnlockTime = EVENT_CONFIG.badges.marathonSanta.autoUnlockMinutes;
            if (currentTime >= marathonUnlockTime && !badges.marathonSanta) {
                newBadges.marathonSanta = true;
                if (!badgePopupsShown.marathonSanta) newlyUnlocked.push('marathonSanta');
            }
        }

        const venueCount = Object.values(venueQuests).filter(Boolean).length;
        const challengeCount = Object.values(challenges).filter(Boolean).length;
        if (venueCount >= 1 && challengeCount >= 5 && !badges.superSanta) {
            newBadges.superSanta = true;
            if (!badgePopupsShown.superSanta) newlyUnlocked.push('superSanta');
        }

        if (challenges.boulderLegend && !badges.boulderLegend) {
            newBadges.boulderLegend = true;
            if (!badgePopupsShown.boulderLegend) newlyUnlocked.push('boulderLegend');
        }

        if (JSON.stringify(newBadges) !== JSON.stringify(badges)) {
            questDispatch({ type: 'SET_BADGES', payload: newBadges });
        }

        if (newlyUnlocked.length > 0) {
            questDispatch({ type: 'QUEUE_BADGE_POPUPS', payload: newlyUnlocked });
        }
    }, [quest.challenges, quest.venueQuests, currentStop, quest.badges, quest.badgePopupsShown]);

    // Major Award check
    useEffect(() => {
        const allBadgesComplete = Object.values(quest.badges).every(badge => badge === true);
        const alreadyShown = localStorage.getItem('santacon_major_award_shown');
        const now = new Date();
        const isEventDayOrLater = isEventDay(now) || isAfterEventDay(now);

        if (allBadgesComplete && !alreadyShown && !showAllBadgesModal &&
            quest.badgePopupQueue.length === 0 && !quest.showingBadgePopup && isEventDayOrLater) {
            setShowAllBadgesModal(true);
            localStorage.setItem('santacon_major_award_shown', 'true');
        }
    }, [quest.badges, showAllBadgesModal, quest.badgePopupQueue, quest.showingBadgePopup]);

    // Handle badge popup queue
    useEffect(() => {
        if (quest.badgePopupQueue.length > 0 && !quest.showingBadgePopup) {
            questDispatch({ type: 'SHOW_BADGE_POPUP' });
        }
    }, [quest.badgePopupQueue, quest.showingBadgePopup]);

    const handleBadgePopupClose = () => {
        questDispatch({ type: 'CLOSE_BADGE_POPUP' });
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        setSubscribeStatus('Subscribing...');
        const emailInput = e.target.elements.email.value;
        const form = e.target;

        // Use JSONP to call Mailchimp's post-json endpoint (avoids CORS entirely)
        const callbackName = `mc_callback_${Date.now()}`;
        const url = `${EVENT_CONFIG.mailchimp.actionUrl}&EMAIL=${encodeURIComponent(emailInput)}&${EVENT_CONFIG.mailchimp.honeypotField}=&c=${callbackName}`;

        window[callbackName] = (data) => {
            // Clean up
            delete window[callbackName];
            document.getElementById(callbackName)?.remove();

            if (data.result === 'success') {
                setSubscribeStatus('Thanks for subscribing! 🎅');
                form.reset();
            } else if (data.msg?.includes('already subscribed')) {
                setSubscribeStatus("You're already on Santa's list! 🎅");
            } else {
                setSubscribeStatus(data.msg || 'Oops! Please try again.');
            }
            setTimeout(() => setSubscribeStatus(''), 4000);
        };

        // Inject JSONP script tag
        const script = document.createElement('script');
        script.id = callbackName;
        script.src = url;
        script.onerror = () => {
            delete window[callbackName];
            script.remove();
            setSubscribeStatus('Oops! Please try again.');
            setTimeout(() => setSubscribeStatus(''), 3000);
        };
        document.body.appendChild(script);
    };

    // Sync dark mode class on <html> and persist preference
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('santacon_dark_mode', darkMode);
    }, [darkMode]);

    return (
        <div className="min-h-screen gradient-bg dark:bg-gray-950">
            <Snowflakes />

            {/* Dark Mode Toggle */}
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                <i className={`fas fa-${darkMode ? 'sun' : 'moon'} text-lg`}></i>
            </button>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
                {activeTab === 'home' && <HomePage scheduleData={scheduleData} currentStop={currentStop} expandedStop={expandedStop} setExpandedStop={setExpandedStop} setActiveTab={setActiveTab} />}
                {activeTab === 'carols' && <CarolsPage carolType={carolType} setCarolType={setCarolType} selectedCarol={selectedCarol} setSelectedCarol={setSelectedCarol} lyricsFontSize={lyricsFontSize} setLyricsFontSize={setLyricsFontSize} />}
                {activeTab === 'quests' && <QuestsPage badges={quest.badges} venueQuests={quest.venueQuests} setVenueQuests={(v) => questDispatch({ type: 'SET_VENUE_QUESTS', payload: v })} challenges={quest.challenges} setChallenges={(c) => questDispatch({ type: 'SET_CHALLENGES', payload: c })} setActiveTab={setActiveTab} badgeLegendExpanded={badgeLegendExpanded} setBadgeLegendExpanded={setBadgeLegendExpanded} />}
                {activeTab === 'about' && <AboutPage expandedAbout={expandedAbout} setExpandedAbout={setExpandedAbout} />}
                {activeTab === 'mailing' && <MailingListPage subscribeStatus={subscribeStatus} handleSubscribe={handleSubscribe} />}
                {activeTab === 'afterparty' && <AfterPartyPage />}
                {activeTab === 'major-award' && <MajorAwardPage setActiveTab={setActiveTab} />}
            </div>

            {/* Badge Unlock Popup */}
            {quest.showingBadgePopup && quest.badgePopupQueue.length > 0 && (
                <BadgePopup badgePopupQueue={quest.badgePopupQueue} onClose={handleBadgePopupClose} />
            )}

            {/* All Badges Complete Modal */}
            {showAllBadgesModal && (
                <MajorAwardModal onClose={() => setShowAllBadgesModal(false)} setActiveTab={setActiveTab} />
            )}

            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
}

export default App;
