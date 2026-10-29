// Interface tours: Statistics group. Every string pair is [en, tr].
// Hotspot positions come from tourAnchors.js (measured in the running app).

const pt = (id, title, desc) => ({ id, title, desc })

const findings = (en, tr) => pt('findings', ['Findings', 'Findings (bulgular)'], [en, tr])

export default {
    statistics_summary: [
        {
            id: 'summary',
            tab: ['Summary', 'Summary (özet)'],
            summary: [
                'Six vibration channels profiled over the whole record (100,000 samples each). The Summary tab gives one row per channel with level and size.',
                'Altı titreşim kanalı tüm kayıt boyunca incelendi (her biri 100.000 örnek). Summary sekmesi her kanal için seviye ve büyüklükle bir satır verir.',
            ],
            points: [
                pt('metric', ['Bar metric', 'Bar metric (çubuk metriği)'], [
                    'The value sent to a connected Bar Plot and shown in the Value column; Mean here. Switch to RMS to compare vibration levels across sensors.',
                    'Bağlı bir Bar Plot’a gönderilen ve Value sütununda gösterilen değer; burada Mean. Sensörler arasında titreşim seviyelerini karşılaştırmak için RMS’e geçin.',
                ]),
                pt('outlier', ['Outlier threshold (σ)', 'Aykırı eşik (σ)'], [
                    'Samples farther than 3 standard deviations from the mean are counted in the Quality tab. Nothing is removed.',
                    'Ortalamadan 3 standart sapmadan uzak örnekler Quality sekmesinde sayılır. Hiçbir şey kaldırılmaz.',
                ]),
                pt('tabs', ['Summary, Quality, Robust', 'Summary, Quality, Robust'], [
                    'Three views of the same computation: basic statistics, data-quality checks and robust distribution measures.',
                    'Aynı hesaplamanın üç görünümü: temel istatistikler, veri kalitesi kontrolleri ve sağlam dağılım ölçüleri.',
                ]),
                pt('overview', ['Overview strip', 'Özet şerit'], [
                    'The channel chosen above it over the whole record. Drag its edges to limit the analysis to part of the record; the range line below confirms the interval.',
                    'Üstünde seçilen kanal, tüm kayıt boyunca. Analizi kaydın bir bölümüyle sınırlamak için kenarlarını sürükleyin; alttaki aralık satırı aralığı doğrular.',
                ]),
                pt('range', ['Range', 'Aralık'], [
                    '“whole record” means every sample is included. Compare tests only over equal ranges.',
                    '“whole record”, her örneğin dahil olduğu anlamına gelir. Testleri yalnızca eşit aralıklar üzerinden karşılaştırın.',
                ]),
                pt('table', ['Reading the table', 'Tabloyu okumak'], [
                    'All means are close to zero, as expected for vibration. RMS ranges from 0.08 (fan_blade) to 0.90 (gearbox_input): the gearbox input vibrates eleven times more strongly than the fan. Peak-to-peak shows the full swing, 4.65 for gearbox_input.',
                    'Titreşimden beklendiği gibi tüm ortalamalar sıfıra yakın. RMS 0,08 (fan_blade) ile 0,90 (gearbox_input) arasında: dişli kutusu girişi fandan on bir kat daha güçlü titreşiyor. Tepeden tepeye tam salınımı gösterir; gearbox_input için 4,65.',
                ]),
                pt('compute', ['Compute', 'Compute (hesapla)'], [
                    'Profiles all channels ticked in the Channels panel in one pass over the selected range.',
                    'Channels panelinde işaretli tüm kanalları seçilen aralık üzerinde tek geçişte inceler.',
                ]),
            ],
        },
        {
            id: 'quality',
            tab: ['Quality', 'Quality (kalite)'],
            summary: [
                'Data-quality checks for the same six channels. Here everything is clean: no missing or infinite values, no constant channel, no samples stuck at the limits.',
                'Aynı altı kanal için veri kalitesi kontrolleri. Burada her şey temiz: eksik veya sonsuz değer yok, sabit kanal yok, sınırlara takılmış örnek yok.',
            ],
            points: [
                pt('tabs', ['Quality', 'Quality (kalite)'], [
                    'Read this tab before trusting any number in Summary.',
                    'Summary’deki herhangi bir sayıya güvenmeden önce bu sekmeyi okuyun.',
                ]),
                pt('table', ['What each column catches', 'Her sütunun yakaladığı'], [
                    'NaN and infinite counts: missing data. Is Constant and the longest constant run: dead or frozen sensors. At Min / At Max count: clipping, many samples exactly at the extreme. Z-score outlier count: values beyond the threshold. Increasing time: whether the time column ever goes backwards. Here At Min and At Max are 1, which means the extremes are single samples, not a clipped plateau.',
                    'NaN ve sonsuz sayıları: eksik veri. Is Constant ve en uzun sabit dizi: ölü veya donmuş sensörler. At Min / At Max sayısı: kırpılma, tam uç değerde çok sayıda örnek. Z-skor aykırı sayısı: eşiğin ötesindeki değerler. Increasing time: zaman sütununun hiç geriye gidip gitmediği. Burada At Min ve At Max 1’dir; yani uç değerler kırpılmış bir düzlük değil, tek örneklerdir.',
                ]),
            ],
        },
        {
            id: 'robust',
            tab: ['Robust + Findings', 'Robust + Findings'],
            summary: [
                'Robust measures for the six channels, with the Findings panel open on the right.',
                'Altı kanal için sağlam ölçüler; sağda Findings paneli açık.',
            ],
            points: [
                pt('tabs', ['Robust', 'Robust (sağlam)'], [
                    'Median, MAD and IQR describe level and spread without being pulled by extreme values; P01 to P99 give the percentiles; skewness, excess kurtosis, crest factor and shape factor describe the shape.',
                    'Medyan, MAD ve IQR uç değerlerden etkilenmeden seviye ve yayılımı tarif eder; P01 ile P99 yüzdelikleri verir; çarpıklık, fazla basıklık, tepe faktörü ve şekil faktörü şekli tarif eder.',
                ]),
                pt('table', ['Shape tells the type of signal', 'Şekil sinyalin türünü söyler'], [
                    'Excess kurtosis around −1.2 to −1.3 and a crest factor near 2.4 point to periodic vibration with little impulsive content. A bearing with impacts would show a clearly positive kurtosis and a crest factor well above 3.',
                    '−1,2 ile −1,3 civarındaki fazla basıklık ve 2,4’e yakın tepe faktörü, az darbeli içeriğe sahip periyodik titreşime işaret eder. Darbeleri olan bir rulman belirgin pozitif bir basıklık ve 3’ün epey üzerinde bir tepe faktörü gösterirdi.',
                ]),
                findings(
                    'States what was computed: six profiles, 600,000 finite samples, which numbers use every sample and which are histogram estimates. It also explains how to treat a repeated-value flag: as a possible flat line to confirm, not a confirmed sensor fault.',
                    'Neyin hesaplandığını belirtir: altı profil, 600.000 sonlu örnek, hangi sayıların her örneği kullandığı ve hangilerinin histogram tahmini olduğu. Tekrar eden değer işaretinin nasıl ele alınacağını da açıklar: kesin bir sensör arızası değil, doğrulanacak olası bir düz çizgi olarak.',
                ),
            ],
        },
    ],
    correlation_analysis: [
        {
            id: 'pearson',
            tab: ['Pearson ranking', 'Pearson sıralaması'],
            summary: [
                'x_uniform is the target; four candidates are ranked by Pearson correlation over 300,000 pairs.',
                'Hedef x_uniform; dört aday 300.000 çift üzerinden Pearson korelasyonuna göre sıralanmış.',
            ],
            points: [
                pt('target', ['Target channel', 'Hedef kanal'], [
                    'The channel you want to explain. Every candidate is compared with it.',
                    'Açıklamak istediğiniz kanal. Her aday onunla karşılaştırılır.',
                ]),
                pt('relationship', ['Relationship', 'İlişki'], [
                    'Pearson measures straight-line relationships. Other choices handle curved links (Spearman, mutual information), remove a common driver (Partial Pearson), follow the link over time (Rolling Pearson) or group redundant channels.',
                    'Pearson doğrusal ilişkileri ölçer. Diğer seçenekler eğri bağları ele alır (Spearman, mutual information), ortak bir etkeni çıkarır (Partial Pearson), bağı zaman içinde izler (Rolling Pearson) veya fazlalık kanalları gruplar.',
                ]),
                pt('candidates', ['Candidates', 'Adaylar'], [
                    '“All time-domain channels” tests everything; “Checked channels” tests only those ticked in the Channels panel, which keeps large files manageable.',
                    '“All time-domain channels” her şeyi test eder; “Checked channels” yalnızca Channels panelinde işaretlenenleri test eder; büyük dosyalarda işi yönetilebilir tutar.',
                ]),
                pt('lag', ['Lag (samples)', 'Gecikme (örnek)'], [
                    'Shifts the candidate before comparing. Use it when one quantity reacts later than the other, for example a temperature following a load step by several seconds.',
                    'Karşılaştırmadan önce adayı kaydırır. Bir büyüklük diğerinden daha geç tepki veriyorsa kullanın; örneğin bir yük basamağını birkaç saniye geriden izleyen bir sıcaklık.',
                ]),
                pt('grid', ['Analysis grid step', 'Analiz ızgara adımı'], [
                    '“non grid” uses the samples as recorded. Enter a step in seconds to bring channels with different sample rates onto one grid first.',
                    '“non grid” örnekleri kaydedildiği gibi kullanır. Farklı örnekleme hızındaki kanalları önce tek bir ızgaraya getirmek için saniye cinsinden bir adım girin.',
                ]),
                pt('table', ['Results', 'Sonuçlar'], [
                    'y_strong 0.997 and y_weak 0.69 move with the target; y_noise is unrelated. y_quadratic also reads about 0, although it is a curved function of the target: Pearson only sees straight lines. Finite pairs shows how many samples were usable.',
                    'y_strong 0,997 ve y_weak 0,69 hedefle birlikte hareket ediyor; y_noise ilgisiz. y_quadratic de yaklaşık 0 okunuyor, oysa hedefin eğri bir fonksiyonu: Pearson yalnızca düz çizgileri görür. Finite pairs kaç örneğin kullanılabildiğini gösterir.',
                ]),
                pt('compute', ['Compute', 'Compute (hesapla)'], [
                    'Runs the comparison over the selected range. The note above the button reminds that correlation suggests a relationship but does not establish a cause.',
                    'Karşılaştırmayı seçilen aralık üzerinde çalıştırır. Düğmenin üstündeki not, korelasyonun bir ilişkiye işaret ettiğini ama bir sebebi kanıtlamadığını hatırlatır.',
                ]),
            ],
        },
        {
            id: 'rolling',
            tab: ['Rolling Pearson', 'Kayan Pearson'],
            summary: [
                'The same pair with Rolling Pearson: r is computed in windows of 100 samples, one row per window, to see whether the relationship holds throughout the record.',
                'Aynı çift Rolling Pearson ile: r 100 örneklik pencerelerde hesaplanır, her pencere için bir satır; ilişkinin kayıt boyunca geçerli olup olmadığını görmek için.',
            ],
            points: [
                pt('relationship', ['Rolling Pearson', 'Rolling Pearson'], [
                    'Instead of one number for the whole record, a series of numbers over time. A relationship that holds only during part of a test, for example only at high load, shows up as a change in these values.',
                    'Tüm kayıt için tek bir sayı yerine zaman içinde bir sayı dizisi. Bir testin yalnızca bir bölümünde, örneğin yalnızca yüksek yükte geçerli olan bir ilişki, bu değerlerdeki bir değişim olarak görünür.',
                ]),
                pt('window', ['Window (samples)', 'Pencere (örnek)'], [
                    'Length of each window. Long enough for a stable estimate (at least a few periods of the slowest variation), short enough to show changes. 100 samples is 0.1 s at 1 kHz.',
                    'Her pencerenin uzunluğu. Kararlı bir tahmin için yeterince uzun (en yavaş değişimin en az birkaç periyodu), değişimleri gösterecek kadar kısa. 1 kHz’de 100 örnek 0,1 s’dir.',
                ]),
                pt('table', ['One row per window', 'Pencere başına bir satır'], [
                    'Start Time, End Time and the coefficient of each window. For y_strong it stays between 0.96 and 0.999 throughout: the relationship is stable over the whole record.',
                    'Her pencerenin Start Time, End Time ve katsayısı. y_strong için baştan sona 0,96 ile 0,999 arasında kalıyor: ilişki tüm kayıt boyunca kararlı.',
                ]),
                findings(
                    'Explains what the rows are and reminds you to compare windows under similar operating conditions before concluding that a relationship changed.',
                    'Satırların ne olduğunu açıklar ve bir ilişkinin değiştiği sonucuna varmadan önce pencereleri benzer çalışma koşullarında karşılaştırmanızı hatırlatır.',
                ),
            ],
        },
    ],
    hypothesis_testing: [
        {
            id: 'onesample',
            tab: ['One-sample test', 'Tek örneklem testi'],
            summary: [
                'Is the mean of ch_healthy different from 0? One-sample t-test over 200,000 samples.',
                'ch_healthy’nin ortalaması 0’dan farklı mı? 200.000 örnek üzerinde tek örneklem t-testi.',
            ],
            points: [
                pt('test', ['Test', 'Test'], [
                    'One-sample compares one channel with a fixed value; Paired compares two channels recorded at the same moments; Welch compares two independent groups.',
                    'Tek örneklem bir kanalı sabit bir değerle karşılaştırır; Paired aynı anlarda kaydedilmiş iki kanalı karşılaştırır; Welch iki bağımsız grubu karşılaştırır.',
                ]),
                pt('refmean', ['Reference mean', 'Referans ortalama'], [
                    '0 here, because an AC-coupled accelerometer should have no offset. Take this value from a specification or physics, not from the data.',
                    'Burada 0, çünkü AC kuplajlı bir ivmeölçerin ofseti olmamalıdır. Bu değeri veriden değil, bir spesifikasyondan veya fizikten alın.',
                ]),
                pt('overview', ['Range', 'Aralık'], [
                    'The test uses the samples of the selected range; here the whole record.',
                    'Test seçilen aralığın örneklerini kullanır; burada tüm kayıt.',
                ]),
                pt('table', ['Result', 'Sonuç'], [
                    'Mean difference −0.00105 with a confidence interval from −0.0032 to +0.0011, which contains 0; p = 0.35. No evidence of an offset. Effect size −0.002 confirms the difference is tiny compared with the scatter.',
                    'Ortalama fark −0,00105, güven aralığı −0,0032 ile +0,0011 arasında ve 0’ı içeriyor; p = 0,35. Ofset olduğuna dair kanıt yok. −0,002’lik etki büyüklüğü farkın saçılıma göre çok küçük olduğunu doğrular.',
                ]),
                pt('compute', ['Compute', 'Compute (hesapla)'], [
                    'Runs the test on the ticked channels: one for one-sample, two for paired and Welch.',
                    'Testi işaretli kanallarda çalıştırır: tek örneklem için bir, paired ve Welch için iki.',
                ]),
            ],
        },
        {
            id: 'welch',
            tab: ['Welch test + Findings', 'Welch testi + Findings'],
            summary: [
                'ch_healthy against ch_severe with the independent (Welch) t-test. The Findings panel names the channels and the distribution used.',
                'Bağımsız (Welch) t-testiyle ch_healthy’ye karşı ch_severe. Findings paneli kanalları ve kullanılan dağılımı adlandırır.',
            ],
            points: [
                pt('test', ['Independent t-test (Welch)', 'Bağımsız t-testi (Welch)'], [
                    'Compares the means of two groups without assuming equal scatter. The first ticked channel is the primary, the second the comparison.',
                    'Eşit saçılım varsaymadan iki grubun ortalamalarını karşılaştırır. İşaretli ilk kanal birincil, ikincisi karşılaştırmadır.',
                ]),
                pt('table', ['A t-test compares means only', 't-testi yalnızca ortalamaları karşılaştırır'], [
                    'The mean difference is 0.0036 and its confidence interval, −0.0034 to +0.0105, contains 0: the means do not differ. Yet ch_severe vibrates much more strongly. A fault usually changes the spread, not the mean, so compare RMS or standard deviation, or look at a Box Plot, to see it.',
                    'Ortalama fark 0,0036 ve güven aralığı −0,0034 ile +0,0105 arasında; 0’ı içeriyor: ortalamalar farklı değil. Oysa ch_severe çok daha güçlü titreşiyor. Bir arıza genelde ortalamayı değil yayılımı değiştirir; bunu görmek için RMS’i veya standart sapmayı karşılaştırın ya da bir Box Plot’a bakın.',
                ]),
                findings(
                    '“Primary: ch_healthy; comparison: ch_severe. P-values use the native two-sided Student-t distribution.” Check that the order is the one you intended; the sign of the difference depends on it.',
                    '“Primary: ch_healthy; comparison: ch_severe. P-values use the native two-sided Student-t distribution.” Sıranın istediğiniz gibi olduğunu kontrol edin; farkın işareti buna bağlıdır.',
                ),
            ],
        },
    ],
    statistical_process_control: [
        {
            id: 'capability',
            tab: ['Capability', 'Yeterlilik'],
            summary: [
                'process_temp_c with specification limits 24.0 and 26.0 °C. The result row gives the center line, the control limits, the average moving range, Cpk and the rule counts.',
                '24,0 ve 26,0 °C spesifikasyon sınırlarıyla process_temp_c. Sonuç satırı merkez çizgiyi, kontrol sınırlarını, ortalama hareketli aralığı, Cpk’yi ve kural sayılarını verir.',
            ],
            points: [
                pt('ewma', ['EWMA λ', 'EWMA λ'], [
                    '0.2: each new point counts 20 %, the history 80 %. Lower values detect smaller, slower shifts; higher values react faster.',
                    '0,2: her yeni nokta %20, geçmiş %80 sayılır. Daha düşük değerler daha küçük ve yavaş kaymaları yakalar; daha yüksek değerler daha hızlı tepki verir.',
                ]),
                pt('lsl', ['Lower specification limit', 'Alt spesifikasyon sınırı'], [
                    '24.0 °C, from the process specification. Optional, but Cpk stays NaN without limits.',
                    '24,0 °C, proses spesifikasyonundan. İsteğe bağlıdır, ama sınır olmadan Cpk NaN kalır.',
                ]),
                pt('usl', ['Upper specification limit', 'Üst spesifikasyon sınırı'], [
                    '26.0 °C. The tolerance is 2 °C wide.',
                    '26,0 °C. Tolerans 2 °C genişliğinde.',
                ]),
                pt('table', ['Reading the result', 'Sonucu okumak'], [
                    'Center line 25.0 °C, control limits 23.5 and 26.5 °C, so the process standard deviation is about 0.5 °C. Cpk = 0.667: each specification limit is only two standard deviations from the mean, so roughly 4–5 % of values fall outside 24–26 °C. The rule-count columns to the right flag points and runs that suggest the process is not stable.',
                    'Merkez çizgi 25,0 °C, kontrol sınırları 23,5 ve 26,5 °C; yani proses standart sapması yaklaşık 0,5 °C. Cpk = 0,667: her spesifikasyon sınırı ortalamadan yalnızca iki standart sapma uzakta; bu yüzden değerlerin kabaca %4–5’i 24–26 °C dışına düşer. Sağdaki kural sayısı sütunları prosesin kararlı olmadığını düşündüren noktaları ve dizileri işaretler.',
                ]),
                pt('compute', ['Compute', 'Compute (hesapla)'], [
                    'Runs the first ticked channel over the selected interval.',
                    'İşaretli ilk kanalı seçilen aralık üzerinde çalıştırır.',
                ]),
            ],
        },
        {
            id: 'findings',
            tab: ['Findings', 'Findings (bulgular)'],
            summary: [
                'The Findings panel opened next to the result.',
                'Sonucun yanında açılmış Findings paneli.',
            ],
            points: [
                pt('table', ['Rule counts', 'Kural sayıları'], [
                    'Beyond three sigma, eight on the same side, four of five, EWMA and CUSUM violations. For a signal sampled hundreds of times per second these counts are large almost by construction; summarise per minute with Group By before judging stability.',
                    'Beyond three sigma, eight on the same side, four of five, EWMA ve CUSUM ihlalleri. Saniyede yüzlerce kez örneklenen bir sinyal için bu sayılar neredeyse kaçınılmaz olarak büyüktür; kararlılığı değerlendirmeden önce Group By ile dakika başına özetleyin.',
                ]),
                findings(
                    'States which channel was analysed and that the individuals/moving-range limits, EWMA, CUSUM and Nelson-style rule counts all use the selected interval.',
                    'Hangi kanalın analiz edildiğini ve bireysel/hareketli aralık sınırlarının, EWMA’nın, CUSUM’un ve Nelson tipi kural sayılarının hepsinin seçilen aralığı kullandığını belirtir.',
                ),
            ],
        },
    ],
}
