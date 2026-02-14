import React from 'react';
import EVENT_CONFIG from '../config/event.js';
import OptimizedImage from './OptimizedImage.jsx';

const AfterPartyPage = React.memo(() => {
    const ap = EVENT_CONFIG.afterParty;
    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <OptimizedImage
                    src={ap.headerImage}
                    alt={`${ap.name} After Party!`}
                    className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
                    lazy={false}
                />
            </div>

            <div className="glass-effect rounded-lg shadow-xl p-6">
                <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
                    {ap.blurb}
                </p>

                <div className="text-center mb-6">
                    <OptimizedImage src="img/santaball.jpg" alt="Santa Ball Party" className="w-[300px] h-[300px] mx-auto rounded-lg shadow-lg object-cover" />
                </div>

                <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                        <i className="fas fa-map-marker-alt text-red-600 text-xl mr-4 mt-1"></i>
                        <div>
                            <div className="font-bold text-gray-800 dark:text-gray-100">Location</div>
                            <div className="text-gray-700 dark:text-gray-300">{ap.venue}</div>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <i className="fas fa-clock text-red-600 text-xl mr-4 mt-1"></i>
                        <div>
                            <div className="font-bold text-gray-800 dark:text-gray-100">Time</div>
                            <div className="text-gray-700 dark:text-gray-300">{ap.time}</div>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <i className="fas fa-music text-red-600 text-xl mr-4 mt-1"></i>
                        <div>
                            <div className="font-bold text-gray-800 dark:text-gray-100">Entertainment</div>
                            <div className="text-gray-700 dark:text-gray-300">DJs: {ap.djs.join(', ')}!</div>
                            <div className="text-gray-700 dark:text-gray-300">{ap.extras}</div>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <i className="fas fa-ticket-alt text-red-600 text-xl mr-4 mt-1"></i>
                        <div>
                            <div className="font-bold text-gray-800 dark:text-gray-100">Tickets</div>
                            <div className="text-gray-700 dark:text-gray-300">{ap.price}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 mb-6">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        {ap.fundingNote}
                    </p>
                </div>

                <a
                    href={ap.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 px-4 rounded-lg font-bold text-center hover:from-red-700 hover:to-green-700 transition text-lg"
                >
                    <i className="fas fa-ticket-alt mr-2"></i>
                    Get Tickets
                </a>
            </div>
        </div>
    );
});

export default AfterPartyPage;
