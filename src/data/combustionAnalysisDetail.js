// Deep-dive content for the "Advanced Combustion Analysis" widget.
// Rendered by src/components/CombustionAnalysisDetail.jsx at
// /widgets/combustion-analysis.

const COMBUSTION_ANALYSIS_DETAIL = {
    en: {
        eyebrow: 'Thermodynamics & Fluids · Deep Dive',
        name: 'Advanced Combustion Analysis',
        tagline:
            'Turns an in-cylinder pressure trace into the numbers engine teams use to judge combustion quality: IMEP, heat release, CA10/50/90, knock and cycle stability.',
        intro:
            'For an engine team, the in-cylinder pressure trace is more than a curve. It is a record of how each cycle breathes, compresses, burns and expands. MachinePulseAI takes that crank-angle pressure data and turns it into clear engineering results: the pressure-volume loop, indicated work, heat-release timing, burn duration, knock intensity and cycle stability. Engineers can compare cylinders, operating points and calibration changes without rebuilding the same spreadsheet workflow for every test.',

        channels: [
            {
                role: 'Required',
                name: 'Cylinder Pressure  p(θ)',
                unit: 'bar / MPa',
                source: 'Piezoelectric pressure transducer and charge amplifier, usually one channel per cylinder',
                usage:
                    'This is the main signal. It shows how pressure rises and falls during each engine cycle. The module uses it to calculate the p-V loop, IMEP, heat-release rate, peak pressure, knock intensity and cycle-to-cycle variation. Because piezo sensors do not give a perfect absolute pressure level by themselves, the trace is conditioned and pegged before the main calculations.',
            },
            {
                role: 'Required',
                name: 'Crank Angle  θ',
                unit: '° CA',
                source: 'Shaft encoder with a once-per-cycle TDC marker',
                usage:
                    'Crank angle tells the software where each pressure sample belongs in the engine cycle. It is also used to split the recording into individual 720° cycles. The TDC reference matters a lot: even a small angle error can move the heat-release curve and shift IMEP results.',
            },
            {
                role: 'Recommended',
                name: 'Engine Speed  N',
                unit: 'rpm',
                source: 'Derived from encoder timing or supplied as a tacho channel',
                usage:
                    'Speed lets results be tied to an operating point. It also helps detect whether the run was steady enough for averaging, or whether the engine drifted during the captured cycles.',
            },
            {
                role: 'Recommended',
                name: 'Intake Manifold Pressure  p_man (MAP)',
                unit: 'kPa / bar',
                source: 'Absolute pressure sensor in the intake plenum',
                usage:
                    'Used as the reference for pressure pegging. Near intake BDC, cylinder pressure is expected to be close to manifold pressure, so the measured pressure trace can be shifted onto an absolute pressure scale.',
            },
            {
                role: 'Optional',
                name: 'Charge Temperature / Lambda / Fuel Flow',
                unit: '°C · λ · kg/h',
                source: 'Intake temperature sensor, wideband O₂ sensor and fuel-flow meter',
                usage:
                    'Used when a fuller first-law heat-release estimate is needed. These channels help estimate gas properties and fuel energy. If they are not available, the module can still report apparent heat release and combustion phasing from pressure and geometry.',
            },
        ],

        geometryLabel: 'Metadata',
        geometryNote:
            'Engine geometry is entered once as metadata: bore, stroke, connecting-rod length, compression ratio and cylinder count. These values define the cylinder volume curve V(θ). They are not measured channels, but the calculations depend on them.',

        formulas: [
            {
                title: 'Cylinder volume from crank angle',
                expr: 'V(θ) = V_c + (V_d / 2) · [ R + 1 − cos θ − √(R² − sin²θ) ]',
                where:
                    'This converts crank angle into cylinder volume. Bore and stroke define the swept volume, compression ratio defines the clearance volume, and rod length shapes the curve near TDC. Once V(θ) is known, pressure can be plotted against volume and integrated.',
            },
            {
                title: 'Pressure pegging',
                expr: 'p_abs(θ) = p_meas(θ) + [ p_man − p_meas(θ_ref) ]',
                where:
                    'Piezo pressure traces often have an offset. Pegging shifts the measured trace so that it matches a known pressure reference, usually manifold pressure near intake BDC. This step is small in code but important in practice.',
            },
            {
                title: 'Indicated work and IMEP',
                expr: 'W_i = ∮ p dV     IMEP = W_i / V_d',
                where:
                    'The area inside the p-V loop is the indicated work for one cycle. Dividing by swept volume gives IMEP, a convenient load number that can be compared between cylinders, operating points and engines.',
            },
            {
                title: 'Heat-release rate',
                expr: 'dQ_n/dθ = (γ /(γ−1))·p·(dV/dθ) + (1 /(γ−1))·V·(dp/dθ)',
                where:
                    'This single-zone first-law estimate uses pressure, volume and their crank-angle derivatives. It answers a practical question: at which crank angles is the fuel energy being released, and how quickly?',
            },
            {
                title: 'Rassweiler-Withrow pressure-rise method',
                expr: 'Δp_comb,i = p_i − p_(i−1)·(V_(i−1)/V_i)^n',
                where:
                    'This method separates pressure rise caused by combustion from pressure change caused by piston motion. It is useful when engineers need reliable burn phasing without building a full thermodynamic model for every comparison.',
            },
            {
                title: 'Mass fraction burned and phasing angles',
                expr: 'MFB(θ) = [Q(θ) − Q_soc] / [Q_eoc − Q_soc]',
                where:
                    'The cumulative heat-release curve is scaled from 0 to 1. CA10, CA50 and CA90 are the crank angles where 10%, 50% and 90% of the burn has occurred. These values are easier to compare than a full curve.',
            },
            {
                title: 'Knock intensity (MAPO)',
                expr: 'MAPO = max | HP-filter( p(θ) ) |  ,  band ≈ 4–20 kHz',
                where:
                    'Knock appears as high-frequency pressure oscillation after combustion starts. The module filters the pressure trace inside a knock window and reports the maximum oscillation amplitude for each cycle.',
            },
            {
                title: 'Cycle-to-cycle variation',
                expr: 'COV_IMEP = (σ_IMEP / μ_IMEP) · 100 %',
                where:
                    'COV of IMEP shows how repeatable the cycles are. A low value means stable combustion; a rising value usually points to misfire tendency, lean-limit operation, mixture issues or unstable ignition.',
            },
            {
                title: 'Polytropic exponent',
                expr: 'log p = −n · log V + C   →   fit n',
                where:
                    'Fitting the compression and expansion strokes on a log p versus log V plot gives the polytropic exponent. It is a useful sanity check for heat transfer, leakage and pressure referencing.',
            },
        ],

        assumptions: [
            {
                name: 'TDC alignment must be trustworthy',
                desc:
                    'The module can calculate very detailed results, but it cannot hide a bad TDC reference. A small angle offset can move CA50, heat-release timing and IMEP.',
            },
            {
                name: 'Pressure pegging is an engineering approximation',
                desc:
                    'Using manifold pressure near intake BDC is common, but it assumes the selected reference point is physically reasonable for the engine and operating condition.',
            },
            {
                name: 'Single-zone heat release is not a full CFD model',
                desc:
                    'It is designed for fast diagnostics and comparison between tests. It does not resolve spatial temperature, flame shape or local mixture differences inside the cylinder.',
            },
            {
                name: 'Knock thresholds need calibration',
                desc:
                    'MAPO is useful, but the pass/fail threshold depends on engine family, sensor mounting, pressure ringing and the chosen knock window.',
            },
        ],

        pipeline: [
            {
                step: 'Split the recording into cycles',
                detail:
                    'The crank-angle signal and TDC marker divide the pressure trace into individual 720° cycles. This gives the module one comparable pressure curve per cycle.',
            },
            {
                step: 'Clean and reference the pressure trace',
                detail:
                    'The signal is checked for offset, drift and obvious bad cycles, then pegged to an absolute pressure reference before work and heat-release calculations begin.',
            },
            {
                step: 'Build the cylinder volume curve',
                detail:
                    'Engine geometry is used to calculate V(θ), so every pressure sample has a matching volume sample.',
            },
            {
                step: 'Calculate work and load metrics',
                detail:
                    'The p-V loop is integrated to get indicated work. IMEP is then reported per cycle, per cylinder and as an average.',
            },
            {
                step: 'Estimate heat release and burn phasing',
                detail:
                    'The module calculates heat-release rate, cumulative heat release and MFB, then reads CA10, CA50 and CA90 from the burn curve.',
            },
            {
                step: 'Check knock and stability',
                detail:
                    'High-frequency pressure oscillations are summarized as MAPO. IMEP variation across cycles is summarized as COV and dispersion statistics.',
            },
        ],

        exampleMetrics: [
            {
                value: 'CA50 = 8.2° aTDC',
                label: 'Combustion phasing',
                desc: 'Half of the fuel energy is released shortly after top dead centre, which is usually close to the efficient operating window.',
            },
            {
                value: 'IMEP COV = 2.7%',
                label: 'Cycle stability',
                desc: 'The run is stable enough for normal comparison; a much higher value would point to cyclic variation or misfire tendency.',
            },
            {
                value: 'MAPO = 0.35 bar',
                label: 'Knock intensity',
                desc: 'The value is interpreted against the calibrated knock threshold for that engine and sensor setup.',
            },
            {
                value: 'pmax = 82 bar @ 12° aTDC',
                label: 'Peak pressure',
                desc: 'Peak pressure and its crank location help compare combustion timing and mechanical load between tests.',
            },
        ],

        outputs: [
            { name: 'p-V diagram', desc: 'Linear and log-log pressure-volume loops, per cycle and averaged.' },
            { name: 'IMEP report', desc: 'Net and gross IMEP per cycle, per cylinder and across the selected run.' },
            { name: 'Heat-release curves', desc: 'Heat-release rate and cumulative heat release from pressure-based calculation.' },
            { name: 'MFB and phasing table', desc: 'CA10, CA50, CA90, burn duration and related combustion timing values.' },
            { name: 'Peak-pressure summary', desc: 'pmax, crank angle of pmax and maximum pressure-rise rate.' },
            { name: 'Knock report', desc: 'MAPO per cycle, knock flags and knock frequency over the run.' },
            { name: 'Stability report', desc: 'IMEP COV and cycle-dispersion metrics.' },
            { name: 'Polytropic fit', desc: 'Compression and expansion n values for pressure-reference and sealing checks.' },
        ],
    },

    tr: {
        eyebrow: 'Termodinamik ve Akışkanlar · Detaylı İnceleme',
        name: 'Gelişmiş Yanma Analizi',
        tagline:
            'Silindir içi basınç izini, motor ekiplerinin yanma kalitesini değerlendirmek için kullandığı metriklere dönüştürür: IMEP, ısı salınımı, CA10/50/90, vuruntu ve çevrim kararlılığı.',
        intro:
            'Motor geliştirme ekipleri için silindir içi basınç izi yalnızca bir grafik değildir. Her çevrimin nasıl emdiğini, sıkıştırdığını, yandığını ve genişlediğini gösteren yoğun bir ölçüm kaydıdır. MachinePulseAI, krank açısına bağlı bu basınç verisini doğrudan mühendislik sonuçlarına dönüştürür: basınç-hacim çevrimi, indike iş, ısı salınım zamanlaması, yanma süresi, vuruntu şiddeti ve çevrim kararlılığı. Böylece silindirler, çalışma noktaları ve kalibrasyon değişiklikleri aynı elle hazırlanmış tablo akışını her testte yeniden kurmadan karşılaştırılabilir.',

        channels: [
            {
                role: 'Zorunlu',
                name: 'Silindir Basıncı  p(θ)',
                unit: 'bar / MPa',
                source: 'Piezoelektrik basınç sensörü ve yük yükselteci; genelde silindir başına bir kanal',
                usage:
                    'Ana sinyal budur. Her motor çevriminde basıncın nasıl yükselip düştüğünü gösterir. Modül bu sinyalden p-V çevrimini, IMEP’i, ısı salınım hızını, tepe basıncını, vuruntu şiddetini ve çevrimden çevrime değişimi hesaplar. Piezo sensörler tek başına kusursuz bir mutlak basınç seviyesi vermediği için ana hesaplardan önce basınç izi koşullandırılır ve referansa oturtulur.',
            },
            {
                role: 'Zorunlu',
                name: 'Krank Açısı  θ',
                unit: '° KA',
                source: 'Mil enkoderi ve çevrim başına bir ÜÖN işareti',
                usage:
                    'Krank açısı, her basınç örneğinin motor çevriminde nereye denk geldiğini söyler. Ayrıca kayıt ayrı 720°lik çevrimlere bu bilgiyle bölünür. Üst ölü nokta referansı çok önemlidir: küçük bir açı hatası bile ısı salınım eğrisini, CA50’yi ve IMEP sonucunu kaydırabilir.',
            },
            {
                role: 'Önerilir',
                name: 'Motor Hızı  N',
                unit: 'dev/dk',
                source: 'Enkoder zamanlamasından türetilir veya takometre kanalı olarak verilir',
                usage:
                    'Motor hızı, sonuçları belirli bir çalışma noktasına bağlamayı sağlar. Ayrıca kaydın ortalama almak için yeterince kararlı olup olmadığını ya da ölçüm sırasında hızın sürüklenip sürüklenmediğini görmeye yardımcı olur.',
            },
            {
                role: 'Önerilir',
                name: 'Emme Manifold Basıncı  p_man (MAP)',
                unit: 'kPa / bar',
                source: 'Emme plenumunda mutlak basınç sensörü',
                usage:
                    'Basınç peglemesi için referans olarak kullanılır. Emme alt ölü noktası civarında silindir basıncının manifold basıncına yakın olduğu kabul edilir; böylece ölçülen basınç izi mutlak basınç ölçeğine taşınır.',
            },
            {
                role: 'Opsiyonel',
                name: 'Dolgu Sıcaklığı / Lambda / Yakıt Debisi',
                unit: '°C · λ · kg/h',
                source: 'Emme sıcaklık sensörü, geniş bant O₂ sensörü ve yakıt debimetresi',
                usage:
                    'Daha kapsamlı bir birinci-yasa ısı salınımı hesabı gerektiğinde kullanılır. Bu kanallar gaz özelliklerini ve yakıt enerjisini daha iyi tahmin etmeye yardım eder. Yoksa modül yine de basınç ve geometriden görünür ısı salınımı ve yanma fazlaması raporlayabilir.',
            },
        ],

        geometryLabel: 'Meta veri',
        geometryNote:
            'Motor geometrisi bir kez meta veri olarak girilir: çap, strok, biyel kolu uzunluğu, sıkıştırma oranı ve silindir sayısı. Bu değerler silindir hacmi eğrisi V(θ)’yi tanımlar. Bunlar ölçüm kanalı değildir, ancak hesapların temelidir.',

        formulas: [
            {
                title: 'Krank açısından silindir hacmi',
                expr: 'V(θ) = V_c + (V_d / 2) · [ R + 1 − cos θ − √(R² − sin²θ) ]',
                where:
                    'Bu formül krank açısını silindir hacmine çevirir. Çap ve strok süpürme hacmini, sıkıştırma oranı ölü hacmi, biyel uzunluğu ise ÜÖN çevresindeki hacim eğrisinin şeklini belirler. V(θ) bilindiğinde basınç hacme karşı çizilebilir ve integre edilebilir.',
            },
            {
                title: 'Basınç peglemesi',
                expr: 'p_abs(θ) = p_ölçülen(θ) + [ p_man − p_ölçülen(θ_ref) ]',
                where:
                    'Piezo basınç izlerinde çoğu zaman bir ofset bulunur. Pegleme, ölçülen izi bilinen bir basınç referansına taşır; pratikte bu referans çoğunlukla emme AÖN civarındaki manifold basıncıdır. Kodda küçük görünen bu adım, sonuçların güvenilirliği için kritiktir.',
            },
            {
                title: 'İndike iş ve IMEP',
                expr: 'W_i = ∮ p dV     IMEP = W_i / V_d',
                where:
                    'p-V çevriminin içinde kalan alan bir çevrimin indike işidir. Bu değeri süpürme hacmine böldüğümüzde IMEP elde edilir. IMEP; silindirler, çalışma noktaları ve farklı motorlar arasında karşılaştırması kolay bir yük metriğidir.',
            },
            {
                title: 'Isı salınım hızı',
                expr: 'dQ_n/dθ = (γ /(γ−1))·p·(dV/dθ) + (1 /(γ−1))·V·(dp/dθ)',
                where:
                    'Bu tek-bölge birinci-yasa yaklaşımı basıncı, hacmi ve bunların krank açısına göre değişimini kullanır. Pratik soruya cevap verir: yakıt enerjisi hangi krank açılarında ve ne kadar hızlı açığa çıkıyor?',
            },
            {
                title: 'Rassweiler-Withrow basınç-artışı yöntemi',
                expr: 'Δp_yanma,i = p_i − p_(i−1)·(V_(i−1)/V_i)^n',
                where:
                    'Bu yöntem, basınç artışının yanmadan gelen kısmını piston hareketinden gelen hacim etkisinden ayırır. Her karşılaştırma için tam bir termodinamik model kurmadan güvenilir yanma fazlaması görmek gerektiğinde kullanışlıdır.',
            },
            {
                title: 'Yanan kütle kesri ve fazlama açıları',
                expr: 'MFB(θ) = [Q(θ) − Q_soc] / [Q_eoc − Q_soc]',
                where:
                    'Birikimli ısı salınım eğrisi 0 ile 1 arasına ölçeklenir. CA10, CA50 ve CA90; yanmanın %10, %50 ve %90 seviyesine ulaştığı krank açılarıdır. Bütün eğriye bakmak yerine bu üç sayı çoğu karşılaştırma için daha okunaklıdır.',
            },
            {
                title: 'Vuruntu şiddeti (MAPO)',
                expr: 'MAPO = maks | YG-filtre( p(θ) ) |  ,  bant ≈ 4–20 kHz',
                where:
                    'Vuruntu, yanma başladıktan sonra basınç izinde yüksek frekanslı salınımlar olarak görünür. Modül, seçilen vuruntu penceresinde basınç izini filtreler ve her çevrim için en büyük salınım genliğini raporlar.',
            },
            {
                title: 'Çevrimden çevrime değişim',
                expr: 'COV_IMEP = (σ_IMEP / μ_IMEP) · 100 %',
                where:
                    'IMEP’in COV değeri, çevrimlerin birbirini ne kadar tekrar ettiğini gösterir. Düşük değer kararlı yanmaya işaret eder; yükselen değer genelde tekleme eğilimi, fakir sınır, karışım problemi veya kararsız ateşleme ile ilişkilidir.',
            },
            {
                title: 'Politropik üs',
                expr: 'log p = −n · log V + C   →   n uydur',
                where:
                    'Sıkıştırma ve genleşme strokları log p - log V grafiğinde uydurularak politropik üs bulunur. Bu değer; ısı transferi, kaçak ve basınç referansı için yararlı bir sağlama kontrolüdür.',
            },
        ],

        assumptions: [
            {
                name: 'ÜÖN hizalaması güvenilir olmalı',
                desc:
                    'Modül ayrıntılı sonuçlar üretebilir, ancak hatalı bir ÜÖN referansını sihirli biçimde düzeltemez. Küçük bir açı ofseti CA50’yi, ısı salınım zamanlamasını ve IMEP’i kaydırabilir.',
            },
            {
                name: 'Basınç peglemesi mühendislik yaklaşımıdır',
                desc:
                    'Emme AÖN civarında manifold basıncını referans almak yaygın bir yöntemdir; ancak seçilen noktanın ilgili motor ve çalışma koşulu için fiziksel olarak anlamlı olması gerekir.',
            },
            {
                name: 'Tek-bölge ısı salınımı CFD değildir',
                desc:
                    'Bu yaklaşım hızlı teşhis ve testler arası karşılaştırma için tasarlanır. Silindir içindeki yerel sıcaklığı, alev şeklini veya karışım dağılımını çözmez.',
            },
            {
                name: 'Vuruntu eşiği kalibrasyon ister',
                desc:
                    'MAPO yararlı bir metriktir, fakat geçti/kaldı eşiği motor ailesine, sensör montajına, basınç çınlamasına ve seçilen vuruntu penceresine bağlıdır.',
            },
        ],

        pipeline: [
            {
                step: 'Kaydı çevrimlere böl',
                detail:
                    'Krank açısı ve ÜÖN işareti, basınç izini ayrı 720°lik çevrimlere ayırır. Böylece her çevrim için karşılaştırılabilir bir basınç eğrisi elde edilir.',
            },
            {
                step: 'Basınç izini temizle ve referansa oturt',
                detail:
                    'Ofset, sürüklenme ve belirgin hatalı çevrimler kontrol edilir; ardından iş ve ısı salınımı hesabından önce iz mutlak basınç referansına taşınır.',
            },
            {
                step: 'Silindir hacmi eğrisini kur',
                detail:
                    'Motor geometrisi kullanılarak V(θ) hesaplanır. Böylece her basınç örneğinin karşılık geldiği bir hacim örneği olur.',
            },
            {
                step: 'İş ve yük metriklerini hesapla',
                detail:
                    'p-V çevrimi integre edilerek indike iş bulunur. IMEP çevrim başına, silindir başına ve seçilen kayıt ortalaması olarak raporlanır.',
            },
            {
                step: 'Isı salınımını ve yanma fazlamasını çıkar',
                detail:
                    'Modül ısı salınım hızını, birikimli ısı salınımını ve MFB eğrisini hesaplar; ardından CA10, CA50 ve CA90 değerlerini bu eğriden okur.',
            },
            {
                step: 'Vuruntu ve kararlılığı kontrol et',
                detail:
                    'Yüksek frekanslı basınç salınımları MAPO olarak özetlenir. Çevrimler arasındaki IMEP değişimi ise COV ve dağılım istatistikleriyle verilir.',
            },
        ],

        exampleMetrics: [
            {
                value: 'CA50 = 8,2° ÜÖN sonrası',
                label: 'Yanma fazlaması',
                desc: 'Yakıt enerjisinin yarısı üst ölü noktadan kısa süre sonra açığa çıkmıştır; bu genelde verimli çalışma penceresine yakındır.',
            },
            {
                value: 'IMEP COV = %2,7',
                label: 'Çevrim kararlılığı',
                desc: 'Kayıt normal karşılaştırma için yeterince kararlıdır; çok daha yüksek değer çevrimsel değişim veya tekleme eğilimi gösterebilir.',
            },
            {
                value: 'MAPO = 0,35 bar',
                label: 'Vuruntu şiddeti',
                desc: 'Bu değer, ilgili motor ve sensör kurulumu için kalibre edilmiş vuruntu eşiğine göre yorumlanır.',
            },
            {
                value: 'pmax = 82 bar @ 12° ÜÖN sonrası',
                label: 'Tepe basıncı',
                desc: 'Tepe basınç ve krank konumu; yanma zamanlamasını ve mekanik yükü testler arasında karşılaştırmaya yardımcı olur.',
            },
        ],

        outputs: [
            { name: 'p-V diyagramı', desc: 'Çevrim başına ve ortalama lineer/log-log basınç-hacim çevrimleri.' },
            { name: 'IMEP raporu', desc: 'Net ve brüt IMEP; çevrim başına, silindir başına ve seçilen kayıt boyunca.' },
            { name: 'Isı salınım eğrileri', desc: 'Basınca dayalı hesaptan ısı salınım hızı ve birikimli ısı salınımı.' },
            { name: 'MFB ve fazlama tablosu', desc: 'CA10, CA50, CA90, yanma süresi ve ilgili yanma zamanlaması değerleri.' },
            { name: 'Tepe basınç özeti', desc: 'pmax, pmax krank açısı ve maksimum basınç artış hızı.' },
            { name: 'Vuruntu raporu', desc: 'Çevrim başına MAPO, vuruntu işaretleri ve kayıt boyunca vuruntu sıklığı.' },
            { name: 'Kararlılık raporu', desc: 'IMEP COV ve çevrimsel dağılım metrikleri.' },
            { name: 'Politropik uyum', desc: 'Basınç referansı ve sızdırmazlık kontrolleri için sıkıştırma/genleşme n değerleri.' },
        ],
    },
}

export default COMBUSTION_ANALYSIS_DETAIL
