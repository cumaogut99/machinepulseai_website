import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import LearningWorkbench from './learning/LearningWorkbench.jsx'
import LearningExercise from './learning/LearningExercise.jsx'
import LearningConceptLab from './learning/LearningConceptLab.jsx'
import { CONCEPT_LABS } from '../data/learning/conceptLabs.js'
import { getWidgetScreenshot } from '../data/learning/screenshots.js'

const NAV_KEYS = ['interface', 'theory', 'foundations', 'modes', 'workflow']

function useActiveSection(sectionIds) {
    const [activeId, setActiveId] = useState(sectionIds[0])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
                if (visible.length > 0) setActiveId(visible[0].target.id)
            },
            { rootMargin: '-120px 0px -55% 0px', threshold: 0 },
        )
        sectionIds.forEach((id) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })
        return () => observer.disconnect()
    }, [sectionIds])

    return activeId
}

function SectionHeader({ eyebrow, title, intro }) {
    return (
        <div className="mb-7 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00f5ff]">{eyebrow}</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
            {intro && <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">{intro}</p>}
        </div>
    )
}

function FormulaCard({ formula }) {
    const html = useMemo(
        () => katex.renderToString(formula.latex || formula.expr, { displayMode: true, throwOnError: false }),
        [formula.expr, formula.latex],
    )
    return (
        <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <h3 className="font-semibold text-white">{formula.title}</h3>
            <div className="mt-4 overflow-x-auto rounded-xl border border-[#00f5ff]/15 bg-black/30 px-3 py-4 text-white/90" dangerouslySetInnerHTML={{ __html: html }} />
            <p className="mt-4 text-sm leading-6 text-slate-400">{formula.where}</p>
        </article>
    )
}

function DetailCards({ items, accent = false }) {
    return (
        <div className="grid gap-3 md:grid-cols-2">
            {items.map((item) => (
                <article key={item.name} className={`rounded-2xl border p-5 ${accent ? 'border-[#00f5ff]/20 bg-[#00f5ff]/[0.035]' : 'border-white/10 bg-white/[0.025]'}`}>
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.desc}</p>
                </article>
            ))}
        </div>
    )
}

export default function VibrationWidgetLearning({ widgetId }) {
    const { t, i18n } = useTranslation()
    const lang = i18n.language?.startsWith('tr') ? 'tr' : 'en'
    const tour = t(`widgetLearn.vibration.${widgetId}`, { returnObjects: true })
    const page = t(`vibrationLearn.widgets.${widgetId}`, { returnObjects: true })
    const detail = page.detail
    const activeSection = useActiveSection(NAV_KEYS)

    return (
        <article className="relative overflow-x-clip bg-grid">
            <div className="pointer-events-none absolute right-[10%] top-24 h-96 w-96 rounded-full bg-[#00f5ff]/[0.06] blur-[140px]" />
            <div className="pointer-events-none absolute left-[5%] top-[42%] h-96 w-96 rounded-full bg-[#a855f7]/[0.05] blur-[150px]" />

            <header className="relative mx-auto max-w-6xl px-6 pb-12 pt-10">
                <Link to="/widgets" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
                    <span aria-hidden="true">←</span>{t('vibrationLearn.back')}
                </Link>
                <div className="mt-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00f5ff]">{t('vibrationLearn.eyebrow')}</p>
                    <h1 className="mt-4 max-w-5xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{page.title}</h1>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">{page.intro}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {page.badges.map((badge) => <span key={badge} className="rounded-full border border-[#00f5ff]/20 bg-[#00f5ff]/[0.05] px-3 py-1 text-xs font-medium text-slate-300">{badge}</span>)}
                    </div>
                    <div className="mt-7 flex flex-wrap items-center gap-4">
                        <a href="#interface" className="btn-neon rounded-lg bg-[#00f5ff]/10 px-5 py-3 text-sm font-semibold text-[#00f5ff]">{t('vibrationLearn.start')}</a>
                        <span className="text-xs text-slate-500">{page.duration}</span>
                    </div>
                </div>
                <div className="mt-12 rounded-2xl border border-white/10 bg-black/25 p-5 sm:p-6">
                    <h2 className="text-sm font-semibold text-white">{t('vibrationLearn.outcomesTitle')}</h2>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {page.outcomes.map((outcome) => <div key={outcome} className="flex gap-3 text-sm leading-6 text-slate-400"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#00f5ff]" /><span>{outcome}</span></div>)}
                    </div>
                </div>
            </header>

            <nav aria-label={t('vibrationLearn.eyebrow')} className="sticky top-14 z-30 border-y border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 sm:gap-3">
                    {NAV_KEYS.map((key, index) => (
                        <a key={key} href={`#${key}`} aria-current={activeSection === key ? 'true' : undefined} className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-2 py-4 text-sm font-semibold transition sm:px-3 ${activeSection === key ? 'border-[#00f5ff] text-[#00f5ff]' : 'border-transparent text-slate-300 hover:border-white/25 hover:text-white'}`}>
                            <span className={`font-mono text-xs ${activeSection === key ? 'text-[#00f5ff]' : 'text-slate-600'}`}>{String(index + 1).padStart(2, '0')}</span>
                            {t(`vibrationLearn.nav.${key}`)}
                        </a>
                    ))}
                </div>
            </nav>

            <main className="relative mx-auto max-w-6xl px-6">
                <section id="interface" className="scroll-mt-32 py-16">
                    <SectionHeader eyebrow={t('vibrationLearn.sectionEyebrow.interface')} title={page.interface.title} intro={t(getWidgetScreenshot(widgetId) ? 'widgetLearn.common.screenshotIntro' : 'widgetLearn.common.workspaceIntro')} />
                    <LearningWorkbench key={`${widgetId}:${lang}`} widgetId={widgetId} name={page.title} controls={tour.controls} inputs={detail.inputs} outputs={detail.outputs} lang={lang} />
                    <div className="mt-12">
                        <SectionHeader eyebrow={t('vibrationLearn.sectionEyebrow.interface')} title={t('vibrationLearn.interface.inputsTitle')} intro={t('vibrationLearn.interface.inputsIntro')} />
                        <DetailCards items={detail.inputs} />
                    </div>
                </section>

                <section id="theory" className="scroll-mt-32 border-t border-white/8 py-16">
                    <SectionHeader eyebrow={t('vibrationLearn.sectionEyebrow.theory')} title={page.theory.title} intro={page.theory.intro} />
                    <div className="grid gap-4 lg:grid-cols-3">
                        {page.theory.cards.map((card) => <article key={card.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><span className="font-mono text-xs text-[#00f5ff]">{card.kicker}</span><h3 className="mt-3 text-lg font-semibold text-white">{card.title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{card.body}</p></article>)}
                    </div>
                    <div className="mt-14 border-t border-white/8 pt-14">
                        <SectionHeader eyebrow={t('vibrationLearn.sectionEyebrow.theory')} title={t('vibrationLearn.theory.formulaTitle')} intro={t('vibrationLearn.theory.formulaIntro')} />
                        <div className="grid gap-4 lg:grid-cols-2">{detail.formulas.map((formula) => <FormulaCard key={formula.title} formula={formula} />)}</div>
                    </div>
                </section>

                <section id="foundations" className="scroll-mt-32 border-t border-white/8 py-16">
                    <SectionHeader eyebrow={t('vibrationLearn.sectionEyebrow.foundations')} title={page.foundations.title} intro={page.foundations.intro} />
                    <div className="grid gap-4 lg:grid-cols-3">
                        {page.foundations.cards.map((card) => <article key={card.title} className="rounded-2xl border border-[#3b82f6]/20 bg-[#3b82f6]/[0.035] p-5"><h3 className="font-semibold text-white">{card.title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{card.body}</p></article>)}
                    </div>
                    {detail.assumptions?.length > 0 && <div className="mt-14"><SectionHeader eyebrow={t('vibrationLearn.sectionEyebrow.foundations')} title={t('vibrationLearn.foundations.assumptionsTitle')} intro={t('vibrationLearn.foundations.assumptionsIntro')} /><DetailCards items={detail.assumptions} /></div>}
                </section>

                <section id="modes" className="scroll-mt-32 border-t border-white/8 py-16">
                    <SectionHeader eyebrow={t('vibrationLearn.sectionEyebrow.modes')} title={page.modes.title} intro={page.modes.intro} />
                    <div className="grid gap-4 lg:grid-cols-3">
                        {page.modes.items.map((mode) => <article key={mode.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><h3 className="text-lg font-semibold text-white">{mode.title}</h3><dl className="mt-4 space-y-4 text-sm"><div><dt className="font-semibold text-[#00f5ff]">{t('vibrationLearn.modes.bestFor')}</dt><dd className="mt-1 leading-6 text-slate-400">{mode.bestFor}</dd></div><div><dt className="font-semibold text-white">{t('vibrationLearn.modes.reveals')}</dt><dd className="mt-1 leading-6 text-slate-400">{mode.reveals}</dd></div><div><dt className="font-semibold text-[#a855f7]">{t('vibrationLearn.modes.watch')}</dt><dd className="mt-1 leading-6 text-slate-400">{mode.watch}</dd></div></dl></article>)}
                    </div>
                    <div className="mt-14"><SectionHeader eyebrow={t('vibrationLearn.sectionEyebrow.modes')} title={t('vibrationLearn.modes.interpretationTitle')} intro={page.interpretation.intro} /><div className="grid gap-3 lg:grid-cols-3">{page.interpretation.items.map((item) => <article key={item.title} className="rounded-2xl border border-[#a855f7]/20 bg-[#a855f7]/[0.035] p-5"><h3 className="font-semibold text-white">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{item.signal}</p><p className="mt-3 text-sm leading-6 text-slate-400">{item.meaning}</p><p className="mt-3 border-t border-[#a855f7]/10 pt-3 text-xs leading-6 text-slate-500">{item.confirm}</p></article>)}</div></div>
                    <div className="mt-14"><SectionHeader eyebrow={t('vibrationLearn.sectionEyebrow.modes')} title={t('vibrationLearn.modes.outputsTitle')} /><DetailCards items={detail.outputs} accent /></div>
                    {detail.exampleMetrics?.length > 0 && <div className="mt-10"><h3 className="mb-5 text-xl font-bold text-white">{t('vibrationLearn.modes.examplesTitle')}</h3><p className="mb-5 text-xs text-slate-400">{t('widgetLearn.common.illustrative')}</p><div className="grid gap-3 md:grid-cols-2">{detail.exampleMetrics.map((metric) => <article key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><p className="font-mono text-sm font-semibold text-[#00f5ff]">{metric.value}</p><h4 className="mt-2 font-semibold text-white">{metric.label}</h4><p className="mt-1 text-sm leading-6 text-slate-400">{metric.desc}</p></article>)}</div></div>}
                    {CONCEPT_LABS[widgetId] && <LearningConceptLab key={`lab:${widgetId}:${lang}`} widgetId={widgetId} lang={lang} />}
                    <LearningExercise key={`${widgetId}:${lang}`} widgetId={widgetId} exercise={tour.exercise} lang={lang} />
                </section>

                <section id="workflow" className="scroll-mt-32 border-t border-white/8 py-16">
                    <SectionHeader eyebrow={t('vibrationLearn.sectionEyebrow.workflow')} title={page.workflow.title} intro={page.workflow.intro} />
                    <h3 className="mb-5 text-xl font-bold text-white">{t('vibrationLearn.workflow.calculationTitle')}</h3>
                    <ol className="grid gap-3 md:grid-cols-2">{detail.steps.map((step, index) => <li key={step.step} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5"><span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/[0.06] font-mono text-xs text-[#00f5ff]">{index + 1}</span><div><h4 className="font-semibold text-white">{step.step}</h4><p className="mt-1 text-sm leading-6 text-slate-400">{step.detail}</p></div></li>)}</ol>
                    <div className="mt-14 rounded-2xl border border-[#00f5ff]/20 bg-[#00f5ff]/[0.035] p-6"><h3 className="text-xl font-bold text-white">{t('vibrationLearn.workflow.checklistTitle')}</h3><div className="mt-5 grid gap-3 md:grid-cols-2">{page.workflow.checklist.map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><span className="text-[#00f5ff]">✓</span><span>{item}</span></div>)}</div></div>
                    <div className="mt-14"><h3 className="text-2xl font-bold text-white sm:text-3xl">{t('vibrationLearn.workflow.mistakesTitle')}</h3><div className="mt-6 grid gap-3 lg:grid-cols-2">{page.mistakes.map((mistake) => <details key={mistake.title} className="group rounded-2xl border border-[#a855f7]/20 bg-[#a855f7]/[0.035] open:border-[#a855f7]/40"><summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-sm font-semibold leading-6 text-white">{mistake.title}<span aria-hidden="true" className="text-lg font-normal text-[#a855f7] transition group-open:rotate-45">+</span></summary><p className="border-t border-[#a855f7]/10 px-5 py-4 text-sm leading-6 text-slate-400">{mistake.body}</p></details>)}</div></div>
                    <div className="mt-14 border-t border-white/8 pt-14"><SectionHeader eyebrow={t('vibrationLearn.sectionEyebrow.workflow')} title={t('vibrationLearn.workflow.referencesTitle')} intro={t('vibrationLearn.workflow.referencesIntro')} /><div className="grid gap-3 md:grid-cols-2">{page.sources.map((source) => <a key={source.title} href={source.href} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-[#00f5ff]/30"><h3 className="font-semibold text-white">{source.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{source.note}</p></a>)}</div></div>
                </section>
            </main>
        </article>
    )
}
