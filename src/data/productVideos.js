// Native, same-origin media. Keep previews out of the initial network payload.
export const PRODUCT_VIDEOS = {
    overview: { src: '/videos/overview.mp4', poster: '/videos/overview.webp', durationSeconds: 67.18, duration: '1:08', title: 'overview', captions: '/videos/overview.en.vtt' },
    tour: { src: '/videos/product-tour.mp4', poster: '/videos/product-tour.webp', durationSeconds: 1042.44, duration: '17:23', title: 'tour', captions: '/videos/captions.en.vtt' },
}

// These timestamps refer to the delivered tour, not to the shorter edits.
export const TOUR_CHAPTERS = [
    { id: 'value', time: 0.030 },
    { id: 'workspace', time: 19.310 },
    { id: 'assistant', time: 82.883 },
    { id: 'dataIO', time: 138.880 },
    { id: 'preprocessing', time: 234.270 },
    { id: 'filters', time: 327.910 },
    { id: 'fft', time: 484.890 },
    { id: 'frf', time: 533.080 },
    { id: 'vibration', time: 546.150 },
    { id: 'rotor', time: 595.890 },
    { id: 'orders', time: 621.390 },
    { id: 'modal', time: 646.910 },
    { id: 'statistics', time: 748.440 },
    { id: 'visualization', time: 846.660 },
    { id: 'reports', time: 997.430 },
    { id: 'python', time: 1030.290 },
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
