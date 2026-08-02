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
            title: 'MachinePulseAI control reference',
            intro:
                'The groups below follow the application state selected above. Change the screenshot state to bring its FFT Settings, Markers, Compare, Channels or Results controls into the same learning flow; open a group for exact effects, defaults, recompute behavior and interpretation limits.',
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
            title: 'FFT hesabı, FFT’den önce başlar',
            intro:
                'Savunulabilir spektrum bir zincirdir. Her aşama, bir sonrakinin anlamını korur.',
            steps: [
                {
                    title: 'Fiziksel sinyal',
                    body: 'Yazılım zincire girmeden önce makine hareket, ses veya elektriksel değişim üretir. Sensör bant genişliği, yönü, montajı ve kalibrasyonu hangi bölümün güvenilir ölçülmüş veriye dönüşeceğini belirler; FFT sensörün doğru yakalamadığı hareketi geri getiremez.',
                },
                {
                    title: 'Anti-alias filtresi',
                    body: 'Analog alçak geçiren filtre, örneklendiğinde Nyquist altına katlanacak içeriği zayıflatır. ADC’den önce çalışmak zorundadır; alias olmuş örnekler özgün yüksek frekansı sahte düşük-frekans görüntüsünden ayıracak bilgiyi artık taşımaz.',
                },
                {
                    title: 'fs ile ADC',
                    body: 'ADC koşullandırılmış sürekli sinyali fs örnekleme hızıyla eşit aralıklı sayılara dönüştürür. Bu işlem ayrık zaman sinyalini oluşturur, Nyquist’i fs/2 yapar ve zamanlama doğruluğunu bütün sonraki frekans sonuçlarının parçası hâline getirir.',
                },
                {
                    title: 'Temsilî aralık',
                    body: 'Gezgin imleçleri tek olayı veya yeterince kararlı hız, yük ve sıcaklık durumunu ayırır. Farklı koşulları birleştirmek farklı gerçekliklerin ortalamasını üretir; sonuç düzgün görünürken hiçbir gerçek çalışma noktasını anlatmayabilir.',
                },
                {
                    title: 'Blok + pencere',
                    body: 'Blok uzunluğu N aynı anda Δf = fs/N frekans aralığını ve N/fs kanıt süresini belirler. Pencere sonlu bloğun iki ucu arasındaki yapay süreksizliği azaltır; yan-lob sızıntısını tepe genişliği ve genlik davranışıyla takas eder.',
                },
                {
                    title: 'FFT + yorum',
                    body: 'C++ motor karmaşık binleri, genlik, faz veya yoğunluk görünümlerini ve tanı adaylarını üretir. RPM, geometri, uyarım, birim, kalibrasyon ve referanstan oluşan mühendislik bağlamı bu sayısal özellikleri savunulabilir kanıta dönüştürür.',
                },
            ],
        },
        workflow: {
            title: 'Savunabileceğiniz ilk analiz reçetesi',
            intro:
                'Akıl yürütme otomatikleşene kadar bu sırayı kullanın. Sonraki ayarlar kötü veri toplamayı veya karışık zaman aralığını kurtaramaz.',
            steps: [
                {
                    title: 'Veri toplamayı doğrulayın',
                    body: 'Kanal kimliğini, birimi, kalibrasyonu, sensör yönünü, örnekleme hızını, bant genişliğini ve anti-alias korumasını doğrulayın. Güzel bir spektrum karışmış kanalı, gevşek montajı, doyumu veya yanlış meta veriyi düzeltemez.',
                },
                {
                    title: 'Tek durumu ayırın',
                    body: 'Zaman izi ve gezginle tek kararlı koşuyu veya açıkça tanımlı olayı sınırlayın. Aralık içinde hız ya da içerik değişiyor ve asıl konu bu değişimse bütün süreyi tek durağan spektruma zorlamak yerine STFT seçin.',
                },
                {
                    title: 'Soruyu yazın',
                    body: 'Grafiği seçmeden önce istenen cevabı yazın: ton frekansı ve genliği, geniş bant güç yoğunluğu veya değişen içeriğin zamanlaması. Bu cümle FFT, Welch PSD veya STFT’yi belirler ve başka grafik daha temiz göründü diye yöntem değiştirmeyi önler.',
                },
                {
                    title: 'Çözünürlüğü bütçeleyin',
                    body: 'Kararın ayırması gereken en küçük frekans farkını seçin ve N = fs/Δf tahmini yapın. N/fs süresinin temsilî durağan aralığa sığdığını kontrol edin; sığmıyorsa istenen frekans ve zaman hassasiyeti fiziksel olarak uyuşmaz.',
                },
                {
                    title: 'Sızıntıyı yönetin',
                    body: 'Saha bloklarının çoğu tam sayı çevrim içermediği için Hann ile başlayın. Pencereyi yalnız koherent örnekleme, daha iyi ton-genlik doğruluğu veya güçlü yan-lob bastırma gibi açık gerekçeyle değiştirin ve karşılık gelen tepe-genişliği ödününü kabul edin.',
                },
                {
                    title: 'Bilinçli kararlılaştırın',
                    body: 'Tekrarlı bloklar aynı süreci temsil ediyor ve rastgele değişkenlik kestirimi örtüyorsa Linear veya Exponential ortalama ekleyin. Max Hold’u aralıklı veya en kötü durum varlığı için kullanın; bilinçli olarak yüksek taraftadır ve tipik enerjiyi göstermez.',
                },
                {
                    title: 'Hesaplayın ve doğrulayın',
                    body: 'Compute sonrasında analiz edilen örneği, Δf’yi, ortalama sayısını, Y ekseni sunumunu ve görünür bandı doğrulayın. Bunlar cevabın nasıl üretildiğini anlatır; önce tepeyi okumak test yöntemini görmeden sonucu okumaya benzer.',
                },
                {
                    title: 'Fiziğe bağlayın',
                    body: 'Aday frekansları ölçülmüş RPM, order, dişli kavrama, kanat geçişi, şebeke ve bilinen uyarımla ilişkilendirin. Bağlantıyı harmonikler, yan bantlar, yön, faz, yük davranışı, trend ve sağlam referansla güçlendirin.',
                },
            ],
        },
        mistakes: {
            title: 'Grafiğin sizi uyarmayacağı altı hata',
            items: [
                {
                    title: '“FFT’de tepe var; yapı rezonanstadır.”',
                    body: 'Tepe uyarımdan, transfer büyütmesinden veya ikisinden gelebilir. Ayırmak için senkron girdi-çıktı FRF ve koherans kullanın.',
                },
                {
                    title: '“Maksimum frekans sinyali filtreledi.”',
                    body: 'Görünüm bandı yalnız gördüğünüz alanı değiştirir; hesap öncesi bant dışı enerjiyi kaldırmaz.',
                },
                {
                    title: '“Zero-padding bana daha fazla çözünürlük verdi.”',
                    body: 'Gösterilen binleri enterpole etti. Fiziksel ayırma gücü hâlâ ölçülen blok süresi ve pencere davranışından gelir.',
                },
                {
                    title: '“Ortalama her zaman sonucu iyileştirir.”',
                    body: 'Yalnız birleşen bloklar aynı süreci temsil ediyorsa rastgele değişimi azaltır. Değişen durumları gizleyebilir.',
                },
                {
                    title: '“dB değeri otomatik olarak kalibredir.”',
                    body: 'dB bir orandır. Tanımlı referans ve kalibre kanal olmadan otomatik olarak dB SPL, dBV veya standart değeri değildir.',
                },
                {
                    title: '“Aliasing kayıt sonrasında temizlenebilir.”',
                    body: 'İki fiziksel frekans aynı örnekleri ürettiğinde özgün kimlik kaybolur. Aliasing’i veri toplarken önleyin.',
                },
            ],
        },
        reference: {
            title: 'MachinePulseAI kontrol rehberi',
            intro:
                'Aşağıdaki gruplar yukarıda seçtiğiniz uygulama durumunu izler. Aynı öğrenme akışında FFT Settings, Markers, Compare, Channels veya Results kontrollerini getirmek için ekran durumunu değiştirin; kesin etki, varsayılan, yeniden hesap davranışı ve yorum sınırı için ilgili grubu açın.',
            formulasEyebrow: 'Kavramın öğrenildiği yerde matematik',
            formulasTitle: 'Ekrandaki değerlerin temel denklemleri',
            formulasIntro:
                'Bu denklemler artık açıkladıkları Fourier temellerinin yanında yer alıyor. Kontrolleri ve ekrandaki değerleri blok uzunluğu, örnekleme, pencereleme, yoğunluk ve entegrasyonla ilişkilendirmek için kullanın; ölçüm zincirinden kopuk formüller olarak değil.',
            assumptionsTitle: 'Mühendislik sınırları',
            outputsTitle: 'Modülün ürettiği çıktılar',
        },
    },
}

export default FFT_LEARNING_EXTRAS
