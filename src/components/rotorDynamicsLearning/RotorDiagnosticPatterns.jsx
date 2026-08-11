import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function RotorDiagnosticPatterns() {
    const { t } = useTranslation()
    const [activeId, setActiveId] = useState('unbalance')
    const items = t('rotorLearn.diagnosticPatterns.items', {
        returnObjects: true,
    })
    const labels = t('rotorLearn.diagnosticPatterns.labels', {
        returnObjects: true,
    })
    const active = items.find((item) => item.id === activeId) || items[0]
    const rows = [
        { label: labels.signature, value: active.signature },
        { label: labels.corroborate, value: active.corroborate },
        { label: labels.challenge, value: active.challenge, warning: true },
    ]

    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-7">
            <p className="text-sm font-medium text-slate-300">
                {t('rotorLearn.diagnosticPatterns.prompt')}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {items.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        aria-pressed={item.id === activeId}
                        onClick={() => setActiveId(item.id)}
                        className={`rounded-xl border px-3 py-3 text-left text-xs font-semibold transition ${
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
                    <h3 className="text-xl font-semibold text-white">
                        {active.name}
                    </h3>
                </div>
                <dl className="divide-y divide-white/8">
                    {rows.map((row) => (
                        <div
                            key={row.label}
                            className={`grid gap-2 px-5 py-4 sm:grid-cols-[12rem_1fr] ${
                                row.warning ? 'bg-[#a855f7]/[0.04]' : ''
                            }`}
                        >
                            <dt className={`text-xs font-semibold uppercase tracking-wider ${
                                row.warning ? 'text-[#a855f7]' : 'text-slate-500'
                            }`}>
                                {row.label}
                            </dt>
                            <dd className="text-sm leading-7 text-slate-300">
                                {row.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>

            <p className="mt-5 border-l-2 border-[#00f5ff]/60 pl-4 text-xs leading-6 text-slate-400">
                {t('rotorLearn.diagnosticPatterns.note')}
            </p>
        </div>
    )
}
