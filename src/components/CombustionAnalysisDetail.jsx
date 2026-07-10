import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import DETAIL from '../data/combustionAnalysisDetail.js'

// ─────────────────────────────────────────────────────────────────────────────
// CombustionAnalysisDetail — dedicated deep-dive page for the "Advanced
// Combustion Analysis" widget, reached from its catalog card. Explains the
// input channels, core formulas, processing pipeline and outputs. Bilingual
// content lives in src/data/combustionAnalysisDetail.js; the chrome labels
// come from i18n. Theme tokens only (dark #0a0a0a + neon accents) — Rule #0.
// ─────────────────────────────────────────────────────────────────────────────

const ACCENT = '#f43f5e' // Thermodynamics & Fluids category accent

// Publication-quality LaTeX for each formula, index-aligned with the `formulas`
// array in combustionAnalysisDetail.js (math is language-neutral, so it lives
// here rather than being duplicated across the bilingual content). The plain
// `expr` string in the data file is the fallback if KaTeX ever fails to parse.
const FORMULA_LATEX = [
    'V(\\theta) = V_c + \\dfrac{V_d}{2}\\left[\\, R + 1 - \\cos\\theta - \\sqrt{R^{2} - \\sin^{2}\\theta} \\,\\right]',
    'p_{\\mathrm{abs}}(\\theta) = p_{\\mathrm{meas}}(\\theta) + \\left[\\, p_{\\mathrm{man}} - p_{\\mathrm{meas}}(\\theta_{\\mathrm{ref}}) \\,\\right]',
    'W_i = \\oint p\\,\\mathrm{d}V \\qquad \\mathrm{IMEP} = \\dfrac{W_i}{V_d}',
    '\\dfrac{\\mathrm{d}Q_n}{\\mathrm{d}\\theta} = \\dfrac{\\gamma}{\\gamma-1}\\,p\\,\\dfrac{\\mathrm{d}V}{\\mathrm{d}\\theta} + \\dfrac{1}{\\gamma-1}\\,V\\,\\dfrac{\\mathrm{d}p}{\\mathrm{d}\\theta}',
    '\\Delta p_{\\mathrm{comb},\\,i} = p_i - p_{i-1}\\left(\\dfrac{V_{i-1}}{V_i}\\right)^{\\!n}',
    '\\mathrm{MFB}(\\theta) = \\dfrac{Q(\\theta) - Q_{\\mathrm{soc}}}{Q_{\\mathrm{eoc}} - Q_{\\mathrm{soc}}}',
    '\\mathrm{MAPO} = \\max\\bigl|\\,\\mathrm{HP}\\{\\,p(\\theta)\\,\\}\\,\\bigr| \\qquad f \\approx 4\\text{–}20~\\mathrm{kHz}',
    '\\mathrm{COV}_{\\mathrm{IMEP}} = \\dfrac{\\sigma_{\\mathrm{IMEP}}}{\\mu_{\\mathrm{IMEP}}}\\times 100\\%',
    '\\log p = -n\\,\\log V + C \\quad\\Rightarrow\\quad \\text{fit } n',
]

// Renders one formula as typeset math, falling back to the plain expr on error.
function Formula({ latex, fallback }) {
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
                style={{ color: ACCENT, background: '#00000055', border: `1px solid ${ACCENT}22` }}
            >
                {fallback}
            </code>
        )
    }
    return (
        <div
            className="katex-formula px-4 py-4 rounded-lg text-white/90"
            style={{ background: '#00000055', border: `1px solid ${ACCENT}22` }}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

const fade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
}

function SectionHeading({ children }) {
    return (
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
            {children}
        </h2>
    )
}

export default function CombustionAnalysisDetail() {
    const { t, i18n } = useTranslation()
    const lang = i18n.language?.startsWith('tr') ? 'tr' : 'en'
    const d = DETAIL[lang] || DETAIL.en

    return (
        <section className="relative py-10 px-6 overflow-hidden">
            {/* Background glows — reuse theme accents */}
            <div className="absolute top-0 right-1/4 w-[28rem] h-[28rem] bg-[#f43f5e]/5 blur-[140px] rounded-full pointer-events-none" />
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
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: ACCENT }}>
                        {d.eyebrow}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
                        {d.name}
                    </h1>
                    <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mb-4">{d.tagline}</p>
                    <p className="text-base text-slate-400 leading-relaxed max-w-3xl">{d.intro}</p>
                </motion.div>

                {/* ── Input channels ──────────────────────────────── */}
                <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-16">
                    <SectionHeading>{t('widgets.detail.channelsTitle')}</SectionHeading>
                    <p className="text-sm text-slate-400 mb-6 max-w-3xl">{t('widgets.detail.channelsSubtitle')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {d.channels.map((ch, i) => (
                            <div key={i} className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 flex flex-col gap-2">
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-base font-semibold text-white leading-snug font-mono">{ch.name}</h3>
                                    <span
                                        className="text-[11px] font-medium px-2 py-0.5 rounded-md whitespace-nowrap flex-shrink-0"
                                        style={{ color: ACCENT, background: `${ACCENT}14`, border: `1px solid ${ACCENT}33` }}
                                    >
                                        {ch.unit}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 italic">{ch.source}</p>
                                <p className="text-[13px] text-slate-400 leading-relaxed">{ch.usage}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mt-5 max-w-3xl border-l-2 pl-4" style={{ borderColor: `${ACCENT}44` }}>
                        {d.geometryNote}
                    </p>
                </motion.div>

                {/* ── Formulas ────────────────────────────────────── */}
                <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-16">
                    <SectionHeading>{t('widgets.detail.formulasTitle')}</SectionHeading>
                    <div className="flex flex-col gap-4">
                        {d.formulas.map((f, i) => (
                            <div key={i} className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
                                <h3 className="text-sm font-semibold text-white mb-3">{f.title}</h3>
                                <div className="overflow-x-auto mb-3">
                                    <Formula latex={FORMULA_LATEX[i]} fallback={f.expr} />
                                </div>
                                <p className="text-[13px] text-slate-400 leading-relaxed">{f.where}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Processing pipeline ─────────────────────────── */}
                <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-16">
                    <SectionHeading>{t('widgets.detail.pipelineTitle')}</SectionHeading>
                    <ol className="flex flex-col gap-3">
                        {d.pipeline.map((s, i) => (
                            <li key={i} className="flex gap-4 bg-white/[0.03] border border-white/8 rounded-2xl p-5">
                                <span
                                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                                    style={{ color: ACCENT, background: `${ACCENT}14`, border: `1px solid ${ACCENT}44` }}
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

                {/* ── Outputs ─────────────────────────────────────── */}
                <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-4">
                    <SectionHeading>{t('widgets.detail.outputsTitle')}</SectionHeading>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {d.outputs.map((o, i) => (
                            <div key={i} className="flex gap-3 bg-white/[0.03] border border-white/8 rounded-xl p-4">
                                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h3 className="text-sm font-semibold text-white leading-snug">{o.name}</h3>
                                    <p className="text-[13px] text-slate-400 leading-relaxed mt-0.5">{o.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
