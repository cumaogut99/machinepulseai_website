// ─── Build-time prerender (static site generation) ──────────────────────────────
// Runs after the client and SSR builds (see `npm run build`). For every URL in
// public/sitemap.xml it renders the React app to HTML and writes
// dist/<route>/index.html with the page content and per-route <head> tags, so
// crawlers and LLM fetchers that don't execute JavaScript see the real page.
// The browser then hydrates that markup (see src/main.jsx).

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDist = path.join(root, 'dist-ssr')

const SEO_BLOCK = /<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/
const ROOT_DIV = '<div id="root"></div>'

const template = await readFile(path.join(dist, 'index.html'), 'utf8')
if (!SEO_BLOCK.test(template) || !template.includes(ROOT_DIV)) {
    throw new Error('dist/index.html is missing the seo-head markers or the empty #root div')
}

// KaTeX styles live in a lazily loaded chunk; prerendered formulas need them in
// the initial HTML or they render unstyled until JavaScript loads.
const manifest = JSON.parse(await readFile(path.join(dist, '.vite', 'manifest.json'), 'utf8'))
const katexCss = Object.values(manifest)
    .flatMap((chunk) => chunk.css || [])
    .filter((file) => /\/katex-[^/]+\.css$/.test(file))
    .map((file) => `<link rel="stylesheet" crossorigin href="/${file}">`)
    .join('')

// Untouched SPA shell for routes that aren't prerendered (vercel.json rewrite).
await writeFile(path.join(dist, 'app-shell.html'), template)

const sitemap = await readFile(path.join(root, 'public', 'sitemap.xml'), 'utf8')
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(loc).pathname)

const { render, PRERENDER_LANG } = await import(pathToFileURL(path.join(ssrDist, 'entry-server.js')).href)

for (const route of routes) {
    const { html, helmet } = await render(route)
    if (!html.includes('id="main"')) throw new Error(`Prerender of ${route} produced no page content`)

    let head = [helmet.title, helmet.meta, helmet.link].map((tag) => tag.toString()).join('\n    ')
    if (html.includes('class="katex"')) head += `\n    ${katexCss}`
    const page = template
        .replace(/<html lang="[^"]*"/, `<html lang="${PRERENDER_LANG}"`)
        .replace(SEO_BLOCK, () => head)
        .replace(ROOT_DIV, () => `<div id="root" data-prerender-lang="${PRERENDER_LANG}">${html}</div>`)

    const outDir = path.join(dist, route)
    await mkdir(outDir, { recursive: true })
    await writeFile(path.join(outDir, 'index.html'), page)
}

await rm(ssrDist, { recursive: true, force: true })
await rm(path.join(dist, '.vite'), { recursive: true, force: true })
console.log(`Prerendered ${routes.length} routes (${PRERENDER_LANG}).`)
