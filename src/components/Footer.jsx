import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContactModal } from '../context/ContactModalContext.jsx'
import { CONTACT_EMAIL } from '../data/contact.js'

/** Show only destinations that exist, in the active site language. */
export default function Footer() {
    const { t } = useTranslation()
    const { open } = useContactModal()
    return (
        <footer id="footer" className="border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="flex flex-col sm:flex-row justify-between gap-8 mb-10">
                    <div className="max-w-sm">
                        <Link to="/" className="font-bold text-white">MachinePulse<span className="text-neon-cyan">AI</span></Link>
                        <p className="text-xs text-slate-400 leading-relaxed mt-4">{t('footer.tagline')}</p>
                    </div>
                    <nav aria-label={t('site.footer.navigation')} className="flex flex-wrap gap-x-8 gap-y-4 text-xs text-slate-400">
                        <Link to="/product" className="hover:text-white">{t('nav.product')}</Link>
                        <Link to="/widgets" className="hover:text-white">{t('nav.widgets')}</Link>
                        <Link to="/pricing" className="hover:text-white">{t('nav.pricing')}</Link>
                        <button type="button" onClick={open} className="hover:text-white">{t('site.footer.contact')}</button>
                    </nav>
                </div>
                <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-slate-500">
                    <p>© MachinePulseAI. {t('site.footer.rights')}</p>
                    <a className="text-neon-cyan hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </div>
            </div>
        </footer>
    )
}
