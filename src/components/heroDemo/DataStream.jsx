import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CHANNELS } from './constants.js'

/** Scrolling sensor data table */
export default function DataStream({ rows }) {
    const containerRef = useRef(null)
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [rows])

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">Live Sensor Feed</span>
                <span className="ml-auto text-[9px] text-slate-600">200 kHz</span>
            </div>

            {/* Channel labels */}
            <div className="grid px-3 py-1.5 border-b border-white/5"
                style={{ gridTemplateColumns: '3.5rem repeat(6, 1fr)' }}>
                <span className="text-[9px] text-slate-600">t(s)</span>
                {CHANNELS.map(ch => (
                    <span key={ch.key} className="text-[9px] font-semibold text-center"
                        style={{ color: ch.color + '99' }}>
                        {ch.label}
                    </span>
                ))}
            </div>

            {/* Scrolling rows */}
            <div className="flex-1 overflow-hidden relative">
                <div ref={containerRef} className="absolute inset-0 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                    {rows.map((row) => (
                        <motion.div
                            key={row.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="grid px-3 py-0.5 border-b border-white/[0.03] hover:bg-white/[0.02]"
                            style={{ gridTemplateColumns: '3.5rem repeat(6, 1fr)' }}
                        >
                            <span className="text-[9px] text-slate-600 tabular-nums">{row.t}</span>
                            {CHANNELS.map((ch, ci) => {
                                const val = row.vals[ci]
                                const isHot = ch.key === 'vib_z' && parseFloat(val) > 0.7
                                return (
                                    <span key={ch.key}
                                        className="text-[9px] tabular-nums font-mono text-center"
                                        style={{ color: isHot ? '#f59e0b' : ch.color + 'bb' }}>
                                        {val}
                                        {ch.unit && <span className="text-[7px] text-slate-600 ml-0.5">{ch.unit}</span>}
                                    </span>
                                )
                            })}
                        </motion.div>
                    ))}
                </div>
                {/* Fade out top */}
                <div className="absolute top-0 left-0 right-0 h-6 pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, #0d1117, transparent)' }} />
            </div>
        </div>
    )
}
