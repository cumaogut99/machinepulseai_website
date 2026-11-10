// Native, same-origin media. Keep previews out of the initial network payload.
export const PRODUCT_VIDEOS = {
    overview: { src: '/videos/overview.mp4', poster: '/videos/overview.webp', durationSeconds: 68.59, duration: '1:09', title: 'overview', captions: '/videos/overview.en.vtt' },
    tour: { src: '/videos/product-tour.mp4', poster: '/videos/product-tour.webp', durationSeconds: 1046.99, duration: '17:27', title: 'tour', captions: '/videos/captions.en.vtt' },
}

// These timestamps refer to the delivered tour, not to the shorter edits.
export const TOUR_CHAPTERS = [
    { id: 'value', time: 0.030 },
    { id: 'workspace', time: 19.840 },
    { id: 'assistant', time: 82.060 },
    { id: 'dataIO', time: 133.200 },
    { id: 'preprocessing', time: 230.633 },
    { id: 'filters', time: 329.267 },
    { id: 'fft', time: 490.967 },
    { id: 'frf', time: 531.467 },
    { id: 'vibration', time: 544.600 },
    { id: 'rotor', time: 598.800 },
    { id: 'orders', time: 623.333 },
    { id: 'modal', time: 648.900 },
    { id: 'statistics', time: 747.433 },
    { id: 'visualization', time: 846.733 },
    { id: 'reports', time: 1001.400 },
    { id: 'python', time: 1035.033 },
]

/** Resolve a shared chapter identifier; unknown URL parameters do not load media. */
export function getTourChapter(id) {
    return TOUR_CHAPTERS.find(chapter => chapter.id === id)
}

/** Link to a real chapter of the single product destination. */
export function tourChapterHref(id) {
    if (!getTourChapter(id)) throw new RangeError(`Unknown product chapter: ${id}`)
    return `/product?chapter=${encodeURIComponent(id)}#product-tour`
}

/** Format a media position without depending on the visitor's locale. */
export function formatVideoTime(seconds) {
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
}
