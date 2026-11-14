import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/** Short vision statement on the homepage; the full story lives on /about. */
export default function VisionBand() {
    const { t } = useTranslation()
    return (
        <section id="vision" className="py-14 px-6 border-t border-white/5" aria-labelledby="vision-title">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-xs uppercase tracking-widest text-neon-cyan mb-3">{t('about.band.eyebrow')}</p>
                <h2 id="vision-title" className="text-2xl sm:text-3xl font-bold mb-5">{t('about.band.title')}</h2>
                <p className="text-slate-400 leading-relaxed text-base sm:text-lg">{t('about.band.text')}</p>
                <Link to="/about"
                    className="btn-neon mt-8 inline-flex items-center justify-center gap-2 text-neon-cyan font-semibold text-sm px-6 py-3 rounded-xl">
                    {t('about.band.link')} <span aria-hidden="true">→</span>
                </Link>
            </div>
        </section>
    )
}
