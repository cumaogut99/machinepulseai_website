import { motion } from 'framer-motion'

// ─── Target Industries & Companies ────────────────────────────────────────────
// Source: DeepCube document — critical customer segments
// TODO: Add real partnership logos when agreements are in place

const INDUSTRIES = [
    {
        id: 'defense',
        name: 'Defense & Aerospace',
        color: '#00f5ff',
        icon: '🛡️',
        companies: ['TUSAŞ', 'TEI', 'ASELSAN', 'Roketsan', 'HAVELSAN'],
        stat: '~40% of product development time spent on test data analysis',
    },
    {
        id: 'automotive',
        name: 'Automotive',
        color: '#3b82f6',
        icon: '🚗',
        companies: ['Ford Otosan', 'Tofaş', 'Karsan'],
        stat: 'New vehicle cycles every 3–5 years demand faster prototype testing',
    },
    {
        id: 'energy',
        name: 'Energy & Heavy Industry',
        color: '#f59e0b',
        icon: '⚡',
        companies: ['Tüpraş', 'Erdemir'],
        stat: 'Wind turbine & generator vibration analysis at scale',
    },
]

// ─── Market Numbers ───────────────────────────────────────────────────────────
const MARKET_NUMBERS = [
    { label: 'TAM — Global CAE Market (2024)', value: '$11.2B', growth: '9.8% CAGR', color: '#00f5ff' },
    { label: 'SAM — T&M Software Niche (2025)', value: '$1.8B', growth: 'Focus segment', color: '#3b82f6' },
    { label: 'SOM — Priority TR Companies', value: '100+', growth: 'Defense · Auto · Energy', color: '#a855f7' },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function Targets() {
    return (
        <section id="targets" className="relative py-24 px-6 overflow-hidden">
            {/* Top separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ── Header ── */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="inline-block text-xs font-semibold text-[#f59e0b] tracking-widest uppercase mb-4">
                        Target Markets
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                        Built for high-stakes engineering
                    </h2>
                    <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
                        Trusted by engineers in sectors where data accuracy, speed, and security are mission-critical.
                    </p>
                </motion.div>

                {/* ── Industry Cards ── */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {INDUSTRIES.map((industry) => (
                        <motion.div
                            key={industry.id}
                            variants={itemVariants}
                            className="card-hover-glow rounded-2xl border p-6 flex flex-col gap-4 relative overflow-hidden group"
                            style={{ borderColor: `${industry.color}20`, background: `${industry.color}04` }}
                        >
                            <div
                                className="absolute top-0 left-0 right-0 h-px"
                                style={{ background: `linear-gradient(90deg, transparent, ${industry.color}50, transparent)` }}
                                aria-hidden="true"
                            />

                            {/* Header */}
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{industry.icon}</span>
                                <h3 className="text-base font-bold text-white">{industry.name}</h3>
                            </div>

                            {/* Company logos row (text-based) */}
                            <div className="flex flex-wrap gap-2">
                                {industry.companies.map((company) => (
                                    <span
                                        key={company}
                                        className="text-xs font-medium px-2.5 py-1 rounded-lg"
                                        style={{
                                            color: `${industry.color}cc`,
                                            background: `${industry.color}10`,
                                            border: `1px solid ${industry.color}20`,
                                        }}
                                    >
                                        {company}
                                    </span>
                                ))}
                                {/* TODO: Replace text badges with actual company logos when available */}
                            </div>

                            {/* Stat */}
                            <p className="text-xs text-slate-500 leading-relaxed border-t border-white/5 pt-4">
                                📊 {industry.stat}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── Market Size Numbers ── */}
                <motion.div
                    className="rounded-2xl border border-white/8 bg-white/[0.02] p-8"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-xs font-semibold text-slate-500 tracking-widest uppercase mb-6 text-center">
                        Market Opportunity
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {MARKET_NUMBERS.map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="flex flex-col items-center text-center gap-2"
                            >
                                <div className="text-3xl font-bold" style={{ color: item.color }}>{item.value}</div>
                                <div className="text-xs font-medium text-slate-400">{item.label}</div>
                                <div
                                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                    style={{ color: item.color, background: `${item.color}15` }}
                                >
                                    {item.growth}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom separator */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </section>
    )
}
