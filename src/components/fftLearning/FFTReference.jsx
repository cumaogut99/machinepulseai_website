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

export function FFTControlReference({ groupIndexes }) {
    const { t } = useTranslation()
    const controlGroups = t('fftControls.groups', { returnObjects: true })
    const visibleGroups = groupIndexes.map((index) => controlGroups[index])

    return (
        <div className="grid gap-3 lg:grid-cols-2">
            {visibleGroups.map((group) => (
                <details
                    key={group.name}
                    className="group rounded-2xl border border-white/10 bg-white/[0.025] open:border-[#00f5ff]/25"
                >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-white">
                        <span>{group.name}</span>
                        <span
                            aria-hidden="true"
                            className="text-lg font-normal text-[#00f5ff] transition group-open:rotate-45"
                        >
                            +
                        </span>
                    </summary>
                    <div className="border-t border-white/8 px-5 pb-5 pt-2">
                        {group.desc && (
                            <p className="py-3 text-xs leading-5 text-slate-500">
                                {group.desc}
                            </p>
                        )}
                        <dl className="divide-y divide-white/8">
                            {group.controls.map((control) => (
                                <div key={control.name} className="py-4">
                                    <dt className="text-sm font-semibold text-[#00f5ff]">
                                        {control.name}
                                    </dt>
                                    <dd className="mt-1 text-[13px] leading-6 text-slate-400">
                                        {control.desc}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </details>
            ))}
        </div>
    )
}

export function FFTFormulaReference({ formulas }) {
    return (
        <div className="grid gap-4">
            {formulas.map((formula) => (
                <article
                    key={formula.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                >
                    <h4 className="text-sm font-semibold text-white">
                        {formula.title}
                    </h4>
                    <div className="mt-3">
                        <Formula
                            latex={formula.latex}
                            fallback={formula.expr}
                        />
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

export default FFTControlReference
