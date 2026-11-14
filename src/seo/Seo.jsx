import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { SITE_URL, SITE_NAME, OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT, OG_IMAGE_ALT, resolveRouteMeta } from './routeMeta.js'

// ─── Per-route SEO head manager ─────────────────────────────────────────────────
// Renders <title>, description, canonical, hreflang and Open Graph / Twitter tags
// for the current route + active language. Mounted once near the app root; it
// reacts to route + language changes automatically.

export default function Seo() {
    const { i18n } = useTranslation()
    // Normalize the trailing-slash form of prerendered pages (/pricing/).
    const pathname = useLocation().pathname.replace(/\/+$/, '') || '/'

    const lang = i18n.language?.startsWith('tr') ? 'tr' : 'en'
    const meta = resolveRouteMeta(pathname, lang)
    const canonical = `${SITE_URL}${pathname === '/' ? '' : pathname}`

    return (
        <Helmet>
            <html lang={lang} />
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <link rel="canonical" href={canonical} />

            {/* Language alternates */}
            <link rel="alternate" hrefLang="en" href={canonical} />
            <link rel="alternate" hrefLang="tr" href={canonical} />
            <link rel="alternate" hrefLang="x-default" href={canonical} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content={lang === 'tr' ? 'tr_TR' : 'en_US'} />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:image" content={OG_IMAGE} />
            <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
            <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
            <meta property="og:image:alt" content={OG_IMAGE_ALT} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonical} />
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.description} />
            <meta name="twitter:image" content={OG_IMAGE} />
            <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
        </Helmet>
    )
}
