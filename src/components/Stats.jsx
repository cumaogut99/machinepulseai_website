import { useTranslation } from 'react-i18next'

const CAPABILITIES = ['recorded', 'engine', 'assistant', 'platform']

/** Capabilities remain readable without animation or JavaScript. */
export default function Stats() {
    const { t } = useTranslation()
    return (
        <section aria-label={t('site.capabilities.label')} className="border-y border-white/5 py-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
                {CAPABILITIES.map(id => (
                    <div key={id} className="text-center">
                        <p className="text-base sm:text-lg font-semibold text-neon-cyan mb-2">{t(`site.capabilities.${id}.title`)}</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{t(`site.capabilities.${id}.description`)}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
