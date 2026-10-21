// Interface tours: Signal Filters group. Every string pair is [en, tr].
// Hotspot positions come from tourAnchors.js.

const pt = (id, title, desc) => ({ id, title, desc })

const channels = pt('channels', ['Channel browser', 'Kanal tarayıcısı'], [
    'Highlighted rows are the source channels the operation is applied to (Ctrl/Shift-click selects several, each producing its own output). The checkbox in front of a channel only draws it in the Graph tab. New output channels appear in the same list after Apply.',
    'Vurgulanan satırlar işlemin uygulanacağı kaynak kanallardır (Ctrl/Shift ile birden çok seçilir; her biri kendi çıkışını üretir). Kanalın önündeki onay kutusu yalnızca onu Graph sekmesinde çizer. Apply sonrası yeni çıkış kanalları aynı listede görünür.',
])

const apply = (en, tr) => pt('apply', ['Apply writes a new channel', 'Apply yeni kanal yazar'], [
    `${en} The source channel is never modified; the result is streamed over the full record by the C++ engine and stored inside the MPAI file, so downstream widgets can use it.`,
    `${tr} Kaynak kanal hiçbir zaman değiştirilmez; sonuç C++ motoru tarafından tüm kayıt boyunca akışla hesaplanır ve MPAI dosyasının içine yazılır, böylece sonraki widget’lar kullanabilir.`,
])

const output = pt('output', ['Output channel name', 'Çıkış kanalı adı'], [
    'The name of the derived channel, generated from the source and the settings (for example noisy_vibration_But_LO_40Hz). Edit it before Apply if you need a project naming convention.',
    'Türetilen kanalın adı; kaynak ve ayarlardan üretilir (ör. noisy_vibration_But_LO_40Hz). Proje adlandırma kuralınız varsa Apply’dan önce düzenleyin.',
])

export default {
    frequency_filter: [
        {
            id: 'response',
            tab: ['Parameters + Frequency Response', 'Parametreler + Frekans Cevabı'],
            summary: [
                'A 4th-order Butterworth low-pass at 40 Hz designed for a 12 Hz signal with a 180 Hz component and broadband noise. The Frequency Response tab shows the design before anything is applied.',
                '12 Hz sinyal, 180 Hz bileşen ve geniş bantlı gürültü için tasarlanmış 40 Hz, 4. derece Butterworth alçak geçiren filtre. Frequency Response sekmesi hiçbir şey uygulanmadan önce tasarımı gösterir.',
            ],
            points: [
                pt('presets', ['Presets', 'Hazır ayarlar'], [
                    'One click loads a complete design: anti-aliasing, low noise, vibration high-pass, 50/60 Hz notch, band-pass, sharp elliptic low-pass and FIR low-, high- and band-pass with Kaiser, Hamming or Blackman windows. “Save current as preset…” stores your own designs.',
                    'Tek tıkla eksiksiz bir tasarım yüklenir: anti-aliasing, düşük gürültü, titreşim yüksek geçiren, 50/60 Hz notch, bant geçiren, keskin eliptik alçak geçiren ve Kaiser, Hamming veya Blackman pencereli FIR alçak, yüksek ve bant geçiren. “Save current as preset…” kendi tasarımlarınızı saklar.',
                ]),
                pt('parameters', ['Filter parameters', 'Filtre parametreleri'], [
                    'Family (Butterworth, Bessel, Chebyshev I/II, Elliptic, FIR windowed-sinc), Mode (low-pass, high-pass, band-pass, band-stop, notch), Order and Cutoff; band modes add an upper cutoff and ripple families add passband ripple and stop-band attenuation. Sample Rate is read from the MPAI file. Zero-Phase (filtfilt) runs the filter forward and backward so features do not shift in time.',
                    'Family (Butterworth, Bessel, Chebyshev I/II, Elliptic, FIR pencereli sinc), Mode (alçak, yüksek, bant geçiren, bant durduran, notch), Order ve Cutoff; bant modlarında üst kesim, dalgalanmalı ailelerde geçiş bandı dalgalanması ve durdurma bandı zayıflatması eklenir. Örnekleme hızı MPAI dosyasından okunur. Zero-Phase (filtfilt) filtreyi ileri ve geri çalıştırır; olaylar zamanda kaymaz.',
                ]),
                pt('quality', ['Design quality readout', 'Tasarım kalite göstergesi'], [
                    'Trans is the transition width between pass and stop band, GD the group delay (0 ms with zero-phase) and Stable confirms the design is numerically stable. A very high order with a very low cutoff can become unstable.',
                    'Trans geçiş ve durdurma bandı arasındaki geçiş genişliği, GD grup gecikmesidir (zero-phase ile 0 ms); Stable tasarımın sayısal olarak kararlı olduğunu doğrular. Çok düşük kesimle çok yüksek derece kararsız olabilir.',
                ]),
                pt('bode', ['Frequency response', 'Frekans cevabı'], [
                    'Magnitude in dB and phase against log frequency, with the cutoff marked. Check that the frequencies you want to keep are in the flat part and the ones to remove are well into the stop band.',
                    'Log frekansa karşı dB cinsinden genlik ve faz; kesim frekansı işaretli. Korumak istediğiniz frekansların düz bölgede, atmak istediklerinizin ise durdurma bandının içinde olduğunu kontrol edin.',
                ]),
                output,
                channels,
                apply('Apply Filter processes every selected source.', 'Apply Filter seçilen her kaynağı işler.'),
            ],
        },
        {
            id: 'graph',
            tab: ['Graph', 'Graph'],
            summary: [
                'The source and the applied 40 Hz low-pass drawn together over the first second.',
                'Kaynak ve uygulanan 40 Hz alçak geçiren ilk saniye boyunca birlikte çizilir.',
            ],
            points: [
                pt('graph', ['Raw vs filtered', 'Ham ve filtrelenmiş'], [
                    'The blue trace is the original signal, the yellow one the derived channel: the 180 Hz component and the noise are gone while the 12 Hz motion keeps its amplitude and timing. Zoom in on edges and transients — that is where a filter shows its side effects.',
                    'Mavi iz özgün sinyal, sarı iz türetilen kanaldır: 180 Hz bileşen ve gürültü kaybolurken 12 Hz hareket genliğini ve zamanlamasını korur. Kenarlara ve geçici olaylara yakınlaşın — filtrenin yan etkileri orada görünür.',
                ]),
                output,
                pt('status', ['Status line', 'Durum satırı'], [
                    'Reports progress and the final result (“Filter applied successfully”) or the reason an Apply failed.',
                    'İlerlemeyi ve sonucu (“Filter applied successfully”) veya Apply’ın neden başarısız olduğunu bildirir.',
                ]),
                pt('channels', ['Plotting channels', 'Kanalları çizme'], [
                    'Tick the source and the new output to compare them. Plotting does not change which channel is filtered — only the highlight does.',
                    'Karşılaştırmak için kaynağı ve yeni çıkışı işaretleyin. Çizim, hangi kanalın filtreleneceğini değiştirmez — bunu yalnızca vurgulama belirler.',
                ]),
            ],
        },
        {
            id: 'notch',
            tab: ['Notch preset', 'Notch hazır ayarı'],
            summary: [
                'The “Notch 50 Hz” preset applied to a signal with mains hum: a narrow, deep rejection at 50 Hz that leaves the rest of the spectrum untouched.',
                'Şebeke uğultusu içeren sinyale uygulanan “Notch 50 Hz” hazır ayarı: geri kalan spektruma dokunmadan 50 Hz’de dar ve derin bir bastırma.',
            ],
            points: [
                pt('preset_notch', ['Notch presets', 'Notch hazır ayarları'], [
                    'Notch 50 Hz and Notch 60 Hz remove power-line interference. Harmonics (100/150 Hz or 120/180 Hz) need their own notch or a different approach.',
                    'Notch 50 Hz ve Notch 60 Hz şebeke girişimini kaldırır. Harmonikler (100/150 Hz veya 120/180 Hz) ayrı notch veya farklı bir yaklaşım gerektirir.',
                ]),
                pt('parameters', ['Notch parameters', 'Notch parametreleri'], [
                    'Mode switches to Notch and Cutoff becomes the centre frequency. The width is set by the design; check that nearby measurement content is not inside the notch.',
                    'Mode Notch’a geçer ve Cutoff merkez frekans olur. Genişlik tasarım tarafından belirlenir; yakındaki ölçüm içeriğinin notch’un içinde kalmadığını kontrol edin.',
                ]),
                pt('bode', ['Notch response', 'Notch cevabı'], [
                    'A sharp dip at exactly 50 Hz with flat magnitude elsewhere and a phase jump only at the notch.',
                    'Tam 50 Hz’de keskin bir çukur; başka her yerde düz genlik ve yalnızca notch’ta faz sıçraması.',
                ]),
            ],
        },
    ],

    smoothing_filter: [
        {
            id: 'response',
            tab: ['Parameters + Frequency Response', 'Parametreler + Frekans Cevabı'],
            summary: [
                'A 201-sample moving average on a noisy temperature trend, with its frequency response.',
                'Gürültülü sıcaklık trendinde 201 örneklik hareketli ortalama ve frekans cevabı.',
            ],
            points: [
                pt('parameters', ['Smoothing method and window', 'Yumuşatma yöntemi ve pencere'], [
                    'Moving Average (SMA), Exponential MA (EMA) or Savitzky-Golay (with Poly Order). Window Size is in samples and must be odd: at 2 kHz, 201 samples cover about 0.1 s. Larger windows remove more noise but also more real detail.',
                    'Moving Average (SMA), Exponential MA (EMA) veya Savitzky-Golay (Poly Order ile). Window Size örnek cinsindendir ve tek sayı olmalıdır: 2 kHz’de 201 örnek yaklaşık 0,1 s’dir. Büyük pencere daha çok gürültüyü ama daha çok gerçek ayrıntıyı da kaldırır.',
                ]),
                pt('quality', ['Transition and delay', 'Geçiş ve gecikme'], [
                    'Trans is the transition width of the equivalent low-pass and GD the group delay the smoother introduces — half the window for SMA, here 100 samples = 50 ms.',
                    'Trans eşdeğer alçak geçirenin geçiş genişliği, GD yumuşatıcının getirdiği grup gecikmesidir — SMA için pencerenin yarısı, burada 100 örnek = 50 ms.',
                ]),
                pt('bode', ['Frequency response', 'Frekans cevabı'], [
                    'A moving average is a low-pass filter with deep nulls and side lobes: some high frequencies leak through between the nulls. Savitzky-Golay keeps peak shapes better at the same window.',
                    'Hareketli ortalama derin sıfırları ve yan lobları olan bir alçak geçiren filtredir: bazı yüksek frekanslar sıfırlar arasından sızar. Savitzky-Golay aynı pencerede tepe şekillerini daha iyi korur.',
                ]),
                output,
                channels,
                apply('Apply Smoothing processes every selected source.', 'Apply Smoothing seçilen her kaynağı işler.'),
            ],
        },
        {
            id: 'graph',
            tab: ['Graph', 'Graph'],
            summary: [
                'The raw temperature and the smoothed trend over the whole record.',
                'Tüm kayıt boyunca ham sıcaklık ve yumuşatılmış trend.',
            ],
            points: [
                pt('graph', ['Raw vs smoothed', 'Ham ve yumuşatılmış'], [
                    'The smoothed curve follows the warm-up and the slow oscillation without the measurement noise. The first and last half-window are where edge handling matters most.',
                    'Yumuşatılmış eğri ölçüm gürültüsü olmadan ısınmayı ve yavaş salınımı izler. Kenar işlemenin en önemli olduğu yer ilk ve son yarım penceredir.',
                ]),
                output,
                channels,
            ],
        },
    ],

    math_transform: [
        {
            id: 'transform',
            tab: ['Transform + Graph', 'Dönüşüm + Graph'],
            summary: [
                'Differentiation of a 5 Hz displacement signal: the derived velocity is larger by 2πf and leads by 90°.',
                '5 Hz yer değiştirme sinyalinin türevi: türetilen hız 2πf kat büyüktür ve 90° öndedir.',
            ],
            points: [
                pt('operation', ['Operation', 'İşlem'], [
                    'Integration (acceleration → velocity → displacement), Differentiation (displacement → velocity → acceleration, with central, forward or backward difference) or Absolute Value. “Remove DC offset” before integration prevents a constant bias from growing into a ramp.',
                    'Integration (ivme → hız → yer değiştirme), Differentiation (yer değiştirme → hız → ivme; merkezi, ileri veya geri fark ile) veya Absolute Value. Integral öncesinde “Remove DC offset”, sabit bir sapmanın rampaya dönüşmesini önler.',
                ]),
                output,
                pt('graph', ['Source and result', 'Kaynak ve sonuç'], [
                    'The small blue trace is the displacement, the yellow one its derivative in the next unit. Differentiation amplifies high-frequency noise in proportion to frequency, so low-pass filter noisy signals first.',
                    'Küçük mavi iz yer değiştirme, sarı iz bir sonraki birimdeki türevidir. Türev alma yüksek frekanslı gürültüyü frekansla orantılı büyütür; gürültülü sinyalleri önce alçak geçiren filtreden geçirin.',
                ]),
                channels,
                apply('Apply Transform processes every selected source.', 'Apply Transform seçilen her kaynağı işler.'),
            ],
        },
    ],

    advanced_diagnostics: [
        {
            id: 'envelope',
            tab: ['Envelope detection + Graph', 'Zarf tespiti + Graph'],
            summary: [
                'Repetitive impacts ringing at 600 Hz, band-passed around the carrier and demodulated with the Hilbert transform.',
                '600 Hz’de çınlayan tekrarlı darbeler; taşıyıcı çevresinde bant geçirilip Hilbert dönüşümüyle demodüle edilir.',
            ],
            points: [
                pt('method', ['Analysis method', 'Analiz yöntemi'], [
                    'Envelope Detection (Hilbert transform) is available today; order tracking and cepstrum entries are reserved for a later phase and disabled in the list.',
                    'Envelope Detection (Hilbert dönüşümü) bugün kullanılabilir; order tracking ve kepstrum girdileri sonraki bir aşamaya ayrılmıştır ve listede devre dışıdır.',
                ]),
                pt('band', ['Carrier band', 'Taşıyıcı bandı'], [
                    'Carrier Center and Bandwidth define the band-pass applied before demodulation (here 400–800 Hz). Centre it on the structural resonance that the impacts excite, not on the fault frequency itself.',
                    'Carrier Center ve Bandwidth demodülasyondan önce uygulanan bant geçireni tanımlar (burada 400–800 Hz). Bandı arıza frekansına değil, darbelerin uyardığı yapısal rezonansa ortalayın.',
                ]),
                output,
                pt('graph', ['Signal and envelope', 'Sinyal ve zarf'], [
                    'The envelope (yellow) follows the amplitude of each impact burst. Its repetition rate — visible in an FFT of the envelope channel — reveals the defect frequency.',
                    'Zarf (sarı) her darbe patlamasının genliğini izler. Tekrarlanma hızı — zarf kanalının FFT’sinde görünür — arıza frekansını ortaya çıkarır.',
                ]),
                channels,
                apply('Apply Analysis processes every selected source.', 'Apply Analysis seçilen her kaynağı işler.'),
            ],
        },
    ],

    kalman_filter: [
        {
            id: 'graph',
            tab: ['Parameters + Graph', 'Parametreler + Graph'],
            summary: [
                'A noisy temperature estimated with a scalar Kalman filter, once causal and once zero-phase.',
                'Gürültülü sıcaklık, skaler Kalman filtresiyle bir kez nedensel bir kez sıfır fazlı olarak tahmin edilir.',
            ],
            points: [
                pt('parameters', ['Q, R and P₀', 'Q, R ve P₀'], [
                    'Process noise Q says how fast the true value may change, measurement noise R how noisy the sensor is (here 0.64 = 0.8² for a 0.8 °C noise) and P₀ the initial uncertainty. A smaller Q/R ratio gives a smoother but slower estimate.',
                    'Process noise Q gerçek değerin ne hızla değişebileceğini, measurement noise R sensörün ne kadar gürültülü olduğunu (burada 0,8 °C gürültü için 0,64 = 0,8²), P₀ başlangıç belirsizliğini söyler. Küçük Q/R oranı daha düzgün ama daha yavaş tahmin verir.',
                ]),
                pt('mode', ['Processing mode', 'İşleme modu'], [
                    'Causal (real-time) uses only past samples and therefore lags behind changes; Zero-phase (offline) runs forward and backward over the stored record, removing the lag but requiring the complete signal.',
                    'Causal (real-time) yalnızca geçmiş örnekleri kullanır, bu yüzden değişimlerin gerisinde kalır; Zero-phase (offline) kayıtlı veri üzerinde ileri ve geri çalışır, gecikmeyi kaldırır ama tüm sinyali gerektirir.',
                ]),
                output,
                pt('graph', ['Raw, causal and zero-phase', 'Ham, nedensel ve sıfır fazlı'], [
                    'Both estimates follow the warm-up; the causal one trails slightly during the rise. This is a single-channel scalar filter, not multi-sensor fusion.',
                    'İki tahmin de ısınmayı izler; nedensel olan yükseliş sırasında biraz geride kalır. Bu tek kanallı skaler bir filtredir, çok sensörlü birleştirme değildir.',
                ]),
                channels,
                apply('Apply Kalman Filter processes every selected source.', 'Apply Kalman Filter seçilen her kaynağı işler.'),
            ],
        },
    ],

    spike_detection: [
        {
            id: 'graph',
            tab: ['Detection + Graph', 'Tespit + Graph'],
            summary: [
                'A pressure signal with isolated spikes cleaned with a Z-score detector and linear interpolation: 60 samples replaced.',
                'Tekil sıçramalar içeren basınç sinyali Z-skor dedektörü ve doğrusal enterpolasyonla temizlenir: 60 örnek değiştirildi.',
            ],
            points: [
                pt('detection', ['Detection rule', 'Tespit kuralı'], [
                    'Method: Z-Score, MAD (median absolute deviation) or an absolute threshold. Threshold is in standard deviations for Z-score; Window Size is global (whole signal) or a sliding window with reflected edge padding, which follows slow changes in level.',
                    'Method: Z-Score, MAD (medyan mutlak sapma) veya mutlak eşik. Z-skor için eşik standart sapma cinsindendir; Window Size global (tüm sinyal) veya kenarları yansıtılarak doldurulan kayan penceredir ve seviyedeki yavaş değişimleri izler.',
                ]),
                pt('replacement', ['Replacement', 'Değiştirme'], [
                    'Linear Interpolation bridges each spike from the neighbouring good samples, Local Median uses the median around it and NaN only marks the samples so later steps can decide.',
                    'Linear Interpolation her sıçramayı komşu sağlam örnekler arasında köprüler, Local Median çevresindeki medyanı kullanır, NaN ise yalnızca işaretler ve kararı sonraki adımlara bırakır.',
                ]),
                output,
                pt('graph', ['Raw vs cleaned', 'Ham ve temizlenmiş'], [
                    'Blue spikes are removed in the yellow result while the 2 Hz oscillation is untouched. Check that real short events are not being classified as spikes before using the cleaned channel.',
                    'Mavi sıçramalar sarı sonuçta kaldırılmıştır; 2 Hz salınım ise etkilenmez. Temizlenmiş kanalı kullanmadan önce gerçek kısa olayların sıçrama sayılmadığını kontrol edin.',
                ]),
                channels,
                apply('Apply Spike Detection processes every selected source and reports how many samples were replaced.', 'Apply Spike Detection seçilen her kaynağı işler ve kaç örneğin değiştirildiğini bildirir.'),
            ],
        },
    ],

    data_quality_repair: [
        {
            id: 'setup',
            tab: ['Channels + Dataset preview', 'Kanallar + Veri önizleme'],
            summary: [
                'Outlier detection on a flow signal using a global Z-score, with the dataset shown in the lazily loaded preview table.',
                'Global Z-skor ile debi sinyalinde aykırı değer tespiti; veri seti tembel yüklenen önizleme tablosunda gösterilir.',
            ],
            points: [
                pt('channels', ['Channels to check', 'Kontrol edilecek kanallar'], [
                    'Select one or more channels; each one gets its own output.',
                    'Bir veya daha fazla kanal seçin; her biri kendi çıkışını alır.',
                ]),
                pt('operation', ['Outlier operation', 'Aykırı değer işlemi'], [
                    'Create Outlier Flag Channel (0/1) adds a marker channel; Replace Outliers with NaN adds a cleaned copy. A sample is an outlier when |x − mean| / std exceeds the Z-score threshold, using the exact full-record mean and standard deviation.',
                    'Create Outlier Flag Channel (0/1) bir işaret kanalı ekler; Replace Outliers with NaN temizlenmiş bir kopya ekler. |x − ortalama| / std, Z-skor eşiğini aştığında örnek aykırıdır; ortalama ve standart sapma tüm kayıttan tam olarak hesaplanır.',
                ]),
                pt('preview', ['Dataset preview', 'Veri önizleme'], [
                    'A virtual table that loads only the visible rows, so even very large files stay responsive. It shows real samples, not a decimated preview.',
                    'Yalnızca görünen satırları yükleyen sanal bir tablo; çok büyük dosyalarda bile akıcı kalır. Seyreltilmiş önizleme değil, gerçek örnekleri gösterir.',
                ]),
                pt('navigation', ['Jump to row and column', 'Satır ve sütuna git'], [
                    'Row # and Col # with Jump move the table directly to a sample, for example to inspect a flagged outlier.',
                    'Row # ve Col # ile Jump, tabloyu doğrudan bir örneğe taşır; örneğin işaretlenmiş bir aykırı değeri incelemek için.',
                ]),
                pt('apply', ['Apply Outlier Operation', 'Apply Outlier Operation'], [
                    'Appends the derived channel inside the MPAI container; the source channel is never modified.',
                    'Türetilen kanalı MPAI kabının içine ekler; kaynak kanal hiçbir zaman değiştirilmez.',
                ]),
            ],
        },
        {
            id: 'result',
            tab: ['Result column', 'Sonuç sütunu'],
            summary: [
                'After Apply the dataset has 12 columns: flow_outliers__outlier_zscore_flag marks each outlier with 1.',
                'Apply sonrası veri seti 12 sütundur: flow_outliers__outlier_zscore_flag her aykırı değeri 1 ile işaretler.',
            ],
            points: [
                pt('preview', ['New flag column', 'Yeni bayrak sütunu'], [
                    'The flag column sits next to the original data, so it can drive a Range Filter, a statistic or a plot without touching the measurement.',
                    'Bayrak sütunu özgün verinin yanında durur; ölçüme dokunmadan bir Range Filter’ı, istatistiği veya grafiği yönlendirebilir.',
                ]),
                pt('status', ['Status', 'Durum'], [
                    '“Outlier output persisted inside the MPAI container” confirms the channel was written to the file rather than kept in memory.',
                    '“Outlier output persisted inside the MPAI container” kanalın bellekte tutulmadığını, dosyaya yazıldığını doğrular.',
                ]),
            ],
        },
    ],

    range_filter: [
        {
            id: 'setup',
            tab: ['Range rule + Preview', 'Aralık kuralı + Önizleme'],
            summary: [
                'A rule that keeps only the rows where tank_level is between 30 and 70, with the channel previewed against time.',
                'Yalnızca tank_level’ın 30 ile 70 arasında olduğu satırları tutan bir kural; kanal zamana karşı önizlenir.',
            ],
            points: [
                pt('condition', ['Range condition', 'Aralık koşulu'], [
                    'Select a parameter in the right panel, enable Min and/or Max, choose whether each bound is inclusive and press Add / Update. Remove and Clear edit the rule list.',
                    'Sağ panelde bir parametre seçin, Min ve/veya Max’ı açın, her sınırın dahil olup olmadığını seçin ve Add / Update’e basın. Remove ve Clear kural listesini düzenler.',
                ]),
                pt('rules', ['Active filters (AND)', 'Etkin filtreler (VE)'], [
                    'All rules are combined with AND; the summary below the list shows the resulting condition. A row is kept only if it satisfies every rule.',
                    'Tüm kurallar VE ile birleştirilir; listenin altındaki özet ortaya çıkan koşulu gösterir. Bir satır yalnızca her kuralı sağlarsa tutulur.',
                ]),
                pt('preview', ['Preview', 'Önizleme'], [
                    'Drag channels from the right panel, or tick them under Preview Channels, to see where the limits cut the record before applying.',
                    'Sınırların kaydı nereden keseceğini Apply öncesinde görmek için kanalları sağ panelden sürükleyin veya Preview Channels altında işaretleyin.',
                ]),
                pt('parameters', ['Parameters list', 'Parametre listesi'], [
                    'Every channel of the dataset can be a rule parameter. Selecting one loads it into the editor; dragging one adds it to the preview.',
                    'Veri setinin her kanalı kural parametresi olabilir. Birini seçmek onu düzenleyiciye yükler; sürüklemek önizlemeye ekler.',
                ]),
                pt('apply', ['Apply creates a filtered dataset', 'Apply filtrelenmiş veri seti oluşturur'], [
                    'Unlike the signal filters, Apply Range Filter does not add a channel: it materializes a new dataset that contains only the rows meeting the rules, with all channels, and downstream widgets receive that dataset.',
                    'Sinyal filtrelerinin aksine Apply Range Filter kanal eklemez: kurallara uyan satırları tüm kanallarıyla içeren yeni bir veri seti oluşturur ve sonraki widget’lar bu veri setini alır.',
                ]),
            ],
        },
        {
            id: 'result',
            tab: ['After Apply', 'Apply sonrası'],
            summary: [
                'Apply kept 20,013 of the 40,000 rows — every row where tank_level is between 30 and 70 — and sent them on as a new dataset.',
                'Apply 40.000 satırın 20.013’ünü tuttu — tank_level’ın 30 ile 70 arasında olduğu her satır — ve bunları yeni bir veri seti olarak iletti.',
            ],
            points: [
                pt('status', ['Result status', 'Sonuç durumu'], [
                    '“Filtered dataset propagated (20,013 rows)” reports the exact number of rows that passed every rule, counted over the whole record, not estimated from the preview.',
                    '“Filtered dataset propagated (20,013 rows)” her kuralı geçen satır sayısını tam olarak bildirir; sayı önizlemeden tahmin edilmez, tüm kayıt üzerinden sayılır.',
                ]),
                pt('rules', ['Rules that were applied', 'Uygulanan kurallar'], [
                    'The rule list stays as it was, so you can adjust a limit and apply again to produce another filtered dataset.',
                    'Kural listesi olduğu gibi kalır; bir sınırı değiştirip yeniden Apply ederek başka bir filtrelenmiş veri seti üretebilirsiniz.',
                ]),
                pt('preview', ['Source stays untouched', 'Kaynak değişmeden kalır'], [
                    'The preview still shows the original record: the filtered rows go to a separate dataset for downstream widgets, and the source file is never rewritten.',
                    'Önizleme hâlâ özgün kaydı gösterir: filtrelenmiş satırlar sonraki widget’lar için ayrı bir veri setine gider ve kaynak dosya hiçbir zaman yeniden yazılmaz.',
                ]),
            ],
        },
    ],
}
