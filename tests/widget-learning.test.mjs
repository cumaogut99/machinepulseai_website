import assert from 'node:assert/strict'
import test from 'node:test'
import katex from 'katex'
import WIDGET_CATALOG from '../src/data/widgetCatalog.js'
import { getWidgetDetailById, getWidgetDetailSlug, SLUG_TO_WIDGET_ID } from '../src/data/widgetDetails.js'
import { WIDGET_LEARNING } from '../src/data/widgetLearning.js'
import { VIBRATION_LEARNING_IDS } from '../src/i18n/vibrationLearning.js'
import TRANSLATIONS from '../src/i18n/widgetLearning.js'
import { CONCEPT_LABS } from '../src/data/learning/conceptLabs.js'
import { REFERENCES } from '../src/data/learning/lesson.js'
import { resolveRouteMeta } from '../src/seo/routeMeta.js'
import { existsSync, readFileSync } from 'node:fs'
import TOUR_ANCHORS from '../src/data/learning/tours/tourAnchors.js'
import FFT_TOURS from '../src/data/learning/tours/fft.js'
import FREQUENCY_RESPONSE_TOURS from '../src/data/learning/tours/frequencyResponse.js'
import ROTATING_TOURS from '../src/data/learning/tours/rotating.js'
import STRUCTURAL_TOURS from '../src/data/learning/tours/structural.js'
import MOTION_TOURS from '../src/data/learning/tours/motion.js'
import FILTER_TOURS from '../src/data/learning/tours/filters.js'
import DATA_IO_TOURS from '../src/data/learning/tours/dataIO.js'
import ROTOR_LEARNING from '../src/i18n/rotorDynamicsLearning.js'

test('every in-scope ready widget has a complete authored course or existing flagship guide', () => {
    const specialized = new Set(['fft_spectrum', 'rotor_dynamics', ...VIBRATION_LEARNING_IDS])
    const scope = WIDGET_CATALOG.flatMap((category) => category.widgets.filter((widget) => !widget.phase))
    assert.equal(scope.length, 49)
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

test('both languages have complete matching schemas and parseable equations', () => {
    assert.deepEqual(shape(TRANSLATIONS.en), shape(TRANSLATIONS.tr))
    for (const guide of Object.values(WIDGET_LEARNING)) for (const lang of ['en', 'tr']) {
        const page = guide[lang]
        for (const field of ['intro', 'use']) assert.ok(page[field].length > 60, `${guide.id}.${lang}.${field}`)
        for (const [field, minimum] of [['inputs', 1], ['controls', 3], ['concepts', 2], ['steps', 3], ['outputs', 1], ['pitfalls', 2]]) {
            assert.ok(page[field].length >= minimum, `${guide.id}.${lang}.${field}`)
            for (const row of page[field]) assert.ok(row.name && row.desc)
        }
        assert.ok(page.example.explanation && page.example.value)
        for (const item of page.why || []) assert.ok(item.title && item.body.length > 60, `${guide.id}.${lang}.why`)
        for (const formula of page.formulas) assert.doesNotThrow(() => katex.renderToString(formula.latex, { throwOnError: true }))
        const seo = resolveRouteMeta(`/widgets/${guide.slug}`, lang)
        assert.ok(seo.description.length <= 160 && seo.description.length > 50)
        assert.ok(page.intro.startsWith(seo.description.replace(/…$/, '')))
        assert.ok(seo.title.length <= 60)
        assert.ok(seo.title.includes('MachinePulseAI'))
    }
})

test('every equation on a released guide names the control or readout it governs', () => {
    const released = new Set(WIDGET_CATALOG.flatMap((category) => category.widgets).filter((widget) => !widget.phase).map((widget) => widget.id))
    const pages = ['en', 'tr'].flatMap((lang) => [
        ...Object.values(WIDGET_LEARNING).map((guide) => [guide.id, lang, guide[lang].formulas]),
        ...['fft_spectrum', ...VIBRATION_LEARNING_IDS].filter((id) => released.has(id))
            .map((id) => [id, lang, getWidgetDetailById(id)[lang].formulas]),
        ['rotor_dynamics', lang, ROTOR_LEARNING[lang].formulas.items],
    ])
    for (const [id, lang, formulas] of pages) {
        assert.ok(formulas.length > 0, `${id}.${lang} has no equations`)
        for (const formula of formulas) assert.ok(formula.param?.trim(), `${id}.${lang}: "${formula.title}" needs a control/readout tag`)
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


test('interface tours have captured, anchored, bilingual views and replace the single screenshot', () => {
    const tours = { ...DATA_IO_TOURS, ...FILTER_TOURS, ...FFT_TOURS, ...FREQUENCY_RESPONSE_TOURS, ...ROTATING_TOURS, ...STRUCTURAL_TOURS, ...MOTION_TOURS }
    const byCategory = (id) => WIDGET_CATALOG.find((category) => category.id === id).widgets.filter((widget) => !widget.phase)
    const required = ['data_io', 'filters', 'engineering'].flatMap(byCategory).map((widget) => widget.id)
    for (const id of required) assert.ok(tours[id], `${id} needs an interface tour`)
    const released = new Set(WIDGET_CATALOG.flatMap((category) => category.widgets).filter((widget) => !widget.phase).map((widget) => widget.id))
    for (const id of Object.keys(tours)) {
        assert.ok(released.has(id), `${id} has a tour but is not a released widget`)
        assert.ok(!existsSync(new URL(`../src/assets/widget-ui/${id.replaceAll('_', '-')}.webp`, import.meta.url)), `${id} keeps a duplicate single screenshot`)
    }
    const pair = (value) => Array.isArray(value) && value.length === 2 && value.every((text) => typeof text === 'string' && text.trim())
    for (const [id, views] of Object.entries(tours)) {
        assert.ok(views.length >= 1, `${id} needs at least one view`)
        assert.equal(new Set(views.map((view) => view.id)).size, views.length, `${id} has duplicate views`)
        for (const view of views) {
            const key = `${id}--${view.id}`
            const image = new URL(`../src/assets/widget-tours/${id.replaceAll('_', '-')}--${view.id}.webp`, import.meta.url)
            assert.ok(existsSync(image), `${key} capture is missing`)
            assert.ok(pair(view.tab), `${key} tab label`)
            const anchors = TOUR_ANCHORS[key] || {}
            const anchored = view.points.filter((point) => anchors[point.id])
            assert.ok(anchored.length >= 1, `${key} has no measured hotspot`)
            for (const point of view.points) {
                assert.ok(pair(point.title) && pair(point.desc), `${key}.${point.id} copy`)
            }
            for (const [left, top] of Object.values(anchors)) {
                for (const value of [left, top]) {
                    const number = Number.parseFloat(value)
                    assert.ok(value.endsWith('%') && number >= 1.5 && number <= 98.5, `${key} anchor ${value}`)
                }
            }
        }
    }
})

test('modules the application defers to a later phase are labelled but not routable', () => {
    // Mirrors python/ui/factory/widget_release.py in the desktop application.
    const deferred = WIDGET_CATALOG.flatMap((category) => category.widgets).filter((widget) => widget.phase)
    assert.deepEqual(deferred.filter((widget) => widget.phase === 2).map((widget) => widget.id).sort(),
        ['database_widget', 'ftp_reader', 'realtime_stream', 'sensor_widget'])
    assert.equal(deferred.filter((widget) => widget.phase === 3).length, 39)
    for (const id of ['structural_health', 'machine_health_overview', 'combustion_analysis', 'sound_level', 'ml_regression']) {
        assert.ok(deferred.some((widget) => widget.id === id), `${id} must be deferred`)
    }
    const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
    for (const widget of deferred) {
        assert.equal(WIDGET_LEARNING[widget.id], undefined, `${widget.id} must not get a learning guide`)
        const slug = getWidgetDetailSlug(widget.id)
        assert.ok(!sitemap.includes(`/widgets/${slug}<`), `${widget.id} must not be in the sitemap`)
        assert.equal(resolveRouteMeta(`/widgets/${slug}`, 'en').title, resolveRouteMeta('/', 'en').title, `${widget.id} must not keep SEO metadata`)
    }
    assert.ok(!sitemap.includes('/widgets/combustion-analysis<'))
    const frf = WIDGET_CATALOG.find((category) => category.id === 'engineering').widgets.find((widget) => widget.id === 'cross_spectrum')
    assert.equal(frf.subgroup, undefined, 'Frequency Response sits directly under Engineering Modules')
})
