// Real application captures for the single-view learning-page workspace tour.
// Engineering widgets with multi-view tours use data/learning/interfaceTours.js.
//
// Each image is the widget's own window from the MachinePulseAI desktop app
// (Space theme, synthetic demo data), stored as src/assets/widget-ui/<slug>.webp
// where <slug> is the widget id with underscores replaced by hyphens.
// HOTSPOTS[id][i] places the numbered marker for controls[i] of that page as
// [left, top] percentages of the image; null skips a marker.

const IMAGES = import.meta.glob('../../assets/widget-ui/*.webp', { eager: true, import: 'default' })

const SIZE = { width: 2000, height: 1059 }

const HOTSPOTS = {}

/** Return the real window capture for a widget, or null when none exists. */
export function getWidgetScreenshot(id) {
    const image = IMAGES[`../../assets/widget-ui/${id.replaceAll('_', '-')}.webp`]
    if (!image) return null
    return { image, hotspots: HOTSPOTS[id] || [], ...SIZE }
}
