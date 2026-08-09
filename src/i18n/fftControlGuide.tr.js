const FFT_CONTROL_GUIDE_TR = {
    groups: [
        {
            name: '1 · Gezinme ve Sayfa Kontrolleri',
            desc:
                'MachinePulseAI arayüzü 3 ana gezinme ekseni sunar: Sol butonlar parametre sayfalarını açar, orta butonlar grafik görünümünü değiştirir, sağ butonlar ise kanalları ve sonuç tablolarını yönetir.',
            controls: [
                {
                    name: 'FFT Settings · Markers · Compare',
                    desc:
                        'Sol panel ayar sayfalarıdır:\n' +
                        '• FFT Settings: Örnekleme hızı, kestirici (FFT/PSD/STFT), pencere tipi, blok boyutu (N) ve ortalama modunu yapılandırır.\n' +
                        '• Markers: Tepe dB eşiği, harmonik ailesi (f₀, 2f₀, 3f₀...) ve yan bant imleçlerini yönetir.\n' +
                        '• Compare: İki farklı kanal veya zaman aralığını dondurup kıyaslamayı sağlar.',
                },
                {
                    name: 'Spectrum · PSD · Phase · STFT',
                    desc:
                        'Orta grafik alanında gösterilecek sonucu seçer:\n' +
                        '• Spectrum: Genlik spektrumunu gösterir (g, mm/s veya dB).\n' +
                        '• PSD: Hertz başına güç yoğunluğunu gösterir (g²/Hz).\n' +
                        '• Phase: Frekans adımları arasındaki faz açısını gösterir (derece).\n' +
                        '• STFT: Zaman-frekans renk haritasını (spektrogram) açar.',
                },
                {
                    name: 'Channels · Results',
                    desc:
                        'Sağ sütun panellerini açar ve kapatır:\n' +
                        '• Channels: Analiz edilecek sensör kanallarını seçer.\n' +
                        '• Results: Son analize ait Özet (Summary), Tepeler Tablosu (Peaks) ve Karşılaştırma Tablosunu (Compare) sunar.',
                },
            ],
        },
        {
            name: '2 · FFT Settings — Input ve Zaman Gezgini',
            desc:
                'Analiz edilecek zaman sinyalini ve dondurulacak kararlı zaman aralığını belirler.',
            controls: [
                {
                    name: 'Sample Rate (Örnekleme Hızı - fs)',
                    desc:
                        'MPAI dosyasından okunan salt okunur donanım meta verisidir:\n' +
                        '• Örnekleme Hızı (fs): Donanımın saniyede aldığı örnek sayısıdır (Hz).\n' +
                        '• Nyquist Sınırı (fs/2): Ölçülebilecek maksimum frekansı belirler.\n' +
                        '• Bin Adımı (Δf = fs/N): Frekans çözünürlüğünün tabanını oluşturur.\n' +
                        '• Salt Okunur: Donanım hızını temsil eder; yeniden örnekleme yapmaz.',
                },
                {
                    name: 'Navigator — Dual region (Çift İmleç)',
                    desc:
                        'Zaman gezgininde kararlı çalışma aralığını sınırlar:\n' +
                        '• Kararlı Aralık Seçimi: İki dikey imleç ile makinenin sabit hızda çalıştığı durağan zaman dilimini dondurur.\n' +
                        '• Otomatik Yeniden Hesaplama: İmleç bırakıldığında C++ motoru yeni zaman dilimi için spektrumu anında hesaplar.',
                },
                {
                    name: 'Navigator — Single sliding window (Kayan Pencere)',
                    desc:
                        'Dinamik zaman tarama modudur:\n' +
                        '• Dinamik Tarama: Sabit N boyutundaki zaman penceresini sinyal üzerinde gezdirerek anlık frekans değişimlerini izlemeyi sağlar.',
                },
                {
                    name: 'Channel (Gezgin Kanalı)',
                    desc:
                        'Zaman izi referansıdır:\n' +
                        '• İz Seçimi: Zaman grafiğinde arka planda gösterilecek kanalı seçerek imleçlerin doğru zaman olayı üzerine yerleştirilmesini kolaylaştırır.',
                },
            ],
        },
        {
            name: '3 · FFT Settings — Spectrum (Kestirici ve Pencere)',
            desc:
                'Analiz modunu, pencere tipini ve frekans çözünürlüğünü (blok boyutu) belirleyen temel matematiksel parametrelerdir.',
            controls: [
                {
                    name: 'Mode — FFT (amplitude)',
                    desc:
                        'Genlik spektrumu modudur:\n' +
                        '• Kullanım Alanı: Mil devir frekansları (1x, 2x), harmonikler, dişli kavrama ve elektrik tonları gibi ayrık deterministik bileşenler.\n' +
                        '• Çıktılar: Genlik (g, mm/s), faz açısı ve bulunan tepeler tablosu.',
                },
                {
                    name: 'Mode — Welch PSD',
                    desc:
                        'Güç spektral yoğunluğu modudur:\n' +
                        '• Kullanım Alanı: Rastgele titreşim, akışkan gürültüsü ve geniş bant enerji dağılımı.\n' +
                        '• Birim: g²/Hz veya (mm/s)²/Hz. Örtüşen blok ortalaması alarak farklı N boyutlu kayıtları kıyaslanabilir kılar.',
                },
                {
                    name: 'Mode — Spectrogram (STFT)',
                    desc:
                        'Zaman-frekans analizi modudur:\n' +
                        '• Kullanım Alanı: Devir yükselme (run-up), devir düşme (coast-down), transient darbeler veya zamanla değişen frekanslar.\n' +
                        '• Görsel: Zaman-frekans renkli ısı haritası.',
                },
                {
                    name: 'Window (Pencereleme Fonksiyonu)',
                    desc:
                        'Kesilen kaydın iki ucundaki süreksizliği yumuşatarak spektral sızıntıyı (leakage) önler:\n\n' +
                        '• Hann (Varsayılan):\n' +
                        'Genel titreşim ve dönel makine analizlerinin %90\'ında ilk tercihtir. Düzgün kenar inceltmesiyle sızıntıyı azaltır; frekans çözünürlüğü ve genlik doğruluğu arasında ideal bir denge sağlar.\n\n' +
                        '• Flat-Top:\n' +
                        'ISO 10816 / 20816 standartlarına göre genlik/şiddet (RMS/Peak) okuması yapılırken kullanılır. Genlik okuma hatasını %0.1\'in altına indirir fakat tepe genişliğini artırır.\n\n' +
                        '• Blackman-Harris / Blackman:\n' +
                        'Güçlü bir frekans bileşeninin hemen dibindeki zayıf bir frekansı ayırmak için yüksek sızıntı bastırma (>92 dB) sağlar.\n\n' +
                        '• Rectangular (Pencersiz):\n' +
                        'Yalnızca sinyal periyodu blok boyutunun tam katı ise (koherent) veya çekiç darbe testlerinde (transient) kullanılır. Sürekli titreşimde şiddetli sızıntı yapar.\n\n' +
                        '• Kaiser / Tukey / Gaussian:\n' +
                        'İnce ayar katsayıları (β, α, σ) ile sızıntı bastırma ve tepe genişliği takasını özelleştiren gelişmiş mühendislik pencereleridir.',
                },
                {
                    name: 'β · σ · α pencere parametresi',
                    desc:
                        'Özel pencere ayar katsayılarıdır:\n' +
                        '• Kaiser (β: 0.01-50, Varsayılan 14): Yan lob bastırma dikliğini ayarlar.\n' +
                        '• Gaussian (σ: 0.01-5, Varsayılan 0.4): Çan eğrisi genişliğini düzenler.\n' +
                        '• Tukey (α: 0-1, Varsayılan 0.5): Taper dikliğini ayarlar (α=0 Rectangular, α=1 Hann).',
                },
                {
                    name: 'Block / Lines (N Blok Boyutu)',
                    desc:
                        'Dönüşüm başına N örnek sayısıdır (256 - 131072, varsayılan 4096):\n' +
                        '• Frekans Adımı (Δf = fs / N): N büyüdükçe frekans çizgileri yakınlaşır.\n' +
                        '• Blok Süresi (T = N / fs): Örneğin N=4096, fs=4096 Hz iken Δf = 1 Hz ve T = 1 saniyedir.\n' +
                        '• Seçim Kriteri: Yüksek N daha ince frekans ayrımı sağlar ancak daha uzun kararlı zaman verisi gerektirir.',
                },
            ],
        },
        {
            name: '4 · FFT Settings — Frequency Band',
            desc:
                'Ekrandaki frekans eksenini yakınlaştırır; donanım seviyesinde sinyali filtrelemez.',
            controls: [
                {
                    name: 'Min (Alt Frekans Sınırı)',
                    desc:
                        'Grafikte gösterilecek alt frekans sınırıdır (Hz). Varsayılan 0 Hz (DC). Ekranda yakınlaştırma sağlar; veriden frekans silmez.',
                },
                {
                    name: 'Max (Üst Frekans Sınırı)',
                    desc:
                        'Grafikte gösterilecek üst frekans sınırıdır (Hz). Varsayılan 0 değeri otomatik olarak Nyquist (fs/2) sınırını alır. Max=500 Hz yapmak görünümü 0-500 Hz aralığına yakınlaştırır.',
                },
            ],
        },
        {
            name: '5 · FFT Settings — Block Processing (Ortalama Alma)',
            desc:
                'Tekrarlı zaman bloklarının spektrumlarının nasıl birleştirileceğini belirler.',
            controls: [
                {
                    name: 'Mode — None (Tek Blok)',
                    desc:
                        'Ortalama almaz, anlık tek bir bloğu dönüştürür. Ham sinyal değişkenliğini görmek için kullanılır.',
                },
                {
                    name: 'Mode — Linear (Doğrusal Ortalama)',
                    desc:
                        'Eşit ağırlıklı blok ortalaması alır. Rastgele gürültüyü kararlılaştırır ve sabit dönel makine tonlarını belirginleştirir.',
                },
                {
                    name: 'Mode — Exponential (Üstel Ortalama)',
                    desc:
                        'Yeni gelen bloklara daha yüksek ağırlık vererek yavaş değişen süreçleri dinamik izlemeyi sağlar.',
                },
                {
                    name: 'Mode — Max Hold (En Yüksek Tutma)',
                    desc:
                        'Tüm bloklar boyunca her frekanstaki maksimum genliği tutar. Transient pikleri veya en kötü durum titreşim seviyesini yakalamak içindir.',
                },
                {
                    name: 'Blocks (Blok Sayısı)',
                    desc:
                        'Birleştirilecek blok adedidir (1-1000, varsayılan 10). Blok sayısı arttıkça rastgele gürültü azalır.',
                },
                {
                    name: 'Overlap (Örtüşme Oranı)',
                    desc:
                        'Bloklar arası örtüşme yüzdesidir (%0, %25, %50, %75; varsayılan %50). %50 örtüşme veri kapsama verimini artırır ve pencereleme kenar kayıplarını telafi eder.',
                },
                {
                    name: 'Exp. α',
                    desc:
                        'Exponential ortalamanın yumuşatma katsayısıdır (0.01 - 1.0).',
                },
            ],
        },
        {
            name: '6 · FFT Settings — Post-processing (Son İşlem ve Görünüm)',
            desc:
                'Hesaplanan spektrumun görsel sunumunu ve birim dönüşümlerini yönetir.',
            controls: [
                {
                    name: 'Y Axis (Dikey Ekseni)',
                    desc:
                        'Eksen ölçeklendirme modları:\n' +
                        '• Linear: Doğrusal genlik (g, mm/s).\n' +
                        '• Logarithmic: Logaritmik ölçekli dikey eksen.\n' +
                        '• dB (Desibel): Göreli desibel ölçeği; zayıf harmonikleri ve gürültü tabanını ortaya çıkarır.',
                },
                {
                    name: 'Weighting (Akustik Ağırlıklandırma)',
                    desc:
                        'A / B / C Ağırlıkları:\n' +
                        'dB modunda insan kulağı işitme eğrilerine göre ağırlıklandırma uygular. Genel makine titreşim analizinde Z (Düz / None) seçilmelidir.',
                },
                {
                    name: 'Integration (Entegrasyon)',
                    desc:
                        'Birim dönüşüm modları:\n' +
                        '• Single (Tek Entegrasyon): Frekans bölgesinde ivmeyi Hıza (mm/s) çevirir.\n' +
                        '• Double (Çift Entegrasyon): İvmeyi Yer Değiştirmeye (µm) çevirir. 0 Hz DC gürültüsünü önlemek için sıfırlanır.',
                },
                {
                    name: 'Octave overlay (Oktav Bantları)',
                    desc:
                        'Oktav güç dağılımı:\n' +
                        '1/1, 1/3, 1/12 veya 1/24 oktav bant güçlerini dar bant spektrum üzerine bindirerek genel enerjiyi özetler.',
                },
            ],
        },
        {
            name: '7 · Channels (Çoklu Kanal Seçimi)',
            desc:
                'Aynı FFT ayarlarıyla birden fazla sensör kanalını tek tıkla hesaplayıp kıyaslamayı sağlar.',
            controls: [
                {
                    name: 'Signal checklist (Kanal Listesi)',
                    desc:
                        'Hesaba dahil edilecek kanalları işaretleyin. İşaretlenen tüm kanallar aynı FFT reçetesiyle hesaplanır ve grafik üzerinde farklı renklerle üst üste çizilir.',
                },
                {
                    name: 'All · Clear',
                    desc:
                        'Tüm kanalları seçer veya seçimi temizler.',
                },
            ],
        },
        {
            name: '8 · Markers (İşaretçiler ve Tepeler)',
            desc:
                'Spektrumdaki tepeleri tespit eden ve harmonik/yan bant imleçleri çizen tanısal araçlardır.',
            controls: [
                {
                    name: 'Max Peaks · Min Magnitude',
                    desc:
                        'Tepe eşikleri:\n' +
                        'Listelenecek maksimum tepe sayısını ve dB eşiğini belirler. Parabolik 3-bin interpolasyon ile gerçek tepe frekansı hassas hesaplanır.',
                },
                {
                    name: 'Show detected peaks on spectrum',
                    desc:
                        'Algılanan tepelerin üzerine dikey frekans etiketleri koyar.',
                },
                {
                    name: 'Show harmonic family · Fundamental (f0)',
                    desc:
                        'Mil devrine (f0 = RPM/60) göre harmonik çizgilerini (f0, 2f0, 3f0...) spektrum üzerinde gösterir.',
                },
                {
                    name: 'Manual f0 · Harmonics',
                    desc:
                        'Temel frekansı elle girmeyi ve çizilecek harmonik sayısını belirlemeyi sağlar.',
                },
                {
                    name: 'Show sideband family · Sideband Δf',
                    desc:
                        'Baskın tepe çevresine simetrik yan bant çizgileri (Taşıyıcı ± n·Δf) çizer; dişli veya rulman modülasyonlarını izler.',
                },
            ],
        },
        {
            name: '9 · Compare (Karşılaştırma)',
            desc:
                'İki kanalı veya iki farklı zaman aralığını (yüksüz vs. yüklü durum) dondurarak kıyaslamayı sağlar.',
            controls: [
                {
                    name: 'Reference A · Compare B · Compute and Compare',
                    desc:
                        'Reference A ve Compare B olarak iki farklı sensör kanalını tek reçeteyle hesaplayarak üst üste bindirir.',
                },
                {
                    name: 'Capture current range as Reference A',
                    desc:
                        'Mevcut spektrumu dondurarak Reference A olarak saklar. Zaman imlecini başka bir zaman dilimine taşıdığınızda Current B spektrumu hesaplanır ve iki durum kıyaslanır.',
                },
                {
                    name: 'Clear Reference A',
                    desc:
                        'Dondurulmuş referans spektrumunu kaldırır.',
                },
            ],
        },
        {
            name: '10 · Results — Summary, Peaks ve Compare',
            desc:
                'Son hesaplama sonucunda üretilen sayısal veriler ve tablolar.',
            controls: [
                {
                    name: 'Summary (Özet)',
                    desc:
                        'Baskın frekans, tepe genliği, Δf çözünürlüğü, THD, SINAD, SNR ve Genel RMS değerlerini raporlar.',
                },
                {
                    name: 'Peaks (Tepeler Tablosu)',
                    desc:
                        'Kabul edilen tüm tepelerin iyileştirilmiş frekans, genlik ve faz değerlerini listeler.',
                },
                {
                    name: 'Compare (Fark Tablosu)',
                    desc:
                        'Reference A ve Compare B durumları arasındaki sayısal farkı (Δ = B - A) raporlar.',
                },
            ],
        },
        {
            name: '11 · Compute ve Durum Satırı',
            desc:
                'C++ analiz motorunu çalıştıran ve durum bilgisini sunan alt panel.',
            controls: [
                {
                    name: '▶ Compute · Computing…',
                    desc:
                        'Seçili zaman aralığını ve tüm FFT ayarlarını arka plandaki C++ motoruna göndererek hesabı başlatır.',
                },
                {
                    name: 'Tamamlanma ve durum mesajı',
                    desc:
                        'Analizin tamamlanma süresini, kullanılan örnek sayısını, frekans çözünürlüğünü (Δf) ve baskın tepeyi raporlar.',
                },
            ],
        },
    ],
}

export default FFT_CONTROL_GUIDE_TR
