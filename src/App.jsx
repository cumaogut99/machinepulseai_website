import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { ContactModalProvider, useContactModal } from './context/ContactModalContext.jsx'
import Seo from './seo/Seo.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ContactModal from './components/ContactModal.jsx'
import ComingSoon from './components/ComingSoon.jsx'

// Above-the-fold home content stays in the main bundle; everything else is
// code-split so the initial page load only ships what it needs.
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import WhySection from './components/WhySection.jsx'
import AppShowcase from './components/AppShowcase.jsx'
import CTABanner from './components/CTABanner.jsx'

const ProductPage = lazy(() => import('./components/ProductPage.jsx'))
const Pricing = lazy(() => import('./components/Pricing.jsx'))
const WidgetCatalog = lazy(() => import('./components/WidgetCatalog.jsx'))
const CombustionAnalysisDetail = lazy(() => import('./components/CombustionAnalysisDetail.jsx'))

// Scroll to top on route change
function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

// Lightweight fallback while a lazy page chunk loads.
function PageFallback() {
    return <div className="min-h-[60vh]" aria-hidden="true" />
}

const Home = () => (
    <main id="main">
        <Hero />
        <Stats />
        <WhySection />
        <AppShowcase />
        <CTABanner />
    </main>
)

// Inner pages share a compact top offset (navbar is 64px tall).
const Page = ({ children }) => (
    <main id="main" className="pt-14">
        <Suspense fallback={<PageFallback />}>
            {children}
            <CTABanner />
        </Suspense>
    </main>
)

function AppShell() {
    const { i18n } = useTranslation()
    const { isOpen, close } = useContactModal()

    // Update document lang attribute when language changes
    useEffect(() => {
        document.documentElement.lang = i18n.language || 'tr'
    }, [i18n.language])

    return (
        <div className="bg-[#0a0a0a] min-h-screen flex flex-col text-white overflow-x-hidden">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#00f5ff] focus:text-black focus:font-semibold"
            >
                Skip to main content
            </a>
            <Navbar />
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<Page><ProductPage /></Page>} />
                    <Route path="/widgets" element={<Page><WidgetCatalog /></Page>} />
                    <Route path="/widgets/combustion-analysis" element={<Page><CombustionAnalysisDetail /></Page>} />
                    <Route path="/pricing" element={<Page><Pricing /></Page>} />

                    {/* Redirects from the former route structure */}
                    <Route path="/features" element={<Navigate to="/product" replace />} />
                    <Route path="/architecture" element={<Navigate to="/product" replace />} />
                    <Route path="/how-it-works" element={<Navigate to="/product" replace />} />
                    <Route path="/solutions" element={<Navigate to="/" replace />} />
                    <Route path="/industries" element={<Navigate to="/" replace />} />
                    <Route path="/knowledge-base" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
            <Footer />

            {/* ─── Global Contact / Demo Request Modal ────────────── */}
            <ContactModal open={isOpen} onClose={close} />
        </div>
    )
}

function App() {
    // Temporary launch gate: visitors only see the "Coming Soon" landing.
    // The full site (AppShell and every component/route) is intentionally kept
    // intact below — flip this to `false` to bring the real site back online.
    const COMING_SOON = true

    if (COMING_SOON) {
        // Note: <Seo /> depends on react-router (useLocation) and must not be
        // rendered outside <Router>. The static meta tags in index.html cover
        // the landing, so we intentionally skip Seo here.
        return (
            <HelmetProvider>
                <ComingSoon />
            </HelmetProvider>
        )
    }

    return (
        <HelmetProvider>
            <ContactModalProvider>
                <Router>
                    <ScrollToTop />
                    <Seo />
                    <AppShell />
                </Router>
            </ContactModalProvider>
        </HelmetProvider>
    )
}

export default App
