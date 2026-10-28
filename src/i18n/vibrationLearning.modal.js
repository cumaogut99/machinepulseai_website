const MODAL_LEARNING = {
    modal_analysis: {
        en: {
            title: 'Advanced Modal Analysis Guide',
            intro: 'This guide explains experimental modal analysis (EMA) with impact-hammer or shaker measurements in MachinePulseAI. It describes FRF measurement and quality checks, pole selection with the LSCF stabilization diagram, mode shape estimation with LSFD, damping estimation and validation with AutoMAC.',
            badges: ['H1 · H2 · Hv', 'Coherence & Nyquist', 'LSCF + LSFD', 'MIMO mode shapes'], duration: 'Estimated reading time: about 24 minutes',
            outcomes: ['Explain the difference between a spectrum, an FRF and a mode.', 'Choose H1, H2 or Hv from the expected noise location.', 'Use coherence and stabilization before accepting a pole.', 'Fit residues, inspect AutoMAC and interpret a 3D shape without treating an ODS as a normalized mode.'],
            why: [
                { title: 'What modal analysis is for', body: 'Every structure has natural frequencies at which it vibrates easily. If an operating force coincides with one of them, even small forces can cause large vibration, noise and fatigue cracking. Modal analysis determines the natural frequencies, damping values and corresponding mode shapes, so that resonance problems can be identified and design changes evaluated.' },
                { title: 'Which measurements are required', body: 'The input force (measured with a force transducer in the hammer tip or between the shaker and the structure) and the structural response (usually from accelerometers) are measured simultaneously. Their ratio in the frequency domain, the frequency response function (FRF), describes how the structure responds per unit force. The measurement point geometry is required to display mode shapes.' },
                { title: 'Why the force is measured', body: 'Because the input force is known, EMA yields scaled FRFs and modal parameters that do not depend on how the structure happened to be excited. This allows comparison with finite element models and prediction of the response to other forces. When a structure cannot be excited artificially, operational modal analysis (OMA) is used instead.' },
            ],
            interface: { title: 'Modal Analysis workspace', intro: 'The final screenshot will show one excitation, multiple response DOFs, FRF settings, stabilization tolerances, pole selection, residue fitting and result tabs. The content below follows that real path.' },
            theory: { title: 'From FRF to modal model', intro: 'Experimental Modal Analysis measures input force and structural response together. Their complex ratio contains amplitude and phase, which lets a modal model separate frequency, damping and shape.', cards: [
                { kicker: 'KEY CONCEPT', title: 'FRF means response per input', body: 'An accelerance FRF answers how much acceleration appears at an output DOF for each unit of input force, frequency by frequency. A response spectrum alone cannot separate the structure from the unknown excitation.' },
                { kicker: 'COMPLEX DATA', title: 'Phase is part of the mode', body: 'FRF magnitude shows amplification; phase and the Nyquist path show how the response rotates through resonance. Curve fitting uses both real and imaginary information.' },
                { kicker: 'MODAL MODEL', title: 'Poles and residues divide the problem', body: 'Each pole carries natural frequency and damping. Its residue across response DOFs carries relative modal participation and therefore the measured mode shape.' },
            ] },
            foundations: { title: 'FRF quality and fitting reliability', intro: 'A powerful curve fitter cannot repair a poor impact, overload, double hit, low signal-to-noise ratio or inconsistent measurement geometry.', cards: [
                { title: 'Estimator choice', body: 'H1 is commonly preferred when output noise dominates; H2 is useful when input noise is the stronger concern; Hv balances both through a total-least-squares view. Compare them rather than selecting by habit.' },
                { title: 'Limits of the stabilization diagram', body: 'As model order rises, physical poles repeat near the same frequency and damping. Numerical poles scatter. Tolerances decide what counts as stable, so inspect the FRF and coherence as well.' },
                { title: 'Geometry and DOF signs', body: 'A mode shape is only meaningful when every response channel maps to the correct point, direction and sign. One reversed accelerometer can make AutoMAC and animation misleading.' },
            ] },
            modes: { title: 'Result views and validation', intro: 'The widget combines spectral, parametric and geometric checks. No single tab is enough on its own.', items: [
                { title: 'FRF · phase · coherence · Nyquist', bestFor: 'Checking measurement quality and locating candidate resonances.', reveals: 'Estimator-dependent transfer magnitude, phase rotation, linear relation and complex-circle behaviour.', watch: 'Low coherence may come from noise, leakage, nonlinearity, unmeasured inputs or anti-resonances—not only a bad sensor.' },
                { title: 'LSCF stabilization diagram', bestFor: 'Separating repeatable physical poles from numerical roots.', reveals: 'How candidate frequency and damping values persist as model order changes.', watch: 'Very loose tolerances admit spurious poles; very tight tolerances can reject lightly excited or closely spaced modes.' },
                { title: 'LSFD modes · AutoMAC · 3D shape', bestFor: 'Fitting selected poles and validating spatial independence.', reveals: 'Residues, normalized fit error, mode-shape vectors and cross-correlation between shapes.', watch: 'A single response DOF cannot define a spatial mode; add consistent MIMO response points and geometry.' },
            ] },
            interpretation: { intro: 'Accept a mode only when several independent clues agree.', items: [
                { title: 'Clear peak, phase turn, high coherence', signal: 'FRF magnitude rises, phase rotates smoothly and coherence remains strong around the same frequency.', meaning: 'A well-excited linear resonance is likely.', confirm: 'Look for a stable pole and a low-error LSFD reconstruction before reporting modal parameters.' },
                { title: 'Stable frequency, unstable damping', signal: 'A pole repeats in frequency but its damping changes strongly with model order.', meaning: 'The resonance may overlap another mode, have low SNR, or be biased by leakage and residual terms.', confirm: 'Improve frequency resolution, measurement quality and the fitted band; compare H1/H2/Hv.' },
                { title: 'High off-diagonal AutoMAC', signal: 'Two extracted shapes correlate strongly away from the MAC diagonal.', meaning: 'The modes may be duplicated, spatially under-resolved or incorrectly mapped.', confirm: 'Review selected poles, add DOFs near expected antinodes and check channel directions.' },
            ] },
            workflow: { title: 'EMA procedure', intro: 'Measure first, validate second and fit only the poles that survive both checks.', checklist: ['Calibrate the force and response transducers and record their engineering units.', 'Keep hammer tip, shaker setup, window and trigger appropriate for the target band.', 'Reject overloaded, clipped or double-hit records before averaging.', 'Choose block size and averages to separate close modes without hiding non-stationarity.', 'Require a plausible FRF, phase and coherence pattern before selecting a stabilized pole.', 'Map every response DOF to geometry with an explicit direction and sign before animating.'] },
            mistakes: [
                { title: 'Calling every FRF peak a natural frequency', body: 'Anti-resonances, noise, forcing artifacts and closely spaced modes can distort the magnitude. Use phase, coherence and stabilized poles.' },
                { title: 'Using H1, H2 and Hv as visual themes', body: 'They encode different noise assumptions. If their difference is large, that disagreement is diagnostic information.' },
                { title: 'Selecting poles only because they are stable', body: 'Stability depends on tolerances and model order. A valid mode must also fit measured complex FRFs and make physical spatial sense.' },
                { title: 'Treating a displayed shape as absolute displacement', body: 'EMA shapes are typically relative and arbitrarily scaled unless a separate scaling procedure is performed.' },
            ],
            sources: [
                { title: 'ISO 7626-2:2015', note: 'FRF measurement with an attached single-point vibration exciter.', href: 'https://www.iso.org/standard/62483.html' },
                { title: 'ISO 7626-5:2019', note: 'Impact-excitation procedures and DFT-based signal analysis for structural FRFs.', href: 'https://www.iso.org/standard/68735.html' },
            ] },
        tr: {
            title: 'Gelişmiş Modal Analiz Rehberi',
            intro: 'Bu rehber, MachinePulseAI’da darbe çekici veya sarsıcı ölçümleriyle deneysel modal analizin (EMA) nasıl yapıldığını anlatır. FRF ölçümünü ve kalite kontrollerini, LSCF kararlılık diyagramıyla kutup seçimini, LSFD ile mod şekli kestirimini, sönüm kestirimini ve AutoMAC ile doğrulamayı açıklar.',
            badges: ['H1 · H2 · Hv', 'Koherans ve Nyquist', 'LSCF + LSFD', 'MIMO mod şekilleri'], duration: 'Tahmini okuma süresi: yaklaşık 24 dakika',
            outcomes: ['Spektrum, FRF ve mod arasındaki farkı açıklamak.', 'Beklenen gürültü konumuna göre H1, H2 veya Hv seçmek.', 'Bir kutbu kabul etmeden önce koherans ve kararlılık diyagramını kullanmak.', 'Rezidüleri uydurup AutoMAC’i incelemek ve 3B şekli ODS ya da mutlak hareket sanmadan yorumlamak.'],
            why: [
                { title: 'Modal analiz ne işe yarar?', body: 'Her yapının kolayca titreştiği doğal frekansları vardır. Çalışma sırasındaki bir kuvvet bunlardan biriyle çakışırsa küçük kuvvetler bile büyük titreşime, gürültüye ve yorulma çatlaklarına yol açabilir. Modal analiz doğal frekansları, sönüm değerlerini ve bunlara karşılık gelen mod şekillerini belirler; böylece rezonans sorunları tespit edilebilir ve tasarım değişiklikleri değerlendirilebilir.' },
                { title: 'Hangi ölçümler gerekir?', body: 'Giriş kuvveti (çekiç ucundaki veya sarsıcı ile yapı arasındaki kuvvet sensörüyle) ve yapının tepkisi (genellikle ivmeölçerlerle) eşzamanlı ölçülür. Bu ikisinin frekans alanındaki oranı olan frekans tepki fonksiyonu (FRF), yapının birim kuvvete nasıl tepki verdiğini tanımlar. Mod şekillerini göstermek için ölçüm noktalarının geometrisi gerekir.' },
                { title: 'Kuvvet neden ölçülür?', body: 'Giriş kuvveti bilindiği için EMA, yapının nasıl uyarıldığından bağımsız, ölçeklenmiş FRF’ler ve modal parametreler verir. Bu, sonlu elemanlar modelleriyle karşılaştırma yapmayı ve başka kuvvetlere verilecek tepkiyi tahmin etmeyi mümkün kılar. Yapı yapay olarak uyarılamıyorsa bunun yerine operasyonel modal analiz (OMA) kullanılır.' },
            ],
            interface: { title: 'Modal Analiz çalışma ekranı', intro: 'Son ekran görüntüsü bir uyarma kanalını, çoklu tepki DOF’larını, FRF ayarlarını, kararlılık toleranslarını, kutup seçimini, rezidü uyumunu ve sonuç sekmelerini gösterecek. Aşağıdaki içerik bu gerçek yolu izler.' },
            theory: { title: 'FRF’ten modal modele', intro: 'Deneysel Modal Analiz giriş kuvvetini ve yapısal tepkiyi birlikte ölçer. Karmaşık oranları genlik ve fazı taşır; böylece modal model frekans, sönüm ve şekli ayırabilir.', cards: [
                { kicker: 'TEMEL KAVRAM', title: 'FRF, giriş başına tepki demektir', body: 'İvme/kuvvet FRF’si her frekansta birim giriş kuvvetine karşı çıkış DOF’unda ne kadar ivme oluştuğunu sorar. Tek başına tepki spektrumu yapıyı bilinmeyen uyarmadan ayıramaz.' },
                { kicker: 'KARMAŞIK VERİ', title: 'Faz modun parçasıdır', body: 'FRF genliği büyütmeyi; faz ve Nyquist yolu rezonans boyunca cevabın nasıl döndüğünü gösterir. Eğri uydurma gerçek ve sanal bilgiyi birlikte kullanır.' },
                { kicker: 'MODAL MODEL', title: 'Kutuplar ve rezidüler problemi böler', body: 'Her kutup doğal frekans ve sönümü taşır. Tepki DOF’ları üzerindeki rezidüsü bağıl modal katılımı ve dolayısıyla ölçülen mod şeklini verir.' },
            ] },
            foundations: { title: 'FRF kalitesi ve uyum güvenilirliği', intro: 'Güçlü bir eğri uydurucu kötü darbeyi, aşırı yükü, çift vuruşu, düşük sinyal-gürültü oranını veya tutarsız geometriyi onaramaz.', cards: [
                { title: 'Kestirici seçimi', body: 'Çıkış gürültüsü baskınsa çoğunlukla H1; giriş gürültüsü önemliyse H2; iki tarafı toplam en küçük kareler bakışıyla dengelemek için Hv uygundur. Alışkanlıkla seçmek yerine karşılaştırın.' },
                { title: 'Kararlılık diyagramının sınırları', body: 'Model derecesi artarken fiziksel kutuplar yakın frekans ve sönümde tekrar eder; sayısal kutuplar dağılır. Kararlılık toleransları sonucu etkiler, bu yüzden FRF ve koheransı da inceleyin.' },
                { title: 'Geometri ve DOF işaretleri', body: 'Mod şekli ancak her tepki kanalı doğru noktaya, yöne ve işarete eşlenirse anlamlıdır. Ters takılmış tek ivmeölçer AutoMAC ve animasyonu yanıltabilir.' },
            ] },
            modes: { title: 'Sonuç görünümleri ve doğrulama', intro: 'Widget spektral, parametrik ve geometrik kontrolleri birleştirir. Tek bir sekme yeterli değildir.', items: [
                { title: 'FRF · faz · koherans · Nyquist', bestFor: 'Ölçüm kalitesini denetlemek ve aday rezonansları bulmak.', reveals: 'Kestiriciye bağlı transfer genliği, faz dönüşü, doğrusal ilişki ve karmaşık düzlemde daire davranışı.', watch: 'Düşük koherans yalnız kötü sensörden değil; gürültü, sızıntı, doğrusal olmayanlık, ölçülmeyen giriş veya anti-rezonanstan da gelebilir.' },
                { title: 'LSCF kararlılık diyagramı', bestFor: 'Tekrarlanan fiziksel kutupları sayısal köklerden ayırmak.', reveals: 'Aday frekans ve sönümlerin model derecesiyle nasıl korunduğu.', watch: 'Çok gevşek tolerans sahte kutupları geçirir; çok sıkı tolerans zayıf uyarılmış veya yakın modları reddedebilir.' },
                { title: 'LSFD modları · AutoMAC · 3B şekil', bestFor: 'Seçilen kutupları uydurmak ve şekillerin uzamsal bağımsızlığını doğrulamak.', reveals: 'Rezidüler, normalize uyum hatası, mod şekli vektörleri ve şekiller arası korelasyon.', watch: 'Tek tepki DOF’u uzamsal mod tanımlamaz; tutarlı MIMO noktaları ve geometri ekleyin.' },
            ] },
            interpretation: { intro: 'Bir modu ancak birkaç bağımsız ipucu aynı şeyi söylüyorsa kabul edin.', items: [
                { title: 'Net tepe, faz dönüşü, yüksek koherans', signal: 'FRF genliği yükselir, faz düzgün döner ve koherans aynı bölgede güçlü kalır.', meaning: 'İyi uyarılmış doğrusal bir rezonans olasıdır.', confirm: 'Modal parametre raporlamadan önce kararlı kutup ve düşük hatalı LSFD yeniden kurulumunu arayın.' },
                { title: 'Frekans kararlı, sönüm kararsız', signal: 'Kutup frekansta tekrar ederken sönüm model derecesiyle çok değişir.', meaning: 'Rezonans başka modla çakışıyor, SNR düşük veya sızıntı/rezidü terimleri yanlılık yaratıyor olabilir.', confirm: 'Frekans çözünürlüğünü, ölçüm kalitesini ve uyum bandını iyileştirin; H1/H2/Hv’yi karşılaştırın.' },
                { title: 'Yüksek diyagonal dışı AutoMAC', signal: 'İki çıkarılan şekil MAC diyagonali dışında güçlü korelasyon gösterir.', meaning: 'Modlar kopyalanmış, uzamsal olarak yetersiz örneklenmiş veya yanlış eşlenmiş olabilir.', confirm: 'Seçilen kutupları gözden geçirin, beklenen karın bölgelerine DOF ekleyin ve kanal yönlerini denetleyin.' },
            ] },
            workflow: { title: 'EMA prosedürü', intro: 'Önce ölçün, sonra doğrulayın ve yalnız iki kontrolden de geçen kutupları uydurun.', checklist: ['Kuvvet ve tepki dönüştürücülerini kalibre edin, mühendislik birimlerini kaydedin.', 'Çekiç ucunu, sarsıcı kurulumunu, pencereyi ve tetiklemeyi hedef banda uygun seçin.', 'Ortalamadan önce aşırı yüklenmiş, kırpılmış veya çift vuruşlu kayıtları reddedin.', 'Yakın modları ayıracak ama durağan olmamayı saklamayacak blok ve ortalama sayısı seçin.', 'Kararlı kutup seçmeden önce makul FRF, faz ve koherans deseni isteyin.', 'Animasyondan önce her tepki DOF’unu açık yön ve işaretle geometriye eşleyin.'] },
            mistakes: [
                { title: 'Her FRF tepesine doğal frekans demek', body: 'Anti-rezonanslar, gürültü, uyarma izleri ve yakın modlar genliği bozabilir. Faz, koherans ve kararlı kutupları birlikte kullanın.' },
                { title: 'H1, H2 ve Hv’yi görsel tema gibi seçmek', body: 'Farklı gürültü varsayımlarını temsil ederler. Aralarındaki fark büyükse bu uyuşmazlık tanısal bilgidir.' },
                { title: 'Kutupları yalnız kararlı göründüğü için seçmek', body: 'Kararlılık tolerans ve model derecesine bağlıdır. Geçerli mod ölçülen karmaşık FRF’yi de uydurmalı ve fiziksel uzamsal anlam taşımalıdır.' },
                { title: 'Görüntülenen şekli mutlak yer değiştirme sanmak', body: 'Ayrı bir ölçekleme işlemi yapılmadıkça EMA şekilleri bağıl ve keyfi ölçektedir.' },
            ],
            sources: [
                { title: 'ISO 7626-2:2015', note: 'Yapıya bağlı tek noktalı sarsıcıyla FRF ölçümü.', href: 'https://www.iso.org/standard/62483.html' },
                { title: 'ISO 7626-5:2019', note: 'Darbe uyarmalı yapısal FRF için ölçüm ve DFT tabanlı sinyal analizi.', href: 'https://www.iso.org/standard/68735.html' },
            ] },
    },
    operational_modal_analysis: {
        en: {
            title: 'Operational Modal Analysis (OMA) Guide',
            intro: 'This guide explains operational modal analysis (OMA), which identifies the modal parameters of a structure from response measurements only, while the structure operates under its normal loads. It describes the FDD, EFDD and SSI-COV methods available in MachinePulseAI, damping estimation without a measured force, and quality checks with MPC, MPD and AutoMAC.',
            badges: ['SSI-COV', 'FDD · EFDD', 'MPC · MPD · AutoMAC', 'Output-only'], duration: 'Estimated reading time: about 22 minutes',
            outcomes: ['Explain what OMA can and cannot identify without force measurement.', 'Choose SSI-COV, FDD or EFDD for the record and question.', 'Use stabilization, singular values and shape-quality metrics together.', 'Separate operating harmonics from structural modes and report relative shapes honestly.'],
            why: [
                { title: 'What OMA is for', body: 'Large structures such as bridges, buildings and wind turbines, as well as running machinery, often cannot be excited with a hammer or shaker—or their behaviour under real operating conditions is what matters. OMA determines natural frequencies, damping and mode shapes using the ambient excitation from wind, traffic, flow or operation.' },
                { title: 'Which measurements are required', body: 'Several response sensors (usually accelerometers) recorded simultaneously at different points on the structure are required; the force is not measured. Long, approximately stationary recordings with broadband excitation give the most reliable results.' },
                { title: 'How OMA differs from EMA', body: 'Because the input force is unknown, OMA mode shapes are not mass-normalized and absolute modal mass cannot be determined from OMA alone. Strong operating tones, such as harmonics of a machine’s running speed, must be distinguished from structural modes.' },
            ],
            interface: { title: 'OMA workspace', intro: 'The final view will show checked response channels, algorithm controls, frequency band, SSI and spectral settings, geometry mapping and result tabs. The theory below matches those real choices.' },
            theory: { title: 'Output-only modal identification', intro: 'Wind, traffic, flow or machine operation excites the structure, but the force is not measured. OMA uses correlations across simultaneous response channels to find common dynamic patterns.', cards: [
                { kicker: 'KEY CONCEPT', title: 'What output-only data can show', body: 'You can estimate natural frequency, damping and relative mode shape. Without input scaling, you cannot directly recover a force-normalized FRF or mass-normalized mode shape.' },
                { kicker: 'SPECTRAL VIEW', title: 'FDD separates spatial directions', body: 'At each frequency the response spectral-density matrix is decomposed. A dominant singular value and vector can reveal a mode when excitation is broad enough.' },
                { kicker: 'STATE-SPACE VIEW', title: 'SSI models time evolution', body: 'SSI-COV builds a state-space model from response covariances. Repeating the identification over model orders produces poles for a stabilization diagram.' },
            ] },
            foundations: { title: 'OMA assumptions and checks', intro: 'The method works best with broadband, approximately stationary excitation and many synchronized channels. Strong deterministic operating tones can violate that picture.', cards: [
                { title: 'Record length and stationarity', body: 'Long data improves low-frequency and damping estimates, but only if the system and environment remain comparable. Segment changing operating states instead of averaging them blindly.' },
                { title: 'Mode complexity metrics', body: 'MPC near one and MPD near zero support a mostly real, monophase mode. They are quality clues, not universal pass/fail limits.' },
                { title: 'Shape separation', body: 'Low off-diagonal AutoMAC supports distinct spatial shapes. Poor sensor placement can make different modes appear similar even when the algorithm is correct.' },
            ] },
            modes: { title: 'Identification methods', intro: 'Start with the method whose assumptions best match the data, then cross-check with another view.', items: [
                { title: 'FDD', bestFor: 'Fast frequency-domain screening and well-separated modes.', reveals: 'Singular-value peaks and relative singular-vector shapes.', watch: 'Closely spaced modes, narrowband forcing and spectral leakage can merge or bias peaks.' },
                { title: 'EFDD', bestFor: 'Adding damping estimates around FDD peaks.', reveals: 'An SDOF spectral bell, inverse-transform decay and a damping estimate.', watch: 'The MAC bell threshold defines what belongs to the mode; contamination produces a non-exponential decay.' },
                { title: 'SSI-COV', bestFor: 'Closely spaced modes and a stabilization-based parametric model.', reveals: 'Frequency, damping and shapes across increasing model order.', watch: 'Block rows, maximum order and stability tolerances affect clustering; high order also creates numerical poles.' },
            ] },
            interpretation: { intro: 'A structural mode should survive changes in analysis settings better than an operating tone.', items: [
                { title: 'Peak appears in several channels with one coherent shape', signal: 'SV1 rises, the shape is repeatable and AutoMAC stays distinct.', meaning: 'A structural mode is plausible.', confirm: 'Check persistence across time blocks and, where possible, compare SSI and FDD/EFDD estimates.' },
                { title: 'Narrow line follows machine speed', signal: 'A spectral peak shifts with RPM or appears only in one operating state.', meaning: 'It may be deterministic harmonic forcing rather than a natural mode.', confirm: 'Use order tracking or multiple operating speeds; a structural frequency should remain approximately fixed unless the structure changes.' },
                { title: 'High damping with weak shape quality', signal: 'The algorithm returns large damping while MPC/MPD or AutoMAC is poor.', meaning: 'The pole may represent noise, overlapping content or non-stationarity.', confirm: 'Review the record, frequency band, model order and channel set before accepting it.' },
            ] },
            workflow: { title: 'OMA procedure', intro: 'Preserve synchronized spatial information and document the operating state as carefully as the algorithm settings.', checklist: ['Use at least two synchronized response channels; add sensors where expected modes move differently.', 'Record operating speed, load, temperature and other environmental variables.', 'Inspect time histories for transients, clipping and state changes before assuming stationarity.', 'Set a frequency band that excludes irrelevant drift and unsupported high-frequency content.', 'Compare singular values or stabilization clusters with MPC, MPD and AutoMAC.', 'Report mode shapes as relative/unscaled and state the algorithm and parameter set.'] },
            mistakes: [
                { title: 'Treating operating harmonics as modes', body: 'A strong tone can dominate FDD. Change speed or use order tracking to see whether it moves with the machine.' },
                { title: 'Reporting absolute modal mass from OMA alone', body: 'Without a measured input or a separate scaling method, OMA shapes do not carry absolute force normalization.' },
                { title: 'Using one sensor for a spatial claim', body: 'Frequency peaks can be seen with one channel, but mode shape and AutoMAC require a meaningful synchronized array.' },
                { title: 'Choosing the highest model order because it finds more poles', body: 'Higher order increases numerical roots. Physical modes are the repeatable, well-shaped subset—not the longest table.' },
            ],
            sources: [
                { title: 'Brincker, Zhang & Andersen · Frequency Domain Decomposition', note: 'Foundational output-only identification paper introducing FDD for ambient response data.', href: 'https://vbn.aau.dk/en/publications/modal-identification-of-output-only-systems-using-frequency-domai/' },
                { title: 'Peeters & De Roeck · Stochastic Subspace Identification', note: 'Primary research on reference-based SSI for operational modal analysis.', href: 'https://doi.org/10.1016/S0888-3270(99)00014-8' },
            ] },
        tr: {
            title: 'Operasyonel Modal Analiz (OMA) Rehberi',
            intro: 'Bu rehber, yapının modal parametrelerini yalnızca tepki ölçümlerinden ve yapı normal yükleri altında çalışırken belirleyen operasyonel modal analizi (OMA) anlatır. MachinePulseAI’daki FDD, EFDD ve SSI-COV yöntemlerini, ölçülmüş kuvvet olmadan sönüm kestirimini ve MPC, MPD ve AutoMAC ile kalite kontrollerini açıklar.',
            badges: ['SSI-COV', 'FDD · EFDD', 'MPC · MPD · AutoMAC', 'Yalnızca çıkış'], duration: 'Tahmini okuma süresi: yaklaşık 22 dakika',
            outcomes: ['Kuvvet ölçmeden OMA’nın neyi tanımlayıp neyi tanımlayamayacağını açıklamak.', 'Kayıt ve soruya göre SSI-COV, FDD veya EFDD seçmek.', 'Kararlılık, tekil değerler ve şekil kalite metriklerini birlikte kullanmak.', 'Çalışma harmoniklerini yapısal modlardan ayırıp bağıl şekilleri dürüstçe raporlamak.'],
            why: [
                { title: 'OMA ne işe yarar?', body: 'Köprü, bina ve rüzgâr türbini gibi büyük yapılar ile çalışan makineler çoğu zaman çekiç veya sarsıcıyla uyarılamaz ya da önemli olan, gerçek çalışma koşullarındaki davranışlarıdır. OMA doğal frekansları, sönümü ve mod şekillerini rüzgâr, trafik, akış veya işletmeden gelen ortam uyarımıyla belirler.' },
                { title: 'Hangi ölçümler gerekir?', body: 'Yapının farklı noktalarında eşzamanlı kaydedilen birden fazla tepki sensörü (genellikle ivmeölçer) gerekir; kuvvet ölçülmez. Geniş bantlı uyarım içeren, uzun ve yaklaşık durağan kayıtlar en güvenilir sonuçları verir.' },
                { title: 'OMA’nın EMA’dan farkı nedir?', body: 'Giriş kuvveti bilinmediği için OMA mod şekilleri kütleye göre normalize edilmez ve mutlak modal kütle yalnızca OMA ile belirlenemez. Makinenin çalışma devri harmonikleri gibi güçlü çalışma tonlarının yapısal modlardan ayırt edilmesi gerekir.' },
            ],
            interface: { title: 'OMA çalışma ekranı', intro: 'Son görünüm seçili tepki kanallarını, algoritma kontrollerini, frekans bandını, SSI ve spektral ayarları, geometri eşlemesini ve sonuç sekmelerini gösterecek. Aşağıdaki teori bu gerçek seçimlerle uyumludur.' },
            theory: { title: 'Yalnızca tepki verisiyle modal tanımlama', intro: 'Rüzgâr, trafik, akış veya makine işletimi yapıyı uyarır ama kuvvet ölçülmez. OMA ortak dinamik desenleri bulmak için eşzamanlı tepki kanalları arasındaki korelasyonu kullanır.', cards: [
                { kicker: 'TEMEL KAVRAM', title: 'Yalnızca tepki verisinin gösterebildikleri', body: 'Doğal frekans, sönüm ve bağıl mod şekli kestirilebilir. Giriş ölçeği olmadan kuvvete göre normalize FRF veya kütleye göre normalize mod şekli doğrudan elde edilemez.' },
                { kicker: 'SPEKTRAL BAKIŞ', title: 'FDD uzamsal yönleri ayırır', body: 'Her frekansta tepki spektral yoğunluk matrisi ayrıştırılır. Uyarma yeterince geniş bantlıysa baskın tekil değer ve vektör bir modu gösterebilir.' },
                { kicker: 'DURUM-UZAYI BAKIŞI', title: 'SSI zaman evrimini modeller', body: 'SSI-COV tepki kovaryanslarından durum-uzayı modeli kurar. Tanımlamayı artan model derecelerinde tekrarlamak kararlılık diyagramı için kutuplar üretir.' },
            ] },
            foundations: { title: 'OMA varsayımları ve kontrolleri', intro: 'Yöntem geniş bantlı, yaklaşık durağan uyarma ve çok sayıda eşzamanlı kanalda en iyi çalışır. Güçlü deterministik çalışma tonları bu resmi bozabilir.', cards: [
                { title: 'Kayıt süresi ve durağanlık', body: 'Uzun veri düşük frekans ve sönüm kestirimini iyileştirir; ancak sistem ve çevre karşılaştırılabilir kalıyorsa. Değişen çalışma durumlarını körlemesine ortalamak yerine bölün.' },
                { title: 'Mod karmaşıklık metrikleri', body: 'MPC’nin bire, MPD’nin sıfıra yakın olması büyük ölçüde gerçek ve eşfazlı modu destekler. Bunlar kalite ipucudur; evrensel geç/kal sınırı değildir.' },
                { title: 'Şekil ayrımı', body: 'Düşük diyagonal dışı AutoMAC ayrık uzamsal şekilleri destekler. Kötü sensör yerleşimi algoritma doğru olsa bile farklı modları benzer gösterebilir.' },
            ] },
            modes: { title: 'Tanımlama yöntemleri', intro: 'Verinin varsayımlarına en uygun yöntemle başlayın, sonra başka görünümle çapraz kontrol edin.', items: [
                { title: 'FDD', bestFor: 'Hızlı frekans alanı taraması ve iyi ayrılmış modlar.', reveals: 'Tekil değer tepeleri ve bağıl tekil vektör şekilleri.', watch: 'Yakın modlar, dar bant uyarma ve spektral sızıntı tepeleri birleştirebilir veya kaydırabilir.' },
                { title: 'EFDD', bestFor: 'FDD tepeleri çevresine sönüm kestirimi eklemek.', reveals: 'Tek-DOF spektral çan, ters dönüşüm sönümü ve sönüm oranı.', watch: 'MAC çan eşiği moda neyin dahil olduğunu belirler; kirlenme üstel olmayan sönüm üretir.' },
                { title: 'SSI-COV', bestFor: 'Yakın modlar ve kararlılık tabanlı parametrik model.', reveals: 'Artan model derecesinde frekans, sönüm ve şekiller.', watch: 'Blok satırı, maksimum derece ve toleranslar kümeyi etkiler; yüksek derece sayısal kutupları artırır.' },
            ] },
            interpretation: { intro: 'Yapısal mod, analiz ayarları değiştiğinde çalışma tonundan daha dayanıklı kalmalıdır.', items: [
                { title: 'Birkaç kanalda tek tutarlı şekille tepe', signal: 'SV1 yükselir, şekil tekrarlanır ve AutoMAC ayrık kalır.', meaning: 'Yapısal mod olasıdır.', confirm: 'Zaman bloklarında kalıcılığı kontrol edin; mümkünse SSI ile FDD/EFDD kestirimlerini karşılaştırın.' },
                { title: 'Dar çizgi makine hızıyla hareket ediyor', signal: 'Spektral tepe RPM ile kayar veya yalnız tek çalışma durumunda görünür.', meaning: 'Doğal mod yerine deterministik harmonik uyarma olabilir.', confirm: 'Order takibi veya farklı hızlar kullanın; yapı değişmiyorsa doğal frekans yaklaşık sabit kalmalıdır.' },
                { title: 'Zayıf şekil kalitesiyle yüksek sönüm', signal: 'Algoritma büyük sönüm verirken MPC/MPD veya AutoMAC kötüdür.', meaning: 'Kutup gürültü, çakışan içerik veya durağan olmamayı temsil ediyor olabilir.', confirm: 'Kabulden önce kaydı, frekans bandını, model derecesini ve kanal setini gözden geçirin.' },
            ] },
            workflow: { title: 'OMA prosedürü', intro: 'Eşzamanlı uzamsal bilgiyi koruyun ve çalışma durumunu algoritma ayarları kadar dikkatle belgeleyin.', checklist: ['En az iki eşzamanlı tepki kanalı kullanın; beklenen modların farklı hareket ettiği yerlere sensör ekleyin.', 'Çalışma hızı, yük, sıcaklık ve diğer çevresel değişkenleri kaydedin.', 'Durağanlık varsaymadan önce zaman sinyallerinde geçici olay, kırpılma ve durum değişimi arayın.', 'İlgisiz kayma ile desteklenmeyen yüksek frekansı dışlayan bant seçin.', 'Tekil değerleri veya kararlı kümeleri MPC, MPD ve AutoMAC ile karşılaştırın.', 'Mod şekillerini bağıl/ölçeksiz raporlayın; algoritmayı ve parametre setini belirtin.'] },
            mistakes: [
                { title: 'Çalışma harmoniklerini mod sanmak', body: 'Güçlü ton FDD’ye baskın olabilir. Makineyle hareket edip etmediğini görmek için hızı değiştirin veya order takibi kullanın.' },
                { title: 'Yalnız OMA’dan mutlak modal kütle raporlamak', body: 'Ölçülmüş giriş veya ayrı ölçekleme yöntemi olmadan OMA şekilleri mutlak kuvvet normalizasyonu taşımaz.' },
                { title: 'Uzamsal iddia için tek sensör kullanmak', body: 'Tek kanalla frekans tepesi görülebilir; fakat mod şekli ve AutoMAC anlamlı eşzamanlı dizi ister.' },
                { title: 'Daha çok kutup bulduğu için en yüksek model derecesini seçmek', body: 'Yüksek derece sayısal kökleri artırır. Fiziksel mod en uzun tablo değil, tekrarlanan ve iyi şekillenmiş alt kümedir.' },
            ],
            sources: [
                { title: 'Brincker, Zhang & Andersen · Frequency Domain Decomposition', note: 'Ortam tepki verisi için FDD’yi tanıtan temel yalnız-çıkış araştırması.', href: 'https://vbn.aau.dk/en/publications/modal-identification-of-output-only-systems-using-frequency-domai/' },
                { title: 'Peeters & De Roeck · Stochastic Subspace Identification', note: 'Operasyonel modal analiz için referans tabanlı SSI üzerine birincil araştırma.', href: 'https://doi.org/10.1016/S0888-3270(99)00014-8' },
            ] },
    },
    time_ods: {
        en: {
            title: 'Time-Based ODS Analysis Guide',
            intro: 'This guide explains how operating deflection shapes (ODS) are obtained from synchronized vibration measurements and measurement point geometry. It describes the band-pass time, complex frequency and RPM-tracked order extraction methods in MachinePulseAI, and the difference between an ODS and a natural mode shape.',
            badges: ['Phase-true time ODS', 'Complex frequency shape', 'RPM-tracked order ODS', '3D geometry animation'], duration: 'Estimated reading time: about 19 minutes',
            outcomes: ['Explain the difference between ODS and modal analysis.', 'Map channels to nodes and physical DOF directions consistently.', 'Choose time, frequency or order extraction for the observed event.', 'Use deformation scaling, arrows and colour as display aids—not physical amplification.'],
            why: [
                { title: 'What ODS analysis is for', body: 'An operating deflection shape shows how a structure or machine actually moves under its operating loads at a given frequency, order or moment in time. Animating the measured motion on a geometric model shows which parts move most, whether components move in or out of phase, and where looseness or flexibility is located.' },
                { title: 'Which measurements are required', body: 'Vibration measurements from many points, recorded simultaneously or with a common phase reference, are required, together with the coordinates and measurement direction of each point. Order-based ODS also requires a speed signal.' },
                { title: 'How an ODS differs from a mode shape', body: 'An ODS is the combined result of all forces and modes acting at the same time; it is not a natural mode shape. It shows how the structure moves in operation, whereas modal analysis shows how it can move. The two are often used together to decide whether a problem is caused by excessive force or by resonance.' },
            ],
            interface: { title: 'Time-Based ODS workspace', intro: 'The future image will show reference/tacho selection, extraction method, frequency or order controls, imported geometry, animation display and summary. The following guide already reflects those controls.' },
            theory: { title: 'Operating deflection shape fundamentals', intro: 'At a chosen time, band, frequency or order, every measured point contributes amplitude and sign/phase. Mapping those values onto geometry creates a deflection pattern.', cards: [
                { kicker: 'KEY CONCEPT', title: 'ODS is not a mode shape', body: 'An ODS contains all responses present under operating forces. A mode shape is a property extracted from a modal model. Near one dominant resonance they may look similar, but the claims remain different.' },
                { kicker: 'SPATIAL MODEL', title: 'Geometry gives the data meaning', body: 'Channel labels alone cannot show bending or twist. Each signal must map to a node, coordinate and DOF axis so relative motion becomes a physical shape.' },
                { kicker: 'PHASE MATTERS', title: 'A shape needs timing as well as amplitude', body: 'Two points with equal amplitude but opposite phase move in opposite directions. Complex or phase-preserving extraction is essential for believable animation.' },
            ] },
            foundations: { title: 'Measurement requirements for a reliable ODS', intro: 'A smooth 3D view can hide timing errors, wrong DOF signs and mixed frequency content. Validate the data before adjusting visual scale.', cards: [
                { title: 'Common clock and reference', body: 'All channels must be synchronized. Frequency mode uses a chosen reference DOF; order mode additionally needs a valid RPM/tacho channel.' },
                { title: 'Extraction bandwidth', body: 'Band-pass width controls which neighbouring content contributes. Too wide mixes phenomena; too narrow can ring or remove a changing component.' },
                { title: 'Display exaggeration', body: 'Auto-fit scale, manual deformation scale, arrows and colour improve visibility. They do not change computed relative motion and should never be reported as true displacement scale.' },
            ] },
            modes: { title: 'Extraction methods', intro: 'The widget offers three implemented paths because transient, fixed-frequency and speed-related motion need different coordinates.', items: [
                { title: 'Band-pass time · phase-true', bestFor: 'Transient or slowly changing deformation around a selected frequency band.', reveals: 'Frame-by-frame synchronized motion after phase-preserving filtering.', watch: 'Filter transients at selection edges and mixed modes inside a wide band can distort the apparent shape.' },
                { title: 'Frequency · complex shape', bestFor: 'Steady response at one target frequency relative to a reference DOF.', reveals: 'Complex amplitude and phase at each point, animated as a harmonic shape.', watch: 'NFFT, averages and window control leakage and resolution; a target between bins needs careful interpretation.' },
                { title: 'Order · RPM-tracked', bestFor: 'A deformation pattern tied to shaft order during changing speed.', reveals: 'Per-channel Vold–Kalman extracted order motion on the geometry.', watch: 'A bad tacho or unsuitable VK bandwidth corrupts every point consistently and can create a persuasive but false animation.' },
            ] },
            interpretation: { intro: 'Read relative motion and phase relationships before looking for a repair.', items: [
                { title: 'One panel dominates', signal: 'A local group of nodes moves far more than the surrounding structure.', meaning: 'Local flexibility, attachment weakness or nearby forcing may be concentrating motion.', confirm: 'Check sensor mounting, geometry scale and a second operating condition before recommending stiffness changes.' },
                { title: 'Two sides move opposite each other', signal: 'Comparable amplitudes carry roughly 180° phase difference.', meaning: 'A bending or twisting pattern crosses a nodal region between them.', confirm: 'Add measurement points near the suspected node and compare with EMA/OMA if modal identity matters.' },
                { title: 'Shape changes with speed', signal: 'The order-tracked pattern rotates or redistributes through a run-up.', meaning: 'The same rotating force may be crossing different structural modes.', confirm: 'Use the frequency–RPM map and repeatability across run-up/coast-down to separate mode interaction from data error.' },
            ] },
            workflow: { title: 'ODS procedure', intro: 'Plan the spatial question before recording hundreds of channels.', checklist: ['Define nodes, coordinates and DOF directions before naming channels.', 'Use a common acquisition clock and preserve sensor polarity.', 'Choose a reference DOF with strong, clean response for complex frequency mode.', 'Select an extraction band or order from spectral/order evidence, not from animation appearance.', 'Review several scale factors and show mesh edges/arrows only as interpretation aids.', 'State the operating condition and that the result is an ODS, not a normalized mode shape.'] },
            mistakes: [
                { title: 'Calling an ODS animation a modal test', body: 'ODS visualizes total operating response. It does not by itself separate natural modes, damping or modal mass.' },
                { title: 'Flipping a channel without documenting polarity', body: 'A sign error changes relative phase by 180° and can invent bending or remove real bending.' },
                { title: 'Choosing the band by visual appearance', body: 'Extraction must follow a known frequency or order feature. Visual drama is not an engineering selection rule.' },
                { title: 'Reading the exaggerated mesh as true displacement', body: 'The display scale is deliberately amplified. Use the computed point amplitudes for quantitative statements.' },
            ],
            sources: [
            ] },
        tr: {
            title: 'Zaman Tabanlı ODS Analiz Rehberi',
            intro: 'Bu rehber, çalışma sapma şekillerinin (ODS) eşzamanlı titreşim ölçümlerinden ve ölçüm noktası geometrisinden nasıl elde edildiğini anlatır. MachinePulseAI’daki bant geçiren zaman, karmaşık frekans ve RPM izleyen order çıkarım yöntemlerini ve ODS ile doğal mod şekli arasındaki farkı açıklar.',
            badges: ['Fazı koruyan zaman ODS', 'Karmaşık frekans şekli', 'RPM izleyen order ODS', '3B geometri animasyonu'], duration: 'Tahmini okuma süresi: yaklaşık 19 dakika',
            outcomes: ['ODS ile modal analiz farkını açıklamak.', 'Kanalları düğümlere ve fiziksel DOF yönlerine tutarlı eşlemek.', 'Gözlenen olay için zaman, frekans veya order çıkarımını seçmek.', 'Deformasyon ölçeği, oklar ve rengi fiziksel büyütme değil görüntüleme yardımı olarak kullanmak.'],
            why: [
                { title: 'ODS analizi ne işe yarar?', body: 'Çalışma sapma şekli, bir yapının veya makinenin belirli bir frekans, order veya zaman anında çalışma yükleri altında gerçekte nasıl hareket ettiğini gösterir. Ölçülen hareketin geometrik model üzerinde canlandırılması; en çok hangi parçaların hareket ettiğini, bileşenlerin aynı fazda mı zıt fazda mı hareket ettiğini ve gevşekliğin veya esnekliğin nerede olduğunu gösterir.' },
                { title: 'Hangi ölçümler gerekir?', body: 'Eşzamanlı ya da ortak bir faz referansıyla kaydedilmiş çok sayıda noktadan titreşim ölçümü ile her noktanın koordinatları ve ölçüm yönü gerekir. Order tabanlı ODS için ayrıca devir sinyali gerekir.' },
                { title: 'ODS’nin mod şeklinden farkı nedir?', body: 'ODS, aynı anda etkiyen tüm kuvvetlerin ve modların birleşik sonucudur; doğal mod şekli değildir. ODS yapının çalışırken nasıl hareket ettiğini, modal analiz ise nasıl hareket edebileceğini gösterir. Bir sorunun aşırı kuvvetten mi yoksa rezonanstan mı kaynaklandığını belirlemek için ikisi sıklıkla birlikte kullanılır.' },
            ],
            interface: { title: 'Zaman Tabanlı ODS çalışma ekranı', intro: 'İlerideki görüntü referans/tako seçimini, çıkarım yöntemini, frekans veya order kontrollerini, içe aktarılan geometriyi, animasyon görünümünü ve özeti gösterecek. Aşağıdaki rehber bu gerçek kontrollere dayanır.' },
            theory: { title: 'Çalışma sapma şekli (ODS) temelleri', intro: 'Seçilen zaman, bant, frekans veya order’da her ölçüm noktası genlik ve işaret/faz katkısı yapar. Bu değerleri geometriye eşlemek sapma desenini oluşturur.', cards: [
                { kicker: 'TEMEL KAVRAM', title: 'ODS mod şekli değildir', body: 'ODS çalışma kuvvetleri altındaki tüm tepkileri içerir. Mod şekli modal modelden çıkarılan yapısal özelliktir. Tek baskın rezonans yakınında benzeyebilirler ama iddia farklı kalır.' },
                { kicker: 'UZAMSAL MODEL', title: 'Geometri veriye anlam kazandırır', body: 'Kanal etiketleri tek başına eğilme veya burulmayı gösteremez. Bağıl hareketin fiziksel şekle dönüşmesi için her sinyal düğüm, koordinat ve DOF eksenine eşlenmelidir.' },
                { kicker: 'FAZ ÖNEMLİDİR', title: 'Şekil genlik kadar zamanlama ister', body: 'Eşit genlikli iki nokta zıt fazdaysa ters yönde hareket eder. İnandırıcı animasyon için karmaşık veya fazı koruyan çıkarım gerekir.' },
            ] },
            foundations: { title: 'Güvenilir ODS için ölçüm gereksinimleri', intro: 'Akıcı 3B görünüm zamanlama hatasını, yanlış DOF işaretini ve karışmış frekans içeriğini saklayabilir. Görsel ölçekten önce veriyi doğrulayın.', cards: [
                { title: 'Ortak saat ve referans', body: 'Tüm kanallar eşzamanlı olmalıdır. Frekans modu seçilen referans DOF’unu; order modu ayrıca geçerli RPM/tako kanalını ister.' },
                { title: 'Çıkarım bant genişliği', body: 'Bant genişliği komşu içeriğin ne kadar katkı yapacağını belirler. Çok geniş bant olguları karıştırır; çok dar bant çınlayabilir veya değişen bileşeni silebilir.' },
                { title: 'Görsel büyütme', body: 'Otomatik uyum, deformasyon ölçeği, ok ve renk görünürlüğü artırır. Hesaplanan bağıl hareketi değiştirmez ve gerçek yer değiştirme ölçeği olarak raporlanmamalıdır.' },
            ] },
            modes: { title: 'Çıkarım yöntemleri', intro: 'Geçici, sabit frekanslı ve hıza bağlı hareket farklı koordinatlar istediği için widget üç uygulanmış yol sunar.', items: [
                { title: 'Bant geçiren zaman · fazı koruyan', bestFor: 'Seçilen frekans bandı çevresindeki geçici veya yavaş değişen deformasyon.', reveals: 'Fazı koruyan filtre sonrası kare kare eşzamanlı hareket.', watch: 'Seçim kenarındaki filtre geçişleri ve geniş bant içindeki karışık modlar görünen şekli bozabilir.' },
                { title: 'Frekans · karmaşık şekil', bestFor: 'Referans DOF’una göre tek hedef frekanstaki kararlı tepki.', reveals: 'Her noktadaki karmaşık genlik ve fazın harmonik şekil animasyonu.', watch: 'NFFT, ortalama ve pencere sızıntı/çözünürlüğü yönetir; bin arası hedef dikkatli yorum ister.' },
                { title: 'Order · RPM izleyen', bestFor: 'Değişen hızda mil order’ına bağlı deformasyon deseni.', reveals: 'Geometri üzerinde kanal başına Vold–Kalman ile çıkarılmış order hareketi.', watch: 'Kötü tako veya uygunsuz VK bandı her noktayı aynı biçimde bozar ve ikna edici ama yanlış animasyon yaratabilir.' },
            ] },
            interpretation: { intro: 'Onarım aramadan önce bağıl hareketi ve faz ilişkilerini okuyun.', items: [
                { title: 'Tek panel baskın', signal: 'Yerel düğüm grubu çevre yapıdan çok daha fazla hareket eder.', meaning: 'Yerel esneklik, bağlantı zayıflığı veya yakın uyarma hareketi yoğunlaştırıyor olabilir.', confirm: 'Rijitlik önerisinden önce sensör montajını, geometri ölçeğini ve ikinci çalışma durumunu kontrol edin.' },
                { title: 'İki taraf zıt hareket ediyor', signal: 'Benzer genlikler yaklaşık 180° faz farkı taşır.', meaning: 'Aralarında düğüm bölgesi bulunan eğilme veya burulma deseni vardır.', confirm: 'Şüpheli düğüm yakınına nokta ekleyin; modal kimlik gerekiyorsa EMA/OMA ile karşılaştırın.' },
                { title: 'Şekil hızla değişiyor', signal: 'Order izleyen desen kalkış boyunca döner veya yeniden dağılır.', meaning: 'Aynı dönel kuvvet farklı yapısal modların içinden geçiyor olabilir.', confirm: 'Mod etkileşimini veri hatasından ayırmak için frekans–RPM haritasını ve kalkış/duruş tekrarlanabilirliğini kullanın.' },
            ] },
            workflow: { title: 'ODS prosedürü', intro: 'Yüzlerce kanal kaydetmeden önce uzamsal soruyu planlayın.', checklist: ['Kanalları adlandırmadan önce düğüm, koordinat ve DOF yönlerini tanımlayın.', 'Ortak ölçüm saati kullanın ve sensör polaritesini koruyun.', 'Karmaşık frekans modu için güçlü, temiz tepkiye sahip referans DOF seçin.', 'Bant veya order’ı animasyon görüntüsünden değil spektral/order kanıtından seçin.', 'Birkaç ölçek katsayısını inceleyin; ağ kenarı ve okları yalnız yorum yardımı olarak gösterin.', 'Çalışma durumunu ve sonucun normalize mod şekli değil ODS olduğunu belirtin.'] },
            mistakes: [
                { title: 'ODS animasyonuna modal test demek', body: 'ODS toplam çalışma tepkisini gösterir. Tek başına doğal modları, sönümü veya modal kütleyi ayırmaz.' },
                { title: 'Polariteyi belgelemeden kanalı ters çevirmek', body: 'İşaret hatası bağıl fazı 180° değiştirir; sahte eğilme yaratabilir veya gerçek eğilmeyi yok edebilir.' },
                { title: 'Bandı animasyonun görünümüne göre seçmek', body: 'Çıkarım bilinen frekans veya order özelliğini izlemelidir. Görsel drama mühendislik seçim kuralı değildir.' },
                { title: 'Büyütülmüş ağı gerçek yer değiştirme sanmak', body: 'Görüntü ölçeği bilerek büyütülür. Nicel ifade için hesaplanan nokta genliklerini kullanın.' },
            ],
            sources: [
            ] },
    },
}

export default MODAL_LEARNING
