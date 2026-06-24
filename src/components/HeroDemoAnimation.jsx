import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe.js'
import { PHASE, CHANNELS, randomVal, buildFftBars } from './heroDemo/constants.js'
import DataStream from './heroDemo/DataStream.jsx'
import FFTChart from './heroDemo/FFTChart.jsx'
import ChatPanel from './heroDemo/ChatPanel.jsx'
import SourceBadge from './heroDemo/SourceBadge.jsx'

// ─── Main Component ───────────────────────────────────────────────────────────
// A looping "live analysis" mockup for the hero. Sub-panels (data stream, FFT
// chart, chat) live in ./heroDemo/ to keep this file focused on orchestration.
export default function HeroDemoAnimation() {
    const reduceMotion = useReducedMotionSafe()
    const [rows, setRows] = useState([])
    const [phase, setPhase] = useState(0)
    const [fftBars, setFftBars] = useState(buildFftBars(false))
    const [showSpike, setShowSpike] = useState(false)
    const [fftVisible, setFftVisible] = useState(false)
    const [activeSource, setActiveSource] = useState(0) // 0=aircraft, 1=car
    const rowIdRef = useRef(0)
    const loopRef = useRef(null)
    const streamRef = useRef(null)
    const timeRef = useRef(0)

    const startLoop = useCallback(() => {
        // Reset
        setRows([])
        setPhase(0)
        setFftVisible(false)
        setShowSpike(false)
        setFftBars(buildFftBars(false))
        setActiveSource(0)
        timeRef.current = 0

        // Data stream every 220ms
        streamRef.current = setInterval(() => {
            timeRef.current += 0.22
            const t = timeRef.current.toFixed(2)
            const vals = CHANNELS.map(ch => randomVal(ch.base, ch.noise))
            rowIdRef.current++
            setRows(prev => {
                const next = [...prev, { id: rowIdRef.current, t, vals }]
                return next.length > 18 ? next.slice(next.length - 18) : next
            })
            // Alternate source badge
            if (rowIdRef.current % 7 === 0) setActiveSource(s => 1 - s)
        }, 220)

        // Phase 1: FFT appears
        const t1 = setTimeout(() => {
            setPhase(1)
            setFftVisible(true)
            setFftBars(buildFftBars(false))
        }, PHASE.FFT_APPEAR)

        // Phase 2: Spike
        const t2 = setTimeout(() => {
            setPhase(2)
            setShowSpike(true)
            setFftBars(buildFftBars(true))
        }, PHASE.SPIKE_GROW)

        // Phase 3: Chat
        const t3 = setTimeout(() => setPhase(3), PHASE.CHAT_START)

        // Loop
        loopRef.current = setTimeout(() => {
            clearInterval(streamRef.current)
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
            startLoop()
        }, PHASE.LOOP_RESET)
    }, [])

    useEffect(() => {
        startLoop()
        return () => {
            clearInterval(streamRef.current)
            clearTimeout(loopRef.current)
        }
    }, [startLoop])

    return (
        <div
            className="w-full h-full flex flex-col overflow-hidden rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #0d1117 0%, #0a0f1a 100%)', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
        >
            {/* ── Top bar ──────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-500">MachinePulseAI</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="text-[9px] text-slate-600">v0.9.1-beta</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[9px] text-green-400">Active</span>
                </div>
            </div>

            {/* ── Source badges ─────────────────────────────────────── */}
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5">
                <span className="text-[9px] text-slate-600 uppercase tracking-widest mr-1">Source:</span>
                <SourceBadge icon="✈️" label="Aerospace / Vibration Test" active={activeSource === 0} />
                <SourceBadge icon="🚗" label="Automotive / Chassis Test" active={activeSource === 1} />
                <div className="ml-auto flex items-center gap-1.5 text-[9px] text-[#00f5ff]/70">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Apache Arrow · Polars
                </div>
            </div>

            {/* ── Main 3-column layout ──────────────────────────────── */}
            <div className="flex-1 grid overflow-hidden" style={{ gridTemplateColumns: '1fr 1.1fr 1fr' }}>

                {/* Col 1: Data stream */}
                <div className="border-r border-white/5 overflow-hidden">
                    <DataStream rows={rows} />
                </div>

                {/* Col 2: FFT chart */}
                <div className="border-r border-white/5 overflow-hidden">
                    {fftVisible ? (
                        <FFTChart bars={fftBars} showSpike={showSpike} visible={fftVisible} />
                    ) : (
                        <motion.div
                            className="h-full flex flex-col items-center justify-center gap-3"
                            animate={reduceMotion ? { opacity: 0.5 } : { opacity: [0.3, 0.6, 0.3] }}
                            transition={reduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 1.8 }}
                        >
                            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center">
                                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <span className="text-[9px] text-slate-600">Buffering FFT...</span>
                        </motion.div>
                    )}
                </div>

                {/* Col 3: LLM chat */}
                <div className="overflow-hidden">
                    <ChatPanel phase={phase} />
                </div>
            </div>

            {/* ── Bottom status bar ─────────────────────────────────── */}
            <div className="flex items-center gap-4 px-4 py-2 border-t border-white/5">
                <div className="flex items-center gap-3 flex-1">
                    {[
                        { label: 'Channels', value: '6 active' },
                        { label: 'Sample rate', value: '200 kHz' },
                        { label: 'Buffer', value: `${rows.length * 220}ms` },
                        { label: 'RAM', value: '0.8 GB' },
                    ].map(s => (
                        <span key={s.label} className="text-[9px] text-slate-600">
                            <span className="text-slate-500">{s.label}:</span>{' '}
                            <span className="text-slate-400">{s.value}</span>
                        </span>
                    ))}
                </div>
                {phase >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f59e0b]/10 border border-[#f59e0b]/30"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
                        <span className="text-[9px] font-semibold text-[#f59e0b]">ANOMALY DETECTED</span>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
