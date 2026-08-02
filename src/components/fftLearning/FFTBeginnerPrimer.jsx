import { useTranslation } from 'react-i18next'

export default function FFTBeginnerPrimer() {
    const { t } = useTranslation()
    const journey = t('fftBeginner.journey', { returnObjects: true })
    const exampleCards = t('fftBeginner.exampleCards', {
        returnObjects: true,
    })
    const vocabulary = t('fftBeginner.vocabulary', { returnObjects: true })
    const rules = t('fftBeginner.rules', { returnObjects: true })

    return (
        <div className="space-y-10">
            <div className="rounded-3xl border border-[#00f5ff]/25 bg-gradient-to-br from-[#00f5ff]/[0.07] via-white/[0.02] to-[#a855f7]/[0.06] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00f5ff]">
                    {t('fftBeginner.badge')}
                </p>
                <h3 className="mt-4 max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl">
                    {t('fftBeginner.title')}
                </h3>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base">
                    {t('fftBeginner.intro')}
                </p>
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                    <h4 className="font-semibold text-white">
                        {t('fftBeginner.analogyTitle')}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-slate-400">
                        {t('fftBeginner.analogy')}
                    </p>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-white">
                    {t('fftBeginner.journeyTitle')}
                </h3>
                <div className="mt-5 grid gap-3 lg:grid-cols-5">
                    {journey.map((step, index) => (
                        <article
                            key={step.title}
                            className="relative rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                        >
                            <span className="font-mono text-xs text-[#00f5ff]">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <h4 className="mt-3 font-semibold leading-6 text-white">
                                {step.title}
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                {step.body}
                            </p>
                            <p className="mt-4 border-l-2 border-[#3b82f6]/60 pl-3 text-xs leading-5 text-slate-500">
                                {step.example}
                            </p>
                        </article>
                    ))}
                </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
                <h3 className="text-2xl font-bold text-white">
                    {t('fftBeginner.exampleTitle')}
                </h3>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">
                    {t('fftBeginner.exampleIntro')}
                </p>
                <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                    {exampleCards.map((item) => (
                        <article
                            key={item.value}
                            className="rounded-xl border border-[#00f5ff]/15 bg-[#07111c] p-4"
                        >
                            <p className="font-mono text-lg font-semibold text-[#00f5ff]">
                                {item.value}
                            </p>
                            <h4 className="mt-2 text-sm font-semibold text-white">
                                {item.label}
                            </h4>
                            <p className="mt-2 text-xs leading-6 text-slate-400">
                                {item.body}
                            </p>
                        </article>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-white">
                    {t('fftBeginner.vocabularyTitle')}
                </h3>
                <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {vocabulary.map((item) => (
                        <article
                            key={item.term}
                            className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
                        >
                            <h4 className="font-mono text-sm font-semibold text-[#3b82f6]">
                                {item.term}
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                {item.body}
                            </p>
                        </article>
                    ))}
                </div>
            </div>

            <div className="rounded-2xl border border-[#a855f7]/25 bg-[#a855f7]/[0.045] p-5 sm:p-6">
                <h3 className="font-semibold text-white">
                    {t('fftBeginner.ruleTitle')}
                </h3>
                <ol className="mt-4 grid gap-3 md:grid-cols-3">
                    {rules.map((rule, index) => (
                        <li
                            key={rule}
                            className="flex gap-3 text-sm leading-6 text-slate-300"
                        >
                            <span className="font-mono text-[#a855f7]">
                                {index + 1}.
                            </span>
                            <span>{rule}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
