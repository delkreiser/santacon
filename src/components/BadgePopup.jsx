import { useEffect, useRef } from 'react';
import EVENT_CONFIG from '../config/event.js';

const badgeMessages = Object.fromEntries(
    Object.entries(EVENT_CONFIG.badges).map(([key, b]) => [key, {
        emoji: b.emoji,
        title: b.title,
        message: b.popupMessage,
        buttonText: b.popupButton,
    }])
);

/**
 * Trap keyboard focus inside a dialog and close on Escape.
 * Returns a ref to attach to the dialog container.
 */
function useDialogA11y(onClose) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const el = dialogRef.current;
        if (!el) return;

        // Focus the first focusable element
        const focusable = el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length) focusable[0].focus();

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            if (e.key === 'Tab' && focusable.length) {
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return dialogRef;
}

const BadgePopup = ({ badgePopupQueue, onClose }) => {
    const dialogRef = useDialogA11y(onClose);

    if (!badgePopupQueue.length) return null;
    const badge = badgeMessages[badgePopupQueue[0]];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
             style={{animation: 'fadeIn 0.3s ease-in'}}>
            <div ref={dialogRef}
                 role="dialog"
                 aria-modal="true"
                 aria-label={`Badge unlocked: ${badge.title}`}
                 className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-8 text-center"
                 style={{animation: 'scaleIn 0.3s ease-out'}}>
                <div className="text-6xl mb-4 animate-bounce">
                    🎉 🎉 🎉
                </div>
                <h2 className="text-2xl font-bold text-red-700 mb-4">
                    BADGE UNLOCKED!
                </h2>
                <div className="text-7xl mb-4">
                    {badge.emoji}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    {badge.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {badge.message}
                </p>
                <button
                    onClick={onClose}
                    className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition text-lg"
                >
                    {badge.buttonText}
                </button>
            </div>
        </div>
    );
};

export const MajorAwardModal = ({ onClose, setActiveTab }) => {
    const handleClose = () => {
        onClose();
        setActiveTab('major-award');
    };
    const dialogRef = useDialogA11y(onClose);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
             style={{animation: 'fadeIn 0.3s ease-in'}}>
            <div ref={dialogRef}
                 role="dialog"
                 aria-modal="true"
                 aria-label="Major Award unlocked"
                 className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-8 text-center"
                 style={{animation: 'scaleIn 0.3s ease-out'}}>
                <div className="text-4xl mb-4">✨✨✨</div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">CONGRATULATIONS!</h2>
                <div className="text-5xl my-6">🏆</div>
                <h3 className="text-xl font-bold text-red-700 mb-2">🏆 MAJOR AWARD 🏆</h3>
                <h3 className="text-xl font-bold text-red-700 mb-4">UNLOCKED!</h3>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">You've completed ALL 6 badges!</p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">You've earned something... Fra-gee-lay!</p>
                <button
                    onClick={handleClose}
                    className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 px-6 rounded-lg font-bold hover:from-red-700 hover:to-green-700 transition text-lg"
                >
                    View Your Award →
                </button>
            </div>
        </div>
    );
};

export default BadgePopup;
