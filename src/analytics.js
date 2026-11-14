// ─── Cookie-free visitor analytics (Umami Cloud) ──────────────────────────────
// Umami sets no cookies and stores no personal data, so no consent banner is
// needed. The tracker loads only when VITE_UMAMI_WEBSITE_ID is set at build
// time and only on the production domains, so local builds and Vercel preview
// deployments never send visits. Dashboard: https://cloud.umami.is

const WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID || ''
const TRACKER_URL = 'https://cloud.umami.is/script.js'
const PRODUCTION_DOMAINS = 'www.machinepulseai.com.tr,machinepulseai.com.tr'

/** Add the Umami tracker to the page (browser only, once). */
export function startAnalytics() {
    if (!WEBSITE_ID || document.querySelector('script[data-website-id]')) return
    const script = document.createElement('script')
    script.defer = true
    script.src = TRACKER_URL
    script.dataset.websiteId = WEBSITE_ID
    script.dataset.domains = PRODUCTION_DOMAINS
    document.head.appendChild(script)
}

/**
 * Record a named event such as a video play or a sent contact form.
 * Analytics must never break the page, so a missing or blocked tracker is ignored.
 */
export function trackEvent(name, data) {
    if (typeof window === 'undefined') return
    try {
        window.umami?.track(name, data)
    } catch {
        // Tracker blocked or not loaded yet: the visit itself is unaffected.
    }
}
