import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { formatVideoTime, getTourChapter, tourChapterHref } from '../data/productVideos.js'

/** Jump to a known chapter without automatically starting audio. */
export default function TourChapterLink({ chapterId }) {
    const { t } = useTranslation()
    const chapter = getTourChapter(chapterId)
    return (
        <Link to={tourChapterHref(chapterId)}
            className="inline-flex items-center gap-2 text-xs text-neon-cyan hover:text-white focus-visible:outline focus-visible:outline-neon-cyan">
            {t('site.product.watchChapter', { time: formatVideoTime(chapter.time) })}
            <span aria-hidden="true">↗</span>
        </Link>
    )
}
