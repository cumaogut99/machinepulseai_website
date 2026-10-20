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
                    "scale": { "title": "Massive data, modest hardware", "desc": "Out-of-core memory architecture analyzes 200 GB+ datasets on standard workstations under a strict <1 GB RAM footprint." },
                    "secure": { "title": "Fully offline & secure", "desc": "Runs completely air-gapped with zero cloud dependency — engineered for defense, aerospace, and confidential test environments." }
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
                "subtitle": "{{count}}+ modules with theory, input channels, formulas, processing steps and produced outputs — from data import and signal filtering to vibration, acoustic and engineering diagnostics.",
                "searchPlaceholder": "Search widgets…",
                "allCategories": "All",
                "learnMore": "Learn the theory",
                "hide": "Hide",
                "viewDetail": "Learn in detail",
                "expandGroup": "Show {{group}} widgets",
                "collapseGroup": "Hide {{group}} widgets",
                "plannedBadge": "Planned",
                "comingSoonBadge": "Coming soon",
                "comingSoonNote": "Coming in the next release",
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
                "title1": "Engineering Analysis",
                "title2": "for Large Measurement Data",
                "subtitle": "Import CSV, TDMS, MDF/MF4, Parquet and MPAI test data into one workspace; analyze 200 GB+ files with low memory use across vibration, acoustics, power and machine diagnostics.",
                "ctaPrimary": "Request a Demo",
                "ctaSecondary": "See the App",
                "stats": {
                    "files": "200 GB+ files",
                    "os": "Windows 10/11",
                    "ram": "Runs on 8 GB RAM"
                }
            },
            "contact": {
                "title": "See MachinePulseAI in action",
                "subtitle": "Fill in the form and we'll reach out within 1 business day.",
                "badge": "Request a Demo",
                "form": {
                    "name": "Full Name *",
                    "company": "Company *",
                    "email": "Work Email *",
                    "message": "What are you analyzing?",
                    "messagePlaceholder": "e.g. vibration data from turbine test rigs, 200 kHz DAQ files...",
                    "submit": "Send Request",
                    "sending": "Sending...",
                    "privacy": "No spam. We only use your info to respond to this request."
                },
                "success": {
                    "title": "Request sent!",
                    "message": "We have received your demo request. We'll get back to you within 1 business day.",
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
                "subtitle": "An integrated offline assistant and machine learning suite: accelerate pipeline setup, detect machinery anomalies, and query past test archives without cloud connectivity."
            },
            "cta": {
                "label": "Early Access Now Open",
                "titleBefore": "Start analyzing",
                "titleHighlight": "smarter",
                "titleAfter": "today",
                "subtitle": "Engineered for test and evaluation teams across defense, aerospace, energy, and automotive industries. Request a technical demonstration.",
                "primaryCta": "Request a Demo",
                "secondaryCta": "Talk to the Team",
                "trustLine": "Windows 10/11 · Minimum 8 GB RAM · No internet required"
            },
            "pricing": {
                "eyebrow": "Packages & Modules",
                "title": "Build the platform you need",
                "subtitle": "Start with the base package, then add the widget groups and intelligence modules that fit your workflow. Contact us for a tailored quote.",
                "baseLabel": "Always Included",
                "addonLabel": "Optional Module",
                "includedHeading": "Base Package",
                "includedTagline": "The foundation — included in every license.",
                "addonsHeading": "Add-on Modules",
                "addonsTagline": "Extend the platform with analysis groups and intelligence modules.",
                "selectCta": "Request a Quote",
                "enterpriseTitle": "Enterprise & Defense",
                "enterpriseBadge": "Custom Quote",
                "enterpriseDesc": "Full platform access with on-site deployment, custom integrations, unlimited seats, and NDA-covered offline LLM setup for classified or air-gapped environments.",
                "enterpriseCta": "Request a Demo",
                "datasheetCta": "Download Datasheet",
                "base": {
                    "name": "Base Package",
                    "tagline": "Data I/O · Preprocessing · Visualization",
                    "desc": "Everything you need to import, clean and visualize measurement data — included in every license.",
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
                    "vibration": { "name": "Vibration & Structural", "desc": "Machinery diagnostics, modal analysis, rotor dynamics, order tracking and structural health." },
                    "acoustics": { "name": "Acoustics & NVH", "desc": "Sound level, sound power, octave bands and perceptual sound-quality metrics." },
                    "control": { "name": "Control & Mechatronics", "desc": "PID loop analysis, stability margins, system identification and navigation / IMU fusion." },
                    "electrical": { "name": "Electrical & Power", "desc": "Power quality, harmonics, motor current signature analysis and drive diagnostics." },
                    "materials": { "name": "Materials & Durability", "desc": "Fatigue, damage accumulation, strain / stress rosettes and lubrication / tribology." },
                    "thermofluids": { "name": "Thermodynamics & Fluids", "desc": "Combustion cycles, gas exchange, heat transfer and fluid-dynamics analysis." },
                    "vehicle": { "name": "Vehicle & Powertrain", "desc": "Vehicle-level powertrain and chassis test analysis modules." }
                },
                "ml": {
                    "name": "ML Suite",
                    "desc": "Production-grade machine learning for fault detection, anomaly diagnosis and predictive maintenance, with validated bearing-fault models."
                },
                "ai": {
                    "name": "AI Assistant",
                    "desc": "A natural-language interface (LLM + RAG) — ask questions in plain language and get data-driven answers. Fully offline, no cloud."
                },
                "enterpriseFeatures": [
                    "All modules included — unlimited seats",
                    "On-site deployment & hands-on training",
                    "Custom API & data format integrations",
                    "Classified / air-gapped LLM configuration",
                    "Dedicated SLA & priority support"
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
                    "scale": { "title": "Devasa veri, mütevazı donanım", "desc": "Bellek-dışı (out-of-core) motor, 200 GB+ veri setlerini standart iş istasyonlarında 1 GB altı RAM kullanımıyla kesintisiz işler." },
                    "secure": { "title": "Tamamen çevrimdışı ve güvenli", "desc": "Bulut bağımlılığı olmadan tamamen hava-boşluklu (air-gapped) çalışır — savunma, havacılık ve gizlilik dereceli test ortamları için tasarlanmıştır." }
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
                "subtitle": "{{count}}+ modül; teori, giriş kanalları, formüller, işlem adımları ve üretilen çıktılarla açıklanır — veri içe aktarmadan sinyal filtrelemeye, titreşim, akustik ve mühendislik tanılamasına kadar.",
                "searchPlaceholder": "Widget ara…",
                "allCategories": "Tümü",
                "learnMore": "Teoriyi öğren",
                "hide": "Gizle",
                "viewDetail": "Detaylı Öğren",
                "expandGroup": "{{group}} widgetlarını göster",
                "collapseGroup": "{{group}} widgetlarını gizle",
                "plannedBadge": "Planlanıyor",
                "comingSoonBadge": "Yakında",
                "comingSoonNote": "Bir sonraki sürümde geliyor",
                "noResults": "Aramanızla eşleşen widget yok.",
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
                "title1": "Büyük Ölçüm Verileri İçin",
                "title2": "Mühendislik Analiz Platformu",
                "subtitle": "CSV, TDMS, MDF/MF4, Parquet ve MPAI test verilerini tek çalışma alanında içe aktarın; 200 GB+ dosyaları düşük bellek kullanımıyla titreşim, akustik, güç ve makine tanılama iş akışlarında analiz edin.",
                "ctaPrimary": "Demo İste",
                "ctaSecondary": "Uygulamayı Gör",
                "stats": {
                    "files": "200 GB+ dosya",
                    "os": "Windows 10/11",
                    "ram": "8 GB RAM'de Çalışır"
                }
            },
            "contact": {
                "title": "MachinePulseAI'ı iş başında görün",
                "subtitle": "Formu doldurun, size 1 iş günü içinde ulaşalım.",
                "badge": "Demo İste",
                "form": {
                    "name": "Ad Soyad *",
                    "company": "Şirket *",
                    "email": "İş E-postası *",
                    "message": "Neleri analiz ediyorsunuz?",
                    "messagePlaceholder": "Örn: türbin test ünitelerinden titreşim verisi, 200 kHz DAQ dosyaları...",
                    "submit": "Talebi Gönder",
                    "sending": "Gönderiliyor...",
                    "privacy": "Spam yok. Bilgilerinizi sadece bu talebe yanıt vermek için kullanırız."
                },
                "success": {
                    "title": "Talep gönderildi!",
                    "message": "Demo talebinizi aldık. Size 1 iş günü içinde geri döneceğiz.",
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
                "subtitle": "Tamamen çevrimdışı çalışan yapay zeka asistanı ve makine öğrenmesi paketi: analiz hattı kurulumunu hızlandırır, makine anomalilerini tespit eder ve geçmiş test arşivlerini yerel olarak sorgular."
            },
            "cta": {
                "label": "Erken Erişim Şimdi Açık",
                "titleBefore": "Bugün",
                "titleHighlight": "daha akıllı",
                "titleAfter": "analiz etmeye başlayın",
                "subtitle": "Savunma, havacılık, enerji ve otomotiv sektörlerindeki test ve değerlendirme ekipleri için tasarlandı. Teknik ürün demosu talep edin.",
                "primaryCta": "Demo İste",
                "secondaryCta": "Ekiple Görüşün",
                "trustLine": "Windows 10/11 · En az 8 GB RAM · İnternet gerektirmez"
            },
            "pricing": {
                "eyebrow": "Paketler ve Modüller",
                "title": "İhtiyacınız olan platformu oluşturun",
                "subtitle": "Baz paketle başlayın, ardından iş akışınıza uyan widget gruplarını ve zeka modüllerini ekleyin. Size özel teklif için bizimle iletişime geçin.",
                "baseLabel": "Her Zaman Dahil",
                "addonLabel": "İsteğe Bağlı Modül",
                "includedHeading": "Baz Paket",
                "includedTagline": "Temel — her lisansa dahildir.",
                "addonsHeading": "Eklenti Modülleri",
                "addonsTagline": "Platformu analiz grupları ve zeka modülleriyle genişletin.",
                "selectCta": "Teklif İste",
                "enterpriseTitle": "Kurumsal ve Savunma",
                "enterpriseBadge": "Özel Teklif",
                "enterpriseDesc": "Yerinde kurulum, özel entegrasyonlar, sınırsız lisans ve gizli veya hava-boşluklu ortamlar için NDA kapsamında çevrimdışı LLM kurulumuyla tam platform erişimi.",
                "enterpriseCta": "Demo İste",
                "datasheetCta": "Teknik Föyü İndir",
                "base": {
                    "name": "Baz Paket",
                    "tagline": "Veri Giriş/Çıkış · Ön İşleme · Görselleştirme",
                    "desc": "Ölçüm verisini içe aktarmak, temizlemek ve görselleştirmek için gereken her şey — her lisansa dahildir.",
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
                    "vibration": { "name": "Titreşim ve Yapısal", "desc": "Makine tanılaması, modal analiz, rotor dinamiği, order tracking ve yapısal sağlık." },
                    "acoustics": { "name": "Akustik ve NVH", "desc": "Ses seviyesi, ses gücü, oktav bantları ve algısal ses-kalitesi metrikleri." },
                    "control": { "name": "Kontrol ve Mekatronik", "desc": "PID döngü analizi, kararlılık marjları, sistem tanımlama ve navigasyon / IMU füzyonu." },
                    "electrical": { "name": "Elektrik ve Güç", "desc": "Güç kalitesi, harmonikler, motor akım imza analizi ve sürücü tanılaması." },
                    "materials": { "name": "Malzeme ve Dayanıklılık", "desc": "Yorulma, hasar birikimi, gerinim / gerilme rozetleri ve yağlama / triboloji." },
                    "thermofluids": { "name": "Termodinamik ve Akışkanlar", "desc": "Yanma çevrimleri, gaz değişimi, ısı transferi ve akışkanlar dinamiği analizi." },
                    "vehicle": { "name": "Araç ve Güç Aktarma", "desc": "Araç seviyesinde güç aktarma ve şasi test analizi modülleri." }
                },
                "ml": {
                    "name": "ML Paketi",
                    "desc": "Doğrulanmış rulman-arıza modelleriyle arıza tespiti, anomali tanılama ve kestirimci bakım için üretim seviyesinde makine öğrenmesi."
                },
                "ai": {
                    "name": "AI Asistanı",
                    "desc": "Doğal dil arayüzü (LLM + RAG) — sorularınızı sade bir dille sorun, veriye dayalı yanıtlar alın. Tamamen çevrimdışı, bulut yok."
                },
                "enterpriseFeatures": [
                    "Tüm modüller dahil — sınırsız lisans",
                    "Yerinde kurulum ve uygulamalı eğitim",
                    "Özel API ve veri formatı entegrasyonları",
                    "Gizli / hava-boşluklu LLM yapılandırması",
                    "Özel SLA ve öncelikli destek"
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
                        "title": "Sipariş Takibi (Order Tracking)",
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
