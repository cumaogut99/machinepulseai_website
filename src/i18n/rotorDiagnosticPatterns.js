const ROTOR_DIAGNOSTIC_PATTERNS = {
    en: {
        eyebrow: 'Engineering deep dive · Hypothesis testing',
        title: 'Patterns suggest a test; they do not pronounce a verdict',
        intro:
            'Use these families to organize evidence. Each row starts with a measured pattern, then states what would strengthen the hypothesis and what should make you challenge it. Machine design, bearing type and operating history always outrank a generic pattern chart.',
        prompt: 'Select an evidence family',
        labels: {
            signature: 'Observed pattern',
            corroborate: 'Evidence that strengthens it',
            challenge: 'Evidence that challenges it',
        },
        items: [
            {
                id: 'unbalance',
                tab: '1X response',
                name: 'Unbalance-like synchronous response',
                signature: 'A repeatable 1X component, commonly forward, grows with speed response and shows an orderly phase progression through a resonance region.',
                corroborate: 'Similar run-up/coast-down behavior, a stable slow-roll baseline, compatible bearing-plane phase and a balancing trial that changes the 1X vector as predicted.',
                challenge: 'Strong higher harmonics, intermittent orbit clipping, poor RPM reference, thermal bow, shaft runout or a response that does not repeat at the same operating state.',
            },
            {
                id: 'alignment',
                tab: 'Coupling / 2X',
                name: 'Misalignment or coupling-force hypothesis',
                signature: '1X and/or 2X response accompanied by coupling-plane, axial or casing evidence; phase relationships across the coupling may be more useful than one local amplitude.',
                corroborate: 'Known alignment change, thermal-growth context, coupling inspection and synchronized measurements on both machine sides.',
                challenge: 'A shaft-relative XY pair alone. Similar harmonic content can come from looseness, rub, geometry or waveform distortion.',
            },
            {
                id: 'rub',
                tab: 'Rub / nonlinearity',
                name: 'Rub or other nonlinear-contact hypothesis',
                signature: 'Orbit truncation or loops, multiple harmonics, subharmonics, sudden phase/amplitude changes or different run-up and coast-down paths.',
                corroborate: 'Temperature, clearance or acoustic changes; repeatable onset at a speed/load boundary; inspection marks or supporting waveform evidence.',
                challenge: 'A clean, repeatable single-order orbit with no hysteresis or contextual evidence of contact.',
            },
            {
                id: 'fluid',
                tab: 'Oil-film instability',
                name: 'Oil whirl / oil whip hypothesis',
                signature: 'A forward subsynchronous component may track a fraction of running speed; an oil-whip hypothesis becomes stronger if the component locks near a rotor natural frequency instead of continuing to track RPM.',
                corroborate: 'Fluid-film bearing design, load/oil-temperature dependence, forward precession and persistence across Bode/full-spectrum/waterfall views.',
                challenge: 'Unknown sign convention, non-fluid-film bearings, an electrical/process forcing at the same frequency or a component that is actually an order of another shaft.',
            },
            {
                id: 'bow',
                tab: 'Bow / runout',
                name: 'Shaft bow, runout or thermal-vector hypothesis',
                signature: 'A large slow-speed synchronous vector, a 1X response that changes with thermal state, or a corrected trace that differs materially from the raw vector.',
                corroborate: 'Repeatable slow-roll vectors, shaft inspection, gap trend, thermal soak history and consistent raw-versus-compensated behavior.',
                challenge: 'An unstable slow-roll region or compensation referenced to different angular/coordinate conventions; subtraction can otherwise manufacture the apparent change.',
            },
            {
                id: 'data',
                tab: 'Measurement fault',
                name: 'Instrument or data-quality problem',
                signature: 'Flat-topped waveforms, impossible gap jumps, phase discontinuities, RPM dropouts, mirrored precession after a wiring change or the same artifact in unrelated states.',
                corroborate: 'Probe gap/OK checks, calibration records, redundant channels, pulse-quality review and raw waveform inspection.',
                challenge: 'Do not spend time refining a mechanical diagnosis until the signal-chain explanation has been ruled out.',
            },
        ],
        note:
            'Severity and diagnosis are different questions. A standard or site limit can classify a defined vibration quantity; it does not identify the fault mechanism that produced it.',
    },
    tr: {
        eyebrow: 'Mühendislik derinliği · Hipotez sınama',
        title: 'Örüntüler bir test önerir; hüküm vermez',
        intro:
            'Bu aileleri kanıtı düzenlemek için kullanın. Her satır önce ölçülen örüntüyü, sonra hipotezi güçlendirecek ve sorgulatacak kanıtı verir. Makine tasarımı, yatak tipi ve işletme geçmişi her zaman genel bir örüntü tablosundan daha önceliklidir.',
        prompt: 'Bir kanıt ailesi seçin',
        labels: {
            signature: 'Gözlenen örüntü',
            corroborate: 'Hipotezi güçlendiren kanıt',
            challenge: 'Hipotezi sorgulatan kanıt',
        },
        items: [
            {
                id: 'unbalance',
                tab: '1X yanıtı',
                name: 'Dengesizlik benzeri senkron yanıt',
                signature: 'Tekrarlanabilir, çoğunlukla ileri presesyonlu bir 1X bileşeni hız yanıtıyla büyür ve rezonans bölgesinde düzenli faz ilerlemesi gösterir.',
                corroborate: 'Benzer run-up/coast-down davranışı, kararlı slow-roll tabanı, yatak düzlemleriyle uyumlu faz ve 1X vektörünü beklendiği gibi değiştiren balans denemesi.',
                challenge: 'Güçlü üst harmonikler, aralıklı orbit kesilmesi, zayıf RPM referansı, termal eğilme, şaft runout’u veya aynı işletme hâlinde tekrarlanmayan yanıt.',
            },
            {
                id: 'alignment',
                tab: 'Kaplin / 2X',
                name: 'Eksen kaçıklığı veya kaplin kuvveti hipotezi',
                signature: 'Kaplin düzlemi, eksenel veya gövde kanıtının eşlik ettiği 1X ve/veya 2X yanıtı; kaplinin iki tarafındaki faz ilişkisi tek yerel genlikten daha değerli olabilir.',
                corroborate: 'Bilinen hizalama değişimi, termal büyüme bağlamı, kaplin incelemesi ve makinenin iki tarafındaki senkron ölçümler.',
                challenge: 'Yalnızca bir şaft-bağıl XY çifti. Benzer harmonikler gevşeklik, rub, geometri veya dalga biçimi bozulmasından da gelebilir.',
            },
            {
                id: 'rub',
                tab: 'Rub / doğrusal olmayan',
                name: 'Rub veya başka doğrusal olmayan temas hipotezi',
                signature: 'Orbit kesilmesi ya da ilmekleri, çoklu harmonikler, alt harmonikler, ani faz/genlik değişimi veya farklı run-up ve coast-down yolları.',
                corroborate: 'Sıcaklık, boşluk veya akustik değişimi; belirli hız/yük sınırında tekrarlanan başlangıç; inceleme izleri veya destekleyici dalga biçimi.',
                challenge: 'Histerezis ya da teması destekleyen bağlam olmadan temiz, tekrarlanabilir tek-order orbit.',
            },
            {
                id: 'fluid',
                tab: 'Yağ filmi kararsızlığı',
                name: 'Oil whirl / oil whip hipotezi',
                signature: 'İleri presesyonlu sub-senkron bileşen çalışma hızının bir oranını izleyebilir; RPM’yi izlemeyi bırakıp rotor doğal frekansı yakınında kilitlenirse oil-whip hipotezi güçlenir.',
                corroborate: 'Kaymalı yatak tasarımı, yük/yağ sıcaklığı bağımlılığı, ileri presesyon ve Bode/full-spectrum/waterfall görünümlerinde süreklilik.',
                challenge: 'Bilinmeyen işaret kabulü, kaymalı olmayan yatak, aynı frekanstaki elektriksel/proses kuvveti veya aslında başka bir şaftın order’ı olan bileşen.',
            },
            {
                id: 'bow',
                tab: 'Eğilme / runout',
                name: 'Şaft eğilmesi, runout veya termal vektör hipotezi',
                signature: 'Büyük düşük-hız senkron vektörü, termal hâlle değişen 1X yanıtı veya ham vektörden belirgin biçimde ayrılan düzeltilmiş iz.',
                corroborate: 'Tekrarlanabilir slow-roll vektörleri, şaft incelemesi, gap eğilimi, termal bekleme geçmişi ve tutarlı ham/düzeltilmiş davranış.',
                challenge: 'Kararsız slow-roll bölgesi veya farklı açı/koordinat kabullerine bağlı düzeltme; aksi hâlde çıkarma yapay değişim üretebilir.',
            },
            {
                id: 'data',
                tab: 'Ölçüm hatası',
                name: 'Enstrüman veya veri kalitesi sorunu',
                signature: 'Düz tepeli dalga biçimi, olanaksız gap sıçraması, faz süreksizliği, RPM kopması, kablo değişiminden sonra aynalanan presesyon veya ilgisiz durumlarda aynı artefakt.',
                corroborate: 'Prob gap/OK kontrolleri, kalibrasyon kaydı, yedek kanallar, darbe kalitesi ve ham dalga biçimi incelemesi.',
                challenge: 'Sinyal zinciri açıklaması elenmeden mekanik teşhisi ayrıntılandırmayın.',
            },
        ],
        note:
            'Şiddet ve teşhis farklı sorulardır. Standart veya tesis limiti, tanımlı bir titreşim büyüklüğünü sınıflandırabilir; onu üreten arıza mekanizmasını belirlemez.',
    },
}

export default ROTOR_DIAGNOSTIC_PATTERNS
