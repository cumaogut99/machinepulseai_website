import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// ─── Steps Data ───────────────────────────────────────────────────────────────
const STEPS = [
    {
        number: '01',
        tag: 'Import',
        title: 'Load Any Dataset',
        description:
            'Drag and drop your sensor data files — CSV, MPAI, or raw DAQ output. The out-of-core engine handles 100 GB+ files without RAM errors, even on standard hardware.',
        detail: 'Supports: CSV, MPAI, HDF5, MDF4, DIAdem TDM',
        color: '#00f5ff',
    },
    {
        number: '02',
        tag: 'Analyze',
        title: 'AI-Powered Processing',
        description:
            'Tell the Smart Engineering Assistant what you need — in plain English. The ML+LLM engine automatically runs FFT, filtering, anomaly detection, and statistical analysis.',
        detail: 'FFT · Vibration · Pressure · Temperature · RPM · Coherence',
        color: '#3b82f6',
    },
    {
        number: '03',
        tag: 'Visualize',
        title: 'Multi-Axis Live Charts',
        description:
            'Simultaneously compare dozens of sensor channels. Synchronized time-domain, frequency-domain, and waterfall plots update in real time at 60 FPS.',
        detail: 'Time series · FFT · Waterfall · Scatter · Histogram',
        color: '#a855f7',
    },
    {
        number: '04',
        tag: 'Report',
        title: 'One-Click Reports',
        description:
            'Generate professional PDF/HTML reports in minutes — not days. The RAG-powered assistant references past reports and technical documents to draft findings automatically.',
        detail: 'Was: 2–3 days → Now: minutes',
        color: '#f59e0b',
    },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
}
const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function HowItWorks() {
    const { t } = useTranslation()
    return (
        <section id="how-it-works" className="relative py-16 px-6 overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(0,245,255,0.04), transparent)' }}
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ── Header ── */}
                <motion.div
                    className="mb-12 max-w-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                    <span className="inline-block text-xs font-semibold text-[#00f5ff] tracking-widest uppercase mb-4">
                        {t('howItWorks.eyebrow')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                        {t('howItWorks.titleBefore')}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#3b82f6]">
                            {t('howItWorks.titleHighlight')}
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                        {t('howItWorks.subtitle')}
                    </p>
                </motion.div>

                {/* ── Steps ── */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {STEPS.map((step, index) => (
                        <motion.div
                            key={step.number}
                            variants={itemVariants}
                            className="relative group"
                        >
                            {/* Connector line */}
                            {index < STEPS.length - 1 && (
                                <div
                                    className="hidden lg:block absolute top-8 left-[calc(100%+0px)] w-6 h-px z-10"
                                    style={{ background: `linear-gradient(90deg, ${step.color}40, ${STEPS[index + 1].color}40)` }}
                                />
                            )}

                            <div className="card-hover-glow bg-white/[0.02] border border-white/8 rounded-2xl p-6 h-full flex flex-col gap-4 relative overflow-hidden">
                                {/* Top accent */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-px"
                                    style={{ background: `linear-gradient(90deg, transparent, ${step.color}50, transparent)` }}
                                    aria-hidden="true"
                                />

                                {/* Number + Tag */}
                                <div className="flex items-center justify-between">
                                    <span
                                        className="text-3xl font-black tracking-tighter opacity-20"
                                        style={{ color: step.color }}
                                    >
                                        {step.number}
                                    </span>
                                    <span
                                        className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
                                        style={{ color: step.color, background: `${step.color}15`, border: `1px solid ${step.color}25` }}
                                    >
                                        {step.tag}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-semibold text-white leading-snug">{step.title}</h3>

                                {/* Description */}
                                <p className="text-sm text-slate-400 leading-relaxed flex-1">{step.description}</p>

                                {/* Detail badge */}
                                <div
                                    className="text-[11px] font-medium rounded-lg px-3 py-2 leading-relaxed"
                                    style={{ background: `${step.color}08`, color: `${step.color}90`, border: `1px solid ${step.color}15` }}
                                >
                                    {step.detail}
                                </div>

                                {/* Hover glow overlay */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${step.color}06, transparent 70%)` }}
                                    aria-hidden="true"
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
