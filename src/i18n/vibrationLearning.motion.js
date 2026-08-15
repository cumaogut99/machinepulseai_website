const MOTION_LEARNING = {
    cross_axis_compensation: {
        en: {
            title: 'Cross-Axis Compensation: separate real motion from sensor coupling',
            intro: 'Learn how the widget uses a 3×3 sensitivity matrix to correct triaxial accelerometer leakage, accepts ratio or percent entry, imports calibration information, validates invertibility, and gates data-estimated matrices with condition number, coupling and coherence evidence.',
            badges: ['3×3 sensitivity matrix', 'Ratio or percent entry', 'Calibration import / estimation', 'Condition & coupling checks'], duration: 'About 17 minutes · beginner to specialist',
            outcomes: ['Explain diagonal sensitivity and off-diagonal cross-axis coupling.', 'Enter the same calibration correctly as ratios or percentages.', 'Recognize ill-conditioning and the risk of noise amplification.', 'Decide when a manufacturer calibration is trustworthy and when an operational-data estimate needs review.'],
            interface: { title: 'Three raw axes, one calibrated coordinate system', intro: 'The future screenshot will show channel/unit selection, ratio/percent matrix entry, identity reset, calibration import, matrix estimation, safety gate and compensated results. The guide below follows those current capabilities.' },
            theory: { title: 'A triaxial sensor measures a mixed vector', intro: 'Each electrical output is mainly sensitive to its intended axis, but also responds slightly to perpendicular acceleration. The sensitivity matrix describes that linear mixing.', cards: [
                { kicker: 'START HERE', title: 'The diagonal is main-axis sensitivity', body: 'Ideal normalized calibration has ones on the diagonal. Real calibration can include gain error, so diagonal values may differ slightly and should not be silently forced to one.' },
                { kicker: 'CROSS-TALK', title: 'Off-diagonal terms describe leakage', body: 'Sxy means true Y motion contributes to measured X. A value of 0.02 is the same as 2%, not 0.02%.' },
                { kicker: 'THE CORRECTION', title: 'Invert the measurement model', body: 'If measured = S × true, compensated motion is S⁻¹ × measured. The inversion removes systematic coupling but also transforms measurement noise.' },
            ] },
            foundations: { title: 'Matrix quality matters more than decimal precision', intro: 'A beautifully formatted matrix can be physically wrong, singular or poorly conditioned. Validation must precede per-sample correction.', cards: [
                { title: 'Condition number', body: 'A high condition number means small calibration or noise errors can produce large output error. Inversion may be mathematically possible yet operationally unsafe.' },
                { title: 'Coordinate conventions', body: 'Matrix row/column meaning, sensor axes, channel order, signs and units must match the calibration sheet. Transposing the matrix can produce plausible but wrong data.' },
                { title: 'Estimation from operational data', body: 'Least-squares estimation needs enough independent excitation directions. Machine motion that is strongly correlated across axes cannot uniquely reveal sensor cross-sensitivity.' },
            ] },
            modes: { title: 'Three ways to define the matrix', intro: 'Use the most traceable source available and preserve its convention.', items: [
                { title: 'Manual sensitivity ratio', bestFor: 'Entering a normalized 3×3 matrix directly from a calibration report.', reveals: 'Exact diagonal and off-diagonal coefficients used by the inverse.', watch: 'Confirm whether the report maps true-to-measured or measured-to-true; the inverse direction matters.' },
                { title: 'Manual cross-axis percent / import', bestFor: 'Reports that state off-axis response as percentages or a structured sheet.', reveals: 'The same matrix with percent-friendly off-diagonal entry and traceable source.', watch: '2 means 2% in percent mode but a factor of two in ratio mode.' },
                { title: 'Estimate from data', bestFor: 'Controlled multi-direction calibration data when a matrix is unavailable.', reveals: 'A least-squares matrix plus coupling proxy, condition number, inter-axis coherence and accept/review verdict.', watch: 'Operational correlation is not calibration; use the safety gate and do not accept a convenient identity-like answer blindly.' },
            ] },
            interpretation: { intro: 'A successful correction reduces known leakage without creating implausible motion or noise.', items: [
                { title: 'Off-axis tone drops on compensated channels', signal: 'A tone intentionally excited on one axis shrinks on the other two after correction.', meaning: 'The matrix is removing systematic coupling in the expected direction.', confirm: 'Repeat for multiple excitation axes and frequencies within the calibrated range.' },
                { title: 'Noise floor rises strongly', signal: 'Compensated channels become visibly noisier even though cross-talk falls.', meaning: 'The inverse is amplifying noise, often because the matrix is ill-conditioned or the coefficients are too aggressive.', confirm: 'Inspect condition number, calibration uncertainty and whether regularized/retested calibration is required.' },
                { title: 'Estimated matrix follows operating coherence', signal: 'Large off-diagonal values appear between axes that are physically excited together.', meaning: 'The estimator may be fitting real coupled motion as if it were sensor leakage.', confirm: 'Use controlled orthogonal calibration or a manufacturer matrix; keep the result in review state.' },
            ] },
            workflow: { title: 'A traceable compensation workflow', intro: 'Treat the matrix as calibration data with provenance, not as a tuning knob.', checklist: ['Confirm X/Y/Z channel order, polarity and engineering unit.', 'Read the calibration sheet convention before entering rows and columns.', 'Select ratio or percent mode deliberately and verify one off-diagonal conversion.', 'Check determinant/condition number before applying the inverse.', 'If estimating, use controlled independent axis excitations and review coherence.', 'Compare raw and compensated spectra/time histories for each axis.', 'Store the matrix source, date, sensor serial number and validation result with the analysis.'] },
            mistakes: [
                { title: 'Confusing 0.02 with 0.02%', body: '0.02 as a ratio equals 2%. Entry-mode confusion changes correction by a factor of one hundred.' },
                { title: 'Transposing the calibration matrix', body: 'Rows usually describe measured outputs and columns true input axes, but sheets vary. Verify the equation, not just the table shape.' },
                { title: 'Assuming inversion always improves data', body: 'A poorly conditioned matrix can amplify noise and calibration uncertainty more than it removes cross-talk.' },
                { title: 'Estimating cross-axis sensitivity from one operating direction', body: 'Without independent directional excitation, true structural coupling and sensor leakage are not separately identifiable.' },
            ],
            sources: [
                { title: 'ISO 16063-31:2009 + Amd 1:2025', note: 'Testing transverse sensitivity of velocity and acceleration transducers, including multi-axis excitation methods.', href: 'https://www.iso.org/standard/36407.html' },
                { title: 'ISO 16063-31 Amendment 1:2025', note: 'The current amendment attached to the transverse-sensitivity calibration standard.', href: 'https://www.iso.org/standard/85633.html' },
                { title: 'ISO 21289:2008', note: 'Measurement parameters and metadata that should accompany vibration acquisition.', href: 'https://www.iso.org/ics/17.160/x/' },
            ] },
        tr: {
            title: 'Eksenler Arası Kompanzasyon: gerçek hareketi sensör bağlaşımından ayırın',
            intro: 'Widget’ın üç eksenli ivmeölçer sızıntısını düzeltmek için 3×3 duyarlılık matrisini nasıl kullandığını; oran veya yüzde girişini, kalibrasyon içe aktarmayı, terslenebilirlik kontrolünü ve veriden kestirilen matrisi koşul sayısı, bağlaşım ve koherans kanıtıyla nasıl güvenlik kapısından geçirdiğini öğrenin.',
            badges: ['3×3 duyarlılık matrisi', 'Oran veya yüzde girişi', 'Kalibrasyon içe aktarma / kestirim', 'Koşul ve bağlaşım kontrolü'], duration: 'Yaklaşık 17 dakika · başlangıçtan uzmana',
            outcomes: ['Ana eksen duyarlılığı ile diyagonal dışı bağlaşımı açıklamak.', 'Aynı kalibrasyonu oran veya yüzde olarak doğru girmek.', 'Kötü koşullanmayı ve gürültü büyütme riskini tanımak.', 'Üretici kalibrasyonuna ne zaman güvenileceğini ve operasyon verisi kestiriminin ne zaman inceleme istediğini belirlemek.'],
            interface: { title: 'Üç ham eksen, tek kalibre koordinat sistemi', intro: 'İlerideki ekran görüntüsü kanal/birim seçimini, oran/yüzde matris girişini, birim matrise sıfırlamayı, kalibrasyon içe aktarmayı, matris kestirimini, güvenlik kapısını ve kompanze sonuçları gösterecek. Rehber bu yetenekleri izler.' },
            theory: { title: 'Üç eksenli sensör karışmış bir vektör ölçer', intro: 'Her elektriksel çıkış ağırlıkla hedef eksene duyarlıdır, fakat dik ivmeye de az miktarda cevap verir. Duyarlılık matrisi bu doğrusal karışımı tarif eder.', cards: [
                { kicker: 'BURADAN BAŞLAYIN', title: 'Diyagonal ana eksen duyarlılığıdır', body: 'İdeal normalize kalibrasyonda diyagonal birlerden oluşur. Gerçek kalibrasyon kazanç hatası içerebilir; diyagonal değerler az farklı olabilir ve sessizce bire zorlanmamalıdır.' },
                { kicker: 'ÇAPRAZ BAĞLAŞIM', title: 'Diyagonal dışı terimler sızıntıyı anlatır', body: 'Sxy, gerçek Y hareketinin ölçülen X’e katkısını gösterir. 0,02 değeri %2 demektir; %0,02 değil.' },
                { kicker: 'DÜZELTME', title: 'Ölçüm modelini tersleyin', body: 'Ölçülen = S × gerçek ise kompanze hareket S⁻¹ × ölçülendir. Tersleme sistematik bağlaşımı kaldırır ama ölçüm gürültüsünü de dönüştürür.' },
            ] },
            foundations: { title: 'Matris kalitesi ondalık basamak sayısından önemlidir', intro: 'Güzel yazılmış matris fiziksel olarak yanlış, tekil veya kötü koşullu olabilir. Her örneğe düzeltme uygulamadan önce doğrulama gerekir.', cards: [
                { title: 'Koşul sayısı', body: 'Yüksek koşul sayısı küçük kalibrasyon/gürültü hatasının büyük çıkış hatası üretmesi demektir. Tersleme matematiksel olarak mümkün ama operasyonel olarak güvensiz olabilir.' },
                { title: 'Koordinat kuralları', body: 'Satır/sütun anlamı, sensör eksenleri, kanal sırası, işaret ve birimler kalibrasyon sayfasıyla eşleşmelidir. Matrisi transpoze etmek makul görünen ama yanlış veri üretebilir.' },
                { title: 'Operasyon verisinden kestirim', body: 'En küçük kareler kestirimi yeterli bağımsız uyarma yönü ister. Eksenler arası güçlü korelasyonlu makine hareketi sensör çapraz duyarlılığını benzersiz biçimde belirleyemez.' },
            ] },
            modes: { title: 'Matrisi tanımlamanın üç yolu', intro: 'En izlenebilir kaynağı kullanın ve matris kuralını koruyun.', items: [
                { title: 'Manuel duyarlılık oranı', bestFor: 'Normalize 3×3 matrisi kalibrasyon raporundan doğrudan girmek.', reveals: 'Terslemede kullanılan kesin diyagonal ve diyagonal dışı katsayılar.', watch: 'Raporun gerçek→ölçülen mi, ölçülen→gerçek mi verdiğini doğrulayın; tersleme yönü önemlidir.' },
                { title: 'Manuel çapraz eksen yüzdesi / içe aktarma', bestFor: 'Diyagonal dışı cevabı yüzde veya yapılandırılmış sayfa olarak veren raporlar.', reveals: 'Yüzde dostu giriş ve izlenebilir kaynakla aynı matris.', watch: '2 değeri yüzde modunda %2, oran modunda iki kat demektir.' },
                { title: 'Veriden kestir', bestFor: 'Matris yoksa kontrollü çok yönlü kalibrasyon verisi.', reveals: 'En küçük kareler matrisi, bağlaşım göstergesi, koşul sayısı, eksenler arası koherans ve kabul/incele hükmü.', watch: 'Operasyon korelasyonu kalibrasyon değildir; güvenlik kapısını kullanın ve kolay kimlik-matris benzeri sonucu körlemesine kabul etmeyin.' },
            ] },
            interpretation: { intro: 'Başarılı düzeltme bilinen sızıntıyı azaltırken gerçek dışı hareket veya gürültü yaratmaz.', items: [
                { title: 'Kompanze kanalda eksen dışı ton azalıyor', signal: 'Bir eksende kasıtlı uyarılan ton, düzeltmeden sonra diğer iki eksende küçülür.', meaning: 'Matris beklenen yönde sistematik bağlaşımı kaldırıyordur.', confirm: 'Kalibre frekans aralığında birden fazla uyarma ekseniyle tekrarlayın.' },
                { title: 'Gürültü tabanı çok yükseliyor', signal: 'Çapraz konuşma azalırken kompanze kanallar belirgin gürültülü olur.', meaning: 'Matris kötü koşullu veya katsayılar aşırı olduğu için tersleme gürültüyü büyütüyordur.', confirm: 'Koşul sayısını, kalibrasyon belirsizliğini ve yeniden/regularize kalibrasyon gereğini inceleyin.' },
                { title: 'Kestirilen matris çalışma koheransını izliyor', signal: 'Fiziksel olarak birlikte uyarılan eksenler arasında büyük diyagonal dışı değerler çıkar.', meaning: 'Kestirici gerçek bağlı hareketi sensör sızıntısı gibi uyduruyor olabilir.', confirm: 'Kontrollü dik kalibrasyon veya üretici matrisi kullanın; sonucu inceleme durumunda tutun.' },
            ] },
            workflow: { title: 'İzlenebilir kompanzasyon iş akışı', intro: 'Matrise ayar düğmesi değil, kaynağı olan kalibrasyon verisi gibi davranın.', checklist: ['X/Y/Z kanal sırasını, polariteyi ve mühendislik birimini doğrulayın.', 'Satır ve sütun girmeden önce kalibrasyon sayfası kuralını okuyun.', 'Oran veya yüzde modunu bilinçli seçip bir diyagonal dışı dönüşümü kontrol edin.', 'Tersi uygulamadan önce determinant/koşul sayısını denetleyin.', 'Kestirimde kontrollü bağımsız eksen uyarmaları kullanın ve koheransı inceleyin.', 'Her eksende ham ve kompanze spektrum/zaman sinyalini karşılaştırın.', 'Matris kaynağını, tarihi, sensör seri numarasını ve doğrulama sonucunu analizle saklayın.'] },
            mistakes: [
                { title: '0,02 ile %0,02’yi karıştırmak', body: 'Oran olarak 0,02, %2’ye eşittir. Giriş modu karışıklığı düzeltmeyi yüz kat değiştirir.' },
                { title: 'Kalibrasyon matrisini transpoze etmek', body: 'Satırlar çoğunlukla ölçülen çıkışı, sütunlar gerçek giriş eksenini anlatır; ama raporlar değişir. Tablo şekli yerine denklemi doğrulayın.' },
                { title: 'Terslemenin veriyi her zaman iyileştireceğini sanmak', body: 'Kötü koşullu matris gürültü ve kalibrasyon belirsizliğini, kaldırdığı çapraz konuşmadan daha çok büyütebilir.' },
                { title: 'Tek çalışma yönünden çapraz duyarlılık kestirmek', body: 'Bağımsız yönlü uyarma olmadan gerçek yapısal bağlaşım ile sensör sızıntısı ayrı tanımlanamaz.' },
            ],
            sources: [
                { title: 'ISO 16063-31:2009 + Amd 1:2025', note: 'Çok eksenli uyarma yöntemleri dâhil hız ve ivme dönüştürücülerinde enine duyarlılık testi.', href: 'https://www.iso.org/standard/36407.html' },
                { title: 'ISO 16063-31 Amendment 1:2025', note: 'Enine duyarlılık kalibrasyon standardına bağlı güncel değişiklik.', href: 'https://www.iso.org/standard/85633.html' },
                { title: 'ISO 21289:2008', note: 'Titreşim ölçümüne eşlik etmesi gereken ölçüm parametreleri ve meta veriler.', href: 'https://www.iso.org/ics/17.160/x/' },
            ] },
    },
    kinematics_6dof: {
        en: {
            title: 'Kinematic Chain (6-DOF): reconstruct motion without letting drift tell the story',
            intro: 'Learn the widget’s three actual input modes—single triaxial, rigid-body accelerometer array and IMU—plus time/frequency integration, high-pass or Kalman drift control, translation/rotation outputs, trajectory metrics, static tilt and ISO 2631 Wd/Wk comfort measures.',
            badges: ['Single triaxial · array · IMU', 'Time or frequency integration', 'High-pass / Kalman drift control', 'ISO 2631 Wd · Wk'], duration: 'About 23 minutes · beginner to specialist',
            outcomes: ['Choose the input mode from the sensors and physical question.', 'Explain why acceleration integration drifts and what each correction removes.', 'Separate translation, rotation and gravity-related tilt in a consistent frame.', 'Interpret weighted RMS, VDV, MTVV and trajectory metrics without mixing their meanings.'],
            interface: { title: 'From sensor channels to motion, exposure and trajectory', intro: 'The final screenshot will show input mode, channel/geometry mapping, sample rate, integration domain, drift method, output quantities, ISO weighting and metric families. The guide below maps directly to those controls.' },
            theory: { title: 'A rigid body has three translations and three rotations', intro: 'A point on a rigid body accelerates because the reference point translates and because angular acceleration and angular velocity act through its position vector. Multiple known sensor positions let the solver separate those terms.', cards: [
                { kicker: 'START HERE', title: 'One triaxial sensor is not full 6-DOF', body: 'A single XYZ accelerometer measures local linear acceleration plus gravity in its frame. It cannot uniquely recover all rotations; use an array or gyro-equipped IMU for angular motion.' },
                { kicker: 'ARRAY MODE', title: 'Geometry turns differences into rotation', body: 'When at least six mapped accelerometer channels observe known positions and axes, spatial acceleration differences constrain rigid-body angular acceleration and reference-point translation.' },
                { kicker: 'IMU MODE', title: 'Gyros measure angular rate directly', body: 'Three acceleration plus three gyro channels provide translation-related acceleration and angular velocity. Bias and frame alignment still matter, especially after integrating angle or displacement.' },
            ] },
            foundations: { title: 'Integration is an error amplifier at low frequency', intro: 'Dividing by jω once gives velocity and twice gives displacement. Near zero frequency, small bias and sensor tilt become very large trends.', cards: [
                { title: 'Time versus frequency domain', body: 'Trapezoidal time integration preserves chronology but accumulates offset. Frequency integration can suppress/handle DC explicitly, but finite records, edges and cutoff choices still shape the result.' },
                { title: 'Drift compensation', body: 'High-pass filtering imposes a clear low-frequency cutoff; a Kalman smoother uses a state/noise model. Both can remove real slow motion if tuned too aggressively.' },
                { title: 'Coordinate frames and gravity', body: 'Sensor axes, body frame and reference point must be explicit. Static gravity components support tilt estimation, but dynamic acceleration contaminates tilt during rapid motion.' },
            ] },
            modes: { title: 'Choose input mode and output family together', intro: 'The widget exposes different physical claims depending on the available sensors.', items: [
                { title: 'Single triaxial X/Y/Z', bestFor: 'Local acceleration, integrated velocity/displacement, ride comfort and basic tilt at one point.', reveals: 'Per-axis motion, RMS trends, trajectory and ISO 2631 weighting.', watch: 'Do not report full rigid-body rotation from one accelerometer.' },
                { title: 'Rigid-body accelerometer array', bestFor: 'Separating reference-point translation and angular acceleration from spatial measurements.', reveals: 'Translational and angular acceleration, integrated angular velocity/displacement and 6-DOF motion.', watch: 'Poor geometry, coplanar sensitivity or incorrect axis mapping makes the solve ill-conditioned.' },
                { title: 'IMU · 3 accel + 3 gyro', bestFor: 'Combined translation and directly measured angular-rate motion.', reveals: 'Acceleration, velocity, displacement, angular velocity/angle, tilt and trajectory metrics.', watch: 'Gyro bias and accelerometer bias integrate into angle and position drift; alignment and correction remain essential.' },
            ] },
            interpretation: { intro: 'Read motion together with the filtering and frame assumptions that created it.', items: [
                { title: 'Displacement grows smoothly without returning', signal: 'Integrated position drifts even though the body should be stationary after the event.', meaning: 'Residual bias, gravity projection or low-frequency noise is being integrated.', confirm: 'Inspect corrected acceleration, try a justified cutoff/model and compare endpoints with an independent displacement reference.' },
                { title: 'Array reports rotation during pure translation', signal: 'Angular channels rise while all sensors should move together.', meaning: 'Geometry, channel sign/axis or sensor gain may be inconsistent.', confirm: 'Apply a known rigid translation and inspect the solve condition/residual before using field data.' },
                { title: 'VDV high while weighted RMS is moderate', signal: 'Fourth-power dose responds strongly to brief shocks that contribute modestly to average energy.', meaning: 'Transient ride events dominate exposure more than continuous vibration.', confirm: 'Check pulse reality, weighting direction and evaluation duration; inspect MTVV and the time waveform.' },
            ] },
            workflow: { title: 'A frame-aware motion reconstruction workflow', intro: 'Define geometry and the lowest motion frequency you need before choosing drift suppression.', checklist: ['Document sensor positions, sensitive axes, signs, units and body/reference frames.', 'Choose single, array or IMU mode from what the hardware can actually identify.', 'Remove DC only when the physical mean should be zero.', 'Set high-pass cutoff below the lowest real motion of interest and report it.', 'Validate array/IMU motion with a known translation and rotation before field use.', 'Use Wd for horizontal and Wk for vertical ISO 2631 directions, or the widget’s combined option with correct axes.', 'Report integration domain, drift method and evaluation duration with every displacement/exposure result.'] },
            mistakes: [
                { title: 'Double-integrating raw acceleration', body: 'Tiny offset and gravity leakage grow into large quadratic displacement drift. Correction and an independent plausibility check are mandatory.' },
                { title: 'Calling a single triaxial sensor 6-DOF', body: 'Three acceleration axes at one point do not uniquely separate three translations and three rotations.' },
                { title: 'Using high-pass filtering to force the desired displacement', body: 'Raising the cutoff can make drift disappear by deleting real slow motion. Select it from physics, not appearance.' },
                { title: 'Mixing Wd and Wk directions', body: 'ISO 2631 frequency sensitivity differs horizontally and vertically. Weighting must follow the body axis and assessment context.' },
            ],
            sources: [
                { title: 'ISO 2631-1:1997 + Amd 1:2010', note: 'General whole-body vibration exposure evaluation, frequency weighting and assessment concepts.', href: 'https://www.iso.org/standard/7612.html' },
                { title: 'ISO/DIS 2631-1', note: 'The third-edition revision currently under development; useful for tracking future changes without presenting the draft as published law.', href: 'https://www.iso.org/standard/85768.html' },
                { title: 'ISO 21289:2008', note: 'Acquisition parameters and metadata for vibration and shock measurements.', href: 'https://www.iso.org/ics/17.160/x/' },
            ] },
        tr: {
            title: 'Kinematik Zincir (6-DOF): kaymanın hikâyeyi yazmasına izin vermeden hareketi kurun',
            intro: 'Widget’ın üç gerçek giriş modunu—tek üç eksenli, rijit cisim ivmeölçer dizisi ve IMU—; zaman/frekans entegrasyonunu, yüksek geçiren veya Kalman kayma kontrolünü, öteleme/dönme çıktılarını, yörünge metriklerini, statik eğimi ve ISO 2631 Wd/Wk konfor ölçülerini öğrenin.',
            badges: ['Tek üç eksen · dizi · IMU', 'Zaman veya frekans entegrasyonu', 'Yüksek geçiren / Kalman kayma kontrolü', 'ISO 2631 Wd · Wk'], duration: 'Yaklaşık 23 dakika · başlangıçtan uzmana',
            outcomes: ['Sensör ve fiziksel soruya göre giriş modunu seçmek.', 'İvme entegrasyonunun neden kaydığını ve her düzeltmenin neyi kaldırdığını açıklamak.', 'Öteleme, dönme ve yerçekimine bağlı eğimi tutarlı koordinat sisteminde ayırmak.', 'Ağırlıklı RMS, VDV, MTVV ve yörünge metriklerini anlamlarını karıştırmadan yorumlamak.'],
            interface: { title: 'Sensör kanallarından hareket, maruziyet ve yörüngeye', intro: 'Son ekran görüntüsü giriş modunu, kanal/geometri eşlemesini, örnekleme hızını, entegrasyon alanını, kayma yöntemini, çıktı büyüklüklerini, ISO ağırlığını ve metrik ailelerini gösterecek. Rehber bu kontrollere doğrudan karşılık gelir.' },
            theory: { title: 'Rijit cismin üç öteleme ve üç dönme serbestliği vardır', intro: 'Rijit cisimde bir nokta, referans noktasının ötelemesi ve açısal ivme/hızın konum vektörü üzerinden etkisiyle ivmelenir. Konumu bilinen çoklu sensörler bu terimleri ayırır.', cards: [
                { kicker: 'BURADAN BAŞLAYIN', title: 'Tek üç eksenli sensör tam 6-DOF değildir', body: 'Tek XYZ ivmeölçer kendi çerçevesinde yerel doğrusal ivme ile yerçekimini ölçer. Tüm dönüşleri benzersiz çıkaramaz; açısal hareket için dizi veya jiroskoplu IMU gerekir.' },
                { kicker: 'DİZİ MODU', title: 'Geometri farkları dönmeye çevirir', body: 'Bilinen konum ve eksenlerde en az altı eşlenmiş ivme kanalı, uzamsal ivme farklarıyla rijit cismin açısal ivmesini ve referans noktası ötelemesini kısıtlar.' },
                { kicker: 'IMU MODU', title: 'Jiroskoplar açısal hızı doğrudan ölçer', body: 'Üç ivme ve üç jiroskop kanalı öteleme ilişkili ivme ile açısal hızı sağlar. Özellikle açı veya konum entegrasyonunda bias ve çerçeve hizası önemini korur.' },
            ] },
            foundations: { title: 'Entegrasyon düşük frekansta hata büyütücüdür', intro: 'jω’ya bir kez bölmek hız, iki kez bölmek yer değiştirme verir. Sıfıra yakın frekansta küçük bias ve sensör eğimi çok büyük trende dönüşür.', cards: [
                { title: 'Zaman ve frekans alanı', body: 'Trapez zaman entegrasyonu kronolojiyi korur ama ofseti biriktirir. Frekans entegrasyonu DC’yi açıkça bastırabilir/ele alabilir; yine de sonlu kayıt, kenar ve kesim seçimi sonucu biçimlendirir.' },
                { title: 'Kayma kompanzasyonu', body: 'Yüksek geçiren filtre açık düşük frekans kesimi dayatır; Kalman yumuşatıcı durum/gürültü modeli kullanır. İkisi de aşırı ayarda gerçek yavaş hareketi silebilir.' },
                { title: 'Koordinat çerçevesi ve yerçekimi', body: 'Sensör ekseni, gövde çerçevesi ve referans noktası açık olmalıdır. Statik yerçekimi eğim kestirir; hızlı harekette dinamik ivme eğimi kirletir.' },
            ] },
            modes: { title: 'Giriş modunu ve çıktı ailesini birlikte seçin', intro: 'Widget mevcut sensöre göre farklı fiziksel iddialar sunar.', items: [
                { title: 'Tek üç eksenli X/Y/Z', bestFor: 'Tek noktada yerel ivme, entegre hız/yer değiştirme, sürüş konforu ve temel eğim.', reveals: 'Eksen başına hareket, RMS trendi, yörünge ve ISO 2631 ağırlığı.', watch: 'Tek ivmeölçerden tam rijit cisim dönmesi raporlamayın.' },
                { title: 'Rijit cisim ivmeölçer dizisi', bestFor: 'Referans ötelemesini ve açısal ivmeyi uzamsal ölçümlerden ayırmak.', reveals: 'Öteleme/açısal ivme, entegre açısal hız/yer değiştirme ve 6-DOF hareket.', watch: 'Kötü geometri, eş düzlemli duyarlılık veya yanlış eksen eşlemesi çözümü kötü koşullu yapar.' },
                { title: 'IMU · 3 ivme + 3 jiroskop', bestFor: 'Öteleme ve doğrudan ölçülmüş açısal hız hareketini birleştirmek.', reveals: 'İvme, hız, yer değiştirme, açısal hız/açı, eğim ve yörünge metrikleri.', watch: 'Jiroskop ve ivmeölçer bias’ı açı ve konum kaymasına entegre olur; hizalama/düzeltme şarttır.' },
            ] },
            interpretation: { intro: 'Hareketi onu üreten filtre ve çerçeve varsayımlarıyla birlikte okuyun.', items: [
                { title: 'Yer değiştirme geri dönmeden düzgün büyüyor', signal: 'Olaydan sonra cisim durması gerekirken entegre konum kayar.', meaning: 'Kalan bias, yerçekimi izdüşümü veya düşük frekans gürültüsü entegre oluyordur.', confirm: 'Düzeltilmiş ivmeyi inceleyin; gerekçeli kesim/model deneyin ve uç noktaları bağımsız yer değiştirme referansıyla karşılaştırın.' },
                { title: 'Saf ötelemede dizi dönme raporluyor', signal: 'Tüm sensörler birlikte hareket etmeliyken açısal kanallar yükselir.', meaning: 'Geometri, kanal işareti/ekseni veya sensör kazancı tutarsız olabilir.', confirm: 'Saha verisinden önce bilinen rijit öteleme uygulayıp çözüm koşulunu/kalıntısını inceleyin.' },
                { title: 'Ağırlıklı RMS orta, VDV yüksek', signal: 'Dördüncü kuvvet dozu kısa şoklara, ortalama enerjiye göre çok daha güçlü cevap verir.', meaning: 'Maruziyeti sürekli titreşimden çok geçici sürüş olayları yönetiyordur.', confirm: 'Darbe gerçekliğini, ağırlık yönünü ve değerlendirme süresini doğrulayın; MTVV ile zaman dalga biçimini inceleyin.' },
            ] },
            workflow: { title: 'Çerçeve farkındalıklı hareket kurma iş akışı', intro: 'Kayma bastırmayı seçmeden önce geometriyi ve korumak istediğiniz en düşük hareket frekansını tanımlayın.', checklist: ['Sensör konumu, duyarlı eksen, işaret, birim ve gövde/referans çerçevesini belgeleyin.', 'Tek, dizi veya IMU modunu donanımın gerçekten tanımlayabildiği büyüklüğe göre seçin.', 'DC’yi yalnız fiziksel ortalamanın sıfır olması gerekiyorsa kaldırın.', 'Yüksek geçiren kesimi en düşük gerçek hareket frekansının altında seçip raporlayın.', 'Saha öncesi dizi/IMU hareketini bilinen öteleme ve dönmeyle doğrulayın.', 'ISO 2631’de yatay yönler için Wd, düşey için Wk veya doğru eksenlerle birleşik seçeneği kullanın.', 'Her yer değiştirme/maruziyet sonucuyla entegrasyon alanı, kayma yöntemi ve değerlendirme süresini raporlayın.'] },
            mistakes: [
                { title: 'Ham ivmeyi iki kez entegre etmek', body: 'Küçük ofset ve yerçekimi sızıntısı büyük karesel yer değiştirme kaymasına dönüşür. Düzeltme ve bağımsız makullük kontrolü zorunludur.' },
                { title: 'Tek üç eksenli sensöre 6-DOF demek', body: 'Tek noktadaki üç ivme ekseni, üç öteleme ile üç dönmeyi benzersiz ayıramaz.' },
                { title: 'İstenen yer değiştirmeyi elde etmek için yüksek geçiren filtre kullanmak', body: 'Kesimi yükseltmek gerçek yavaş hareketi silerek kaymayı yok edebilir. Görünüşten değil fizikten seçin.' },
                { title: 'Wd ve Wk yönlerini karıştırmak', body: 'ISO 2631’de frekans duyarlılığı yatay ve düşeyde farklıdır. Ağırlıklandırma gövde ekseni ve değerlendirme bağlamını izlemelidir.' },
            ],
            sources: [
                { title: 'ISO 2631-1:1997 + Amd 1:2010', note: 'Genel tüm-vücut titreşim maruziyeti, frekans ağırlığı ve değerlendirme kavramları.', href: 'https://www.iso.org/standard/7612.html' },
                { title: 'ISO/DIS 2631-1', note: 'Geliştirilmekte olan üçüncü baskı revizyonu; taslağı yayımlanmış kural gibi göstermeden gelecek değişimi izlemek için.', href: 'https://www.iso.org/standard/85768.html' },
                { title: 'ISO 21289:2008', note: 'Titreşim ve şok ölçümleri için veri toplama parametreleri ve meta veriler.', href: 'https://www.iso.org/ics/17.160/x/' },
            ] },
    },
}

export default MOTION_LEARNING
