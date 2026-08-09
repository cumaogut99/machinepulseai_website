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
                        'Sol panel sayfalarıdır. FFT Settings hesap parametrelerini (örnekleme, pencere, blok boyutu, ortalama), Markers tepe algılama ve harmonik/yan bant imleçlerini, Compare ise iki kanal veya zaman aralığını kıyaslama ayarlarını açar.',
                },
                {
                    name: 'Spectrum · PSD · Phase · STFT',
                    desc:
                        'Orta grafik alanında görüntülenecek sonucu seçer. Spectrum genlik spektrumunu, PSD hertz başına gücü, Phase faz açısını gösterir. STFT ise zaman-frekans haritasını açar.',
                },
                {
                    name: 'Channels · Results',
                    desc:
                        'Sağ paneli yönetir. Channels analiz edilecek kanalları işaretlemeyi sağlar. Results ise özet değerleri (RMS, THD, SNR), bulunan tepeleri (Peaks) ve karşılaştırma tablosunu (Compare) sunar.',
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
                        'MPAI dosyasından gelen salt okunur veridir. Nyquist sınırını (fs/2) ve frekans adımlarını (Δf = fs/N) doğrudan belirler. Donanımın saniyede aldığı örnek sayısını gösterir.',
                },
                {
                    name: 'Navigator — Dual region (Çift İmleç)',
                    desc:
                        'Zaman grafiğinde iki dikey imleç ile makinenin sabit hızda çalıştığı kararlı aralığı seçer. İmleç bırakıldığında yeni aralık için C++ tarafında anında yeniden hesaplama yapılır.',
                },
                {
                    name: 'Navigator — Single sliding window (Kayan Pencere)',
                    desc:
                        'Sabit genişlikteki bir zaman penceresini sinyal üzerinde gezdirerek anlık frekans değişimlerini izlemenizi sağlar.',
                },
                {
                    name: 'Channel (Gezgin Kanalı)',
                    desc:
                        'Zaman grafiğinde arka planda görüntülenecek referans kanalı seçer. İmleçlerin doğru zaman olayı üzerine yerleştirilmesine yardımcı olur.',
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
                        'Mil devir frekansları (1x, 2x), harmonikler, dişli geçişleri ve elektriksel gürültüler gibi ayrık deterministik bileşenlerin genlik (g, mm/s) ve fazını ölçmek için kullanılır.',
                },
                {
                    name: 'Mode — Welch PSD',
                    desc:
                        'Rastgele titreşim ve geniş bant gürültü enerjisini hertz başına güç (g²/Hz) olarak hesaplar. Örtüşen periodogram ortalaması alarak gürültüyü kararlılaştırır ve farklı blok boyutlu kayıtları kıyaslanabilir kılar.',
                },
                {
                    name: 'Mode — Spectrogram (STFT)',
                    desc:
                        'Zamanla değişen frekans içeriğini (devir yükselme/düşme, transient darbe) zaman-frekans renk haritası (ısı haritası) üzerinde gösterir.',
                },
                {
                    name: 'Window (Pencereleme Fonksiyonu)',
                    desc:
                        'Kesilen kaydın iki ucundaki süreksizliği incelterek spektral sızıntıyı (leakage) önler:\n' +
                        '• Hann (Varsayılan): Genel titreşim ve dönel makine analizlerinin %90\'ında ilk tercihtir. Düzgün kenar yumuşatmasıyla sızıntıyı azaltır; frekans ve genlik doğruluğu arasında ideal bir denge sağlar.\n' +
                        '• Flat-Top: ISO 10816 / 20816 standartlarına göre genlik/şiddet (RMS/Peak) okuması yapılırken kullanılır. Tepe noktası geniştir; genlik okuma hatasını %0.1\'in altına indirir fakat frekans çözünürlüğünü genişletir.\n' +
                        '• Blackman / Blackman-Harris: Birbirine çok yakın ancak güçleri çok farklı iki frekans bileşenini (örneğin güçlü mil frekansının dibindeki zayıf elektrik tonunu) ayırmak için yüksek sızıntı bastırma (>92 dB) sağlar.\n' +
                        '• Rectangular (Pencersiz): Yalnızca sinyal periyodu blok boyutunun tam katı ise (koherent) veya çekiç darbesi gibi transient (geçici) sinyallerde kullanılır. Sürekli titreşimde şiddetli sızıntı yapar.\n' +
                        '• Kaiser / Tukey / Gaussian: İnce ayar parametreleri (β, α, σ) ile sızıntı bastırma ve tepe genişliğini ihtiyaca göre özelleştiren gelişmiş mühendislik pencereleridir.',
                },
                {
                    name: 'β · σ · α pencere parametresi',
                    desc:
                        'Kaiser (β: 0.01-50, varsayılan 14), Gaussian (σ: 0.01-5, varsayılan 0.4) veya Tukey (α: 0-1, varsayılan 0.5) pencerelerinin kenar inceltme dikliğini ayarlar. Katsayı büyüdükçe sızıntı azalır ancak tepe genişler.',
                },
                {
                    name: 'Block / Lines (N Blok Boyutu)',
                    desc:
                        'Dönüşüm başına N örnek sayısını (256 - 131072, varsayılan 4096) belirler. Frekans adımı Δf = fs/N ve blok süresi T = N/fs formülüyle hesaplanır. Yüksek N değeri frekans adımlarını yakınlaştırır (örneğin fs=4096 Hz için N=4096 => Δf=1 Hz), ancak daha uzun kararlı zaman verisi gerektirir.',
                },
            ],
        },
        {
            name: '4 · FFT Settings — Frequency Band',
            desc:
                'Ekrandaki frekans eksenini yakınlaştırır; donanım seviyesinde sinyali filtrelemez.',
            controls: [
                {
                    name: 'Min',
                    desc:
                        'Görüntülenecek alt frekans sınırıdır (Hz). Varsayılan 0 Hz (DC) seviyesidir.',
                },
                {
                    name: 'Max',
                    desc:
                        'Görüntülenecek üst frekans sınırıdır (Hz). Varsayılan 0 değeri otomatik olarak Nyquist sınırını (fs/2) kullanır. Örneğin Max=500 Hz yapmak grafiği 0-500 Hz aralığına yakınlaştırır.',
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
                        'Ortalama almaz, tek bir bloğun dönüşümünü hesaplar. Ham ve anlık spektrumu incelemek için kullanılır.',
                },
                {
                    name: 'Mode — Linear (Doğrusal Ortalama)',
                    desc:
                        'Belirlenen sayıda bloğun spektrum ortalamasını alır. Rastgele gürültüyü kararlılaştırır ve dönel makine bileşenlerini öne çıkarır.',
                },
                {
                    name: 'Mode — Exponential (Üstel Ortalama)',
                    desc:
                        'Yeni gelen bloklara daha fazla ağırlık vererek değişen süreçleri dinamik olarak izlemeyi sağlar.',
                },
                {
                    name: 'Mode — Max Hold (En Yüksek Tutma)',
                    desc:
                        'Tüm bloklar boyunca her frekansta görülen maksimum genliği saklar. Aralıklı pikleri, transient geçişleri veya en kötü durum titreşim seviyesini yakalamak içindir.',
                },
                {
                    name: 'Blocks (Blok Sayısı)',
                    desc:
                        'Birleştirilecek blok adedidir (1-1000, varsayılan 10). Blok sayısı arttıkça rastgele gürültü azalır ancak daha uzun zaman kaydı gerekir.',
                },
                {
                    name: 'Overlap (Örtüşme Oranı)',
                    desc:
                        'Bloklar arasındaki örtüşme yüzdesidir (%0, %25, %50, %75; varsayılan %50). %50 örtüşme veri kapsama verimini artırır ve pencereleme nedeniyle oluşan kenar kayıplarını telafi eder.',
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
                        'Doğrusal (Linear: g, mm/s), Logaritmik veya dB (Desibel) ölçekleri arasında geçiş yapar. Zayıf harmonikleri ve gürültü tabanını görmek için dB tercih edilir.',
                },
                {
                    name: 'Weighting (Akustik Ağırlıklandırma)',
                    desc:
                        'dB modunda A, B veya C akustik frekans ağırlıklandırması uygular. Genel makine titreşim analizlerinde düz (Z / None) seçilmelidir.',
                },
                {
                    name: 'Integration (Entegrasyon)',
                    desc:
                        'Frekans bölgesinde ivme sinyalini Hıza (mm/s) veya Yer Değiştirmeye (µm) çevirir. DC gürültüsünü önlemek için 0 Hz frekansı sıfırlanır.',
                },
                {
                    name: 'Octave overlay (Oktav Bantları)',
                    desc:
                        '1/1, 1/3, 1/12 veya 1/24 oktav bant güçlerini dar bant spektrum üzerine bindirerek akustik veya genel titreşim enerjisini özetler.',
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
                        'Listelenecek maksimum tepe sayısını ve dB eşiğini belirler. Algılanan tepelere parabolik interpolasyon uygulanarak gerçek tepe frekansı bin adımları arasından hassas hesaplanır.',
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
                        'Temel frekansı elle girmeyi ve çizilecek harmonik adedini belirlemeyi sağlar.',
                },
                {
                    name: 'Show sideband family · Sideband Δf',
                    desc:
                        'Baskın tepe çevresine simetrik yan bant çizgileri (Taşıyıcı ± n·Δf) çizer. Dişli modülasyonlarını veya rulman arıza frekanslarını izlemek için kullanılır.',
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
                        'Reference A ve Compare B olarak iki kanalı seçip tek reçeteyle hesaplayarak üst üste bindirir.',
                },
                {
                    name: 'Capture current range as Reference A',
                    desc:
                        'Mevcut spektrumu dondurarak Reference A olarak saklar. Zaman imlecini başka bir zaman dilimine taşıdığınızda Current B spektrumu hesaplanır ve iki durum tek grafikte kıyaslanır.',
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
