import React from 'react';

const Navigation = ({ activeTab, setActiveTab }) => (
    <nav aria-label="Main navigation" className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-around py-2">
                <button
                    onClick={() => setActiveTab('home')}
                    className={`nav-button flex flex-col items-center py-2 px-4 rounded-lg ${
                        activeTab === 'home' ? 'active' : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                    <i className="fas fa-home text-xl mb-1"></i>
                    <span className="text-xs font-semibold">Home</span>
                </button>
                <button
                    onClick={() => setActiveTab('carols')}
                    className={`nav-button flex flex-col items-center py-2 px-4 rounded-lg ${
                        activeTab === 'carols' ? 'active' : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                    <i className="fas fa-music text-xl mb-1"></i>
                    <span className="text-xs font-semibold">Carols</span>
                </button>
                <button
                    onClick={() => setActiveTab('quests')}
                    className={`nav-button flex flex-col items-center py-2 px-4 rounded-lg ${
                        activeTab === 'quests' ? 'active' : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                    <i className="fas fa-trophy text-xl mb-1"></i>
                    <span className="text-xs font-semibold">Quests</span>
                </button>
                <button
                    onClick={() => setActiveTab('mailing')}
                    className={`nav-button flex flex-col items-center py-2 px-4 rounded-lg ${
                        activeTab === 'mailing' ? 'active' : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                    <i className="fas fa-envelope text-xl mb-1"></i>
                    <span className="text-xs font-semibold">Join List</span>
                </button>
                <button
                    onClick={() => setActiveTab('afterparty')}
                    className={`nav-button flex flex-col items-center py-2 px-4 rounded-lg ${
                        activeTab === 'afterparty' ? 'active' : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                    <i className="fas fa-glass-cheers text-xl mb-1"></i>
                    <span className="text-xs font-semibold">Party</span>
                </button>
            </div>
        </div>
    </nav>
);

export default Navigation;
