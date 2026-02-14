import React from 'react';
import EVENT_CONFIG from '../config/event.js';
import { isEventDay, isAfterEventDay, formatTime } from '../utils/dateUtils.js';

const QuestsPage = ({ badges, venueQuests, setVenueQuests, challenges, setChallenges, setActiveTab, badgeLegendExpanded, setBadgeLegendExpanded }) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    // Challenges unlock at event start time on event day (stays unlocked after)
    const challengesUnlockTime = parseInt(EVENT_CONFIG.startTime.split(':')[0]) * 60;
    const areChallengesUnlocked = (isEventDay(now) && currentTime >= challengesUnlockTime) ||
                                  isAfterEventDay(now);

    // Count completed quests
    const venueQuestCount = Object.values(venueQuests).filter(Boolean).length;
    const challengeCount = Object.values(challenges).filter(Boolean).length;
    const badgeCount = Object.values(badges).filter(Boolean).length;

    // Check which venue quests are unlocked
    const getVenueQuestStatus = (quest) => {
        if (isAfterEventDay(now)) return 'unlocked';
        if (isEventDay(now) && currentTime >= quest.unlockTime) return 'unlocked';
        return 'locked';
    };

    const venueQuestData = EVENT_CONFIG.venueQuests;
    const lockedQuests = venueQuestData.filter(q => getVenueQuestStatus(q) === 'locked');
    const unlockedQuests = venueQuestData.filter(q => getVenueQuestStatus(q) === 'unlocked');

    // Group locked quests by unlock time
    const lockedGroups = lockedQuests.reduce((acc, quest) => {
        const time = quest.unlockTime;
        if (!acc[time]) acc[time] = [];
        acc[time].push(quest);
        return acc;
    }, {});

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-red-700 mb-2">
                    <i className="fas fa-trophy mr-2"></i>
                    Santa's Side Quests
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Ready to level up your SantaCon? Complete Santa's Side Quests and earn badges!
                </p>
            </div>

            {/* Major Award Card */}
            {badgeCount === Object.keys(EVENT_CONFIG.badges).length && (isEventDay(now) || isAfterEventDay(now)) && (
                <div
                    className="major-award-card rounded-lg shadow-xl p-6 cursor-pointer"
                    onClick={() => setActiveTab('major-award')}
                >
                    <div className="text-center">
                        <div className="text-2xl font-bold mb-1">🏆 MAJOR AWARD 🏆</div>
                        <div className="text-2xl font-bold mb-3">UNLOCKED!</div>
                        <p className="text-gray-800 font-bold text-lg mb-2">
                            Congratulations! You've completed all 6 badges!
                        </p>
                        <p className="text-gray-800 mb-4">
                            You are a TRUE Boulder SantaCon Legend!
                        </p>
                        <div className="inline-block bg-white bg-opacity-30 hover:bg-opacity-50 transition px-6 py-3 rounded-lg font-bold text-gray-800">
                            View Your Major Award →
                        </div>
                    </div>
                </div>
            )}

            {/* Badge Section */}
            <div className="glass-effect rounded-lg shadow-xl overflow-hidden">
                <button
                    onClick={() => setBadgeLegendExpanded(!badgeLegendExpanded)}
                    className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            🏆 Your Badges ({badgeCount}/{Object.keys(EVENT_CONFIG.badges).length})
                        </h2>
                        <i className={`fas fa-chevron-down text-gray-400 dark:text-gray-500 text-xl ${badgeLegendExpanded ? 'rotate-180' : ''}`} style={{transition: 'transform 0.3s'}}></i>
                    </div>

                    <div className="flex justify-center gap-4 mb-2 text-4xl">
                        {Object.entries(EVENT_CONFIG.badges).map(([key, b]) => (
                            <span key={key}>{badges[key] ? b.emoji : '🔒'}</span>
                        ))}
                    </div>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Badge details <i className={`fas fa-chevron-down text-xs ${badgeLegendExpanded ? 'rotate-180' : ''}`} style={{transition: 'transform 0.3s'}}></i>
                    </p>
                </button>

                {badgeLegendExpanded && (
                    <div className="px-6 pb-6 pt-4 border-t-2 border-gray-200 dark:border-gray-600">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Unlock badges by completing challenges and side quests throughout the night:
                        </p>
                        <div className="space-y-3 text-sm">
                            {Object.entries(EVENT_CONFIG.badges).map(([key, b]) => (
                                <div key={key}>
                                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                                        {b.emoji} {b.title} {badges[key] && '- ✅ UNLOCKED'}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 ml-6">{b.shortDescription}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Venue Quests Section */}
            <div className="glass-effect rounded-lg shadow-xl p-6">
                <h2 className="text-xl font-bold text-red-700 mb-2">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    VENUE QUESTS ({venueQuestCount}/{EVENT_CONFIG.venueQuests.length})
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Are you looking for more adventure? Try these side quests to add more fun to your SantaCon experience! Nearby venues unlock throughout the night, complete them to earn extra badges.
                </p>

                {unlockedQuests.length > 0 && (
                    <div className="space-y-3 mb-4">
                        <div className="text-sm font-bold text-green-700">✨ Available Now!</div>
                        {unlockedQuests.map(quest => (
                            <div key={quest.id} className="border-2 border-green-500 rounded-lg p-4 bg-green-50 dark:bg-green-900/30">
                                <div className="flex items-start">
                                    <input
                                        type="checkbox"
                                        checked={venueQuests[quest.id]}
                                        onChange={(e) => setVenueQuests({...venueQuests, [quest.id]: e.target.checked})}
                                        className="mt-1 mr-3 w-5 h-5"
                                    />
                                    <div className="flex-1">
                                        <div className="font-bold text-gray-800 dark:text-gray-100">{quest.name}</div>
                                        <div className="text-sm text-gray-700 dark:text-gray-300">{quest.quest}</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                            📍 {quest.distance}
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">
                                            ⏰ Available: {formatTime(quest.unlockTime)} - {formatTime(quest.availableUntil)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {Object.keys(lockedGroups).length > 0 && (
                    <div className="space-y-2">
                        {Object.keys(lockedGroups).sort((a, b) => a - b).map(unlockTime => {
                            const time = parseInt(unlockTime);
                            const teaserText = EVENT_CONFIG.lockedQuestTeasers[time] || '';

                            const beforeEvent = !isEventDay(now) && !isAfterEventDay(now);
                            const timeText = beforeEvent
                                ? `${formatTime(time)} on Black Friday`
                                : formatTime(time);

                            return (
                                <div key={unlockTime} className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3">
                                    <div className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                        🔒 Unlocks at {timeText}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {teaserText}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Challenges Section */}
            <div className="glass-effect rounded-lg shadow-xl p-6">
                <h2 className="text-xl font-bold text-red-700 mb-4">
                    <i className="fas fa-star mr-2"></i>
                    CHALLENGES ({challengeCount}/{EVENT_CONFIG.challenges.length})
                </h2>

                {!areChallengesUnlocked ? (
                    <div className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3">
                        <div className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                            🔒 Unlocks at 5:00pm{(!isEventDay(now) && !isAfterEventDay(now)) ? ' on Black Friday' : ''}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            The fun's about to begin! Complete challenges as you crawl through Boulder to earn badges and legendary Santa status!
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Complete these challenges throughout the night to earn badges and show off your Santa spirit!
                        </p>
                        <div className="space-y-2">
                            {EVENT_CONFIG.challenges.map(ch => (
                                <label key={ch.id} className="flex items-start cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
                                    <input
                                        type="checkbox"
                                        checked={challenges[ch.id]}
                                        onChange={(e) => setChallenges({...challenges, [ch.id]: e.target.checked})}
                                        className="mt-1 mr-3 w-5 h-5"
                                    />
                                    <span>{ch.label}</span>
                                </label>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuestsPage;
