import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Features from './components/Features.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import AgenticArch from './components/AgenticArch.jsx'
import Targets from './components/Targets.jsx'
import Pricing from './components/Pricing.jsx'
import CTABanner from './components/CTABanner.jsx'
import Footer from './components/Footer.jsx'
import ContactModal from './components/ContactModal.jsx'
import KnowledgeBase from './components/KnowledgeBase.jsx'
import WidgetCatalog from './components/WidgetCatalog.jsx'
import AppShowcase from './components/AppShowcase.jsx'

// Scroll to top on route change
function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

const Home = () => (
    <main>
        <Hero />
        <Stats />
        <AppShowcase />
        <CTABanner />
    </main>
)

const FeaturesPage = () => (
    <main className="pt-24">
        <Features />
        <CTABanner />
    </main>
)

const ArchitecturePage = () => (
    <main className="pt-24">
        <AgenticArch />
        <CTABanner />
    </main>
)

const HowItWorksPage = () => (
    <main className="pt-24">
        <HowItWorks />
        <CTABanner />
    </main>
)

const SolutionsPage = () => (
    <main className="pt-24">
        <Targets />
        <CTABanner />
    </main>
)

const KnowledgeBasePage = () => (
    <main className="pt-24">
        <KnowledgeBase />
        <CTABanner />
    </main>
)

const WidgetsPage = () => (
    <main className="pt-24">
        <WidgetCatalog />
        <CTABanner />
    </main>
)

const PricingPage = () => (
    <main className="pt-24">
        <Pricing />
        <CTABanner />
    </main>
)

function App() {
    const { i18n } = useTranslation()
    const [contactOpen, setContactOpen] = useState(false)

    // Update document lang attribute when language changes
    useEffect(() => {
        document.documentElement.lang = i18n.language || 'tr'
    }, [i18n.language])

    // Expose a global so any component can open the modal without prop drilling
    useEffect(() => {
        window.openContactModal = () => setContactOpen(true)
        return () => { delete window.openContactModal }
    }, [])

    return (
        <Router>
            <ScrollToTop />
            <div className="bg-[#0a0a0a] min-h-screen flex flex-col text-white overflow-x-hidden">
                <Navbar />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/features" element={<FeaturesPage />} />
                        <Route path="/architecture" element={<ArchitecturePage />} />
                        <Route path="/how-it-works" element={<HowItWorksPage />} />
                        <Route path="/solutions" element={<SolutionsPage />} />
                        <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
                        <Route path="/widgets" element={<WidgetsPage />} />
                        <Route path="/pricing" element={<PricingPage />} />
                    </Routes>
                </div>
                <Footer />

                {/* ─── Global Contact / Demo Request Modal ────────────── */}
                <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
            </div>
        </Router>
    )
}

export default App
