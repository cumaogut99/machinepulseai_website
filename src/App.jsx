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

// ─── Section Order ────────────────────────────────────────────────────────────
// TODO: Reorder or add/remove sections here as the product evolves.
// Current flow (Linear / Vercel inspired):
//  Navbar → Hero → Stats → Features → HowItWorks → AgenticArch →
//  Targets → Pricing → CTABanner → Footer

function App() {
    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">

            {/* ─── Fixed Navigation ───────────────────────────────── */}
            <Navbar />

            {/* ─── Main Content ───────────────────────────────────── */}
            <main>
                {/* 1. Hero — Full-screen intro with stagger animation */}
                <Hero />

                {/* 2. Stats — Animated counter metrics */}
                <Stats />

                {/* 3. Features — Bento card grid */}
                <Features />

                {/* 4. How It Works — 4-step flow (Import → Analyze → Visualize → Report) */}
                <HowItWorks />

                {/* 5. Agentic Architecture — ML + LLM + RAG system overview */}
                <AgenticArch />

                {/* 6. Target Markets — Defense, Automotive, Energy industries */}
                <Targets />

                {/* 7. Pricing — Modular licensing (Core + Signal + AI Agent + DAQ + Enterprise) */}
                <Pricing />

                {/* 8. CTA Banner — Final conversion section */}
                <CTABanner />

                {/* TODO: <Testimonials /> — Engineer quotes and case studies */}
                {/* TODO: <FAQ /> — Accordion with common questions */}
                {/* TODO: <Team /> — Founding team section */}
            </main>

            {/* ─── Footer ─────────────────────────────────────────── */}
            <Footer />
        </div>
    )
}

export default App
