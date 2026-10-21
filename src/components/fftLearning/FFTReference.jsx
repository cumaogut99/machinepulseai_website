import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import katex from 'katex'
import 'katex/dist/katex.min.css'

function Formula({ latex, fallback }) {
    const html = useMemo(() => {
        if (!latex) return null
        try {
            return katex.renderToString(latex, {
                displayMode: true,
                throwOnError: false,
            })
        } catch {
            return null
        }
    }, [latex])

    if (!html) {
        return (
            <code className="block overflow-x-auto rounded-lg border border-[#00f5ff]/15 bg-black/30 px-4 py-3 font-mono text-sm text-[#00f5ff]">
                {fallback}
            </code>
        )
    }

    return (
        <div
            className="katex-formula overflow-x-auto rounded-lg border border-[#00f5ff]/15 bg-black/30 px-4 py-4 text-white/90"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

export function FFTFormulaReference({ formulas }) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {formulas.map((formula) => (
                <article
                    key={formula.title}
                    className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-[#00f5ff]/30"
                >
                    <div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-sm font-semibold text-white">
                                {formula.title}
                            </h4>
                            {formula.param && (
                                <span className="rounded-md border border-[#00f5ff]/25 bg-[#00f5ff]/[0.08] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[#00f5ff]">
                                    {formula.param}
                                </span>
                            )}
                        </div>
                        <div className="mt-3">
                            <Formula
                                latex={formula.latex}
                                fallback={formula.expr}
                            />
                        </div>
                    </div>
                    <p className="mt-3 text-[13px] leading-6 text-slate-400">
                        {formula.where}
                    </p>
                </article>
            ))}
        </div>
    )
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
