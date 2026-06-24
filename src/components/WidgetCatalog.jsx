import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import WIDGET_CATALOG from '../data/widgetCatalog.js'

// ─────────────────────────────────────────────────────────────────────────────
// WidgetCatalog — public gallery of every analysis widget in MachinePulseAI.
// Layout: search + category filter chips + responsive card grid. Each card shows
// a summary and expands to reveal the educational "theory" text. Bilingual via
// the current i18n language (en/tr); content lives in src/data/widgetCatalog.js.
// ─────────────────────────────────────────────────────────────────────────────

const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] } },
}

// ── Single widget card ───────────────────────────────────────────────────────
function WidgetCard({ widget, accent, lang, learnLabel, hideLabel }) {
    const [open, setOpen] = useState(false)
    const c = widget[lang] || widget.en
    const paragraphs = (c.theory || '').split('\n\n')

    return (
        <motion.div
            variants={cardVariants}
            layout
            className="card-hover-glow group relative flex flex-col bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden p-5 gap-3"
        >
            {/* Top gradient accent */}
            <div
                className="absolute top-0 left-0 right-0 h-px opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}55, transparent)` }}
                aria-hidden="true"
            />

            <h3 className="text-base font-semibold text-white leading-snug pr-2">
                {c.name}
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed flex-1">
                {c.summary}
            </p>

            {/* Expand / collapse theory */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="self-start inline-flex items-center gap-1.5 text-xs font-medium mt-1 transition-colors"
                style={{ color: accent }}
                aria-expanded={open}
            >
                {open ? hideLabel : learnLabel}
                <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="theory"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div
                            className="mt-1 pt-3 border-t flex flex-col gap-3"
                            style={{ borderColor: `${accent}22` }}
                        >
                            {paragraphs.map((p, i) => (
                                <p key={i} className="text-[13px] text-slate-400 leading-relaxed">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ── Main catalog section ─────────────────────────────────────────────────────
export default function WidgetCatalog() {
    const { t, i18n } = useTranslation()
    const lang = i18n.language?.startsWith('tr') ? 'tr' : 'en'

    const [activeCat, setActiveCat] = useState('all')
    const [query, setQuery] = useState('')

    const totalAvailable = useMemo(
        () => WIDGET_CATALOG.filter((c) => c.status !== 'planned').reduce((s, c) => s + c.widgets.length, 0),
        []
    )

    // Filter categories + widgets by chip and search query.
    const visibleCategories = useMemo(() => {
        const q = query.trim().toLowerCase()
        return WIDGET_CATALOG
            .filter((cat) => activeCat === 'all' || cat.id === activeCat)
            .map((cat) => {
                if (!q) return cat
                const widgets = cat.widgets.filter((w) => {
                    const en = w.en, tr = w.tr
                    return (
                        en.name.toLowerCase().includes(q) ||
                        en.summary.toLowerCase().includes(q) ||
                        (tr?.name || '').toLowerCase().includes(q) ||
                        (tr?.summary || '').toLowerCase().includes(q)
                    )
                })
                return { ...cat, widgets }
            })
            .filter((cat) => cat.widgets.length > 0)
    }, [activeCat, query])

    const learnLabel = t('widgets.learnMore')
    const hideLabel = t('widgets.hide')

    return (
        <section className="relative py-14 px-6 overflow-hidden">
            {/* Background glows */}
            <div className="absolute top-0 left-1/4 w-[28rem] h-[28rem] bg-[#00f5ff]/5 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-[28rem] h-[28rem] bg-[#a855f7]/5 blur-[140px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* ── Header ──────────────────────────────────────── */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block text-xs font-semibold text-[#00f5ff] tracking-widest uppercase mb-4">
                        {t('widgets.eyebrow')}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        {t('widgets.title')}
                    </h1>
                    <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
                        {t('widgets.subtitle', { count: totalAvailable })}
                    </p>
                </motion.div>

                {/* ── Search ──────────────────────────────────────── */}
                <div className="max-w-md mx-auto mb-6">
                    <div className="relative">
                        <svg className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t('widgets.searchPlaceholder')}
                            className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00f5ff]/50 focus:bg-white/[0.06] transition-all"
                        />
                    </div>
                </div>

                {/* ── Category filter chips ───────────────────────── */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    <button
                        onClick={() => setActiveCat('all')}
                        className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all ${activeCat === 'all'
                            ? 'bg-[#00f5ff]/10 border-[#00f5ff]/50 text-[#00f5ff]'
                            : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                            }`}
                    >
                        {t('widgets.allCategories')}
                    </button>
                    {WIDGET_CATALOG.map((cat) => {
                        const active = activeCat === cat.id
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCat(cat.id)}
                                className="text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5"
                                style={active
                                    ? { background: `${cat.accent}1a`, borderColor: `${cat.accent}80`, color: cat.accent }
                                    : undefined}
                            >
                                <span className={active ? '' : 'text-slate-400 hover:text-white'}>
                                    {(cat[lang] || cat.en).name}
                                </span>
                                {cat.status === 'planned' && (
                                    <span className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                                        {t('widgets.plannedBadge')}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* ── Category sections ───────────────────────────── */}
                <AnimatePresence mode="popLayout">
                    {visibleCategories.length === 0 && (
                        <p className="text-center text-slate-500 py-12">{t('widgets.noResults')}</p>
                    )}

                    {visibleCategories.map((cat) => {
                        const meta = cat[lang] || cat.en
                        const isPlanned = cat.status === 'planned'
                        return (
                            <motion.div
                                key={cat.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="mb-14"
                            >
                                {/* Category header */}
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.accent }} />
                                    <h2 className="text-xl font-bold text-white tracking-tight">{meta.name}</h2>
                                    <span className="text-xs text-slate-500">({cat.widgets.length})</span>
                                    {isPlanned && (
                                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border"
                                            style={{ color: cat.accent, borderColor: `${cat.accent}55`, background: `${cat.accent}12` }}>
                                            {t('widgets.plannedBadge')}
                                        </span>
                                    )}
                                </div>
                                {meta.blurb && (
                                    <p className="text-sm text-slate-500 mb-6 max-w-3xl">{meta.blurb}</p>
                                )}

                                {/* Widget grid */}
                                <motion.div
                                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${isPlanned ? 'opacity-80' : ''}`}
                                    variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {cat.widgets.map((w) => (
                                        <WidgetCard
                                            key={w.id}
                                            widget={w}
                                            accent={cat.accent}
                                            lang={lang}
                                            learnLabel={learnLabel}
                                            hideLabel={hideLabel}
                                        />
                                    ))}
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </section>
    )
}
