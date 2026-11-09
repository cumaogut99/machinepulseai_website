// Native, same-origin media. Keep previews out of the initial network payload.
export const PRODUCT_VIDEOS = {
    overview: { src: '/videos/overview.mp4', poster: '/videos/overview.webp', duration: '0:48', title: 'overview' },
    introduction: { src: '/videos/introduction.mp4', poster: '/videos/introduction.webp', duration: '1:58', title: 'introduction' },
    tour: { src: '/videos/product-tour.mp4', poster: '/videos/product-tour.webp', duration: '17:02', title: 'tour', captions: '/videos/captions.en.vtt' },
}

// These timestamps refer to the delivered tour, not to the shorter edits.
export const TOUR_CHAPTERS = [
    { id: 'value', time: 0.03 },
    { id: 'workspace', time: 19.19 },
    { id: 'assistant', time: 74.07 },
    { id: 'dataIO', time: 117.96 },
    { id: 'preprocessing', time: 213.35 },
    { id: 'filters', time: 306.99 },
    { id: 'fft', time: 463.97 },
    { id: 'frf', time: 512.16 },
    { id: 'vibration', time: 525.23 },
    { id: 'rotor', time: 574.97 },
    { id: 'orders', time: 600.47 },
    { id: 'modal', time: 625.99 },
    { id: 'statistics', time: 727.52 },
    { id: 'visualization', time: 825.74 },
    { id: 'reports', time: 976.51 },
    { id: 'python', time: 1009.37 },
]

/** Format a media position without depending on the visitor's locale. */
export function formatVideoTime(seconds) {
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
}
