import { motion } from 'framer-motion'

// ─── Pricing Plans ─────────────────────────────────────────────────────────────
// One-time perpetual license per seat. Prices in USD.
// Source: ÜRÜN/HİZMET SATIŞ BEDELİ TABLOSU

const PLANS = [
    {
        id: 'mvp',
        name: 'Starter',
        badge: 'MVP',
        price: 2000,
        tagline: 'Base Package',
        description: 'Data integration, preprocessing, multi-channel visualization, and automated reporting. The fastest way to get insights from your test data.',
        color: '#00f5ff',
        highlight: false,
        features: [
            'Data integration & import (CSV, MPAI)',
            'Out-of-core preprocessing engine',
            'Multi-channel time-series visualization',
            'Automated PDF / HTML reports',
            'Windows 10/11 desktop app',
            'Free updates for 1 year',
        ],
        cta: 'Get Started',
    },
    {
        id: 'nlp',
        name: 'AI Assistant',
        badge: 'Base + NLP',
        price: 10000,
        tagline: 'Base Package + Data Processing + Natural Language Model',
        description: 'Everything in Starter plus a natural language interface. Ask questions in plain language, get instant data-driven answers and diagnoses.',
        color: '#a855f7',
        highlight: false,
        features: [
            'Everything in Starter',
            'Natural language data queries (LLM)',
            'AI-powered anomaly diagnosis',
            'RAG corporate memory integration',
            'Offline AI — fully air-gapped, no cloud',
            'Context-aware auto-generated reports',
        ],
        cta: 'Get AI Assistant',
    },
    {
        id: 'ml',
        name: 'ML Suite',
        badge: 'Base + ML',
        price: 10000,
        tagline: 'Base Package + Data Processing + Machine Learning',
        description: 'Everything in Starter plus production-grade machine learning for fault detection, frequency analysis, and predictive maintenance.',
        color: '#3b82f6',
        highlight: false,
        features: [
            'Everything in Starter',
            'FFT, PSD & Octave spectrum analysis',
            'ML-based fault & anomaly detection',
            'CWRU-validated models (>0.95 F1)',
            'Order tracking (RPM-based)',
            'Digital filtering (FIR / IIR)',
        ],
        cta: 'Get ML Suite',
    },
    {
        id: 'full',
        name: 'Full Platform',
        badge: '⭐ Full Package',
        price: 15000,
        tagline: 'Base Package + Data Processing + Machine Learning + Natural Language Model',
        description: 'The complete MachinePulseAI experience. ML-powered analysis combined with a natural language assistant — the ultimate engineering intelligence platform.',
        color: '#f59e0b',
        highlight: true,
        features: [
            'Everything in Starter',
            'Full ML Suite (FFT, fault detection, filters)',
            'Full NLP / LLM AI Assistant',
            'RAG corporate memory integration',
            'Offline AI — 100% secure, no cloud',
            'Priority support & onboarding',
        ],
        cta: 'Get Full Platform',
    },
]

const ENTERPRISE = {
    description: 'Full platform access with on-site deployment, custom integrations, unlimited seats, and NDA-covered offline LLM setup for classified or air-gapped environments.',
    features: [
        'All modules included — unlimited seats',
        'On-site deployment & hands-on training',
        'Custom API & data format integrations',
        'Classified / air-gapped LLM configuration',
        'Dedicated SLA & priority support',
        'Source code escrow available',
    ],
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function Pricing() {
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
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="inline-block text-xs font-semibold text-[#a855f7] tracking-widest uppercase mb-4">
                        Perpetual Licensing
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                        One-time license. Yours forever.
                    </h2>
                    <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
                        Pay once and own it. No subscriptions, no recurring fees.
                        Choose the capability bundle that fits your workflow.
                    </p>
                </motion.div>

                {/* ── Plans Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                    {PLANS.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className={`card-hover-glow relative rounded-2xl border p-6 flex flex-col gap-5 overflow-hidden ${plan.highlight ? 'ring-1 ring-[#f59e0b]/40' : ''}`}
                            style={{
                                borderColor: `${plan.color}${plan.highlight ? '40' : '20'}`,
                                background: `${plan.color}04`,
                            }}
                        >
                            {/* Top accent line */}
                            <div
                                className="absolute top-0 left-0 right-0 h-px"
                                style={{ background: `linear-gradient(90deg, transparent, ${plan.color}60, transparent)` }}
                                aria-hidden="true"
                            />
                            {plan.highlight && (
                                <div
                                    className="absolute inset-0 pointer-events-none rounded-2xl"
                                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${plan.color}08, transparent 60%)` }}
                                    aria-hidden="true"
                                />
                            )}

                            {/* Header row */}
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-base font-bold text-white">{plan.name}</h3>
                                        <span
                                            className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full"
                                            style={{ color: plan.color, background: `${plan.color}15`, border: `1px solid ${plan.color}25` }}
                                        >
                                            {plan.badge}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-500">{plan.tagline}</p>
                                </div>

                                {/* Price */}
                                <div className="text-right flex-shrink-0">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-white">
                                            ${plan.price.toLocaleString()}
                                        </span>
                                        <span className="text-slate-500 text-xs">USD</span>
                                    </div>
                                    <div className="text-[10px] text-slate-600 mt-0.5">per seat · one-time</div>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-slate-400 leading-relaxed">{plan.description}</p>

                            {/* Features */}
                            <ul className="flex flex-col gap-1.5 flex-1">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-xs text-slate-400">
                                        <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: plan.color }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <button
                                onClick={() => window.openContactModal?.()}
                                className="w-full text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 border hover:opacity-90"
                                style={{
                                    color: plan.color,
                                    borderColor: `${plan.color}40`,
                                    background: `${plan.color}08`,
                                }}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* ── Note ── */}
                <p className="text-center text-xs text-slate-600 mb-10">
                    All licenses include 1 year of free updates. Volume discounts available for 5+ seats.
                </p>

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
                            <span className="text-lg font-bold text-white">Enterprise &amp; Defense</span>
                            <span className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full text-green-400 bg-green-400/10 border border-green-400/20">
                                Custom Quote
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-5 max-w-xl leading-relaxed">{ENTERPRISE.description}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                            {ENTERPRISE.features.map((f) => (
                                <span key={f} className="flex items-center gap-1.5 text-xs text-slate-400">
                                    <svg className="w-3.5 h-3.5 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 md:min-w-[200px]">
                        <div className="text-2xl font-bold text-white">Contact Sales</div>
                        <p className="text-xs text-slate-500">Volume discounts &amp; multi-year agreements available</p>
                        <button
                            onClick={() => window.openContactModal?.()}
                            className="w-full text-sm font-semibold text-green-400 py-3 rounded-xl border border-green-400/30 bg-green-400/8 hover:bg-green-400/15 hover:border-green-400/50 transition-all duration-200"
                        >
                            Request a Demo
                        </button>
                        <a
                            href={`mailto:hello@machinepulseai.com?subject=Datasheet%20Request`}
                            className="w-full text-sm text-slate-400 hover:text-white py-2.5 rounded-xl border border-white/8 hover:border-white/20 hover:bg-white/5 transition-all duration-200 text-center block"
                        >
                            Download Datasheet
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
