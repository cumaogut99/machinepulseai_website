import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import FFT_WIDGET_DETAILS from '../data/widgetDetails.fft.js'
import FFTConceptLab from './fftLearning/FFTConceptLab.jsx'
import FFTFundamentals from './fftLearning/FFTFundamentals.jsx'
import WidgetInterfaceTour from './learning/WidgetInterfaceTour.jsx'
import FFTModeGuide from './fftLearning/FFTModeGuide.jsx'
import {
    FFTEngineeringReference,
    FFTFormulaReference,
} from './fftLearning/FFTReference.jsx'

const NAV_KEYS = [
    'interface',
    'theory',
    'foundations',
    'modes',
    'workflow',
]

// Highlight the nav entry for the section currently under the sticky bar.
function useActiveSection(sectionIds) {
    const [activeId, setActiveId] = useState(sectionIds[0])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top - b.boundingClientRect.top,
                    )
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00f5ff]">
                {eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {title}
            </h2>
            {intro && (
                <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
                    {intro}
                </p>
            )}
        </div>
    )
}

export default function FFTSpectrumLearning() {
    const { t, i18n } = useTranslation()
    const lang = i18n.language?.startsWith('tr') ? 'tr' : 'en'
    const detail = FFT_WIDGET_DETAILS.fft_spectrum[lang]
    const badges = t('fftLearn.badges', { returnObjects: true })
    const outcomes = t('fftLearn.outcomes', { returnObjects: true })
    const factsheet = t('fftLearn.factsheet', { returnObjects: true })
    const why = t('fftLearn.why.items', { returnObjects: true })
    const pipelineSteps = t('fftLearn.pipeline.steps', { returnObjects: true })
    const workflowSteps = t('fftLearn.workflow.steps', { returnObjects: true })
    const mistakes = t('fftLearn.mistakes.items', { returnObjects: true })
    const activeSection = useActiveSection(NAV_KEYS)

    return (
        <article className="relative overflow-hidden bg-grid">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute right-[10%] top-24 h-96 w-96 rounded-full bg-[#00f5ff]/[0.06] blur-[140px]" />
            <div className="pointer-events-none absolute left-[5%] top-[40%] h-96 w-96 rounded-full bg-[#a855f7]/[0.05] blur-[150px]" />

            <header className="relative mx-auto max-w-6xl px-6 pb-10 pt-8">
                {/* Back Link */}
                <Link
                    to="/widgets"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white mb-6"
                >
                    <span aria-hidden="true">←</span>
                    {t('fftLearn.back')}
                </Link>

                {/* ── 2-Column Hero: Left Intro + Right Factsheet Card ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
                    
                    {/* Left Column (Content & CTAs) */}
                    <div className="lg:col-span-7">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00f5ff]">
                            {t('fftLearn.eyebrow')}
                        </p>
                        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                            {t('fftLearn.title')}
                        </h1>
                        <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300 max-w-2xl">
                            {t('fftLearn.intro')}
                        </p>
                        
                        {/* Scope Badges */}
                        <div className="mt-5 flex flex-wrap gap-2">
                            {badges.map((badge) => (
                                <span
                                    key={badge}
                                    className="rounded-full border border-[#00f5ff]/20 bg-[#00f5ff]/[0.05] px-3 py-1 text-xs font-medium text-slate-300"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>

                        {/* Action CTA + Duration */}
                        <div className="mt-6 flex flex-wrap items-center gap-4">
                            <a
                                href="#interface"
                                className="btn-neon inline-flex items-center gap-2 rounded-lg bg-[#00f5ff]/10 px-5 py-2.5 text-sm font-semibold text-[#00f5ff] transition hover:bg-[#00f5ff]/20"
                            >
                                {t('fftLearn.start')}
                                <span aria-hidden="true">↓</span>
                            </a>
                            <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff]" />
                                {t('fftLearn.duration')}
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Module Factsheet / Quick Spec Card */}
                    <div className="lg:col-span-5">
                        <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 shadow-2xl overflow-hidden">
                            {/* Glowing accent border */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/60 to-transparent" />

                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/8">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff]" />
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                                        {factsheet.title}
                                    </h3>
                                </div>
                                <span className="text-[10px] font-semibold text-[#00f5ff] bg-[#00f5ff]/10 px-2 py-0.5 rounded border border-[#00f5ff]/20 uppercase">
                                    {factsheet.status}
                                </span>
                            </div>

                            <dl className="space-y-3 text-xs">
                                <div>
                                    <dt className="text-slate-400 font-medium flex items-center gap-1.5">
                                        <span className="text-[#00f5ff]">📥</span> {factsheet.inputLabel}
                                    </dt>
                                    <dd className="text-white font-mono mt-0.5 pl-5 text-[11px] leading-relaxed">
                                        {factsheet.inputVal}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-slate-400 font-medium flex items-center gap-1.5">
                                        <span className="text-[#00f5ff]">📤</span> {factsheet.outputLabel}
                                    </dt>
                                    <dd className="text-white font-mono mt-0.5 pl-5 text-[11px] leading-relaxed">
                                        {factsheet.outputVal}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-slate-400 font-medium flex items-center gap-1.5">
                                        <span className="text-[#a855f7]">⚙️</span> {factsheet.paramsLabel}
                                    </dt>
                                    <dd className="text-slate-300 mt-0.5 pl-5 text-[11px] leading-relaxed">
                                        {factsheet.paramsVal}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-slate-400 font-medium flex items-center gap-1.5">
                                        <span className="text-[#3b82f6]">🎯</span> {factsheet.targetsLabel}
                                    </dt>
                                    <dd className="text-slate-300 mt-0.5 pl-5 text-[11px] leading-relaxed">
                                        {factsheet.targetsVal}
                                    </dd>
                                </div>
                            </dl>

                            {/* Mini Outline Jump Links */}
                            <div className="mt-4 pt-3 border-t border-white/8 flex items-center justify-between text-[11px]">
                                <span className="text-slate-500 font-medium">
                                    {factsheet.quickJump}:
                                </span>
                                <div className="flex items-center gap-2">
                                    <a href="#interface" className="text-slate-400 hover:text-[#00f5ff] transition">
                                        {t('fftLearn.nav.interface').split(' ')[0]}
                                    </a>
                                    <span className="text-slate-600">·</span>
                                    <a href="#theory" className="text-slate-400 hover:text-[#00f5ff] transition">
                                        {t('fftLearn.nav.theory').split(' ')[0]}
                                    </a>
                                    <span className="text-slate-600">·</span>
                                    <a href="#modes" className="text-slate-400 hover:text-[#00f5ff] transition">
                                        {t('fftLearn.nav.modes').split(' ')[0]}
                                    </a>
                                    <span className="text-slate-600">·</span>
                                    <a href="#workflow" className="text-slate-400 hover:text-[#00f5ff] transition">
                                        {t('fftLearn.nav.workflow').split(' ')[0]}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Why Section ── */}
                <section className="mt-8" aria-labelledby="fft-why">
                    <h2 id="fft-why" className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-4">
                        {t('fftLearn.why.title')}
                    </h2>
                    <div className="grid gap-3 lg:grid-cols-3">
                        {why.map((item) => (
                            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                                <h3 className="text-sm font-semibold text-[#00f5ff]">{item.title}</h3>
                                <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.body}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* ── Outcomes ── */}
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-5">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                        {t('fftLearn.outcomesTitle')}
                    </h2>
                    <div className="grid gap-2.5 md:grid-cols-2">
                        {outcomes.map((outcome) => (
                            <div
                                key={outcome}
                                className="flex gap-2.5 text-xs leading-5 text-slate-300"
                            >
                                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-[#00f5ff]" />
                                <span>{outcome}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Sticky Navigation Bar */}
            <nav
                aria-label={t('fftLearn.eyebrow')}
                className="sticky top-14 z-30 border-y border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl"
            >
                <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 sm:gap-3">
                    {NAV_KEYS.map((key, index) => {
                        const isActive = activeSection === key
                        return (
                            <a
                                key={key}
                                href={`#${key}`}
                                aria-current={isActive ? 'true' : undefined}
                                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-2 py-4 text-sm font-semibold transition sm:px-3 ${
                                    isActive
                                        ? 'border-[#00f5ff] text-[#00f5ff]'
                                        : 'border-transparent text-slate-300 hover:border-white/25 hover:text-white'
                                }`}
                            >
                                <span
                                    className={`font-mono text-xs ${
                                        isActive
                                            ? 'text-[#00f5ff]'
                                            : 'text-slate-600'
                                    }`}
                                >
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                {t(`fftLearn.nav.${key}`)}
                            </a>
                        )
                    })}
                </div>
            </nav>

            {/* Main Sections */}
            <main className="relative mx-auto max-w-6xl px-6">
                <section id="interface" className="scroll-mt-32 py-16">
                    <SectionHeader
                        eyebrow={t('fftLearn.sectionEyebrow.interface')}
                        title={t('fftLearn.tour.title')}
                        intro={t('fftLearn.tour.intro')}
                    />
                    <WidgetInterfaceTour widgetId="fft_spectrum" name="FFT / Spectrum" />
                </section>

                <section
                    id="theory"
                    className="scroll-mt-32 border-t border-white/8 py-16"
                >
                    <SectionHeader
                        eyebrow={t('fftTheory.eyebrow')}
                        title={t('fftTheory.title')}
                        intro={t('fftTheory.intro')}
                    />
                    <FFTFundamentals />
                </section>

                <section
                    id="foundations"
                    className="scroll-mt-32 border-t border-white/8 py-16"
                >
                    <SectionHeader
                        eyebrow={t('fftLearn.sectionEyebrow.foundations')}
                        title={t('fftLearn.lab.title')}
                        intro={t('fftLearn.lab.intro')}
                    />
                    <FFTConceptLab />
                </section>

                <section
                    id="modes"
                    className="scroll-mt-32 border-t border-white/8 py-16"
                >
                    <SectionHeader
                        eyebrow={t('fftLearn.sectionEyebrow.modes')}
                        title={t('fftLearn.modes.title')}
                        intro={t('fftLearn.modes.intro')}
                    />
                    <FFTModeGuide />

                    <div className="mt-14">
                        <SectionHeader
                            eyebrow={t('fftLearn.sectionEyebrow.pipeline')}
                            title={t('fftLearn.pipeline.title')}
                            intro={t('fftLearn.pipeline.intro')}
                        />
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {pipelineSteps.map((step, index) => (
                                <article
                                    key={step.title}
                                    className="relative rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                                >
                                    <span className="font-mono text-xs text-[#00f5ff]">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="mt-3 font-semibold text-white">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        {step.body}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    id="workflow"
                    className="scroll-mt-32 border-t border-white/8 py-16"
                >
                    <SectionHeader
                        eyebrow={t('fftLearn.sectionEyebrow.workflow')}
                        title={t('fftLearn.workflow.title')}
                        intro={t('fftLearn.workflow.intro')}
                    />
                    <ol className="grid gap-3 md:grid-cols-2">
                        {workflowSteps.map((step, index) => (
                            <li
                                key={step.title}
                                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                            >
                                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/[0.06] font-mono text-xs text-[#00f5ff]">
                                    {index + 1}
                                </span>
                                <div>
                                    <h3 className="font-semibold text-white">
                                        {step.title}
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-slate-400">
                                        {step.body}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-14">
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">
                            {t('fftLearn.mistakes.title')}
                        </h2>
                        <div className="mt-6 grid gap-3 lg:grid-cols-2">
                            {mistakes.map((mistake) => (
                                <details
                                    key={mistake.title}
                                    className="group rounded-2xl border border-[#a855f7]/20 bg-[#a855f7]/[0.035] open:border-[#a855f7]/40"
                                >
                                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-sm font-semibold leading-6 text-white">
                                        {mistake.title}
                                        <span
                                            aria-hidden="true"
                                            className="text-lg font-normal text-[#a855f7] transition group-open:rotate-45"
                                        >
                                            +
                                        </span>
                                    </summary>
                                    <p className="border-t border-[#a855f7]/10 px-5 py-4 text-sm leading-6 text-slate-400">
                                        {mistake.body}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>

                    <div className="mt-14 border-t border-white/8 pt-14">
                        <SectionHeader
                            eyebrow={t('fftLearn.sectionEyebrow.reference')}
                            title={t('fftLearn.reference.formulasTitle')}
                            intro={t('fftLearn.reference.formulasIntro')}
                        />
                        <FFTFormulaReference formulas={detail.formulas} />
                    </div>

                    <div className="mt-14 border-t border-white/8 pt-14">
                        <FFTEngineeringReference detail={detail} />
                    </div>
                </section>
            </main>
        </article>
    )
}
