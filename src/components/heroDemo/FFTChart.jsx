import { motion, AnimatePresence } from 'framer-motion'
import { FFT_BINS, ANOMALY_BIN } from './constants.js'

/** SVG FFT chart with animated spike */
export default function FFTChart({ bars, showSpike, visible }) {
    const W = 280, H = 100
    const barW = W / FFT_BINS - 0.4

    // Build points for connecting line
    const linePoints = bars.map((b, i) => {
        const x = i * (W / FFT_BINS) + barW / 2
        const y = H - b * (H - 4)
        return `${x},${y}`
    }).join(' ')

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-full"
                >
                    {/* Header */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse" />
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">FFT Spectrum</span>
                        <span className="ml-auto text-[9px] text-slate-600">0–10 kHz</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-end px-3 pt-2 pb-2 relative">
                        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
                            {/* Grid lines */}
                            {[0.25, 0.5, 0.75].map(v => (
                                <line key={v}
                                    x1="0" y1={H - v * (H - 4)}
                                    x2={W} y2={H - v * (H - 4)}
                                    stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                            ))}

                            {/* Bars */}
                            {bars.map((b, i) => {
                                const x = i * (W / FFT_BINS)
                                const h = b * (H - 4)
                                const isAnomaly = i === ANOMALY_BIN && showSpike
                                return (
                                    <motion.rect
                                        key={i}
                                        x={x + 0.2}
                                        y={H - h}
                                        width={barW}
                                        height={h}
                                        rx={0.5}
                                        fill={isAnomaly ? '#f59e0b' : i === ANOMALY_BIN - 1 || i === ANOMALY_BIN + 1 ? '#f59e0b66' : '#00f5ff33'}
                                        initial={{ height: 0, y: H }}
                                        animate={{ height: h, y: H - h }}
                                        transition={{ duration: 0.4, delay: i * 0.008, ease: 'easeOut' }}
                                    />
                                )
                            })}

                            {/* Polyline on top */}
                            <polyline points={linePoints}
                                fill="none"
                                stroke={showSpike ? '#f59e0b88' : '#00f5ff44'}
                                strokeWidth="0.8" />

                            {/* Anomaly marker */}
                            {showSpike && (
                                <>
                                    <motion.line
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        x1={ANOMALY_BIN * (W / FFT_BINS) + barW / 2}
                                        y1={0}
                                        x2={ANOMALY_BIN * (W / FFT_BINS) + barW / 2}
                                        y2={H}
                                        stroke="#f59e0b"
                                        strokeWidth="0.5"
                                        strokeDasharray="2 2"
                                    />
                                    <motion.text
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        x={ANOMALY_BIN * (W / FFT_BINS) + barW / 2 + 2}
                                        y={8}
                                        fill="#f59e0b"
                                        fontSize="5"
                                        fontFamily="monospace"
                                    >
                                        3.2 kHz ▲4.7g
                                    </motion.text>
                                </>
                            )}
                        </svg>

                        {/* X axis labels */}
                        <div className="flex justify-between mt-1 px-0">
                            {['0', '2k', '4k', '6k', '8k', '10k'].map(l => (
                                <span key={l} className="text-[8px] text-slate-600">{l}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
