/**
 * Returns a localised string from a field that may be a plain string,
 * an object like { en: '...', ar: '...' }, or null/undefined.
 * Falls back: requested lang → 'en' → first available value → ''.
 */
export const getVal = (obj, lang = 'en') => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] ?? obj['en'] ?? Object.values(obj).find(Boolean) ?? '';
};

/**
 * Human-friendly relative time.
 * Handles invalid / future dates gracefully.
 */
export const timeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 0) return 'just now';
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo`;
    return `${Math.floor(seconds / 31536000)}y`;
};