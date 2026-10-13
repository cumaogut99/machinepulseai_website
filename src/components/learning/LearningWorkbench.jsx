import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getWidgetScreenshot } from '../../data/learning/screenshots.js'

/** Real application window with numbered markers tied to the control list. */
function WorkbenchScreenshot({ shot, controls, selected, onSelect, name }) {
    const { t } = useTranslation()
    const labels = t('widgetLearn.common', { returnObjects: true })
    return <figure className="border-b border-white/10 p-3 sm:p-5">
        <div className="relative overflow-hidden rounded-2xl border border-neon-cyan/20 bg-black shadow-2xl shadow-black/50">
            <img src={shot.image} alt={t('widgetLearn.common.screenshotAlt', { name })} loading="lazy" decoding="async"
                width={shot.width} height={shot.height} className="block h-auto w-full" />
            {shot.hotspots.map((spot, index) => {
                if (!spot || !controls[index]) return null
                const active = selected === index
                return <button key={`${controls[index].name}-spot`} type="button"
                    aria-label={`${index + 1}. ${controls[index].name}`} aria-pressed={active}
                    onClick={() => onSelect(index)} style={{ left: spot[0], top: spot[1] }}
                    className={`absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[11px] font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan sm:h-9 sm:w-9 sm:text-sm ${active ? 'border-neon-cyan bg-neon-cyan text-black shadow-glow-cyan' : 'border-white/80 bg-black/80 text-white hover:border-neon-cyan hover:text-neon-cyan'}`}>
                    {index + 1}
                </button>
            })}
        </div>
        <figcaption className="mt-3 text-xs leading-5 text-slate-500">{labels.screenshotCaption}</figcaption>
    </figure>
}

/** Control tour: the real window when a capture exists, otherwise a conceptual guide. */
export default function LearningWorkbench({ widgetId, controls, inputs, outputs, name }) {
    const { t } = useTranslation()
    const labels = t('widgetLearn.common', { returnObjects: true })
    const [selected, setSelected] = useState(0)
    const panelId = useId()
    const current = controls[selected]
    const shot = getWidgetScreenshot(widgetId)
    return <div className="overflow-hidden rounded-3xl border border-neon-cyan/20 bg-black/25">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
            <p className="font-semibold text-white">{name}</p>
            <span className="text-xs text-neon-cyan">{shot ? labels.screenshotBadge : labels.badges[0]}</span>
        </div>
        {shot && <WorkbenchScreenshot shot={shot} controls={controls} selected={selected} onSelect={setSelected} name={name} />}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
            <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">{labels.controls}</h3>
                <div className="flex flex-col gap-2">
                    {controls.map((control, index) => <button key={control.name} type="button"
                        aria-pressed={selected === index} aria-controls={panelId}
                        onClick={() => setSelected(index)}
                        className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan ${selected === index ? 'border-neon-cyan/40 bg-neon-cyan/10 text-white' : 'border-white/10 bg-white/[0.025] text-slate-400 hover:text-white'}`}>
                        <span className="font-mono text-xs text-neon-cyan">{String(index + 1).padStart(2, '0')}</span>{control.name}
                    </button>)}
                </div>
            </div>
            <div className="min-w-0 p-5 sm:p-7">
                <div className="grid gap-3 sm:grid-cols-2">
                    {[{ title: labels.source, items: inputs }, { title: labels.result, items: outputs }].map((group) =>
                        <div key={group.title} className="min-w-0 rounded-xl border border-white/10 bg-white/[0.025] p-4">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">{group.title}</h3>
                            <ul className="mt-3 space-y-2">{group.items.map((item) => <li key={item.name} className="text-sm leading-6 text-slate-300">{item.name}</li>)}</ul>
                        </div>)}
                </div>
                <div id={panelId} aria-live="polite" aria-atomic="true" className="mt-5 rounded-2xl border border-neon-cyan/20 bg-neon-cyan/[0.035] p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-neon-cyan">{labels.selectedControl}</p>
                    <h3 className="mt-3 text-xl font-bold text-white">{current.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{current.desc}</p>
                </div>
                <p className="mt-4 text-xs leading-6 text-slate-400">{shot ? labels.screenshotIntro : labels.workspaceIntro}</p>
            </div>
        </div>
    </div>
}
