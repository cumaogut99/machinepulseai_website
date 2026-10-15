import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App, { preloadAllRoutes } from './App.jsx'
import i18n from './i18n'

// ─── Build-time prerender entry ──────────────────────────────────────────────────
// Used by scripts/prerender.mjs (not shipped to the browser). Renders a route to
// static HTML so crawlers, social cards and LLM fetchers that don't run
// JavaScript still receive the full page content and per-route meta tags.

export const PRERENDER_LANG = 'tr'

export async function render(url) {
    await Promise.all([preloadAllRoutes(), i18n.changeLanguage(PRERENDER_LANG)])
    const helmetContext = {}
    const html = renderToString(
        <HelmetProvider context={helmetContext}>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </HelmetProvider>
    )
    return { html, helmet: helmetContext.helmet }
}
