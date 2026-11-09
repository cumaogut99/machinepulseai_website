import { useTranslation } from 'react-i18next'
import ProductVideo from './ProductVideo.jsx'
import ProductTourLink from './ProductTourLink.jsx'
import { PRODUCT_VIDEOS } from '../data/productVideos.js'

/** A concise introduction before the detailed product sections. */
export default function ProductIntroduction() {
    const { t } = useTranslation()
    return (
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-8">
            <p className="text-xs uppercase tracking-widest text-neon-cyan mb-4">{t('site.intro.eyebrow')}</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t('site.intro.title')}</h1>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-3xl">{t('site.intro.description')}</p>
            <div className="mb-6">
                <ProductTourLink />
            </div>
            <ProductVideo video={PRODUCT_VIDEOS.introduction} priority />
            <p className="text-xs text-slate-400 leading-relaxed border-t border-white/10 mt-8 pt-6">{t('site.contact.requirements')}</p>
        </section>
    )
}
