import React from 'react';

const ScheduleStop = React.memo(({ stop, index, expandedStop, setExpandedStop, setActiveTab, isCurrentStop, isLeavingSoon, isPast, nextStop }) => (
    <div
        className={`rounded-lg border-2 overflow-hidden relative ${
            isCurrentStop && isLeavingSoon ? 'border-4 border-orange-400 shadow-2xl' :
            isCurrentStop ? 'border-4 border-yellow-400 shadow-2xl' :
            isPast ? 'border-gray-300 dark:border-gray-600' :
            stop.isAfterParty ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
        }`}
    >
        {isCurrentStop && (
            <div className="absolute top-2 right-2 z-10">
                <div className={`${isLeavingSoon ? 'bg-orange-600' : 'bg-red-600'} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center animate-bounce`}>
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    {isLeavingSoon ? "Santa's leaving soon!" : "Santa is Here!"}
                </div>
            </div>
        )}
        <button
            onClick={() => setExpandedStop(expandedStop === index ? null : index)}
            className={`w-full p-4 text-left transition-colors ${
                isCurrentStop && isLeavingSoon ? 'bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100' :
                isCurrentStop ? 'bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100' :
                isPast ? 'bg-gray-100 dark:bg-gray-800' :
                stop.isAfterParty
                    ? 'bg-gradient-to-r from-red-100 to-green-100 dark:from-red-900/40 dark:to-green-900/40'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
        >
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <div className={`font-bold text-lg flex items-center ${
                        isPast ? 'text-gray-500' :
                        isCurrentStop && isLeavingSoon ? 'text-orange-700' :
                        isCurrentStop ? 'text-red-700' : 'text-gray-800 dark:text-gray-100'
                    }`}>
                        {isPast && <i className="fas fa-check-circle text-green-600 mr-2"></i>}
                        {stop.time}
                    </div>
                    {stop.title ? (
                        <>
                            <div className={`${
                                isPast ? 'text-gray-500' :
                                isCurrentStop && isLeavingSoon ? 'text-orange-600 font-semibold' :
                                isCurrentStop ? 'text-red-600 font-semibold' :
                                stop.isAfterParty ? 'text-red-700 font-semibold' : 'text-gray-700 dark:text-gray-300 font-semibold'
                            } mt-1`}>
                                {stop.title}
                            </div>
                            <div className={`${
                                isPast ? 'text-gray-500' :
                                isCurrentStop && isLeavingSoon ? 'text-orange-600' :
                                isCurrentStop ? 'text-red-600' :
                                stop.isAfterParty ? 'text-red-700' : 'text-gray-600 dark:text-gray-400'
                            } text-sm`}>
                                {stop.venue}
                            </div>
                        </>
                    ) : (
                        <div className={`${
                            isPast ? 'text-gray-500' :
                            isCurrentStop && isLeavingSoon ? 'text-orange-600 font-semibold' :
                            isCurrentStop ? 'text-red-600 font-semibold' :
                            stop.isAfterParty ? 'text-red-700 font-semibold' : 'text-gray-600 dark:text-gray-400'
                        } mt-1`}>
                            {stop.venue}
                        </div>
                    )}
                    {isCurrentStop && isLeavingSoon && nextStop && (
                        <div className="mt-2 text-sm font-bold text-orange-700">
                            ⏰ LEAVING SOON! Next: {nextStop.title || nextStop.venue} ({nextStop.time.split(' - ')[0]})
                        </div>
                    )}
                </div>
                <i className={`fas fa-chevron-${expandedStop === index ? 'up' : 'down'} text-gray-400 dark:text-gray-500 ml-2`}></i>
            </div>
        </button>

        {expandedStop === index && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t-2 border-gray-200 dark:border-gray-600">
                {stop.text && (
                    <div className="mb-4 text-gray-700 dark:text-gray-300">
                        <p>{stop.text}</p>
                    </div>
                )}
                {stop.drinkSpecials && (
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 p-3 mb-4">
                        <p className="text-sm font-bold text-blue-800 mb-1">Drink Specials:</p>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            {stop.drinkSpecials.split(' | ').map((drink, idx) => {
                                const [name, ingredients] = drink.split(': ');
                                return (
                                    <div key={idx} className={idx > 0 ? 'mt-2' : ''}>
                                        <div className="font-bold">{name}</div>
                                        <div className="italic">{ingredients}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                {stop.music && (
                    <div className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-400 p-3 mb-4">
                        <p className="text-sm font-bold text-purple-800 mb-1">Music:</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{stop.music}</p>
                    </div>
                )}
                {stop.notes && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-3 mb-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{stop.notes}</p>
                    </div>
                )}
                {stop.mapEmbed && (
                    <div className="mb-4 rounded-lg overflow-hidden" style={{ height: '300px' }}>
                        <iframe
                            src={stop.mapEmbed}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                )}
                {stop.isAfterParty && (
                    <button
                        onClick={() => setActiveTab('afterparty')}
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                        <i className="fas fa-ticket-alt mr-2"></i>
                        View Party Details
                    </button>
                )}
            </div>
        )}
    </div>
));

export default ScheduleStop;
