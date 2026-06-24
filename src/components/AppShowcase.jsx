import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import appWindow from '../assets/app-main-window.png'

// ─────────────────────────────────────────────────────────────────────────────
// AppShowcase — a real screenshot of the MachinePulseAI main window, framed as a
// browser/app chrome so visitors see the actual product (node-graph canvas, AI
// assistant panel, widget palette). Bilingual caption via i18n (appShowcase.*).
// ─────────────────────────────────────────────────────────────────────────────

export default function AppShowcase() {
    const { t } = useTranslation()

    return (
        <section id="app-showcase" className="relative py-10 px-6 overflow-hidden">
            {/* Background glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,245,255,0.07), transparent 70%)' }}
                aria-hidden="true"
            />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block text-xs font-semibold text-[#00f5ff] tracking-widest uppercase mb-4">
                        {t('appShowcase.eyebrow')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                        {t('appShowcase.title')}
                    </h2>
                    <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
                        {t('appShowcase.subtitle')}
                    </p>
                </motion.div>

                {/* Framed screenshot */}
                <motion.figure
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="relative"
                >
                    {/* Aura behind frame */}
                    <div
                        className="absolute inset-x-12 -top-6 h-24 blur-3xl opacity-30 pointer-events-none"
                        style={{ background: 'linear-gradient(90deg, #00f5ff, #3b82f6, #a855f7)' }}
                        aria-hidden="true"
                    />

                    <div className="hero-media-glow rounded-2xl overflow-hidden relative border border-white/8">
                        {/* App window chrome bar */}
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border-b border-white/8">
                            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                            <span className="ml-3 text-[11px] text-slate-500 font-medium tracking-wide">
                                MachinePulseAI — {t('appShowcase.windowTitle')}
                            </span>
                        </div>

                        {/* The real screenshot */}
                        <img
                            src={appWindow}
                            alt={t('appShowcase.alt')}
                            className="w-full h-auto block"
                            loading="lazy"
                        />
                    </div>

                    <figcaption className="text-center text-xs text-slate-500 mt-4">
                        {t('appShowcase.caption')}
                    </figcaption>
                </motion.figure>
            </div>
        </section>
    )
}
