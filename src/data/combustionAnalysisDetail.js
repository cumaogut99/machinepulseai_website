// ─────────────────────────────────────────────────────────────────────────────
// Deep-dive content for the "Advanced Combustion Analysis" widget.
// Rendered by src/components/CombustionAnalysisDetail.jsx at the route
// /widgets/combustion-analysis. Bilingual (en/tr) following the same
// content-in-data pattern as widgetCatalog.engineering.js — the surrounding
// chrome labels (section titles, table headers) come from i18n via t().
//
// Formulas are plain unicode strings so the page stays fully self-contained
// (no external math renderer), matching the site's dependency-light approach.
// ─────────────────────────────────────────────────────────────────────────────

const COMBUSTION_ANALYSIS_DETAIL = {
    en: {
        eyebrow: 'Thermodynamics & Fluids · Deep Dive',
        name: 'Advanced Combustion Analysis',
        tagline:
            'In-cylinder combustion diagnostics from a crank-angle-resolved pressure trace — the same indicating workflow used by AVL IndiCom-class systems, rebuilt for offline post-processing.',
        intro:
            'This module reconstructs how every combustion cycle burns from a single high-speed pressure signal sampled against crank angle. It turns raw indicated pressure into the pressure–volume loop, the rate of heat release, the mass-fraction-burned phasing angles, knock intensity and cycle-to-cycle stability. Below is exactly which test-data channels feed the analysis, the formulas applied at each stage, the order of operations, and the outputs you get back.',

        // ── Input channels ──────────────────────────────────────────────────
        channels: [
            {
                name: 'Cylinder Pressure  p(θ)',
                unit: 'bar / MPa',
                source: 'Piezoelectric transducer + charge amplifier, per cylinder',
                usage:
                    'The core signal. Sampled crank-angle-based (typically 0.1–1.0° resolution) it drives every downstream result: the p–V loop, IMEP, heat release, peak pressure, knock and COV. It is first drift-corrected and pegged to an absolute reference (see pipeline step 2).',
            },
            {
                name: 'Crank Angle  θ  (shaft encoder)',
                unit: '° CA',
                source: 'Optical encoder (e.g. 720 ppr) + once-per-cycle TDC marker',
                usage:
                    'Provides the angle base every pressure sample is tied to, segments the stream into individual 720° cycles, and — through the slider-crank geometry — defines the instantaneous cylinder volume V(θ). An accurate TDC reference is critical: a 0.1° error in TDC shifts IMEP and heat-release results by several percent.',
            },
            {
                name: 'Engine Speed  N',
                unit: 'rpm',
                source: 'Derived from encoder edge timing (or a tacho channel)',
                usage:
                    'Converts between the time and angle domains, sets the mean piston speed, and lets per-cycle metrics be reported against operating point. Also used to flag speed drift across the captured cycles.',
            },
            {
                name: 'Intake Manifold Pressure  p_man (MAP)',
                unit: 'kPa / bar',
                source: 'Absolute piezoresistive sensor in the intake plenum',
                usage:
                    'Reference for pressure pegging — the piezo pressure signal is relative, so its absolute level is fixed by forcing p(θ) at intake BDC to equal the measured manifold pressure. Also records engine load for each operating point.',
            },
            {
                name: 'Charge Temp. / Lambda / Fuel Flow',
                unit: '°C · λ · kg/h',
                source: 'Intake thermocouple, wideband O₂, fuel meter (optional)',
                usage:
                    'Optional. Used only for the full first-law heat-release variant: they set the temperature-dependent ratio of specific heats γ(T) and the total injected fuel energy, which together yield combustion efficiency. Without them the analysis falls back to the simplified apparent-heat-release model.',
            },
        ],

        // ── Geometry constants (metadata, not channels) ─────────────────────
        geometryNote:
            'Engine geometry is supplied once as metadata, not as a channel: bore B, stroke S, connecting-rod length l, compression ratio r_c, and the number of cylinders. These define the volume curve used everywhere below.',

        // ── Formulas ────────────────────────────────────────────────────────
        formulas: [
            {
                title: 'Cylinder volume from crank angle (slider-crank)',
                expr: 'V(θ) = V_c + (V_d / 2) · [ R + 1 − cos θ − √(R² − sin²θ) ]',
                where: 'V_d = (π/4)·B²·S  (swept volume);  V_c = V_d /(r_c − 1)  (clearance volume);  R = l /(S/2)  (rod ratio). Converts the encoder angle into the instantaneous volume that every p–V and work calculation needs.',
            },
            {
                title: 'Pressure pegging (absolute referencing)',
                expr: 'p_abs(θ) = p_meas(θ) + [ p_man − p_meas(θ_ref) ]',
                where: 'θ_ref is taken near intake BDC where cylinder pressure ≈ manifold pressure. Removes the unknown DC offset of the piezo signal so absolute-pressure results (IMEP, HRR) are valid.',
            },
            {
                title: 'Indicated work & IMEP',
                expr: 'W_i = ∮ p dV     IMEP = W_i / V_d',
                where: 'The closed p–V loop area is the indicated work per cycle; dividing by swept volume gives the load-normalised IMEP. Net IMEP integrates the full 720°; gross IMEP uses only the 360° compression + expansion loop.',
            },
            {
                title: 'Heat release rate — first law (single-zone)',
                expr: 'dQ_n/dθ = (γ /(γ−1))·p·(dV/dθ) + (1 /(γ−1))·V·(dp/dθ)',
                where: 'γ is the ratio of specific heats (≈1.30–1.35, or γ(T) with the optional channels). Gives the apparent net heat-release rate — when and how fast fuel energy is released.',
            },
            {
                title: 'Rassweiler–Withrow (fast alternative)',
                expr: 'Δp_comb,i = p_i − p_(i−1)·(V_(i−1)/V_i)^n',
                where: 'Separates the pressure rise due to combustion from that due to volume change using the polytropic exponent n. Summing Δp_comb gives a mass-fraction-burned estimate without a full energy balance — robust and computationally cheap.',
            },
            {
                title: 'Mass fraction burned & phasing angles',
                expr: 'MFB(θ) = [Q(θ) − Q_soc] / [Q_eoc − Q_soc]',
                where: 'Q(θ) = ∫ (dQ_n/dθ) dθ is cumulative heat release. CA10, CA50, CA90 are the crank angles where MFB = 0.10, 0.50, 0.90. Burn duration = CA90 − CA10; CA50 near the optimum after TDC indicates well-phased combustion.',
            },
            {
                title: 'Knock intensity (MAPO)',
                expr: 'MAPO = max | HP-filter( p(θ) ) |  ,  band ≈ 4–20 kHz',
                where: 'The pressure trace is band-pass/high-pass filtered inside a knock window; the Maximum Amplitude of Pressure Oscillation quantifies knock. A cycle is flagged as knocking when MAPO exceeds the calibrated threshold.',
            },
            {
                title: 'Cyclic variation of IMEP',
                expr: 'COV_IMEP = (σ_IMEP / μ_IMEP) · 100 %',
                where: 'Standard deviation of IMEP over many cycles divided by its mean. A primary measure of combustion stability, drivability and lean-limit margin (typically kept below ~5–10%).',
            },
            {
                title: 'Polytropic exponent (compression / expansion)',
                expr: 'log p = −n · log V + C   →   fit n',
                where: 'A straight-line fit on the log p – log V plot over the compression and expansion strokes returns the polytropic exponents, which reveal heat transfer and cylinder sealing versus the ideal adiabatic value.',
            },
        ],

        // ── Processing pipeline ─────────────────────────────────────────────
        pipeline: [
            {
                step: 'Cycle segmentation',
                detail:
                    'The encoder TDC marker splits the continuous pressure stream into individual 720° engine cycles and locates top dead centre for each.',
            },
            {
                step: 'Pressure conditioning & pegging',
                detail:
                    'Drift/offset removal, optional cycle averaging, then absolute pegging against manifold pressure at intake BDC.',
            },
            {
                step: 'Volume reconstruction',
                detail:
                    'The slider-crank formula builds V(θ) from geometry so each pressure sample has a matching volume — the basis of the p–V loop.',
            },
            {
                step: 'Work & IMEP integration',
                detail:
                    'The p–V loop is integrated to indicated work, normalised to net and gross IMEP.',
            },
            {
                step: 'Heat release & MFB',
                detail:
                    'Differentiating pressure gives the heat-release rate; integrating it gives cumulative heat and the mass-fraction-burned curve, from which CA10/50/90 are read.',
            },
            {
                step: 'Knock & stability',
                detail:
                    'Band-pass filtering yields MAPO and a knock flag per cycle; IMEP across all cycles yields the COV and cyclic-dispersion statistics.',
            },
        ],

        // ── Outputs ─────────────────────────────────────────────────────────
        outputs: [
            { name: 'p–V diagram', desc: 'Linear and log-log pressure–volume loops per cycle and averaged.' },
            { name: 'IMEP (net & gross)', desc: 'Per-cycle and mean indicated mean effective pressure.' },
            { name: 'Heat release rate', desc: 'dQ/dθ curve — apparent (first-law) or Rassweiler–Withrow.' },
            { name: 'Cumulative heat release', desc: 'Integrated Q(θ) over the combustion event.' },
            { name: 'Mass fraction burned', desc: 'MFB curve with CA10 / CA50 / CA90 and burn durations.' },
            { name: 'Peak pressure & rise rate', desc: 'p_max and its crank location, plus max (dp/dθ) roughness metric.' },
            { name: 'Knock intensity', desc: 'MAPO per cycle, knock flag and knock frequency across the run.' },
            { name: 'COV of IMEP', desc: 'Cycle-to-cycle stability and dispersion statistics.' },
            { name: 'Polytropic exponents', desc: 'Compression and expansion n values versus the adiabatic ideal.' },
            { name: 'Phasing summary table', desc: 'Per-cylinder combustion phasing and load metrics for reporting.' },
        ],
    },

    tr: {
        eyebrow: 'Termodinamik ve Akışkanlar · Derinlemesine',
        name: 'Gelişmiş Yanma Analizi',
        tagline:
            'Krank açısına göre çözümlenmiş bir basınç izinden silindir-içi yanma teşhisi — AVL IndiCom sınıfı indikasyon sistemlerinin kullandığı iş akışının, çevrimdışı son-işleme için yeniden kurgulanmış hâli.',
        intro:
            'Bu modül, krank açısına karşı örneklenen tek bir yüksek-hızlı basınç sinyalinden her yanma çevriminin nasıl yandığını yeniden kurar. Ham indike basıncı; basınç–hacim çevrimine, ısı salınım hızına, yanan kütle kesri fazlama açılarına, vuruntu şiddetine ve çevrimden çevrime kararlılığa dönüştürür. Aşağıda tam olarak hangi test-verisi kanallarının analize girdiği, her aşamada uygulanan formüller, işlem sırası ve elde ettiğiniz çıktılar yer alıyor.',

        channels: [
            {
                name: 'Silindir Basıncı  p(θ)',
                unit: 'bar / MPa',
                source: 'Piezoelektrik dönüştürücü + yük yükselteci, silindir başına',
                usage:
                    'Çekirdek sinyal. Krank açısı tabanlı örneklenir (tipik 0,1–1,0° çözünürlük) ve tüm sonraki sonuçları sürer: p–V çevrimi, IMEP, ısı salınımı, tepe basıncı, vuruntu ve COV. Önce sürüklenme (drift) düzeltilir ve mutlak referansa sabitlenir (pegleme — bkz. hat adımı 2).',
            },
            {
                name: 'Krank Açısı  θ  (mil enkoderi)',
                unit: '° KA',
                source: 'Optik enkoder (örn. 720 ppr) + çevrim başına bir ÜÖN işareti',
                usage:
                    'Her basınç örneğinin bağlandığı açı tabanını sağlar, akışı ayrı 720°lik çevrimlere böler ve biyel-krank geometrisi aracılığıyla anlık silindir hacmi V(θ)’yi tanımlar. Doğru bir ÜÖN referansı kritiktir: ÜÖN’de 0,1°lik bir hata IMEP ve ısı-salınımı sonuçlarını yüzde birkaç kaydırır.',
            },
            {
                name: 'Motor Hızı  N',
                unit: 'dev/dk',
                source: 'Enkoder kenar zamanlamasından türetilir (veya takometre kanalı)',
                usage:
                    'Zaman ve açı düzlemleri arasında dönüşüm yapar, ortalama piston hızını belirler ve çevrim-başına metriklerin çalışma noktasına göre raporlanmasını sağlar. Ayrıca kaydedilen çevrimler boyunca hız sürüklenmesini işaretlemekte kullanılır.',
            },
            {
                name: 'Emme Manifold Basıncı  p_man (MAP)',
                unit: 'kPa / bar',
                source: 'Emme plenumunda mutlak piezorezistif sensör',
                usage:
                    'Basınç peglemesi için referans — piezo basınç sinyali görecelidir, bu yüzden mutlak seviyesi, emme AÖN’de p(θ)’yi ölçülen manifold basıncına eşitleyerek sabitlenir. Ayrıca her çalışma noktası için motor yükünü kaydeder.',
            },
            {
                name: 'Dolgu Sıcaklığı / Lambda / Yakıt Debisi',
                unit: '°C · λ · kg/s',
                source: 'Emme termokuplu, geniş-bant O₂, yakıt sayacı (opsiyonel)',
                usage:
                    'Opsiyonel. Yalnızca tam birinci-yasa ısı-salınımı varyantı için kullanılır: sıcaklığa bağlı özgül ısı oranı γ(T)’yi ve toplam enjekte edilen yakıt enerjisini belirler; bunlar birlikte yanma verimini verir. Bunlar olmadan analiz, basitleştirilmiş görünür-ısı-salınımı modeline döner.',
            },
        ],

        geometryNote:
            'Motor geometrisi kanal olarak değil, bir kez meta-veri olarak verilir: çap B, strok S, biyel kolu uzunluğu l, sıkıştırma oranı r_c ve silindir sayısı. Bunlar aşağıdaki her yerde kullanılan hacim eğrisini tanımlar.',

        formulas: [
            {
                title: 'Krank açısından silindir hacmi (biyel-krank)',
                expr: 'V(θ) = V_c + (V_d / 2) · [ R + 1 − cos θ − √(R² − sin²θ) ]',
                where: 'V_d = (π/4)·B²·S  (süpürme hacmi);  V_c = V_d /(r_c − 1)  (ölü hacim);  R = l /(S/2)  (biyel oranı). Enkoder açısını, tüm p–V ve iş hesaplarının gerektirdiği anlık hacme çevirir.',
            },
            {
                title: 'Basınç peglemesi (mutlak referanslama)',
                expr: 'p_abs(θ) = p_ölçülen(θ) + [ p_man − p_ölçülen(θ_ref) ]',
                where: 'θ_ref, silindir basıncının ≈ manifold basıncına eşit olduğu emme AÖN yakınında alınır. Piezo sinyalinin bilinmeyen DC ofsetini kaldırır, böylece mutlak-basınç sonuçları (IMEP, HRR) geçerli olur.',
            },
            {
                title: 'İndike iş & IMEP',
                expr: 'W_i = ∮ p dV     IMEP = W_i / V_d',
                where: 'Kapalı p–V çevriminin alanı çevrim başına indike iştir; süpürme hacmine bölmek yük-normalize IMEP’i verir. Net IMEP tam 720°yi, brüt IMEP yalnızca 360°lik sıkıştırma + genleşme çevrimini integre eder.',
            },
            {
                title: 'Isı salınım hızı — birinci yasa (tek-bölge)',
                expr: 'dQ_n/dθ = (γ /(γ−1))·p·(dV/dθ) + (1 /(γ−1))·V·(dp/dθ)',
                where: 'γ özgül ısı oranıdır (≈1,30–1,35 veya opsiyonel kanallarla γ(T)). Görünür net ısı-salınım hızını verir — yakıt enerjisinin ne zaman ve ne kadar hızlı açığa çıktığını.',
            },
            {
                title: 'Rassweiler–Withrow (hızlı alternatif)',
                expr: 'Δp_yanma,i = p_i − p_(i−1)·(V_(i−1)/V_i)^n',
                where: 'Yanmadan kaynaklanan basınç artışını, hacim değişiminden kaynaklanandan politropik üs n kullanarak ayırır. Δp_yanma’nın toplamı, tam bir enerji dengesi olmadan yanan-kütle-kesri tahmini verir — gürbüz ve hesaplama açısından ucuz.',
            },
            {
                title: 'Yanan kütle kesri & fazlama açıları',
                expr: 'MFB(θ) = [Q(θ) − Q_soc] / [Q_eoc − Q_soc]',
                where: 'Q(θ) = ∫ (dQ_n/dθ) dθ birikimli ısı salınımıdır. CA10, CA50, CA90 sırasıyla MFB = 0,10, 0,50, 0,90 olan krank açılarıdır. Yanma süresi = CA90 − CA10; ÜÖN sonrası optimuma yakın bir CA50 iyi fazlanmış yanmaya işaret eder.',
            },
            {
                title: 'Vuruntu şiddeti (MAPO)',
                expr: 'MAPO = maks | YG-filtre( p(θ) ) |  ,  bant ≈ 4–20 kHz',
                where: 'Basınç izi bir vuruntu penceresi içinde bant-geçiren/yüksek-geçiren filtrelenir; Maksimum Basınç Salınım Genliği vuruntuyu niceler. MAPO kalibre eşiği aştığında çevrim vuruntulu olarak işaretlenir.',
            },
            {
                title: 'IMEP’in çevrimsel değişimi',
                expr: 'COV_IMEP = (σ_IMEP / μ_IMEP) · %100',
                where: 'IMEP’in çok sayıda çevrim üzerindeki standart sapmasının ortalamasına oranı. Yanma kararlılığının, sürüş kalitesinin ve fakir-sınır marjının temel ölçüsü (tipik olarak ~%5–10 altında tutulur).',
            },
            {
                title: 'Politropik üs (sıkıştırma / genleşme)',
                expr: 'log p = −n · log V + C   →   n uydur',
                where: 'log p – log V grafiğinde sıkıştırma ve genleşme stroklarına doğru-çizgi uydurması politropik üsleri verir; bunlar ideal adyabatik değere kıyasla ısı transferini ve silindir sızdırmazlığını ortaya koyar.',
            },
        ],

        pipeline: [
            {
                step: 'Çevrim bölütleme',
                detail:
                    'Enkoder ÜÖN işareti, sürekli basınç akışını ayrı 720°lik motor çevrimlerine böler ve her biri için üst ölü noktayı bulur.',
            },
            {
                step: 'Basınç koşullama & pegleme',
                detail:
                    'Sürüklenme/ofset kaldırma, opsiyonel çevrim ortalaması, ardından emme AÖN’de manifold basıncına karşı mutlak pegleme.',
            },
            {
                step: 'Hacim yeniden kurulumu',
                detail:
                    'Biyel-krank formülü, geometriden V(θ)’yi kurar; böylece her basınç örneğinin eşleşen bir hacmi olur — p–V çevriminin temeli.',
            },
            {
                step: 'İş & IMEP integrasyonu',
                detail:
                    'p–V çevrimi indike işe integre edilir, net ve brüt IMEP’e normalize edilir.',
            },
            {
                step: 'Isı salınımı & MFB',
                detail:
                    'Basıncın türevi ısı-salınım hızını verir; integrali birikimli ısıyı ve yanan-kütle-kesri eğrisini verir; bunlardan CA10/50/90 okunur.',
            },
            {
                step: 'Vuruntu & kararlılık',
                detail:
                    'Bant-geçiren filtreleme çevrim başına MAPO ve vuruntu işareti verir; tüm çevrimlerdeki IMEP ise COV ve çevrimsel-dağılım istatistiklerini verir.',
            },
        ],

        outputs: [
            { name: 'p–V diyagramı', desc: 'Çevrim başına ve ortalanmış lineer ve log-log basınç–hacim çevrimleri.' },
            { name: 'IMEP (net & brüt)', desc: 'Çevrim-başına ve ortalama indike ortalama etkin basınç.' },
            { name: 'Isı salınım hızı', desc: 'dQ/dθ eğrisi — görünür (birinci-yasa) veya Rassweiler–Withrow.' },
            { name: 'Birikimli ısı salınımı', desc: 'Yanma olayı boyunca integre edilmiş Q(θ).' },
            { name: 'Yanan kütle kesri', desc: 'CA10 / CA50 / CA90 ve yanma süreleriyle MFB eğrisi.' },
            { name: 'Tepe basıncı & artış hızı', desc: 'p_max ve krank konumu, ayrıca maks (dp/dθ) sertlik metriği.' },
            { name: 'Vuruntu şiddeti', desc: 'Çevrim başına MAPO, vuruntu işareti ve koşu boyunca vuruntu frekansı.' },
            { name: 'IMEP’in COV’u', desc: 'Çevrimden çevrime kararlılık ve dağılım istatistikleri.' },
            { name: 'Politropik üsler', desc: 'Adyabatik ideale karşı sıkıştırma ve genleşme n değerleri.' },
            { name: 'Fazlama özet tablosu', desc: 'Raporlama için silindir-başına yanma fazlaması ve yük metrikleri.' },
        ],
    },
}

export default COMBUSTION_ANALYSIS_DETAIL
