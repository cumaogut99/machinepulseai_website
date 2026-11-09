import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/** Prominent, shared entry point to the complete product tour. */
export default function ProductTourLink() {
    const { t } = useTranslation()
    return (
        <Link
            to="/product"
            className="btn-neon inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-neon-cyan/10 px-6 py-3.5 text-center text-sm sm:text-base font-semibold text-neon-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-cyan"
        >
            {t('site.video.fullTour')}
            <svg aria-hidden="true" className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
        </Link>
    )
}
