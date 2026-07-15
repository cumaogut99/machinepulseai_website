import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// ─── Stats Data ──────────────────────────────────────────────────────────────
// TODO: Update numbers as real data becomes available
export const STATS = [
    {
        id: 'speedup',
        value: 70,
        suffix: '%',
        en: {
            prefix: 'Up to ',
            label: 'Faster Analysis',
            sublabel: 'Compared with manual export-and-script workflows',
        },
        tr: {
            prefix: '%',
            label: 'Daha Hızlı Analiz',
            sublabel: 'Manuel dışa aktarma ve script iş akışlarına göre',
            suffix: '',
            valueFirst: false,
        },
        color: '#00f5ff',
    },
    {
        id: 'filesize',
        value: 200,
        suffix: ' GB+',
        en: {
            prefix: '',
            label: 'File Size Supported',
            sublabel: 'MPAI engine for very large recorded datasets',
        },
        tr: {
            prefix: '',
            label: 'Dosya Boyutu Desteği',
            sublabel: 'Çok büyük kayıtlı veri setleri için MPAI motoru',
        },
        color: '#3b82f6',
    },
    {
        id: 'visualization',
        value: 60,
        suffix: ' FPS',
        en: {
            prefix: '',
            label: 'Interactive Visualization',
            sublabel: 'Min-Max LOD rendering for dense signals',
        },
        tr: {
            prefix: '',
            label: 'Etkileşimli Görselleştirme',
            sublabel: 'Yoğun sinyaller için Min-Max LOD çizimi',
        },
        color: '#a855f7',
    },
    {
        id: 'ram',
        value: 8,
        suffix: ' GB',
        en: {
            prefix: '',
            label: 'Minimum RAM',
            sublabel: 'Runs large-scale analysis on standard laptops',
        },
        tr: {
            prefix: '',
            label: 'Minimum RAM',
            sublabel: 'Büyük ölçekli analizi standart dizüstülerde çalıştırır',
        },
        color: '#f59e0b',
        decimal: false,
    },
]

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ value, prefix = '', suffix = '', decimal = false, color }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    const motionValue = useMotionValue(0)
    const spring = useSpring(motionValue, { stiffness: 60, damping: 20 })
    const display = useTransform(spring, (v) =>
        decimal ? v.toFixed(1) : Math.floor(v).toString()
    )

    if (isInView) {
        motionValue.set(value)
    }

    return (
        <span ref={ref} className="tabular-nums" style={{ color }}>
            {prefix}
            <motion.span>{display}</motion.span>
            {suffix}
        </span>
    )
}

// ─── Stats Section ────────────────────────────────────────────────────────────
export default function Stats() {
    const { i18n } = useTranslation()
    const lang = i18n.language?.startsWith('tr') ? 'tr' : 'en'

    return (
        <section id="stats" className="relative py-20 overflow-hidden">
            {/* Separator line top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, staggerChildren: 0.1 }}
                >
                    {STATS.map((stat, i) => (
                        (() => {
                            const content = stat[lang] || stat.en
                            const prefix = content.prefix ?? stat.prefix ?? ''
                            const suffix = content.suffix ?? stat.suffix ?? ''
                            const valueFirst = content.valueFirst ?? true
                            return (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="flex flex-col items-center text-center gap-2"
                        >
                            <div className="text-4xl sm:text-5xl font-bold tracking-tight">
                                <AnimatedCounter
                                    value={stat.value}
                                    prefix={valueFirst ? prefix : ''}
                                    suffix={valueFirst ? suffix : ''}
                                    decimal={stat.decimal}
                                    color={stat.color}
                                />
                                {!valueFirst && (
                                    <span className="tabular-nums" style={{ color: stat.color }}>
                                        {prefix}
                                    </span>
                                )}
                            </div>
                            <div className="text-sm font-semibold text-white">{content.label}</div>
                            <div className="text-xs text-slate-500 leading-snug max-w-[160px]">{content.sublabel}</div>
                        </motion.div>
                            )
                        })()
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
