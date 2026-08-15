const MEASUREMENT_LEARNING = {
    shock_srs: {
        en: {
            title: 'Shock & SRS: translate one transient into structural demand',
            intro: 'Learn how the real widget conditions an acceleration pulse, runs an ISO 18431-4 oscillator bank, separates maximax, positive/negative and primary/residual response, and presents acceleration, pseudo-velocity, relative displacement, pulse metrics and specification comparison.',
            badges: ['ISO 18431-4 solver', 'Maximax · ± · primary/residual', 'Pseudo-velocity nomogram', 'Pulse & specification metrics'], duration: 'About 21 minutes · beginner to specialist',
            outcomes: ['Explain SRS without treating it as a Fourier spectrum.', 'Choose damping/Q, frequency limits and octave spacing from a test requirement.', 'Distinguish primary response during the pulse from residual ring-down.', 'Check sampling, baseline correction and pulse window before judging compliance.'],
            interface: { title: 'A shock event viewed through thousands of virtual oscillators', intro: 'The future screenshot will show input unit/correction, damping, curve families, octave spacing, frequency range, pulse characterization, response tabs and result metrics. This guide already follows those implemented controls.' },
            theory: { title: 'SRS asks how many structures would respond to the same shock', intro: 'Imagine a bank of single-degree-of-freedom systems spanning natural frequency. Drive every oscillator with the measured base acceleration and keep its largest response. The resulting envelope is the SRS.', cards: [
                { kicker: 'START HERE', title: 'SRS is not an FFT', body: 'An FFT decomposes signal content into sinusoids. SRS reports the worst response of damped oscillators. Two pulses with similar spectra can produce different SRS because duration and phase history matter.' },
                { kicker: 'OSCILLATOR MODEL', title: 'Damping changes the demand', body: 'Quality factor Q and damping ratio ζ describe the same oscillator sharpness through Q = 1/(2ζ). Lower damping creates a narrower, larger resonant response.' },
                { kicker: 'AFTER THE PULSE', title: 'Residual response tells a different story', body: 'Primary SRS considers response while the defined pulse is active. Residual SRS captures free vibration after it ends and is sensitive to how energy remains stored in the oscillator.' },
            ] },
            foundations: { title: 'Shock calculations are only as good as pulse capture', intro: 'A clipped peak, sensor resonance, insufficient sample rate or baseline error can change high-frequency SRS and delta-V more than the solver choice.', cards: [
                { title: 'Baseline correction', body: 'Robust baseline, initial-window mean and endpoint-linear drift address different offsets. Correction should remove instrumentation bias without erasing real low-frequency pulse content.' },
                { title: 'Frequency grid and sampling', body: 'Points per octave control curve density, not new information. Maximum oscillator frequency must respect sampling rate, sensor bandwidth and mounting resonance.' },
                { title: 'Pulse window', body: 'Automatic thresholding is convenient; a manual interval is better when ringing or multiple events confuse the threshold. Primary/residual meaning depends on this boundary.' },
            ] },
            modes: { title: 'Read acceleration, velocity and displacement together', intro: 'Each SRS representation highlights a different part of structural demand.', items: [
                { title: 'Acceleration SRS', bestFor: 'High-frequency inertial demand and direct comparison with many qualification specifications.', reveals: 'Maximax and optional polarity/primary/residual peak acceleration versus oscillator frequency.', watch: 'High-frequency rise can be dominated by sensor/mount resonance or inadequate sampling.' },
                { title: 'Pseudo-velocity nomogram', bestFor: 'Comparing shock severity across frequency decades and relating response to energy-like demand.', reveals: 'Pseudo-velocity derived from oscillator displacement and natural frequency.', watch: 'Pseudo-velocity is a response coordinate, not the measured input velocity or delta-V.' },
                { title: 'Relative displacement SRS', bestFor: 'Low-frequency stroke, clearance and mount travel questions.', reveals: 'Peak relative motion between oscillator mass and base.', watch: 'Baseline drift strongly contaminates low-frequency displacement response.' },
            ] },
            interpretation: { intro: 'Use curve shape, pulse metrics and specification margin together.', items: [
                { title: 'Broad high-frequency plateau', signal: 'Acceleration SRS approaches a near-flat high-frequency level.', meaning: 'Oscillators are following a short acceleration feature almost rigidly.', confirm: 'Verify sensor bandwidth, mounting and that the feature is not clipping or electrical spike.' },
                { title: 'Strong residual band', signal: 'Residual response remains high after the pulse near a frequency range.', meaning: 'The shock leaves substantial ring-down demand for structures in that band.', confirm: 'Check pulse-end definition and inspect the measured post-event waveform.' },
                { title: 'Pseudo-velocity peak exceeds spec while acceleration does not', signal: 'Mid-band velocity demand is high despite acceptable acceleration envelope.', meaning: 'Longer-duration energy coupling may control the structural risk.', confirm: 'Confirm units, damping/Q and the exact specification response quantity before declaring failure.' },
            ] },
            workflow: { title: 'A traceable shock qualification workflow', intro: 'Freeze units, correction, damping and pulse limits before comparing the result with a requirement.', checklist: ['Confirm accelerometer range, calibration, rigid mounting and sample rate.', 'Select g or m/s² to match the actual input metadata.', 'Inspect the uncorrected and corrected pulse; justify the baseline method.', 'Set Q/ζ, frequency range and points per octave from the governing test specification.', 'Define the pulse interval before interpreting primary and residual curves.', 'Compare the same response type, damping and units as the specification.', 'Report peak, duration, delta-V and any clipping or bandwidth limitations with the SRS.'] },
            mistakes: [
                { title: 'Calling SRS a frequency spectrum of the input', body: 'SRS is a family of peak oscillator responses. Its vertical value is not the Fourier amplitude at that frequency.' },
                { title: 'Increasing points per octave to fix missing bandwidth', body: 'A denser grid interpolates oscillator frequencies; it cannot recover content the sampling rate or sensor did not capture.' },
                { title: 'Applying aggressive baseline correction automatically', body: 'A method that removes real low-frequency motion can improve the plot while making delta-V and displacement physically wrong.' },
                { title: 'Comparing curves with different damping', body: 'SRS amplitude depends strongly on Q/ζ. A pass/fail comparison is meaningless unless response type and damping match.' },
            ],
            sources: [
                { title: 'ISO 18431-4:2007', note: 'Digital shock-response-spectrum calculation using filter methods, including sampling guidance.', href: 'https://www.iso.org/standard/35833.html' },
                { title: 'NASA · On the Shock-Response-Spectrum Recursive Algorithm', note: 'Technical treatment of the Kelly–Richman recursive SRS algorithm and its numerical behaviour.', href: 'https://ntrs.nasa.gov/api/citations/20100002199/downloads/20100002199.pdf' },
                { title: 'ISO 21289:2008', note: 'Acquisition parameters that should accompany vibration and shock data.', href: 'https://www.iso.org/ics/17.160/x/' },
            ] },
        tr: {
            title: 'Şok ve SRS: tek geçici olayı yapısal talebe çevirin',
            intro: 'Gerçek widget’ın ivme darbesini nasıl koşullandırdığını, ISO 18431-4 salınıcı bankasını nasıl çalıştırdığını; maximax, pozitif/negatif ve birincil/artık tepkiyi nasıl ayırıp ivme, yalancı hız, bağıl yer değiştirme, darbe metrikleri ve şartname karşılaştırması sunduğunu öğrenin.',
            badges: ['ISO 18431-4 çözücü', 'Maximax · ± · birincil/artık', 'Yalancı hız nomogramı', 'Darbe ve şartname metrikleri'], duration: 'Yaklaşık 21 dakika · başlangıçtan uzmana',
            outcomes: ['SRS’yi Fourier spektrumu sanmadan açıklamak.', 'Sönüm/Q, frekans sınırı ve oktav aralığını test şartnamesinden seçmek.', 'Darbe sırasındaki birincil tepkiyi sonrasındaki artık çınlamadan ayırmak.', 'Uygunluk değerlendirmeden önce örnekleme, temel çizgi düzeltmesi ve darbe penceresini kontrol etmek.'],
            interface: { title: 'Binlerce sanal salınıcı gözünden tek şok olayı', intro: 'İlerideki ekran görüntüsü giriş birimi/düzeltmesini, sönümü, eğri ailelerini, oktav aralığını, frekans sınırını, darbe tanımlamayı, tepki sekmelerini ve sonuç metriklerini gösterecek. Rehber bu gerçek kontrollere dayanır.' },
            theory: { title: 'SRS aynı şoka farklı yapıların nasıl cevap vereceğini sorar', intro: 'Doğal frekans boyunca tek serbestlik dereceli sistem bankası düşünün. Her salınıcıyı ölçülen taban ivmesiyle sürün ve en büyük cevabını saklayın. Ortaya çıkan zarf SRS’dir.', cards: [
                { kicker: 'BURADAN BAŞLAYIN', title: 'SRS bir FFT değildir', body: 'FFT sinyal içeriğini sinüslere ayırır. SRS sönümlü salınıcıların en kötü cevabını raporlar. Süre ve faz geçmişi önemli olduğu için benzer spektrumlu iki darbe farklı SRS üretebilir.' },
                { kicker: 'SALINICI MODELİ', title: 'Sönüm talebi değiştirir', body: 'Kalite faktörü Q ile sönüm oranı ζ, Q = 1/(2ζ) ilişkisiyle aynı salınıcı keskinliğini anlatır. Düşük sönüm daha dar ve yüksek rezonans cevabı oluşturur.' },
                { kicker: 'DARBE SONRASI', title: 'Artık tepki başka hikâye anlatır', body: 'Birincil SRS tanımlı darbe sürerken cevabı; artık SRS bittikten sonraki serbest titreşimi yakalar ve salınıcıda depolanan enerjiye duyarlıdır.' },
            ] },
            foundations: { title: 'Şok hesabı darbe yakalama kadar iyidir', intro: 'Kırpılmış tepe, sensör rezonansı, yetersiz örnekleme veya temel çizgi hatası yüksek frekans SRS ve delta-V’yi çözücü seçiminden daha çok değiştirebilir.', cards: [
                { title: 'Temel çizgi düzeltmesi', body: 'Sağlam temel çizgi, ilk pencere ortalaması ve uçtan-uca doğrusal kayma farklı ofsetleri düzeltir. Düzeltme gerçek düşük frekans içeriğini silmeden ölçüm yanlılığını kaldırmalıdır.' },
                { title: 'Frekans ızgarası ve örnekleme', body: 'Oktav başına nokta eğri yoğunluğunu belirler, yeni bilgi üretmez. Maksimum salınıcı frekansı örnekleme hızına, sensör bandına ve montaj rezonansına uymalıdır.' },
                { title: 'Darbe penceresi', body: 'Otomatik eşik kullanışlıdır; çınlama veya çoklu olay eşiği şaşırtıyorsa manuel aralık daha iyidir. Birincil/artık anlamı bu sınıra bağlıdır.' },
            ] },
            modes: { title: 'İvme, hız ve yer değiştirmeyi birlikte okuyun', intro: 'Her SRS gösterimi yapısal talebin farklı tarafını öne çıkarır.', items: [
                { title: 'İvme SRS', bestFor: 'Yüksek frekans eylemsizlik talebi ve birçok yeterlilik şartnamesiyle doğrudan karşılaştırma.', reveals: 'Salınıcı frekansına karşı maximax ve isteğe bağlı polarite/birincil/artık tepe ivmesi.', watch: 'Yüksek frekans artışı sensör/montaj rezonansı veya yetersiz örneklemeden kaynaklanabilir.' },
                { title: 'Yalancı hız nomogramı', bestFor: 'Şok şiddetini frekans dekadlarında karşılaştırmak ve enerji benzeri taleple ilişkilendirmek.', reveals: 'Salınıcı yer değiştirmesi ve doğal frekanstan türetilen yalancı hız.', watch: 'Yalancı hız tepki koordinatıdır; ölçülen giriş hızı veya delta-V değildir.' },
                { title: 'Bağıl yer değiştirme SRS', bestFor: 'Düşük frekans strok, boşluk ve takoz hareketi soruları.', reveals: 'Salınıcı kütlesi ile taban arasındaki tepe bağıl hareket.', watch: 'Temel çizgi kayması düşük frekans yer değiştirme cevabını güçlü biçimde bozar.' },
            ] },
            interpretation: { intro: 'Eğri şekli, darbe metrikleri ve şartname payını birlikte kullanın.', items: [
                { title: 'Geniş yüksek frekans platosu', signal: 'İvme SRS yüksek frekansta yaklaşık düz seviyeye yaklaşır.', meaning: 'Salınıcılar kısa ivme özelliğini neredeyse rijit izliyordur.', confirm: 'Sensör bandını, montajı ve özelliğin kırpılma/elektrik sıçraması olmadığını doğrulayın.' },
                { title: 'Güçlü artık bant', signal: 'Darbe sonrası artık cevap bir frekans bölgesinde yüksek kalır.', meaning: 'Şok o banttaki yapılar için önemli çınlama talebi bırakır.', confirm: 'Darbe bitiş tanımını ve ölçülen olay sonrası dalga biçimini inceleyin.' },
                { title: 'İvme geçerken yalancı hız şartnameyi aşıyor', signal: 'İvme zarfı uygunken orta bant hız talebi yüksektir.', meaning: 'Daha uzun süreli enerji aktarımı yapısal riski yönetiyor olabilir.', confirm: 'Başarısızlık demeden önce birimleri, sönüm/Q’yu ve şartnamenin tam tepki büyüklüğünü doğrulayın.' },
            ] },
            workflow: { title: 'İzlenebilir şok yeterlilik iş akışı', intro: 'Sonucu gereksinimle karşılaştırmadan önce birim, düzeltme, sönüm ve darbe sınırını sabitleyin.', checklist: ['İvmeölçer aralığını, kalibrasyonu, rijit montajı ve örnekleme hızını doğrulayın.', 'Gerçek giriş meta verisiyle uyumlu g veya m/s² birimini seçin.', 'Düzeltilmemiş ve düzeltilmiş darbeyi inceleyip temel çizgi yöntemini gerekçelendirin.', 'Q/ζ, frekans aralığı ve oktav başına noktayı geçerli test şartnamesinden alın.', 'Birincil ve artık eğriyi yorumlamadan önce darbe aralığını tanımlayın.', 'Şartnameyle aynı tepki türü, sönüm ve birimi karşılaştırın.', 'SRS ile birlikte tepe, süre, delta-V ve kırpılma/bant sınırlamasını raporlayın.'] },
            mistakes: [
                { title: 'SRS’ye girişin frekans spektrumu demek', body: 'SRS tepe salınıcı cevapları ailesidir. Dikey değeri o frekanstaki Fourier genliği değildir.' },
                { title: 'Eksik bandı oktav başına noktayı artırarak düzeltmek', body: 'Daha sık ızgara salınıcı frekansını ara değerler; örnekleme veya sensörün yakalamadığı içeriği geri getirmez.' },
                { title: 'Agresif temel çizgi düzeltmesini otomatik uygulamak', body: 'Gerçek düşük frekans hareketini silen yöntem grafiği iyileştirirken delta-V ve yer değiştirmeyi fiziksel olarak yanlış yapabilir.' },
                { title: 'Farklı sönümlü eğrileri karşılaştırmak', body: 'SRS genliği Q/ζ’ye güçlü biçimde bağlıdır. Tepki türü ve sönüm eşleşmeden geç/kal karşılaştırması anlamsızdır.' },
            ],
            sources: [
                { title: 'ISO 18431-4:2007', note: 'Örnekleme önerileriyle birlikte sayısal filtrelerle şok tepki spektrumu hesabı.', href: 'https://www.iso.org/standard/35833.html' },
                { title: 'NASA · On the Shock-Response-Spectrum Recursive Algorithm', note: 'Kelly–Richman özyinelemeli SRS algoritması ve sayısal davranışına teknik yaklaşım.', href: 'https://ntrs.nasa.gov/api/citations/20100002199/downloads/20100002199.pdf' },
                { title: 'ISO 21289:2008', note: 'Titreşim ve şok verisine eşlik etmesi gereken veri toplama parametreleri.', href: 'https://www.iso.org/ics/17.160/x/' },
            ] },
    },
    cross_spectrum: {
        en: {
            title: 'Frequency Response & Cross Spectrum: measure what two channels share',
            intro: 'Learn the widget’s two real analysis modes: causal transfer/transmissibility with H1, H2 and Hv gain/phase, or true cross-spectral density with relative phase—both supported by Welch averaging and coherence.',
            badges: ['Transfer / transmissibility', 'Cross spectral density', 'H1 · H2 · Hv', 'Magnitude · phase · coherence'], duration: 'About 20 minutes · beginner to specialist',
            outcomes: ['Explain auto-spectrum, cross-spectrum, FRF and coherence as different quantities.', 'Choose transfer or CSD mode from the physical question.', 'Interpret H1/H2/Hv disagreement as a noise clue.', 'Use NFFT, window, overlap and averages without manufacturing confidence.'],
            interface: { title: 'Two synchronized signals, one frequency-domain relationship', intro: 'The final screenshot will show analysis mode, read-only sample rate, NFFT, overlap, window, average count, scale and stacked magnitude/phase/coherence results. The theory below mirrors those controls.' },
            theory: { title: 'A cross-spectrum keeps relative amplitude and phase', intro: 'Auto-spectra describe each channel separately. The complex cross-spectrum combines simultaneous channels so shared periodic content and relative timing remain visible.', cards: [
                { kicker: 'START HERE', title: 'Cross-spectrum is not a transfer function', body: 'Gxy describes shared spectral power and phase. An FRF divides cross and auto spectra under an input–output model to estimate response per input.' },
                { kicker: 'CAUSAL QUESTION', title: 'Transfer mode needs a reference direction', body: 'The first channel is treated as input/reference and the second as response. Gain units and physical meaning depend on that order.' },
                { kicker: 'QUALITY CLUE', title: 'Coherence measures linear explainability', body: 'Magnitude-squared coherence ranges from zero to one. It asks how consistently one channel is linearly related to the other at each frequency across averages.' },
            ] },
            foundations: { title: 'Welch settings define both resolution and confidence', intro: 'The same segmentation produces auto-spectra, cross-spectrum and coherence. Poor averaging or leakage affects all of them together.', cards: [
                { title: 'NFFT and window length', body: 'Larger NFFT gives finer bin spacing when enough samples exist, but fewer independent averages and worse time localization. Window choice trades leakage and amplitude behaviour.' },
                { title: 'Overlap is not free data', body: 'Overlap increases the number of segments, but adjacent segments share samples. It smooths updates without creating the same confidence as independent records.' },
                { title: 'Engineering units and scales', body: 'Linear and logarithmic axes preserve engineering values; dB needs an explicit reference. FRF units are output unit divided by input unit, while CSD units are their product per hertz.' },
            ] },
            modes: { title: 'Choose the relationship before choosing the estimator', intro: 'Transfer and CSD modes answer different physical questions.', items: [
                { title: 'Transfer / transmissibility', bestFor: 'A known or assumed input/reference driving a response, or two-location transmissibility.', reveals: 'H1, H2 and Hv magnitude/phase plus coherence.', watch: 'A ratio between two responses is transmissibility, not automatically a force-normalized structural FRF.' },
                { title: 'H1 · H2 · Hv comparison', bestFor: 'Understanding whether input-side or output-side noise biases the transfer estimate.', reveals: 'Estimator spread near resonances, anti-resonances and low-SNR bands.', watch: 'Choosing whichever curve looks smoothest hides noise information.' },
                { title: 'Cross Spectrum / Coherence', bestFor: 'Shared non-causal power and relative phase between simultaneous channels.', reveals: 'CSD magnitude/phase and frequency-dependent coherence without claiming input–output causality.', watch: 'A common third source can create strong coherence; correlation is not proof of direct causation.' },
            ] },
            interpretation: { intro: 'Read magnitude, phase and coherence at the same frequency before drawing a conclusion.', items: [
                { title: 'High gain with high coherence', signal: 'Transfer magnitude peaks, phase changes smoothly and coherence stays near one.', meaning: 'A repeatable linear amplification path is plausible.', confirm: 'Check input/output units and whether the reference channel truly represents the excitation.' },
                { title: 'H1 and H2 separate around an anti-resonance', signal: 'Estimator magnitudes disagree where response is small.', meaning: 'Noise bias is significant because one auto-spectrum approaches its noise floor.', confirm: 'Improve excitation/SNR and compare Hv rather than averaging estimators together.' },
                { title: 'Strong CSD but low coherence', signal: 'Some shared power exists, yet the normalized relation is inconsistent across segments.', meaning: 'Non-stationarity, multiple inputs, leakage or nonlinear behaviour may be present.', confirm: 'Inspect time blocks, increase appropriate averaging and check operating-state changes.' },
            ] },
            workflow: { title: 'A two-channel spectral workflow', intro: 'Define the physical relationship and channel order before touching FFT settings.', checklist: ['Use synchronized channels from the same recording and sample rate.', 'Assign reference/input and response based on the test physics.', 'Choose Transfer or CSD mode before interpreting units.', 'Set NFFT from required frequency resolution and available record length.', 'Use at least two complete Welch segments for meaningful coherence; prefer more independent averages.', 'Inspect phase and coherence beside every important magnitude feature.', 'State estimator, window, overlap, average count and scale in exported results.'] },
            mistakes: [
                { title: 'Calling any channel ratio an FRF', body: 'A true force-to-response FRF needs a measured input force. Two response channels usually give transmissibility.' },
                { title: 'Using coherence as a pass/fail truth meter', body: 'Low coherence has several causes; high coherence can come from a common source. It is evidence to interpret, not a verdict.' },
                { title: 'Swapping input and output after calculation', body: 'H1/H2 meaning, phase sign and units depend on channel order. Label the physical direction before compute.' },
                { title: 'Chasing resolution with huge NFFT and one segment', body: 'Fine bins without adequate averaging produce a noisy, low-confidence estimate—especially for coherence.' },
            ],
            sources: [
                { title: 'ISO 7626-1:2011', note: 'Mechanical mobility/FRF terminology and transducer requirements.', href: 'https://www.iso.org/standard/50426.html' },
                { title: 'ISO 7626-2:2015', note: 'Procedures for measuring structural mobility and other FRFs using attached excitation.', href: 'https://www.iso.org/standard/62483.html' },
                { title: 'ISO 7626-5:2019', note: 'Impact-based FRF measurement and DFT signal-analysis practice.', href: 'https://www.iso.org/standard/68735.html' },
            ] },
        tr: {
            title: 'Frekans Tepkisi ve Çapraz Spektrum: iki kanalın ortak kısmını ölçün',
            intro: 'Widget’ın iki gerçek analiz modunu öğrenin: H1, H2 ve Hv kazanç/fazıyla nedensel transfer/transmissibility ya da bağıl fazıyla gerçek çapraz spektral yoğunluk; ikisi de Welch ortalaması ve koheransla desteklenir.',
            badges: ['Transfer / transmissibility', 'Çapraz spektral yoğunluk', 'H1 · H2 · Hv', 'Genlik · faz · koherans'], duration: 'Yaklaşık 20 dakika · başlangıçtan uzmana',
            outcomes: ['Oto-spektrum, çapraz spektrum, FRF ve koheransı farklı büyüklükler olarak açıklamak.', 'Fiziksel soruya göre transfer veya CSD modunu seçmek.', 'H1/H2/Hv uyuşmazlığını gürültü ipucu olarak yorumlamak.', 'NFFT, pencere, örtüşme ve ortalamayı sahte güven üretmeden kullanmak.'],
            interface: { title: 'İki eşzamanlı sinyal, tek frekans alanı ilişkisi', intro: 'Son ekran görüntüsü analiz modunu, salt okunur örnekleme hızını, NFFT’yi, örtüşmeyi, pencereyi, ortalama sayısını, ölçeği ve üst üste genlik/faz/koherans sonuçlarını gösterecek. Teori bu kontrollere uyar.' },
            theory: { title: 'Çapraz spektrum bağıl genlik ve fazı korur', intro: 'Oto-spektrumlar her kanalı ayrı anlatır. Karmaşık çapraz spektrum eşzamanlı kanalları birleştirir; ortak periyodik içerik ve bağıl zamanlama görünür kalır.', cards: [
                { kicker: 'BURADAN BAŞLAYIN', title: 'Çapraz spektrum transfer fonksiyonu değildir', body: 'Gxy ortak spektral güç ve fazı anlatır. FRF ise giriş–çıkış modeli altında tepki/giriş kestirmek için çapraz ve oto spektrumları böler.' },
                { kicker: 'NEDENSEL SORU', title: 'Transfer modu referans yönü ister', body: 'İlk kanal giriş/referans, ikincisi tepki kabul edilir. Kazanç birimi ve fiziksel anlam bu sıraya bağlıdır.' },
                { kicker: 'KALİTE İPUCU', title: 'Koherans doğrusal açıklanabilirliği ölçer', body: 'Karesel koherans sıfır ile bir arasındadır. Her frekansta bir kanalın diğerine ortalamalar boyunca ne kadar tutarlı doğrusal bağlı olduğunu sorar.' },
            ] },
            foundations: { title: 'Welch ayarları hem çözünürlüğü hem güveni belirler', intro: 'Aynı bölütleme oto-spektrumları, çapraz spektrumu ve koheransı üretir. Kötü ortalama veya sızıntı hepsini birlikte etkiler.', cards: [
                { title: 'NFFT ve pencere süresi', body: 'Yeterli örnek varsa büyük NFFT ince bin aralığı verir; fakat bağımsız ortalama sayısı ve zaman konumu azalır. Pencere seçimi sızıntı ile genlik davranışı arasında dengedir.' },
                { title: 'Örtüşme bedava veri değildir', body: 'Örtüşme bölüt sayısını artırır ama komşu bölütler örnek paylaşır. Güncellemeyi yumuşatır; bağımsız kayıt kadar güven üretmez.' },
                { title: 'Mühendislik birimi ve ölçek', body: 'Doğrusal ve log eksen mühendislik değerini korur; dB açık referans ister. FRF birimi çıkış/giriş, CSD birimi ise kanal birimleri çarpımı/Hz’dir.' },
            ] },
            modes: { title: 'Kestiriciden önce ilişkiyi seçin', intro: 'Transfer ve CSD modları farklı fiziksel soruları yanıtlar.', items: [
                { title: 'Transfer / transmissibility', bestFor: 'Bilinen/varsayılan girişin bir tepkiyi sürmesi veya iki konum arası transmissibility.', reveals: 'H1, H2 ve Hv genlik/fazı ile koherans.', watch: 'İki tepki arasındaki oran transmissibility’dir; otomatik olarak kuvvete göre normalize yapısal FRF değildir.' },
                { title: 'H1 · H2 · Hv karşılaştırması', bestFor: 'Giriş veya çıkış tarafı gürültüsünün transfer kestirimini nasıl yanlılaştırdığını anlamak.', reveals: 'Rezonans, anti-rezonans ve düşük SNR bantlarında kestirici farkı.', watch: 'En düzgün görünen eğriyi seçmek gürültü bilgisini saklar.' },
                { title: 'Çapraz Spektrum / Koherans', bestFor: 'Eşzamanlı kanallar arasında nedensellik iddiası olmadan ortak güç ve bağıl faz.', reveals: 'Giriş–çıkış nedenselliği iddia etmeden CSD genlik/fazı ve frekansa bağlı koherans.', watch: 'Ortak üçüncü kaynak güçlü koherans yaratabilir; korelasyon doğrudan nedensellik kanıtı değildir.' },
            ] },
            interpretation: { intro: 'Sonuç çıkarmadan önce aynı frekansta genlik, faz ve koheransı birlikte okuyun.', items: [
                { title: 'Yüksek koheransla yüksek kazanç', signal: 'Transfer genliği tepe yapar, faz düzgün değişir ve koherans bire yakın kalır.', meaning: 'Tekrarlanabilir doğrusal büyütme yolu olasıdır.', confirm: 'Giriş/çıkış birimlerini ve referans kanalının gerçekten uyarmayı temsil ettiğini doğrulayın.' },
                { title: 'H1 ve H2 anti-rezonansta ayrılıyor', signal: 'Tepkinin küçük olduğu bölgede kestirici genlikleri uyuşmaz.', meaning: 'Oto-spektrumlardan biri gürültü tabanına yaklaştığı için yanlılık önemlidir.', confirm: 'Uyarma/SNR’yi iyileştirin; kestiricileri ortalamak yerine Hv ile karşılaştırın.' },
                { title: 'Güçlü CSD ama düşük koherans', signal: 'Ortak güç vardır fakat normalize ilişki bölütler arasında tutarlı değildir.', meaning: 'Durağan olmama, çoklu giriş, sızıntı veya doğrusal olmayanlık bulunabilir.', confirm: 'Zaman bloklarını inceleyin, uygun ortalamayı artırın ve çalışma durumu değişimini kontrol edin.' },
            ] },
            workflow: { title: 'İki kanallı spektral iş akışı', intro: 'FFT ayarına dokunmadan önce fiziksel ilişkiyi ve kanal sırasını tanımlayın.', checklist: ['Aynı kayıt ve örnekleme hızından eşzamanlı kanallar kullanın.', 'Referans/giriş ile tepkiyi test fiziğine göre atayın.', 'Birimleri yorumlamadan önce Transfer veya CSD modunu seçin.', 'NFFT’yi gereken frekans çözünürlüğü ve mevcut kayıt süresinden belirleyin.', 'Anlamlı koherans için en az iki tam Welch bölütü kullanın; mümkünse daha çok bağımsız ortalama alın.', 'Her önemli genlik özelliğinin yanında faz ve koheransı inceleyin.', 'Dışa aktarılan sonuçta kestirici, pencere, örtüşme, ortalama sayısı ve ölçeği belirtin.'] },
            mistakes: [
                { title: 'Her kanal oranına FRF demek', body: 'Gerçek kuvvet-tepki FRF’si ölçülmüş giriş kuvveti ister. İki tepki kanalı çoğunlukla transmissibility verir.' },
                { title: 'Koheransı geç/kal doğruluk ölçeri gibi kullanmak', body: 'Düşük koheransın çok nedeni vardır; yüksek koherans ortak kaynaktan gelebilir. Hüküm değil, yorumlanacak kanıttır.' },
                { title: 'Hesaptan sonra giriş ve çıkışı değiştirmek', body: 'H1/H2 anlamı, faz işareti ve birimler kanal sırasına bağlıdır. Fiziksel yönü hesap öncesi etiketleyin.' },
                { title: 'Dev NFFT ve tek bölütle çözünürlük kovalamak', body: 'Yeterli ortalama olmadan ince binler özellikle koheransta gürültülü ve düşük güvenli kestirim üretir.' },
            ],
            sources: [
                { title: 'ISO 7626-1:2011', note: 'Mekanik hareketlilik/FRF terimleri ve dönüştürücü gereksinimleri.', href: 'https://www.iso.org/standard/50426.html' },
                { title: 'ISO 7626-2:2015', note: 'Bağlı uyarıcıyla yapısal hareketlilik ve diğer FRF’lerin ölçüm prosedürleri.', href: 'https://www.iso.org/standard/62483.html' },
                { title: 'ISO 7626-5:2019', note: 'Darbe tabanlı FRF ölçümü ve DFT sinyal analizi uygulaması.', href: 'https://www.iso.org/standard/68735.html' },
            ] },
    },
}

export default MEASUREMENT_LEARNING
