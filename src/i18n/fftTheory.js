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
        eyebrow: '02 · Temel Teoriyi Anlayın',
        title: 'Temel Mantık: Karmaşık Bir Zaman Sinyalinin Basit Bir Reçetesi Vardır',
        intro:
            'Fourier analizi, ölçülen zaman sinyalini basit sinüs dalgalarının toplamı olarak ifade eder. Her sinüs bileşeninin kendine ait bir frekansı (hızı), genliği (şiddeti) ve fazı (başlangıç açısı) vardır. Sensörün kaydettiği zaman grafiği tüm bu bileşenlerin toplamını gösterdiği için karmaşık görünebilir; FFT ise bu sinyali ayrıştırarak her bir frekansı tek tek incelemenizi sağlar.',
        decomposition: {
            timeTitle: 'Zaman Bölgesi — Sensörün Kaydettiği Karmaşık Sinyal',
            frequencyTitle: 'Frekans Bölgesi — Sinyali Oluşturan Bileşenler (Reçete)',
            instruction:
                'Bileşenleri açıp kapatın, ardından mavi bileşenin fazını değiştirin. Zaman grafiğinin nasıl değiştiğini ancak frekans tepelerinin aynı kaldığını izleyin.',
            components: 'Bileşenler',
            amplitude: 'Genlik',
            phase: 'Faz',
            componentNames: ['30 Hz Temel Bileşen (1×)', '75 Hz Bileşen', '120 Hz Bileşen'],
            phaseInsightTitle: 'Faz Şekli Değiştirir, Genliği Değil',
            phaseInsight:
                'Bir sinüs dalgasının fazını değiştirmek, o dalgayı zaman ekseninde sağa veya sola kaydırır. Bileşenin frekansı ve genliği hiç değişmese bile, zaman grafiğindeki bileşke sinyalin dalga şekli ciddi biçimde değişebilir. FFT\'nin karmaşık sayılarla (Real/Imaginary) çalışmasının nedeni budur: Genlik "Bu frekanstan ne kadar var?" sorusunu yanıtlarken, faz "Bu bileşen zaman ekseninin neresinde başlıyor?" sorusunu yanıtlar.',
            preservedTitle: 'İki Farklı Görünüm, Tek Bir Sinyal',
            preserved:
                'Spektrumdaki genlik ve faz bilgileri korunduğu sürece, Ters FFT (Inverse FFT) ile orijinal zaman sinyali hiçbir kayıp olmadan birebir geri elde edilebilir. Teşhis işlemlerinde genellikle sadece genlik spektrumu kullanılır; ancak zamana bağlı analizlerde (FRF, darbe, senkronizasyon) faz bilgisi şarttır.',
        },
        terminology: {
            title: 'Sıkça Karıştırılan 4 Temel Terim',
            items: [
                {
                    term: 'Fourier Dönüşümü (FT)',
                    body: 'Zamandan frekansa geçişi sağlayan genel matematiksel koordinat dönüşümüdür. Sinyalin anlık değerleri yerine, hangi frekanslardaki sinüs dalgalarının birleşimiyle oluştuğunu hesaplar.',
                },
                {
                    term: 'Ayrık Fourier Dönüşümü (DFT)',
                    body: 'Eşit zaman aralıklarıyla taranmış sonlu sayıdaki örnek bloğuna (örneğin 4096 örneğe) uygulanan Fourier Dönüşümüdür. Sürekli bir çizgi yerine belirli frekans adımları (bin) üretir.',
                },
                {
                    term: 'Hızlı Fourier Dönüşümü (FFT)',
                    body: 'DFT hesabını bilgisayarda binlerce kat daha hızlı yapan verimli bir algoritma ailesidir. FFT ve DFT farklı fiziksel analizler değildir; FFT aynı DFT sonucunun çok daha hızlı hesaplanma yöntemidir.',
                },
                {
                    term: 'Spektrum (Spectrum)',
                    body: 'Dönüşüm sonucunun grafiksel sunumudur. Genlik spektrumu bileşen şiddetini, Faz spektrumu zamanlama açısını, PSD (Güç Spektral Yoğunluğu) ise hertz başına düşen enerjiyi gösterir.',
                },
            ],
        },
        complex: {
            title: 'FFT Neden Karmaşık Sayılar (Complex Numbers) Döndürür?',
            intro:
                'FFT sonucundaki her frekans adımı Z = a + jb şeklinde bir karmaşık sayıdır. Gerçek (Real) ve Sanal (Imaginary) kısımlar iki farklı genlik değildir; ikisi birlikte o frekanstaki sinüs dalgasının büyüklüğünü ve zaman açısını (vektörünü) tanımlar.',
            real: 'Gerçek Kısım (Real - a)',
            imaginary: 'Sanal Kısım (Imaginary - b)',
            magnitude: 'Genlik (Magnitude)',
            phase: 'Faz (Phase)',
            formulaMagnitude: '|Z| = √(a² + b²)',
            formulaPhase: 'φ = atan2(b, a)',
            practical:
                'Genlik (|Z|) "Bu frekansta ne kadar titreşim var?" sorusunu yanıtlar. Faz (φ) ise "Bu titreşim zaman referansına göre çevriminin neresinde?" sorusunu yanıtlar. Tek kanallı analizde genlik yeterlidir; fakat iki kanallı transfer fonksiyonu (FRF) veya modal analizlerde faz bilgisi zorunludur.',
        },
        sided: {
            title: 'Tek Taraflı (One-Sided) Mühendislik Spektrumu Nedir?',
            intro:
                'Matematiksel Fourier dönüşümü hem pozitif hem negatif frekanslar içeren çift taraflı (double-sided) bir sonuç üretir. Fiziksel bir sensörden alınan gerçek sinyallerde negatif frekanslar pozitiflerin birebir ayna simetriğidir.',
            double: 'Çift Taraflı Matematiksel Spektrum (-Nyquist ... +Nyquist)',
            one: 'Tek Taraflı Mühendislik Spektrumu (DC ... Nyquist)',
            dc: '0 Hz (DC)',
            nyquist: 'Nyquist (fs/2)',
            explanation:
                'MachinePulseAI ve mühendislik yazılımları, 0 Hz ile Nyquist (fs/2) arasındaki Tek Taraflı (One-Sided) spektrumu gösterir. Ayna simetriğinde kaybolan enerjiyi telafi etmek için pozitif frekanstaki genlikler 2 ile çarpılır (0 Hz ve Nyquist hariç). Böylece ekranda gördüğünüz genlik, sinyalinizin gerçek fiziksel genliği ile birebir eşleşir.',
        },
        fingerprints: {
            title: 'Saha Analistinin Bilmesi Gereken 6 Sinyal Parmak İzi',
            intro:
                'Makine arıza teşhisine geçmeden önce ideal sinyal tiplerinin spektrumdaki görünümlerini öğrenin:',
            time: 'Zaman Grafiği',
            spectrum: 'Spektrum Görünümü',
            items: [
                {
                    id: 'sine',
                    name: 'Saf Sinüs Dalgası',
                    result: 'Tek bir keskin frekans çizgisi',
                    meaning: 'Tek bir hızda sürekli dönen ideal bir milin ürettiği sinyaldir. Spektrumda sadece o frekansta tek bir dik çizgi görünür.',
                },
                {
                    id: 'square',
                    name: 'Kare Dalga',
                    result: 'Temel frekans + Tek sayılı harmonikler (3×, 5×, 7×...)',
                    meaning: 'Keskin açılıp kapanan sinyallerdir. Ana frekansın yanı sıra genliği giderek azalan tek sayılı harmonikler içerir.',
                },
                {
                    id: 'impulse',
                    name: 'Darbe (Impulse)',
                    result: 'Tüm frekanslara yayılmış düz geniş bant',
                    meaning: 'Çekiç vurması gibi anlık şiddetli darbelerdir. Tüm frekans aralığını aynı anda uyardığı için yapısal rezonans testlerinde (çekiç testi) kullanılır.',
                },
                {
                    id: 'offset',
                    name: 'DC Ofset (Statik Kayma)',
                    result: '0 Hz (DC) noktasında yüksek genlik',
                    meaning: 'Sinyalin ortalama değerinin sıfır olmaması durumudur. Sensör oryantasyonu, yerçekimi bileşeni veya DC bias geriliminden kaynaklanır.',
                },
                {
                    id: 'damped',
                    name: 'Sönümlü Sinüs Dalgası',
                    result: 'Genişlemiş ve yayvanlaşmış tepe',
                    meaning: 'Bir darbe sonrası sönümlenerek yok olan salınımdır. Tepenin genişliği yapının sönüm oranı hakkında bilgi verir.',
                },
                {
                    id: 'random',
                    name: 'Rastgele Gürültü (Random Noise)',
                    result: 'Düzensiz geniş bant gürültü tabanı',
                    meaning: 'Belirli bir periyodu olmayan rastgele hareketlerdir. Türbülans, akış gürültüsü veya genel zemin gürültüsünde görülür.',
                },
            ],
        },
        applications: {
            title: 'Spektrum Deseninden Mühendislik Teşhisine',
            items: [
                {
                    title: 'Dönel Makine Teşhisi',
                    body: 'Mil devrini Hz\'e çevirin (RPM / 60 = 1×). Spektrumdaki 1× (balanssızlık), 2× (hizasızlık) ve dişli geçiş frekanslarını ($1\times \times \text{Diş Sayısı}$) kontrol edin.',
                },
                {
                    title: 'Rulman Arıza Analizi',
                    body: 'Rulman geometrisine göre hesaplanan arıza frekanslarını (BPFO, BPFI, BSF, FTF) spektrumda arayın. Yan bantlar (sidebands) ve harmonikler rulman hasarının ilerlediğini gösterir.',
                },
                {
                    title: 'Akustik ve Ses Ölçümü',
                    body: 'Tonal sesleri ortam gürültüsünden ayırmak için dB veya dBA akustik ağırlıklandırma kullanarak gürültü kaynaklarını tespit edin.',
                },
                {
                    title: 'Darbe ve Geçici Rejim Analizi',
                    body: 'Kısa süreli darbeli olaylarda zamana bağlı frekans değişimini görmek için STFT Spektrogram kullanın.',
                },
            ],
        },
    },
}

export default FFT_THEORY_TRANSLATIONS
