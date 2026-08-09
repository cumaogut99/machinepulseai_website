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

// Resolve [groupIndex, controlIndex] pairs against the fftControls catalog so
// the interface tour can attach the exact controls a hotspot points at.
export function FFTControlCards({ refs }) {
    const { t } = useTranslation()
    const controlGroups = t('fftControls.groups', { returnObjects: true })

    const entries = refs
        .map(([groupIndex, controlIndex]) => {
            const group = controlGroups[groupIndex]
            const control = group?.controls?.[controlIndex]
            if (!control) return null
            return { ...control, groupName: group.name }
        })
        .filter(Boolean)

    if (entries.length === 0) return null

    return (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {entries.map((entry) => (
                <article
                    key={`${entry.groupName}-${entry.name}`}
                    className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
                >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                        {entry.groupName}
                    </p>
                    <h5 className="mt-2 text-sm font-semibold text-[#00f5ff]">
                        {entry.name}
                    </h5>
                    <p className="mt-2 text-[13px] leading-6 text-slate-400 whitespace-pre-line">
                        {entry.desc}
                    </p>
                </article>
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
