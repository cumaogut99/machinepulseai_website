const ROTOR_BEGINNER = {
    en: {
        eyebrow: 'Start here · 60-second mental model',
        title: 'A rotor is a flexible spinning system, not a perfectly rigid line',
        intro:
            'Picture a shaft carrying discs, supported by bearings and turning inside a small clearance. Forces bend it, the bearings guide it and the shaft centre traces a path. Rotor Dynamics helps you connect that path to speed without guessing from one vibration number.',
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
                title: 'Two probes provide two eyes',
                body: 'An XY pair observes shaft-relative motion in one bearing plane. One probe alone cannot reconstruct the orbit.',
            },
            {
                tag: 'CLOCK',
                title: 'Measured RPM supplies the clock',
                body: 'The current widget integrates measured RPM to build revolution marks and 1X phase from the selection start. It does not claim hardware-keyphasor phase.',
            },
        ],
        exampleTitle: 'A first calculation you can do in your head',
        exampleRpm: '3,000 rpm',
        exampleMath: '3,000 ÷ 60 = 50 revolutions/s',
        exampleResult: '1X = 50 Hz · 2X = 100 Hz',
        exampleBody:
            'If a 50 Hz component grows during run-up, call it a speed-related clue—not “unbalance” yet. Check phase, orbit, forward/backward content, repeatability and machine context before naming a cause.',
        ladderTitle: 'Move from data to a decision in five gates',
        ladder: [
            { title: 'Trust the signals', body: 'Units, range, polarity, probe angles and RPM are plausible.' },
            { title: 'Describe the motion', body: 'State what the orbit, order and speed response actually show.' },
            { title: 'Cross-check views', body: 'Bode, Polar, full spectrum and centreline tell a consistent story.' },
            { title: 'Add machine context', body: 'Load, temperature, bearing type, clearance and history support the explanation.' },
            { title: 'Make a bounded conclusion', body: 'Name the hypothesis, evidence, uncertainty and next confirming test.' },
        ],
        questionsTitle: 'Before touching a setting, answer these four questions',
        questions: [
            'Are X and Y shaft-relative probes from the same bearing plane?',
            'Do I know the probe angles, polarity and physical shaft rotation?',
            'Does the RPM channel represent the same time range without dropouts?',
            'Am I analysing one coherent steady state, run-up or coast-down event?',
        ],
        bridge:
            'New to rotor dynamics? Follow the page in order. Experienced engineer? Use the interface tour, view guide, diagnostic hypotheses and formula/reference sections as a technical checklist.',
    },
    tr: {
        eyebrow: 'Buradan başlayın · 60 saniyelik zihinsel model',
        title: 'Rotor, kusursuz rijit bir çizgi değil; esneyebilen döner bir sistemdir',
        intro:
            'Diskleri taşıyan, yataklarla desteklenen ve küçük bir boşluk içinde dönen bir şaft düşünün. Kuvvetler şaftı eğer, yataklar hareketi yönlendirir ve şaft merkezi bir yol çizer. Rotor Dynamics, tek bir titreşim değerinden tahmin yürütmek yerine bu yolu devirle ilişkilendirmenizi sağlar.',
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
                title: 'İki prob iki göz sağlar',
                body: 'XY çifti aynı yatak düzlemindeki şaft-bağıl hareketi izler. Tek prob orbit yolunu kuramaz.',
            },
            {
                tag: 'SAAT',
                title: 'Ölçülen RPM zaman referansını sağlar',
                body: 'Mevcut widget, ölçülen RPM izini entegre ederek devir işaretlerini ve seçim başlangıcına göre 1X fazını üretir. Donanımsal keyphasor fazı iddiasında bulunmaz.',
            },
        ],
        exampleTitle: 'Aklınızdan yapabileceğiniz ilk hesap',
        exampleRpm: '3.000 rpm',
        exampleMath: '3.000 ÷ 60 = 50 devir/saniye',
        exampleResult: '1X = 50 Hz · 2X = 100 Hz',
        exampleBody:
            'Run-up sırasında 50 Hz bileşeni büyürse buna önce “devirle ilişkili bir ipucu” deyin; hemen “dengesizlik” demeyin. Nedeni adlandırmadan önce fazı, orbiti, ileri/geri içeriği, tekrarlanabilirliği ve makine bağlamını kontrol edin.',
        ladderTitle: 'Veriden karara beş kapıdan geçin',
        ladder: [
            { title: 'Sinyallere güvenin', body: 'Birim, aralık, polarite, prob açıları ve RPM makuldür.' },
            { title: 'Hareketi tarif edin', body: 'Orbit, order ve hız yanıtının gerçekten ne gösterdiğini söyleyin.' },
            { title: 'Görünümleri çapraz doğrulayın', body: 'Bode, Polar, full spectrum ve centreline aynı hikâyeyi anlatır.' },
            { title: 'Makine bağlamını ekleyin', body: 'Yük, sıcaklık, yatak tipi, boşluk ve geçmiş açıklamayı destekler.' },
            { title: 'Sınırları belli bir sonuç yazın', body: 'Hipotezi, kanıtı, belirsizliği ve sonraki doğrulama testini belirtin.' },
        ],
        questionsTitle: 'Bir ayara dokunmadan önce şu dört soruyu yanıtlayın',
        questions: [
            'X ve Y, aynı yatak düzlemindeki şaft-bağıl problar mı?',
            'Prob açılarını, polariteyi ve fiziksel şaft dönüş yönünü biliyor muyum?',
            'RPM kanalı aynı zaman aralığını kesintisiz temsil ediyor mu?',
            'Tek ve tutarlı bir kararlı hâli, run-up veya coast-down olayını mı inceliyorum?',
        ],
        bridge:
            'Rotor dinamiğine yeniyseniz sayfayı sırayla izleyin. Deneyimli mühendisseniz arayüz turunu, görünüm rehberini, tanısal hipotezleri ve formül/kaynak bölümlerini teknik kontrol listesi olarak kullanın.',
    },
}

export default ROTOR_BEGINNER
