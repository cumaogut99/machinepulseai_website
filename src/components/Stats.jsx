import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

// ─── Stats Data ──────────────────────────────────────────────────────────────
// TODO: Update numbers as real data becomes available
export const STATS = [
    {
        id: 'speedup',
        value: 70,
        suffix: '%',
        prefix: 'Up to ',
        label: 'Faster Analysis',
        sublabel: 'vs. legacy tools like NI DIAdem & MATLAB',
        color: '#00f5ff',
    },
    {
        id: 'filesize',
        value: 100,
        suffix: ' GB+',
        prefix: '',
        label: 'File Size Supported',
        sublabel: 'Out-of-core engine — no RAM errors',
        color: '#3b82f6',
    },
    {
        id: 'samplerate',
        value: 200,
        suffix: ' kHz',
        prefix: '',
        label: 'Live Stream Rate',
        sublabel: 'Real-time DAQ at 60 FPS visualization',
        color: '#a855f7',
    },
    {
        id: 'market',
        value: 11.2,
        suffix: 'B',
        prefix: '$',
        label: 'TAM (CAE Market)',
        sublabel: 'Growing at 9.8% CAGR globally',
        color: '#f59e0b',
        decimal: true,
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
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                    decimal={stat.decimal}
                                    color={stat.color}
                                />
                            </div>
                            <div className="text-sm font-semibold text-white">{stat.label}</div>
                            <div className="text-xs text-slate-500 leading-snug max-w-[160px]">{stat.sublabel}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
