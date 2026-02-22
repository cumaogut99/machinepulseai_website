import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// ── Sensor pings on the car body ────────────────────────────────────────────
const SENSOR_PINGS = [
    { id: 'susp-f', cx: 232, cy: 108, label: 'SUSP-F', color: '#00f5ff' },
    { id: 'susp-r', cx: 118, cy: 108, label: 'SUSP-R', color: '#00f5ff' },
    { id: 'eng', cx: 220, cy: 80, label: 'ENGINE', color: '#f59e0b' },
    { id: 'body', cx: 170, cy: 65, label: 'CHASSIS', color: '#a855f7' },
]

// ── Scenery trees that scroll past ─────────────────────────────────────────
function Tree({ x, y, h, color1, color2 }) {
    return (
        <g>
            {/* trunk */}
            <rect x={x - 3} y={y} width={6} height={h * 0.38} fill="#4a3820" rx={2} />
            {/* canopy layers */}
            <polygon points={`${x},${y - h * 0.6} ${x - h * 0.28},${y + h * 0.12} ${x + h * 0.28},${y + h * 0.12}`} fill={color1} />
            <polygon points={`${x},${y - h * 0.82} ${x - h * 0.21},${y - h * 0.22} ${x + h * 0.21},${y - h * 0.22}`} fill={color2} />
        </g>
    )
}

// ── Animated road stripes ───────────────────────────────────────────────────
function RoadStripes() {
    return (
        <motion.svg
            className="absolute bottom-0 left-0"
            style={{ width: '200%', height: '100%' }}
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            viewBox="0 0 1400 300"
            preserveAspectRatio="none"
        >
            {/* Centre dash */}
            {[...Array(16)].map((_, i) => (
                <rect key={i} x={i * 90} y={140} width={52} height={6} rx={3} fill="#f5f5f580" />
            ))}
            {/* Edge markings */}
            <rect x={0} y={108} width={1400} height={4} fill="#ffffff18" />
            <rect x={0} y={172} width={1400} height={4} fill="#ffffff18" />
        </motion.svg>
    )
}

// ── Live telemetry bar ───────────────────────────────────────────────────────
const CHANNELS = [
    { label: 'SUSP-F', color: '#00f5ff', base: 12.3, noise: 3.2 },
    { label: 'SUSP-R', color: '#00f5ff', base: 11.1, noise: 2.8 },
    { label: 'ENGINE', color: '#f59e0b', base: 0.38, noise: 0.11 },
    { label: 'CHASSIS', color: '#a855f7', base: 0.62, noise: 0.18 },
    { label: 'SPEED', color: '#22c55e', base: 120, noise: 2 },
]

function TelemetryBar() {
    const [vals, setVals] = useState(CHANNELS.map(c => c.base.toFixed(1)))

    useEffect(() => {
        const iv = setInterval(() => {
            setVals(CHANNELS.map(c =>
                (c.base + (Math.random() - 0.5) * 2 * c.noise).toFixed(1)
            ))
        }, 180)
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

// ── Main component ───────────────────────────────────────────────────────────
export default function CarScene() {
    return (
        <div
            className="absolute inset-0 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #1a0a2e 0%, #0e1a38 35%, #162244 65%, #1a2838 100%)' }}
        >
            {/* ── Sky gradient ───────────── */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(255,140,40,0.12) 0%, rgba(60,40,120,0.10) 50%, transparent 100%)' }} />

            {/* ── Stars ───────────────────── */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }}>
                {[...Array(50)].map((_, i) => {
                    const x = ((i * 143.7) % 100)
                    const y = ((i * 79.3) % 50)
                    return <circle key={i} cx={`${x}%`} cy={`${y}%`} r={i % 7 === 0 ? 1.1 : 0.55} fill="white" opacity={0.3 + (i % 4) * 0.18} />
                })}
            </svg>

            {/* ── City skyline (distant) ────── */}
            <svg className="absolute" style={{ bottom: '26%', left: 0, width: '100%', height: 80, opacity: 0.18 }} viewBox="0 0 900 80" preserveAspectRatio="xMidYMax slice">
                {[30, 95, 155, 200, 260, 310, 380, 430, 475, 540, 600, 660, 710, 770, 830, 870].map((x, i) => {
                    const h = 20 + (i * 17 + 13) % 52
                    const w = 22 + i % 14
                    return <rect key={i} x={x} y={80 - h} width={w} height={h} fill="#8899cc" rx={1} />
                })}
            </svg>

            {/* ── Scrolling scenery layer ─── */}
            <div className="absolute" style={{ top: '10%', left: 0, right: 0, height: '52%', overflow: 'hidden' }}>
                <motion.svg
                    style={{ width: '200%', height: '100%' }}
                    viewBox="0 0 1400 240"
                    preserveAspectRatio="xMidYMax slice"
                    animate={{ x: ['-50%', '0%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                >
                    {/* Left-side trees */}
                    {[0, 90, 190, 300, 420, 530, 640, 740, 850, 960, 1060, 1170, 1280, 1380].map((x, i) => (
                        <Tree key={i} x={x} y={220} h={55 + (i * 23) % 35}
                            color1={`hsl(${130 + (i * 17) % 30},40%,${22 + (i % 4) * 5}%)`}
                            color2={`hsl(${130 + (i * 13) % 25},45%,${28 + (i % 3) * 6}%)`}
                        />
                    ))}
                    {/* Right-side trees (bottom strip, mirrored) */}
                    {[50, 140, 250, 370, 485, 590, 700, 800, 910, 1010, 1120, 1230, 1330].map((x, i) => (
                        <Tree key={`r${i}`} x={x} y={240} h={38 + (i * 19) % 28}
                            color1={`hsl(${128 + (i * 11) % 22},38%,${20 + (i % 4) * 4}%)`}
                            color2={`hsl(${130 + (i * 9) % 20},42%,${26 + (i % 3) * 5}%)`}
                        />
                    ))}
                </motion.svg>
            </div>

            {/* ── Road ────────────────────── */}
            <div className="absolute" style={{ bottom: 0, left: 0, right: 0, height: '32%' }}>
                {/* Road surface */}
                <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, #1c2030 0%, #242838 100%)' }} />
                {/* Road edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                {/* Kerb strips */}
                {[...Array(32)].map((_, i) => (
                    <div key={i} className="absolute top-0"
                        style={{ left: `${i * 3.2}%`, width: '1.6%', height: 4, background: i % 2 === 0 ? '#ff443366' : '#33ff8866' }} />
                ))}
                <RoadStripes />
            </div>

            {/* ── Stationary car (centre frame) ── */}
            <div className="absolute" style={{ bottom: '18%', left: '50%', transform: 'translateX(-50%)' }}>
                <svg width="340" height="148" viewBox="0 0 340 148">
                    <defs>
                        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1e40af" />
                            <stop offset="48%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#0f2060" />
                        </linearGradient>
                        <linearGradient id="bodyTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b6ef5" />
                            <stop offset="100%" stopColor="#1e40af" />
                        </linearGradient>
                        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7bc8f8" stopOpacity="0.90" />
                            <stop offset="100%" stopColor="#1a6abf" stopOpacity="0.70" />
                        </linearGradient>
                        <radialGradient id="tyreGrad" cx="40%" cy="35%">
                            <stop offset="0%" stopColor="#484848" />
                            <stop offset="100%" stopColor="#101010" />
                        </radialGradient>
                        <radialGradient id="rimGrad" cx="40%" cy="35%">
                            <stop offset="0%" stopColor="#c0c8d8" />
                            <stop offset="100%" stopColor="#606878" />
                        </radialGradient>
                        <filter id="carShadow">
                            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.55" />
                        </filter>
                        <filter id="headlightGlow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    </defs>

                    <g filter="url(#carShadow)">
                        {/* ── Shadow on ground ── */}
                        <ellipse cx="170" cy="142" rx="135" ry="6" fill="#000" opacity="0.45" />

                        {/* ── Lower body / sill ── */}
                        <path d="M28,110 Q30,108 312,108 Q316,108 318,110 L316,120 Q314,122 26,122 Z"
                            fill="#0e2058" />

                        {/* ── Main body ── */}
                        <path d="M22,122 Q22,110 28,108 L312,108 Q318,108 318,122 L316,130 Q314,132 26,132 Z"
                            fill="url(#bodyGrad)" />
                        {/* Body highlight */}
                        <path d="M35,110 Q170,106 305,110 L305,112 Q170,108 35,112 Z"
                            fill="#4a7aff" opacity="0.4" />

                        {/* ── Roof ── */}
                        <path d="M108,108 Q115,72 132,62 L208,62 Q225,72 232,108 Z"
                            fill="url(#bodyTopGrad)" />
                        {/* Roof highlight */}
                        <path d="M118,105 Q125,78 138,68 L202,68 Q215,78 222,105 Z"
                            fill="#3b6ef5" opacity="0.5" />

                        {/* ── Windshield ── */}
                        <path d="M128,106 Q132,76 144,66 L196,66 Q208,76 212,106 Z"
                            fill="url(#glassGrad)" opacity="0.88" />
                        {/* Glare stripe */}
                        <path d="M136,105 Q140,82 148,70 L162,70 Q150,82 146,105 Z"
                            fill="white" opacity="0.22" />

                        {/* ── Side windows ── */}
                        <path d="M108,108 L128,108 L128,78 Q122,72 114,76 Q110,82 108,108 Z"
                            fill="url(#glassGrad)" opacity="0.80" />
                        <path d="M212,108 L232,108 L232,78 Q228,72 220,76 L212,108 Z"
                            fill="url(#glassGrad)" opacity="0.80" />
                        {/* Window pillars */}
                        <line x1="128" y1="108" x2="128" y2="68" stroke="#0e2058" strokeWidth="4" />
                        <line x1="212" y1="108" x2="212" y2="68" stroke="#0e2058" strokeWidth="4" />

                        {/* ── Door lines ── */}
                        <line x1="170" y1="108" x2="170" y2="130" stroke="#0e1a50" strokeWidth="1.5" opacity="0.7" />
                        <line x1="90" y1="110" x2="90" y2="130" stroke="#0e1a50" strokeWidth="1.5" opacity="0.5" />
                        <line x1="250" y1="110" x2="250" y2="130" stroke="#0e1a50" strokeWidth="1.5" opacity="0.5" />

                        {/* ── Door handles ── */}
                        {[130, 210].map(x => (
                            <rect key={x} x={x} y={119} width={16} height={4} rx={2} fill="#7090d0" opacity="0.7" />
                        ))}

                        {/* ── Front fascia ── */}
                        <path d="M295,108 Q316,108 318,122 L316,130 Q314,132 296,132 L295,132 Z"
                            fill="#111828" />
                        {/* Grille */}
                        <path d="M298,114 Q310,114 316,120 L316,126 Q310,126 298,126 Z"
                            fill="#0a1020" />
                        {[117, 120, 123].map(y => (
                            <line key={y} x1="300" y1={y} x2="315" y2={y} stroke="#2a3848" strokeWidth="1" />
                        ))}
                        {/* Logo placeholder */}
                        <circle cx="306" cy="120" r="5" fill="#1e3060" stroke="#4060a0" strokeWidth="1" />

                        {/* ── Headlights ── */}
                        <g filter="url(#headlightGlow)">
                            <path d="M298,108 Q316,108 317,116 L312,116 Q308,110 298,110 Z" fill="#ffe090" opacity="0.9" />
                            <ellipse cx="308" cy="113" rx="5" ry="3" fill="#fff8e0" opacity="0.95" />
                        </g>
                        {/* DRL strip */}
                        <path d="M296,108 L318,108 L318,109.5 Q310,110 296,109.5 Z" fill="#a0c8ff" opacity="0.7" />

                        {/* ── Rear ── */}
                        <path d="M22,108 Q24,108 28,108 L28,132 Q24,132 22,122 Z" fill="#111828" />
                        {/* Tail lights */}
                        <path d="M22,110 Q24,109 28,109 L28,116 Q24,116 22,116 Z" fill="#ff2222" opacity="0.9" />
                        <path d="M22,118 Q24,117 28,117 L28,122 Q24,122 22,122 Z" fill="#ff8800" opacity="0.8" />
                        {/* Reflector */}
                        <rect x="22" y="124" width="7" height="4" rx="1" fill="#eeeeee" opacity="0.6" />

                        {/* ── Wheels ── */}
                        {[75, 255].map((cx, i) => (
                            <g key={i}>
                                {/* Tyre */}
                                <circle cx={cx} cy={132} r={26} fill="url(#tyreGrad)" />
                                <circle cx={cx} cy={132} r={22} fill="#181818" />
                                {/* Rim */}
                                <circle cx={cx} cy={132} r={18} fill="url(#rimGrad)" />
                                {/* Spokes */}
                                {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
                                    const rad = a * Math.PI / 180
                                    return (
                                        <line key={a}
                                            x1={cx} y1={132}
                                            x2={cx + Math.cos(rad) * 16}
                                            y2={132 + Math.sin(rad) * 16}
                                            stroke="#8899b8" strokeWidth="2.5"
                                        />
                                    )
                                })}
                                <circle cx={cx} cy={132} r={5} fill="#c0c8d8" />
                                <circle cx={cx} cy={132} r={2.5} fill="#606878" />
                                {/* Tyre sidewall ring */}
                                <circle cx={cx} cy={132} r={25} fill="none" stroke="#303030" strokeWidth="1.5" />
                            </g>
                        ))}

                        {/* ── Wheel arches ── */}
                        <path d="M44,130 Q45,104 75,104 Q105,104 106,130 L44,130Z" fill="url(#bodyGrad)" />
                        <path d="M224,130 Q225,104 255,104 Q285,104 286,130 L224,130Z" fill="url(#bodyGrad)" />

                        {/* ── Side skirt ── */}
                        <rect x="105" y="126" width="120" height="6" rx="2" fill="#0e1840" />
                        <rect x="106" y="127" width="118" height="2" rx="1" fill="#2040a0" opacity="0.5" />

                        {/* ── Roof antenna ── */}
                        <line x1="200" y1="62" x2="203" y2="44" stroke="#a0b0d0" strokeWidth="1.2" />
                        <circle cx="203" cy="43" r="1.5" fill="#c0d0e8" />

                        {/* ── Side mirror ── */}
                        <path d="M108,88 Q104,88 103,92 L107,94 Q110,92 110,89 Z" fill="#1a3070" />
                        <path d="M232,88 Q236,88 237,92 L233,94 Q230,92 230,89 Z" fill="#1a3070" />
                    </g>
                </svg>

                {/* ── Sensor pings ── */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: 340, height: 148, pointerEvents: 'none' }}>
                    {SENSOR_PINGS.map(p => (
                        <div key={p.id} style={{ position: 'absolute', left: p.cx, top: p.cy, transform: 'translate(-50%,-50%)' }}>
                            <motion.div
                                animate={{ scale: [0.5, 2.5], opacity: [0.8, 0] }}
                                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.5 }}
                                style={{
                                    position: 'absolute', top: '50%', left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    width: 16, height: 16, borderRadius: '50%',
                                    border: `1.5px solid ${p.color}`,
                                }}
                            />
                            <div style={{
                                width: 6, height: 6, borderRadius: '50%',
                                background: p.color, boxShadow: `0 0 6px ${p.color}`,
                                position: 'relative', zIndex: 1,
                            }} />
                            <div style={{
                                position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)',
                                fontSize: 7, fontFamily: 'monospace', color: p.color,
                                whiteSpace: 'nowrap', letterSpacing: 1, textShadow: `0 0 6px ${p.color}`,
                            }}>{p.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── HUD overlay ── */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                <div className="flex items-center justify-between">
                    <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#00f5ff88', letterSpacing: 2 }}>
                        AUTOMOTIVE CHASSIS MONITORING
                    </span>
                    <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        style={{ fontFamily: 'monospace', fontSize: 9, color: '#00f5ff', letterSpacing: 2 }}
                    >
                        ● LIVE · 200 kHz
                    </motion.span>
                </div>

                <TelemetryBar />

                <div className="flex items-center justify-between">
                    <span style={{ fontFamily: 'monospace', fontSize: 8, color: '#ffffff44', letterSpacing: 1 }}>
                        SPEED 120 km/h · CHASSIS #CH-04
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: 8, color: '#ffffff44' }}>
                        MachinePulseAI · Chassis Monitor
                    </span>
                </div>
            </div>
        </div>
    )
}
