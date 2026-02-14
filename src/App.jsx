import React, { useState, useEffect } from 'react';
import EVENT_CONFIG from './config/event.js';
import { isEventDay, isAfterEventDay, calculateCountdown, getCurrentStop } from './utils/dateUtils.js';
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

function App() {
    const [activeTab, setActiveTab] = useState('home');
    const [carolType, setCarolType] = useState('nice');
    const [selectedCarol, setSelectedCarol] = useState(null);
    const [subscribeStatus, setSubscribeStatus] = useState('');
    const [lyricsFontSize, setLyricsFontSize] = useState(1.1);
    const [darkMode, setDarkMode] = useState(false);
    const [expandedStop, setExpandedStop] = useState(null);
    const [currentStop, setCurrentStop] = useState(null);
    const [expandedAbout, setExpandedAbout] = useState(null);
    const [countdown, setCountdown] = useState('');
    const [showAllBadgesModal, setShowAllBadgesModal] = useState(false);

    // Quest system state
    const [badgeLegendExpanded, setBadgeLegendExpanded] = useState(false);
    const [badgePopupQueue, setBadgePopupQueue] = useState([]);
    const [showingBadgePopup, setShowingBadgePopup] = useState(false);
    const [badgePopupsShown, setBadgePopupsShown] = useState(() => {
        const saved = localStorage.getItem('santacon_badge_popups_shown');
        return saved ? JSON.parse(saved) : {
            jollyLeader: false,
            giftGiver: false,
            paparazzi: false,
            marathonSanta: false,
            superSanta: false,
            boulderLegend: false
        };
    });
    const [badges, setBadges] = useState(() => {
        const saved = localStorage.getItem('santacon_badges');
        return saved ? JSON.parse(saved) : {
            jollyLeader: false,
            giftGiver: false,
            paparazzi: false,
            marathonSanta: false,
            superSanta: false,
            boulderLegend: false
        };
    });
    const [venueQuests, setVenueQuests] = useState(() => {
        const saved = localStorage.getItem('santacon_venue_quests');
        return saved ? JSON.parse(saved) : {
            hotelBoulderado: false,
            velvetElk: false,
            pizzaCalore: false,
            taco: false,
            jungle: false
        };
    });
    const [challenges, setChallenges] = useState(() => {
        const saved = localStorage.getItem('santacon_challenges');
        return saved ? JSON.parse(saved) : {
            highFive10: false,
            groupPhoto: false,
            giveGift: false,
            findElf: false,
            singCarol: false,
            buyDrink: false,
            compliment5: false,
            congaLine: false,
            photoCop: false,
            postSocial: false,
            boulderLegend: false,
            niceOrNaughty: false
        };
    });

    // Update countdown every minute
    useEffect(() => {
        setCountdown(calculateCountdown());
        const interval = setInterval(() => {
            setCountdown(calculateCountdown());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

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

    // Save quest state to localStorage
    useEffect(() => {
        localStorage.setItem('santacon_badges', JSON.stringify(badges));
    }, [badges]);

    useEffect(() => {
        localStorage.setItem('santacon_venue_quests', JSON.stringify(venueQuests));
    }, [venueQuests]);

    useEffect(() => {
        localStorage.setItem('santacon_challenges', JSON.stringify(challenges));
    }, [challenges]);

    // Check badge unlocks
    useEffect(() => {
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
            setBadges(newBadges);
        }

        if (newlyUnlocked.length > 0) {
            setBadgePopupQueue(prev => [...prev, ...newlyUnlocked]);
        }
    }, [challenges, venueQuests, currentStop, badges, badgePopupsShown]);

    // Major Award check
    useEffect(() => {
        const allBadgesComplete = Object.values(badges).every(badge => badge === true);
        const alreadyShown = localStorage.getItem('santacon_major_award_shown');
        const now = new Date();
        const isEventDayOrLater = isEventDay(now) || isAfterEventDay(now);

        if (allBadgesComplete && !alreadyShown && !showAllBadgesModal &&
            badgePopupQueue.length === 0 && !showingBadgePopup && isEventDayOrLater) {
            setShowAllBadgesModal(true);
            localStorage.setItem('santacon_major_award_shown', 'true');
        }
    }, [badges, showAllBadgesModal, badgePopupQueue, showingBadgePopup]);

    // Handle badge popup queue
    useEffect(() => {
        if (badgePopupQueue.length > 0 && !showingBadgePopup) {
            setShowingBadgePopup(true);
        }
    }, [badgePopupQueue, showingBadgePopup]);

    // Save badge popups shown to localStorage
    useEffect(() => {
        localStorage.setItem('santacon_badge_popups_shown', JSON.stringify(badgePopupsShown));
    }, [badgePopupsShown]);

    const handleBadgePopupClose = () => {
        const [currentBadge, ...remaining] = badgePopupQueue;
        setBadgePopupsShown(prev => ({ ...prev, [currentBadge]: true }));
        setBadgePopupQueue(remaining);
        setShowingBadgePopup(false);
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setSubscribeStatus('Subscribing...');
        const emailInput = e.target.elements.email.value;

        try {
            const formData = new FormData();
            formData.append('EMAIL', emailInput);
            formData.append(EVENT_CONFIG.mailchimp.honeypotField, '');

            await fetch(EVENT_CONFIG.mailchimp.actionUrl, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });

            setSubscribeStatus('Thanks for subscribing! 🎅');
            e.target.reset();
            setTimeout(() => setSubscribeStatus(''), 3000);
        } catch (error) {
            setSubscribeStatus('Oops! Please try again.');
            setTimeout(() => setSubscribeStatus(''), 3000);
        }
    };

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen gradient-bg">
            <Snowflakes />

            {/* Dark Mode Toggle */}
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                <i className={`fas fa-${darkMode ? 'sun' : 'moon'} text-lg`}></i>
            </button>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
                {activeTab === 'home' && <HomePage scheduleData={scheduleData} currentStop={currentStop} expandedStop={expandedStop} setExpandedStop={setExpandedStop} setActiveTab={setActiveTab} />}
                {activeTab === 'carols' && <CarolsPage carolType={carolType} setCarolType={setCarolType} selectedCarol={selectedCarol} setSelectedCarol={setSelectedCarol} lyricsFontSize={lyricsFontSize} setLyricsFontSize={setLyricsFontSize} />}
                {activeTab === 'quests' && <QuestsPage badges={badges} venueQuests={venueQuests} setVenueQuests={setVenueQuests} challenges={challenges} setChallenges={setChallenges} setActiveTab={setActiveTab} badgeLegendExpanded={badgeLegendExpanded} setBadgeLegendExpanded={setBadgeLegendExpanded} />}
                {activeTab === 'about' && <AboutPage expandedAbout={expandedAbout} setExpandedAbout={setExpandedAbout} />}
                {activeTab === 'mailing' && <MailingListPage subscribeStatus={subscribeStatus} handleSubscribe={handleSubscribe} />}
                {activeTab === 'afterparty' && <AfterPartyPage />}
                {activeTab === 'major-award' && <MajorAwardPage setActiveTab={setActiveTab} />}
            </div>

            {/* Badge Unlock Popup */}
            {showingBadgePopup && badgePopupQueue.length > 0 && (
                <BadgePopup badgePopupQueue={badgePopupQueue} onClose={handleBadgePopupClose} />
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
