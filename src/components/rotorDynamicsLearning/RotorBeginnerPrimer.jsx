import { useTranslation } from 'react-i18next'

export default function RotorBeginnerPrimer() {
    const { t } = useTranslation()
    const cards = t('rotorLearn.primer.cards', { returnObjects: true })
    const ladder = t('rotorLearn.primer.ladder', { returnObjects: true })
    const questions = t('rotorLearn.primer.questions', { returnObjects: true })

    return (
        <div>
            <div className="rounded-3xl border border-[#00f5ff]/20 bg-[#00f5ff]/[0.035] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00f5ff]">
                    {t('rotorLearn.primer.eyebrow')}
                </p>
                <h3 className="mt-3 max-w-4xl text-2xl font-bold text-white sm:text-3xl">
                    {t('rotorLearn.primer.title')}
                </h3>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base">
                    {t('rotorLearn.primer.intro')}
                </p>

                <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                    {cards.map((card) => (
                        <article
                            key={card.tag}
                            className="rounded-2xl border border-white/10 bg-black/25 p-5"
                        >
                            <span className="font-mono text-[10px] font-semibold tracking-wider text-[#a855f7]">
                                {card.tag}
                            </span>
                            <h4 className="mt-3 text-sm font-semibold text-white">
                                {card.title}
                            </h4>
                            <p className="mt-2 text-xs leading-6 text-slate-400">
                                {card.body}
                            </p>
                        </article>
                    ))}
                </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                <article className="rounded-2xl border border-[#a855f7]/20 bg-[#a855f7]/[0.035] p-6">
                    <h3 className="text-lg font-bold text-white">
                        {t('rotorLearn.primer.exampleTitle')}
                    </h3>
                    <div className="mt-5 space-y-2 font-mono">
                        <p className="text-2xl font-bold text-[#00f5ff]">
                            {t('rotorLearn.primer.exampleRpm')}
                        </p>
                        <p className="text-sm text-slate-400">
                            {t('rotorLearn.primer.exampleMath')}
                        </p>
                        <p className="text-base font-semibold text-[#c084fc]">
                            {t('rotorLearn.primer.exampleResult')}
                        </p>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-slate-400">
                        {t('rotorLearn.primer.exampleBody')}
                    </p>
                </article>

                <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                    <h3 className="text-lg font-bold text-white">
                        {t('rotorLearn.primer.ladderTitle')}
                    </h3>
                    <ol className="mt-5 grid gap-3 sm:grid-cols-5">
                        {ladder.map((step, index) => (
                            <li key={step.title} className="relative">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/[0.06] font-mono text-xs text-[#00f5ff]">
                                    {index + 1}
                                </span>
                                <h4 className="mt-3 text-xs font-semibold text-white">
                                    {step.title}
                                </h4>
                                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                                    {step.body}
                                </p>
                            </li>
                        ))}
                    </ol>
                </article>
            </div>

            <div className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-6 lg:grid-cols-[0.7fr_1.3fr]">
                <div>
                    <h3 className="text-lg font-bold text-white">
                        {t('rotorLearn.primer.questionsTitle')}
                    </h3>
                    <p className="mt-3 text-xs leading-6 text-[#00f5ff]">
                        {t('rotorLearn.primer.bridge')}
                    </p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                    {questions.map((question) => (
                        <li key={question} className="flex gap-3 text-sm leading-6 text-slate-400">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#a855f7]" />
                            <span>{question}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
