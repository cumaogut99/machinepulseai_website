import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import katex from 'katex'
import 'katex/dist/katex.min.css'

function Formula({ latex }) {
    const html = useMemo(() => katex.renderToString(latex, {
        displayMode: true,
        throwOnError: false,
    }), [latex])

    return (
        <div
            className="overflow-x-auto rounded-xl border border-[#00f5ff]/15 bg-black/30 px-4 py-4 text-white/90"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

export default function RotorFormulaReference() {
    const { t } = useTranslation()
    const formulas = t('rotorLearn.formulas.items', { returnObjects: true })

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {formulas.map((formula) => (
                <article key={formula.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                    <h3 className="text-sm font-semibold text-white">{formula.title}</h3>
                    <div className="mt-3"><Formula latex={formula.latex} /></div>
                    <p className="mt-3 text-[13px] leading-6 text-slate-400">{formula.where}</p>
                </article>
            ))}
        </div>
    )
}
