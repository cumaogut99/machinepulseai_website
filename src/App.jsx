import { useState, useEffect } from 'react'
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

function App() {
    const [contactOpen, setContactOpen] = useState(false)

    // Expose a global so any component can open the modal without prop drilling
    useEffect(() => {
        window.openContactModal = () => setContactOpen(true)
        return () => { delete window.openContactModal }
    }, [])

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">
            <Navbar />
            <main>
                <Hero />
                <Stats />
                <Features />
                <HowItWorks />
                <AgenticArch />
                <Targets />
                <Pricing />
                <CTABanner />
            </main>
            <Footer />

            {/* ─── Global Contact / Demo Request Modal ────────────── */}
            <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
        </div>
    )
}

export default App
