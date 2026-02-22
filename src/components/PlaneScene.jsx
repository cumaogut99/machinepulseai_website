import { motion } from 'framer-motion'

// ── Sensor ping dots shown on the aircraft ─────────────────────────────────
const SENSOR_PINGS = [
    { id: 'eng1', cx: 158, cy: 108, label: 'ENG-L', color: '#00f5ff' },
    { id: 'eng2', cx: 220, cy: 108, label: 'ENG-R', color: '#00f5ff' },
    { id: 'vib', cx: 188, cy: 94, label: 'VIB', color: '#f59e0b' },
    { id: 'nose', cx: 280, cy: 98, label: 'AoA', color: '#a855f7' },
]

export default function PlaneScene() {
    return (
        <div className="absolute inset-0 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #060b18 0%, #0a1628 40%, #112244 100%)' }}
        >
            {/* ── Stars ───────────────────────────────────────────── */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }}>
                {[...Array(60)].map((_, i) => {
                    const x = ((i * 137.5) % 100)
                    const y = ((i * 97.3) % 60)
                    const r = i % 5 === 0 ? 1.2 : 0.6
                    return <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill="white" opacity={0.4 + (i % 3) * 0.2} />
                })}
            </svg>

            {/* ── Moon ───────────────────────────────────────────── */}
            <div className="absolute" style={{ top: '8%', right: '12%', width: 44, height: 44 }}>
                <svg viewBox="0 0 44 44" width="44" height="44">
                    <defs>
                        <radialGradient id="moonGrad" cx="40%" cy="40%">
                            <stop offset="0%" stopColor="#e8eaf6" />
                            <stop offset="100%" stopColor="#b0bec5" />
                        </radialGradient>
                    </defs>
                    <circle cx="22" cy="22" r="20" fill="url(#moonGrad)" />
                    <circle cx="30" cy="16" r="18" fill="#0a1628" />
                </svg>
            </div>

            {/* ── Moving clouds ───────────────────────────────────── */}
            {[
                { delay: 0, duration: 18, y: '18%', scale: 0.9, opacity: 0.18 },
                { delay: -6, duration: 22, y: '35%', scale: 1.2, opacity: 0.12 },
                { delay: -11, duration: 15, y: '25%', scale: 0.7, opacity: 0.10 },
            ].map((c, i) => (
                <motion.div
                    key={i}
                    className="absolute pointer-events-none"
                    style={{ top: c.y, left: 0 }}
                    animate={{ x: ['110%', '-40%'] }}
                    transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: 'linear' }}
                >
                    <svg width="280" height="80" viewBox="0 0 280 80"
                        style={{ opacity: c.opacity, transform: `scale(${c.scale})`, transformOrigin: 'left center' }}>
                        <defs>
                            <filter id={`blur${i}`}><feGaussianBlur stdDeviation="6" /></filter>
                        </defs>
                        <g filter={`url(#blur${i})`}>
                            <ellipse cx="80" cy="55" rx="80" ry="30" fill="white" />
                            <ellipse cx="140" cy="48" rx="70" ry="36" fill="white" />
                            <ellipse cx="210" cy="55" rx="75" ry="28" fill="white" />
                            <ellipse cx="120" cy="38" rx="50" ry="28" fill="white" />
                            <ellipse cx="170" cy="35" rx="45" ry="26" fill="white" />
                        </g>
                    </svg>
                </motion.div>
            ))}

            {/* ── Ground glow (horizon) ────────────────────────────── */}
            <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,100,200,0.08), transparent)' }} />

            {/* ── Aircraft flight path ─────────────────────────────── */}
            <motion.div
                className="absolute"
                style={{ top: '28%', left: 0, right: 0 }}
                initial={{ x: '-15%' }}
                animate={{ x: '105%' }}
                transition={{ duration: 5, ease: [0.2, 0.0, 0.8, 1.0], repeat: Infinity, repeatDelay: 1 }}
            >
                {/* Engine exhaust trails */}
                <motion.div
                    className="absolute"
                    style={{ right: '100%', top: '42%', display: 'flex', flexDirection: 'column', gap: 12, marginRight: -4 }}
                >
                    {[0, 1].map(i => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.7, 0.2, 0.7], scaleX: [1, 1.4, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                            style={{
                                width: 90, height: 5, borderRadius: 3,
                                background: 'linear-gradient(to left, transparent, rgba(180,200,255,0.5))',
                            }}
                        />
                    ))}
                </motion.div>

                {/* Aircraft SVG — detailed commercial jet */}
                <svg width="320" height="160" viewBox="0 0 320 160">
                    <defs>
                        <linearGradient id="fuselageGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#d0daea" />
                            <stop offset="45%" stopColor="#e8edf5" />
                            <stop offset="100%" stopColor="#8899bb" />
                        </linearGradient>
                        <linearGradient id="wingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#c0cce0" />
                            <stop offset="100%" stopColor="#7088aa" />
                        </linearGradient>
                        <linearGradient id="engineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#606878" />
                            <stop offset="40%" stopColor="#b0bac8" />
                            <stop offset="100%" stopColor="#505868" />
                        </linearGradient>
                        <radialGradient id="windowGrad" cx="40%" cy="35%">
                            <stop offset="0%" stopColor="#a0d4f8" />
                            <stop offset="100%" stopColor="#3070b8" />
                        </radialGradient>
                        <filter id="shadow" x="-10%" y="-10%" width="120%" height="140%">
                            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000" floodOpacity="0.35" />
                        </filter>
                    </defs>

                    <g filter="url(#shadow)">
                        {/* ── Main fuselage ── */}
                        <ellipse cx="178" cy="98" rx="118" ry="14" fill="url(#fuselageGrad)" />

                        {/* Nose cone */}
                        <path d="M296,98 Q318,98 320,97.5 Q318,99 296,99 Z" fill="#c8d4e4" />
                        <path d="M296,97.5 Q318,95 320,97.5 Q318,98 296,98 Z" fill="#d8e4f0" />

                        {/* Fuselage top dome */}
                        <ellipse cx="178" cy="93" rx="114" ry="10" fill="url(#fuselageGrad)" />
                        <ellipse cx="175" cy="89" rx="108" ry="7" fill="#dce8f4" />

                        {/* Cockpit windows */}
                        <ellipse cx="296" cy="91" rx="8" ry="5" fill="url(#windowGrad)" opacity="0.9" />
                        <ellipse cx="282" cy="90" rx="6" ry="4.5" fill="url(#windowGrad)" opacity="0.8" />

                        {/* Cabin windows */}
                        {[250, 235, 220, 205, 190, 175, 160, 145, 130].map((x, i) => (
                            <ellipse key={i} cx={x} cy="91" rx="4.5" ry="3.5" fill="url(#windowGrad)" opacity="0.75" />
                        ))}

                        {/* ── Main wings ── */}
                        <path d="M200,98 L250,98 L190,130 L160,125 Z" fill="url(#wingGrad)" />
                        <path d="M200,98 L250,98 L220,98 L178,96 Z" fill="#c8d8ec" />
                        <path d="M200,96 L250,96 L190,128 L160,123 Z" fill="#d0dff0" />

                        {/* Wing upswept tips */}
                        <path d="M160,125 L164,115 L170,120 Z" fill="#b8c8dc" />

                        {/* Wing fence / slats detail */}
                        <line x1="230" y1="98" x2="210" y2="117" stroke="#9aa8bc" strokeWidth="0.8" opacity="0.6" />
                        <line x1="218" y1="98" x2="200" y2="114" stroke="#9aa8bc" strokeWidth="0.8" opacity="0.6" />

                        {/* ── Horizontal stabilizers ── */}
                        <path d="M72,98 L100,98 L80,114 L60,110 Z" fill="url(#wingGrad)" />
                        <path d="M72,96 L100,96 L80,112 L60,108 Z" fill="#c8d8ec" />
                        <path d="M60,110 L63,104 L68,107 Z" fill="#b8c8dc" />

                        {/* ── Vertical tail ── */}
                        <path d="M78,98 L84,60 L96,70 L100,98 Z" fill="#ccd8e8" />
                        <path d="M78,97 L84,59 L96,69 L100,97 Z" fill="#d8e4f2" />
                        {/* Airline stripe on tail */}
                        <path d="M80,82 L86,64 L96,72 L98,80 Z" fill="#00c8ff" opacity="0.55" />

                        {/* ── Engines ── */}
                        {/* Left engine */}
                        <ellipse cx="213" cy="115" rx="16" ry="7" fill="url(#engineGrad)" />
                        <ellipse cx="215" cy="115" rx="14" ry="6" fill="#a8b4c4" />
                        <ellipse cx="226" cy="115" rx="4" ry="5.5" fill="#606870" />
                        <ellipse cx="202" cy="115" rx="5" ry="5" fill="#303840" />
                        <ellipse cx="202" cy="115" rx="3" ry="3" fill="#505860" />
                        {/* Engine pylon */}
                        <rect x="214" y="108" width="4" height="8" fill="#9aa4b4" />

                        {/* Right engine */}
                        <ellipse cx="172" cy="120" rx="14" ry="6.5" fill="url(#engineGrad)" />
                        <ellipse cx="174" cy="120" rx="12" ry="5.5" fill="#a0aab8" />
                        <ellipse cx="184" cy="120" rx="3.5" ry="5" fill="#606870" />
                        <ellipse cx="162" cy="120" rx="4.5" ry="4.5" fill="#303840" />
                        <ellipse cx="162" cy="120" rx="2.5" ry="2.5" fill="#505860" />
                        {/* Engine pylon */}
                        <rect x="173" y="113" width="3.5" height="8" fill="#9aa4b4" />

                        {/* ── NavLights ── */}
                        <circle cx="163" cy="124" r="2" fill="#ff4444" opacity="0.9" />
                        <circle cx="165" cy="124" r="3" fill="#ff6666" opacity="0.25" />
                        <circle cx="320" cy="97" r="2" fill="white" opacity="0.9" />

                        {/* ── Fuselage stripe (airline livery) ── */}
                        <path d="M80,93 Q200,87 310,95 Q310,97 80,97 Z" fill="#00c8ff" opacity="0.18" />
                        <path d="M80,95 Q200,90 310,96 Q310,97 80,97 Z" fill="#3b82f6" opacity="0.12" />
                    </g>
                </svg>

                {/* ── Sensor ping animations ───────────────────────────── */}
                <div className="absolute" style={{ top: 0, left: 0, width: 320, height: 160, pointerEvents: 'none' }}>
                    {SENSOR_PINGS.map((p) => (
                        <div key={p.id} className="absolute" style={{ left: p.cx, top: p.cy, transform: 'translate(-50%,-50%)' }}>
                            {/* Ripple */}
                            <motion.div
                                animate={{ scale: [0.5, 2.5], opacity: [0.8, 0] }}
                                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.6 }}
                                style={{
                                    position: 'absolute', top: '50%', left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    width: 16, height: 16, borderRadius: '50%',
                                    border: `1.5px solid ${p.color}`,
                                }}
                            />
                            {/* Core dot */}
                            <div style={{
                                width: 6, height: 6, borderRadius: '50%',
                                background: p.color,
                                boxShadow: `0 0 6px ${p.color}`,
                                position: 'relative', zIndex: 1,
                            }} />
                            {/* Label */}
                            <div style={{
                                position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)',
                                fontSize: 7, fontFamily: 'monospace', color: p.color,
                                whiteSpace: 'nowrap', letterSpacing: 1,
                                textShadow: `0 0 6px ${p.color}`,
                            }}>{p.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ── HUD overlay ─────────────────────────────────────── */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                    <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#00f5ff88', letterSpacing: 2 }}>
                        AEROSPACE SENSOR ACQUISITION
                    </span>
                    <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        style={{ fontFamily: 'monospace', fontSize: 9, color: '#00f5ff', letterSpacing: 2 }}
                    >
                        ● LIVE · 200 kHz
                    </motion.span>
                </div>

                {/* Live telemetry values */}
                <TelemetryBar />

                {/* Bottom bar */}
                <div className="flex items-center justify-between">
                    <span style={{ fontFamily: 'monospace', fontSize: 8, color: '#ffffff44', letterSpacing: 1 }}>
                        ALT 35,000 ft · M 0.84
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: 8, color: '#ffffff44' }}>
                        MachinePulseAI · Vibration Monitor
                    </span>
                </div>
            </div>
        </div>
    )
}

// ── Scrolling telemetry bar ────────────────────────────────────────────────
const CHANNELS = [
    { label: 'ENG-L VIB', color: '#00f5ff', base: 0.41, noise: 0.12 },
    { label: 'ENG-R VIB', color: '#00f5ff', base: 0.38, noise: 0.10 },
    { label: 'FRAME VIB', color: '#f59e0b', base: 0.62, noise: 0.18 },
    { label: 'AoA', color: '#a855f7', base: 4.2, noise: 0.3 },
    { label: 'G-LOAD', color: '#22c55e', base: 1.02, noise: 0.04 },
]

import { useState, useEffect } from 'react'

function TelemetryBar() {
    const [vals, setVals] = useState(CHANNELS.map(c => c.base.toFixed(2)))

    useEffect(() => {
        const iv = setInterval(() => {
            setVals(CHANNELS.map(c =>
                (c.base + (Math.random() - 0.5) * 2 * c.noise).toFixed(2)
            ))
        }, 220)
        return () => clearInterval(iv)
    }, [])

    return (
        <div className="flex items-center gap-4 flex-wrap">
            {CHANNELS.map((c, i) => (
                <div key={c.label} className="flex items-center gap-1.5">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.color, display: 'inline-block', boxShadow: `0 0 5px ${c.color}` }} />
                    <span style={{ fontFamily: 'monospace', fontSize: 8, color: c.color + 'bb', letterSpacing: 1 }}>{c.label}</span>
                    <motion.span
                        key={vals[i]}
                        initial={{ opacity: 0.4 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15 }}
                        style={{ fontFamily: 'monospace', fontSize: 9, color: c.color, letterSpacing: 1 }}
                    >
                        {vals[i]}
                    </motion.span>
                </div>
            ))}
        </div>
    )
}
