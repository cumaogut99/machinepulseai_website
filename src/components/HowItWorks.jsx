import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// ─── Steps Data ───────────────────────────────────────────────────────────────
const STEPS = [
    {
        number: '01',
        en: {
            tag: 'Import',
            title: 'Convert to MPAI',
            description:
                'Bring in measurement files from common engineering formats. MachinePulseAI converts them into the native MPAI container for fast, repeatable analysis.',
            detail: 'CSV · Parquet · Excel · TDMS · MDF/MF4 · MPAI',
        },
        tr: {
            tag: 'İçe Aktar',
            title: 'MPAI Formatına Çevir',
            description:
                'Yaygın mühendislik ölçüm formatlarındaki dosyaları içe aktarın. MachinePulseAI bunları hızlı ve tekrarlanabilir analiz için yerel MPAI konteynerine dönüştürür.',
            detail: 'CSV · Parquet · Excel · TDMS · MDF/MF4 · MPAI',
        },
        color: '#00f5ff',
    },
    {
        number: '02',
        en: {
            tag: 'Analyze',
            title: 'Run Engineering Modules',
            description:
                'Use focused modules for filtering, FFT, vibration, acoustics, power, combustion and diagnostics while the data engine handles 200 GB+ datasets.',
            detail: 'FFT · Vibration · Acoustics · Power · Combustion',
        },
        tr: {
            tag: 'Analiz Et',
            title: 'Mühendislik Modüllerini Çalıştır',
            description:
                'Filtreleme, FFT, titreşim, akustik, güç, yanma ve tanılama modüllerini kullanın; 200 GB+ veri setlerini güçlü veri motoru işler.',
            detail: 'FFT · Titreşim · Akustik · Güç · Yanma',
        },
        color: '#3b82f6',
    },
    {
        number: '03',
        en: {
            tag: 'Visualize',
            title: 'Explore Signals Interactively',
            description:
                'Compare many channels through synchronized time, frequency, waterfall, scatter and distribution views designed for dense measurement data.',
            detail: 'Time series · Spectrum · Waterfall · Scatter · Histogram',
        },
        tr: {
            tag: 'Görselleştir',
            title: 'Sinyalleri Etkileşimli İncele',
            description:
                'Yoğun ölçüm verisi için tasarlanmış senkronize zaman, frekans, waterfall, saçılım ve dağılım görünümleriyle çok sayıda kanalı karşılaştırın.',
            detail: 'Zaman serisi · Spektrum · Waterfall · Saçılım · Histogram',
        },
        color: '#a855f7',
    },
    {
        number: '04',
        en: {
            tag: 'Decide',
            title: 'Turn Results Into Decisions',
            description:
                'Use the AI assistant and engineering context to summarize findings, compare runs and prepare the outputs your team needs for review.',
            detail: 'Findings · Comparisons · Review-ready outputs',
        },
        tr: {
            tag: 'Karar Ver',
            title: 'Sonuçları Karara Dönüştür',
            description:
                'Bulguları özetlemek, test koşularını karşılaştırmak ve ekibin incelemesine hazır çıktılar hazırlamak için AI asistanı ve mühendislik bağlamını kullanın.',
            detail: 'Bulgular · Karşılaştırmalar · İncelemeye hazır çıktılar',
        },
        color: '#f59e0b',
    },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
}
const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function HowItWorks() {
    const { t, i18n } = useTranslation()
    const lang = i18n.language?.startsWith('tr') ? 'tr' : 'en'
    return (
        <section id="how-it-works" className="relative py-10 px-6 overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(0,245,255,0.04), transparent)' }}
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ── Header ── */}
                <motion.div
                    className="mb-8 max-w-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                    <span className="inline-block text-xs font-semibold text-[#00f5ff] tracking-widest uppercase mb-4">
                        {t('howItWorks.eyebrow')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                        {t('howItWorks.titleBefore')}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#3b82f6]">
                            {t('howItWorks.titleHighlight')}
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                        {t('howItWorks.subtitle')}
                    </p>
                </motion.div>

                {/* ── Steps ── */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {STEPS.map((step, index) => (
                        (() => {
                            const content = step[lang] || step.en
                            return (
                        <motion.div
                            key={step.number}
                            variants={itemVariants}
                            className="relative group"
                        >
                            {/* Connector line */}
                            {index < STEPS.length - 1 && (
                                <div
                                    className="hidden lg:block absolute top-8 left-[calc(100%+0px)] w-6 h-px z-10"
                                    style={{ background: `linear-gradient(90deg, ${step.color}40, ${STEPS[index + 1].color}40)` }}
                                />
                            )}

                            <div className="card-hover-glow bg-white/[0.02] border border-white/8 rounded-2xl p-6 h-full flex flex-col gap-4 relative overflow-hidden">
                                {/* Top accent */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-px"
                                    style={{ background: `linear-gradient(90deg, transparent, ${step.color}50, transparent)` }}
                                    aria-hidden="true"
                                />

                                {/* Number + Tag */}
                                <div className="flex items-center justify-between">
                                    <span
                                        className="text-3xl font-black tracking-tighter opacity-20"
                                        style={{ color: step.color }}
                                    >
                                        {step.number}
                                    </span>
                                    <span
                                        className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
                                        style={{ color: step.color, background: `${step.color}15`, border: `1px solid ${step.color}25` }}
                                    >
                                        {content.tag}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-semibold text-white leading-snug">{content.title}</h3>

                                {/* Description */}
                                <p className="text-sm text-slate-400 leading-relaxed flex-1">{content.description}</p>

                                {/* Detail badge */}
                                <div
                                    className="text-[11px] font-medium rounded-lg px-3 py-2 leading-relaxed"
                                    style={{ background: `${step.color}08`, color: `${step.color}90`, border: `1px solid ${step.color}15` }}
                                >
                                    {content.detail}
                                </div>

                                {/* Hover glow overlay */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${step.color}06, transparent 70%)` }}
                                    aria-hidden="true"
                                />
                            </div>
                        </motion.div>
                            )
                        })()
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
