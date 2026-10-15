import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App, { preloadRoute } from './App.jsx'
import './index.css'
import i18n from './i18n'

const tree = (
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>
)

async function bootstrap() {
    const container = document.getElementById('root')
    // Set by scripts/prerender.mjs on pages whose HTML was rendered at build time.
    const prerenderLang = container.dataset.prerenderLang

    if (!i18n.isInitialized) await new Promise((resolve) => i18n.on('initialized', resolve))
    // Resolve the current page chunk first so the first render doesn't suspend.
    await preloadRoute(window.location.pathname)

    // Hydrate only when the visitor's language matches the prerendered markup;
    // otherwise render from scratch (React replaces the prerendered content).
    if (prerenderLang && i18n.language?.startsWith(prerenderLang)) {
        ReactDOM.hydrateRoot(container, tree)
    } else {
        ReactDOM.createRoot(container).render(tree)
    }
}

bootstrap()
