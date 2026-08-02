import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const SAMPLE_RATES = [2048, 4096, 8192, 16384]
const BLOCK_SIZES = [1024, 2048, 4096, 8192, 16384]
const WINDOW_WIDTHS = {
    rectangular: 1.2,
    hann: 2.8,
    flattop: 6.5,
}

function prepareCanvas(canvas, height) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = Math.max(canvas.clientWidth, 320)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    const context = canvas.getContext('2d')
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    return { context, width, height }
}

function drawGrid(context, width, height) {
    context.strokeStyle = 'rgba(148, 163, 184, 0.12)'
    context.lineWidth = 1
    for (let column = 1; column < 8; column += 1) {
        const x = (column / 8) * width
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x, height)
        context.stroke()
    }
    for (let row = 1; row < 4; row += 1) {
        const y = (row / 4) * height
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(width, y)
        context.stroke()
    }
}

function TimeSignalCanvas({ sampleRate, toneFrequency, label }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return undefined

        const draw = () => {
            const { context, width, height } = prepareCanvas(canvas, 190)
            context.clearRect(0, 0, width, height)
            drawGrid(context, width, height)

            const count = 52
            const padding = 16
            const usableWidth = width - padding * 2
            const center = height / 2
            const amplitude = height * 0.32
            const points = Array.from({ length: count }, (_, index) => {
                const x = padding + (index / (count - 1)) * usableWidth
                const value = Math.sin(
                    (2 * Math.PI * toneFrequency * index) / sampleRate,
                )
                return { x, y: center - value * amplitude }
            })

            context.strokeStyle = 'rgba(0, 245, 255, 0.75)'
            context.lineWidth = 1.5
            context.beginPath()
            points.forEach((point, index) => {
                if (index === 0) context.moveTo(point.x, point.y)
                else context.lineTo(point.x, point.y)
            })
            context.stroke()

            context.fillStyle = '#00f5ff'
            points.forEach((point) => {
                context.beginPath()
                context.arc(point.x, point.y, 2.5, 0, Math.PI * 2)
                context.fill()
            })
        }

        draw()
        const observer = new ResizeObserver(draw)
        observer.observe(canvas)
        return () => observer.disconnect()
    }, [sampleRate, toneFrequency])

    return (
        <canvas
            ref={canvasRef}
            role="img"
            aria-label={label}
            className="h-[190px] w-full rounded-xl bg-[#07111c]"
        />
    )
}

function SpectrumCanvas({
    sampleRate,
    apparentFrequency,
    resolution,
    windowName,
    label,
}) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return undefined

        const draw = () => {
            const { context, width, height } = prepareCanvas(canvas, 190)
            context.clearRect(0, 0, width, height)
            drawGrid(context, width, height)

            const nyquist = sampleRate / 2
            const sigma = Math.max(
                resolution * WINDOW_WIDTHS[windowName],
                nyquist / 160,
            )
            const bottom = height - 18
            const top = 18
            const plotHeight = bottom - top

            context.strokeStyle = '#00f5ff'
            context.lineWidth = 2
            context.beginPath()
            for (let pixel = 0; pixel <= width; pixel += 1) {
                const frequency = (pixel / width) * nyquist
                const distance = (frequency - apparentFrequency) / sigma
                const mainLobe = Math.exp(-0.5 * distance * distance)
                const sideLobe =
                    windowName === 'rectangular'
                        ? 0.12 * Math.exp(-Math.abs(distance) / 5)
                        : 0.025 * Math.exp(-Math.abs(distance) / 3)
                const response = Math.min(1, mainLobe + sideLobe)
                const y = bottom - response * plotHeight
                if (pixel === 0) context.moveTo(pixel, y)
                else context.lineTo(pixel, y)
            }
            context.stroke()

            const peakX = (apparentFrequency / nyquist) * width
            context.strokeStyle = '#a855f7'
            context.setLineDash([5, 5])
            context.beginPath()
            context.moveTo(peakX, top)
            context.lineTo(peakX, bottom)
            context.stroke()
            context.setLineDash([])

            context.fillStyle = '#94a3b8'
            context.font = '12px Inter, system-ui, sans-serif'
            context.fillText('0 Hz', 8, height - 4)
            const nyquistText = `${Math.round(nyquist)} Hz`
            context.fillText(
                nyquistText,
                width - context.measureText(nyquistText).width - 8,
                height - 4,
            )
        }

        draw()
        const observer = new ResizeObserver(draw)
        observer.observe(canvas)
        return () => observer.disconnect()
    }, [sampleRate, apparentFrequency, resolution, windowName])

    return (
        <canvas
            ref={canvasRef}
            role="img"
            aria-label={label}
            className="h-[190px] w-full rounded-xl bg-[#07111c]"
        />
    )
}

function MetricCard({ label, value, accent }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p
                className={`mt-1 font-mono text-lg font-semibold ${
                    accent ? 'text-[#00f5ff]' : 'text-white'
                }`}
            >
                {value}
            </p>
        </div>
    )
}

export default function FFTConceptLab() {
    const { t, i18n } = useTranslation()
    const [sampleRate, setSampleRate] = useState(4096)
    const [toneFrequency, setToneFrequency] = useState(2800)
    const [blockSize, setBlockSize] = useState(4096)
    const [windowName, setWindowName] = useState('hann')

    const nyquist = sampleRate / 2
    const resolution = sampleRate / blockSize
    const blockDuration = blockSize / sampleRate
    const apparentFrequency = Math.abs(
        ((toneFrequency + nyquist) % sampleRate) - nyquist,
    )
    const isAliasing = toneFrequency > nyquist
    const locale = i18n.language?.startsWith('tr') ? 'tr-TR' : 'en-US'
    const format = (value, digits = 0) =>
        new Intl.NumberFormat(locale, {
            maximumFractionDigits: digits,
            minimumFractionDigits: digits,
        }).format(value)
    const windowOptions = ['rectangular', 'hann', 'flattop']

    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-7">
            <div className="grid gap-7 xl:grid-cols-[18rem_minmax(0,1fr)]">
                <div className="space-y-6">
                    <label className="block">
                        <span className="mb-2 flex items-center justify-between text-sm text-slate-300">
                            {t('fftLearn.lab.sampleRate')}
                            <strong className="font-mono text-[#00f5ff]">
                                {format(sampleRate)} Hz
                            </strong>
                        </span>
                        <select
                            value={sampleRate}
                            onChange={(event) => {
                                const nextRate = Number(event.target.value)
                                setSampleRate(nextRate)
                                setToneFrequency((current) =>
                                    Math.min(current, nextRate * 0.9),
                                )
                            }}
                            className="w-full rounded-lg border border-white/10 bg-[#101014] px-3 py-2 text-sm text-white outline-none focus:border-[#00f5ff]"
                        >
                            {SAMPLE_RATES.map((rate) => (
                                <option key={rate} value={rate}>
                                    {format(rate)} Hz
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="mb-2 flex items-center justify-between text-sm text-slate-300">
                            {t('fftLearn.lab.tone')}
                            <strong className="font-mono text-[#00f5ff]">
                                {format(toneFrequency)} Hz
                            </strong>
                        </span>
                        <input
                            type="range"
                            min="20"
                            max={Math.round(sampleRate * 0.9)}
                            step="10"
                            value={toneFrequency}
                            onChange={(event) =>
                                setToneFrequency(Number(event.target.value))
                            }
                            className="w-full accent-[#00f5ff]"
                        />
                        <div className="mt-1 flex justify-between text-[11px] text-slate-600">
                            <span>20 Hz</span>
                            <span>{format(sampleRate * 0.9)} Hz</span>
                        </div>
                    </label>

                    <label className="block">
                        <span className="mb-2 flex items-center justify-between text-sm text-slate-300">
                            {t('fftLearn.lab.block')}
                            <strong className="font-mono text-[#00f5ff]">
                                {format(blockSize)}
                            </strong>
                        </span>
                        <select
                            value={blockSize}
                            onChange={(event) =>
                                setBlockSize(Number(event.target.value))
                            }
                            className="w-full rounded-lg border border-white/10 bg-[#101014] px-3 py-2 text-sm text-white outline-none focus:border-[#00f5ff]"
                        >
                            {BLOCK_SIZES.map((size) => (
                                <option key={size} value={size}>
                                    {format(size)}
                                </option>
                            ))}
                        </select>
                    </label>

                    <fieldset>
                        <legend className="mb-2 text-sm text-slate-300">
                            {t('fftLearn.lab.window')}
                        </legend>
                        <div className="grid grid-cols-3 gap-2 xl:grid-cols-1">
                            {windowOptions.map((name) => (
                                <button
                                    key={name}
                                    type="button"
                                    aria-pressed={windowName === name}
                                    onClick={() => setWindowName(name)}
                                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                                        windowName === name
                                            ? 'border-[#00f5ff] bg-[#00f5ff]/10 text-[#00f5ff]'
                                            : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/25'
                                    }`}
                                >
                                    {t(`fftLearn.lab.windows.${name}.name`)}
                                </button>
                            ))}
                        </div>
                        <p className="mt-3 text-xs leading-5 text-slate-500">
                            {t(`fftLearn.lab.windows.${windowName}.note`)}
                        </p>
                    </fieldset>
                </div>

                <div>
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                        <MetricCard
                            label={t('fftLearn.lab.nyquist')}
                            value={`${format(nyquist)} Hz`}
                        />
                        <MetricCard
                            label={t('fftLearn.lab.resolution')}
                            value={`${format(resolution, 2)} Hz`}
                        />
                        <MetricCard
                            label={t('fftLearn.lab.duration')}
                            value={`${format(blockDuration, 3)} s`}
                        />
                        <MetricCard
                            label={t('fftLearn.lab.apparent')}
                            value={`${format(apparentFrequency, 1)} Hz`}
                            accent
                        />
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-2">
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                {t('fftLearn.lab.timePlot')}
                            </p>
                            <TimeSignalCanvas
                                sampleRate={sampleRate}
                                toneFrequency={toneFrequency}
                                label={t('fftLearn.lab.timePlot')}
                            />
                            <p className="mt-2 text-[11px] text-slate-600">
                                {t('fftLearn.lab.sampleDots')}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                {t('fftLearn.lab.spectrumPlot')}
                            </p>
                            <SpectrumCanvas
                                sampleRate={sampleRate}
                                apparentFrequency={apparentFrequency}
                                resolution={resolution}
                                windowName={windowName}
                                label={t('fftLearn.lab.spectrumPlot')}
                            />
                        </div>
                    </div>

                    <div
                        className={`mt-4 rounded-xl border p-4 ${
                            isAliasing
                                ? 'border-[#a855f7]/40 bg-[#a855f7]/[0.07]'
                                : 'border-[#00f5ff]/30 bg-[#00f5ff]/[0.05]'
                        }`}
                    >
                        <h3
                            className={`text-sm font-semibold ${
                                isAliasing
                                    ? 'text-[#a855f7]'
                                    : 'text-[#00f5ff]'
                            }`}
                        >
                            {t(
                                isAliasing
                                    ? 'fftLearn.lab.aliasTitle'
                                    : 'fftLearn.lab.safeTitle',
                            )}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-300">
                            {t(
                                isAliasing
                                    ? 'fftLearn.lab.aliasBody'
                                    : 'fftLearn.lab.safeBody',
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <h3 className="font-semibold text-white">
                        {t('fftLearn.lab.whyNyquistTitle')}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        {t('fftLearn.lab.whyNyquistBody')}
                    </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <h3 className="font-semibold text-white">
                        {t('fftLearn.lab.resolutionTitle')}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        {t('fftLearn.lab.resolutionBody')}
                    </p>
                </div>
            </div>
        </div>
    )
}
