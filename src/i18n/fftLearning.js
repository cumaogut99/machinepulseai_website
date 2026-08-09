import FFT_LEARNING_EXTRAS from './fftLearningExtras.js'
import FFT_INTERFACE_GUIDE from './fftInterfaceGuide.js'

const FFT_LEARNING_TRANSLATIONS = {
    en: {
        back: 'Back to module library',
        eyebrow: 'MachinePulseAI Academy · FFT / Spectrum',
        title: 'FFT Analysis Workflow',
        intro:
            'Start with no assumed FFT knowledge and progress from physical motion to the current MachinePulseAI controls. Every important setting is connected to the question it answers, the trade-off it creates, the result surface it changes and the interpretation mistake it prevents.',
        badges: ['Real application UI', 'Interactive concepts', 'New-engineer friendly'],
        start: 'Start with the interface',
        duration: '30 min guided learning path',
        outcomesTitle: 'At the end of this page you will be able to',
        outcomes: [
            'choose FFT, Welch PSD or STFT for the measurement question',
            'set sampling rate, block size, window and averaging deliberately',
            'recognize aliasing, leakage and false resolution claims',
            'read peaks, harmonics, sidebands, phase and summary metrics in context',
        ],
        nav: {
            interface: 'Interface & controls',
            theory: 'Understand Fourier',
            foundations: 'FFT foundations',
            modes: 'Choose a mode',
            workflow: 'First analysis',
        },
        sectionEyebrow: {
            interface: '01 · Tour the workbench and its controls',
            foundations: '03 · Learn by changing the numbers',
            modes: '04 · Match the method to the question',
            workflow: '05 · Build a defensible analysis',
        },
        tour: {
            title: 'The interface is the analysis story',
            intro:
                'Select a numbered region on the real MachinePulseAI FFT workbench. Read it from left to right: define the data, shape the calculation, inspect the spectrum, then verify the evidence.',
            imageAlt:
                'MachinePulseAI FFT Spectrum workbench with settings, spectrum plot and result summary',
            imageCaption:
                'Real MachinePulseAI FFT / Spectrum component with a deterministic training signal.',
            selectHint: 'Select a numbered region to learn what it controls.',
            items: [
                {
                    title: 'Input and analysis range',
                    kicker: 'What data am I describing?',
                    description:
                        'The channel, sample-rate metadata and time navigator define the evidence. Use the cursors to isolate one operating state; a spectrum of mixed speed or load states can be mathematically correct but operationally meaningless.',
                    check: 'Check the read-only sample rate and the samples-used value after Compute.',
                },
                {
                    title: 'Spectrum settings',
                    kicker: 'What frequency question am I asking?',
                    description:
                        'Mode, window and Block / Lines set the estimator and its trade-offs. The block size controls bin spacing; the window controls leakage and peak shape.',
                    check: 'Choose N from both the required Δf and the available stationary duration.',
                },
                {
                    title: 'Spectrum result',
                    kicker: 'Where is the energy?',
                    description:
                        'The central plot shows a one-sided result from DC to Nyquist. Peaks are clues: relate them to shaft speed, blade pass, gear mesh, electrical frequency or a known excitation before naming a fault.',
                    check: 'A strong peak is not automatically a resonance or a fault.',
                },
                {
                    title: 'Results and peak evidence',
                    kicker: 'Can I defend the reading?',
                    description:
                        'Peak frequency, magnitude, Δf, averages, THD, SINAD and SNR summarize the current calculation. Use them as traceable evidence, not as a replacement for the plot and test context.',
                    check: 'Confirm that the displayed resolution and averages match the intended recipe.',
                },
                {
                    title: 'Compute',
                    kicker: 'Run the selected recipe',
                    description:
                        'Compute executes the selected time range through the background C++ FFT engine. Cursor changes can recalculate the result without loading the full recording into memory.',
                    check: 'If the range changes, treat the new spectrum as a different observation.',
                },
            ],
        },
        lab: {
            title: 'Nyquist, resolution and leakage — one connected experiment',
            intro:
                'Change the sampling rate, tone frequency, block size and window. The cards and plots update together so the rules become visible instead of memorized.',
            sampleRate: 'Sampling rate (fs)',
            tone: 'Physical tone',
            block: 'Block size (N)',
            window: 'Window',
            timePlot: 'Sampled time signal',
            spectrumPlot: 'What the FFT reports',
            apparent: 'Apparent peak',
            nyquist: 'Nyquist',
            resolution: 'Bin spacing (Δf)',
            duration: 'Block duration',
            safeTitle: 'This tone is below Nyquist',
            safeBody:
                'The sampled data can represent this frequency uniquely, provided the acquisition anti-alias filter removed higher-frequency content before the ADC.',
            aliasTitle: 'Aliasing is active',
            aliasBody:
                'The physical tone is above fs / 2, so the samples imitate a lower frequency. The FFT cannot recover the original after acquisition; prevention belongs before the ADC.',
            sampleDots: 'Dots are the acquired samples; the line is only a visual connection.',
            windows: {
                rectangular: {
                    name: 'Rectangular',
                    note: 'Narrow main lobe, high leakage. Use only for coherent blocks.',
                },
                hann: {
                    name: 'Hann',
                    note: 'Balanced default for general FFT work.',
                },
                flattop: {
                    name: 'Flat-Top',
                    note: 'Flatter peak amplitude region, but wider peaks.',
                },
            },
            whyNyquistTitle: 'What Nyquist is protecting',
            whyNyquistBody:
                'Sampling turns a continuous waveform into discrete observations. Above half the sampling rate, different physical frequencies can create the same sample sequence. Nyquist marks the uniqueness boundary; the analog anti-alias filter enforces it in real hardware.',
            resolutionTitle: 'Why more lines cost time',
            resolutionBody:
                'Δf = fs / N and block duration = N / fs. Doubling N halves bin spacing but doubles the time that must remain representative. Zero-padding can draw a smoother curve, but it does not add new measured information.',
        },
        modes: {
            title: 'Choose the estimator before touching the settings',
            intro:
                'Start with the behavior of the selected time range, not with the plot that looks most familiar. These three modes use related Fourier mathematics but estimate different quantities, so the same channel may require a different mode when the engineering question changes.',
            prompt: 'Which sentence best describes the selected range?',
            items: [
                {
                    id: 'fft',
                    tab: 'Tones & harmonics',
                    name: 'Amplitude FFT',
                    question: 'Which discrete frequencies and harmonics are present?',
                    use:
                        'Use when the signal contains periodic or nearly steady deterministic components: shaft orders, electrical tones, gear mesh, blade pass and known excitations. Magnitude helps locate and compare tones; phase becomes useful when timing or synchronized channels matter.',
                    start: 'Begin with Hann and choose N from the required Δf. Keep averaging at None until one block is understood; then add Linear, Exponential or Max Hold only for a stated reason.',
                    trap:
                        'Do not call every peak a resonance or fault. A single-channel FFT sees the combined effect of excitation, transfer path, sensor direction and mounting; it cannot separate those causes without additional evidence.',
                },
                {
                    id: 'welch',
                    tab: 'Random & broadband',
                    name: 'Welch PSD',
                    question: 'How is random power distributed per hertz?',
                    use:
                        'Use for stationary noise, broadband vibration and comparisons where recordings may use different block sizes. PSD normalizes power by bandwidth, making the vertical meaning less dependent on Δf than a per-bin amplitude result.',
                    start: 'Begin with Hann and 50% overlap. Increase the analysed duration or segment count until repeated estimates are stable enough for the decision, while verifying that the operating state remains stationary.',
                    trap:
                        'PSD units are U²/Hz, not U. Do not compare its vertical values directly with a linear amplitude spectrum, and do not treat more averaging as valid when the signal changes state during the average.',
                },
                {
                    id: 'stft',
                    tab: 'Changing with time',
                    name: 'Spectrogram (STFT)',
                    question: 'When does each frequency appear or disappear?',
                    use:
                        'Use for run-up, coast-down, chirps, impacts and operating-state transitions inside the selection. Each color column is a short-time spectrum, so you can see components move, appear, disappear or broaden over time.',
                    start: 'Choose a block short enough to localize the event in time, then check whether Δf still separates the frequencies of interest. Add overlap to reduce the visual gap between frames, not to create new independent information.',
                    trap:
                        'A longer block improves frequency-bin spacing but smears when a change occurred; a shorter block sharpens timing but broadens frequency detail. This time–frequency trade-off cannot be removed by a display setting.',
                },
            ],
            labels: {
                question: 'Answers',
                use: 'Use it for',
                start: 'Practical start',
                trap: 'Interpretation guardrail',
            },
        },
        ...FFT_LEARNING_EXTRAS.en,
        tour: FFT_INTERFACE_GUIDE.en,
    },
    tr: {
        back: 'Modül kütüphanesine dön',
        eyebrow: 'MachinePulseAI Akademi · FFT / Spektrum Analizi',
        title: 'FFT Analiz Akışı',
        intro:
            'Önceden FFT bilgisine sahip olmadan başlayın; sensörün kaydettiği zaman sinyalini MachinePulseAI kontrolleriyle güvenilir bir frekans spektrumuna dönüştürün. Bu rehber; örnekleme hızı, blok boyutu, pencereleme ve ortalama gibi tüm kritik ayarların ne işe yaradığını, hangi soruya yanıt verdiğini ve hangi analiz tuzaklarını önlediğini anlatır.',
        badges: ['Uygulama Arayüzü', 'İnteraktif Deneyler', 'Pratik Mühendislik'],
        start: 'Arayüzü İnceleyin',
        duration: '30 dakikalık rehberli öğrenme yolu',
        outcomesTitle: 'Bu rehberi tamamladığınızda şunları yapabileceksiniz:',
        outcomes: [
            'Ölçüm amacınıza göre Genlik FFT, Welch PSD veya STFT modunu doğru seçmek',
            'Örnekleme hızı (fs), blok boyutu (N), pencere tipi ve ortalama sayılarını bilinçli ayarlamak',
            'Aliasing (örtüşme/hayalet frekans), sızıntı (leakage) ve sahte çözünürlük yanılsamalarını ayırt etmek',
            'Spektrumdaki tepeleri, harmonikleri, yan bantları ve özet metrikleri doğru yorumlamak',
        ],
        nav: {
            interface: 'Arayüz ve Kontroller',
            theory: 'Fourier Teorisi',
            foundations: 'FFT Temelleri & Laboratuvar',
            modes: 'Analiz Modları',
            workflow: 'Saha Analiz Adımları',
        },
        sectionEyebrow: {
            interface: '01 · Çalışma Ekranını ve Kontrolleri Tanıyın',
            foundations: '03 · Sayıları Değiştirerek İnteraktif Öğrenin',
            modes: '04 · Doğru Yöntemi Doğru Soruyla Eşleştirin',
            workflow: '05 · Güvenilir Bir Analiz Akışı Kurun',
        },
        modes: {
            title: 'Ayarları Değiştirmeden Önce Doğru Kestiriciyi Seçin',
            intro:
                'Analize en tanıdık görünen grafikle değil, seçilen zaman aralığının davranışına uygun yöntemle başlayın. Bu 3 mod aynı Fourier matematiğini kullanır ancak farklı fiziksel büyüklükleri hesaplar.',
            prompt: 'Seçili aralığı en iyi hangi cümle tanımlıyor?',
            items: [
                {
                    id: 'fft',
                    tab: 'Tonlar & Harmonikler',
                    name: 'Genlik FFT\'si',
                    question: 'Hangi frekanslar ve harmonikler mevcut?',
                    use:
                        'Sinyal periyodik veya kararlı bileşenler içerdiğinde kullanın: mil devir frekansları, elektrik frekansları, dişli kavrama, kanat geçişi gibi uyarım frekansları.',
                    start: 'Hann penceresi ile başlayın ve gerekli Δf çözünürlüğüne göre N boyutunu seçin.',
                    trap:
                        'Her tepeyi rezonans veya arıza sanmayın. Tek kanallı FFT uyarım, transfer yolu ve sensör yönünün bileşimidir.',
                },
                {
                    id: 'welch',
                    tab: 'Rastgele & Geniş Bant',
                    name: 'Welch PSD',
                    question: 'Rastgele gürültü gücü hertz başına nasıl dağılıyor?',
                    use:
                        'Durağan rastgele gürültü ve geniş bant titreşim analizi için kullanın. PSD gücü bant genişliğine oranlayarak (g²/Hz) çözünürlükten bağımsız karşılaştırma sağlar.',
                    start: 'Hann penceresi ve %50 örtüşme (overlap) ile başlayın.',
                    trap:
                        'PSD birimi g²/Hz\'dir, g değildir. Genlik spektrumuyla doğrudan kıyaslamayın.',
                },
                {
                    id: 'stft',
                    tab: 'Zamanla Değişen',
                    name: 'Spektrogram (STFT)',
                    question: 'Frekanslar ne zaman ortaya çıkıyor veya kayboluyor?',
                    use:
                        'Devir yükselme (run-up), devir düşme (coast-down), darbe veya zamanla değişen durumlar için kullanın.',
                    start: 'Zaman çözünürlüğünü korumak için kısa blok boyutu seçin ve örtüşme ekleyin.',
                    trap:
                        'Uzun blok frekans çözünürlüğünü artırır ama zaman bilgisini bulanıklaştırır; kısa blok ise zamanı netleştirip frekansı genişletir.',
                },
            ],
            labels: {
                question: 'Yanıtladığı soru',
                use: 'Kullanım alanı',
                start: 'Pratik başlangıç',
                trap: 'Yorum sınırı',
            },
        },
        ...FFT_LEARNING_EXTRAS.tr,
        tour: FFT_INTERFACE_GUIDE.tr,
    },
}

export default FFT_LEARNING_TRANSLATIONS
