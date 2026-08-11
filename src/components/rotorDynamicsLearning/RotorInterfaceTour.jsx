import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import setupOrbit from '../../assets/rotor-space-setup-orbit.png'
import responseBode from '../../assets/rotor-space-response-bode.png'
import spectrumDirection from '../../assets/rotor-space-spectrum-direction.png'

const VIEW_CONFIG = [
    {
        id: 'setup',
        image: setupOrbit,
        hotspots: [
            { left: '8%', top: '10%' },
            { left: '10%', top: '21%' },
            { left: '10%', top: '40%' },
            { left: '10%', top: '51%' },
            { left: '63%', top: '2.5%' },
            { left: '91.5%', top: '17%' },
            { left: '9%', top: '95%' },
        ],
    },
    {
        id: 'response',
        image: responseBode,
        hotspots: [
            { left: '10%', top: '13%' },
            { left: '10%', top: '24%' },
            { left: '10%', top: '50%' },
            { left: '58%', top: '26%' },
            { left: '58%', top: '82%' },
            { left: '57%', top: '2.5%' },
        ],
    },
    {
        id: 'spectrum',
        image: spectrumDirection,
        hotspots: [
            { left: '9%', top: '12%' },
            { left: '10%', top: '24%' },
            { left: '10%', top: '39%' },
            { left: '58%', top: '30%' },
            { left: '72%', top: '2.5%' },
            { left: '94%', top: '2.5%' },
        ],
    },
]

export default function RotorInterfaceTour() {
    const { t } = useTranslation()
    const [activeViewIndex, setActiveViewIndex] = useState(0)
    const [activePointIndex, setActivePointIndex] = useState(0)
    const views = t('rotorLearn.interface.views', { returnObjects: true })
    const view = views[activeViewIndex]
    const config = VIEW_CONFIG[activeViewIndex]
    const pointCount = Math.min(config.hotspots.length, view.points.length)
    const points = view.points.slice(0, pointCount).map((point, index) => ({
        ...point,
        hotspot: config.hotspots[index],
    }))
    const point = points[activePointIndex] || points[0]

    const selectView = (index) => {
        setActiveViewIndex(index)
        setActivePointIndex(0)
    }

    return (
        <div>
            <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {t('rotorLearn.interface.viewHint')}
                </p>
                <div
                    className="mt-3 flex gap-2 overflow-x-auto pb-1"
                    role="tablist"
                    aria-label={t('rotorLearn.interface.viewHint')}
                >
                    {views.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={index === activeViewIndex}
                            onClick={() => selectView(index)}
                            className={`whitespace-nowrap rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                                index === activeViewIndex
                                    ? 'border-[#00f5ff] bg-[#00f5ff]/10 text-[#00f5ff]'
                                    : 'border-white/10 bg-black/20 text-slate-400 hover:border-white/25 hover:text-white'
                            }`}
                        >
                            {item.tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
                <div>
                    <div className="relative overflow-hidden rounded-2xl border border-[#00f5ff]/20 bg-black shadow-2xl shadow-black/50">
                        <img
                            src={config.image}
                            alt={view.imageAlt}
                            className="block h-auto w-full"
                        />
                        {points.map((item, index) => {
                            const selected = index === activePointIndex
                            return (
                                <button
                                    key={`${config.id}-hotspot-${item.title}`}
                                    type="button"
                                    aria-label={`${index + 1}. ${item.title}`}
                                    aria-pressed={selected}
                                    onClick={() => setActivePointIndex(index)}
                                    className={`absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[11px] font-bold transition sm:h-9 sm:w-9 sm:text-sm ${
                                        selected
                                            ? 'border-[#00f5ff] bg-[#00f5ff] text-black shadow-glow-cyan'
                                            : 'border-white/80 bg-black/80 text-white hover:border-[#00f5ff] hover:text-[#00f5ff]'
                                    }`}
                                    style={item.hotspot}
                                >
                                    {index + 1}
                                </button>
                            )
                        })}
                    </div>
                    <p className="mt-3 text-xs leading-5 text-slate-500">
                        {t('rotorLearn.interface.imageCaption')}
                    </p>
                </div>

                <div className="xl:sticky xl:top-32 xl:self-start">
                    <p className="text-xs leading-5 text-slate-500">
                        {t('rotorLearn.interface.selectHint')}
                    </p>
                    <div className="mt-4 grid gap-2">
                        {points.map((item, index) => (
                            <button
                                key={`${config.id}-index-${item.title}`}
                                type="button"
                                aria-pressed={index === activePointIndex}
                                onClick={() => setActivePointIndex(index)}
                                className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-xs leading-5 transition ${
                                    index === activePointIndex
                                        ? 'border-[#00f5ff]/40 bg-[#00f5ff]/[0.07] text-white'
                                        : 'border-white/8 bg-white/[0.02] text-slate-500 hover:border-white/20 hover:text-slate-300'
                                }`}
                            >
                                <span className={`font-mono ${
                                    index === activePointIndex
                                        ? 'text-[#00f5ff]'
                                        : 'text-slate-600'
                                }`}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span>{item.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#00f5ff]/25 bg-[#00f5ff]/[0.04] p-5 sm:p-7">
                <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#00f5ff] text-sm font-bold text-black">
                        {activePointIndex + 1}
                    </span>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#00f5ff]">
                            {point.kicker}
                        </p>
                        <h4 className="mt-1 text-xl font-semibold leading-8 text-white">
                            {point.title}
                        </h4>
                    </div>
                </div>
                <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
                    <p className="text-sm leading-7 text-slate-300">
                        {point.description}
                    </p>
                    <div className="border-l-2 border-[#00f5ff]/60 pl-4 text-xs leading-6 text-slate-400">
                        {point.check}
                    </div>
                </div>
                <div className="mt-6 border-t border-[#00f5ff]/15 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {t('rotorLearn.interface.controlsLabel')}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {point.controls.map((control) => (
                            <span
                                key={control}
                                className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs text-slate-300"
                            >
                                {control}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
