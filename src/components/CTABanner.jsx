import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useContactModal } from '../context/ContactModalContext.jsx'

// ─── CTA Banner ───────────────────────────────────────────────────────────────

export default function CTABanner() {
    const { t } = useTranslation()
    const { open: openContact } = useContactModal()

    return (
        <section id="cta" className="relative py-10 px-6 overflow-hidden">
            {/* Background radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,245,255,0.08) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)',
                }}
                aria-hidden="true"
            />

            {/* Animated border grid lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b82f6]/20 to-transparent" />

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="flex flex-col items-center gap-6"
                >
                    {/* Label badge */}
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#00f5ff] border border-[#00f5ff]/30 bg-[#00f5ff]/5 rounded-full px-4 py-1.5 tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse" />
                        {t('cta.label')}
                    </span>

                    {/* Headline */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                        {t('cta.titleBefore')}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-[#38bdf8] to-[#818cf8]">
                            {t('cta.titleHighlight')}
                        </span>{' '}
                        {t('cta.titleAfter')}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
                        {t('cta.subtitle')}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                        <button
                            id="cta-primary"
                            onClick={openContact}
                            className="btn-neon inline-flex items-center gap-2 bg-[#00f5ff]/8 text-[#00f5ff] font-semibold text-sm px-8 py-4 rounded-xl"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {t('cta.primaryCta')}
                        </button>
                        <button
                            id="cta-secondary"
                            onClick={openContact}
                            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-200"
                        >
                            {t('cta.secondaryCta')}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>

                    {/* Trust line */}
                    <p className="text-xs text-slate-500 mt-2">
                        {t('cta.trustLine')}
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
