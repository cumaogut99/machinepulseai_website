const FFT_LEARNING_EXTRAS = {
    en: {
        pipeline: {
            title: 'The FFT calculation starts before the FFT',
            intro:
                'A defensible spectrum is a chain. Each stage protects the meaning of the next one.',
            steps: [
                {
                    title: 'Physical signal',
                    body: 'The machine creates motion, sound or electrical variation before software exists in the chain. Sensor bandwidth, direction, mounting and calibration determine which part becomes trustworthy measured data; FFT cannot recover motion the sensor never captured correctly.',
                },
                {
                    title: 'Anti-alias filter',
                    body: 'An analog low-pass filter attenuates content that would fold below Nyquist when sampled. It must act before the ADC because aliased samples no longer contain enough information to distinguish the original high frequency from its false low-frequency image.',
                },
                {
                    title: 'ADC at fs',
                    body: 'The ADC converts the conditioned continuous signal into uniformly spaced numbers at sample rate fs. This creates the discrete time signal, sets Nyquist at fs/2 and makes timing accuracy part of every later frequency result.',
                },
                {
                    title: 'Representative range',
                    body: 'The navigator cursors isolate one event or one sufficiently steady speed, load and temperature state. Combining unlike conditions produces an average of different realities; it may look smooth while describing no actual operating point.',
                },
                {
                    title: 'Block + window',
                    body: 'Block length N simultaneously sets frequency spacing Δf = fs/N and evidence duration N/fs. The window reduces the artificial discontinuity between the finite block’s ends, trading sidelobe leakage against peak width and amplitude behavior.',
                },
                {
                    title: 'FFT + interpretation',
                    body: 'The C++ engine produces complex bins, derived magnitude, phase or density views, and diagnostic candidates. Engineering context—RPM, geometry, forcing, units, calibration and a baseline—turns those numerical features into defensible evidence.',
                },
            ],
        },
        workflow: {
            title: 'A first-analysis recipe you can defend',
            intro:
                'Use this sequence until the reasoning becomes automatic. The order matters because later settings cannot rescue bad acquisition or a mixed time range.',
            steps: [
                {
                    title: 'Verify acquisition',
                    body: 'Confirm channel identity, units, calibration, sensor direction, sample rate, bandwidth and anti-alias protection. A beautiful spectrum cannot correct swapped channels, loose mounting, clipping or incorrect metadata.',
                },
                {
                    title: 'Isolate one state',
                    body: 'Use the time trace and navigator to bracket one steady run or one clearly defined event. If speed or content changes inside the interval and that change is the subject, choose STFT rather than forcing the whole interval into one stationary spectrum.',
                },
                {
                    title: 'Write the question',
                    body: 'Write the desired answer before choosing the plot: tone frequency and amplitude, broadband power density, or timing of changing content. That sentence determines FFT, Welch PSD or STFT and prevents switching methods merely because another plot looks cleaner.',
                },
                {
                    title: 'Budget resolution',
                    body: 'Choose the smallest frequency separation the decision must distinguish, then estimate N = fs/Δf. Check that N/fs fits inside a representative stationary interval; if it does not, the requested frequency and time precision are physically incompatible.',
                },
                {
                    title: 'Control leakage',
                    body: 'Start with Hann because most field blocks do not contain an exact integer number of cycles. Change the window only for a stated need such as coherent sampling, improved tone-amplitude accuracy or stronger sidelobe suppression, and accept the matching peak-width trade-off.',
                },
                {
                    title: 'Stabilize deliberately',
                    body: 'Add Linear or Exponential averaging only when repeated blocks represent the same process and random variation obscures the estimate. Use Max Hold for intermittent or worst-case presence; it is deliberately biased high and does not represent typical energy.',
                },
                {
                    title: 'Compute and verify',
                    body: 'After Compute, verify the analysed samples, Δf, average count, Y-axis representation and visible band. These values describe how the answer was produced; reading peaks before them is like reading a test result without its test method.',
                },
                {
                    title: 'Attach physics',
                    body: 'Relate candidate frequencies to measured RPM, orders, gear mesh, blade pass, electrical supply and known forcing functions. Strengthen the link using harmonics, sidebands, direction, phase, load response, trends and a known-good baseline.',
                },
            ],
        },
        mistakes: {
            title: 'Six mistakes the plot will not warn you about',
            items: [
                {
                    title: '“The FFT has a peak, so the structure is resonant.”',
                    body: 'A peak can come from excitation, transfer amplification or both. Use synchronized input-output FRF and coherence to separate them.',
                },
                {
                    title: '“Max frequency means the signal was filtered.”',
                    body: 'The display band changes what you see. It does not remove out-of-band energy before the calculation.',
                },
                {
                    title: '“More zero-padding gave me more resolution.”',
                    body: 'It interpolated the displayed bins. Physical resolving power still comes from measured block duration and window behavior.',
                },
                {
                    title: '“Averaging always improves the answer.”',
                    body: 'It reduces random variation only when the combined blocks represent the same process. It can hide changing states.',
                },
                {
                    title: '“The dB value is automatically calibrated.”',
                    body: 'dB is a ratio. Without a declared reference and calibrated channel, it is not automatically dB SPL, dBV or a standards value.',
                },
                {
                    title: '“Aliasing can be cleaned after recording.”',
                    body: 'Once two physical frequencies produce the same samples, the original identity is lost. Prevent aliasing during acquisition.',
                },
            ],
        },
        reference: {
            formulasEyebrow: 'Mathematics where the concepts are learned',
            formulasTitle: 'Core equations behind the readouts',
            formulasIntro:
                'These equations now sit beside the Fourier foundations they explain. Use them to connect the controls and displayed values to block length, sampling, windowing, density and integration—not as formulas detached from the measurement chain.',
            assumptionsTitle: 'Engineering guardrails',
            outputsTitle: 'What the module produces',
        },
    },
    tr: {
        pipeline: {
            title: 'FFT Analiz Zinciri: 6 Adımda Güvenilir Ölçüm',
            intro:
                'Güvenilir bir spektrum bir zincirdir. Her bir adımı doğru atmak sonraki adımın sonucunu korur.',
            steps: [
                {
                    title: '1. Fiziksel Sinyal (Makine Titreşimi)',
                    body: 'Makine daha yazılım ortamına girmeden önce mekanik titreşim üretir. Sensörün bant genişliği, yönü, montaj şekli ve kalibrasyonu verinizin kalitesini belirler. Sensörün doğru yakalayamadığı bir titreşimi FFT yazılımla geri getiremez.',
                },
                {
                    title: '2. Analog Anti-Alias Filtresi',
                    body: 'Donanımdaki analog alçak geçiren filtre, örnekleme hızının yarısının (Nyquist = fs/2) üzerindeki frekansları süzmelidir. Bu işlem ADC öncesinde yapılmalıdır; aksi halde katlanan hayalet frekanslar (aliasing) gerçek veriyle karışır.',
                },
                {
                    title: '3. Sayısallaştırma (ADC ve Örnekleme Hızı - fs)',
                    body: 'ADC (Analog-Sayısal Dönüştürücü), sürekli sinyali eşit zaman aralıklarıyla sayılara dönüştürür. Örnekleme hızı (fs) Nyquist sınırını (fs/2) belirler ve tüm frekans ekseninin temelini oluşturur.',
                },
                {
                    title: '4. Temsilî Zaman Aralığının Seçilmesi',
                    body: 'Zaman imleçleriyle makinenin sabit bir çalışma durumunda (sabit devir, sabit yük) kaldığı bir zaman aralığı seçilir. Değişken devirleri içeren bir aralık almak ortalamayı bozar ve hatalı spektrum üretir.',
                },
                {
                    title: '5. Blok Boyutu (N) ve Pencereleme (Windowing)',
                    body: 'Blok uzunluğu (N) frekans adımlarını (Δf = fs/N) belirler. Pencere fonksiyonu (Hann, Flat-Top vb.) ise kesilen kaydın iki ucundaki süreksizliği yumuşatarak enerji sızıntısını (leakage) önler.',
                },
                {
                    title: '6. C++ FFT Motoru ve Mühendislik Yorumu',
                    body: 'C++ motoru milisaniyeler içinde karmaşık dönüşümü yapar ve spektrumu çizer. Mühendis bu spektrumdaki tepeleri makine devri, dişli sayısı ve rulman frekanslarıyla eşleştirerek doğru teşhisi koyar.',
                },
            ],
        },
        workflow: {
            title: 'Adım Adım Saha Analiz Adımları',
            intro:
                'Analiz yaparken bu sırayı izleyin. Sonraki ayarlar hatalı veri toplamayı veya karışık bir zaman aralığını düzeltemez.',
            steps: [
                {
                    title: '1. Ölçüm Kurulumunu Doğrulayın',
                    body: 'Kanal adını, birimini (g, mm/s), sensör yönünü ve örnekleme hızını doğrulayın. Yanlış birim veya gevşek monte edilmiş sensörle alınan kaydı spektrum düzeltemez.',
                },
                {
                    title: '2. Sabit Çalışma Aralığını Seçin',
                    body: 'Zaman grafiğinde imleçlerle makinenin sabit hızda çalıştığı durağan bir aralığı dondurun. Eğer devir sürekli değişiyorsa FFT yerine STFT Spektrogram modunu kullanın.',
                },
                {
                    title: '3. Mühendislik Sorusunu Tanımlayın',
                    body: 'Spektrumu hesaplamadan önce amacınızı belirleyin: Tonal bileşenleri mi arıyorsunuz (Genlik FFT), rastgele gürültü enerjisini mi ölçüyorsunuz (Welch PSD), yoksa zamanla değişen frekansları mı izliyorsunuz (STFT)?',
                },
                {
                    title: '4. Frekans Çözünürlüğünü (Δf) Bütçeleyin',
                    body: 'Ayırmak istediğiniz en küçük frekans farkını belirleyin (örneğin 1 Hz). Buna göre N = fs / Δf formülüyle gerekli blok boyutunu seçin ve sürenin (N/fs) seçtiğiniz zaman aralığına sığdığını kontrol edin.',
                },
                {
                    title: '5. Sızıntıyı Kontrol Edin (Pencere Seçimi)',
                    body: 'Genel titreşim ölçümlerinde varsayılan Hann penceresini kullanın. Hassas genlik/şiddet okuması yapıyorsanız (ISO standartları) Flat-Top, yakın frekansları ayırıyorsanız Blackman-Harris tercih edin.',
                },
                {
                    title: '6. Bilinçli Ortalama Alın',
                    body: 'Rastgele gürültüyü kararlılaştırmak için Linear ortalama ekleyin. Geçici pikleri veya en kötü durumu görmek için Max Hold kullanın. Makine çalışma durumu değişiyorsa ortalama almayın.',
                },
                {
                    title: '7. Compute Edin ve Parametreleri Doğrulayın',
                    body: 'Compute butonuna bastıktan sonra ekrandaki Δf, kullanılan örnek sayısı ve ortalama adedini doğrulayın.',
                },
                {
                    title: '8. Tepeleri Fiziksel Kaynaklarla Eşleştirin',
                    body: 'Elde edilen tepe frekanslarını mil devri ($1\times$), harmonikler ($2\times, 3\times$), dişli geçişi ve rulman arıza frekanslarıyla (BPFO/BPFI) eşleştirerek teşhisi tamamlayın.',
                },
            ],
        },
        mistakes: {
            title: 'Saha Analistlerinin Sık Yaptığı 6 Kritik Hata',
            items: [
                {
                    title: '1. “Spektrumda yüksek bir tepe var, kesin rezonans var!”',
                    body: 'Hata! Yüksek tepe güçlü bir uyarım kaynağından (örneğin şiddetli balanssızlık) da gelebilir. Rezonansı doğrulamak için darbe (çekiç) testi veya Çapraz Spektrum (FRF) kullanılmalıdır.',
                },
                {
                    title: '2. “Görünüm bandını daralttım, gürültüyü süzdüm.”',
                    body: 'Hata! Min/Max bant sınırını daraltmak sadece x eksenindeki görüntüyü yakınlaştırır. Verideki bant dışı enerjiyi veya tepeleri hesaptan silmez.',
                },
                {
                    title: '3. “Zero-Padding (sıfır doldurma) yaptım, frekans çözünürlüğüm arttı.”',
                    body: 'Hata! Zero-padding çizilen frekans çizgisini daha pürüzsüz yapar (interpole eder); ancak fiziksel olarak iki yakın frekansı ayırma gücünü artırmaz.',
                },
                {
                    title: '4. “Ortalama sayısı arttıkça sonucum her zaman daha iyi olur.”',
                    body: 'Hata! Ortalama almak sadece makine çalışma durumu sabitken gürültüyü azaltır. Devir veya yük değişiyorsa, ortalama almak değişkenliği gizler ve hatalı sonuç üretir.',
                },
                {
                    title: '5. “dB değeri otomatik olarak kalibre edilmiş standart seviyedir.”',
                    body: 'Hata! dB göreceli bir orandır. Tanımlanmış bir referans değer ve kalibre edilmiş bir sensör olmadan doğrudan dB SPL veya standart dBV anlamına gelmez.',
                },
                {
                    title: '6. “Aliasing hatasını kayıt alındıktan sonra yazılımla temizlerim.”',
                    body: 'Hata! Örnekleme sırasında Nyquist sınırı aşıldıysa yüksek frekans düşük frekans olarak kaydedilmiştir ve veri bozulmuştur. Aliasing önlemi mutlaka ADC öncesi analog filtre ile alınmalıdır.',
                },
            ],
        },
        reference: {
            formulasEyebrow: 'Temel Matematiksel Bağıntılar',
            formulasTitle: 'Ekrandaki Değerlerin Arkasındaki Denklem ve Formüller',
            formulasIntro:
                'Bu formüller kontrollerin ve ekrandaki sonuçların (blok uzunluğu, örnekleme hızı, pencereleme ve entegrasyon) arkasındaki temel bağıntılardır.',
            assumptionsTitle: 'Mühendislik Kabulleri ve Sınırlar',
            outputsTitle: 'Modülün Ürettiği Çıktı ve Portlar',
        },
    },
}

export default FFT_LEARNING_EXTRAS
