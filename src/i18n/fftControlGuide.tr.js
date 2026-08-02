const FFT_CONTROL_GUIDE_TR = {
    groups: [
        {
            name: '1 · Güncel gezinme haritası',
            desc:
                'Güncel panel üç tür gezinme kullanır. Soldaki düğmeler ayar sayfasını, ortadakiler çizilen sonucu, sağdakiler kanıt panelini değiştirir. Yalnızca Compute yeni hesap başlatır.',
            controls: [
                {
                    name: 'FFT Settings · Markers · Compare',
                    desc:
                        'Sol sütunda aynı anda bir sayfa açarlar. FFT Settings bütün hesap kontrollerini, Markers tepe, harmonik ve yan bant kontrollerini, Compare ise kanal ve zaman-aralığı karşılaştırmalarını içerir. Etkin sayfaya tekrar basmak içeriği kapatır; Compute erişilebilir kalır.',
                },
                {
                    name: 'Spectrum · PSD · Phase · STFT',
                    desc:
                        'Orta sonuç yüzeyini seçerler ve hesap başlatmazlar. Spectrum genliği, PSD güç yoğunluğunu, Phase faz açısını gösterir. Henüz STFT sonucu yoksa STFT düğmesi Spectrogram modunu hazırlar ve ayarlarını açar; haritayı üretmek için tek kanal ve yeni Compute gerekir.',
                },
                {
                    name: 'Channels · Results',
                    desc:
                        'Sağ sütunu açar veya kapatırlar. Channels hesaplanacak sinyalleri seçer. Results son sonuçtan üretilen üç iç sekmeyi barındırır: Summary, Peaks ve Compare.',
                },
            ],
        },
        {
            name: '2 · FFT Settings — Input ve zaman gezgini',
            desc:
                'Bu grup “hangi örnekler ilgilendiğim çalışma durumunu anlatıyor?” sorusunu yanıtlar. Karışık çalışma durumunun FFT’si matematiksel olarak doğru, mühendislik açısından kullanışsız olabilir.',
            controls: [
                {
                    name: 'Sample Rate',
                    desc:
                        'Etkin MPAI kaynağından gelen ve saniyedeki örnek sayısıyla gösterilen salt okunur meta veridir. Nyquist’i fs/2, bin aralığını Δf = fs/N olarak belirler. Yanlışsa bütün frekans etiketleri yanlıştır; bu alan yeniden örnekleme kontrolü değildir.',
                },
                {
                    name: 'Navigator — Dual region',
                    desc:
                        'Varsayılan ↔ modu iki sınırla istenen zaman aralığını seçer. İlk sonuçtan sonra sınır bırakıldığında yeni aralık hesaplanır. Aralık tüm blok trenini içerebildiği için çoklu-blok ortalaması kullanılabilir.',
                },
                {
                    name: 'Navigator — Single sliding window',
                    desc:
                        'Gezgin mod düğmesiyle tek sürücü imleç taşıyan sabit FFT aralığına geçilir. Pencere genişliği Block / Lines ve örnekleme hızından türetilir. Her konum bağımsız tek blok olduğundan Single modu Block Processing’i bilinçli olarak None değerine zorlar.',
                },
                {
                    name: 'Channel',
                    desc:
                        'Gezginde gösterilecek zaman izini seçer ve imleçlerin yerleştirilmesine yardım eder. Gerçek FFT girişlerini seçen sağdaki çoklu-seçim Channels panelinin yerine geçmez.',
                },
            ],
        },
        {
            name: '3 · FFT Settings — Spectrum',
            desc:
                'Bu kontroller kestiriciyi seçer ve tek dönüşüm bloğunu tanımlar. Sayısal sonucun ne anlama geldiğini doğrudan değiştirirler.',
            controls: [
                {
                    name: 'Mode — FFT (amplitude)',
                    desc:
                        'Mil orderları, elektrik tonları, dişli kavrama ve harmonikler gibi ayrık deterministik içerik için kullanın. Genlik, faz, bin başına PSD sunumu ve bulunan-tepe metrikleri üretir. Seçilen durum yaklaşık kararlıysa ve soru “hangi tonlar var?” ise buradan başlayın.',
                },
                {
                    name: 'Mode — Welch PSD',
                    desc:
                        'Soru hertz başına güç olduğunda durağan rastgele veya geniş bant titreşim için kullanın. Sinyal pencerelenmiş, örtüşen segmentlere bölünür ve periodogramları ortalanır. Ana sonuç birimi U²/Hz olduğundan bin aralığı değişse de karşılaştırılabilir.',
                },
                {
                    name: 'Mode — Spectrogram (STFT)',
                    desc:
                        'Seçilen aralıkta frekans içeriği değişiyorsa kullanın: hızlanma, yavaşlama, chirp, darbe veya durum geçişi. Kısa FFT kareleri dizisi hesaplanır ve zamana göre yerleştirilir. Zaman × frekans matrisi sınırlı kalsın diye tek seçili kanalla çalışır.',
                },
                {
                    name: 'Window',
                    desc:
                        'Her dönüşümden önce Hann, Hamming, Blackman, Flat-Top, Kaiser, Blackman-Harris, Gaussian, Bartlett, Tukey veya Rectangular taper uygular. Güncel genel varsayılan Hann’dır. Pencereler daha geniş tepe veya değişen genlik davranışı karşılığında kenar-süreksizliği sızıntısını azaltır; Rectangular yalnız koherent blokta uygundur.',
                },
                {
                    name: 'β · σ · α pencere parametresi',
                    desc:
                        'Yalnız Kaiser, Gaussian veya Tukey için görünür. Kaiser β varsayılan 14, Gaussian σ 0,4 ve Tukey α 0,5’tir. Şekli değiştirmek ana-lob genişliği ve yan-lob bastırmasını değiştirir; görsel beğeniye değil ölçüm gereksinimine dayanmalıdır.',
                },
                {
                    name: 'Block / Lines',
                    desc:
                        'Auto veya 256–131072 örnek seçilir; güncel varsayılan 4096’dır. Sabit N, Δf = fs/N ve N/fs blok süresini verir. Auto FFT için seçimin tamamını; sabit N ise sol sınırdan bir blok ile istenen ortalama adımlarını kullanır.',
                },
            ],
        },
        {
            name: '4 · FFT Settings — Frequency Band',
            desc:
                'Bu alan görünüm ve oktav-analizi sınırıdır; FFT öncesi bant geçiren filtre değildir.',
            controls: [
                {
                    name: 'Min',
                    desc:
                        'Hertz cinsinden alt görünür sınırdır; varsayılan 0 DC’den başlar. Min’i yükseltmek bölgeyi okumayı kolaylaştırabilir fakat düşük frekans içeriğini tepe algılamadan veya özet metriklerden çıkarmaz.',
                },
                {
                    name: 'Max',
                    desc:
                        'Hertz cinsinden üst görünür sınırdır. Varsayılan 0, Nyquist’i otomatik kullanır. Nyquist’i 2048 Hz olan kayıtta 500 Hz girmek sonucu 0–500 Hz’e yakınlaştırır; veri toplamayı aliasing’den korumaz.',
                },
            ],
        },
        {
            name: '5 · FFT Settings — Block Processing',
            desc:
                'Bu grup tekrarlı blokların nasıl birleştirileceğini belirler. Ortalama yalnız birleşen bloklar aynı istatistiksel çalışma durumunu anlatıyorsa yararlıdır.',
            controls: [
                {
                    name: 'Mode — None (single block)',
                    desc:
                        'Tek bloğu dönüştürür ve anlık ayrıntıyı korur. Varsayılan ve Single gezgin modunda izin verilen tek seçenektir. Yumuşatma veya tutma uygulamadan önce ham değişkenliği anlamak için önce bunu kullanın.',
                },
                {
                    name: 'Mode — Linear',
                    desc:
                        'Seçilen sayıda örtüşen FFT bloğunu hesaplar ve eşit ağırlık verir. Rastgele değişkenlik kararlılaşırken kalıcı tonlar görünür kalır. Birleşen sürede hız, yük veya uyarım değişirse değişimi gizleyebilir.',
                },
                {
                    name: 'Mode — Exponential',
                    desc:
                        'Yeni sonuç (1−α)·eski + α·yeni ile güncellenir; yakın bloklar daha ağırdır. Yavaş değişen fakat sürekli izlenen durum için kullanışlıdır. Basit eşit-ağırlıklı ortalama değildir ve blok sırasına bağlıdır.',
                },
                {
                    name: 'Mode — Max Hold',
                    desc:
                        'Seçilen bloklar boyunca her frekans bininde görülen en büyük genliği tutar. Aralıklı veya en kötü durum varlığını bulmak için kullanın. Eğriyi tipik enerji veya tek fiziksel anın spektrumu olarak yorumlamayın.',
                },
                {
                    name: 'Blocks',
                    desc:
                        'Birleştirilecek blok sayısı 1–1000 arasındadır; hazırlanmış varsayılan değer 10’dur. İstenen kaynak aralığı N + (Blocks−1)·adım olur. Seçim kısa kalırsa yalnız mevcut tam hesap kapsamı kullanılabilir.',
                },
                {
                    name: 'Overlap',
                    desc:
                        '%0, %25, %50, %67, %75 veya %87,5 seçilir; varsayılan %50’dir. Adım yaklaşık N·(1−örtüşme) olur. Örtüşme aynı süreden daha fazla pencereli blok çıkarır; hesap yükünü artırır fakat her bloğun temel Δf değerini iyileştirmez.',
                },
                {
                    name: 'Exp. α',
                    desc:
                        'Yalnız Exponential modda görünür; aralık 0,01–1, varsayılan 0,1’dir. Küçük α daha yumuşak fakat yavaş; büyük α değişimi hızlı izler fakat daha değişkendir. α en yeni bloğa verilen paydır.',
                },
            ],
        },
        {
            name: '6 · FFT Settings — Post-processing',
            desc:
                'Bu kontroller hesaplanmış spektral niceliklerin nasıl sunulduğunu veya dönüştürüldüğünü değiştirir. Ağırlıklandırma veya entegrasyondan önce fiziksel birimleri doğrulayın.',
            controls: [
                {
                    name: 'Y Axis',
                    desc:
                        'Magnitude (linear) varsayılandır; mühendislik birimi genliğini ve U²/Hz cinsinden doğrusal PSD’yi gösterir. Magnitude (logarithmic) aynı fiziksel değerleri logaritmik Spectrum ve PSD eksenlerinde kullanır. Magnitude (dB), genliği dB ve PSD’yi dB/Hz gösterir; Phase derece kalır. Önbellekteki Spectrum, PSD ve Peaks sütunu anında yeniden çizilir.',
                },
                {
                    name: 'Weighting',
                    desc:
                        'None (Z) düzdür ve genel titreşim çalışmasının varsayılanıdır. A, B ve C ağırlıkları dB bölgesinde akustik frekans vurgusu uygular. Sensörü kalibre etmez ve yalnız eğri daha temiz görünsün diye seçilmemelidir.',
                },
                {
                    name: 'Integration',
                    desc:
                        'None kaynak niceliğini korur; Single kalibre ivmeyi hıza, Double yer değiştirmeye dönüştürür. Frekansa bölme düşük-frekans bias’ını ve gürültüyü büyütür; 0 Hz’de entegrasyon tekil olduğu için DC bastırılır.',
                },
                {
                    name: 'Octave overlay',
                    desc:
                        'Varsayılan Off’tur. 1/1, 1/3, 1/12 veya 1/24 oktav bant gücünü hesaplar ve dar bant spektrumuna bant merkezlerini bindirir. Enerjiyi oransal bantlarda özetler; özgün FFT binlerini yumuşatmaz.',
                },
            ],
        },
        {
            name: '7 · Channels',
            desc:
                'Güncel FFT widgetı çok kanallı FFT, PSD ve faz bindirmesini destekler. Kanal seçimi hesap reçetesinin parçasıdır.',
            controls: [
                {
                    name: 'Signal checklist',
                    desc:
                        'Bir veya daha fazla uyumlu kanal işaretleyin. Her kanal aynı ayarlarla sırayla hesaplanır ve ayrı renk alır. İlk seçilen kanal üst seviye özeti sağlar; kanala özel sonuçlar bindirme ve karşılaştırma için korunur.',
                },
                {
                    name: 'All · Clear',
                    desc:
                        'All listedeki bütün sinyalleri, Clear hiçbirini seçer. En az bir kanal işaretlenene kadar Compute geçersizdir. Bindirme mümkün diye ilgisiz birimleri aynı grafiğe koymayın.',
                },
            ],
        },
        {
            name: '8 · Markers',
            desc:
                'Tepe eşikleri sonraki hesabı değiştirir. Tepe etiketi, harmonik ve yan bant görünüm kontrolleri önbellekteki sonucu anında yeniden çizer.',
            controls: [
                {
                    name: 'Max Peaks · Min Magnitude',
                    desc:
                        'Max Peaks 1–100 aday kabul eder ve varsayılan 20’dir. Min Magnitude −200–200 dB aralığında ve varsayılan −80 dB’dir. Kabul edilen yerel maksimumlar üç-bin paraboliyle iyileştirilir; iyileştirme blok ve pencerenin ötesinde fiziksel çözünürlük oluşturmaz.',
                },
                {
                    name: 'Show detected peaks on spectrum',
                    desc:
                        'Mevcut kabul edilmiş tepe listesinden en fazla on etiketli düşey çizgi çizer. Kapatmak Peaks satırlarını veya metrikleri değiştirmeden görsel kalabalığı azaltır.',
                },
                {
                    name: 'Show harmonic family · Fundamental',
                    desc:
                        'f₀, 2f₀, 3f₀… tarağını etkinleştirir. Fundamental baskın tepeyi otomatik kullanabilir veya Manual f₀ seçilebilir. Otomatik mod yalnız baskın tepe fiziksel temel bileşense doğrudur.',
                },
                {
                    name: 'Manual f₀ · Harmonics',
                    desc:
                        'Manual f₀ varsayılan 50 Hz’dir ve bilinen mil, elektrik veya uyarım frekansına ayarlanabilir. Harmonics varsayılan 8, aralık 1–50’dir. Bunlar görsel imleçtir; FFT binlerini veya THD hesabını değiştirmez.',
                },
                {
                    name: 'Show sideband family · Sideband Δf · Sidebands / side',
                    desc:
                        'Baskın tepenin çevresine taşıyıcı ± n·Δf çizer. Aralık varsayılan 10 Hz, her yandaki adet üçtür. Δf için bilinen modülasyon frekansını kullanın; bindirme hipotez yardımcısıdır, otomatik modülasyon tanısı değildir.',
                },
            ],
        },
        {
            name: '9 · Compare',
            desc:
                'Compare basit iki-kanal akışı ile gelişmiş iki-zaman-aralığı akışını sunar. İkisi de etkin FFT reçetesini korur.',
            controls: [
                {
                    name: 'Reference A · Compare B · Compute and Compare',
                    desc:
                        'İki farklı kanal seçin ve aynı ayarlarla hesaplayın. Spektrumlar bindirilir, A/B baskın frekansları işaretlenir. Results → Compare önemli metrikler için sayısal farkları raporlar.',
                },
                {
                    name: 'Capture current range as Reference A',
                    desc:
                        'Mevcut spektrumu ve zaman aralığını dondurur. Gezgin başka çalışma durumuna taşınıp Compute yapıldığında A bindirilmiş kalırken Current B oluşur. Yakalamak yeni MPAI kanalı yazmaz.',
                },
                {
                    name: 'Clear Reference A',
                    desc:
                        'Dondurulmuş zaman-aralığı referansını ve bindirmesini kaldırır. Son hesaplanan sonucu veya kanal karşılaştırma çiftini temizlemez.',
                },
            ],
        },
        {
            name: '10 · Results — Summary, Peaks ve Compare',
            desc:
                'Results en son hesabın kanıtıdır. Tire işareti ölçülmüş sıfır değil, kullanılamaz veya üretilmemiş değer demektir.',
            controls: [
                {
                    name: 'Summary',
                    desc:
                        'Mevcutsa Peak Frequency, Peak Magnitude, Resolution Δf, Averages, THD, SINAD, SNR ve Overall RMS gösterir. Daha etkileyici metrikleri yorumlamadan önce Δf ve Averages değerini okuyun; kestirimin nasıl oluştuğunu onlar anlatır.',
                },
                {
                    name: 'Peaks',
                    desc:
                        'Kabul edilen tepeler için Frequency, Magnitude ve Phase listeler. Magnitude başlığı doğrusal, logaritmik veya dB sunumunu izler. Frekans enterpolasyonu binler arasındaki tepe kestirimini iyileştirebilir; çözülmemiş iki fiziksel tonu ayıramaz.',
                },
                {
                    name: 'Compare',
                    desc:
                        'İki kanal karşılaştırıldığında baskın frekans, tepe genliği, THD, SINAD ve SNR için Reference, Compare ve Δ(B−A) gösterir. İşaret ile iyi-kötü aynı şey değildir; örneğin yüksek SNR iyi olabilirken yüksek THD kötü olabilir.',
                },
            ],
        },
        {
            name: '11 · Compute ve durum satırı',
            desc:
                'Bir tablo veya sonuç sekmesinin veriyi sessizce yeniden hesaplamaması için ana eylem görünüm gezinmesinden bilinçli olarak ayrıdır.',
            controls: [
                {
                    name: '▶ Compute · Computing…',
                    desc:
                        'Kanal seçimini doğrular, bütün güncel ayarları toplar ve C++ analizini arka planda çalıştırır. Hesap sürerken düğme devre dışıdır. Marker görünümü ve Y ekseni önbelleği yeniden çizebilir; hesabı etkileyen parametre değişimleri yeni Compute ister.',
                },
                {
                    name: 'Tamamlanma ve kısmi-aralık mesajı',
                    desc:
                        'Kanal sayısını, baskın tepeyi, örnekleme hızını, ortalama sayısını ve analiz edilen satırı raporlar. Sabit N ile ortalama, imleç seçiminden az örnek tüketirse analiz edilen ve seçilen satırlar açıkça belirtilir. Bu uyarıyı kozmetik not değil kapsam sınırı olarak değerlendirin.',
                },
            ],
        },
    ],
}

export default FFT_CONTROL_GUIDE_TR
