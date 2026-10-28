import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import WIDGET_CATALOG from '../data/widgetCatalog.js'
import { getWidgetDetailSlug } from '../data/widgetDetails.js'
import { REFERENCES } from '../data/learning/lesson.js'
import { FormulaSpecGrid, LearningCards, LearningHeading, LearningNavigation } from './learning/LearningPrimitives.jsx'
import LearningWorkbench from './learning/LearningWorkbench.jsx'
import LearningExercise from './learning/LearningExercise.jsx'
import LearningConceptLab from './learning/LearningConceptLab.jsx'
import { CONCEPT_LABS } from '../data/learning/conceptLabs.js'
import { INTERFACE_TOUR_IDS } from '../data/learning/interfaceTours.js'
import WidgetInterfaceTour from './learning/WidgetInterfaceTour.jsx'

const SECTION_IDS = ['workspace', 'theory', 'example', 'workflow', 'references']

export default function WidgetLearningPage({ guide }) {
    const { t, i18n } = useTranslation()
    const lang = i18n.language?.startsWith('tr') ? 'tr' : 'en'
    const labels = t('widgetLearn.common', { returnObjects: true })
    const page = t(`widgetLearn.pages.${guide.id}`, { returnObjects: true })
    const category = WIDGET_CATALOG.find((item) => item.widgets.some((widget) => widget.id === guide.id))
    const widget = category.widgets.find((item) => item.id === guide.id)
    const name = widget[lang].name
    const hasTour = INTERFACE_TOUR_IDS.includes(guide.id)
    const related = guide.related.map((id) => WIDGET_CATALOG.flatMap((item) => item.widgets).find((item) => item.id === id))

    return <article className="relative bg-grid">
        <div className="pointer-events-none absolute right-[10%] top-24 h-96 w-96 rounded-full bg-neon-cyan/[0.06] blur-[140px]" />
        <header className="relative mx-auto max-w-6xl px-6 pb-12 pt-10">
            <Link to={`/widgets?category=${category.id}`} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><span aria-hidden="true">←</span>{labels.back}</Link>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan">{category[lang].name} · {labels.eyebrow}</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{page.title || name}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">{page.intro}</p>
            <div className="mt-6 flex flex-wrap gap-2">{(page.exercise ? labels.badges : labels.badges.slice(0, 2)).map((badge) => <span key={badge} className="rounded-full border border-neon-cyan/20 bg-neon-cyan/[0.05] px-3 py-1 text-xs font-medium text-slate-300">{badge}</span>)}</div>
            <a href="#workspace" className="btn-neon mt-7 inline-flex rounded-lg bg-neon-cyan/10 px-5 py-3 text-sm font-semibold text-neon-cyan">{labels.start} <span className="ml-3" aria-hidden="true">↓</span></a>
            {page.why?.length > 0 && <section className="mt-12" aria-labelledby="why-title">
                <h2 id="why-title" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{labels.whyTitle}</h2>
                <div className="mt-6 grid gap-3 lg:grid-cols-3">{page.why.map((item) => <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6"><h3 className="text-base font-semibold text-neon-cyan">{item.title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{item.body}</p></article>)}</div>
            </section>}
            <div className={`${page.why?.length > 0 ? 'mt-6' : 'mt-10'} rounded-2xl border border-white/10 bg-black/25 p-5 sm:p-7`}>
                <h2 className="text-sm font-semibold text-white">{labels.outcomes}</h2>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">{page.concepts.map((item) => <li key={item.name} className="flex gap-3 text-sm leading-6 text-slate-300"><span className="text-neon-cyan" aria-hidden="true">✓</span>{item.name}</li>)}</ul>
                <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-7 text-slate-400"><strong className="text-slate-200">{labels.purpose}: </strong>{page.use}</p>
            </div>
        </header>
        <LearningNavigation ids={SECTION_IDS} labels={labels.nav} title={labels.eyebrow} />
        <div className="relative mx-auto max-w-6xl px-6">
            <section id="workspace" className="scroll-mt-32 py-16">
                <LearningHeading number="01" title={labels.workspace} intro={hasTour ? t('vibrationLearn.interface.tourIntro') : undefined} />
                {hasTour && <WidgetInterfaceTour widgetId={guide.id} name={name} />}
                {hasTour && <h3 className="mb-5 mt-12 text-xl font-bold text-white">{labels.controlGuide}</h3>}
                <LearningWorkbench key={`${guide.id}:${lang}`} widgetId={guide.id} name={name} controls={page.controls} inputs={page.inputs} outputs={page.outputs} lang={lang} />
                <div className="mt-10"><h3 className="mb-5 text-xl font-bold text-white">{labels.source}</h3><LearningCards items={page.inputs} /></div>
            </section>
            <section id="theory" className="scroll-mt-32 border-t border-white/10 py-16">
                <LearningHeading number="02" title={labels.theory} intro={labels.theoryIntro} />
                <LearningCards items={page.concepts} />
            </section>
            <section id="example" className="scroll-mt-32 border-t border-white/10 py-16">
                <LearningHeading number="03" title={labels.example} intro={labels.illustrative} />
                <div className="rounded-2xl border border-neon-cyan/20 bg-neon-cyan/[0.035] p-6 sm:p-8">
                    <h3 className="text-xl font-semibold text-white">{page.example.title}</h3>
                    <p className="mt-5 break-words font-mono text-lg leading-8 text-neon-cyan sm:text-2xl">{page.example.value}</p>
                    <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">{page.example.explanation}</p>
                </div>
                {CONCEPT_LABS[guide.id] && <LearningConceptLab key={`lab:${guide.id}:${lang}`} widgetId={guide.id} lang={lang} />}
                {page.exercise && <LearningExercise key={`${guide.id}:${lang}`} widgetId={guide.id} exercise={page.exercise} lang={lang} />}
            </section>
            <section id="workflow" className="scroll-mt-32 border-t border-white/10 py-16">
                <LearningHeading number="04" title={labels.workflow} />
                <ol className="grid gap-4 md:grid-cols-3">{page.steps.map((step, index) => <li key={step.name} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><span className="font-mono text-xs text-neon-cyan">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-3 font-semibold text-white">{step.name}</h3><p className="mt-2 text-sm leading-7 text-slate-400">{step.desc}</p></li>)}</ol>
                <h3 className="mb-5 mt-10 text-xl font-bold text-white">{labels.result}</h3><LearningCards items={page.outputs} />
                <h3 className="mb-5 mt-10 text-xl font-bold text-white">{labels.mistakes}</h3>
                <div className="grid gap-3 md:grid-cols-2">{page.pitfalls.map((item) => <details key={item.name} className="group rounded-2xl border border-neon-purple/20 bg-neon-purple/[0.035]"><summary className="flex cursor-pointer list-none justify-between gap-4 p-5 text-sm font-semibold leading-6 text-white">{item.name}<span aria-hidden="true" className="text-lg text-neon-purple group-open:rotate-45">+</span></summary><p className="border-t border-white/10 p-5 text-sm leading-7 text-slate-400">{item.desc}</p></details>)}</div>
                <div className="mt-14 border-t border-white/10 pt-14">
                    <LearningHeading number={labels.specEyebrow} title={labels.equations} intro={labels.equationsIntro} />
                    <FormulaSpecGrid formulas={page.formulas} />
                </div>
            </section>
            <section id="references" className="scroll-mt-32 border-t border-white/10 py-16">
                <LearningHeading number="05" title={labels.references} intro={labels.referencesIntro} />
                <div className="grid gap-3 md:grid-cols-2">{guide.references.map((key) => <a key={key} href={REFERENCES[key].href} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-sm font-semibold text-slate-300 transition hover:border-neon-cyan/40 hover:text-white">{REFERENCES[key].title}<span className="ml-3 text-neon-cyan" aria-hidden="true">↗</span></a>)}</div>
                <h3 className="mb-5 mt-10 text-xl font-bold text-white">{labels.next}</h3>
                <div className="grid gap-4 md:grid-cols-2">{related.map((item) => <Link key={item.id} to={`/widgets/${getWidgetDetailSlug(item.id)}`} className="card-hover-glow rounded-2xl border border-white/10 bg-white/[0.025] p-5"><h4 className="font-semibold text-white">{item[lang].name}</h4><span className="mt-3 inline-flex text-sm text-neon-cyan">{labels.open} <span className="ml-2" aria-hidden="true">→</span></span></Link>)}</div>
            </section>
        </div>
    </article>
}
