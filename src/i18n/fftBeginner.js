const FFT_BEGINNER_TRANSLATIONS = {
    en: {
        badge: 'Start here · No prior FFT knowledge required',
        title: 'What problem is the FFT actually solving?',
        intro:
            'A vibration sensor produces one changing number after another. The time trace tells you when the signal moved, but several repeating motions can be mixed into one complicated shape. The FFT reorganizes the same measured samples by repetition rate so those hidden motions can be inspected separately.',
        analogyTitle: 'Think of it as changing the index, not changing the measurement',
        analogy:
            'A time plot files evidence by “when did it happen?” A spectrum files the same evidence by “how many cycles per second does it contain?” No new vibration is created. You are viewing the same finite sample block through a different coordinate system.',
        journeyTitle: 'From physical motion to one point on the spectrum',
        journey: [
            {
                title: 'The machine moves',
                body:
                    'A rotating shaft, gear tooth, fan blade or electrical force produces motion. Several sources can act at the same time, and the structure can amplify some frequencies more than others.',
                example:
                    'Example: a 30 Hz shaft produces one mechanical cycle every 1/30 second.',
            },
            {
                title: 'The sensor records samples',
                body:
                    'The sensor converts motion into a calibrated signal. The acquisition system stores its value at uniform time intervals. Sample rate fs tells how many values are recorded each second.',
                example:
                    'At fs = 4096 Hz, the recorder stores 4096 values during one second.',
            },
            {
                title: 'You select a finite block',
                body:
                    'The FFT cannot analyse an abstract infinite signal; it receives N measured samples. The selected block should represent one operating state. Block duration is N/fs seconds.',
                example:
                    'N = 4096 at fs = 4096 Hz means one second of evidence.',
            },
            {
                title: 'The block is tested against frequencies',
                body:
                    'The DFT asks how strongly the block matches a set of sinusoidal basis waves. MachinePulseAI computes this efficiently with an FFT algorithm and retains magnitude and phase for every frequency bin.',
                example:
                    'With Δf = fs/N = 1 Hz, the tested frequencies are 0, 1, 2, 3… Hz.',
            },
            {
                title: 'The spectrum becomes an engineering clue',
                body:
                    'Large magnitude near one bin means the selected block contains a strong component around that frequency. It does not name the source automatically; the engineer relates it to RPM, geometry, electrical frequency, forcing and test conditions.',
                example:
                    'A 30 Hz peak may be 1× shaft speed—but only if the measured shaft is actually near 1800 RPM.',
            },
        ],
        exampleTitle: 'One complete example before the formulas become abstract',
        exampleIntro:
            'Suppose a calibrated accelerometer is sampled at 4096 Hz. You select 4096 samples from a steady operating state and use an amplitude FFT.',
        exampleCards: [
            {
                value: 'fs = 4096 Hz',
                label: 'What can be represented?',
                body:
                    'Nyquist is 2048 Hz. Frequencies above that must be removed by the acquisition anti-alias filter or they can fold into the visible band.',
            },
            {
                value: 'N = 4096',
                label: 'How long is the evidence?',
                body:
                    'The block lasts N/fs = 1 second. The machine should remain sufficiently steady during this second for a single spectrum to describe it.',
            },
            {
                value: 'Δf = 1 Hz',
                label: 'Which frequency grid is tested?',
                body:
                    'The bin centers are 0, 1, 2… 2048 Hz. Window shape still affects how a tone spreads across neighboring bins.',
            },
            {
                value: 'Peak ≈ 30 Hz',
                label: 'What can you conclude?',
                body:
                    'The block contains strong periodic content near 30 Hz. To call it 1× rotation, verify tachometer speed, units, operating state and possible alternative sources.',
            },
        ],
        vocabularyTitle: 'Six words to understand before changing a setting',
        vocabulary: [
            {
                term: 'Time domain',
                body:
                    'Signal value versus time. Best for seeing impacts, clipping, drift, changing states and deciding which interval should be analysed.',
            },
            {
                term: 'Frequency domain',
                body:
                    'Signal content versus cycles per second. Best for separating simultaneous periodic components that overlap in the time trace.',
            },
            {
                term: 'Frequency bin',
                body:
                    'One tested frequency location in a finite DFT grid. A bin is not a physical component by itself; real tones can spread into several bins.',
            },
            {
                term: 'Magnitude',
                body:
                    'How much of a frequency component is present under the chosen scaling and window correction. Always read its units and presentation.',
            },
            {
                term: 'Phase',
                body:
                    'Where that sinusoidal component sits in its cycle relative to the block’s time reference. It preserves timing information that magnitude alone discards.',
            },
            {
                term: 'Peak',
                body:
                    'A local maximum in the displayed spectrum. It is a candidate feature to explain, not an automatic resonance, order or fault.',
            },
        ],
        ruleTitle: 'The beginner’s three-question safety check',
        rules: [
            'Which exact samples and operating state does this spectrum describe?',
            'Which setting created its frequency grid, leakage behavior and averaging?',
            'Which physical source could create each feature—and what independent evidence supports that link?',
        ],
    },
    tr: {
        badge: 'Önceden FFT bilgisi gerekmez · Adım Adım Başlangıç',
        title: 'FFT Gerçekte Hangi Problemi Çözüyor?',
        intro:
            'Titreşim sensörü art arda değişen genlik değerleri üretir. Zaman grafiği sinyalin ne zaman hareket ettiğini gösterir; fakat birden fazla tekrarlı hareket tek bir karmaşık dalga içinde üst üste biner. FFT (Hızlı Fourier Dönüşümü), aynı ölçülmüş örnekleri saniyedeki tekrar sayılarına (frekanslarına) göre ayırır ve gizli kalmış her hareketin bağımsız olarak incelenmesini sağlar.',
        analogyTitle: 'Ölçümü değiştirmek değil, veriye farklı bir pencereden bakmak',
        analogy:
            'Zaman grafiği veriyi “Ne zaman oldu?” sorusuna göre sıralar. Spektrum ise aynı veriyi “Saniyede kaç çevrim (Hz) içeriyor?” sorusuna göre düzenler. Yeni bir titreşim oluşturulmaz; aynı 1 saniyelik kayıt zaman ekseni yerine frekans ekseninde gösterilir.',
        journeyTitle: 'Fiziksel hareketten spektrumdaki frekans çizgisine',
        journey: [
            {
                title: '1. Makine hareket eder',
                body:
                    'Dönen mil, dişli dişi, fan kanadı veya elektriksel kuvvet mekanik titreşim üretir. Birden fazla kaynak aynı anda çalışabilir ve makine gövdesi bazı frekansları diğerlerine göre daha fazla büyütebilir.',
                example:
                    'Örnek: 1800 RPM ile dönen bir mil, saniyede 30 çevrim yapar (30 Hz).',
            },
            {
                title: '2. Sensör örnekleri kaydeder',
                body:
                    'Sensör mekanik hareketi voltaj sinyaline dönüştürür. Veri toplama kartı bu değeri eşit zaman aralıklarında sayısallaştırır. Örnekleme hızı (fs), saniyede kaç örnek alındığını söyler.',
                example:
                    'fs = 4096 Hz iken cihaz 1 saniyede 4096 adet sayısal değer kaydeder.',
            },
            {
                title: '3. Zaman aralığını (bloğu) seçersiniz',
                body:
                    'FFT sonsuz bir kaydı değil, seçtiğiniz N adet örneği analiz eder. Seçilen zaman aralığı makinenin sabit bir çalışma durumunu (sabit devir/yük) temsil etmelidir.',
                example:
                    'fs = 4096 Hz ve N = 4096 örnek seçildiğinde, 1 saniyelik veri analiz edilir.',
            },
            {
                title: '4. Sinyal frekans bileşenlerine ayrılır',
                body:
                    'FFT algoritması, seçilen bloğun hangi sinüs dalgalarının bileşiminden oluştuğunu hesaplar. Her frekans adımı (bin) için genlik (şiddet) ve faz (zamanlama) değerlerini verir.',
                example:
                    'Δf = fs/N = 1 Hz çözünürlükte sınanan frekanslar 0, 1, 2, 3… Hz adımlarıdır.',
            },
            {
                title: '5. Spektrum mühendislik ipucuna dönüşür',
                body:
                    'Spektrumda belirli bir frekanstaki tepe (yükseklik), o frekansta güçlü bir titreşim olduğunu gösterir. Ancak arızanın adını otomatik koymaz; mühendis bu tepeyi dönel hız, dişli sayısı veya şebeke frekansı ile eşleştirir.',
                example:
                    '30 Hz\'deki tepe, 1800 RPM (30 Hz) dönen milin balanssızlığı olabilir.',
            },
        ],
        exampleTitle: 'Sayısal Bir Örnek Üzerinden İnceleme',
        exampleIntro:
            'Kalibre edilmiş bir ivmeölçerden 4096 Hz örnekleme hızıyla kayıt alındığını ve kararlı çalışma durumundan 4096 örnek seçildiğini varsayalım:',
        exampleCards: [
            {
                value: 'fs = 4096 Hz',
                label: 'Ölçülebilen Maksimum Frekans',
                body:
                    'Nyquist sınırı fs/2 = 2048 Hz\'dir. 2048 Hz üzerindeki titreşimler donanımdaki anti-alias filtresiyle süzülmelidir.',
            },
            {
                value: 'N = 4096 Örnek',
                label: 'Analiz Edilen Süre',
                body:
                    'Blok süresi N/fs = 1 saniyedir. Bu 1 saniye boyunca makinenin devri ve yükü sabit kalmalıdır.',
            },
            {
                value: 'Δf = 1 Hz',
                label: 'Frekans Adımı (Çözünürlük)',
                body:
                    'Frekans ekseni 0, 1, 2, 3… 2048 Hz adımlarıyla çizilir. İki yakın tepeyi ayırma gücü 1 Hz\'dir.',
            },
            {
                value: 'Tepe ≈ 30 Hz',
                label: 'Mühendislik Yorumu',
                body:
                    'Sinyalde saniyede 30 çevrim yapan güçlü bir bileşen vardır. Mil devri 1800 RPM ise bu 1× dönüş titreşimidir.',
            },
        ],
        exampleNoteTitle: 'Veri Kaybı Olmaz (Ters FFT)',
        exampleNoteBody:
            'FFT veride bilgi kaybettirmez. Spektrumdaki genlik ve faz değerleri korunduğu sürece, Ters FFT (Inverse FFT) işlemi yapılarak orijinal 1 saniyelik zaman sinyali birebir geri elde edilebilir.',
        vocabularyTitle: 'Ayarları Değiştirmeden Önce Bilinmesi Gereken 6 Temel Kavram',
        vocabulary: [
            {
                term: 'Zaman Bölgesi (Time Domain)',
                body:
                    'Sinyal değerinin zamana göre görünümüdür. Darbe, clipping (doyum), ani sıçrama ve analiz edilecek aralığı seçmek için kullanılır.',
            },
            {
                term: 'Frekans Bölgesi (Frequency Domain)',
                body:
                    'Sinyal içeriğinin saniyedeki çevrim sayısına (Hz) göre görünümüdür. Zaman grafiğinde karmaşık görünen tekrarlı hareketleri ayırır.',
            },
            {
                term: 'Frekans Bini (Frequency Bin)',
                body:
                    'FFT eksenindeki her bir frekans adımıdır (örneğin 10 Hz, 11 Hz). Gerçek bir titreşim tek bir bine düşebileceği gibi komşu binlere de yayılabilir.',
            },
            {
                term: 'Genlik (Magnitude)',
                body:
                    'Bir frekans bileşeninin ne kadar güçlü olduğunu gösterir. Birimine (g, mm/s, dB) mutlaka dikkat edilmelidir.',
            },
            {
                term: 'Faz (Phase)',
                body:
                    'Sinüs dalgasının zaman referansına göre çevriminin neresinde olduğunu (açısını) gösterir. Zamanlama bilgisini korur.',
            },
            {
                term: 'Tepe (Peak)',
                body:
                    'Spektrumdaki yerel yüksek noktadır. İncelenmesi gereken bir titreşim bileşenidir; doğrudan arıza anlamına gelmez.',
            },
        ],
        ruleTitle: 'Analiz Öncesi 3 Soruluk Kontrol Listesi',
        rules: [
            'Bu spektrum tam olarak hangi zaman aralığını ve çalışma durumunu anlatıyor?',
            'Frekans adımı (Δf), pencere tipi ve ortalama sayısı ne olarak seçildi?',
            'Spektrumda görülen tepeler hangi mekanik/elektriksel kaynakla (devir, dişli, rulman, şebeke) eşleşiyor?',
        ],
    },
}

export default FFT_BEGINNER_TRANSLATIONS
