import SITE_MARKETING from './i18n/siteMarketing.js';
import CASE_STUDIES from './i18n/caseStudies.js';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import FFT_LEARNING_TRANSLATIONS from './i18n/fftLearning.js';
import FFT_THEORY_TRANSLATIONS from './i18n/fftTheory.js';
import FFT_BEGINNER_TRANSLATIONS from './i18n/fftBeginner.js';
import ROTOR_DYNAMICS_LEARNING_TRANSLATIONS from './i18n/rotorDynamicsLearning.js';
import VIBRATION_LEARNING_TRANSLATIONS from './i18n/vibrationLearning.js';
import WIDGET_LEARNING_TRANSLATIONS from './i18n/widgetLearning.js';

// Çeviri metinleri
const resources = {
    en: {
        translation: {
            "site": SITE_MARKETING.en,
            "caseStudies": CASE_STUDIES.en,
            "fftLearn": FFT_LEARNING_TRANSLATIONS.en,
            "fftTheory": FFT_THEORY_TRANSLATIONS.en,
            "fftBeginner": FFT_BEGINNER_TRANSLATIONS.en,
            "rotorLearn": ROTOR_DYNAMICS_LEARNING_TRANSLATIONS.en,
            "vibrationLearn": VIBRATION_LEARNING_TRANSLATIONS.en,
            "widgetLearn": WIDGET_LEARNING_TRANSLATIONS.en,
            "nav": {
                "platform": "Platform",
                "product": "Product",
                "features": "Features",
                "howItWorks": "How It Works",
                "agenticArch": "Architecture",
                "solutions": "Solutions",
                "industries": "Industries",
                "pricing": "Packages",
                "resources": "Resources",
                "knowledgeBase": "Knowledge Base",
                "widgets": "Module Library",
                "getDemo": "Get a Demo"
            },
            "home": {
                "featuresViewAll": "Explore the full product",
                "industriesViewAll": "See all industries",
                "whyTitle": "Why MachinePulseAI",
                "whySubtitle": "Core capabilities designed for modern test data scale.",
                "why": {
                    "ai": { "title": "Built-in AI Assistant", "desc": "Query datasets, structure analysis pipelines, and retrieve institutional test records in natural language while deterministic C++ engines compute the math." },
                    "scale": { "title": "Massive data, modest hardware", "desc": "The out-of-core MPAI engine reads bounded windows from disk. Min-Max visualization preserves peaks without loading entire channels into RAM." },
                    "secure": { "title": "Choose where AI runs", "desc": "Recorded-data analysis runs locally. Choose compatible local models or supported cloud providers; Local Only Mode blocks cloud model providers." }
                },
                "problem": {
                    "eyebrow": "The Problem",
                    "title": "Engineering data is growing faster than the tools to analyze it",
                    "desc": "Multi-channel high-rate recordings, tedious manual format conversions, and memory limits that bottleneck post-processing. MachinePulseAI delivers interactive, zero-copy analysis directly from raw test data."
                }
            },
            "appShowcase": {
                "eyebrow": "The Real Application",
                "title": "Visual Engineering Workspace",
                "subtitle": "A visual node-graph workspace: connect data sources, signal filters, and engineering diagnostics into traceable dataflow pipelines with synchronized multi-channel visualization.",
                "windowTitle": "Workspace",
                "alt": "MachinePulseAI main window showing a node-graph analysis pipeline with an AI assistant panel",
                "caption": "MachinePulseAI desktop environment: visual pipeline canvas, widget palette, synchronous plot viewports, and local AI assistant."
            },
            "widgets": {
                "eyebrow": "Technical Library",
                "title": "Engineering Module Library",
                "subtitle": "{{count}} ready-to-use modules with theory, input channels, formulas, processing steps and produced outputs — from data import and signal filtering to vibration and structural diagnostics. Modules coming in later versions are labelled.",
                "searchPlaceholder": "Search module, theory or signal…",
                "allCategories": "All",
                "allModules": "All Modules",
                "categoriesTitle": "Categories",
                "viewMode": "View",
                "gridView": "Cards",
                "listView": "List",
                "modulesCount": "modules",
                "clearSearch": "Clear search",
                "readyModules": "ready",
                "quickBadges": {
                    "modules": "{{count}} Ready-to-Use Modules",
                    "theory": "Mathematical Theory & Formulas",
                    "workflows": "Measurement Workflows"
                },
                "learnMore": "Learn the theory",
                "hide": "Hide",
                "viewDetail": "Learn in detail",
                "expandGroup": "Show {{group}} widgets",
                "collapseGroup": "Hide {{group}} widgets",
                "futureBadge": "Coming later",
                "futureNote": "Coming in a later version of the application. Not available in the current version.",
                "noResults": "No widgets match your search.",
                "detail": {
                    "back": "Back to widget library",
                    "eyebrow": "Deep Dive",
                    "inputsTitle": "What It Uses",
                    "channelsTitle": "Input Channels",
                    "channelsSubtitle": "Exactly which test-data channels the analysis consumes, and how each one is used.",
                    "controlsTitle": "Controls and Settings",
                    "controlsSubtitle": "What each button, selector and input changes — and what it does not change.",
                    "formulasTitle": "Core Formulas",
                    "assumptionsTitle": "Engineering Assumptions",
                    "pipelineTitle": "Processing Pipeline",
                    "examplesTitle": "Example Result Readout",
                    "stepsTitle": "How It Works",
                    "outputsTitle": "Outputs Produced"
                }
            },
            "hero": {
                "badge": "Early Access Open",
                "title1": "Analyze test and measurement data",
                "title2": "in one place",
                "subtitle": "MachinePulseAI is a Windows engineering application that takes recorded test data from import to report in one workspace. Connect modules such as filtering, FFT and spectrum analysis, order tracking, rotor dynamics and modal analysis in a visual workflow. Use the optional AI assistant to ask questions about your data and see which measurements support your findings.",
                "ctaPrimary": "Request a Demo",
                "ctaSecondary": "Watch the Introduction"
            },
            "contact": {
                "subtitle": "Fill in the form and you will get a reply by email.",
                "form": {
                    "name": "Full Name *",
                    "company": "Organization (optional)",
                    "email": "Email *",
                    "submit": "Send Request",
                    "sending": "Sending...",
                    "privacy": "No spam. Your details are used only to respond to this request."
                },
                "success": {
                    "title": "Request sent!",
                    "message": "Your request has been received. You will get a reply by email.",
                    "close": "Close"
                },
                "error": "An error occurred while sending your request. Please try again later."
            },
            "footer": {
                "tagline": "High-performance test data post-processing and diagnostics platform."
            },
            "features": {
                "eyebrow": "Platform Features",
                "title": "Built for Engineers",
                "subtitle": "Every feature is optimized to overcome the real challenges of industrial data analysis."
            },
            "howItWorks": {
                "eyebrow": "How It Works",
                "titleBefore": "From raw data to insight",
                "titleHighlight": "in minutes",
                "subtitle": "Streamline the path from high-rate raw recordings to validated engineering reports. Automated ingestion and out-of-core pipelines eliminate memory bottlenecks so teams focus on engineering decisions."
            },
            "targets": {
                "eyebrow": "Target Markets",
                "title": "Built for high-stakes engineering",
                "subtitle": "Designed for engineers in sectors where data accuracy, speed, and security are mission-critical."
            },
            "agenticArch": {
                "eyebrow": "Smart Engineering Assistant",
                "titleBefore": "A platform with a",
                "titleHighlight": "built-in AI Agent",
                "subtitle": "An optional assistant for questions, analysis actions and reports. Choose a supported cloud provider or a compatible local model. Local Only Mode blocks cloud model providers."
            },
            "cta": {
                "label": "Early Access Now Open",
                "titleBefore": "Start analyzing",
                "titleHighlight": "smarter",
                "titleAfter": "today",
                "subtitle": "Engineered for test and evaluation teams across defense, aerospace, energy, and automotive industries. Request a technical demonstration.",
                "primaryCta": "Request a Demo",
                "secondaryCta": "Talk to the Team",
                "trustLine": "Windows 10/11 · Recorded-data analysis · Local or cloud AI options"
            },
            "pricing": {
                "eyebrow": "Packages & Modules",
                "title": "Build the platform you need",
                "subtitle": "Start with the base package, then add the widget groups and intelligence modules that fit your workflow. During early access, write in to agree the scope of your trial.",
                "baseLabel": "Always Included",
                "addonLabel": "Optional Module",
                "includedHeading": "Base Package",
                "includedTagline": "The foundation of every installation.",
                "addonsHeading": "Add-on Modules",
                "addonsTagline": "Extend the platform with analysis groups and intelligence modules.",
                "selectCta": "Request Early Access",
                "enterpriseTitle": "Team and closed-network use",
                "enterpriseBadge": "Let's talk",
                "enterpriseDesc": "Need to work offline or on a closed network, read a specific data format, or try the application across a team? Describe your setup and the scope of a pilot can be worked out together.",
                "enterpriseCta": "Request a Demo",
                "base": {
                    "name": "Base Package",
                    "tagline": "Data I/O · Preprocessing · Visualization",
                    "desc": "Everything you need to import, clean and visualize measurement data — the foundation of every installation.",
                    "features": [
                        "Data import & export (CSV, MPAI)",
                        "Out-of-core preprocessing engine",
                        "Multi-channel time-series visualization",
                        "Automated PDF / HTML reports",
                        "Windows 10/11 desktop app"
                    ]
                },
                "groups": {
                    "filters": { "name": "Signal Filters", "desc": "FIR / IIR digital filtering, smoothing, differentiation and integration with mathematically correct boundary handling." },
                    "analysis": { "name": "Frequency & Statistics", "desc": "FFT, PSD, octave spectra and statistical analysis of signals in the frequency and time domains." },
                    "vibration": { "name": "Vibration & Structural", "desc": "Machinery diagnostics, modal analysis, rotor dynamics, order tracking and shock response." },
                    "acoustics": { "name": "Acoustics & NVH", "desc": "Sound level, sound power, octave bands and perceptual sound-quality metrics." },
                    "control": { "name": "Control & Mechatronics", "desc": "PID loop analysis, stability margins, system identification and navigation / IMU fusion." },
                    "electrical": { "name": "Electrical & Power", "desc": "Power quality, harmonics, motor current signature analysis and drive diagnostics." },
                    "materials": { "name": "Materials & Durability", "desc": "Fatigue, damage accumulation, strain / stress rosettes and lubrication / tribology." },
                    "thermofluids": { "name": "Thermodynamics & Fluids", "desc": "Combustion cycles, gas exchange, heat transfer and fluid-dynamics analysis." },
                    "vehicle": { "name": "Vehicle & Powertrain", "desc": "Vehicle-level powertrain and chassis test analysis modules." }
                },
                "ml": {
                    "name": "ML Suite",
                    "desc": "Machine-learning tools for fault detection, anomaly diagnosis and predictive-maintenance studies, starting with bearing faults."
                },
                "ai": {
                    "name": "AI Assistant",
                    "desc": "Ask questions, run analysis tools and prepare reports with an optional AI assistant. Choose compatible local models or supported cloud providers; local model requirements vary."
                },
                "enterpriseFeatures": [
                    "Offline use with a local model (Local Only Mode)",
                    "Specific data formats",
                    "Team-wide pilot"
                ]
            },
            "knowledge": {
                "title": "Knowledge Base & Theory",
                "subtitle": "Dive deep into the science behind vibration, acoustics, and signal processing.",
                "cta": {
                    "title": "Want to see these theories in action?",
                    "subtitle": "MachinePulseAI automatically calculates and applies these concepts to your gigabytes of raw data in seconds."
                },
                "topics": {
                    "fft": {
                        "title": "Fast Fourier Transform (FFT)",
                        "desc": "The cornerstone of signal processing. FFT converts time-domain signals into frequency-domain spectra, allowing engineers to identify specific resonant frequencies, harmonics, and structural faults that are invisible in raw time data."
                    },
                    "order": {
                        "title": "Order Tracking",
                        "desc": "Essential for rotating machinery analysis. Instead of analyzing data against time or absolute frequency, Order Tracking relates vibration and noise to the rotational speed (RPM) of the machine, making it perfect for run-up and coast-down tests."
                    },
                    "filtering": {
                        "title": "Digital Filtering",
                        "desc": "Removing unwanted noise from signals using advanced IIR and FIR filters (such as Butterworth, Chebyshev). Filtering isolates the frequency bands of interest, ensuring that analyses focus only on relevant phenomena."
                    },
                    "envelope": {
                        "title": "Envelope Analysis",
                        "desc": "Also known as amplitude demodulation, this technique is widely used for early detection of roller bearing faults and gear defects. It isolates repetitive impacts hidden within high-frequency structural resonances."
                    },
                    "acoustics": {
                        "title": "Acoustic & Sound Quality",
                        "desc": "Beyond pure decibel measurements, acoustic analysis involves calculating metrics like Loudness, Sharpness, and Tonality to understand how humans perceive the sound generated by a product."
                    }
                }
            }
        }
    },
    tr: {
        translation: {
            "site": SITE_MARKETING.tr,
            "caseStudies": CASE_STUDIES.tr,
            "fftLearn": FFT_LEARNING_TRANSLATIONS.tr,
            "fftTheory": FFT_THEORY_TRANSLATIONS.tr,
            "fftBeginner": FFT_BEGINNER_TRANSLATIONS.tr,
            "rotorLearn": ROTOR_DYNAMICS_LEARNING_TRANSLATIONS.tr,
            "vibrationLearn": VIBRATION_LEARNING_TRANSLATIONS.tr,
            "widgetLearn": WIDGET_LEARNING_TRANSLATIONS.tr,
            "nav": {
                "platform": "Platform",
                "product": "Ürün",
                "features": "Özellikler",
                "howItWorks": "Nasıl Çalışır",
                "agenticArch": "Mimari",
                "solutions": "Çözümler",
                "industries": "Sektörler",
                "pricing": "Paketler",
                "resources": "Kaynaklar",
                "knowledgeBase": "Bilgi Bankası",
                "widgets": "Modül Kütüphanesi",
                "getDemo": "Demo İste"
            },
            "home": {
                "featuresViewAll": "Ürünün tamamını keşfedin",
                "industriesViewAll": "Tüm sektörleri görün",
                "whyTitle": "Neden MachinePulseAI",
                "whySubtitle": "Modern test ve ölçüm verilerinin ölçeği için tasarlanmış temel kabiliyetler.",
                "why": {
                    "ai": { "title": "Yerleşik AI Asistanı", "desc": "Veri setlerini doğal dille sorgulayın, analiz hatlarını yapılandırın ve kurumsal hafızaya erişin; deterministik C++ çekirdeği matematiksel kesinliği korur." },
                    "scale": { "title": "Devasa veri, mütevazı donanım", "desc": "Bellek-dışı MPAI motoru diskten sınırlı pencereler okur. Min-Max görselleştirme, kanalların tamamını RAM’e yüklemeden sinyal tepe değerlerini korur." },
                    "secure": { "title": "AI’ın nerede çalışacağını seçin", "desc": "Kayıtlı veri analizi yerel çalışır. Uyumlu yerel modelleri veya desteklenen bulut sağlayıcılarını seçin; Local Only Mode bulut model sağlayıcılarını engeller." }
                },
                "problem": {
                    "eyebrow": "Sorun",
                    "title": "Mühendislik verisi, onu analiz eden araçlardan daha hızlı büyüyor",
                    "desc": "Yüksek örnekleme frekanslı çok kanallı kayıtlar, yorucu dosya dönüşümleri ve bellek yetersizliğinden kilitlenen analiz araçları. MachinePulseAI, ham ölçüm verisini doğrudan disk üzerinden sıfır-kopyalama mimarisiyle işler."
                }
            },
            "appShowcase": {
                "eyebrow": "Gerçek Uygulama",
                "title": "Görsel Mühendislik Çalışma Alanı",
                "subtitle": "Düğüm-grafiği (node-graph) tabanlı analiz ortamı: Veri girişlerini, filtreleri ve tanılama modüllerini görsel veri akış hatlarına bağlayın; senkronize çok kanallı grafiklerle sonuçları inceleyin.",
                "windowTitle": "Çalışma Alanı",
                "alt": "MachinePulseAI ana penceresi: düğüm-grafiği analiz hattı ve yapay zeka asistanı paneli",
                "caption": "MachinePulseAI masaüstü arayüzü: görsel analiz hattı tuvali, modül paleti, senkronize grafikler ve yerel analiz asistanı."
            },
            "widgets": {
                "eyebrow": "Teknik Kütüphane",
                "title": "Mühendislik Modül Kütüphanesi",
                "subtitle": "{{count}} kullanıma hazır modül; teori, giriş kanalları, formüller, işlem adımları ve üretilen çıktılarla açıklanır — veri içe aktarmadan sinyal filtrelemeye, titreşim ve yapısal tanılamaya kadar. İleriki sürümlerde gelecek modüller etiketlenmiştir.",
                "searchPlaceholder": "Modül, teori veya sinyal ara…",
                "allCategories": "Tümü",
                "allModules": "Tüm Modüller",
                "categoriesTitle": "Kategoriler",
                "viewMode": "Görünüm",
                "gridView": "Kart",
                "listView": "Liste",
                "modulesCount": "modül",
                "clearSearch": "Aramayı temizle",
                "readyModules": "kullanıma hazır",
                "quickBadges": {
                    "modules": "{{count}} Kullanıma Hazır Modül",
                    "theory": "Matematiksel Teori & Formüller",
                    "workflows": "Ölçüm İş Akışları"
                },
                "learnMore": "Teoriyi öğren",
                "hide": "Gizle",
                "viewDetail": "Detaylı Öğren",
                "expandGroup": "{{group}} widgetlarını göster",
                "collapseGroup": "{{group}} widgetlarını gizle",
                "futureBadge": "İleride gelecek",
                "futureNote": "Uygulamanın ileriki bir sürümünde gelecek; mevcut sürümde kullanılamaz.",
                "noResults": "Aramanızla eşleşen modül yok.",
                "detail": {
                    "back": "Widget kütüphanesine dön",
                    "eyebrow": "Detaylı İnceleme",
                    "inputsTitle": "Neyi Kullanır",
                    "channelsTitle": "Giriş Kanalları",
                    "channelsSubtitle": "Analizin tam olarak hangi test-verisi kanallarını kullandığı ve her birinin nasıl kullanıldığı.",
                    "controlsTitle": "Kontroller ve Ayarlar",
                    "controlsSubtitle": "Her butonun, seçicinin ve giriş alanının neyi değiştirdiği — ve neyi değiştirmediği.",
                    "formulasTitle": "Temel Formüller",
                    "assumptionsTitle": "Mühendislik Varsayımları",
                    "pipelineTitle": "İşlem Hattı",
                    "examplesTitle": "Örnek Sonuç Okuması",
                    "stepsTitle": "Nasıl Çalışır",
                    "outputsTitle": "Üretilen Çıktılar"
                }
            },
            "hero": {
                "badge": "Erken Erişim Açık",
                "title1": "Test ve ölçüm verilerinizi",
                "title2": "tek yerde analiz edin",
                "subtitle": "MachinePulseAI, kaydedilmiş test verilerini içe aktarmadan rapora kadar tek çalışma alanında işleyen bir Windows mühendislik analiz uygulamasıdır. Filtreleme, FFT ve spektrum, order tracking, rotor dinamiği ve modal analiz gibi modülleri görsel bir iş akışında birbirine bağlayabilirsiniz. İsteğe bağlı yapay zekâ asistanıyla verileriniz hakkında soru sorabilir ve bulguların hangi ölçümlere dayandığını inceleyebilirsiniz.",
                "ctaPrimary": "Demo İste",
                "ctaSecondary": "Kısa Tanıtımı İzle"
            },
            "contact": {
                "subtitle": "Formu doldurun; yanıt e-postayla gelir.",
                "form": {
                    "name": "Ad Soyad *",
                    "company": "Kurum (isteğe bağlı)",
                    "email": "E-posta *",
                    "submit": "Talebi Gönder",
                    "sending": "Gönderiliyor...",
                    "privacy": "Spam yok. Bilgileriniz yalnızca bu talebe yanıt vermek için kullanılır."
                },
                "success": {
                    "title": "Talep gönderildi!",
                    "message": "Talebiniz alındı. Yanıt e-postayla gelecek.",
                    "close": "Kapat"
                },
                "error": "Talebiniz gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
            },
            "footer": {
                "tagline": "Büyük ölçekli mühendislik test ve sensör verileri için yüksek başarımlı analiz ve tanılama platformu."
            },
            "features": {
                "eyebrow": "Platform Özellikleri",
                "title": "Mühendisler İçin Tasarlandı",
                "subtitle": "Her özellik, endüstriyel veri analizinin gerçek zorluklarının üstesinden gelmek için optimize edilmiştir."
            },
            "howItWorks": {
                "eyebrow": "Nasıl Çalışır",
                "titleBefore": "Ham veriden içgörüye",
                "titleHighlight": "dakikalar içinde",
                "subtitle": "Ham ölçüm kayıtlarından doğrulanmış mühendislik raporlarına giden süreci kısaltın. Bellek-dışı işleme ve standartlaştırılmış hatlar sayesinde bellek darboğazları ortadan kalkar, ekipler doğrudan mühendislik kararlarına odaklanır."
            },
            "targets": {
                "eyebrow": "Hedef Pazarlar",
                "title": "Yüksek riskli mühendislik için tasarlandı",
                "subtitle": "Veri doğruluğu, hız ve güvenliğin kritik olduğu sektörlerdeki mühendisler için tasarlandı."
            },
            "agenticArch": {
                "eyebrow": "Akıllı Mühendislik Asistanı",
                "titleBefore": "Platformda",
                "titleHighlight": "yerleşik bir AI Agent",
                "subtitle": "Sorular, analiz adımları ve raporlar için isteğe bağlı asistan. Desteklenen bir bulut sağlayıcısını veya uyumlu yerel modeli seçin. Local Only Mode bulut model sağlayıcılarını engeller."
            },
            "cta": {
                "label": "Erken Erişim Şimdi Açık",
                "titleBefore": "Bugün",
                "titleHighlight": "daha akıllı",
                "titleAfter": "analiz etmeye başlayın",
                "subtitle": "Savunma, havacılık, enerji ve otomotiv sektörlerindeki test ve değerlendirme ekipleri için tasarlandı. Teknik ürün demosu talep edin.",
                "primaryCta": "Demo İste",
                "secondaryCta": "Ekiple Görüşün",
                "trustLine": "Windows 10/11 · Kayıtlı veri analizi · Yerel veya bulut AI seçenekleri"
            },
            "pricing": {
                "eyebrow": "Paketler ve Modüller",
                "title": "İhtiyacınız olan platformu oluşturun",
                "subtitle": "Baz paketle başlayın, ardından iş akışınıza uyan widget gruplarını ve zeka modüllerini ekleyin. Erken erişim döneminde deneme kapsamını birlikte belirlemek için yazın.",
                "baseLabel": "Her Zaman Dahil",
                "addonLabel": "İsteğe Bağlı Modül",
                "includedHeading": "Baz Paket",
                "includedTagline": "Her kurulumun temeli.",
                "addonsHeading": "Eklenti Modülleri",
                "addonsTagline": "Platformu analiz grupları ve zeka modülleriyle genişletin.",
                "selectCta": "Erken Erişim İste",
                "enterpriseTitle": "Ekip ve kapalı ağ kullanımı",
                "enterpriseBadge": "Görüşelim",
                "enterpriseDesc": "Çevrimdışı ya da kapalı ağda çalışmanız, belirli bir veri formatını okumanız veya uygulamayı ekipçe denemeniz mi gerekiyor? Kurulumunuzu anlatın; pilot kullanımın kapsamını birlikte belirleyelim.",
                "enterpriseCta": "Demo İste",
                "base": {
                    "name": "Baz Paket",
                    "tagline": "Veri Giriş/Çıkış · Ön İşleme · Görselleştirme",
                    "desc": "Ölçüm verisini içe aktarmak, temizlemek ve görselleştirmek için gereken her şey — her kurulumun temelidir.",
                    "features": [
                        "Veri içe/dışa aktarma (CSV, MPAI)",
                        "Bellek-dışı (out-of-core) ön işleme motoru",
                        "Çok-kanallı zaman serisi görselleştirme",
                        "Otomatik PDF / HTML raporları",
                        "Windows 10/11 masaüstü uygulaması"
                    ]
                },
                "groups": {
                    "filters": { "name": "Sinyal Filtreleri", "desc": "Matematiksel olarak doğru sınır işleme ile FIR / IIR dijital filtreleme, yumuşatma, türev ve integral." },
                    "analysis": { "name": "Frekans ve İstatistik", "desc": "Frekans ve zaman düzleminde FFT, PSD, oktav spektrumları ve istatistiksel sinyal analizi." },
                    "vibration": { "name": "Titreşim ve Yapısal", "desc": "Makine tanılaması, modal analiz, rotor dinamiği, order tracking ve şok tepki analizi." },
                    "acoustics": { "name": "Akustik ve NVH", "desc": "Ses seviyesi, ses gücü, oktav bantları ve algısal ses-kalitesi metrikleri." },
                    "control": { "name": "Kontrol ve Mekatronik", "desc": "PID döngü analizi, kararlılık marjları, sistem tanımlama ve navigasyon / IMU füzyonu." },
                    "electrical": { "name": "Elektrik ve Güç", "desc": "Güç kalitesi, harmonikler, motor akım imza analizi ve sürücü tanılaması." },
                    "materials": { "name": "Malzeme ve Dayanıklılık", "desc": "Yorulma, hasar birikimi, gerinim / gerilme rozetleri ve yağlama / triboloji." },
                    "thermofluids": { "name": "Termodinamik ve Akışkanlar", "desc": "Yanma çevrimleri, gaz değişimi, ısı transferi ve akışkanlar dinamiği analizi." },
                    "vehicle": { "name": "Araç ve Güç Aktarma", "desc": "Araç seviyesinde güç aktarma ve şasi test analizi modülleri." }
                },
                "ml": {
                    "name": "ML Paketi",
                    "desc": "Rulman arızalarından başlayarak arıza tespiti, anomali tanılama ve kestirimci bakım çalışmaları için makine öğrenmesi araçları."
                },
                "ai": {
                    "name": "AI Asistanı",
                    "desc": "İsteğe bağlı AI asistanıyla soru sorun, analiz araçlarını çalıştırın ve rapor hazırlayın. Uyumlu yerel modelleri veya desteklenen bulut sağlayıcılarını seçin; yerel model gereksinimleri değişir."
                },
                "enterpriseFeatures": [
                    "Yerel modelle çevrimdışı kullanım (Local Only Mode)",
                    "Belirli veri formatları",
                    "Ekip çapında pilot kullanım"
                ]
            },
            "knowledge": {
                "title": "Bilgi Bankası ve Teori",
                "subtitle": "Titreşim, akustik ve sinyal işlemenin arkasındaki bilimi derinlemesine inceleyin.",
                "cta": {
                    "title": "Bu teorileri iş başında görmek ister misiniz?",
                    "subtitle": "MachinePulseAI bu kavramları gigabaytlarca ham verinize saniyeler içinde otomatik olarak hesaplayıp uygular."
                },
                "topics": {
                    "fft": {
                        "title": "Hızlı Fourier Dönüşümü (FFT)",
                        "desc": "Sinyal işlemenin temel taşı. FFT, zaman düzlemindeki sinyalleri frekans spektrumlarına dönüştürerek, mühendislerin ham zaman verilerinde görünmeyen spesifik rezonans frekanslarını, harmonikleri ve yapısal hataları tespit etmelerini sağlar."
                    },
                    "order": {
                        "title": "Order Tracking",
                        "desc": "Dönen makine analizi için kritik bir yöntemdir. Veriyi zaman veya mutlak frekans yerine makinenin dönüş hızına (RPM) bağlar. Özellikle motorların hızlanma (run-up) ve yavaşlama (coast-down) testlerinde kullanılır."
                    },
                    "filtering": {
                        "title": "Dijital Filtreleme",
                        "desc": "Gelişmiş IIR ve FIR filtreleri (Butterworth, Chebyshev vb.) kullanarak sinyallerden istenmeyen gürültüleri temizler. Filtreleme, yalnızca ilgili frekans bantlarını izole ederek analizlerin doğru fenomenlere odaklanmasını sağlar."
                    },
                    "envelope": {
                        "title": "Zarf Analizi (Envelope Analysis)",
                        "desc": "Genlik demodülasyonu olarak da bilinen bu teknik, rulman hataları ve dişli kusurlarının erken tespiti için yaygın olarak kullanılır. Yüksek frekanslı yapısal rezonansların içinde gizlenmiş tekrarlayan darbeleri ortaya çıkarır."
                    },
                    "acoustics": {
                        "title": "Akustik ve Ses Kalitesi",
                        "desc": "Sadece desibel ölçümünün ötesinde, bir ürünün ürettiği sesin insanlar tarafından nasıl algılandığını anlamak için Gürlük (Loudness), Keskinlik (Sharpness) ve Tonalite gibi metriklerin hesaplanmasını içerir."
                    }
                }
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'tr',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
