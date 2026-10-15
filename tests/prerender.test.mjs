import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import WIDGET_CATALOG from '../src/data/widgetCatalog.js'
import { getWidgetDetailSlug } from '../src/data/widgetDetails.js'
import { ROUTE_META } from '../src/seo/routeMeta.js'

// scripts/prerender.mjs renders exactly the URLs in the sitemap, so a page missing
// here ships to crawlers as an empty SPA shell.
const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
const routes = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(loc).pathname))

test('sitemap lists every route with SEO metadata', () => {
    for (const route of Object.keys(ROUTE_META)) assert.ok(routes.has(route), `${route} missing from sitemap.xml`)
})

test('sitemap lists every available widget page', () => {
    for (const category of WIDGET_CATALOG) for (const widget of category.widgets) {
        const slug = getWidgetDetailSlug(widget.id)
        if (!slug || (widget.status || category.status) === 'planned') continue
        assert.ok(routes.has(`/widgets/${slug}`), `/widgets/${slug} missing from sitemap.xml`)
    }
})
