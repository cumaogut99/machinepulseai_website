// Interface tours: shock, kinematics and sensor-axis correction.
// Every string pair is [en, tr]. Hotspot positions come from tourAnchors.js.

import KINEMATICS_TOURS from './kinematics.js'

const pt = (id, title, desc) => ({ id, title, desc })

export default {
    ...KINEMATICS_TOURS,

    shock_srs: [
        {
            id: 'setup',
            tab: ['Setup + SRS', 'Kurulum + SRS'],
            summary: [
                'A +120 g, 10 ms half-sine pulse isolated with the navigator (4–6 s). The maximax shock response spectrum is computed at Q = 10.',
                'Navigatörle ayrılmış +120 g, 10 ms yarım sinüs darbe (4–6 s). Maksimaks şok cevap spektrumu Q = 10’da hesaplanır.',
            ],
            points: [
                pt('source', ['Source and baseline correction', 'Kaynak ve taban düzeltmesi'], [
                    'Input Unit declares the acceleration unit (g here). “Apply signal correction” with Robust baseline removes sensor offset estimated from a quiet window before the pulse, because a residual offset integrates into large false low-frequency response.',
                    'Input Unit ivme birimini belirtir (burada g). “Apply signal correction” ve Robust baseline, darbe öncesindeki sessiz pencereden tahmin edilen sensör ofsetini kaldırır; artık ofset integralle büyük sahte düşük frekans cevabına dönüşür.',
                ]),
                pt('model', ['Oscillator model', 'Salınıcı modeli'], [
                    'Q factor and damping ratio are linked by Q = 1/(2ζ): Q = 10 is 5 % damping. Spectra chooses maximax, positive/negative and primary/residual curves. The solver is the Smallwood ramp-invariant filter following ISO 18431-4, fixed so results stay comparable.',
                    'Q faktörü ve sönüm oranı Q = 1/(2ζ) ile bağlıdır: Q = 10, %5 sönümdür. Spectra maksimaks, pozitif/negatif ve birincil/artık eğrilerini seçer. Çözücü ISO 18431-4’e uygun Smallwood rampa-değişmez filtresidir ve sonuçlar karşılaştırılabilir kalsın diye sabittir.',
                ]),
                pt('pulse', ['Shock pulse characterisation', 'Şok darbesi tanımlaması'], [
                    'With “Characterize shock pulse” on, the pulse window is found automatically from a threshold (10 % of peak) or entered manually, with start and end offsets. Peak, duration, ΔV and pulse shape are measured inside this window.',
                    '“Characterize shock pulse” açıkken darbe penceresi bir eşikten (tepenin %10’u) otomatik bulunur veya başlangıç ve bitiş ofsetleriyle elle girilir. Tepe, süre, ΔV ve darbe şekli bu pencerede ölçülür.',
                ]),
                pt('display', ['Response tabs and split curves', 'Cevap sekmeleri ve ayrık eğriler'], [
                    'Shows or hides the pseudo-velocity / 4CP and relative-displacement tabs, and the primary (during the pulse) and residual (after the pulse) curves. These are display choices on the cached result.',
                    'Sözde hız / 4CP ve göreli yer değiştirme sekmelerini ve birincil (darbe sırasında) ile artık (darbe sonrası) eğrileri gösterir veya gizler. Önbellekteki sonuç üzerinde görünüm seçimleridir.',
                ]),
                pt('navigator', ['Isolate one event', 'Tek bir olayı ayırın'], [
                    'The record holds several shocks; the navigator cursors select one event plus enough quiet time for the decay. An SRS of several events mixed together describes none of them.',
                    'Kayıt birden çok şok içerir; navigatör imleçleri tek bir olayı ve sönüm için yeterli sessiz süreyi seçer. Birden çok olayı karıştıran SRS hiçbirini tarif etmez.',
                ]),
                pt('srs', ['Maximax SRS', 'Maksimaks SRS'], [
                    'Peak absolute acceleration of a bank of single-degree-of-freedom oscillators versus natural frequency, on log–log axes. Low frequencies rise with the velocity change of the pulse; high frequencies settle to the input peak (about 120 g).',
                    'Bir tek serbestlik dereceli salınıcı bankasının doğal frekansa karşı tepe mutlak ivmesi, log–log eksenlerde. Düşük frekanslar darbenin hız değişimiyle yükselir; yüksek frekanslar giriş tepesine (yaklaşık 120 g) oturur.',
                ]),
                pt('channels', ['Acceleration signal', 'İvme sinyali'], [
                    'The single acceleration channel to analyse; Auto-detect fills it from channel names.',
                    'Analiz edilecek tek ivme kanalı; Auto-detect onu kanal adlarından doldurur.',
                ]),
            ],
        },
        {
            id: 'spectrum',
            tab: ['Spectrum + Test reference', 'Spektrum + Test referansı'],
            summary: [
                'Frequency grid and a test specification with +6 / −3 dB tolerances drawn over the SRS.',
                'Frekans ızgarası ve SRS üzerine çizilen +6 / −3 dB toleranslı test spesifikasyonu.',
            ],
            points: [
                pt('frequency', ['Frequency grid', 'Frekans ızgarası'], [
                    'Octave spacing and points per octave set the density of natural frequencies (1/12 octave here); Min and Max set the range. Comparing two SRS curves is only valid with the same grid and damping.',
                    'Oktav aralığı ve oktav başına nokta doğal frekans yoğunluğunu belirler (burada 1/12 oktav); Min ve Max aralığı belirler. İki SRS eğrisini karşılaştırmak yalnızca aynı ızgara ve sönümle geçerlidir.',
                ]),
                pt('reference', ['Test-spectrum compliance', 'Test spektrumu uyumu'], [
                    'Enable the reference, enter breakpoints (frequency, level) and the upper/lower tolerances in dB. Interpolation between breakpoints is fixed log–log, as in shock test standards.',
                    'Referansı açın; kırılma noktalarını (frekans, seviye) ve dB cinsinden üst/alt toleransları girin. Kırılma noktaları arası enterpolasyon şok test standartlarındaki gibi log–log olarak sabittir.',
                ]),
                pt('srs_reference', ['SRS against the specification', 'Spesifikasyona karşı SRS'], [
                    'The reference and its tolerance band are drawn with the measured SRS; segments outside the band are highlighted in red. Here the low-frequency end leaves the band, so the summary reports the test as failing with the largest deviation and its frequency.',
                    'Referans ve tolerans bandı ölçülen SRS ile birlikte çizilir; bant dışındaki bölümler kırmızıyla vurgulanır. Burada düşük frekans ucu bandın dışına çıkar; özet testi en büyük sapma ve frekansıyla başarısız olarak raporlar.',
                ]),
            ],
        },
        {
            id: 'results',
            tab: ['Results + Nomogram', 'Sonuçlar + Nomogram'],
            summary: [
                'Pulse summary on the right and the pseudo-velocity four-coordinate (4CP) nomogram.',
                'Sağda darbe özeti ve sözde hız dört koordinatlı (4CP) nomogram.',
            ],
            points: [
                pt('summary', ['Pulse summary and verdict', 'Darbe özeti ve karar'], [
                    'Peak 120 g, pulse duration 9.2 ms at the 10 % threshold, ΔV 7.43 m/s, rise time, crest factor and a classified half-sine shape, plus the test-spec result. These are measured on the time signal inside the pulse window.',
                    'Tepe 120 g, %10 eşikte 9,2 ms darbe süresi, ΔV 7,43 m/s, yükselme süresi, crest factor ve sınıflandırılmış yarım sinüs şekli ile test spesifikasyonu sonucu. Bunlar darbe penceresindeki zaman sinyalinde ölçülür.',
                ]),
                pt('nomogram', ['Four-coordinate nomogram', 'Dört koordinatlı nomogram'], [
                    'Pseudo-velocity against frequency with diagonal lines of constant displacement and acceleration. One curve shows all three severities at once — the usual way to compare shocks against equipment fragility.',
                    'Frekansa karşı sözde hız; sabit yer değiştirme ve ivme için çapraz çizgilerle. Tek eğri üç şiddeti birden gösterir — şokları ekipman hassasiyetiyle karşılaştırmanın olağan yolu.',
                ]),
            ],
        },
        {
            id: 'displacement',
            tab: ['Relative displacement', 'Göreli yer değiştirme'],
            summary: [
                'Peak relative displacement of each oscillator: the deflection a mounted component would experience.',
                'Her salınıcının tepe göreli yer değiştirmesi: monte edilmiş bir bileşenin yaşayacağı sapma.',
            ],
            points: [
                pt('displacement', ['Relative displacement SRS', 'Göreli yer değiştirme SRS'], [
                    'Falls steeply with frequency: stiff components barely deflect, soft mounts move a lot. Use it to check clearances and sway space, which acceleration alone does not show.',
                    'Frekansla hızla düşer: rijit bileşenler neredeyse sapma yapmaz, yumuşak bağlantılar çok hareket eder. İvmenin tek başına göstermediği boşluk ve salınım mesafesini kontrol etmek için kullanın.',
                ]),
                pt('summary', ['Same pulse, same window', 'Aynı darbe, aynı pencere'], [
                    'The summary stays tied to the analysed pulse, so every response view describes the same event.',
                    'Özet analiz edilen darbeye bağlı kalır; böylece her cevap görünümü aynı olayı tarif eder.',
                ]),
            ],
        },
        {
            id: 'posneg',
            tab: ['Markers + Pos / Neg', 'İşaretçiler + Pozitif / Negatif'],
            summary: [
                'Positive and negative spectra separated, with a frequency marker at 100 Hz.',
                'Pozitif ve negatif spektrumlar ayrılmış; 100 Hz’de bir frekans işaretçisi.',
            ],
            points: [
                pt('interaction', ['Plot interaction', 'Grafik etkileşimi'], [
                    'Click any SRS view to place a marker; Snap moves it to the nearest result point.',
                    'İşaretçi eklemek için herhangi bir SRS görünümüne tıklayın; Snap onu en yakın sonuç noktasına taşır.',
                ]),
                pt('srs_markers', ['SRS frequency markers', 'SRS frekans işaretçileri'], [
                    'Markers and delta pairs are shared by SRS, Nomogram, Displacement and Pos / Neg, so one natural frequency is read on every response quantity.',
                    'İşaretçiler ve fark çiftleri SRS, Nomogram, Displacement ve Pos / Neg arasında paylaşılır; tek doğal frekans her cevap büyüklüğünde okunur.',
                ]),
                pt('extrema', ['Frequency-range extrema', 'Frekans aralığı ekstremumları'], [
                    'Finds the largest responses within a frequency range and adds them as markers.',
                    'Bir frekans aralığındaki en büyük cevapları bulur ve işaretçi olarak ekler.',
                ]),
                pt('posneg', ['Positive vs negative response', 'Pozitif ve negatif cevap'], [
                    'The two curves are the largest positive and negative oscillator responses. For a single-sided pulse they differ strongly above the pulse’s main frequency — a symmetric test fixture or a reversed sensor shows up immediately.',
                    'İki eğri en büyük pozitif ve negatif salınıcı cevaplarıdır. Tek yönlü darbede darbenin ana frekansının üstünde belirgin biçimde ayrışırlar — simetrik bir fikstür veya ters takılmış sensör hemen anlaşılır.',
                ]),
                pt('table', ['Marker table', 'İşaretçi tablosu'], [
                    'Lists marker values for the active graph; rename, remove, clear or export as CSV.',
                    'Etkin grafik için işaretçi değerlerini listeler; yeniden adlandırın, silin, temizleyin veya CSV olarak aktarın.',
                ]),
            ],
        },
    ],

    cross_axis_compensation: [
        {
            id: 'setup',
            tab: ['Setup + Time', 'Kurulum + Zaman'],
            summary: [
                'A triaxial accelerometer with known cross-axis leakage. The measured sensitivity matrix S is entered and its inverse is applied to the raw X/Y/Z signals.',
                'Bilinen çapraz eksen sızıntısı olan üç eksenli ivmeölçer. Ölçülmüş duyarlılık matrisi S girilir ve tersi ham X/Y/Z sinyallerine uygulanır.',
            ],
            points: [
                pt('source', ['Source', 'Kaynak'], [
                    'Input Unit of the raw channels, the read-only sample rate and the navigator trace. All three axes must share one time base.',
                    'Ham kanalların giriş birimi, salt okunur örnekleme hızı ve navigatör izi. Üç eksen aynı zaman tabanını paylaşmalıdır.',
                ]),
                pt('matrix', ['Sensitivity matrix S', 'Duyarlılık matrisi S'], [
                    'Rows are measured axes, columns true axes (measured = S × true). Off-diagonal values are entered as a sensitivity ratio or as cross-axis %; 8 % is a ratio of 0.08, not 8. The check line reports the condition number and the maximum noise gain of the inverse — a nearly singular matrix would amplify noise. Identity Matrix resets it.',
                    'Satırlar ölçülen, sütunlar gerçek eksenlerdir (ölçülen = S × gerçek). Köşegen dışı değerler duyarlılık oranı veya çapraz eksen yüzdesi olarak girilir; %8, 8 değil 0,08 orandır. Kontrol satırı koşul sayısını ve tersin en büyük gürültü kazancını raporlar — neredeyse tekil matris gürültüyü büyütür. Identity Matrix sıfırlar.',
                ]),
                pt('gate', ['Acceptance gate', 'Kabul kapısı'], [
                    'Max coupling proxy sets the allowed residual coupling in dB. After Compute it reports PASS or FAIL as a safety gate on the corrected data, not as a calibration certificate.',
                    'Max coupling proxy izin verilen artık bağlaşımı dB olarak belirler. Compute sonrası düzeltilmiş veri için PASS veya FAIL verir; bu bir kalibrasyon sertifikası değil, güvenlik kapısıdır.',
                ]),
                pt('navigator', ['Analysed span', 'Analiz aralığı'], [
                    'The selected span (the three-axis operational section here) is compensated and evaluated. The single-axis shake windows earlier in the record are used for calibration instead.',
                    'Seçili aralık (burada üç eksenli işletme bölümü) düzeltilir ve değerlendirilir. Kaydın başındaki tek eksenli sarsma pencereleri ise kalibrasyon için kullanılır.',
                ]),
                pt('time', ['Raw vs compensated', 'Ham ve düzeltilmiş'], [
                    'Raw and compensated X/Y/Z on a shared time axis using a peak-preserving Min-Max overview. Markers read the same source row on every trace.',
                    'Ham ve düzeltilmiş X/Y/Z, tepe koruyan Min-Max özetiyle ortak zaman ekseninde. İşaretçiler her izde aynı kaynak satırını okur.',
                ]),
                pt('channels', ['Axis mapping', 'Eksen eşlemesi'], [
                    'X Raw, Y Raw and Z Raw must follow the calibration coordinate system, including sign. A matrix cannot correct a misidentified axis.',
                    'X Raw, Y Raw ve Z Raw işaret dahil kalibrasyon koordinat sistemine uymalıdır. Matris yanlış tanımlanmış bir ekseni düzeltemez.',
                ]),
            ],
        },
        {
            id: 'spectrum',
            tab: ['Spectrum & Coherence', 'Spektrum ve Koherans'],
            summary: [
                'How much each axis still shares with the others in frequency, before and after compensation.',
                'Her eksenin diğerleriyle frekansta hâlâ ne kadar ortak içerik taşıdığı; düzeltme öncesi ve sonrası.',
            ],
            points: [
                pt('spectrum', ['Spectra and inter-axis coherence', 'Spektrumlar ve eksenler arası koherans'], [
                    'Spectra of raw and compensated axes with the coherence between them. Leakage shows as one axis’s tone appearing on another with high coherence; after compensation that shared content should fall.',
                    'Ham ve düzeltilmiş eksenlerin spektrumları ve aralarındaki koherans. Sızıntı, bir eksenin tonunun yüksek koheransla diğerinde görünmesidir; düzeltmeden sonra bu ortak içerik azalmalıdır.',
                ]),
                pt('gate', ['Gate result', 'Kapı sonucu'], [
                    'The residual coupling proxy reported in the Acceptance Gate group is the summary of this comparison.',
                    'Kabul kapısı grubunda raporlanan artık bağlaşım vekili bu karşılaştırmanın özetidir.',
                ]),
            ],
        },
        {
            id: 'matrix',
            tab: ['Calibration + Matrix', 'Kalibrasyon + Matris'],
            summary: [
                'Where the matrix comes from: estimated from controlled single-axis shakes or imported from a calibration sheet.',
                'Matrisin kaynağı: kontrollü tek eksenli sarsmalardan tahmin veya kalibrasyon sertifikasından içe aktarma.',
            ],
            points: [
                pt('calibrate', ['Estimate from data', 'Veriden tahmin'], [
                    'For a controlled single-axis shake, select one driven-axis window with the navigator and run “Estimate Matrix from Data” — once per axis (X, then Y, then Z). Each run fills that axis’s column of S.',
                    'Kontrollü tek eksenli sarsma için navigatörle tek bir sürülen eksen penceresi seçip “Estimate Matrix from Data” çalıştırın — her eksen için bir kez (X, sonra Y, sonra Z). Her koşu S’nin o eksene ait sütununu doldurur.',
                ]),
                pt('import', ['Import a calibration sheet', 'Kalibrasyon sertifikası içe aktarma'], [
                    'Load a CSV with cross-axis percentages (as on a certificate) or a full 3×3 sensitivity-ratio block. Input channels must already be calibrated in engineering units.',
                    'Çapraz eksen yüzdeleri (sertifikadaki gibi) veya tam 3×3 duyarlılık oranı bloğu içeren CSV yükleyin. Giriş kanalları mühendislik birimlerinde kalibre edilmiş olmalıdır.',
                ]),
                pt('matrix_view', ['Applied matrix and inverse', 'Uygulanan matris ve tersi'], [
                    'Shows S, the inverse S⁻¹ actually applied and the condition number (1.18 here — well conditioned).',
                    'S’yi, gerçekte uygulanan ters S⁻¹’i ve koşul sayısını gösterir (burada 1,18 — iyi koşullu).',
                ]),
            ],
        },
        {
            id: 'metrics',
            tab: ['Metrics', 'Metrikler'],
            summary: [
                'The numerical before/after report behind the gate verdict.',
                'Kapı kararının arkasındaki sayısal önce/sonra raporu.',
            ],
            points: [
                pt('metrics', ['Coupling and data-quality report', 'Bağlaşım ve veri kalitesi raporu'], [
                    'Coherent coupling between every pair of axes before and after compensation, the improvement per axis, DC means (static component or sensor bias) and data-quality counts. The coupling figure is a proxy for leakage, not a physical calibration proof.',
                    'Her eksen çifti arasında düzeltme öncesi ve sonrası koherent bağlaşım, eksen başına iyileşme, DC ortalamalar (statik bileşen veya sensör sapması) ve veri kalitesi sayıları. Bağlaşım değeri sızıntı için bir vekildir; fiziksel kalibrasyon kanıtı değildir.',
                ]),
            ],
        },
        {
            id: 'markers',
            tab: ['Markers', 'İşaretçiler'],
            summary: [
                'Before/after time markers to compare raw and compensated samples at the same instant.',
                'Aynı anda ham ve düzeltilmiş örnekleri karşılaştırmak için önce/sonra zaman işaretçileri.',
            ],
            points: [
                pt('interaction', ['Plot interaction', 'Grafik etkileşimi'], [
                    'Click the time plot to add markers; Snap moves them to the nearest displayed sample.',
                    'İşaretçi eklemek için zaman grafiğine tıklayın; Snap onu en yakın gösterilen örneğe taşır.',
                ]),
                pt('time_markers', ['Before / after markers', 'Önce / sonra işaretçileri'], [
                    'One marker reads raw and compensated values of all three axes at the same source row; delta pairs report changes between two times.',
                    'Tek işaretçi üç eksenin ham ve düzeltilmiş değerlerini aynı kaynak satırında okur; fark çiftleri iki zaman arasındaki değişimi verir.',
                ]),
                pt('extrema', ['Time-range extrema', 'Zaman aralığı ekstremumları'], [
                    'Finds maxima or minima within a time range and adds them as markers.',
                    'Bir zaman aralığındaki maksimum veya minimumları bulur ve işaretçi olarak ekler.',
                ]),
                pt('table', ['Marker table', 'İşaretçi tablosu'], [
                    'Lists marker values; rename, remove, clear or export as CSV.',
                    'İşaretçi değerlerini listeler; yeniden adlandırın, silin, temizleyin veya CSV olarak aktarın.',
                ]),
            ],
        },
    ],
}
