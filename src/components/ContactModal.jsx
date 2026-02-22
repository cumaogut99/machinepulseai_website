import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Contact / Demo Request Modal ──────────────────────────────────────────────
// Opens when any "Request a Demo" or "Contact Sales" CTA is clicked.
// Sends a mailto: link on submit (no backend needed for now).
// TODO: Replace with a real form submission endpoint (e.g. Formspree, Resend) before launch.

const CONTACT_EMAIL = 'hello@machinepulseai.com'

export default function ContactModal({ open, onClose }) {
    const [form, setForm] = useState({ name: '', company: '', email: '', message: '' })
    const [sent, setSent] = useState(false)

    function handleChange(e) {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        const subject = encodeURIComponent(`Demo Request from ${form.name} — ${form.company}`)
        const body = encodeURIComponent(
            `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
        )
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
        setSent(true)
    }

    function handleClose() {
        setSent(false)
        setForm({ name: '', company: '', email: '', message: '' })
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
                            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d1525] shadow-2xl overflow-hidden"
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
                                    aria-label="Close"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {!sent ? (
                                    <>
                                        <div className="mb-6">
                                            <span className="inline-block text-[10px] font-semibold text-[#00f5ff] tracking-widest uppercase mb-2">
                                                Request a Demo
                                            </span>
                                            <h2 className="text-xl font-bold text-white">See MachinePulseAI in action</h2>
                                            <p className="text-sm text-slate-400 mt-1">
                                                Fill in the form and we'll reach out within 1 business day.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-xs text-slate-400">Full Name *</label>
                                                    <input
                                                        name="name" required value={form.name} onChange={handleChange}
                                                        placeholder="Jane Smith"
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00f5ff]/40 focus:bg-white/8 transition-all"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-xs text-slate-400">Company *</label>
                                                    <input
                                                        name="company" required value={form.company} onChange={handleChange}
                                                        placeholder="Acme Defense Ltd."
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00f5ff]/40 focus:bg-white/8 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs text-slate-400">Work Email *</label>
                                                <input
                                                    name="email" type="email" required value={form.email} onChange={handleChange}
                                                    placeholder="jane@company.com"
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00f5ff]/40 focus:bg-white/8 transition-all"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs text-slate-400">What are you analyzing?</label>
                                                <textarea
                                                    name="message" rows={3} value={form.message} onChange={handleChange}
                                                    placeholder="e.g. vibration data from turbine test rigs, 200 kHz DAQ files..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00f5ff]/40 focus:bg-white/8 transition-all resize-none"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full btn-neon text-sm font-semibold text-[#00f5ff] py-3 rounded-xl mt-1"
                                            >
                                                Send Request
                                            </button>
                                            <p className="text-center text-[10px] text-slate-600">
                                                No spam. We only use your info to respond to this request.
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
                                        <h3 className="text-lg font-bold text-white mb-2">Request sent!</h3>
                                        <p className="text-sm text-slate-400 mb-6">
                                            Your email client should have opened. We'll get back to you within 1 business day.
                                        </p>
                                        <button
                                            onClick={handleClose}
                                            className="text-sm text-[#00f5ff] hover:text-white transition-colors"
                                        >
                                            Close
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
