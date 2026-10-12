import DATA_IO from './learning/dataIO.js'
import FILTERS from './learning/filters.js'
import PREPROCESSING from './learning/preprocessing.js'
import STATISTICS from './learning/statistics.js'
import VISUALIZATION from './learning/visualization.js'
import VIEWS from './learning/views.js'
import WORKFLOW from './learning/workflow.js'

export const WIDGET_LEARNING = {
    ...DATA_IO, ...PREPROCESSING, ...FILTERS, ...STATISTICS,
    ...VISUALIZATION, ...VIEWS, ...WORKFLOW,
}

/** Return an authored guide; unavailable modules have no generated lesson. */
export function getWidgetLearning(id) {
    return WIDGET_LEARNING[id] || null
}

/** Adapt new guides to the existing route, SEO and detail registry contract. */
export const LEARNING_WIDGET_DETAILS = Object.fromEntries(
    Object.entries(WIDGET_LEARNING).map(([id, guide]) => [id, {
        slug: guide.slug,
        ...Object.fromEntries(['en', 'tr'].map((lang) => {
            const page = guide[lang]
            return [lang, {
                tagline: page.intro, intro: page.use, inputs: page.inputs,
                controlGroups: [{ name: lang === 'tr' ? 'Kontrol rehberi' : 'Control guide', controls: page.controls }],
                formulas: page.formulas,
                steps: page.steps.map(({ name, desc }) => ({ step: name, detail: desc })),
                assumptions: page.pitfalls, outputs: page.outputs,
                exampleMetrics: [{ label: page.example.title, value: page.example.value, desc: page.example.explanation }],
            }]
        })),
    }]),
)
