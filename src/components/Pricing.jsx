import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useContactModal } from '../context/ContactModalContext.jsx'

// ─── Packages & Modules ─────────────────────────────────────────────────────────
// No prices on the public site — the page presents the base package plus the
// add-on modules a customer can combine. Contact / quote drives conversion.
// Accent colors below come from the locked neon/widget-catalog palette.

const BASE_FEATURE_KEYS = [0, 1, 2, 3, 4]

// Add-on modules: widget groups + intelligence modules. Each id maps to an i18n
// entry under pricing.groups.* (or pricing.ml / pricing.ai). Accents reuse the
// existing widget-catalog category colors so the two pages stay visually aligned.
const ADDON_GROUPS = [
    { id: 'filters', i18n: 'pricing.groups.filters', accent: '#a855f7' },
    { id: 'analysis', i18n: 'pricing.groups.analysis', accent: '#f59e0b' },
    { id: 'vibration', i18n: 'pricing.groups.vibration', accent: '#ef4444' },
    { id: 'acoustics', i18n: 'pricing.groups.acoustics', accent: '#06b6d4' },
    { id: 'control', i18n: 'pricing.groups.control', accent: '#8b5cf6' },
    { id: 'electrical', i18n: 'pricing.groups.electrical', accent: '#eab308' },
    { id: 'materials', i18n: 'pricing.groups.materials', accent: '#f97316' },
    { id: 'thermofluids', i18n: 'pricing.groups.thermofluids', accent: '#f43f5e' },
    { id: 'vehicle', i18n: 'pricing.groups.vehicle', accent: '#22c55e' },
]

const INTELLIGENCE_MODULES = [
    { id: 'ml', i18n: 'pricing.ml', accent: '#3b82f6' },
    { id: 'ai', i18n: 'pricing.ai', accent: '#a855f7' },
]

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
}

const CheckIcon = ({ color }) => (
    <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
)

// ── Add-on module card ─────────────────────────────────────────────────────────
function AddonCard({ name, desc, accent, label, cta, onSelect }) {
    return (
        <motion.div
            variants={cardVariants}
            className="card-hover-glow relative rounded-2xl border p-5 flex flex-col gap-3 overflow-hidden"
            style={{ borderColor: `${accent}20`, background: `${accent}06` }}
        >
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
                aria-hidden="true"
            />
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold text-white leading-snug">{name}</h3>
                <span
                    className="text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={{ color: accent, background: `${accent}15`, border: `1px solid ${accent}25` }}
                >
                    {label}
                </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed flex-1">{desc}</p>
            <button
                onClick={onSelect}
                className="w-full text-xs font-semibold py-2 rounded-lg transition-all duration-200 border hover:opacity-90"
                style={{ color: accent, borderColor: `${accent}40`, background: `${accent}08` }}
            >
                {cta}
            </button>
        </motion.div>
    )
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function Pricing() {
    const { t } = useTranslation()
    const { open: openContact } = useContactModal()

    const baseFeatures = t('pricing.base.features', { returnObjects: true }) || []
    const enterpriseFeatures = t('pricing.enterpriseFeatures', { returnObjects: true }) || []
    const selectCta = t('pricing.selectCta')

    return (
        <section id="pricing" className="relative py-20 px-6 overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(168,85,247,0.06), transparent)' }}
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
                    <span className="inline-block text-xs font-semibold text-[#a855f7] tracking-widest uppercase mb-4">
                        {t('pricing.eyebrow')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                        {t('pricing.title')}
                    </h2>
                    <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
                        {t('pricing.subtitle')}
                    </p>
                </motion.div>

                {/* ── Base Package ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="card-hover-glow relative rounded-2xl border border-[#00f5ff]/30 p-6 sm:p-8 mb-12 overflow-hidden"
                    style={{ background: 'rgba(0,245,255,0.04)' }}
                >
                    <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, #00f5ff80, transparent)' }}
                        aria-hidden="true"
                    />
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:max-w-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-bold text-white">{t('pricing.base.name')}</h3>
                                <span className="text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full text-[#00f5ff] bg-[#00f5ff]/15 border border-[#00f5ff]/25">
                                    {t('pricing.baseLabel')}
                                </span>
                            </div>
                            <p className="text-xs text-[#00f5ff]/80 mb-3">{t('pricing.base.tagline')}</p>
                            <p className="text-sm text-slate-400 leading-relaxed">{t('pricing.base.desc')}</p>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 flex-1 content-start">
                            {BASE_FEATURE_KEYS.map((i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                    <CheckIcon color="#00f5ff" />
                                    {baseFeatures[i]}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* ── Add-on Modules ── */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-white tracking-tight mb-1">{t('pricing.addonsHeading')}</h3>
                    <p className="text-sm text-slate-500 mb-6">{t('pricing.addonsTagline')}</p>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {ADDON_GROUPS.map((g) => (
                            <AddonCard
                                key={g.id}
                                name={t(`${g.i18n}.name`)}
                                desc={t(`${g.i18n}.desc`)}
                                accent={g.accent}
                                label={t('pricing.addonLabel')}
                                cta={selectCta}
                                onSelect={openContact}
                            />
                        ))}
                        {INTELLIGENCE_MODULES.map((m) => (
                            <AddonCard
                                key={m.id}
                                name={t(`${m.i18n}.name`)}
                                desc={t(`${m.i18n}.desc`)}
                                accent={m.accent}
                                label={t('pricing.addonLabel')}
                                cta={selectCta}
                                onSelect={openContact}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* ── Enterprise ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
                >
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-lg font-bold text-white">{t('pricing.enterpriseTitle')}</span>
                            <span className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full text-green-400 bg-green-400/10 border border-green-400/20">
                                {t('pricing.enterpriseBadge')}
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-5 max-w-xl leading-relaxed">{t('pricing.enterpriseDesc')}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                            {enterpriseFeatures.map((f) => (
                                <span key={f} className="flex items-center gap-1.5 text-xs text-slate-400">
                                    <CheckIcon color="#4ade80" />
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 md:min-w-[200px]">
                        <button
                            onClick={openContact}
                            className="w-full text-sm font-semibold text-green-400 py-3 rounded-xl border border-green-400/30 bg-green-400/8 hover:bg-green-400/15 hover:border-green-400/50 transition-all duration-200"
                        >
                            {t('pricing.enterpriseCta')}
                        </button>
                        <a
                            href="mailto:hello@machinepulseai.com.tr?subject=Datasheet%20Request"
                            className="w-full text-sm text-slate-400 hover:text-white py-2.5 rounded-xl border border-white/8 hover:border-white/20 hover:bg-white/5 transition-all duration-200 text-center block"
                        >
                            {t('pricing.datasheetCta')}
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
