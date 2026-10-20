// ─── Per-route SEO metadata ─────────────────────────────────────────────────────
// Each route gets its own title + description in both languages so search engines
// and social cards no longer share the generic home metadata across all 8 routes.
// Keep titles ≤ 60 chars and descriptions ≤ 160 chars.

import { WIDGET_LEARNING } from '../data/widgetLearning.js'
import WIDGET_CATALOG from '../data/widgetCatalog.js'

export const SITE_URL = 'https://www.machinepulseai.com.tr'
export const SITE_NAME = 'MachinePulseAI'
export const OG_IMAGE = `${SITE_URL}/logo.png`

const BRAND = 'MachinePulseAI'

export const ROUTE_META = {
    '/': {
        en: {
            title: `${BRAND} — Engineering Analysis for Large Measurement Data`,
            description: 'Import CSV, TDMS, MDF/MF4, Parquet and MPAI test data into one workspace; analyze 200 GB+ files with low memory use.',
        },
        tr: {
            title: `${BRAND} — Büyük Ölçüm Verileri İçin Mühendislik Analizi`,
            description: 'CSV, TDMS, MDF/MF4, Parquet ve MPAI test verilerini tek çalışma alanında içe aktarın; 200 GB+ dosyaları düşük bellek kullanımıyla analiz edin.',
        },
    },
    '/product': {
        en: {
            title: `Product — ${BRAND}`,
            description: 'Capabilities, workflow and the built-in AI architecture: natural-language analysis, Apache Arrow zero-copy engine, 8 GB RAM operation and multi-axis visualization.',
        },
        tr: {
            title: `Ürün — ${BRAND}`,
            description: 'Yetenekler, iş akışı ve yerleşik AI mimarisi: doğal dil ile analiz, Apache Arrow sıfır-kopya motoru, 8 GB RAM ile çalışma ve çok-eksenli görselleştirme.',
        },
    },
    '/widgets': {
        en: {
            title: `Engineering Module Library — ${BRAND}`,
            description: 'Technical module library with theory, input channels, formulas, processing steps and produced outputs.',
        },
        tr: {
            title: `Mühendislik Modül Kütüphanesi — ${BRAND}`,
            description: 'Teori, giriş kanalları, formüller, işlem adımları ve üretilen çıktılarla teknik modül kütüphanesi.',
        },
    },
    '/widgets/combustion-analysis': {
        en: {
            title: `Advanced Combustion Analysis — ${BRAND}`,
            description: 'In-cylinder combustion diagnostics deep dive: input channels, core formulas, processing pipeline and outputs — from indicated pressure to IMEP, heat release, MFB and knock.',
        },
        tr: {
            title: `Gelişmiş Yanma Analizi — ${BRAND}`,
            description: 'Silindir-içi yanma teşhisi derinlemesine: giriş kanalları, temel formüller, işlem hattı ve çıktılar — indike basınçtan IMEP, ısı salınımı, MFB ve vuruntuya.',
        },
    },
    '/widgets/fft-spectrum': {
        en: {
            title: `FFT & Spectrum Analysis — ${BRAND}`,
            description: 'FFT, Welch PSD and STFT explained through real controls, formulas, cursor-range behaviour, outputs and engineering interpretation limits.',
        },
        tr: {
            title: `FFT ve Spektrum Analizi — ${BRAND}`,
            description: 'FFT, Welch PSD ve STFT; gerçek kontroller, formüller, imleç aralığı davranışı, çıktılar ve mühendislik yorum sınırlarıyla açıklanır.',
        },
    },
    '/widgets/bearing-gear-fault': {
        en: { title: `Bearing & Gear Fault Diagnosis — ${BRAND}`, description: 'Envelope, kurtogram, cepstrum and gear-mesh diagnostics for rolling-element bearing and gearbox faults.' },
        tr: { title: `Rulman ve Dişli Arıza Teşhisi — ${BRAND}`, description: 'Rulman ve dişli kutusu arızaları için zarf, kurtogram, kepstrum ve dişli kavrama teşhisi.' },
    },
    '/widgets/modal-analysis-ema': {
        en: { title: `Advanced Modal Analysis — ${BRAND}`, description: 'Experimental modal analysis from FRFs: natural frequencies, damping, mode shapes, stabilization and MAC.' },
        tr: { title: `Gelişmiş Modal Analiz — ${BRAND}`, description: 'FRF tabanlı deneysel modal analiz: doğal frekans, sönüm, mod şekli, kararlılık ve MAC.' },
    },
    '/widgets/operational-modal-analysis': {
        en: { title: `Operational Modal Analysis — ${BRAND}`, description: 'Output-only modal identification for structures and machines under real operating loads.' },
        tr: { title: `Operasyonel Modal Analiz — ${BRAND}`, description: 'Gerçek işletme yükleri altında yapı ve makineler için yalnızca tepki tabanlı modal tanımlama.' },
    },
    '/widgets/order-tracking': {
        en: { title: `Order Tracking — ${BRAND}`, description: 'Rotating machinery order analysis for run-up, coast-down, Campbell diagrams and speed-related vibration.' },
        tr: { title: `Order Takibi — ${BRAND}`, description: 'Kalkış/duruş, Campbell diyagramları ve hıza bağlı titreşim için döner makine order analizi.' },
    },
    '/widgets/rotor-balancing': {
        en: { title: `Rotor Balancing — ${BRAND}`, description: 'Single- and two-plane rotor balancing with trial weights, influence coefficients and ISO 21940 targets.' },
        tr: { title: `Rotor Balanslama — ${BRAND}`, description: 'Deneme ağırlığı, etki katsayısı ve ISO 21940 hedefleriyle tek/çift düzlem rotor balanslama.' },
    },
    '/widgets/rotor-dynamics': {
        en: { title: `Rotor Dynamics Analysis Guide — ${BRAND}`, description: 'Measuring shaft motion with XY proximity probes: orbit, critical speed, Bode and Polar response, shaft centreline, full spectrum and forward/backward whirl.' },
        tr: { title: `Rotor Dinamiği Analiz Rehberi — ${BRAND}`, description: 'XY yakınlık problarıyla şaft hareketinin ölçümü: orbit, kritik hız, Bode ve Polar yanıtı, şaft merkez çizgisi, full spectrum ve ileri/geri whirl.' },
    },
    '/widgets/shock-srs': {
        en: { title: `Shock & SRS — ${BRAND}`, description: 'Shock response spectrum analysis for drop, impact and transient qualification events.' },
        tr: { title: `Şok ve SRS — ${BRAND}`, description: 'Düşme, darbe ve geçici yeterlilik olayları için şok tepki spektrumu analizi.' },
    },
    '/widgets/time-based-ods': {
        en: { title: `Time-Based ODS — ${BRAND}`, description: 'Operating deflection shape animation from synchronized response channels and measurement geometry.' },
        tr: { title: `Zaman Tabanlı ODS — ${BRAND}`, description: 'Senkron tepki kanalları ve ölçüm geometrisinden çalışma şekli animasyonu.' },
    },
    '/widgets/cross-spectrum-frf': {
        en: { title: `Frequency Response & Cross Spectrum — ${BRAND}`, description: 'Cross-spectrum, coherence and FRF analysis for input-output vibration relationships.' },
        tr: { title: `Frekans Tepkisi ve Çapraz Spektrum — ${BRAND}`, description: 'Giriş-çıkış titreşim ilişkileri için çapraz spektrum, koherans ve FRF analizi.' },
    },
    '/widgets/cross-axis-compensation': {
        en: { title: `Cross-Axis Compensation — ${BRAND}`, description: 'Sensor cross-axis correction for cleaner multi-axis acceleration and motion measurements.' },
        tr: { title: `Çapraz Eksen Kompanzasyonu — ${BRAND}`, description: 'Daha temiz çok eksenli ivme ve hareket ölçümleri için sensör çapraz eksen düzeltmesi.' },
    },
    '/widgets/kinematic-chain-6dof': {
        en: { title: `Kinematic Chain 6DOF — ${BRAND}`, description: 'Six-degree-of-freedom motion reconstruction from accelerometer, gyro and geometry data.' },
        tr: { title: `6DOF Kinematik Zincir — ${BRAND}`, description: 'İvmeölçer, jiroskop ve geometri verisinden altı serbestlik dereceli hareket kurulumu.' },
    },
    '/widgets/torsional-vibration': {
        en: { title: `Torsional & Rotational Vibration — ${BRAND}`, description: 'Angular speed fluctuation, shaft twist and torsional order analysis from encoder or tacho pulses.' },
        tr: { title: `Burulma ve Dönel Titreşim — ${BRAND}`, description: 'Enkoder veya tako darbelerinden açısal hız dalgalanması, mil burulması ve burulma order analizi.' },
    },
    '/widgets/sound-level-meter': {
        en: { title: `Sound Level Meter — ${BRAND}`, description: 'SPL, dBA/dBC/dBZ, Leq, peak and percentile sound-level analysis from calibrated microphone data.' },
        tr: { title: `Ses Seviyesi Ölçer — ${BRAND}`, description: 'Kalibre mikrofon verisinden SPL, dBA/dBC/dBZ, Leq, tepe ve yüzdelik ses seviyesi analizi.' },
    },
    '/widgets/sound-intensity-power': {
        en: { title: `Sound Intensity & Power — ${BRAND}`, description: 'Sound intensity mapping and radiated sound power estimation for acoustic source comparison.' },
        tr: { title: `Ses Şiddeti ve Gücü — ${BRAND}`, description: 'Akustik kaynak karşılaştırması için ses şiddeti haritalama ve yayılan ses gücü tahmini.' },
    },
    '/widgets/octave-band-analysis': {
        en: { title: `Octave Band Analysis — ${BRAND}`, description: 'Standard 1/1 and 1/3 octave-band analysis for acoustic spectra, targets and reports.' },
        tr: { title: `Oktav Bandı Analizi — ${BRAND}`, description: 'Akustik spektrum, hedef ve raporlar için standart 1/1 ve 1/3 oktav bandı analizi.' },
    },
    '/widgets/psychoacoustics-sound-quality': {
        en: { title: `Psychoacoustics — ${BRAND}`, description: 'Loudness, sharpness, roughness, fluctuation strength and tonality for perceived sound quality.' },
        tr: { title: `Psikoakustik — ${BRAND}`, description: 'Algılanan ses kalitesi için loudness, sharpness, roughness, fluctuation strength ve tonality.' },
    },
    '/widgets/microphone-correction': {
        en: { title: `Microphone Correction — ${BRAND}`, description: 'Microphone calibration and free-field or diffuse-field correction for accurate acoustic spectra.' },
        tr: { title: `Mikrofon Düzeltmesi — ${BRAND}`, description: 'Doğru akustik spektrumlar için mikrofon kalibrasyonu ve serbest/yayılı alan düzeltmesi.' },
    },
    '/widgets/heat-transfer-thermal': {
        en: {
            title: `Heat Transfer & Thermal — ${BRAND}`,
            description: 'Thermal analysis for heat duty, exchanger effectiveness, LMTD, NTU, cooling time constants and heat-transfer coefficients.',
        },
        tr: {
            title: `Isı Transferi ve Termal — ${BRAND}`,
            description: 'Isı yükü, eşanjör etkinliği, LMTD, NTU, soğuma zaman sabiti ve ısı-transfer katsayıları için termal analiz.',
        },
    },
    '/widgets/fluid-dynamics': {
        en: {
            title: `Fluid Dynamics — ${BRAND}`,
            description: 'Pump and piping diagnostics from pressure, flow and speed data: pulsation, cavitation risk, NPSH, water hammer and hydraulic power.',
        },
        tr: {
            title: `Akışkanlar Dinamiği — ${BRAND}`,
            description: 'Basınç, debi ve hız verisinden pompa/boru teşhisi: pulsasyon, kavitasyon riski, NPSH, su koçu ve hidrolik güç.',
        },
    },
    '/widgets/gas-exchange-scavenging': {
        en: {
            title: `Gas Exchange & Scavenging — ${BRAND}`,
            description: 'Engine breathing analysis from cylinder pressure and crank angle: pumping loop, PMEP, volumetric efficiency and scavenging indicators.',
        },
        tr: {
            title: `Gaz Değişimi ve Süpürme — ${BRAND}`,
            description: 'Silindir basıncı ve krank açısından motor nefes alma analizi: pompalama çevrimi, PMEP, hacimsel verim ve süpürme.',
        },
    },
    '/widgets/thermodynamic-cycles': {
        en: {
            title: `Thermodynamic Cycles — ${BRAND}`,
            description: 'Ideal and measured cycle comparison for Otto, Diesel, Dual, Brayton and Rankine systems with p-V, T-S, work and efficiency.',
        },
        tr: {
            title: `Termodinamik Çevrimler — ${BRAND}`,
            description: 'Otto, Diesel, Dual, Brayton ve Rankine sistemleri için p-V, T-S, iş ve verimle ideal/ölçülen çevrim karşılaştırması.',
        },
    },
    '/widgets/work-cycle-analysis': {
        en: {
            title: `Work Cycle Analysis — ${BRAND}`,
            description: 'Pressure-volume work-loop analysis for engines and compressors: IMEP, PMEP, BMEP, FMEP and polytropic exponent.',
        },
        tr: {
            title: `İş Çevrimi Analizi — ${BRAND}`,
            description: 'Motor ve kompresörler için basınç-hacim iş çevrimi analizi: IMEP, PMEP, BMEP, FMEP ve politropik üs.',
        },
    },
    '/pricing': {
        en: {
            title: `Packages — ${BRAND}`,
            description: 'A modular base package plus optional widget groups, ML suite and AI assistant. Choose the capabilities that fit your workflow.',
        },
        tr: {
            title: `Paketler — ${BRAND}`,
            description: 'Modüler bir baz paket ile birlikte isteğe bağlı widget grupları, ML paketi ve yapay zeka asistanı. İş akışınıza uygun yetenekleri seçin.',
        },
    },
}

/** Resolve metadata for a path + language, falling back to home / English. */
export function resolveRouteMeta(pathname, lang) {
    const guide = Object.values(WIDGET_LEARNING).find((item) => pathname === `/widgets/${item.slug}`)
    if (guide) {
        const widget = WIDGET_CATALOG.flatMap((category) => category.widgets).find((item) => item.id === guide.id)
        const intro = (guide[lang] || guide.en).intro
        const sentence = intro.split('. ')[0] + '.'
        const text = sentence.length >= 70 && sentence.length <= 160 ? sentence : intro
        const prefix = text.slice(0, 157)
        return {
            title: `${widget[lang]?.name || widget.en.name} — ${BRAND}`,
            description: text.length <= 160 ? text : `${prefix.slice(0, prefix.lastIndexOf(' '))}…`,
        }
    }
    const entry = ROUTE_META[pathname] || ROUTE_META['/']
    return entry[lang] || entry.en
}
