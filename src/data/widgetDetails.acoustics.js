const ACOUSTICS_WIDGET_DETAILS = {
    sound_level: {
        slug: 'sound-level-meter',
        en: {
            tagline: 'Converts microphone pressure into actionable sound-level metrics: SPL, dBA/dBC/dBZ, Leq, peak and percentile levels.',
            intro: 'A noise measurement is useful only when it says more than “loud” or “quiet.” This module turns microphone signals into the same metrics used in environmental noise, workplace exposure and product validation. It handles frequency weighting, time weighting and energy averaging, so fluctuating sounds can be compared fairly across runs, products and limit requirements.',
            inputs: [
                { name: 'Microphone pressure channel', desc: 'A calibrated acoustic pressure signal, preferably in pascals.' },
                { name: 'Calibration value', desc: 'Sensitivity or calibrator reference level used to convert volts into pressure.' },
                { name: 'Measurement settings', desc: 'Frequency weighting, time weighting and reporting interval.' },
            ],
            formulas: [
                { title: 'Sound pressure level', latex: 'L_p = 20\\log_{10}\\left(\\dfrac{p_{rms}}{p_0}\\right),\\quad p_0=20\\,\\mu Pa', expr: 'Lp = 20 log10(prms / 20 µPa)', where: 'Converts RMS acoustic pressure into decibels relative to the nominal threshold of hearing.' },
                { title: 'Equivalent continuous level', latex: 'L_{eq}=10\\log_{10}\\left(\\dfrac{1}{T}\\int_0^T \\dfrac{p^2(t)}{p_0^2}\\,dt\\right)', expr: 'Leq = 10 log10(mean(p²/p0²))', where: 'Represents a changing sound as one energy-equivalent steady level over the measurement window.' },
                { title: 'Percentile level', latex: 'L_N = \\mathrm{level\\ exceeded\\ for}\\ N\\%\\ \\mathrm{of\\ time}', expr: 'LN = level exceeded for N% of time', where: 'L10 captures common high events; L90 is often used as a background-noise indicator.' },
            ],
            assumptions: [
                { name: 'Calibration is not optional', desc: 'Without microphone sensitivity or a calibrator reference, the level may look precise but not be traceable.' },
                { name: 'Weighting changes the answer', desc: 'dBA, dBC and dBZ serve different purposes. Comparing them as if they were the same can mislead decisions.' },
                { name: 'Measurement duration matters', desc: 'Short windows can exaggerate intermittent events; long windows can hide short but important peaks.' },
            ],
            steps: [
                { step: 'Apply calibration', detail: 'Convert the microphone signal from volts to pascals.' },
                { step: 'Choose weighting', detail: 'Apply A, C or Z weighting and the requested time response.' },
                { step: 'Calculate level history', detail: 'Track SPL, fast/slow response and peak levels over time.' },
                { step: 'Summarize exposure', detail: 'Compute Leq and percentile levels for the selected interval.' },
                { step: 'Compare runs or limits', detail: 'Use the same settings across tests so results are comparable.' },
            ],
            exampleMetrics: [
                { value: 'LAeq = 68.4 dBA', label: 'Average exposure', desc: 'The time-varying sound has the same A-weighted energy as a steady 68.4 dBA source.' },
                { value: 'LCpeak = 112.1 dBC', label: 'Peak level', desc: 'Short high-level events are captured with C-weighting, useful for impulsive noise checks.' },
                { value: 'L90 = 43.7 dBA', label: 'Background noise', desc: 'For 90% of the measurement time, the A-weighted level stayed above 43.7 dBA.' },
            ],
            outputs: [
                { name: 'Sound-level timeline', desc: 'Weighted SPL, peak and time-weighted response across the measurement.' },
                { name: 'Exposure summary', desc: 'Leq, max, min and percentile levels for reporting.' },
                { name: 'Compliance-ready values', desc: 'Metrics formatted consistently for environmental, occupational or product noise limits.' },
            ],
        },
        tr: {
            tagline: 'Mikrofon basıncını kullanılabilir ses seviyesi metriklerine dönüştürür: SPL, dBA/dBC/dBZ, Leq, tepe ve yüzdelik seviyeler.',
            intro: 'Bir gürültü ölçümü yalnızca “yüksek” veya “düşük” demekle değerli olmaz. Bu modül mikrofon sinyalini çevresel gürültü, işyeri maruziyeti ve ürün doğrulamada kullanılan metriklere dönüştürür. Frekans ağırlıklandırması, zaman ağırlıklandırması ve enerji ortalamasını birlikte ele alır; böylece değişken sesler koşular, ürünler ve limitler arasında tutarlı biçimde karşılaştırılabilir.',
            inputs: [
                { name: 'Mikrofon basınç kanalı', desc: 'Tercihen paskal cinsine kalibre edilmiş akustik basınç sinyali.' },
                { name: 'Kalibrasyon değeri', desc: 'Volt sinyalini basınca çevirmek için mikrofon hassasiyeti veya kalibratör referans seviyesi.' },
                { name: 'Ölçüm ayarları', desc: 'Frekans ağırlıklandırması, zaman ağırlıklandırması ve raporlama aralığı.' },
            ],
            formulas: [
                { title: 'Ses basınç seviyesi', latex: 'L_p = 20\\log_{10}\\left(\\dfrac{p_{rms}}{p_0}\\right),\\quad p_0=20\\,\\mu Pa', expr: 'Lp = 20 log10(prms / 20 µPa)', where: 'RMS akustik basıncı nominal işitme eşiğine göre desibele çevirir.' },
                { title: 'Eşdeğer sürekli seviye', latex: 'L_{eq}=10\\log_{10}\\left(\\dfrac{1}{T}\\int_0^T \\dfrac{p^2(t)}{p_0^2}\\,dt\\right)', expr: 'Leq = 10 log10(mean(p²/p0²))', where: 'Değişken bir sesi ölçüm penceresi boyunca aynı enerjiye sahip tek bir sabit seviye olarak temsil eder.' },
                { title: 'Yüzdelik seviye', latex: 'L_N = \\mathrm{zamanin}\\ N\\%\\ \\mathrm{kisminda\\ asilan\\ seviye}', expr: 'LN = zamanın N% kısmında aşılan seviye', where: 'L10 sık görülen yüksek olayları, L90 ise çoğu zaman arka plan gürültüsünü gösterir.' },
            ],
            assumptions: [
                { name: 'Kalibrasyon zorunludur', desc: 'Mikrofon hassasiyeti veya kalibratör referansı yoksa seviye hassas görünür ama izlenebilir değildir.' },
                { name: 'Ağırlıklandırma sonucu değiştirir', desc: 'dBA, dBC ve dBZ farklı amaçlara hizmet eder. Bunları aynı metrik gibi karşılaştırmak yanıltıcı olabilir.' },
                { name: 'Ölçüm süresi önemlidir', desc: 'Kısa pencereler aralıklı olayları abartabilir; uzun pencereler kısa ama önemli tepeleri gizleyebilir.' },
            ],
            steps: [
                { step: 'Kalibrasyonu uygula', detail: 'Mikrofon sinyalini volttan paskala dönüştürün.' },
                { step: 'Ağırlıklandırmayı seç', detail: 'A, C veya Z ağırlıklandırmasını ve istenen zaman tepkisini uygulayın.' },
                { step: 'Seviye geçmişini hesapla', detail: 'SPL, fast/slow tepki ve tepe seviyeleri zaman boyunca izleyin.' },
                { step: 'Maruziyeti özetle', detail: 'Seçilen aralık için Leq ve yüzdelik seviyeleri hesaplayın.' },
                { step: 'Koşu veya limitlerle karşılaştır', detail: 'Sonuçların karşılaştırılabilir olması için testlerde aynı ayarları kullanın.' },
            ],
            exampleMetrics: [
                { value: 'LAeq = 68,4 dBA', label: 'Ortalama maruziyet', desc: 'Değişken ses, kararlı 68,4 dBA kaynakla aynı A-ağırlıklı enerjiye sahiptir.' },
                { value: 'LCpeak = 112,1 dBC', label: 'Tepe seviye', desc: 'Kısa yüksek seviye olayları C-ağırlıklandırma ile yakalanır; darbeli gürültü kontrollerinde kullanışlıdır.' },
                { value: 'L90 = 43,7 dBA', label: 'Arka plan gürültüsü', desc: 'Ölçüm süresinin %90’ında A-ağırlıklı seviye 43,7 dBA üzerinde kalmıştır.' },
            ],
            outputs: [
                { name: 'Ses seviyesi zaman geçmişi', desc: 'Ölçüm boyunca ağırlıklı SPL, tepe ve zaman ağırlıklı tepki.' },
                { name: 'Maruziyet özeti', desc: 'Raporlama için Leq, maksimum, minimum ve yüzdelik seviyeler.' },
                { name: 'Limit karşılaştırmasına hazır değerler', desc: 'Çevresel, işyeri veya ürün gürültü limitleri için tutarlı formatta metrikler.' },
            ],
        },
    },

    sound_power: {
        slug: 'sound-intensity-power',
        en: {
            tagline: 'Estimates acoustic energy flow and radiated sound power, helping teams compare sources without the room dominating the result.',
            intro: 'Sound pressure changes with distance and room reflections. Sound power is different: it describes how much acoustic energy a source emits. This module uses intensity or surface-based measurements to estimate that source strength, making it useful for machinery labeling, supplier comparison and engineering changes where the source, not the room, must be judged.',
            inputs: [
                { name: 'Intensity probe or microphone array', desc: 'Two-microphone p-p probe data or mapped pressure/intensity measurements over a surface.' },
                { name: 'Measurement surface', desc: 'Area, segment layout and normal direction around the source.' },
                { name: 'Calibration and environmental data', desc: 'Microphone calibration, air density and temperature when needed.' },
            ],
            formulas: [
                { title: 'Sound intensity', latex: 'I = \\overline{p(t)u(t)}', expr: 'I = mean(p·u)', where: 'Intensity is the net acoustic energy flow per unit area in a given direction.' },
                { title: 'Two-microphone velocity estimate', latex: 'u \\approx -\\dfrac{1}{\\rho}\\int \\dfrac{p_2-p_1}{\\Delta r}\\,dt', expr: 'u ≈ -(1/ρ)∫(p2-p1)/Δr dt', where: 'A p-p probe estimates particle velocity from the pressure gradient between two microphones.' },
                { title: 'Sound power', latex: 'W = \\int_S I_n\\,dS \\qquad L_W = 10\\log_{10}\\left(\\dfrac{W}{W_0}\\right)', expr: 'W = ∫ In dS ; LW = 10 log10(W/W0)', where: 'Normal intensity integrated over a surface gives the radiated sound power.' },
            ],
            assumptions: [
                { name: 'Surface coverage must enclose the source', desc: 'Missing radiating faces or poor normal direction can under-report total sound power.' },
                { name: 'Probe spacing limits frequency range', desc: 'Two-microphone intensity probes have valid low and high frequency limits tied to spacing and phase accuracy.' },
                { name: 'Background noise needs direction context', desc: 'Intensity can reject some steady background noise, but strong directional interference still needs care.' },
            ],
            steps: [
                { step: 'Define the measurement surface', detail: 'Set the segments or scan path around the source.' },
                { step: 'Calculate normal intensity', detail: 'Estimate acoustic energy flow through each surface segment.' },
                { step: 'Integrate sound power', detail: 'Sum segment contributions to get source power and sound power level.' },
                { step: 'Map dominant areas', detail: 'Highlight panels or directions contributing most to total radiation.' },
                { step: 'Compare configurations', detail: 'Evaluate design changes using source power rather than only local SPL.' },
            ],
            exampleMetrics: [
                { value: 'LW = 87.6 dB re 1 pW', label: 'Sound power level', desc: 'The source emits acoustic power equivalent to 87.6 dB sound power level.' },
                { value: 'Panel B = 42%', label: 'Dominant radiating area', desc: 'One surface segment contributes 42% of the measured acoustic power.' },
                { value: 'I = 0.018 W/m²', label: 'Normal intensity', desc: 'The selected patch radiates net acoustic energy outward at 0.018 W/m².' },
            ],
            outputs: [
                { name: 'Sound power report', desc: 'Total sound power and sound power level for the selected source.' },
                { name: 'Intensity map', desc: 'Segment-by-segment acoustic energy flow and dominant radiation areas.' },
                { name: 'Configuration comparison', desc: 'Before/after changes ranked by radiated power, not only local pressure.' },
            ],
        },
        tr: {
            tagline: 'Akustik enerji akışını ve yayılan ses gücünü tahmin eder; ekiplerin oda etkisine takılmadan kaynakları karşılaştırmasını sağlar.',
            intro: 'Ses basıncı mesafeye ve oda yansımalarına bağlı olarak değişir. Ses gücü farklıdır: kaynağın ne kadar akustik enerji yaydığını tarif eder. Bu modül şiddet veya yüzey tabanlı ölçümlerle kaynak gücünü tahmin eder; makine etiketleme, tedarikçi karşılaştırması ve kaynağın kendisinin değerlendirilmesi gereken tasarım değişikliklerinde kullanışlıdır.',
            inputs: [
                { name: 'Şiddet probu veya mikrofon dizisi', desc: 'İki mikrofonlu p-p prob verisi veya bir yüzey üzerinde haritalanmış basınç/şiddet ölçümleri.' },
                { name: 'Ölçüm yüzeyi', desc: 'Kaynağı çevreleyen alan, segment düzeni ve normal yön bilgisi.' },
                { name: 'Kalibrasyon ve ortam verisi', desc: 'Gerektiğinde mikrofon kalibrasyonu, hava yoğunluğu ve sıcaklık.' },
            ],
            formulas: [
                { title: 'Ses şiddeti', latex: 'I = \\overline{p(t)u(t)}', expr: 'I = mean(p·u)', where: 'Şiddet, belirli bir yönde birim alandan geçen net akustik enerji akışıdır.' },
                { title: 'İki mikrofonlu hız tahmini', latex: 'u \\approx -\\dfrac{1}{\\rho}\\int \\dfrac{p_2-p_1}{\\Delta r}\\,dt', expr: 'u ≈ -(1/ρ)∫(p2-p1)/Δr dt', where: 'p-p probu, iki mikrofon arasındaki basınç gradyanından parçacık hızını tahmin eder.' },
                { title: 'Ses gücü', latex: 'W = \\int_S I_n\\,dS \\qquad L_W = 10\\log_{10}\\left(\\dfrac{W}{W_0}\\right)', expr: 'W = ∫ In dS ; LW = 10 log10(W/W0)', where: 'Yüzey boyunca normal şiddetin integrali yayılan ses gücünü verir.' },
            ],
            assumptions: [
                { name: 'Ölçüm yüzeyi kaynağı kapsamalı', desc: 'Eksik yüzeyler veya yanlış normal yön toplam ses gücünü olduğundan düşük gösterebilir.' },
                { name: 'Prob aralığı frekans aralığını sınırlar', desc: 'İki mikrofonlu şiddet problarında geçerli alt/üst frekans sınırları aralık ve faz doğruluğuna bağlıdır.' },
                { name: 'Arka plan gürültüsü yön bilgisi ister', desc: 'Şiddet ölçümü bazı sabit arka plan gürültülerini reddedebilir; ancak güçlü yönlü girişimler yine dikkat ister.' },
            ],
            steps: [
                { step: 'Ölçüm yüzeyini tanımla', detail: 'Kaynak etrafındaki segmentleri veya tarama yolunu belirleyin.' },
                { step: 'Normal şiddeti hesapla', detail: 'Her yüzey segmentinden geçen akustik enerji akışını tahmin edin.' },
                { step: 'Ses gücünü integre et', detail: 'Segment katkılarını toplayarak kaynak gücü ve ses gücü seviyesini elde edin.' },
                { step: 'Baskın bölgeleri haritala', detail: 'Toplam yayılıma en çok katkı yapan panel veya yönleri vurgulayın.' },
                { step: 'Konfigürasyonları karşılaştır', detail: 'Tasarım değişikliklerini yalnızca yerel SPL yerine kaynak gücüyle değerlendirin.' },
            ],
            exampleMetrics: [
                { value: 'LW = 87,6 dB re 1 pW', label: 'Ses gücü seviyesi', desc: 'Kaynak 87,6 dB ses gücü seviyesine karşılık gelen akustik güç yayıyor.' },
                { value: 'Panel B = %42', label: 'Baskın yayıcı alan', desc: 'Bir yüzey segmenti ölçülen akustik gücün %42’sini üretiyor.' },
                { value: 'I = 0,018 W/m²', label: 'Normal şiddet', desc: 'Seçilen parça dışarı doğru 0,018 W/m² net akustik enerji yayıyor.' },
            ],
            outputs: [
                { name: 'Ses gücü raporu', desc: 'Seçilen kaynak için toplam ses gücü ve ses gücü seviyesi.' },
                { name: 'Şiddet haritası', desc: 'Segment bazında akustik enerji akışı ve baskın yayılım bölgeleri.' },
                { name: 'Konfigürasyon karşılaştırması', desc: 'Önce/sonra değişiklikleri yerel basınca değil yayılan güce göre sıralar.' },
            ],
        },
    },

    octave_band: {
        slug: 'octave-band-analysis',
        en: {
            tagline: 'Breaks sound into standardized octave and third-octave bands so dominant noise regions are easy to compare against standards and design targets.',
            intro: 'A narrow FFT is useful for engineering details, but many acoustic decisions are made in octave bands. These proportional bands match how standards, building acoustics and many NVH targets are written. This module converts microphone signals into 1/1 and 1/3 octave band levels, making broadband shape, tonal regions and source contributions easier to read.',
            inputs: [
                { name: 'Acoustic signal', desc: 'Calibrated microphone pressure or an audio/acoustic channel.' },
                { name: 'Band mode', desc: '1/1 octave or 1/3 octave, with optional A/C/Z weighting.' },
                { name: 'Analysis window', desc: 'Time interval and averaging mode for stable band levels.' },
            ],
            formulas: [
                { title: 'Band level', latex: 'L_b = 10\\log_{10}\\left(\\dfrac{\\sum p_b^2}{p_0^2}\\right)', expr: 'Lb = 10 log10(sum(pb²)/p0²)', where: 'Energy inside each filtered band is converted into a decibel level.' },
                { title: 'Octave relationship', latex: 'f_2 = 2f_1', expr: 'f2 = 2 f1', where: 'A full octave spans a doubling of frequency.' },
                { title: 'Third-octave spacing', latex: 'f_{k+1}=2^{1/3}f_k', expr: 'f(k+1)=2^(1/3)·fk', where: 'Third-octave bands split each octave into three standardized bands.' },
            ],
            assumptions: [
                { name: 'Filter class matters for certification', desc: 'Standards-based work should use the correct IEC 61260 filter class and center frequencies.' },
                { name: 'Band levels hide narrow details', desc: 'A tonal peak and broadband energy can land in the same band. Use FFT detail when root cause matters.' },
                { name: 'Averaging should match the noise type', desc: 'Steady machinery, pass-by events and intermittent impacts need different averaging windows.' },
            ],
            steps: [
                { step: 'Select the signal and band mode', detail: 'Choose microphone channel, 1/1 or 1/3 octave resolution and weighting.' },
                { step: 'Filter into bands', detail: 'Apply standardized bandpass filters around the nominal center frequencies.' },
                { step: 'Calculate band levels', detail: 'Integrate energy in each band and convert to decibels.' },
                { step: 'Compare spectral shape', detail: 'Identify dominant low, mid or high frequency regions.' },
                { step: 'Export standard-ready tables', detail: 'Use band tables in reports, limits or acoustic design reviews.' },
            ],
            exampleMetrics: [
                { value: '1 kHz band = 64.2 dB', label: 'Dominant band', desc: 'The strongest third-octave band is centered at 1 kHz.' },
                { value: '250 Hz +6.1 dB', label: 'Design delta', desc: 'The updated design is 6.1 dB higher than baseline in the 250 Hz band.' },
                { value: 'LA,total = 71.0 dBA', label: 'Summed level', desc: 'The weighted band energies sum to a total A-weighted level of 71.0 dBA.' },
            ],
            outputs: [
                { name: 'Octave-band spectrum', desc: '1/1 or 1/3 octave levels across standardized center frequencies.' },
                { name: 'Band table', desc: 'Exportable values for standards, reports and design targets.' },
                { name: 'Comparison view', desc: 'Baseline-vs-current deltas by band.' },
            ],
        },
        tr: {
            tagline: 'Sesi standart oktav ve üçte-bir oktav bantlarına ayırır; baskın gürültü bölgeleri standartlar ve tasarım hedefleriyle kolayca karşılaştırılır.',
            intro: 'Dar bant FFT mühendislik ayrıntıları için yararlıdır, ancak birçok akustik karar oktav bantlarıyla alınır. Bu oransal bantlar standartların, yapı akustiği gereksinimlerinin ve birçok NVH hedefinin yazıldığı biçime uyar. Bu modül mikrofon sinyalini 1/1 ve 1/3 oktav bant seviyelerine dönüştürür; geniş bant şekli, tonal bölgeler ve kaynak katkıları daha okunur hale gelir.',
            inputs: [
                { name: 'Akustik sinyal', desc: 'Kalibre edilmiş mikrofon basıncı veya ses/akustik kanalı.' },
                { name: 'Bant modu', desc: '1/1 oktav veya 1/3 oktav; opsiyonel A/C/Z ağırlıklandırma ile.' },
                { name: 'Analiz penceresi', desc: 'Kararlı bant seviyeleri için zaman aralığı ve ortalama modu.' },
            ],
            formulas: [
                { title: 'Bant seviyesi', latex: 'L_b = 10\\log_{10}\\left(\\dfrac{\\sum p_b^2}{p_0^2}\\right)', expr: 'Lb = 10 log10(sum(pb²)/p0²)', where: 'Her filtrelenmiş bant içindeki enerji desibel seviyesine dönüştürülür.' },
                { title: 'Oktav ilişkisi', latex: 'f_2 = 2f_1', expr: 'f2 = 2 f1', where: 'Tam oktav frekansın ikiye katlanmasını kapsar.' },
                { title: 'Üçte-bir oktav aralığı', latex: 'f_{k+1}=2^{1/3}f_k', expr: 'f(k+1)=2^(1/3)·fk', where: 'Üçte-bir oktav bantları her oktavı üç standart banda böler.' },
            ],
            assumptions: [
                { name: 'Sertifikasyon için filtre sınıfı önemlidir', desc: 'Standart bazlı işlerde doğru IEC 61260 filtre sınıfı ve merkez frekansları kullanılmalıdır.' },
                { name: 'Bant seviyeleri dar ayrıntıları gizleyebilir', desc: 'Tonal bir tepe ve geniş bant enerji aynı banda düşebilir. Kök neden için gerektiğinde FFT ayrıntısına bakılmalıdır.' },
                { name: 'Ortalama gürültü tipine uymalıdır', desc: 'Kararlı makine sesi, pass-by olayları ve aralıklı darbeler farklı ortalama pencereleri ister.' },
            ],
            steps: [
                { step: 'Sinyali ve bant modunu seç', detail: 'Mikrofon kanalını, 1/1 veya 1/3 oktav çözünürlüğünü ve ağırlıklandırmayı seçin.' },
                { step: 'Bantlara filtrele', detail: 'Nominal merkez frekansları etrafında standart bant geçiren filtreleri uygulayın.' },
                { step: 'Bant seviyelerini hesapla', detail: 'Her banttaki enerjiyi integre edip desibele dönüştürün.' },
                { step: 'Spektral şekli karşılaştır', detail: 'Baskın düşük, orta veya yüksek frekans bölgelerini belirleyin.' },
                { step: 'Standarda hazır tabloları dışa aktar', detail: 'Bant tablolarını rapor, limit veya akustik tasarım incelemelerinde kullanın.' },
            ],
            exampleMetrics: [
                { value: '1 kHz bandı = 64,2 dB', label: 'Baskın bant', desc: 'En güçlü üçte-bir oktav bandı 1 kHz merkezlidir.' },
                { value: '250 Hz +6,1 dB', label: 'Tasarım farkı', desc: 'Güncel tasarım 250 Hz bandında baz tasarımdan 6,1 dB daha yüksektir.' },
                { value: 'LA,total = 71,0 dBA', label: 'Toplam seviye', desc: 'Ağırlıklı bant enerjileri toplamda 71,0 dBA A-ağırlıklı seviyeye karşılık gelir.' },
            ],
            outputs: [
                { name: 'Oktav bandı spektrumu', desc: 'Standart merkez frekansları boyunca 1/1 veya 1/3 oktav seviyeleri.' },
                { name: 'Bant tablosu', desc: 'Standart, rapor ve tasarım hedefleri için dışa aktarılabilir değerler.' },
                { name: 'Karşılaştırma görünümü', desc: 'Bant bazında baz-güncel farkları.' },
            ],
        },
    },

    psychoacoustics: {
        slug: 'psychoacoustics-sound-quality',
        en: {
            tagline: 'Quantifies how a sound feels to a listener, not only how many decibels it contains.',
            intro: 'Two products can measure the same dBA and still feel completely different. One may sound smooth, another sharp, rough or tonal. Psychoacoustic metrics capture those perceived qualities in numbers, helping NVH teams tune sound character, compare design changes and explain customer reactions that ordinary SPL does not fully predict.',
            inputs: [
                { name: 'Calibrated audio or pressure signal', desc: 'A time waveform with enough bandwidth for the target sound-quality metrics.' },
                { name: 'Analysis context', desc: 'Stationary sound, run-up, pass-by, transient event or selected operating condition.' },
                { name: 'Metric selection', desc: 'Loudness, sharpness, roughness, fluctuation strength, tonality or combined quality indicators.' },
            ],
            formulas: [
                { title: 'Loudness integration', latex: 'N = \\int_0^{24\\,Bark} N^{\\prime}(z)\\,dz', expr: 'N = ∫ specific loudness over Bark bands', where: 'Specific loudness across critical bands is integrated into total perceived loudness in sone.' },
                { title: 'Sharpness idea', latex: 'S \\propto \\dfrac{\\int N^{\\prime}(z)g(z)z\\,dz}{\\int N^{\\prime}(z)\\,dz}', expr: 'Sharpness weights high Bark bands more strongly', where: 'High-frequency energy raises sharpness and often makes a sound feel harsher.' },
                { title: 'Tonality contrast', latex: 'T \\sim \\dfrac{\\mathrm{tone\\ prominence}}{\\mathrm{masking\\ noise}}', expr: 'Tonality compares tone prominence against masking noise', where: 'Discrete tones that stand out from broadband noise are often more noticeable and annoying.' },
            ],
            assumptions: [
                { name: 'Playback and calibration affect perception', desc: 'A sound-quality result should be traceable to calibrated recording and consistent playback or measurement conditions.' },
                { name: 'Metrics do not replace jury tests', desc: 'They explain much of the perception, but final brand sound decisions may still need listening panels.' },
                { name: 'Stationary and transient sounds need different handling', desc: 'A steady fan tone and a door slam should not be summarized with the same time window.' },
            ],
            steps: [
                { step: 'Select the listening window', detail: 'Choose the operating region or event the customer actually hears.' },
                { step: 'Calibrate and filter', detail: 'Prepare the audio signal for perceptual analysis.' },
                { step: 'Calculate sound-quality metrics', detail: 'Compute loudness, sharpness, roughness, fluctuation strength and tonality.' },
                { step: 'Track changes over time or RPM', detail: 'See where sound character changes during run-up, pass-by or transient operation.' },
                { step: 'Compare against targets', detail: 'Rank designs by perceived character, not only sound pressure level.' },
            ],
            exampleMetrics: [
                { value: 'Loudness = 18.2 sone', label: 'Perceived magnitude', desc: 'The sound is perceived as stronger than another source at 9 sone, even if dBA differences look modest.' },
                { value: 'Sharpness = 2.1 acum', label: 'Harshness indicator', desc: 'High-frequency balance is strong enough to make the sound feel sharper.' },
                { value: 'Tonality = prominent @ 1.25 kHz', label: 'Tone issue', desc: 'A discrete tone stands out near 1.25 kHz and may dominate subjective reaction.' },
            ],
            outputs: [
                { name: 'Sound-quality dashboard', desc: 'Loudness, sharpness, roughness, fluctuation strength and tonality in one view.' },
                { name: 'Perceptual trend plots', desc: 'Metrics versus time, RPM or operating point.' },
                { name: 'Design comparison table', desc: 'Before/after changes ranked by listener-relevant metrics.' },
            ],
        },
        tr: {
            tagline: 'Bir sesin yalnızca kaç desibel olduğunu değil, dinleyicide nasıl hissettirdiğini sayısallaştırır.',
            intro: 'İki ürün aynı dBA değerini verebilir ama tamamen farklı algılanabilir. Biri yumuşak, diğeri keskin, pürüzlü veya tonal duyulabilir. Psikoakustik metrikler bu algısal özellikleri sayıya döker; NVH ekiplerinin ses karakterini ayarlamasına, tasarım değişikliklerini karşılaştırmasına ve klasik SPL’nin tam açıklayamadığı müşteri tepkilerini yorumlamasına yardım eder.',
            inputs: [
                { name: 'Kalibre ses veya basınç sinyali', desc: 'Hedef ses kalitesi metrikleri için yeterli bant genişliğine sahip zaman dalga formu.' },
                { name: 'Analiz bağlamı', desc: 'Kararlı ses, hızlanma, pass-by, geçici olay veya seçili çalışma koşulu.' },
                { name: 'Metrik seçimi', desc: 'Loudness, sharpness, roughness, fluctuation strength, tonality veya birleşik kalite göstergeleri.' },
            ],
            formulas: [
                { title: 'Loudness integrali', latex: 'N = \\int_0^{24\\,Bark} N^{\\prime}(z)\\,dz', expr: 'N = Bark bantları boyunca özgül loudness integrali', where: 'Kritik bantlardaki özgül loudness integre edilerek sone cinsinden toplam algılanan ses yüksekliği bulunur.' },
                { title: 'Sharpness fikri', latex: 'S \\propto \\dfrac{\\int N^{\\prime}(z)g(z)z\\,dz}{\\int N^{\\prime}(z)\\,dz}', expr: 'Sharpness yüksek Bark bantlarını daha güçlü ağırlıklandırır', where: 'Yüksek frekans enerjisi sharpness değerini artırır ve sesi çoğu zaman daha sert hissettirir.' },
                { title: 'Tonalite karşıtlığı', latex: 'T \\sim \\dfrac{\\mathrm{ton\\ belirginligi}}{\\mathrm{maskeleyen\\ gurultu}}', expr: 'Tonalite, ton belirginliğini maskeleyen gürültüyle karşılaştırır', where: 'Geniş bant gürültüden ayrılan belirgin tonlar daha fark edilir ve rahatsız edici olabilir.' },
            ],
            assumptions: [
                { name: 'Çalma ve kalibrasyon algıyı etkiler', desc: 'Ses kalitesi sonucu kalibre kayda ve tutarlı çalma/ölçüm koşullarına bağlanabilmelidir.' },
                { name: 'Metrikler jüri testinin yerine tamamen geçmez', desc: 'Algının büyük kısmını açıklarlar; fakat marka sesi kararlarında dinleme panelleri hâlâ gerekebilir.' },
                { name: 'Kararlı ve geçici ses farklı ele alınır', desc: 'Sabit fan tonu ile kapı çarpması aynı zaman penceresiyle özetlenmemelidir.' },
            ],
            steps: [
                { step: 'Dinleme penceresini seç', detail: 'Müşterinin gerçekten duyduğu çalışma bölgesini veya olayı seçin.' },
                { step: 'Kalibre et ve filtrele', detail: 'Ses sinyalini algısal analiz için hazırlayın.' },
                { step: 'Ses kalitesi metriklerini hesapla', detail: 'Loudness, sharpness, roughness, fluctuation strength ve tonality değerlerini hesaplayın.' },
                { step: 'Zaman veya devre göre izle', detail: 'Run-up, pass-by veya geçici çalışma sırasında ses karakterinin nerede değiştiğini görün.' },
                { step: 'Hedeflerle karşılaştır', detail: 'Tasarımları yalnızca ses basıncına göre değil, algılanan karaktere göre sıralayın.' },
            ],
            exampleMetrics: [
                { value: 'Loudness = 18,2 sone', label: 'Algılanan büyüklük', desc: 'Ses, dBA farkı sınırlı görünse bile 9 sone değerindeki başka bir kaynaktan belirgin güçlü algılanır.' },
                { value: 'Sharpness = 2,1 acum', label: 'Sertlik göstergesi', desc: 'Yüksek frekans dengesi sesi daha keskin hissettirecek kadar güçlüdür.' },
                { value: 'Tonalite = 1,25 kHz belirgin', label: 'Ton problemi', desc: '1,25 kHz civarında ayrık bir ton öne çıkar ve öznel tepkiyi baskılayabilir.' },
            ],
            outputs: [
                { name: 'Ses kalitesi panosu', desc: 'Loudness, sharpness, roughness, fluctuation strength ve tonality tek görünümde.' },
                { name: 'Algısal trend grafikleri', desc: 'Metriklerin zamana, devre veya çalışma noktasına göre değişimi.' },
                { name: 'Tasarım karşılaştırma tablosu', desc: 'Önce/sonra değişiklikleri dinleyiciyle ilişkili metriklere göre sıralar.' },
            ],
        },
    },

    microphone_correction: {
        slug: 'microphone-correction',
        en: {
            tagline: 'Applies microphone calibration and field corrections so spectra describe the acoustic field rather than the sensor’s imperfections.',
            intro: 'A microphone is a measuring instrument, not a perfect listener. Its sensitivity changes with frequency, direction and acoustic field type. If those effects are ignored, high-frequency spectra can be wrong by several decibels. This module applies calibration curves and free-field or diffuse-field corrections so sound levels and spectra remain comparable between microphones, labs and test campaigns.',
            inputs: [
                { name: 'Measured microphone signal', desc: 'Time waveform or spectrum from the microphone channel.' },
                { name: 'Calibration curve', desc: 'Frequency-dependent sensitivity correction from manufacturer data or lab calibration.' },
                { name: 'Field type', desc: 'Free-field, diffuse-field or pressure-field correction depending on the measurement setup.' },
            ],
            formulas: [
                { title: 'Magnitude correction', latex: 'L_{corr}(f)=L_{meas}(f)+C_{mic}(f)+C_{field}(f)', expr: 'Lcorr(f)=Lmeas(f)+Cmic(f)+Cfield(f)', where: 'Adds microphone and field corrections to the measured spectrum.' },
                { title: 'Sensitivity conversion', latex: 'p(t)=\\dfrac{v(t)}{S_{mic}}', expr: 'p(t)=v(t)/Smic', where: 'Converts voltage into acoustic pressure using microphone sensitivity.' },
                { title: 'Decibel correction', latex: '\\Delta L = 20\\log_{10}\\left(\\dfrac{S_{ref}}{S(f)}\\right)', expr: 'ΔL = 20 log10(Sref/S(f))', where: 'Frequency-dependent sensitivity becomes a level correction in decibels.' },
            ],
            assumptions: [
                { name: 'The correction must match the microphone', desc: 'Using a curve from another microphone serial number can be worse than leaving the data uncorrected.' },
                { name: 'Field type is not cosmetic', desc: 'Free-field and diffuse-field microphones behave differently at high frequency.' },
                { name: 'Calibration ages', desc: 'Microphone sensitivity can drift after overload, humidity or rough handling; traceable recalibration keeps results defensible.' },
            ],
            steps: [
                { step: 'Load calibration data', detail: 'Import sensitivity and frequency-response corrections.' },
                { step: 'Choose field correction', detail: 'Select free-field, diffuse-field or pressure-field behavior.' },
                { step: 'Correct the spectrum', detail: 'Apply the frequency-dependent correction to measured levels.' },
                { step: 'Check corrected levels', detail: 'Compare before/after spectra and flag large corrections.' },
                { step: 'Pass corrected data onward', detail: 'Use corrected pressure for SPL, octave, sound power or psychoacoustic analysis.' },
            ],
            exampleMetrics: [
                { value: '+3.2 dB @ 12.5 kHz', label: 'High-frequency correction', desc: 'The microphone under-reads this band unless calibration correction is applied.' },
                { value: '94.0 dB calibrator match', label: 'Sensitivity check', desc: 'The corrected signal matches the reference calibrator level.' },
                { value: 'Diffuse-field selected', label: 'Field assumption', desc: 'The correction matches a reverberant or random-incidence measurement condition.' },
            ],
            outputs: [
                { name: 'Corrected pressure channel', desc: 'A calibrated acoustic signal ready for downstream analysis.' },
                { name: 'Correction curve report', desc: 'Applied microphone and field corrections versus frequency.' },
                { name: 'Before/after spectrum', desc: 'Visual check of how calibration changes the measurement.' },
            ],
        },
        tr: {
            tagline: 'Mikrofon kalibrasyonu ve alan düzeltmelerini uygular; spektrum sensör kusurlarını değil akustik alanı temsil eder.',
            intro: 'Mikrofon bir ölçüm cihazıdır, kusursuz bir dinleyici değildir. Hassasiyeti frekansa, geliş yönüne ve akustik alan tipine göre değişir. Bu etkiler yok sayılırsa özellikle yüksek frekans spektrumları birkaç desibel hatalı olabilir. Bu modül kalibrasyon eğrilerini ve serbest alan/yayılı alan düzeltmelerini uygular; böylece ses seviyeleri ve spektrumlar mikrofonlar, laboratuvarlar ve test kampanyaları arasında karşılaştırılabilir kalır.',
            inputs: [
                { name: 'Ölçülen mikrofon sinyali', desc: 'Mikrofon kanalından zaman dalga formu veya spektrum.' },
                { name: 'Kalibrasyon eğrisi', desc: 'Üretici verisi veya laboratuvar kalibrasyonundan frekansa bağlı hassasiyet düzeltmesi.' },
                { name: 'Alan tipi', desc: 'Ölçüm düzenine göre serbest alan, yayılı alan veya basınç alanı düzeltmesi.' },
            ],
            formulas: [
                { title: 'Seviye düzeltmesi', latex: 'L_{corr}(f)=L_{meas}(f)+C_{mic}(f)+C_{field}(f)', expr: 'Lcorr(f)=Lmeas(f)+Cmic(f)+Cfield(f)', where: 'Ölçülen spektruma mikrofon ve alan düzeltmelerini ekler.' },
                { title: 'Hassasiyet dönüşümü', latex: 'p(t)=\\dfrac{v(t)}{S_{mic}}', expr: 'p(t)=v(t)/Smic', where: 'Mikrofon hassasiyetiyle volt sinyalini akustik basınca çevirir.' },
                { title: 'Desibel düzeltmesi', latex: '\\Delta L = 20\\log_{10}\\left(\\dfrac{S_{ref}}{S(f)}\\right)', expr: 'ΔL = 20 log10(Sref/S(f))', where: 'Frekansa bağlı hassasiyet desibel cinsinden seviye düzeltmesine dönüşür.' },
            ],
            assumptions: [
                { name: 'Düzeltme doğru mikrofona ait olmalı', desc: 'Başka bir seri numarasına ait eğriyi kullanmak, veriyi düzeltmemekten daha kötü sonuç verebilir.' },
                { name: 'Alan tipi ayrıntı değildir', desc: 'Serbest alan ve yayılı alan mikrofonları yüksek frekansta farklı davranır.' },
                { name: 'Kalibrasyon yaşlanır', desc: 'Aşırı seviye, nem veya sert kullanım hassasiyeti değiştirebilir; izlenebilir yeniden kalibrasyon sonucu savunulabilir tutar.' },
            ],
            steps: [
                { step: 'Kalibrasyon verisini yükle', detail: 'Hassasiyet ve frekans tepkisi düzeltmelerini içe aktarın.' },
                { step: 'Alan düzeltmesini seç', detail: 'Serbest alan, yayılı alan veya basınç alanı davranışını seçin.' },
                { step: 'Spektrumu düzelt', detail: 'Frekansa bağlı düzeltmeyi ölçülen seviyelere uygulayın.' },
                { step: 'Düzeltilmiş seviyeleri kontrol et', detail: 'Önce/sonra spektrumları karşılaştırın ve büyük düzeltmeleri işaretleyin.' },
                { step: 'Düzeltilmiş veriyi aktar', detail: 'SPL, oktav, ses gücü veya psikoakustik analiz için düzeltilmiş basıncı kullanın.' },
            ],
            exampleMetrics: [
                { value: '+3,2 dB @ 12,5 kHz', label: 'Yüksek frekans düzeltmesi', desc: 'Kalibrasyon uygulanmazsa mikrofon bu bandı düşük okur.' },
                { value: '94,0 dB kalibratör eşleşmesi', label: 'Hassasiyet kontrolü', desc: 'Düzeltilmiş sinyal referans kalibratör seviyesine uyuyor.' },
                { value: 'Yayılı alan seçildi', label: 'Alan varsayımı', desc: 'Düzeltme yankılı veya rastgele gelişli ölçüm koşuluna uyuyor.' },
            ],
            outputs: [
                { name: 'Düzeltilmiş basınç kanalı', desc: 'Sonraki analizler için hazır kalibre akustik sinyal.' },
                { name: 'Düzeltme eğrisi raporu', desc: 'Frekansa göre uygulanan mikrofon ve alan düzeltmeleri.' },
                { name: 'Önce/sonra spektrumu', desc: 'Kalibrasyonun ölçümü nasıl değiştirdiğini görsel olarak kontrol eder.' },
            ],
        },
    },
}

export default ACOUSTICS_WIDGET_DETAILS
