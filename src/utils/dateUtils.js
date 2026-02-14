import EVENT_CONFIG from '../config/event.js';

const eventDateParts = EVENT_CONFIG.date.split('-').map(Number);
const eventYear = eventDateParts[0];
const eventMonth = eventDateParts[1] - 1; // JS months are 0-indexed
const eventDay = eventDateParts[2];

export const isEventDay = (d) =>
    d.getFullYear() === eventYear && d.getMonth() === eventMonth && d.getDate() === eventDay;

export const isAfterEventDay = (d) => {
    if (d.getFullYear() > eventYear) return true;
    if (d.getFullYear() === eventYear && d.getMonth() > eventMonth) return true;
    if (d.getFullYear() === eventYear && d.getMonth() === eventMonth && d.getDate() > eventDay) return true;
    return false;
};

export const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'pm' : 'am';
    const displayHour = hours > 12 ? hours - 12 : hours;
    return `${displayHour}:${mins.toString().padStart(2, '0')}${period}`;
};

export const calculateCountdown = () => {
    const eventDate = new Date(`${EVENT_CONFIG.date}T${EVENT_CONFIG.startTime}:00`);
    const now = new Date();
    const diff = eventDate - now;

    if (diff < 0) return 'Event is happening NOW! 🎉';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `In ${days} day${days !== 1 ? 's' : ''}`;
    if (hours > 0) return `Starting in ${hours} hour${hours !== 1 ? 's' : ''}!`;
    return 'Starting soon!';
};

export const getCurrentStop = (scheduleData) => {
    const now = new Date();
    if (!isEventDay(now)) return null;

    const currentTime = now.getHours() * 60 + now.getMinutes();
    const stops = scheduleData.map((s, i) => ({ index: i, start: s.startMinutes, end: s.endMinutes }));

    for (let stop of stops) {
        if (currentTime >= stop.start && currentTime < stop.end) {
            const timeUntilEnd = stop.end - currentTime;
            const isLeavingSoon = (timeUntilEnd <= 15) && (stop.index !== stops.length - 1);
            return { index: stop.index, isLeavingSoon };
        }
    }
    return null;
};
