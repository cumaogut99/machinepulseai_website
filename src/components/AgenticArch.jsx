import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// ─── Agent Architecture Data ───────────────────────────────────────────────────
// Source: DeepCube document — "agentic" ML+LLM+RAG architecture description
// TODO: Update agent capability descriptions as the product evolves

const AGENT_CAPABILITIES = [
    {
        id: 'nlp-command',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
        en: {
            title: 'Natural Language Commands',
            description:
                'Tell the assistant what to analyze in plain English. It helps turn an engineering question into the right sequence of analysis actions.',
        },
        tr: {
            title: 'Doğal Dil Komutları',
            description:
                'Asistana neyi analiz etmek istediğinizi doğal dille söyleyin. Mühendislik sorusunu doğru analiz adımlarına dönüştürmeye yardım eder.',
        },
        color: '#00f5ff',
    },
    {
        id: 'rag-memory',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
        ),
        en: {
            title: 'Corporate Memory (RAG)',
            description:
                'The assistant can reference past reports and technical documents, helping teams reuse institutional knowledge instead of starting from zero.',
        },
        tr: {
            title: 'Kurumsal Hafıza (RAG)',
            description:
                'Asistan geçmiş raporları ve teknik dokümanları referans alabilir; ekiplerin kurumsal bilgiyi sıfırdan başlamadan kullanmasına yardım eder.',
        },
        color: '#3b82f6',
    },
    {
        id: 'anomaly',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        en: {
            title: 'Anomaly Detection (ML)',
            description:
                'Machine learning modules support fault detection, anomaly diagnosis and predictive maintenance workflows for rotating machinery and test data.',
        },
        tr: {
            title: 'Anomali Tespiti (ML)',
            description:
                'Makine öğrenmesi modülleri; döner makineler ve test verileri için arıza tespiti, anomali tanılama ve kestirimci bakım iş akışlarını destekler.',
        },
        color: '#a855f7',
    },
    {
        id: 'offline',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        en: {
            title: 'Offline & Secure',
            description:
                'The platform is designed for local, controlled deployments where sensitive engineering data should stay inside the organization.',
        },
        tr: {
            title: 'Çevrimdışı ve Güvenli',
            description:
                'Platform, hassas mühendislik verisinin kurum içinde kalması gereken yerel ve kontrollü kurulumlar için tasarlanır.',
        },
        color: '#22c55e',
    },
    {
        id: 'python-api',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        en: {
            title: 'Extensible Workflows',
            description:
                'Engineering teams can extend workflows with custom algorithms, filters and internal models while keeping the core analysis pipeline consistent.',
        },
        tr: {
            title: 'Genişletilebilir İş Akışları',
            description:
                'Mühendislik ekipleri özel algoritmalar, filtreler ve kurum içi modeller ekleyebilir; temel analiz hattı tutarlı kalır.',
        },
        color: '#f59e0b',
    },
    {
        id: 'auto-report',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        en: {
            title: 'Review-Ready Outputs',
            description:
                'Summaries, comparisons and exportable results help engineers move from signal inspection to a decision-ready review faster.',
        },
        tr: {
            title: 'İncelemeye Hazır Çıktılar',
            description:
                'Özetler, karşılaştırmalar ve dışa aktarılabilir sonuçlar; mühendislerin sinyal incelemesinden karar hazırlığına daha hızlı geçmesine yardım eder.',
        },
        color: '#ec4899',
    },
]

// ─── Architecture Diagram Labels ────────────────────────────────────────────
const ARCH_LAYERS = [
    {
        en: { label: 'Application Workspace', sublabel: 'Node canvas · Widgets · Engineering workflow' },
        tr: { label: 'Uygulama Çalışma Alanı', sublabel: 'Node canvas · Widgetlar · Mühendislik iş akışı' },
        color: '#00f5ff',
    },
    {
        en: { label: 'AI Assistant Layer', sublabel: 'Natural language · RAG · ML diagnostics' },
        tr: { label: 'AI Asistan Katmanı', sublabel: 'Doğal dil · RAG · ML tanılama' },
        color: '#3b82f6',
    },
    {
        en: { label: 'MPAI Data Engine', sublabel: 'Multi-format import · 200 GB+ datasets · Min-Max LOD' },
        tr: { label: 'MPAI Veri Motoru', sublabel: 'Çok formatlı içe aktarma · 200 GB+ veri · Min-Max LOD' },
        color: '#a855f7',
    },
    {
        en: { label: 'Performance Core', sublabel: 'C++ processing · Qt rendering · Signal analysis' },
        tr: { label: 'Performans Çekirdeği', sublabel: 'C++ işleme · Qt çizim · Sinyal analizi' },
        color: '#ec4899',
    },
]

const COMPARISON_ROWS = [
    {
        en: { label: 'Large measurement files', ours: 'Native 200 GB+ path', typical: 'Often split or preprocessed' },
        tr: { label: 'Büyük ölçüm dosyaları', ours: 'Yerel 200 GB+ akış', typical: 'Çoğu zaman bölme/ön işlem gerekir' },
    },
    {
        en: { label: 'Engineering modules', ours: 'One connected workspace', typical: 'Separate tools and exports' },
        tr: { label: 'Mühendislik modülleri', ours: 'Tek bağlı çalışma alanı', typical: 'Ayrı araçlar ve dışa aktarımlar' },
    },
    {
        en: { label: 'AI assistance', ours: 'Built into the analysis flow', typical: 'Usually outside the toolchain' },
        tr: { label: 'AI desteği', ours: 'Analiz akışının içinde', typical: 'Genelde araç zincirinin dışında' },
    },
    {
        en: { label: 'Sensitive data', ours: 'Designed for local deployment', typical: 'Often cloud or file handoff' },
        tr: { label: 'Hassas veri', ours: 'Yerel kurulum için tasarlanır', typical: 'Sıklıkla bulut veya dosya aktarımı' },
    },
    {
        en: { label: 'Traceability', ours: 'MPAI-centered workflow', typical: 'Scattered intermediate files' },
        tr: { label: 'İzlenebilirlik', ours: 'MPAI merkezli iş akışı', typical: 'Dağınık ara dosyalar' },
    },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function AgenticArch() {
    const { t, i18n } = useTranslation()
    const lang = i18n.language?.startsWith('tr') ? 'tr' : 'en'
    return (
        <section id="agentic-architecture" className="relative py-10 px-6 overflow-hidden">
            {/* Background glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(59,130,246,0.07), transparent)' }}
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ── Header ── */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="inline-block text-xs font-semibold text-[#3b82f6] tracking-widest uppercase mb-4">
                        {t('agenticArch.eyebrow')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                        {t('agenticArch.titleBefore')}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899]">
                            {t('agenticArch.titleHighlight')}
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
                        {t('agenticArch.subtitle')}
                    </p>
                </motion.div>

                {/* ── Two-column layout: Capabilities + Architecture Diagram ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left: Capability Cards */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {AGENT_CAPABILITIES.map((cap) => (
                            (() => {
                                const content = cap[lang] || cap.en
                                return (
                            <motion.div
                                key={cap.id}
                                variants={cardVariants}
                                className="card-hover-glow group bg-white/[0.02] border border-white/8 rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden"
                            >
                                <div
                                    className="absolute top-0 left-0 right-0 h-px"
                                    style={{ background: `linear-gradient(90deg, transparent, ${cap.color}40, transparent)` }}
                                    aria-hidden="true"
                                />
                                <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${cap.color}12`, color: cap.color, border: `1px solid ${cap.color}20` }}
                                >
                                    {cap.icon}
                                </div>
                                <h3 className="text-sm font-semibold text-white leading-snug">{content.title}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">{content.description}</p>
                            </motion.div>
                                )
                            })()
                        ))}
                    </motion.div>

                    {/* Right: Architecture Stack Diagram */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="flex flex-col gap-3"
                    >
                        <p className="text-xs font-semibold text-slate-500 tracking-widest uppercase mb-2">
                            {lang === 'tr' ? 'Sistem Mimarisi' : 'System Architecture'}
                        </p>

                        {/* Stack layers */}
                        {ARCH_LAYERS.map((layer, i) => (
                            (() => {
                                const content = layer[lang] || layer.en
                                return (
                            <motion.div
                                key={content.label}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.5 }}
                                className="relative rounded-xl border p-4 flex items-center justify-between gap-4 group cursor-default"
                                style={{
                                    background: `${layer.color}05`,
                                    borderColor: `${layer.color}20`,
                                }}
                            >
                                {/* Left indicator */}
                                <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: layer.color }} />
                                <div className="flex-1">
                                    <div className="text-sm font-semibold text-white">{content.label}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{content.sublabel}</div>
                                </div>
                                {/* Layer number */}
                                <div
                                    className="text-xs font-bold opacity-30"
                                    style={{ color: layer.color }}
                                >
                                    L{i + 1}
                                </div>
                            </motion.div>
                                )
                            })()
                        ))}

                        {/* Connector arrows */}
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="flex justify-center -mt-1 -mb-1">
                                <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        ))}

                        {/* Workflow comparison callout */}
                        <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                                {lang === 'tr' ? 'İş Akışı Farkı' : 'Workflow Difference'}
                            </p>
                            <div className="space-y-2">
                                {COMPARISON_ROWS.map((row) => {
                                    const content = row[lang] || row.en
                                    return (
                                    <div key={content.label} className="flex items-center justify-between gap-4 text-xs">
                                        <span className="text-slate-400">{content.label}</span>
                                        <div className="flex items-center gap-4">
                                            <span className="text-green-400 font-semibold w-28 text-right">{content.ours}</span>
                                            <span className="text-slate-600 w-28 text-right">{content.typical}</span>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
