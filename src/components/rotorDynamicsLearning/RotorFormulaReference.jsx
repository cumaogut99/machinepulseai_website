import { useTranslation } from 'react-i18next'
import { FormulaSpecGrid } from '../learning/LearningPrimitives.jsx'

export default function RotorFormulaReference() {
    const { t } = useTranslation()
    return <FormulaSpecGrid formulas={t('rotorLearn.formulas.items', { returnObjects: true })} />
}
