import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FFTBeginnerPrimer from './FFTBeginnerPrimer.jsx'
import FFTSignalFingerprints from './FFTSignalFingerprints.jsx'

const COMPONENTS = [
    { frequency: 30, amplitude: 1, phase: 0, color: '#00f5ff' },
    { frequency: 75, amplitude: 0.55, phase: 0, color: '#3b82f6' },
    { frequency: 120, amplitude: 0.32, phase: 40, color: '#a855f7' },
]

function prepareCanvas(canvas, height) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = Math.max(canvas.clientWidth, 280)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    const context = canvas.getContext('2d')
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    return { context, width, height }
}

function drawGrid(context, width, height) {
    context.strokeStyle = 'rgba(148, 163, 184, 0.10)'
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

function DecompositionCanvas({ enabled, phaseDegrees, spectrum, label }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return undefined

        const draw = () => {
            const { context, width, height } = prepareCanvas(canvas, 220)
            context.clearRect(0, 0, width, height)
            drawGrid(context, width, height)
            const phases = [0, phaseDegrees, 40]

            if (spectrum) {
                const baseline = height - 24
                context.strokeStyle = 'rgba(148, 163, 184, 0.5)'
                context.beginPath()
                context.moveTo(16, baseline)
                context.lineTo(width - 12, baseline)
                context.stroke()

                COMPONENTS.forEach((component, index) => {
                    if (!enabled[index]) return
                    const x = 24 + (component.frequency / 140) * (width - 48)
                    const top =
                        baseline - component.amplitude * (height - 58)
                    context.strokeStyle = component.color
                    context.lineWidth = 4
                    context.beginPath()
                    context.moveTo(x, baseline)
                    context.lineTo(x, top)
                    context.stroke()
                    context.fillStyle = component.color
                    context.font = '11px Inter, system-ui, sans-serif'
                    context.fillText(`${component.frequency} Hz`, x - 15, top - 8)
                })
                return
            }

            const center = height / 2
            const scale = height * 0.24
            const drawTrace = (valueAt, color, widthValue, alpha = 1) => {
                context.strokeStyle = color
                context.globalAlpha = alpha
                context.lineWidth = widthValue
                context.beginPath()
                for (let pixel = 0; pixel <= width; pixel += 1) {
                    const time = (pixel / width) * 0.1
                    const y = center - valueAt(time) * scale
                    if (pixel === 0) context.moveTo(pixel, y)
                    else context.lineTo(pixel, y)
                }
                context.stroke()
                context.globalAlpha = 1
            }

            COMPONENTS.forEach((component, index) => {
                if (!enabled[index]) return
                const phase = (phases[index] * Math.PI) / 180
                drawTrace(
                    (time) =>
                        component.amplitude *
                        Math.sin(2 * Math.PI * component.frequency * time + phase),
                    component.color,
                    1,
                    0.35,
                )
            })

            drawTrace(
                (time) =>
                    COMPONENTS.reduce((sum, component, index) => {
                        if (!enabled[index]) return sum
                        const phase = (phases[index] * Math.PI) / 180
                        return (
                            sum +
                            component.amplitude *
                                Math.sin(
                                    2 *
                                        Math.PI *
                                        component.frequency *
                                        time +
                                        phase,
                                )
                        )
                    }, 0),
                '#e2e8f0',
                2.2,
            )
        }

        draw()
        const observer = new ResizeObserver(draw)
        observer.observe(canvas)
        return () => observer.disconnect()
    }, [enabled, phaseDegrees, spectrum])

    return (
        <canvas
            ref={canvasRef}
            role="img"
            aria-label={label}
            className="h-[220px] w-full rounded-xl bg-[#07111c]"
        />
    )
}

function ComplexBin({ phaseDegrees }) {
    const { t, i18n } = useTranslation()
    const radians = (phaseDegrees * Math.PI) / 180
    const magnitude = 0.55
    const real = magnitude * Math.cos(radians)
    const imaginary = magnitude * Math.sin(radians)
    const locale = i18n.language?.startsWith('tr') ? 'tr-TR' : 'en-US'
    const format = (value) =>
        new Intl.NumberFormat(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)

    return (
        <div className="grid gap-5 lg:grid-cols-[15rem_1fr] lg:items-center">
            <div className="relative mx-auto aspect-square w-full max-w-[15rem] rounded-xl border border-white/10 bg-[#07111c]">
                <div className="absolute left-4 right-4 top-1/2 h-px bg-white/20" />
                <div className="absolute bottom-4 left-1/2 top-4 w-px bg-white/20" />
                <div
                    className="absolute left-1/2 top-1/2 h-0.5 origin-left bg-[#3b82f6]"
                    style={{
                        width: `${magnitude * 38}%`,
                        transform: `rotate(${-phaseDegrees}deg)`,
                    }}
                />
                <div
                    className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00f5ff] shadow-glow-sm-cyan"
                    style={{
                        left: `${50 + real * 38}%`,
                        top: `${50 - imaginary * 38}%`,
                    }}
                />
                <span className="absolute bottom-2 right-3 text-[10px] text-slate-500">
                    {t('fftTheory.complex.real')}
                </span>
                <span className="absolute left-3 top-2 text-[10px] text-slate-500">
                    {t('fftTheory.complex.imaginary')}
                </span>
            </div>
            <div>
                <p className="font-mono text-xl text-white">
                    Z = {format(real)} {imaginary >= 0 ? '+' : '−'} j
                    {format(Math.abs(imaginary))}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                        <p className="text-xs text-slate-500">
                            {t('fftTheory.complex.magnitude')}
                        </p>
                        <p className="mt-1 font-mono text-sm text-[#00f5ff]">
                            {t('fftTheory.complex.formulaMagnitude')} = 0.55
                        </p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                        <p className="text-xs text-slate-500">
                            {t('fftTheory.complex.phase')}
                        </p>
                        <p className="mt-1 font-mono text-sm text-[#00f5ff]">
                            {t('fftTheory.complex.formulaPhase')} = {phaseDegrees}°
                        </p>
                    </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                    {t('fftTheory.complex.practical')}
                </p>
            </div>
        </div>
    )
}

function SidedSpectrum() {
    const { t } = useTranslation()
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#07111c] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t('fftTheory.sided.double')}
                </p>
                <div className="relative mt-5 h-28">
                    <div className="absolute left-3 right-3 top-[78%] h-px bg-white/25" />
                    <div className="absolute left-1/2 top-2 h-[82%] w-px bg-white/15" />
                    <div className="absolute bottom-[22%] left-[27%] h-[58%] w-1 bg-[#3b82f6]" />
                    <div className="absolute bottom-[22%] right-[27%] h-[58%] w-1 bg-[#00f5ff]" />
                    <span className="absolute bottom-0 left-[24%] text-[11px] text-slate-500">
                        −f
                    </span>
                    <span className="absolute bottom-0 right-[25%] text-[11px] text-slate-500">
                        +f
                    </span>
                </div>
            </div>
            <div className="rounded-xl border border-[#00f5ff]/20 bg-[#07111c] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#00f5ff]">
                    {t('fftTheory.sided.one')}
                </p>
                <div className="relative mt-5 h-28">
                    <div className="absolute left-3 right-3 top-[78%] h-px bg-white/25" />
                    <div className="absolute bottom-[22%] left-[12%] h-4 w-1 bg-[#a855f7]" />
                    <div className="absolute bottom-[22%] left-[55%] h-[72%] w-1 bg-[#00f5ff]" />
                    <span className="absolute bottom-0 left-[7%] text-[11px] text-slate-500">
                        {t('fftTheory.sided.dc')}
                    </span>
                    <span className="absolute bottom-0 right-2 text-[11px] text-slate-500">
                        {t('fftTheory.sided.nyquist')}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default function FFTFundamentals() {
    const { t } = useTranslation()
    const [enabled, setEnabled] = useState([true, true, true])
    const [phaseDegrees, setPhaseDegrees] = useState(60)
    const names = t('fftTheory.decomposition.componentNames', {
        returnObjects: true,
    })
    const terms = t('fftTheory.terminology.items', { returnObjects: true })
    const applications = t('fftTheory.applications.items', {
        returnObjects: true,
    })

    const toggleComponent = (index) => {
        setEnabled((current) =>
            current.map((value, componentIndex) =>
                componentIndex === index ? !value : value,
            ),
        )
    }

    return (
        <div className="space-y-14">
            <FFTBeginnerPrimer />

            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-7">
                <p className="text-sm leading-6 text-slate-400">
                    {t('fftTheory.decomposition.instruction')}
                </p>
                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <div>
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            {t('fftTheory.decomposition.timeTitle')}
                        </h3>
                        <DecompositionCanvas
                            enabled={enabled}
                            phaseDegrees={phaseDegrees}
                            label={t('fftTheory.decomposition.timeTitle')}
                        />
                    </div>
                    <div>
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            {t('fftTheory.decomposition.frequencyTitle')}
                        </h3>
                        <DecompositionCanvas
                            enabled={enabled}
                            phaseDegrees={phaseDegrees}
                            spectrum
                            label={t('fftTheory.decomposition.frequencyTitle')}
                        />
                    </div>
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_18rem]">
                    <fieldset>
                        <legend className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            {t('fftTheory.decomposition.components')}
                        </legend>
                        <div className="mt-3 grid gap-2 sm:grid-cols-3">
                            {COMPONENTS.map((component, index) => (
                                <button
                                    key={component.frequency}
                                    type="button"
                                    aria-pressed={enabled[index]}
                                    onClick={() => toggleComponent(index)}
                                    className={`rounded-lg border px-3 py-3 text-left text-xs transition ${
                                        enabled[index]
                                            ? 'border-white/20 bg-white/[0.05] text-white'
                                            : 'border-white/8 bg-black/20 text-slate-600'
                                    }`}
                                >
                                    <span
                                        className="mr-2 inline-block h-2 w-2 rounded-full"
                                        style={{ backgroundColor: component.color }}
                                    />
                                    {names[index]}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                    <label className="block">
                        <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
                            {t('fftTheory.decomposition.phase')}
                            <strong className="font-mono text-[#3b82f6]">
                                {phaseDegrees}°
                            </strong>
                        </span>
                        <input
                            type="range"
                            min="-180"
                            max="180"
                            step="5"
                            value={phaseDegrees}
                            onChange={(event) =>
                                setPhaseDegrees(Number(event.target.value))
                            }
                            className="mt-4 w-full accent-[#3b82f6]"
                        />
                    </label>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-[#3b82f6]/20 bg-[#3b82f6]/[0.05] p-4">
                        <h3 className="font-semibold text-[#3b82f6]">
                            {t('fftTheory.decomposition.phaseInsightTitle')}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            {t('fftTheory.decomposition.phaseInsight')}
                        </p>
                    </div>
                    <div className="rounded-xl border border-[#00f5ff]/20 bg-[#00f5ff]/[0.04] p-4">
                        <h3 className="font-semibold text-[#00f5ff]">
                            {t('fftTheory.decomposition.preservedTitle')}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            {t('fftTheory.decomposition.preserved')}
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-white">
                    {t('fftTheory.terminology.title')}
                </h3>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {terms.map((item) => (
                        <article
                            key={item.term}
                            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                        >
                            <h4 className="font-mono text-sm font-semibold text-[#00f5ff]">
                                {item.term}
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                {item.body}
                            </p>
                        </article>
                    ))}
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <div>
                    <h3 className="text-2xl font-bold text-white">
                        {t('fftTheory.complex.title')}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                        {t('fftTheory.complex.intro')}
                    </p>
                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                        <ComplexBin phaseDegrees={phaseDegrees} />
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">
                        {t('fftTheory.sided.title')}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                        {t('fftTheory.sided.intro')}
                    </p>
                    <div className="mt-5">
                        <SidedSpectrum />
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                        {t('fftTheory.sided.explanation')}
                    </p>
                </div>
            </div>

            <FFTSignalFingerprints />

            <div>
                <h3 className="text-2xl font-bold text-white">
                    {t('fftTheory.applications.title')}
                </h3>
                <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                    {applications.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                        >
                            <h4 className="font-semibold text-white">
                                {item.title}
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                {item.body}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
