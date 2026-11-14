import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Industries the product serves today. Every example module is available in the
// current release and links to its guide page; module names stay in English in
// both languages so readers can find them in the application.
const SECTORS = [
    {
        id: 'aerospace', accent: '#00f5ff',
        modules: [['bearing-gear-fault', 'Bearing & Gear Fault Diagnosis'], ['shock-srs', 'Shock & SRS'], ['order-tracking', 'Order Tracking']],
    },
    {
        id: 'automotive', accent: '#3b82f6',
        modules: [['order-tracking', 'Order Tracking'], ['torsional-vibration', 'Torsional & Rotational Vibration'], ['kinematic-chain-6dof', 'Kinematic Chain (6-DOF)']],
    },
    {
        id: 'energy', accent: '#a855f7',
        modules: [['rotor-dynamics', 'Rotor Dynamics'], ['rotor-balancing', 'Rotor Balancing'], ['bearing-gear-fault', 'Bearing & Gear Fault Diagnosis']],
    },
    {
        id: 'rail', accent: '#00f5ff',
        modules: [['fft-spectrum', 'FFT / Spectrum'], ['order-tracking', 'Order Tracking'], ['frequency-filter', 'Frequency Filter']],
    },
    {
        id: 'industrial', accent: '#3b82f6',
        modules: [['modal-analysis-ema', 'Advanced Modal Analysis'], ['operational-modal-analysis', 'Operational Modal Analysis (OMA)'], ['time-based-ods', 'Time-Based ODS']],
    },
    {
        id: 'labs', accent: '#a855f7',
        modules: [['file-reader', 'File Reader'], ['time-alignment', 'Time Alignment'], ['intelligent-report', 'Intelligent Report']],
    },
]

/** Homepage industries grid; static markup so it reads well without JavaScript. */
export default function Sectors() {
    const { t } = useTranslation()
    return (
        <section id="industries" className="py-12 px-6 border-t border-white/5" aria-labelledby="industries-title">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl mb-8">
                    <p className="text-xs uppercase tracking-widest text-neon-cyan mb-3">{t('about.sectors.eyebrow')}</p>
                    <h2 id="industries-title" className="text-2xl sm:text-3xl font-bold mb-4">{t('about.sectors.title')}</h2>
                    <p className="text-slate-400 leading-relaxed">{t('about.sectors.description')}</p>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SECTORS.map(({ id, accent, modules }) => (
                        <li key={id}
                            className="card-hover-glow relative rounded-2xl border p-6 flex flex-col gap-3 overflow-hidden"
                            style={{ borderColor: `${accent}20`, background: `${accent}06` }}>
                            <span className="absolute top-0 left-0 right-0 h-px" aria-hidden="true"
                                style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
                            <h3 className="text-lg font-semibold text-white">{t(`about.sectors.items.${id}.title`)}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{t(`about.sectors.items.${id}.description`)}</p>
                            <div className="mt-auto pt-2">
                                <p className="sr-only">{t('about.sectors.modulesLabel')}</p>
                                <ul className="flex flex-wrap gap-2">
                                    {modules.map(([slug, name]) => (
                                        <li key={slug}>
                                            <Link to={`/widgets/${slug}`}
                                                className="inline-block text-xs text-slate-300 border border-white/10 rounded-full px-3 py-1 hover:text-neon-cyan hover:border-neon-cyan/40 transition-colors focus-visible:outline focus-visible:outline-neon-cyan">
                                                {name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
