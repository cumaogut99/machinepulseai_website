import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const chartGeometry = (mass, stiffnessKn, damping) => {
    const omegaN = Math.sqrt(stiffnessKn * 1000 / mass)
    const criticalRpm = omegaN * 60 / (2 * Math.PI)
    const samples = Array.from({ length: 121 }, (_, index) => {
        const ratio = 0.05 + index * 2.15 / 120
        const response = ratio * ratio / Math.sqrt(
            (1 - ratio * ratio) ** 2 + (2 * damping * ratio) ** 2,
        )
        return { rpm: ratio * criticalRpm, response }
    })
    const peak = samples.reduce((best, point) => (
        point.response > best.response ? point : best
    ), samples[0])
    const yMax = Math.max(2, Math.min(8, peak.response * 1.15))
    const xMax = criticalRpm * 2.2
    const points = samples.map((point) => {
        const x = 70 + point.rpm / xMax * 610
        const y = 235 - Math.min(point.response, yMax) / yMax * 190
        return `${x.toFixed(1)},${y.toFixed(1)}`
    }).join(' ')
    return { criticalRpm, peak, yMax, xMax, points }
}

function Slider({ label, value, display, min, max, step, onChange }) {
    return (
        <label className="block">
            <span className="flex justify-between text-sm text-slate-300">
                <span>{label}</span>
                <span className="font-mono text-[#00f5ff]">{display}</span>
            </span>
            <input
                className="mt-3 w-full accent-[#00f5ff]"
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
            />
        </label>
    )
}

export default function RotorCriticalSpeedLab() {
    const { t } = useTranslation()
    const [mass, setMass] = useState(18)
    const [stiffness, setStiffness] = useState(520)
    const [damping, setDamping] = useState(0.08)
    const chart = useMemo(
        () => chartGeometry(mass, stiffness, damping),
        [mass, stiffness, damping],
    )

    return (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
                <div className="border-b border-white/10 p-6 sm:p-7 lg:border-b-0 lg:border-r">
                    <div className="space-y-7">
                        <Slider label={t('rotorLearn.speedLab.mass')} value={mass} display={`${mass} kg`} min="5" max="50" step="1" onChange={setMass} />
                        <Slider label={t('rotorLearn.speedLab.stiffness')} value={stiffness} display={`${stiffness} kN/m`} min="100" max="1500" step="10" onChange={setStiffness} />
                        <Slider label={t('rotorLearn.speedLab.damping')} value={damping} display={damping.toFixed(2)} min="0.03" max="0.30" step="0.01" onChange={setDamping} />
                    </div>
                    <dl className="mt-8 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-[#00f5ff]/20 bg-[#00f5ff]/[0.05] p-4">
                            <dt className="text-[11px] uppercase tracking-wider text-slate-500">{t('rotorLearn.speedLab.critical')}</dt>
                            <dd className="mt-2 font-mono text-lg text-[#00f5ff]">{Math.round(chart.criticalRpm).toLocaleString()} rpm</dd>
                        </div>
                        <div className="rounded-xl border border-[#a855f7]/20 bg-[#a855f7]/[0.04] p-4">
                            <dt className="text-[11px] uppercase tracking-wider text-slate-500">{t('rotorLearn.speedLab.peak')}</dt>
                            <dd className="mt-2 font-mono text-lg text-[#c084fc]">{chart.peak.response.toFixed(2)}×</dd>
                        </div>
                    </dl>
                </div>
                <div className="min-h-[25rem] bg-black/20 p-4 sm:p-6">
                    <p className="text-sm font-semibold text-white">{t('rotorLearn.speedLab.chartTitle')}</p>
                    <svg viewBox="0 0 720 280" role="img" aria-label={t('rotorLearn.speedLab.chartTitle')} className="mt-3 h-[21rem] w-full">
                        <defs>
                            <linearGradient id="responseArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#00f5ff" stopOpacity="0.25" />
                                <stop offset="1" stopColor="#00f5ff" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {[0, 1, 2, 3, 4].map((index) => (
                            <line key={index} x1="70" x2="680" y1={45 + index * 47.5} y2={45 + index * 47.5} stroke="rgba(148,163,184,0.12)" />
                        ))}
                        <line x1="70" x2="680" y1="235" y2="235" stroke="rgba(148,163,184,0.35)" />
                        <line x1="70" x2="70" y1="45" y2="235" stroke="rgba(148,163,184,0.35)" />
                        <line x1={70 + 610 / 2.2} x2={70 + 610 / 2.2} y1="45" y2="235" stroke="#a855f7" strokeOpacity="0.55" strokeDasharray="5 6" />
                        <polygon points={`70,235 ${chart.points} 680,235`} fill="url(#responseArea)" />
                        <polyline points={chart.points} fill="none" stroke="#00f5ff" strokeWidth="3" />
                        <text x={70 + 610 / 2.2 + 8} y="60" fill="#c084fc" fontSize="11">Nc</text>
                        <text x="375" y="270" fill="#64748b" fontSize="11" textAnchor="middle">{t('rotorLearn.speedLab.speedAxis')}</text>
                        <text x="19" y="140" fill="#64748b" fontSize="11" textAnchor="middle" transform="rotate(-90 19 140)">{t('rotorLearn.speedLab.responseAxis')}</text>
                        <text x="70" y="251" fill="#64748b" fontSize="10">0</text>
                        <text x="680" y="251" fill="#64748b" fontSize="10" textAnchor="end">{Math.round(chart.xMax).toLocaleString()}</text>
                    </svg>
                </div>
            </div>
            <div className="grid border-t border-white/10 md:grid-cols-3">
                {t('rotorLearn.speedLab.explain', { returnObjects: true }).map((item) => (
                    <article key={item.title} className="border-b border-white/8 p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 text-xs leading-6 text-slate-400">{item.body}</p>
                    </article>
                ))}
            </div>
            <div className="border-t border-[#a855f7]/15 bg-[#a855f7]/[0.035] px-6 py-5">
                <h3 className="text-sm font-semibold text-[#c084fc]">{t('rotorLearn.speedLab.realityTitle')}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-400">{t('rotorLearn.speedLab.reality')}</p>
            </div>
        </div>
    )
}
