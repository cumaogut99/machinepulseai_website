// Lightweight top-level metadata shared by the navbar and full catalog.
// Order mirrors WIDGET_MENU_TREE in the desktop application.

export const WIDGET_CATEGORIES = [
    {
        id: 'data_io',
        accent: '#00f5ff',
        status: 'available',
        en: { name: 'Data I/O', blurb: 'Read, generate, merge and export measurement sources.' },
        tr: { name: 'Veri Giriş/Çıkış', blurb: 'Ölçüm kaynaklarını okuma, üretme, birleştirme ve dışa aktarma.' },
    },
    {
        id: 'preprocessing',
        accent: '#3b82f6',
        status: 'available',
        en: { name: 'Data Preprocessing', blurb: 'Shape, clean, align, scale and calibrate measurement data.' },
        tr: { name: 'Veri Ön İşleme', blurb: 'Ölçüm verisini şekillendirme, temizleme, hizalama, ölçekleme ve kalibre etme.' },
    },
    {
        id: 'filters',
        accent: '#a855f7',
        status: 'available',
        en: { name: 'Signal Filters', blurb: 'Filter, smooth and transform measured signals.' },
        tr: { name: 'Sinyal Filtreleri', blurb: 'Ölçülen sinyalleri filtreleme, yumuşatma ve dönüştürme.' },
    },
    {
        id: 'engineering',
        accent: '#00f5ff',
        status: 'available',
        en: { name: 'Engineering Modules', blurb: 'Domain-specific measurement, dynamics and diagnostic modules.' },
        tr: { name: 'Mühendislik Modülleri', blurb: 'Alan odaklı ölçüm, dinamik ve tanılama modülleri.' },
    },
    {
        id: 'statistics',
        accent: '#3b82f6',
        status: 'available',
        en: { name: 'Statistics', blurb: 'Profile channels, relationships, hypotheses and process capability.' },
        tr: { name: 'İstatistik', blurb: 'Kanalları, ilişkileri, hipotezleri ve proses yeterliliğini inceleme.' },
    },
    {
        id: 'machine_learning',
        accent: '#a855f7',
        status: 'planned',
        en: { name: 'Machine Learning', blurb: 'Visible application placeholders for the planned ML workflow.' },
        tr: { name: 'Makine Öğrenmesi', blurb: 'Planlanan ML iş akışı için uygulamada görünen yer tutucular.' },
    },
    {
        id: 'visualization',
        accent: '#00f5ff',
        status: 'available',
        en: { name: 'Visualization', blurb: 'Interactive time, frequency, distribution and matrix views.' },
        tr: { name: 'Görselleştirme', blurb: 'Etkileşimli zaman, frekans, dağılım ve matris görünümleri.' },
    },
    {
        id: 'reporting',
        accent: '#3b82f6',
        status: 'available',
        en: { name: 'Reporting', blurb: 'Turn connected canvas results into traceable engineering reports.' },
        tr: { name: 'Raporlama', blurb: 'Bağlı canvas sonuçlarını izlenebilir mühendislik raporlarına dönüştürme.' },
    },
    {
        id: 'python_script',
        accent: '#a855f7',
        status: 'available',
        en: { name: 'Python Script', blurb: 'A group-free canvas tool for controlled custom workflow code.' },
        tr: { name: 'Python Script', blurb: 'Denetimli özel iş akışı kodu için grup dışı canvas aracı.' },
    },
]

export default WIDGET_CATEGORIES
