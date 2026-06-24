import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// ─── Target Industries & Companies ────────────────────────────────────────────
// Source: DeepCube document — critical customer segments

const INDUSTRIES = [
    {
        id: 'defense',
        name: 'Defense & Aerospace',
        color: '#00f5ff',
        icon: '🛡️',
        companies: ['TUSAŞ', 'TEI', 'ASELSAN', 'Roketsan', 'HAVELSAN'],
    },
    {
        id: 'automotive',
        name: 'Automotive',
        color: '#3b82f6',
        icon: '🚗',
        companies: ['Ford Otosan', 'Tofaş', 'Karsan'],
    },
    {
        id: 'energy',
        name: 'Energy & Heavy Industry',
        color: '#f59e0b',
        icon: '⚡',
        companies: ['Tüpraş', 'Erdemir'],
    },
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
    const { t } = useTranslation()
    return (
        <section id="targets" className="relative py-10 px-6 overflow-hidden">
            {/* Top separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ── Header ── */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="inline-block text-xs font-semibold text-[#f59e0b] tracking-widest uppercase mb-4">
                        {t('targets.eyebrow')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                        {t('targets.title')}
                    </h2>
                    <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
                        {t('targets.subtitle')}
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

                            {/* Company badges */}
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
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>

            {/* Bottom separator */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </section>
    )
}
