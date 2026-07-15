const VIBRATION_WIDGET_EXTRAS = {
    bearing_fault: {
        en: {
            assumptions: [
                { name: 'Sampling rate must cover the resonance band', desc: 'Envelope analysis needs the high-frequency resonance where impacts ring the structure, not only the low-frequency shaft orders.' },
                { name: 'Bearing geometry improves confidence', desc: 'Without ball count, pitch diameter and contact angle, the module can still find repetitive impacts but cannot name the fault component as confidently.' },
            ],
            exampleMetrics: [
                { value: 'BPFI match: 3.2× shaft speed', label: 'Inner-race indication', desc: 'Envelope-spectrum peaks align with the calculated inner-race fault family.' },
                { value: 'Kurtogram band: 6.4-8.0 kHz', label: 'Demodulation band', desc: 'The selected band contains the strongest impulsive resonance for envelope analysis.' },
            ],
        },
        tr: {
            assumptions: [
                { name: 'Örnekleme hızı rezonans bandını kapsamalı', desc: 'Zarf analizi yalnızca düşük frekanslı mil orderlarını değil, darbelerin yapıyı çınlattığı yüksek frekanslı rezonansı ister.' },
                { name: 'Rulman geometrisi güveni artırır', desc: 'Bilye sayısı, taksimat çapı ve temas açısı yoksa modül tekrarlı darbeleri bulabilir; fakat arızalı bileşeni aynı güvenle adlandıramaz.' },
            ],
            exampleMetrics: [
                { value: 'BPFI eşleşmesi: 3,2× mil hızı', label: 'İç bilezik göstergesi', desc: 'Zarf spektrumu tepeleri hesaplanan iç bilezik arıza ailesiyle hizalanır.' },
                { value: 'Kurtogram bandı: 6,4-8,0 kHz', label: 'Demodülasyon bandı', desc: 'Seçilen bant zarf analizi için en güçlü darbesel rezonansı içerir.' },
            ],
        },
    },
    modal_analysis: {
        en: {
            assumptions: [
                { name: 'Input force quality matters', desc: 'Double hits, overloads or poor hammer contact can make FRFs look clean while modal parameters drift.' },
                { name: 'Mode shapes need consistent geometry', desc: 'Sensor locations and directions must match the measurement grid for animations and MAC checks to be meaningful.' },
            ],
            exampleMetrics: [
                { value: 'Mode 1 = 42.6 Hz, ζ = 1.8%', label: 'First bending mode', desc: 'A stable pole identifies the first mode and its damping ratio.' },
                { value: 'AutoMAC off-diagonal < 0.12', label: 'Mode separation', desc: 'Identified mode shapes are well separated rather than duplicated fits.' },
            ],
        },
        tr: {
            assumptions: [
                { name: 'Giriş kuvveti kalitesi önemlidir', desc: 'Çift darbe, aşırı yük veya kötü çekiç teması FRF’leri temiz gösterirken modal parametreleri kaydırabilir.' },
                { name: 'Mod şekilleri tutarlı geometri ister', desc: 'Sensör konumları ve yönleri ölçüm ağıyla eşleşmelidir; aksi halde animasyon ve MAC kontrolleri anlamlı olmaz.' },
            ],
            exampleMetrics: [
                { value: 'Mod 1 = 42,6 Hz, ζ = %1,8', label: 'İlk eğilme modu', desc: 'Kararlı bir kutup ilk modu ve sönüm oranını belirler.' },
                { value: 'AutoMAC çapraz < 0,12', label: 'Mod ayrımı', desc: 'Belirlenen mod şekilleri kopya uyumlar yerine iyi ayrılmıştır.' },
            ],
        },
    },
    operational_modal_analysis: {
        en: {
            assumptions: [
                { name: 'Excitation should be broad enough', desc: 'OMA works best when ambient or operating loads excite the modes of interest.' },
                { name: 'Mode shapes are usually unscaled', desc: 'Without measured input force, OMA mode shapes show relative shape, not absolute modal mass.' },
            ],
            exampleMetrics: [
                { value: 'Stable mode = 7.8 Hz', label: 'Operational natural frequency', desc: 'A repeated pole appears across model orders in the stabilization diagram.' },
                { value: 'MAC = 0.94 vs baseline', label: 'Shape consistency', desc: 'The current mode shape is strongly correlated with the healthy reference.' },
            ],
        },
        tr: {
            assumptions: [
                { name: 'Uyarım yeterince geniş bantlı olmalı', desc: 'OMA, ortam veya işletme yükleri ilgilenilen modları uyardığında en iyi sonucu verir.' },
                { name: 'Mod şekilleri çoğu zaman ölçeksizdir', desc: 'Ölçülen giriş kuvveti olmadığında OMA mod şekilleri mutlak modal kütleyi değil göreli şekli gösterir.' },
            ],
            exampleMetrics: [
                { value: 'Kararlı mod = 7,8 Hz', label: 'İşletme doğal frekansı', desc: 'Kararlılık diyagramında model dereceleri boyunca tekrarlanan bir kutup görünür.' },
                { value: 'MAC = 0,94 / referans', label: 'Şekil tutarlılığı', desc: 'Güncel mod şekli sağlıklı referansla güçlü korelasyon gösterir.' },
            ],
        },
    },
    order_tracking: {
        en: {
            assumptions: [
                { name: 'A clean speed reference is essential', desc: 'Missing tacho pulses or noisy keyphasor timing directly smear order content.' },
                { name: 'Run-up rate affects resolution', desc: 'Very fast sweeps reduce time available to resolve narrow resonances.' },
            ],
            exampleMetrics: [
                { value: '1× order peak at 3,200 rpm', label: 'Imbalance crossing', desc: 'The synchronous component grows as it passes a structural resonance.' },
                { value: '2.5× order isolated', label: 'Fractional excitation', desc: 'A non-integer order is tracked separately from nearby harmonics.' },
            ],
        },
        tr: {
            assumptions: [
                { name: 'Temiz hız referansı kritiktir', desc: 'Eksik tako darbeleri veya gürültülü keyphasor zamanlaması order içeriğini doğrudan bulanıklaştırır.' },
                { name: 'Hızlanma oranı çözünürlüğü etkiler', desc: 'Çok hızlı süpürmeler dar rezonansları ayırmak için gereken zamanı azaltır.' },
            ],
            exampleMetrics: [
                { value: '1× order tepesi: 3.200 dev/dk', label: 'Balanssızlık geçişi', desc: 'Senkron bileşen yapısal rezonansı geçerken büyür.' },
                { value: '2,5× order ayrıştırıldı', label: 'Kesirli uyarım', desc: 'Tam sayı olmayan order, yakın harmoniklerden ayrı izlenir.' },
            ],
        },
    },
    rotor_balancing: {
        en: {
            assumptions: [
                { name: 'Phase reference must be stable', desc: 'Correction angle is only meaningful when keyphasor phase is repeatable between runs.' },
                { name: 'Trial weight response should be linear', desc: 'Influence-coefficient balancing assumes the rotor response changes predictably with added weight.' },
            ],
            exampleMetrics: [
                { value: 'Correction = 18 g @ 236°', label: 'Balance solution', desc: 'The computed weight and angle counter the measured 1× vector.' },
                { value: '1× reduced by 82%', label: 'Residual vibration', desc: 'The synchronous vibration drops substantially after correction.' },
            ],
        },
        tr: {
            assumptions: [
                { name: 'Faz referansı kararlı olmalı', desc: 'Düzeltme açısı, keyphasor fazı koşular arasında tekrarlanabilir olduğunda anlamlıdır.' },
                { name: 'Deneme ağırlığı cevabı lineer olmalı', desc: 'Etki katsayısı yöntemi rotor cevabının eklenen ağırlıkla öngörülebilir değiştiğini varsayar.' },
            ],
            exampleMetrics: [
                { value: 'Düzeltme = 18 g @ 236°', label: 'Balans çözümü', desc: 'Hesaplanan ağırlık ve açı ölçülen 1× vektörü dengeler.' },
                { value: '1× %82 azaldı', label: 'Artık titreşim', desc: 'Düzeltmeden sonra senkron titreşim belirgin şekilde düşer.' },
            ],
        },
    },
    rotor_dynamics: {
        en: {
            assumptions: [
                { name: 'Probe orientation must be known', desc: 'Orbit shape and whirl direction depend on correct X/Y probe angle and polarity.' },
                { name: 'Slow-roll compensation needs low-speed data', desc: 'Runout removal is only as good as the slow-roll reference used to subtract it.' },
            ],
            exampleMetrics: [
                { value: 'Forward whirl dominant', label: 'Whirl direction', desc: 'The full spectrum shows forward precession rather than backward whirl.' },
                { value: 'Orbit p-p = 64 µm', label: 'Shaft motion', desc: 'Relative shaft displacement stays within the selected evaluation band.' },
            ],
        },
        tr: {
            assumptions: [
                { name: 'Prob yönelimi bilinmeli', desc: 'Yörünge şekli ve fırlama yönü doğru X/Y prob açısına ve polaritesine bağlıdır.' },
                { name: 'Yavaş-dönme düzeltmesi düşük hız verisi ister', desc: 'Runout kaldırma, çıkarılan slow-roll referansı kadar güvenilirdir.' },
            ],
            exampleMetrics: [
                { value: 'İleri fırlama baskın', label: 'Fırlama yönü', desc: 'Tam spektrum geri fırlama yerine ileri presesyonu gösterir.' },
                { value: 'Yörünge p-p = 64 µm', label: 'Mil hareketi', desc: 'Bağıl mil yer değiştirmesi seçilen değerlendirme bandı içinde kalır.' },
            ],
        },
    },
    shock_srs: {
        en: {
            assumptions: [
                { name: 'Sensor mounting changes high-frequency content', desc: 'Loose or resonant accelerometer mounts can create artificial SRS peaks.' },
                { name: 'Damping ratio must match the specification', desc: 'A 5% SRS and a 10% SRS are not interchangeable qualification results.' },
            ],
            exampleMetrics: [
                { value: 'SRS peak = 820 g @ 1.6 kHz', label: 'Worst response band', desc: 'The pulse is most severe for structures near 1.6 kHz.' },
                { value: 'ΔV = 2.4 m/s', label: 'Pulse severity', desc: 'Velocity change summarizes impulse content beyond peak acceleration alone.' },
            ],
        },
        tr: {
            assumptions: [
                { name: 'Sensör montajı yüksek frekansı değiştirir', desc: 'Gevşek veya rezonanslı ivmeölçer montajı yapay SRS tepeleri oluşturabilir.' },
                { name: 'Sönüm oranı şartnameyle eşleşmeli', desc: '%5 SRS ile %10 SRS birbirinin yerine geçebilecek yeterlilik sonuçları değildir.' },
            ],
            exampleMetrics: [
                { value: 'SRS tepe = 820 g @ 1,6 kHz', label: 'En ağır tepki bandı', desc: 'Darbe, 1,6 kHz civarındaki yapılar için en şiddetlidir.' },
                { value: 'ΔV = 2,4 m/s', label: 'Darbe şiddeti', desc: 'Hız değişimi, yalnızca tepe ivmenin ötesindeki impuls içeriğini özetler.' },
            ],
        },
    },
    time_ods: {
        en: {
            assumptions: [
                { name: 'Channels need a common time reference', desc: 'ODS animation loses meaning when sensors are not synchronized.' },
                { name: 'Geometry drives interpretation', desc: 'A correct point map and direction convention are required to see real deformation patterns.' },
            ],
            exampleMetrics: [
                { value: 'Peak deflection at node 14', label: 'Dominant motion point', desc: 'The animated shape highlights the location contributing most to motion.' },
                { value: 'Phase lag = 72°', label: 'Relative motion', desc: 'Two measurement points move with a clear phase delay at the selected frequency.' },
            ],
        },
        tr: {
            assumptions: [
                { name: 'Kanallar ortak zaman referansı ister', desc: 'Sensörler senkron değilse ODS animasyonu anlamını kaybeder.' },
                { name: 'Geometri yorumu belirler', desc: 'Gerçek deformasyon desenini görmek için doğru nokta haritası ve yön konvansiyonu gerekir.' },
            ],
            exampleMetrics: [
                { value: 'Tepe sapma: düğüm 14', label: 'Baskın hareket noktası', desc: 'Animasyon, harekete en çok katkı yapan konumu vurgular.' },
                { value: 'Faz gecikmesi = 72°', label: 'Bağıl hareket', desc: 'Seçilen frekansta iki ölçüm noktası belirgin faz farkıyla hareket eder.' },
            ],
        },
    },
    cross_spectrum: {
        en: {
            assumptions: [
                { name: 'Averaging improves reliability', desc: 'Cross-spectral estimates need enough blocks to separate repeatable relationships from random noise.' },
                { name: 'Coherence is a quality flag', desc: 'Low coherence means the FRF or phase relationship should be treated cautiously.' },
            ],
            exampleMetrics: [
                { value: 'Coherence = 0.96 @ 128 Hz', label: 'Reliable relationship', desc: 'Input and response are strongly related at the selected frequency.' },
                { value: 'H1 gain = 4.2 mm/s/N', label: 'FRF magnitude', desc: 'The response per unit force is high near this resonance.' },
            ],
        },
        tr: {
            assumptions: [
                { name: 'Ortalama güvenilirliği artırır', desc: 'Çapraz spektral kestirimler rastgele gürültüden tekrarlanabilir ilişkiyi ayırmak için yeterli blok ister.' },
                { name: 'Koherans kalite bayrağıdır', desc: 'Düşük koherans FRF veya faz ilişkisinin dikkatli yorumlanması gerektiğini gösterir.' },
            ],
            exampleMetrics: [
                { value: 'Koherans = 0,96 @ 128 Hz', label: 'Güvenilir ilişki', desc: 'Giriş ve tepki seçilen frekansta güçlü biçimde ilişkilidir.' },
                { value: 'H1 kazancı = 4,2 mm/s/N', label: 'FRF genliği', desc: 'Birim kuvvet başına tepki bu rezonans civarında yüksektir.' },
            ],
        },
    },
    cross_axis_compensation: {
        en: {
            assumptions: [
                { name: 'Calibration matrix should match the sensor setup', desc: 'Cross-axis correction depends on the actual mounted sensor orientation and calibration.' },
                { name: 'Noise can be amplified', desc: 'Poorly conditioned correction matrices may increase noise on one or more axes.' },
            ],
            exampleMetrics: [
                { value: 'X→Y leakage = -34 dB', label: 'Cross-axis rejection', desc: 'After correction, unwanted coupling from X into Y is low.' },
                { value: 'Matrix condition = 1.8', label: 'Correction stability', desc: 'The calibration matrix is well conditioned for compensation.' },
            ],
        },
        tr: {
            assumptions: [
                { name: 'Kalibrasyon matrisi sensör kurulumuyla eşleşmeli', desc: 'Çapraz eksen düzeltmesi gerçek montaj yönüne ve kalibrasyona bağlıdır.' },
                { name: 'Gürültü büyüyebilir', desc: 'Kötü koşullu düzeltme matrisleri bir veya daha fazla eksende gürültüyü artırabilir.' },
            ],
            exampleMetrics: [
                { value: 'X→Y kaçak = -34 dB', label: 'Çapraz eksen reddi', desc: 'Düzeltmeden sonra X ekseninden Y’ye istenmeyen bağlaşım düşüktür.' },
                { value: 'Matris koşulu = 1,8', label: 'Düzeltme kararlılığı', desc: 'Kalibrasyon matrisi kompanzasyon için iyi koşulludur.' },
            ],
        },
    },
    kinematics_6dof: {
        en: {
            assumptions: [
                { name: 'Coordinate frames must be explicit', desc: 'Six-degree-of-freedom motion is only meaningful when sensor, body and global frames are defined.' },
                { name: 'Integration drift needs control', desc: 'Acceleration-to-velocity or displacement calculations require drift management and constraints.' },
            ],
            exampleMetrics: [
                { value: 'Roll RMS = 0.42°', label: 'Angular motion', desc: 'The body shows small but measurable roll vibration over the selected event.' },
                { value: 'Peak Z = 18.6 mm', label: 'Vertical displacement', desc: 'The reconstructed motion highlights the largest vertical excursion.' },
            ],
        },
        tr: {
            assumptions: [
                { name: 'Koordinat sistemleri açık olmalı', desc: 'Altı serbestlik dereceli hareket, sensör, gövde ve global eksenler tanımlandığında anlamlıdır.' },
                { name: 'İntegral sürüklenmesi kontrol ister', desc: 'İvmeden hız veya yer değiştirme hesabı drift yönetimi ve kısıtlar gerektirir.' },
            ],
            exampleMetrics: [
                { value: 'Roll RMS = 0,42°', label: 'Açısal hareket', desc: 'Gövde seçilen olay boyunca küçük ama ölçülebilir roll titreşimi gösterir.' },
                { value: 'Tepe Z = 18,6 mm', label: 'Dikey yer değiştirme', desc: 'Yeniden kurulan hareket en büyük dikey sapmayı vurgular.' },
            ],
        },
    },
    machine_health_overview: {
        en: {
            assumptions: [
                { name: 'Machine class sets the limit', desc: 'ISO-style severity zones depend on machine type, mounting and power class.' },
                { name: 'Trends matter more than one point', desc: 'A single RMS value is useful, but rising trend and rate of change are often more actionable.' },
            ],
            exampleMetrics: [
                { value: 'Zone B, 3.1 mm/s RMS', label: 'Current severity', desc: 'The selected point is acceptable for long-term operation under the chosen class.' },
                { value: '+0.18 mm/s per week', label: 'Trend rate', desc: 'The vibration level is rising slowly and should be watched.' },
            ],
        },
        tr: {
            assumptions: [
                { name: 'Makine sınıfı limiti belirler', desc: 'ISO tarzı şiddet bölgeleri makine tipi, montaj ve güç sınıfına bağlıdır.' },
                { name: 'Trend tek noktadan daha değerlidir', desc: 'Tek RMS değeri yararlıdır; fakat yükselen trend ve değişim hızı çoğu zaman daha aksiyoneldir.' },
            ],
            exampleMetrics: [
                { value: 'Bölge B, 3,1 mm/s RMS', label: 'Güncel şiddet', desc: 'Seçilen nokta seçili sınıfta uzun süreli çalışma için kabul edilebilir durumdadır.' },
                { value: '+0,18 mm/s / hafta', label: 'Trend hızı', desc: 'Titreşim seviyesi yavaş yükseliyor ve izlenmelidir.' },
            ],
        },
    },
    structural_health: {
        en: {
            assumptions: [
                { name: 'Environment must be separated from damage', desc: 'Temperature and load changes can move modal parameters even when the structure is healthy.' },
                { name: 'Baseline quality determines alarm quality', desc: 'A weak healthy baseline creates false alarms or missed damage.' },
            ],
            exampleMetrics: [
                { value: 'Mode 2 drift = -2.4%', label: 'Frequency shift', desc: 'A consistent downward shift can indicate stiffness loss if environment cannot explain it.' },
                { value: 'Novelty score = 3.8σ', label: 'Damage indicator', desc: 'The current feature vector sits outside normal baseline variation.' },
            ],
        },
        tr: {
            assumptions: [
                { name: 'Çevre etkisi hasardan ayrılmalı', desc: 'Sıcaklık ve yük değişimleri yapı sağlıklı olsa bile modal parametreleri kaydırabilir.' },
                { name: 'Referans kalitesi alarm kalitesini belirler', desc: 'Zayıf sağlıklı referans yanlış alarm veya kaçan hasar üretir.' },
            ],
            exampleMetrics: [
                { value: 'Mod 2 kayması = -%2,4', label: 'Frekans kayması', desc: 'Çevre açıklayamıyorsa tutarlı aşağı kayma rijitlik kaybına işaret edebilir.' },
                { value: 'Yenilik skoru = 3,8σ', label: 'Hasar göstergesi', desc: 'Güncel öznitelik vektörü normal referans değişiminin dışındadır.' },
            ],
        },
    },
    torsional_vibration: {
        en: {
            assumptions: [
                { name: 'Pulse timing resolution drives accuracy', desc: 'Torsional vibration is measured from timing, so edge detection and timestamp precision are critical.' },
                { name: 'Missing-tooth decoding needs correct wheel definition', desc: 'Wrong tooth count or gap pattern shifts absolute angle and order results.' },
            ],
            exampleMetrics: [
                { value: 'Order 2.0 = 0.84° pk', label: 'Firing-order torsion', desc: 'A second-order torsional component dominates the selected speed range.' },
                { value: 'Twist = 1.6° p-p', label: 'Shaft deformation', desc: 'Two encoders show peak-to-peak dynamic twist across the shaft section.' },
            ],
        },
        tr: {
            assumptions: [
                { name: 'Darbe zaman çözünürlüğü doğruluğu belirler', desc: 'Burulma titreşimi zamanlamadan ölçülür; kenar algılama ve zaman damgası hassasiyeti kritiktir.' },
                { name: 'Eksik diş çözümü doğru çark tanımı ister', desc: 'Yanlış diş sayısı veya boşluk deseni mutlak açıyı ve order sonuçlarını kaydırır.' },
            ],
            exampleMetrics: [
                { value: 'Order 2,0 = 0,84° tepe', label: 'Ateşleme orderı burulması', desc: 'Seçilen hız aralığında ikinci order burulma bileşeni baskındır.' },
                { value: 'Burulma = 1,6° p-p', label: 'Mil deformasyonu', desc: 'İki enkoder mil kesiti boyunca tepeden tepeye dinamik burulmayı gösterir.' },
            ],
        },
    },
}

export default VIBRATION_WIDGET_EXTRAS
