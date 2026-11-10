import { Link } from 'react-router-dom'

/** Compact introduction shared by the widget guides. */
export default function LearningHero({ backTo = '/widgets', backLabel, eyebrow, title, intro, startLabel, startHref = '#interface', children }) {
    return <header className="relative mx-auto max-w-6xl px-6 pb-8 pt-6">
        <Link to={backTo} className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
            <span aria-hidden="true">←</span>{backLabel}
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan">{eyebrow}</p>
        <div className="mt-3 flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <h1 className="min-w-0 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
            <a href={startHref} className="btn-neon flex-none whitespace-nowrap rounded-lg bg-neon-cyan/10 px-5 py-3 text-sm font-semibold text-neon-cyan">{startLabel}</a>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">{intro}</p>
        {children}
    </header>
}
