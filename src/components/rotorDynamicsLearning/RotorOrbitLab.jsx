import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const pointString = (ratio, phaseDeg, direction) => {
    const sign = direction === 'cw' ? 1 : -1
    const phase = sign * phaseDeg * Math.PI / 180
    return Array.from({ length: 181 }, (_, index) => {
        const theta = index * Math.PI * 2 / 180
        const x = 240 + 145 * Math.cos(theta)
        const yPhysical = ratio * Math.cos(theta + phase)
        const y = 190 - 145 * yPhysical
        return `${x.toFixed(1)},${y.toFixed(1)}`
    }).join(' ')
}

function DirectionButton({ active, children, onClick }) {
    return (
        <button
            type="button"
            aria-pressed={active}
            onClick={onClick}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                active
                    ? 'border-[#00f5ff] bg-[#00f5ff]/10 text-[#00f5ff]'
                    : 'border-white/10 bg-black/20 text-slate-400 hover:text-white'
            }`}
        >
            {children}
        </button>
    )
}

export default function RotorOrbitLab() {
    const { t } = useTranslation()
    const [ratio, setRatio] = useState(0.72)
    const [phase, setPhase] = useState(72)
    const [shaftDirection, setShaftDirection] = useState('ccw')
    const [precession, setPrecession] = useState('ccw')
    const points = useMemo(
        () => pointString(ratio, phase, precession),
        [ratio, phase, precession],
    )
    const forward = shaftDirection === precession
    const shape = phase < 20 || phase > 160
        ? t('rotorLearn.orbitLab.lineLike')
        : ratio > 0.88 && phase > 75 && phase < 105
            ? t('rotorLearn.orbitLab.circular')
            : t('rotorLearn.orbitLab.elliptical')
    const refX = 240 + 145
    const refY = 190 - 145 * ratio * Math.cos((precession === 'cw' ? 1 : -1) * phase * Math.PI / 180)

    return (
        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[30rem] border-b border-white/10 bg-black/25 p-4 lg:border-b-0 lg:border-r">
                <svg
                    viewBox="0 0 480 380"
                    role="img"
                    aria-label={t('rotorLearn.orbitLab.title')}
                    className="h-full min-h-[28rem] w-full"
                >
                    <defs>
                        <linearGradient id="orbitStroke" x1="0" x2="1">
                            <stop offset="0" stopColor="#00f5ff" />
                            <stop offset="1" stopColor="#a855f7" />
                        </linearGradient>
                        <marker id="orbitArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#00f5ff" />
                        </marker>
                    </defs>
                    <g stroke="rgba(148,163,184,0.12)" strokeWidth="1">
                        {[-120, -60, 0, 60, 120].map((offset) => (
                            <line key={`v-${offset}`} x1={240 + offset} y1="35" x2={240 + offset} y2="335" />
                        ))}
                        {[-120, -60, 0, 60, 120].map((offset) => (
                            <line key={`h-${offset}`} x1="90" y1={190 + offset} x2="390" y2={190 + offset} />
                        ))}
                    </g>
                    <line x1="75" y1="190" x2="405" y2="190" stroke="rgba(148,163,184,0.35)" />
                    <line x1="240" y1="350" x2="240" y2="25" stroke="rgba(148,163,184,0.35)" />
                    <circle cx="240" cy="190" r="150" fill="none" stroke="rgba(168,85,247,0.16)" strokeDasharray="5 7" />
                    <polyline points={points} fill="rgba(0,245,255,0.035)" stroke="url(#orbitStroke)" strokeWidth="3" />
                    <circle cx={refX} cy={refY} r="6" fill="#0a0a0a" stroke="#fff" strokeWidth="2" />
                    <line
                        x1={precession === 'cw' ? 292 : 188}
                        y1="52"
                        x2={precession === 'cw' ? 330 : 150}
                        y2="73"
                        stroke="#00f5ff"
                        strokeWidth="2"
                        markerEnd="url(#orbitArrow)"
                    />
                    <text x="405" y="183" fill="#64748b" fontSize="11">X</text>
                    <text x="249" y="28" fill="#64748b" fontSize="11">Y</text>
                    <text x={Math.min(refX + 10, 330)} y={Math.max(refY - 10, 35)} fill="#cbd5e1" fontSize="10">
                        {t('rotorLearn.orbitLab.keyphasor')}
                    </text>
                </svg>
                <div className="absolute left-6 top-6 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-[#0a0a0a]/80 px-3 py-1 text-xs text-slate-300">
                        {shape}
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        forward
                            ? 'border-[#00f5ff]/30 bg-[#00f5ff]/10 text-[#00f5ff]'
                            : 'border-[#a855f7]/30 bg-[#a855f7]/10 text-[#c084fc]'
                    }`}>
                        {forward ? t('rotorLearn.orbitLab.forward') : t('rotorLearn.orbitLab.backward')}
                    </span>
                </div>
            </div>

            <div className="p-6 sm:p-7">
                <div>
                    <label className="flex justify-between text-sm text-slate-300">
                        <span>{t('rotorLearn.orbitLab.ratio')}</span>
                        <span className="font-mono text-[#00f5ff]">{ratio.toFixed(2)}</span>
                    </label>
                    <input className="mt-3 w-full accent-[#00f5ff]" type="range" min="0.15" max="1" step="0.01" value={ratio} onChange={(event) => setRatio(Number(event.target.value))} />
                </div>
                <div className="mt-7">
                    <label className="flex justify-between text-sm text-slate-300">
                        <span>{t('rotorLearn.orbitLab.phase')}</span>
                        <span className="font-mono text-[#00f5ff]">{phase}°</span>
                    </label>
                    <input className="mt-3 w-full accent-[#00f5ff]" type="range" min="5" max="175" step="1" value={phase} onChange={(event) => setPhase(Number(event.target.value))} />
                </div>
                <div className="mt-7">
                    <p className="text-sm text-slate-300">{t('rotorLearn.orbitLab.shaftDirection')}</p>
                    <div className="mt-3 flex gap-2">
                        <DirectionButton active={shaftDirection === 'cw'} onClick={() => setShaftDirection('cw')}>{t('rotorLearn.orbitLab.cw')}</DirectionButton>
                        <DirectionButton active={shaftDirection === 'ccw'} onClick={() => setShaftDirection('ccw')}>{t('rotorLearn.orbitLab.ccw')}</DirectionButton>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-sm text-slate-300">{t('rotorLearn.orbitLab.precession')}</p>
                    <div className="mt-3 flex gap-2">
                        <DirectionButton active={precession === 'cw'} onClick={() => setPrecession('cw')}>{t('rotorLearn.orbitLab.cw')}</DirectionButton>
                        <DirectionButton active={precession === 'ccw'} onClick={() => setPrecession('ccw')}>{t('rotorLearn.orbitLab.ccw')}</DirectionButton>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-6">
                    <h3 className="text-sm font-semibold text-white">{t('rotorLearn.orbitLab.readoutTitle')}</h3>
                    <ul className="mt-3 space-y-3">
                        {Object.values(t('rotorLearn.orbitLab.readouts', { returnObjects: true })).map((item) => (
                            <li key={item} className="flex gap-3 text-xs leading-5 text-slate-400">
                                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[#00f5ff]" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <p className="border-t border-[#a855f7]/15 bg-[#a855f7]/[0.035] px-6 py-4 text-xs leading-6 text-slate-400 lg:col-span-2">
                {t('rotorLearn.orbitLab.caution')}
            </p>
        </div>
    )
}
