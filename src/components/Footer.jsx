import { Link } from 'react-router-dom'
import { useContactModal } from '../context/ContactModalContext.jsx'

// ─── Footer Data ───────────────────────────────────────────────────────────────
// `route` = SPA route (react-router Link); `href` = external/anchor (<a>).

const FOOTER_LINKS = {
    Product: [
        { label: 'Overview', route: '/product' },
        { label: 'Module Library', route: '/widgets' },
        { label: 'Packages', route: '/pricing' },
        { label: 'System Requirements', href: null, soon: true },
        { label: 'Changelog', href: null, soon: true },
    ],
    Resources: [
        { label: 'Documentation', href: null, soon: true },
        { label: 'Blog', href: null, soon: true },
        { label: 'Research', href: null, soon: true },
    ],
    Company: [
        { label: 'About', href: null, soon: true },
        { label: 'Contact', href: null, modal: true },
        { label: 'Privacy Policy', href: null, soon: true },
        { label: 'Terms', href: null, soon: true },
    ],
}

const SOCIAL_LINKS = [
    {
        label: 'LinkedIn',
        href: '#', // TODO: Add real LinkedIn URL
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        href: '#', // TODO: Add real GitHub URL
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
        ),
    },
    {
        label: 'X / Twitter',
        href: '#', // TODO: Add real Twitter/X URL
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
]

export default function Footer() {
    const { open: openContact } = useContactModal()
    const currentYear = new Date().getFullYear()

    return (
        <footer id="footer" className="relative border-t border-white/5 overflow-hidden">
            {/* Subtle top glow */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.15), transparent)' }}
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                {/* ── Top row: brand + links ── */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                        <a href="/" className="flex items-center gap-2">
                            <span className="text-base font-bold text-white tracking-tight">
                                MachinePulse<span className="text-[#00f5ff]">AI</span>
                            </span>
                        </a>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            High-performance post-processing analysis platform for engineering sensor data.
                        </p>
                        {/* Social links */}
                        <div className="flex items-center gap-3 mt-2">
                            {SOCIAL_LINKS.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-200"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(FOOTER_LINKS).map(([group, links]) => (
                        <div key={group} className="flex flex-col gap-3">
                            <p className="text-xs font-semibold text-white tracking-wider">{group}</p>
                            {links.map((link) => (
                                link.modal ? (
                                    <button
                                        key={link.label}
                                        onClick={openContact}
                                        className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-150 text-left"
                                    >
                                        {link.label}
                                    </button>
                                ) : link.route ? (
                                    <Link
                                        key={link.label}
                                        to={link.route}
                                        className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-150"
                                    >
                                        {link.label}
                                    </Link>
                                ) : link.href ? (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-150"
                                    >
                                        {link.label}
                                    </a>
                                ) : (
                                    <span
                                        key={link.label}
                                        className="text-xs text-slate-700 cursor-default flex items-center gap-1.5"
                                    >
                                        {link.label}
                                        {link.soon && (
                                            <span className="text-[8px] font-medium text-slate-600 border border-slate-700 px-1 py-px rounded uppercase tracking-widest">
                                                Soon
                                            </span>
                                        )}
                                    </span>
                                )
                            ))}
                        </div>
                    ))}
                </div>

                {/* ── Bottom row: copyright + contact ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
                    <p className="text-xs text-slate-600">
                        © {currentYear} MachinePulseAI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                            Terms of Service
                        </a>
                        {/* TODO: Add real contact email */}
                        <a href="mailto:hello@machinepulseai.com" className="text-xs text-[#00f5ff]/60 hover:text-[#00f5ff] transition-colors">
                            hello@machinepulseai.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
