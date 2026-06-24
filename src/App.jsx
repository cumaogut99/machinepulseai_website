import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { ContactModalProvider, useContactModal } from './context/ContactModalContext.jsx'
import Seo from './seo/Seo.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ContactModal from './components/ContactModal.jsx'

// Above-the-fold home content stays in the main bundle; everything else is
// code-split so the initial page load only ships what it needs.
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import AppShowcase from './components/AppShowcase.jsx'
import CTABanner from './components/CTABanner.jsx'

const Features = lazy(() => import('./components/Features.jsx'))
const HowItWorks = lazy(() => import('./components/HowItWorks.jsx'))
const AgenticArch = lazy(() => import('./components/AgenticArch.jsx'))
const Targets = lazy(() => import('./components/Targets.jsx'))
const Pricing = lazy(() => import('./components/Pricing.jsx'))
const KnowledgeBase = lazy(() => import('./components/KnowledgeBase.jsx'))
const WidgetCatalog = lazy(() => import('./components/WidgetCatalog.jsx'))

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
        <AppShowcase />
        <CTABanner />
    </main>
)

// Inner pages share a compact top offset (navbar is 64px tall).
const Page = ({ children }) => (
    <main id="main" className="pt-20">
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
                    <Route path="/features" element={<Page><Features /></Page>} />
                    <Route path="/architecture" element={<Page><AgenticArch /></Page>} />
                    <Route path="/how-it-works" element={<Page><HowItWorks /></Page>} />
                    <Route path="/solutions" element={<Page><Targets /></Page>} />
                    <Route path="/knowledge-base" element={<Page><KnowledgeBase /></Page>} />
                    <Route path="/widgets" element={<Page><WidgetCatalog /></Page>} />
                    <Route path="/pricing" element={<Page><Pricing /></Page>} />
                </Routes>
            </div>
            <Footer />

            {/* ─── Global Contact / Demo Request Modal ────────────── */}
            <ContactModal open={isOpen} onClose={close} />
        </div>
    )
}

function App() {
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
