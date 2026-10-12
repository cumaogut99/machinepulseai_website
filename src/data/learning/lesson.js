/** Expand compact bilingual editorial records into independent learning pages.
 * Rows contain [English title, Turkish title, English explanation, Turkish explanation].
 * Content describes application controls; exercises are illustrative, not a DAQ simulator.
 */
export function lesson(record) {
    const localized = (language) => {
        const index = language === 'tr' ? 1 : 0
        const rows = (items) => items.map((item) => ({ name: item[index], desc: item[index + 2] }))
        return {
            intro: record.intro[index],
            use: record.use[index],
            inputs: rows(record.inputs),
            controls: rows(record.controls),
            concepts: rows(record.concepts),
            steps: rows(record.steps),
            outputs: rows(record.outputs),
            pitfalls: rows(record.pitfalls),
            formulas: record.math.map(([latex, en, tr, enWhere, trWhere]) => ({
                latex, title: index ? tr : en, where: index ? trWhere : enWhere,
            })),
            example: {
                title: record.example[index], value: record.example[index + 2],
                explanation: record.example[index + 4],
            },
            exercise: {
                question: record.exercise[index],
                options: record.exercise[index + 2],
                correct: record.exercise[4], explanation: record.exercise[index + 5],
            },
        }
    }
    return {
        id: record.id, slug: record.slug || record.id.replaceAll('_', '-'),
        related: record.related, references: record.references,
        en: localized('en'), tr: localized('tr'),
    }
}

export const REFERENCES = {
    arrow: { title: 'Apache Arrow · Columnar format', href: 'https://arrow.apache.org/docs/format/Columnar.html' },
    nist: { title: 'NIST/SEMATECH · Engineering Statistics Handbook', href: 'https://www.itl.nist.gov/div898/handbook/' },
    signal: { title: 'SciPy · Signal processing reference', href: 'https://docs.scipy.org/doc/scipy/reference/signal.html' },
    savgol: { title: 'SciPy · Savitzky–Golay filter', href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.savgol_filter.html' },
}
