import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import settingsChannels from '../../assets/fft-space-settings-channels.png'
import markersPeaks from '../../assets/fft-space-markers-peaks.png'
import compareResults from '../../assets/fft-space-compare-results.png'
import { FFTControlReference } from './FFTReference.jsx'

const VIEW_CONFIG = [
    {
        id: 'settings',
        image: settingsChannels,
        hotspots: [
            { left: '9%', top: '34%' },
            { left: '73%', top: '3%' },
            { left: '88%', top: '18%' },
            { left: '8%', top: '92%' },
        ],
    },
    {
        id: 'markers',
        image: markersPeaks,
        hotspots: [
            { left: '8%', top: '14%' },
            { left: '8%', top: '34%' },
            { left: '8%', top: '44%' },
            { left: '88%', top: '18%' },
        ],
    },
    {
        id: 'compare',
        image: compareResults,
        hotspots: [
            { left: '8%', top: '13%' },
            { left: '8%', top: '34%' },
            { left: '48%', top: '22%' },
            { left: '88%', top: '20%' },
        ],
    },
]

const CONTROL_GROUPS_BY_VIEW = {
    settings: [0, 1, 2, 3, 4, 5, 6, 10],
    markers: [0, 7, 9, 10],
    compare: [0, 6, 8, 9, 10],
}

export default function FFTInterfaceTour() {
    const { t } = useTranslation()
    const [activeViewIndex, setActiveViewIndex] = useState(0)
    const [activePointIndex, setActivePointIndex] = useState(0)
    const views = t('fftLearn.tour.views', { returnObjects: true })
    const view = views[activeViewIndex]
    const config = VIEW_CONFIG[activeViewIndex]
    const point = view.points[activePointIndex]

    const selectView = (index) => {
        setActiveViewIndex(index)
        setActivePointIndex(0)
    }

    return (
        <div>
            <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {t('fftLearn.tour.viewHint')}
                </p>
                <div
                    className="mt-3 flex gap-2 overflow-x-auto pb-1"
                    role="tablist"
                    aria-label={t('fftLearn.tour.viewHint')}
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

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
                <div>
                    <div className="relative overflow-hidden rounded-2xl border border-[#00f5ff]/20 bg-black shadow-2xl shadow-black/50">
                        <img
                            src={config.image}
                            alt={view.imageAlt}
                            className="block h-auto w-full"
                        />
                        {config.hotspots.map((position, index) => {
                            const selected = index === activePointIndex
                            return (
                                <button
                                    key={`${config.id}-${view.points[index].title}`}
                                    type="button"
                                    aria-label={`${index + 1}. ${view.points[index].title}`}
                                    aria-pressed={selected}
                                    onClick={() => setActivePointIndex(index)}
                                    className={`absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-bold transition sm:h-10 sm:w-10 sm:text-sm ${
                                        selected
                                            ? 'border-[#00f5ff] bg-[#00f5ff] text-black shadow-glow-cyan'
                                            : 'border-white/80 bg-black/80 text-white hover:border-[#00f5ff] hover:text-[#00f5ff]'
                                    }`}
                                    style={position}
                                >
                                    {index + 1}
                                </button>
                            )
                        })}
                    </div>
                    <p className="mt-3 text-xs leading-5 text-slate-500">
                        {t('fftLearn.tour.imageCaption')}
                    </p>
                </div>

                <div className="flex flex-col">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {t('fftLearn.tour.selectHint')}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold leading-8 text-white">
                        {view.title}
                    </h3>

                    <div className="mt-4 rounded-2xl border border-[#00f5ff]/25 bg-[#00f5ff]/[0.04] p-5">
                        <div className="flex items-start gap-3">
                            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#00f5ff] text-sm font-bold text-black">
                                {activePointIndex + 1}
                            </span>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#00f5ff]">
                                    {point.kicker}
                                </p>
                                <h4 className="mt-1 text-lg font-semibold leading-7 text-white">
                                    {point.title}
                                </h4>
                            </div>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-slate-300">
                            {point.description}
                        </p>
                        <div className="mt-5 border-l-2 border-[#00f5ff]/60 pl-3 text-xs leading-6 text-slate-400">
                            {point.check}
                        </div>
                    </div>

                    <div className="mt-3 grid gap-2">
                        {view.points.map((item, index) => (
                            <button
                                key={item.title}
                                type="button"
                                aria-pressed={index === activePointIndex}
                                onClick={() => setActivePointIndex(index)}
                                className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-xs transition ${
                                    index === activePointIndex
                                        ? 'border-[#00f5ff]/35 bg-[#00f5ff]/[0.05] text-white'
                                        : 'border-white/8 bg-white/[0.02] text-slate-500 hover:text-slate-300'
                                }`}
                            >
                                <span className="font-mono text-[#00f5ff]">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span>{item.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 border-t border-white/8 pt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00f5ff]">
                    {t('fftLearn.tour.referenceEyebrow')}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                    {t('fftLearn.reference.title')}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                    {t('fftLearn.reference.intro')}
                </p>
                <div className="mt-6">
                    <FFTControlReference
                        groupIndexes={CONTROL_GROUPS_BY_VIEW[config.id]}
                    />
                </div>
            </div>
        </div>
    )
}
