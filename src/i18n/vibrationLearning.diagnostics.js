const DIAGNOSTICS_LEARNING = {
    bearing_fault: {
        en: {
            title: 'Bearing & Gear Fault Diagnosis: make weak impacts visible',
            intro: 'Move from bearing geometry and shaft speed to envelope spectra, automatic kurtogram band selection, cepstrum, TSA, gear residuals, condition indicators and an evidence-based diagnosis—without treating one peak as a verdict.',
            badges: ['BPFO · BPFI · BSF · FTF', 'Envelope & kurtogram', 'Cepstrum & liftering', 'TSA · FM0 · FM4 · M6A · M8A'], duration: 'About 25 minutes · beginner to specialist',
            outcomes: ['Explain why early bearing faults hide in high-frequency resonance.', 'Calculate and interpret bearing families with harmonics and sidebands.', 'Choose a manual envelope band or let the kurtogram propose one.', 'Combine envelope, cepstrum, TSA and indicators before accepting a bearing or gear verdict.'],
            interface: { title: 'A diagnostic workbench, not a single spectrum', intro: 'The future image will show bearing database/geometry, RPM, gear/TSA, envelope band, kurtogram depth, trend blocks and diagnosis controls beside Envelope, Cepstrum, TSA, Kurtogram, Trend and Diagnosis results.' },
            theory: { title: 'Local damage repeats slowly but excites the structure quickly', intro: 'A rolling element crossing a small defect creates a short impulse. That impulse excites a much higher-frequency housing resonance; the repetition rate is encoded as amplitude modulation around the resonance.', cards: [
                { kicker: 'START HERE', title: 'Envelope analysis demodulates the repetition', body: 'Band-pass the resonance, form the analytic-signal magnitude and take its spectrum. The carrier resonance disappears from centre stage; the BPFO/BPFI/BSF/FTF repetition families become readable.' },
                { kicker: 'BAND SELECTION', title: 'The kurtogram searches for impulsive bands', body: 'Spectral kurtosis compares frequency bands and levels to find where non-Gaussian transients concentrate. It proposes a demodulation band; it does not identify the component by itself.' },
                { kicker: 'GEAR VIEW', title: 'TSA locks the waveform to one revolution', body: 'Time Synchronous Averaging suppresses asynchronous content and reveals repeatable tooth-mesh behaviour. Removing the GMF family leaves a residual used by FM4, M6A and M8A-type local-damage indicators.' },
            ] },
            foundations: { title: 'Fault frequencies are families, not exact isolated lines', intro: 'Slip, speed variation, load zone and resolution move or spread peaks. Diagnosis is stronger when frequency families, modulation spacing and time-synchronous evidence agree.', cards: [
                { title: 'Geometry and RPM uncertainty', body: 'Ball count, pitch diameter, rolling-element diameter, contact angle and shaft speed all affect predicted frequencies. A bearing database entry must match the installed bearing and loaded geometry.' },
                { title: 'Sidebands explain modulation', body: 'BPFI commonly shows 1× sidebands because the inner-race defect moves through the load zone. GMF sidebands at shaft speed indicate amplitude or phase modulation, not a new mesh frequency.' },
                { title: 'Trend beats a universal threshold', body: 'RMS, crest factor, kurtosis and impulse/clearance factors depend on sensor, speed and load. Their direction relative to a stable baseline is often more useful than a generic one-time limit.' },
            ] },
            modes: { title: 'Choose the diagnostic lens that matches the fault mechanism', intro: 'Each implemented result removes a different kind of ambiguity.', items: [
                { title: 'Envelope · manual or kurtogram band', bestFor: 'Rolling-element fault families hidden under structural resonance.', reveals: 'Demodulated frequency peaks, calculated families, harmonics and sidebands.', watch: 'A band containing unrelated impacts or electrical switching can maximize kurtosis and still be the wrong mechanical band.' },
                { title: 'Cepstrum · optional liftering', bestFor: 'Regularly spaced harmonic or sideband families.', reveals: 'Quefrency peaks corresponding to frequency spacing; liftering can emphasize or suppress periodic structure.', watch: 'Quefrency is time-like spacing, not event time. Convert carefully and do not read the axis as seconds into the record.' },
                { title: 'Gear TSA · residual · indicators', bestFor: 'Separating repeatable mesh content from local tooth disturbance.', reveals: 'One-revolution waveform, residual after GMF-family removal, FM0/FM4/M6A/M8A and GMF context.', watch: 'TSA requires a trustworthy revolution reference and the correct gear tooth count.' },
            ] },
            interpretation: { intro: 'A diagnosis should name the observed evidence and the evidence still missing.', items: [
                { title: 'BPFI family with 1× sidebands', signal: 'Envelope peaks align with BPFI and harmonics, surrounded by shaft-speed spacing.', meaning: 'An inner-race defect is plausible because the defect rotates through the load zone.', confirm: 'Check another load/speed, sensor location and whether the same family strengthens over time.' },
                { title: 'Kurtogram hotspot but no fault family', signal: 'One band has high spectral kurtosis, yet its envelope spectrum does not align with calculated families.', meaning: 'An impulse source exists, but it may be looseness, rubbing, switching or an external transient.', confirm: 'Inspect the time waveform and repeat with manual bands before accepting the automatic verdict.' },
                { title: 'GMF sidebands and rising residual indicator', signal: 'Mesh harmonics carry shaft-spaced sidebands while FM4/M6A/M8A trend upward.', meaning: 'Localized tooth damage or modulation is more plausible than uniform wear alone.', confirm: 'Compare TSA residual shape, load repeatability and inspection evidence.' },
            ] },
            workflow: { title: 'An evidence ladder for bearing and gear diagnosis', intro: 'Start with trustworthy speed and geometry, then move from detection to component-specific confirmation.', checklist: ['Confirm sample rate covers the chosen structural resonance band with anti-alias margin.', 'Use measured RPM when speed varies; document any manual RPM assumption.', 'Match bearing database geometry to the installed bearing and contact angle.', 'Compare kurtogram-selected and physically plausible manual envelope bands.', 'Require multiple aligned family peaks or sidebands, not one nearest peak.', 'Trend indicators under comparable sensor, speed and load conditions.', 'For gear analysis, verify tooth count and tacho before using TSA or residual metrics.'] },
            mistakes: [
                { title: 'Demodulating the whole spectrum', body: 'Envelope analysis needs a resonance band. Including low-frequency running components and unrelated broadband content hides the modulation you want.' },
                { title: 'Calling the tallest envelope peak the fault', body: 'The strongest line may be shaft speed, modulation or another machine. Match a family with harmonics and sidebands.' },
                { title: 'Treating kurtogram maximum as diagnosis', body: 'A kurtogram selects an impulsive band; it does not know whether the source is a bearing, gear, rub, loose part or electrical event.' },
                { title: 'Comparing indicators across different operating states', body: 'Load and speed change RMS and impulsiveness. Trend only comparable conditions or normalize and document the change.' },
            ],
            sources: [
                { title: 'ISO 13373-2:2016', note: 'Machinery vibration processing, signature analysis and presentation techniques.', href: 'https://www.iso.org/standard/68128.html' },
                { title: 'ISO 13373-3:2015', note: 'Structured vibration-diagnosis procedure and examples of common rotating-machine faults.', href: 'https://www.iso.org/standard/40840.html' },
                { title: 'Antoni · The spectral kurtosis', note: 'Primary research establishing spectral kurtosis and the kurtogram for non-stationary fault detection.', href: 'https://doi.org/10.1016/j.ymssp.2004.09.001' },
            ] },
        tr: {
            title: 'Rulman ve Dişli Arıza Tanılama: zayıf darbeleri görünür yapın',
            intro: 'Rulman geometrisi ve mil hızından zarf spektrumuna, otomatik kurtogram bant seçimine, kepstruma, TSA’ya, dişli kalıntısına, durum göstergelerine ve kanıta dayalı tanıya ilerleyin; tek tepeyi hüküm sanmadan.',
            badges: ['BPFO · BPFI · BSF · FTF', 'Zarf ve kurtogram', 'Kepstrum ve liftering', 'TSA · FM0 · FM4 · M6A · M8A'], duration: 'Yaklaşık 25 dakika · başlangıçtan uzmana',
            outcomes: ['Erken rulman arızasının neden yüksek frekans rezonansında saklandığını açıklamak.', 'Harmonik ve yan bantlarla rulman ailelerini hesaplayıp yorumlamak.', 'Manuel zarf bandı seçmek veya kurtogramın önerisini kullanmak.', 'Rulman/dişli hükmü vermeden önce zarf, kepstrum, TSA ve göstergeleri birleştirmek.'],
            interface: { title: 'Tek spektrum değil, tanı çalışma tezgâhı', intro: 'İlerideki görüntü; rulman veritabanı/geometrisi, RPM, dişli/TSA, zarf bandı, kurtogram derinliği, trend blokları ve tanı ayarlarını; Zarf, Kepstrum, TSA, Kurtogram, Trend ve Tanı sonuçlarıyla gösterecek.' },
            theory: { title: 'Yerel hasar yavaş tekrar eder ama yapıyı hızlı uyarır', intro: 'Yuvarlanma elemanı küçük kusurun üzerinden geçerken kısa darbe üretir. Darbe çok daha yüksek frekanslı gövde rezonansını uyarır; tekrar hızı rezonans çevresinde genlik modülasyonu olarak kodlanır.', cards: [
                { kicker: 'BURADAN BAŞLAYIN', title: 'Zarf analizi tekrarı demodüle eder', body: 'Rezonansı banttan geçirin, analitik sinyal büyüklüğünü oluşturun ve spektrumunu alın. Taşıyıcı rezonans geri plana geçer; BPFO/BPFI/BSF/FTF tekrar aileleri okunur.' },
                { kicker: 'BANT SEÇİMİ', title: 'Kurtogram darbeli bantları arar', body: 'Spektral basıklık, Gauss dışı geçici olayların yoğunlaştığı yeri bulmak için frekans bant ve seviyelerini karşılaştırır. Demodülasyon bandı önerir; bileşeni tek başına tanımaz.' },
                { kicker: 'DİŞLİ BAKIŞI', title: 'TSA dalga biçimini bir devire kilitler', body: 'Zaman Senkronize Ortalama asenkron içeriği bastırıp tekrarlanan diş kavrama davranışını gösterir. GMF ailesini kaldırmak, FM4, M6A ve M8A türü yerel hasar göstergelerinin kullandığı kalıntıyı verir.' },
            ] },
            foundations: { title: 'Arıza frekansları tek kesin çizgi değil, ailedir', intro: 'Kayma, hız değişimi, yük bölgesi ve çözünürlük tepeleri kaydırır veya yayar. Frekans aileleri, modülasyon aralığı ve zaman senkron kanıtı aynı sonucu verdiğinde tanı güçlenir.', cards: [
                { title: 'Geometri ve RPM belirsizliği', body: 'Bilye sayısı, adım çapı, yuvarlanma elemanı çapı, temas açısı ve mil hızı tahminleri etkiler. Veritabanı kaydı takılı rulman ve yüklü geometriyle eşleşmelidir.' },
                { title: 'Yan bantlar modülasyonu açıklar', body: 'İç bilezik kusuru yük bölgesinden geçtiği için BPFI çoğunlukla 1× yan bant taşır. Mil hızı aralıklı GMF yan bantları yeni kavrama frekansı değil genlik/faz modülasyonudur.' },
                { title: 'Trend evrensel eşikten güçlüdür', body: 'RMS, crest factor, basıklık ve impulse/clearance factor sensör, hız ve yüke bağlıdır. Kararlı referansa göre yönleri çoğu zaman tek seferlik genel sınırdan daha değerlidir.' },
            ] },
            modes: { title: 'Arıza mekanizmasına uyan tanı merceğini seçin', intro: 'Uygulanan her sonuç farklı bir belirsizliği azaltır.', items: [
                { title: 'Zarf · manuel veya kurtogram bandı', bestFor: 'Yapısal rezonans altında saklı yuvarlanma elemanı arıza aileleri.', reveals: 'Demodüle frekans tepeleri, hesaplanan aileler, harmonikler ve yan bantlar.', watch: 'İlgisiz darbe veya elektrik anahtarlaması içeren bant kurtogramı büyütüp yine de yanlış mekanik bant olabilir.' },
                { title: 'Kepstrum · isteğe bağlı liftering', bestFor: 'Düzenli aralıklı harmonik veya yan bant aileleri.', reveals: 'Frekans aralığına karşılık gelen quefrency tepeleri; liftering periyodik yapıyı vurgular veya bastırır.', watch: 'Quefrency zaman benzeri aralıktır, kayıt içi olay zamanı değildir. Ekseni saniye konumu gibi okumayın.' },
                { title: 'Dişli TSA · kalıntı · göstergeler', bestFor: 'Tekrarlanan kavrama içeriğini yerel diş bozukluğundan ayırmak.', reveals: 'Bir devir dalga biçimi, GMF ailesi çıkarılmış kalıntı, FM0/FM4/M6A/M8A ve GMF bağlamı.', watch: 'TSA güvenilir devir referansı ve doğru diş sayısı ister.' },
            ] },
            interpretation: { intro: 'Tanı, gözlenen kanıtı ve hâlâ eksik kanıtı birlikte adlandırmalıdır.', items: [
                { title: '1× yan bantlı BPFI ailesi', signal: 'Zarf tepeleri BPFI ve harmoniklerine oturur; çevrelerinde mil hızı aralığı vardır.', meaning: 'Kusur yük bölgesinden döndüğü için iç bilezik hasarı olasıdır.', confirm: 'Başka yük/hız, sensör konumu ve zamanla aynı ailenin güçlenip güçlenmediğini kontrol edin.' },
                { title: 'Kurtogram sıcak noktası var, arıza ailesi yok', signal: 'Bir bant yüksek spektral basıklık taşır ama zarf spektrumu hesaplanan ailelerle örtüşmez.', meaning: 'Darbe kaynağı vardır; gevşeklik, sürtme, anahtarlama veya dış geçici olay olabilir.', confirm: 'Otomatik hükmü kabul etmeden önce zaman dalga biçimini inceleyip manuel bantlarla tekrarlayın.' },
                { title: 'GMF yan bantları ve yükselen kalıntı göstergesi', signal: 'Kavrama harmonikleri mil aralıklı yan bant taşırken FM4/M6A/M8A yükselir.', meaning: 'Tekdüze aşınmadan çok yerel diş hasarı veya modülasyon olasıdır.', confirm: 'TSA kalıntı şeklini, yük tekrarlanabilirliğini ve muayene bulgusunu karşılaştırın.' },
            ] },
            workflow: { title: 'Rulman ve dişli tanısı için kanıt merdiveni', intro: 'Güvenilir hız ve geometriyle başlayın; tespitten bileşene özel doğrulamaya ilerleyin.', checklist: ['Örnekleme hızının anti-alias payıyla seçilen yapısal rezonans bandını kapsadığını doğrulayın.', 'Hız değişiyorsa ölçülen RPM kullanın; manuel RPM varsayımını belgeleyin.', 'Rulman veritabanı geometrisini takılı rulman ve temas açısıyla eşleştirin.', 'Kurtogramın seçtiği bandı fiziksel olarak makul manuel bantlarla karşılaştırın.', 'Tek yakın tepe yerine hizalı birden fazla aile tepesi veya yan bant isteyin.', 'Göstergeleri karşılaştırılabilir sensör, hız ve yük koşullarında trendleyin.', 'Dişli analizinde TSA veya kalıntı kullanmadan önce diş sayısı ve takoyu doğrulayın.'] },
            mistakes: [
                { title: 'Tüm spektrumu demodüle etmek', body: 'Zarf analizi rezonans bandı ister. Düşük frekans çalışma bileşenleri ve ilgisiz geniş bant içeriği aranan modülasyonu saklar.' },
                { title: 'En yüksek zarf tepesine arıza demek', body: 'En güçlü çizgi mil hızı, modülasyon veya başka makine olabilir. Harmonik ve yan bantlı aileyi eşleştirin.' },
                { title: 'Kurtogram maksimumunu tanı saymak', body: 'Kurtogram darbeli bandı seçer; kaynağın rulman, dişli, sürtme, gevşek parça veya elektrik olmasını bilemez.' },
                { title: 'Farklı çalışma durumlarında göstergeleri karşılaştırmak', body: 'Yük ve hız RMS ile darbeselliği değiştirir. Yalnız karşılaştırılabilir koşulları trendleyin veya değişimi normalize edip belgeleyin.' },
            ],
            sources: [
                { title: 'ISO 13373-2:2016', note: 'Makine titreşimi işleme, imza analizi ve sunum teknikleri.', href: 'https://www.iso.org/standard/68128.html' },
                { title: 'ISO 13373-3:2015', note: 'Yapılandırılmış titreşim tanısı ve yaygın döner makine arızaları örnekleri.', href: 'https://www.iso.org/standard/40840.html' },
                { title: 'Antoni · The spectral kurtosis', note: 'Durağan olmayan arıza tespiti için spektral basıklık ve kurtogramı kuran birincil araştırma.', href: 'https://doi.org/10.1016/j.ymssp.2004.09.001' },
            ] },
    },
    machine_health_overview: {
        en: {
            title: 'Machine Health Overview: screen many channels without losing context',
            intro: 'Learn how the dashboard reduces each selected channel to RMS, peak, crest factor, kurtosis and peak-to-peak, applies the widget’s configurable legacy ISO 10816-style zone table, and builds trend and alarm views for triage—not final diagnosis.',
            badges: ['Per-channel health cards', 'RMS · peak · crest · kurtosis', 'Zone A–D screening', 'Trend & alarm log'], duration: 'About 15 minutes · beginner to specialist',
            outcomes: ['Explain what an overall RMS value keeps and what it hides.', 'Select the correct configured machine group before reading zones.', 'Use trends and exception lists to prioritize deeper analysis.', 'Avoid presenting the dashboard as automatic fault identification or blanket ISO compliance.'],
            interface: { title: 'A first-look dashboard for a multi-channel machine', intro: 'The final screenshot will show machine group, channel selection, health cards, RMS trend and alarm log. The guide below explains exactly what those implemented results mean.' },
            theory: { title: 'Screening compresses detail to reveal where to look next', intro: 'A health overview trades spectral detail for fast comparison. It answers which channels are elevated, changing or impulsive; it does not name the root cause.', cards: [
                { kicker: 'START HERE', title: 'RMS measures overall energy', body: 'RMS is sensitive to sustained vibration and is useful for severity trending. Two signals with the same RMS can still have very different spectra and fault mechanisms.' },
                { kicker: 'IMPULSIVENESS', title: 'Peak, crest and kurtosis add shape clues', body: 'Peak catches extremes; crest factor compares peak with RMS; kurtosis highlights heavy-tailed impulsive behaviour. They help triage but depend strongly on bandwidth and sensor setup.' },
                { kicker: 'ZONE CONTEXT', title: 'A zone is not a universal truth', body: 'The current widget uses selectable legacy ISO 10816-style group thresholds. The correct modern ISO 20816 part, machine type, power, mounting and measurement location still govern formal evaluation.' },
            ] },
            foundations: { title: 'Overall metrics are only comparable under controlled conditions', intro: 'Unit, bandwidth, sensor direction, machine state and window length define the number as much as the machine does.', cards: [
                { title: 'Velocity versus acceleration', body: 'ISO-style machine severity commonly uses broadband RMS velocity at specified locations. An acceleration channel cannot be compared with mm/s limits unless it is correctly converted and band-limited.' },
                { title: 'Trend design', body: 'A stable baseline needs repeatable load, speed and temperature. A small sustained rise can matter more than one isolated point in a high zone.' },
                { title: 'Dashboard purpose', body: 'Health cards and alarms prioritize channels. Confirm the cause with spectrum, order tracking, bearing/gear diagnosis or rotor analysis before maintenance action.' },
            ] },
            modes: { title: 'Read the dashboard in three passes', intro: 'Move from present severity to change over time, then to the exceptions that require investigation.', items: [
                { title: 'Channel health cards', bestFor: 'Comparing current RMS, peak, crest factor and zone across sensors.', reveals: 'Which measurement points are elevated or unusually impulsive now.', watch: 'Different units or sensor orientations invalidate direct ranking.' },
                { title: 'RMS trend', bestFor: 'Seeing gradual deterioration or operating-state shifts.', reveals: 'Direction, rate and timing of overall vibration change.', watch: 'Load, speed and temperature changes can move the trend without damage.' },
                { title: 'Alarm log', bestFor: 'Finding when and where configured thresholds were exceeded.', reveals: 'Channel, time, measured value and threshold context for exceptions.', watch: 'An alarm is a trigger for review, not a diagnosed fault.' },
            ] },
            interpretation: { intro: 'Use the overview to ask a better next question.', items: [
                { title: 'RMS rises while crest factor stays stable', signal: 'Overall level climbs without becoming more impulsive.', meaning: 'A sustained component or operating load may be increasing.', confirm: 'Inspect spectra/order maps and compare speed, load and temperature.' },
                { title: 'Crest factor and kurtosis rise before RMS', signal: 'Rare peaks grow while total energy changes little.', meaning: 'Early impacts or intermittent events are plausible.', confirm: 'Open the time waveform and bearing/gear envelope analysis; rule out electrical spikes and loose mounting.' },
                { title: 'One channel enters a worse zone', signal: 'A single location changes while neighbouring points remain stable.', meaning: 'A local source, sensor issue or mounting problem is more likely than a machine-wide change.', confirm: 'Check sensor integrity and compare directionally related channels before escalating.' },
            ] },
            workflow: { title: 'A responsible health-screening routine', intro: 'Configure the measurement basis first, then use the dashboard to route deeper engineering work.', checklist: ['Verify every selected channel unit and whether velocity conversion is valid.', 'Choose the machine group that matches the installed machine; record the choice.', 'Use comparable speed, load, mounting and bandwidth for trend points.', 'Review RMS together with peak, crest factor, kurtosis and peak-to-peak.', 'Treat zone boundaries and custom alarms as screening limits.', 'Attach a diagnostic follow-up to every persistent or severe exception.'] },
            mistakes: [
                { title: 'Applying mm/s zone limits to raw acceleration', body: 'The physical quantity and evaluation band must match the limit. A unit label change is not a valid integration.' },
                { title: 'Calling Zone D a fault diagnosis', body: 'The zone indicates severity under the configured table; it does not identify imbalance, misalignment, bearing damage or looseness.' },
                { title: 'Ignoring the machine-specific standard part', body: 'ISO 20816 contains different parts and criteria for different machine families. The dashboard’s legacy group table is a screening aid.' },
                { title: 'Reacting to one point without operating context', body: 'A load step or speed change can raise RMS legitimately. Confirm persistence and compare the operating state.' },
            ],
            sources: [
                { title: 'ISO 20816-1:2016', note: 'General procedures for measuring and evaluating vibration magnitude and change on complete machines.', href: 'https://www.iso.org/standard/63180.html' },
                { title: 'ISO 20816-3:2022', note: 'Machine-specific guidance for industrial machinery over 15 kW and 120–30,000 r/min.', href: 'https://www.iso.org/ics/17.160/x/' },
                { title: 'ISO 13373-3:2015', note: 'Structured follow-up diagnosis after a condition-monitoring exception is detected.', href: 'https://www.iso.org/standard/40840.html' },
            ] },
        tr: {
            title: 'Makine Sağlığı Genel Görünümü: bağlamı kaybetmeden çok kanalı tarayın',
            intro: 'Panelin her seçili kanalı RMS, tepe, crest factor, basıklık ve tepeden-tepeye değerlerine nasıl indirdiğini; widget’ın yapılandırılabilir eski ISO 10816 tarzı bölge tablosunu nasıl uyguladığını ve önceliklendirme için trend/alarm ürettiğini öğrenin. Bu bir son tanı değildir.',
            badges: ['Kanal sağlık kartları', 'RMS · tepe · crest · basıklık', 'Bölge A–D taraması', 'Trend ve alarm günlüğü'], duration: 'Yaklaşık 15 dakika · başlangıçtan uzmana',
            outcomes: ['Genel RMS’in neyi koruyup neyi sakladığını açıklamak.', 'Bölgeleri okumadan önce doğru yapılandırılmış makine grubunu seçmek.', 'Derin analizi önceliklendirmek için trend ve istisna listesini kullanmak.', 'Paneli otomatik arıza tanısı veya genel ISO uygunluğu gibi sunmamak.'],
            interface: { title: 'Çok kanallı makine için ilk bakış paneli', intro: 'Son ekran görüntüsü makine grubunu, kanal seçimini, sağlık kartlarını, RMS trendini ve alarm günlüğünü gösterecek. Aşağıdaki rehber bu gerçek çıktıların anlamını açıklar.' },
            theory: { title: 'Tarama, nereye bakılacağını göstermek için ayrıntıyı sıkıştırır', intro: 'Sağlık özeti hızlı karşılaştırma için spektral ayrıntıdan vazgeçer. Hangi kanalın yükseldiğini, değiştiğini veya darbeli olduğunu söyler; kök nedeni adlandırmaz.', cards: [
                { kicker: 'BURADAN BAŞLAYIN', title: 'RMS genel enerjiyi ölçer', body: 'RMS sürekli titreşime duyarlıdır ve şiddet trendi için yararlıdır. Aynı RMS’e sahip iki sinyalin spektrumu ve arıza mekanizması tamamen farklı olabilir.' },
                { kicker: 'DARBELİLİK', title: 'Tepe, crest ve basıklık şekil ipucu ekler', body: 'Tepe uç değerleri yakalar; crest factor tepeyi RMS’e böler; basıklık ağır kuyruklu darbeli davranışı öne çıkarır. Tarama sağlarlar ama bant ve sensör kurulumuna güçlü biçimde bağlıdırlar.' },
                { kicker: 'BÖLGE BAĞLAMI', title: 'Bölge evrensel gerçek değildir', body: 'Mevcut widget seçilebilir eski ISO 10816 tarzı grup eşikleri kullanır. Resmî değerlendirmeyi doğru güncel ISO 20816 bölümü, makine tipi, güç, montaj ve ölçüm konumu yönetir.' },
            ] },
            foundations: { title: 'Genel metrikler yalnız kontrollü koşullarda karşılaştırılır', intro: 'Birim, bant genişliği, sensör yönü, makine durumu ve pencere süresi sayıyı makine kadar belirler.', cards: [
                { title: 'Hız ve ivme', body: 'ISO tarzı makine şiddeti çoğunlukla belirli konumlarda geniş bant RMS hız kullanır. İvme kanalı doğru entegre edilip bantlanmadan mm/s sınırıyla karşılaştırılamaz.' },
                { title: 'Trend tasarımı', body: 'Kararlı referans tekrarlanabilir yük, hız ve sıcaklık ister. Küçük ama sürekli artış, yüksek bölgedeki tek izole noktadan daha önemli olabilir.' },
                { title: 'Panelin amacı', body: 'Sağlık kartları ve alarmlar kanalları önceliklendirir. Bakım kararı öncesi nedeni spektrum, order, rulman/dişli veya rotor analiziyle doğrulayın.' },
            ] },
            modes: { title: 'Paneli üç geçişte okuyun', intro: 'Mevcut şiddetten zaman içindeki değişime, oradan araştırma gerektiren istisnalara ilerleyin.', items: [
                { title: 'Kanal sağlık kartları', bestFor: 'Sensörler arasında mevcut RMS, tepe, crest factor ve bölgeyi karşılaştırmak.', reveals: 'Şu anda hangi ölçüm noktalarının yüksek veya olağandışı darbeli olduğu.', watch: 'Farklı birim veya sensör yönleri doğrudan sıralamayı geçersiz kılar.' },
                { title: 'RMS trendi', bestFor: 'Kademeli bozulmayı veya çalışma durumu değişimini görmek.', reveals: 'Genel titreşim değişiminin yönü, hızı ve zamanı.', watch: 'Yük, hız ve sıcaklık değişimi hasar olmadan trendi oynatabilir.' },
                { title: 'Alarm günlüğü', bestFor: 'Yapılandırılmış eşiğin ne zaman ve nerede aşıldığını bulmak.', reveals: 'İstisna için kanal, zaman, ölçülen değer ve eşik bağlamı.', watch: 'Alarm tanılanmış arıza değil, inceleme tetikleyicisidir.' },
            ] },
            interpretation: { intro: 'Özeti daha iyi bir sonraki soru sormak için kullanın.', items: [
                { title: 'Crest factor sabitken RMS yükseliyor', signal: 'Genel seviye artar, sinyal daha darbeli hale gelmez.', meaning: 'Sürekli bileşen veya çalışma yükü artıyor olabilir.', confirm: 'Spektrum/order haritasını inceleyip hız, yük ve sıcaklığı karşılaştırın.' },
                { title: 'RMS’ten önce crest factor ve basıklık yükseliyor', signal: 'Toplam enerji az değişirken nadir tepeler büyür.', meaning: 'Erken darbeler veya aralıklı olaylar olasıdır.', confirm: 'Zaman dalga biçimini ve rulman/dişli zarf analizini açın; elektrik sıçraması ve gevşek montajı eleyin.' },
                { title: 'Tek kanal daha kötü bölgeye giriyor', signal: 'Komşu noktalar sabitken bir konum değişir.', meaning: 'Makine geneli yerine yerel kaynak, sensör veya montaj sorunu olasıdır.', confirm: 'Yükseltmeden önce sensör sağlamlığını ve ilişkili yön kanallarını kontrol edin.' },
            ] },
            workflow: { title: 'Sorumlu sağlık tarama rutini', intro: 'Önce ölçüm temelini yapılandırın; sonra paneli daha derin mühendislik işine yönlendirmek için kullanın.', checklist: ['Her kanalın birimini ve hız dönüşümünün geçerli olup olmadığını doğrulayın.', 'Kurulu makineye uyan grubu seçip kaydedin.', 'Trend noktalarında karşılaştırılabilir hız, yük, montaj ve bant kullanın.', 'RMS’i tepe, crest factor, basıklık ve tepeden-tepeye ile birlikte inceleyin.', 'Bölge sınırları ve özel alarmları tarama limiti olarak görün.', 'Kalıcı veya şiddetli her istisnaya tanısal takip bağlayın.'] },
            mistakes: [
                { title: 'Ham ivmeye mm/s bölge sınırı uygulamak', body: 'Fiziksel büyüklük ve değerlendirme bandı sınırla eşleşmelidir. Birim etiketini değiştirmek geçerli entegrasyon değildir.' },
                { title: 'Bölge D’ye arıza tanısı demek', body: 'Bölge yapılandırılmış tablo altında şiddeti gösterir; balanssızlık, eksen kaçıklığı, rulman hasarı veya gevşekliği tanımlamaz.' },
                { title: 'Makineye özel standart bölümünü yok saymak', body: 'ISO 20816 farklı makine aileleri için farklı bölümler içerir. Panelin eski grup tablosu tarama yardımıdır.' },
                { title: 'Çalışma bağlamı olmadan tek noktaya tepki vermek', body: 'Yük veya hız adımı RMS’i doğal olarak yükseltebilir. Kalıcılığı ve çalışma durumunu doğrulayın.' },
            ],
            sources: [
                { title: 'ISO 20816-1:2016', note: 'Tam makinelerde titreşim büyüklüğü ve değişiminin ölçülmesi/değerlendirilmesi için genel prosedürler.', href: 'https://www.iso.org/standard/63180.html' },
                { title: 'ISO 20816-3:2022', note: '15 kW üzeri ve 120–30.000 dev/dk endüstriyel makineler için özel kılavuz.', href: 'https://www.iso.org/ics/17.160/x/' },
                { title: 'ISO 13373-3:2015', note: 'Durum izleme istisnası sonrası yapılandırılmış takip tanısı.', href: 'https://www.iso.org/standard/40840.html' },
            ] },
    },
    structural_health: {
        en: {
            title: 'Structural Health Monitoring: trend multi-sensor change without over-claiming damage',
            intro: 'Understand the widget as it exists today: windowed RMS, peak and crest-factor trends for multiple channels, an RMS alarm log, selectable legacy ISO 10816 class context and an inter-channel correlation matrix. It screens change; it does not yet perform modal-damage localization.',
            badges: ['Windowed multi-channel trends', 'RMS alarm events', 'Correlation matrix', 'Transient analysis results'], duration: 'About 17 minutes · beginner to specialist',
            outcomes: ['Design a window length that matches the structural change of interest.', 'Read RMS, peak and crest trends together across sensors.', 'Use correlation change as a clue rather than proof of damage.', 'State clearly what the current widget computes and what requires future modal/environmental analysis.'],
            interface: { title: 'Long records become comparable sensor trends', intro: 'The eventual screenshot will show channel selection, sample rate, window duration, ISO class/alarm threshold, trend plots, alarms and correlation. This guide is intentionally limited to those implemented capabilities.' },
            theory: { title: 'Health monitoring begins by turning waveforms into repeatable features', intro: 'A long vibration record is divided into time windows. Each sensor receives the same RMS, peak and crest-factor summaries so changes can be compared in time and across locations.', cards: [
                { kicker: 'START HERE', title: 'The window defines the question', body: 'A short window follows fast events but produces noisy features. A long window stabilizes the trend but can smear brief impacts or operating transitions.' },
                { kicker: 'MULTI-SENSOR VIEW', title: 'Location patterns matter', body: 'A structure-wide load change often affects many channels together. A local change may affect one region or alter relationships between channels.' },
                { kicker: 'CURRENT SCOPE', title: 'This is feature trending, not modal damage ID', body: 'The implemented widget computes windowed statistics, threshold events and Pearson correlation. Natural-frequency drift, environmental normalization, MAC and localization require additional analysis outside this current page.' },
            ] },
            foundations: { title: 'Baseline quality limits every later conclusion', intro: 'A threshold has little meaning when the healthy operating range, sensor stability and environmental variation are unknown.', cards: [
                { title: 'Comparable operating state', body: 'Speed, load, temperature, traffic and wind can change structural response. Segment or label states so ordinary operation is not mistaken for degradation.' },
                { title: 'Correlation is linear and global', body: 'Pearson correlation measures shared linear variation over the selected data. It can change because of phase, noise, forcing or amplitude—not only stiffness damage.' },
                { title: 'Alarm threshold units', body: 'The current RMS alarm is a user-selected value. Ensure every selected channel has the intended physical quantity and unit before applying one threshold.' },
            ] },
            modes: { title: 'Read feature level, event timing and sensor relation separately', intro: 'The three result families answer different questions and should not be collapsed into one health score.', items: [
                { title: 'RMS · peak · crest trends', bestFor: 'Following sustained energy, extremes and impulsiveness over windows.', reveals: 'When each channel changes and which feature changed first.', watch: 'Window length and operating state can move all three without structural damage.' },
                { title: 'Alarm events', bestFor: 'Finding windows whose RMS crossed the configured limit.', reveals: 'Time, channel, measured RMS and threshold for each exception.', watch: 'The threshold is user/configuration context, not automatic code compliance or damage proof.' },
                { title: 'Correlation matrix', bestFor: 'Comparing linear relationships among simultaneous sensors.', reveals: 'Which channels move together, oppose or behave independently over the analyzed span.', watch: 'High correlation can come from common forcing; low correlation can come from noise or phase differences.' },
            ] },
            interpretation: { intro: 'Look for repeatable change patterns across features and operating states.', items: [
                { title: 'RMS and peak rise across all sensors', signal: 'Many channels increase together with similar timing.', meaning: 'A common load or operating-state change is more likely than local damage.', confirm: 'Compare speed, load, temperature and the source event before escalating.' },
                { title: 'One region shows rising crest factor', signal: 'Local channels become more impulsive while global RMS remains stable.', meaning: 'Intermittent local contact, looseness or sensor/mounting issue is plausible.', confirm: 'Inspect time waveforms and mounting; repeat under the same state.' },
                { title: 'Correlation pattern shifts after an event', signal: 'Previously related channels become less related or new pairs strengthen.', meaning: 'The response distribution or forcing pattern changed.', confirm: 'Recompute on equal operating states and follow with FRF, OMA or ODS before attributing the shift to damage.' },
            ] },
            workflow: { title: 'A transparent structural trend workflow', intro: 'Preserve the context that lets tomorrow’s window be compared with today’s.', checklist: ['Use synchronized channels with documented positions, directions and units.', 'Choose window duration from the event timescale, not a default value.', 'Record operating and environmental variables alongside vibration.', 'Set RMS alarms from a validated baseline or applicable project limit.', 'Compare feature trends and correlation only across equivalent states.', 'Use FRF/EMA, OMA or ODS for follow-up when the screening result suggests a structural change.'] },
            mistakes: [
                { title: 'Calling a threshold crossing “damage detected”', body: 'The alarm says one window exceeded a configured RMS level. Load, speed, environment and sensor issues must be ruled out.' },
                { title: 'Claiming modal-frequency tracking from the current widget', body: 'The present implementation computes windowed RMS, peak, crest, alarms and correlation—not modal poles, MAC or damage localization.' },
                { title: 'Comparing correlation from different operating states', body: 'A new forcing pattern can change correlation even when the structure is unchanged.' },
                { title: 'Using one window size for every phenomenon', body: 'Short shocks, machinery cycles and seasonal structural change live on different timescales. Choose and document the window accordingly.' },
            ],
            sources: [
                { title: 'ISO 4866:2010', note: 'Principles for measuring structural vibration and evaluating its effects on fixed structures.', href: 'https://www.iso.org/standard/38967.html' },
                { title: 'ISO 20816-1:2016', note: 'General machine-vibration magnitude/change concepts relevant to the widget’s legacy zone context.', href: 'https://www.iso.org/standard/63180.html' },
                { title: 'Farrar & Worden · Structural Health Monitoring', note: 'Foundational framework for separating data acquisition, feature extraction and statistical decision making.', href: 'https://doi.org/10.1098/rsta.2006.1928' },
            ] },
        tr: {
            title: 'Yapısal Sağlık İzleme: hasar iddiasını büyütmeden çoklu sensör değişimini trendleyin',
            intro: 'Widget’ı bugün olduğu haliyle anlayın: çoklu kanalda pencereli RMS, tepe ve crest-factor trendleri, RMS alarm günlüğü, seçilebilir eski ISO 10816 sınıf bağlamı ve kanallar arası korelasyon matrisi. Değişimi tarar; henüz modal hasar yerelleştirmesi yapmaz.',
            badges: ['Pencereli çok kanal trendi', 'RMS alarm olayları', 'Korelasyon matrisi', 'Geçici analiz sonuçları'], duration: 'Yaklaşık 17 dakika · başlangıçtan uzmana',
            outcomes: ['İlgilenilen yapısal değişime uygun pencere süresi tasarlamak.', 'Sensörler arasında RMS, tepe ve crest trendlerini birlikte okumak.', 'Korelasyon değişimini hasar kanıtı değil ipucu olarak kullanmak.', 'Mevcut widget’ın hesapladığını ve gelecekte modal/çevresel analiz gerektiren kısmı açıkça söylemek.'],
            interface: { title: 'Uzun kayıtlar karşılaştırılabilir sensör trendlerine dönüşür', intro: 'Son ekran görüntüsü kanal seçimini, örnekleme hızını, pencere süresini, ISO sınıfı/alarm eşiğini, trendleri, alarmları ve korelasyonu gösterecek. Bu rehber bilinçli olarak uygulanmış yeteneklerle sınırlıdır.' },
            theory: { title: 'Sağlık izleme dalga biçimini tekrarlanabilir özniteliğe çevirmekle başlar', intro: 'Uzun titreşim kaydı zaman pencerelerine bölünür. Her sensöre aynı RMS, tepe ve crest-factor özetleri uygulanır; böylece değişim zaman ve konumlar arasında karşılaştırılır.', cards: [
                { kicker: 'BURADAN BAŞLAYIN', title: 'Pencere soruyu tanımlar', body: 'Kısa pencere hızlı olayı izler ama gürültülü öznitelik üretir. Uzun pencere trendi kararlı yapar fakat kısa darbeleri veya çalışma geçişlerini yayabilir.' },
                { kicker: 'ÇOKLU SENSÖR', title: 'Konum desenleri önemlidir', body: 'Yapı genelindeki yük değişimi çoğu kanalı birlikte etkiler. Yerel değişim tek bölgeyi etkileyebilir veya kanallar arasındaki ilişkiyi değiştirebilir.' },
                { kicker: 'MEVCUT KAPSAM', title: 'Bu öznitelik trendidir, modal hasar tanısı değil', body: 'Uygulanan widget pencereli istatistik, eşik olayı ve Pearson korelasyonu hesaplar. Doğal frekans kayması, çevresel normalizasyon, MAC ve yerelleştirme bugün ayrı analiz gerektirir.' },
            ] },
            foundations: { title: 'Referans kalitesi tüm sonraki sonucu sınırlar', intro: 'Sağlıklı çalışma aralığı, sensör kararlılığı ve çevresel değişim bilinmiyorsa eşik az anlam taşır.', cards: [
                { title: 'Karşılaştırılabilir çalışma durumu', body: 'Hız, yük, sıcaklık, trafik ve rüzgâr yapısal tepkiyi değiştirir. Normal işletimi bozulma sanmamak için durumları bölün veya etiketleyin.' },
                { title: 'Korelasyon doğrusaldır ve geneldir', body: 'Pearson korelasyonu seçilen veri boyunca ortak doğrusal değişimi ölçer. Yalnız rijitlik hasarı değil; faz, gürültü, uyarma veya genlik de değiştirebilir.' },
                { title: 'Alarm eşiği birimleri', body: 'Mevcut RMS alarmı kullanıcı seçimi bir değerdir. Tek eşiği uygulamadan önce tüm kanalların amaçlanan fiziksel büyüklük ve birimde olduğundan emin olun.' },
            ] },
            modes: { title: 'Öznitelik seviyesi, olay zamanı ve sensör ilişkisini ayrı okuyun', intro: 'Üç sonuç ailesi farklı soruları yanıtlar; tek sağlık puanında eritilmemelidir.', items: [
                { title: 'RMS · tepe · crest trendleri', bestFor: 'Sürekli enerji, uç değer ve darbeliliği pencereler boyunca izlemek.', reveals: 'Her kanalın ne zaman değiştiği ve ilk hangi özniteliğin oynadığı.', watch: 'Pencere süresi ve çalışma durumu hasar olmadan üçünü de değiştirebilir.' },
                { title: 'Alarm olayları', bestFor: 'RMS’in yapılandırılmış sınırı geçtiği pencereleri bulmak.', reveals: 'Her istisna için zaman, kanal, ölçülen RMS ve eşik.', watch: 'Eşik kullanıcı/yapılandırma bağlamıdır; otomatik standart uygunluğu veya hasar kanıtı değildir.' },
                { title: 'Korelasyon matrisi', bestFor: 'Eşzamanlı sensörler arasındaki doğrusal ilişkiyi karşılaştırmak.', reveals: 'Analiz aralığında hangi kanalların birlikte, zıt veya bağımsız davrandığı.', watch: 'Yüksek korelasyon ortak uyarımdan; düşük korelasyon gürültü veya faz farkından doğabilir.' },
            ] },
            interpretation: { intro: 'Öznitelikler ve çalışma durumları boyunca tekrarlanan değişim desenlerini arayın.', items: [
                { title: 'RMS ve tepe tüm sensörlerde yükseliyor', signal: 'Çok kanal benzer zamanda birlikte artar.', meaning: 'Yerel hasardan çok ortak yük veya çalışma durumu değişimi olasıdır.', confirm: 'Yükseltmeden önce hız, yük, sıcaklık ve kaynak olayı karşılaştırın.' },
                { title: 'Tek bölgede crest factor yükseliyor', signal: 'Genel RMS sabitken yerel kanallar daha darbeli olur.', meaning: 'Aralıklı yerel temas, gevşeklik veya sensör/montaj sorunu olasıdır.', confirm: 'Zaman dalga biçimi ve montajı inceleyip aynı durumda tekrarlayın.' },
                { title: 'Olay sonrası korelasyon deseni kayıyor', signal: 'Önceden ilişkili kanallar ayrılır veya yeni çiftler güçlenir.', meaning: 'Tepki dağılımı ya da uyarma deseni değişmiştir.', confirm: 'Eşdeğer çalışma durumlarında yeniden hesaplayın; hasar demeden önce FRF, OMA veya ODS ile izleyin.' },
            ] },
            workflow: { title: 'Şeffaf yapısal trend iş akışı', intro: 'Yarının penceresini bugünle karşılaştırmayı sağlayan bağlamı koruyun.', checklist: ['Konumu, yönü ve birimi belgelenmiş eşzamanlı kanallar kullanın.', 'Pencere süresini varsayılan değerden değil olay zaman ölçeğinden seçin.', 'Titreşimle birlikte çalışma ve çevre değişkenlerini kaydedin.', 'RMS alarmlarını doğrulanmış referans veya geçerli proje sınırından belirleyin.', 'Öznitelik ve korelasyonu yalnız eşdeğer durumlarda karşılaştırın.', 'Tarama yapısal değişim düşündürüyorsa FRF/EMA, OMA veya ODS ile takip edin.'] },
            mistakes: [
                { title: 'Eşik aşımına “hasar tespit edildi” demek', body: 'Alarm bir pencerenin yapılandırılmış RMS seviyesini geçtiğini söyler. Yük, hız, çevre ve sensör sorunları elenmelidir.' },
                { title: 'Mevcut widget’tan modal frekans takibi iddia etmek', body: 'Bugünkü uygulama pencereli RMS, tepe, crest, alarm ve korelasyon hesaplar; modal kutup, MAC veya hasar yerelleştirmesi değil.' },
                { title: 'Farklı çalışma durumlarının korelasyonunu karşılaştırmak', body: 'Yeni uyarma deseni yapı değişmeden de korelasyonu değiştirebilir.' },
                { title: 'Her olgu için tek pencere boyu kullanmak', body: 'Kısa şok, makine çevrimi ve mevsimsel yapısal değişim farklı zaman ölçeğindedir. Pencereyi buna göre seçip belgeleyin.' },
            ],
            sources: [
                { title: 'ISO 4866:2010', note: 'Sabit yapılarda titreşim ölçümü ve etkilerinin değerlendirilmesi için ilkeler.', href: 'https://www.iso.org/standard/38967.html' },
                { title: 'ISO 20816-1:2016', note: 'Widget’ın eski bölge bağlamıyla ilgili genel makine titreşim büyüklüğü/değişim kavramları.', href: 'https://www.iso.org/standard/63180.html' },
                { title: 'Farrar & Worden · Structural Health Monitoring', note: 'Veri toplama, öznitelik çıkarma ve istatistiksel karar adımlarını ayıran temel çerçeve.', href: 'https://doi.org/10.1098/rsta.2006.1928' },
            ] },
    },
}

export default DIAGNOSTICS_LEARNING
