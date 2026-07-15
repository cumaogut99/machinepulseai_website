const THERMOFLUIDS_WIDGET_DETAILS = {
    heat_transfer: {
        slug: 'heat-transfer-thermal',
        en: {
            tagline: 'Turns temperature, flow and geometry data into practical thermal performance numbers: heat duty, exchanger effectiveness, cooling time constant and heat-transfer coefficients.',
            intro: 'Thermal tests often start with many temperature channels and end with one question: is the system removing or delivering enough heat? This module brings those measurements into one view. It checks heat-exchanger performance, estimates conduction and convection behavior, and fits cooling or heating curves so teams can compare designs, operating points and component changes without rebuilding calculations by hand.',
            inputs: [
                { name: 'Temperature channels', desc: 'Inlet, outlet, surface, ambient or internal temperatures from thermocouples, RTDs or logged ECU data.' },
                { name: 'Flow and fluid properties', desc: 'Mass or volume flow rate, density, specific heat, viscosity and conductivity when available.' },
                { name: 'Geometry and material data', desc: 'Area, wall thickness, material conductivity and exchanger layout for coefficient estimates.' },
            ],
            formulas: [
                { title: 'Heat duty', latex: '\\dot Q = \\dot m\\,c_p\\,(T_{out}-T_{in})', expr: 'Qdot = m_dot·cp·(Tout - Tin)', where: 'The direct energy balance. It converts a measured temperature rise or drop into heat transferred by the fluid.' },
                { title: 'Log mean temperature difference', latex: '\\Delta T_{lm}=\\dfrac{\\Delta T_1-\\Delta T_2}{\\ln(\\Delta T_1/\\Delta T_2)}', expr: 'ΔT_lm = (ΔT1 - ΔT2) / ln(ΔT1/ΔT2)', where: 'Used when inlet and outlet temperatures are known. It gives the effective driving temperature difference across the exchanger.' },
                { title: 'Effectiveness and NTU', latex: '\\varepsilon = \\dfrac{\\dot Q}{\\dot Q_{max}} \\qquad NTU = \\dfrac{UA}{C_{min}}', expr: 'ε = Qdot/Qmax ; NTU = UA/Cmin', where: 'Useful when outlet temperatures are being predicted or compared. Effectiveness shows how close the exchanger gets to the best possible heat transfer.' },
                { title: 'Transient cooling fit', latex: 'T(t)=T_\\infty+(T_0-T_\\infty)e^{-t/\\tau}', expr: 'T(t)=T∞+(T0-T∞)·e^(-t/τ)', where: 'A cooling or heating curve can be fit to extract the time constant and an effective heat-transfer coefficient.' },
            ],
            assumptions: [
                { name: 'Sensor placement matters', desc: 'A thermocouple on a wall, in a fluid stream and inside a component can tell different stories. The calculation is only as good as the measurement location.' },
                { name: 'Lumped cooling needs a small internal gradient', desc: 'A simple exponential fit works best when the component temperature is reasonably uniform, often checked with the Biot number.' },
                { name: 'Heat losses may need a correction', desc: 'Bench tests can lose heat to fixtures, insulation gaps and ambient air. Those losses should be captured or bounded before comparing designs.' },
            ],
            steps: [
                { step: 'Select temperature and flow channels', detail: 'Choose the hot/cold side temperatures, flow rate and any surface or ambient channels.' },
                { step: 'Define geometry and fluids', detail: 'Enter area, material and fluid properties used by the thermal model.' },
                { step: 'Calculate steady performance', detail: 'Compute heat duty, LMTD, effectiveness, NTU and estimated U or h values.' },
                { step: 'Fit transient behavior', detail: 'For cooling or heating runs, fit the time response and extract the thermal time constant.' },
                { step: 'Compare conditions', detail: 'Rank designs, flow rates or operating points by heat removed, thermal margin and response time.' },
            ],
            exampleMetrics: [
                { value: 'Qdot = 18.4 kW', label: 'Heat removed', desc: 'The coolant side is carrying 18.4 kW away from the component or exchanger.' },
                { value: 'ε = 0.72', label: 'Exchanger effectiveness', desc: 'The exchanger reaches 72% of the maximum possible heat transfer for the measured conditions.' },
                { value: 'τ = 43 s', label: 'Cooling time constant', desc: 'The component temperature moves about 63% of the way to its final value in 43 seconds.' },
            ],
            outputs: [
                { name: 'Heat-duty report', desc: 'Heat flow from each measured side, with balance checks where both sides are instrumented.' },
                { name: 'Exchanger performance table', desc: 'LMTD, effectiveness, NTU, UA and estimated U values.' },
                { name: 'Transient fit', desc: 'Cooling/heating time constant and fitted temperature curve.' },
                { name: 'Thermal comparison summary', desc: 'Operating points or designs ranked by heat transfer and thermal margin.' },
            ],
        },
        tr: {
            tagline: 'Sıcaklık, debi ve geometri verisini pratik termal performans metriklerine dönüştürür: ısı yükü, eşanjör etkinliği, soğuma zaman sabiti ve ısı-transfer katsayıları.',
            intro: 'Termal testler çoğu zaman birçok sıcaklık kanalıyla başlar ve tek bir soruya gelir: sistem yeterince ısı atıyor veya taşıyor mu? Bu modül ölçümleri tek bir okumaya toplar. Isı değiştirici performansını kontrol eder, iletim/taşınım davranışını tahmin eder ve soğuma ya da ısınma eğrilerini uydurur. Böylece ekipler tasarımları, çalışma noktalarını ve komponent değişikliklerini her seferinde elde tablo kurmadan karşılaştırabilir.',
            inputs: [
                { name: 'Sıcaklık kanalları', desc: 'Termokupl, RTD veya ECU kaydından giriş, çıkış, yüzey, ortam veya iç sıcaklıklar.' },
                { name: 'Debi ve akışkan özellikleri', desc: 'Mümkünse kütlesel/hacimsel debi, yoğunluk, özgül ısı, viskozite ve ısı iletkenliği.' },
                { name: 'Geometri ve malzeme bilgisi', desc: 'Katsayı tahminleri için alan, duvar kalınlığı, malzeme iletkenliği ve eşanjör düzeni.' },
            ],
            formulas: [
                { title: 'Isı yükü', latex: '\\dot Q = \\dot m\\,c_p\\,(T_{out}-T_{in})', expr: 'Qdot = m_dot·cp·(Tçıkış - Tgiriş)', where: 'Doğrudan enerji dengesi. Ölçülen sıcaklık artışını veya düşüşünü akışkanın taşıdığı ısıya çevirir.' },
                { title: 'Logaritmik ortalama sıcaklık farkı', latex: '\\Delta T_{lm}=\\dfrac{\\Delta T_1-\\Delta T_2}{\\ln(\\Delta T_1/\\Delta T_2)}', expr: 'ΔT_lm = (ΔT1 - ΔT2) / ln(ΔT1/ΔT2)', where: 'Giriş ve çıkış sıcaklıkları bilindiğinde kullanılır. Eşanjör boyunca etkili sürücü sıcaklık farkını verir.' },
                { title: 'Etkinlik ve NTU', latex: '\\varepsilon = \\dfrac{\\dot Q}{\\dot Q_{max}} \\qquad NTU = \\dfrac{UA}{C_{min}}', expr: 'ε = Qdot/Qmax ; NTU = UA/Cmin', where: 'Çıkış sıcaklıkları tahmin edilirken veya karşılaştırılırken kullanışlıdır. Etkinlik, eşanjörün mümkün olan en iyi ısı transferine ne kadar yaklaştığını gösterir.' },
                { title: 'Geçici soğuma uyumu', latex: 'T(t)=T_\\infty+(T_0-T_\\infty)e^{-t/\\tau}', expr: 'T(t)=T∞+(T0-T∞)·e^(-t/τ)', where: 'Soğuma veya ısınma eğrisi uydurularak zaman sabiti ve etkin ısı-transfer katsayısı çıkarılabilir.' },
            ],
            assumptions: [
                { name: 'Sensör konumu sonucu değiştirir', desc: 'Duvara, akış içine veya komponent içine yerleştirilen sensörler farklı sonuçlar gösterebilir. Hesap, ölçüm noktasının doğruluğuna bağlıdır.' },
                { name: 'Yığınlanmış model düşük iç gradyan ister', desc: 'Basit üstel soğuma uyumu en iyi komponent sıcaklığı makul ölçüde uniform olduğunda çalışır; bu çoğu zaman Biot sayısıyla kontrol edilir.' },
                { name: 'Isı kayıpları dikkate alınabilir', desc: 'Tezgah testlerinde fikstürlere, izolasyon boşluklarına ve ortama ısı kaybı olabilir. Tasarım karşılaştırmadan önce bu kayıplar yakalanmalı veya sınırlandırılmalıdır.' },
            ],
            steps: [
                { step: 'Sıcaklık ve debi kanallarını seç', detail: 'Sıcak/soğuk taraf sıcaklıklarını, debiyi ve varsa yüzey/ortam kanallarını seçin.' },
                { step: 'Geometriyi ve akışkanı tanımla', detail: 'Termal modelin kullanacağı alan, malzeme ve akışkan özelliklerini girin.' },
                { step: 'Kararlı performansı hesapla', detail: 'Isı yükü, LMTD, etkinlik, NTU ve tahmini U veya h değerlerini hesaplayın.' },
                { step: 'Geçici davranışı uydur', detail: 'Soğuma/ısınma koşularında zaman cevabını uydurup termal zaman sabitini çıkarın.' },
                { step: 'Koşulları karşılaştır', detail: 'Tasarım, debi veya çalışma noktalarını atılan ısı, termal marj ve tepki süresine göre sıralayın.' },
            ],
            exampleMetrics: [
                { value: 'Qdot = 18,4 kW', label: 'Atılan ısı', desc: 'Soğutucu taraf komponentten veya eşanjörden 18,4 kW ısı taşıyor.' },
                { value: 'ε = 0,72', label: 'Eşanjör etkinliği', desc: 'Eşanjör, ölçülen koşullarda mümkün olan ısı transferinin %72’sine ulaşıyor.' },
                { value: 'τ = 43 s', label: 'Soğuma zaman sabiti', desc: 'Komponent sıcaklığı nihai değerine giden yolun yaklaşık %63’ünü 43 saniyede alıyor.' },
            ],
            outputs: [
                { name: 'Isı yükü raporu', desc: 'Ölçümlü taraflardan ısı akışı ve iki taraf ölçülüyse denge kontrolü.' },
                { name: 'Eşanjör performans tablosu', desc: 'LMTD, etkinlik, NTU, UA ve tahmini U değerleri.' },
                { name: 'Geçici uyum', desc: 'Soğuma/ısınma zaman sabiti ve uydurulmuş sıcaklık eğrisi.' },
                { name: 'Termal karşılaştırma özeti', desc: 'Çalışma noktaları veya tasarımlar için ısı transferi ve termal marj sıralaması.' },
            ],
        },
    },

    fluid_dynamics: {
        slug: 'fluid-dynamics',
        en: {
            tagline: 'Diagnoses pumps, pipes and hydraulic systems from pressure, flow and speed data: pulsation, cavitation risk, water hammer, Reynolds regime and hydraulic power.',
            intro: 'Fluid systems can look healthy in average flow while still damaging equipment through pulsation, cavitation or fast pressure transients. This module reads pressure, flow, speed and fluid-property data together, then turns them into a practical view of what the system is doing and where risk is building.',
            inputs: [
                { name: 'Pressure and flow channels', desc: 'Suction/discharge pressure, differential pressure, volume or mass flow, and valve events when available.' },
                { name: 'Machine speed', desc: 'Pump or compressor RPM for matching pulsation orders to running speed.' },
                { name: 'Fluid and pipe data', desc: 'Density, vapor pressure, viscosity, pipe diameter and wave speed for NPSH and transient estimates.' },
            ],
            formulas: [
                { title: 'Reynolds number', latex: 'Re = \\dfrac{\\rho v D}{\\mu}', expr: 'Re = ρ·v·D / μ', where: 'Classifies whether the flow is laminar, transitional or turbulent.' },
                { title: 'Hydraulic power', latex: 'P_h = \\Delta p\\,Q_v', expr: 'P_h = Δp·Qv', where: 'Turns pressure rise and volumetric flow into useful hydraulic power.' },
                { title: 'NPSH available', latex: 'NPSH_a = \\dfrac{p_s-p_v}{\\rho g}+z_s-\\dfrac{v_s^2}{2g}', expr: 'NPSHa = (ps - pv)/(ρg) + zs - vs²/(2g)', where: 'Checks suction margin against vapor pressure to estimate cavitation risk.' },
                { title: 'Water hammer pressure rise', latex: '\\Delta p = \\rho a\\Delta v', expr: 'Δp = ρ·a·Δv', where: 'The Joukowsky relation estimates pressure surge from a rapid velocity change.' },
            ],
            assumptions: [
                { name: 'Sensor bandwidth must match the event', desc: 'Slow pressure logging may catch average pressure but miss pulsation peaks and water-hammer spikes.' },
                { name: 'NPSH uses local suction conditions', desc: 'Temperature, elevation, vapor pressure and suction losses need to describe the actual pump inlet, not only the tank.' },
                { name: 'Pulsation diagnosis needs speed reference', desc: 'RPM or tacho data makes it possible to separate running-order pulsation from unrelated broadband noise.' },
            ],
            steps: [
                { step: 'Bind pressure, flow and speed', detail: 'Choose the channels that describe suction, discharge, flow and machine RPM.' },
                { step: 'Classify the flow regime', detail: 'Calculate Reynolds number and flag laminar, transitional or turbulent operation.' },
                { step: 'Check pump health indicators', detail: 'Estimate hydraulic power, NPSH margin and cavitation-related broadband energy.' },
                { step: 'Inspect pulsation orders', detail: 'Match pressure pulsation peaks to running speed and harmonics.' },
                { step: 'Detect fast transients', detail: 'Look for pressure surges and estimate water-hammer severity.' },
            ],
            exampleMetrics: [
                { value: 'NPSH margin = 1.8 m', label: 'Cavitation margin', desc: 'The available suction head is only 1.8 m above the required margin, so operating reserve is limited.' },
                { value: 'Re = 145,000', label: 'Flow regime', desc: 'The line is clearly turbulent; turbulent correlations should be used for pressure drop and heat transfer.' },
                { value: 'P_h = 24.6 kW', label: 'Hydraulic power', desc: 'The pump is delivering 24.6 kW of useful hydraulic power at the measured point.' },
            ],
            outputs: [
                { name: 'Flow-regime report', desc: 'Velocity, Reynolds number and laminar/turbulent classification.' },
                { name: 'Pump performance summary', desc: 'Pressure rise, flow, hydraulic power and estimated efficiency inputs.' },
                { name: 'Cavitation risk readout', desc: 'NPSH available, margin and high-frequency pressure signature checks.' },
                { name: 'Pulsation and transient report', desc: 'Running-order harmonics, pressure peaks and water-hammer events.' },
            ],
        },
        tr: {
            tagline: 'Basınç, debi ve hız verisinden pompa, boru hattı ve hidrolik sistemleri teşhis eder: pulsasyon, kavitasyon riski, su koçu, Reynolds rejimi ve hidrolik güç.',
            intro: 'Akışkan sistemleri ortalama debide sağlıklı görünebilir; ama pulsasyon, kavitasyon veya hızlı basınç geçicileri ekipmana zarar verebilir. Bu modül basınç, debi, hız ve akışkan özelliklerini birlikte okur; sistemin gerçekte ne yaptığını ve riskin nerede biriktiğini pratik bir özet haline getirir.',
            inputs: [
                { name: 'Basınç ve debi kanalları', desc: 'Emme/basma basıncı, diferansiyel basınç, hacimsel veya kütlesel debi ve varsa vana olayları.' },
                { name: 'Makine hızı', desc: 'Pulsasyon orderlarını çalışma hızıyla eşlemek için pompa veya kompresör devri.' },
                { name: 'Akışkan ve boru verisi', desc: 'NPSH ve geçici olay tahminleri için yoğunluk, buhar basıncı, viskozite, boru çapı ve dalga hızı.' },
            ],
            formulas: [
                { title: 'Reynolds sayısı', latex: 'Re = \\dfrac{\\rho v D}{\\mu}', expr: 'Re = ρ·v·D / μ', where: 'Akışın laminer, geçiş veya türbülanslı bölgede olduğunu sınıflandırır.' },
                { title: 'Hidrolik güç', latex: 'P_h = \\Delta p\\,Q_v', expr: 'P_h = Δp·Qv', where: 'Basınç artışı ve hacimsel debiyi yararlı hidrolik güce çevirir.' },
                { title: 'Mevcut NPSH', latex: 'NPSH_a = \\dfrac{p_s-p_v}{\\rho g}+z_s-\\dfrac{v_s^2}{2g}', expr: 'NPSHa = (ps - pv)/(ρg) + zs - vs²/(2g)', where: 'Kavitasyon riskini görmek için emme koşullarını buhar basıncına karşı kontrol eder.' },
                { title: 'Su koçu basınç artışı', latex: '\\Delta p = \\rho a\\Delta v', expr: 'Δp = ρ·a·Δv', where: 'Joukowsky bağıntısı, hızlı hız değişiminden doğan basınç darbesini tahmin eder.' },
            ],
            assumptions: [
                { name: 'Sensör bant genişliği olaya uymalı', desc: 'Yavaş basınç kaydı ortalama basıncı yakalayabilir ama pulsasyon tepelerini ve su koçu darbelerini kaçırabilir.' },
                { name: 'NPSH yerel emme koşullarını ister', desc: 'Sıcaklık, yükseklik, buhar basıncı ve emme kayıpları yalnızca tankı değil, gerçek pompa girişini tarif etmelidir.' },
                { name: 'Pulsasyon teşhisi hız referansı ister', desc: 'RPM veya tako verisi, çalışma orderı pulsasyonunu ilgisiz geniş bant gürültüden ayırmayı sağlar.' },
            ],
            steps: [
                { step: 'Basınç, debi ve hızı bağla', detail: 'Emme, basma, debi ve makine devrini tarif eden kanalları seçin.' },
                { step: 'Akış rejimini sınıflandır', detail: 'Reynolds sayısını hesaplayıp laminer, geçiş veya türbülanslı çalışmayı işaretleyin.' },
                { step: 'Pompa sağlık göstergelerini kontrol et', detail: 'Hidrolik güç, NPSH marjı ve kavitasyonla ilişkili geniş bant enerjiyi tahmin edin.' },
                { step: 'Pulsasyon orderlarını incele', detail: 'Basınç pulsasyonu tepelerini çalışma hızı ve harmonikleriyle eşleştirin.' },
                { step: 'Hızlı geçicileri yakala', detail: 'Basınç darbelerini arayın ve su koçu şiddetini tahmin edin.' },
            ],
            exampleMetrics: [
                { value: 'NPSH marjı = 1,8 m', label: 'Kavitasyon marjı', desc: 'Mevcut emme yüksekliği gerekli değerin yalnızca 1,8 m üzerinde; çalışma rezervi sınırlı.' },
                { value: 'Re = 145.000', label: 'Akış rejimi', desc: 'Hat açıkça türbülanslı; basınç düşümü ve ısı transferi için türbülans bağıntıları kullanılmalı.' },
                { value: 'P_h = 24,6 kW', label: 'Hidrolik güç', desc: 'Pompa ölçülen noktada 24,6 kW yararlı hidrolik güç sağlıyor.' },
            ],
            outputs: [
                { name: 'Akış rejimi raporu', desc: 'Hız, Reynolds sayısı ve laminer/türbülanslı sınıflandırması.' },
                { name: 'Pompa performans özeti', desc: 'Basınç artışı, debi, hidrolik güç ve verim hesabı girdileri.' },
                { name: 'Kavitasyon riski okuması', desc: 'Mevcut NPSH, marj ve yüksek frekanslı basınç imzası kontrolleri.' },
                { name: 'Pulsasyon ve geçici olay raporu', desc: 'Çalışma orderı harmonikleri, basınç tepeleri ve su koçu olayları.' },
            ],
        },
    },

    gas_exchange: {
        slug: 'gas-exchange-scavenging',
        en: {
            tagline: 'Shows how well an engine breathes by turning low-pressure cylinder data into pumping work, PMEP, volumetric efficiency and scavenging indicators.',
            intro: 'Power and efficiency depend on more than combustion. The engine must move fresh charge in and burned gas out with as little wasted work as possible. This module focuses on that gas-exchange part of the cycle, helping teams see intake restriction, exhaust back-pressure, valve timing effects and scavenging behavior directly from measured data.',
            inputs: [
                { name: 'Low-pressure cylinder pressure', desc: 'Pressure trace through intake and exhaust strokes, ideally crank-angle resolved.' },
                { name: 'Crank angle and geometry', desc: 'Encoder/TDC reference plus bore, stroke, rod length and compression ratio for volume reconstruction.' },
                { name: 'Intake/exhaust conditions', desc: 'Manifold pressure, temperature, speed, air mass flow or lambda where available.' },
            ],
            formulas: [
                { title: 'Pumping mean effective pressure', latex: 'PMEP = \\dfrac{\\oint_{\\mathrm{gas\\ exchange}}p\\,dV}{V_d}', expr: 'PMEP = ∮ p dV / Vd over gas exchange', where: 'Measures the work spent moving gas through intake and exhaust paths.' },
                { title: 'Volumetric efficiency', latex: '\\eta_v = \\dfrac{m_{air}}{\\rho_{intake}V_d}', expr: 'ηv = m_air / (ρ_intake·Vd)', where: 'Compares actual fresh charge against the ideal amount that would fill the swept volume at intake conditions.' },
                { title: 'Trapping efficiency', latex: '\\eta_t = \\dfrac{m_{\\mathrm{fresh\\ retained}}}{m_{\\mathrm{fresh\\ delivered}}}', expr: 'ηt = fresh retained / fresh delivered', where: 'Useful for two-stroke or high-overlap engines where some fresh charge can escape.' },
            ],
            assumptions: [
                { name: 'Pressure referencing affects the loop', desc: 'Low-pressure loops are sensitive to sensor offset and manifold reference quality.' },
                { name: 'Valve timing context is important', desc: 'Interpreting PMEP and scavenging is much easier when intake/exhaust valve events are known.' },
                { name: 'Mass-flow data improves volumetric efficiency', desc: 'Without air-mass measurement, volumetric efficiency relies more heavily on assumptions about intake conditions.' },
            ],
            steps: [
                { step: 'Segment the engine cycle', detail: 'Use crank angle and TDC to isolate intake and exhaust portions of each cycle.' },
                { step: 'Reconstruct volume', detail: 'Use geometry to pair every pressure sample with cylinder volume.' },
                { step: 'Draw the pumping loop', detail: 'Plot low-pressure p-V behavior and calculate the enclosed pumping work.' },
                { step: 'Estimate breathing metrics', detail: 'Compute PMEP, volumetric efficiency and scavenging indicators where data allows.' },
                { step: 'Compare speed and load points', detail: 'Find restrictions, back-pressure effects and valve-timing tradeoffs across the map.' },
            ],
            exampleMetrics: [
                { value: 'PMEP = -0.42 bar', label: 'Pumping loss', desc: 'The engine is spending measurable work to pull in and push out gas at this operating point.' },
                { value: 'ηv = 91%', label: 'Volumetric efficiency', desc: 'The cylinder traps 91% of the ideal fresh charge for the measured intake condition.' },
                { value: 'Exhaust Δp = 18 kPa', label: 'Back-pressure indicator', desc: 'The exhaust path is adding a noticeable pumping penalty.' },
            ],
            outputs: [
                { name: 'Pumping-loop diagram', desc: 'Low-pressure p-V loop for intake and exhaust strokes.' },
                { name: 'PMEP trend', desc: 'Pumping work by cycle, speed and load point.' },
                { name: 'Breathing efficiency table', desc: 'Volumetric efficiency and related intake/exhaust metrics.' },
                { name: 'Scavenging summary', desc: 'Indicators for fresh-charge retention and burned-gas removal where channels support it.' },
            ],
        },
        tr: {
            tagline: 'Düşük basınçlı silindir verisini pompalama işi, PMEP, hacimsel verim ve süpürme göstergelerine dönüştürerek motorun ne kadar iyi nefes aldığını gösterir.',
            intro: 'Güç ve verim yalnızca yanmaya bağlı değildir. Motor taze dolguyu içeri almalı, yanmış gazı dışarı atmalı ve bunu mümkün olduğunca az iş kaybıyla yapmalıdır. Bu modül çevrimin gaz değişimi kısmına odaklanır; emme kısıtını, egzoz geri basıncını, supap zamanlaması etkilerini ve süpürme davranışını doğrudan ölçüm verisinden görünür hale getirir.',
            inputs: [
                { name: 'Düşük basınçlı silindir basıncı', desc: 'Emme ve egzoz strokları boyunca, tercihen krank açısına bağlı basınç izi.' },
                { name: 'Krank açısı ve geometri', desc: 'Hacim yeniden kurulumu için enkoder/ÜÖN referansı ile çap, strok, biyel uzunluğu ve sıkıştırma oranı.' },
                { name: 'Emme/egzoz koşulları', desc: 'Varsa manifold basıncı, sıcaklık, hız, hava kütlesel debisi veya lambda.' },
            ],
            formulas: [
                { title: 'Pompalama ortalama etkin basıncı', latex: 'PMEP = \\dfrac{\\oint_{\\mathrm{gaz\\ degisimi}}p\\,dV}{V_d}', expr: 'PMEP = gaz değişimi boyunca ∮ p dV / Vd', where: 'Emme ve egzoz yollarında gazı hareket ettirmek için harcanan işi ölçer.' },
                { title: 'Hacimsel verim', latex: '\\eta_v = \\dfrac{m_{air}}{\\rho_{intake}V_d}', expr: 'ηv = m_air / (ρ_emme·Vd)', where: 'Gerçek taze dolguyu, emme koşullarında süpürme hacmini dolduracak ideal miktarla karşılaştırır.' },
                { title: 'Tutma verimi', latex: '\\eta_t = \\dfrac{m_{\\mathrm{tutulan\\ taze}}}{m_{\\mathrm{verilen\\ taze}}}', expr: 'ηt = tutulan taze / verilen taze', where: 'Taze dolgunun bir kısmının kaçabildiği iki zamanlı veya yüksek bindirmeli motorlarda kullanışlıdır.' },
            ],
            assumptions: [
                { name: 'Basınç referansı çevrimi etkiler', desc: 'Düşük basınç çevrimleri sensör ofsetine ve manifold referansının kalitesine duyarlıdır.' },
                { name: 'Supap zamanlaması yorumu güçlendirir', desc: 'PMEP ve süpürmeyi yorumlamak, emme/egzoz supap olayları bilindiğinde çok daha kolaydır.' },
                { name: 'Kütlesel debi hacimsel verimi iyileştirir', desc: 'Hava kütlesel debisi yoksa hacimsel verim, emme koşulları hakkındaki varsayımlara daha fazla dayanır.' },
            ],
            steps: [
                { step: 'Motor çevrimini böl', detail: 'Krank açısı ve ÜÖN ile her çevrimin emme ve egzoz kısımlarını ayırın.' },
                { step: 'Hacmi yeniden kur', detail: 'Her basınç örneğini silindir hacmiyle eşlemek için geometriyi kullanın.' },
                { step: 'Pompalama çevrimini çiz', detail: 'Düşük basınçlı p-V davranışını çizip kapalı pompalama işini hesaplayın.' },
                { step: 'Nefes alma metriklerini tahmin et', detail: 'Verinin izin verdiği yerde PMEP, hacimsel verim ve süpürme göstergelerini hesaplayın.' },
                { step: 'Hız ve yük noktalarını karşılaştır', detail: 'Harita boyunca kısıtları, geri basınç etkilerini ve supap zamanlaması takaslarını bulun.' },
            ],
            exampleMetrics: [
                { value: 'PMEP = -0,42 bar', label: 'Pompalama kaybı', desc: 'Motor bu çalışma noktasında gazı içeri/dışarı taşımak için ölçülebilir iş harcıyor.' },
                { value: 'ηv = %91', label: 'Hacimsel verim', desc: 'Silindir ölçülen emme koşulunda ideal taze dolgunun %91’ini tutuyor.' },
                { value: 'Egzoz Δp = 18 kPa', label: 'Geri basınç göstergesi', desc: 'Egzoz yolu fark edilir bir pompalama cezası ekliyor.' },
            ],
            outputs: [
                { name: 'Pompalama çevrimi diyagramı', desc: 'Emme ve egzoz strokları için düşük basınçlı p-V çevrimi.' },
                { name: 'PMEP trendi', desc: 'Çevrim, hız ve yük noktasına göre pompalama işi.' },
                { name: 'Nefes alma verimi tablosu', desc: 'Hacimsel verim ve ilgili emme/egzoz metrikleri.' },
                { name: 'Süpürme özeti', desc: 'Kanallar desteklediğinde taze dolgu tutma ve yanmış gaz atma göstergeleri.' },
            ],
        },
    },

    thermo_cycles: {
        slug: 'thermodynamic-cycles',
        en: {
            tagline: 'Builds ideal and measured power cycles side by side, so losses in real engines, turbines or thermal systems are visible instead of buried in tables.',
            intro: 'A thermodynamic cycle is the clean engineering story of how heat becomes work. Real machines never follow the ideal cycle exactly; they lose energy through heat transfer, pressure drop, friction and non-instant combustion or expansion. This module makes those gaps visible with p-V and T-S diagrams, efficiency metrics and side-by-side comparisons of ideal and measured behavior.',
            inputs: [
                { name: 'Cycle type and state points', desc: 'Otto, Diesel, Dual, Atkinson, Miller, Brayton or Rankine assumptions, plus measured or entered pressure/temperature states.' },
                { name: 'Fluid properties', desc: 'Gas constants, specific heats, steam tables or working-fluid property data when needed.' },
                { name: 'Measured pressure/volume data', desc: 'Optional real p-V traces for overlaying test data against the ideal cycle.' },
            ],
            formulas: [
                { title: 'Thermal efficiency', latex: '\\eta_{th}=\\dfrac{W_{net}}{Q_{in}}=1-\\dfrac{Q_{out}}{Q_{in}}', expr: 'ηth = Wnet/Qin = 1 - Qout/Qin', where: 'Shows what fraction of supplied heat becomes useful net work.' },
                { title: 'Otto ideal efficiency', latex: '\\eta_{Otto}=1-\\dfrac{1}{r^{\\gamma-1}}', expr: 'ηOtto = 1 - 1/r^(γ-1)', where: 'A compact ideal reference for spark-ignition engines based mainly on compression ratio.' },
                { title: 'Net work on p-V diagram', latex: 'W_{net}=\\oint p\\,dV', expr: 'Wnet = ∮ p dV', where: 'The area inside the p-V loop is the useful cycle work.' },
            ],
            assumptions: [
                { name: 'Ideal cycles are reference models', desc: 'They are not promises of real performance; they show the best-case structure and expose where real losses enter.' },
                { name: 'Property choices matter', desc: 'Constant specific heats are simple, but variable properties or steam tables may be needed for high accuracy.' },
                { name: 'Measured overlays need consistent state alignment', desc: 'Pressure, volume, temperature and timing must refer to the same cycle states.' },
            ],
            steps: [
                { step: 'Choose the cycle family', detail: 'Select the ideal model that matches the machine or comparison you want to make.' },
                { step: 'Enter state data', detail: 'Provide pressure, temperature, compression/pressure ratios, heat input or measured traces.' },
                { step: 'Build ideal diagrams', detail: 'Generate p-V and T-S diagrams with work and heat areas.' },
                { step: 'Overlay measured behavior', detail: 'Place real data on top of the ideal model when a measured trace is available.' },
                { step: 'Quantify the gap', detail: 'Report efficiency, net work and the major loss indicators.' },
            ],
            exampleMetrics: [
                { value: 'ηth = 38.5%', label: 'Thermal efficiency', desc: '38.5% of the supplied heat is converted into net work in the selected cycle definition.' },
                { value: 'Wnet = 1.24 kJ/cycle', label: 'Cycle work', desc: 'The enclosed p-V area corresponds to 1.24 kJ of net work per cycle.' },
                { value: 'Ideal gap = 7.8 points', label: 'Loss indicator', desc: 'The measured cycle is 7.8 percentage points below the selected ideal reference.' },
            ],
            outputs: [
                { name: 'p-V and T-S diagrams', desc: 'Ideal and measured cycle plots with work and heat areas.' },
                { name: 'Efficiency table', desc: 'Thermal efficiency, heat input/output and net work.' },
                { name: 'State-point table', desc: 'Pressure, temperature, volume and entropy at key cycle states.' },
                { name: 'Ideal-vs-measured comparison', desc: 'Clear gap between reference cycle and real measurement.' },
            ],
        },
        tr: {
            tagline: 'İdeal ve ölçülen güç çevrimlerini yan yana kurar; gerçek motor, türbin veya termal sistemlerdeki kayıplar tablolara gömülmek yerine görünür olur.',
            intro: 'Termodinamik çevrim, ısının işe nasıl dönüştüğünü anlatan temiz mühendislik hikayesidir. Gerçek makineler ideal çevrimi birebir izlemez; ısı transferi, basınç düşümü, sürtünme ve sonlu yanma/genleşme nedeniyle enerji kaybeder. Bu modül p-V ve T-S diyagramları, verim metrikleri ve ideal/ölçülen davranış karşılaştırmalarıyla bu farkları görünür hale getirir.',
            inputs: [
                { name: 'Çevrim tipi ve durum noktaları', desc: 'Otto, Diesel, Dual, Atkinson, Miller, Brayton veya Rankine varsayımları; ayrıca ölçülen ya da girilen basınç/sıcaklık durumları.' },
                { name: 'Akışkan özellikleri', desc: 'Gerektiğinde gaz sabitleri, özgül ısılar, buhar tabloları veya çalışma akışkanı özellikleri.' },
                { name: 'Ölçülen basınç/hacim verisi', desc: 'Test verisini ideal çevrimle üst üste koymak için opsiyonel gerçek p-V izleri.' },
            ],
            formulas: [
                { title: 'Isıl verim', latex: '\\eta_{th}=\\dfrac{W_{net}}{Q_{in}}=1-\\dfrac{Q_{out}}{Q_{in}}', expr: 'ηth = Wnet/Qin = 1 - Qout/Qin', where: 'Sağlanan ısının ne kadarının yararlı net işe dönüştüğünü gösterir.' },
                { title: 'Otto ideal verimi', latex: '\\eta_{Otto}=1-\\dfrac{1}{r^{\\gamma-1}}', expr: 'ηOtto = 1 - 1/r^(γ-1)', where: 'Buji ateşlemeli motorlar için sıkıştırma oranına dayanan kompakt bir ideal referanstır.' },
                { title: 'p-V diyagramında net iş', latex: 'W_{net}=\\oint p\\,dV', expr: 'Wnet = ∮ p dV', where: 'p-V çevrimi içindeki alan yararlı çevrim işidir.' },
            ],
            assumptions: [
                { name: 'İdeal çevrimler referanstır', desc: 'Gerçek performans vaadi değildir; en iyi durum yapısını gösterir ve gerçek kayıpların nereden girdiğini görünür kılar.' },
                { name: 'Özellik seçimi önemlidir', desc: 'Sabit özgül ısılar basittir, fakat yüksek doğruluk için değişken özellikler veya buhar tabloları gerekebilir.' },
                { name: 'Ölçülen üst üste bindirme tutarlı durum ister', desc: 'Basınç, hacim, sıcaklık ve zamanlama aynı çevrim durumlarına karşılık gelmelidir.' },
            ],
            steps: [
                { step: 'Çevrim ailesini seç', detail: 'Makineye veya yapmak istediğiniz karşılaştırmaya uygun ideal modeli seçin.' },
                { step: 'Durum verisini gir', detail: 'Basınç, sıcaklık, sıkıştırma/basınç oranları, ısı girişi veya ölçülen izleri sağlayın.' },
                { step: 'İdeal diyagramları kur', detail: 'İş ve ısı alanlarıyla p-V ve T-S diyagramlarını üretin.' },
                { step: 'Ölçülen davranışı bindir', detail: 'Ölçülen iz varsa gerçek veriyi ideal modelin üzerine koyun.' },
                { step: 'Farkı nicelleştir', detail: 'Verim, net iş ve ana kayıp göstergelerini raporlayın.' },
            ],
            exampleMetrics: [
                { value: 'ηth = %38,5', label: 'Isıl verim', desc: 'Seçilen çevrim tanımında sağlanan ısının %38,5’i net işe dönüşüyor.' },
                { value: 'Wnet = 1,24 kJ/çevrim', label: 'Çevrim işi', desc: 'p-V alanı çevrim başına 1,24 kJ net işe karşılık geliyor.' },
                { value: 'İdeal fark = 7,8 puan', label: 'Kayıp göstergesi', desc: 'Ölçülen çevrim, seçilen ideal referansın 7,8 yüzde puanı altında.' },
            ],
            outputs: [
                { name: 'p-V ve T-S diyagramları', desc: 'İdeal ve ölçülen çevrim grafikleri, iş ve ısı alanlarıyla.' },
                { name: 'Verim tablosu', desc: 'Isıl verim, ısı girişi/çıkışı ve net iş.' },
                { name: 'Durum noktası tablosu', desc: 'Ana çevrim durumlarında basınç, sıcaklık, hacim ve entropi.' },
                { name: 'İdeal-ölçülen karşılaştırması', desc: 'Referans çevrim ile gerçek ölçüm arasındaki net fark.' },
            ],
        },
    },

    work_cycle_analysis: {
        slug: 'work-cycle-analysis',
        en: {
            tagline: 'Calculates work loops for reciprocating engines and compressors, separating useful indicated work from pumping, friction and sealing-related losses.',
            intro: 'A pressure-volume loop is one of the most direct ways to see what a reciprocating machine is doing. The area inside the loop is work. By separating high-pressure and low-pressure parts of the cycle, this module shows how much work is produced or consumed, how much is lost to pumping, and whether compression or expansion behavior looks healthy.',
            inputs: [
                { name: 'Pressure and volume data', desc: 'Measured cylinder pressure plus volume from geometry or a supplied volume channel.' },
                { name: 'Crank angle or cycle marker', desc: 'Used to segment cycles and separate compression, expansion, intake and exhaust portions.' },
                { name: 'Brake torque or shaft power', desc: 'Optional, used to compare indicated and brake work and estimate friction losses.' },
            ],
            formulas: [
                { title: 'Indicated work', latex: 'W_i=\\oint p\\,dV', expr: 'Wi = ∮ p dV', where: 'The closed p-V loop area gives indicated work for one cycle.' },
                { title: 'Mean effective pressure', latex: 'IMEP=\\dfrac{W_i}{V_d}', expr: 'IMEP = Wi/Vd', where: 'Normalizes work by displacement so different engines or compressors can be compared.' },
                { title: 'Friction mean effective pressure', latex: 'FMEP=IMEP-BMEP', expr: 'FMEP = IMEP - BMEP', where: 'The difference between indicated and brake output represents friction and accessory losses.' },
                { title: 'Polytropic relation', latex: 'pV^n=C', expr: 'p·V^n = C', where: 'Compression and expansion strokes can be fit to estimate the polytropic exponent and sealing behavior.' },
            ],
            assumptions: [
                { name: 'Cycle segmentation must be stable', desc: 'Wrong cycle boundaries change the integrated loop area and therefore every work metric.' },
                { name: 'Absolute pressure reference is important', desc: 'Offset pressure shifts the p-V loop and can bias IMEP, PMEP and polytropic fits.' },
                { name: 'Brake comparison needs reliable torque', desc: 'FMEP is only meaningful when shaft torque or brake power is measured consistently.' },
            ],
            steps: [
                { step: 'Segment each cycle', detail: 'Use crank angle or markers to isolate complete cycles.' },
                { step: 'Build p-V loops', detail: 'Pair pressure with volume and draw the full, high-pressure and low-pressure loops.' },
                { step: 'Integrate work areas', detail: 'Calculate indicated work, gross/net IMEP and PMEP.' },
                { step: 'Compare brake output', detail: 'When torque is available, compute BMEP and FMEP.' },
                { step: 'Fit compression and expansion', detail: 'Estimate polytropic exponents to check heat transfer and sealing.' },
            ],
            exampleMetrics: [
                { value: 'IMEP = 9.6 bar', label: 'Indicated load', desc: 'The cylinder is producing 9.6 bar mean effective pressure from the measured p-V loop.' },
                { value: 'PMEP = -0.38 bar', label: 'Pumping work', desc: 'The low-pressure loop is costing 0.38 bar of mean effective pressure.' },
                { value: 'n_comp = 1.31', label: 'Compression exponent', desc: 'Compression behavior is close to a typical heat-transfer-influenced polytropic value.' },
            ],
            outputs: [
                { name: 'p-V work-loop plots', desc: 'Full, high-pressure and pumping loops per cycle and averaged.' },
                { name: 'MEP table', desc: 'IMEP, PMEP, BMEP and FMEP where channels support them.' },
                { name: 'Polytropic fit report', desc: 'Compression and expansion exponents with fit quality.' },
                { name: 'Cycle comparison summary', desc: 'Work and loss metrics across cylinders, speed points or test runs.' },
            ],
        },
        tr: {
            tagline: 'Pistonlu motor ve kompresörler için iş çevrimlerini hesaplar; yararlı indike işi pompalama, sürtünme ve sızdırmazlıkla ilişkili kayıplardan ayırır.',
            intro: 'Basınç-hacim çevrimi, pistonlu bir makinenin ne yaptığını görmenin en doğrudan yollarından biridir. Çevrimin içindeki alan iştir. Bu modül çevrimin yüksek basınç ve düşük basınç kısımlarını ayırarak ne kadar iş üretildiğini veya tüketildiğini, pompalamaya ne kadar iş gittiğini ve sıkıştırma/genleşme davranışının sağlıklı görünüp görünmediğini gösterir.',
            inputs: [
                { name: 'Basınç ve hacim verisi', desc: 'Ölçülen silindir basıncı ve geometriden üretilen ya da ayrı verilen hacim kanalı.' },
                { name: 'Krank açısı veya çevrim işareti', desc: 'Çevrimleri bölmek ve sıkıştırma, genleşme, emme, egzoz kısımlarını ayırmak için kullanılır.' },
                { name: 'Fren torku veya mil gücü', desc: 'Opsiyonel; indike iş ile fren işini karşılaştırmak ve sürtünme kayıplarını tahmin etmek için kullanılır.' },
            ],
            formulas: [
                { title: 'İndike iş', latex: 'W_i=\\oint p\\,dV', expr: 'Wi = ∮ p dV', where: 'Kapalı p-V çevriminin alanı bir çevrimin indike işini verir.' },
                { title: 'Ortalama etkin basınç', latex: 'IMEP=\\dfrac{W_i}{V_d}', expr: 'IMEP = Wi/Vd', where: 'İşi deplasmana böler; böylece farklı motor veya kompresörler karşılaştırılabilir.' },
                { title: 'Sürtünme ortalama etkin basıncı', latex: 'FMEP=IMEP-BMEP', expr: 'FMEP = IMEP - BMEP', where: 'İndike çıktı ile fren çıktısı arasındaki fark sürtünme ve yardımcı ekipman kayıplarını temsil eder.' },
                { title: 'Politropik bağıntı', latex: 'pV^n=C', expr: 'p·V^n = C', where: 'Sıkıştırma ve genleşme strokları politropik üs ve sızdırmazlık davranışı için uydurulabilir.' },
            ],
            assumptions: [
                { name: 'Çevrim bölütleme kararlı olmalı', desc: 'Yanlış çevrim sınırları integre edilen alanı ve dolayısıyla tüm iş metriklerini değiştirir.' },
                { name: 'Mutlak basınç referansı önemlidir', desc: 'Basınç ofseti p-V çevrimini kaydırır ve IMEP, PMEP ve politropik uyumları saptırabilir.' },
                { name: 'Fren karşılaştırması güvenilir tork ister', desc: 'FMEP yalnızca mil torku veya fren gücü tutarlı ölçüldüğünde anlamlıdır.' },
            ],
            steps: [
                { step: 'Her çevrimi böl', detail: 'Tam çevrimleri ayırmak için krank açısı veya işaretçileri kullanın.' },
                { step: 'p-V çevrimlerini kur', detail: 'Basıncı hacimle eşleyip tam, yüksek basınç ve düşük basınç çevrimlerini çizin.' },
                { step: 'İş alanlarını integre et', detail: 'İndike iş, brüt/net IMEP ve PMEP değerlerini hesaplayın.' },
                { step: 'Fren çıktısıyla karşılaştır', detail: 'Tork varsa BMEP ve FMEP hesaplayın.' },
                { step: 'Sıkıştırma ve genleşmeyi uydur', detail: 'Isı transferi ve sızdırmazlığı kontrol etmek için politropik üsleri tahmin edin.' },
            ],
            exampleMetrics: [
                { value: 'IMEP = 9,6 bar', label: 'İndike yük', desc: 'Silindir, ölçülen p-V çevriminden 9,6 bar ortalama etkin basınç üretiyor.' },
                { value: 'PMEP = -0,38 bar', label: 'Pompalama işi', desc: 'Düşük basınç çevrimi 0,38 bar ortalama etkin basınç maliyeti getiriyor.' },
                { value: 'n_sıkıştırma = 1,31', label: 'Sıkıştırma üssü', desc: 'Sıkıştırma davranışı ısı transferinden etkilenen tipik bir politropik değere yakın.' },
            ],
            outputs: [
                { name: 'p-V iş çevrimi grafikleri', desc: 'Çevrim başına ve ortalama tam, yüksek basınç ve pompalama çevrimleri.' },
                { name: 'MEP tablosu', desc: 'Kanallar destekliyorsa IMEP, PMEP, BMEP ve FMEP.' },
                { name: 'Politropik uyum raporu', desc: 'Sıkıştırma ve genleşme üsleri, uyum kalitesiyle birlikte.' },
                { name: 'Çevrim karşılaştırma özeti', desc: 'Silindirler, hız noktaları veya test koşuları arasında iş ve kayıp metrikleri.' },
            ],
        },
    },
}

export default THERMOFLUIDS_WIDGET_DETAILS
