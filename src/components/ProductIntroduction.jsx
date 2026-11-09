import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductVideo from './ProductVideo.jsx'
import { getTourChapter, PRODUCT_VIDEOS, TOUR_CHAPTERS } from '../data/productVideos.js'

/** A concise introduction before the detailed product sections. */
export default function ProductIntroduction() {
    const { t } = useTranslation()
    const [params] = useSearchParams()
    const section = useRef(null)
    const chapter = getTourChapter(params.get('chapter'))
    useEffect(() => {
        if (chapter) section.current?.scrollIntoView({ block: 'start' })
    }, [chapter])
    return (
        <section ref={section} id="product-tour" className="max-w-7xl mx-auto px-6 pt-8 pb-8 scroll-mt-24">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t('site.intro.title')}</h1>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-3xl">{t('site.intro.description')}</p>
            <ProductVideo video={PRODUCT_VIDEOS.tour} chapters={TOUR_CHAPTERS} selectedChapter={chapter?.id} priority />
        </section>
    )
}
