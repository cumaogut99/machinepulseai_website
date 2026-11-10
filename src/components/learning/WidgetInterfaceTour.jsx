import { useTranslation } from 'react-i18next'
import InterfaceTour from './InterfaceTour.jsx'
import { getInterfaceTour } from '../../data/learning/interfaceTours.js'
import { attachControlGuidance } from '../../data/learning/controlRegions.js'

// Localized multi-view tour for one widget, or null when it has none.
export default function WidgetInterfaceTour({ widgetId, name, controls = [] }) {
    const { t, i18n } = useTranslation()
    const lang = i18n.language?.startsWith('tr') ? 'tr' : 'en'
    const tourViews = getInterfaceTour(widgetId, lang)
    if (!tourViews) return null
    const views = attachControlGuidance(widgetId, tourViews, controls)
    const labels = {
        ...t('vibrationLearn.tour', { returnObjects: true }),
        optionsTitle: t('widgetLearn.common.optionsTitle'),
    }
    return <InterfaceTour key={`${widgetId}:${lang}`} views={views} name={name} labels={labels} />
}
