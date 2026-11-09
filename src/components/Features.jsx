import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TourChapterLink from './TourChapterLink.jsx'
import dataImage from '../assets/widget-tours/file-reader--csv.webp'
import analysisImage from '../assets/widget-tours/fft-spectrum--compare.webp'
import reportImage from '../assets/widget-tours/intelligent-report--report.webp'

const FEATURES = [
    { id: 'prepare', image: dataImage, href: '/widgets/file-reader', chapterId: 'dataIO' },
    { id: 'analyze', image: analysisImage, href: '/widgets/fft-spectrum', chapterId: 'fft' },
    { id: 'report', image: reportImage, href: '/widgets/intelligent-report', chapterId: 'reports' },
    { id: 'engine', href: '/widgets', chapterId: 'dataIO' },
    { id: 'assistant', chapterId: 'assistant' },
    { id: 'privacy', chapterId: 'assistant' },
]

/** Share concise homepage benefits and detailed, illustrated product capabilities. */
export default function Features({ compact = false }) {
    const { t } = useTranslation()
    const cards = compact ? FEATURES.slice(0, 3) : FEATURES
    return (
        <section id={compact ? 'product-summary' : 'features'} className="relative py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl mb-8">
                    <p className="text-xs uppercase tracking-widest text-neon-cyan mb-3">{t('site.product.eyebrow')}</p>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t(`site.product.${compact ? 'homeTitle' : 'title'}`)}</h2>
                    <p className="text-slate-400 leading-relaxed">{t(`site.product.${compact ? 'homeDescription' : 'description'}`)}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {cards.map(({ id, image, href, chapterId }, index) => (
                        <article key={id} className="card-hover-glow rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden flex flex-col">
                            {image && (
                                <a href={image} target="_blank" rel="noreferrer" className="block focus-visible:outline focus-visible:outline-neon-cyan" aria-label={t('site.product.enlarge', { title: t(`site.product.cards.${id}.title`) })}>
                                    <img src={image} alt={t(`site.product.cards.${id}.alt`)} loading="lazy" width="1200" height="800" className={`w-full ${compact ? 'aspect-video' : 'aspect-[3/2]'} object-contain bg-black`} />
                                </a>
                            )}
                            <div className="p-6 flex flex-col gap-3 flex-1">
                                <span className="text-xs font-semibold text-neon-cyan tabular-nums" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                                <h3 className="text-lg font-semibold">{t(`site.product.cards.${id}.title`)}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{t(`site.product.cards.${id}.${compact ? 'summary' : 'description'}`)}</p>
                                {!compact && <p className="text-xs text-slate-400 border-t border-white/10 pt-3 leading-relaxed">{t(`site.product.cards.${id}.detail`)}</p>}
                                {!compact && <TourChapterLink chapterId={chapterId} />}
                                {!compact && href && (
                                    <Link to={href} className="mt-auto pt-3 text-sm text-neon-cyan hover:text-white focus-visible:outline focus-visible:outline-neon-cyan">
                                        {t(`site.product.cards.${id}.link`)} <span aria-hidden="true">→</span>
                                    </Link>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
                <p className="mt-4 text-xs text-slate-400">{t('site.product.screenshots')}</p>
                {compact && (
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
                        <Link to="/product" className="text-neon-cyan font-semibold hover:text-white">{t('site.product.explore')} <span aria-hidden="true">→</span></Link>
                        <Link to="/pricing" className="btn-neon rounded-xl px-5 py-3 text-center text-sm font-semibold text-neon-cyan">{t('site.product.packages')} <span aria-hidden="true">→</span></Link>
                    </div>
                )}
            </div>
        </section>
    )
}
