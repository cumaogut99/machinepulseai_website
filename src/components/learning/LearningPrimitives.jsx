import { useEffect, useMemo, useState } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export function LearningHeading({ number, title, intro }) {
    return <div className="mb-7 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan">{number}</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
        {intro && <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">{intro}</p>}
    </div>
}

export function LearningCards({ items }) {
    return <div className="grid gap-4 md:grid-cols-2">
        {items.map(({ name, desc }) => <article key={name} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{desc}</p>
        </article>)}
    </div>
}

export function LearningFormula({ formula }) {
    const html = useMemo(() => katex.renderToString(formula.latex, {
        displayMode: true, throwOnError: false, strict: 'ignore',
    }), [formula.latex])
    return <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
        <h3 className="font-semibold text-white">{formula.title}</h3>
        <div className="mt-4 overflow-x-auto rounded-xl border border-neon-cyan/20 bg-black/30 px-3 py-4 text-white/90" dangerouslySetInnerHTML={{ __html: html }} />
        <p className="mt-4 text-sm leading-7 text-slate-400">{formula.where}</p>
    </article>
}

export function LearningNavigation({ ids, labels, title }) {
    const [active, setActive] = useState(ids[0])
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const first = entries.filter((entry) => entry.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
            if (first) setActive(first.target.id)
        }, { rootMargin: '-120px 0px -55% 0px', threshold: 0 })
        ids.forEach((id) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })
        return () => observer.disconnect()
    }, [ids])
    return <nav aria-label={title} className="sticky top-14 z-30 border-y border-white/10 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 sm:gap-3">
            {ids.map((id, index) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-2 py-4 text-sm font-semibold transition sm:px-3 ${active === id ? 'border-neon-cyan text-neon-cyan' : 'border-transparent text-slate-300 hover:border-white/25 hover:text-white'}`}>
                <span className="font-mono text-xs opacity-60">{String(index + 1).padStart(2, '0')}</span>{labels[index]}
            </a>)}
        </div>
    </nav>
}
