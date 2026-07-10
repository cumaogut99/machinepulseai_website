// ─────────────────────────────────────────────────────────────────────────────
// Widget deep-dive registry — plain-language detail pages for catalog widgets.
//
// Each catalog widget can have an optional detail page at /widgets/<slug>,
// rendered by src/components/WidgetDetail.jsx. Content is bilingual (en/tr) and
// written in simple language: what the widget does, what data it uses, how it
// works step by step, and what it produces. Sections are all OPTIONAL — a
// simple widget may only have `intro`, `inputs`, `steps`, `outputs`; a
// math-heavy one can add a `formulas` section (KaTeX, see WidgetDetail).
//
// Schema per widget id:
//   {
//     slug: 'file-reader',                 // URL slug (hyphenated)
//     en: { tagline, intro,
//           inputs?:  [{ name, desc }],
//           steps?:   [{ step, detail }],
//           outputs?: [{ name, desc }],
//           channels?:[{ name, unit, source, usage }], channelsNote?,
//           formulas?:[{ title, latex, expr, where }] },
//     tr: { …same shape… }
//   }
//
// The page derives its title, category name and accent colour by looking the
// widget up in WIDGET_CATALOG, so those are never duplicated here.
// Filled in category by category — not every widget is present yet. Large
// categories live in their own file (e.g. widgetDetails.vibration.js) and are
// merged into the registry at the bottom.
// ─────────────────────────────────────────────────────────────────────────────

import VIBRATION_WIDGET_DETAILS from './widgetDetails.vibration.js'

const WIDGET_DETAILS = {
    // ── 1. DATA I/O ───────────────────────────────────────────────────────────
    file_reader: {
        slug: 'file-reader',
        en: {
            tagline: 'The front door of almost every analysis — it opens your measurement files, even huge ones, without filling up memory.',
            intro:
                'Before you can analyse anything you have to load it. The File Reader opens common formats (CSV, Excel, Parquet) as well as industrial ones (TDMS from National Instruments, MDF/MF4 from automotive ECUs, and the native MPAI container). The trick is that it does not copy the whole file into RAM: it memory-maps it, so a 200 GB recording opens in seconds and stays well under 1 GB of memory. Before you commit, a live preview shows exactly how the file will be read so you can fix any mistakes up front.',
            inputs: [
                { name: 'A measurement file', desc: 'CSV, Excel, Parquet, TDMS, MDF/MF4 or MPAI — from a spreadsheet to a multi-gigabyte test recording.' },
                { name: 'Parsing settings', desc: 'Which row is the header, the column/decimal separators, and which column holds time — all adjustable before loading.' },
            ],
            steps: [
                { step: 'Pick the file', detail: 'Choose the file; the reader detects its format automatically.' },
                { step: 'Check the preview', detail: 'A small sample is shown so you can confirm columns, headers and the time axis look right.' },
                { step: 'Adjust if needed', detail: 'Change the delimiter, header row or decimal separator until the preview is correct.' },
                { step: 'Load', detail: 'The file is memory-mapped and handed to the rest of the pipeline — no long wait, no memory spike.' },
            ],
            outputs: [
                { name: 'A ready-to-use dataset', desc: 'All channels correctly typed and named, with a proper time axis.' },
                { name: 'Format & channel info', desc: 'What was detected — sample rate, channel count and units — so the next widgets know what they are working with.' },
            ],
        },
        tr: {
            tagline: 'Neredeyse her analizin giriş kapısı — ölçüm dosyalarınızı, çok büyük olsalar bile, belleği doldurmadan açar.',
            intro:
                'Bir şeyi analiz etmeden önce onu yüklemeniz gerekir. Dosya Okuyucu; yaygın formatları (CSV, Excel, Parquet) ve endüstriyel olanları (National Instruments TDMS, otomotiv ECU\'larının MDF/MF4\'ü ve yerel MPAI konteyneri) açar. İşin püf noktası, dosyanın tamamını RAM\'e kopyalamamasıdır: bellek-eşlemli (memory-map) okur; böylece 200 GB\'lık bir kayıt saniyeler içinde açılır ve bellek kullanımı 1 GB\'ın çok altında kalır. Onaylamadan önce canlı bir önizleme, dosyanın tam olarak nasıl okunacağını gösterir; böylece hataları baştan düzeltebilirsiniz.',
            inputs: [
                { name: 'Bir ölçüm dosyası', desc: 'CSV, Excel, Parquet, TDMS, MDF/MF4 veya MPAI — bir elektronik tablodan çok-gigabaytlık bir test kaydına kadar.' },
                { name: 'Ayrıştırma ayarları', desc: 'Hangi satır başlık, sütun/ondalık ayırıcılar ve hangi sütun zamanı tutuyor — hepsi yüklemeden önce ayarlanabilir.' },
            ],
            steps: [
                { step: 'Dosyayı seçin', detail: 'Dosyayı seçin; okuyucu formatını otomatik algılar.' },
                { step: 'Önizlemeyi kontrol edin', detail: 'Küçük bir örnek gösterilir; sütunların, başlıkların ve zaman ekseninin doğru göründüğünü teyit edersiniz.' },
                { step: 'Gerekirse ayarlayın', detail: 'Önizleme doğru olana kadar ayraç, başlık satırı veya ondalık ayırıcıyı değiştirin.' },
                { step: 'Yükleyin', detail: 'Dosya bellek-eşlemli okunur ve hattın geri kalanına verilir — uzun bekleme yok, bellek sıçraması yok.' },
            ],
            outputs: [
                { name: 'Kullanıma hazır veri kümesi', desc: 'Tüm kanallar doğru türde ve adlandırılmış, düzgün bir zaman ekseniyle.' },
                { name: 'Format & kanal bilgisi', desc: 'Ne algılandığı — örnekleme hızı, kanal sayısı ve birimler — böylece sonraki widget\'lar neyle çalıştığını bilir.' },
            ],
        },
    },

    data_exporter: {
        slug: 'data-exporter',
        en: {
            tagline: 'Sends your channels and results back out — to a report, a colleague\'s tools or an archive — without choking on size.',
            intro:
                'After processing, results usually need to leave the platform: for a report, for someone else\'s toolchain, or for long-term storage. The Data Exporter writes data out in chunks, so even very large result sets export smoothly without spiking memory. You choose the format based on who receives it: Parquet and MPAI keep full precision and metadata, CSV and Excel are easy for people to open, and JSON is handy for feeding other software.',
            inputs: [
                { name: 'Channels or results', desc: 'Any data currently in the pipeline — raw channels or computed analysis outputs.' },
                { name: 'A target format', desc: 'Parquet, MPAI, CSV, Excel or JSON, depending on where the data is going next.' },
            ],
            steps: [
                { step: 'Choose what to export', detail: 'Select the channels or result tables you want to save.' },
                { step: 'Pick a format', detail: 'Match the format to the destination — precise archive vs human-readable hand-off.' },
                { step: 'Stream to disk', detail: 'Data is written in chunks so memory stays flat, even for huge exports.' },
            ],
            outputs: [
                { name: 'An exported file', desc: 'Your data in the chosen format, ready to share, archive or import elsewhere.' },
            ],
        },
        tr: {
            tagline: 'Kanallarınızı ve sonuçlarınızı dışarı gönderir — bir rapora, bir meslektaşın araçlarına veya arşive — boyuta takılmadan.',
            intro:
                'İşlemden sonra sonuçların çoğu zaman platformdan çıkması gerekir: bir rapor için, bir başkasının araç zinciri için ya da uzun süreli saklama için. Veri Dışa Aktarıcı, veriyi parçalar halinde yazar; böylece çok büyük sonuç kümeleri bile belleği şişirmeden sorunsuz aktarılır. Formatı, veriyi kimin alacağına göre seçersiniz: Parquet ve MPAI tam hassasiyeti ve meta veriyi korur, CSV ve Excel insanların açması için kolaydır, JSON ise başka yazılımları beslemek için kullanışlıdır.',
            inputs: [
                { name: 'Kanallar veya sonuçlar', desc: 'Hattaki mevcut herhangi bir veri — ham kanallar veya hesaplanmış analiz çıktıları.' },
                { name: 'Bir hedef format', desc: 'Verinin nereye gideceğine göre Parquet, MPAI, CSV, Excel veya JSON.' },
            ],
            steps: [
                { step: 'Neyi aktaracağınızı seçin', detail: 'Kaydetmek istediğiniz kanalları veya sonuç tablolarını seçin.' },
                { step: 'Bir format seçin', detail: 'Formatı hedefe göre eşleştirin — hassas arşiv mi, insan-okunur teslimat mı.' },
                { step: 'Diske akıtın', detail: 'Veri parçalar halinde yazılır; büyük dışa aktarımlarda bile bellek düz kalır.' },
            ],
            outputs: [
                { name: 'Dışa aktarılmış bir dosya', desc: 'Verileriniz seçtiğiniz formatta — paylaşmaya, arşivlemeye veya başka yerde içe aktarmaya hazır.' },
            ],
        },
    },

    data_merger: {
        slug: 'data-merger',
        en: {
            tagline: 'Stitches two data sources into one — either stacking runs on top of each other or joining different channels side by side.',
            intro:
                'Test campaigns rarely produce a single tidy file. The Data Merger joins two sources together in one of two ways. Vertical merging stacks repeated runs of the same channel layout end to end (concatenate by time) — useful when the same test was recorded several times. Horizontal merging places different channels of the same event side by side (align by time and join) — useful when two separate acquisition systems recorded different sensors. Either way, it lines up the time axes so channels with slightly different sample clocks still match up correctly.',
            inputs: [
                { name: 'Two datasets', desc: 'Either two runs with the same channels, or two sets of different channels from the same event.' },
                { name: 'A merge direction', desc: 'Vertical (add more rows/time) or horizontal (add more channels/columns).' },
            ],
            steps: [
                { step: 'Choose the two sources', detail: 'Select the datasets you want to combine.' },
                { step: 'Pick the direction', detail: 'Vertical to append runs in time, or horizontal to join different channels.' },
                { step: 'Align the time axes', detail: 'The merger matches timestamps so mismatched sample clocks still line up.' },
            ],
            outputs: [
                { name: 'One combined dataset', desc: 'A single, time-aligned dataset you can analyse as a whole instead of file by file.' },
            ],
        },
        tr: {
            tagline: 'İki veri kaynağını tek kaynağa diker — ya koşuları üst üste yığarak ya da farklı kanalları yan yana birleştirerek.',
            intro:
                'Test kampanyaları nadiren tek ve derli toplu bir dosya üretir. Veri Birleştirici iki kaynağı iki yoldan biriyle birleştirir. Dikey birleştirme, aynı kanal düzenindeki tekrarlı koşuları uç uca yığar (zamana göre art arda ekleme) — aynı testin birkaç kez kaydedildiği durumlarda kullanışlıdır. Yatay birleştirme, aynı olayın farklı kanallarını yan yana koyar (zamana göre hizalayıp birleştirme) — iki ayrı toplama sisteminin farklı sensörleri kaydettiği durumlarda kullanışlıdır. Her iki durumda da zaman eksenlerini hizalar; böylece örnekleme saatleri hafif farklı kanallar bile doğru eşleşir.',
            inputs: [
                { name: 'İki veri kümesi', desc: 'Ya aynı kanallara sahip iki koşu ya da aynı olaydan farklı kanalların iki kümesi.' },
                { name: 'Bir birleştirme yönü', desc: 'Dikey (daha çok satır/zaman) veya yatay (daha çok kanal/sütun).' },
            ],
            steps: [
                { step: 'İki kaynağı seçin', detail: 'Birleştirmek istediğiniz veri kümelerini seçin.' },
                { step: 'Yönü seçin', detail: 'Koşuları zamanda eklemek için dikey, farklı kanalları birleştirmek için yatay.' },
                { step: 'Zaman eksenlerini hizalayın', detail: 'Birleştirici zaman damgalarını eşler; uyumsuz örnekleme saatleri bile hizalanır.' },
            ],
            outputs: [
                { name: 'Tek birleşik veri kümesi', desc: 'Dosya dosya değil, bütün olarak analiz edebileceğiniz zaman-hizalı tek bir veri kümesi.' },
            ],
        },
    },

    random_generator: {
        slug: 'signal-generator',
        en: {
            tagline: 'Creates known-good test signals so you can check that your analysis chain returns exactly what theory predicts.',
            intro:
                'A controlled, perfectly known signal is invaluable — for validating a processing chain, demonstrating a widget, or building a test rig before real hardware arrives. The generator produces classic waveforms (sine, cosine, square, sawtooth, triangle), swept-frequency chirps that are ideal for testing order-tracking and frequency-response tools, and several colours of noise. Because the maths is known exactly, you can confirm that an FFT, filter or RMS calculation gives precisely the answer it should.',
            inputs: [
                { name: 'A waveform choice', desc: 'Sine, cosine, square, sawtooth, triangle, chirp or noise.' },
                { name: 'Signal settings', desc: 'Frequency, amplitude, phase and sample rate — you set exactly what you want.' },
            ],
            steps: [
                { step: 'Pick a waveform', detail: 'Choose the shape you need for the test.' },
                { step: 'Set the parameters', detail: 'Dial in frequency, amplitude, phase and sample rate.' },
                { step: 'Generate', detail: 'The exact signal is created and passed on like any real channel.' },
            ],
            outputs: [
                { name: 'A synthetic channel', desc: 'A clean, mathematically exact signal you can feed into any other widget.' },
            ],
        },
        tr: {
            tagline: 'Doğruluğu bilinen test sinyalleri üretir; böylece analiz zincirinizin teorinin öngördüğü sonucu tam verdiğini doğrularsınız.',
            intro:
                'Kontrollü ve tam olarak bilinen bir sinyal paha biçilmezdir — bir işlem zincirini doğrulamak, bir widget\'ı göstermek veya gerçek donanım gelmeden test düzeneği kurmak için. Üreteç; klasik dalga formlarını (sinüs, kosinüs, kare, testere, üçgen), order-tracking ve frekans-tepki araçlarını test etmek için ideal olan taranan-frekans (chirp) sinyallerini ve çeşitli gürültü renklerini üretir. Matematik tam olarak bilindiğinden, bir FFT, filtre veya RMS hesabının vermesi gereken cevabı tam verip vermediğini doğrulayabilirsiniz.',
            inputs: [
                { name: 'Bir dalga formu seçimi', desc: 'Sinüs, kosinüs, kare, testere, üçgen, chirp veya gürültü.' },
                { name: 'Sinyal ayarları', desc: 'Frekans, genlik, faz ve örnekleme hızı — tam istediğinizi belirlersiniz.' },
            ],
            steps: [
                { step: 'Bir dalga formu seçin', detail: 'Test için ihtiyacınız olan şekli seçin.' },
                { step: 'Parametreleri ayarlayın', detail: 'Frekans, genlik, faz ve örnekleme hızını girin.' },
                { step: 'Üretin', detail: 'Tam sinyal oluşturulur ve gerçek bir kanal gibi devredilir.' },
            ],
            outputs: [
                { name: 'Sentetik bir kanal', desc: 'Herhangi bir widget\'a verebileceğiniz temiz, matematiksel olarak kesin bir sinyal.' },
            ],
        },
    },

    batch_file_merger: {
        slug: 'batch-file-merger',
        en: {
            tagline: 'Turns a whole folder of many small files into one continuous dataset in a single operation.',
            intro:
                'Long endurance tests and fleet data often arrive as hundreds or thousands of small files, split by time or by logger. Opening them one by one is painful and hides the big picture. The Batch File Merger ingests a whole directory at once, normalises the channel layout across all the files, and produces one continuous dataset — so you analyse the entire campaign as a single record instead of file by file.',
            inputs: [
                { name: 'A folder of files', desc: 'Many files that share a channel layout, split by time or by logger.' },
            ],
            steps: [
                { step: 'Point to the folder', detail: 'Select the directory holding all the files.' },
                { step: 'Normalise the layout', detail: 'The merger lines up channel names and order across every file.' },
                { step: 'Concatenate', detail: 'All files are joined in time order into one dataset.' },
            ],
            outputs: [
                { name: 'One continuous dataset', desc: 'The whole campaign as a single record, ready to analyse end to end.' },
            ],
        },
        tr: {
            tagline: 'Çok sayıda küçük dosyadan oluşan bir klasörün tamamını tek işlemde tek sürekli veri kümesine dönüştürür.',
            intro:
                'Uzun dayanıklılık testleri ve filo verileri çoğu zaman zamana ya da kaydediciye göre bölünmüş yüzlerce/binlerce küçük dosya olarak gelir. Bunları tek tek açmak zahmetlidir ve büyük resmi gizler. Toplu Dosya Birleştirici, tüm bir dizini bir kerede içeri alır, tüm dosyalarda kanal düzenini normalleştirir ve tek sürekli bir veri kümesi üretir — böylece tüm kampanyayı dosya dosya değil, tek bir kayıt olarak analiz edersiniz.',
            inputs: [
                { name: 'Bir dosya klasörü', desc: 'Kanal düzenini paylaşan, zamana veya kaydediciye göre bölünmüş çok sayıda dosya.' },
            ],
            steps: [
                { step: 'Klasörü gösterin', detail: 'Tüm dosyaları içeren dizini seçin.' },
                { step: 'Düzeni normalleştirin', detail: 'Birleştirici, her dosyada kanal adlarını ve sırasını hizalar.' },
                { step: 'Art arda ekleyin', detail: 'Tüm dosyalar zaman sırasına göre tek bir veri kümesinde birleştirilir.' },
            ],
            outputs: [
                { name: 'Tek sürekli veri kümesi', desc: 'Baştan sona analiz edilmeye hazır, tek kayıt halindeki tüm kampanya.' },
            ],
        },
    },

    database_widget: {
        slug: 'database-connector',
        en: {
            tagline: 'Pulls measurement data straight from a SQL or time-series database, skipping the export-to-file step entirely.',
            intro:
                'When your test data already lives in a historian or SQL database, exporting it to files first is wasteful and quickly goes stale. The Database Connector queries the source directly and streams the result into the analysis engine. That keeps a single source of truth, avoids out-of-date CSV copies, and means your analysis always runs on the current data.',
            inputs: [
                { name: 'A database connection', desc: 'Access to a SQL or time-series (historian) database.' },
                { name: 'A query', desc: 'Which measurements and time range to pull.' },
            ],
            steps: [
                { step: 'Connect', detail: 'Point the widget at your database.' },
                { step: 'Query', detail: 'Ask for the channels and time window you need.' },
                { step: 'Stream in', detail: 'Results flow straight into the pipeline — no intermediate file.' },
            ],
            outputs: [
                { name: 'A live dataset', desc: 'Data straight from the source, always current, ready for analysis.' },
            ],
        },
        tr: {
            tagline: 'Ölçüm verisini doğrudan bir SQL veya zaman-serisi veritabanından çeker; dosyaya aktarma adımını tamamen atlar.',
            intro:
                'Test veriniz zaten bir historian veya SQL veritabanında yaşıyorsa, önce dosyaya aktarmak israftır ve hızla eskir. Veritabanı Bağlayıcısı kaynağı doğrudan sorgular ve sonucu analiz motoruna akıtır. Bu, tek bir doğruluk kaynağını korur, güncelliğini yitirmiş CSV kopyalarından kaçınır ve analizinizin her zaman güncel veri üzerinde çalışması demektir.',
            inputs: [
                { name: 'Bir veritabanı bağlantısı', desc: 'Bir SQL veya zaman-serisi (historian) veritabanına erişim.' },
                { name: 'Bir sorgu', desc: 'Hangi ölçümlerin ve zaman aralığının çekileceği.' },
            ],
            steps: [
                { step: 'Bağlanın', detail: 'Widget\'ı veritabanınıza yönlendirin.' },
                { step: 'Sorgulayın', detail: 'İhtiyacınız olan kanalları ve zaman penceresini isteyin.' },
                { step: 'Akıtın', detail: 'Sonuçlar doğrudan hatta akar — ara dosya yok.' },
            ],
            outputs: [
                { name: 'Canlı bir veri kümesi', desc: 'Doğrudan kaynaktan gelen, her zaman güncel, analize hazır veri.' },
            ],
        },
    },

    // ── 2. VIBRATION & STRUCTURAL (see widgetDetails.vibration.js) ────────────
    ...VIBRATION_WIDGET_DETAILS,
}

// Map of slug → widget id, for reverse lookup from the URL.
export const SLUG_TO_WIDGET_ID = Object.fromEntries(
    Object.entries(WIDGET_DETAILS).map(([id, d]) => [d.slug, id])
)

/** Detail content for a widget id, or null if it has no page yet. */
export function getWidgetDetailById(id) {
    return WIDGET_DETAILS[id] || null
}

/** Slug for a widget id, or null. Used by the catalog card to link out. */
export function getWidgetDetailSlug(id) {
    return WIDGET_DETAILS[id]?.slug || null
}

export default WIDGET_DETAILS
