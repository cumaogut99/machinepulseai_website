import assert from 'node:assert/strict'
import { closeSync, existsSync, openSync, readFileSync, readSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { getTourChapter, PRODUCT_VIDEOS, TOUR_CHAPTERS, tourChapterHref } from '../src/data/productVideos.js'
import copy from '../src/i18n/siteMarketing.js'

/** Read MP4 top-level headers without loading the media payload into memory. */
function atomTypes(path) {
    const descriptor = openSync(path, 'r')
    const types = []
    const header = Buffer.alloc(16)
    try {
        const length = statSync(path).size
        for (let offset = 0; offset < length;) {
            assert.equal(readSync(descriptor, header, 0, 16, offset), 16)
            const size = header.readUInt32BE(0)
            types.push(header.toString('ascii', 4, 8))
            const bytes = size === 1 ? Number(header.readBigUInt64BE(8)) : size || length - offset
            assert.ok(bytes >= 8 && offset + bytes <= length, 'valid MP4 atom extent')
            offset += bytes
        }
    } finally {
        closeSync(descriptor)
    }
    return types
}

test('all native videos ship with posters and seek metadata before the payload', () => {
    for (const video of Object.values(PRODUCT_VIDEOS)) {
        const source = new URL(`../public${video.src}`, import.meta.url)
        assert.ok(existsSync(new URL(`../public${video.poster}`, import.meta.url)))
        const atoms = atomTypes(source)
        assert.ok(atoms.includes('moov') && atoms.includes('mdat'))
        assert.ok(atoms.indexOf('moov') < atoms.indexOf('mdat'), 'fast-start metadata precedes media')
        if (video.captions) assert.ok(existsSync(new URL(`../public${video.captions}`, import.meta.url)))
    }
})

test('chapters are ordered, within the delivered video and available in both languages', () => {
    assert.equal(TOUR_CHAPTERS[0].time, 0.03)
    assert.equal(new Set(TOUR_CHAPTERS.map(chapter => chapter.id)).size, TOUR_CHAPTERS.length)
    for (const [index, chapter] of TOUR_CHAPTERS.entries()) {
        assert.ok(chapter.time >= 0 && chapter.time < PRODUCT_VIDEOS.tour.durationSeconds)
        if (index) assert.ok(chapter.time > TOUR_CHAPTERS[index - 1].time)
        for (const language of ['tr', 'en']) assert.ok(copy[language].chapters[chapter.id])
    }
})

test('marketing text has matching Turkish and English keys', () => {
    function keys(value, prefix = '') {
        return Object.entries(value).flatMap(([key, item]) =>
            typeof item === 'object' ? keys(item, `${prefix}${key}.`) : [`${prefix}${key}`])
    }
    assert.deepEqual(keys(copy.en).sort(), keys(copy.tr).sort())
})

test('shareable product links resolve the same chapter and timestamp used by the player', () => {
    for (const chapter of TOUR_CHAPTERS) {
        const url = new URL(tourChapterHref(chapter.id), 'https://www.machinepulseai.com.tr')
        assert.equal(url.pathname, '/product')
        assert.equal(url.hash, '#product-tour')
        assert.equal(getTourChapter(url.searchParams.get('chapter'))?.time, chapter.time)
    }
    assert.equal(getTourChapter('not-a-chapter'), undefined)
    assert.equal(getTourChapter(null), undefined)
    assert.throws(() => tourChapterHref('not-a-chapter'), RangeError)
})

test('homepage media and subtitles match the complete-sentence narration receipt', () => {
    const receipt = JSON.parse(readFileSync(new URL('../docs/overview-narration-2026-11-10.json', import.meta.url), 'utf8'))
    const movie = readFileSync(new URL(`../public${PRODUCT_VIDEOS.overview.src}`, import.meta.url))
    assert.equal(createHash('sha256').update(movie).digest('hex'), receipt.sha256)
    const subtitles = readFileSync(new URL(`../public${PRODUCT_VIDEOS.overview.captions}`, import.meta.url), 'utf8')
        .split(/\r?\n/).filter(line => line && line !== 'WEBVTT' && !/^\d+$/.test(line) && !line.includes('-->'))
        .join(' ').replace(/\s+/g, ' ')
    assert.equal(receipt.voice, 'tr-TR-EmelNeural')
    assert.ok(receipt.narration[1].start < 6 && receipt.narration[2].start >= 11)
    assert.equal(receipt.narration[1].key, 'overview_canvas')
    assert.equal(receipt.native_drops.length, 9)
    assert.equal(receipt.native_connections.length, 10)
    for (const track of receipt.narration) {
        assert.ok(track.tr.endsWith('.'), track.key)
        assert.ok(subtitles.includes(track.en), track.key)
    }
})
