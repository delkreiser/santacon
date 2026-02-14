import React from 'react';
import carolsData from '../data/carols.js';

const CarolsPage = ({ carolType, setCarolType, selectedCarol, setSelectedCarol, lyricsFontSize, setLyricsFontSize }) => (
    <div className="space-y-6">
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-red-700 mb-2">
                <i className="fas fa-music mr-2"></i>
                Carol Sheets
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Sing along with these festive favorites!</p>
        </div>

        {!selectedCarol ? (
            <>
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setCarolType('nice')}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                            carolType === 'nice'
                                ? 'bg-green-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-green-600 border-2 border-green-600'
                        }`}
                    >
                        <i className="fas fa-angel mr-2"></i>
                        Nice Songs
                    </button>
                    <button
                        onClick={() => setCarolType('naughty')}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                            carolType === 'naughty'
                                ? 'bg-red-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-red-600 border-2 border-red-600'
                        }`}
                    >
                        <i className="fas fa-laugh mr-2"></i>
                        Naughty Songs
                    </button>
                </div>

                <div className="space-y-3">
                    {carolsData[carolType].map((carol, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedCarol(carol)}
                            className="w-full glass-effect p-4 rounded-lg text-left hover:shadow-lg transition"
                        >
                            <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{carol.title}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Tap to view lyrics</div>
                        </button>
                    ))}
                </div>
            </>
        ) : (
            <div className="glass-effect rounded-lg shadow-xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => setSelectedCarol(null)}
                        className="text-red-600 font-semibold hover:text-red-700 transition"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to carol list
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setLyricsFontSize(Math.max(0.8, lyricsFontSize - 0.1))}
                            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 w-10 h-10 rounded-full flex items-center justify-center transition text-sm font-bold"
                            aria-label="Decrease font size"
                        >
                            Aa
                        </button>
                        <button
                            onClick={() => setLyricsFontSize(Math.min(2.0, lyricsFontSize + 0.1))}
                            className="bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition text-lg font-bold"
                            aria-label="Increase font size"
                        >
                            Aa
                        </button>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-red-700 mb-6">{selectedCarol.title}</h2>
                <div className="carol-lyrics text-gray-800 dark:text-gray-100" style={{ fontSize: `${lyricsFontSize}rem` }}>
                    {selectedCarol.lyrics}
                </div>
            </div>
        )}
    </div>
);

export default CarolsPage;
