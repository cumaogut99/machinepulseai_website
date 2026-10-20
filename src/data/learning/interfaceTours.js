// Multi-view interface tours built from real MachinePulseAI window captures.
//
// Each widget lists the window states worth teaching (a settings page plus a
// result tab). Images live in src/assets/widget-tours/<widget>--<view>.webp
// (widget id with hyphens). Hotspot coordinates are not hand-placed: the
// capture script measures each control's geometry in the running application
// and writes them to tourAnchors.js keyed by `<widget>--<view>` and point id.
// A point without a measured anchor is skipped rather than guessed.

import ANCHORS from './tours/tourAnchors.js'
import FREQUENCY_RESPONSE_TOURS from './tours/frequencyResponse.js'
import FFT_TOURS from './tours/fft.js'
import ROTATING_TOURS from './tours/rotating.js'
import STRUCTURAL_TOURS from './tours/structural.js'
import MOTION_TOURS from './tours/motion.js'

const IMAGES = import.meta.glob('../../assets/widget-tours/*.webp', { eager: true, import: 'default' })

// Captures are 2000 px wide at the application's 1600 x 848 window aspect.
const SIZE = { width: 2000, height: 1060 }

const TOURS = {
    ...FFT_TOURS,
    ...FREQUENCY_RESPONSE_TOURS,
    ...ROTATING_TOURS,
    ...STRUCTURAL_TOURS,
    ...MOTION_TOURS,
}

export const INTERFACE_TOUR_IDS = Object.freeze(Object.keys(TOURS))

/** Localized tour views for a widget, or null when it has no tour yet. */
export function getInterfaceTour(widgetId, lang) {
    const views = TOURS[widgetId]
    if (!views) return null
    const index = lang === 'tr' ? 1 : 0
    const slug = widgetId.replaceAll('_', '-')
    return views.map((view) => {
        const key = `${widgetId}--${view.id}`
        const anchors = ANCHORS[key] || {}
        const image = IMAGES[`../../assets/widget-tours/${slug}--${view.id}.webp`]
        if (!image) throw new Error(`Missing interface capture: ${slug}--${view.id}.webp`)
        return {
            id: view.id,
            tab: view.tab[index],
            summary: view.summary?.[index],
            image,
            ...SIZE,
            points: view.points
                .filter((point) => anchors[point.id])
                .map((point) => ({
                    id: point.id,
                    at: anchors[point.id],
                    title: point.title[index],
                    desc: point.desc[index],
                })),
        }
    })
}
