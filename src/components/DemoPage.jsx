import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductVideo from './ProductVideo.jsx'
import { PRODUCT_VIDEOS, TOUR_CHAPTERS } from '../data/productVideos.js'

/** Full product tour, backed by the original same-origin MP4. */
export default function DemoPage() {
    const { t } = useTranslation()
    return (
        <section className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
            <Link to="/" className="text-xs text-neon-cyan hover:text-white">← {t('site.demo.back')}</Link>
            <p className="text-xs uppercase tracking-widest text-neon-cyan mt-8 mb-4">{t('site.demo.eyebrow')}</p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-5">{t('site.demo.title')}</h1>
            <p className="text-slate-400 max-w-3xl leading-relaxed mb-10">{t('site.demo.description')}</p>
            <ProductVideo video={PRODUCT_VIDEOS.tour} chapters={TOUR_CHAPTERS} priority />
            <p className="mt-8 text-sm text-slate-400 max-w-3xl leading-relaxed">{t('site.demo.scope')}</p>
        </section>
    )
}
