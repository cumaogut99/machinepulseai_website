const ROTOR_BEGINNER = {
    en: {
        eyebrow: 'Fundamentals',
        title: 'Rotor system overview',
        intro:
            'A rotor is a shaft carrying discs or impellers, supported by bearings and turning inside a small clearance. The forces acting on it bend the shaft, the bearings guide its motion and the shaft centre traces a path. Rotor dynamics analysis relates that path to running speed instead of relying on a single vibration value.',
        cards: [
            {
                tag: 'ROTOR',
                title: 'The part that spins',
                body: 'The shaft, impellers, couplings and discs act together. They can bend and vibrate while rotating.',
            },
            {
                tag: 'SUPPORT',
                title: 'The bearings shape the motion',
                body: 'Bearing stiffness, damping, clearance, oil condition and load change how the shaft can move.',
            },
            {
                tag: 'FORCE',
                title: 'Some forces repeat every turn',
                body: 'A force repeating once per revolution is called 1X. Twice per revolution is 2X. Not every response follows shaft speed.',
            },
            {
                tag: 'MEASURE',
                title: 'Two probes measure motion in a plane',
                body: 'An XY pair observes shaft-relative motion in one bearing plane. One probe alone cannot reconstruct the orbit.',
            },
            {
                tag: 'REFERENCE',
                title: 'Measured RPM provides the speed reference',
                body: 'The current widget integrates measured RPM to build revolution marks and 1X phase from the selection start. It does not claim hardware-keyphasor phase.',
            },
        ],
        exampleTitle: 'Example: converting speed to frequency',
        exampleRpm: '3,000 rpm',
        exampleMath: '3,000 ÷ 60 = 50 revolutions/s',
        exampleResult: '1X = 50 Hz · 2X = 100 Hz',
        exampleBody:
            'If a 50 Hz component grows during run-up, it should first be treated as a speed-related finding, not as proof of unbalance. Check phase, orbit, forward/backward content, repeatability and machine context before identifying a cause.',
        ladderTitle: 'Five steps from data to a conclusion',
        ladder: [
            { title: 'Validate the signals', body: 'Check that units, range, polarity, probe angles and RPM are plausible.' },
            { title: 'Describe the motion', body: 'State what the orbit, orders and speed response actually show.' },
            { title: 'Cross-check views', body: 'Bode, Polar, full spectrum and shaft centreline results must be consistent with each other.' },
            { title: 'Add machine context', body: 'Load, temperature, bearing type, clearance and history support the explanation.' },
            { title: 'Report the conclusion with its limits', body: 'State the hypothesis, evidence, uncertainty and the next confirming test.' },
        ],
        questionsTitle: 'Pre-analysis checklist',
        questions: [
            'Are X and Y shaft-relative probes from the same bearing plane?',
            'Do I know the probe angles, polarity and physical shaft rotation?',
            'Does the RPM channel represent the same time range without dropouts?',
            'Am I analysing one coherent steady state, run-up or coast-down event?',
        ],
        bridge:
            'If you are new to rotor dynamics, read the guide in order. Experienced engineers can use the interface, analysis view, diagnostic pattern and formula/reference sections as a technical checklist.',
    },
    tr: {
        eyebrow: 'Temel kavramlar',
        title: 'Rotor sistemine genel bakış',
        intro:
            'Rotor; disk veya çark taşıyan, yataklarla desteklenen ve küçük bir boşluk içinde dönen bir şafttır. Etki eden kuvvetler şaftı eğer, yataklar hareketini yönlendirir ve şaft merkezi bir yol çizer. Rotor dinamiği analizi, tek bir titreşim değerine dayanmak yerine bu yolu çalışma deviriyle ilişkilendirir.',
        cards: [
            {
                tag: 'ROTOR',
                title: 'Dönen parça',
                body: 'Şaft, çarklar, kaplinler ve diskler birlikte davranır. Dönerken eğilebilir ve titreşebilirler.',
            },
            {
                tag: 'DESTEK',
                title: 'Hareketi yataklar şekillendirir',
                body: 'Yatak rijitliği, sönüm, boşluk, yağ durumu ve yük; şaftın nasıl hareket edebileceğini değiştirir.',
            },
            {
                tag: 'KUVVET',
                title: 'Bazı kuvvetler her turda tekrar eder',
                body: 'Devir başına bir kez tekrarlanan bileşene 1X, iki kez tekrarlanana 2X denir. Her yanıt şaft hızını takip etmez.',
            },
            {
                tag: 'ÖLÇÜM',
                title: 'İki prob düzlemdeki hareketi ölçer',
                body: 'XY çifti aynı yatak düzlemindeki şaft-bağıl hareketi izler. Tek prob orbit yolunu kuramaz.',
            },
            {
                tag: 'REFERANS',
                title: 'Ölçülen RPM devir referansını sağlar',
                body: 'Mevcut widget, ölçülen RPM izini entegre ederek devir işaretlerini ve seçim başlangıcına göre 1X fazını üretir. Donanımsal keyphasor fazı iddiasında bulunmaz.',
            },
        ],
        exampleTitle: 'Örnek: devirden frekansa dönüşüm',
        exampleRpm: '3.000 rpm',
        exampleMath: '3.000 ÷ 60 = 50 devir/saniye',
        exampleResult: '1X = 50 Hz · 2X = 100 Hz',
        exampleBody:
            'Run-up sırasında 50 Hz bileşeni büyürse bu önce devirle ilişkili bir bulgu olarak değerlendirilmelidir; doğrudan dengesizlik sonucuna varılmamalıdır. Nedeni belirlemeden önce faz, orbit, ileri/geri içerik, tekrarlanabilirlik ve makine bağlamı kontrol edilmelidir.',
        ladderTitle: 'Veriden sonuca beş adım',
        ladder: [
            { title: 'Sinyalleri doğrulayın', body: 'Birim, aralık, polarite, prob açıları ve RPM değerlerinin makul olduğunu kontrol edin.' },
            { title: 'Hareketi tanımlayın', body: 'Orbit, order’lar ve hız yanıtının gerçekte ne gösterdiğini belirtin.' },
            { title: 'Görünümleri çapraz doğrulayın', body: 'Bode, Polar, full spectrum ve şaft merkez çizgisi sonuçları birbiriyle tutarlı olmalıdır.' },
            { title: 'Makine bağlamını ekleyin', body: 'Yük, sıcaklık, yatak tipi, boşluk ve geçmiş kayıtlarla açıklamayı destekleyin.' },
            { title: 'Sonucu sınırlarıyla raporlayın', body: 'Hipotezi, kanıtı, belirsizliği ve sonraki doğrulama testini belirtin.' },
        ],
        questionsTitle: 'Analiz öncesi kontrol listesi',
        questions: [
            'X ve Y, aynı yatak düzlemindeki şaft-bağıl problar mı?',
            'Prob açılarını, polariteyi ve fiziksel şaft dönüş yönünü biliyor muyum?',
            'RPM kanalı aynı zaman aralığını kesintisiz temsil ediyor mu?',
            'Tek ve tutarlı bir kararlı hâli, run-up veya coast-down olayını mı inceliyorum?',
        ],
        bridge:
            'Rotor dinamiğine yeniyseniz rehberi sırasıyla okumanız önerilir. Deneyimli mühendisler arayüz, analiz görünümleri, tanısal örüntüler ve formül/kaynak bölümlerini teknik kontrol listesi olarak kullanabilir.',
    },
}

export default ROTOR_BEGINNER
