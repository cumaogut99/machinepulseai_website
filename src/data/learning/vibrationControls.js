// Supplement the existing, authored vibration courses with real control tours.
// Keep these separate from the full courses and from the future engineering groups.
const records = {
    rotor_balancing: {
        controls: [
            ['Selected 1X / keyphasor', 'Seçili 1X / keyphasor', 'Capture the measured synchronous vector using physical once-per-revolution edges. A typed RPM value cannot establish correction phase.', 'Senkron 1X vektörünü, devir başına bir darbe veren fiziksel referans sinyaliyle ölçün. Elle girilen bir RPM değeri düzeltme fazını belirleyemez.'],
            ['Trial geometry / angle convention', 'Deneme geometrisi / açı tanımı', 'Record trial mass, radius, angle, rotation and viewing direction. The current version supports single-plane balancing; keep one angular datum throughout.', 'Deneme kütlesini, yarıçapı, açıyı, dönüş yönünü ve bakış yönünü kaydedin. Mevcut sürüm tek düzlem balanslamayı destekler; tüm koşularda aynı açı referansını kullanın.'],
            ['Run guards / verification', 'Koşu kontrolleri / doğrulama', 'Inspect speed span, amplitude variation, phase deviation and minimum trial effect. Capture a measured verification run after correction.', 'Hız aralığını, genlik değişimini, faz sapmasını ve en düşük deneme etkisini kontrol edin. Düzeltmeden sonra bir doğrulama ölçümü alın.'],
        ],
    },
    order_tracking: {
        controls: [
            ['Vibration / rotation reference', 'Titreşim / dönme referansı', 'Choose the vibration channel and valid RPM or tacho reference. Check dropouts before transforming time into angle.', 'Titreşim kanalını ve geçerli bir RPM veya takometre referansını seçin. Zaman ekseni açıya dönüştürülmeden önce sinyaldeki kesintileri kontrol edin.'],
            ['Max Order / Order Resolution', 'En yüksek order / order çözünürlüğü', 'Choose order range and resolution from the machine question. Finer resolution needs more revolutions and reduces locality during a ramp.', 'Order aralığını ve çözünürlüğünü incelenen soruya göre seçin. Daha ince çözünürlük daha fazla devir gerektirir ve hız değişimi sırasında zaman ayrımını azaltır.'],
            ['Campbell / Vold–Kalman', 'Campbell / Vold–Kalman', 'Use a map for broad speed-dependent structure or single/multi-order extraction for selected tracks. Bandwidth determines how rapidly a track can vary.', 'Tüm hız aralığındaki genel yapı için haritayı, seçili order’lar için tekli veya çoklu çıkarımı kullanın. Bant genişliği, izlenen order’ın ne kadar hızlı değişebileceğini belirler.'],
        ],
    },
    torsional_vibration: {
        controls: [
            ['Mode / encoder type', 'Mod / enkoder tipi', 'Choose the rotational or twist workflow and the actual sensor type. Tooth count and missing-tooth settings define how edges become angle.', 'Dönel veya burulma analizini ve kullanılan sensör tipini seçin. Diş sayısı ve eksik diş ayarları, darbe kenarlarının açıya nasıl dönüştürüleceğini belirler.'],
            ['Missing teeth / gap ratio', 'Eksik dişler / boşluk oranı', 'Configure known encoder gaps so an intentional missing tooth is not mistaken for a speed fluctuation.', 'Enkoderdeki bilinen boşlukları tanımlayın; böylece kasıtlı eksik diş bir hız dalgalanması olarak yorumlanmaz.'],
            ['Speed ratio / phase offset', 'Hız oranı / faz ofseti', 'For two references, verify speed ratio, direction and static phase offset before interpreting dynamic twist.', 'İki referansta dinamik burulmayı yorumlamadan önce hız oranı, yön ve statik faz ofsetini doğrulayın.'],
        ],
    },
    modal_analysis: {
        controls: [
            ['Input / response mapping', 'Giriş / cevap eşlemesi', 'Identify measured excitation and response DOFs with geometry and units. A response-only measurement belongs to OMA, not an ordinary measured-force FRF.', 'Ölçülen uyarım ve tepki serbestlik derecelerini geometri ve birimleriyle tanımlayın. Kuvvet ölçülmeden yalnızca tepki ölçülüyorsa bu bir FRF ölçümü değil, OMA kapsamındadır.'],
            ['FRF Estimator / Block Size', 'FRF tahmincisi / blok boyutu', 'Choose H1, H2 or Hv with a stated noise assumption. Block duration defines frequency spacing and must capture the decay.', 'Gürültü varsayımına göre H1, H2 veya Hv kestiricisini seçin. Blok süresi frekans çözünürlüğünü belirler ve titreşimin sönümlenmesini kapsayacak uzunlukta olmalıdır.'],
            ['Model order / stabilization tolerances', 'Model derecesi / kararlılık toleransları', 'Inspect persistent poles over model orders and confirm shapes and damping. A single attractive peak is not a validated mode.', 'Model dereceleri boyunca kararlı kalan kutupları inceleyin; mod şekli ve sönüm değerlerini doğrulayın. Tek başına belirgin bir tepe doğrulanmış bir mod değildir.'],
        ],
    },
    operational_modal_analysis: {
        controls: [
            ['Algorithm', 'Algoritma', 'Choose SSI, FDD or EFDD from the available workflow and the excitation assumptions. Operational harmonics can imitate structural modes.', 'Mevcut akış ve uyarım varsayımlarına göre SSI, FDD veya EFDD seçin. İşletme harmonikleri yapısal modlara benzeyebilir.'],
            ['Model order / block rows', 'Model derecesi / blok satırları', 'Set identification depth and inspect stability across orders. More states do not automatically create better physical modes.', 'Model derecesini ayarlayıp kutupların dereceler arasındaki kararlılığını inceleyin. Daha yüksek model derecesi kendiliğinden daha doğru modlar üretmez.'],
            ['Frequency band / spectral parameters', 'Frekans bandı / spektral parametreler', 'Focus the band and set FDD/EFDD block, overlap and window where applicable. Validate singular-value peaks with shapes and MAC.', 'Bandı daraltıp uygunsa FDD/EFDD blok, örtüşme ve pencereyi ayarlayın. Tekil değer tepelerini şekil ve MAC ile doğrulayın.'],
        ],
    },
    time_ods: {
        controls: [
            ['Channels / geometry', 'Kanallar / geometri', 'Assign measured channels to physical points and directions. Orientation errors change the apparent deflection shape.', 'Kanalları fiziksel ölçüm noktalarına ve yönlerine atayın. Yön hataları görüntülenen sapma şeklini değiştirir.'],
            ['Reference and analysis band', 'Referans ve analiz bandı', 'Use a consistent phase reference and a physically relevant band. For order-referenced views, validate the RPM/tacho reference.', 'Tutarlı bir faz referansı ve incelenen olaya uygun bir frekans bandı kullanın. Order tabanlı görünümlerde RPM veya takometre referansını doğrulayın.'],
            ['Animation / measured amplitudes', 'Animasyon / ölçülmüş genlikler', 'Read units and animation scaling. Exaggerated displacement helps visualization but is not the actual physical motion.', 'Birimleri ve animasyon ölçeğini kontrol edin. Animasyondaki büyütülmüş yer değiştirme görselleştirme amaçlıdır; gerçek hareket genliğini göstermez.'],
        ],
    },
    shock_srs: {
        controls: [
            ['Input Unit / baseline correction', 'Giriş birimi / taban düzeltmesi', 'Check acceleration units and quiet-window baseline before integration or SRS. A residual offset can dominate low-frequency response.', 'İntegral veya SRS hesabından önce ivme birimini ve sessiz pencereye göre taban çizgisini kontrol edin. Kalan bir ofset düşük frekanslı tepkiye baskın gelebilir.'],
            ['Pulse Window', 'Darbe penceresi', 'Choose automatic or explicit pulse bounds and inspect the captured transient. The whole relevant pulse and decay must remain available.', 'Darbe sınırlarını otomatik veya elle belirleyip yakalanan geçici olayı inceleyin. Darbenin tamamı ve sonrasındaki sönümlenme pencere içinde kalmalıdır.'],
            ['Q / damping / frequency grid', 'Q / sönüm / frekans ızgarası', 'Q and damping are linked by Q = 1/(2ζ). Compare SRS only with matching damping, spectrum type and frequency coverage.', 'Q ve sönüm Q = 1/(2ζ) ile bağlıdır. SRS’leri eşleşen sönüm, spektrum tipi ve frekans kapsamıyla karşılaştırın.'],
        ],
    },
    bearing_fault: {
        controls: [
            ['Bearing / speed / gear geometry', 'Rulman / hız / dişli geometrisi', 'Select a valid bearing definition, measured speed and relevant gear tooth count. Expected frequencies depend on these inputs.', 'Doğru rulman tanımını, ölçülen hızı ve ilgili diş sayısını seçin. Beklenen arıza frekansları bu girdilerden hesaplanır.'],
            ['Band Selection / envelope limits', 'Bant seçimi / zarf sınırları', 'Compare the selected carrier band with actual resonant content. A kurtogram suggestion still needs physical review.', 'Taşıyıcı bandı gerçek rezonans içeriğiyle karşılaştırın. Kurtogram önerisi de fiziksel inceleme gerektirir.'],
            ['Cepstrum / residual harmonics', 'Kepstrum / kalıntı harmonikler', 'Set method-specific lifter or harmonic options and interpret the resulting evidence with speed, load and repeatability.', 'Yönteme özgü lifter veya harmonik seçeneklerini ayarlayıp kanıtı hız, yük ve tekrarlanabilirlikle yorumlayın.'],
        ],
    },
    kinematics_6dof: {
        controls: [
            ['Mode / sensor geometry', 'Mod / sensör geometrisi', 'Choose the supported kinematic workflow and map sensor positions and orientations. Six-DOF inference requires enough independent information.', 'Kullanılacak giriş modunu seçip sensör konumlarını ve yönlerini tanımlayın. Altı serbestlik derecesinin hesaplanması için yeterli sayıda bağımsız ölçüm gerekir.'],
            ['Domain / DC / drift correction', 'Alan / DC / kayma düzeltmesi', 'Inspect time or frequency-domain integration and baseline options. Correcting drift can also remove genuine low-frequency motion.', 'Zaman veya frekans alanında entegrasyon ve taban çizgisi seçeneklerini kontrol edin. Kayma düzeltmesi gerçek düşük frekanslı hareketi de bastırabilir.'],
            ['Weighting / RMS window', 'Ağırlıklandırma / RMS penceresi', 'Use the appropriate available vibration weighting and duration. Weighted acceleration and displacement are different physical results.', 'Değerlendirmeye uygun frekans ağırlıklandırmasını ve ölçüm süresini seçin. Ağırlıklı ivme ile yer değiştirme farklı fiziksel büyüklüklerdir.'],
        ],
    },
    cross_axis_compensation: {
        controls: [
            ['Axis mapping / input unit', 'Eksen eşlemesi / giriş birimi', 'Map X/Y/Z channels and signs to the calibration coordinate system. A matrix cannot correct a misidentified axis.', 'X/Y/Z kanallarını ve işaretlerini kalibrasyon koordinatına eşleyin. Matris yanlış tanımlanmış ekseni düzeltemez.'],
            ['Sensitivity ratio / Cross-axis %', 'Duyarlılık oranı / çapraz eksen %', 'Enter off-diagonal leakage in the selected convention. Two percent is a fraction of 0.02, not 2.', 'Eksenler arası sızıntıyı seçilen biçimde girin. %2, oran olarak 0,02’dir; 2 değildir.'],
            ['Matrix / coupling check', 'Matris / bağlaşım kontrolü', 'Use a credible calibration matrix and inspect conditioning and corrected coupling. Nearly singular inversion amplifies uncertainty.', 'Güvenilir bir kalibrasyon matrisi kullanın; koşul sayısını ve düzeltme sonrası bağlaşımı kontrol edin. Tekile yakın bir matrisin tersi belirsizliği büyütür.'],
        ],
    },
    cross_spectrum: {
        controls: [
            ['Mode / input and response', 'Mod / giriş ve cevap', 'Choose the analysis mode and keep input/output ordering explicit. Units determine whether the transfer is compliance, mobility or another quantity.', 'Analiz modunu seçin ve giriş/çıkış sırasını açıkça tanımlayın. Birimler, transfer fonksiyonunun esneklik (compliance), hareketlilik (mobility) veya başka bir büyüklük olduğunu belirler.'],
            ['NFFT / Overlap / Window', 'NFFT / örtüşme / pencere', 'Set block duration and spectral averaging consistently across channels. Longer blocks resolve finer frequencies but reduce time locality.', 'Blok süresini ve spektral ortalamayı kanallar arasında tutarlı ayarlayın. Uzun bloklar frekans çözünürlüğünü artırır, ancak zaman ayrımını azaltır.'],
            ['Average Count / Magnitude Scale', 'Ortalama sayısı / büyüklük ölçeği', 'Inspect coherence alongside magnitude and phase. A clean transfer curve can still be unreliable at weakly excited frequencies.', 'Genlik ve fazla birlikte koheransı da inceleyin. Düzgün görünen bir transfer eğrisi, zayıf uyarılmış frekanslarda yine de güvenilmez olabilir.'],
        ],
    },
    structural_health: {
        controls: [
            ['Channels / sample rate', 'Kanallar / örnekleme hızı', 'Choose comparable measurement points with verified units and time basis before comparing health indicators.', 'Göstergeleri karşılaştırmadan önce birimi ve zaman tabanı doğrulanmış, karşılaştırılabilir ölçüm noktaları seçin.'],
            ['Window Duration', 'Pencere süresi', 'Choose the time scale of the RMS trend. Short and long windows summarize events differently.', 'RMS trendinin zaman ölçeğini seçin. Kısa ve uzun pencereler olayları farklı biçimde özetler.'],
            ['ISO class / RMS threshold', 'ISO sınıfı / RMS eşiği', 'Treat the legacy class selection as context, not universal structural acceptance. Use thresholds justified for the actual asset and quantity.', 'ISO 10816 sınıf seçimini evrensel bir yapısal kabul ölçütü değil, bağlam bilgisi olarak değerlendirin. İzlenen yapıya ve ölçülen büyüklüğe uygun, gerekçelendirilmiş eşikler kullanın.'],
        ],
    },
    machine_health_overview: {
        controls: [
            ['Channel dashboard', 'Kanal paneli', 'Inspect RMS, peak and crest factor per channel. Keep sensor location, quantity and unit visible.', 'Kanal başına RMS, tepe ve crest factor inceleyin. Sensör konumu, büyüklük ve birimi görünür tutun.'],
            ['ISO group', 'ISO grubu', 'The interface retains an ISO 10816 group selector. Confirm applicable current asset guidance before turning its zone into an acceptance statement.', 'Arayüzde ISO 10816 grup seçimi bulunur. Bölge sonucunu bir kabul ifadesine dönüştürmeden önce makine için geçerli güncel standardı doğrulayın.'],
            ['Alarm RMS / Peak Threshold', 'Alarm RMS / tepe eşiği', 'Set physically justified thresholds in compatible units and inspect alarm context. An alarm is a prompt to investigate, not an automatic fault diagnosis.', 'Eşikleri uyumlu birimlerde ve gerekçelendirilmiş değerlerle ayarlayın, alarmları bağlamıyla inceleyin. Alarm bir inceleme gerektiğini gösterir; otomatik arıza teşhisi değildir.'],
        ],
    },
}

export const VIBRATION_CONTROL_IDS = Object.freeze(Object.keys(records))

export function vibrationControlTranslations(lang) {
    const index = lang === 'tr' ? 1 : 0
    return Object.fromEntries(Object.entries(records).map(([id, record]) => [id, {
        controls: record.controls.map((item) => ({ name: item[index], desc: item[index + 2] })),
    }]))
}
