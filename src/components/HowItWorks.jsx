import { useTranslation } from 'react-i18next'
import TourChapterLink from './TourChapterLink.jsx'
import filterImage from '../assets/widget-tours/frequency-filter--graph.webp'

const STEPS = [
    { id: 'scope', chapterId: 'dataIO' },
    { id: 'prepare', chapterId: 'filters' },
    { id: 'inspect', chapterId: 'fft' },
    { id: 'finding', chapterId: 'fft' },
    { id: 'share', chapterId: 'reports' },
]

/** A concrete recorded-test workflow without fabricated numerical results. */
export default function HowItWorks() {
    const { t } = useTranslation()
    return (
        <section id="how-it-works" className="py-12 px-6 border-y border-white/5">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('site.product.workflow.title')}</h2>
                <p className="text-slate-400 max-w-3xl mb-8 leading-relaxed">{t('site.product.workflow.description')}</p>
                <ol className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
                    {STEPS.map(({ id, chapterId }, index) => (
                        <li key={id} className="rounded-xl border border-white/10 p-5 flex flex-col gap-3">
                            <p className="text-xs text-neon-cyan mb-4" aria-hidden="true">{String(index + 1).padStart(2, '0')}</p>
                            <h3 className="font-semibold mb-3">{t(`site.product.workflow.${id}.title`)}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{t(`site.product.workflow.${id}.description`)}</p>
                            <div className="mt-auto pt-2"><TourChapterLink chapterId={chapterId} /></div>
                        </li>
                    ))}
                </ol>
                <figure className="mt-8 grid lg:grid-cols-2 items-center gap-6 rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
                    <a href={filterImage} target="_blank" rel="noreferrer" aria-label={t('site.product.workflow.imageAlt')}>
                        <img src={filterImage} alt={t('site.product.workflow.imageAlt')} loading="lazy" className="w-full h-auto" width="1200" height="800" />
                    </a>
                    <figcaption className="p-6 lg:pl-0">
                        <h3 className="font-semibold mb-3">{t('site.product.workflow.resultTitle')}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{t('site.product.workflow.result')}</p>
                        <p className="text-xs text-slate-400 leading-relaxed mt-4">{t('site.product.workflow.scopeNote')}</p>
                    </figcaption>
                </figure>
            </div>
        </section>
    )
}
