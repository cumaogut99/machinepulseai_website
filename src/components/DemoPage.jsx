import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductVideo from './ProductVideo.jsx'
import { PRODUCT_VIDEOS, TOUR_CHAPTERS } from '../data/productVideos.js'

/** Full product tour, backed by the original same-origin MP4. */
export default function DemoPage() {
    const { t } = useTranslation()
    return (
        <section className="max-w-7xl mx-auto px-6 pt-6 pb-10 sm:pt-8 sm:pb-12">
            <Link to="/" className="text-xs text-neon-cyan hover:text-white">← {t('site.demo.back')}</Link>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mt-5 mb-4">{t('site.demo.title')}</h1>
            <p className="text-slate-400 max-w-3xl leading-relaxed mb-6">{t('site.demo.description')}</p>
            <ProductVideo video={PRODUCT_VIDEOS.tour} chapters={TOUR_CHAPTERS} priority />
        </section>
    )
}
