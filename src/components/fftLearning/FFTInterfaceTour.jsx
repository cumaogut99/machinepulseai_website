import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import settingsChannels from '../../assets/fft-space-settings-channels.png'
import markersPeaks from '../../assets/fft-space-markers-peaks.png'
import compareResults from '../../assets/fft-space-compare-results.png'
import { FFTControlCards } from './FFTReference.jsx'

// Each point pairs a hotspot position on the screenshot with the exact
// fftControls entries ([groupIndex, controlIndex]) that region contains, so the
// control reference is read next to the control instead of as one long list.
const VIEW_CONFIG = [
    {
        id: 'settings',
        image: settingsChannels,
        points: [
            {
                hotspot: { left: '5.2%', top: '6.8%' },
                controls: [[1, 0], [1, 1], [1, 2], [1, 3]],
            },
            {
                hotspot: { left: '6.6%', top: '21.1%' },
                controls: [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5]],
            },
            {
                hotspot: { left: '15%', top: '35.6%' },
                controls: [[3, 0], [3, 1]],
            },
            {
                hotspot: { left: '9.2%', top: '47.5%' },
                controls: [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6]],
            },
            {
                hotspot: { left: '8.8%', top: '62.3%' },
                controls: [[5, 0], [5, 1], [5, 2], [5, 3]],
            },
            {
                hotspot: { left: '75.6%', top: '4.9%' },
                controls: [[0, 1], [0, 0], [0, 2]],
            },
            {
                hotspot: { left: '88.5%', top: '5.9%' },
                controls: [[6, 0], [6, 1]],
            },
            {
                hotspot: { left: '4.2%', top: '92.9%' },
                controls: [[10, 0], [10, 1]],
            },
        ],
    },
    {
        id: 'markers',
        image: markersPeaks,
        points: [
            {
                hotspot: { left: '7.5%', top: '6.8%' },
                controls: [[7, 0], [7, 1]],
            },
            {
                hotspot: { left: '12%', top: '21.5%' },
                controls: [[7, 2], [7, 3]],
            },
            {
                hotspot: { left: '11%', top: '37.8%' },
                controls: [[7, 4]],
            },
            {
                hotspot: { left: '86.2%', top: '6.8%' },
                controls: [[9, 1], [9, 0]],
            },
        ],
    },
    {
        id: 'compare',
        image: compareResults,
        points: [
            {
                hotspot: { left: '9.2%', top: '6.8%' },
                controls: [[8, 0]],
            },
            {
                hotspot: { left: '14.8%', top: '22.7%' },
                controls: [[8, 1], [8, 2]],
            },
            {
                hotspot: { left: '50%', top: '24%' },
                controls: [[0, 1]],
            },
            {
                hotspot: { left: '90.9%', top: '6.8%' },
                controls: [[9, 2], [9, 0]],
            },
        ],
    },
]

export default function FFTInterfaceTour() {
    const { t } = useTranslation()
    const [activeViewIndex, setActiveViewIndex] = useState(0)
    const [activePointIndex, setActivePointIndex] = useState(0)
    const views = t('fftLearn.tour.views', { returnObjects: true })
    const view = views[activeViewIndex]
    const config = VIEW_CONFIG[activeViewIndex]
    const points = config.points.map((entry, index) => ({
        ...entry,
        ...view.points[index],
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
                                    key={`${config.id}-${item.title}`}
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
                        {t('fftLearn.tour.imageCaption')}
                    </p>
                </div>

                <div className="xl:sticky xl:top-32 xl:self-start">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {t('fftLearn.tour.selectHint')}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold leading-7 text-white">
                        {view.title}
                    </h3>
                    <div className="mt-4 grid gap-2">
                        {points.map((item, index) => (
                            <button
                                key={item.title}
                                type="button"
                                aria-pressed={index === activePointIndex}
                                onClick={() => setActivePointIndex(index)}
                                className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-xs leading-5 transition ${
                                    index === activePointIndex
                                        ? 'border-[#00f5ff]/40 bg-[#00f5ff]/[0.07] text-white'
                                        : 'border-white/8 bg-white/[0.02] text-slate-500 hover:border-white/20 hover:text-slate-300'
                                }`}
                            >
                                <span
                                    className={`font-mono ${
                                        index === activePointIndex
                                            ? 'text-[#00f5ff]'
                                            : 'text-slate-600'
                                    }`}
                                >
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

                <div className="mt-7 border-t border-[#00f5ff]/15 pt-6">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {t('fftLearn.tour.controlsLabel')}
                    </p>
                    <FFTControlCards refs={point.controls} />
                </div>
            </div>
        </div>
    )
}
