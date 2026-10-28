import { useTranslation } from 'react-i18next'
import { FormulaSpecGrid } from '../learning/LearningPrimitives.jsx'

export function FFTFormulaReference({ formulas }) {
    return <FormulaSpecGrid formulas={formulas} />
}

export function FFTEngineeringReference({ detail }) {
    const { t } = useTranslation()

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <div>
                <h3 className="text-2xl font-bold text-white">
                    {t('fftLearn.reference.assumptionsTitle')}
                </h3>
                <div className="mt-5 space-y-3">
                    {detail.assumptions.map((item) => (
                        <article
                            key={item.name}
                            className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
                        >
                            <h4 className="text-sm font-semibold text-white">
                                {item.name}
                            </h4>
                            <p className="mt-1 text-[13px] leading-6 text-slate-400">
                                {item.desc}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white">
                    {t('fftLearn.reference.outputsTitle')}
                </h3>
                <div className="mt-5 space-y-3">
                    {detail.outputs.map((item) => (
                        <article
                            key={item.name}
                            className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
                        >
                            <h4 className="text-sm font-semibold text-[#00f5ff]">
                                {item.name}
                            </h4>
                            <p className="mt-1 text-[13px] leading-6 text-slate-400">
                                {item.desc}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
