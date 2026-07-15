import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import WIDGET_CATALOG from '../data/widgetCatalog.js'
import { SLUG_TO_WIDGET_ID, getWidgetDetailById } from '../data/widgetDetails.js'

// ─────────────────────────────────────────────────────────────────────────────
// WidgetDetail — generic, data-driven deep-dive page for any catalog widget
// that has an entry in widgetDetails.js. Reached at /widgets/<slug>. Reuses the
// same design as the combustion page: hero + optional sections (inputs/channels,
// formulas, how-it-works steps, outputs). Title, category name and accent colour
// are derived from WIDGET_CATALOG. Theme tokens only (Rule #0).
// ─────────────────────────────────────────────────────────────────────────────

const fade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
}

// Locate a widget + its parent category in the catalog by widget id.
function findWidget(id) {
    for (const cat of WIDGET_CATALOG) {
        const w = cat.widgets.find((x) => x.id === id)
        if (w) return { widget: w, category: cat }
    }
    return null
}

function SectionHeading({ accent, children }) {
    return (
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: accent }} />
            {children}
        </h2>
    )
}

// Renders one formula as typeset math, falling back to the plain expr on error.
function Formula({ latex, fallback, accent }) {
    const html = useMemo(() => {
        if (!latex) return null
        try {
            return katex.renderToString(latex, { displayMode: true, throwOnError: false })
        } catch {
            return null
        }
    }, [latex])

    if (!html) {
        return (
            <code
                className="block font-mono text-sm sm:text-base whitespace-nowrap px-4 py-3 rounded-lg"
                style={{ color: accent, background: '#00000055', border: `1px solid ${accent}22` }}
            >
                {fallback}
            </code>
        )
    }
    return (
        <div
            className="katex-formula px-4 py-4 rounded-lg text-white/90"
            style={{ background: '#00000055', border: `1px solid ${accent}22` }}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

// Simple two-line card used for inputs and outputs lists.
function InfoCard({ name, desc, accent, check }) {
    return (
        <div className="flex gap-3 bg-white/[0.03] border border-white/8 rounded-xl p-4">
            {check && (
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke={accent} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )}
            <div>
                <h3 className="text-sm font-semibold text-white leading-snug">{name}</h3>
                <p className="text-[13px] text-slate-400 leading-relaxed mt-0.5">{desc}</p>
            </div>
        </div>
    )
}

export default function WidgetDetail() {
    const { t, i18n } = useTranslation()
    const { slug } = useParams()
    const lang = i18n.language?.startsWith('tr') ? 'tr' : 'en'

    const id = SLUG_TO_WIDGET_ID[slug]
    const detail = id ? getWidgetDetailById(id) : null
    const found = id ? findWidget(id) : null

    // Unknown slug or missing catalog entry → send back to the library.
    if (!detail || !found) return <Navigate to="/widgets" replace />

    const accent = found.category.accent
    const widgetName = (found.widget[lang] || found.widget.en).name
    const categoryName = (found.category[lang] || found.category.en).name
    const d = detail[lang] || detail.en

    return (
        <section className="relative py-10 px-6 overflow-hidden">
            {/* Background glows — reuse theme accents */}
            <div className="absolute top-0 right-1/4 w-[28rem] h-[28rem] blur-[140px] rounded-full pointer-events-none" style={{ background: `${accent}0d` }} />
            <div className="absolute bottom-1/3 left-1/4 w-[28rem] h-[28rem] bg-[#00f5ff]/5 blur-[140px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">

                {/* ── Back link ───────────────────────────────────── */}
                <Link
                    to="/widgets"
                    className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-8"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('widgets.detail.back')}
                </Link>

                {/* ── Hero ────────────────────────────────────────── */}
                <motion.div variants={fade} initial="hidden" animate="visible" className="mb-14">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: accent }}>
                        {categoryName} · {t('widgets.detail.eyebrow')}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
                        {widgetName}
                    </h1>
                    {d.tagline && <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mb-4">{d.tagline}</p>}
                    {d.intro && <p className="text-base text-slate-400 leading-relaxed max-w-3xl">{d.intro}</p>}
                </motion.div>

                {/* ── Inputs (simple) ─────────────────────────────── */}
                {d.inputs?.length > 0 && (
                    <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-16">
                        <SectionHeading accent={accent}>{t('widgets.detail.inputsTitle')}</SectionHeading>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {d.inputs.map((it, i) => (
                                <InfoCard key={i} name={it.name} desc={it.desc} accent={accent} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── Channels (rich, instrument widgets) ─────────── */}
                {d.channels?.length > 0 && (
                    <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-16">
                        <SectionHeading accent={accent}>{t('widgets.detail.channelsTitle')}</SectionHeading>
                        <p className="text-sm text-slate-400 mb-6 max-w-3xl">{t('widgets.detail.channelsSubtitle')}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {d.channels.map((ch, i) => (
                                <div key={i} className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 flex flex-col gap-2">
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-base font-semibold text-white leading-snug font-mono">{ch.name}</h3>
                                        {ch.unit && (
                                            <span
                                                className="text-[11px] font-medium px-2 py-0.5 rounded-md whitespace-nowrap flex-shrink-0"
                                                style={{ color: accent, background: `${accent}14`, border: `1px solid ${accent}33` }}
                                            >
                                                {ch.unit}
                                            </span>
                                        )}
                                    </div>
                                    {ch.source && <p className="text-xs text-slate-500 italic">{ch.source}</p>}
                                    <p className="text-[13px] text-slate-400 leading-relaxed">{ch.usage}</p>
                                </div>
                            ))}
                        </div>
                        {d.channelsNote && (
                            <p className="text-xs text-slate-500 leading-relaxed mt-5 max-w-3xl border-l-2 pl-4" style={{ borderColor: `${accent}44` }}>
                                {d.channelsNote}
                            </p>
                        )}
                    </motion.div>
                )}

                {/* ── Formulas (optional) ─────────────────────────── */}
                {d.formulas?.length > 0 && (
                    <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-16">
                        <SectionHeading accent={accent}>{t('widgets.detail.formulasTitle')}</SectionHeading>
                        <div className="flex flex-col gap-4">
                            {d.formulas.map((f, i) => (
                                <div key={i} className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
                                    <h3 className="text-sm font-semibold text-white mb-3">{f.title}</h3>
                                    <div className="overflow-x-auto mb-3">
                                        <Formula latex={f.latex} fallback={f.expr} accent={accent} />
                                    </div>
                                    {f.where && <p className="text-[13px] text-slate-400 leading-relaxed">{f.where}</p>}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── Assumptions (optional) ─────────────────────── */}
                {d.assumptions?.length > 0 && (
                    <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-16">
                        <SectionHeading accent={accent}>{t('widgets.detail.assumptionsTitle')}</SectionHeading>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {d.assumptions.map((item, i) => (
                                <InfoCard key={i} name={item.name} desc={item.desc} accent={accent} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── How it works (steps) ────────────────────────── */}
                {d.steps?.length > 0 && (
                    <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-16">
                        <SectionHeading accent={accent}>{t('widgets.detail.stepsTitle')}</SectionHeading>
                        <ol className="flex flex-col gap-3">
                            {d.steps.map((s, i) => (
                                <li key={i} className="flex gap-4 bg-white/[0.03] border border-white/8 rounded-2xl p-5">
                                    <span
                                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                                        style={{ color: accent, background: `${accent}14`, border: `1px solid ${accent}44` }}
                                    >
                                        {i + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white mb-1">{s.step}</h3>
                                        <p className="text-[13px] text-slate-400 leading-relaxed">{s.detail}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </motion.div>
                )}

                {/* ── Example result readout (optional) ───────────── */}
                {d.exampleMetrics?.length > 0 && (
                    <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-16">
                        <SectionHeading accent={accent}>{t('widgets.detail.examplesTitle')}</SectionHeading>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {d.exampleMetrics.map((metric, i) => (
                                <div key={i} className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
                                    <p className="text-sm font-mono font-semibold" style={{ color: accent }}>{metric.value}</p>
                                    <h3 className="text-sm font-semibold text-white leading-snug mt-2">{metric.label}</h3>
                                    <p className="text-[13px] text-slate-400 leading-relaxed mt-1">{metric.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── Outputs ─────────────────────────────────────── */}
                {d.outputs?.length > 0 && (
                    <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-4">
                        <SectionHeading accent={accent}>{t('widgets.detail.outputsTitle')}</SectionHeading>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {d.outputs.map((o, i) => (
                                <InfoCard key={i} name={o.name} desc={o.desc} accent={accent} check />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
