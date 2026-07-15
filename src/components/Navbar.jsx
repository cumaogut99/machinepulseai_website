import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import logoImg from '../assets/logo.png'

const WIDGET_NAV_GROUPS = [
    {
        id: 'data_io',
        en: 'Data I/O',
        tr: 'Veri Giriş/Çıkış',
    },
    {
        id: 'preprocessing',
        en: 'Preprocessing',
        tr: 'Ön İşleme',
    },
    {
        id: 'filters',
        en: 'Signal Filters',
        tr: 'Sinyal Filtreleri',
    },
    {
        id: 'analysis',
        en: 'Frequency & Statistics',
        tr: 'Frekans ve İstatistik',
    },
    {
        id: 'visualization',
        en: 'Visualization',
        tr: 'Görselleştirme',
    },
    {
        id: 'vibration',
        en: 'Vibration & Structural',
        tr: 'Titreşim ve Yapısal',
    },
    {
        id: 'acoustics',
        en: 'Acoustics & NVH',
        tr: 'Akustik ve NVH',
    },
    {
        id: 'electrical',
        en: 'Electrical & Power',
        tr: 'Elektrik ve Güç',
    },
    {
        id: 'thermofluids',
        en: 'Thermodynamics & Fluids',
        tr: 'Termodinamik ve Akışkanlar',
    },
    {
        id: 'reports',
        en: 'Reports',
        tr: 'Raporlama',
    },
]

// ─── Navbar Component ───────────────────────────────────────────────────────
export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()
    const isTurkish = i18n.language?.startsWith('tr')

    // ─── Nav Link Data ──────────────────────────────────────────────────────────
    const NAV_LINKS = [
        { label: t('nav.product'), href: '/product' },
        {
            label: t('nav.widgets'),
            href: '/widgets',
            dropdown: WIDGET_NAV_GROUPS.map((group) => ({
                label: isTurkish ? group.tr : group.en,
                href: `/widgets?category=${group.id}`,
            })),
        },
        { label: t('nav.pricing'), href: '/pricing' },
    ]

    const toggleLanguage = () => {
        i18n.changeLanguage(isTurkish ? 'en' : 'tr');
    }

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
                    <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
                        <img
                            src={logoImg}
                            alt="MachinePulseAI Logo"
                            className="h-12 w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(0,245,255,0.6)]"
                        />
                        <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
                            MachinePulse<span className="text-[#00f5ff]">AI</span>
                        </span>
                    </Link>

                    {/* ── Desktop Nav Links ───────────────────────────── */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <div key={link.label} className="relative group">
                                <Link
                                    to={link.href}
                                    aria-haspopup={link.dropdown ? 'menu' : undefined}
                                    className={`text-sm hover:text-white transition-colors duration-200 relative py-2 flex items-center gap-1 ${location.pathname === link.href ? 'text-white' : 'text-slate-400'}`}
                                >
                                    {link.label}
                                    {link.dropdown && (
                                        <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                    <span className={`absolute -bottom-0.5 left-0 h-px bg-neon-cyan transition-all duration-300 ease-out ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                </Link>

                                {/* Dropdown Menu — opens on hover or keyboard focus */}
                                {link.dropdown && (
                                    <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150" role="menu">
                                        <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 w-72 shadow-2xl grid grid-cols-2 gap-1">
                                            {link.dropdown.map((sublink) => (
                                                <Link
                                                    key={sublink.href}
                                                    to={sublink.href}
                                                    role="menuitem"
                                                    className="text-xs px-3 py-2 rounded-lg transition-colors text-slate-400 hover:text-white hover:bg-white/5 focus:text-white focus:bg-white/5"
                                                >
                                                    {sublink.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ── CTA Buttons ────────────────────────────────── */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={toggleLanguage}
                            className="text-xs font-semibold text-slate-400 hover:text-white px-2 py-1 rounded-md border border-white/10 hover:border-white/20 transition-all uppercase"
                            aria-label="Toggle Language"
                        >
                            {isTurkish ? 'EN' : 'TR'}
                        </button>
                        <Link
                            id="nav-demo-btn"
                            to="/pricing"
                            className="btn-neon text-sm font-medium text-[#00f5ff] px-5 py-2 rounded-lg"
                        >
                            {t('nav.getDemo')}
                        </Link>
                    </div>

                    {/* ── Mobile Hamburger ──────────────────────────── */}
                    <button
                        className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
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
                        id="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden border-t border-white/5 bg-black/80 backdrop-blur-md overflow-hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {NAV_LINKS.map((link) => (
                                <div key={link.label} className="flex flex-col gap-2">
                                    {link.href ? (
                                        <Link
                                            to={link.href}
                                            onClick={() => setMenuOpen(false)}
                                            className={`text-sm transition-colors ${location.pathname === link.href ? 'text-white font-medium' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <div className="text-sm font-semibold text-slate-300 uppercase tracking-wider mt-2">
                                            {link.label}
                                        </div>
                                    )}

                                    {link.dropdown && (
                                        <div className="flex flex-col gap-2 pl-4 border-l border-white/10">
                                            {link.dropdown.map((sublink) => (
                                                <Link
                                                    key={sublink.href}
                                                    to={sublink.href}
                                                    onClick={() => setMenuOpen(false)}
                                                    className={`text-sm transition-colors ${location.pathname === sublink.href ? 'text-white font-medium' : 'text-slate-400 hover:text-white'}`}
                                                >
                                                    {sublink.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="flex gap-3 pt-2 border-t border-white/5">
                                <Link
                                    to="/pricing"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex-1 btn-neon text-sm font-medium text-[#00f5ff] py-2 rounded-lg text-center"
                                >
                                    {t('nav.getDemo')}
                                </Link>
                                <button
                                    onClick={() => { toggleLanguage(); setMenuOpen(false); }}
                                    className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 rounded-md border border-white/10 hover:border-white/20 transition-all uppercase"
                                    aria-label="Toggle Language"
                                >
                                    {isTurkish ? 'EN' : 'TR'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
