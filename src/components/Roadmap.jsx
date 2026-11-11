import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Phase 1 is what ships today; later phases are planned scope only. The split
// mirrors src/data/widgetRelease.js, which labels deferred modules by phase.
const PHASES = [
    { id: 'analysis', current: true },
    { id: 'acquisition' },
    { id: 'domains' },
]

/** Staged product scope, readable without animation or JavaScript. */
export default function Roadmap() {
    const { t } = useTranslation()
    return (
        <section id="roadmap" className="relative py-12 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl mb-8">
                    <p className="text-xs uppercase tracking-widest text-neon-cyan mb-3">{t('site.roadmap.eyebrow')}</p>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('site.roadmap.title')}</h2>
                    <p className="text-slate-400 leading-relaxed">{t('site.roadmap.description')}</p>
                </div>
                <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {PHASES.map(({ id, current }) => (
                        <li
                            key={id}
                            className={`rounded-2xl border p-6 flex flex-col gap-3 ${current ? 'border-neon-cyan/30 bg-neon-cyan/[0.04]' : 'border-white/10 bg-white/[0.02]'}`}
                        >
                            <span className={`text-xs font-semibold uppercase tracking-widest ${current ? 'text-neon-cyan' : 'text-slate-400'}`}>
                                {t(`site.roadmap.phases.${id}.label`)}
                            </span>
                            <h3 className="text-lg font-semibold">{t(`site.roadmap.phases.${id}.title`)}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{t(`site.roadmap.phases.${id}.description`)}</p>
                            {current && (
                                <Link to="/widgets" className="mt-auto pt-3 text-sm text-neon-cyan hover:text-white focus-visible:outline focus-visible:outline-neon-cyan">
                                    {t('site.roadmap.link')} <span aria-hidden="true">→</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
                <p className="mt-4 text-xs text-slate-400">{t('site.roadmap.note')}</p>
            </div>
        </section>
    )
}
