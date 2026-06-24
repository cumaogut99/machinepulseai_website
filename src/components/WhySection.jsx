import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// ─── Homepage "Problem → Why" narrative ─────────────────────────────────────────
// Surfaces the value proposition on the homepage so a first-time visitor gets the
// full story (problem, then the three core differentiators) without hunting the nav.

const WHY_CARDS = [
    {
        id: 'ai',
        accent: '#a855f7',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3-3-3z" />
        ),
    },
    {
        id: 'scale',
        accent: '#00f5ff',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
        ),
    },
    {
        id: 'secure',
        accent: '#3b82f6',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        ),
    },
]

export default function WhySection() {
    const { t } = useTranslation()

    return (
        <section id="why" className="relative py-10 px-6 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ── Problem statement ── */}
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-12"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block text-xs font-semibold text-[#f59e0b] tracking-widest uppercase mb-4">
                        {t('home.problem.eyebrow')}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                        {t('home.problem.title')}
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                        {t('home.problem.desc')}
                    </p>
                </motion.div>

                {/* ── Why cards ── */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">{t('home.whyTitle')}</h3>
                    <p className="text-sm text-slate-500">{t('home.whySubtitle')}</p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {WHY_CARDS.map((card) => (
                        <motion.div
                            key={card.id}
                            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                            className="card-hover-glow relative rounded-2xl border p-6 flex flex-col gap-3 overflow-hidden"
                            style={{ borderColor: `${card.accent}20`, background: `${card.accent}06` }}
                        >
                            <div
                                className="absolute top-0 left-0 right-0 h-px"
                                style={{ background: `linear-gradient(90deg, transparent, ${card.accent}60, transparent)` }}
                                aria-hidden="true"
                            />
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: `${card.accent}15`, color: card.accent, border: `1px solid ${card.accent}25` }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    {card.icon}
                                </svg>
                            </div>
                            <h4 className="text-base font-semibold text-white">{t(`home.why.${card.id}.title`)}</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">{t(`home.why.${card.id}.desc`)}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
