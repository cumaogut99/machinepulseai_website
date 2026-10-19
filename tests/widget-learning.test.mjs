import assert from 'node:assert/strict'
import test from 'node:test'
import katex from 'katex'
import WIDGET_CATALOG from '../src/data/widgetCatalog.js'
import { getWidgetDetailSlug, SLUG_TO_WIDGET_ID } from '../src/data/widgetDetails.js'
import { WIDGET_LEARNING } from '../src/data/widgetLearning.js'
import { VIBRATION_LEARNING_IDS } from '../src/i18n/vibrationLearning.js'
import TRANSLATIONS from '../src/i18n/widgetLearning.js'
import { CONCEPT_LABS } from '../src/data/learning/conceptLabs.js'
import { REFERENCES } from '../src/data/learning/lesson.js'
import { resolveRouteMeta } from '../src/seo/routeMeta.js'

test('every in-scope ready widget has a complete authored course or existing flagship guide', () => {
    const specialized = new Set(['fft_spectrum', 'rotor_dynamics', ...VIBRATION_LEARNING_IDS])
    const scope = WIDGET_CATALOG.flatMap((category) => category.widgets.filter((widget) => {
        if ((widget.status || category.status) === 'planned') return false
        return category.id !== 'engineering' || !widget.subgroup || widget.subgroup.id === 'vibration_structural'
    }))
    assert.equal(scope.length, 51)
    assert.equal(Object.keys(WIDGET_LEARNING).length, 36)
    for (const widget of scope) {
        assert.ok(getWidgetDetailSlug(widget.id), `${widget.id} needs a route`)
        assert.ok(specialized.has(widget.id) || WIDGET_LEARNING[widget.id], `${widget.id} needs an authored course`)
    }
    assert.deepEqual(Object.keys(TRANSLATIONS.en.vibration).sort(), [...VIBRATION_LEARNING_IDS].sort())
})

test('new guide links resolve uniquely and preserve existing Data I/O URLs', () => {
    const slugs = Object.values(WIDGET_LEARNING).map((guide) => guide.slug)
    assert.equal(new Set(slugs).size, slugs.length)
    for (const guide of Object.values(WIDGET_LEARNING)) {
        assert.equal(SLUG_TO_WIDGET_ID[guide.slug], guide.id)
        for (const id of guide.related) assert.ok(getWidgetDetailSlug(id), `Broken related link ${guide.id} → ${id}`)
        for (const ref of guide.references) assert.ok(REFERENCES[ref]?.href.startsWith('https://'))
    }
    assert.equal(getWidgetDetailSlug('data_merger'), 'data-merger')
    assert.equal(getWidgetDetailSlug('data_exporter'), 'data-exporter')
    assert.equal(getWidgetDetailSlug('random_generator'), 'signal-generator')
    for (const id of ['database_widget', 'sensor_widget', 'realtime_stream', 'ml_regression', 'combustion_analysis', 'power_quality']) {
        assert.equal(WIDGET_LEARNING[id], undefined, `${id} is outside this content expansion`)
    }
})

const shape = (value) => Array.isArray(value) ? value.map(shape)
    : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shape(item)]))
        : typeof value

test('both languages have complete matching schemas, valid exercises and parseable equations', () => {
    assert.deepEqual(shape(TRANSLATIONS.en), shape(TRANSLATIONS.tr))
    for (const guide of Object.values(WIDGET_LEARNING)) for (const lang of ['en', 'tr']) {
        const page = guide[lang]
        for (const field of ['intro', 'use']) assert.ok(page[field].length > 60, `${guide.id}.${lang}.${field}`)
        for (const [field, minimum] of [['inputs', 1], ['controls', 3], ['concepts', 2], ['steps', 3], ['outputs', 1], ['pitfalls', 2]]) {
            assert.ok(page[field].length >= minimum, `${guide.id}.${lang}.${field}`)
            for (const row of page[field]) assert.ok(row.name && row.desc)
        }
        assert.ok(page.example.explanation && page.example.value)
        if (page.exercise) {
            assert.ok(page.exercise.correct >= 0 && page.exercise.correct < page.exercise.options.length)
            assert.ok(page.exercise.explanation && page.exercise.question)
        }
        for (const item of page.why || []) assert.ok(item.title && item.body.length > 60, `${guide.id}.${lang}.why`)
        for (const formula of page.formulas) assert.doesNotThrow(() => katex.renderToString(formula.latex, { throwOnError: true }))
        const seo = resolveRouteMeta(`/widgets/${guide.slug}`, lang)
        assert.ok(seo.description.length <= 160 && seo.description.length > 50)
        assert.ok(page.intro.startsWith(seo.description.replace(/…$/, '')))
        assert.ok(seo.title.length <= 60)
        assert.ok(seo.title.includes('MachinePulseAI'))
    }
})

test('teaching models reproduce the worked examples and stay finite at slider boundaries', () => {
    const defaults = (lab) => Object.fromEntries(lab.fields.map((field) => [field.key, field.initial]))
    for (const [id, lab] of Object.entries(CONCEPT_LABS)) {
        const initial = defaults(lab)
        assert.ok(Number.isFinite(lab.calculate(initial)), id)
        for (const field of lab.fields) {
            assert.ok(field.initial >= field.min && field.initial <= field.max, `${id}.${field.key}`)
            for (const edge of [field.min, field.max]) assert.ok(Number.isFinite(lab.calculate({ ...initial, [field.key]: edge })), `${id}.${field.key} at ${edge}`)
        }
    }
    for (const [id, expected] of Object.entries({
        file_reader: 1000, kalman_filter: 0.5, statistics_summary: 5,
        sensor_calibration: 2, groupby_aggregation: 18, shock_srs: 5,
        order_tracking: 60, cross_axis_compensation: 0.02, hypothesis_testing: 2,
    })) assert.ok(Math.abs(CONCEPT_LABS[id].calculate(defaults(CONCEPT_LABS[id])) - expected) < 1e-9, id)
})
