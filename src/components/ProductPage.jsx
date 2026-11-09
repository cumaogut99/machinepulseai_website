import { useTranslation } from 'react-i18next'
import ProductIntroduction from './ProductIntroduction.jsx'
import Features from './Features.jsx'
import HowItWorks from './HowItWorks.jsx'
import ProductNextStep from './ProductNextStep.jsx'

// One product destination: complete tour, capabilities, workflow and packages.
export default function ProductPage() {
    const { t } = useTranslation()
    return (
        <>
            <ProductIntroduction />
            <Features />
            <HowItWorks />
            <details className="max-w-7xl mx-auto px-6 py-8 text-sm text-slate-400">
                <summary className="cursor-pointer text-white">{t('site.product.technicalDetailsTitle')}</summary>
                <h3 className="font-semibold text-white mt-5">{t('site.product.architectureTitle')}</h3>
                <p className="mt-3 max-w-3xl leading-relaxed">{t('site.product.architectureDescription')}</p>
                <h3 className="font-semibold text-white mt-5">{t('site.product.requirementsTitle')}</h3>
                <p className="mt-4 max-w-3xl leading-relaxed">{t('site.contact.requirements')}</p>
            </details>
            <ProductNextStep />
        </>
    )
}
