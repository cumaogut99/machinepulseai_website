import FFT_LEARNING_EXTRAS from './fftLearningExtras.js'
import FFT_INTERFACE_GUIDE from './fftInterfaceGuide.js'

const FFT_LEARNING_TRANSLATIONS = {
    en: {
        back: 'Back to module library',
        eyebrow: 'MachinePulseAI Academy · FFT / Spectrum',
        title: 'From time signal to trustworthy spectrum',
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
        eyebrow: 'MachinePulseAI Akademi · FFT / Spektrum',
        title: 'Zaman sinyalinden güvenilir spektruma',
        intro:
            'Önceden FFT bilgisi varsaymadan fiziksel hareketten güncel MachinePulseAI kontrollerine ilerleyin. Rehber her önemli ayarı; cevapladığı soru, yarattığı ödünleşme, değiştirdiği sonuç yüzeyi ve önlediği yorum hatasıyla ilişkilendirir.',
        badges: ['Gerçek uygulama arayüzü', 'Etkileşimli kavramlar', 'Yeni mühendis dostu'],
        start: 'Arayüzden başla',
        duration: '30 dakikalık rehberli öğrenme yolu',
        outcomesTitle: 'Bu sayfanın sonunda şunları yapabileceksiniz',
        outcomes: [
            'ölçüm sorusuna göre FFT, Welch PSD veya STFT seçmek',
            'örnekleme hızı, blok, pencere ve ortalamayı bilinçli ayarlamak',
            'aliasing, sızıntı ve sahte çözünürlük iddialarını fark etmek',
            'tepe, harmonik, yan bant, faz ve özet metrikleri bağlamında okumak',
        ],
        nav: {
            interface: 'Arayüz ve kontroller',
            theory: 'Fourier’i anlayın',
            foundations: 'FFT temelleri',
            modes: 'Mod seçimi',
            workflow: 'İlk analiz',
        },
        sectionEyebrow: {
            interface: '01 · Çalışma ekranını ve kontrolleri tanıyın',
            foundations: '03 · Sayıları değiştirerek öğrenin',
            modes: '04 · Yöntemi soruyla eşleştirin',
            workflow: '05 · Savunulabilir analiz kurun',
        },
        tour: {
            title: 'Arayüz, analizin hikâyesidir',
            intro:
                'Gerçek MachinePulseAI FFT ekranında numaralı bir bölge seçin. Soldan sağa okuyun: veriyi tanımlayın, hesabı şekillendirin, spektrumu inceleyin ve kanıtı doğrulayın.',
            imageAlt:
                'Ayarlar, spektrum grafiği ve sonuç özeti bulunan MachinePulseAI FFT Spektrum çalışma ekranı',
            imageCaption:
                'Deterministik eğitim sinyaliyle gerçek MachinePulseAI FFT / Spektrum bileşeni.',
            selectHint: 'Ne işe yaradığını öğrenmek için numaralı bir bölge seçin.',
            items: [
                {
                    title: 'Girdi ve analiz aralığı',
                    kicker: 'Hangi veriyi tarif ediyorum?',
                    description:
                        'Kanal, örnekleme meta verisi ve zaman gezgini kanıtı tanımlar. Tek çalışma durumunu ayırmak için imleçleri kullanın; farklı hız veya yük durumlarını karıştıran spektrum matematiksel olarak doğru, operasyonel olarak anlamsız olabilir.',
                    check: 'Compute sonrasında salt okunur örnekleme hızını ve kullanılan örnek sayısını kontrol edin.',
                },
                {
                    title: 'Spektrum ayarları',
                    kicker: 'Hangi frekans sorusunu soruyorum?',
                    description:
                        'Mod, pencere ve Block / Lines kestiriciyi ve ödünleşmelerini belirler. Blok boyutu bin aralığını; pencere sızıntıyı ve tepe şeklini yönetir.',
                    check: 'N değerini hem gerekli Δf hem de mevcut durağan süreye göre seçin.',
                },
                {
                    title: 'Spektrum sonucu',
                    kicker: 'Enerji nerede?',
                    description:
                        'Orta grafik DC’den Nyquist’e tek taraflı sonucu gösterir. Tepeler ipucudur: arıza adı vermeden önce mil hızı, kanat geçişi, dişli kavrama, elektrik frekansı veya bilinen uyarımla ilişkilendirin.',
                    check: 'Güçlü bir tepe otomatik olarak rezonans veya arıza değildir.',
                },
                {
                    title: 'Sonuçlar ve tepe kanıtı',
                    kicker: 'Okumayı savunabilir miyim?',
                    description:
                        'Tepe frekansı, genlik, Δf, ortalamalar, THD, SINAD ve SNR güncel hesabı özetler. Bunları izlenebilir kanıt olarak kullanın; grafik ve test bağlamının yerine koymayın.',
                    check: 'Gösterilen çözünürlük ve ortalama sayısının hedeflenen reçeteyle eşleştiğini doğrulayın.',
                },
                {
                    title: 'Compute',
                    kicker: 'Seçilen reçeteyi çalıştırır',
                    description:
                        'Compute, seçili zaman aralığını arka plandaki C++ FFT motorunda çalıştırır. İmleç değişimleri tüm kaydı belleğe almadan sonucu yeniden hesaplayabilir.',
                    check: 'Aralık değiştiyse yeni spektrumu farklı bir gözlem olarak değerlendirin.',
                },
            ],
        },
        lab: {
            title: 'Nyquist, çözünürlük ve sızıntı — tek bağlantılı deney',
            intro:
                'Örnekleme hızını, ton frekansını, blok boyutunu ve pencereyi değiştirin. Kurallar ezberlenmek yerine görünür olsun diye kartlar ve grafikler birlikte güncellenir.',
            sampleRate: 'Örnekleme hızı (fs)',
            tone: 'Fiziksel ton',
            block: 'Blok boyutu (N)',
            window: 'Pencere',
            timePlot: 'Örneklenmiş zaman sinyali',
            spectrumPlot: 'FFT’nin raporladığı',
            apparent: 'Görünen tepe',
            nyquist: 'Nyquist',
            resolution: 'Bin aralığı (Δf)',
            duration: 'Blok süresi',
            safeTitle: 'Bu ton Nyquist’in altında',
            safeBody:
                'Veri toplama anti-alias filtresi ADC’den önce daha yüksek frekanslı içeriği kaldırdıysa, örneklenmiş veri bu frekansı benzersiz biçimde temsil edebilir.',
            aliasTitle: 'Aliasing oluşuyor',
            aliasBody:
                'Fiziksel ton fs / 2 üzerindedir; örnekler daha düşük frekansı taklit eder. FFT kayıt sonrasında aslı geri getiremez; önlem ADC’den önce alınır.',
            sampleDots: 'Noktalar alınan örneklerdir; çizgi yalnızca görsel bağlantıdır.',
            windows: {
                rectangular: {
                    name: 'Rectangular',
                    note: 'Dar ana lob, yüksek sızıntı. Yalnız koherent bloklarda kullanın.',
                },
                hann: {
                    name: 'Hann',
                    note: 'Genel FFT çalışması için dengeli varsayılan.',
                },
                flattop: {
                    name: 'Flat-Top',
                    note: 'Daha düz tepe genliği bölgesi; fakat tepeler daha geniştir.',
                },
            },
            whyNyquistTitle: 'Nyquist neyi korur?',
            whyNyquistBody:
                'Örnekleme sürekli dalgayı ayrık gözlemlere dönüştürür. Örnekleme hızının yarısının üzerinde farklı fiziksel frekanslar aynı örnek dizisini oluşturabilir. Nyquist benzersizlik sınırını tanımlar; gerçek donanımda analog anti-alias filtresi bu sınırı uygular.',
            resolutionTitle: 'Daha fazla satır neden zamana mal olur?',
            resolutionBody:
                'Δf = fs / N ve blok süresi = N / fs. N iki katına çıktığında bin aralığı yarıya iner, fakat temsilî kalması gereken süre iki katına çıkar. Zero-padding eğriyi daha pürüzsüz çizebilir; yeni ölçülmüş bilgi eklemez.',
        },
        modes: {
            title: 'Ayarlara dokunmadan önce kestiriciyi seçin',
            intro:
                'En tanıdık görünen grafikle değil, seçilen zaman aralığının davranışıyla başlayın. Üç mod ilişkili Fourier matematiğini kullanır fakat farklı nicelikleri kestirir; bu yüzden mühendislik sorusu değiştiğinde aynı kanal başka mod isteyebilir.',
            prompt: 'Seçili aralığı en iyi hangi cümle tarif ediyor?',
            items: [
                {
                    id: 'fft',
                    tab: 'Ton ve harmonikler',
                    name: 'Genlik FFT',
                    question: 'Hangi ayrık frekanslar ve harmonikler var?',
                    use:
                        'Periyodik veya yaklaşık kararlı deterministik içerik için kullanın: mil orderları, elektrik tonları, dişli kavrama, kanat geçişi ve bilinen uyarımlar. Genlik tonları bulup kıyaslamayı, faz ise zamanlama veya senkron kanallar söz konusu olduğunda karşılaştırmayı sağlar.',
                    start: 'Hann ile başlayın ve N’yi gereken Δf’den seçin. Tek blok anlaşılana kadar ortalamayı None tutun; Linear, Exponential veya Max Hold’u yalnız açık bir gerekçeyle ekleyin.',
                    trap:
                        'Her tepeye rezonans veya arıza demeyin. Tek-kanal FFT; uyarım, transfer yolu, sensör yönü ve montajın birleşik etkisini görür; ek kanıt olmadan nedenleri ayıramaz.',
                },
                {
                    id: 'welch',
                    tab: 'Rastgele ve geniş bant',
                    name: 'Welch PSD',
                    question: 'Rastgele güç hertz başına nasıl dağılıyor?',
                    use:
                        'Durağan gürültü, geniş bant titreşim ve farklı blok boyutlarıyla alınmış kayıtların karşılaştırılması için kullanın. PSD gücü bant genişliğine göre normalize ettiği için düşey anlamı per-bin genlik sonucuna göre Δf’ye daha az bağımlıdır.',
                    start: 'Hann ve %50 örtüşmeyle başlayın. Çalışma durumunun durağan kaldığını doğrulayarak tekrar kestirimleri karar için yeterince kararlı olana kadar analiz süresini veya segment sayısını artırın.',
                    trap:
                        'PSD birimi U²/Hz’dir, U değildir. Düşey değerlerini doğrusal genlik spektrumuyla doğrudan kıyaslamayın; sinyal ortalama sırasında durum değiştiriyorsa daha fazla ortalamayı geçerli saymayın.',
                },
                {
                    id: 'stft',
                    tab: 'Zamanla değişen',
                    name: 'Spektrogram (STFT)',
                    question: 'Her frekans ne zaman beliriyor veya kayboluyor?',
                    use:
                        'Hızlanma, yavaşlama, chirp, darbe ve seçim içindeki çalışma-durumu geçişleri için kullanın. Her renk sütunu kısa-zaman spektrumudur; bileşenlerin hareketini, ortaya çıkışını, kayboluşunu veya genişlemesini izlersiniz.',
                    start: 'Olayı zamanda yerelleştirecek kadar kısa blok seçin; sonra Δf’nin ilgili frekansları hâlâ ayırdığını kontrol edin. Kareler arasındaki görsel boşluğu azaltmak için örtüşme ekleyin, yeni bağımsız bilgi oluşturmak için değil.',
                    trap:
                        'Uzun blok frekans-bin aralığını iyileştirir fakat değişimin zamanını yayar; kısa blok zamanlamayı keskinleştirir fakat frekans ayrıntısını genişletir. Bu zaman–frekans ödünleşmesi bir görünüm ayarıyla ortadan kaldırılamaz.',
                },
            ],
            labels: {
                question: 'Yanıtladığı',
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
