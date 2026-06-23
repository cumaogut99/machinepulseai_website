import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
    },
}

export default function KnowledgeBase() {
    const { t } = useTranslation();

    const topics = [
        {
            id: 'fft',
            icon: (
                <svg className="w-6 h-6 text-[#00f5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            )
        },
        {
            id: 'order',
            icon: (
                <svg className="w-6 h-6 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            id: 'filtering',
            icon: (
                <svg className="w-6 h-6 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
            )
        },
        {
            id: 'envelope',
            icon: (
                <svg className="w-6 h-6 text-[#facc15]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            )
        },
        {
            id: 'acoustics',
            icon: (
                <svg className="w-6 h-6 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.899a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
            )
        }
    ];

    return (
        <section className="relative py-24 px-6 overflow-hidden max-w-7xl mx-auto">
            {/* Background effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f5ff]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUpVariant}
                className="text-center mb-16 relative z-10"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    {t('knowledge.title')}
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    {t('knowledge.subtitle')}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {topics.map((topic, idx) => (
                    <motion.div
                        key={topic.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.5 } }
                        }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 card-hover-glow"
                    >
                        <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                            {topic.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                            {t(`knowledge.topics.${topic.id}.title`)}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {t(`knowledge.topics.${topic.id}.desc`)}
                        </p>
                    </motion.div>
                ))}
            </div>
            
            {/* Informational call to action block */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="mt-20 p-8 rounded-2xl border border-[#00f5ff]/20 bg-[#00f5ff]/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10"
            >
                <div>
                    <h4 className="text-lg font-bold text-white mb-2">Want to see these theories in action?</h4>
                    <p className="text-sm text-slate-400">MachinePulseAI automatically calculates and applies these concepts to your gigabytes of raw data in seconds.</p>
                </div>
                <button
                    onClick={() => window.openContactModal?.()}
                    className="btn-neon flex-shrink-0 text-sm font-semibold text-[#00f5ff] px-6 py-3 rounded-xl"
                >
                    {t('nav.getDemo')}
                </button>
            </motion.div>
        </section>
    )
}