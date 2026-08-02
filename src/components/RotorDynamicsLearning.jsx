import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import RotorCriticalSpeedLab from './rotorDynamicsLearning/RotorCriticalSpeedLab.jsx'
import RotorFormulaReference from './rotorDynamicsLearning/RotorFormulaReference.jsx'
import RotorInterfacePlaceholder from './rotorDynamicsLearning/RotorInterfacePlaceholder.jsx'
import RotorModeGuide from './rotorDynamicsLearning/RotorModeGuide.jsx'
import RotorOrbitLab from './rotorDynamicsLearning/RotorOrbitLab.jsx'

const NAV_KEYS = ['interface', 'system', 'orbit', 'speed', 'views', 'workflow']
const SOURCE_URLS = [
    'https://www.iso.org/standard/63180.html?browse=tc',
    'https://www.iso.org/standard/70047.html',
    'https://www.iso.org/standard/78311.html',
    'https://blogs.sw.siemens.com/simcenter/rotor-dynamics-when-accuracy-is-a-matter-of-life-and-death/',
    'https://www.bakerhughes.com/bently-nevada/blog/vibration-and-dynamic-measurements',
    'https://dam.bakerhughes.com/m/6f984a1819b1e383/original/BN-Machinery-Diagnostics-Services-MDS-_Web-Version.PDF',
]

function SectionHeader({ eyebrow, title, intro }) {
    return (
        <div className="mb-7 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00f5ff]">{eyebrow}</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
            {intro && <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">{intro}</p>}
        </div>
    )
}

export default function RotorDynamicsLearning() {
    const { t } = useTranslation()
    const badges = t('rotorLearn.badges', { returnObjects: true })
    const outcomes = t('rotorLearn.outcomes', { returnObjects: true })
    const chain = t('rotorLearn.system.chain', { returnObjects: true })
    const contrast = t('rotorLearn.system.contrast', { returnObjects: true })
    const vocabulary = t('rotorLearn.system.vocabulary', { returnObjects: true })
    const workflow = t('rotorLearn.workflow.steps', { returnObjects: true })
    const mistakes = t('rotorLearn.mistakes.items', { returnObjects: true })
    const assumptions = t('rotorLearn.reference.assumptions', { returnObjects: true })
    const outputs = t('rotorLearn.reference.outputs', { returnObjects: true })
    const sources = t('rotorLearn.sources.items', { returnObjects: true })

    return (
        <article className="relative overflow-hidden bg-grid">
            <div className="pointer-events-none absolute right-[8%] top-20 h-96 w-96 rounded-full bg-[#00f5ff]/[0.06] blur-[140px]" />
            <div className="pointer-events-none absolute left-[3%] top-[48%] h-96 w-96 rounded-full bg-[#a855f7]/[0.05] blur-[150px]" />

            <header className="relative mx-auto max-w-6xl px-6 pb-12 pt-10">
                <Link to="/widgets" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
                    <span aria-hidden="true">←</span>{t('rotorLearn.back')}
                </Link>
                <div className="mt-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00f5ff]">{t('rotorLearn.eyebrow')}</p>
                    <h1 className="mt-4 max-w-5xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{t('rotorLearn.title')}</h1>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">{t('rotorLearn.intro')}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {badges.map((badge) => (
                            <span key={badge} className="rounded-full border border-[#00f5ff]/20 bg-[#00f5ff]/[0.05] px-3 py-1 text-xs font-medium text-slate-300">{badge}</span>
                        ))}
                    </div>
                    <div className="mt-7 flex flex-wrap items-center gap-4">
                        <a href="#system" className="btn-neon rounded-lg bg-[#00f5ff]/10 px-5 py-3 text-sm font-semibold text-[#00f5ff]">{t('rotorLearn.start')}</a>
                        <span className="text-xs text-slate-500">{t('rotorLearn.duration')}</span>
                    </div>
                </div>
                <div className="mt-12 rounded-2xl border border-white/10 bg-black/25 p-5 sm:p-6">
                    <h2 className="text-sm font-semibold text-white">{t('rotorLearn.outcomesTitle')}</h2>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {outcomes.map((outcome) => (
                            <div key={outcome} className="flex gap-3 text-sm leading-6 text-slate-400">
                                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#00f5ff]" />
                                <span>{outcome}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <nav aria-label={t('rotorLearn.eyebrow')} className="sticky top-14 z-30 border-y border-white/8 bg-[#0a0a0a]/90 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-6 py-3">
                    {NAV_KEYS.map((key) => (
                        <a key={key} href={`#${key}`} className="whitespace-nowrap text-xs font-semibold text-slate-500 transition hover:text-[#00f5ff]">{t(`rotorLearn.nav.${key}`)}</a>
                    ))}
                </div>
            </nav>

            <main className="relative mx-auto max-w-6xl px-6">
                <section id="interface" className="scroll-mt-32 py-16">
                    <SectionHeader eyebrow={t('rotorLearn.sectionEyebrow.interface')} title={t('rotorLearn.interface.title')} intro={t('rotorLearn.interface.intro')} />
                    <RotorInterfacePlaceholder />
                </section>

                <section id="system" className="scroll-mt-32 border-t border-white/8 py-16">
                    <SectionHeader eyebrow={t('rotorLearn.sectionEyebrow.system')} title={t('rotorLearn.system.title')} intro={t('rotorLearn.system.intro')} />
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
                        {chain.map((item) => (
                            <article key={item.tag} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                                <span className="font-mono text-xs text-[#00f5ff]">{item.tag}</span>
                                <h3 className="mt-3 text-sm font-semibold text-white">{item.title}</h3>
                                <p className="mt-2 text-xs leading-6 text-slate-400">{item.body}</p>
                            </article>
                        ))}
                    </div>
                    <div className="mt-12 grid gap-8 lg:grid-cols-2">
                        <div>
                            <h3 className="text-xl font-bold text-white">{t('rotorLearn.system.contrastTitle')}</h3>
                            <div className="mt-4 space-y-3">
                                {contrast.map((item) => (
                                    <article key={item.title} className="rounded-xl border border-[#00f5ff]/15 bg-[#00f5ff]/[0.035] p-5">
                                        <h4 className="text-sm font-semibold text-[#00f5ff]">{item.title}</h4>
                                        <p className="mt-2 text-xs leading-6 text-slate-400">{item.body}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{t('rotorLearn.system.vocabularyTitle')}</h3>
                            <dl className="mt-4 divide-y divide-white/8 rounded-xl border border-white/10 bg-white/[0.025] px-5">
                                {vocabulary.map((item) => (
                                    <div key={item.term} className="grid gap-2 py-4 sm:grid-cols-[7rem_1fr]">
                                        <dt className="font-mono text-xs font-semibold text-[#a855f7]">{item.term}</dt>
                                        <dd className="text-xs leading-6 text-slate-400">{item.meaning}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </section>

                <section id="orbit" className="scroll-mt-32 border-t border-white/8 py-16">
                    <SectionHeader eyebrow={t('rotorLearn.sectionEyebrow.orbit')} title={t('rotorLearn.orbitLab.title')} intro={t('rotorLearn.orbitLab.intro')} />
                    <RotorOrbitLab />
                </section>

                <section id="speed" className="scroll-mt-32 border-t border-white/8 py-16">
                    <SectionHeader eyebrow={t('rotorLearn.sectionEyebrow.speed')} title={t('rotorLearn.speedLab.title')} intro={t('rotorLearn.speedLab.intro')} />
                    <RotorCriticalSpeedLab />
                    <div className="mt-14">
                        <SectionHeader eyebrow={t('rotorLearn.sectionEyebrow.speed')} title={t('rotorLearn.formulas.title')} intro={t('rotorLearn.formulas.intro')} />
                        <RotorFormulaReference />
                    </div>
                </section>

                <section id="views" className="scroll-mt-32 border-t border-white/8 py-16">
                    <SectionHeader eyebrow={t('rotorLearn.sectionEyebrow.views')} title={t('rotorLearn.views.title')} intro={t('rotorLearn.views.intro')} />
                    <RotorModeGuide />
                </section>

                <section id="workflow" className="scroll-mt-32 border-t border-white/8 py-16">
                    <SectionHeader eyebrow={t('rotorLearn.sectionEyebrow.workflow')} title={t('rotorLearn.workflow.title')} intro={t('rotorLearn.workflow.intro')} />
                    <ol className="grid gap-3 md:grid-cols-2">
                        {workflow.map((step, index) => (
                            <li key={step.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/[0.06] font-mono text-xs text-[#00f5ff]">{index + 1}</span>
                                <div><h3 className="font-semibold text-white">{step.title}</h3><p className="mt-1 text-sm leading-6 text-slate-400">{step.body}</p></div>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-14">
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">{t('rotorLearn.mistakes.title')}</h2>
                        <div className="mt-6 grid gap-3 lg:grid-cols-2">
                            {mistakes.map((item) => (
                                <details key={item.title} className="group rounded-2xl border border-[#a855f7]/20 bg-[#a855f7]/[0.035] open:border-[#a855f7]/40">
                                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-sm font-semibold leading-6 text-white">
                                        {item.title}<span className="text-lg font-normal text-[#a855f7] transition group-open:rotate-45">+</span>
                                    </summary>
                                    <p className="border-t border-[#a855f7]/10 px-5 py-4 text-sm leading-6 text-slate-400">{item.body}</p>
                                </details>
                            ))}
                        </div>
                    </div>

                    <div className="mt-14 border-t border-white/8 pt-14">
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">{t('rotorLearn.reference.title')}</h2>
                        <div className="mt-6 grid gap-8 lg:grid-cols-2">
                            {[{ title: t('rotorLearn.reference.assumptionsTitle'), items: assumptions }, { title: t('rotorLearn.reference.outputsTitle'), items: outputs, accent: true }].map((group) => (
                                <div key={group.title}>
                                    <h3 className="text-xl font-bold text-white">{group.title}</h3>
                                    <div className="mt-4 space-y-3">
                                        {group.items.map((item) => (
                                            <article key={item.name} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                                                <h4 className={`text-sm font-semibold ${group.accent ? 'text-[#00f5ff]' : 'text-white'}`}>{item.name}</h4>
                                                <p className="mt-1 text-[13px] leading-6 text-slate-400">{item.desc}</p>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-14 border-t border-white/8 pt-14">
                        <SectionHeader eyebrow={t('rotorLearn.eyebrow')} title={t('rotorLearn.sources.title')} intro={t('rotorLearn.sources.intro')} />
                        <div className="grid gap-3 md:grid-cols-2">
                            {sources.map((source, index) => (
                                <a key={source.title} href={SOURCE_URLS[index]} target="_blank" rel="noreferrer" className="group rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-[#00f5ff]/30">
                                    <span className="text-xs text-slate-500">{source.source}</span>
                                    <h3 className="mt-2 text-sm font-semibold leading-6 text-white transition group-hover:text-[#00f5ff]">{source.title} ↗</h3>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </article>
    )
}
