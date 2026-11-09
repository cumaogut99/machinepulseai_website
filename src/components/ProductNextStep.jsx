import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/** Connect the product explanation to package selection. */
export default function ProductNextStep() {
    const { t } = useTranslation()
    return (
        <section className="max-w-7xl mx-auto px-6 pt-4 pb-14">
            <div className="rounded-2xl border border-neon-cyan/20 bg-neon-cyan/5 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">{t('site.product.next.title')}</h2>
                    <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">{t('site.product.next.description')}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                    <Link to="/pricing" className="btn-neon rounded-xl px-5 py-3 text-center font-semibold text-neon-cyan">{t('site.product.packages')}</Link>
                    <Link to="/widgets" className="rounded-xl border border-white/15 px-5 py-3 text-sm text-center hover:bg-white/5">{t('nav.widgets')}</Link>
                </div>
            </div>
        </section>
    )
}
