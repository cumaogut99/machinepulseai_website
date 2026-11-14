import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Phase 1 is what ships today; later phases are planned scope only. The split
// mirrors src/data/widgetRelease.js, which labels deferred modules by phase.
const PHASES = [
    { id: 'analysis', current: true },
    { id: 'acquisition' },
    { id: 'domains' },
]

/** Staged product scope as a vertical timeline (About page). */
export default function Roadmap() {
    const { t } = useTranslation()
    return (
        <section id="roadmap" className="py-14 px-6 border-t border-white/5" aria-labelledby="roadmap-title">
            <div className="max-w-5xl mx-auto">
                <div className="max-w-3xl mb-10">
                    <p className="text-xs uppercase tracking-widest text-neon-cyan mb-3">{t('site.roadmap.eyebrow')}</p>
                    <h2 id="roadmap-title" className="text-2xl sm:text-3xl font-bold mb-4">{t('site.roadmap.title')}</h2>
                    <p className="text-slate-400 leading-relaxed">{t('site.roadmap.description')}</p>
                </div>
                <ol className="relative border-l border-white/10 ml-3 flex flex-col gap-8">
                    {PHASES.map(({ id, current }) => (
                        <li key={id} className="relative pl-8 sm:pl-10">
                            <span aria-hidden="true"
                                className={`absolute -left-[7px] top-7 w-3.5 h-3.5 rounded-full border-2 ${current ? 'border-neon-cyan bg-neon-cyan/40 shadow-[0_0_12px_rgba(0,245,255,0.7)]' : 'border-slate-500 bg-[#0a0a0a]'}`} />
                            <article className={`rounded-2xl border p-6 sm:p-8 flex flex-col gap-4 ${current ? 'border-neon-cyan/30 bg-neon-cyan/[0.04]' : 'border-white/10 bg-white/[0.02]'}`}>
                                <span className={`text-xs font-semibold uppercase tracking-widest ${current ? 'text-neon-cyan' : 'text-slate-400'}`}>
                                    {t(`site.roadmap.phases.${id}.label`)}
                                </span>
                                <h3 className="text-xl sm:text-2xl font-semibold">{t(`site.roadmap.phases.${id}.title`)}</h3>
                                <p className="text-slate-300 leading-relaxed">{t(`site.roadmap.phases.${id}.description`)}</p>
                                <p className="text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">{t(`site.roadmap.phases.${id}.goal`)}</p>
                                {current && (
                                    <Link to="/widgets" className="text-sm text-neon-cyan hover:text-white focus-visible:outline focus-visible:outline-neon-cyan">
                                        {t('site.roadmap.link')} <span aria-hidden="true">→</span>
                                    </Link>
                                )}
                            </article>
                        </li>
                    ))}
                </ol>
                <p className="mt-6 text-xs text-slate-400">{t('site.roadmap.note')}</p>
            </div>
        </section>
    )
}
