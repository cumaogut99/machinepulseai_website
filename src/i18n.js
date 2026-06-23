import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Çeviri metinleri
const resources = {
    en: {
        translation: {
            "nav": {
                "platform": "Platform",
                "features": "Features",
                "howItWorks": "How It Works",
                "agenticArch": "Architecture",
                "solutions": "Solutions",
                "pricing": "Pricing",
                "resources": "Resources",
                "knowledgeBase": "Knowledge Base",
                "widgets": "Widgets",
                "contactSales": "Contact Sales",
                "getDemo": "Get a Demo"
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
                "plannedBadge": "Planned",
                "noResults": "No widgets match your search."
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
            "knowledge": {
                "title": "Knowledge Base & Theory",
                "subtitle": "Dive deep into the science behind vibration, acoustics, and signal processing.",
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
                "features": "Özellikler",
                "howItWorks": "Nasıl Çalışır",
                "agenticArch": "Mimari",
                "solutions": "Çözümler",
                "pricing": "Fiyatlandırma",
                "resources": "Kaynaklar",
                "knowledgeBase": "Bilgi Bankası",
                "widgets": "Widget'lar",
                "contactSales": "Satışla İletişim",
                "getDemo": "Demo İste"
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
                "plannedBadge": "Planlanıyor",
                "noResults": "Aramanızla eşleşen widget yok."
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
            "knowledge": {
                "title": "Bilgi Bankası ve Teori",
                "subtitle": "Titreşim, akustik ve sinyal işlemenin arkasındaki bilimi derinlemesine inceleyin.",
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