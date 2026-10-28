const ROTATING_LEARNING = {
    rotor_balancing: {
        en: {
            title: 'Rotor Balancing Guide',
            intro: 'This guide explains single-plane field balancing with the MachinePulseAI Rotor Balancing widget. It describes how the 1× vibration vector is measured with a once-per-revolution reference signal, how a trial weight is used to determine the machine’s response, and how the correction is calculated and verified. The current version supports single-plane balancing; two-plane balancing is not yet available.',
            badges: ['Validated single-plane workflow', 'Physical keyphasor', 'Complex 1× vectors', 'ISO 21940 context'],
            duration: 'Estimated reading time: about 18 minutes',
            outcomes: ['Explain amplitude and phase as one complex vibration vector.', 'Capture compatible reference and trial runs without changing the machine state.', 'Judge whether a trial weight created a usable influence coefficient.', 'Install and verify a single-plane correction.'],
            why: [
                { title: 'What balancing is for', body: 'Unbalance is an uneven distribution of mass around the axis of rotation. It creates a centrifugal force that rotates with the shaft, grows with the square of speed and causes vibration at running speed (1×). Excessive unbalance shortens bearing life, loosens connections and increases noise. Balancing determines how much mass to add or remove, and at which angle, to reduce this force.' },
                { title: 'Which measurements are required', body: 'A vibration sensor on the bearing housing (typically an accelerometer or velocity sensor) measures the 1× amplitude. A once-per-revolution reference signal—a keyphasor, or an optical or laser tachometer reading a reflective mark—is required to measure the phase, that is, the angular position of the response. Without phase, the correction angle cannot be calculated.' },
                { title: 'Why a trial weight is used', body: 'How a machine responds to a given mass depends on its stiffness, bearings and support structure, and is generally not known in advance. A known trial weight is installed temporarily and the resulting change in the 1× vector is measured. This change gives the influence coefficient, from which the correction mass and angle are calculated.' },
            ],
            interface: { title: 'Rotor Balancing workspace', intro: 'The finished view will connect the selected 1× measurement, single-plane geometry, captured runs, polar progress and the verification result. For now, use this guide to understand that full chain.' },
            theory: {
                title: 'Balancing as a controlled measurement',
                intro: 'The machine already contains an unknown unbalance. A known trial mass perturbs that state. The change in the measured 1× vector tells us how this specific machine responds to mass at this speed and plane.',
                cards: [
                    { kicker: 'KEY CONCEPT', title: 'One vector carries two facts', body: 'Amplitude says how much synchronous vibration exists; phase says where that response sits relative to the keyphasor. Treating them separately loses the direction needed for correction.' },
                    { kicker: 'PHYSICAL CAUSE', title: 'The trial weight identifies sensitivity', body: 'The difference between the trial and reference vectors is caused by a known mass-radius vector. Dividing the response change by that vector gives the influence coefficient.' },
                    { kicker: 'IMPORTANT LIMIT', title: 'The current version is single-plane', body: 'The current version calculates one correction plane from one measured vibration point and one physical keyphasor. Two-plane balancing is planned but not yet available.' },
                ],
            },
            foundations: {
                title: 'Conditions for a reliable balancing result',
                intro: 'A numerical correction is easy to calculate. The hard part is proving that the reference, trial and verification runs describe the same linear machine state.',
                cards: [
                    { title: 'Run compatibility', body: 'Speed, sensor orientation, keyphasor datum, machine load, thermal state and measurement window must remain comparable. A phase shift caused by rewiring is indistinguishable from a mechanical change.' },
                    { title: 'Trial-weight authority', body: 'The trial must change the 1× vector enough to rise above repeatability error, but must remain safe. A tiny response change creates an ill-conditioned correction; an excessive mass risks the machine.' },
                    { title: 'Correction radius matters', body: 'Unbalance is mass times radius. If the installation radius differs from the trial or computed radius, convert the mass so the correction moment remains the same.' },
                ],
            },
            modes: {
                title: 'The three measurement runs',
                intro: 'The widget is organized around captured runs rather than a generic spectrum. Each state answers a different engineering question.',
                items: [
                    { title: 'Reference run', bestFor: 'Establishing the original 1× amplitude and phase.', reveals: 'The baseline vector the correction must oppose.', watch: 'Do not reuse a run after changing sensor orientation, phase datum, speed or machine assembly.' },
                    { title: 'Trial run', bestFor: 'Identifying the plane’s influence coefficient.', reveals: 'How much vibration a known mass-radius vector produces and its phase lag.', watch: 'Reject a run if speed or phase is unstable, or if the vector change is too small relative to repeatability.' },
                    { title: 'Correction and verification', bestFor: 'Installing the computed mass and proving the result.', reveals: 'The recommended mass/angle and the measured residual 1× after installation.', watch: 'A calculated reduction is not acceptance. The final measured verification run is the evidence.' },
                ],
            },
            interpretation: {
                intro: 'The polar plot is most useful when you read movement between runs, not just the final point.',
                items: [
                    { title: 'Trial vector barely moves', signal: 'Reference and trial points almost overlap.', meaning: 'The trial has weak authority or the measurement is not repeatable, so the influence coefficient is unreliable.', confirm: 'Repeat the reference window, check phase stability, then revise the trial mass only within the safe operating limit.' },
                    { title: 'Correction heads toward the origin', signal: 'The verification vector is substantially shorter.', meaning: 'The installed mass produced the intended opposing synchronous response.', confirm: 'Check that RPM and load match the earlier runs before crediting the reduction to balancing.' },
                    { title: '1× remains but phase changes', signal: 'Amplitude reduction is modest while phase rotates strongly.', meaning: 'The model captured some response, but another plane, resonance, looseness or nonlinearity may be involved.', confirm: 'Do not force a second single-plane iteration blindly; inspect mechanical state and whether the rotor needs a future multi-plane workflow.' },
                ],
            },
            workflow: {
                title: 'Single-plane balancing procedure',
                intro: 'Record every physical change and complete the procedure with a verification run.',
                checklist: ['Use a real once-per-revolution keyphasor and confirm one clean edge per turn.', 'Keep the vibration sensor and cable orientation fixed for every run.', 'Use the same speed, load and thermal condition for reference, trial and verification.', 'Record trial mass, radius, angle datum and rotation direction before starting.', 'Remove the trial mass before installing the correction unless the calculation explicitly accounts for it.', 'Treat ISO grade calculations as an acceptance context, not a substitute for machine-specific limits.'],
            },
            mistakes: [
                { title: 'Using a typed RPM value as a phase reference', body: 'RPM tells you frequency, not angular phase. Correction angle requires a measured once-per-revolution reference tied to the physical rotor.' },
                { title: 'Changing the angular datum between runs', body: 'Clockwise versus counter-clockwise convention and the zero-degree mark must stay fixed. A convention change can rotate an otherwise correct answer.' },
                { title: 'Assuming two-plane capability', body: 'The software architecture allows multi-plane support to be added later, but the validated workflow available today is single-plane only.' },
                { title: 'Skipping the verification run', body: 'Influence-coefficient math predicts a correction. Only a new measured run proves the machine actually improved and remains within operational limits.' },
            ],
            sources: [
                { title: 'ISO 21940-11:2016 + Amd 1:2022', note: 'Procedures and unbalance tolerances for rotors with rigid behaviour, including residual unbalance and correction-plane considerations.', href: 'https://www.iso.org/standard/54074.html' },
                { title: 'ISO 21940-13:2012', note: 'Criteria and safeguards for in-situ balancing of medium and large rotors.', href: 'https://www.iso.org/ics/21.120.40/x/' },
            ],
        },
        tr: {
            title: 'Rotor Balanslama Rehberi',
            intro: 'Bu rehber, MachinePulseAI Rotor Balanslama widget’ı ile tek düzlemde saha balanslamasının nasıl yapıldığını anlatır. 1× titreşim vektörünün devir başına bir darbe veren referans sinyaliyle nasıl ölçüldüğünü, deneme ağırlığıyla makinenin tepkisinin nasıl belirlendiğini ve düzeltmenin nasıl hesaplanıp doğrulandığını açıklar. Mevcut sürüm tek düzlem balanslamayı destekler; çift düzlem balanslama henüz sunulmamaktadır.',
            badges: ['Doğrulanmış tek düzlem akışı', 'Fiziksel keyphasor', 'Karmaşık 1× vektörleri', 'ISO 21940 bağlamı'],
            duration: 'Tahmini okuma süresi: yaklaşık 18 dakika',
            outcomes: ['Genlik ve fazı tek bir karmaşık titreşim vektörü olarak açıklamak.', 'Makine durumunu değiştirmeden uyumlu referans ve deneme koşuları yakalamak.', 'Deneme ağırlığının kullanılabilir bir etki katsayısı üretip üretmediğini değerlendirmek.', 'Tek düzlem düzeltmesini uygulayıp doğrulamak.'],
            why: [
                { title: 'Balanslama ne işe yarar?', body: 'Balanssızlık, kütlenin dönme ekseni etrafında eşit dağılmamasıdır. Şaftla birlikte dönen, hızın karesiyle artan bir merkezkaç kuvveti oluşturur ve çalışma devrinde (1×) titreşime yol açar. Aşırı balanssızlık rulman ömrünü kısaltır, bağlantıları gevşetir ve gürültüyü artırır. Balanslama, bu kuvveti azaltmak için hangi açıya ne kadar kütle eklenmesi veya çıkarılması gerektiğini belirler.' },
                { title: 'Hangi ölçümler gerekir?', body: 'Yatak gövdesine bağlanan bir titreşim sensörü (genellikle ivmeölçer veya hız sensörü) 1× genliğini ölçer. Fazı, yani tepkinin açısal konumunu ölçmek için devir başına bir darbe veren referans sinyali gerekir; bu bir keyphasor ya da yansıtıcı işareti okuyan optik veya lazer takometre olabilir. Faz bilgisi olmadan düzeltme açısı hesaplanamaz.' },
                { title: 'Neden deneme ağırlığı kullanılır?', body: 'Makinenin belirli bir kütleye verdiği tepki rijitliğine, yataklarına ve taşıyıcı yapısına bağlıdır ve genellikle önceden bilinmez. Bilinen bir deneme ağırlığı geçici olarak takılır ve 1× vektöründe oluşan değişim ölçülür. Bu değişim etki katsayısını verir; düzeltme kütlesi ve açısı bu katsayıdan hesaplanır.' },
            ],
            interface: { title: 'Rotor Balanslama çalışma ekranı', intro: 'Tamamlandığında bu görünüm seçilen 1× ölçümünü, tek düzlem geometrisini, yakalanan koşuları, polar ilerlemeyi ve doğrulama sonucunu bir araya getirecek. Şimdilik bütün zinciri aşağıdaki rehberle öğrenin.' },
            theory: {
                title: 'Kontrollü bir ölçüm olarak balanslama',
                intro: 'Makinede zaten bilinmeyen bir balanssızlık vardır. Bilinen deneme kütlesi bu durumu değiştirir. Ölçülen 1× vektöründeki fark, bu makinenin bu hızda ve bu düzlemde kütleye nasıl cevap verdiğini gösterir.',
                cards: [
                    { kicker: 'TEMEL KAVRAM', title: 'Bir vektör iki bilgiyi taşır', body: 'Genlik senkron titreşimin büyüklüğünü, faz ise bu cevabın keyphasor’a göre yönünü söyler. İkisini ayırmak, düzeltme için gereken yön bilgisini kaybettirir.' },
                    { kicker: 'FİZİKSEL NEDEN', title: 'Deneme ağırlığı duyarlılığı tanımlar', body: 'Deneme ve referans vektörleri arasındaki fark, bilinen kütle-yarıçap vektöründen doğar. Tepki farkını bu vektöre bölmek etki katsayısını verir.' },
                    { kicker: 'ÖNEMLİ SINIR', title: 'Mevcut sürüm tek düzlemlidir', body: 'Mevcut sürüm, bir ölçüm noktası ve fiziksel bir keyphasor ile tek bir düzeltme düzlemi hesaplar. Çift düzlem balanslama planlanmaktadır ancak henüz kullanılamaz.' },
                ],
            },
            foundations: {
                title: 'Güvenilir balanslama sonucunun koşulları',
                intro: 'Sayısal düzeltmeyi hesaplamak kolaydır. Zor olan; referans, deneme ve doğrulama koşularının aynı doğrusal makine durumunu anlattığını kanıtlamaktır.',
                cards: [
                    { title: 'Koşu uyumluluğu', body: 'Hız, sensör yönü, keyphasor referansı, yük, sıcaklık durumu ve ölçüm penceresi karşılaştırılabilir kalmalıdır. Kablo değişiminden doğan faz kayması mekanik değişimden ayırt edilemez.' },
                    { title: 'Deneme ağırlığının etkisi', body: 'Deneme, 1× vektörünü tekrarlanabilirlik hatasının üstünde değiştirmeli ama güvenli kalmalıdır. Çok küçük fark kararsız çözüm üretir; aşırı kütle makineyi riske atar.' },
                    { title: 'Düzeltme yarıçapı önemlidir', body: 'Balanssızlık kütle ile yarıçapın çarpımıdır. Montaj yarıçapı deneme veya hesap yarıçapından farklıysa aynı momenti koruyacak kütle dönüşümü yapılmalıdır.' },
                ],
            },
            modes: {
                title: 'Üç ölçüm koşusu',
                intro: 'Widget genel bir spektrum yerine yakalanmış koşular etrafında düzenlenir. Her durum farklı bir mühendislik sorusunu yanıtlar.',
                items: [
                    { title: 'Referans koşusu', bestFor: 'İlk 1× genlik ve fazını belirlemek.', reveals: 'Düzeltmenin karşı koyması gereken başlangıç vektörü.', watch: 'Sensör yönü, faz referansı, hız veya makine kurulumu değiştikten sonra eski koşuyu kullanmayın.' },
                    { title: 'Deneme koşusu', bestFor: 'Düzlemin etki katsayısını tanımlamak.', reveals: 'Bilinen kütle-yarıçap vektörünün ürettiği titreşim ve faz gecikmesi.', watch: 'Hız/faz kararsızsa veya vektör farkı tekrarlanabilirliğe göre küçükse koşuyu reddedin.' },
                    { title: 'Düzeltme ve doğrulama', bestFor: 'Hesaplanan kütleyi takmak ve sonucu kanıtlamak.', reveals: 'Önerilen kütle/açı ile montaj sonrası ölçülen artık 1×.', watch: 'Hesaplanan azalma kabul değildir; son ölçülmüş doğrulama koşusu kanıttır.' },
                ],
            },
            interpretation: {
                intro: 'Polar grafik, yalnızca son noktaya değil koşular arasındaki harekete baktığınızda anlam kazanır.',
                items: [
                    { title: 'Deneme vektörü neredeyse oynamıyor', signal: 'Referans ve deneme noktaları üst üste yakın durur.', meaning: 'Deneme etkisi zayıftır veya ölçüm tekrarlanabilir değildir; etki katsayısı güvenilmez olur.', confirm: 'Referans penceresini tekrarlayın, faz kararlılığını denetleyin; sonra yalnız güvenli sınırlar içinde deneme kütlesini gözden geçirin.' },
                    { title: 'Düzeltme orijine yaklaşıyor', signal: 'Doğrulama vektörü belirgin biçimde kısalır.', meaning: 'Takılan kütle amaçlanan karşı senkron cevabı üretmiştir.', confirm: 'Azalmayı balanslamaya bağlamadan önce RPM ve yükün önceki koşularla eşleştiğini kontrol edin.' },
                    { title: '1× kalıyor, faz çok dönüyor', signal: 'Genlik azalışı sınırlıyken faz güçlü biçimde değişir.', meaning: 'Model cevabın bir kısmını yakalamış olabilir; başka düzlem, rezonans, gevşeklik veya doğrusal olmayanlık etkisi bulunabilir.', confirm: 'Körlemesine ikinci tek düzlem düzeltmesi yapmayın; mekanik durumu ve gelecekteki çok düzlem ihtiyacını inceleyin.' },
                ],
            },
            workflow: {
                title: 'Tek düzlem balanslama prosedürü',
                intro: 'Her fiziksel değişikliği kaydedin ve prosedürü bir doğrulama koşusuyla tamamlayın.',
                checklist: ['Gerçek bir devirde-bir keyphasor kullanın ve her turda tek temiz kenar olduğunu doğrulayın.', 'Titreşim sensörü ile kablo yönünü tüm koşularda sabit tutun.', 'Referans, deneme ve doğrulamada aynı hız, yük ve sıcaklık durumunu kullanın.', 'Başlamadan önce deneme kütlesini, yarıçapı, açı referansını ve dönüş yönünü kaydedin.', 'Hesap açıkça hesaba katmıyorsa düzeltmeyi takmadan önce deneme ağırlığını çıkarın.', 'ISO kalite hesabını makineye özel sınırların yerine değil, kabul bağlamı olarak kullanın.'],
            },
            mistakes: [
                { title: 'Yazılan RPM değerini faz referansı sanmak', body: 'RPM frekansı verir, açısal fazı vermez. Düzeltme açısı fiziksel rotora bağlı ölçülmüş devirde-bir referans ister.' },
                { title: 'Koşular arasında açı referansını değiştirmek', body: 'Saat yönü/saat yönünün tersi kuralı ve sıfır derece işareti sabit kalmalıdır. Kural değişimi doğru bir sonucu bile yanlış açıya döndürebilir.' },
                { title: 'Mevcut sürümü çift düzlem destekli sanmak', body: 'Yazılım altyapısı çok düzlem desteğinin ileride eklenmesine izin verir; ancak bugün kullanılabilen doğrulanmış akış yalnızca tek düzlemdir.' },
                { title: 'Doğrulama koşusunu atlamak', body: 'Etki katsayısı matematiği bir düzeltme öngörür. Makinenin gerçekten iyileştiğini ve çalışma sınırlarında kaldığını yalnızca yeni ölçüm kanıtlar.' },
            ],
            sources: [
                { title: 'ISO 21940-11:2016 + Amd 1:2022', note: 'Rijit davranışlı rotorlar için artık balanssızlık ve düzeltme düzlemi konularını içeren prosedür ve toleranslar.', href: 'https://www.iso.org/standard/54074.html' },
                { title: 'ISO 21940-13:2012', note: 'Orta ve büyük rotorların yerinde balanslanması için ölçütler ve güvenlik önlemleri.', href: 'https://www.iso.org/ics/21.120.40/x/' },
            ],
        },
    },
    order_tracking: {
        en: {
            title: 'Order Tracking Analysis Guide',
            intro: 'This guide explains order analysis of rotating machines whose speed changes, for example during run-up or coast-down. It describes why a fixed-frequency spectrum is not sufficient under these conditions, how the speed signal is used to resample vibration in the angle domain, and when to use the Campbell, frequency–RPM and Vold–Kalman views in MachinePulseAI.',
            badges: ['Campbell map', 'Frequency–RPM map', 'Single & multi Vold–Kalman', 'Run-up / coast-down'], duration: 'Estimated reading time: about 20 minutes',
            outcomes: ['Convert between frequency, RPM and order without guessing.', 'Explain why angle resampling keeps speed-related components sharp.', 'Choose Campbell, frequency–RPM or Vold–Kalman for the question at hand.', 'Distinguish a rotating excitation order from a fixed structural resonance.'],
            why: [
                { title: 'What order analysis is for', body: 'Many vibration sources in rotating machines—unbalance, misalignment, gear meshing, blade passing—repeat a fixed number of times per revolution. Expressing frequency as a multiple of shaft speed, called an order, makes these sources identifiable regardless of speed. Order analysis shows how each source changes as speed varies and where it coincides with structural resonances.' },
                { title: 'Which measurements are required', body: 'A vibration signal (acceleration, velocity or displacement) and a speed signal recorded on the same time base are required. The speed signal usually comes from a tachometer, an encoder or a once-per-revolution pulse; its accuracy directly determines the accuracy of the order results.' },
                { title: 'Why a standard FFT is not enough', body: 'When speed changes during a recording, speed-related components move in frequency and a standard FFT spreads them across a wide band. Order tracking resamples the signal at equal shaft-angle steps, so each order stays at a fixed position and can be separated clearly.' },
            ],
            interface: { title: 'Order Tracking workspace', intro: 'The final screenshot will show vibration and RPM selection, tracking resolution, extraction method, map controls and result tabs. The guide below already follows those actual controls.' },
            theory: { title: 'Order: frequency relative to shaft speed', intro: 'A 1× component completes one cycle per shaft revolution; 2× completes two. When RPM changes, their hertz values move, but their order values stay fixed.', cards: [
                { kicker: 'KEY CONCEPT', title: 'Hertz asks “how fast?”', body: 'Frequency counts cycles per second. It is ideal for structural resonances, which remain near a fixed natural frequency even while shaft speed changes.' },
                { kicker: 'ROTATING VIEW', title: 'Order asks “how many per revolution?”', body: 'Order divides component frequency by rotational frequency. Imbalance stays near 1×, misalignment often strengthens 2×, and gear or blade events appear at their repetition count.' },
                { kicker: 'THE KEY STEP', title: 'Angle resampling removes speed smear', body: 'Tacho edges map time to shaft angle. Interpolating vibration onto equal-angle steps makes rotating content periodic in the new coordinate before spectral analysis.' },
            ] },
            foundations: { title: 'Resolution trade-offs', intro: 'Order spacing, RPM-bin spacing and time localization cannot all be arbitrarily fine. The selected window, overlap and speed ramp determine what can be separated.', cards: [
                { title: 'Order resolution', body: 'More revolutions per block sharpen adjacent orders but average over more speed change. Fewer revolutions improve localization but broaden order lines.' },
                { title: 'RPM direction and binning', body: 'Run-up and coast-down should be inspected separately when hysteresis matters. Mean, peak-hold and exponential bin combining answer different questions.' },
                { title: 'Amplitude domain', body: 'Acceleration emphasizes high-frequency content; velocity is often useful for machinery severity; displacement highlights low-order motion. Peak, RMS and peak-to-peak are not interchangeable.' },
            ] },
            modes: { title: 'Analysis views and their use', intro: 'The widget contains complementary analyses, not cosmetic chart styles.', items: [
                { title: 'Campbell / order map', bestFor: 'Finding speed-related families over a run-up or coast-down.', reveals: 'Order amplitude versus RPM, with selectable order cuts and direction.', watch: 'A horizontal order feature is rotating; do not automatically call every bright ridge a resonance.' },
                { title: 'Frequency–RPM resonance map', bestFor: 'Separating fixed-Hz structural resonances from moving shaft orders.', reveals: 'Resonances as nearly fixed-frequency bands while order lines sweep with RPM.', watch: 'Frequency resolution comes from FFT block length; too-coarse blocks can merge nearby modes.' },
                { title: 'Vold–Kalman extraction', bestFor: 'Recovering one or several order waveforms through close or crossing components.', reveals: 'Amplitude and phase histories of specified orders.', watch: 'Bandwidth and pole settings must follow ramp rate; an overly tight tracker can lag or lose the order.' },
            ] },
            interpretation: { intro: 'Use both coordinate systems before assigning a mechanical cause.', items: [
                { title: 'Bright ridge fixed at 1×', signal: 'Order map energy follows first order over speed.', meaning: 'A synchronous source such as imbalance is plausible.', confirm: 'Check phase repeatability and whether the amplitude peaks only near a structural critical speed.' },
                { title: 'Energy fixed in hertz', signal: 'Frequency–RPM map shows a vertical band crossed by moving order lines.', meaning: 'The machine is passing through a structural resonance.', confirm: 'Compare run-up and coast-down, then use FRF or modal evidence to identify the mode.' },
                { title: 'Different paths up and down', signal: 'Amplitude or peak speed differs between run-up and coast-down.', meaning: 'Thermal state, preload, clearance, nonlinear stiffness or damping may be speed-history dependent.', confirm: 'Verify direction selection, comparable operating conditions and RPM tracking before calling it hysteresis.' },
            ] },
            workflow: { title: 'Variable-speed analysis procedure', intro: 'Start by proving the speed reference, then choose resolution around the event you need to separate.', checklist: ['Use vibration and RPM from the same recording and time base.', 'Confirm tacho polarity, pulse count and missing-pulse behaviour before resampling.', 'Select run-up or coast-down explicitly when the record contains both.', 'Set max order below the angle-domain Nyquist limit.', 'Check order resolution against the number of revolutions available per block.', 'Compare the order map with the frequency–RPM map before labeling a resonance.'] },
            mistakes: [
                { title: 'Running a normal FFT on the full speed sweep', body: 'Components tied to RPM move during the record, so a single fixed-frequency FFT spreads them into wide bands.' },
                { title: 'Using noisy RPM as if it were exact shaft angle', body: 'Edge jitter and missed pulses become angle error, which broadens orders and corrupts phase.' },
                { title: 'Confusing a critical speed with an order', body: 'An order names the excitation ratio; a critical speed is where that excitation crosses a structural mode. They are related but not the same.' },
                { title: 'Over-tightening Vold–Kalman bandwidth', body: 'A narrow tracker looks clean but may fail to follow a fast ramp. Always compare extracted amplitude with the map energy.' },
            ],
            sources: [
            ] },
        tr: {
            title: 'Order Takibi Analiz Rehberi',
            intro: 'Bu rehber, devri değişen döner makinelerin (örneğin kalkış veya duruş sırasında) order analizini anlatır. Bu koşullarda sabit frekanslı spektrumun neden yeterli olmadığını, devir sinyalinin titreşimi açı alanında yeniden örneklemek için nasıl kullanıldığını ve MachinePulseAI’da Campbell, frekans–RPM ve Vold–Kalman görünümlerinin ne zaman kullanılacağını açıklar.',
            badges: ['Campbell haritası', 'Frekans–RPM haritası', 'Tekli ve çoklu Vold–Kalman', 'Kalkış / duruş'], duration: 'Tahmini okuma süresi: yaklaşık 20 dakika',
            outcomes: ['Frekans, RPM ve order arasında tahminsiz dönüşüm yapmak.', 'Açıya göre yeniden örneklemenin hıza bağlı bileşenleri neden keskin tuttuğunu açıklamak.', 'Soruna göre Campbell, frekans–RPM veya Vold–Kalman seçmek.', 'Dönen uyarma order’ını sabit yapısal rezonanstan ayırmak.'],
            why: [
                { title: 'Order analizi ne işe yarar?', body: 'Döner makinelerdeki birçok titreşim kaynağı—balanssızlık, eksen kaçıklığı, dişli kavraması, kanat geçişi—her devirde sabit sayıda tekrarlanır. Frekansı mil hızının katı olarak ifade etmek (order) bu kaynakları devirden bağımsız olarak tanımlanabilir hâle getirir. Order analizi, her kaynağın devirle nasıl değiştiğini ve yapısal rezonanslarla nerede çakıştığını gösterir.' },
                { title: 'Hangi ölçümler gerekir?', body: 'Aynı zaman tabanında kaydedilmiş bir titreşim sinyali (ivme, hız veya yer değiştirme) ve bir devir sinyali gerekir. Devir sinyali genellikle takometre, enkoder veya devir başına bir darbe veren sensörden gelir; doğruluğu order sonuçlarının doğruluğunu doğrudan belirler.' },
                { title: 'Standart FFT neden yeterli değildir?', body: 'Kayıt sırasında devir değiştiğinde devre bağlı bileşenlerin frekansı da değişir ve standart FFT bu bileşenleri geniş bir banda yayar. Order takibi sinyali eşit mil açısı adımlarında yeniden örnekler; böylece her order sabit bir konumda kalır ve net olarak ayrılabilir.' },
            ],
            interface: { title: 'Order Takibi çalışma ekranı', intro: 'Son ekran görüntüsü titreşim ve RPM seçimini, takip çözünürlüğünü, çıkarım yöntemini, harita kontrollerini ve sonuç sekmelerini gösterecek. Aşağıdaki rehber bu gerçek kontrolleri şimdiden izler.' },
            theory: { title: 'Order: mil hızına göre normalize edilmiş frekans', intro: '1× bileşen her mil devrinde bir çevrim; 2× iki çevrim tamamlar. RPM değişirken hertz değerleri hareket eder, order değerleri sabit kalır.', cards: [
                { kicker: 'TEMEL KAVRAM', title: 'Hertz “ne kadar hızlı?” diye sorar', body: 'Frekans saniyedeki çevrimi sayar. Mil hızı değişse bile doğal frekansı yaklaşık sabit kalan yapısal rezonansları okumak için uygundur.' },
                { kicker: 'DÖNEL BAKIŞ', title: 'Order “devir başına kaç kez?” diye sorar', body: 'Order, bileşen frekansını dönme frekansına böler. Balanssızlık 1×, eksen kaçıklığı çoğu zaman 2× civarında; dişli veya kanat olayları tekrar sayılarına göre görünür.' },
                { kicker: 'ANA ADIM', title: 'Açı örnekleme hız yayılmasını kaldırır', body: 'Tako kenarları zamanı mil açısına eşler. Titreşimi eşit açı adımlarına aradeğerlemek, spektral analizden önce dönen içeriği yeni koordinatta periyodik yapar.' },
            ] },
            foundations: { title: 'Çözünürlük dengesi', intro: 'Order aralığı, RPM aralığı ve zaman konumu aynı anda sınırsız incelikte olamaz. Pencere, örtüşme ve hız rampası neyin ayrılabileceğini belirler.', cards: [
                { title: 'Order çözünürlüğü', body: 'Blok başına daha çok devir komşu order’ları ayırır ama daha fazla hız değişimini ortalar. Daha az devir olayı yerelleştirir fakat çizgileri genişletir.' },
                { title: 'RPM yönü ve kutulama', body: 'Histerezis önemliyse kalkış ve duruş ayrı incelenmelidir. Ortalama, tepe-tutma ve üstel birleştirme farklı soruları yanıtlar.' },
                { title: 'Genlik alanı', body: 'İvme yüksek frekansı, hız genel makine şiddetini, yer değiştirme düşük order hareketini öne çıkarır. Tepe, RMS ve tepeden-tepeye aynı değildir.' },
            ] },
            modes: { title: 'Analiz görünümleri ve kullanım alanları', intro: 'Widget’taki yöntemler kozmetik grafik seçenekleri değil, birbirini tamamlayan analizlerdir.', items: [
                { title: 'Campbell / order haritası', bestFor: 'Kalkış veya duruş boyunca hıza bağlı aileleri bulmak.', reveals: 'Seçilebilir order kesitleri ve yönle birlikte RPM’e karşı order genliği.', watch: 'Yatay order izi dönel kaynaktır; her parlak sırtı otomatik olarak rezonans saymayın.' },
                { title: 'Frekans–RPM rezonans haritası', bestFor: 'Sabit-Hz yapısal rezonansları hareketli mil order’larından ayırmak.', reveals: 'Order çizgileri RPM ile süpürürken rezonansların yaklaşık sabit frekans bantları olarak kalması.', watch: 'Frekans çözünürlüğü FFT blok uzunluğundan gelir; kaba bloklar yakın modları birleştirebilir.' },
                { title: 'Vold–Kalman çıkarımı', bestFor: 'Yakın veya kesişen bileşenlerde bir ya da birkaç order dalga biçimini geri kazanmak.', reveals: 'Belirlenen order’ların genlik ve faz geçmişleri.', watch: 'Bant genişliği ve kutup ayarı hız rampasını izlemelidir; aşırı dar takip order’ı kaçırabilir.' },
            ] },
            interpretation: { intro: 'Mekanik neden atamadan önce iki koordinat sistemini de kullanın.', items: [
                { title: '1×’te sabit parlak sırt', signal: 'Order haritası enerjisi hız boyunca birinci order’ı izler.', meaning: 'Balanssızlık gibi senkron kaynak olasıdır.', confirm: 'Fazın tekrarlanabilirliğini ve genliğin yalnız yapısal kritik hız yakınında büyüyüp büyümediğini kontrol edin.' },
                { title: 'Hertz’te sabit enerji', signal: 'Frekans–RPM haritasında hareketli order çizgilerinin kestiği dikey bir bant vardır.', meaning: 'Makine yapısal rezonansın içinden geçiyordur.', confirm: 'Kalkış ve duruşu karşılaştırın; sonra modu FRF veya modal kanıtla tanımlayın.' },
                { title: 'Çıkış ve inişte farklı yollar', signal: 'Genlik veya tepe hızı kalkışla duruş arasında değişir.', meaning: 'Sıcaklık, ön yük, boşluk, doğrusal olmayan rijitlik veya sönüm hız geçmişine bağlı olabilir.', confirm: 'Histerezis demeden önce yön seçimini, çalışma koşullarını ve RPM takibini doğrulayın.' },
            ] },
            workflow: { title: 'Değişken hızlı analiz prosedürü', intro: 'Önce hız referansını kanıtlayın, sonra ayırmak istediğiniz olaya göre çözünürlük seçin.', checklist: ['Titreşim ve RPM’in aynı kayıt ve zaman tabanından geldiğini doğrulayın.', 'Örneklemeden önce tako polaritesini, darbe sayısını ve eksik darbe davranışını kontrol edin.', 'Kayıt ikisini de içeriyorsa kalkış veya duruş yönünü açıkça seçin.', 'Maksimum order’ı açı alanı Nyquist sınırının altında tutun.', 'Order çözünürlüğünü blok başına mevcut devir sayısıyla karşılaştırın.', 'Rezonans etiketi koymadan önce order haritasını frekans–RPM haritasıyla karşılaştırın.'] },
            mistakes: [
                { title: 'Tüm hız süpürmesine normal FFT uygulamak', body: 'RPM’e bağlı bileşenler kayıt boyunca hareket eder; tek sabit frekans FFT’si bunları geniş bantlara yayar.' },
                { title: 'Gürültülü RPM’i kesin mil açısı saymak', body: 'Kenar titreşimi ve kaçan darbeler açı hatasına dönüşür; order’ları genişletir ve fazı bozar.' },
                { title: 'Kritik hız ile order’ı karıştırmak', body: 'Order uyarma oranını, kritik hız ise bu uyarmanın yapısal modu kestiği çalışma hızını adlandırır. İlişkilidirler ama aynı değildirler.' },
                { title: 'Vold–Kalman bandını aşırı daraltmak', body: 'Dar takip temiz görünür ama hızlı rampayı izleyemeyebilir. Çıkarılan genliği her zaman harita enerjisiyle karşılaştırın.' },
            ],
            sources: [
            ] },
    },
    torsional_vibration: {
        en: {
            title: 'Torsional and Rotational Vibration Analysis Guide',
            intro: 'This guide explains how torsional and rotational vibration is measured from encoder or gear-tooth pulse signals. It describes how instantaneous angular speed is calculated from pulse timing, how missing-tooth reference wheels are decoded, how shaft twist is measured with two encoders and how torsional orders are interpreted.',
            badges: ['One-encoder rotational mode', 'Two-encoder twist mode', 'Missing-tooth decoding', 'Torsional order spectrum'], duration: 'Estimated reading time: about 18 minutes',
            outcomes: ['Explain why pulse interval carries angular-speed information.', 'Choose rotational or true torsional mode from the available sensors.', 'Align two encoders with ratio, direction and phase offset.', 'Read angular speed, twist, torque and order results with their limits.'],
            why: [
                { title: 'What torsional vibration analysis is for', body: 'Torsional vibration is the oscillating twist of a shaft around its axis of rotation. It is caused by fluctuating torque, for example from engine firing, gear meshing or electrical disturbances in motors and generators. Because it produces little lateral motion, it is often not visible to conventional accelerometers, yet it can cause fatigue failures in shafts, couplings and gears.' },
                { title: 'Which measurements are required', body: 'A pulse signal from an encoder, or from gear teeth or a toothed wheel read by a magnetic or optical pickup, is required, and the number of pulses per revolution must be known. Measuring shaft twist requires two such sensors at different positions along the shaft train.' },
                { title: 'Why pulse timing is measured', body: 'Torsional vibration appears as small speed fluctuations within each revolution. These fluctuations are calculated from the time between successive pulses; the more precisely the pulse edges are timed, the smaller the fluctuations that can be resolved.' },
            ],
            interface: { title: 'Torsional Vibration workspace', intro: 'The future screenshot will show analysis mode, encoder geometry, missing-tooth settings, twist alignment, order selection and display units. Those real controls shape the theory below.' },
            theory: { title: 'Torsional vibration as a timing measurement', intro: 'A shaft can speed up and slow down slightly every revolution even when mean RPM looks constant. Accurate timestamps reveal those small fluctuations.', cards: [
                { kicker: 'ONE ENCODER', title: 'Rotational fluctuation', body: 'With known pulses per revolution, the time between adjacent edges gives average angular speed over that small angle. Removing the mean exposes cyclic speed ripple.' },
                { kicker: 'TWO ENCODERS', title: 'Dynamic shaft twist', body: 'After ratio, direction and zero-phase alignment, the relative angle between shaft locations is torsional deformation. Shaft stiffness can convert twist into dynamic torque.' },
                { kicker: 'REFERENCE WHEEL', title: 'Missing teeth recover absolute position', body: 'A 60-2 or similar wheel has a deliberately long gap. Correct gap detection establishes a repeatable angular landmark instead of treating the gap as a speed collapse.' },
            ] },
            foundations: { title: 'Edge detection and measurement accuracy', intro: 'Unlike an accelerometer analysis, the fundamental measurement is not pulse amplitude. It is the timestamp of a physical crossing.', cards: [
                { title: 'Timestamp resolution', body: 'Quantization and trigger jitter become speed noise, especially at high tooth count and high RPM. Clean electrical edges and stable thresholding matter more than pretty pulse amplitude.' },
                { title: 'Encoder alignment', body: 'Two encoders may rotate in opposite senses or at a gear ratio. Phase offset and trend removal must describe the physical train before subtraction.' },
                { title: 'Order bandwidth', body: 'The order list and ±fraction band determine which energy is integrated around each family. Wide bands mix neighbours; narrow bands miss modulation and ramp smear.' },
            ] },
            modes: { title: 'Analysis modes', intro: 'Rotational and torsional modes use related pulse processing, but answer different questions.', items: [
                { title: 'Rotational · one encoder', bestFor: 'Speed ripple, firing order and gear/tooth periodicity at one shaft.', reveals: 'Angle, angular velocity fluctuation, optional angular acceleration and order spectrum.', watch: 'It does not measure twist across a shaft; it observes one location only.' },
                { title: 'Torsional · two encoders', bestFor: 'Dynamic twist across a shaft, coupling or gear stage.', reveals: 'Relative angle after ratio/direction alignment and, with stiffness, dynamic torque.', watch: 'Static offset and mean speed trend can dominate unless alignment settings match the train.' },
                { title: 'Missing-tooth sensor', bestFor: 'Engine crank wheels and reference wheels such as 60-2.', reveals: 'Absolute angular indexing plus speed between physical teeth.', watch: 'Wrong tooth count, missing-tooth count or gap ratio creates false acceleration impulses every revolution.' },
            ] },
            interpretation: { intro: 'Name a torsional feature by its excitation order and where it is measured.', items: [
                { title: 'Strong firing-order line', signal: 'A stable order tied to cylinder firing dominates angular-speed ripple.', meaning: 'Combustion torque pulsation is exciting the shaft train.', confirm: 'Compare expected firing order from engine layout and check whether amplitude grows near a torsional natural frequency.' },
                { title: 'Twist grows while local speed ripple stays modest', signal: 'Two-encoder relative angle rises more than either local fluctuation suggests.', meaning: 'The shaft section between encoders is deforming dynamically.', confirm: 'Verify encoder ratio/direction and use known torsional stiffness before converting to torque.' },
                { title: 'One impulse per revolution at the reference gap', signal: 'Angular acceleration spikes at every missing-tooth landmark.', meaning: 'The decoder may be treating the intentional gap as a real speed change.', confirm: 'Check wheel geometry and gap threshold before interpreting the spike mechanically.' },
            ] },
            workflow: { title: 'Torsional analysis procedure', intro: 'Validate the encoder waveform and wheel definition before calculating any mechanical metric.', checklist: ['Confirm the pulse source has enough edges per revolution for the highest torsional order.', 'Use auto trigger only after visually checking edge stability; otherwise set a defensible level.', 'Enter total tooth count, missing teeth and gap ratio from the real wheel.', 'For two encoders, verify speed ratio, rotation sense and phase offset with a steady run.', 'Keep order bands narrower than the spacing to adjacent families.', 'Report whether torque is measured, derived from known stiffness, or not available.'] },
            mistakes: [
                { title: 'Reading pulse amplitude as shaft motion', body: 'Once a clean threshold crossing exists, pulse height is mostly electrical. The useful measurement is when the edge occurred.' },
                { title: 'Calling one-encoder speed ripple “shaft twist”', body: 'Twist requires relative angle between two physical locations or another direct torsional measurement.' },
                { title: 'Ignoring gear ratio and rotation sense', body: 'Subtracting unaligned encoder angles produces a ramp or doubled motion that is mathematical, not mechanical.' },
                { title: 'Converting twist to torque without stiffness', body: 'Torque depends on the torsional stiffness of the section between measurement planes. An assumed value must be stated and justified.' },
            ],
            sources: [
                { title: 'ISO 22266-1:2022', note: 'Torsional natural-frequency and strength assessment for coupled turbine-generator shaft trains under electrical excitation.', href: 'https://www.iso.org/standard/78144.html' },
            ] },
        tr: {
            title: 'Burulma ve Dönel Titreşim Analiz Rehberi',
            intro: 'Bu rehber, burulma ve dönel titreşimin enkoder veya dişli dişi darbe sinyallerinden nasıl ölçüldüğünü anlatır. Anlık açısal hızın darbe zamanlamasından nasıl hesaplandığını, eksik dişli referans çarklarının nasıl çözümlendiğini, mil burulmasının iki enkoderle nasıl ölçüldüğünü ve burulma order’larının nasıl yorumlandığını açıklar.',
            badges: ['Tek enkoder dönel mod', 'İki enkoder burulma modu', 'Eksik diş çözme', 'Burulma order spektrumu'], duration: 'Tahmini okuma süresi: yaklaşık 18 dakika',
            outcomes: ['Darbe aralığının neden açısal hız bilgisi taşıdığını açıklamak.', 'Mevcut sensörlere göre dönel veya gerçek burulma modunu seçmek.', 'İki enkoderi oran, yön ve faz ofsetiyle hizalamak.', 'Açısal hız, burulma, tork ve order sonuçlarını sınırlarıyla okumak.'],
            why: [
                { title: 'Burulma titreşimi analizi ne işe yarar?', body: 'Burulma titreşimi, milin kendi dönme ekseni etrafında salınımlı olarak burulmasıdır. Motor ateşlemesi, dişli kavraması veya motor ve jeneratörlerdeki elektriksel dalgalanmalar gibi değişken torklardan kaynaklanır. Yanal hareket çok az olduğu için genellikle klasik ivmeölçerlerle görülemez; ancak mil, kaplin ve dişlilerde yorulma hasarına yol açabilir.' },
                { title: 'Hangi ölçümler gerekir?', body: 'Bir enkoderden ya da manyetik veya optik sensörle okunan dişli dişleri veya dişli çarktan alınan darbe sinyali gerekir; devir başına darbe sayısı bilinmelidir. Mil burulmasını ölçmek için mil hattı üzerinde farklı konumlarda iki sensör gerekir.' },
                { title: 'Neden darbe zamanlaması ölçülür?', body: 'Burulma titreşimi, her devir içindeki küçük hız dalgalanmaları olarak ortaya çıkar. Bu dalgalanmalar ardışık darbeler arasındaki süreden hesaplanır; darbe kenarları ne kadar hassas zamanlanırsa o kadar küçük dalgalanmalar ayırt edilebilir.' },
            ],
            interface: { title: 'Burulma Titreşimi çalışma ekranı', intro: 'İlerideki ekran görüntüsü analiz modunu, enkoder geometrisini, eksik diş ayarlarını, burulma hizasını, order seçimini ve görüntüleme birimlerini gösterecek. Aşağıdaki teori bu gerçek kontrolleri izler.' },
            theory: { title: 'Bir zamanlama ölçümü olarak burulma titreşimi', intro: 'Ortalama RPM sabit görünse bile mil her devir içinde az miktarda hızlanıp yavaşlayabilir. Hassas zaman damgaları bu küçük dalgalanmayı ortaya çıkarır.', cards: [
                { kicker: 'TEK ENKODER', title: 'Dönel hız dalgalanması', body: 'Devir başına darbe sayısı biliniyorsa komşu kenarlar arasındaki süre, o küçük açıdaki ortalama açısal hızı verir. Ortalama çıkarılınca çevrimsel hız dalgalanması kalır.' },
                { kicker: 'İKİ ENKODER', title: 'Dinamik mil burulması', body: 'Oran, yön ve sıfır-faz hizasından sonra iki mil konumu arasındaki bağıl açı burulma deformasyonudur. Mil rijitliği bu açıyı dinamik torka dönüştürebilir.' },
                { kicker: 'REFERANS ÇARKI', title: 'Eksik dişler mutlak konumu geri getirir', body: '60-2 benzeri çarkta bilerek uzun bir boşluk vardır. Doğru boşluk tespiti, bu aralığı hız çökmesi sanmak yerine tekrarlanabilir açı işareti kurar.' },
            ] },
            foundations: { title: 'Kenar algılama ve ölçüm doğruluğu', intro: 'İvmeölçer analizinden farklı olarak temel ölçüm darbe genliği değil, fiziksel eşik geçişinin zaman damgasıdır.', cards: [
                { title: 'Zaman damgası çözünürlüğü', body: 'Kuantizasyon ve tetikleme titreşimi özellikle yüksek diş sayısı ve RPM’de hız gürültüsüne dönüşür. Temiz elektriksel kenar ve kararlı eşik, güzel darbe genliğinden daha önemlidir.' },
                { title: 'Enkoder hizası', body: 'İki enkoder ters yönde veya dişli oranıyla dönebilir. Çıkarmadan önce faz ofseti ve trend kaldırma fiziksel hattı doğru tarif etmelidir.' },
                { title: 'Order bant genişliği', body: 'Order listesi ve ±oran bandı her ailenin çevresinde toplanan enerjiyi belirler. Geniş bant komşuları karıştırır; dar bant modülasyonu ve rampa yayılmasını kaçırır.' },
            ] },
            modes: { title: 'Analiz modları', intro: 'Dönel ve burulma modları benzer darbe işleme kullanır ama farklı soruları yanıtlar.', items: [
                { title: 'Dönel · tek enkoder', bestFor: 'Bir milde hız dalgalanması, ateşleme order’ı ve dişli/diş periyodu.', reveals: 'Açı, açısal hız dalgalanması, isteğe bağlı açısal ivme ve order spektrumu.', watch: 'Mil boyunca burulmayı ölçmez; yalnızca tek konumu gözler.' },
                { title: 'Burulma · iki enkoder', bestFor: 'Mil, kaplin veya dişli kademesi boyunca dinamik burulma.', reveals: 'Oran/yön hizası sonrası bağıl açı ve rijitlik biliniyorsa dinamik tork.', watch: 'Hiza ayarları hatta uymuyorsa statik ofset ve ortalama hız trendi sonucu bastırır.' },
                { title: 'Eksik diş sensörü', bestFor: '60-2 gibi motor krank ve referans çarkları.', reveals: 'Mutlak açı indeksleme ve fiziksel dişler arası hız.', watch: 'Yanlış diş sayısı, eksik diş sayısı veya boşluk oranı her devirde sahte ivme darbeleri üretir.' },
            ] },
            interpretation: { intro: 'Burulma özelliğini uyarma order’ı ve ölçüm konumuyla adlandırın.', items: [
                { title: 'Güçlü ateşleme order çizgisi', signal: 'Silindir ateşlemesine bağlı kararlı order açısal hız dalgalanmasına baskındır.', meaning: 'Yanma tork darbeleri mil hattını uyarıyordur.', confirm: 'Motor düzeninden beklenen ateşleme order’ıyla karşılaştırın; genliğin burulma doğal frekansı yakınında büyüyüp büyümediğine bakın.' },
                { title: 'Yerel hız dalgalanması azken burulma büyüyor', signal: 'İki enkoderin bağıl açısı, tekil dalgalanmaların düşündürdüğünden daha çok artar.', meaning: 'Enkoderler arasındaki mil kesiti dinamik olarak şekil değiştiriyordur.', confirm: 'Enkoder oranı/yönünü doğrulayın ve torka geçmeden önce bilinen burulma rijitliğini kullanın.' },
                { title: 'Referans boşluğunda devir başına darbe', signal: 'Açısal ivme her eksik diş işaretinde sıçrar.', meaning: 'Çözücü kasıtlı boşluğu gerçek hız değişimi sanıyor olabilir.', confirm: 'Darbeyi mekanik yorumlamadan önce çark geometrisini ve boşluk eşiğini denetleyin.' },
            ] },
            workflow: { title: 'Burulma analizi prosedürü', intro: 'Mekanik metrik hesaplamadan önce enkoder dalga biçimini ve çark tanımını doğrulayın.', checklist: ['Darbe kaynağının en yüksek burulma order’ı için yeterli devir başı kenara sahip olduğunu doğrulayın.', 'Otomatik eşiği yalnız kenar kararlılığını gözle kontrol ettikten sonra kullanın; gerekirse savunulabilir sabit seviye seçin.', 'Toplam diş, eksik diş ve boşluk oranını gerçek çarktan girin.', 'İki enkoder için hız oranı, dönüş yönü ve faz ofsetini kararlı koşuda doğrulayın.', 'Order bantlarını komşu aile aralığından dar tutun.', 'Torkun ölçüldüğünü, bilinen rijitlikten türetildiğini veya mevcut olmadığını açıkça raporlayın.'] },
            mistakes: [
                { title: 'Darbe genliğini mil hareketi sanmak', body: 'Temiz bir eşik geçişinden sonra darbe yüksekliği çoğunlukla elektrikseldir. Yararlı ölçüm kenarın ne zaman oluştuğudur.' },
                { title: 'Tek enkoder hız dalgalanmasına “mil burulması” demek', body: 'Burulma iki fiziksel konum arasındaki bağıl açıyı veya başka doğrudan burulma ölçümünü gerektirir.' },
                { title: 'Dişli oranını ve dönüş yönünü yok saymak', body: 'Hizalanmamış enkoder açılarını çıkarmak mekanik olmayan bir rampa veya iki kat hareket üretir.' },
                { title: 'Rijitlik olmadan burulmayı torka çevirmek', body: 'Tork ölçüm düzlemleri arasındaki kesitin burulma rijitliğine bağlıdır. Varsayılan değer açıkça belirtilip gerekçelendirilmelidir.' },
            ],
            sources: [
                { title: 'ISO 22266-1:2022', note: 'Elektriksel uyarma altındaki bağlı türbin-jeneratör mil hatlarında burulma doğal frekansı ve dayanım değerlendirmesi.', href: 'https://www.iso.org/standard/78144.html' },
            ] },
    },
}

export default ROTATING_LEARNING
