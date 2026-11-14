import { useTranslation } from 'react-i18next'
import { useContactModal } from '../context/ContactModalContext.jsx'
import Roadmap from './Roadmap.jsx'

const WHY_NOW = [
    { id: 'local', accent: '#00f5ff' },
    { id: 'scale', accent: '#3b82f6' },
    { id: 'fragmented', accent: '#a855f7' },
]
const PRINCIPLES = ['data', 'engine', 'scale', 'traceable']

/** Card grid shared by the "why now" and "how we build it" sections. */
function CardGrid({ ids, prefix, columns }) {
    const { t } = useTranslation()
    return (
        <ul className={`grid grid-cols-1 ${columns} gap-4`}>
            {ids.map(({ id, accent = '#00f5ff' }) => (
                <li key={id}
                    className="relative rounded-2xl border p-6 flex flex-col gap-3 overflow-hidden"
                    style={{ borderColor: `${accent}20`, background: `${accent}06` }}>
                    <span className="absolute top-0 left-0 right-0 h-px" aria-hidden="true"
                        style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
                    <h3 className="text-base font-semibold text-white">{t(`${prefix}.${id}.title`)}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{t(`${prefix}.${id}.description`)}</p>
                </li>
            ))}
        </ul>
    )
}

/** Vision, why now, principles and the staged roadmap. */
export default function AboutPage() {
    const { t } = useTranslation()
    const { open: openContact } = useContactModal()
    return (
        <>
            <header className="relative px-6 pt-14 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-spotlight pointer-events-none" aria-hidden="true" />
                <div className="relative max-w-5xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-neon-cyan mb-4">{t('about.page.eyebrow')}</p>
                    <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-6 max-w-4xl">{t('about.page.title')}</h1>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">{t('about.page.intro')}</p>
                </div>
            </header>

            <section id="vision" className="px-6 py-14 border-t border-white/5" aria-labelledby="about-vision-title">
                <div className="max-w-5xl mx-auto grid lg:grid-cols-[220px_minmax(0,1fr)] gap-8">
                    <h2 id="about-vision-title" className="text-2xl sm:text-3xl font-bold">{t('about.page.vision.title')}</h2>
                    <div className="flex flex-col gap-5 text-slate-300 leading-relaxed text-base sm:text-lg max-w-3xl">
                        <p>{t('about.page.vision.p1')}</p>
                        <p>{t('about.page.vision.p2')}</p>
                        <p>{t('about.page.vision.p3')}</p>
                    </div>
                </div>
            </section>

            <section id="why-now" className="px-6 py-14 border-t border-white/5" aria-labelledby="about-why-title">
                <div className="max-w-5xl mx-auto">
                    <h2 id="about-why-title" className="text-2xl sm:text-3xl font-bold mb-8">{t('about.page.whyNow.title')}</h2>
                    <CardGrid ids={WHY_NOW} prefix="about.page.whyNow.items" columns="md:grid-cols-3" />
                </div>
            </section>

            <section id="principles" className="px-6 py-14 border-t border-white/5" aria-labelledby="about-principles-title">
                <div className="max-w-5xl mx-auto">
                    <h2 id="about-principles-title" className="text-2xl sm:text-3xl font-bold mb-8">{t('about.page.principles.title')}</h2>
                    <CardGrid ids={PRINCIPLES.map(id => ({ id }))} prefix="about.page.principles.items" columns="sm:grid-cols-2" />
                </div>
            </section>

            <Roadmap />

            <section className="px-6 py-14 border-t border-white/5" aria-labelledby="about-contact-title">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 id="about-contact-title" className="text-2xl sm:text-3xl font-bold mb-4">{t('about.page.contact.title')}</h2>
                    <p className="text-slate-400 leading-relaxed mb-8">{t('about.page.contact.description')}</p>
                    <button type="button" onClick={() => openContact('demo')}
                        className="btn-neon inline-flex items-center justify-center text-neon-cyan font-semibold text-sm px-6 py-3 rounded-xl">
                        {t('about.page.contact.button')}
                    </button>
                </div>
            </section>
        </>
    )
}
