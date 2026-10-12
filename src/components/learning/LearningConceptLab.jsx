import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CONCEPT_LABS } from '../../data/learning/conceptLabs.js'

/** Adjustable scalar examples; no source data, FFT or product analysis runs here. */
export default function LearningConceptLab({ widgetId, lang }) {
    const { t } = useTranslation()
    const lab = CONCEPT_LABS[widgetId]
    const [values, setValues] = useState(() => Object.fromEntries(lab.fields.map((field) => [field.key, field.initial])))
    const formId = useId()
    const formatter = new Intl.NumberFormat(lang === 'tr' ? 'tr-TR' : 'en-US', { maximumFractionDigits: 4 })
    const output = lab.calculate(values)
    return <div className="mt-8 rounded-2xl border border-neon-cyan/20 bg-black/25 p-5 sm:p-7">
        <h3 className="text-lg font-bold text-white">{t('widgetLearn.common.labTitle')}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-400">{t('widgetLearn.common.labIntro')}</p>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="space-y-5">{lab.fields.map((field) => <div key={field.key}>
                <label htmlFor={`${formId}-${field.key}`} className="flex flex-wrap justify-between gap-2 text-sm text-slate-300">
                    <span>{t(`widgetLearn.labs.${widgetId}.fields.${field.key}`)}</span>
                    <span className="font-mono text-neon-cyan">{formatter.format(values[field.key])} {field.unit === 'samples' ? t('widgetLearn.common.samples') : field.unit}</span>
                </label>
                <input id={`${formId}-${field.key}`} type="range" min={field.min} max={field.max} step={field.step} value={values[field.key]}
                    onChange={(event) => setValues((previous) => ({ ...previous, [field.key]: Number(event.target.value) }))}
                    className="mt-3 w-full accent-neon-cyan" />
            </div>)}</div>
            <div aria-live="polite" aria-atomic="true" className="flex flex-col justify-center rounded-2xl border border-white/10 bg-neon-cyan/[0.035] p-6">
                <p className="text-sm leading-6 text-slate-300">{t(`widgetLearn.labs.${widgetId}.output`)}</p>
                <output className="mt-4 break-words font-mono text-3xl font-semibold text-neon-cyan">{formatter.format(output)} <span className="text-lg">{lab.unit}</span></output>
                <p className="mt-4 text-xs leading-6 text-slate-400">{t('widgetLearn.common.labFootnote')}</p>
            </div>
        </div>
        <button type="button" onClick={() => setValues(Object.fromEntries(lab.fields.map((field) => [field.key, field.initial])))} className="mt-5 rounded-lg border border-white/20 px-4 py-2 text-sm text-slate-300 hover:text-white">{t('widgetLearn.common.labReset')}</button>
    </div>
}
