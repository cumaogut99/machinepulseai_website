const FFT_INTERFACE_GUIDE = {
    en: {
        title: 'Tour the current interface, one real state at a time',
        intro:
            'The FFT window cannot show every panel at once. Use the three views below exactly as you would use the application: configure the calculation and channels, inspect markers and detected peaks, then compare channels or operating states.',
        imageCaption:
            'Captured from the current MachinePulseAI FFT / Spectrum panel in Space theme. The curves use a deterministic training result so every control remains readable.',
        viewHint: 'Choose an application state',
        selectHint:
            'Select a numbered region on the screenshot. The explanation tells you what the control changes, what it does not change, and what a new engineer should verify.',
        referenceEyebrow: 'Go deeper without leaving this application state',
        views: [
            {
                id: 'settings',
                tab: 'FFT Settings + Channels',
                title: 'Build the analysis recipe and choose its evidence',
                imageAlt:
                    'MachinePulseAI FFT Settings page with Space theme, two-channel spectrum and Channels panel',
                points: [
                    {
                        title: 'FFT Settings is the complete calculation page',
                        kicker: 'Left panel',
                        description:
                            'Input shows the read-only sample rate, navigator mode and overview channel. Spectrum chooses FFT, Welch PSD or STFT together with the window and block size. Frequency Band changes the visible range; Block Processing controls repeated blocks; Post-processing changes presentation, weighting, integration and octave overlays.',
                        check:
                            'Start by confirming sample rate and Mode. Then choose Block / Lines from the resolution you need and the stationary time you actually have.',
                    },
                    {
                        title: 'Spectrum, PSD, Phase and STFT are result views',
                        kicker: 'Top center',
                        description:
                            'These buttons switch the center display and do not start a calculation. Spectrum shows magnitude, PSD shows power per hertz and Phase shows angular timing. If no STFT result exists, STFT prepares Spectrogram mode and opens its setup; choose one channel and press Compute to produce the time–frequency map.',
                        check:
                            'Do not compare a PSD value directly with amplitude magnitude: their physical meaning and units are different.',
                    },
                    {
                        title: 'Channels decides which signals are transformed',
                        kicker: 'Right panel',
                        description:
                            'Every checked signal is analysed with the same recipe and overlaid using a separate color. This makes two sensor locations or directions easy to compare without changing settings between runs. Spectrogram is intentionally restricted to one channel because a time–frequency matrix is much larger than a line spectrum.',
                        check:
                            'The Channel field on the left selects the navigator trace; the checked items here select the channels sent to the FFT calculation.',
                    },
                    {
                        title: 'Compute runs the recipe; the status proves its scope',
                        kicker: 'Bottom left',
                        description:
                            'Compute sends the selected channel set, cursor range and settings to the background C++ engine. The status line reports completion, channel count, dominant peak, resolution and averages. With a fixed block, the analysed span can be shorter than a wider cursor selection, so the samples-used message is part of the result.',
                        check:
                            'Never assume the entire highlighted range was transformed; verify the analysed sample count and Δf after Compute.',
                    },
                ],
            },
            {
                id: 'markers',
                tab: 'Markers + Peaks',
                title: 'Turn spectral lines into testable mechanical hypotheses',
                imageAlt:
                    'MachinePulseAI Markers page with harmonic and sideband cursors and the Peaks result table',
                points: [
                    {
                        title: 'Peak Detection decides which local maxima are reported',
                        kicker: 'Left · upper group',
                        description:
                            'Max Peaks limits the length of the report, while Min Magnitude rejects candidates below the chosen dB threshold. Changing either detection setting requires a new Compute because the peak list is recalculated. “Show detected peaks” only controls the vertical labels drawn from the current list.',
                        check:
                            'A detected peak is a mathematical local maximum, not an automatic fault diagnosis. Relate it to speed, geometry, electrical frequency or forcing.',
                    },
                    {
                        title: 'Harmonic markers test integer-multiple structure',
                        kicker: 'Left · middle group',
                        description:
                            'A harmonic family marks f₀, 2f₀, 3f₀ and higher multiples. The fundamental can follow the dominant detected peak or be entered manually—for example shaft frequency equals RPM / 60. The Harmonics value limits how many members of the family are drawn.',
                        check:
                            'Automatic f₀ is convenient but can choose the wrong physical source when the strongest peak is not 1× shaft speed.',
                    },
                    {
                        title: 'Sideband markers expose modulation spacing',
                        kicker: 'Left · lower group',
                        description:
                            'Sidebands are placed symmetrically around the dominant carrier at carrier ± n·Δf. Regular spacing can indicate amplitude or frequency modulation, such as gear mesh modulated by shaft rotation. The controls draw guides only; they do not calculate sideband energy or confirm the cause.',
                        check:
                            'Measure the spacing and ask which known speed or repetition rate matches it before assigning a fault mechanism.',
                    },
                    {
                        title: 'Peaks is the numerical evidence behind the labels',
                        kicker: 'Results · Peaks',
                        description:
                            'The table lists refined frequency, magnitude and phase for every accepted peak. Magnitude follows the active Y-axis representation, so it may be linear or dB. Phase is useful when comparing synchronized channels, but a single-channel phase value needs a defined timing reference before it has physical meaning.',
                        check:
                            'Read the table together with Δf and window choice; displayed decimal places do not guarantee equivalent physical resolution.',
                    },
                ],
            },
            {
                id: 'compare',
                tab: 'Compare + Comparison',
                title: 'Compare like with like—without losing the analysis recipe',
                imageAlt:
                    'MachinePulseAI Compare page with two overlaid channels and the numerical comparison table',
                points: [
                    {
                        title: 'Compare Channels runs A and B with one recipe',
                        kicker: 'Left · upper group',
                        description:
                            'Reference A and Compare B must be two different channels. Compute and Compare selects both, computes them using identical FFT settings and overlays the spectra. This is the safest quick comparison because window, block, band and averaging cannot drift between separate runs.',
                        check:
                            'Use channels with compatible units and sample-rate metadata; otherwise a visual amplitude comparison is not meaningful.',
                    },
                    {
                        title: 'Compare Time Ranges captures two operating states',
                        kicker: 'Left · advanced group',
                        description:
                            'First compute one range and capture it as Reference A. Then move the navigator to another load, speed or time interval and compute Current B. This workflow compares two states of the same channel while preserving the frozen A trace until you explicitly clear it.',
                        check:
                            'Keep the FFT recipe unchanged and record what changed physically—speed, load, temperature, mounting or test step.',
                    },
                    {
                        title: 'The center overlay shows shape and location changes',
                        kicker: 'Center spectrum',
                        description:
                            'Each channel receives its own color and the A/B dominant frequencies are marked. Look for frequency shifts, amplitude changes, new harmonics, disappearing components and noise-floor changes. A larger line can result from a stronger source, a different transfer path or sensor mounting—not only degradation.',
                        check:
                            'Compare the complete pattern and test conditions, not just the tallest peak.',
                    },
                    {
                        title: 'Results → Compare is the numerical comparison table',
                        kicker: 'Right · Compare',
                        description:
                            'The table reports Reference, Compare and Δ(B−A) for dominant frequency, peak magnitude, THD, SINAD and SNR. A positive delta means B is numerically larger; whether that is better or worse depends on the metric and engineering objective. Missing values remain unavailable instead of being displayed as false zeroes.',
                        check:
                            'A delta is only defensible when both sides use the same units, recipe, calibration and representative operating state.',
                    },
                ],
            },
        ],
    },
    tr: {
        title: 'Güncel arayüzü gerçek çalışma durumlarıyla adım adım tanıyın',
        intro:
            'FFT penceresi bütün panelleri aynı anda gösteremez. Aşağıdaki üç görünümü uygulamadaki sırayla kullanın: hesabı ve kanalları yapılandırın, işaretçileri ve bulunan tepeleri inceleyin, ardından kanalları veya çalışma durumlarını karşılaştırın.',
        imageCaption:
            'Güncel MachinePulseAI FFT / Spectrum panelinden Space temasında alınmıştır. Bütün kontroller okunabilsin diye eğriler deterministik bir eğitim sonucu kullanır.',
        viewHint: 'Uygulama durumunu seçin',
        selectHint:
            'Ekran görüntüsündeki numaralı bölgeyi seçin. Açıklama; kontrolün neyi değiştirdiğini, neyi değiştirmediğini ve yeni bir mühendisin neyi doğrulaması gerektiğini anlatır.',
        referenceEyebrow: 'Bu çalışma durumundan ayrılmadan ayrıntıya inin',
        views: [
            {
                id: 'settings',
                tab: 'FFT Settings + Channels',
                title: 'Analiz reçetesini kurun ve kanıtı oluşturacak sinyalleri seçin',
                imageAlt:
                    'Space temasında FFT Settings sayfası, iki kanallı spektrum ve Channels paneli',
                points: [
                    {
                        title: 'FFT Settings hesabın bütün ayarlarını tek sayfada toplar',
                        kicker: 'Sol panel',
                        description:
                            'Input; salt okunur örnekleme hızını, gezgin modunu ve genel bakış kanalını gösterir. Spectrum; FFT, Welch PSD veya STFT ile birlikte pencereyi ve blok boyutunu seçer. Frequency Band görünür aralığı, Block Processing tekrarlı blokları, Post-processing ise sunum, ağırlıklandırma, entegrasyon ve oktav bindirmesini yönetir.',
                        check:
                            'Önce örnekleme hızını ve Mode değerini doğrulayın. Ardından Block / Lines değerini hem gereken çözünürlüğe hem de gerçekten durağan kalan süreye göre seçin.',
                    },
                    {
                        title: 'Spectrum, PSD, Phase ve STFT sonuç görünümleridir',
                        kicker: 'Üst orta',
                        description:
                            'Bu düğmeler orta görünümü değiştirir ve hesap başlatmaz. Spectrum genliği, PSD hertz başına gücü, Phase açısal zamanlamayı gösterir. Henüz STFT sonucu yoksa STFT düğmesi Spectrogram modunu hazırlar ve ayarlarını açar; zaman–frekans haritası için tek kanal seçip Compute’a basın.',
                        check:
                            'PSD değerini genlik spektrumuyla doğrudan karşılaştırmayın; fiziksel anlamları ve birimleri farklıdır.',
                    },
                    {
                        title: 'Channels hangi sinyallerin dönüştürüleceğini belirler',
                        kicker: 'Sağ panel',
                        description:
                            'İşaretlenen her sinyal aynı reçeteyle analiz edilir ve ayrı renkle üst üste çizilir. Böylece ayarları değiştirmeden iki sensör konumu veya yönü karşılaştırılabilir. Zaman–frekans matrisi çizgi spektrumundan çok daha büyük olduğu için Spectrogram bilinçli olarak tek kanalla sınırlıdır.',
                        check:
                            'Soldaki Channel alanı gezginde gösterilecek izi; buradaki işaretler ise FFT hesabına gönderilecek kanalları seçer.',
                    },
                    {
                        title: 'Compute reçeteyi çalıştırır; durum satırı kapsamı kanıtlar',
                        kicker: 'Sol alt',
                        description:
                            'Compute; seçilen kanal kümesini, imleç aralığını ve ayarları arka plandaki C++ motora gönderir. Durum satırı tamamlanmayı, kanal sayısını, baskın tepeyi, çözünürlüğü ve ortalamayı raporlar. Sabit blokta analiz edilen bölüm geniş imleç seçiminden kısa olabilir; bu nedenle kullanılan örnek mesajı sonucun bir parçasıdır.',
                        check:
                            'Vurgulanan aralığın tamamının dönüştürüldüğünü varsaymayın; Compute sonrasında analiz edilen örnek sayısını ve Δf’yi doğrulayın.',
                    },
                ],
            },
            {
                id: 'markers',
                tab: 'Markers + Peaks',
                title: 'Spektral çizgileri sınanabilir mekanik hipotezlere dönüştürün',
                imageAlt:
                    'Harmonik ve yan bant işaretçileri ile Peaks sonuç tablosunu gösteren MachinePulseAI Markers sayfası',
                points: [
                    {
                        title: 'Peak Detection hangi yerel maksimumların raporlanacağını seçer',
                        kicker: 'Sol · üst grup',
                        description:
                            'Max Peaks rapor uzunluğunu sınırlar; Min Magnitude seçilen dB eşiğinin altındaki adayları reddeder. İki algılama ayarı da tepe listesini yeniden hesapladığı için yeni Compute ister. “Show detected peaks” yalnızca mevcut listeden çizilen düşey etiketleri açıp kapatır.',
                        check:
                            'Bulunan tepe matematiksel bir yerel maksimumdur, otomatik arıza tanısı değildir. Hız, geometri, elektrik frekansı veya uyarımla ilişkilendirin.',
                    },
                    {
                        title: 'Harmonik işaretçiler tam sayı katlarını sınar',
                        kicker: 'Sol · orta grup',
                        description:
                            'Harmonik ailesi f₀, 2f₀, 3f₀ ve daha yüksek katları işaretler. Temel frekans baskın tepeyi otomatik izleyebilir veya elle girilebilir; örneğin mil frekansı RPM / 60’tır. Harmonics değeri çizilecek aile üyesi sayısını sınırlar.',
                        check:
                            'En güçlü tepe 1× mil hızı değilse otomatik f₀ yanlış fiziksel kaynağı seçebilir.',
                    },
                    {
                        title: 'Sideband işaretçileri modülasyon aralığını görünür yapar',
                        kicker: 'Sol · alt grup',
                        description:
                            'Yan bantlar baskın taşıyıcının çevresine taşıyıcı ± n·Δf biçiminde simetrik yerleştirilir. Düzenli aralık; örneğin mil dönüşüyle modüle edilen dişli kavrama gibi genlik veya frekans modülasyonuna işaret edebilir. Kontroller yalnız kılavuz çizer; yan bant enerjisi hesaplamaz veya nedeni doğrulamaz.',
                        check:
                            'Aralığı ölçün ve arıza mekanizması atamadan önce hangi bilinen hız veya tekrar oranıyla eşleştiğini sorun.',
                    },
                    {
                        title: 'Peaks tablosu etiketlerin arkasındaki sayısal kanıttır',
                        kicker: 'Results · Peaks',
                        description:
                            'Tablo kabul edilen her tepe için iyileştirilmiş frekans, genlik ve fazı listeler. Genlik etkin Y ekseni sunumunu izler; doğrusal veya dB olabilir. Faz senkron kanalları karşılaştırırken değerlidir; tek kanal fazı ise tanımlı zaman referansı olmadan fiziksel anlam taşımaz.',
                        check:
                            'Tabloyu Δf ve pencere seçimiyle birlikte okuyun; çok sayıda ondalık basamak aynı fiziksel çözünürlüğü garanti etmez.',
                    },
                ],
            },
            {
                id: 'compare',
                tab: 'Compare + Comparison',
                title: 'Analiz reçetesini kaybetmeden benzeri benzeriyle karşılaştırın',
                imageAlt:
                    'İki bindirilmiş kanal ve sayısal karşılaştırma tablosu bulunan MachinePulseAI Compare sayfası',
                points: [
                    {
                        title: 'Compare Channels, A ve B’yi tek reçeteyle çalıştırır',
                        kicker: 'Sol · üst grup',
                        description:
                            'Reference A ve Compare B iki farklı kanal olmalıdır. Compute and Compare ikisini de seçer, aynı FFT ayarlarıyla hesaplar ve spektrumları bindirir. Pencere, blok, bant ve ortalama ayrı çalışmalar arasında kayamadığı için bu en güvenli hızlı karşılaştırmadır.',
                        check:
                            'Uyumlu birim ve örnekleme meta verisine sahip kanalları kullanın; aksi halde görsel genlik karşılaştırması anlamlı değildir.',
                    },
                    {
                        title: 'Compare Time Ranges iki çalışma durumunu yakalar',
                        kicker: 'Sol · gelişmiş grup',
                        description:
                            'Önce bir aralığı hesaplayıp Reference A olarak yakalayın. Sonra gezgini başka bir yük, hız veya zaman aralığına taşıyıp Current B’yi hesaplayın. Bu akış aynı kanalın iki durumunu karşılaştırır ve siz temizleyene kadar A eğrisini dondurulmuş tutar.',
                        check:
                            'FFT reçetesini değiştirmeyin; fiziksel olarak neyin değiştiğini kaydedin: hız, yük, sıcaklık, montaj veya test adımı.',
                    },
                    {
                        title: 'Orta bindirme şekil ve konum değişimini gösterir',
                        kicker: 'Orta spektrum',
                        description:
                            'Her kanal ayrı renk alır ve A/B baskın frekansları işaretlenir. Frekans kayması, genlik değişimi, yeni harmonikler, kaybolan bileşenler ve gürültü tabanındaki değişimi arayın. Daha büyük çizgi yalnız bozulma değil; daha güçlü kaynak, farklı transfer yolu veya sensör montajından da gelebilir.',
                        check:
                            'Yalnız en yüksek tepeyi değil, bütün deseni ve test koşullarını karşılaştırın.',
                    },
                    {
                        title: 'Results → Compare sayısal karşılaştırma tablosudur',
                        kicker: 'Sağ · Compare',
                        description:
                            'Tablo; baskın frekans, tepe genliği, THD, SINAD ve SNR için Reference, Compare ve Δ(B−A) değerlerini gösterir. Pozitif fark B’nin sayısal olarak büyük olduğunu söyler; bunun iyi veya kötü olması metriğe ve mühendislik amacına bağlıdır. Eksik değerler sahte sıfır yerine kullanılamaz olarak bırakılır.',
                        check:
                            'Fark ancak iki taraf aynı birim, reçete, kalibrasyon ve temsilî çalışma durumunu kullanıyorsa savunulabilir.',
                    },
                ],
            },
        ],
    },
}

export default FFT_INTERFACE_GUIDE
