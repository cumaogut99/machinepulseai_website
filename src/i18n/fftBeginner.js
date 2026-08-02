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
        badge: 'Buradan başlayın · Önceden FFT bilgisi gerekmez',
        title: 'FFT gerçekte hangi problemi çözüyor?',
        intro:
            'Titreşim sensörü art arda değişen sayılar üretir. Zaman izi sinyalin ne zaman hareket ettiğini gösterir; fakat birden fazla tekrarlı hareket tek karmaşık şeklin içinde karışabilir. FFT, aynı ölçülmüş örnekleri tekrar hızına göre yeniden düzenler ve gizli hareketlerin ayrı ayrı incelenmesini sağlar.',
        analogyTitle: 'Ölçümü değiştirmek değil, dizini değiştirmek gibi düşünün',
        analogy:
            'Zaman grafiği kanıtı “ne zaman oldu?” sorusuna göre dosyalar. Spektrum aynı kanıtı “saniyede kaç çevrim içeriyor?” sorusuna göre dosyalar. Yeni titreşim oluşturulmaz; aynı sonlu örnek bloğunu farklı koordinat sisteminden görürsünüz.',
        journeyTitle: 'Fiziksel hareketten spektrumdaki tek noktaya',
        journey: [
            {
                title: 'Makine hareket eder',
                body:
                    'Dönen mil, dişli dişi, fan kanadı veya elektriksel kuvvet hareket üretir. Birden fazla kaynak aynı anda etkili olabilir; yapı bazı frekansları diğerlerinden daha fazla büyütebilir.',
                example:
                    'Örnek: 30 Hz mil, her 1/30 saniyede bir mekanik çevrim tamamlar.',
            },
            {
                title: 'Sensör örnekleri kaydeder',
                body:
                    'Sensör hareketi kalibre sinyale dönüştürür. Veri toplama sistemi değeri eşit zaman aralıklarında saklar. Örnekleme hızı fs, saniyede kaç değer kaydedildiğini söyler.',
                example:
                    'fs = 4096 Hz iken kaydedici bir saniyede 4096 değer saklar.',
            },
            {
                title: 'Sonlu bir blok seçersiniz',
                body:
                    'FFT soyut sonsuz sinyali değil, ölçülmüş N örneği alır. Seçilen blok tek çalışma durumunu temsil etmelidir. Blok süresi N/fs saniyedir.',
                example:
                    'fs = 4096 Hz ve N = 4096, bir saniyelik kanıt demektir.',
            },
            {
                title: 'Blok frekanslara karşı sınanır',
                body:
                    'DFT, bloğun sinüzoidal temel dalgalar kümesine ne kadar benzediğini sorar. MachinePulseAI bunu FFT algoritmasıyla verimli hesaplar ve her frekans bini için genlik ile fazı korur.',
                example:
                    'Δf = fs/N = 1 Hz ise sınanan frekanslar 0, 1, 2, 3… Hz olur.',
            },
            {
                title: 'Spektrum mühendislik ipucuna dönüşür',
                body:
                    'Bir binin yakınındaki büyük genlik, seçilen blokta o frekans çevresinde güçlü bileşen olduğunu söyler. Kaynağın adını otomatik vermez; mühendis sonucu RPM, geometri, elektrik frekansı, uyarım ve test koşullarıyla ilişkilendirir.',
                example:
                    '30 Hz tepe 1× mil hızı olabilir; fakat yalnız ölçülen mil gerçekten yaklaşık 1800 RPM ise.',
            },
        ],
        exampleTitle: 'Formüller soyutlaşmadan önce eksiksiz bir örnek',
        exampleIntro:
            'Kalibre ivmeölçerin 4096 Hz ile örneklendiğini düşünün. Kararlı çalışma durumundan 4096 örnek seçip genlik FFT’si kullanıyorsunuz.',
        exampleCards: [
            {
                value: 'fs = 4096 Hz',
                label: 'Ne temsil edilebilir?',
                body:
                    'Nyquist 2048 Hz’dir. Bunun üzerindeki frekanslar veri toplama anti-alias filtresiyle kaldırılmazsa görünür bandın içine katlanabilir.',
            },
            {
                value: 'N = 4096',
                label: 'Kanıt ne kadar sürüyor?',
                body:
                    'Blok N/fs = 1 saniye sürer. Tek spektrumun bu saniyeyi anlatabilmesi için makine bu sürede yeterince kararlı kalmalıdır.',
            },
            {
                value: 'Δf = 1 Hz',
                label: 'Hangi frekans ızgarası sınanıyor?',
                body:
                    'Bin merkezleri 0, 1, 2… 2048 Hz’dir. Pencere şekli bir tonun komşu binlere nasıl yayılacağını yine etkiler.',
            },
            {
                value: 'Tepe ≈ 30 Hz',
                label: 'Hangi sonuca varabilirsiniz?',
                body:
                    'Blok 30 Hz yakınında güçlü periyodik içerik taşır. Buna 1× dönüş demeden önce takometre hızını, birimleri, çalışma durumunu ve alternatif kaynakları doğrulayın.',
            },
        ],
        vocabularyTitle: 'Bir ayarı değiştirmeden önce anlayacağınız altı kelime',
        vocabulary: [
            {
                term: 'Zaman bölgesi',
                body:
                    'Sinyal değerinin zamana göre görünümüdür. Darbe, doyum, sürüklenme, durum değişimi ve analiz edilecek aralığı görmek için uygundur.',
            },
            {
                term: 'Frekans bölgesi',
                body:
                    'Sinyal içeriğinin saniyedeki çevrime göre görünümüdür. Zaman izinde üst üste binen eşzamanlı periyodik bileşenleri ayırmak için uygundur.',
            },
            {
                term: 'Frekans bini',
                body:
                    'Sonlu DFT ızgarasında sınanan tek frekans konumudur. Bin kendi başına fiziksel bileşen değildir; gerçek ton birkaç bine yayılabilir.',
            },
            {
                term: 'Genlik',
                body:
                    'Seçilen ölçekleme ve pencere düzeltmesi altında frekans bileşeninin ne kadar bulunduğunu gösterir. Birimini ve sunumunu mutlaka okuyun.',
            },
            {
                term: 'Faz',
                body:
                    'Sinüzoidal bileşenin blok zaman referansına göre çevrimin neresinde olduğunu gösterir. Yalnız genliğin attığı zamanlama bilgisini korur.',
            },
            {
                term: 'Tepe',
                body:
                    'Gösterilen spektrumdaki yerel maksimumdur. Açıklanması gereken aday özelliktir; otomatik rezonans, order veya arıza değildir.',
            },
        ],
        ruleTitle: 'Yeni başlayan için üç soruluk güvenlik kontrolü',
        rules: [
            'Bu spektrum tam olarak hangi örnekleri ve çalışma durumunu anlatıyor?',
            'Frekans ızgarasını, sızıntı davranışını ve ortalamayı hangi ayarlar oluşturdu?',
            'Her özelliği hangi fiziksel kaynak üretebilir ve bu bağlantıyı hangi bağımsız kanıt destekliyor?',
        ],
    },
}

export default FFT_BEGINNER_TRANSLATIONS
