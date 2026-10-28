// Release scope of the desktop application, mirrored from
// python/ui/factory/widget_release.py. Deferred modules stay visible on the
// site with a future-phase label, but they get no public learning page, route,
// sitemap entry or SEO metadata until the application ships them.

const PHASE_2_WIDGETS = ['database_widget', 'sensor_widget', 'ftp_reader', 'realtime_stream']
const PHASE_3_WIDGETS = ['structural_health', 'machine_health_overview']

// Application palette groups deferred as a whole, by website id.
const PHASE_3_SUBGROUPS = ['thermofluids', 'materials', 'electrical', 'acoustics', 'control', 'vehicle']
const PHASE_3_CATEGORIES = ['machine_learning']

/** Future phase of a whole catalog category, or undefined for current ones. */
export function categoryReleasePhase(categoryId) {
    return PHASE_3_CATEGORIES.includes(categoryId) ? 3 : undefined
}

/** Future phase of an engineering subgroup, or undefined for current ones. */
export function subgroupReleasePhase(subgroupId) {
    return PHASE_3_SUBGROUPS.includes(subgroupId) ? 3 : undefined
}

/** Future phase of a single widget, or undefined when it ships today. */
export function widgetReleasePhase(widgetId, { subgroupId, categoryId } = {}) {
    if (PHASE_2_WIDGETS.includes(widgetId)) return 2
    if (PHASE_3_WIDGETS.includes(widgetId)) return 3
    return subgroupReleasePhase(subgroupId) ?? categoryReleasePhase(categoryId)
}
