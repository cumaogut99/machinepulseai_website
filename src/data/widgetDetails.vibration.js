// ─────────────────────────────────────────────────────────────────────────────
// Widget deep-dive content — VIBRATION & STRUCTURAL category.
// Same schema as widgetDetails.js (slug + en/tr sections); split into its own
// file for readability, mirroring widgetCatalog.engineering.js. Formulas carry
// a `latex` string (typeset by KaTeX in WidgetDetail.jsx) plus a plain-unicode
// `expr` fallback. Math is language-neutral, so latex/expr are duplicated
// verbatim across en/tr while all prose is translated.
// ─────────────────────────────────────────────────────────────────────────────

const VIBRATION_WIDGET_DETAILS = {
    bearing_fault: {
        slug: 'bearing-gear-fault',
        en: {
            tagline: 'Finds bearing and gear defects hidden in vibration by demodulating the high-frequency resonances the impacts excite.',
            intro:
                'A spall on a bearing race produces a tiny impact every time a rolling element passes over it. Each impact is too short and broadband to show in a raw spectrum, but it rings the structure at high frequency, and that ringing repeats at a rate fixed by the bearing geometry. This widget band-pass filters around the excited resonance (picked automatically with a kurtogram), demodulates the envelope with the Hilbert transform, and reads the defect frequency from the envelope spectrum. For gears it tracks the mesh frequency, its sidebands and cepstrum peaks, plus TSA-based condition indicators.',
            inputs: [
                { name: 'Vibration channel', desc: 'Accelerometer signal from the bearing housing or gearbox casing, sampled fast enough to cover the resonance band (typically ≥ 20 kHz).' },
                { name: 'Shaft speed', desc: 'Tacho channel or a constant RPM value — defect frequencies scale with shaft speed.' },
                { name: 'Bearing / gear geometry', desc: 'Ball count, ball and pitch diameter, contact angle; tooth counts for gears. Sets the theoretical fault frequencies.' },
            ],
            formulas: [
                {
                    title: 'Characteristic bearing fault frequencies',
                    latex: '\\mathrm{BPFO} = \\dfrac{N_b}{2} f_r \\left(1 - \\dfrac{d}{D}\\cos\\phi\\right) \\qquad \\mathrm{BPFI} = \\dfrac{N_b}{2} f_r \\left(1 + \\dfrac{d}{D}\\cos\\phi\\right)',
                    expr: 'BPFO = (N_b/2)·f_r·(1 − (d/D)·cos φ) ;  BPFI = (N_b/2)·f_r·(1 + (d/D)·cos φ)',
                    where: 'N_b = rolling-element count, f_r = shaft frequency, d = ball diameter, D = pitch diameter, φ = contact angle. BSF (ball spin) and FTF (cage) follow from the same geometry. A peak at one of these in the envelope spectrum names the faulty component.',
                },
                {
                    title: 'Envelope via the Hilbert transform',
                    latex: 'e(t) = \\bigl|\\, x(t) + j\\,\\mathcal{H}\\{x(t)\\} \\,\\bigr|',
                    expr: 'e(t) = | x(t) + j·H{x(t)} |',
                    where: 'The analytic signal magnitude of the band-passed vibration x(t) is its envelope. Its spectrum shows the impact repetition rate (the fault frequency) instead of the carrier resonance.',
                },
                {
                    title: 'Spectral kurtosis / kurtogram band selection',
                    latex: '\\mathrm{SK}(f) = \\dfrac{\\left\\langle |X(t,f)|^{4} \\right\\rangle}{\\left\\langle |X(t,f)|^{2} \\right\\rangle^{2}} - 2',
                    expr: 'SK(f) = ⟨|X(t,f)|⁴⟩ / ⟨|X(t,f)|²⟩² − 2',
                    where: 'X(t,f) is a time–frequency decomposition. High spectral kurtosis marks impulsive bands; the kurtogram scans centre-frequency/bandwidth combinations and demodulation runs in the winning band automatically.',
                },
                {
                    title: 'Gear mesh frequency and sidebands',
                    latex: '\\mathrm{GMF} = z \\cdot f_r \\qquad f_{\\mathrm{sb}} = \\mathrm{GMF} \\pm k \\, f_r',
                    expr: 'GMF = z·f_r ;  sidebands at GMF ± k·f_r',
                    where: 'z = tooth count. Growing sideband families around GMF and its harmonics indicate modulation from eccentricity, a cracked tooth or load fluctuation.',
                },
                {
                    title: 'Real cepstrum',
                    latex: 'c(\\tau) = \\mathcal{F}^{-1}\\bigl\\{ \\log |X(f)|^{2} \\bigr\\}',
                    expr: 'c(τ) = IFFT{ log |X(f)|² }',
                    where: 'The cepstrum collapses whole harmonic/sideband families into single peaks at their spacing (quefrency), making shaft-speed modulation easy to spot and to compare between measurements.',
                },
            ],
            steps: [
                { step: 'Compute fault frequencies', detail: 'Bearing geometry and shaft speed give the expected BPFO/BPFI/BSF/FTF and GMF targets.' },
                { step: 'Select the demodulation band', detail: 'The kurtogram finds the frequency band where the impacts are most impulsive.' },
                { step: 'Filter and demodulate', detail: 'Band-pass around the resonance, Hilbert transform, envelope spectrum.' },
                { step: 'Match peaks to components', detail: 'Envelope-spectrum peaks are compared against the theoretical frequencies with a speed tolerance; harmonics and sidebands raise confidence.' },
                { step: 'Score gear condition', detail: 'TSA per shaft, then FM0/FM4/NA4 indicators separate local tooth damage from distributed wear.' },
            ],
            outputs: [
                { name: 'Envelope spectrum', desc: 'With theoretical fault frequencies overlaid and matched peaks labelled.' },
                { name: 'Kurtogram map', desc: 'The impulsiveness landscape and the automatically chosen band.' },
                { name: 'Fault table', desc: 'Per-component (outer race, inner race, ball, cage, gear) detection status and severity.' },
                { name: 'Cepstrum & TSA plots', desc: 'Sideband spacing and per-shaft averaged waveforms with condition indicators.' },
            ],
        },
        tr: {
            tagline: 'Darbelerin uyardığı yüksek frekanslı rezonansları demodüle ederek titreşimde gizlenen rulman ve dişli arızalarını bulur.',
            intro:
                'Rulman bileziğindeki bir oyuk, her yuvarlanma elemanı üzerinden geçtiğinde küçücük bir darbe üretir. Her darbe ham spektrumda görünmeyecek kadar kısa ve geniş bantlıdır; ama yapıyı yüksek frekansta çınlatır ve bu çınlama, rulman geometrisinin belirlediği bir hızda tekrarlar. Bu widget, uyarılan rezonans çevresinde bant geçiren filtre uygular (bandı kurtogram ile otomatik seçer), zarfı Hilbert dönüşümüyle demodüle eder ve arıza frekansını zarf spektrumundan okur. Dişlilerde ise kavrama frekansını, yan bantlarını ve kepstrum tepelerini, ayrıca TSA tabanlı durum göstergelerini izler.',
            inputs: [
                { name: 'Titreşim kanalı', desc: 'Rulman yatağı veya dişli kutusu gövdesinden ivmeölçer sinyali; rezonans bandını kapsayacak hızda örneklenmiş (tipik ≥ 20 kHz).' },
                { name: 'Mil hızı', desc: 'Tako kanalı veya sabit bir devir değeri — arıza frekansları mil hızıyla ölçeklenir.' },
                { name: 'Rulman / dişli geometrisi', desc: 'Bilye sayısı, bilye ve taksimat çapı, temas açısı; dişlilerde diş sayıları. Teorik arıza frekanslarını belirler.' },
            ],
            formulas: [
                {
                    title: 'Karakteristik rulman arıza frekansları',
                    latex: '\\mathrm{BPFO} = \\dfrac{N_b}{2} f_r \\left(1 - \\dfrac{d}{D}\\cos\\phi\\right) \\qquad \\mathrm{BPFI} = \\dfrac{N_b}{2} f_r \\left(1 + \\dfrac{d}{D}\\cos\\phi\\right)',
                    expr: 'BPFO = (N_b/2)·f_r·(1 − (d/D)·cos φ) ;  BPFI = (N_b/2)·f_r·(1 + (d/D)·cos φ)',
                    where: 'N_b = yuvarlanma elemanı sayısı, f_r = mil frekansı, d = bilye çapı, D = taksimat çapı, φ = temas açısı. BSF (bilye dönüşü) ve FTF (kafes) aynı geometriden çıkar. Zarf spektrumunda bunlardan birindeki tepe, arızalı bileşeni adlandırır.',
                },
                {
                    title: 'Hilbert dönüşümü ile zarf',
                    latex: 'e(t) = \\bigl|\\, x(t) + j\\,\\mathcal{H}\\{x(t)\\} \\,\\bigr|',
                    expr: 'e(t) = | x(t) + j·H{x(t)} |',
                    where: 'Bant geçirilmiş titreşim x(t)’nin analitik sinyal genliği zarfıdır. Zarfın spektrumu, taşıyıcı rezonans yerine darbe tekrar hızını (arıza frekansını) gösterir.',
                },
                {
                    title: 'Spektral basıklık / kurtogram bant seçimi',
                    latex: '\\mathrm{SK}(f) = \\dfrac{\\left\\langle |X(t,f)|^{4} \\right\\rangle}{\\left\\langle |X(t,f)|^{2} \\right\\rangle^{2}} - 2',
                    expr: 'SK(f) = ⟨|X(t,f)|⁴⟩ / ⟨|X(t,f)|²⟩² − 2',
                    where: 'X(t,f) bir zaman–frekans ayrışımıdır. Yüksek spektral basıklık darbesel bantları işaretler; kurtogram merkez frekansı/bant genişliği kombinasyonlarını tarar ve demodülasyon kazanan bantta otomatik çalışır.',
                },
                {
                    title: 'Dişli kavrama frekansı ve yan bantlar',
                    latex: '\\mathrm{GMF} = z \\cdot f_r \\qquad f_{\\mathrm{sb}} = \\mathrm{GMF} \\pm k \\, f_r',
                    expr: 'GMF = z·f_r ;  yan bantlar GMF ± k·f_r',
                    where: 'z = diş sayısı. GMF ve harmonikleri çevresinde büyüyen yan bant aileleri; eksantriklik, çatlak diş veya yük dalgalanmasından gelen modülasyona işaret eder.',
                },
                {
                    title: 'Gerçek kepstrum',
                    latex: 'c(\\tau) = \\mathcal{F}^{-1}\\bigl\\{ \\log |X(f)|^{2} \\bigr\\}',
                    expr: 'c(τ) = IFFT{ log |X(f)|² }',
                    where: 'Kepstrum, bütün harmonik/yan bant ailelerini aralıklarına (quefrency) karşılık gelen tek tepelere indirger; mil hızı modülasyonunu görmeyi ve ölçümler arası karşılaştırmayı kolaylaştırır.',
                },
            ],
            steps: [
                { step: 'Arıza frekanslarını hesapla', detail: 'Rulman geometrisi ve mil hızı, beklenen BPFO/BPFI/BSF/FTF ve GMF hedeflerini verir.' },
                { step: 'Demodülasyon bandını seç', detail: 'Kurtogram, darbelerin en belirgin olduğu frekans bandını bulur.' },
                { step: 'Filtrele ve demodüle et', detail: 'Rezonans çevresinde bant geçiren filtre, Hilbert dönüşümü, zarf spektrumu.' },
                { step: 'Tepeleri bileşenlerle eşleştir', detail: 'Zarf spektrumu tepeleri, hız toleransıyla teorik frekanslarla karşılaştırılır; harmonikler ve yan bantlar güveni artırır.' },
                { step: 'Dişli durumunu puanla', detail: 'Mil başına TSA, ardından FM0/FM4/NA4 göstergeleri yerel diş hasarını yaygın aşınmadan ayırır.' },
            ],
            outputs: [
                { name: 'Zarf spektrumu', desc: 'Teorik arıza frekansları bindirilmiş, eşleşen tepeler etiketlenmiş.' },
                { name: 'Kurtogram haritası', desc: 'Darbesellik manzarası ve otomatik seçilen bant.' },
                { name: 'Arıza tablosu', desc: 'Bileşen başına (dış bilezik, iç bilezik, bilye, kafes, dişli) tespit durumu ve şiddeti.' },
                { name: 'Kepstrum & TSA grafikleri', desc: 'Yan bant aralıkları ve durum göstergeleriyle mil başına ortalanmış dalga formları.' },
            ],
        },
    },

    modal_analysis: {
        slug: 'modal-analysis-ema',
        en: {
            tagline: 'Extracts natural frequencies, damping and mode shapes from measured FRFs — the experimental fingerprint of a structure\'s dynamics.',
            intro:
                'Hit a structure with an instrumented hammer (or drive it with a shaker) and measure how it responds: the ratio of response to force across frequency is the Frequency Response Function. Every peak in the FRF is a mode — a natural frequency with its damping ratio and a deformation pattern (mode shape). This widget forms FRFs from force/response pairs, curve-fits them with a stabilization diagram to separate physical modes from numerical artefacts, and validates the extracted shapes with the MAC matrix.',
            inputs: [
                { name: 'Force channel(s)', desc: 'Impact hammer or shaker load cell — the measured excitation input.' },
                { name: 'Response channels', desc: 'Accelerometers at the measurement grid points (roving hammer or roving response).' },
                { name: 'Geometry (optional)', desc: 'Point coordinates for animating the identified mode shapes on a wireframe.' },
            ],
            formulas: [
                {
                    title: 'FRF as a modal sum',
                    latex: 'H_{ij}(\\omega) = \\sum_{r=1}^{N} \\dfrac{\\varphi_{ir}\\,\\varphi_{jr}}{\\omega_r^{2} - \\omega^{2} + j\\,2\\zeta_r \\omega_r \\omega}',
                    expr: 'H_ij(ω) = Σ_r  φ_ir·φ_jr / (ω_r² − ω² + j·2ζ_r·ω_r·ω)',
                    where: 'H_ij = response at point i per unit force at point j; ω_r, ζ_r, φ_r are natural frequency, damping ratio and mode shape of mode r. Curve-fitting the measured FRFs to this model is what "extracting modal parameters" means.',
                },
                {
                    title: 'Half-power damping estimate',
                    latex: '\\zeta = \\dfrac{f_2 - f_1}{2 f_n}',
                    expr: 'ζ = (f₂ − f₁) / (2·f_n)',
                    where: 'f₁, f₂ are the −3 dB points either side of the resonance peak at f_n. A quick single-mode damping estimate used to sanity-check the curve-fit values.',
                },
                {
                    title: 'Modal Assurance Criterion (MAC)',
                    latex: '\\mathrm{MAC}(\\varphi_A, \\varphi_B) = \\dfrac{\\left| \\varphi_A^{\\mathsf{T}} \\varphi_B \\right|^{2}}{\\left(\\varphi_A^{\\mathsf{T}} \\varphi_A\\right)\\left(\\varphi_B^{\\mathsf{T}} \\varphi_B\\right)}',
                    expr: 'MAC(φ_A, φ_B) = |φ_Aᵀ·φ_B|² / [(φ_Aᵀ·φ_A)·(φ_Bᵀ·φ_B)]',
                    where: 'Compares two mode-shape vectors: 1 = same shape, 0 = independent. Used to check test repeatability, detect duplicated poles and correlate test modes against a finite-element model.',
                },
            ],
            steps: [
                { step: 'Measure FRFs', detail: 'Force and response spectra are averaged into H1-estimated FRFs with coherence per point.' },
                { step: 'Build the stabilization diagram', detail: 'The fit is repeated at increasing model order; poles that stay stable in frequency and damping are physical modes.' },
                { step: 'Fit modal parameters', detail: 'Stable poles give ω_r and ζ_r; residues give the mode-shape coefficients at every point.' },
                { step: 'Validate and animate', detail: 'AutoMAC checks shape independence; shapes are animated on the geometry for inspection.' },
            ],
            outputs: [
                { name: 'Modal parameter table', desc: 'Natural frequency, damping ratio and modal participation per identified mode.' },
                { name: 'Stabilization diagram', desc: 'Pole stability across model order, overlaid on a mode-indicator function.' },
                { name: 'Mode-shape animations', desc: 'Deformation patterns on the measurement geometry.' },
                { name: 'MAC matrix', desc: 'Shape correlation between modes, tests or against FE predictions.' },
            ],
        },
        tr: {
            tagline: 'Ölçülen FRF\'lerden doğal frekansları, sönümü ve mod şekillerini çıkarır — yapının dinamiğinin deneysel parmak izi.',
            intro:
                'Bir yapıya enstrümanlı çekiçle vurun (veya sarsıcıyla sürün) ve nasıl tepki verdiğini ölçün: tepkinin kuvvete oranının frekans boyunca değişimi Frekans Tepki Fonksiyonudur. FRF\'teki her tepe bir moddur — sönüm oranı ve deformasyon deseniyle (mod şekli) birlikte bir doğal frekans. Bu widget, kuvvet/tepki çiftlerinden FRF\'leri oluşturur, gerçek modları sayısal yapaylıklardan ayırmak için kararlılık diyagramıyla eğri uydurur ve çıkan şekilleri MAC matrisiyle doğrular.',
            inputs: [
                { name: 'Kuvvet kanal(lar)ı', desc: 'Darbe çekici veya sarsıcı yük hücresi — ölçülen uyarma girişi.' },
                { name: 'Tepki kanalları', desc: 'Ölçüm ağı noktalarındaki ivmeölçerler (gezen çekiç veya gezen tepki).' },
                { name: 'Geometri (opsiyonel)', desc: 'Belirlenen mod şekillerini tel kafes üzerinde canlandırmak için nokta koordinatları.' },
            ],
            formulas: [
                {
                    title: 'Modal toplam olarak FRF',
                    latex: 'H_{ij}(\\omega) = \\sum_{r=1}^{N} \\dfrac{\\varphi_{ir}\\,\\varphi_{jr}}{\\omega_r^{2} - \\omega^{2} + j\\,2\\zeta_r \\omega_r \\omega}',
                    expr: 'H_ij(ω) = Σ_r  φ_ir·φ_jr / (ω_r² − ω² + j·2ζ_r·ω_r·ω)',
                    where: 'H_ij = j noktasındaki birim kuvvet başına i noktasındaki tepki; ω_r, ζ_r, φ_r sırasıyla r modunun doğal frekansı, sönüm oranı ve mod şeklidir. "Modal parametre çıkarma", ölçülen FRF\'leri bu modele uydurmak demektir.',
                },
                {
                    title: 'Yarı-güç sönüm kestirimi',
                    latex: '\\zeta = \\dfrac{f_2 - f_1}{2 f_n}',
                    expr: 'ζ = (f₂ − f₁) / (2·f_n)',
                    where: 'f₁, f₂; f_n\'deki rezonans tepesinin iki yanındaki −3 dB noktalarıdır. Eğri uydurma değerlerini sağlamak için kullanılan hızlı, tek-modlu sönüm kestirimi.',
                },
                {
                    title: 'Modal Güvence Kriteri (MAC)',
                    latex: '\\mathrm{MAC}(\\varphi_A, \\varphi_B) = \\dfrac{\\left| \\varphi_A^{\\mathsf{T}} \\varphi_B \\right|^{2}}{\\left(\\varphi_A^{\\mathsf{T}} \\varphi_A\\right)\\left(\\varphi_B^{\\mathsf{T}} \\varphi_B\\right)}',
                    expr: 'MAC(φ_A, φ_B) = |φ_Aᵀ·φ_B|² / [(φ_Aᵀ·φ_A)·(φ_Bᵀ·φ_B)]',
                    where: 'İki mod şekli vektörünü karşılaştırır: 1 = aynı şekil, 0 = bağımsız. Test tekrarlanabilirliğini denetlemek, tekrarlanan kutupları yakalamak ve test modlarını sonlu eleman modeliyle ilişkilendirmek için kullanılır.',
                },
            ],
            steps: [
                { step: 'FRF\'leri ölç', detail: 'Kuvvet ve tepki spektrumları, nokta başına koheransla birlikte H1 kestirimli FRF\'lere ortalanır.' },
                { step: 'Kararlılık diyagramını kur', detail: 'Uydurma artan model derecesinde tekrarlanır; frekans ve sönümde kararlı kalan kutuplar gerçek modlardır.' },
                { step: 'Modal parametreleri uydur', detail: 'Kararlı kutuplar ω_r ve ζ_r\'yi, kalıntılar her noktadaki mod şekli katsayılarını verir.' },
                { step: 'Doğrula ve canlandır', detail: 'AutoMAC şekil bağımsızlığını denetler; şekiller inceleme için geometri üzerinde canlandırılır.' },
            ],
            outputs: [
                { name: 'Modal parametre tablosu', desc: 'Belirlenen her mod için doğal frekans, sönüm oranı ve modal katılım.' },
                { name: 'Kararlılık diyagramı', desc: 'Mod gösterge fonksiyonu üzerine bindirilmiş, model derecesine göre kutup kararlılığı.' },
                { name: 'Mod şekli animasyonları', desc: 'Ölçüm geometrisi üzerinde deformasyon desenleri.' },
                { name: 'MAC matrisi', desc: 'Modlar, testler arası veya SE öngörülerine karşı şekil korelasyonu.' },
            ],
        },
    },
    operational_modal_analysis: {
        slug: 'operational-modal-analysis',
        en: {
            tagline: 'Modal parameters from response measurements alone — no hammer, no shaker, the structure is tested by its own operating loads.',
            intro:
                'Bridges, towers, wind turbines and running machinery cannot be conveniently excited with a measured force. Operational Modal Analysis assumes the ambient excitation (wind, traffic, turbulence) is broadband and roughly random, and identifies natural frequencies, damping and mode shapes purely from the measured responses. The widget implements Frequency Domain Decomposition — a singular value decomposition of the response spectral-density matrix that isolates one mode per singular-value peak — and time-domain Stochastic Subspace Identification for damping-accurate estimates.',
            inputs: [
                { name: 'Response channels', desc: 'Simultaneous accelerometer measurements at the monitoring grid — no force input is needed.' },
                { name: 'Recording length', desc: 'Long ambient records (minutes, not seconds) so the random-excitation assumption averages out.' },
            ],
            formulas: [
                {
                    title: 'Frequency Domain Decomposition (FDD)',
                    latex: 'G_{yy}(j\\omega) = U(j\\omega)\\, S(j\\omega)\\, U^{\\mathsf{H}}(j\\omega)',
                    expr: 'G_yy(jω) = U·S·Uᴴ   (SVD of the response PSD matrix)',
                    where: 'G_yy = spectral-density matrix of all responses. Near a resonance the first singular value peaks and its singular vector is the (unscaled) mode shape — the SVD separates modes that overlap in a single-channel spectrum.',
                },
                {
                    title: 'Stochastic state-space model (SSI)',
                    latex: 'x_{k+1} = A\\,x_k + w_k \\qquad y_k = C\\,x_k + v_k',
                    expr: 'x_(k+1) = A·x_k + w_k ;  y_k = C·x_k + v_k',
                    where: 'SSI fits this model directly to the time data; the eigenvalues of A are the system poles, and C maps them to mode shapes. More robust damping estimates than frequency-domain peak methods.',
                },
                {
                    title: 'Poles → frequency and damping',
                    latex: '\\lambda = \\dfrac{\\ln \\mu}{\\Delta t} \\qquad f_n = \\dfrac{|\\lambda|}{2\\pi} \\qquad \\zeta = -\\dfrac{\\operatorname{Re}\\lambda}{|\\lambda|}',
                    expr: 'λ = ln(μ)/Δt ;  f_n = |λ|/2π ;  ζ = −Re(λ)/|λ|',
                    where: 'μ = discrete-time eigenvalue of A, Δt = sample interval. Converts identified poles into the physical natural frequency and damping ratio reported for each mode.',
                },
            ],
            steps: [
                { step: 'Estimate the PSD matrix', detail: 'Welch-averaged auto- and cross-spectra between every response pair.' },
                { step: 'Decompose (FDD)', detail: 'SVD at every frequency line; singular-value peaks locate the modes, singular vectors give the shapes.' },
                { step: 'Identify in time (SSI)', detail: 'Subspace identification at increasing model order builds a stabilization diagram; stable poles are kept.' },
                { step: 'Validate', detail: 'AutoMAC confirms the identified shapes are distinct, not numerical duplicates; FDD and SSI results are cross-checked.' },
            ],
            outputs: [
                { name: 'Modal parameters', desc: 'Natural frequencies and damping ratios under true operating conditions.' },
                { name: 'Unscaled mode shapes', desc: 'Deformation patterns (no force reference, so amplitude is relative).' },
                { name: 'Singular-value plot', desc: 'The FDD landscape with identified peaks marked.' },
                { name: 'Stabilization diagram', desc: 'SSI pole stability versus model order.' },
            ],
        },
        tr: {
            tagline: 'Yalnızca tepki ölçümlerinden modal parametreler — çekiç yok, sarsıcı yok; yapıyı kendi işletme yükleri test eder.',
            intro:
                'Köprüler, kuleler, rüzgar türbinleri ve çalışan makineler ölçülen bir kuvvetle kolayca uyarılamaz. Operasyonel Modal Analiz, ortam uyarmasının (rüzgar, trafik, türbülans) geniş bantlı ve kabaca rastgele olduğunu varsayar; doğal frekansları, sönümü ve mod şekillerini yalnızca ölçülen tepkilerden belirler. Widget, tekil değer tepesi başına bir modu yalıtan, tepki spektral yoğunluk matrisinin tekil değer ayrışımı olan Frekans Bölgesi Ayrışımını (FDD) ve sönümde daha isabetli kestirim için zaman bölgesinde Stokastik Altuzay Tanımlamayı (SSI) uygular.',
            inputs: [
                { name: 'Tepki kanalları', desc: 'İzleme ağında eşzamanlı ivmeölçer ölçümleri — kuvvet girişi gerekmez.' },
                { name: 'Kayıt uzunluğu', desc: 'Rastgele-uyarma varsayımının ortalamayla oturması için uzun ortam kayıtları (saniyeler değil, dakikalar).' },
            ],
            formulas: [
                {
                    title: 'Frekans Bölgesi Ayrışımı (FDD)',
                    latex: 'G_{yy}(j\\omega) = U(j\\omega)\\, S(j\\omega)\\, U^{\\mathsf{H}}(j\\omega)',
                    expr: 'G_yy(jω) = U·S·Uᴴ   (tepki PSD matrisinin SVD\'si)',
                    where: 'G_yy = tüm tepkilerin spektral yoğunluk matrisi. Rezonans yakınında ilk tekil değer tepe yapar ve tekil vektörü (ölçeksiz) mod şeklidir — SVD, tek kanallı spektrumda üst üste binen modları ayırır.',
                },
                {
                    title: 'Stokastik durum-uzayı modeli (SSI)',
                    latex: 'x_{k+1} = A\\,x_k + w_k \\qquad y_k = C\\,x_k + v_k',
                    expr: 'x_(k+1) = A·x_k + w_k ;  y_k = C·x_k + v_k',
                    where: 'SSI bu modeli doğrudan zaman verisine uydurur; A\'nın özdeğerleri sistem kutupları, C ise bunları mod şekillerine eşler. Frekans bölgesi tepe yöntemlerinden daha gürbüz sönüm kestirimi sağlar.',
                },
                {
                    title: 'Kutuplar → frekans ve sönüm',
                    latex: '\\lambda = \\dfrac{\\ln \\mu}{\\Delta t} \\qquad f_n = \\dfrac{|\\lambda|}{2\\pi} \\qquad \\zeta = -\\dfrac{\\operatorname{Re}\\lambda}{|\\lambda|}',
                    expr: 'λ = ln(μ)/Δt ;  f_n = |λ|/2π ;  ζ = −Re(λ)/|λ|',
                    where: 'μ = A\'nın ayrık-zaman özdeğeri, Δt = örnekleme aralığı. Belirlenen kutupları her mod için raporlanan fiziksel doğal frekansa ve sönüm oranına çevirir.',
                },
            ],
            steps: [
                { step: 'PSD matrisini kestir', detail: 'Her tepki çifti arasında Welch-ortalamalı öz ve çapraz spektrumlar.' },
                { step: 'Ayrıştır (FDD)', detail: 'Her frekans çizgisinde SVD; tekil değer tepeleri modları konumlar, tekil vektörler şekilleri verir.' },
                { step: 'Zamanda tanımla (SSI)', detail: 'Artan model derecesinde altuzay tanımlama bir kararlılık diyagramı kurar; kararlı kutuplar tutulur.' },
                { step: 'Doğrula', detail: 'AutoMAC, belirlenen şekillerin ayrık olduğunu (sayısal kopya olmadığını) doğrular; FDD ve SSI sonuçları çapraz denetlenir.' },
            ],
            outputs: [
                { name: 'Modal parametreler', desc: 'Gerçek işletme koşullarında doğal frekanslar ve sönüm oranları.' },
                { name: 'Ölçeksiz mod şekilleri', desc: 'Deformasyon desenleri (kuvvet referansı olmadığından genlik görelidir).' },
                { name: 'Tekil değer grafiği', desc: 'Belirlenen tepeler işaretlenmiş FDD manzarası.' },
                { name: 'Kararlılık diyagramı', desc: 'Model derecesine göre SSI kutup kararlılığı.' },
            ],
        },
    },

    order_tracking: {
        slug: 'order-tracking',
        en: {
            tagline: 'Re-references vibration analysis from fixed frequency to shaft revolutions, so speed-dependent components stop smearing during run-ups.',
            intro:
                'In rotating machinery most vibration is tied to shaft speed: imbalance at 1×, misalignment near 2×, blade and gear effects at higher multiples. When speed changes, these components sweep across a fixed-frequency spectrum and blur. Order tracking uses a tacho signal to resample the vibration at constant angle increments instead of constant time increments, so "orders" (multiples of shaft speed) stay at fixed positions regardless of RPM. Results are mapped as Campbell diagrams and waterfalls, and single orders can be extracted as clean waveforms with the Vold-Kalman filter.',
            inputs: [
                { name: 'Vibration channel(s)', desc: 'Accelerometer or proximity signals from the machine under speed variation.' },
                { name: 'Tacho / keyphasor', desc: 'Once-per-rev (or N-per-rev) pulse train providing the instantaneous shaft angle.' },
            ],
            formulas: [
                {
                    title: 'Order definition',
                    latex: 'O = \\dfrac{f}{N/60}',
                    expr: 'O = f / (N/60)',
                    where: 'f = frequency in Hz, N = shaft speed in rpm. Order 1 is once per revolution (imbalance), order 2 twice per revolution, and so on — the natural axis for rotating machinery.',
                },
                {
                    title: 'Angular resampling',
                    latex: 'x(t) \\;\\xrightarrow{\\;\\theta(t)\\;}\\; x(\\theta), \\qquad \\Delta\\theta = \\text{const}',
                    expr: 'x(t) → x(θ)  with Δθ = constant  (θ from the tacho)',
                    where: 'The tacho pulses give shaft angle versus time; interpolating the vibration onto uniform angle steps makes an FFT of x(θ) yield an order spectrum directly, immune to speed change (leakage-free order lines).',
                },
                {
                    title: 'Campbell diagram lines',
                    latex: 'f_{O}(N) = O \\cdot \\dfrac{N}{60}',
                    expr: 'f_O(N) = O · N/60',
                    where: 'Each order is a straight line through the origin in the frequency-versus-speed plane. Where an order line crosses a (horizontal) natural-frequency line is a critical speed — the crossing points the analysis highlights.',
                },
                {
                    title: 'Vold-Kalman order extraction',
                    latex: 'x(t) \\approx a(t)\\, e^{\\,j \\int \\omega_O(t)\\, \\mathrm{d}t}',
                    expr: 'x(t) ≈ a(t) · exp( j·∫ω_O(t) dt )',
                    where: 'The filter tracks a single order as a slowly varying complex envelope a(t) locked to the tacho-derived instantaneous frequency ω_O(t), extracting it cleanly even when orders are close or crossing.',
                },
            ],
            steps: [
                { step: 'Decode the tacho', detail: 'Pulse edges give the instantaneous speed and shaft angle profile over the whole recording.' },
                { step: 'Resample by angle', detail: 'Vibration is interpolated to uniform angle increments per revolution.' },
                { step: 'Compute order spectra', detail: 'FFTs per revolution block build the order spectrum and the order-vs-speed waterfall.' },
                { step: 'Extract and map', detail: 'Selected orders are trended against RPM (Bode/polar) or extracted as waveforms via Vold-Kalman.' },
            ],
            outputs: [
                { name: 'Order spectrum & waterfall', desc: 'Amplitude versus order and speed for run-up/coast-down tests.' },
                { name: 'Campbell diagram', desc: 'Order lines against structural resonances, with critical speeds marked.' },
                { name: 'Order slices', desc: 'Amplitude and phase of chosen orders versus RPM (Bode and polar plots).' },
                { name: 'Extracted order waveforms', desc: 'Clean single-order time histories from the Vold-Kalman filter.' },
            ],
        },
        tr: {
            tagline: 'Titreşim analizini sabit frekanstan mil devrine yeniden referanslar; hıza bağlı bileşenler kalkışlarda artık yayılıp bulanıklaşmaz.',
            intro:
                'Döner makinelerde titreşimin çoğu mil hızına bağlıdır: balanssızlık 1×\'te, eksen kaçıklığı 2× civarında, kanat ve dişli etkileri daha yüksek katlarda. Hız değişince bu bileşenler sabit frekanslı spektrumda süpürülür ve bulanır. Order takibi, tako sinyalini kullanarak titreşimi sabit zaman adımları yerine sabit açı adımlarında yeniden örnekler; böylece "order"lar (mil hızının katları) devirden bağımsız sabit konumlarda kalır. Sonuçlar Campbell diyagramları ve şelale grafikleriyle haritalanır; tek order\'lar Vold-Kalman filtresiyle temiz dalga formları olarak çıkarılabilir.',
            inputs: [
                { name: 'Titreşim kanal(lar)ı', desc: 'Hız değişimi altındaki makineden ivmeölçer veya mesafe probu sinyalleri.' },
                { name: 'Tako / keyphasor', desc: 'Anlık mil açısını sağlayan devir başına bir (veya N) darbelik dizi.' },
            ],
            formulas: [
                {
                    title: 'Order tanımı',
                    latex: 'O = \\dfrac{f}{N/60}',
                    expr: 'O = f / (N/60)',
                    where: 'f = Hz cinsinden frekans, N = dev/dk cinsinden mil hızı. Order 1 devir başına bir (balanssızlık), order 2 devir başına iki vb. — döner makineler için doğal eksen.',
                },
                {
                    title: 'Açısal yeniden örnekleme',
                    latex: 'x(t) \\;\\xrightarrow{\\;\\theta(t)\\;}\\; x(\\theta), \\qquad \\Delta\\theta = \\text{sabit}',
                    expr: 'x(t) → x(θ)  Δθ = sabit  (θ takodan)',
                    where: 'Tako darbeleri zamana karşı mil açısını verir; titreşimin düzgün açı adımlarına aradeğerlenmesi, x(θ)\'nın FFT\'sinin doğrudan order spektrumu vermesini sağlar — hız değişiminden etkilenmez (sızıntısız order çizgileri).',
                },
                {
                    title: 'Campbell diyagramı çizgileri',
                    latex: 'f_{O}(N) = O \\cdot \\dfrac{N}{60}',
                    expr: 'f_O(N) = O · N/60',
                    where: 'Her order, frekans-hız düzleminde orijinden geçen bir doğrudur. Bir order doğrusunun (yatay) doğal frekans çizgisini kestiği yer kritik hızdır — analizin vurguladığı kesişim noktaları.',
                },
                {
                    title: 'Vold-Kalman order çıkarımı',
                    latex: 'x(t) \\approx a(t)\\, e^{\\,j \\int \\omega_O(t)\\, \\mathrm{d}t}',
                    expr: 'x(t) ≈ a(t) · exp( j·∫ω_O(t) dt )',
                    where: 'Filtre, tek bir order\'ı takodan türetilen anlık frekans ω_O(t)\'ye kilitli, yavaş değişen karmaşık zarf a(t) olarak izler; orderlar yakın veya kesişiyor olsa bile temiz çıkarır.',
                },
            ],
            steps: [
                { step: 'Takoyu çöz', detail: 'Darbe kenarları tüm kayıt boyunca anlık hızı ve mil açısı profilini verir.' },
                { step: 'Açıya göre yeniden örnekle', detail: 'Titreşim, devir başına düzgün açı adımlarına aradeğerlenir.' },
                { step: 'Order spektrumlarını hesapla', detail: 'Devir blokları başına FFT\'ler, order spektrumunu ve order-hız şelalesini kurar.' },
                { step: 'Çıkar ve haritala', detail: 'Seçilen orderlar devre karşı izlenir (Bode/polar) veya Vold-Kalman ile dalga formu olarak çıkarılır.' },
            ],
            outputs: [
                { name: 'Order spektrumu & şelale', desc: 'Kalkış/duruş testleri için order\'a ve hıza karşı genlik.' },
                { name: 'Campbell diyagramı', desc: 'Kritik hızlar işaretlenmiş, yapısal rezonanslara karşı order çizgileri.' },
                { name: 'Order kesitleri', desc: 'Seçilen orderların devre karşı genlik ve fazı (Bode ve polar grafikler).' },
                { name: 'Çıkarılmış order dalga formları', desc: 'Vold-Kalman filtresinden temiz tek-order zaman geçmişleri.' },
            ],
        },
    },

    rotor_balancing: {
        slug: 'rotor-balancing',
        en: {
            tagline: 'Turns measured 1× vibration vectors and a trial weight into the exact correction mass and angle that cancel rotor imbalance.',
            intro:
                'Imbalance — the rotor\'s mass centre not sitting on its rotation axis — is the most common cause of machinery vibration. It shows as a strong once-per-revolution (1×) component whose phase points at the heavy spot. Field balancing is a controlled experiment: measure the original 1× vector, bolt on a known trial weight, measure again, and the change reveals the machine\'s influence coefficient — how much vibration each gram produces and at what phase lag. From that, the correction weight follows directly. The widget solves single- and two-plane cases and checks the result against ISO 21940 balance-quality grades.',
            inputs: [
                { name: 'Vibration channel(s)', desc: 'One sensor per balancing plane, bearing-mounted.' },
                { name: 'Keyphasor / tacho', desc: 'Phase reference — without it the heavy-spot direction is unknown.' },
                { name: 'Trial weight & radius', desc: 'The known mass, its angular position and mounting radius for each trial run.' },
            ],
            formulas: [
                {
                    title: 'Influence coefficient',
                    latex: '\\alpha = \\dfrac{\\vec{A}_1 - \\vec{A}_0}{\\vec{W}_t}',
                    expr: 'α = (A₁ − A₀) / W_t',
                    where: 'A₀, A₁ = complex 1× vibration vectors (amplitude ∠ phase) before and after the trial weight W_t (mass ∠ angle). α is the machine\'s response per unit weight — its balancing "sensitivity".',
                },
                {
                    title: 'Correction weight',
                    latex: '\\vec{W}_c = -\\,\\dfrac{\\vec{A}_0}{\\alpha}',
                    expr: 'W_c = − A₀ / α',
                    where: 'The weight (mass and angle) that produces vibration equal and opposite to the original imbalance. Two-plane balancing solves the 2×2 complex system with cross-coupling coefficients α_ij.',
                },
                {
                    title: 'ISO 21940 permissible residual unbalance',
                    latex: 'U_{\\mathrm{per}} = 9549 \\cdot \\dfrac{G \\cdot m}{N}',
                    expr: 'U_per = 9549 · G·m / N   [g·mm]',
                    where: 'G = balance quality grade (mm/s, e.g. G 2.5), m = rotor mass in kg, N = service speed in rpm. The acceptance target: after correction the residual unbalance must sit below U_per for the machine class.',
                },
            ],
            steps: [
                { step: 'Reference run', detail: 'Measure the original 1× amplitude and phase at running speed.' },
                { step: 'Trial run(s)', detail: 'Add a known trial weight per plane and re-measure; the vector change gives the influence coefficients.' },
                { step: 'Solve the correction', detail: 'The complex equations yield correction mass and angle per plane; the weight is split across available holes if needed.' },
                { step: 'Verify against ISO 21940', detail: 'A final run confirms the residual unbalance meets the target quality grade.' },
            ],
            outputs: [
                { name: 'Correction weights', desc: 'Mass and angular position per balancing plane (with hole-splitting).' },
                { name: 'Polar progress plot', desc: 'The 1× vector shrinking toward the origin run by run.' },
                { name: 'Influence coefficients', desc: 'Stored machine sensitivity, reusable for one-shot trim balancing later.' },
                { name: 'ISO 21940 report', desc: 'Residual unbalance versus the permissible value for the chosen grade.' },
            ],
        },
        tr: {
            tagline: 'Ölçülen 1× titreşim vektörlerini ve bir deneme ağırlığını, rotor balanssızlığını yok eden tam düzeltme kütlesine ve açısına dönüştürür.',
            intro:
                'Balanssızlık — rotorun kütle merkezinin dönme ekseni üzerinde olmaması — makine titreşiminin en yaygın nedenidir. Fazı ağır noktayı gösteren güçlü bir devir-başına-bir (1×) bileşen olarak görünür. Saha balanslaması kontrollü bir deneydir: özgün 1× vektörünü ölçün, bilinen bir deneme ağırlığı takın, yeniden ölçün; değişim makinenin etki katsayısını — her gramın ne kadar ve hangi faz gecikmesiyle titreşim ürettiğini — ortaya çıkarır. Düzeltme ağırlığı buradan doğrudan çıkar. Widget tek ve çift düzlemli durumları çözer ve sonucu ISO 21940 balans kalite derecelerine göre denetler.',
            inputs: [
                { name: 'Titreşim kanal(lar)ı', desc: 'Balans düzlemi başına bir sensör, yatağa monte.' },
                { name: 'Keyphasor / tako', desc: 'Faz referansı — onsuz ağır noktanın yönü bilinemez.' },
                { name: 'Deneme ağırlığı & yarıçap', desc: 'Her deneme koşusu için bilinen kütle, açısal konumu ve montaj yarıçapı.' },
            ],
            formulas: [
                {
                    title: 'Etki katsayısı',
                    latex: '\\alpha = \\dfrac{\\vec{A}_1 - \\vec{A}_0}{\\vec{W}_t}',
                    expr: 'α = (A₁ − A₀) / W_t',
                    where: 'A₀, A₁ = deneme ağırlığı W_t\'den (kütle ∠ açı) önceki ve sonraki karmaşık 1× titreşim vektörleri (genlik ∠ faz). α, makinenin birim ağırlık başına tepkisi — balans "duyarlılığı"dır.',
                },
                {
                    title: 'Düzeltme ağırlığı',
                    latex: '\\vec{W}_c = -\\,\\dfrac{\\vec{A}_0}{\\alpha}',
                    expr: 'W_c = − A₀ / α',
                    where: 'Özgün balanssızlığa eşit ve zıt titreşim üreten ağırlık (kütle ve açı). Çift düzlemli balanslama, çapraz etkileşim katsayıları α_ij ile 2×2 karmaşık sistemi çözer.',
                },
                {
                    title: 'ISO 21940 izin verilen artık balanssızlık',
                    latex: 'U_{\\mathrm{per}} = 9549 \\cdot \\dfrac{G \\cdot m}{N}',
                    expr: 'U_per = 9549 · G·m / N   [g·mm]',
                    where: 'G = balans kalite derecesi (mm/s, örn. G 2.5), m = kg cinsinden rotor kütlesi, N = dev/dk cinsinden servis hızı. Kabul hedefi: düzeltmeden sonra artık balanssızlık, makine sınıfı için U_per\'in altında kalmalıdır.',
                },
            ],
            steps: [
                { step: 'Referans koşusu', detail: 'Çalışma hızında özgün 1× genlik ve fazı ölçün.' },
                { step: 'Deneme koşu(lar)ı', detail: 'Düzlem başına bilinen deneme ağırlığı ekleyip yeniden ölçün; vektör değişimi etki katsayılarını verir.' },
                { step: 'Düzeltmeyi çöz', detail: 'Karmaşık denklemler düzlem başına düzeltme kütlesi ve açısını verir; gerekirse ağırlık mevcut deliklere bölüştürülür.' },
                { step: 'ISO 21940 ile doğrula', detail: 'Son bir koşu, artık balanssızlığın hedef kalite derecesini karşıladığını teyit eder.' },
            ],
            outputs: [
                { name: 'Düzeltme ağırlıkları', desc: 'Balans düzlemi başına kütle ve açısal konum (delik bölüştürmeli).' },
                { name: 'Polar ilerleme grafiği', desc: 'Koşudan koşuya orijine doğru küçülen 1× vektörü.' },
                { name: 'Etki katsayıları', desc: 'Saklanan makine duyarlılığı — sonraki tek-atış ince balans için yeniden kullanılabilir.' },
                { name: 'ISO 21940 raporu', desc: 'Seçilen derece için izin verilen değere karşı artık balanssızlık.' },
            ],
        },
    },
    rotor_dynamics: {
        slug: 'rotor-dynamics',
        en: {
            tagline: 'Reads true shaft motion from XY proximity probes: orbits, full spectrum, whirl direction and critical speeds per ISO 7919/20816.',
            intro:
                'On fluid-film bearing machines the shaft floats in an oil clearance, so casing accelerometers miss the story — the shaft\'s own motion must be measured with a pair of proximity probes mounted 90° apart. Plotting one probe against the other over a revolution draws the orbit, whose shape and precession direction distinguish imbalance, misalignment, rubs and oil instabilities. A once-per-turn keyphasor fixes phase and lets slow-roll runout be subtracted, and the full spectrum splits vibration into forward and backward whirl — the key discriminator for oil whirl and whip.',
            inputs: [
                { name: 'XY proximity probes', desc: 'Shaft-relative displacement pair, 90° apart, per bearing.' },
                { name: 'Keyphasor', desc: 'Once-per-revolution reference for phase and slow-roll compensation.' },
                { name: 'Slow-roll record', desc: 'A low-speed run capturing mechanical/electrical runout to subtract.' },
            ],
            formulas: [
                {
                    title: 'Shaft orbit',
                    latex: '\\vec{r}(t) = \\bigl( x(t),\\; y(t) \\bigr)',
                    expr: 'orbit: plot x(t) vs y(t) over one revolution',
                    where: 'The parametric XY path of the shaft centreline. A near-circular 1× orbit suggests imbalance; a figure-eight or flattened ellipse points to misalignment or preload; inner loops indicate rubs.',
                },
                {
                    title: 'Slow-roll compensation',
                    latex: '\\vec{r}_{\\mathrm{dyn}}(\\theta) = \\vec{r}_{\\mathrm{meas}}(\\theta) - \\vec{r}_{\\mathrm{slow}}(\\theta)',
                    expr: 'r_dyn(θ) = r_meas(θ) − r_slow(θ)',
                    where: 'The keyphasor-locked runout vector measured at very low speed (bows, scratches, electrical glitch) is subtracted sample-by-sample in angle, leaving only genuine dynamic motion.',
                },
                {
                    title: 'Full spectrum (forward/backward whirl)',
                    latex: 'z(t) = x(t) + j\\,y(t) \\;\\;\\Rightarrow\\;\\; Z(f),\\; f \\in (-\\infty, \\infty)',
                    expr: 'z(t) = x(t) + j·y(t)  →  FFT gives ±f components',
                    where: 'The complex combination of the probe pair yields a two-sided spectrum: positive frequencies are forward precession (with rotation), negative are backward. Sub-synchronous forward whirl near 0.43–0.48× is the signature of oil whirl; locking to a resonance is oil whip.',
                },
            ],
            steps: [
                { step: 'Condition the probes', detail: 'Gap voltages checked, runout captured at slow roll and stored per angle.' },
                { step: 'Compensate & draw orbits', detail: 'Slow-roll subtraction, then filtered (1×, 2×, unfiltered) orbits per bearing.' },
                { step: 'Full-spectrum analysis', detail: 'Forward/backward decomposition versus speed, watching sub-synchronous content.' },
                { step: 'Evaluate against standards', detail: 'Shaft-relative displacement compared with ISO 7919 / ISO 20816 zone limits across the speed range.' },
            ],
            outputs: [
                { name: 'Orbit plots', desc: 'Compensated, filtered orbits with keyphasor dot per bearing.' },
                { name: 'Full-spectrum cascade', desc: 'Forward/backward whirl content versus speed.' },
                { name: 'Bode & polar plots', desc: '1× amplitude and phase through critical speeds.' },
                { name: 'Shaft centreline & zone status', desc: 'Average position in the clearance and ISO evaluation zones.' },
            ],
        },
        tr: {
            tagline: 'XY mesafe problarından gerçek mil hareketini okur: yörüngeler, tam spektrum, fırlama yönü ve ISO 7919/20816\'ya göre kritik hızlar.',
            intro:
                'Sıvı film yataklı makinelerde mil bir yağ boşluğunda yüzer; bu yüzden gövde ivmeölçerleri hikayeyi kaçırır — milin kendi hareketi, 90° arayla monte edilmiş bir çift mesafe probuyla ölçülmelidir. Bir devir boyunca bir probun diğerine karşı çizilmesi yörüngeyi (orbit) çizer; şekli ve dönme (presesyon) yönü balanssızlığı, eksen kaçıklığını, sürtünmeleri ve yağ kararsızlıklarını ayırt eder. Devir başına bir keyphasor fazı sabitler ve yavaş-dönme sapmasının çıkarılmasını sağlar; tam spektrum ise titreşimi ileri ve geri fırlamaya (whirl) ayırır — yağ fırlaması ve kamçısı için anahtar ayırıcı.',
            inputs: [
                { name: 'XY mesafe probları', desc: 'Yatak başına, 90° arayla, mile-göre yer değiştirme çifti.' },
                { name: 'Keyphasor', desc: 'Faz ve yavaş-dönme düzeltmesi için devir başına bir referans.' },
                { name: 'Yavaş-dönme kaydı', desc: 'Çıkarılacak mekanik/elektriksel sapmayı yakalayan düşük hızlı bir koşu.' },
            ],
            formulas: [
                {
                    title: 'Mil yörüngesi',
                    latex: '\\vec{r}(t) = \\bigl( x(t),\\; y(t) \\bigr)',
                    expr: 'yörünge: bir devir boyunca x(t)\'yi y(t)\'ye karşı çiz',
                    where: 'Mil ekseninin parametrik XY yolu. Daireye yakın 1× yörünge balanssızlığı düşündürür; sekiz şekli veya basık elips eksen kaçıklığına ya da ön yüke işaret eder; iç ilmekler sürtünmeyi gösterir.',
                },
                {
                    title: 'Yavaş-dönme düzeltmesi',
                    latex: '\\vec{r}_{\\mathrm{dyn}}(\\theta) = \\vec{r}_{\\mathrm{meas}}(\\theta) - \\vec{r}_{\\mathrm{slow}}(\\theta)',
                    expr: 'r_din(θ) = r_ölçülen(θ) − r_yavaş(θ)',
                    where: 'Çok düşük hızda ölçülen, keyphasor\'a kilitli sapma vektörü (eğiklikler, çizikler, elektriksel hata) açıda örnek örnek çıkarılır; geriye yalnızca gerçek dinamik hareket kalır.',
                },
                {
                    title: 'Tam spektrum (ileri/geri fırlama)',
                    latex: 'z(t) = x(t) + j\\,y(t) \\;\\;\\Rightarrow\\;\\; Z(f),\\; f \\in (-\\infty, \\infty)',
                    expr: 'z(t) = x(t) + j·y(t)  →  FFT ±f bileşenlerini verir',
                    where: 'Prob çiftinin karmaşık birleşimi iki taraflı spektrum verir: pozitif frekanslar ileri presesyon (dönüşle aynı yön), negatifler geri. 0,43–0,48× civarındaki senkron-altı ileri fırlama yağ fırlamasının imzasıdır; bir rezonansa kilitlenmesi yağ kamçısıdır.',
                },
            ],
            steps: [
                { step: 'Probları koşullandır', detail: 'Boşluk gerilimleri denetlenir, sapma yavaş dönmede yakalanır ve açı başına saklanır.' },
                { step: 'Düzelt & yörüngeleri çiz', detail: 'Yavaş-dönme çıkarımı, ardından yatak başına filtreli (1×, 2×, filtresiz) yörüngeler.' },
                { step: 'Tam spektrum analizi', detail: 'Senkron-altı içerik izlenerek hıza karşı ileri/geri ayrışım.' },
                { step: 'Standartlara göre değerlendir', detail: 'Mile-göre yer değiştirme, hız aralığı boyunca ISO 7919 / ISO 20816 bölge limitleriyle karşılaştırılır.' },
            ],
            outputs: [
                { name: 'Yörünge grafikleri', desc: 'Yatak başına, keyphasor noktalı, düzeltilmiş ve filtreli yörüngeler.' },
                { name: 'Tam spektrum kaskadı', desc: 'Hıza karşı ileri/geri fırlama içeriği.' },
                { name: 'Bode & polar grafikler', desc: 'Kritik hızlardan geçerken 1× genlik ve faz.' },
                { name: 'Mil ekseni & bölge durumu', desc: 'Boşluk içindeki ortalama konum ve ISO değerlendirme bölgeleri.' },
            ],
        },
    },

    shock_srs: {
        slug: 'shock-srs',
        en: {
            tagline: 'Characterises transient shocks by the peak response they would drive in a bank of tuned oscillators — the Shock Response Spectrum.',
            intro:
                'A drop, impact or pyrotechnic event lasts milliseconds, and its damage potential cannot be judged from the raw waveform. The SRS answers a sharper question: if this pulse hit a structure with a given natural frequency, how hard would that structure respond? The analysis runs the measured pulse through many single-degree-of-freedom oscillators (one per frequency, ISO 18431-4 ramp-invariant digital filters), records each peak response, and plots peak versus frequency. The result is the standard language for specifying and qualifying shock environments.',
            inputs: [
                { name: 'Shock acceleration', desc: 'The transient event from an accelerometer, sampled ≥ 10× the highest SRS frequency.' },
                { name: 'SRS parameters', desc: 'Frequency range and spacing (e.g. 1/12 octave), damping Q (typically 10), primary/residual selection.' },
                { name: 'Test specification (optional)', desc: 'A reference SRS with tolerance bands for pass/fail comparison.' },
            ],
            formulas: [
                {
                    title: 'SDOF oscillator response',
                    latex: '\\ddot{x} + 2\\zeta\\omega_n \\dot{x} + \\omega_n^{2} x = -\\ddot{u}(t)',
                    expr: 'ẍ + 2ζω_n·ẋ + ω_n²·x = −ü(t)',
                    where: 'ü(t) = measured base acceleration, ω_n = oscillator natural frequency, ζ = damping ratio. Solved digitally for each frequency in the SRS grid (ramp-invariant filter per ISO 18431-4).',
                },
                {
                    title: 'Shock Response Spectrum',
                    latex: '\\mathrm{SRS}(f_n) = \\max_t \\bigl| \\ddot{x}_{\\mathrm{abs}}(t;\\, f_n) \\bigr|',
                    expr: 'SRS(f_n) = max_t | ẍ_abs(t; f_n) |',
                    where: 'The peak absolute response of the oscillator tuned to f_n. Taken during the pulse it is the primary SRS; during the free decay afterwards, the residual SRS — comparing the two classifies the shock.',
                },
                {
                    title: 'Damping and quality factor',
                    latex: 'Q = \\dfrac{1}{2\\zeta}',
                    expr: 'Q = 1/(2ζ)',
                    where: 'Convention: Q = 10 (ζ = 5%) unless specified otherwise. Every SRS must state its Q — the same pulse gives different SRS levels at different damping.',
                },
                {
                    title: 'Velocity change',
                    latex: '\\Delta V = \\int a(t)\\, \\mathrm{d}t',
                    expr: 'ΔV = ∫ a(t) dt',
                    where: 'The integral of acceleration over the pulse. Delta-V often correlates with damage better than peak g alone, and low-frequency SRS asymptotes are controlled by it.',
                },
            ],
            steps: [
                { step: 'Isolate & condition the pulse', detail: 'Windowing, detrending and pre-shock offset removal so integration does not drift.' },
                { step: 'Run the oscillator bank', detail: 'Ramp-invariant SDOF filters at each grid frequency compute the response histories.' },
                { step: 'Extract spectra & metrics', detail: 'Primary/residual/maximax SRS plus peak g, duration and delta-V.' },
                { step: 'Compare to specification', detail: 'The computed SRS is checked against reference tolerance bands for compliance.' },
            ],
            outputs: [
                { name: 'SRS curves', desc: 'Primary, residual and maximax spectra at the stated Q.' },
                { name: 'Pulse metrics', desc: 'Peak acceleration, effective duration and velocity change.' },
                { name: 'Compliance verdict', desc: 'Pass/fail against the test specification with margin per band.' },
            ],
        },
        tr: {
            tagline: 'Geçici şokları, ayarlı bir salınıcı bankasında sürecekleri tepe tepkiyle karakterize eder — Şok Tepki Spektrumu.',
            intro:
                'Bir düşme, çarpma veya piroteknik olay milisaniyeler sürer ve hasar potansiyeli ham dalga formundan değerlendirilemez. SRS daha keskin bir soruyu yanıtlar: bu darbe belirli bir doğal frekansa sahip bir yapıya çarpsaydı, o yapı ne kadar şiddetle tepki verirdi? Analiz, ölçülen darbeyi çok sayıda tek serbestlik dereceli salınıcıdan geçirir (frekans başına bir tane, ISO 18431-4 rampa-değişmez sayısal filtreler), her tepe tepkiyi kaydeder ve tepeyi frekansa karşı çizer. Sonuç, şok ortamlarını belirlemenin ve nitelendirmenin standart dilidir.',
            inputs: [
                { name: 'Şok ivmesi', desc: 'İvmeölçerden geçici olay; en yüksek SRS frekansının ≥ 10 katı hızda örneklenmiş.' },
                { name: 'SRS parametreleri', desc: 'Frekans aralığı ve adımı (örn. 1/12 oktav), sönüm Q (tipik 10), birincil/artık seçimi.' },
                { name: 'Test şartnamesi (opsiyonel)', desc: 'Geç/kal karşılaştırması için toleranslı bir referans SRS.' },
            ],
            formulas: [
                {
                    title: 'SDOF salınıcı tepkisi',
                    latex: '\\ddot{x} + 2\\zeta\\omega_n \\dot{x} + \\omega_n^{2} x = -\\ddot{u}(t)',
                    expr: 'ẍ + 2ζω_n·ẋ + ω_n²·x = −ü(t)',
                    where: 'ü(t) = ölçülen taban ivmesi, ω_n = salınıcı doğal frekansı, ζ = sönüm oranı. SRS ızgarasındaki her frekans için sayısal çözülür (ISO 18431-4\'e göre rampa-değişmez filtre).',
                },
                {
                    title: 'Şok Tepki Spektrumu',
                    latex: '\\mathrm{SRS}(f_n) = \\max_t \\bigl| \\ddot{x}_{\\mathrm{abs}}(t;\\, f_n) \\bigr|',
                    expr: 'SRS(f_n) = maks_t | ẍ_mutlak(t; f_n) |',
                    where: 'f_n\'e ayarlı salınıcının tepe mutlak tepkisi. Darbe sırasında alınırsa birincil SRS; sonrasındaki serbest sönümde artık SRS — ikisinin karşılaştırılması şoku sınıflandırır.',
                },
                {
                    title: 'Sönüm ve kalite faktörü',
                    latex: 'Q = \\dfrac{1}{2\\zeta}',
                    expr: 'Q = 1/(2ζ)',
                    where: 'Gelenek: aksi belirtilmedikçe Q = 10 (ζ = %5). Her SRS, Q değerini belirtmelidir — aynı darbe farklı sönümlerde farklı SRS seviyeleri verir.',
                },
                {
                    title: 'Hız değişimi',
                    latex: '\\Delta V = \\int a(t)\\, \\mathrm{d}t',
                    expr: 'ΔV = ∫ a(t) dt',
                    where: 'Darbe boyunca ivmenin integrali. Delta-V, hasarla çoğu zaman tek başına tepe g\'den daha iyi ilişkilidir ve düşük frekanslı SRS asimptotlarını o kontrol eder.',
                },
            ],
            steps: [
                { step: 'Darbeyi yalıt & koşullandır', detail: 'Pencereleme, eğilim giderme ve şok-öncesi ofset kaldırma — integral sürüklenmesin.' },
                { step: 'Salınıcı bankasını çalıştır', detail: 'Her ızgara frekansında rampa-değişmez SDOF filtreleri tepki geçmişlerini hesaplar.' },
                { step: 'Spektrum & metrikleri çıkar', detail: 'Birincil/artık/maximax SRS artı tepe g, süre ve delta-V.' },
                { step: 'Şartnameyle karşılaştır', detail: 'Hesaplanan SRS, uygunluk için referans tolerans bantlarına karşı denetlenir.' },
            ],
            outputs: [
                { name: 'SRS eğrileri', desc: 'Belirtilen Q\'da birincil, artık ve maximax spektrumlar.' },
                { name: 'Darbe metrikleri', desc: 'Tepe ivme, etkin süre ve hız değişimi.' },
                { name: 'Uygunluk kararı', desc: 'Bant başına marjla test şartnamesine karşı geç/kal.' },
            ],
        },
    },

    time_ods: {
        slug: 'time-based-ods',
        en: {
            tagline: 'Animates how the structure actually deforms in operation, from phase-referenced multi-point vibration.',
            intro:
                'An Operational Deflection Shape shows the real deformation of a structure under its actual operating loads — not the theoretical modes, but the total motion at a chosen frequency or order. Measuring many points while keeping one reference channel fixed preserves the relative phase between points, so the amplitudes and timings can be assembled into an animated wireframe. It is the fastest way to see where energy goes: a panel breathing, a pipe whipping, a base twisting at running speed.',
            inputs: [
                { name: 'Response channels', desc: 'Roving accelerometer sets across the geometry, measured batch by batch.' },
                { name: 'Reference channel', desc: 'One fixed sensor present in every batch — the phase anchor tying all points together.' },
                { name: 'Geometry model', desc: 'Point coordinates and connectivity for the wireframe animation.' },
            ],
            formulas: [
                {
                    title: 'Transmissibility to the reference',
                    latex: 'T_{i}(\\omega) = \\dfrac{X_i(\\omega)}{X_{\\mathrm{ref}}(\\omega)}',
                    expr: 'T_i(ω) = X_i(ω) / X_ref(ω)',
                    where: 'Each point\'s spectrum divided by the reference spectrum gives relative magnitude and phase, immune to batch-to-batch changes in operating level.',
                },
                {
                    title: 'Deflection shape at one frequency',
                    latex: 'x_i(t) = |T_i|\\, A \\sin\\bigl(\\omega t + \\varphi_i\\bigr)',
                    expr: 'x_i(t) = |T_i| · A · sin(ωt + φ_i)',
                    where: 'The animation drives every geometry point with its measured magnitude and phase at the selected frequency; points moving in and out of phase reveal the deformation pattern.',
                },
            ],
            steps: [
                { step: 'Plan the grid', detail: 'Measurement points and directions are laid out on the geometry model.' },
                { step: 'Measure in batches', detail: 'Roving sensors capture all points, each batch sharing the fixed reference.' },
                { step: 'Assemble the shape', detail: 'Transmissibilities merge the batches into one phase-consistent shape per frequency of interest.' },
                { step: 'Animate and diagnose', detail: 'The wireframe animation exposes flexing, whipping or twisting at the problem frequency.' },
            ],
            outputs: [
                { name: 'ODS animations', desc: 'Wireframe deformation at selected frequencies or orders.' },
                { name: 'Point amplitude/phase table', desc: 'The measured shape data behind each animation.' },
                { name: 'Problem-area ranking', desc: 'Which locations move most — where stiffening or damping will pay off.' },
            ],
        },
        tr: {
            tagline: 'Faz referanslı çok noktalı titreşimden, yapının işletmede gerçekte nasıl deforme olduğunu canlandırır.',
            intro:
                'Operasyonel Sehim Şekli, bir yapının gerçek işletme yükleri altındaki gerçek deformasyonunu gösterir — teorik modları değil, seçilen bir frekans veya order\'daki toplam hareketi. Bir referans kanalı sabit tutarak çok sayıda noktanın ölçülmesi, noktalar arası bağıl fazı korur; böylece genlikler ve zamanlamalar canlandırılmış bir tel kafese birleştirilebilir. Enerjinin nereye gittiğini görmenin en hızlı yoludur: nefes alan bir panel, kamçılanan bir boru, çalışma hızında burulan bir taban.',
            inputs: [
                { name: 'Tepki kanalları', desc: 'Geometri üzerinde parti parti ölçülen gezici ivmeölçer takımları.' },
                { name: 'Referans kanalı', desc: 'Her partide bulunan tek sabit sensör — tüm noktaları birbirine bağlayan faz çapası.' },
                { name: 'Geometri modeli', desc: 'Tel kafes animasyonu için nokta koordinatları ve bağlantılar.' },
            ],
            formulas: [
                {
                    title: 'Referansa geçirgenlik',
                    latex: 'T_{i}(\\omega) = \\dfrac{X_i(\\omega)}{X_{\\mathrm{ref}}(\\omega)}',
                    expr: 'T_i(ω) = X_i(ω) / X_ref(ω)',
                    where: 'Her noktanın spektrumunun referans spektrumuna bölünmesi bağıl genlik ve fazı verir; partiden partiye işletme seviyesi değişimlerinden etkilenmez.',
                },
                {
                    title: 'Tek frekansta sehim şekli',
                    latex: 'x_i(t) = |T_i|\\, A \\sin\\bigl(\\omega t + \\varphi_i\\bigr)',
                    expr: 'x_i(t) = |T_i| · A · sin(ωt + φ_i)',
                    where: 'Animasyon, her geometri noktasını seçilen frekanstaki ölçülmüş genliği ve fazıyla sürer; fazlı-fazsız hareket eden noktalar deformasyon desenini ortaya çıkarır.',
                },
            ],
            steps: [
                { step: 'Izgarayı planla', detail: 'Ölçüm noktaları ve yönleri geometri modeli üzerine yerleştirilir.' },
                { step: 'Partiler halinde ölç', detail: 'Gezici sensörler tüm noktaları yakalar; her parti sabit referansı paylaşır.' },
                { step: 'Şekli birleştir', detail: 'Geçirgenlikler, partileri ilgilenilen her frekans için faz-tutarlı tek bir şekle birleştirir.' },
                { step: 'Canlandır ve teşhis et', detail: 'Tel kafes animasyonu, sorunlu frekanstaki esnemeyi, kamçılanmayı veya burulmayı gözler önüne serer.' },
            ],
            outputs: [
                { name: 'ODS animasyonları', desc: 'Seçilen frekans veya orderlarda tel kafes deformasyonu.' },
                { name: 'Nokta genlik/faz tablosu', desc: 'Her animasyonun arkasındaki ölçülmüş şekil verisi.' },
                { name: 'Sorun bölgesi sıralaması', desc: 'En çok hareket eden konumlar — rijitleştirme veya sönümlemenin karşılık vereceği yerler.' },
            ],
        },
    },
    cross_spectrum: {
        slug: 'cross-spectrum-frf',
        en: {
            tagline: 'Relates an input to an output across frequency: cross-spectrum, H1/H2/Hv transfer functions and the coherence that says whether to trust them.',
            intro:
                'Whenever you ask "how does this system respond to that excitation", you need the frequency-domain relationship between two simultaneous signals. The averaged cross-spectrum captures their shared amplitude and phase at every frequency; dividing by the right auto-spectrum turns it into the Frequency Response Function used throughout structural dynamics. Because real measurements are noisy, the widget offers the three classic estimators and always computes coherence alongside — the 0-to-1 score that flags noise, nonlinearity or leakage before you believe an FRF peak.',
            inputs: [
                { name: 'Input channel', desc: 'The excitation signal — force, voltage, or any reference.' },
                { name: 'Output channel', desc: 'The simultaneous response signal to relate to the input.' },
                { name: 'Averaging settings', desc: 'Block size, window and overlap — more averages mean smoother spectra and honest coherence.' },
            ],
            formulas: [
                {
                    title: 'Cross-spectral density',
                    latex: 'G_{xy}(f) = \\bigl\\langle X^{*}(f)\\, Y(f) \\bigr\\rangle',
                    expr: 'G_xy(f) = ⟨ X*(f) · Y(f) ⟩',
                    where: 'X, Y = block FFTs of input and output, * = complex conjugate, ⟨⟩ = ensemble average. Magnitude shows shared power; phase shows the input→output lag at each frequency.',
                },
                {
                    title: 'FRF estimators',
                    latex: 'H_1(f) = \\dfrac{G_{xy}}{G_{xx}} \\qquad H_2(f) = \\dfrac{G_{yy}}{G_{yx}} \\qquad H_1 \\le H \\le H_2',
                    expr: 'H₁ = G_xy/G_xx ;  H₂ = G_yy/G_yx',
                    where: 'H1 assumes noise on the output (default choice), H2 assumes noise on the input (better at resonances); the true FRF lies between them, and Hv balances both. Their ratio equals the coherence.',
                },
                {
                    title: 'Coherence',
                    latex: '\\gamma^{2}(f) = \\dfrac{\\left| G_{xy} \\right|^{2}}{G_{xx}\\, G_{yy}}',
                    expr: 'γ²(f) = |G_xy|² / (G_xx · G_yy)',
                    where: 'The fraction of output power linearly explained by the input, per frequency. γ² near 1 validates the FRF; dips warn of extraneous noise, nonlinearity, leakage or unmeasured inputs.',
                },
            ],
            steps: [
                { step: 'Segment and window', detail: 'Both channels are split into overlapping windowed blocks.' },
                { step: 'Average the spectra', detail: 'Auto-spectra G_xx, G_yy and cross-spectrum G_xy accumulate over blocks.' },
                { step: 'Form FRF and coherence', detail: 'The chosen estimator produces magnitude/phase; coherence is computed per line.' },
                { step: 'Judge validity', detail: 'FRF regions with low coherence are flagged so downstream modal fits ignore them.' },
            ],
            outputs: [
                { name: 'FRF (magnitude & phase)', desc: 'Bode-style transfer function using H1, H2 or Hv.' },
                { name: 'Coherence function', desc: 'Per-frequency trust score for the measurement.' },
                { name: 'Cross- and auto-spectra', desc: 'The underlying averaged spectral densities.' },
            ],
        },
        tr: {
            tagline: 'Bir girişi bir çıkışa frekans boyunca bağlar: çapraz spektrum, H1/H2/Hv transfer fonksiyonları ve onlara güvenilip güvenilmeyeceğini söyleyen koherans.',
            intro:
                '"Bu sistem şu uyarmaya nasıl tepki verir" diye sorduğunuzda, eşzamanlı iki sinyal arasındaki frekans-bölgesi ilişkisine ihtiyaç duyarsınız. Ortalanmış çapraz spektrum, her frekansta ortak genliği ve fazı yakalar; doğru öz-spektruma bölünmesi onu yapısal dinamiğin her yerinde kullanılan Frekans Tepki Fonksiyonuna dönüştürür. Gerçek ölçümler gürültülü olduğundan, widget üç klasik kestiriciyi sunar ve her zaman yanında koheransı hesaplar — bir FRF tepesine inanmadan önce gürültüyü, doğrusalsızlığı veya sızıntıyı işaretleyen 0-1 arası puan.',
            inputs: [
                { name: 'Giriş kanalı', desc: 'Uyarma sinyali — kuvvet, gerilim veya herhangi bir referans.' },
                { name: 'Çıkış kanalı', desc: 'Girişle ilişkilendirilecek eşzamanlı tepki sinyali.' },
                { name: 'Ortalama ayarları', desc: 'Blok boyu, pencere ve örtüşme — daha çok ortalama, daha pürüzsüz spektrum ve dürüst koherans demektir.' },
            ],
            formulas: [
                {
                    title: 'Çapraz spektral yoğunluk',
                    latex: 'G_{xy}(f) = \\bigl\\langle X^{*}(f)\\, Y(f) \\bigr\\rangle',
                    expr: 'G_xy(f) = ⟨ X*(f) · Y(f) ⟩',
                    where: 'X, Y = giriş ve çıkışın blok FFT\'leri, * = karmaşık eşlenik, ⟨⟩ = topluluk ortalaması. Genlik ortak gücü, faz her frekanstaki giriş→çıkış gecikmesini gösterir.',
                },
                {
                    title: 'FRF kestiricileri',
                    latex: 'H_1(f) = \\dfrac{G_{xy}}{G_{xx}} \\qquad H_2(f) = \\dfrac{G_{yy}}{G_{yx}} \\qquad H_1 \\le H \\le H_2',
                    expr: 'H₁ = G_xy/G_xx ;  H₂ = G_yy/G_yx',
                    where: 'H1 gürültüyü çıkışta varsayar (varsayılan tercih), H2 girişte varsayar (rezonanslarda daha iyi); gerçek FRF ikisinin arasındadır, Hv ikisini dengeler. Oranları koheransa eşittir.',
                },
                {
                    title: 'Koherans',
                    latex: '\\gamma^{2}(f) = \\dfrac{\\left| G_{xy} \\right|^{2}}{G_{xx}\\, G_{yy}}',
                    expr: 'γ²(f) = |G_xy|² / (G_xx · G_yy)',
                    where: 'Frekans başına, çıkış gücünün girişle doğrusal açıklanan kesri. 1\'e yakın γ² FRF\'yi doğrular; düşüşler yabancı gürültü, doğrusalsızlık, sızıntı veya ölçülmemiş girişler konusunda uyarır.',
                },
            ],
            steps: [
                { step: 'Bölütle ve pencerele', detail: 'Her iki kanal örtüşen pencereli bloklara bölünür.' },
                { step: 'Spektrumları ortala', detail: 'Öz-spektrumlar G_xx, G_yy ve çapraz spektrum G_xy bloklar üzerinde birikir.' },
                { step: 'FRF ve koheransı oluştur', detail: 'Seçilen kestirici genlik/fazı üretir; koherans çizgi başına hesaplanır.' },
                { step: 'Geçerliliği yargıla', detail: 'Düşük koheranslı FRF bölgeleri işaretlenir; sonraki modal uydurmalar onları yok sayar.' },
            ],
            outputs: [
                { name: 'FRF (genlik & faz)', desc: 'H1, H2 veya Hv ile Bode tarzı transfer fonksiyonu.' },
                { name: 'Koherans fonksiyonu', desc: 'Ölçüm için frekans başına güven puanı.' },
                { name: 'Çapraz ve öz spektrumlar', desc: 'Temeldeki ortalanmış spektral yoğunluklar.' },
            ],
        },
    },

    cross_axis_compensation: {
        slug: 'cross-axis-compensation',
        en: {
            tagline: 'Undoes the leakage between a triaxial accelerometer\'s axes by inverting its calibration matrix.',
            intro:
                'No real triaxial accelerometer measures X, Y and Z perfectly independently: motion along one axis bleeds a small signal (typically a fraction of a percent up to a few percent) into the other two. With large amplitude differences between axes this creates phantom components that no averaging can remove, because the error is systematic. The fix is linear algebra: the sensor\'s true behaviour is a 3×3 sensitivity matrix from its calibration sheet, and multiplying the measured vector by its inverse recovers the orthogonal physical motion.',
            inputs: [
                { name: 'Triaxial channels', desc: 'The X, Y, Z measured signals from one sensor.' },
                { name: 'Sensitivity matrix', desc: 'The 3×3 calibration matrix — main-axis sensitivities on the diagonal, cross-axis couplings off it.' },
            ],
            formulas: [
                {
                    title: 'Measurement model',
                    latex: '\\vec{v} = \\mathbf{S}\\, \\vec{a} = \\begin{bmatrix} s_{xx} & s_{xy} & s_{xz} \\\\ s_{yx} & s_{yy} & s_{yz} \\\\ s_{zx} & s_{zy} & s_{zz} \\end{bmatrix} \\vec{a}',
                    expr: 'v = S · a   (S = 3×3 sensitivity matrix)',
                    where: 'a = true acceleration vector, v = measured outputs. Diagonal terms are the main sensitivities; off-diagonal terms are the unwanted cross-axis couplings.',
                },
                {
                    title: 'Compensation',
                    latex: '\\vec{a} = \\mathbf{S}^{-1}\\, \\vec{v}',
                    expr: 'a = S⁻¹ · v',
                    where: 'Inverting the calibration matrix and applying it sample-by-sample removes the systematic leakage, restoring orthogonal X, Y, Z motion.',
                },
            ],
            steps: [
                { step: 'Load the calibration', detail: 'The matrix comes from the sensor datasheet or a dedicated cross-axis calibration.' },
                { step: 'Validate invertibility', detail: 'The matrix is checked for conditioning before use.' },
                { step: 'Apply per sample', detail: 'Every XYZ triple is multiplied by the inverse matrix — a cheap, exact correction.' },
            ],
            outputs: [
                { name: 'Compensated XYZ channels', desc: 'Orthogonal acceleration with cross-axis error removed.' },
                { name: 'Correction summary', desc: 'How much energy moved between axes — a quick sanity check on sensor quality.' },
            ],
        },
        tr: {
            tagline: 'Üç eksenli ivmeölçerin eksenleri arasındaki sızıntıyı, kalibrasyon matrisini ters çevirerek giderir.',
            intro:
                'Hiçbir gerçek üç eksenli ivmeölçer X, Y ve Z\'yi mükemmel bağımsız ölçmez: bir eksen boyunca hareket, diğer ikisine küçük bir sinyal (tipik olarak yüzdenin kesrinden birkaç yüzdeye kadar) sızdırır. Eksenler arasında büyük genlik farkları olduğunda bu, hiçbir ortalamanın gideremeyeceği hayalet bileşenler yaratır; çünkü hata sistematiktir. Çözüm doğrusal cebirdir: sensörün gerçek davranışı, kalibrasyon kağıdındaki 3×3 duyarlılık matrisidir ve ölçülen vektörün bu matrisin tersiyle çarpılması dik fiziksel hareketi geri kazandırır.',
            inputs: [
                { name: 'Üç eksenli kanallar', desc: 'Tek sensörden ölçülen X, Y, Z sinyalleri.' },
                { name: 'Duyarlılık matrisi', desc: '3×3 kalibrasyon matrisi — köşegende ana eksen duyarlılıkları, dışında çapraz eksen kuplajları.' },
            ],
            formulas: [
                {
                    title: 'Ölçüm modeli',
                    latex: '\\vec{v} = \\mathbf{S}\\, \\vec{a} = \\begin{bmatrix} s_{xx} & s_{xy} & s_{xz} \\\\ s_{yx} & s_{yy} & s_{yz} \\\\ s_{zx} & s_{zy} & s_{zz} \\end{bmatrix} \\vec{a}',
                    expr: 'v = S · a   (S = 3×3 duyarlılık matrisi)',
                    where: 'a = gerçek ivme vektörü, v = ölçülen çıkışlar. Köşegen terimler ana duyarlılıklar; köşegen dışı terimler istenmeyen çapraz eksen kuplajlarıdır.',
                },
                {
                    title: 'Düzeltme',
                    latex: '\\vec{a} = \\mathbf{S}^{-1}\\, \\vec{v}',
                    expr: 'a = S⁻¹ · v',
                    where: 'Kalibrasyon matrisinin ters çevrilip örnek örnek uygulanması sistematik sızıntıyı kaldırır ve dik X, Y, Z hareketini geri getirir.',
                },
            ],
            steps: [
                { step: 'Kalibrasyonu yükle', detail: 'Matris, sensör veri sayfasından veya özel bir çapraz eksen kalibrasyonundan gelir.' },
                { step: 'Ters çevrilebilirliği doğrula', detail: 'Matris kullanılmadan önce koşullanma açısından denetlenir.' },
                { step: 'Örnek başına uygula', detail: 'Her XYZ üçlüsü ters matrisle çarpılır — ucuz ve kesin bir düzeltme.' },
            ],
            outputs: [
                { name: 'Düzeltilmiş XYZ kanalları', desc: 'Çapraz eksen hatası kaldırılmış dik ivme.' },
                { name: 'Düzeltme özeti', desc: 'Eksenler arasında ne kadar enerji taşındığı — sensör kalitesi için hızlı bir sağlama.' },
            ],
        },
    },

    kinematics_6dof: {
        slug: 'kinematic-chain-6dof',
        en: {
            tagline: 'Rebuilds full rigid-body motion from an accelerometer array, integrates it to velocity and displacement, and scores human exposure per ISO 2631.',
            intro:
                'A rigid body moves with six degrees of freedom — three translations and three rotations. Place several accelerometers at known positions and the rigid-body kinematic equations let you reconstruct the complete 6-DOF motion at any reference point: seat, cabin, platform or fixture. Acceleration is integrated in the frequency domain (to avoid drift) into velocity and displacement, gravity components give tilt angles, and for human-vibration work the ISO 2631 frequency weightings produce a_w, VDV and MTVV exposure metrics.',
            inputs: [
                { name: 'Accelerometer array', desc: 'Several (tri)axial sensors at known coordinates on the rigid body.' },
                { name: 'Sensor positions', desc: 'The lever arms r from the reference point to each sensor — the geometry the equations invert.' },
                { name: 'Weighting selection', desc: 'ISO 2631 curve (Wk, Wd, …) matching posture and direction for exposure metrics.' },
            ],
            formulas: [
                {
                    title: 'Rigid-body acceleration field',
                    latex: '\\vec{a}_P = \\vec{a}_O + \\dot{\\vec{\\omega}} \\times \\vec{r} + \\vec{\\omega} \\times (\\vec{\\omega} \\times \\vec{r})',
                    expr: 'a_P = a_O + α×r + ω×(ω×r)',
                    where: 'a_O = translational acceleration at the reference, ω, α = angular velocity and acceleration, r = lever arm to point P. With enough sensors this system is solved for the six unknowns (a_O, α).',
                },
                {
                    title: 'Drift-free integration',
                    latex: 'V(f) = \\dfrac{A(f)}{j\\,2\\pi f} \\qquad X(f) = -\\dfrac{A(f)}{(2\\pi f)^{2}}',
                    expr: 'V(f) = A(f)/(j·2πf) ;  X(f) = −A(f)/(2πf)²',
                    where: 'Dividing by jω in the frequency domain (with a high-pass cutoff) integrates acceleration to velocity and displacement without the drift that plagues time-domain integration.',
                },
                {
                    title: 'ISO 2631 weighted acceleration',
                    latex: 'a_w = \\left[ \\int W^{2}(f)\\, G_{aa}(f)\\, \\mathrm{d}f \\right]^{1/2}',
                    expr: 'a_w = [ ∫ W²(f)·G_aa(f) df ]^½',
                    where: 'W(f) = the standardized frequency weighting for the body direction, G_aa = acceleration PSD. a_w is the primary comfort/health exposure number.',
                },
                {
                    title: 'Vibration Dose Value',
                    latex: '\\mathrm{VDV} = \\left[ \\int_0^T a_w^{4}(t)\\, \\mathrm{d}t \\right]^{1/4}',
                    expr: 'VDV = [ ∫ a_w⁴(t) dt ]^¼',
                    where: 'The fourth-power dose emphasises shocks and transients that RMS understates; MTVV (max 1-s running RMS) complements it for short events.',
                },
            ],
            steps: [
                { step: 'Solve the kinematics', detail: 'The sensor array and geometry yield 6-DOF motion at the chosen reference point.' },
                { step: 'Integrate spectrally', detail: 'Velocity and displacement come from frequency-domain integration with drift control.' },
                { step: 'Estimate attitude', detail: 'Low-pass gravity components give roll/pitch tilt, separated from dynamic vibration.' },
                { step: 'Apply ISO 2631', detail: 'Weighting filters and dose formulas produce a_w, VDV, MTVV per axis and combined.' },
            ],
            outputs: [
                { name: '6-DOF motion channels', desc: 'Translations and rotations at the reference point.' },
                { name: 'Velocity & displacement', desc: 'Drift-free integrated motion.' },
                { name: 'ISO 2631 exposure metrics', desc: 'a_w, VDV, MTVV with health-guidance zone comparison.' },
                { name: 'Tilt angles', desc: 'Roll and pitch from the gravity vector.' },
            ],
        },
        tr: {
            tagline: 'İvmeölçer dizisinden tam katı cisim hareketini yeniden kurar, hız ve yer değiştirmeye entegre eder ve insan maruziyetini ISO 2631\'e göre puanlar.',
            intro:
                'Bir katı cisim altı serbestlik derecesiyle hareket eder — üç öteleme ve üç dönme. Bilinen konumlara birkaç ivmeölçer yerleştirin; katı cisim kinematik denklemleri, herhangi bir referans noktasında tam 6-DOF hareketi yeniden kurmanızı sağlar: koltuk, kabin, platform veya düzenek. İvme, sürüklenmeyi önlemek için frekans bölgesinde hız ve yer değiştirmeye entegre edilir; yerçekimi bileşenleri eğim açılarını verir ve insan-titreşimi işleri için ISO 2631 frekans ağırlıklandırmaları a_w, VDV ve MTVV maruziyet metriklerini üretir.',
            inputs: [
                { name: 'İvmeölçer dizisi', desc: 'Katı cisim üzerinde bilinen koordinatlarda birkaç (üç) eksenli sensör.' },
                { name: 'Sensör konumları', desc: 'Referans noktasından her sensöre kol mesafeleri r — denklemlerin ters çevirdiği geometri.' },
                { name: 'Ağırlıklandırma seçimi', desc: 'Maruziyet metrikleri için duruş ve yöne uyan ISO 2631 eğrisi (Wk, Wd, …).' },
            ],
            formulas: [
                {
                    title: 'Katı cisim ivme alanı',
                    latex: '\\vec{a}_P = \\vec{a}_O + \\dot{\\vec{\\omega}} \\times \\vec{r} + \\vec{\\omega} \\times (\\vec{\\omega} \\times \\vec{r})',
                    expr: 'a_P = a_O + α×r + ω×(ω×r)',
                    where: 'a_O = referanstaki öteleme ivmesi, ω, α = açısal hız ve ivme, r = P noktasına kol mesafesi. Yeterli sensörle bu sistem altı bilinmeyen (a_O, α) için çözülür.',
                },
                {
                    title: 'Sürüklenmesiz integral',
                    latex: 'V(f) = \\dfrac{A(f)}{j\\,2\\pi f} \\qquad X(f) = -\\dfrac{A(f)}{(2\\pi f)^{2}}',
                    expr: 'V(f) = A(f)/(j·2πf) ;  X(f) = −A(f)/(2πf)²',
                    where: 'Frekans bölgesinde jω\'ya bölmek (yüksek-geçiren kesimle birlikte), zaman bölgesi integralini bozan sürüklenme olmadan ivmeyi hıza ve yer değiştirmeye entegre eder.',
                },
                {
                    title: 'ISO 2631 ağırlıklı ivme',
                    latex: 'a_w = \\left[ \\int W^{2}(f)\\, G_{aa}(f)\\, \\mathrm{d}f \\right]^{1/2}',
                    expr: 'a_w = [ ∫ W²(f)·G_aa(f) df ]^½',
                    where: 'W(f) = vücut yönü için standart frekans ağırlıklandırması, G_aa = ivme PSD\'si. a_w, temel konfor/sağlık maruziyet sayısıdır.',
                },
                {
                    title: 'Titreşim Doz Değeri',
                    latex: '\\mathrm{VDV} = \\left[ \\int_0^T a_w^{4}(t)\\, \\mathrm{d}t \\right]^{1/4}',
                    expr: 'VDV = [ ∫ a_w⁴(t) dt ]^¼',
                    where: 'Dördüncü kuvvet dozu, RMS\'in küçümsediği şokları ve geçici olayları vurgular; MTVV (maks 1 sn kayan RMS) kısa olaylar için onu tamamlar.',
                },
            ],
            steps: [
                { step: 'Kinematiği çöz', detail: 'Sensör dizisi ve geometri, seçilen referans noktasında 6-DOF hareketi verir.' },
                { step: 'Spektral entegre et', detail: 'Hız ve yer değiştirme, sürüklenme kontrollü frekans bölgesi integralinden gelir.' },
                { step: 'Duruşu kestir', detail: 'Alçak-geçiren yerçekimi bileşenleri yatış/yunuslama eğimini verir; dinamik titreşimden ayrılır.' },
                { step: 'ISO 2631 uygula', detail: 'Ağırlıklandırma filtreleri ve doz formülleri eksen başına ve birleşik a_w, VDV, MTVV üretir.' },
            ],
            outputs: [
                { name: '6-DOF hareket kanalları', desc: 'Referans noktasında ötelemeler ve dönmeler.' },
                { name: 'Hız & yer değiştirme', desc: 'Sürüklenmesiz entegre edilmiş hareket.' },
                { name: 'ISO 2631 maruziyet metrikleri', desc: 'Sağlık kılavuz bölgesi karşılaştırmalı a_w, VDV, MTVV.' },
                { name: 'Eğim açıları', desc: 'Yerçekimi vektöründen yatış ve yunuslama.' },
            ],
        },
    },
    machine_health_overview: {
        slug: 'machine-health-overview',
        en: {
            tagline: 'Condenses every measurement point into one standards-based verdict: healthy, watch, or stop — with the trend that says where it\'s heading.',
            intro:
                'Before anyone opens a spectrum, maintenance needs a fast answer. Broadband RMS velocity is the classic single-number severity metric because it tracks general mechanical condition well across fault types, and the ISO 10816/20816 series turns it into an objective verdict: evaluation zones A through D with limits that depend on machine size, power and mounting. This dashboard computes the severity per point, classifies it into zones, and trends it over time so a slow rise is caught long before the alarm level.',
            inputs: [
                { name: 'Vibration channels', desc: 'Velocity (or acceleration, integrated) at each bearing measurement point.' },
                { name: 'Machine class', desc: 'ISO group/mounting selection that sets the zone boundary values.' },
                { name: 'History (optional)', desc: 'Previous measurements for trend and rate-of-change analysis.' },
            ],
            formulas: [
                {
                    title: 'Broadband RMS velocity',
                    latex: 'v_{\\mathrm{RMS}} = \\sqrt{ \\dfrac{1}{T} \\int_0^T v^{2}(t)\\, \\mathrm{d}t } \\qquad f \\in 10\\text{–}1000~\\mathrm{Hz}',
                    expr: 'v_RMS = √( (1/T)·∫v²(t) dt ) ,  band 10–1000 Hz',
                    where: 'The standard severity band of ISO 20816 for most machine classes. Acceleration inputs are integrated to velocity first; the band limits exclude DC drift and ultrasonic content.',
                },
                {
                    title: 'Zone classification',
                    latex: '\\mathrm{zone} = \\begin{cases} A & v_{\\mathrm{RMS}} \\le L_{A/B} \\\\ B & L_{A/B} < v_{\\mathrm{RMS}} \\le L_{B/C} \\\\ C & L_{B/C} < v_{\\mathrm{RMS}} \\le L_{C/D} \\\\ D & v_{\\mathrm{RMS}} > L_{C/D} \\end{cases}',
                    expr: 'zone A/B/C/D by comparing v_RMS with the class limits L',
                    where: 'A = newly commissioned, B = acceptable long-term, C = unsatisfactory (limited operation), D = damaging. The limits L come from the machine class table selected.',
                },
            ],
            steps: [
                { step: 'Compute severity per point', detail: 'Band-limited RMS velocity for every measurement location.' },
                { step: 'Classify into zones', detail: 'Each value is placed in ISO zone A–D for its machine class.' },
                { step: 'Trend and alarm', detail: 'Values are tracked over time; sustained rises and zone transitions raise flags before failure.' },
            ],
            outputs: [
                { name: 'Health dashboard', desc: 'Zone-coloured status of every measurement point at a glance.' },
                { name: 'Severity trends', desc: 'RMS history per point with rate-of-change indicators.' },
                { name: 'Exception list', desc: 'Points in zone C/D or trending toward them — the maintenance priority queue.' },
            ],
        },
        tr: {
            tagline: 'Her ölçüm noktasını standart tabanlı tek karara indirger: sağlıklı, izle veya durdur — ve nereye gittiğini söyleyen trendle.',
            intro:
                'Kimse spektrum açmadan önce bakımın hızlı bir yanıta ihtiyacı vardır. Geniş bantlı RMS hızı klasik tek-sayılık şiddet metriğidir; çünkü arıza türleri arasında genel mekanik durumu iyi izler ve ISO 10816/20816 serisi bunu nesnel bir karara dönüştürür: makine boyutuna, gücüne ve montajına bağlı limitlerle A\'dan D\'ye değerlendirme bölgeleri. Bu pano, nokta başına şiddeti hesaplar, bölgelere sınıflandırır ve zamana göre trendler; böylece yavaş bir yükseliş alarm seviyesinden çok önce yakalanır.',
            inputs: [
                { name: 'Titreşim kanalları', desc: 'Her yatak ölçüm noktasında hız (veya entegre edilen ivme).' },
                { name: 'Makine sınıfı', desc: 'Bölge sınır değerlerini belirleyen ISO grup/montaj seçimi.' },
                { name: 'Geçmiş (opsiyonel)', desc: 'Trend ve değişim-hızı analizi için önceki ölçümler.' },
            ],
            formulas: [
                {
                    title: 'Geniş bantlı RMS hızı',
                    latex: 'v_{\\mathrm{RMS}} = \\sqrt{ \\dfrac{1}{T} \\int_0^T v^{2}(t)\\, \\mathrm{d}t } \\qquad f \\in 10\\text{–}1000~\\mathrm{Hz}',
                    expr: 'v_RMS = √( (1/T)·∫v²(t) dt ) ,  bant 10–1000 Hz',
                    where: 'Çoğu makine sınıfı için ISO 20816\'nın standart şiddet bandı. İvme girişleri önce hıza entegre edilir; bant limitleri DC sürüklenmesini ve ultrasonik içeriği dışarıda bırakır.',
                },
                {
                    title: 'Bölge sınıflandırması',
                    latex: '\\mathrm{b\\ddot{o}lge} = \\begin{cases} A & v_{\\mathrm{RMS}} \\le L_{A/B} \\\\ B & L_{A/B} < v_{\\mathrm{RMS}} \\le L_{B/C} \\\\ C & L_{B/C} < v_{\\mathrm{RMS}} \\le L_{C/D} \\\\ D & v_{\\mathrm{RMS}} > L_{C/D} \\end{cases}',
                    expr: 'v_RMS sınıf limitleri L ile karşılaştırılarak bölge A/B/C/D',
                    where: 'A = yeni devreye alınmış, B = uzun süreli kabul edilebilir, C = yetersiz (sınırlı işletme), D = hasar verici. L limitleri seçilen makine sınıfı tablosundan gelir.',
                },
            ],
            steps: [
                { step: 'Nokta başına şiddeti hesapla', detail: 'Her ölçüm konumu için bant sınırlı RMS hızı.' },
                { step: 'Bölgelere sınıflandır', detail: 'Her değer, makine sınıfı için ISO bölgesi A–D içine yerleştirilir.' },
                { step: 'Trendle ve alarm ver', detail: 'Değerler zamanla izlenir; sürekli yükselişler ve bölge geçişleri arızadan önce bayrak kaldırır.' },
            ],
            outputs: [
                { name: 'Sağlık panosu', desc: 'Her ölçüm noktasının bölge-renkli durumu tek bakışta.' },
                { name: 'Şiddet trendleri', desc: 'Değişim-hızı göstergeleriyle nokta başına RMS geçmişi.' },
                { name: 'İstisna listesi', desc: 'C/D bölgesindeki veya oraya yönelen noktalar — bakım öncelik kuyruğu.' },
            ],
        },
    },

    structural_health: {
        slug: 'structural-health-monitoring',
        en: {
            tagline: 'Watches a structure\'s modal fingerprint over months and years, separating genuine damage from weather and load effects.',
            intro:
                'Damage changes dynamics: a crack, a loosened joint or section loss lowers local stiffness, which drops natural frequencies, distorts mode shapes and often raises damping. SHM measures these modal parameters repeatedly — usually with output-only (OMA) identification under ambient excitation — and compares them against a healthy baseline. The hard part is that temperature, humidity and traffic mass also shift the parameters, so robust monitoring models the environmental influence statistically and alarms only on deviations the environment cannot explain.',
            inputs: [
                { name: 'Long-term response data', desc: 'Periodic or continuous accelerometer records from the monitored structure.' },
                { name: 'Healthy baseline', desc: 'Modal parameters and feature statistics captured in known-good condition.' },
                { name: 'Environment channels (optional)', desc: 'Temperature, humidity or load measurements to explain benign variation.' },
            ],
            formulas: [
                {
                    title: 'Stiffness sensitivity of frequency',
                    latex: '\\omega_n = \\sqrt{\\dfrac{k}{m}} \\quad\\Rightarrow\\quad \\dfrac{\\Delta f}{f} \\approx \\dfrac{1}{2}\\,\\dfrac{\\Delta k}{k}',
                    expr: 'ω_n = √(k/m)  →  Δf/f ≈ ½·Δk/k',
                    where: 'Why frequency tracking works: a stiffness loss Δk maps to half its relative size as a frequency drop. Small but consistent downward drifts across several modes are the classic damage pattern.',
                },
                {
                    title: 'Novelty detection (Mahalanobis distance)',
                    latex: 'D^{2} = (\\vec{x} - \\vec{\\mu})^{\\mathsf{T}}\\, \\Sigma^{-1}\\, (\\vec{x} - \\vec{\\mu})',
                    expr: 'D² = (x − μ)ᵀ · Σ⁻¹ · (x − μ)',
                    where: 'x = current feature vector (frequencies, shape metrics), μ, Σ = baseline mean and covariance including environmental scatter. D² beyond the training threshold flags a state the healthy history cannot explain.',
                },
                {
                    title: 'Shape-change check (MAC drop)',
                    latex: '1 - \\mathrm{MAC}(\\varphi_{\\mathrm{base}}, \\varphi_{\\mathrm{now}})',
                    expr: '1 − MAC(φ_base, φ_now)',
                    where: 'Frequencies locate that something changed; mode-shape deviation localizes where — the largest shape change concentrates near the damaged region.',
                },
            ],
            steps: [
                { step: 'Identify continuously', detail: 'Automated OMA extracts modal parameters from each monitoring window.' },
                { step: 'Normalize for environment', detail: 'Statistical models remove temperature/load-driven variation from the features.' },
                { step: 'Detect novelty', detail: 'Distance metrics against the baseline flag unexplained shifts.' },
                { step: 'Localize and report', detail: 'Mode-shape changes point at the affected region; trends feed the maintenance decision.' },
            ],
            outputs: [
                { name: 'Modal-parameter trends', desc: 'Frequencies and damping over months/years with environmental correction.' },
                { name: 'Damage indicators', desc: 'Novelty scores and alarms with confidence levels.' },
                { name: 'Localization hints', desc: 'Which modes and regions changed most.' },
            ],
        },
        tr: {
            tagline: 'Bir yapının modal parmak izini aylar ve yıllar boyunca izler; gerçek hasarı hava ve yük etkilerinden ayırır.',
            intro:
                'Hasar dinamiği değiştirir: bir çatlak, gevşeyen bir bağlantı veya kesit kaybı yerel rijitliği düşürür; bu doğal frekansları düşürür, mod şekillerini bozar ve çoğu zaman sönümü artırır. SHM bu modal parametreleri tekrar tekrar ölçer — genellikle ortam uyarması altında yalnızca-çıkış (OMA) tanımlamayla — ve sağlıklı bir referansla karşılaştırır. Zor kısım şudur: sıcaklık, nem ve trafik kütlesi de parametreleri kaydırır; bu yüzden sağlam bir izleme, çevresel etkiyi istatistiksel olarak modeller ve yalnızca çevrenin açıklayamadığı sapmalarda alarm verir.',
            inputs: [
                { name: 'Uzun süreli tepki verisi', desc: 'İzlenen yapıdan periyodik veya sürekli ivmeölçer kayıtları.' },
                { name: 'Sağlıklı referans', desc: 'Bilinen-iyi durumda yakalanmış modal parametreler ve öznitelik istatistikleri.' },
                { name: 'Çevre kanalları (opsiyonel)', desc: 'İyi huylu değişimi açıklamak için sıcaklık, nem veya yük ölçümleri.' },
            ],
            formulas: [
                {
                    title: 'Frekansın rijitlik duyarlılığı',
                    latex: '\\omega_n = \\sqrt{\\dfrac{k}{m}} \\quad\\Rightarrow\\quad \\dfrac{\\Delta f}{f} \\approx \\dfrac{1}{2}\\,\\dfrac{\\Delta k}{k}',
                    expr: 'ω_n = √(k/m)  →  Δf/f ≈ ½·Δk/k',
                    where: 'Frekans izlemenin işe yarama nedeni: Δk rijitlik kaybı, bağıl büyüklüğünün yarısı kadar frekans düşüşüne eşlenir. Birkaç modda küçük ama tutarlı aşağı sürüklenmeler klasik hasar desenidir.',
                },
                {
                    title: 'Yenilik tespiti (Mahalanobis uzaklığı)',
                    latex: 'D^{2} = (\\vec{x} - \\vec{\\mu})^{\\mathsf{T}}\\, \\Sigma^{-1}\\, (\\vec{x} - \\vec{\\mu})',
                    expr: 'D² = (x − μ)ᵀ · Σ⁻¹ · (x − μ)',
                    where: 'x = güncel öznitelik vektörü (frekanslar, şekil metrikleri), μ, Σ = çevresel saçılımı da içeren referans ortalaması ve kovaryansı. Eğitim eşiğini aşan D², sağlıklı geçmişin açıklayamadığı bir durumu işaretler.',
                },
                {
                    title: 'Şekil değişimi denetimi (MAC düşüşü)',
                    latex: '1 - \\mathrm{MAC}(\\varphi_{\\mathrm{base}}, \\varphi_{\\mathrm{now}})',
                    expr: '1 − MAC(φ_referans, φ_şimdi)',
                    where: 'Frekanslar bir şeyin değiştiğini saptar; mod şekli sapması nerede olduğunu konumlar — en büyük şekil değişimi hasarlı bölge yakınında yoğunlaşır.',
                },
            ],
            steps: [
                { step: 'Sürekli tanımla', detail: 'Otomatik OMA, her izleme penceresinden modal parametreleri çıkarır.' },
                { step: 'Çevreye göre normalleştir', detail: 'İstatistiksel modeller, sıcaklık/yük kaynaklı değişimi özniteliklerden ayıklar.' },
                { step: 'Yeniliği tespit et', detail: 'Referansa karşı uzaklık metrikleri açıklanamayan kaymaları işaretler.' },
                { step: 'Konumla ve raporla', detail: 'Mod şekli değişimleri etkilenen bölgeyi gösterir; trendler bakım kararını besler.' },
            ],
            outputs: [
                { name: 'Modal parametre trendleri', desc: 'Çevresel düzeltmeli, aylar/yıllar boyunca frekanslar ve sönüm.' },
                { name: 'Hasar göstergeleri', desc: 'Güven seviyeleriyle yenilik puanları ve alarmlar.' },
                { name: 'Konumlama ipuçları', desc: 'En çok değişen modlar ve bölgeler.' },
            ],
        },
    },

    torsional_vibration: {
        slug: 'torsional-vibration',
        en: {
            tagline: 'Measures the rotational vibration invisible to ordinary accelerometers — from the timing of encoder pulses to shaft twist and torsional orders.',
            intro:
                'Torsional vibration is the fluctuation of rotational speed riding on a shaft\'s mean rotation, driven by engine firing pulses, gear meshing or load variation. Lateral accelerometers cannot see it, yet it fatigues couplings, crankshafts and gear teeth. The measurement principle is timing: an encoder, zebra tape or toothed wheel produces pulses whose intervals encode the instantaneous angular speed. Missing-tooth wheels (like a 60-2 crank trigger) are decoded for absolute angle, two encoders on one shaft give dynamic twist and torque, and expressing the result as torsional orders names the excitation source.',
            inputs: [
                { name: 'Pulse channel(s)', desc: 'Encoder, zebra-tape or gear-tooth pulse trains, timestamped at high resolution.' },
                { name: 'Wheel definition', desc: 'Pulse count per revolution and missing-tooth pattern for absolute-angle decoding.' },
                { name: 'Shaft properties (optional)', desc: 'Shear modulus, polar moment and length for twist→torque conversion.' },
            ],
            formulas: [
                {
                    title: 'Instantaneous angular speed from pulse timing',
                    latex: '\\omega_i = \\dfrac{2\\pi / z}{\\Delta t_i}',
                    expr: 'ω_i = (2π/z) / Δt_i',
                    where: 'z = pulses per revolution, Δt_i = measured interval between consecutive pulse edges. Each interval is one speed sample — timing resolution, not sample rate, sets the accuracy.',
                },
                {
                    title: 'Dynamic twist between two encoders',
                    latex: '\\Delta\\varphi(t) = \\varphi_1(t) - \\varphi_2(t)',
                    expr: 'Δφ(t) = φ₁(t) − φ₂(t)',
                    where: 'The relative angle between the shaft ends, after removing the mean. This is the torsional deformation the shaft actually experiences cycle by cycle.',
                },
                {
                    title: 'Twist → torque',
                    latex: 'T = \\dfrac{G\\, J}{L}\\, \\Delta\\varphi',
                    expr: 'T = (G·J / L) · Δφ',
                    where: 'G = shear modulus, J = polar moment of inertia, L = length between encoders. Converts measured twist into transmitted dynamic torque and torsional stress.',
                },
                {
                    title: 'Torsional order spectrum',
                    latex: '\\Theta(O) = \\mathrm{FFT}\\bigl\\{ \\omega(\\theta) \\bigr\\}, \\qquad O = \\text{multiples of shaft speed}',
                    expr: 'Θ(O) = FFT{ ω(θ) } over revolutions',
                    where: 'Angular speed resampled per revolution and transformed gives amplitude per order: firing orders of an engine, mesh orders of a gearbox — identifying which source drives the torsional resonance.',
                },
            ],
            steps: [
                { step: 'Capture pulse timing', detail: 'High-resolution timestamps of every pulse edge, with glitch rejection.' },
                { step: 'Decode angle and speed', detail: 'Missing-tooth patterns give absolute angle; intervals give instantaneous speed.' },
                { step: 'Compute twist and torque', detail: 'Two-encoder phase difference becomes dynamic twist, scaled to torque if geometry is known.' },
                { step: 'Order analysis', detail: 'Speed fluctuation is transformed into the torsional order spectrum and tracked against RPM.' },
            ],
            outputs: [
                { name: 'Speed fluctuation waveform', desc: 'Instantaneous angular speed and its variation per revolution.' },
                { name: 'Twist & dynamic torque', desc: 'Relative angle between shaft ends, converted to torque.' },
                { name: 'Torsional order spectrum', desc: 'Amplitude per order with resonance crossings versus speed.' },
            ],
        },
        tr: {
            tagline: 'Sıradan ivmeölçerlere görünmeyen dönel titreşimi ölçer — enkoder darbelerinin zamanlamasından mil burulmasına ve burulma orderlarına.',
            intro:
                'Burulma titreşimi, milin ortalama dönüşü üzerine binen dönme hızı dalgalanmasıdır; motor ateşleme darbeleri, dişli kavraması veya yük değişimi tarafından sürülür. Yanal ivmeölçerler onu göremez; ama kaplinleri, krank millerini ve dişli dişlerini yorar. Ölçüm ilkesi zamanlamadır: bir enkoder, zebra bant veya dişli çark, aralıkları anlık açısal hızı kodlayan darbeler üretir. Eksik dişli çarklar (60-2 krank tetiği gibi) mutlak açı için çözümlenir, tek mildeki iki enkoder dinamik burulmayı ve torku verir, sonucun burulma orderları olarak ifade edilmesi ise uyarma kaynağını adlandırır.',
            inputs: [
                { name: 'Darbe kanal(lar)ı', desc: 'Yüksek çözünürlükte zaman damgalı enkoder, zebra bant veya dişli darbe dizileri.' },
                { name: 'Çark tanımı', desc: 'Mutlak açı çözümü için devir başına darbe sayısı ve eksik diş deseni.' },
                { name: 'Mil özellikleri (opsiyonel)', desc: 'Burulma→tork dönüşümü için kayma modülü, polar atalet momenti ve uzunluk.' },
            ],
            formulas: [
                {
                    title: 'Darbe zamanlamasından anlık açısal hız',
                    latex: '\\omega_i = \\dfrac{2\\pi / z}{\\Delta t_i}',
                    expr: 'ω_i = (2π/z) / Δt_i',
                    where: 'z = devir başına darbe sayısı, Δt_i = ardışık darbe kenarları arasındaki ölçülen aralık. Her aralık bir hız örneğidir — doğruluğu örnekleme hızı değil, zamanlama çözünürlüğü belirler.',
                },
                {
                    title: 'İki enkoder arası dinamik burulma',
                    latex: '\\Delta\\varphi(t) = \\varphi_1(t) - \\varphi_2(t)',
                    expr: 'Δφ(t) = φ₁(t) − φ₂(t)',
                    where: 'Ortalama çıkarıldıktan sonra mil uçları arasındaki bağıl açı. Bu, milin çevrim çevrim gerçekte yaşadığı burulma deformasyonudur.',
                },
                {
                    title: 'Burulma → tork',
                    latex: 'T = \\dfrac{G\\, J}{L}\\, \\Delta\\varphi',
                    expr: 'T = (G·J / L) · Δφ',
                    where: 'G = kayma modülü, J = polar atalet momenti, L = enkoderler arası uzunluk. Ölçülen burulmayı iletilen dinamik torka ve burulma gerilmesine çevirir.',
                },
                {
                    title: 'Burulma order spektrumu',
                    latex: '\\Theta(O) = \\mathrm{FFT}\\bigl\\{ \\omega(\\theta) \\bigr\\}, \\qquad O = \\text{mil hızının katları}',
                    expr: 'Θ(O) = devirler üzerinde FFT{ ω(θ) }',
                    where: 'Devir başına yeniden örneklenen ve dönüştürülen açısal hız, order başına genlik verir: bir motorun ateşleme orderları, bir dişli kutusunun kavrama orderları — burulma rezonansını hangi kaynağın sürdüğünü belirler.',
                },
            ],
            steps: [
                { step: 'Darbe zamanlamasını yakala', detail: 'Her darbe kenarının yüksek çözünürlüklü zaman damgaları, hata (glitch) ayıklamalı.' },
                { step: 'Açı ve hızı çöz', detail: 'Eksik diş desenleri mutlak açıyı, aralıklar anlık hızı verir.' },
                { step: 'Burulma ve torku hesapla', detail: 'İki-enkoder faz farkı dinamik burulmaya dönüşür; geometri biliniyorsa torka ölçeklenir.' },
                { step: 'Order analizi', detail: 'Hız dalgalanması burulma order spektrumuna dönüştürülür ve devre karşı izlenir.' },
            ],
            outputs: [
                { name: 'Hız dalgalanması dalga formu', desc: 'Anlık açısal hız ve devir başına değişimi.' },
                { name: 'Burulma & dinamik tork', desc: 'Mil uçları arasındaki bağıl açı, torka çevrilmiş.' },
                { name: 'Burulma order spektrumu', desc: 'Hıza karşı rezonans kesişimleriyle order başına genlik.' },
            ],
        },
    },
}

export default VIBRATION_WIDGET_DETAILS
