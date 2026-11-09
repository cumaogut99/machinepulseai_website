import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatVideoTime } from '../data/productVideos.js'

/** Click-to-load native video with optional chapter navigation. */
export default function ProductVideo({ video, chapters = [], priority = false }) {
    const { t } = useTranslation()
    const player = useRef(null)
    const requestedTime = useRef(0)
    const [loaded, setLoaded] = useState(false)
    const [failed, setFailed] = useState(false)
    const [activeChapter, setActiveChapter] = useState(0)
    const title = t(`site.video.titles.${video.title}`)

    function playFrom(time = 0) {
        requestedTime.current = time
        setFailed(false)
        if (!loaded) {
            setLoaded(true)
            return
        }
        if (player.current) {
            player.current.currentTime = time
            player.current.play().catch(() => player.current?.focus())
            player.current.focus()
        }
    }

    function onReady(event) {
        event.currentTarget.currentTime = requestedTime.current
        event.currentTarget.focus({ preventScroll: true })
    }

    function onTimeUpdate(event) {
        const time = event.currentTarget.currentTime
        const index = chapters.findLastIndex(chapter => chapter.time <= time)
        setActiveChapter(Math.max(0, index))
    }

    return (
        <div className={chapters.length ? 'grid lg:grid-cols-[minmax(0,1fr)_280px] gap-6 items-start' : ''}>
            <figure className="min-w-0">
                <div className="hero-media-glow rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[2212/1440] relative">
                    {loaded ? (
                        <video
                            ref={player} src={video.src} poster={video.poster}
                            controls autoPlay playsInline preload="metadata" tabIndex={0}
                            aria-label={title} onLoadedMetadata={onReady}
                            onTimeUpdate={chapters.length ? onTimeUpdate : undefined}
                            onError={() => setFailed(true)}
                            className="w-full h-full object-contain"
                        >
                            {video.captions && <track kind="captions" src={video.captions} srcLang="en" label={t('site.video.englishCaptions')} />}
                        </video>
                    ) : (
                        <button type="button" onClick={() => playFrom()} aria-label={t('site.video.play', { title })}
                            className="group relative w-full h-full block text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-neon-cyan">
                            <img src={video.poster} alt="" width="1106" height="720"
                                loading={priority ? 'eager' : 'lazy'} fetchpriority={priority ? 'high' : 'auto'}
                                className="w-full h-full object-cover" />
                            <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/10" />
                            <span className="absolute inset-0 flex items-center justify-center">
                                <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border border-neon-cyan/60 bg-black/70 text-neon-cyan group-hover:bg-neon-cyan/15 transition-colors">
                                    <svg aria-hidden="true" className="w-7 h-7 ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l12-7z" /></svg>
                                </span>
                            </span>
                            <span className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-end gap-3">
                                <span className="text-sm sm:text-lg font-medium text-white">{title}</span>
                                <span className="shrink-0 text-xs text-white bg-black/70 px-2 py-1 rounded">{video.duration}</span>
                            </span>
                        </button>
                    )}
                </div>
                <figcaption className="mt-3 text-right text-xs leading-relaxed text-slate-400">
                    <span>{t('site.video.language')}</span>
                </figcaption>
                {failed && <p role="alert" className="mt-3 text-sm text-slate-300">{t('site.video.error')} <a className="text-neon-cyan underline" href={video.src}>{t('site.video.openFile')}</a></p>}
            </figure>
            {chapters.length > 0 && (
                <nav aria-label={t('site.video.chapters')} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                    <h2 className="px-4 py-4 text-sm font-semibold border-b border-white/10">{t('site.video.chapters')}</h2>
                    <ol className="max-h-[32rem] overflow-y-auto p-2">
                        {chapters.map((chapter, index) => (
                            <li key={chapter.id}>
                                <button type="button" onClick={() => playFrom(chapter.time)}
                                    aria-current={loaded && index === activeChapter ? 'true' : undefined}
                                    className={`w-full flex gap-3 text-left text-xs leading-relaxed rounded-lg px-3 py-3 transition-colors focus-visible:outline focus-visible:outline-neon-cyan ${loaded && index === activeChapter ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                                    <span className="tabular-nums shrink-0">{formatVideoTime(chapter.time)}</span>
                                    <span>{t(`site.chapters.${chapter.id}`)}</span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </nav>
            )}
        </div>
    )
}
