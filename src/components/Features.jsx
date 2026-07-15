import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// ─── Features Data ──────────────────────────────────────────────────────────
// Add a new object to the array below to add a new feature card.
const FEATURES = [
    {
        id: 'natural-language',
        en: {
            tag: 'AI Analysis',
            title: 'Natural Language Analysis',
            description:
                'Ask engineering questions in plain language. The assistant helps build the right analysis path while the data engine performs the heavy processing.',
            mediaNote: 'Natural language interface screenshot',
        },
        tr: {
            tag: 'AI Analiz',
            title: 'Doğal Dil ile Analiz',
            description:
                'Mühendislik sorularını doğal dille sorun. Asistan doğru analiz yolunu kurmaya yardım eder; ağır işlemleri güçlü veri motoru yürütür.',
            mediaNote: 'Doğal dil arayüzü ekran görüntüsü',
        },
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3-3-3z" />
            </svg>
        ),
        accentColor: '#00f5ff',
    },
    {
        id: 'apache-arrow',
        en: {
            tag: 'Performance',
            title: 'MPAI Data Engine',
            description:
                'Convert many measurement file types into the native MPAI format, then process 200 GB+ datasets with low memory use and fast interactive access.',
            mediaNote: 'MPAI conversion and memory benchmark',
        },
        tr: {
            tag: 'Performans',
            title: 'MPAI Veri Motoru',
            description:
                'Birçok ölçüm dosyası türünü yerel MPAI formatına dönüştürün; ardından 200 GB+ veri setlerini düşük bellek kullanımı ve hızlı etkileşimle işleyin.',
            mediaNote: 'MPAI dönüşüm ve bellek karşılaştırması',
        },
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        accentColor: '#3b82f6',
    },
    {
        id: 'low-ram',
        en: {
            tag: 'Efficiency',
            title: 'Large Files, Modest Hardware',
            description:
                'Analyze large recorded test data on standard Windows workstations. Min-Max LOD rendering keeps dense signals responsive while preserving peaks.',
            mediaNote: 'System resource usage indicator',
        },
        tr: {
            tag: 'Verimlilik',
            title: 'Büyük Dosya, Mütevazı Donanım',
            description:
                'Büyük kayıtlı test verilerini standart Windows iş istasyonlarında analiz edin. Min-Max LOD çizimi, yoğun sinyalleri tepe değerleri koruyarak akıcı tutar.',
            mediaNote: 'Sistem kaynak kullanımı göstergesi',
        },
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
            </svg>
        ),
        accentColor: '#a855f7',
    },
    {
        id: 'multi-axis',
        en: {
            tag: 'Visualization',
            title: 'Engineering Visualization',
            description:
                'Compare vibration, pressure, temperature and RPM channels with synchronized time, frequency, waterfall and distribution views in one workspace.',
            mediaNote: 'Multi-axis chart dashboard screenshot',
        },
        tr: {
            tag: 'Görselleştirme',
            title: 'Mühendislik Görselleştirmesi',
            description:
                'Titreşim, basınç, sıcaklık ve RPM kanallarını tek çalışma alanında senkronize zaman, frekans, waterfall ve dağılım görünümleriyle karşılaştırın.',
            mediaNote: 'Çok eksenli grafik panosu ekran görüntüsü',
        },
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        accentColor: '#f59e0b',
    },
]

// ─── Framer Motion Variants ─────────────────────────────────────────────────
const sectionVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] },
    },
}

// ─── Feature Card Sub-component ─────────────────────────────────────────────
function FeatureCard({ feature, lang }) {
    const content = feature[lang] || feature.en

    return (
        <motion.div
            variants={cardVariants}
            id={`feature-card-${feature.id}`}
            className="card-hover-glow group relative flex flex-col bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden p-6 gap-5"
        >
            {/* Subtle top gradient accent */}
            <div
                className="absolute top-0 left-0 right-0 h-px opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${feature.accentColor}40, transparent)` }}
                aria-hidden="true"
            />

            {/* ── Card Header ──────────────────────────────────── */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    {/* Icon bubble */}
                    <div
                        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                            background: `${feature.accentColor}15`,
                            color: feature.accentColor,
                            border: `1px solid ${feature.accentColor}25`,
                        }}
                    >
                        {feature.icon}
                    </div>
                    <div>
                        {/* Tag */}
                        <span
                            className="text-xs font-medium tracking-wide uppercase mb-1 block"
                            style={{ color: `${feature.accentColor}` }}
                        >
                            {content.tag}
                        </span>
                        {/* Title */}
                        <h3 className="text-base font-semibold text-white leading-snug">
                            {content.title}
                        </h3>
                    </div>
                </div>
            </div>

            {/* ── Description ──────────────────────────────────── */}
            <p className="text-sm text-slate-400 leading-relaxed">
                {content.description}
            </p>

            {/* ── Media Area ───────────────────────────────────── */}
            {/*
        TODO: Media content for each feature will be added here.
        mediaNote: "{content.mediaNote}"
        Example – Image: <img src="..." alt={content.title} className="w-full h-full object-cover" />
        Example – Video: <video src="..." autoPlay loop muted playsInline className="w-full h-full object-cover" />
      */}
            <div
                id={`feature-media-${feature.id}`}
                className="rounded-xl flex-1 min-h-[140px] flex flex-col items-center justify-center gap-2 border border-dashed"
                style={{
                    background: `${feature.accentColor}06`,
                    borderColor: `${feature.accentColor}20`,
                }}
            >
                {/* TODO: Remove the placeholder below when media content is ready */}
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center opacity-40"
                    style={{ background: `${feature.accentColor}20`, color: feature.accentColor }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <span className="text-xs text-slate-600">
                    {content.mediaNote}
                </span>
            </div>

            {/* Hover glow border overlay */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${feature.accentColor}08, transparent 70%)`,
                }}
                aria-hidden="true"
            />
        </motion.div>
    )
}

// ─── Features Section ───────────────────────────────────────────────────────
export default function Features() {
    const { t, i18n } = useTranslation()
    const lang = i18n.language?.startsWith('tr') ? 'tr' : 'en'
    return (
        <section
            id="features"
            className="relative py-10 px-6 overflow-hidden"
        >
            {/* Section background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(59,130,246,0.06), transparent)',
                }}
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* ── Section Header ───────────────────────────────── */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                    <span className="inline-block text-xs font-semibold text-[#00f5ff] tracking-widest uppercase mb-4">
                        {t('features.eyebrow')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                        {t('features.title')}
                    </h2>
                    <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
                        {t('features.subtitle')}
                    </p>
                </motion.div>

                {/* ── Feature Cards Grid (Bento Box) ───────────────── */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {FEATURES.map((feature) => (
                        <FeatureCard key={feature.id} feature={feature} lang={lang} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
