import Features from './Features.jsx'
import HowItWorks from './HowItWorks.jsx'
import AgenticArch from './AgenticArch.jsx'

// ─── Unified Product page ───────────────────────────────────────────────────────
// Merges the former /features, /how-it-works and /architecture routes into one
// coherent story: capabilities → workflow → the AI architecture that sets it
// apart. Each section already renders its own <section>, so we just stack them.
export default function ProductPage() {
    return (
        <>
            <Features />
            <HowItWorks />
            <AgenticArch />
        </>
    )
}
