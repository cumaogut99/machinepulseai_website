import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import WIDGET_CATALOG from '../data/widgetCatalog.js'
import { getWidgetDetailSlug } from '../data/widgetDetails.js'
import { getWidgetLearning } from '../data/widgetLearning.js'
import { VIBRATION_CONTROL_IDS } from '../data/learning/vibrationControls.js'

// ─────────────────────────────────────────────────────────────────────────────
// WidgetCatalog — application-aligned gallery of MachinePulseAI modules.
// Layout: Sidebar category navigation + search + view mode toggle (Grid/List)
// + responsive module cards with engineering theory and deep-dive links.
// Bilingual via i18n (en/tr).
// ─────────────────────────────────────────────────────────────────────────────

const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] } },
}

// Category icons for navigation sidebar
const CATEGORY_ICONS = {
    all: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
    ),
    data_io: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
    ),
    preprocessing: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
    ),
    filters: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12h3l3-8 4 16 3-10 2 5 3-3h3" />
        </svg>
    ),
    engineering: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    statistics: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    ),
    machine_learning: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    visualization: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
        </svg>
    ),
    reporting: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    python_script: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    ),
}

// Small uppercase label marking a module the application ships in a later version.
function FutureBadge({ accent }) {
    const { t } = useTranslation()
    return (
        <span
            className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded border whitespace-nowrap font-medium"
            style={{ color: accent, borderColor: `${accent}55`, background: `${accent}12` }}
        >
            {t('widgets.futureBadge')}
        </span>
    )
}

// ── Single widget card (Grid View) ───────────────────────────────────────────
function WidgetCard({
    widget,
    accent,
    lang,
    learnLabel,
    hideLabel,
    detailLabel,
}) {
    const { t } = useTranslation()
    const { phase } = widget
    const [open, setOpen] = useState(false)
    const guide = getWidgetLearning(widget.id) ? t(`widgetLearn.pages.${widget.id}`, { returnObjects: true }) : null
    const course = VIBRATION_CONTROL_IDS.includes(widget.id) ? t(`vibrationLearn.widgets.${widget.id}`, { returnObjects: true }) : null
    const base = widget[lang] || widget.en
    const c = guide ? { ...base, summary: guide.intro, theory: `${guide.use}\n\n${guide.concepts.map((item) => item.desc).join('\n\n')}` }
        : course ? { ...base, summary: course.intro, theory: `${course.theory.intro}\n\n${course.theory.cards.map((item) => item.body).join('\n\n')}` } : base
    const paragraphs = (c.theory || '').split('\n\n')
    const detailSlug = getWidgetDetailSlug(widget.id)
    const detailPath = phase ? null : widget.detailPath || (detailSlug ? `/widgets/${detailSlug}` : null)

    return (
        <motion.div
            variants={cardVariants}
            layout
            className={`card-hover-glow group relative flex flex-col bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden p-5 gap-3 ${phase ? 'opacity-75' : ''}`}
        >
            {/* Top gradient accent */}
            <div
                className="absolute top-0 left-0 right-0 h-px opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}66, transparent)` }}
                aria-hidden="true"
            />

            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
                    <h3 className="text-base font-semibold text-white leading-snug">
                        {c.name}
                    </h3>
                </div>
                {phase && <FutureBadge accent={accent} />}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed flex-1">
                {c.summary}
            </p>

            {/* Expand / collapse theory */}
            {!phase && (
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="self-start inline-flex items-center gap-1.5 text-xs font-medium mt-1 transition-colors"
                    style={{ color: accent }}
                    aria-expanded={open}
                    aria-controls={`theory-${widget.id}`}
                >
                    {open ? hideLabel : learnLabel}
                    <svg
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            )}

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="theory"
                        id={`theory-${widget.id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div
                            className="mt-1 pt-3 border-t flex flex-col gap-2.5"
                            style={{ borderColor: `${accent}22` }}
                        >
                            {paragraphs.map((p, i) => (
                                <p key={i} className="text-xs text-slate-400 leading-relaxed">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Optional deep-dive link to a dedicated detail page */}
            {phase ? (
                <p
                    className="self-start mt-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium"
                    style={{ color: accent, borderColor: `${accent}33`, background: `${accent}0a` }}
                >
                    {t('widgets.futureNote')}
                </p>
            ) : (guide || course) && (
                <p className="text-[11px] leading-5 text-slate-500">
                    {t('widgetLearn.common.card')}
                </p>
            )}

            {detailPath && (
                <Link
                    to={detailPath}
                    className="self-start inline-flex items-center gap-1.5 text-xs font-semibold mt-1 px-3 py-1.5 rounded-lg border transition-all"
                    style={{ color: accent, borderColor: `${accent}55`, background: `${accent}12` }}
                >
                    {detailLabel}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            )}
        </motion.div>
    )
}

// ── Single widget row (List View) ───────────────────────────────────────────
function WidgetRow({
    widget,
    accent,
    lang,
    learnLabel,
    hideLabel,
    detailLabel,
}) {
    const { t } = useTranslation()
    const { phase } = widget
    const [open, setOpen] = useState(false)
    const guide = getWidgetLearning(widget.id) ? t(`widgetLearn.pages.${widget.id}`, { returnObjects: true }) : null
    const course = VIBRATION_CONTROL_IDS.includes(widget.id) ? t(`vibrationLearn.widgets.${widget.id}`, { returnObjects: true }) : null
    const base = widget[lang] || widget.en
    const c = guide ? { ...base, summary: guide.intro, theory: `${guide.use}\n\n${guide.concepts.map((item) => item.desc).join('\n\n')}` }
        : course ? { ...base, summary: course.intro, theory: `${course.theory.intro}\n\n${course.theory.cards.map((item) => item.body).join('\n\n')}` } : base
    const paragraphs = (c.theory || '').split('\n\n')
    const detailSlug = getWidgetDetailSlug(widget.id)
    const detailPath = phase ? null : widget.detailPath || (detailSlug ? `/widgets/${detailSlug}` : null)

    return (
        <motion.div
            variants={cardVariants}
            layout
            className={`group rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] transition-all p-4 ${phase ? 'opacity-75' : ''}`}
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span
                        className="w-1.5 h-5 rounded-full flex-shrink-0 mt-0.5"
                        style={{ background: accent }}
                        aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-semibold text-white tracking-tight">
                                {c.name}
                            </h3>
                            {phase && <FutureBadge accent={accent} />}
                            {detailPath && (
                                <span className="text-[10px] text-[#00f5ff]/90 bg-[#00f5ff]/10 px-1.5 py-0.5 rounded border border-[#00f5ff]/20 font-medium">
                                    {lang === 'tr' ? 'Detaylı İnceleme' : 'Deep Dive'}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {c.summary}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                    {!phase && (
                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-colors"
                            aria-expanded={open}
                        >
                            <span>{open ? hideLabel : learnLabel}</span>
                            <svg
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    )}
                    {detailPath && (
                        <Link
                            to={detailPath}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all"
                            style={{ color: accent, borderColor: `${accent}40`, background: `${accent}10` }}
                        >
                            <span>{detailLabel}</span>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div
                            className="mt-3 pt-3 border-t flex flex-col gap-2 pl-4"
                            style={{ borderColor: `${accent}20` }}
                        >
                            {paragraphs.map((p, i) => (
                                <p key={i} className="text-xs text-slate-400 leading-relaxed">
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

function groupWidgets(widgets, lang) {
    const groups = new Map()
    for (const item of widgets) {
        const itemGroup = item.subgroup
        const key = itemGroup?.id || 'direct'
        if (!groups.has(key)) {
            groups.set(key, {
                id: key,
                label: itemGroup ? (itemGroup[lang] || itemGroup.en) : '',
                phase: itemGroup?.phase,
                widgets: [],
            })
        }
        groups.get(key).widgets.push(item)
    }
    return [...groups.values()]
}

function WidgetGroup({
    category,
    group,
    isExpanded,
    forceOpen,
    onToggle,
    lang,
    learnLabel,
    hideLabel,
    detailLabel,
    expandLabel,
    collapseLabel,
    viewMode,
}) {
    const collapsible = category.id === 'engineering' && Boolean(group.label)
    const visible = !collapsible || forceOpen || isExpanded
    const regionId = `${category.id}-${group.id}-widgets`
    const toggleId = `${regionId}-toggle`

    return (
        <div>
            {group.label && (
                collapsible ? (
                    <h3 className={visible ? 'mb-3' : ''}>
                        <button
                            id={toggleId}
                            type="button"
                            onClick={onToggle}
                            className="group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                            aria-expanded={visible}
                            aria-controls={regionId}
                            aria-label={visible ? collapseLabel : expandLabel}
                        >
                            <span className="h-px w-4" style={{ background: `${category.accent}88` }} />
                            <span className="text-xs sm:text-sm font-semibold text-slate-300 group-hover:text-white">
                                {group.label}
                            </span>
                            <span className="text-xs text-slate-500">({group.widgets.length})</span>
                            {group.phase && <FutureBadge accent={category.accent} />}
                            <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-slate-400 group-hover:text-white">
                                <svg
                                    className={`h-3.5 w-3.5 transition-transform duration-300 ${visible ? 'rotate-90' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </button>
                    </h3>
                ) : (
                    <div className="flex items-center gap-2 mb-3">
                        <span className="h-px w-4" style={{ background: `${category.accent}88` }} />
                        <h3 className="text-xs sm:text-sm font-semibold text-slate-300">
                            {group.label}
                        </h3>
                        <span className="text-xs text-slate-500">({group.widgets.length})</span>
                    </div>
                )
            )}

            <AnimatePresence initial={false}>
                {visible && (
                    <motion.div
                        key="widgets"
                        id={regionId}
                        role={collapsible ? 'region' : undefined}
                        aria-labelledby={collapsible ? toggleId : undefined}
                        initial={collapsible ? { opacity: 0, height: 0 } : false}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                    >
                        {viewMode === 'grid' ? (
                            <motion.div
                                className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 ${category.phase ? 'opacity-80' : ''}`}
                                variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
                                initial="hidden"
                                animate="visible"
                            >
                                {group.widgets.map((widget) => (
                                    <WidgetCard
                                        key={widget.id}
                                        widget={widget}
                                        accent={category.accent}
                                        lang={lang}
                                        learnLabel={learnLabel}
                                        hideLabel={hideLabel}
                                        detailLabel={detailLabel}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                className={`flex flex-col gap-2.5 ${category.phase ? 'opacity-80' : ''}`}
                                variants={{ visible: { transition: { staggerChildren: 0.02 } } }}
                                initial="hidden"
                                animate="visible"
                            >
                                {group.widgets.map((widget) => (
                                    <WidgetRow
                                        key={widget.id}
                                        widget={widget}
                                        accent={category.accent}
                                        lang={lang}
                                        learnLabel={learnLabel}
                                        hideLabel={hideLabel}
                                        detailLabel={detailLabel}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ── Main catalog section ─────────────────────────────────────────────────────
export default function WidgetCatalog() {
    const { t, i18n } = useTranslation()
    const lang = i18n.language?.startsWith('tr') ? 'tr' : 'en'
    const [searchParams, setSearchParams] = useSearchParams()
    const categoryParam = searchParams.get('category')

    const categoryIds = useMemo(() => new Set(WIDGET_CATALOG.map((cat) => cat.id)), [])
    const [activeCat, setActiveCat] = useState(
        categoryParam && categoryIds.has(categoryParam) ? categoryParam : 'all'
    )
    const [query, setQuery] = useState('')
    const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
    const [expandedGroups, setExpandedGroups] = useState(() => new Set())

    const totalAvailable = useMemo(
        () => WIDGET_CATALOG.reduce((sum, category) => sum + category.widgets.filter((item) => !item.phase).length, 0),
        []
    )

    useEffect(() => {
        setActiveCat(categoryParam && categoryIds.has(categoryParam) ? categoryParam : 'all')
    }, [categoryParam, categoryIds])

    function selectCategory(categoryId) {
        setActiveCat(categoryId)
        if (categoryId === 'all') {
            setSearchParams({})
            return
        }
        setSearchParams({ category: categoryId })
    }

    function toggleGroup(groupKey) {
        setExpandedGroups((current) => {
            const next = new Set(current)
            if (next.has(groupKey)) next.delete(groupKey)
            else next.add(groupKey)
            return next
        })
    }

    // Filter categories + widgets by active category and search query.
    const visibleCategories = useMemo(() => {
        const q = query.trim().toLowerCase()
        return WIDGET_CATALOG
            .filter((cat) => activeCat === 'all' || cat.id === activeCat)
            .map((cat) => {
                if (!q) return cat
                const widgets = cat.widgets.filter((w) => {
                    const en = w.en, tr = w.tr
                    const subgroupMatch = (
                        (w.subgroup?.en || '').toLowerCase().includes(q) ||
                        (w.subgroup?.tr || '').toLowerCase().includes(q)
                    )
                    return (
                        subgroupMatch ||
                        en.name.toLowerCase().includes(q) ||
                        en.summary.toLowerCase().includes(q) ||
                        (getWidgetLearning(w.id)?.en.intro || '').toLowerCase().includes(q) ||
                        (tr?.name || '').toLowerCase().includes(q) ||
                        (getWidgetLearning(w.id)?.tr.intro || '').toLowerCase().includes(q) ||
                        (tr?.summary || '').toLowerCase().includes(q)
                    )
                })
                return { ...cat, widgets }
            })
            .filter((cat) => cat.widgets.length > 0)
    }, [activeCat, query])

    const totalVisibleWidgets = useMemo(() => {
        return visibleCategories.reduce((sum, cat) => sum + cat.widgets.length, 0)
    }, [visibleCategories])

    const activeCategoryMeta = useMemo(() => {
        if (activeCat === 'all') return null
        const found = WIDGET_CATALOG.find((cat) => cat.id === activeCat)
        if (!found) return null
        const meta = found[lang] || found.en
        return {
            name: meta.name,
            blurb: meta.blurb,
            accent: found.accent,
            count: found.widgets.length,
        }
    }, [activeCat, lang])

    const learnLabel = t('widgets.learnMore')
    const hideLabel = t('widgets.hide')
    const detailLabel = t('widgets.viewDetail')

    return (
        <section className="relative py-8 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[32rem] h-[32rem] bg-[#00f5ff]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-[32rem] h-[32rem] bg-[#a855f7]/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* ── Compact Header ───────────────────────────────── */}
                <motion.div
                    className="text-center pt-2 pb-6 mb-4"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block text-xs font-semibold text-[#00f5ff] tracking-widest uppercase mb-2">
                        {t('widgets.eyebrow')}
                    </span>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                        {t('widgets.title')}
                    </h1>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-4">
                        {t('widgets.subtitle', { count: totalAvailable })}
                    </p>

                    {/* Educational / Product Scope Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff]" />
                            {t('widgets.quickBadges.modules', { count: totalAvailable })}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                            {t('widgets.quickBadges.theory')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
                            {t('widgets.quickBadges.workflows')}
                        </span>
                    </div>
                </motion.div>

                {/* ── Mobile Search & Category Scrollbar (< lg) ───── */}
                <div className="lg:hidden mb-6 space-y-3">
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
                            className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00f5ff]/50 transition-all"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs p-1"
                                aria-label={t('widgets.clearSearch')}
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                        <button
                            type="button"
                            onClick={() => selectCategory('all')}
                            className={`text-xs font-medium px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all ${activeCat === 'all'
                                ? 'bg-[#00f5ff]/15 border-[#00f5ff]/50 text-[#00f5ff]'
                                : 'bg-white/[0.03] border-white/10 text-slate-400'
                                }`}
                        >
                            {t('widgets.allCategories')} ({totalAvailable})
                        </button>
                        {WIDGET_CATALOG.map((cat) => {
                            const active = activeCat === cat.id
                            const meta = cat[lang] || cat.en
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => selectCategory(cat.id)}
                                    className="text-xs font-medium px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all"
                                    style={active
                                        ? { background: `${cat.accent}20`, borderColor: `${cat.accent}60`, color: cat.accent }
                                        : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}
                                >
                                    {meta.name} ({cat.widgets.length})
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* ── 2-Column Responsive Layout ──────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ── Left Sticky Sidebar (Desktop >= lg) ──────── */}
                    <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24 space-y-4">
                        {/* Search Input */}
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
                                className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00f5ff]/50 focus:bg-white/[0.06] transition-all"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs p-1"
                                    aria-label={t('widgets.clearSearch')}
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Category Navigation Panel */}
                        <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-2.5">
                            <div className="flex items-center justify-between px-3 py-2 mb-1">
                                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                    {t('widgets.categoriesTitle')}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">
                                    {totalAvailable} {t('widgets.readyModules')}
                                </span>
                            </div>

                            <nav className="flex flex-col gap-1" aria-label="Module categories">
                                {/* All Modules Button */}
                                <button
                                    type="button"
                                    onClick={() => selectCategory('all')}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${activeCat === 'all'
                                        ? 'bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/30 shadow-[0_0_15px_rgba(0,245,255,0.08)]'
                                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                                        }`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className={`w-5 h-5 rounded-lg flex items-center justify-center ${activeCat === 'all' ? 'bg-[#00f5ff]/20 text-[#00f5ff]' : 'bg-white/5 text-slate-400'}`}>
                                            {CATEGORY_ICONS.all}
                                        </span>
                                        <span>{t('widgets.allModules')}</span>
                                    </div>
                                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                                        {totalAvailable}
                                    </span>
                                </button>

                                {/* Individual Categories */}
                                {WIDGET_CATALOG.map((cat) => {
                                    const active = activeCat === cat.id
                                    const meta = cat[lang] || cat.en
                                    const count = cat.widgets.length
                                    const icon = CATEGORY_ICONS[cat.id] || CATEGORY_ICONS.all

                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => selectCategory(cat.id)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${active
                                                ? 'border'
                                                : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                                                }`}
                                            style={active
                                                ? {
                                                    background: `${cat.accent}15`,
                                                    borderColor: `${cat.accent}50`,
                                                    color: cat.accent,
                                                    boxShadow: `0 0 15px ${cat.accent}12`,
                                                }
                                                : undefined}
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                                <span
                                                    className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0"
                                                    style={active
                                                        ? { background: `${cat.accent}25`, color: cat.accent }
                                                        : { background: 'rgba(255,255,255,0.05)', color: cat.accent }}
                                                >
                                                    {icon}
                                                </span>
                                                <span className="truncate">
                                                    {meta.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                {cat.phase && (
                                                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/10 text-slate-400">
                                                        {t('widgets.futureBadge')}
                                                    </span>
                                                )}
                                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                                                    {count}
                                                </span>
                                            </div>
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* ── Right Content Area (Desktop lg:col-span-8 xl:col-span-9) ── */}
                    <main className="lg:col-span-8 xl:col-span-9 min-w-0">

                        {/* Top Control Bar of Content Area */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-white/8">
                            <div>
                                <div className="flex items-center gap-2.5 mb-1">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{ background: activeCategoryMeta?.accent || '#00f5ff' }}
                                    />
                                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                                        {activeCategoryMeta?.name || t('widgets.allModules')}
                                    </h2>
                                    <span className="text-xs text-slate-500 font-mono">
                                        ({totalVisibleWidgets} {t('widgets.modulesCount', { count: totalVisibleWidgets })})
                                    </span>
                                </div>
                                {activeCategoryMeta?.blurb && (
                                    <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                                        {activeCategoryMeta.blurb}
                                    </p>
                                )}
                            </div>

                            {/* View Mode Switcher */}
                            <div className="flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-xl p-1 self-start sm:self-auto flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setViewMode('grid')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'grid'
                                        ? 'bg-white/10 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-slate-200'
                                        }`}
                                    title={t('widgets.gridView')}
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                    <span>{t('widgets.gridView')}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setViewMode('list')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'list'
                                        ? 'bg-white/10 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-slate-200'
                                        }`}
                                    title={t('widgets.listView')}
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    <span>{t('widgets.listView')}</span>
                                </button>
                            </div>
                        </div>

                        {/* Category Sections & Module Cards */}
                        <AnimatePresence mode="popLayout">
                            {visibleCategories.length === 0 && (
                                <div className="text-center py-16 px-4 bg-white/[0.02] border border-white/8 rounded-2xl">
                                    <p className="text-slate-400 text-sm mb-2">{t('widgets.noResults')}</p>
                                    {query && (
                                        <button
                                            type="button"
                                            onClick={() => setQuery('')}
                                            className="text-xs text-[#00f5ff] hover:underline"
                                        >
                                            {t('widgets.clearSearch')}
                                        </button>
                                    )}
                                </div>
                            )}

                            {visibleCategories.map((cat) => {
                                const meta = cat[lang] || cat.en
                                const widgetGroups = groupWidgets(cat.widgets, lang)
                                return (
                                    <motion.div
                                        key={cat.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="mb-10"
                                    >
                                        {/* Category Subheader (shown when All is selected) */}
                                        {activeCat === 'all' && (
                                            <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-white/6">
                                                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.accent }} />
                                                <h3 className="text-base font-bold text-white tracking-tight">{meta.name}</h3>
                                                <span className="text-xs text-slate-500">({cat.widgets.length})</span>
                                                {cat.phase && (
                                                    <span className="text-[9px] uppercase font-semibold px-2 py-0.5 rounded-full border ml-1"
                                                        style={{ color: cat.accent, borderColor: `${cat.accent}55`, background: `${cat.accent}12` }}>
                                                        {t('widgets.futureBadge')}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Direct widgets and application subgroups */}
                                        <div className="flex flex-col gap-6">
                                            {widgetGroups.map((group) => {
                                                const groupKey = `${cat.id}:${group.id}`
                                                return (
                                                    <WidgetGroup
                                                        key={group.id}
                                                        category={cat}
                                                        group={group}
                                                        isExpanded={expandedGroups.has(groupKey)}
                                                        forceOpen={Boolean(query.trim())}
                                                        onToggle={() => toggleGroup(groupKey)}
                                                        lang={lang}
                                                        learnLabel={learnLabel}
                                                        hideLabel={hideLabel}
                                                        detailLabel={detailLabel}
                                                        expandLabel={t('widgets.expandGroup', { group: group.label })}
                                                        collapseLabel={t('widgets.collapseGroup', { group: group.label })}
                                                        viewMode={viewMode}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </section>
    )
}
