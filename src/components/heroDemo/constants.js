// ─── HeroDemoAnimation shared configuration ─────────────────────────────────────
// Extracted so the main component and its panels share one source of truth.

// Phase durations (ms)
export const PHASE = {
    DATA_STREAM: 0,      // Phase 0: Data starts streaming immediately
    FFT_APPEAR: 2200,    // Phase 1: FFT chart fades in
    SPIKE_GROW: 4000,    // Phase 2: Anomaly spike appears on FFT
    CHAT_START: 5200,    // Phase 3: LLM starts typing
    LOOP_RESET: 11000,   // Loop restart
}

// Sensor channels displayed in the streaming table
export const CHANNELS = [
    { key: 'vib_x', label: 'VIB X', unit: 'g', base: 0.42, noise: 0.15, color: '#00f5ff', icon: '〜' },
    { key: 'vib_y', label: 'VIB Y', unit: 'g', base: 0.18, noise: 0.12, color: '#00f5ff', icon: '〜' },
    { key: 'vib_z', label: 'VIB Z', unit: 'g', base: 0.61, noise: 0.20, color: '#f59e0b', icon: '〜' },
    { key: 'pres', label: 'PRESS', unit: 'bar', base: 2.31, noise: 0.08, color: '#3b82f6', icon: '▲' },
    { key: 'temp', label: 'TEMP', unit: '°C', base: 87.4, noise: 1.2, color: '#a855f7', icon: '◆' },
    { key: 'rpm', label: 'RPM', unit: '', base: 4820, noise: 35, color: '#22c55e', icon: '⟳' },
]

// FFT frequency bins (0 → 10 kHz, 60 points)
export const FFT_BINS = 60
export const ANOMALY_BIN = 19 // ~3.2 kHz

// LLM chat dialogue typed out character by character
export const LLM_MESSAGES = [
    { role: 'user', text: 'Analyze vibration data — any anomalies?' },
    { role: 'agent', text: 'Scanning sensor streams across all channels...' },
    {
        role: 'agent',
        text: '⚠️ Anomaly detected at 3.2 kHz (Bin 19).\nAmplitude: 4.7g — exceeds nominal threshold (0.8g).\n\nDiagnosis: Bearing fault on Component B7.\nRecommendation: Schedule maintenance within 48 h.',
        highlight: true,
    },
]

// ─── Utilities ────────────────────────────────────────────────────────────────
export function randomVal(base, noise) {
    return (base + (Math.random() - 0.5) * 2 * noise).toFixed(
        base < 10 ? 2 : base < 100 ? 1 : 0
    )
}

export function buildFftBars(showSpike) {
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
