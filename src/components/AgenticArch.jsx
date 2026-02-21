import { motion } from 'framer-motion'

// ─── Agent Architecture Data ───────────────────────────────────────────────────
// Source: DeepCube document — "agentic" ML+LLM+RAG architecture description
// TODO: Update agent capability descriptions as the product evolves

const AGENT_CAPABILITIES = [
    {
        id: 'nlp-command',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
        title: 'Natural Language Commands',
        description:
            'Tell the assistant what to analyze in plain English. "Show me the FFT of channel 3 between 1kHz and 10kHz" executes instantly — no coding required.',
        color: '#00f5ff',
    },
    {
        id: 'rag-memory',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
        ),
        title: 'Corporate Memory (RAG)',
        description:
            'The assistant learns from your past test reports and technical documents. It acts as a digital mentor — referencing institutional knowledge to guide engineers through anomalies.',
        color: '#3b82f6',
    },
    {
        id: 'anomaly',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        title: 'Anomaly Detection (ML)',
        description:
            'Machine learning models trained on industry-standard datasets (CWRU, NASA Bearing) detect bearing faults, imbalance, and potential damage — validated at >0.95 F1-score.',
        color: '#a855f7',
    },
    {
        id: 'offline',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        title: '100% Offline & Secure',
        description:
            'All AI processing runs locally — no cloud, no data leaving your network. Designed for defense, aerospace, and automotive organizations where data security is non-negotiable.',
        color: '#22c55e',
    },
    {
        id: 'python-api',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        title: 'Open Python API',
        description:
            'Unlike black-box competitors, MachinePulseAI exposes a full Python API. Add your own algorithms, custom filters, and proprietary ML models directly into the analysis pipeline.',
        color: '#f59e0b',
    },
    {
        id: 'auto-report',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        title: 'Automated Reporting',
        description:
            'Generate professional engineering reports in PDF or HTML. The assistant cites relevant past findings and standards — turning 2–3 day reporting cycles into minutes.',
        color: '#ec4899',
    },
]

// ─── Architecture Diagram Labels ────────────────────────────────────────────
const ARCH_LAYERS = [
    { label: 'User Interface Layer', sublabel: 'PySide6 · Qt Widgets · Python API', color: '#00f5ff' },
    { label: 'AI Agent Layer', sublabel: 'LLM · RAG · Anomaly Detection (ML)', color: '#3b82f6' },
    { label: 'Data Engine Layer', sublabel: 'Apache Arrow · Polars · LOD · LTTB', color: '#a855f7' },
    { label: 'C++ Performance Core', sublabel: 'QCustomPlot · OpenGL · Signal Processing', color: '#ec4899' },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function AgenticArch() {
    return (
        <section id="agentic-architecture" className="relative py-28 px-6 overflow-hidden">
            {/* Background glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(59,130,246,0.07), transparent)' }}
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ── Header ── */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="inline-block text-xs font-semibold text-[#3b82f6] tracking-widest uppercase mb-4">
                        Smart Engineering Assistant
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                        The only platform with a{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899]">
                            built-in AI Agent
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
                        GlyphWorks, NI DIAdem, Flexpro, and Dewesoft don&apos;t have it. MachinePulseAI does.
                        A fully integrated ML + LLM + RAG system that understands your data — and your company&apos;s history.
                    </p>
                </motion.div>

                {/* ── Two-column layout: Capabilities + Architecture Diagram ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left: Capability Cards */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {AGENT_CAPABILITIES.map((cap) => (
                            <motion.div
                                key={cap.id}
                                variants={cardVariants}
                                className="card-hover-glow group bg-white/[0.02] border border-white/8 rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden"
                            >
                                <div
                                    className="absolute top-0 left-0 right-0 h-px"
                                    style={{ background: `linear-gradient(90deg, transparent, ${cap.color}40, transparent)` }}
                                    aria-hidden="true"
                                />
                                <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${cap.color}12`, color: cap.color, border: `1px solid ${cap.color}20` }}
                                >
                                    {cap.icon}
                                </div>
                                <h3 className="text-sm font-semibold text-white leading-snug">{cap.title}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">{cap.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right: Architecture Stack Diagram */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="flex flex-col gap-3"
                    >
                        <p className="text-xs font-semibold text-slate-500 tracking-widest uppercase mb-2">
                            System Architecture
                        </p>

                        {/* Stack layers */}
                        {ARCH_LAYERS.map((layer, i) => (
                            <motion.div
                                key={layer.label}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.5 }}
                                className="relative rounded-xl border p-4 flex items-center justify-between gap-4 group cursor-default"
                                style={{
                                    background: `${layer.color}05`,
                                    borderColor: `${layer.color}20`,
                                }}
                            >
                                {/* Left indicator */}
                                <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: layer.color }} />
                                <div className="flex-1">
                                    <div className="text-sm font-semibold text-white">{layer.label}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{layer.sublabel}</div>
                                </div>
                                {/* Layer number */}
                                <div
                                    className="text-xs font-bold opacity-30"
                                    style={{ color: layer.color }}
                                >
                                    L{i + 1}
                                </div>
                            </motion.div>
                        ))}

                        {/* Connector arrows */}
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="flex justify-center -mt-1 -mb-1">
                                <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        ))}

                        {/* Comparison callout */}
                        <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">vs. Competitors</p>
                            <div className="space-y-2">
                                {[
                                    { label: 'Natural Language Interface', us: true, them: false },
                                    { label: 'RAG Corporate Memory', us: true, them: false },
                                    { label: 'Offline AI (100% Secure)', us: true, them: false },
                                    { label: '100 GB+ File Support', us: true, them: false },
                                    { label: 'Open Python API', us: true, them: false },
                                ].map((row) => (
                                    <div key={row.label} className="flex items-center justify-between gap-4 text-xs">
                                        <span className="text-slate-400">{row.label}</span>
                                        <div className="flex items-center gap-4">
                                            <span className="text-green-400 font-semibold w-20 text-right">MachinePulseAI ✓</span>
                                            <span className="text-slate-600 w-20 text-right">Others ✗</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
