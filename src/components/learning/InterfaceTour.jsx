import { useState } from 'react'
import TourHotspot from './TourHotspot.jsx'

// Multi-view tour of a real application window. Each view is one state of the
// widget (a settings page plus a result tab); numbered hotspots on the capture
// select the explanation shown below it. Copy and coordinates arrive already
// localized from data/learning/interfaceTours.js.
export default function InterfaceTour({ views, labels, name }) {
    const [viewIndex, setViewIndex] = useState(0)
    const [pointIndex, setPointIndex] = useState(0)
    const view = views[viewIndex]
    const point = view.points[pointIndex] || view.points[0]

    const selectView = (index) => {
        setViewIndex(index)
        setPointIndex(0)
    }

    return (
        <div>
            <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{labels.viewHint}</p>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label={labels.viewHint}>
                    {views.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={index === viewIndex}
                            onClick={() => selectView(index)}
                            className={`whitespace-nowrap rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                                index === viewIndex
                                    ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                                    : 'border-white/10 bg-black/20 text-slate-400 hover:border-white/25 hover:text-white'
                            }`}
                        >
                            {item.tab}
                        </button>
                    ))}
                </div>
                {view.summary && <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-400">{view.summary}</p>}
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
                <figure>
                    <div className="relative overflow-hidden rounded-2xl border border-neon-cyan/20 bg-black shadow-2xl shadow-black/50">
                        <img
                            src={view.image}
                            alt={`${name} — ${view.tab}`}
                            width={view.width}
                            height={view.height}
                            loading="lazy"
                            decoding="async"
                            className="block h-auto w-full"
                        />
                        {view.points.map((item, index) => (
                            <TourHotspot
                                key={`${view.id}-${item.id}`}
                                number={index + 1}
                                label={item.title}
                                selected={index === pointIndex}
                                onSelect={() => setPointIndex(index)}
                                style={{ left: item.at[0], top: item.at[1] }}
                            />
                        ))}
                    </div>
                    <figcaption className="mt-3 text-xs leading-5 text-slate-500">{labels.caption}</figcaption>
                </figure>

                <div className="xl:sticky xl:top-32 xl:self-start">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{labels.regions}</p>
                    <div className="mt-3 grid gap-2">
                        {view.points.map((item, index) => (
                            <button
                                key={`${view.id}-index-${item.id}`}
                                type="button"
                                aria-pressed={index === pointIndex}
                                onClick={() => setPointIndex(index)}
                                className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-xs leading-5 transition ${
                                    index === pointIndex
                                        ? 'border-neon-cyan/40 bg-neon-cyan/[0.07] text-white'
                                        : 'border-white/8 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200'
                                }`}
                            >
                                <span className={`font-mono ${index === pointIndex ? 'text-neon-cyan' : 'text-slate-600'}`}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span>{item.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div aria-live="polite" className="mt-6 rounded-2xl border border-neon-cyan/25 bg-neon-cyan/[0.04] p-5 sm:p-7">
                <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-neon-cyan text-sm font-bold text-black">
                        {pointIndex + 1}
                    </span>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-neon-cyan">{view.tab}</p>
                        <h3 className="mt-1 text-xl font-semibold leading-8 text-white">{point.title}</h3>
                    </div>
                </div>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">{point.desc}</p>
            </div>
        </div>
    )
}
