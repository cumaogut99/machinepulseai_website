import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '../analytics.js'

// ─── Contact / Demo Request Modal ─────────────────────────────────────────────
// Posts to the site's own serverless endpoint (api/contact.js), which emails the
// request. The receiving inbox is configured on the server and never shown here.
const CONTACT_ENDPOINT = '/api/contact'
const EMPTY_FORM = { name: '', company: '', email: '', message: '', website: '' }

const PURPOSES = ['demo', 'pilot', 'partnership']

export default function ContactModal({ open, purpose = 'demo', onClose }) {
    const { t } = useTranslation()
    const [form, setForm] = useState({ purpose, ...EMPTY_FORM })
    const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
    const dialog = useRef(null)

    // Each opening starts from the purpose its trigger asked for.
    useEffect(() => {
        if (open) setForm(f => ({ ...f, purpose }))
    }, [open, purpose])

    useEffect(() => {
        if (!open) return undefined
        const previousFocus = document.activeElement
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        dialog.current?.querySelector('input')?.focus()
        function onKeyDown(event) {
            if (event.key === 'Escape') {
                onClose()
                return
            }
            if (event.key !== 'Tab') return
            const controls = [...dialog.current.querySelectorAll('button, select, input, textarea, a[href]')]
                .filter(control => !control.disabled)
            const first = controls[0]
            const last = controls[controls.length - 1]
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last?.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first?.focus()
            }
        }
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', onKeyDown)
            previousFocus?.focus()
        }
    }, [open, onClose])

    function handleChange(e) {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setStatus('loading')
        try {
            const response = await fetch(CONTACT_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(form)
            })
            if (!response.ok) throw new Error(`Contact endpoint answered ${response.status}`)
            trackEvent('contact_sent', { purpose: form.purpose })
            setStatus('success')
        } catch (error) {
            console.error('Contact request failed', error)
            setStatus('error')
        }
    }

    function handleClose() {
        setStatus('idle')
        setForm({ purpose, ...EMPTY_FORM })
        onClose()
    }

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            ref={dialog} role="dialog" aria-modal="true" aria-labelledby="contact-title"
                            className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0d1525] shadow-2xl"
                            initial={{ scale: 0.92, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.92, y: 20 }}
                            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Top accent */}
                            <div className="h-px w-full"
                                style={{ background: 'linear-gradient(90deg, transparent, #00f5ff60, transparent)' }} />

                            <div className="p-8">
                                {/* Close */}
                                <button
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/25 transition-all"
                                    aria-label={t('site.contact.close')}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {status !== 'success' ? (
                                    <>
                                        <div className="mb-6">
                                            <span className="inline-block text-[10px] font-semibold text-[#00f5ff] tracking-widest uppercase mb-2">
                                                {t(`site.contact.purposes.${form.purpose}.badge`)}
                                            </span>
                                            <h2 id="contact-title" className="text-xl font-bold text-white">{t(`site.contact.purposes.${form.purpose}.title`)}</h2>
                                            <p className="text-sm text-slate-400 mt-1">
                                                {t('contact.subtitle')}
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="contact-purpose" className="text-xs text-slate-400">{t('site.contact.purposeLabel')}</label>
                                                <select
                                                    id="contact-purpose" name="purpose" value={form.purpose} onChange={handleChange}
                                                    className="w-full bg-[#0d1525] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f5ff]/40 transition-all"
                                                >
                                                    {PURPOSES.map(id => <option key={id} value={id}>{t(`site.contact.purposes.${id}.label`)}</option>)}
                                                </select>
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <label htmlFor="contact-name" className="text-xs text-slate-400">{t('contact.form.name')}</label>
                                                    <input
                                                        id="contact-name" name="name" autoComplete="name" required maxLength={120} value={form.name} onChange={handleChange}
                                                        placeholder={t('site.contact.namePlaceholder')}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00f5ff]/40 focus:bg-white/8 transition-all"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <label htmlFor="contact-company" className="text-xs text-slate-400">{t('contact.form.company')}</label>
                                                    <input
                                                        id="contact-company" name="company" autoComplete="organization" maxLength={160} value={form.company} onChange={handleChange}
                                                        placeholder={t('site.contact.companyPlaceholder')}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00f5ff]/40 focus:bg-white/8 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="contact-email" className="text-xs text-slate-400">{t('contact.form.email')}</label>
                                                <input
                                                    id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={handleChange}
                                                    placeholder={t('site.contact.emailPlaceholder')}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00f5ff]/40 focus:bg-white/8 transition-all"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="contact-message" className="text-xs text-slate-400">{t(`site.contact.purposes.${form.purpose}.message`)}</label>
                                                <textarea
                                                    id="contact-message" name="message" rows={3} maxLength={4000} value={form.message} onChange={handleChange}
                                                    placeholder={t(`site.contact.purposes.${form.purpose}.placeholder`)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00f5ff]/40 focus:bg-white/8 transition-all resize-none"
                                                />
                                            </div>

                                            {/* Honeypot: hidden from people and assistive technology; bots fill it. */}
                                            <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                                                <label htmlFor="contact-website">Website</label>
                                                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off"
                                                    value={form.website} onChange={handleChange} />
                                            </div>

                                            {status === 'error' && (
                                                <div className="text-xs text-red-400 mt-1">
                                                    {t('contact.error')}
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={status === 'loading'}
                                                className="w-full btn-neon text-sm font-semibold text-[#00f5ff] py-3 rounded-xl mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {status === 'loading' ? t('contact.form.sending') : t('contact.form.submit')}
                                            </button>
                                            <p className="text-center text-[10px] text-slate-600">
                                                {t('contact.form.privacy')}
                                            </p>
                                        </form>
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-14 h-14 rounded-full bg-[#00f5ff]/10 border border-[#00f5ff]/30 flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-6 h-6 text-[#00f5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 id="contact-title" className="text-lg font-bold text-white mb-2">{t('contact.success.title')}</h3>
                                        <p className="text-sm text-slate-400 mb-6">
                                            {t('contact.success.message')}
                                        </p>
                                        <button
                                            onClick={handleClose}
                                            className="text-sm text-[#00f5ff] hover:text-white transition-colors"
                                        >
                                            {t('contact.success.close')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
