import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

function prepareCanvas(canvas, height) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = Math.max(canvas.clientWidth, 280)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    const context = canvas.getContext('2d')
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    return { context, width, height }
}

function FingerprintCanvas({ type, label }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return undefined
        const draw = () => {
            const { context, width, height } = prepareCanvas(canvas, 110)
            context.clearRect(0, 0, width, height)
            const split = width * 0.5
            const center = height * 0.5
            context.strokeStyle = 'rgba(148, 163, 184, 0.15)'
            context.beginPath()
            context.moveTo(split, 8)
            context.lineTo(split, height - 8)
            context.stroke()

            const valueAt = (time) => {
                if (type === 'square') {
                    return Math.sign(Math.sin(2 * Math.PI * 4 * time))
                }
                if (type === 'impulse') {
                    return Math.abs(time - 0.5) < 0.018 ? 1 : 0
                }
                if (type === 'offset') return 0.48
                if (type === 'damped') {
                    return (
                        Math.exp(-4 * time) *
                        Math.sin(2 * Math.PI * 6 * time)
                    )
                }
                if (type === 'random') {
                    return (
                        0.45 * Math.sin(2 * Math.PI * 3 * time) +
                        0.3 * Math.sin(2 * Math.PI * 11 * time + 1.2) +
                        0.2 * Math.sin(2 * Math.PI * 19 * time + 0.4)
                    )
                }
                return Math.sin(2 * Math.PI * 4 * time)
            }

            context.strokeStyle = '#00f5ff'
            context.lineWidth = 1.5
            context.beginPath()
            for (let pixel = 8; pixel < split - 8; pixel += 1) {
                const time = (pixel - 8) / (split - 16)
                const y = center - valueAt(time) * height * 0.32
                if (pixel === 8) context.moveTo(pixel, y)
                else context.lineTo(pixel, y)
            }
            context.stroke()

            const left = split + 12
            const right = width - 10
            const bottom = height - 16
            context.strokeStyle = 'rgba(148, 163, 184, 0.25)'
            context.beginPath()
            context.moveTo(left, bottom)
            context.lineTo(right, bottom)
            context.stroke()
            context.strokeStyle = '#a855f7'
            context.lineWidth = 2

            if (type === 'impulse' || type === 'random') {
                context.beginPath()
                for (let x = left; x <= right; x += 3) {
                    const ratio = (x - left) / (right - left)
                    const level =
                        type === 'impulse'
                            ? 0.68
                            : 0.32 +
                              0.25 *
                                  (0.5 + 0.5 * Math.sin(ratio * 31 + 0.8))
                    const y = bottom - level * (height - 28)
                    if (x === left) context.moveTo(x, y)
                    else context.lineTo(x, y)
                }
                context.stroke()
            } else if (type === 'damped') {
                context.beginPath()
                for (let x = left; x <= right; x += 1) {
                    const ratio = (x - left) / (right - left)
                    const level = Math.exp(-90 * (ratio - 0.36) ** 2)
                    const y = bottom - level * (height - 28) * 0.78
                    if (x === left) context.moveTo(x, y)
                    else context.lineTo(x, y)
                }
                context.stroke()
            } else {
                const harmonics =
                    type === 'square'
                        ? [
                              [0.24, 0.78],
                              [0.5, 0.32],
                              [0.76, 0.18],
                          ]
                        : type === 'offset'
                          ? [[0.02, 0.78]]
                          : [[0.34, 0.78]]
                harmonics.forEach(([position, level]) => {
                    const x = left + position * (right - left)
                    context.beginPath()
                    context.moveTo(x, bottom)
                    context.lineTo(x, bottom - level * (height - 28))
                    context.stroke()
                })
            }
        }

        draw()
        const observer = new ResizeObserver(draw)
        observer.observe(canvas)
        return () => observer.disconnect()
    }, [type])

    return (
        <canvas
            ref={canvasRef}
            role="img"
            aria-label={label}
            className="h-[110px] w-full rounded-lg bg-[#07111c]"
        />
    )
}

export default function FFTSignalFingerprints() {
    const { t } = useTranslation()
    const fingerprints = t('fftTheory.fingerprints.items', {
        returnObjects: true,
    })

    return (
        <div>
            <h3 className="text-2xl font-bold text-white">
                {t('fftTheory.fingerprints.title')}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                {t('fftTheory.fingerprints.intro')}
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {fingerprints.map((item) => (
                    <article
                        key={item.id}
                        className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                    >
                        <div className="mb-2 grid grid-cols-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                            <span>{t('fftTheory.fingerprints.time')}</span>
                            <span>{t('fftTheory.fingerprints.spectrum')}</span>
                        </div>
                        <FingerprintCanvas type={item.id} label={item.name} />
                        <h4 className="mt-4 font-semibold text-white">
                            {item.name}
                        </h4>
                        <p className="mt-1 text-xs font-medium text-[#00f5ff]">
                            {item.result}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            {item.meaning}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    )
}
