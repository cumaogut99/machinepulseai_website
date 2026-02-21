import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoImg from '../assets/logo.png'

// ─── Nav Link Data ──────────────────────────────────────────────────────────
// TODO: Buraya yeni navigasyon linkleri eklenebilir
const NAV_LINKS = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Docs', href: '#docs' },
    { label: 'Blog', href: '#blog' },
]

// ─── Navbar Component ───────────────────────────────────────────────────────
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-black/60 backdrop-blur-md border-b border-white/8 shadow-[0_1px_0_rgba(0,245,255,0.05)]'
                : 'bg-transparent backdrop-blur-sm'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* ── Logo ───────────────────────────────────────── */}
                    <a href="/" className="flex items-center gap-3 group flex-shrink-0">
                        <img
                            src={logoImg}
                            alt="MachinePulseAI Logo"
                            className="h-8 w-auto transition-opacity duration-200 group-hover:opacity-90"
                        />
                        <span className="text-sm font-semibold text-white tracking-tight hidden sm:block">
                            MachinePulse<span className="text-[#00f5ff]">AI</span>
                        </span>
                    </a>

                    {/* ── Desktop Nav Links ───────────────────────────── */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm text-slate-400 hover:text-white transition-colors duration-200 relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300 ease-out" />
                            </a>
                        ))}
                    </div>

                    {/* ── CTA Buttons ────────────────────────────────── */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Sign In Button */}
                        <button
                            id="nav-login-btn"
                            className="text-sm text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/5"
                        >
                            Sign In
                        </button>

                        {/* Download Button – Neon Highlighted */}
                        <button
                            id="nav-download-btn"
                            className="btn-neon text-sm font-medium text-[#00f5ff] px-5 py-2 rounded-lg"
                        >
                            Download
                        </button>
                    </div>

                    {/* ── Mobile Hamburger ──────────────────────────── */}
                    <button
                        className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {menuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>
            </div>

            {/* ── Mobile Menu Dropdown ────────────────────────────── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden border-t border-white/5 bg-black/80 backdrop-blur-md overflow-hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm text-slate-300 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="flex gap-3 pt-2 border-t border-white/5">
                                <button className="flex-1 text-sm text-slate-300 hover:text-white py-2 rounded-lg hover:bg-white/5 transition-colors">
                                    Sign In
                                </button>
                                <button className="flex-1 btn-neon text-sm font-medium text-[#00f5ff] py-2 rounded-lg">
                                    Download
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
