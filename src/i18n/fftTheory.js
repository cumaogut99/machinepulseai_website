const FFT_THEORY_TRANSLATIONS = {
    en: {
        eyebrow: '02 · Understand the transform',
        title: 'The big idea: a complicated waveform can have a simple recipe',
        intro:
            'Fourier analysis describes a measured signal as a sum of sinusoidal components. Each component has a frequency, amplitude and phase. The time trace shows the components added together, which may look complicated; the spectrum separates the recipe so repeated motions can be investigated one frequency at a time.',
        decomposition: {
            timeTitle: 'Time domain — what the sensor records',
            frequencyTitle: 'Frequency domain — the sinusoidal recipe',
            instruction:
                'Switch components on and off, then change the phase of the blue component. Watch what changes — and what does not.',
            components: 'Components',
            amplitude: 'Amplitude',
            phase: 'Phase',
            componentNames: ['30 Hz fundamental', '75 Hz component', '120 Hz component'],
            phaseInsightTitle: 'Phase changes shape, not magnitude',
            phaseInsight:
                'Moving phase shifts one sinusoid relative to the beginning of the selected block. The summed waveform can change dramatically even though that component keeps the same frequency and magnitude. This is why a complete Fourier result is complex: magnitude answers how much is present, while phase preserves the timing needed to reconstruct the original waveform.',
            preservedTitle: 'Two views, one signal',
            preserved:
                'If the full complex spectrum and the same scaling convention are retained, the inverse transform can reconstruct the original finite time block. A magnitude-only spectrum is easier to read for many diagnostic tasks, but it deliberately discards when each sinusoidal component is positioned in its cycle.',
        },
        terminology: {
            title: 'Four words engineers often mix up',
            items: [
                {
                    term: 'Fourier Transform',
                    body: 'The mathematical change of coordinates from time to frequency. Instead of asking how the signal value changes from moment to moment, it asks which sinusoidal repetition rates are needed to describe the same signal. The complete result contains both magnitude and phase.',
                },
                {
                    term: 'DFT',
                    body: 'The Fourier Transform evaluated on a finite block of uniformly spaced samples. Because both the record and the frequency grid are finite, it produces discrete frequency bins rather than every possible continuous frequency. Block duration and sample rate determine that grid.',
                },
                {
                    term: 'FFT',
                    body: 'An efficient family of algorithms for computing the DFT without repeating unnecessary arithmetic. FFT and DFT do not describe different physical analyses—the FFT is how the same DFT result is calculated faster. MachinePulseAI offers power-of-two block choices for computational efficiency, not because Fourier theory works only at those sizes.',
                },
                {
                    term: 'Spectrum',
                    body: 'A chosen presentation derived from the transform result. A magnitude spectrum emphasizes component amplitude, phase preserves timing angle, PSD describes power per hertz, and ASD is the square root of PSD. Saying only “the spectrum” is incomplete unless the scaling and units are also stated.',
                },
            ],
        },
        complex: {
            title: 'Why the FFT returns complex numbers',
            intro:
                'Every frequency bin is a complex value Z = a + jb. The real and imaginary parts are not two competing amplitudes; together they define one rotating-vector representation of the sinusoidal component at that bin. The vector length is magnitude and its angle is phase relative to the selected block.',
            real: 'Real part',
            imaginary: 'Imaginary part',
            magnitude: 'Magnitude',
            phase: 'Phase',
            formulaMagnitude: '|Z| = √(a² + b²)',
            formulaPhase: 'φ = atan2(b, a)',
            practical:
                'Magnitude answers “how much of this frequency is present?” and phase answers “where is that component in its cycle relative to the time reference?”. For a single unsynchronized channel, phase may be hard to interpret physically. It becomes essential for reconstruction and for synchronized comparisons such as FRF, cross-spectrum, modal and timing work.',
        },
        sided: {
            title: 'Why a real signal has negative frequencies',
            intro:
                'The mathematical transform is double-sided because complex sinusoids can rotate in positive or negative directions. For a real-valued sensor signal, positive and negative components appear as conjugate mirror pairs. They are the mathematical partners needed to represent one real oscillation, not two separate physical tones in the machine.',
            double: 'Double-sided transform',
            one: 'One-sided engineering display',
            dc: 'DC',
            nyquist: 'Nyquist',
            explanation:
                'MachinePulseAI uses the familiar one-sided engineering display from DC through Nyquist. Interior positive-frequency magnitudes are scaled to account for the mirror that is not drawn, so sinusoidal amplitude is not lost. DC has no negative partner and the Nyquist bin is its own edge case, so those bins are not doubled.',
        },
        fingerprints: {
            title: 'Six signal fingerprints worth recognizing',
            intro:
                'Before diagnosing machinery, learn the ideal patterns. Real measurements add leakage, noise, modulation and finite-duration effects, but these signatures remain the starting vocabulary.',
            time: 'Time',
            spectrum: 'Spectrum',
            items: [
                {
                    id: 'sine',
                    name: 'Sine wave',
                    result: 'One dominant spectral line',
                    meaning: 'An ideal infinite sine contains one frequency, amplitude and phase. A finite non-coherent block or a window can spread its displayed energy into neighboring bins, so a measured tone is rarely a perfectly thin line.',
                },
                {
                    id: 'square',
                    name: 'Square wave',
                    result: 'Fundamental + odd harmonics',
                    meaning: 'A square shape is assembled from a fundamental plus 3×, 5×, 7× and higher odd harmonics whose amplitudes decrease. The faster the edge must be represented, the more high-frequency content is required.',
                },
                {
                    id: 'impulse',
                    name: 'Impulse',
                    result: 'Broad, nearly flat content',
                    meaning: 'An ideal instantaneous impulse contains equal content across frequency; a real hammer hit is short but finite, so its usable band depends on contact duration and tip stiffness. This broad excitation is why impacts are useful for structural tests.',
                },
                {
                    id: 'offset',
                    name: 'DC offset',
                    result: 'Energy at 0 Hz',
                    meaning: 'A non-zero mean appears at the 0 Hz bin because it does not oscillate. Removing DC can make small dynamic components easier to inspect, but the offset may also reveal sensor bias, gravity projection or a genuine static load.',
                },
                {
                    id: 'damped',
                    name: 'Damped sinusoid',
                    result: 'A broadened peak',
                    meaning: 'A decaying oscillation exists for limited time, so it cannot produce an infinitely narrow frequency line. Faster decay generally spreads the response more broadly; the peak region contains both natural frequency and damping information.',
                },
                {
                    id: 'random',
                    name: 'Random signal',
                    result: 'Broadband spectrum',
                    meaning: 'Random motion does not repeat with one fixed phase, so energy occupies many bins and an individual amplitude FFT fluctuates between blocks. Welch PSD and sufficient averaging provide a more stable estimate of power distribution.',
                },
            ],
        },
        applications: {
            title: 'From spectral pattern to engineering question',
            items: [
                {
                    title: 'Rotating machinery',
                    body: 'Convert RPM to shaft frequency with RPM/60, then test integer orders, gear mesh, blade pass and electrical frequencies. A match makes a hypothesis plausible; trend, load response, direction and phase evidence make it stronger.',
                },
                {
                    title: 'Bearing diagnostics',
                    body: 'Calculate geometry- and speed-based fault frequencies, then look for harmonics, modulation sidebands and changes from a known-good baseline. Slip and load can shift real bearing features, so use bands and trends rather than demanding an exact single bin.',
                },
                {
                    title: 'Acoustics',
                    body: 'Separate tonal components from broadband noise, then choose amplitude, PSD, dB, acoustic weighting or octave bands according to the reporting question. None of these presentations can compensate for an uncalibrated microphone or poor acoustic setup.',
                },
                {
                    title: 'Impact and transients',
                    body: 'A short event can excite a wide frequency band, but an FFT alone shows only the content present in the measured channel. Use synchronized input and response for FRF, a spectrogram for timing evolution, and SRS when shock severity is the engineering question.',
                },
            ],
        },
    },
    tr: {
        eyebrow: '02 · Dönüşümü gerçekten anlayın',
        title: 'Büyük fikir: karmaşık dalga biçiminin basit bir reçetesi olabilir',
        intro:
            'Fourier analizi ölçülmüş sinyali sinüzoidal bileşenlerin toplamıyla tarif eder. Her bileşenin frekansı, genliği ve fazı vardır. Zaman izi üst üste eklenmiş bileşenleri gösterdiği için karmaşık görünebilir; spektrum reçeteyi ayırır ve tekrarlı hareketlerin frekans frekans incelenmesini sağlar.',
        decomposition: {
            timeTitle: 'Zaman bölgesi — sensörün kaydettiği',
            frequencyTitle: 'Frekans bölgesi — sinüzoidal reçete',
            instruction:
                'Bileşenleri açıp kapatın, ardından mavi bileşenin fazını değiştirin. Neyin değiştiğini ve neyin aynı kaldığını izleyin.',
            components: 'Bileşenler',
            amplitude: 'Genlik',
            phase: 'Faz',
            componentNames: ['30 Hz temel bileşen', '75 Hz bileşeni', '120 Hz bileşeni'],
            phaseInsightTitle: 'Faz şekli değiştirir, genliği değil',
            phaseInsight:
                'Fazı değiştirmek sinüzoidi seçilen bloğun başlangıcına göre kaydırır. Bileşenin frekansı ve genliği aynı kalırken toplam dalga biçimi büyük ölçüde değişebilir. Tam Fourier sonucunun karmaşık olmasının nedeni budur: genlik ne kadar bulunduğunu, faz ise özgün dalga biçimini kurmak için gereken zamanlamayı korur.',
            preservedTitle: 'İki görünüm, tek sinyal',
            preserved:
                'Tam karmaşık spektrum ve aynı ölçekleme kuralı korunursa ters dönüşüm özgün sonlu zaman bloğunu yeniden kurabilir. Yalnız-genlik spektrumu birçok tanı işi için daha kolay okunur; fakat her sinüzoidal bileşenin çevrimdeki konumunu bilinçli olarak atar.',
        },
        terminology: {
            title: 'Mühendislerin sık karıştırdığı dört terim',
            items: [
                {
                    term: 'Fourier Dönüşümü',
                    body: 'Zamandan frekansa yapılan matematiksel koordinat değişimidir. Sinyal değerinin an an nasıl değiştiği yerine, aynı sinyali açıklamak için hangi sinüzoidal tekrar hızlarının gerektiğini sorar. Tam sonuç genlik ve fazın ikisini de içerir.',
                },
                {
                    term: 'DFT',
                    body: 'Eşit aralıklı sonlu örnek bloğuna uygulanan Fourier Dönüşümüdür. Kayıt ve frekans ızgarası sonlu olduğu için her olası sürekli frekans yerine ayrık frekans binleri üretir. Izgarayı blok süresi ve örnekleme hızı belirler.',
                },
                {
                    term: 'FFT',
                    body: 'DFT’yi gereksiz aritmetiği tekrarlamadan hesaplayan verimli algoritma ailesidir. FFT ve DFT farklı fiziksel analizler değildir; FFT aynı DFT sonucunun daha hızlı hesaplanma yöntemidir. MachinePulseAI ikinin kuvveti blokları hesap verimi için sunar, Fourier teorisi yalnız bu boyutlarda çalıştığı için değil.',
                },
                {
                    term: 'Spektrum',
                    body: 'Dönüşüm sonucundan seçilen sunumdur. Genlik spektrumu bileşen büyüklüğünü, faz zamanlama açısını, PSD hertz başına gücü, ASD ise PSD’nin karekökünü anlatır. Ölçek ve birim belirtilmeden yalnız “spektrum” demek eksik kalır.',
                },
            ],
        },
        complex: {
            title: 'FFT neden karmaşık sayılar döndürür?',
            intro:
                'Her frekans bini Z = a + jb karmaşık değeridir. Gerçek ve sanal kısım iki rakip genlik değil, birlikte o bindeki sinüzoidal bileşenin dönen-vektör gösterimini tanımlar. Vektör uzunluğu genlik, açısı seçilen bloğa göre fazdır.',
            real: 'Gerçek kısım',
            imaginary: 'Sanal kısım',
            magnitude: 'Genlik',
            phase: 'Faz',
            formulaMagnitude: '|Z| = √(a² + b²)',
            formulaPhase: 'φ = atan2(b, a)',
            practical:
                'Genlik “bu frekanstan ne kadar var?”, faz ise “zaman referansına göre çevrimin neresinde?” sorusunu yanıtlar. Senkronize edilmemiş tek kanalda fazın fiziksel yorumu sınırlı olabilir. Yeniden kurma ile FRF, çapraz spektrum, modal ve zamanlama karşılaştırmalarında ise kritiktir.',
        },
        sided: {
            title: 'Gerçek bir sinyalde neden negatif frekans vardır?',
            intro:
                'Karmaşık sinüzoidler pozitif veya negatif yönde dönebildiği için matematiksel dönüşüm çift taraflıdır. Gerçek değerli sensör sinyalinde pozitif ve negatif bileşenler karmaşık-eşlenik ayna çiftleri oluşturur. Makinedeki iki ayrı fiziksel ton değil, tek gerçek salınımı temsil etmek için gereken matematiksel ortaklardır.',
            double: 'Çift taraflı dönüşüm',
            one: 'Tek taraflı mühendislik görünümü',
            dc: 'DC',
            nyquist: 'Nyquist',
            explanation:
                'MachinePulseAI, DC’den Nyquist’e bilinen tek taraflı mühendislik görünümünü kullanır. Çizilmeyen aynayı hesaba katmak ve sinüzoid genliğini kaybetmemek için iç pozitif-frekans genlikları ölçeklenir. DC’nin negatif ortağı yoktur; Nyquist de kendi kenar eşidir, bu yüzden bu binler ikiyle çarpılmaz.',
        },
        fingerprints: {
            title: 'Tanımanız gereken altı sinyal parmak izi',
            intro:
                'Makine tanısına geçmeden önce ideal desenleri öğrenin. Gerçek ölçümlerde sızıntı, gürültü, modülasyon ve sonlu süre etkileri eklenir; fakat bu imzalar başlangıç sözlüğüdür.',
            time: 'Zaman',
            spectrum: 'Spektrum',
            items: [
                {
                    id: 'sine',
                    name: 'Sinüs dalgası',
                    result: 'Tek baskın spektral çizgi',
                    meaning: 'İdeal sonsuz sinüs tek frekans, genlik ve faz taşır. Sonlu koherent olmayan blok veya pencere gösterilen enerjiyi komşu binlere yayabilir; bu yüzden ölçülmüş ton nadiren kusursuz ince çizgidir.',
                },
                {
                    id: 'square',
                    name: 'Kare dalga',
                    result: 'Temel + tek sayılı harmonikler',
                    meaning: 'Kare şekil; temel ile genliği azalan 3×, 5×, 7× ve daha yüksek tek-sayılı harmoniklerden kurulur. Kenar ne kadar hızlı temsil edilecekse o kadar yüksek frekans gerekir.',
                },
                {
                    id: 'impulse',
                    name: 'Darbe',
                    result: 'Geniş, yaklaşık düz içerik',
                    meaning: 'İdeal ani darbe bütün frekanslarda eşit içerik taşır; gerçek çekiç darbesi kısa fakat sonludur ve kullanışlı bandı temas süresi ile uç sertliği belirler. Geniş uyarım darbeyi yapısal testte değerli kılar.',
                },
                {
                    id: 'offset',
                    name: 'DC ofset',
                    result: '0 Hz’de enerji',
                    meaning: 'Sıfır olmayan ortalama salınmadığı için 0 Hz binine düşer. DC’yi kaldırmak küçük dinamik bileşenleri görünür yapabilir; fakat ofset sensör bias’ı, yerçekimi izdüşümü veya gerçek statik yükü de gösterebilir.',
                },
                {
                    id: 'damped',
                    name: 'Sönümlü sinüs',
                    result: 'Genişlemiş tepe',
                    meaning: 'Sönen salınım sınırlı süre var olduğu için sonsuz ince frekans çizgisi oluşturamaz. Daha hızlı sönüm genellikle cevabı daha geniş yayar; tepe bölgesi doğal frekans ve sönüm hakkında birlikte bilgi taşır.',
                },
                {
                    id: 'random',
                    name: 'Rastgele sinyal',
                    result: 'Geniş bant spektrum',
                    meaning: 'Rastgele hareket sabit fazla tekrarlanmadığı için enerji çok sayıda bini doldurur ve tek genlik FFT’si bloktan bloğa dalgalanır. Welch PSD ve yeterli ortalama güç dağılımını daha kararlı kestirir.',
                },
            ],
        },
        applications: {
            title: 'Spektral desenden mühendislik sorusuna',
            items: [
                {
                    title: 'Döner makineler',
                    body: 'RPM’i RPM/60 ile mil frekansına çevirin; ardından tam sayı orderları, dişli kavrama, kanat geçişi ve elektrik frekanslarını sınayın. Eşleşme hipotezi mümkün kılar; trend, yük davranışı, yön ve faz kanıtı onu güçlendirir.',
                },
                {
                    title: 'Rulman tanısı',
                    body: 'Geometri ve hıza dayalı arıza frekanslarını hesaplayın; harmonikleri, modülasyon yan bantlarını ve sağlam referansa göre değişimi arayın. Kayma ve yük gerçek rulman özelliklerini kaydırabileceği için tek tam bin yerine bant ve trend kullanın.',
                },
                {
                    title: 'Akustik',
                    body: 'Tonal bileşenleri geniş bant gürültüden ayırın; rapor sorusuna göre genlik, PSD, dB, akustik ağırlık veya oktav bandını seçin. Bu sunumların hiçbiri kalibre edilmemiş mikrofonu veya kötü akustik kurulumu düzeltemez.',
                },
                {
                    title: 'Darbe ve geçici olaylar',
                    body: 'Kısa olay geniş frekans bandını uyarabilir; fakat FFT yalnız ölçülen kanaldaki içeriği gösterir. Transfer davranışı için senkron girdi ve cevapla FRF, zaman gelişimi için spektrogram, mühendislik sorusu şok şiddetiyse SRS kullanın.',
                },
            ],
        },
    },
}

export default FFT_THEORY_TRANSLATIONS
