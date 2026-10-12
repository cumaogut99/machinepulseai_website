// Supplement the existing, authored vibration courses with real control tours.
// Keep these separate from the full courses and from the future engineering groups.
const records = {
    rotor_balancing: {
        controls: [
            ['Selected 1X / keyphasor', 'Seçili 1X / keyphasor', 'Capture the measured synchronous vector using physical once-per-revolution edges. A typed RPM value cannot establish correction phase.', 'Fiziksel devirde-bir kenarlarla ölçülen senkron vektörü alın. Yazılmış RPM düzeltme fazını belirleyemez.'],
            ['Trial geometry / angle convention', 'Deneme geometrisi / açı tanımı', 'Record trial mass, radius, angle, rotation and viewing direction. The exposed beta is single-plane; maintain one angular datum throughout.', 'Deneme kütlesi, yarıçap, açı, dönme ve bakış yönünü kaydedin. Beta tek düzlemlidir; aynı açı referansını koruyun.'],
            ['Run guards / verification', 'Koşu kontrolleri / doğrulama', 'Inspect speed span, amplitude variation, phase deviation and minimum trial effect. Capture a measured verification run after correction.', 'Hız yayılımı, genlik değişimi, faz sapması ve asgari deneme etkisini inceleyin. Düzeltmeden sonra ölçülmüş doğrulama koşusu alın.'],
        ],
        exercise: ['What proves that an installed correction improved the machine?', 'Takılan düzeltmenin makineyi iyileştirdiğini ne kanıtlar?', ['A comparable measured verification run.', 'The predicted correction vector alone.'], ['Karşılaştırılabilir ölçülmüş doğrulama koşusu.', 'Yalnızca öngörülen düzeltme vektörü.'], 0, 'The influence coefficient predicts a response; the new physical run verifies it.', 'Etki katsayısı cevabı öngörür; yeni fiziksel koşu doğrular.'],
    },
    order_tracking: {
        controls: [
            ['Vibration / rotation reference', 'Titreşim / dönme referansı', 'Choose the vibration channel and valid RPM or tacho reference. Check dropouts before transforming time into angle.', 'Titreşim kanalı ve geçerli RPM veya tacho referansı seçin. Zamanı açıya dönüştürmeden önce kesintileri kontrol edin.'],
            ['Max Order / Order Resolution', 'En yüksek mertebe / mertebe çözünürlüğü', 'Choose order range and resolution from the machine question. Finer resolution needs more revolutions and reduces locality during a ramp.', 'Makine sorusuna göre aralık ve çözünürlük seçin. İnce çözünürlük daha çok devir ister ve hızlanmadaki yerelliği azaltır.'],
            ['Campbell / Vold–Kalman', 'Campbell / Vold–Kalman', 'Use a map for broad speed-dependent structure or single/multi-order extraction for selected tracks. Bandwidth determines how rapidly a track can vary.', 'Geniş hız yapısı için harita, seçili izler için tek/çok mertebe çıkarımı kullanın. Bant genişliği izin değişim hızını belirler.'],
        ],
        exercise: ['At 1,800 RPM, where is a 3× component in frequency?', '1.800 RPM’de 3× bileşen hangi frekansta?', ['90 Hz.', '3 Hz.'], ['90 Hz.', '3 Hz.'], 0, '1,800/60 gives 30 revolutions per second; the third order is 90 Hz.', '1.800/60 saniyede 30 devir verir; üçüncü mertebe 90 Hz’dir.'],
    },
    torsional_vibration: {
        controls: [
            ['Mode / encoder type', 'Mod / enkoder tipi', 'Choose the rotational or twist workflow and the actual sensor type. Tooth count and missing-tooth settings define how edges become angle.', 'Dönel veya burulma akışını ve gerçek sensör tipini seçin. Diş sayısı ve eksik diş ayarı kenarların açıya dönüşmesini tanımlar.'],
            ['Missing teeth / gap ratio', 'Eksik dişler / boşluk oranı', 'Configure known encoder gaps so an intentional missing tooth is not mistaken for a speed fluctuation.', 'Bilinen enkoder boşluklarını tanımlayın; kasıtlı eksik diş hız dalgalanması sanılmamalıdır.'],
            ['Speed ratio / phase offset', 'Hız oranı / faz ofseti', 'For two references, verify speed ratio, direction and static phase offset before interpreting dynamic twist.', 'İki referansta dinamik burulmayı yorumlamadan önce hız oranı, yön ve statik faz ofsetini doğrulayın.'],
        ],
        exercise: ['Can a missing encoder tooth look like a speed disturbance if not configured?', 'Tanımlanmamış eksik enkoder dişi hız bozulmasına benzeyebilir mi?', ['Yes; edge interpretation needs the encoder geometry.', 'No; all edge spacings represent equal angles.'], ['Evet; kenar yorumu enkoder geometrisi gerektirir.', 'Hayır; tüm kenar aralıkları eşit açıdır.'], 0, 'An intentional gap changes edge spacing without the same change in physical shaft speed.', 'Kasıtlı boşluk fiziksel mil hızında aynı değişim olmadan kenar aralığını değiştirir.'],
    },
    modal_analysis: {
        controls: [
            ['Input / response mapping', 'Giriş / cevap eşlemesi', 'Identify measured excitation and response DOFs with geometry and units. A response-only measurement belongs to OMA, not an ordinary measured-force FRF.', 'Ölçülmüş uyarım ve cevap serbestliklerini geometri ve birimlerle belirleyin. Yalnızca cevap ölçümü normal ölçülmüş-kuvvet FRF değil OMA’dır.'],
            ['FRF Estimator / Block Size', 'FRF tahmincisi / blok boyutu', 'Choose H1, H2 or Hv with a stated noise assumption. Block duration defines frequency spacing and must capture the decay.', 'Belirtilmiş gürültü varsayımıyla H1, H2 veya Hv seçin. Blok süresi frekans aralığını belirler ve sönümü yakalamalıdır.'],
            ['Model order / stabilization tolerances', 'Model derecesi / kararlılık toleransları', 'Inspect persistent poles over model orders and confirm shapes and damping. A single attractive peak is not a validated mode.', 'Model derecelerinde kalıcı kutupları inceleyip şekil ve sönümü doğrulayın. Tek çekici tepe doğrulanmış mod değildir.'],
        ],
        exercise: ['What is stronger evidence for a physical mode?', 'Fiziksel mod için hangi kanıt daha güçlü?', ['A stable pole with a plausible shape across model orders.', 'Any isolated spectral peak.'], ['Model derecelerinde kararlı kutup ve makul şekil.', 'Herhangi tek spektral tepe.'], 0, 'Modal validation combines frequency, damping, pole stability and spatial behaviour.', 'Modal doğrulama frekans, sönüm, kutup kararlılığı ve uzamsal davranışı birleştirir.'],
    },
    operational_modal_analysis: {
        controls: [
            ['Algorithm', 'Algoritma', 'Choose SSI, FDD or EFDD from the available workflow and the excitation assumptions. Operational harmonics can imitate structural modes.', 'Mevcut akış ve uyarım varsayımlarına göre SSI, FDD veya EFDD seçin. İşletme harmonikleri yapısal modlara benzeyebilir.'],
            ['Model order / block rows', 'Model derecesi / blok satırları', 'Set identification depth and inspect stability across orders. More states do not automatically create better physical modes.', 'Tanımlama derinliğini ayarlayıp dereceler arasında kararlılığı inceleyin. Fazla durum kendiliğinden daha iyi mod üretmez.'],
            ['Frequency band / spectral parameters', 'Frekans bandı / spektral parametreler', 'Focus the band and set FDD/EFDD block, overlap and window where applicable. Validate singular-value peaks with shapes and MAC.', 'Bandı daraltıp uygunsa FDD/EFDD blok, örtüşme ve pencereyi ayarlayın. Tekil değer tepelerini şekil ve MAC ile doğrulayın.'],
        ],
        exercise: ['Does every narrow operational peak identify a structural mode?', 'Her dar işletme tepesi yapısal mod belirler mi?', ['No; deterministic harmonics need separation.', 'Yes; response peaks are always modes.'], ['Hayır; deterministik harmonikler ayrılmalıdır.', 'Evet; cevap tepeleri daima moddur.'], 0, 'A periodic load can create a narrow response without identifying a structural pole.', 'Periyodik yük yapısal kutup tanımlamadan dar cevap oluşturabilir.'],
    },
    time_ods: {
        controls: [
            ['Channels / geometry', 'Kanallar / geometri', 'Assign measured channels to physical points and directions. Orientation errors change the apparent deflection shape.', 'Kanalları fiziksel nokta ve yönlere atayın. Yön hataları görünür deformasyon şeklini değiştirir.'],
            ['Reference and analysis band', 'Referans ve analiz bandı', 'Use a consistent phase reference and a physically relevant band. For order-referenced views, validate the RPM/tacho reference.', 'Tutarlı faz referansı ve fiziksel ilgili bant kullanın. Mertebe referansında RPM/tacho doğrulayın.'],
            ['Animation / measured amplitudes', 'Animasyon / ölçülmüş genlikler', 'Read units and animation scaling. Exaggerated displacement helps visualization but is not the actual physical motion.', 'Birimleri ve animasyon ölçeğini okuyun. Büyütülmüş yer değiştirme görselleştirmedir, gerçek hareket değildir.'],
        ],
        exercise: ['Is an operating deflection shape automatically a normal mode?', 'İşletme deformasyon şekli otomatik olarak doğal mod mudur?', ['No; it includes the operating excitation response.', 'Yes; every animation is a normal mode.'], ['Hayır; işletme uyarımına cevabı içerir.', 'Evet; her animasyon doğal moddur.'], 0, 'ODS describes measured operation; modal identification asks a different question.', 'ODS ölçülmüş işletmeyi anlatır; modal tanımlama farklı soru sorar.'],
    },
    shock_srs: {
        controls: [
            ['Input Unit / baseline correction', 'Giriş birimi / taban düzeltmesi', 'Check acceleration units and quiet-window baseline before integration or SRS. A residual offset can dominate low-frequency response.', 'İntegral veya SRS’den önce ivme birimini ve sessiz-pencere tabanını kontrol edin. Artık ofset düşük frekans cevabına hakim olabilir.'],
            ['Pulse Window', 'Darbe penceresi', 'Choose automatic or explicit pulse bounds and inspect the captured transient. The whole relevant pulse and decay must remain available.', 'Otomatik veya açık darbe sınırı seçip yakalanan geçişi inceleyin. İlgili darbe ve sönüm kapsamda kalmalıdır.'],
            ['Q / damping / frequency grid', 'Q / sönüm / frekans ızgarası', 'Q and damping are linked by Q = 1/(2ζ). Compare SRS only with matching damping, spectrum type and frequency coverage.', 'Q ve sönüm Q = 1/(2ζ) ile bağlıdır. SRS’leri eşleşen sönüm, spektrum tipi ve frekans kapsamıyla karşılaştırın.'],
        ],
        exercise: ['What damping ratio corresponds to Q = 10?', 'Q = 10 hangi sönüm oranıdır?', ['5%.', '10%.'], ['%5.', '%10.'], 0, 'ζ = 1/(2Q) = 0.05. Changing damping changes the oscillator response spectrum.', 'ζ = 1/(2Q) = 0,05. Sönüm değişimi salınıcı cevap spektrumunu değiştirir.'],
    },
    bearing_fault: {
        controls: [
            ['Bearing / speed / gear geometry', 'Rulman / hız / dişli geometrisi', 'Select a valid bearing definition, measured speed and relevant gear tooth count. Expected frequencies depend on these inputs.', 'Geçerli rulman tanımı, ölçülmüş hız ve ilgili diş sayısı seçin. Beklenen frekanslar bu girdilere bağlıdır.'],
            ['Band Selection / envelope limits', 'Bant seçimi / zarf sınırları', 'Compare the selected carrier band with actual resonant content. A kurtogram suggestion still needs physical review.', 'Taşıyıcı bandı gerçek rezonans içeriğiyle karşılaştırın. Kurtogram önerisi de fiziksel inceleme gerektirir.'],
            ['Cepstrum / residual harmonics', 'Cepstrum / artık harmonikler', 'Set method-specific lifter or harmonic options and interpret the resulting evidence with speed, load and repeatability.', 'Yönteme özgü lifter veya harmonik seçeneklerini ayarlayıp kanıtı hız, yük ve tekrarlanabilirlikle yorumlayın.'],
        ],
        exercise: ['Is one line near a calculated bearing frequency a confirmed fault?', 'Hesaplanan rulman frekansı yakınındaki tek çizgi doğrulanmış arıza mı?', ['No; confirm harmonics, sidebands and physical context.', 'Yes; frequency proximity is sufficient.'], ['Hayır; harmonik, yan bant ve fiziksel bağlamla doğrulayın.', 'Evet; frekans yakınlığı yeterlidir.'], 0, 'Diagnostic confidence comes from consistent patterns and operating evidence, not a single coincidence.', 'Tanılama güveni tek rastlantıdan değil tutarlı desen ve işletme kanıtından gelir.'],
    },
    kinematics_6dof: {
        controls: [
            ['Mode / sensor geometry', 'Mod / sensör geometrisi', 'Choose the supported kinematic workflow and map sensor positions and orientations. Six-DOF inference requires enough independent information.', 'Desteklenen kinematik akışı seçip sensör konum ve yönlerini eşleyin. Altı serbestlik çıkarımı yeterli bağımsız bilgi gerektirir.'],
            ['Domain / DC / drift correction', 'Alan / DC / sürüklenme düzeltmesi', 'Inspect time or frequency-domain integration and baseline options. Correcting drift can also remove genuine low-frequency motion.', 'Zaman veya frekans integrali ve taban seçeneklerini inceleyin. Sürüklenme düzeltmek gerçek düşük frekans hareketini de kaldırabilir.'],
            ['Weighting / RMS window', 'Ağırlıklandırma / RMS penceresi', 'Use the appropriate available vibration weighting and duration. Weighted acceleration and displacement are different physical results.', 'Uygun mevcut titreşim ağırlığı ve süreyi kullanın. Ağırlıklı ivme ve yer değiştirme farklı fiziksel sonuçlardır.'],
        ],
        exercise: ['Does double integration automatically yield drift-free displacement?', 'Çift integral otomatik sürüklenmesiz yer değiştirme verir mi?', ['No; bias and initial conditions matter.', 'Yes; integration cancels sensor bias.'], ['Hayır; sapma ve başlangıç koşulları önemlidir.', 'Evet; integral sensör sapmasını kaldırır.'], 0, 'Bias accumulates under integration; calibration and baseline treatment remain essential.', 'Sapma integral altında birikir; kalibrasyon ve taban yaklaşımı önemini korur.'],
    },
    cross_axis_compensation: {
        controls: [
            ['Axis mapping / input unit', 'Eksen eşlemesi / giriş birimi', 'Map X/Y/Z channels and signs to the calibration coordinate system. A matrix cannot correct a misidentified axis.', 'X/Y/Z kanallarını ve işaretlerini kalibrasyon koordinatına eşleyin. Matris yanlış tanımlanmış ekseni düzeltemez.'],
            ['Sensitivity ratio / Cross-axis %', 'Duyarlılık oranı / çapraz eksen %', 'Enter off-diagonal leakage in the selected convention. Two percent is a fraction of 0.02, not 2.', 'Çapraz sızıntıyı seçilen tanımda girin. Yüzde iki kesir olarak 0,02’dir, 2 değil.'],
            ['Matrix / coupling check', 'Matris / bağlaşım kontrolü', 'Use a credible calibration matrix and inspect conditioning and corrected coupling. Nearly singular inversion amplifies uncertainty.', 'Güvenilir kalibrasyon matrisi kullanıp koşulluluğu ve düzeltilmiş bağlaşımı inceleyin. Neredeyse tekil tersleme belirsizliği büyütür.'],
        ],
        exercise: ['What ratio represents 2% cross-axis sensitivity?', 'Yüzde 2 çapraz eksen duyarlılığının oranı nedir?', ['0.02.', '2.0.'], ['0,02.', '2,0.'], 0, 'Percent entries are divided by 100 when represented as leakage fractions.', 'Yüzde değerleri sızıntı kesri olarak gösterilirken 100’e bölünür.'],
    },
    cross_spectrum: {
        controls: [
            ['Mode / input and response', 'Mod / giriş ve cevap', 'Choose the analysis mode and keep input/output ordering explicit. Units determine whether the transfer is compliance, mobility or another quantity.', 'Analiz modunu seçip giriş/çıkış sırasını açık tutun. Birimler aktarımın esneklik, hareketlilik veya başka büyüklük olmasını belirler.'],
            ['NFFT / Overlap / Window', 'NFFT / örtüşme / pencere', 'Set block duration and spectral averaging consistently across channels. Longer blocks resolve finer frequencies but reduce time locality.', 'Kanallar arasında blok süresi ve ortalamayı tutarlı ayarlayın. Uzun blok frekansı inceltir fakat zaman yerelliğini azaltır.'],
            ['Average Count / Magnitude Scale', 'Ortalama sayısı / büyüklük ölçeği', 'Inspect coherence alongside magnitude and phase. A clean transfer curve can still be unreliable at weakly excited frequencies.', 'Büyüklük ve faz yanında koheransı inceleyin. Temiz aktarım eğrisi zayıf uyarılmış frekansta yine güvenilmez olabilir.'],
        ],
        exercise: ['Does high coherence alone prove the entire FRF is correct?', 'Yüksek koherans tek başına tüm FRF’nin doğruluğunu kanıtlar mı?', ['No; calibration, excitation and assumptions also matter.', 'Yes; it validates every measurement detail.'], ['Hayır; kalibrasyon, uyarım ve varsayımlar da önemlidir.', 'Evet; tüm ölçüm ayrıntılarını doğrular.'], 0, 'Coherence describes a relationship; systematic calibration errors can remain highly coherent.', 'Koherans ilişkiyi anlatır; sistematik kalibrasyon hataları yüksek koheranslı kalabilir.'],
    },
    structural_health: {
        controls: [
            ['Channels / sample rate', 'Kanallar / örnekleme hızı', 'Choose comparable measurement points with verified units and time basis before comparing health indicators.', 'Sağlık göstergelerinden önce doğrulanmış birim ve zaman temelli karşılaştırılabilir noktalar seçin.'],
            ['Window Duration', 'Pencere süresi', 'Choose the time scale of the RMS trend. Short and long windows summarize events differently.', 'RMS eğiliminin zaman ölçeğini seçin. Kısa ve uzun pencere olayları farklı özetler.'],
            ['ISO class / RMS threshold', 'ISO sınıfı / RMS eşiği', 'Treat the legacy class selection as context, not universal structural acceptance. Use thresholds justified for the actual asset and quantity.', 'Eski sınıf seçimini evrensel yapısal kabul değil bağlam sayın. Gerçek varlık ve büyüklük için gerekçeli eşik kullanın.'],
        ],
        exercise: ['Can a health trend change because operating load changed?', 'Çalışma yükü değiştiği için sağlık eğilimi değişebilir mi?', ['Yes; compare like operating conditions.', 'No; every change means structural damage.'], ['Evet; benzer çalışma koşullarını karşılaştırın.', 'Hayır; her değişim yapısal hasardır.'], 0, 'A trend change needs operational context and corroborating evidence before a damage claim.', 'Hasar iddiasından önce eğilim değişimi işletme bağlamı ve destekleyen kanıt gerektirir.'],
    },
    machine_health_overview: {
        controls: [
            ['Channel dashboard', 'Kanal dashboard’ı', 'Inspect RMS, peak and crest factor per channel. Keep sensor location, quantity and unit visible.', 'Kanal başına RMS, tepe ve crest factor inceleyin. Sensör konumu, büyüklük ve birimi görünür tutun.'],
            ['ISO group', 'ISO grubu', 'The interface retains an ISO 10816 group selector. Confirm applicable current asset guidance before turning its zone into an acceptance statement.', 'Arayüz ISO 10816 grup seçimini korur. Bölgeyi kabul ifadesine çevirmeden önce varlığın geçerli güncel kılavuzunu doğrulayın.'],
            ['Alarm RMS / Peak Threshold', 'Alarm RMS / tepe eşiği', 'Set physically justified thresholds in compatible units and inspect alarm context. An alarm is a prompt to investigate, not an automatic fault diagnosis.', 'Uyumlu birimde fiziksel gerekçeli eşik ayarlayıp alarm bağlamını inceleyin. Alarm inceleme çağrısıdır, otomatik arıza teşhisi değildir.'],
        ],
        exercise: ['Does a high crest factor identify a specific bearing fault?', 'Yüksek crest factor belirli rulman arızasını tanımlar mı?', ['No; inspect the waveform and diagnostic patterns.', 'Yes; one scalar identifies the fault.'], ['Hayır; dalgayı ve tanılama desenlerini inceleyin.', 'Evet; tek skaler arızayı belirler.'], 0, 'Crest factor measures peak relative to RMS and has several possible physical causes.', 'Crest factor tepeyi RMS’e göre ölçer; birden fazla fiziksel nedeni olabilir.'],
    },
}

export const VIBRATION_CONTROL_IDS = Object.freeze(Object.keys(records))

export function vibrationControlTranslations(lang) {
    const index = lang === 'tr' ? 1 : 0
    return Object.fromEntries(Object.entries(records).map(([id, record]) => [id, {
        controls: record.controls.map((item) => ({ name: item[index], desc: item[index + 2] })),
        exercise: {
            question: record.exercise[index], options: record.exercise[index + 2],
            correct: record.exercise[4], explanation: record.exercise[index + 5],
        },
    }]))
}
