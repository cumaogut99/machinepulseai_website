import assert from 'node:assert/strict'
import test from 'node:test'
import TRANSLATIONS from '../src/i18n/widgetLearning.js'
import { CONTROL_REGIONS, attachControlGuidance } from '../src/data/learning/controlRegions.js'
import { FLAGSHIP_DETAILS } from '../src/data/learning/tours/flagshipDetails.js'
import ANCHORS from '../src/data/learning/tours/tourAnchors.js'

const families = ['dataIO', 'preprocessing', 'statistics', 'visualization', 'views', 'filters', 'fft', 'frequencyResponse', 'rotating', 'structural', 'motion']
const tours = Object.assign({}, ...await Promise.all(families.map(async (name) =>
    (await import(`../src/data/learning/tours/${name}.js`)).default)))

const pageFor = (id, lang) => TRANSLATIONS[lang].pages[id] || TRANSLATIONS[lang].vibration[id]
const anchoredViews = (id) => tours[id].map((view) => ({
    ...view,
    points: view.points.filter((point) => ANCHORS[`${id}--${view.id}`]?.[point.id]),
}))

test('every moved control group has a measured screen region and retains all options in both languages', () => {
    for (const [id, bindings] of Object.entries(CONTROL_REGIONS)) {
        const views = anchoredViews(id)
        assert.deepEqual(bindings.map((binding) => binding.name), pageFor(id, 'en').controls.map((control) => control.name),
            `${id}: update region bindings when control groups change`)
        for (const binding of bindings) {
            assert.ok(binding.regions.length > 0, `${id}.${binding.name} has no region`)
            for (const region of binding.regions) {
                assert.ok(views.some((view) => view.points.some((point) =>
                    region === point.id || region === `${view.id}:${point.id}`)), `${id}.${region} has no measured hotspot`)
            }
        }
        for (const lang of ['en', 'tr']) {
            const controls = pageFor(id, lang).controls
            const result = attachControlGuidance(id, views, controls)
            const displayed = result.flatMap((view) => view.points.flatMap((point) => point.controls))
            for (const control of controls) assert.ok(displayed.includes(control), `${id}.${lang}.${control.name} was lost`)
        }
    }
})

test('every guide uses either mapped control groups or authored region settings', () => {
    const authored = new Set(['fft_spectrum', 'rotor_dynamics', 'cross_spectrum'])
    assert.equal(Object.keys(tours).length, 49)
    for (const id of Object.keys(tours)) assert.ok(CONTROL_REGIONS[id] || authored.has(id), `${id} has no integrated guidance`)
    for (const [id, points] of Object.entries(FLAGSHIP_DETAILS)) {
        for (const [pointId, details] of Object.entries(points)) {
            assert.ok(anchoredViews(id).some((view) => view.points.some((point) => point.id === pointId)), `${id}.${pointId}`)
            assert.ok(details.length > 0)
            for (const detail of details) {
                assert.equal(detail.length, 4)
                assert.ok(detail.every((text) => typeof text === 'string' && text.trim()))
            }
        }
    }
})

test('a removed control group fails explicitly instead of dropping guidance', () => {
    assert.throws(() => attachControlGuidance('file_reader', anchoredViews('file_reader'), []), /Control groups changed/)
})
