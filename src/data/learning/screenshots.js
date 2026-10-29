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

const HOTSPOTS = {
    chart_dashboard: [['46.8%', '4.5%'], ['28.2%', '19%'], ['50.9%', '4.5%']],
    line_chart: [['6.5%', '25.8%'], ['2%', '15.5%'], ['6%', '20.7%']],
    histogram_widget: [['2.6%', '7.4%'], ['2%', '52.6%'], ['4.5%', '67.6%']],
    bar_plot: [['3%', '17.3%'], ['3%', '34.4%'], ['3%', '57.6%']],
    box_plot: [['3%', '17.8%'], ['3%', '26.2%'], ['3%', '38.8%']],
    time_graphics: [['12.2%', '4%'], ['25.4%', '45%'], ['45%', '75%']],
    align_compare: [['5%', '10%'], ['5%', '79%'], ['50%', '10%']],
    frequency_domain: [['4%', '8%'], ['30%', '50%'], ['4.5%', '29%']],
    order_map_view: [['59%', '4.5%'], ['8%', '39%'], ['14%', '25.9%']],
    intelligent_report: [['82%', '9.2%'], ['78%', '88.8%'], ['82%', '92%']],
    python_script: [['7.9%', '8.7%'], ['30%', '25%'], ['5.2%', '58.5%']],
}

/** Return the real window capture for a widget, or null when none exists. */
export function getWidgetScreenshot(id) {
    const image = IMAGES[`../../assets/widget-ui/${id.replaceAll('_', '-')}.webp`]
    if (!image) return null
    return { image, hotspots: HOTSPOTS[id] || [], ...SIZE }
}
