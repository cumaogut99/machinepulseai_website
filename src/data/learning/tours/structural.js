// Interface tours: experimental modal analysis, operational modal analysis
// and time-based ODS. Every string pair is [en, tr]. Hotspot positions come
// from tourAnchors.js.

const pt = (id, title, desc) => ({ id, title, desc })

const markersTable = pt('table', ['Marker table', 'İşaretçi tablosu'], [
    'Lists markers with their values; rename, remove, clear or export as CSV.',
    'İşaretçileri değerleriyle listeler; yeniden adlandırın, silin, temizleyin veya CSV olarak aktarın.',
])

export default {
    modal_analysis: [
        {
            id: 'frf',
            tab: ['Analysis + FRF', 'Analiz + FRF'],
            summary: [
                'One force and four response DOFs. H1 FRF magnitude, phase and coherence for every response, with modes near 60, 180 and 420 Hz.',
                'Bir kuvvet ve dört cevap serbestliği. Her cevap için H1 FRF genliği, fazı ve koheransı; modlar 60, 180 ve 420 Hz civarında.',
            ],
            points: [
                pt('input', ['Input and navigator', 'Giriş ve navigatör'], [
                    'Sample rate from the MPAI file and the navigator channel. The navigator range is the measured span used for the FRFs.',
                    'MPAI dosyasından örnekleme hızı ve navigatör kanalı. Navigatör aralığı FRF’ler için kullanılan ölçüm aralığıdır.',
                ]),
                pt('frf_parameters', ['FRF parameters', 'FRF parametreleri'], [
                    'Estimator (H1, H2, Hv), block size (Δf = fs / N), averaging, excitation type (shaker / continuous or impact hammer), window and its parameter, response decay and overlap. For impact testing the force window and exponential response window must match the decay of the structure.',
                    'Tahminci (H1, H2, Hv), blok boyutu (Δf = fs / N), ortalama, uyarım tipi (shaker / sürekli veya darbe çekici), pencere ve parametresi, cevap sönümü ve örtüşme. Darbe testinde kuvvet penceresi ve üstel cevap penceresi yapının sönümüne uymalıdır.',
                ]),
                pt('excitation', ['Excitation channel', 'Uyarım kanalı'], [
                    'The measured force channel. An operational, response-only measurement belongs to OMA instead.',
                    'Ölçülen kuvvet kanalı. Yalnızca cevap içeren işletme ölçümü OMA’ya aittir.',
                ]),
                pt('responses', ['Response DOFs', 'Cevap serbestlikleri'], [
                    'Multi-select the response channels; their order defines the mode-shape DOFs used later in Shapes and in the geometry association.',
                    'Cevap kanallarını çoklu seçin; sıraları daha sonra Shapes’te ve geometri eşlemesinde kullanılan mod şekli serbestliklerini tanımlar.',
                ]),
                pt('estimator_view', ['Display estimator and scale', 'Gösterilen tahminci ve ölçek'], [
                    'Switches the displayed estimator (H1 / H2 / Hv) and magnitude scale without recomputing; Capture Reference keeps a result for comparison and Export writes the FRFs.',
                    'Gösterilen tahminciyi (H1 / H2 / Hv) ve genlik ölçeğini yeniden hesaplamadan değiştirir; Capture Reference karşılaştırma için bir sonucu saklar, Export FRF’leri yazar.',
                ]),
                pt('frf', ['FRF magnitude, phase and coherence', 'FRF genlik, faz ve koherans'], [
                    'Peaks shared by every response with a phase change mark candidate modes; coherence near 1 around them confirms the estimate. Dips in coherence at anti-resonances are expected.',
                    'Tüm cevaplarda ortak olan ve faz değişimi gösteren tepeler aday modlardır; çevrelerinde 1’e yakın koherans tahmini doğrular. Anti-rezonanslarda koherans düşüşleri beklenir.',
                ]),
            ],
        },
        {
            id: 'nyquist',
            tab: ['Nyquist', 'Nyquist'],
            summary: [
                'Real against imaginary FRF: each mode traces a circle-like loop.',
                'FRF’nin gerçel ve sanal kısmı: her mod daireye benzer bir ilmek çizer.',
            ],
            points: [
                pt('nyquist', ['Nyquist plot', 'Nyquist grafiği'], [
                    'A well-separated, lightly damped mode forms a near-circular loop; distorted or overlapping loops reveal close modes, noise or leakage around a resonance.',
                    'İyi ayrışmış, az sönümlü bir mod neredeyse dairesel bir ilmek oluşturur; bozuk veya iç içe ilmekler rezonans çevresinde yakın modları, gürültüyü veya kaçağı gösterir.',
                ]),
                pt('estimator_view', ['Same estimator choice', 'Aynı tahminci seçimi'], [
                    'The displayed estimator applies to Nyquist too, so H1 and H2 can be compared on the same loop.',
                    'Gösterilen tahminci Nyquist için de geçerlidir; H1 ve H2 aynı ilmekte karşılaştırılabilir.',
                ]),
            ],
        },
        {
            id: 'identification',
            tab: ['Identification', 'Tanımlama'],
            summary: [
                'LSCF stabilization diagram and the LSFD modal fit: three stable poles were selected from frequency markers and fitted.',
                'LSCF kararlılık diyagramı ve LSFD modal uyumu: üç kararlı kutup frekans işaretçilerinden seçilip uydurulmuştur.',
            ],
            points: [
                pt('lscf', ['LSCF stabilization settings', 'LSCF kararlılık ayarları'], [
                    'Minimum and maximum model order, and the relative frequency and absolute damping tolerances that decide when a pole is “stable” between successive orders.',
                    'En küçük ve en büyük model derecesi ile bir kutbun ardışık dereceler arasında “kararlı” sayılması için göreli frekans ve mutlak sönüm toleransları.',
                ]),
                pt('lsfd', ['LSFD residue fit', 'LSFD rezidü uyumu'], [
                    'Choose whether lower and upper residuals are included, then map frequency markers to the nearest stable poles (“Markers as Poles”) or click poles in the diagram, and run “Fit Selected Poles”.',
                    'Alt ve üst artıkların dahil edilip edilmeyeceğini seçin; ardından frekans işaretçilerini en yakın kararlı kutuplara eşleyin (“Markers as Poles”) veya diyagramda kutuplara tıklayın ve “Fit Selected Poles” çalıştırın.',
                ]),
                pt('stabilization', ['Stabilization diagram', 'Kararlılık diyagramı'], [
                    'Poles per model order over frequency. Columns of stable symbols that persist across orders are physical modes; scattered symbols are numerical. Orange stars are the poles selected for the fit.',
                    'Frekansa karşı her model derecesindeki kutuplar. Dereceler boyunca süren kararlı sembol sütunları fiziksel modlardır; dağınık semboller sayısaldır. Turuncu yıldızlar uyum için seçilen kutuplardır.',
                ]),
                pt('modal_table', ['Modal parameters', 'Modal parametreler'], [
                    'Frequency, damping, amplitude and phase of each fitted mode — 60.1, 180.0 and 420.0 Hz here — with the normalised RMS error of the synthesized FRF. A lower error means a better modal model, not automatically a better measurement.',
                    'Her uydurulan modun frekansı, sönümü, genliği ve fazı — burada 60,1, 180,0 ve 420,0 Hz — ile sentezlenen FRF’nin normalize RMS hatası. Düşük hata daha iyi modal model demektir; otomatik olarak daha iyi ölçüm demek değildir.',
                ]),
            ],
        },
        {
            id: 'shapes',
            tab: ['Geometry + Shapes', 'Geometri + Şekiller'],
            summary: [
                'Mode shapes on a connected Geometry Source, with the AutoMAC of the fitted modes and the analysis summary.',
                'Bağlı Geometry Source üzerinde mod şekilleri; uydurulan modların AutoMAC’i ve analiz özeti.',
            ],
            points: [
                pt('association', ['Geometry association', 'Geometri eşlemesi'], [
                    'Connect a Geometry Source and assign each response DOF to an exact node ID and direction. Unmapped nodes are interpolated or kept fixed; without an association the 3D view stays empty instead of guessing positions.',
                    'Bir Geometry Source bağlayın ve her cevap serbestliğini tam bir düğüm kimliği ve yöne atayın. Eşlenmemiş düğümler enterpole edilir veya sabit tutulur; eşleme yoksa 3D görünüm konum tahmin etmek yerine boş kalır.',
                ]),
                pt('shapes', ['AutoMAC and animation', 'AutoMAC ve animasyon'], [
                    'The AutoMAC matrix compares the fitted shapes (off-diagonal near 0 = well separated). Below it, the selected mode animates on the geometry with deformation scale, colormap, ghost body and camera controls, and can be exported as MP4 or PNG.',
                    'AutoMAC matrisi uydurulan şekilleri karşılaştırır (köşegen dışı 0’a yakın = iyi ayrışmış). Altında seçili mod geometri üzerinde deformasyon ölçeği, renk haritası, hayalet gövde ve kamera kontrolleriyle oynatılır; MP4 veya PNG olarak dışa aktarılabilir.',
                ]),
                pt('summary', ['Modal analysis summary', 'Modal analiz özeti'], [
                    'Resolution, effective block, Welch averages, analysed duration, selection coverage, coherence and stabilization scope — the facts needed to judge whether the identification is trustworthy.',
                    'Çözünürlük, etkin blok, Welch ortalamaları, analiz edilen süre, seçim kapsamı, koherans ve kararlılık kapsamı — tanımlamanın güvenilir olup olmadığını değerlendirmek için gereken bilgiler.',
                ]),
            ],
        },
        {
            id: 'markers',
            tab: ['Markers', 'İşaretçiler'],
            summary: [
                'Frequency markers at the three modes, read on every FRF, phase and coherence curve.',
                'Üç modda frekans işaretçileri; her FRF, faz ve koherans eğrisinde okunur.',
            ],
            points: [
                pt('interaction', ['Plot interaction', 'Grafik etkileşimi'], [
                    'Click a plot to add markers; “Nearest frequency bin” with a peak radius snaps them onto the local maximum.',
                    'İşaretçi eklemek için grafiğe tıklayın; “Nearest frequency bin” ve tepe yarıçapı onları yerel maksimuma yakalar.',
                ]),
                pt('frequency_markers', ['Marker, delta and band', 'İşaretçi, fark ve bant'], [
                    'Typed markers, deltas for half-power bandwidth and bands that report peak, average, RMS and power.',
                    'Yazılarak eklenen işaretçiler, yarı güç bant genişliği için farklar ve tepe, ortalama, RMS ve güç veren bantlar.',
                ]),
                pt('extrema', ['Frequency-range extrema', 'Frekans aralığı ekstremumları'], [
                    'Finds the strongest peaks in a range and adds them as markers — a fast way to seed pole selection.',
                    'Bir aralıktaki en güçlü tepeleri bulup işaretçi olarak ekler — kutup seçimini başlatmanın hızlı yolu.',
                ]),
                pt('frf', ['Markers on every curve', 'Her eğride işaretçiler'], [
                    'Each marker reports magnitude, phase and coherence for every response DOF at the same frequency.',
                    'Her işaretçi aynı frekansta her cevap serbestliği için genlik, faz ve koheransı raporlar.',
                ]),
                markersTable,
            ],
        },
    ],

    operational_modal_analysis: [
        {
            id: 'analysis',
            tab: ['Analysis + SV spectrum', 'Analiz + SV spektrumu'],
            summary: [
                'Four response channels under unmeasured broadband excitation. EFDD peak-picks the first singular value; green lines mark the selected modes.',
                'Ölçülmeyen geniş bantlı uyarım altında dört cevap kanalı. EFDD birinci tekil değerde tepe seçer; yeşil çizgiler seçilen modları gösterir.',
            ],
            points: [
                pt('algorithm', ['Algorithm and model order', 'Algoritma ve model derecesi'], [
                    'SSI-COV identifies a state-space model and builds a stabilization diagram (model order and block rows apply to it). FDD and EFDD decompose the cross-spectral matrix and pick peaks from the singular values. OMA assumes broadband, unmeasured excitation; strong harmonics can masquerade as modes.',
                    'SSI-COV durum uzayı modeli tanımlar ve kararlılık diyagramı oluşturur (model derecesi ve blok satırları ona uygulanır). FDD ve EFDD çapraz spektral matrisi ayrıştırıp tekil değerlerden tepe seçer. OMA geniş bantlı ve ölçülmemiş uyarım varsayar; güçlü harmonikler mod gibi görünebilir.',
                ]),
                pt('band', ['Frequency band', 'Frekans bandı'], [
                    'Low and high limits of the identification band. A focused band reduces spurious poles and computation.',
                    'Tanımlama bandının alt ve üst sınırları. Odaklanmış bant sahte kutupları ve hesap yükünü azaltır.',
                ]),
                pt('preprocess', ['FDD / EFDD spectral parameters', 'FDD / EFDD spektral parametreleri'], [
                    'Block size, overlap and window of the spectral estimate; Peak Threshold (fraction of the maximum SV1) and Max Modes control peak picking; EFDD Bell MAC rejects bins that do not belong to a mode’s single-degree-of-freedom bell.',
                    'Spektral tahminin blok boyutu, örtüşmesi ve penceresi; Peak Threshold (en büyük SV1’in oranı) ve Max Modes tepe seçimini kontrol eder; EFDD Bell MAC bir modun tek serbestlikli çanına ait olmayan kutuları reddeder.',
                ]),
                pt('sv', ['Singular-value spectrum', 'Tekil değer spektrumu'], [
                    'The first singular values of the cross-spectral matrix. Peaks of SV1 well above SV2 indicate a dominant mode; the green lines are the picked modes. Available for FDD and EFDD.',
                    'Çapraz spektral matrisin ilk tekil değerleri. SV2’nin belirgin üstündeki SV1 tepeleri baskın bir moda işaret eder; yeşil çizgiler seçilen modlardır. FDD ve EFDD için kullanılabilir.',
                ]),
                pt('signals', ['Response channels', 'Cevap kanalları'], [
                    'Select the response signals only — no excitation channel is used in OMA. Their order defines the DOFs for the geometry association.',
                    'Yalnızca cevap sinyallerini seçin — OMA’da uyarım kanalı kullanılmaz. Sıraları geometri eşlemesi için serbestlikleri tanımlar.',
                ]),
            ],
        },
        {
            id: 'parameters',
            tab: ['Modal parameters', 'Modal parametreler'],
            summary: [
                'Identified modes with frequency, damping and shape-quality indicators.',
                'Frekans, sönüm ve şekil kalitesi göstergeleriyle tanımlanan modlar.',
            ],
            points: [
                pt('table', ['Mode table', 'Mod tablosu'], [
                    'Frequency, damping, MPC (≈1 = real, normal-mode-like shape), MPD (≈0° = monophase) and the maximum MAC with any other mode. Here two rows sit near 60 Hz with Max MAC 1.000: the same mode picked twice, which should be merged or discarded before reporting.',
                    'Frekans, sönüm, MPC (≈1 = gerçel, normal moda benzer şekil), MPD (≈0° = tek fazlı) ve başka bir modla en büyük MAC. Burada iki satır 60 Hz civarında ve Max MAC 1,000: aynı mod iki kez seçilmiştir; raporlamadan önce birleştirilmeli veya atılmalıdır.',
                ]),
            ],
        },
        {
            id: 'automac',
            tab: ['AutoMAC', 'AutoMAC'],
            summary: [
                'Shape similarity between every pair of identified modes.',
                'Tanımlanan her mod çifti arasındaki şekil benzerliği.',
            ],
            points: [
                pt('automac', ['AutoMAC matrix', 'AutoMAC matrisi'], [
                    'The diagonal is always 1. Off-diagonal values near 0 mean independent shapes; a bright off-diagonal cell (modes 1 and 3 here) flags a duplicate or spatially aliased mode — often a sign that more sensors or a different band are needed.',
                    'Köşegen daima 1’dir. Köşegen dışında 0’a yakın değerler bağımsız şekiller demektir; parlak köşegen dışı hücre (burada mod 1 ve 3) yinelenen veya uzaysal olarak örtüşen bir moda işaret eder — çoğu zaman daha fazla sensör veya farklı bir bant gerektiğini gösterir.',
                ]),
            ],
        },
        {
            id: 'shape',
            tab: ['Geometry + Mode shape (3D)', 'Geometri + Mod şekli (3D)'],
            summary: [
                'The selected mode animated on a beam strip from the Geometry Source.',
                'Seçili mod Geometry Source’tan gelen bir kiriş şeridi üzerinde oynatılır.',
            ],
            points: [
                pt('association', ['Geometry Source association', 'Geometry Source eşlemesi'], [
                    'Each response maps to an exact node ID and direction; the page reports how many nodes are measured and how the rest are handled. Shapes are unscaled — OMA has no measured force, so mass-normalised shapes are not available.',
                    'Her cevap tam bir düğüm kimliği ve yöne eşlenir; sayfa kaç düğümün ölçüldüğünü ve kalanların nasıl ele alındığını raporlar. Şekiller ölçeksizdir — OMA’da ölçülmüş kuvvet olmadığından kütleye normalize şekiller yoktur.',
                ]),
                pt('shape', ['3D mode shape', '3D mod şekli'], [
                    'Select a row in Modal Parameters to animate that mode. Colour shows relative deflection; the animation is magnified and only shows the shape, not the physical amplitude.',
                    'O modu oynatmak için Modal Parameters’ta bir satır seçin. Renk göreli sapmayı gösterir; animasyon büyütülmüştür ve fiziksel genliği değil yalnızca şekli gösterir.',
                ]),
            ],
        },
    ],

    time_ods: [
        {
            id: 'setup',
            tab: ['Setup + 3D shape', 'Kurulum + 3D şekil'],
            summary: [
                'Six accelerometers along a beam, band-pass extracted at 50 Hz and animated on a connected geometry with signed, phase-true deflection.',
                'Bir kiriş boyunca altı ivmeölçer; 50 Hz’de bant geçirilerek çıkarılır ve bağlı bir geometri üzerinde işaretli, faz-doğru sapmayla oynatılır.',
            ],
            points: [
                pt('signals_sampling', ['Signals and units', 'Sinyaller ve birimler'], [
                    'Shows how many responses are selected and the response and geometry units, so displacement is not mistaken for acceleration on the model.',
                    'Kaç cevabın seçildiğini ve cevap ile geometri birimlerini gösterir; modelde yer değiştirme ivmeyle karıştırılmaz.',
                ]),
                pt('units', ['Units', 'Birimler'], [
                    'Response units come from the channel metadata; “Unknown” is reported rather than assumed.',
                    'Cevap birimleri kanal meta verisinden gelir; varsayılmak yerine “Unknown” olarak raporlanır.',
                ]),
                pt('reference', ['Reference DOF and rotation', 'Referans DOF ve dönme'], [
                    'The reference DOF anchors relative phase; Rotation Type chooses an RPM channel or tacho pulses for the order-tracked extraction mode.',
                    'Referans DOF göreli fazı sabitler; Rotation Type order izlemeli çıkarım modu için RPM kanalı veya tacho darbelerini seçer.',
                ]),
                pt('geometry_mapping', ['Geometry mapping', 'Geometri eşlemesi'], [
                    'Each response is assigned to a node ID and direction of the connected Geometry Source; the header reports mapped nodes and whether IDs are ready. Wrong orientation flips the apparent shape.',
                    'Her cevap bağlı Geometry Source’un bir düğüm kimliği ve yönüne atanır; başlık eşlenen düğümleri ve kimliklerin hazır olup olmadığını raporlar. Yanlış yön görünen şekli ters çevirir.',
                ]),
                pt('shape', ['Animated deflection', 'Animasyonlu sapma'], [
                    'Measured time frames played in slow motion on the geometry. Deformation scale, camera buttons and Export MP4 / Snapshot PNG control the view; the clip line states the measured duration and slow-motion factor.',
                    'Ölçülen zaman kareleri geometri üzerinde ağır çekimde oynatılır. Deformasyon ölçeği, kamera düğmeleri ve Export MP4 / Snapshot PNG görünümü kontrol eder; klip satırı ölçülen süreyi ve ağır çekim oranını belirtir.',
                ]),
                pt('signals', ['Response channels', 'Cevap kanalları'], [
                    'Select the response DOFs only; rotation channels such as keyphasor and RPM stay unchecked.',
                    'Yalnızca cevap serbestliklerini seçin; keyphasor ve RPM gibi dönme kanalları işaretsiz kalır.',
                ]),
            ],
        },
        {
            id: 'analysis',
            tab: ['Analysis + Timeline', 'Analiz + Zaman çizelgesi'],
            summary: [
                'Band-pass (phase-true) extraction around 50 Hz and the global deflection over the record.',
                '50 Hz çevresinde bant geçiren (faz-doğru) çıkarım ve kayıt boyunca genel sapma.',
            ],
            points: [
                pt('method', ['Extraction method', 'Çıkarım yöntemi'], [
                    'Band-pass Time (phase-true) keeps real signed motion; frequency and order-tracked modes extract a complex shape at one frequency or order. Playback rate, minimum phase confidence and the amplitude convention (0-peak, RMS or peak-peak) complete the recipe.',
                    'Band-pass Time (phase-true) gerçek işaretli hareketi korur; frekans ve order izlemeli modlar tek frekans veya order’da kompleks şekil çıkarır. Oynatma hızı, asgari faz güveni ve genlik kabulü (0-tepe, RMS veya tepe-tepe) reçeteyi tamamlar.',
                ]),
                pt('band', ['Frequency band', 'Frekans bandı'], [
                    'Centre, bandwidth and filter order of the band-pass. The hint states the minimum selection length the filter needs to settle.',
                    'Bant geçiren filtrenin merkezi, bant genişliği ve derecesi. İpucu, filtrenin oturması için gereken asgari seçim uzunluğunu belirtir.',
                ]),
                pt('display', ['Display', 'Görünüm'], [
                    'Deformation scale, normalisation to geometry size, mesh edges, direction arrows, undeformed body, colormap, ghost opacity and colour range for the 3D view.',
                    '3D görünüm için deformasyon ölçeği, geometri boyutuna normalizasyon, ağ kenarları, yön okları, deforme olmamış gövde, renk haritası, hayalet opaklığı ve renk aralığı.',
                ]),
                pt('reference_state', ['Operating-state reference', 'İşletme durumu referansı'], [
                    'Capture the current result as Reference A, compute another state as B and the Shape Correlation group reports how similar the two shapes are.',
                    'Mevcut sonucu Reference A olarak yakalayın, başka bir durumu B olarak hesaplayın; Shape Correlation grubu iki şeklin ne kadar benzer olduğunu raporlar.',
                ]),
                pt('timeline', ['Global deflection timeline', 'Genel sapma zaman çizelgesi'], [
                    'Overall deflection against source time with the peak marked. The filter edges at both ends show why the selection must be longer than the settling time.',
                    'Kaynak zamanına karşı genel sapma; tepe işaretlidir. İki uçtaki filtre kenarları seçimin neden oturma süresinden uzun olması gerektiğini gösterir.',
                ]),
                pt('summary', ['Results summary', 'Sonuç özeti'], [
                    'Peak response DOF, maximum deflection, dominant frequency, frame count, amplitude definition and phase confidence, with a plain-language note on where the largest motion occurs.',
                    'Tepe cevap DOF’u, en büyük sapma, baskın frekans, kare sayısı, genlik tanımı ve faz güveni; en büyük hareketin nerede olduğuna dair sade bir notla.',
                ]),
            ],
        },
        {
            id: 'magnitude',
            tab: ['Magnitude', 'Genlik'],
            summary: [
                'Deflection magnitude per DOF, normalised to the largest.',
                'En büyüğe normalize edilmiş, DOF başına sapma genliği.',
            ],
            points: [
                pt('magnitude', ['Magnitude per DOF', 'DOF başına genlik'], [
                    'The ends move most (1.0) and the middle least (≈0.45) — the expected 50 Hz pattern for this beam. Read it together with Phase: magnitude alone cannot tell whether two points move together or against each other.',
                    'Uçlar en çok (1,0), orta en az (≈0,45) hareket eder — bu kiriş için beklenen 50 Hz deseni. Fazla birlikte okuyun: genlik tek başına iki noktanın birlikte mi zıt mı hareket ettiğini söyleyemez.',
                ]),
            ],
        },
        {
            id: 'phase',
            tab: ['Phase', 'Faz'],
            summary: [
                'Phase of each DOF relative to the reference DOF.',
                'Her DOF’un referans DOF’a göre fazı.',
            ],
            points: [
                pt('phase', ['Relative phase', 'Göreli faz'], [
                    'The middle DOFs sit at ±180° while the ends stay at 0°: the centre moves opposite to the ends. +180° and −180° are the same physical phase.',
                    'Orta DOF’lar ±180°’de, uçlar 0°’de kalır: merkez uçlara zıt hareket eder. +180° ve −180° aynı fiziksel fazdır.',
                ]),
            ],
        },
        {
            id: 'polar',
            tab: ['Polar', 'Polar'],
            summary: [
                'The complex shape vector of every DOF in the real–imaginary plane.',
                'Her DOF’un kompleks şekil vektörü gerçel–sanal düzlemde.',
            ],
            points: [
                pt('polar', ['Complex shape', 'Kompleks şekil'], [
                    'All points lie on the real axis because the motion is in-phase or anti-phase — a standing, normal-mode-like shape. Points spread around the plane would indicate travelling waves or several modes mixing.',
                    'Hareket aynı veya zıt fazlı olduğundan tüm noktalar gerçel eksende yer alır — duran, normal moda benzer bir şekil. Düzleme yayılmış noktalar yürüyen dalgaya veya birden çok modun karışmasına işaret eder.',
                ]),
            ],
        },
        {
            id: 'markers',
            tab: ['Markers', 'İşaretçiler'],
            summary: [
                'Spectrum markers, extrema and harmonic / sideband families for the Spectrum result.',
                'Spectrum sonucu için spektrum işaretçileri, ekstremumlar ve harmonik / yan bant aileleri.',
            ],
            points: [
                pt('interaction', ['Plot interaction', 'Grafik etkileşimi'], [
                    'Click the Spectrum result to add markers that snap to the nearest frequency bin. The Spectrum tab is filled by the frequency and order extraction modes; band-pass time extraction leaves it empty, as here.',
                    'En yakın frekans kutusuna yakalanan işaretçiler eklemek için Spectrum sonucuna tıklayın. Spectrum sekmesi frekans ve order çıkarım modlarında dolar; burada olduğu gibi bant geçiren zaman çıkarımında boş kalır.',
                ]),
                pt('spectrum_markers', ['Marker, delta, band and extrema', 'İşaretçi, fark, bant ve ekstremum'], [
                    'Typed markers, delta pairs, bands and automatic extrema search within a frequency range.',
                    'Yazılarak eklenen işaretçiler, fark çiftleri, bantlar ve bir frekans aralığında otomatik ekstremum araması.',
                ]),
                pt('harmonics', ['Harmonics and sidebands', 'Harmonikler ve yan bantlar'], [
                    'Draws a harmonic family from the spectrum maximum or a manual fundamental, and sideband families at a chosen spacing.',
                    'Spektrum maksimumundan veya elle girilen temel frekanstan harmonik aile ve seçilen aralıkta yan bant aileleri çizer.',
                ]),
                markersTable,
            ],
        },
    ],
}
