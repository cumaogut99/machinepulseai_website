import { useTranslation } from 'react-i18next'
import ProductVideo from './ProductVideo.jsx'
import { CASE_STUDY_VIDEOS } from '../data/caseStudyVideos.js'
import { useContactModal } from '../context/ContactModalContext.jsx'

/** Real Agent recordings and their exported reports, with the demo scope visible. */
export default function CaseStudyVideos() {
    const { t } = useTranslation()
    const { open: openContact } = useContactModal()
    if (!CASE_STUDY_VIDEOS.length) return null
    return (
        <section id="agent-case-studies" className="py-12 px-6" aria-labelledby="case-studies-title">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl mb-8">
                    <p className="text-xs uppercase tracking-widest text-neon-cyan mb-3">{t('caseStudies.eyebrow')}</p>
                    <h2 id="case-studies-title" className="text-2xl sm:text-3xl font-bold mb-4">{t('caseStudies.title')}</h2>
                    <p className="text-slate-400 leading-relaxed">{t('caseStudies.description')}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {CASE_STUDY_VIDEOS.map(video => (
                        <article key={video.id} className="min-w-0">
                            <ProductVideo video={video} />
                            <h3 className="text-lg font-semibold mt-5 mb-2">{t(`caseStudies.${video.id}.title`)}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-4">{t(`caseStudies.${video.id}.description`)}</p>
                            <a href={video.report} target="_blank" rel="noreferrer"
                                className="text-sm text-neon-cyan underline underline-offset-4 focus-visible:outline focus-visible:outline-neon-cyan">
                                {t('caseStudies.report')}
                            </a>
                        </article>
                    ))}
                </div>
                <button type="button" onClick={openContact}
                    className="btn-neon mt-8 inline-flex items-center justify-center text-neon-cyan font-semibold text-sm px-6 py-3 rounded-xl">
                    {t('caseStudies.demo')}
                </button>
                <p className="mt-7 text-xs text-slate-400 leading-relaxed max-w-4xl">{t('caseStudies.scope')}</p>
            </div>
        </section>
    )
}
