import React from 'react';
import EVENT_CONFIG from '../config/event.js';
import ScheduleStop from './ScheduleStop.jsx';

const HomePage = ({ scheduleData, currentStop, expandedStop, setExpandedStop, setActiveTab }) => (
    <div className="space-y-6">
        <div className="text-center mb-8">
            <img
                src="img/header.jpg"
                alt={`${EVENT_CONFIG.name} - The ${EVENT_CONFIG.edition} - ${EVENT_CONFIG.tagline}`}
                className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
            />

            {/* Social Media & Calendar Buttons */}
            <div className="flex justify-center gap-3 mt-6">
                <a
                    href={EVENT_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-red-600 text-red-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all shadow-lg flex items-center"
                >
                    <i className="fab fa-instagram mr-2"></i>
                    Follow
                </a>
                <a
                    href={EVENT_CONFIG.social.facebookEvent}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-red-600 text-red-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all shadow-lg"
                >
                    RSVP
                </a>
                <button
                    onClick={() => {
                        const cal = EVENT_CONFIG.calendar;
                        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Boulder SantaCon//EN
BEGIN:VEVENT
UID:${cal.uid}
DTSTAMP:${cal.dtstamp}
DTSTART:${cal.dtstart}
DTEND:${cal.dtend}
SUMMARY:${cal.summary}
DESCRIPTION:${cal.description}
LOCATION:${cal.location}
URL:${EVENT_CONFIG.url}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

                        const blob = new Blob([icsContent], { type: 'text/calendar' });
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = cal.filename;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                    }}
                    className="border-2 border-red-600 text-red-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all shadow-lg flex items-center"
                >
                    <i className="fas fa-calendar-plus mr-2"></i>
                    Cal
                </button>
            </div>
        </div>

        <div className="glass-effect rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-red-700 mb-2 flex items-center">
                <i className="fas fa-calendar-alt mr-3"></i>
                Santa's Schedule
            </h2>
            <p className="text-gray-700 mb-2">
                {EVENT_CONFIG.displayDate}
            </p>
            <button
                onClick={() => setActiveTab('about')}
                className="text-sm text-red-600 hover:text-red-800 mb-4 flex items-center font-semibold"
            >
                <i className="fas fa-info-circle mr-1"></i>
                What is SantaCon?
            </button>
            <div className="space-y-3">
                {scheduleData.map((stop, index) => {
                    const isCurrentStopActive = currentStop?.index === index;
                    const isPastStop = currentStop && index < currentStop.index;
                    const nextStopData = index < scheduleData.length - 1 ? scheduleData[index + 1] : null;

                    return (
                        <ScheduleStop
                            key={index}
                            stop={stop}
                            index={index}
                            expandedStop={expandedStop}
                            setExpandedStop={setExpandedStop}
                            setActiveTab={setActiveTab}
                            isCurrentStop={isCurrentStopActive}
                            isLeavingSoon={currentStop?.index === index && currentStop?.isLeavingSoon}
                            isPast={isPastStop}
                            nextStop={nextStopData}
                        />
                    );
                })}
            </div>
        </div>

        {/* Side Quests Promo Card */}
        <div className="rounded-lg shadow-xl p-6 overflow-hidden"
             style={{
                 background: 'linear-gradient(to right, #fef3c7, #fde68a)',
                 border: '3px solid #d97706'
             }}>
            <div className="text-center">
                <h2 className="text-2xl font-bold text-amber-600 mb-3">
                    Santa's Side Quests!
                </h2>
                <p className="text-yellow-600 text-lg mb-4 leading-relaxed">
                    Looking for more adventure, young Frodo? Explore bonus venues and earn badges!
                </p>
                <button
                    onClick={() => setActiveTab('quests')}
                    className="bg-amber-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-600 transition-all shadow-lg text-lg"
                >
                    <i className="fas fa-hat-wizard mr-2"></i>
                    Adventure Awaits!
                </button>
            </div>
        </div>

        <div className="glass-effect rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-red-700 mb-4 flex items-center">
                <i className="fas fa-play-circle mr-3"></i>
                Santa's Song!
            </h2>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={EVENT_CONFIG.social.youtubeEmbed}
                    title="Boulder SantaCon Song"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    </div>
);

export default HomePage;
