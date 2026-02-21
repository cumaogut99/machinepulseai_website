import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Pricing Modules Data ─────────────────────────────────────────────────────
// TODO: Update prices, features, and module names before launch
// Licensing model: Modular — customers buy only the modules they need

const BASE_PLAN = {
    id: 'base',
    name: 'Core Platform',
    tag: 'Required',
    price: { monthly: 199, annual: 159 },
    description: 'The foundation. High-performance data engine, multi-axis visualization, and the desktop application.',
    features: [
        '100 GB+ file support (out-of-core engine)',
        'Multi-channel time-series visualization',
        '60 FPS live DAQ streaming',
        'LOD-based data thinning (LTTB)',
        'Basic CSV / MPAI import',
        'Windows 10/11 desktop app',
        'Free updates for 1 year',
    ],
    color: '#00f5ff',
    cta: 'Start with Core',
    highlight: false,
}

const MODULES = [
    {
        id: 'signal',
        tag: 'Add-on Module',
        name: 'Signal Analysis Suite',
        price: { monthly: 99, annual: 79 },
        description: 'Advanced frequency-domain and signal processing tools for vibration and acoustic engineers.',
        features: [
            'FFT, PSD, and Octave analysis',
            'Waterfall / 3D spectrum plots',
            'Digital filtering (FIR/IIR)',
            'Coherence & cross-correlation',
            'Order tracking (RPM-based)',
        ],
        color: '#3b82f6',
        highlight: false,
    },
    {
        id: 'ai-agent',
        tag: '⭐ Most Popular',
        name: 'Smart Engineering Assistant',
        price: { monthly: 149, annual: 119 },
        description: 'The AI brain of MachinePulseAI. Natural language commands, anomaly detection, and RAG-powered corporate memory.',
        features: [
            'Natural language data queries (LLM)',
            'ML-based anomaly & fault detection',
            'RAG corporate memory integration',
            'Auto-generated PDF/HTML reports',
            'Offline AI — 100% secure, no cloud',
            'CWRU-validated models (>0.95 F1)',
        ],
        color: '#a855f7',
        highlight: true,
    },
    {
        id: 'daq',
        tag: 'Add-on Module',
        name: 'Live DAQ & Acquisition',
        price: { monthly: 79, annual: 63 },
        description: 'Real-time data acquisition and live monitoring for connected test rigs and sensors.',
        features: [
            'Real-time 200 kHz acquisition',
            'NI, Dewesoft, HBK hardware support',
            'Multi-channel synchronization',
            'Trigger-based recording',
            'Live threshold alerts',
        ],
        color: '#f59e0b',
        highlight: false,
    },
]

const ENTERPRISE = {
    id: 'enterprise',
    name: 'Enterprise & Defense',
    description: 'Full platform access with priority support, on-site deployment, custom integrations, and NDA-covered offline LLM setup for classified environments.',
    features: [
        'All modules included',
        'Unlimited seats per site',
        'On-site deployment & training',
        'Custom Python API integrations',
        'Classified / air-gapped LLM setup',
        'Dedicated SLA support',
        'Source code escrow available',
    ],
    color: '#22c55e',
    targets: 'TUSAŞ · TEI · ASELSAN · Ford Otosan · Tofaş · Tüpraş',
}

export default function Pricing() {
    const [annual, setAnnual] = useState(true)

    return (
        <section id="pricing" className="relative py-28 px-6 overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(168,85,247,0.06), transparent)' }}
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ── Header ── */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="inline-block text-xs font-semibold text-[#a855f7] tracking-widest uppercase mb-4">
                        Modular Licensing
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                        Pay only for what you need
                    </h2>
                    <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed mb-8">
                        Start with the Core Platform. Add specialized modules as your workflow grows.
                        No feature bloat — no paying for tools you won&apos;t use.
                    </p>

                    {/* Billing toggle */}
                    <div className="inline-flex items-center gap-3 bg-white/5 rounded-full p-1 border border-white/10">
                        <button
                            onClick={() => setAnnual(false)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${!annual ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setAnnual(true)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${annual ? 'bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Annual
                            <span className="text-[10px] bg-[#a855f7]/30 text-[#a855f7] px-1.5 py-0.5 rounded-full font-semibold">-20%</span>
                        </button>
                    </div>
                </motion.div>

                {/* ── Base Plan ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 rounded-2xl border p-6 flex flex-col md:flex-row md:items-center gap-6 relative overflow-hidden"
                    style={{ borderColor: `${BASE_PLAN.color}25`, background: `${BASE_PLAN.color}05` }}
                >
                    <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{ background: `linear-gradient(90deg, transparent, ${BASE_PLAN.color}50, transparent)` }}
                        aria-hidden="true"
                    />
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-base font-bold text-white">{BASE_PLAN.name}</span>
                            <span className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full"
                                style={{ color: BASE_PLAN.color, background: `${BASE_PLAN.color}15`, border: `1px solid ${BASE_PLAN.color}25` }}>
                                {BASE_PLAN.tag}
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-4 max-w-xl">{BASE_PLAN.description}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                            {BASE_PLAN.features.map((f) => (
                                <span key={f} className="flex items-center gap-1.5 text-xs text-slate-400">
                                    <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: BASE_PLAN.color }} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 md:min-w-[160px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={annual ? 'annual' : 'monthly'}
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.2 }}
                                className="text-center"
                            >
                                <span className="text-3xl font-bold text-white">
                                    ${annual ? BASE_PLAN.price.annual : BASE_PLAN.price.monthly}
                                </span>
                                <span className="text-slate-500 text-sm">/mo</span>
                            </motion.div>
                        </AnimatePresence>
                        <button className="btn-neon w-full text-sm font-semibold text-[#00f5ff] py-2.5 rounded-xl">
                            {BASE_PLAN.cta}
                        </button>
                    </div>
                </motion.div>

                {/* ── Add-on Modules ── */}
                <p className="text-xs font-semibold text-slate-500 tracking-widest uppercase mb-4">
                    + Add-on Modules
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {MODULES.map((mod, i) => (
                        <motion.div
                            key={mod.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className={`card-hover-glow relative rounded-2xl border p-6 flex flex-col gap-4 overflow-hidden ${mod.highlight ? 'ring-1 ring-[#a855f7]/40' : ''
                                }`}
                            style={{ borderColor: `${mod.color}${mod.highlight ? '40' : '20'}`, background: `${mod.color}04` }}
                        >
                            <div
                                className="absolute top-0 left-0 right-0 h-px"
                                style={{ background: `linear-gradient(90deg, transparent, ${mod.color}60, transparent)` }}
                                aria-hidden="true"
                            />
                            {mod.highlight && (
                                <div
                                    className="absolute inset-0 pointer-events-none rounded-2xl"
                                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${mod.color}08, transparent 60%)` }}
                                    aria-hidden="true"
                                />
                            )}

                            {/* Tag */}
                            <span
                                className="text-[10px] font-semibold tracking-widest uppercase self-start px-2 py-0.5 rounded-full"
                                style={{ color: mod.color, background: `${mod.color}15`, border: `1px solid ${mod.color}25` }}
                            >
                                {mod.tag}
                            </span>

                            <div>
                                <h3 className="text-base font-bold text-white mb-1">{mod.name}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">{mod.description}</p>
                            </div>

                            {/* Price */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={annual ? 'a' : 'm'}
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 6 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className="text-2xl font-bold text-white">
                                        ${annual ? mod.price.annual : mod.price.monthly}
                                    </span>
                                    <span className="text-slate-500 text-xs">/mo · per seat</span>
                                </motion.div>
                            </AnimatePresence>

                            {/* Features */}
                            <ul className="flex flex-col gap-1.5 flex-1">
                                {mod.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-xs text-slate-400">
                                        <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: mod.color }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className="w-full text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 border"
                                style={{
                                    color: mod.color,
                                    borderColor: `${mod.color}40`,
                                    background: `${mod.color}08`,
                                }}
                            >
                                Add Module
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* ── Enterprise ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
                >
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-lg font-bold text-white">{ENTERPRISE.name}</span>
                            <span className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full text-green-400 bg-green-400/10 border border-green-400/20">
                                Custom Quote
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-5 max-w-xl leading-relaxed">{ENTERPRISE.description}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-1.5 mb-4">
                            {ENTERPRISE.features.map((f) => (
                                <span key={f} className="flex items-center gap-1.5 text-xs text-slate-400">
                                    <svg className="w-3.5 h-3.5 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {f}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-slate-600">
                            Target clients: <span className="text-slate-500">{ENTERPRISE.targets}</span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 md:min-w-[200px]">
                        <div className="text-2xl font-bold text-white">Contact Sales</div>
                        <p className="text-xs text-slate-500">Volume discounts & multi-year agreements available</p>
                        <button className="w-full text-sm font-semibold text-green-400 py-3 rounded-xl border border-green-400/30 bg-green-400/8 hover:bg-green-400/15 hover:border-green-400/50 transition-all duration-200">
                            {/* TODO: Link to contact form or Calendly */}
                            Request a Demo
                        </button>
                        <button className="w-full text-sm text-slate-400 hover:text-white py-2.5 rounded-xl border border-white/8 hover:border-white/20 hover:bg-white/5 transition-all duration-200">
                            Download Datasheet
                            {/* TODO: Link to PDF datasheet */}
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
