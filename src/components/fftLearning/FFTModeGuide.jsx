import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function FFTModeGuide() {
    const { t } = useTranslation()
    const [activeId, setActiveId] = useState('fft')
    const items = t('fftLearn.modes.items', { returnObjects: true })
    const labels = t('fftLearn.modes.labels', { returnObjects: true })
    const active = items.find((item) => item.id === activeId) || items[0]
    const rows = [
        { label: labels.question, value: active.question },
        { label: labels.use, value: active.use },
        { label: labels.start, value: active.start },
        { label: labels.trap, value: active.trap, warning: true },
    ]

    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-7">
            <p className="text-sm font-medium text-slate-300">
                {t('fftLearn.modes.prompt')}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {items.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        aria-pressed={item.id === activeId}
                        onClick={() => setActiveId(item.id)}
                        className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                            item.id === activeId
                                ? 'border-[#00f5ff] bg-[#00f5ff]/10 text-[#00f5ff]'
                                : 'border-white/10 bg-black/20 text-slate-400 hover:border-white/25 hover:text-white'
                        }`}
                    >
                        {item.tab}
                    </button>
                ))}
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                <div className="border-b border-white/10 px-5 py-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#00f5ff]">
                        {active.tab}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                        {active.name}
                    </h3>
                </div>
                <dl className="divide-y divide-white/8">
                    {rows.map((row) => (
                        <div
                            key={row.label}
                            className={`grid gap-2 px-5 py-4 sm:grid-cols-[9rem_1fr] ${
                                row.warning ? 'bg-[#a855f7]/[0.04]' : ''
                            }`}
                        >
                            <dt
                                className={`text-xs font-semibold uppercase tracking-wider ${
                                    row.warning
                                        ? 'text-[#a855f7]'
                                        : 'text-slate-500'
                                }`}
                            >
                                {row.label}
                            </dt>
                            <dd className="text-sm leading-6 text-slate-300">
                                {row.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}
