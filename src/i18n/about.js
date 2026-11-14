// Copy for the About page, the homepage industries section and the vision band.
export default {
    en: {
        band: {
            eyebrow: 'Vision',
            title: 'Shortening the path from measurement to decision',
            text: 'We are building one workspace where engineers prepare measurement data, analyze it and share their decisions with the evidence behind them. In that workspace, AI is a research partner that leaves the calculations to the engine and ties every finding to its evidence.',
            link: 'Read our vision and roadmap',
        },
        sectors: {
            eyebrow: 'Industries',
            title: 'For test teams working with measurement data',
            description: 'MachinePulseAI is built for teams that analyze recorded vibration and test data. The examples below show work you can do with the modules available today.',
            modulesLabel: 'Example modules',
            items: {
                aerospace: {
                    title: 'Aerospace and defense',
                    description: 'Search long flight and ground-test vibration recordings for gearbox and bearing faults, and evaluate shock and impact events. With a local model, the data never leaves your organization.',
                },
                automotive: {
                    title: 'Automotive',
                    description: 'Investigate brake, steering and driveline vibration. Separate run-up and coast-down behaviour by speed with order analysis, and reconstruct vehicle motion from accelerometer and gyro data.',
                },
                energy: {
                    title: 'Energy and rotating machinery',
                    description: 'In turbine, generator, pump and compressor tests, examine shaft motion, critical speeds and unbalance, then calculate the balance correction from your measurements.',
                },
                rail: {
                    title: 'Rail',
                    description: 'Open long field recordings of bogie, axle and wheel vibration without loading them fully into memory, and compare frequency- and speed-related components.',
                },
                industrial: {
                    title: 'Industrial machinery and manufacturing',
                    description: 'Find structural resonances in machine tools, fans, gearboxes and conveyors. Modal analysis and operating deflection shapes show how vibration travels through the structure.',
                },
                labs: {
                    title: 'R&D and test laboratories',
                    description: 'Open CSV, TDMS, MDF/MF4 and Parquet recordings from different acquisition systems in one workspace, align their time bases and report the results.',
                },
            },
        },
        page: {
            eyebrow: 'About',
            title: 'Shortening the path from measurement to decision',
            intro: 'MachinePulseAI is being built to change how test and R&D teams work with measurement data. Today it is a desktop application for analyzing recorded data. Our goal is a platform that stays with the engineer from the moment a measurement is taken to the moment a decision is made.',
            vision: {
                title: 'Our vision',
                p1: 'The real output of a test campaign is not the data but the decision it supports. Yet much of a team’s time goes into opening files, moving data between tools and repeating the same analyses by hand. As recordings grow, this work slows down, and the link between a finding and the measurement behind it is often lost by the time the report is written.',
                p2: 'We are building MachinePulseAI as a platform where every step, from preparing the data to reporting, happens in one workspace. The native C++ engine performs the numerical work; AI acts as a research partner that uses those tools. It runs analyses, tests possible causes against the measurements and ties every finding to its evidence. The engineer always makes the final call.',
                p3: 'In the long run we want the same engine to run wherever measurements are taken: an analysis that starts with recorded data in the test lab should grow into live measurement and into a body of knowledge that learns from the organization’s past tests.',
            },
            whyNow: {
                title: 'Why now',
                items: {
                    local: {
                        title: 'AI can now run locally',
                        description: 'Open-weight language models have become small enough to run on an engineer’s computer. Sensitive test data can get AI support without leaving the building; the investigations in our case-study videos ran on a local model.',
                    },
                    scale: {
                        title: 'Recordings keep growing',
                        description: 'Higher sample rates and channel counts push a single test recording into the gigabytes. Tools that load the whole recording into memory struggle at this scale.',
                    },
                    fragmented: {
                        title: 'The toolchain is fragmented',
                        description: 'Acquisition, analysis and reporting often happen in separate programs. Every hand-off costs time and makes it harder to trace how a finding was reached.',
                    },
                },
            },
            principles: {
                title: 'How we build it',
                items: {
                    data: {
                        title: 'Your data stays with you',
                        description: 'The application runs on your computer. With a local model, AI support stays there too; Local Only Mode blocks cloud model providers.',
                    },
                    engine: {
                        title: 'The engine does the math',
                        description: 'Numerical results come from the native C++ engine. The assistant does not calculate numbers itself: it calls the analysis tools and shows which measurement supports which finding.',
                    },
                    scale: {
                        title: 'Built for large recordings',
                        description: 'The MPAI format reads a recording from disk in bounded windows, and Min-Max plots show it without losing peak values.',
                    },
                    traceable: {
                        title: 'Results you can trace',
                        description: 'Reports carry the finding together with the settings used and the computations behind it, so a colleague can follow how the conclusion was reached.',
                    },
                },
            },
            contact: {
                title: 'Let’s talk',
                description: 'Would you like to see the application on your own recordings or discuss working together? Send us a short note.',
                button: 'Get in touch',
            },
        },
    },
    tr: {
        band: {
            eyebrow: 'Vizyon',
            title: 'Ölçümden karara giden yolu kısaltmak',
            text: 'Mühendisin ölçüm verisini hazırladığı, analiz ettiği ve kararını dayanaklarıyla paylaştığı tek bir çalışma alanı kuruyoruz. Bu alanda yapay zekâ, hesabı motora bırakan ve her bulguyu kanıtına bağlayan bir araştırma ortağıdır.',
            link: 'Vizyonumuzu ve yol haritamızı okuyun',
        },
        sectors: {
            eyebrow: 'Sektörler',
            title: 'Ölçüm verisiyle çalışan test ekipleri için',
            description: 'MachinePulseAI, kayıtlı titreşim ve test verisini analiz eden ekipler için geliştiriliyor. Aşağıdaki örnekler, bugün kullanılabilen modüllerle yapabileceğiniz işleri gösterir.',
            modulesLabel: 'Örnek modüller',
            items: {
                aerospace: {
                    title: 'Havacılık ve savunma',
                    description: 'Uçuş ve yer testlerinden gelen uzun titreşim kayıtlarında dişli kutusu ve rulman arızalarını arayın, darbe ve şok olaylarını değerlendirin. Yerel modelle çalışırken veri kurum dışına çıkmaz.',
                },
                automotive: {
                    title: 'Otomotiv',
                    description: 'Fren, direksiyon ve güç aktarma titreşimlerini inceleyin. Hızlanma ve yavaşlama koşularındaki davranışı order analiziyle hıza göre ayırın, araç hareketini ivmeölçer ve jiroskop verisinden kurun.',
                },
                energy: {
                    title: 'Enerji ve döner makineler',
                    description: 'Türbin, jeneratör, pompa ve kompresör testlerinde şaft hareketini, kritik hızları ve dengesizliği inceleyin; balans düzeltmesini ölçümlerinizden hesaplayın.',
                },
                rail: {
                    title: 'Raylı sistemler',
                    description: 'Boji, aks ve tekerlek titreşimlerinin uzun saha kayıtlarını belleğe tümüyle yüklemeden açın; frekansa ve hıza bağlı bileşenleri karşılaştırın.',
                },
                industrial: {
                    title: 'Endüstriyel makine ve üretim',
                    description: 'Takım tezgâhı, fan, redüktör ve taşıyıcı sistemlerde yapısal rezonansları bulun. Modal analiz ve çalışma şekilleri (ODS), titreşimin yapı içinde nasıl ilerlediğini gösterir.',
                },
                labs: {
                    title: 'Ar-Ge ve test laboratuvarları',
                    description: 'Farklı veri toplama sistemlerinden gelen CSV, TDMS, MDF/MF4 ve Parquet kayıtlarını tek çalışma alanında açın, zaman eksenlerini hizalayın ve sonuçları raporlayın.',
                },
            },
        },
        page: {
            eyebrow: 'Hakkında',
            title: 'Ölçümden karara giden yolu kısaltıyoruz',
            intro: 'MachinePulseAI, test ve Ar-Ge ekiplerinin ölçüm verisiyle çalışma biçimini değiştirmek için geliştiriliyor. Bugün kayıtlı veriyi analiz eden bir masaüstü uygulamasıyız. Hedefimiz, ölçümün alındığı andan kararın verildiği ana kadar mühendisin yanında olan bir platform olmak.',
            vision: {
                title: 'Vizyonumuz',
                p1: 'Bir test kampanyasının asıl çıktısı veri değil, o verinin desteklediği karardır. Yine de ekiplerin zamanının büyük kısmı dosyaları açmaya, veriyi araçlar arasında taşımaya ve aynı analizleri elle tekrarlamaya gidiyor. Kayıtlar büyüdükçe bu iş yavaşlıyor; rapor yazılırken de bulgunun hangi ölçüme dayandığı çoğu zaman kayboluyor.',
                p2: 'MachinePulseAI’ı, veriyi hazırlamaktan raporlamaya kadar her adımın tek bir çalışma alanında yapıldığı bir platform olarak kuruyoruz. Sayısal hesapları yerel C++ motoru yapar; yapay zekâ ise bu araçları kullanan bir araştırma ortağıdır. Analizleri çalıştırır, olası nedenleri ölçümle sınar ve her bulguyu dayandığı kanıta bağlar. Son kararı her zaman mühendis verir.',
                p3: 'Uzun vadede aynı motorun ölçümün yapıldığı her yerde çalışmasını istiyoruz: test laboratuvarında kayıtlı veriyle başlayan analiz, canlı ölçüme ve kurumun geçmiş testlerinden öğrenen bir bilgi birikimine dönüşmeli.',
            },
            whyNow: {
                title: 'Neden şimdi?',
                items: {
                    local: {
                        title: 'Yapay zekâ artık yerelde çalışabiliyor',
                        description: 'Açık ağırlıklı dil modelleri bir mühendis bilgisayarında çalışacak kadar küçüldü. Hassas test verisi kurum dışına çıkmadan yapay zekâ desteği alabiliyor; vaka videolarımızdaki incelemeler de yerel bir modelle yapıldı.',
                    },
                    scale: {
                        title: 'Kayıtlar büyüyor',
                        description: 'Yüksek örnekleme hızları ve kanal sayıları, tek bir test kaydını gigabaytlar seviyesine taşıyor. Kaydın tamamını belleğe yükleyen araçlar bu ölçekte zorlanıyor.',
                    },
                    fragmented: {
                        title: 'Araçlar dağınık',
                        description: 'Veri toplama, analiz ve raporlama çoğu zaman ayrı programlarda yapılıyor. Her geçiş zaman kaybettiriyor ve bir bulguya nasıl ulaşıldığını izlemeyi zorlaştırıyor.',
                    },
                },
            },
            principles: {
                title: 'Nasıl geliştiriyoruz?',
                items: {
                    data: {
                        title: 'Veriniz sizde kalır',
                        description: 'Uygulama bilgisayarınızda çalışır. Yerel modelle yapay zekâ desteği de orada kalır; Local Only Mode bulut model sağlayıcılarını engeller.',
                    },
                    engine: {
                        title: 'Hesabı motor yapar',
                        description: 'Sayısal sonuçlar yerel C++ motorundan gelir. Asistan sayıları kendisi hesaplamaz; analiz araçlarını çağırır ve hangi ölçümün hangi bulguyu desteklediğini gösterir.',
                    },
                    scale: {
                        title: 'Büyük kayıtlar için tasarlandı',
                        description: 'MPAI formatı kaydı diskten sınırlı pencerelerle okur; Min-Max grafikler kaydı tepe değerlerini kaybetmeden gösterir.',
                    },
                    traceable: {
                        title: 'Sonuç izlenebilir olmalı',
                        description: 'Raporlar bulguyu, kullanılan ayarları ve dayandığı hesaplamaları birlikte taşır; ekip arkadaşınız sonuca nasıl ulaşıldığını takip edebilir.',
                    },
                },
            },
            contact: {
                title: 'Tanışalım',
                description: 'Uygulamayı kendi kayıtlarınızla görmek ya da birlikte çalışmayı konuşmak ister misiniz? Bize kısa bir not bırakın.',
                button: 'İletişime geçin',
            },
        },
    },
}
