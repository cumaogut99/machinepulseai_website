import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Çeviri metinleri
const resources = {
    en: {
        translation: {
            "nav": {
                "platform": "Platform",
                "product": "Product",
                "features": "Features",
                "howItWorks": "How It Works",
                "agenticArch": "Architecture",
                "solutions": "Solutions",
                "industries": "Industries",
                "pricing": "Pricing",
                "resources": "Resources",
                "knowledgeBase": "Knowledge Base",
                "widgets": "Analysis Modules",
                "contactSales": "Contact Sales",
                "getDemo": "Get a Demo"
            },
            "home": {
                "featuresViewAll": "Explore the full product",
                "industriesViewAll": "See all industries",
                "whyTitle": "Why MachinePulseAI",
                "whySubtitle": "Three things legacy post-processing tools can't give you.",
                "why": {
                    "ai": { "title": "Built-in AI Assistant", "desc": "Ask questions in plain language and get data-driven answers — no SQL, no scripting." },
                    "scale": { "title": "Massive data, modest hardware", "desc": "Out-of-core engine analyzes 100 GB+ datasets on an 8 GB laptop without RAM errors." },
                    "secure": { "title": "Fully offline & secure", "desc": "Runs air-gapped with no cloud dependency — built for classified and sensitive environments." }
                },
                "problem": {
                    "eyebrow": "The Problem",
                    "title": "Engineering data is growing faster than the tools to analyze it",
                    "desc": "Gigabytes of sensor data, hours of manual preparation, and legacy tools that choke on large files. MachinePulseAI turns raw measurement data into insight in minutes — not days."
                }
            },
            "appShowcase": {
                "eyebrow": "The Real Application",
                "title": "This Is MachinePulseAI",
                "subtitle": "A visual node-graph workspace: drag widgets onto the canvas, wire them together, and let the built-in AI assistant run the analysis. This is the actual application, not a mockup.",
                "windowTitle": "Workspace",
                "alt": "MachinePulseAI main window showing a node-graph analysis pipeline with an AI assistant panel",
                "caption": "Early prototype of the main workspace — node-graph pipeline, widget palette, output log and AI assistant."
            },
            "widgets": {
                "eyebrow": "Module Library",
                "title": "Every Widget, Explained",
                "subtitle": "{{count}}+ analysis modules — from data import and signal filtering to advanced vibration, acoustic and engineering diagnostics. Click any card to learn the theory behind it.",
                "searchPlaceholder": "Search widgets…",
                "allCategories": "All",
                "learnMore": "Learn the theory",
                "hide": "Hide",
                "viewDetail": "Detailed breakdown",
                "plannedBadge": "Planned",
                "noResults": "No widgets match your search.",
                "detail": {
                    "back": "Back to widget library",
                    "eyebrow": "Deep Dive",
                    "inputsTitle": "What It Uses",
                    "channelsTitle": "Input Channels",
                    "channelsSubtitle": "Exactly which test-data channels the analysis consumes, and how each one is used.",
                    "formulasTitle": "Core Formulas",
                    "pipelineTitle": "Processing Pipeline",
                    "stepsTitle": "How It Works",
                    "outputsTitle": "Outputs Produced"
                }
            },
            "hero": {
                "badge": "🚀 Now in Beta",
                "title1": "Engineering Data,",
                "title2": "Reborn.",
                "subtitle": "High-performance post-processing analysis platform for vibration, acoustic & test data — handle massive datasets with minimal RAM, maximum insight.",
                "ctaPrimary": "Request a Demo",
                "ctaSecondary": "See It Live",
                "stats": {
                    "beta": "Beta Access",
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
                "tagline": "Pioneering the next era of industrial analytics."
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
                "subtitle": "What used to take hours of manual data preparation now takes a few clicks. The AI handles the heavy lifting so engineers can focus on decisions, not spreadsheets."
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
                "subtitle": "A fully integrated ML + LLM + RAG system that understands your measurement data — and your organization's engineering history."
            },
            "cta": {
                "label": "Early Access Now Open",
                "titleBefore": "Start analyzing",
                "titleHighlight": "smarter",
                "titleAfter": "today",
                "subtitle": "Built for engineers in defense, aerospace, and automotive organizations. Request a demo and see MachinePulseAI in action.",
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
            "nav": {
                "platform": "Platform",
                "product": "Ürün",
                "features": "Özellikler",
                "howItWorks": "Nasıl Çalışır",
                "agenticArch": "Mimari",
                "solutions": "Çözümler",
                "industries": "Sektörler",
                "pricing": "Fiyatlandırma",
                "resources": "Kaynaklar",
                "knowledgeBase": "Bilgi Bankası",
                "widgets": "Analiz Modülleri",
                "contactSales": "Satışla İletişim",
                "getDemo": "Demo İste"
            },
            "home": {
                "featuresViewAll": "Ürünün tamamını keşfedin",
                "industriesViewAll": "Tüm sektörleri görün",
                "whyTitle": "Neden MachinePulseAI",
                "whySubtitle": "Eski son-işleme araçlarının veremediği üç şey.",
                "why": {
                    "ai": { "title": "Yerleşik AI Asistanı", "desc": "Sorularınızı sade bir dille sorun, veriye dayalı yanıtlar alın — SQL yok, kod yok." },
                    "scale": { "title": "Devasa veri, mütevazı donanım", "desc": "Bellek-dışı motor, 100 GB+ veri setlerini 8 GB dizüstünde RAM hatası olmadan analiz eder." },
                    "secure": { "title": "Tamamen çevrimdışı ve güvenli", "desc": "Bulut bağımlılığı olmadan hava-boşluklu çalışır — gizli ve hassas ortamlar için tasarlandı." }
                },
                "problem": {
                    "eyebrow": "Sorun",
                    "title": "Mühendislik verisi, onu analiz eden araçlardan daha hızlı büyüyor",
                    "desc": "Gigabaytlarca sensör verisi, saatlerce manuel hazırlık ve büyük dosyalarda tıkanan eski araçlar. MachinePulseAI ham ölçüm verisini günler değil, dakikalar içinde içgörüye dönüştürür."
                }
            },
            "appShowcase": {
                "eyebrow": "Gerçek Uygulama",
                "title": "İşte MachinePulseAI",
                "subtitle": "Görsel bir düğüm-grafiği (node-graph) çalışma alanı: widget'ları tuvale sürükleyin, birbirine bağlayın ve yerleşik yapay zeka asistanının analizi çalıştırmasına izin verin. Bu, bir maket değil, uygulamanın kendisidir.",
                "windowTitle": "Çalışma Alanı",
                "alt": "MachinePulseAI ana penceresi: düğüm-grafiği analiz hattı ve yapay zeka asistanı paneli",
                "caption": "Ana çalışma alanının erken prototipi — düğüm-grafiği hattı, widget paleti, çıktı kaydı ve yapay zeka asistanı."
            },
            "widgets": {
                "eyebrow": "Modül Kütüphanesi",
                "title": "Her Widget, Açıklamasıyla",
                "subtitle": "{{count}}+ analiz modülü — veri içe aktarmadan sinyal filtrelemeye, gelişmiş titreşim, akustik ve mühendislik tanılamasına kadar. Arkasındaki teoriyi öğrenmek için herhangi bir karta tıklayın.",
                "searchPlaceholder": "Widget ara…",
                "allCategories": "Tümü",
                "learnMore": "Teoriyi öğren",
                "hide": "Gizle",
                "viewDetail": "Detaylı İncele",
                "plannedBadge": "Planlanıyor",
                "noResults": "Aramanızla eşleşen widget yok.",
                "detail": {
                    "back": "Widget kütüphanesine dön",
                    "eyebrow": "Detaylı İnceleme",
                    "inputsTitle": "Neyi Kullanır",
                    "channelsTitle": "Giriş Kanalları",
                    "channelsSubtitle": "Analizin tam olarak hangi test-verisi kanallarını kullandığı ve her birinin nasıl kullanıldığı.",
                    "formulasTitle": "Temel Formüller",
                    "pipelineTitle": "İşlem Hattı",
                    "stepsTitle": "Nasıl Çalışır",
                    "outputsTitle": "Üretilen Çıktılar"
                }
            },
            "hero": {
                "badge": "🚀 Şimdi Beta'da",
                "title1": "Mühendislik Verisi,",
                "title2": "Yeniden Doğdu.",
                "subtitle": "Titreşim, akustik ve test verileri için yüksek performanslı son işleme (post-processing) analiz platformu — devasa veri setlerini minimum RAM ile maksimum içgörüyle yönetin.",
                "ctaPrimary": "Demo İste",
                "ctaSecondary": "Canlı İncele",
                "stats": {
                    "beta": "Beta Erişimi",
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
                "tagline": "Endüstriyel analitiğin yeni çağına öncülük ediyoruz."
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
                "subtitle": "Eskiden saatler süren manuel veri hazırlığı artık birkaç tıklamayla yapılıyor. Yapay zeka ağır işi üstleniyor, böylece mühendisler tablolarla değil kararlarla ilgilenebiliyor."
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
                "subtitle": "Ölçüm verinizi — ve kurumunuzun mühendislik geçmişini — anlayan, tam entegre bir ML + LLM + RAG sistemi."
            },
            "cta": {
                "label": "Erken Erişim Şimdi Açık",
                "titleBefore": "Bugün",
                "titleHighlight": "daha akıllı",
                "titleAfter": "analiz etmeye başlayın",
                "subtitle": "Savunma, havacılık ve otomotiv kuruluşlarındaki mühendisler için tasarlandı. Demo isteyin ve MachinePulseAI'ı iş başında görün.",
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