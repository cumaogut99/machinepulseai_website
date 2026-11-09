import assert from 'node:assert/strict'
import { closeSync, existsSync, openSync, readSync, statSync } from 'node:fs'
import test from 'node:test'
import { PRODUCT_VIDEOS, TOUR_CHAPTERS } from '../src/data/productVideos.js'
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
        assert.ok(chapter.time >= 0 && chapter.time < 1021.52)
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
