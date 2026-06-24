// ─── Per-route SEO metadata ─────────────────────────────────────────────────────
// Each route gets its own title + description in both languages so search engines
// and social cards no longer share the generic home metadata across all 8 routes.
// Keep titles ≤ 60 chars and descriptions ≤ 160 chars.

export const SITE_URL = 'https://www.machinepulseai.com.tr'
export const SITE_NAME = 'MachinePulseAI'
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`

const BRAND = 'MachinePulseAI'

export const ROUTE_META = {
    '/': {
        en: {
            title: `${BRAND} — Engineering Data, Reborn`,
            description: 'High-performance post-processing analysis platform for vibration, acoustic & test data — handle massive datasets with minimal RAM, maximum insight.',
        },
        tr: {
            title: `${BRAND} — Mühendislik Verisi, Yeniden Doğdu`,
            description: 'Titreşim, akustik ve test verileri için yüksek performanslı son-işleme analiz platformu — devasa veri setlerini minimum RAM ile maksimum içgörüyle yönetin.',
        },
    },
    '/product': {
        en: {
            title: `Product — ${BRAND}`,
            description: 'Capabilities, workflow and the built-in AI architecture: natural-language analysis, Apache Arrow zero-copy engine, 8 GB RAM operation and multi-axis visualization.',
        },
        tr: {
            title: `Ürün — ${BRAND}`,
            description: 'Yetenekler, iş akışı ve yerleşik AI mimarisi: doğal dil ile analiz, Apache Arrow sıfır-kopya motoru, 8 GB RAM ile çalışma ve çok-eksenli görselleştirme.',
        },
    },
    '/widgets': {
        en: {
            title: `Widget Library — ${BRAND}`,
            description: 'Every analysis module explained — from data import and signal filtering to advanced vibration, acoustic and engineering diagnostics.',
        },
        tr: {
            title: `Widget Kütüphanesi — ${BRAND}`,
            description: 'Her analiz modülü açıklamasıyla — veri içe aktarmadan sinyal filtrelemeye, gelişmiş titreşim, akustik ve mühendislik tanılamasına kadar.',
        },
    },
    '/pricing': {
        en: {
            title: `Packages — ${BRAND}`,
            description: 'A modular base package plus optional widget groups, ML suite and AI assistant. Choose the capabilities that fit your workflow.',
        },
        tr: {
            title: `Paketler — ${BRAND}`,
            description: 'Modüler bir baz paket ile birlikte isteğe bağlı widget grupları, ML paketi ve yapay zeka asistanı. İş akışınıza uygun yetenekleri seçin.',
        },
    },
}

/** Resolve metadata for a path + language, falling back to home / English. */
export function resolveRouteMeta(pathname, lang) {
    const entry = ROUTE_META[pathname] || ROUTE_META['/']
    return entry[lang] || entry.en
}
