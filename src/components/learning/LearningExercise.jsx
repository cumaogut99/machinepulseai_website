import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function LearningExercise({ exercise, lang, widgetId }) {
    const { t } = useTranslation()
    const labels = t('widgetLearn.common', { returnObjects: true })
    const [answer, setAnswer] = useState(null)
    const [checked, setChecked] = useState(false)
    const fieldId = useId()
    // Stable varied ordering avoids teaching visitors to always pick option one.
    const reverse = widgetId.length % 2 === 0
    const options = exercise.options.map((text, index) => ({ text, index }))
    if (reverse) options.reverse()
    const correct = answer === exercise.correct
    return <form onSubmit={(event) => { event.preventDefault(); setChecked(true) }} className="mt-8 rounded-2xl border border-neon-blue/25 bg-neon-blue/[0.035] p-5 sm:p-7">
        <h3 className="text-lg font-bold text-white">{labels.check}</h3>
        <fieldset className="mt-4">
            <legend className="text-sm font-semibold leading-7 text-slate-200">{exercise.question}</legend>
            <p className="mt-2 text-xs text-slate-400">{labels.choose}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {options.map(({ text, index }) => <label key={index} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${answer === index ? 'border-neon-blue/60 bg-neon-blue/10 text-white' : 'border-white/10 text-slate-300'}`}>
                    <input type="radio" name={fieldId} value={index} checked={answer === index}
                        onChange={() => { setAnswer(index); setChecked(false) }} className="mt-1 accent-neon-blue" />{text}
                </label>)}
            </div>
        </fieldset>
        <div className="mt-5 flex flex-wrap gap-3">
            <button type="submit" disabled={answer === null} className="btn-neon rounded-lg px-5 py-2.5 text-sm font-semibold text-neon-cyan disabled:cursor-not-allowed disabled:opacity-40">{labels.submit}</button>
            {checked && <button type="button" onClick={() => { setAnswer(null); setChecked(false) }} className="rounded-lg border border-white/20 px-4 py-2.5 text-sm text-slate-300">{labels.retry}</button>}
        </div>
        <div role="status" aria-live="polite" aria-atomic="true">
            {checked && <div className="mt-5 border-t border-white/10 pt-5">
                <p className={`font-semibold ${correct ? 'text-neon-cyan' : 'text-neon-purple'}`}>{correct ? labels.correct : labels.incorrect}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{exercise.explanation}</p>
            </div>}
        </div>
    </form>
}
