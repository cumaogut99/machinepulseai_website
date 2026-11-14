import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, statSync } from 'node:fs'
import test from 'node:test'
import { CASE_STUDY_VIDEOS } from '../src/data/caseStudyVideos.js'
import copy from '../src/i18n/caseStudies.js'

test('both guided Agent cases ship with the actual reviewed reports and media', () => {
    assert.deepEqual(CASE_STUDY_VIDEOS.map(video => video.id).sort(), ['aircraft', 'brake'])
    const receipt = JSON.parse(readFileSync(new URL('../docs/rca-demo-media-2026-11-14.json', import.meta.url)))
    for (const video of CASE_STUDY_VIDEOS) {
        const proof = receipt.cases[video.id]
        assert.equal(proof.synthetic, true)
        assert.equal(proof.theme, 'space')
        assert.equal(proof.operator_guided, true)
        assert.equal(proof.preselected_operator_plan, true)
        assert.equal(proof.operator_provided_report_corrections, true)
        assert.equal(proof.autonomous_qualification, false)
        assert.equal(proof.operator_approval_required, video.id === 'brake')
        assert.equal(proof.model, 'Qwen3-Coder-30B-A3B-Instruct-int4-ov')
        assert.equal(proof.full_decode, 'passed')
        assert.equal(proof.user_approved, true)
        assert.equal(proof.full_window, true)
        assert.equal(proof.crop, false)
        assert.equal(proof.added_padding, false)
        assert.equal(video.aspectRatio, `${proof.video_width} / ${proof.video_height}`)
        assert.equal(proof.speech_voices.length, 1)
        assert.match(proof.voice, /ElevenLabs/)
        assert.ok(proof.model_calls > 0)
        for (const path of [video.src, video.poster, video.captions, video.report]) {
            assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), path)
        }
        const movie = new URL(`../public${video.src}`, import.meta.url)
        const report = new URL(`../public${video.report}`, import.meta.url)
        assert.ok(statSync(movie).size > 10000)
        assert.equal(createHash('sha256').update(readFileSync(movie)).digest('hex'), proof.video_sha256)
        assert.equal(createHash('sha256').update(readFileSync(report)).digest('hex'), proof.report_sha256)
        for (const [kind, path] of [['poster', video.poster], ['captions', video.captions]]) {
            const bytes = readFileSync(new URL(`../public${path}`, import.meta.url))
            assert.equal(createHash('sha256').update(bytes).digest('hex'), proof[`${kind}_sha256`])
        }
        assert.ok(readFileSync(report).subarray(0, 5).equals(Buffer.from('%PDF-')))
        const captions = readFileSync(new URL(`../public${video.captions}`, import.meta.url), 'utf8')
        assert.ok(captions.startsWith('WEBVTT'))
        const times = [...captions.matchAll(/(\d\d):(\d\d):(\d\d\.\d{3}) --> (\d\d):(\d\d):(\d\d\.\d{3})/g)]
        const final = times.at(-1)
        const captionEnd = Number(final[4]) * 3600 + Number(final[5]) * 60 + Number(final[6])
        assert.ok(captionEnd <= video.durationSeconds && captionEnd > video.durationSeconds - 1)
        assert.ok(video.durationSeconds > 30 && video.durationSeconds < 600)
    }
})

test('case descriptions and scope are available in both languages', () => {
    function keys(value, prefix = '') {
        return Object.entries(value).flatMap(([key, item]) =>
            typeof item === 'object' ? keys(item, `${prefix}${key}.`) : [`${prefix}${key}`])
    }
    assert.deepEqual(keys(copy.en).sort(), keys(copy.tr).sort())
    assert.match(copy.en.scope, /synthetic.*operator/i)
    assert.match(copy.tr.scope, /Sentetik.*operatör/i)
})

test('the built homepage includes both videos and report links without eager video requests', () => {
    const home = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')
    assert.match(home, /id="agent-case-studies"/)
    for (const video of CASE_STUDY_VIDEOS) {
        assert.ok(home.includes(video.report))
        assert.ok(home.includes(video.poster))
    }
    assert.doesNotMatch(home, /<video[^>]+src="\/videos\/rca-/)
})
