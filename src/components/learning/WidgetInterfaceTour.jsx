import { useTranslation } from 'react-i18next'
import InterfaceTour from './InterfaceTour.jsx'
import { getInterfaceTour } from '../../data/learning/interfaceTours.js'

// Localized multi-view tour for one widget, or null when it has none.
export default function WidgetInterfaceTour({ widgetId, name }) {
    const { t, i18n } = useTranslation()
    const lang = i18n.language?.startsWith('tr') ? 'tr' : 'en'
    const views = getInterfaceTour(widgetId, lang)
    if (!views) return null
    return <InterfaceTour key={`${widgetId}:${lang}`} views={views} name={name} labels={t('vibrationLearn.tour', { returnObjects: true })} />
}
