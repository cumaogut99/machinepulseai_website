import { motion } from 'framer-motion'

// ─── CTA Banner ───────────────────────────────────────────────────────────────
// TODO: Update ctaHref and secondaryHref with real download/contact links

const CTA_CONTENT = {
    label: 'Early Access Now Open',
    title: 'Start analyzing smarter today',
    subtitle:
        'Join engineers from defense, aerospace, and automotive organizations who are cutting analysis time by up to 70%. Free Beta — no credit card required.',
    primaryCta: 'Download MachinePulseAI (Beta)',
    primaryHref: '#download',
    secondaryCta: 'Talk to the Team',
    secondaryHref: '#contact',
}

export default function CTABanner() {
    return (
        <section id="cta" className="relative py-28 px-6 overflow-hidden">
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
                        {CTA_CONTENT.label}
                    </span>

                    {/* Headline */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                        Start analyzing{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-[#38bdf8] to-[#818cf8]">
                            smarter
                        </span>{' '}
                        today
                    </h2>

                    {/* Subtitle */}
                    <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
                        {CTA_CONTENT.subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                        <a
                            id="cta-primary"
                            href={CTA_CONTENT.primaryHref}
                            className="btn-neon inline-flex items-center gap-2 bg-[#00f5ff]/8 text-[#00f5ff] font-semibold text-sm px-8 py-4 rounded-xl"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {CTA_CONTENT.primaryCta}
                        </a>
                        <a
                            id="cta-secondary"
                            href={CTA_CONTENT.secondaryHref}
                            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-200"
                        >
                            {CTA_CONTENT.secondaryCta}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>

                    {/* Trust line */}
                    <p className="text-xs text-slate-600 mt-2">
                        Windows 10/11 · Minimum 8 GB RAM · No internet required
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
