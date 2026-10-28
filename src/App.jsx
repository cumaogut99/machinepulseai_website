import { useEffect, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ContactModalProvider, useContactModal } from './context/ContactModalContext.jsx'
import Seo from './seo/Seo.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ContactModal from './components/ContactModal.jsx'
import { widgetReleasePhase } from './data/widgetRelease.js'

// Above-the-fold home content stays in the main bundle; everything else is
// code-split so the initial page load only ships what it needs.
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import WhySection from './components/WhySection.jsx'
import AppShowcase from './components/AppShowcase.jsx'
import CTABanner from './components/CTABanner.jsx'

// Code-split page. Unlike React.lazy(), which always suspends on its first
// render (blanking prerendered HTML during hydration), the page renders
// synchronously once preload() has resolved its chunk; until then it suspends
// on the pending import so the nearest <Suspense> shows its fallback.
function lazyPage(loader) {
    let Loaded = null
    let error = null
    let pending = null
    const preload = () => {
        pending ??= loader().then((module) => {
            Loaded = module.default
            return module
        }, (err) => {
            error = err
        })
        return pending
    }
    const Page = (props) => {
        if (error) throw error
        if (!Loaded) throw preload()
        return <Loaded {...props} />
    }
    Page.preload = preload
    return Page
}

const ProductPage = lazyPage(() => import('./components/ProductPage.jsx'))
const Pricing = lazyPage(() => import('./components/Pricing.jsx'))
const WidgetCatalog = lazyPage(() => import('./components/WidgetCatalog.jsx'))
const CombustionAnalysisDetail = lazyPage(() => import('./components/CombustionAnalysisDetail.jsx'))
const FFTSpectrumLearning = lazyPage(() => import('./components/FFTSpectrumLearning.jsx'))
const RotorDynamicsLearning = lazyPage(() => import('./components/RotorDynamicsLearning.jsx'))
const WidgetDetail = lazyPage(() => import('./components/WidgetDetail.jsx'))

// The dedicated combustion page stays withheld while the application defers
// its module to a later phase (generic pages are gated in WidgetDetail).
const COMBUSTION_RELEASED = !widgetReleasePhase('combustion_analysis', { subgroupId: 'thermofluids' })

// Route → page component, used to preload the current page before the first
// render (client hydration and build-time prerendering).
const PAGE_ROUTES = [
    ['/product', ProductPage],
    ['/widgets', WidgetCatalog],
    ['/widgets/combustion-analysis', CombustionAnalysisDetail],
    ['/widgets/fft-spectrum', FFTSpectrumLearning],
    ['/widgets/rotor-dynamics', RotorDynamicsLearning],
    ['/pricing', Pricing],
]

/** Resolve the lazy page chunk for a pathname (null for the home page). */
export function preloadRoute(pathname) {
    const path = pathname.replace(/\/+$/, '') || '/'
    const match = PAGE_ROUTES.find(([route]) => route === path)
    if (match) return match[1].preload()
    if (/^\/widgets\/[^/]+$/.test(path)) return WidgetDetail.preload()
    return Promise.resolve(null)
}

/** Resolve every lazy page chunk (used by the prerenderer). */
export function preloadAllRoutes() {
    return Promise.all([...PAGE_ROUTES.map(([, page]) => page.preload()), WidgetDetail.preload()])
}

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
        <div className="bg-[#0a0a0a] min-h-screen flex flex-col text-white overflow-x-clip">
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
                    <Route path="/widgets/combustion-analysis" element={COMBUSTION_RELEASED ? <Page><CombustionAnalysisDetail /></Page> : <Navigate to="/widgets" replace />} />
                    <Route path="/widgets/fft-spectrum" element={<Page><FFTSpectrumLearning /></Page>} />
                    <Route path="/widgets/rotor-dynamics" element={<Page><RotorDynamicsLearning /></Page>} />
                    <Route path="/widgets/:slug" element={<Page><WidgetDetail /></Page>} />
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

// Router and HelmetProvider are supplied by the entry point: BrowserRouter in
// main.jsx, StaticRouter in entry-server.jsx (build-time prerender).
function App() {
    return (
        <ContactModalProvider>
            <ScrollToTop />
            <Seo />
            <AppShell />
        </ContactModalProvider>
    )
}

export default App
