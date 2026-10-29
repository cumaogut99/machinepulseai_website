// MachinePulseAI public module catalog.
//
// Taxonomy source: python/ui/canvas/canvas_menu_data.py::WIDGET_MENU_TREE
// Availability sources: python/ui/factory/widget_specs.py and runtime classes
//
// Release scope: ./widgetRelease.js mirrors python/ui/factory/widget_release.py.
// The website lists every palette leaf, and modules the application defers to
// a later phase carry a `phase` number instead of a learning page.

import { CORE_CONTENT_CATEGORIES } from './widgetCatalog.core.js'
import { ENGINEERING_CATEGORIES } from './widgetCatalog.engineering.js'
import { WIDGET_CATEGORIES } from './widgetCatalog.categories.js'
import { subgroupReleasePhase, widgetReleasePhase } from './widgetRelease.js'

const content = (enName, trName, enSummary, trSummary, enTheory, trTheory) => ({
    en: {
        name: enName,
        summary: enSummary,
        theory: enTheory || enSummary,
    },
    tr: {
        name: trName,
        summary: trSummary,
        theory: trTheory || trSummary,
    },
})

const ADDITIONAL_WIDGETS = {
    sensor_widget: content(
        'Sensor Data',
        'Sensor Data',
        'Connects configured sensor channels to the measurement pipeline.',
        'Yapılandırılmış sensör kanallarını ölçüm hattına bağlar.',
        'This palette entry is reserved for direct sensor-source configuration. Hardware-backed acquisition is still being integrated, so the module is shown as planned.',
        'Bu palet öğesi doğrudan sensör kaynağı yapılandırması için ayrılmıştır. Donanım destekli veri toplama entegrasyonu sürdüğü için modül planlanıyor olarak gösterilir.',
    ),
    ftp_reader: content(
        'FTP/SFTP Reader',
        'FTP/SFTP Reader',
        'Reads remote measurement files from FTP and SFTP locations.',
        'Uzak ölçüm dosyalarını FTP ve SFTP konumlarından okur.',
        'The connector will stream remote files into the same import pipeline used by local measurement files while preserving credentials outside project data.',
        'Bağlayıcı, kimlik bilgilerini proje verisinin dışında tutarak uzak dosyaları yerel ölçüm dosyalarıyla aynı içe aktarma hattına aktaracaktır.',
    ),
    realtime_stream: content(
        'Real-time Stream',
        'Real-time Stream',
        'Receives continuously arriving samples from a live data source.',
        'Canlı bir veri kaynağından sürekli gelen örnekleri alır.',
        'The planned live source will decouple acquisition from rendering through bounded buffers so high-rate producers do not block the user interface.',
        'Planlanan canlı kaynak, yüksek hızlı üreticilerin arayüzü engellememesi için veri toplamayı sınırlı tamponlar üzerinden görüntülemeden ayıracaktır.',
    ),
    merge_channels: content(
        'Dataset Merge',
        'Dataset Merge',
        'Creates a new MPAI by appending datasets or joining strictly aligned channels.',
        'Veri kümelerini art arda ekleyerek veya tam hizalı kanalları birleştirerek yeni bir MPAI oluşturur.',
        'Use row append for repeated runs with the same schema, or channel append when independent sources share a compatible row or time grid. The result is materialized as a new MPAI source so downstream widgets consume one coherent dataset.',
        'Aynı şemadaki tekrarlı koşular için satır eklemeyi, bağımsız kaynaklar uyumlu satır veya zaman ızgarasını paylaştığında kanal eklemeyi kullanın. Sonuç yeni bir MPAI kaynağı olarak oluşturulur ve sonraki widgetlar tek, tutarlı bir veri kümesi tüketir.',
    ),
    time_alignment: content(
        'Time Alignment',
        'Time Alignment',
        'Aligns multiple acquisition sources with manual shifts and a shared crop.',
        'Birden fazla ölçüm kaynağını elle zaman kaydırmaları ve ortak kırpma ile hizalar.',
        'Independent loggers rarely start on exactly the same sample. Time Alignment applies explicit offsets, previews overlap, and crops every selected source to the common interval before combined analysis.',
        'Bağımsız kaydediciler nadiren tam aynı örnekte başlar. Time Alignment açık zaman ofsetleri uygular, örtüşmeyi önizler ve birleşik analizden önce seçilen her kaynağı ortak aralığa kırpar.',
    ),
    sensor_calibration: content(
        'Sensor Calibration',
        'Sensor Calibration',
        'Applies sensor gain, offset and engineering-unit conversion.',
        'Sensör kazancı, ofseti ve mühendislik birimi dönüşümünü uygular.',
        'Calibration converts recorder counts or volts into traceable physical quantities using an affine gain and offset. The derived channel retains its source relationship and engineering unit.',
        'Kalibrasyon, kaydedici sayımlarını veya volt değerlerini doğrusal kazanç ve ofset ile izlenebilir fiziksel büyüklüklere dönüştürür. Türetilmiş kanal kaynak ilişkisini ve mühendislik birimini korur.',
    ),
    data_quality_repair: content(
        'Outlier Detection/Remove',
        'Outlier Detection/Remove',
        'Flags or replaces global Z-score outliers as derived channels.',
        'Global Z-skor aykırı değerlerini işaretler veya türetilmiş kanallarda değiştirir.',
        'A global statistical pass identifies samples whose standardized distance exceeds the selected threshold. Keeping the result as a derived channel preserves the original measurement for comparison and audit.',
        'Global bir istatistik geçişi, standartlaştırılmış uzaklığı seçilen eşiği aşan örnekleri belirler. Sonucun türetilmiş kanal olarak tutulması özgün ölçümü karşılaştırma ve denetim için korur.',
    ),
    correlation_analysis: content(
        'Correlation Matrix',
        'Correlation Matrix',
        'Computes a block-streamed Pearson matrix and pairwise sample counts.',
        'Bloklar halinde Pearson matrisi ve ikili örnek sayılarını hesaplar.',
        'Correlation measures the strength and direction of linear relationships between channel pairs. Pairwise counts expose missing-data effects, while strongest-pair ranking helps triage large channel sets.',
        'Korelasyon, kanal çiftleri arasındaki doğrusal ilişkinin gücünü ve yönünü ölçer. İkili örnek sayıları eksik verinin etkisini gösterir; en güçlü çiftlerin sıralanması büyük kanal kümelerini incelemeyi hızlandırır.',
    ),
    hypothesis_testing: content(
        'Statistical Tests',
        'Statistical Tests',
        'Runs native one-sample, paired and independent statistical tests.',
        'Tek örneklem, eşleştirilmiş ve bağımsız istatistiksel testleri çalıştırır.',
        'Hypothesis tests quantify whether an observed difference is likely systematic rather than random variation. The selected test, confidence level, effect estimate and assumptions should be interpreted together.',
        'Hipotez testleri gözlenen bir farkın rastgele değişim yerine sistematik olma olasılığını niceler. Seçilen test, güven düzeyi, etki tahmini ve varsayımlar birlikte yorumlanmalıdır.',
    ),
    statistical_process_control: content(
        'Process Capability & SPC',
        'Process Capability & SPC',
        'Provides I-MR, EWMA and CUSUM charts, rule checks and capability indices.',
        'I-MR, EWMA ve CUSUM grafikleri, kural kontrolleri ve yeterlilik indeksleri sunar.',
        'Statistical Process Control separates common-cause variation from special events. Control charts reveal stability; Cp and Cpk compare the stable process spread and centering against specification limits.',
        'İstatistiksel Proses Kontrolü doğal süreç değişimini özel olaylardan ayırır. Kontrol grafikleri kararlılığı; Cp ve Cpk ise kararlı süreç yayılımı ile merkezlenmesini spesifikasyon sınırlarıyla karşılaştırır.',
    ),
    align_compare: content(
        'Align / Compare',
        'Align / Compare',
        'Overlays multiple sources on a shared grid for direct comparison.',
        'Birden fazla kaynağı doğrudan karşılaştırmak için ortak bir ızgarada üst üste bindirir.',
        'The viewer maps independent sources onto a common coordinate system, then exposes offsets, scale differences and event timing with synchronized cursors.',
        'Görüntüleyici bağımsız kaynakları ortak bir koordinat sistemine eşler; ardından senkronize imleçlerle ofsetleri, ölçek farklarını ve olay zamanlamasını görünür kılar.',
    ),
    intelligent_report: content(
        'Intelligent Report',
        'Intelligent Report',
        'Builds traceable reports from canvas results, templates and PDF export.',
        'Canvas sonuçları, şablonlar ve PDF dışa aktarma ile izlenebilir raporlar oluşturur.',
        'The report widget collects typed results directly from connected analysis and visualization nodes. Templates organize tables, plots and conclusions without copying values by hand, preserving traceability to the source measurement.',
        'Rapor widgetı bağlı analiz ve görselleştirme düğümlerinden tipli sonuçları doğrudan toplar. Şablonlar tablo, grafik ve sonuçları elle değer kopyalamadan düzenler; kaynak ölçüme kadar izlenebilirliği korur.',
    ),
}

const ML_WIDGETS = {
    ml_data_preprocessing: content('Data Preprocessing', 'Veri Ön İşleme', 'Prepares features for machine-learning workflows.', 'Özellikleri makine öğrenmesi iş akışlarına hazırlar.'),
    ml_classification: content('Classification', 'Sınıflandırma', 'Learns discrete labels from engineered features.', 'Mühendislik özelliklerinden ayrık sınıfları öğrenir.'),
    ml_regression: content('Regression', 'Regresyon', 'Models a continuous target from measured features.', 'Ölçülen özelliklerden sürekli bir hedefi modeller.'),
    ml_clustering: content('Clustering', 'Kümeleme', 'Discovers unlabeled operating-state groups.', 'Etiketsiz çalışma durumu gruplarını keşfeder.'),
    ml_neural_network: content('Neural Networks', 'Sinir Ağları', 'Builds neural models for nonlinear signal relationships.', 'Doğrusal olmayan sinyal ilişkileri için sinir ağı modelleri kurar.'),
    ml_model_evaluation: content('Model Evaluation', 'Model Değerlendirme', 'Compares model quality with task-appropriate metrics.', 'Model kalitesini göreve uygun metriklerle karşılaştırır.'),
    ml_prediction: content('Prediction', 'Tahmin', 'Applies a trained model to new measurement data.', 'Eğitilmiş bir modeli yeni ölçüm verisine uygular.'),
    ml_feature_engineering: content('Feature Engineering', 'Özellik Mühendisliği', 'Creates model-ready features from raw channels.', 'Ham kanallardan modele hazır özellikler üretir.'),
    ml_hyperparameter_tuning: content('Hyperparameter Tuning', 'Hiperparametre Ayarı', 'Searches model settings under a controlled validation plan.', 'Kontrollü bir doğrulama planında model ayarlarını tarar.'),
    ml_model_persistence: content('Model Persistence', 'Model Kalıcılığı', 'Saves and reloads trained model artifacts with metadata.', 'Eğitilmiş model çıktıları ile meta verisini kaydeder ve yeniden yükler.'),
}

const CONTENT_BY_ID = new Map()
for (const category of [...CORE_CONTENT_CATEGORIES, ...ENGINEERING_CATEGORIES]) {
    for (const widget of category.widgets) CONTENT_BY_ID.set(widget.id, widget)
}
for (const [id, widget] of Object.entries({ ...ADDITIONAL_WIDGETS, ...ML_WIDGETS })) {
    CONTENT_BY_ID.set(id, { id, ...widget })
}

const COPY_OVERRIDES = {
    database_widget: {
        en: {
            summary: 'Planned connector for reading measurement data from SQL and time-series databases.',
            theory: 'The application palette reserves this entry for direct database access, but its runtime widget is not yet available. It remains visible here as planned so the website matches the application without presenting it as usable today.',
        },
        tr: {
            summary: 'SQL ve zaman serisi veritabanlarından ölçüm verisi okumak için planlanan bağlayıcı.',
            theory: 'Uygulama paleti bu öğeyi doğrudan veritabanı erişimi için ayırır; ancak çalışma zamanı widgetı henüz mevcut değildir. Website uygulamayla eşleşirken bugün kullanılabilir izlenimi vermemek için burada planlanıyor olarak gösterilir.',
        },
    },
    data_merger: {
        en: {
            summary: 'Inspects and merges every acquisition file in a folder into one MPAI dataset.',
            theory: 'File Merger is the campaign-level importer for split recordings. It scans a folder, validates compatible channel layouts and produces one continuous MPAI dataset without requiring the operator to open files one by one.',
        },
        tr: {
            summary: 'Bir klasördeki tüm ölçüm dosyalarını inceleyip tek bir MPAI veri kümesinde birleştirir.',
            theory: 'File Merger, parçalara ayrılmış kayıtlar için kampanya düzeyinde içe aktarıcıdır. Bir klasörü tarar, uyumlu kanal düzenlerini doğrular ve operatörün dosyaları tek tek açmasına gerek kalmadan tek, sürekli bir MPAI veri kümesi üretir.',
        },
    },
    data_exporter: {
        en: { summary: 'Exports connected source channels to CSV, Parquet, Excel, HDF5, MAT or TDMS.' },
        tr: { summary: 'Bağlı kaynak kanallarını CSV, Parquet, Excel, HDF5, MAT veya TDMS olarak dışa aktarır.' },
    },
}

// Widget names are the application's English palette names in every language:
// Turkish readers must recognise the exact module they will open in the app.
function widget(id, name, options = {}) {
    const base = CONTENT_BY_ID.get(id)
    if (!base) throw new Error(`Missing website content for application widget: ${id}`)

    const copyOverride = COPY_OVERRIDES[id] || {}
    const { subgroup } = options
    const phase = widgetReleasePhase(id, { subgroupId: subgroup?.id })
    return {
        ...base,
        ...(subgroup ? { subgroup } : {}),
        ...(phase ? { phase } : {}),
        en: { ...base.en, ...copyOverride.en, name },
        tr: { ...base.tr, ...copyOverride.tr, name },
    }
}

const subgroup = (id, en, tr) => {
    const phase = subgroupReleasePhase(id)
    return { id, en, tr, ...(phase ? { phase } : {}) }
}

const ENGINEERING_GROUPS = [
    {
        meta: subgroup('vibration_structural', 'Vibration, Structural & Kinematics', 'Titreşim, Yapısal ve Kinematik'),
        widgets: [
            ['rotor_dynamics', 'Rotor Dynamics'],
            ['rotor_balancing', 'Rotor Balancing'],
            ['order_tracking', 'Order Tracking'],
            ['torsional_vibration', 'Torsional & Rotational Vibration'],
            ['modal_analysis', 'Advanced Modal Analysis'],
            ['operational_modal_analysis', 'Operational Modal Analysis (OMA)'],
            ['time_ods', 'Time-Based ODS'],
            ['shock_srs', 'Shock & SRS'],
            ['bearing_fault', 'Bearing & Gear Fault Diagnosis'],
            ['kinematics_6dof', 'Kinematic Chain (6-DOF)'],
            ['cross_axis_compensation', 'Cross-Axis Compensation'],
            ['structural_health', 'Structural Health Monitoring'],
            ['machine_health_overview', 'Machine Health Overview'],
        ],
    },
    {
        meta: subgroup('thermofluids', 'Thermodynamics, Fluids & Thermal', 'Termodinamik, Akışkanlar ve Termal'),
        widgets: [
            ['combustion_analysis', 'Advanced Combustion Analysis'],
            ['gas_exchange', 'Gas Exchange & Scavenging'],
            ['work_cycle_analysis', 'Work Cycle (IMEP/BMEP/FMEP)'],
            ['thermo_cycles', 'Thermodynamic Cycles'],
            ['fluid_dynamics', 'Fluid Dynamics'],
            ['heat_transfer', 'Heat Transfer & Thermal'],
        ],
    },
    {
        meta: subgroup('materials', 'Materials, Strength & Tribology', 'Malzeme, Dayanım ve Triboloji'),
        widgets: [
            ['fatigue_analysis', 'Fatigue Analysis (Rainflow)'],
            ['damage_accumulation', 'Damage Accumulation & RUL'],
            ['strain_stress', 'Strain & Stress (Rosette)'],
            ['lubrication_tribology', 'Lubrication & Tribology'],
        ],
    },
    {
        meta: subgroup('electrical', 'Electrical & Electronics', 'Elektrik ve Elektronik'),
        widgets: [
            ['power_quality', 'Advanced Power Quality'],
            ['mcsa', 'Motor Current Signature (MCSA)'],
            ['bms_analysis', 'BMS Data Analysis'],
            ['harmonics_analysis', 'Harmonics & Interharmonics'],
            ['motor_drive_analysis', 'Motor & Inverter Drive'],
            ['power_electronics_transient', 'Power Electronics Transients'],
            ['network_analysis', 'Network Analysis (Phasor/Z)'],
        ],
    },
    {
        meta: subgroup('acoustics', 'Acoustics & NVH', 'Akustik ve NVH'),
        widgets: [
            ['sound_level', 'Sound Level (A/B/C/Z, Leq)'],
            ['octave_band', 'Octave Band Analysis'],
            ['sound_power', 'Sound Intensity & Power'],
            ['psychoacoustics', 'Psychoacoustics'],
            ['microphone_correction', 'Microphone Correction'],
        ],
    },
    {
        meta: subgroup('control', 'Control, Mechatronics & Navigation', 'Kontrol, Mekatronik ve Navigasyon'),
        widgets: [
            ['system_identification', 'System Identification (TF/SS)'],
            ['pid_analysis', 'PID Analysis'],
            ['stability_analysis', 'Stability (Bode/Nyquist/RL)'],
            ['navigation_imu', 'Navigation & IMU (EKF)'],
        ],
    },
    {
        meta: subgroup('vehicle', 'Vehicle & Platform Dynamics', 'Araç ve Platform Dinamiği'),
        widgets: [
            ['performance_testing', 'Performance Testing'],
        ],
    },
]

// Order mirrors the application palette: FFT and Frequency Response sit
// directly under Engineering Modules, ahead of the domain subgroups.
const engineeringWidgets = [
    widget('fft_spectrum', 'FFT / Spectrum'),
    widget('cross_spectrum', 'Frequency Response & Cross Spectrum'),
    ...ENGINEERING_GROUPS.flatMap((group) => (
        group.widgets.map(([id, name]) => widget(id, name, { subgroup: group.meta }))
    )),
]

const CATEGORY_BY_ID = new Map(WIDGET_CATEGORIES.map((item) => [item.id, item]))

function category(id, widgets) {
    const meta = CATEGORY_BY_ID.get(id)
    if (!meta) throw new Error(`Missing website category metadata: ${id}`)
    // A deferred category defers every widget it contains.
    return { ...meta, widgets: meta.phase ? widgets.map((item) => ({ ...item, phase: meta.phase })) : widgets }
}

export const WIDGET_CATALOG = [
    category('data_io', [
            widget('file_reader', 'File Reader'),
            widget('data_merger', 'File Merger'),
            widget('database_widget', 'Database'),
            widget('sensor_widget', 'Sensor Data'),
            widget('data_exporter', 'File Exporter'),
            widget('ftp_reader', 'FTP/SFTP Reader'),
            widget('realtime_stream', 'Real-time Stream'),
            widget('random_generator', 'Data Generator'),
    ]),
    category('preprocessing', [
            widget('channel_selector', 'Channel Selector'),
            widget('merge_channels', 'Dataset Merge'),
            widget('table_edit', 'Data Table Editor'),
            widget('normalization_scaling', 'Normalization & Scaling'),
            widget('groupby_aggregation', 'Group By & Aggregation'),
            widget('time_alignment', 'Time Alignment'),
            widget('rolling_window_stats', 'Rolling / Window Stats'),
            widget('sensor_calibration', 'Sensor Calibration'),
    ]),
    category('filters', [
            widget('frequency_filter', 'Frequency Filter'),
            widget('smoothing_filter', 'Smoothing Filter'),
            widget('math_transform', 'Math & Calculus'),
            widget('advanced_diagnostics', 'Advanced Diagnostics'),
            widget('kalman_filter', 'Kalman Filter'),
            widget('spike_detection', 'Spike Detection/Remove'),
            widget('data_quality_repair', 'Outlier Detection/Remove'),
            widget('range_filter', 'Range Filter'),
    ]),
    category('engineering', engineeringWidgets),
    category('statistics', [
            widget('statistics_summary', 'Channel Statistics'),
            widget('correlation_analysis', 'Correlation Matrix'),
            widget('hypothesis_testing', 'Statistical Tests'),
            widget('statistical_process_control', 'Process Capability & SPC'),
    ]),
    category('machine_learning', [
            widget('ml_data_preprocessing', 'Data Preprocessing'),
            widget('ml_classification', 'Classification'),
            widget('ml_regression', 'Regression'),
            widget('ml_clustering', 'Clustering'),
            widget('ml_neural_network', 'Neural Networks'),
            widget('ml_model_evaluation', 'Model Evaluation'),
            widget('ml_prediction', 'Prediction'),
            widget('ml_feature_engineering', 'Feature Engineering'),
            widget('ml_hyperparameter_tuning', 'Hyperparameter Tuning'),
            widget('ml_model_persistence', 'Model Persistence'),
    ]),
    category('visualization', [
            widget('chart_dashboard', 'Chart Dashboard'),
            widget('line_chart', 'Line Chart'),
            widget('histogram_widget', 'Histogram'),
            widget('scatter_plot', 'Scatter Plot'),
            widget('bar_plot', 'Bar Plot'),
            widget('box_plot', 'Box Plot'),
            widget('time_graphics', 'Time Graphics'),
            widget('align_compare', 'Align / Compare'),
            widget('frequency_domain', 'Frequency Domain'),
            widget('order_map_view', 'Order Map View (2D / VTK 3D)'),
    ]),
    category('reporting', [
            widget('intelligent_report', 'Intelligent Report'),
    ]),
    category('python_script', [
            widget('python_script', 'Python Script'),
    ]),
]

export default WIDGET_CATALOG
