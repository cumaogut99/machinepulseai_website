// Interface tour: Frequency Response & Cross Spectrum.
// Every point is [en, tr]. Hotspot positions come from tourAnchors.js.

// Rows are [English label, Turkish label, English explanation, Turkish explanation].
// Keep decisions beside their measured screen region, including shared regions
// such as mode and coherence that appear in more than one capture.
const REGION_DETAILS = {
    mode: [
        ['Transfer / Transmissibility', 'Transfer / Transmissibility',
            'Choose this when a reference drives a response: force → acceleration gives accelerance; base motion → machine motion gives transmissibility. H1, H2 and Hv describe response per reference. Two response sensors alone do not give a force-normalized FRF.',
            'Referans bir tepkiyi sürüyorsa seçin: kuvvet → ivme, ivme/kuvvet FRF’sini; taban hareketi → makine hareketi ise transmissibility’yi verir. H1, H2 ve Hv referans başına cevabı gösterir. Yalnızca iki tepki sensörü kullanmak, kuvvete göre normalize bir FRF vermez.'],
        ['Cross Spectrum / Coherence', 'Cross Spectrum / Coherence',
            'Choose this for shared spectral content and relative phase without assigning a causal direction, for example two response sensors on one structure. A shared source can produce high coherence; that does not prove one sensor location drives the other. Changing mode requires Compute again.',
            'Nedensel yön atamadan ortak spektral içeriği ve bağıl fazı incelemek için seçin; örneğin aynı yapıdaki iki tepki sensörü. Ortak kaynak yüksek koherans üretebilir; bu, bir noktanın diğerini uyardığını kanıtlamaz. Modu değiştirdikten sonra yeniden Compute yapın.'],
        ['Sample Rate', 'Sample Rate (örnekleme hızı)',
            'Read from the MPAI recording and not editable here. Use this value when selecting NFFT; changing the display scale cannot change the sample rate or recover frequencies absent from the recording.',
            'MPAI kaydından okunur; burada değiştirilemez. NFFT seçerken bu değeri kullanın. Görünüm ölçeğini değiştirmek örnekleme hızını değiştirmez veya kayıtta bulunmayan frekansları geri getirmez.'],
    ],
    welch: [
        ['NFFT — frequency spacing', 'NFFT — frekans aralığı',
            'Choose from the separation you need to resolve: Δf = fs / NFFT. At 5000 Hz, NFFT = 8192 gives approximately 0.61 Hz spacing. Increase NFFT for closely spaced features only if the selected stationary interval still holds enough complete segments; finer bins alone do not improve confidence.',
            'Ayırmak istediğiniz frekans aralığına göre seçin: Δf = fs / NFFT. 5000 Hz’de NFFT = 8192 yaklaşık 0,61 Hz çizgi aralığı verir. Yakın özellikler için NFFT’yi artırırken seçili durağan aralıkta yeterli tam bölüt kaldığından emin olun; ince çizgiler tek başına güveni artırmaz.'],
        ['Overlap — shared samples', 'Overlap — paylaşılan örnekler',
            'Hann with 0.5 (50%) overlap is a practical starting point for continuous or random records. More overlap provides more segments from the same interval, but these share samples and are not equivalent to the same number of independent measurements.',
            'Sürekli veya rastgele kayıtlar için Hann ile 0,5 (%50) örtüşme uygun bir başlangıçtır. Örtüşmeyi artırmak aynı aralıktan daha çok bölüt sağlar; ancak bölütler örnek paylaşır, aynı sayıda bağımsız ölçümün yerini tutmaz.'],
        ['Window — leakage control', 'Window — sızıntı kontrolü',
            'Use Hann as the starting choice for random and continuous signals. The menu also offers Hamming and rectangular windows. Keep the window fixed when comparing runs; choose rectangular only when segment boundaries do not introduce a discontinuity, rather than simply to make a peak taller.',
            'Rastgele ve sürekli sinyallerde Hann ile başlayın. Menüde Hamming ve dikdörtgen pencere de bulunur. Kayıtları karşılaştırırken pencereyi aynı tutun; dikdörtgeni yalnızca bölüt sınırları süreksizlik oluşturmuyorsa seçin, tepeyi daha yüksek göstermek için değil.'],
        ['Average Count — result confidence', 'Average Count — sonuca güven',
            'Use at least two complete segments for coherence and prefer more averages within one stationary operating state. Too few averages bias coherence upward. Required samples are NFFT + (count − 1) × hop, with hop set by overlap. Check the status line for the NFFT, rate and averages actually used.',
            'Koherans için en az iki tam bölüt kullanın; aynı durağan çalışma koşulu içinde daha fazla ortalamayı tercih edin. Az ortalama, koheransı yüksek değerlere doğru yanlılaştırır. Gereken örnek sayısı NFFT + (sayı − 1) × kaymadır; kaymayı örtüşme belirler. Gerçekte kullanılan NFFT, hız ve ortalama sayısını durum satırından kontrol edin.'],
    ],
    scale: [
        ['Magnitude (linear)', 'Magnitude (linear) — doğrusal',
            'Use this to read actual gain values and compare absolute amplitudes. The unit remains response/reference in transfer mode and the product of channel units per hertz in CSD mode.',
            'Gerçek kazanç değerlerini okumak ve mutlak genlikleri karşılaştırmak için seçin. Birim transfer modunda cevap/referans, CSD modunda kanal birimlerinin çarpımı/Hz olarak kalır.'],
        ['Magnitude (logarithmic)', 'Magnitude (logarithmic) — logaritmik',
            'Use this when large peaks and small features must be visible together while retaining engineering-unit values on a logarithmic axis.',
            'Büyük tepelerle küçük ayrıntıları birlikte görmek, değerleri ise mühendislik biriminde okumak istediğinizde seçin. Eksen logaritmiktir; değerler dB’ye çevrilmez.'],
        ['Magnitude (dB)', 'Magnitude (dB)',
            'Use this to compare resonances and anti-resonances over a wide dynamic range. Read the reference in the axis title before reporting a value: dB re 1 m/s²/N is not dB SPL or dBV. All three scales reuse the cached estimate; no Compute is needed.',
            'Geniş dinamik aralıkta rezonans ve anti-rezonansları karşılaştırmak için seçin. Değeri raporlamadan önce eksen başlığındaki referansı okuyun: dB re 1 m/s²/N, dB SPL veya dBV değildir. Üç ölçek de önbellekteki kestirimi kullanır; yeniden Compute gerekmez.'],
    ],
    navigator: [
        ['Navigator and Channel', 'Navigator ve Channel',
            'Use Navigator to choose a two-cursor range or a single sliding window. Channel selects the signal shown in the navigator only; it does not replace the reference and response assignments in Channels.',
            'Navigator ile iki imleçli aralık veya tek kayan pencere seçin. Channel yalnızca navigatörde gösterilen sinyali değiştirir; Channels panelindeki referans ve cevap atamalarının yerine geçmez.'],
        ['Selecting the analysis interval', 'Analiz aralığını seçmek',
            'Keep both channels inside the same stationary test condition. Exclude startup, shutdown or unrelated impacts when estimating a steady-state relationship. The interval must be long enough for the chosen NFFT, overlap and average count; adjust the span or the analysis settings together.',
            'İki kanalı aynı durağan test koşulu içinde tutun. Kararlı durum ilişkisi ararken kalkış, duruş veya ilgisiz darbeleri aralığın dışında bırakın. Aralık seçilen NFFT, örtüşme ve ortalama sayısına yetecek kadar uzun olmalıdır; aralığı ve analiz ayarlarını birlikte değerlendirin.'],
    ],
    magnitude: [
        ['Reading H1, H2 and Hv together', 'H1, H2 ve Hv’yi birlikte okumak',
            'H1 is suited to the model with noise mainly on the response; H2 assumes noise mainly on the reference; Hv accounts for both sides. Compare all three at the same frequency and with coherence. Do not select whichever curve looks smoothest or treat their spread as separate modes.',
            'H1, gürültünün ağırlıklı olarak cevapta olduğu modele; H2, gürültünün ağırlıklı olarak referansta olduğu modele uygundur. Hv iki tarafı birlikte ele alır. Üçünü aynı frekansta ve koheransla karşılaştırın. En düzgün görünen eğriyi seçmeyin veya eğriler arası farkı ayrı modlar olarak yorumlamayın.'],
        ['Units before peak interpretation', 'Tepe yorumundan önce birimler',
            'Force as reference and acceleration as response produce m/s²/N. Two acceleration channels produce a dimensionless transmissibility. Check these assignments before interpreting a high peak as structural amplification.',
            'Kuvvet referansı ve ivme cevabı m/s²/N verir. İki ivme kanalı ise boyutsuz transmissibility üretir. Yüksek bir tepeyi yapısal büyütme olarak yorumlamadan önce kanal atamalarını kontrol edin.'],
    ],
    phase: [
        ['Read phase beside magnitude and coherence', 'Fazı genlik ve koheransla okumak',
            'Place a frequency marker on a feature and check its gain, phase and coherence together. A phase rotation supports the interpretation of a magnitude peak, but phase in a low-coherence band is not a reliable basis for a modal conclusion.',
            'İlgili frekansa işaretçi koyup kazanç, faz ve koheransı birlikte kontrol edin. Faz dönüşü genlik tepesinin yorumunu destekler; düşük koheranslı bir banttaki faz ise modal sonuç çıkarmak için güvenilir bir temel değildir.'],
        ['Channel order and phase sign', 'Kanal sırası ve faz işareti',
            'Keep Reference / Input and Response / Output in the same physical order across comparisons. Reversing their roles changes the direction and phase interpretation; recompute after changing assignments.',
            'Karşılaştırmalarda Reference / Input ve Response / Output rollerini aynı fiziksel sırada tutun. Rolleri değiştirmek aktarım yönünü ve faz yorumunu değiştirir; atamaları değiştirdikten sonra yeniden hesaplayın.'],
    ],
    coherence: [
        ['A dip needs investigation', 'Koherans çukurunu incelemek',
            'Before trusting gain or phase at a dip, check reference excitation, sensor noise, leakage and operating-state changes. Increasing averages can stabilize a noisy estimate, but cannot repair missing excitation or a wrong channel assignment.',
            'Bir çukurdaki kazanç veya faza güvenmeden önce referans uyarımını, sensör gürültüsünü, sızıntıyı ve çalışma koşulu değişimini kontrol edin. Ortalamayı artırmak gürültülü kestirimi kararlı hale getirebilir; eksik uyarımı veya yanlış kanal atamasını düzeltemez.'],
        ['High coherence is supporting evidence', 'Yüksek koherans destekleyici kanıttır',
            'Use several complete Welch segments; with very few averages coherence can look deceptively high. A value near one does not verify calibration or prove causality. Interpret it together with channel physics and estimator agreement.',
            'Birden fazla tam Welch bölütü kullanın; çok az ortalamada koherans yanıltıcı biçimde yüksek görünebilir. Bire yakın değer kalibrasyonu doğrulamaz veya nedenselliği kanıtlamaz. Kanal fiziği ve kestiricilerin uyumuyla birlikte yorumlayın.'],
    ],
    channels: [
        ['Reference / Input → Response / Output', 'Reference / Input → Response / Output',
            'Assign measured force or base motion as the reference when that is the physical input, and the driven sensor as the response. Use synchronized signals from the same recording and verify their units. Channel names alone do not establish the physical direction.',
            'Fiziksel giriş ölçülmüş kuvvet veya taban hareketiyse bunu referans, uyarılan sensörü cevap olarak atayın. Aynı kayıttaki eşzamanlı sinyalleri kullanın ve birimlerini doğrulayın. Kanal adları tek başına fiziksel yönü belirlemez.'],
        ['Auto-detect', 'Auto-detect',
            'Use it to suggest assignments from channel names, then verify both dropdowns. If either role changes, run Compute again. A noisy H1 estimate is not generally made into its reciprocal H1 simply by reversing the channels.',
            'Kanal adlarından atama önermek için kullanın; ardından iki açılır listeyi de doğrulayın. Roller değişirse yeniden Compute yapın. Gürültülü bir H1 kestirimi, kanalları ters çevirmekle genel olarak önceki H1’in tam tersine dönüşmez.'],
    ],
    compute: [
        ['Before Compute', 'Compute öncesi',
            'Confirm the mode, channel direction and units, then choose a stationary interval that holds the requested Welch segments. Changing mode, channels, NFFT, window, overlap or averaging changes the analysis and requires a new calculation; changing magnitude scale only changes the view.',
            'Modu, kanal yönünü ve birimleri doğrulayın; ardından istenen Welch bölütlerini içeren durağan aralığı seçin. Mod, kanal, NFFT, pencere, örtüşme veya ortalama değişikliği analizi değiştirir ve yeni hesap gerektirir. Genlik ölçeği yalnızca görünümü değiştirir.'],
        ['Review and retain the result', 'Sonucu incelemek ve saklamak',
            'After calculation, inspect magnitude, phase and coherence at the same frequencies and read the status line. The result remains in the session. To persist it, use main-window Save / Ctrl+S and select it in the central prompt.',
            'Hesap sonunda aynı frekanslarda genlik, faz ve koheransı inceleyin; durum satırını okuyun. Sonuç oturumda kalır. Kalıcı saklamak için ana pencerenin Save / Ctrl+S komutunu kullanıp merkezi pencerede sonucu seçin.'],
    ],
    interaction: [
        ['Click plot to add markers', 'Click plot to add markers',
            'Enable this for quick inspection directly on a peak. Disable it when navigating the plot so clicks do not add unwanted markers. The marker reads the existing result; it does not run a new analysis.',
            'Bir tepeyi doğrudan incelemek için açın. Grafikte gezinirken istemeden işaretçi eklememek için kapatın. İşaretçi mevcut sonucu okur; yeni analiz çalıştırmaz.'],
        ['Nearest frequency bin', 'Nearest frequency bin',
            'Use snapping when you need a value at a computed spectral line. The bin spacing still comes from NFFT and the sample rate; placing more markers cannot improve frequency resolution.',
            'Hesaplanmış bir spektral çizgideki değeri okumak için yakalamayı kullanın. Çizgi aralığını NFFT ve örnekleme hızı belirler; daha fazla işaretçi eklemek frekans çözünürlüğünü artırmaz.'],
    ],
    frequency_markers: [
        ['Marker +', 'Marker +',
            'Enter a known target frequency to compare the same location across runs. With snapping enabled, check the resulting bin frequency rather than assuming it equals the typed value exactly.',
            'Kayıtlar arasında aynı konumu karşılaştırmak için bilinen hedef frekansı girin. Yakalama açıksa sonucun tam yazılan değer olduğunu varsaymak yerine yerleşilen çizginin frekansını kontrol edin.'],
        ['Delta +', 'Delta +',
            'Use a pair for frequency separation, such as sideband spacing. For a bandwidth reading, position both legs at the intended amplitude level; a delta pair alone does not identify half-power points or calculate a validated damping estimate.',
            'Yan bant aralığı gibi frekans farkları için çift kullanın. Bant genişliği okurken iki ucu da amaçlanan genlik seviyesine yerleştirin; fark çifti tek başına yarı güç noktalarını belirlemez veya doğrulanmış sönüm kestirimi üretmez.'],
    ],
    lines: [
        ['Check all three plots at one frequency', 'Tek frekansta üç grafiği kontrol etmek',
            'Use the shared marker to compare the peak with the phase transition and coherence without reading different frequencies by eye. If the magnitude looks convincing but coherence is poor, investigate the measurement before reporting a mode.',
            'Gözle farklı frekanslar okumadan tepeyi faz geçişi ve koheransla karşılaştırmak için ortak işaretçiyi kullanın. Genlik ikna edici görünse de koherans düşükse bir mod raporlamadan önce ölçümü inceleyin.'],
    ],
    table: [
        ['Only the active graph', 'Only the active graph',
            'Enable this to reduce the table to the active plot. Disable it to compare magnitude, phase and coherence values side by side for each marker.',
            'Tabloyu etkin grafikle sınırlamak için açın. Her işaretçinin genlik, faz ve koherans değerlerini yan yana karşılaştırmak için kapatın.'],
        ['Rename, Remove, Clear and Export CSV', 'Rename, Remove, Clear ve Export CSV',
            'Name important features, remove one marker or clear the list, then export marker readings if needed. These actions manage annotations and their table; they do not recompute spectra or persist the analysis into MPAI.',
            'Önemli özellikleri adlandırın, tek işaretçiyi kaldırın veya listeyi temizleyin; gerektiğinde işaretçi okumalarını dışa aktarın. Bu işlemler notları ve tabloyu yönetir; spektrumları yeniden hesaplamaz veya analizi MPAI içine kaydetmez.'],
    ],
    gxy: [
        ['Shared energy rather than gain', 'Kazanç yerine ortak enerji',
            'Use this view to locate shared frequency content between two responses. Compare peaks with coherence and relative phase. Unlike a transfer ratio, CSD amplitude also depends on the signal levels, so a larger peak alone does not prove a stronger transfer path.',
            'İki tepkinin ortak frekans içeriğini bulmak için bu görünümü kullanın. Tepeleri koherans ve bağıl fazla karşılaştırın. Aktarım oranının aksine CSD genliği sinyal seviyelerine de bağlıdır; daha büyük tepe tek başına daha güçlü aktarım yolu kanıtı değildir.'],
    ],
    relative_phase: [
        ['Interpreting lead and lag', 'Önde ve geride olmayı yorumlamak',
            'Keep channel order fixed and examine phase only in coherent bands. A linear phase slope can be consistent with a time delay; inspect phase wrapping and sensor timing before attributing it to propagation through the structure.',
            'Kanal sırasını sabit tutun ve fazı koheransın yüksek olduğu bantlarda inceleyin. Doğrusal faz eğimi zaman gecikmesiyle uyumlu olabilir; bunu yapı içindeki yayılıma bağlamadan önce faz sarmalanmasını ve sensör zamanlamasını kontrol edin.'],
    ],
}

const pt = (id, title, desc) => ({ id, title, desc, details: REGION_DETAILS[id] })

export default {
    cross_spectrum: [
        {
            id: 'settings',
            tab: ['Settings + Channels', 'Ayarlar + Kanallar'],
            summary: [
                'Transfer mode: the reference force drives the response accelerometer. H1, H2 and Hv are drawn together with phase and coherence for the same Welch segments.',
                'Transfer modu: referans kuvvet, cevap ivmeölçerini sürer. H1, H2 ve Hv; aynı Welch segmentlerinden hesaplanan faz ve koherans ile birlikte çizilir.',
            ],
            points: [
                pt('mode', ['Analysis mode sets the question', 'Analiz modu soruyu belirler'], [
                    'Choose the physical question before the FFT settings: do you need response per input, or the shared content of two signals? Mode determines the calculation and the units of its result.',
                    'FFT ayarlarından önce fiziksel soruyu belirleyin: giriş başına tepkiyi mi, iki sinyalin ortak içeriğini mi arıyorsunuz? Mod, yapılacak hesabı ve sonucun birimini belirler.',
                ]),
                pt('welch', ['NFFT, overlap, window and averages', 'NFFT, örtüşme, pencere ve ortalama'], [
                    'These settings define the Welch segments shared by the auto-spectra, cross-spectrum and coherence. Choose them together: finer frequency spacing, leakage control and enough averages must all fit inside the selected stationary interval.',
                    'Bu ayarlar oto-spektrum, çapraz spektrum ve koheransın ortak Welch bölütlerini tanımlar. Birlikte seçin: ince frekans aralığı, sızıntı kontrolü ve yeterli ortalama sayısı seçili durağan aralığa birlikte sığmalıdır.',
                ]),
                pt('scale', ['Magnitude scale is display-only', 'Genlik ölçeği yalnızca görünümdür'], [
                    'Magnitude (linear), (logarithmic) and (dB) repaint the cached result without recomputing. The dB axis states its reference explicitly, for example dB re 1 m/s²/N, so the value is never confused with dB SPL or dBV.',
                    'Magnitude (linear), (logarithmic) ve (dB) seçenekleri önbellekteki sonucu yeniden hesaplamadan çizer. dB ekseni referansını açıkça yazar (ör. dB re 1 m/s²/N); böylece değer dB SPL veya dBV ile karıştırılmaz.',
                ]),
                pt('navigator', ['Navigator bounds the analysed span', 'Navigatör analiz aralığını sınırlar'], [
                    'The strip shows the whole record of the navigator channel. The blue and red cursors bound the samples sent to the estimate; in single-window mode one window as long as the Welch span slides with the cursor. Keep the span inside one stationary test condition.',
                    'Şerit, navigatör kanalının tüm kaydını gösterir. Mavi ve kırmızı imleçler hesaba giren örnekleri sınırlar; tek pencere modunda Welch aralığı uzunluğundaki pencere imleçle kayar. Aralığı tek ve durağan bir test koşulu içinde tutun.',
                ]),
                pt('magnitude', ['H1, H2 and Hv magnitude', 'H1, H2 ve Hv genliği'], [
                    'H1 = Gxy / Gxx assumes noise on the response, H2 = Gyy / Gyx assumes noise on the reference and Hv balances both. Where the three curves overlap the estimate is consistent; a gap near a resonance peak is a measurement-noise clue, not a second physical result. The unit is response per reference, here accelerance (m/s²/N).',
                    'H1 = Gxy / Gxx gürültünün cevapta, H2 = Gyy / Gyx referansta olduğunu varsayar; Hv ikisini dengeler. Üç eğrinin örtüştüğü yerde tahmin tutarlıdır; rezonans tepesindeki ayrışma ikinci bir fiziksel sonuç değil, ölçüm gürültüsü işaretidir. Birim, referans başına cevaptır; burada ivme/kuvvet (m/s²/N).',
                ]),
                pt('phase', ['Transfer phase', 'Transfer fazı'], [
                    'Phase of each estimator in degrees. A lightly damped mode rotates the phase quickly across its peak, which is how the 120 Hz and 360 Hz resonances are confirmed here. Read phase only where coherence is high.',
                    'Her tahmincinin fazı (derece). Az sönümlü bir mod, tepesi boyunca fazı hızla döndürür; buradaki 120 Hz ve 360 Hz rezonansları bu şekilde doğrulanır. Fazı yalnızca koheransın yüksek olduğu yerlerde okuyun.',
                ]),
                pt('coherence', ['Coherence γ² grades each frequency', 'Koherans γ² her frekansı derecelendirir'], [
                    'γ² runs from 0 to 1 and measures how much of the response is linearly explained by the reference at that frequency. Values near 1 support the FRF; dips mark weak excitation, noise, leakage or nonlinearity. High coherence does not prove calibration is correct.',
                    'γ², 0 ile 1 arasında değişir ve o frekansta cevabın ne kadarının referans ile doğrusal açıklandığını ölçer. 1’e yakın değerler FRF’yi destekler; çukurlar zayıf uyarım, gürültü, kaçak veya doğrusal olmayan davranışa işaret eder. Yüksek koherans kalibrasyonun doğru olduğunu kanıtlamaz.',
                ]),
                pt('channels', ['Reference and response assignment', 'Referans ve cevap ataması'], [
                    'Reference / Input and Response / Output pick the two channels; Auto-detect suggests them from channel names. The order defines the direction, units and phase convention of the transfer.',
                    'Reference / Input ve Response / Output iki kanalı seçer; Auto-detect kanal adlarından atama önerir. Sıralama aktarımın yönünü, birimini ve faz yorumunu tanımlar.',
                ]),
                pt('compute', ['Compute runs the estimate', 'Compute tahmini çalıştırır'], [
                    'Compute sends the selected span and settings to the C++ spectral engine in the background. The result stays in the session; it is written into the MPAI file only if you select it in the central Save prompt.',
                    'Compute, seçili aralığı ve ayarları arka planda C++ spektral motoruna gönderir. Sonuç oturumda kalır; MPAI dosyasına yalnızca merkezi Kaydet penceresinde seçerseniz yazılır.',
                ]),
            ],
        },
        {
            id: 'markers',
            tab: ['Markers', 'İşaretçiler'],
            summary: [
                'Two frequency markers at the designed resonances. Each marker is read on magnitude, phase and coherence at once.',
                'Tasarlanan rezonanslarda iki frekans işaretçisi. Her işaretçi genlik, faz ve koherans üzerinde aynı anda okunur.',
            ],
            points: [
                pt('interaction', ['Plot interaction and snapping', 'Grafik etkileşimi ve yakalama'], [
                    'With “Click plot to add markers” enabled, a click on any graph places a marker. Snap “Nearest frequency bin” moves it onto a computed spectral line so the readout is a real estimate, not an interpolated point.',
                    '“Click plot to add markers” açıkken herhangi bir grafiğe tıklamak işaretçi ekler. “Nearest frequency bin” yakalaması işaretçiyi hesaplanmış bir spektral çizgiye taşır; okunan değer ara değer değil gerçek tahmindir.',
                ]),
                pt('frequency_markers', ['Typed markers and deltas', 'Yazılarak eklenen işaretçi ve farklar'], [
                    'Marker + places one marker at a typed frequency. Delta + places a pair and reports the difference between its legs, useful for sideband spacing or the half-power bandwidth of a peak.',
                    'Marker + yazılan frekansa tek işaretçi koyar. Delta + bir çift yerleştirir ve iki ucu arasındaki farkı verir; yan bant aralığı veya bir tepenin yarı güç bant genişliği için kullanışlıdır.',
                ]),
                pt('lines', ['One marker, three readouts', 'Tek işaretçi, üç okuma'], [
                    'The marker is shared by magnitude, phase and coherence. M1 at 120.24 Hz shows the Hv peak, a phase near the zero crossing and coherence 0.987 — three consistent pieces of evidence for the same mode.',
                    'İşaretçi genlik, faz ve koherans arasında paylaşılır. 120,24 Hz’deki M1; Hv tepesini, sıfır geçişe yakın fazı ve 0,987 koheransı gösterir — aynı mod için üç tutarlı kanıt.',
                ]),
                pt('table', ['Marker table', 'İşaretçi tablosu'], [
                    'The right panel lists every marker with its position and values. “Only the active graph” filters the columns; Rename, Remove, Clear and Export CSV manage the list without touching the computed result.',
                    'Sağ panel her işaretçiyi konumu ve değerleriyle listeler. “Only the active graph” sütunları süzer; Rename, Remove, Clear ve Export CSV hesaplanmış sonuca dokunmadan listeyi yönetir.',
                ]),
            ],
        },
        {
            id: 'csd',
            tab: ['Cross Spectrum / Coherence', 'Çapraz Spektrum / Koherans'],
            summary: [
                'The same channels in Cross Spectrum mode: no input/output direction, only what the two signals share.',
                'Aynı kanallar Cross Spectrum modunda: giriş/çıkış yönü yok, yalnızca iki sinyalin ortak içeriği.',
            ],
            points: [
                pt('mode', ['Switch to Cross Spectrum / Coherence', 'Cross Spectrum / Coherence moduna geçin'], [
                    'Choose this mode when neither channel is a true input, for example two response sensors on the same structure. Compute again after changing the mode: unlike the magnitude scale, the mode changes the calculation.',
                    'Kanallardan hiçbiri gerçek giriş değilse bu modu seçin; örneğin aynı yapıdaki iki cevap sensörü. Modu değiştirdikten sonra yeniden Compute yapın: genlik ölçeğinin aksine mod hesabı değiştirir.',
                ]),
                pt('gxy', ['|Gxy| cross-spectral density', '|Gxy| çapraz spektral yoğunluk'], [
                    'The magnitude of the averaged cross-spectrum, shown per hertz. Peaks mark frequencies where both channels carry correlated energy. It is not a gain: its unit is the product of both channel units per hertz.',
                    'Ortalaması alınmış çapraz spektrumun hertz başına genliği. Tepeler, iki kanalın da ilişkili enerji taşıdığı frekansları gösterir. Bu bir kazanç değildir; birimi iki kanal biriminin çarpımının hertz’e oranıdır.',
                ]),
                pt('relative_phase', ['Relative phase ∠Gxy', 'Göreli faz ∠Gxy'], [
                    'The phase of Gxy tells which channel leads at each frequency. A straight phase slope across the band indicates a pure time delay between the channels.',
                    'Gxy fazı her frekansta hangi kanalın önde olduğunu söyler. Bant boyunca doğrusal bir faz eğimi, kanallar arasında saf bir zaman gecikmesine işaret eder.',
                ]),
                pt('coherence', ['Coherence stays the quality gate', 'Koherans kalite kapısı olmaya devam eder'], [
                    'Coherence is identical in both modes because it is built from the same auto- and cross-spectra. Use it to decide which parts of |Gxy| and ∠Gxy are worth interpreting.',
                    'Koherans iki modda da aynıdır, çünkü aynı oto ve çapraz spektrumlardan hesaplanır. |Gxy| ve ∠Gxy’nin hangi bölümlerinin yorumlanmaya değer olduğuna karar vermek için kullanın.',
                ]),
            ],
        },
    ],
}
