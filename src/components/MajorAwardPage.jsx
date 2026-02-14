import React from 'react';
import OptimizedImage from './OptimizedImage.jsx';

const MajorAwardPage = ({ setActiveTab }) => (
    <div className="space-y-6">
        <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-red-700 mb-4">
                🏆 MAJOR AWARD! 🏆
            </h1>
            <p className="text-3xl font-bold text-gray-800 mb-2">FRAGILE</p>
            <p className="text-xl text-gray-600 mb-6">(Fra-gee-lay... must be Italian!)</p>

            <div className="mb-6">
                <OptimizedImage
                    src="img/leglamp.jpg"
                    alt="The Major Award - A Leg Lamp"
                    className="mx-auto rounded-lg shadow-2xl"
                    style={{ maxWidth: '350px', width: '100%', height: 'auto' }}
                />
            </div>

            <div className="glass-effect rounded-lg p-6 mb-6">
                <p className="text-xl font-bold text-gray-800 mb-4">
                    You won it! Mind power, Santa!
                </p>
                <p className="text-lg text-gray-700">
                    Nothing could drag you away from this soft glow of electric achievement gleaming in all its glory.
                </p>
            </div>

            <button
                onClick={() => setActiveTab('quests')}
                className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 px-6 rounded-lg font-bold hover:from-red-700 hover:to-green-700 transition text-lg"
            >
                Back to Quests
            </button>
        </div>
    </div>
);

export default MajorAwardPage;
