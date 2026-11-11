import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useContactModal } from '../context/ContactModalContext.jsx'
import ProductVideo from './ProductVideo.jsx'
import ProductTourLink from './ProductTourLink.jsx'
import { PRODUCT_VIDEOS } from '../data/productVideos.js'

// ─── Framer Motion Variants ─────────────────────────────────────────────────
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
        },
    },
}

const fadeUpVariant = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
    },
}

const mediaVariant = {
    hidden: { opacity: 0, y: 48, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.6 },
    },
}

// ─── Hero Component ─────────────────────────────────────────────────────────
export default function Hero() {
    const { t } = useTranslation();
    const { open: openContact } = useContactModal()

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-start pt-24 sm:pt-28 pb-12 px-6 overflow-hidden"
        >
            {/* ── Background Effects ─────────────────────────────── */}
            {/* Radial spotlight glow behind hero text */}
            <div className="absolute inset-0 bg-spotlight pointer-events-none" aria-hidden="true" />
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" aria-hidden="true" />
            {/* Bottom fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, transparent, #0a0a0a)',
                }}
                aria-hidden="true"
            />

            {/* ── Hero Text Block ────────────────────────────────── */}
            <motion.div
                className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Main Title */}
                <motion.h1
                    variants={fadeUpVariant}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
                >
                    {/* First line: plain white */}
                    <span className="block">{t('hero.title1')}</span>
                    {' '}
                    {/* Second line: neon gradient */}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-[#38bdf8] to-[#818cf8]">
                        {t('hero.title2')}
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={fadeUpVariant}
                    className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mb-8"
                >
                    {t('hero.subtitle')}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={fadeUpVariant}
                    className="flex max-w-full justify-center gap-2 sm:gap-4"
                >
                    {/* Primary CTA — opens contact modal */}
                    <button
                        id="hero-primary-cta"
                        onClick={openContact}
                        className="btn-neon inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#00f5ff]/8 text-[#00f5ff] font-semibold text-sm px-2.5 sm:px-7 py-3.5 rounded-xl"
                    >
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{t('hero.ctaPrimary')}</span>
                    </button>

                    {/* Secondary CTA opens the product preview section */}
                    <a
                        id="hero-secondary-cta"
                        href="#product-preview"
                        className="inline-flex items-center justify-center gap-1.5 sm:gap-2 text-sm text-slate-300 hover:text-white font-medium px-2.5 sm:px-5 py-3.5 rounded-xl border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-200"
                    >
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{t('hero.ctaSecondary')}</span>
                    </a>
                </motion.div>
            </motion.div>

            {/* ── Hero Media Area ────────────────────────────────── */}
            {/*
        Actual desktop recordings replace the former illustrative animation.
      */}
            <motion.div
                variants={mediaVariant}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full max-w-5xl mx-auto mt-10"
            >
                {/* Glow aura behind the media box */}
                <div
                    className="absolute inset-x-8 -top-6 h-20 blur-3xl opacity-30 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, #00f5ff, #3b82f6, #a855f7)' }}
                    aria-hidden="true"
                />

                <div id="product-preview" className="scroll-mt-24">
                    <div className="mb-6 flex justify-center">
                        <ProductTourLink />
                    </div>
                    <ProductVideo video={PRODUCT_VIDEOS.overview} priority />
                </div>
            </motion.div>
        </section>
    )
}
