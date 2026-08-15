import WIDGET_DETAILS from '../data/widgetDetails.js'
import DIAGNOSTICS_LEARNING from './vibrationLearning.diagnostics.js'
import MEASUREMENT_LEARNING from './vibrationLearning.measurement.js'
import MODAL_LEARNING from './vibrationLearning.modal.js'
import MOTION_LEARNING from './vibrationLearning.motion.js'
import ROTATING_LEARNING from './vibrationLearning.rotating.js'
import VIBRATION_LEARNING_COMMON from './vibrationLearningCommon.js'

const PAGE_CONTENT = {
    ...ROTATING_LEARNING,
    ...MODAL_LEARNING,
    ...DIAGNOSTICS_LEARNING,
    ...MEASUREMENT_LEARNING,
    ...MOTION_LEARNING,
}

export const VIBRATION_LEARNING_IDS = Object.freeze(Object.keys(PAGE_CONTENT))

function buildWidgets(language) {
    return Object.fromEntries(
        Object.entries(PAGE_CONTENT).map(([widgetId, translations]) => {
            const detail = WIDGET_DETAILS[widgetId]?.[language]
            if (!detail) throw new Error(`Missing ${language} detail content for ${widgetId}`)
            return [widgetId, { ...translations[language], detail }]
        }),
    )
}

const VIBRATION_LEARNING_TRANSLATIONS = {
    en: { ...VIBRATION_LEARNING_COMMON.en, widgets: buildWidgets('en') },
    tr: { ...VIBRATION_LEARNING_COMMON.tr, widgets: buildWidgets('tr') },
}

export default VIBRATION_LEARNING_TRANSLATIONS
