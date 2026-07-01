import logo from '../assets/logo.png'

// Temporary full-screen landing shown to visitors while the site is prepared
// for launch. The real site (Navbar, routes, Footer, etc.) is intentionally
// kept in the codebase and simply not rendered — see App.jsx. Reuses the
// locked theme tokens (background #0a0a0a, neon cyan, Inter, glow utilities);
// do not introduce new colors here.
export default function ComingSoon() {
    return (
        <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
            <div className="absolute inset-0 bg-spotlight" aria-hidden="true" />

            <main className="relative z-10 flex flex-col items-center text-center max-w-2xl">
                <img
                    src={logo}
                    alt="MachinePulseAI"
                    className="h-16 w-auto mb-8 hero-media-glow"
                />

                <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[#00f5ff]/40 text-[#00f5ff] text-sm font-medium tracking-wide glow-border-cyan">
                    Coming Soon
                </span>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 glow-text-cyan">
                    Something big is on the way
                </h1>

                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                    MachinePulseAI is an AI-powered post-processing analytics platform
                    for vibration, acoustic and test data — helping engineers turn
                    massive datasets into insights in seconds.
                </p>

                <p className="mt-8 text-sm text-gray-500">
                    We're putting the finishing touches on our launch. Stay tuned.
                </p>
            </main>
        </div>
    )
}
