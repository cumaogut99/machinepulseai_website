import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion'

// ─── Configuration ────────────────────────────────────────────────────────────
// Phase durations (ms)
const PHASE = {
    DATA_STREAM: 0,      // Phase 0: Data starts streaming immediately
    FFT_APPEAR: 2200,   // Phase 1: FFT chart fades in
    SPIKE_GROW: 4000,   // Phase 2: Anomaly spike appears on FFT
    CHAT_START: 5200,   // Phase 3: LLM starts typing
    LOOP_RESET: 11000,  // Loop restart
}

// Sensor channels displayed in the streaming table
const CHANNELS = [
    { key: 'vib_x', label: 'VIB X', unit: 'g', base: 0.42, noise: 0.15, color: '#00f5ff', icon: '〜' },
    { key: 'vib_y', label: 'VIB Y', unit: 'g', base: 0.18, noise: 0.12, color: '#00f5ff', icon: '〜' },
    { key: 'vib_z', label: 'VIB Z', unit: 'g', base: 0.61, noise: 0.20, color: '#f59e0b', icon: '〜' },
    { key: 'pres', label: 'PRESS', unit: 'bar', base: 2.31, noise: 0.08, color: '#3b82f6', icon: '▲' },
    { key: 'temp', label: 'TEMP', unit: '°C', base: 87.4, noise: 1.2, color: '#a855f7', icon: '◆' },
    { key: 'rpm', label: 'RPM', unit: '', base: 4820, noise: 35, color: '#22c55e', icon: '⟳' },
]

// FFT frequency bins (0 → 10 kHz, 60 points)
const FFT_BINS = 60
const ANOMALY_BIN = 19 // ~3.2 kHz

// LLM chat dialogue typed out character by character
const LLM_MESSAGES = [
    { role: 'user', text: 'Analyze vibration data — any anomalies?' },
    { role: 'agent', text: 'Scanning sensor streams across all channels...' },
    {
        role: 'agent',
        text: '⚠️ Anomaly detected at 3.2 kHz (Bin 19).\nAmplitude: 4.7g — exceeds nominal threshold (0.8g).\n\nDiagnosis: Bearing fault on Component B7.\nRecommendation: Schedule maintenance within 48 h.',
        highlight: true,
    },
]

// ─── Utilities ────────────────────────────────────────────────────────────────
function randomVal(base, noise) {
    return (base + (Math.random() - 0.5) * 2 * noise).toFixed(
        base < 10 ? 2 : base < 100 ? 1 : 0
    )
}

function buildFftBars(showSpike) {
    return Array.from({ length: FFT_BINS }, (_, i) => {
        const isAnomaly = i === ANOMALY_BIN
        const isNearAnomaly = Math.abs(i - ANOMALY_BIN) <= 1
        if (isAnomaly && showSpike) return 0.88
        if (isNearAnomaly && showSpike) return 0.28 + Math.random() * 0.08
        // natural harmonic bumps
        const base = Math.max(0, 0.06 + 0.04 * Math.sin(i * 0.4) + Math.random() * 0.05)
        return Math.min(0.28, base)
    })
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Scrolling sensor data table */
function DataStream({ rows }) {
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
                    {rows.map((row, i) => (
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

/** SVG FFT chart with animated spike */
function FFTChart({ bars, showSpike, visible }) {
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

/** Typewriter text */
function Typewriter({ text, speed = 28, onDone }) {
    const [displayed, setDisplayed] = useState('')
    const [done, setDone] = useState(false)

    useEffect(() => {
        setDisplayed('')
        setDone(false)
        let i = 0
        const iv = setInterval(() => {
            i++
            setDisplayed(text.slice(0, i))
            if (i >= text.length) {
                clearInterval(iv)
                setDone(true)
                onDone?.()
            }
        }, speed)
        return () => clearInterval(iv)
    }, [text, speed])

    return (
        <span className="whitespace-pre-wrap">
            {displayed}
            {!done && <span className="inline-block w-0.5 h-3 bg-current ml-0.5 animate-pulse align-middle" />}
        </span>
    )
}

/** LLM chat panel */
function ChatPanel({ phase }) {
    const [visibleMessages, setVisibleMessages] = useState([])
    const [typingIdx, setTypingIdx] = useState(-1)

    useEffect(() => {
        if (phase < 3) {
            setVisibleMessages([])
            setTypingIdx(-1)
            return
        }
        // Show user message immediately
        setVisibleMessages([LLM_MESSAGES[0]])
        const t1 = setTimeout(() => {
            setVisibleMessages(LLM_MESSAGES.slice(0, 2))
            setTypingIdx(1)
        }, 600)
        const t2 = setTimeout(() => {
            setVisibleMessages(LLM_MESSAGES.slice(0, 3))
            setTypingIdx(2)
        }, 2200)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [phase])

    const msgContainerRef = useRef(null)
    useEffect(() => {
        if (msgContainerRef.current) {
            msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight
        }
    }, [visibleMessages])

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
                <div className="w-5 h-5 rounded-md bg-[#a855f7]/20 border border-[#a855f7]/30 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">Smart Assistant</span>
                <span className="ml-auto flex items-center gap-1 text-[9px] text-green-400">
                    <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                    online
                </span>
            </div>

            {/* Messages */}
            <div ref={msgContainerRef} className="flex-1 overflow-y-auto flex flex-col gap-2.5 px-3 py-3" style={{ scrollbarWidth: 'none' }}>
                <AnimatePresence>
                    {visibleMessages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.role === 'agent' && (
                                <div className="w-4 h-4 rounded-full bg-[#a855f7]/30 flex items-center justify-center flex-shrink-0 mr-1.5 mt-0.5">
                                    <span className="text-[6px] text-[#a855f7]">AI</span>
                                </div>
                            )}
                            <div
                                className={`max-w-[85%] rounded-xl px-3 py-2 text-[10px] leading-relaxed ${msg.role === 'user'
                                    ? 'bg-white/8 text-slate-300 rounded-br-sm'
                                    : msg.highlight
                                        ? 'bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] rounded-bl-sm'
                                        : 'bg-white/4 border border-white/8 text-slate-400 rounded-bl-sm'
                                    }`}
                            >
                                {i === typingIdx
                                    ? <Typewriter text={msg.text} speed={msg.highlight ? 18 : 30} />
                                    : <span className="whitespace-pre-wrap">{msg.text}</span>
                                }
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Input bar (decorative) */}
            <div className="px-3 pb-3">
                <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-1.5">
                    <span className="text-[9px] text-slate-600 flex-1">Ask about your data...</span>
                    <svg className="w-3 h-3 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

/** Source badge (aircraft or car) */
function SourceBadge({ icon, label, active }) {
    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-500 ${active
            ? 'border-[#00f5ff]/30 bg-[#00f5ff]/8 text-[#00f5ff]'
            : 'border-white/8 bg-white/[0.02] text-slate-500'
            }`}>
            <span className="text-base">{icon}</span>
            <div>
                <div className={`text-[9px] font-semibold ${active ? 'text-[#00f5ff]' : 'text-slate-500'}`}>{label}</div>
                {active && (
                    <div className="text-[7px] text-[#00f5ff]/60 flex items-center gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-[#00f5ff] animate-pulse inline-block" />
                        LIVE
                    </div>
                )}
            </div>
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroDemoAnimation() {
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
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1.8 }}
                        >
                            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center">
                                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
