// ─────────────────────────────────────────────────────────────────────────────
// MachinePulseAI — Widget Catalog (bilingual content source of truth)
// ─────────────────────────────────────────────────────────────────────────────
//
// This file is the single source of truth for the public "Widgets" gallery page.
// It is intentionally kept OUT of i18n.js to keep that file readable.
//
// Each category:  { id, en, tr, accent, status, widgets: [...] }
//   status: 'available' | 'planned'   (planned = not shipped yet / future roadmap)
//
// Each widget:    { id, en:{name, summary, theory}, tr:{name, summary, theory} }
//   summary  = 1–2 sentence "what the widget does"
//   theory   = longer educational text shown under "Learn the theory".
//              May contain \n\n paragraph breaks; rendered as paragraphs.
//
// To add a widget: append an object to the relevant category's `widgets` array.
// To add a category: append a category object below and (optionally) give it a
// distinct accent color from the existing palette.
// ─────────────────────────────────────────────────────────────────────────────

import { ENGINEERING_CATEGORIES } from './widgetCatalog.engineering.js'

const CORE_CATEGORIES = [
    // ── 1. DATA I/O ─────────────────────────────────────────────────────────
    {
        id: 'data_io',
        accent: '#00f5ff',
        status: 'available',
        en: { name: 'Data I/O', blurb: 'Read, generate, merge and export measurement files.' },
        tr: { name: 'Veri Giriş/Çıkış', blurb: 'Ölçüm dosyalarını okuma, üretme, birleştirme ve dışa aktarma.' },
        widgets: [
            {
                id: 'file_reader',
                en: {
                    name: 'File Reader',
                    summary: 'Loads CSV, Parquet, Excel, MPAI, TDMS and MDF files with a live preview and configurable parsing.',
                    theory: 'The File Reader is the entry point of almost every analysis pipeline. It memory-maps large files instead of loading them into RAM, so a 200 GB recording opens in seconds and stays well under 1 GB of memory. Industrial formats such as TDMS (National Instruments), MDF/MF4 (ASAM, used in automotive ECU logging) and the native MPAI container are read natively, alongside everyday CSV/Parquet/Excel. You can pick the delimiter, header row, decimal separator and time column before committing, and the preview shows you exactly how the data will be interpreted.',
                },
                tr: {
                    name: 'Dosya Okuyucu',
                    summary: 'CSV, Parquet, Excel, MPAI, TDMS ve MDF dosyalarını canlı önizleme ve ayarlanabilir ayrıştırma ile yükler.',
                    theory: 'Dosya Okuyucu, neredeyse her analiz hattının giriş noktasıdır. Büyük dosyaları RAM\'e tümüyle yüklemek yerine bellek-eşlemli (memory-map) okur; böylece 200 GB\'lık bir kayıt saniyeler içinde açılır ve bellek kullanımı 1 GB\'ın çok altında kalır. TDMS (National Instruments), MDF/MF4 (otomotiv ECU kaydında kullanılan ASAM formatı) ve yerel MPAI konteyneri gibi endüstriyel formatlar; günlük CSV/Parquet/Excel ile birlikte doğal olarak okunur. Onaylamadan önce ayraç, başlık satırı, ondalık ayırıcı ve zaman sütununu seçebilirsiniz; önizleme verinin tam olarak nasıl yorumlanacağını gösterir.',
                },
            },
            {
                id: 'data_exporter',
                en: {
                    name: 'Data Exporter',
                    summary: 'Exports channels and analysis results to CSV, Parquet, MPAI, Excel or JSON.',
                    theory: 'After processing, results often need to leave the platform — for reporting, for a colleague\'s toolchain, or for archival. The Data Exporter streams data out in chunks so even very large result sets export without spiking memory. Parquet and MPAI preserve full float64 precision and metadata; CSV/Excel are offered for human-readable hand-off; JSON is useful for downstream software integration.',
                },
                tr: {
                    name: 'Veri Dışa Aktarıcı',
                    summary: 'Kanalları ve analiz sonuçlarını CSV, Parquet, MPAI, Excel veya JSON olarak dışa aktarır.',
                    theory: 'İşlemden sonra sonuçların çoğu zaman platformdan çıkması gerekir — raporlama için, bir meslektaşın araç zinciri için ya da arşivleme için. Veri Dışa Aktarıcı, veriyi parçalar halinde akıtır; böylece çok büyük sonuç kümeleri bile belleği şişirmeden dışa aktarılır. Parquet ve MPAI, tam float64 hassasiyetini ve meta verisini korur; CSV/Excel insan-okunur teslimat için sunulur; JSON ise alt-akış yazılım entegrasyonu için kullanışlıdır.',
                },
            },
            {
                id: 'data_merger',
                en: {
                    name: 'Data Merger',
                    summary: 'Combines two data sources vertically (append rows) or horizontally (join columns).',
                    theory: 'Test campaigns rarely produce a single file. The Data Merger stitches sources together: vertically when you have repeated runs of the same channel layout (concatenate by time), or horizontally when separate DAQ systems recorded different channels of the same event (align by time and join). Time-axis alignment is handled so that channels with slightly different sample clocks line up correctly.',
                },
                tr: {
                    name: 'Veri Birleştirici',
                    summary: 'İki veri kaynağını dikey (satır ekleme) veya yatay (sütun birleştirme) olarak birleştirir.',
                    theory: 'Test kampanyaları nadiren tek bir dosya üretir. Veri Birleştirici kaynakları birbirine diker: aynı kanal düzeninin tekrarlı koşularında dikey (zamana göre art arda ekleme), ya da ayrı DAQ sistemleri aynı olayın farklı kanallarını kaydettiğinde yatay (zamana göre hizalayıp birleştirme). Zaman ekseni hizalaması ele alınır; böylece örnekleme saatleri hafif farklı olan kanallar doğru biçimde üst üste gelir.',
                },
            },
            {
                id: 'random_generator',
                en: {
                    name: 'Signal Generator',
                    summary: 'Generates synthetic test signals: sine, cosine, square, sawtooth, triangle, chirp and noise.',
                    theory: 'A controlled, known-good signal is invaluable for validating a processing chain, demonstrating a widget, or building a test rig before real hardware arrives. The generator produces classic waveforms with configurable frequency, amplitude, phase and sample rate, including swept-frequency chirps (ideal for testing order-tracking and FRF widgets) and several noise colors. Because the math is known exactly, you can verify that an FFT, filter or RMS calculation returns precisely what theory predicts.',
                },
                tr: {
                    name: 'Sinyal Üreteci',
                    summary: 'Sentetik test sinyalleri üretir: sinüs, kosinüs, kare, testere, üçgen, chirp ve gürültü.',
                    theory: 'Kontrollü ve doğruluğu bilinen bir sinyal; bir işlem zincirini doğrulamak, bir widget\'ı göstermek veya gerçek donanım gelmeden test düzeneği kurmak için paha biçilmezdir. Üreteç; frekans, genlik, faz ve örnekleme hızı ayarlanabilen klasik dalga formlarını üretir — order-tracking ve FRF widget\'larını test etmek için ideal olan taranan-frekans (chirp) ve çeşitli gürültü renkleri dahil. Matematik tam olarak bilindiğinden, bir FFT, filtre veya RMS hesabının teorinin öngördüğü değeri tam verip vermediğini doğrulayabilirsiniz.',
                },
            },
            {
                id: 'batch_file_merger',
                en: {
                    name: 'Batch File Merger',
                    summary: 'Merges entire folders of files into a single dataset in one operation.',
                    theory: 'Long endurance tests and fleet data often arrive as hundreds or thousands of small files split by time or by logger. The Batch File Merger ingests a whole directory, normalizes the channel layout and produces one continuous dataset, so you analyze the campaign as a whole instead of file-by-file.',
                },
                tr: {
                    name: 'Toplu Dosya Birleştirici',
                    summary: 'Dosya klasörlerinin tamamını tek işlemde tek bir veri kümesinde birleştirir.',
                    theory: 'Uzun dayanıklılık testleri ve filo verileri çoğu zaman zamana ya da kaydediciye göre bölünmüş yüzlerce/binlerce küçük dosya olarak gelir. Toplu Dosya Birleştirici, tüm bir dizini içeri alır, kanal düzenini normalleştirir ve tek sürekli bir veri kümesi üretir; böylece kampanyayı dosya dosya değil bütün olarak analiz edersiniz.',
                },
            },
            {
                id: 'database_widget',
                en: {
                    name: 'Database Connector',
                    summary: 'Pulls measurement data directly from SQL / time-series databases.',
                    theory: 'When test data already lives in a historian or SQL database, exporting to files is wasteful. The Database Connector queries the source directly and streams the result into the analysis engine, keeping a single source of truth and avoiding stale CSV copies.',
                },
                tr: {
                    name: 'Veritabanı Bağlayıcısı',
                    summary: 'Ölçüm verisini doğrudan SQL / zaman-serisi veritabanlarından çeker.',
                    theory: 'Test verisi zaten bir historian veya SQL veritabanında yaşıyorsa, dosyaya dışa aktarmak israftır. Veritabanı Bağlayıcısı kaynağı doğrudan sorgular ve sonucu analiz motoruna akıtır; tek doğruluk kaynağını korur ve eskimiş CSV kopyalarından kaçınır.',
                },
            },
        ],
    },

    // ── 2. PREPROCESSING ──────────────────────────────────────────────────────
    {
        id: 'preprocessing',
        accent: '#3b82f6',
        status: 'available',
        en: { name: 'Preprocessing', blurb: 'Clean, reshape, normalize and compute new channels before analysis.' },
        tr: { name: 'Ön İşleme', blurb: 'Analiz öncesi veriyi temizleme, yeniden şekillendirme, normalleştirme ve yeni kanal hesaplama.' },
        widgets: [
            {
                id: 'channel_selector',
                en: { name: 'Channel Selector', summary: 'Selects channels by name, tag or regular expression from datasets with thousands of columns.', theory: 'Large DAQ files can hold thousands of channels. The Channel Selector lets you narrow to the handful you actually need using exact names, tag groups or regex patterns, which keeps every downstream operation fast and memory-light.' },
                tr: { name: 'Kanal Seçici', summary: 'Binlerce sütunlu veri kümelerinden kanalları ada, etikete veya düzenli ifadeye (regex) göre seçer.', theory: 'Büyük DAQ dosyaları binlerce kanal içerebilir. Kanal Seçici; tam adlar, etiket grupları veya regex desenleri kullanarak gerçekten ihtiyaç duyduğunuz birkaç kanala daralmanızı sağlar ve böylece sonraki tüm işlemler hızlı ve düşük bellekli kalır.' },
            },
            {
                id: 'datetime_parser',
                en: { name: 'DateTime Parser', summary: 'Parses text timestamps into a proper time axis and converts between time zones / formats.', theory: 'Timestamps arrive in dozens of formats — ISO 8601, US/EU date orders, epoch seconds, separate date and time columns. The DateTime Parser turns these into a single monotonic time axis with nanosecond precision, the prerequisite for any resampling, alignment or time-domain plot.' },
                tr: { name: 'Tarih-Saat Ayrıştırıcı', summary: 'Metin zaman damgalarını gerçek bir zaman eksenine ayrıştırır; saat dilimleri/formatlar arasında dönüştürür.', theory: 'Zaman damgaları onlarca farklı formatta gelir — ISO 8601, ABD/AB tarih sıraları, epoch saniyesi, ayrı tarih ve saat sütunları. Tarih-Saat Ayrıştırıcı bunları nanosaniye hassasiyetli tek ve monoton bir zaman eksenine çevirir; bu da her türlü yeniden örnekleme, hizalama veya zaman-düzlemi grafiğinin ön koşuludur.' },
            },
            {
                id: 'formula_math_channel',
                en: { name: 'Formula / Math Channel', summary: 'Creates new derived channels from a math expression over existing channels.', theory: 'Often the quantity you care about is not measured directly but computed from several channels — e.g. power = voltage × current, or a resultant = √(x²+y²+z²). The Formula Math Channel evaluates a vectorized expression across the whole record in C++ and writes the result as a new channel, with no Python row loops.' },
                tr: { name: 'Formül / Matematik Kanalı', summary: 'Mevcut kanallar üzerinde bir matematik ifadesinden yeni türetilmiş kanallar oluşturur.', theory: 'Çoğu zaman önemsediğiniz büyüklük doğrudan ölçülmez, birkaç kanaldan hesaplanır — örn. güç = gerilim × akım veya bileşke = √(x²+y²+z²). Formül Matematik Kanalı, vektörleştirilmiş bir ifadeyi tüm kayıt boyunca C++ içinde değerlendirir ve sonucu Python satır döngüsü olmadan yeni bir kanal olarak yazar.' },
            },
            {
                id: 'groupby_aggregation',
                en: { name: 'Group By & Aggregation', summary: 'Groups rows by a key and reduces each group with mean, sum, min, max, std and more.', theory: 'Aggregation answers questions like "average temperature per test phase" or "peak vibration per RPM bin". You choose grouping keys and aggregation functions, and the engine performs the reduction with SIMD-accelerated passes over the data.' },
                tr: { name: 'Gruplama ve Toplulaştırma', summary: 'Satırları bir anahtara göre gruplar ve her grubu ortalama, toplam, min, max, std vb. ile özetler.', theory: 'Toplulaştırma "test fazı başına ortalama sıcaklık" ya da "RPM kutusu başına tepe titreşim" gibi soruları yanıtlar. Gruplama anahtarlarını ve toplulaştırma fonksiyonlarını seçersiniz; motor bu indirgemeyi veri üzerinde SIMD-hızlandırmalı geçişlerle yapar.' },
            },
            {
                id: 'missing_data_outliers',
                en: { name: 'Missing Data & Outliers', summary: 'Detects and fills NaN gaps and removes statistical outliers (Z-score, IQR, MAD).', theory: 'Real sensor data has dropouts and glitches. This widget fills gaps (forward/backward fill, interpolation) and flags or removes outliers using robust statistics like the median absolute deviation (MAD), which is far less fooled by extreme values than the standard deviation. Cleaning here protects every downstream calculation from being skewed by bad samples.' },
                tr: { name: 'Eksik Veri ve Aykırı Değerler', summary: 'NaN boşluklarını tespit edip doldurur ve istatistiksel aykırı değerleri kaldırır (Z-skor, IQR, MAD).', theory: 'Gerçek sensör verisinde kopmalar ve sıçramalar olur. Bu widget boşlukları doldurur (ileri/geri doldurma, ara değerleme) ve medyan mutlak sapma (MAD) gibi sağlam (robust) istatistiklerle aykırı değerleri işaretler/kaldırır; MAD, standart sapmaya göre uç değerlerden çok daha az etkilenir. Buradaki temizlik, sonraki tüm hesapların hatalı örneklerle çarpıtılmasını önler.' },
            },
            {
                id: 'normalization_scaling',
                en: { name: 'Normalization & Scaling', summary: 'Rescales channels: Z-score (standard), Min-Max, robust, log and calibration scaling.', theory: 'Channels measured in different units and ranges cannot be compared or fed to most ML models directly. Normalization brings them onto a common scale: Z-score centers to zero mean / unit variance, Min-Max maps to [0,1], robust scaling uses median/IQR to resist outliers, and calibration scaling applies an engineering gain/offset to convert raw counts into physical units.' },
                tr: { name: 'Normalleştirme ve Ölçekleme', summary: 'Kanalları yeniden ölçekler: Z-skor (standart), Min-Max, robust, logaritmik ve kalibrasyon ölçekleme.', theory: 'Farklı birim ve aralıklarda ölçülen kanallar doğrudan karşılaştırılamaz veya çoğu ML modeline verilemez. Normalleştirme onları ortak bir ölçeğe getirir: Z-skor sıfır ortalama/birim varyansa merkezler, Min-Max [0,1] aralığına eşler, robust ölçekleme aykırılara dayanmak için medyan/IQR kullanır, kalibrasyon ölçekleme ise ham sayımları fiziksel birimlere çevirmek için mühendislik kazanç/ofset uygular.' },
            },
            {
                id: 'python_script',
                en: { name: 'Python Script', summary: 'Runs custom user Python (NumPy / Polars / PyArrow) for operations no built-in widget covers.', theory: 'No fixed widget set can cover every analysis. The Python Script node is the escape hatch: write a small vectorized script against the incoming data and return a new dataset. It is intended for genuinely custom logic — heavy data loops should still live in the C++ engine, but bespoke glue and one-off transforms belong here.' },
                tr: { name: 'Python Betiği', summary: 'Hazır widget\'ların kapsamadığı işlemler için özel kullanıcı Python\'u (NumPy / Polars / PyArrow) çalıştırır.', theory: 'Sabit bir widget kümesi her analizi kapsayamaz. Python Betiği düğümü kaçış kapısıdır: gelen veri üzerinde küçük, vektörleştirilmiş bir betik yazıp yeni bir veri kümesi döndürürsünüz. Gerçekten özel mantık içindir — ağır veri döngüleri yine C++ motorunda kalmalı, ama özel yapıştırıcı kod ve tek seferlik dönüşümler buraya aittir.' },
            },
            {
                id: 'resample_align',
                en: { name: 'Resample & Align', summary: 'Resamples channels to a common rate and aligns multiple time bases onto one axis.', theory: 'Multi-system tests mix channels sampled at, say, 51.2 kHz and 100 Hz. Most cross-channel math (correlation, FRF, fusion) requires a common time base. Resample & Align up/down-samples with proper anti-aliasing and interpolates onto a shared, uniform axis so signals from different acquisition systems can be compared sample-for-sample.' },
                tr: { name: 'Yeniden Örnekleme ve Hizalama', summary: 'Kanalları ortak bir hıza yeniden örnekler ve birden çok zaman tabanını tek eksende hizalar.', theory: 'Çok sistemli testler örneğin 51,2 kHz ve 100 Hz\'te örneklenen kanalları karıştırır. Kanal-arası matematiğin çoğu (korelasyon, FRF, füzyon) ortak bir zaman tabanı gerektirir. Yeniden Örnekleme ve Hizalama, uygun kıvrım-önleme (anti-aliasing) ile yukarı/aşağı örnekler ve paylaşılan, düzgün bir eksene ara değer atar; böylece farklı toplama sistemlerinden gelen sinyaller örnek-örnek karşılaştırılabilir.' },
            },
            {
                id: 'rolling_window_stats',
                en: { name: 'Rolling / Window Stats', summary: 'Computes moving statistics (mean, std, RMS, min, max) over a sliding window.', theory: 'A rolling window turns a noisy raw signal into a trend you can read. Moving RMS, for example, tracks how vibration energy rises and falls over a test; a moving mean smooths drift. The window length sets the trade-off between responsiveness and smoothness.' },
                tr: { name: 'Kayan Pencere İstatistikleri', summary: 'Kayan bir pencere üzerinde hareketli istatistikler (ortalama, std, RMS, min, max) hesaplar.', theory: 'Kayan pencere, gürültülü ham bir sinyali okuyabileceğiniz bir eğilime dönüştürür. Örneğin hareketli RMS, titreşim enerjisinin test boyunca nasıl yükselip düştüğünü izler; hareketli ortalama sürüklenmeyi yumuşatır. Pencere uzunluğu, tepkisellik ile yumuşaklık arasındaki dengeyi belirler.' },
            },
            {
                id: 'row_operations',
                en: { name: 'Row Operations (Query & Sort)', summary: 'Filters rows by logical conditions and sorts by one or more columns.', theory: 'Sometimes you only want the portion of a test where a condition held — RPM above 3000, throttle wide open, a specific phase flag. Row Operations applies query expressions to keep matching rows and sorts the result, all as a vectorized engine pass rather than a Python loop.' },
                tr: { name: 'Satır İşlemleri (Sorgu ve Sıralama)', summary: 'Satırları mantıksal koşullara göre filtreler ve bir veya birden çok sütuna göre sıralar.', theory: 'Bazen testin yalnızca bir koşulun sağlandığı kısmını istersiniz — 3000 üstü RPM, tam gaz, belirli bir faz bayrağı. Satır İşlemleri, eşleşen satırları tutmak için sorgu ifadeleri uygular ve sonucu sıralar; tümü bir Python döngüsü değil vektörleştirilmiş bir motor geçişi olarak.' },
            },
            {
                id: 'table_edit',
                en: { name: 'Table Edit (Diff Layer)', summary: 'Spreadsheet-style cell editing with a non-destructive diff layer over the original data.', theory: 'Manual corrections — fixing a mislabeled channel, nulling a known-bad sample — should never silently overwrite raw data. Table Edit records your changes as a diff layer on top of the immutable source; small edit sets stay in the manifest while large ones materialize to a derived channel, so the original recording is always recoverable.' },
                tr: { name: 'Tablo Düzenleme (Diff Katmanı)', summary: 'Orijinal verinin üzerine tahribatsız bir diff katmanıyla elektronik tablo tarzı hücre düzenleme.', theory: 'Manuel düzeltmeler — yanlış etiketli bir kanalı düzeltmek, bilinen bozuk bir örneği boşaltmak — ham veriyi asla sessizce ezmemelidir. Tablo Düzenleme, değişikliklerinizi değişmez kaynağın üstünde bir diff katmanı olarak kaydeder; küçük düzenleme kümeleri manifestte kalır, büyük olanlar türetilmiş bir kanala maddeleştirilir, böylece orijinal kayıt her zaman geri alınabilir.' },
            },
            {
                id: 'transpose_pivot',
                en: { name: 'Transpose & Pivot', summary: 'Reshapes tables: swaps rows/columns or pivots long data into a wide matrix.', theory: 'Data shape rarely matches the analysis you want. Transpose swaps the row/column axes; pivot turns "long" records (key, value pairs) into a "wide" matrix indexed by category. Both are bounded to a safe row limit to protect memory, and are essential for getting data into the layout a plot or model expects.' },
                tr: { name: 'Devrik ve Pivot', summary: 'Tabloları yeniden şekillendirir: satır/sütun yer değiştirir veya uzun veriyi geniş matrise pivotlar.', theory: 'Veri şekli istediğiniz analize nadiren uyar. Devrik (transpose) satır/sütun eksenlerini yer değiştirir; pivot, "uzun" kayıtları (anahtar, değer çiftleri) kategoriye göre indekslenmiş "geniş" bir matrise dönüştürür. İkisi de belleği korumak için güvenli bir satır sınırına bağlıdır ve veriyi bir grafiğin veya modelin beklediği düzene sokmak için gereklidir.' },
            },
            {
                id: 'merge_split_operations',
                en: { name: 'Merge / Split Operations', summary: 'Splits one column into several or merges several columns into one.', theory: 'Composite fields are common: a "device_id_axis" string that should become two columns, or separate X/Y/Z columns you want joined into a vector label. This widget splits on a delimiter or merges with a separator, reshaping channel naming and structure without touching the underlying samples.' },
                tr: { name: 'Birleştir / Ayır İşlemleri', summary: 'Bir sütunu birkaç sütuna ayırır veya birkaç sütunu tek sütunda birleştirir.', theory: 'Birleşik alanlar yaygındır: iki sütuna ayrılması gereken bir "cihaz_id_eksen" metni ya da bir vektör etiketinde birleştirmek istediğiniz ayrı X/Y/Z sütunları. Bu widget bir ayraçta böler veya bir ayırıcıyla birleştirir; alttaki örneklere dokunmadan kanal adlandırmasını ve yapısını yeniden şekillendirir.' },
            },
            {
                id: 'type_encoding_converter',
                en: { name: 'Data Type & Encoding Converter', summary: 'Converts column data types (int/float/string/category) and fixes text encoding issues.', theory: 'Imported data often has the wrong type — numbers stored as text, categories as floats — or corrupted character encoding from a legacy logger. This widget casts columns to the correct type and repairs mojibake (garbled UTF-8/Latin-1), which is frequently the difference between a column that plots and one that errors out.' },
                tr: { name: 'Veri Türü ve Kodlama Dönüştürücü', summary: 'Sütun veri türlerini (int/float/metin/kategori) dönüştürür ve metin kodlama sorunlarını düzeltir.', theory: 'İçe aktarılan veri çoğu zaman yanlış türdedir — metin olarak saklanan sayılar, float olarak kategoriler — ya da eski bir kaydediciden bozuk karakter kodlaması taşır. Bu widget sütunları doğru türe dönüştürür ve bozuk karakterleri (UTF-8/Latin-1 mojibake) onarır; bu çoğu zaman grafiği çizilen bir sütun ile hata veren bir sütun arasındaki farktır.' },
            },
        ],
    },

    // ── 3. SIGNAL FILTERS ──────────────────────────────────────────────────────
    {
        id: 'filters',
        accent: '#a855f7',
        status: 'available',
        en: { name: 'Signal Filters', blurb: 'Isolate frequency bands, smooth, differentiate and clean signals.' },
        tr: { name: 'Sinyal Filtreleri', blurb: 'Frekans bantlarını ayıklama, yumuşatma, türev alma ve sinyal temizleme.' },
        widgets: [
            {
                id: 'frequency_filter',
                en: { name: 'Frequency Filter', summary: 'IIR/FIR low-pass, high-pass, band-pass and band-stop filters (Butterworth, Bessel, Chebyshev, Elliptic, windowed-sinc).', theory: 'A frequency filter keeps the frequency bands you want and rejects the rest. Butterworth gives a maximally flat pass-band; Chebyshev and Elliptic trade ripple for a sharper cutoff; Bessel preserves wave shape (linear phase). Choosing the right family and order is a trade-off between roll-off steepness, phase distortion and ringing. The widget streams via overlap-save so the filter is mathematically correct even on 200 GB files, where naive per-chunk filtering would corrupt every chunk boundary.' },
                tr: { name: 'Frekans Filtresi', summary: 'IIR/FIR alçak-geçiren, yüksek-geçiren, bant-geçiren ve bant-durduran filtreler (Butterworth, Bessel, Chebyshev, Elliptik, pencereli-sinc).', theory: 'Frekans filtresi istediğiniz frekans bantlarını tutar, gerisini reddeder. Butterworth maksimum düz bir geçiş bandı verir; Chebyshev ve Elliptik daha keskin kesim için dalgalanma takas eder; Bessel dalga şeklini korur (doğrusal faz). Doğru aileyi ve dereceyi seçmek; kesim dikliği, faz bozulması ve çınlama arasında bir dengedir. Widget, overlap-save ile akıtır; böylece filtre 200 GB dosyalarda bile matematiksel olarak doğrudur — naif parça-başı filtreleme her parça sınırını bozardı.' },
            },
            {
                id: 'kalman_filter',
                en: { name: 'Kalman Filter', summary: 'Optimal recursive smoother that estimates true state from noisy measurements.', theory: 'The Kalman filter is the gold standard for estimating a hidden true value from noisy observations. It maintains a running estimate and its uncertainty, then optimally blends each new measurement against a prediction — trusting the sensor more when it is precise and the model more when it is noisy. It is ubiquitous in navigation, sensor fusion and tracking. The process- and measurement-noise settings tune how aggressively it smooths.' },
                tr: { name: 'Kalman Filtresi', summary: 'Gürültülü ölçümlerden gerçek durumu kestiren en iyi (optimal) özyinelemeli yumuşatıcı.', theory: 'Kalman filtresi, gürültülü gözlemlerden gizli gerçek değeri kestirmenin altın standardıdır. Bir çalışan tahmini ve onun belirsizliğini tutar, sonra her yeni ölçümü bir öngörüye karşı optimal biçimde harmanlar — sensör hassasken ona, gürültülüyken modele daha çok güvenir. Navigasyon, sensör füzyonu ve takipte her yerdedir. Süreç- ve ölçüm-gürültüsü ayarları, ne kadar agresif yumuşatacağını belirler.' },
            },
            {
                id: 'math_transform',
                en: { name: 'Math & Calculus', summary: 'Integration, differentiation and absolute-value transforms on signals.', theory: 'Many physical relationships are derivatives or integrals: velocity is the integral of acceleration, jerk is its derivative. This widget integrates (e.g. accel → velocity → displacement) and differentiates in the frequency domain, which is far more numerically stable than naive finite differences and avoids the drift that plagues time-domain integration.' },
                tr: { name: 'Matematik ve Kalkülüs', summary: 'Sinyaller üzerinde integral, türev ve mutlak-değer dönüşümleri.', theory: 'Birçok fiziksel ilişki türev veya integraldir: hız, ivmenin integralidir; jerk ise türevidir. Bu widget frekans düzleminde integral alır (örn. ivme → hız → yer değiştirme) ve türev alır; bu, naif sonlu farklardan çok daha kararlıdır ve zaman düzlemi integralini bozan sürüklenmeyi (drift) önler.' },
            },
            {
                id: 'range_filter',
                en: { name: 'Range Filter', summary: 'Keeps only samples whose value falls inside (or outside) a parameter range.', theory: 'Sometimes valid data only exists within an operating window — coolant temperature between two limits, RPM in a band of interest. The Range Filter gates the signal on amplitude, passing only samples inside the chosen bounds, which is handy for isolating steady-state segments from transients.' },
                tr: { name: 'Aralık Filtresi', summary: 'Yalnızca değeri bir parametre aralığının içinde (veya dışında) kalan örnekleri tutar.', theory: 'Bazen geçerli veri yalnızca bir çalışma penceresinde bulunur — iki limit arasındaki soğutucu sıcaklığı, ilgilenilen banttaki RPM. Aralık Filtresi sinyali genliğe göre kapılar; yalnızca seçilen sınırlar içindeki örnekleri geçirir. Bu, kalıcı-durum bölümlerini geçici rejimlerden ayırmak için kullanışlıdır.' },
            },
            {
                id: 'smoothing_filter',
                en: { name: 'Smoothing Filter', summary: 'Moving-average (SMA/EMA) and Savitzky-Golay smoothing.', theory: 'Smoothing reduces noise while preserving the underlying shape. Simple and exponential moving averages are fast but blur peaks; the Savitzky-Golay filter fits a local polynomial within the window, so it smooths noise while preserving peak height and width far better — important when the peaks themselves carry the information.' },
                tr: { name: 'Yumuşatma Filtresi', summary: 'Hareketli ortalama (SMA/EMA) ve Savitzky-Golay yumuşatma.', theory: 'Yumuşatma, alttaki şekli koruyarak gürültüyü azaltır. Basit ve üstel hareketli ortalamalar hızlıdır ama tepeleri bulanıklaştırır; Savitzky-Golay filtresi pencere içinde yerel bir polinom uydurur, böylece gürültüyü yumuşatırken tepe yüksekliğini ve genişliğini çok daha iyi korur — tepelerin kendisi bilgi taşıdığında önemlidir.' },
            },
            {
                id: 'spike_detection',
                en: { name: 'Spike Detection', summary: 'Detects and removes transient spike artifacts (Z-score, MAD, absolute threshold).', theory: 'Electrical interference and loose connections create single-sample spikes that ruin statistics and FFTs. Spike Detection flags samples that deviate too far from their neighbors — using robust MAD-based thresholds that are not themselves thrown off by the spikes — and replaces them, cleaning the signal without distorting genuine transients.' },
                tr: { name: 'Ani Sıçrama (Spike) Tespiti', summary: 'Geçici sıçrama bozucularını tespit eder ve kaldırır (Z-skor, MAD, mutlak eşik).', theory: 'Elektriksel girişim ve gevşek bağlantılar, istatistikleri ve FFT\'leri bozan tek-örneklik sıçramalar oluşturur. Sıçrama Tespiti, komşularından çok uzağa sapan örnekleri işaretler — sıçramalardan kendisi etkilenmeyen robust, MAD-tabanlı eşikler kullanarak — ve onları değiştirir; gerçek geçici rejimleri bozmadan sinyali temizler.' },
            },
            {
                id: 'advanced_diagnostics',
                en: { name: 'Advanced Diagnostics', summary: 'Envelope detection (Hilbert), order tracking and cepstrum building blocks for fault analysis.', theory: 'This widget bundles the demodulation primitives that machinery diagnostics rely on: the Hilbert transform extracts a signal\'s envelope (revealing repetitive impacts buried under structural resonance), and cepstrum analysis exposes periodic families of harmonics and sidebands. These are the same techniques the dedicated bearing- and gear-fault modules use, available here as a general-purpose stage.' },
                tr: { name: 'Gelişmiş Tanılama', summary: 'Arıza analizi için zarf tespiti (Hilbert), order takibi ve cepstrum yapı taşları.', theory: 'Bu widget, makine tanılamasının dayandığı demodülasyon ilkellerini bir araya getirir: Hilbert dönüşümü bir sinyalin zarfını çıkarır (yapısal rezonans altında gizli tekrarlayan darbeleri ortaya çıkarır) ve cepstrum analizi periyodik harmonik ve yan-bant ailelerini açığa çıkarır. Bunlar, özel rulman ve dişli arıza modüllerinin kullandığı tekniklerle aynıdır; burada genel amaçlı bir aşama olarak sunulur.' },
            },
        ],
    },

    // ── 4. ANALYSIS ────────────────────────────────────────────────────────────
    {
        id: 'analysis',
        accent: '#f59e0b',
        status: 'available',
        en: { name: 'Analysis', blurb: 'Frequency-domain and statistical analysis of signals.' },
        tr: { name: 'Analiz', blurb: 'Sinyallerin frekans-düzlemi ve istatistiksel analizi.' },
        widgets: [
            {
                id: 'fft_spectrum',
                en: { name: 'FFT / Spectrum Analysis', summary: 'FFT, Welch PSD and phase spectrum with selectable windows and averaging.', theory: 'The Fast Fourier Transform converts a time signal into its frequency content, revealing resonances, harmonics and faults invisible in the raw trace. Welch\'s method averages many overlapping segments to produce a smooth Power Spectral Density (PSD) with low variance — the standard for random/vibration data. Window choice (Hann, Flat-top, etc.) trades frequency resolution against amplitude accuracy and spectral leakage; the platform computes all of this in a C++ FFTW engine.' },
                tr: { name: 'FFT / Spektrum Analizi', summary: 'Seçilebilir pencere ve ortalama ile FFT, Welch PSD ve faz spektrumu.', theory: 'Hızlı Fourier Dönüşümü bir zaman sinyalini frekans içeriğine çevirir; ham izde görünmeyen rezonansları, harmonikleri ve arızaları ortaya çıkarır. Welch yöntemi, çok sayıda örtüşen bölümü ortalayarak düşük varyanslı düzgün bir Güç Spektral Yoğunluğu (PSD) üretir — rastgele/titreşim verisi için standarttır. Pencere seçimi (Hann, Flat-top vb.) frekans çözünürlüğünü genlik doğruluğu ve spektral sızıntıya karşı takas eder; platform tüm bunları C++ FFTW motorunda hesaplar.' },
            },
            {
                id: 'statistics_summary',
                en: { name: 'Statistics Summary', summary: 'Per-channel descriptive statistics: mean, RMS, std, min, max, kurtosis, skewness.', theory: 'Before any deep analysis, a statistical summary gives the lay of the land. RMS quantifies energy, kurtosis flags impulsiveness (a classic early-bearing-fault indicator), and min/max bound the operating range. The summary computes these in a single SIMD pass per channel and is the fastest way to triage a large dataset.' },
                tr: { name: 'İstatistik Özeti', summary: 'Kanal başına betimsel istatistikler: ortalama, RMS, std, min, max, basıklık, çarpıklık.', theory: 'Herhangi bir derin analizden önce, istatistiksel özet genel bir resim verir. RMS enerjiyi niceler, basıklık (kurtosis) darbeselliği işaret eder (klasik bir erken-rulman-arızası göstergesi) ve min/max çalışma aralığını sınırlar. Özet, bunları kanal başına tek bir SIMD geçişinde hesaplar ve büyük bir veri kümesini triyaj etmenin en hızlı yoludur.' },
            },
        ],
    },

    // ── 5. VISUALIZATION ───────────────────────────────────────────────────────
    {
        id: 'visualization',
        accent: '#10b981',
        status: 'available',
        en: { name: 'Visualization', blurb: 'High-performance interactive charts: time, frequency, distribution and 2D/3D.' },
        tr: { name: 'Görselleştirme', blurb: 'Yüksek performanslı etkileşimli grafikler: zaman, frekans, dağılım ve 2B/3B.' },
        widgets: [
            {
                id: 'time_graphics',
                en: { name: 'Time Graphics', summary: 'Multi-channel time-series viewer with synchronized cursors and LOD rendering.', theory: 'The workhorse plot for engineering data. It renders billions of samples at 60 FPS using a Level-of-Detail pyramid (min-max decimation that preserves every peak), so you can pan and zoom from the whole test down to a single cycle without ever loading the full channel into memory. Synchronized cursors read out exact values and deltas across all signals.' },
                tr: { name: 'Zaman Grafikleri', summary: 'Senkronize imleçler ve LOD render ile çok kanallı zaman serisi görüntüleyici.', theory: 'Mühendislik verisinin beygir-gücü grafiği. Bir Detay-Seviyesi (LOD) piramidi kullanarak milyarlarca örneği 60 FPS\'te çizer (her tepeyi koruyan min-max seyreltme); böylece tüm testten tek bir çevrime kadar, kanalın tamamını belleğe yüklemeden kaydırıp yakınlaşabilirsiniz. Senkronize imleçler tüm sinyallerde kesin değerleri ve farkları okur.' },
            },
            {
                id: 'line_chart',
                en: { name: 'Line Chart', summary: 'OpenGL-accelerated multi-signal line chart for general X-Y trends.', theory: 'A general-purpose line chart for plotting one or more series against a common axis. OpenGL acceleration keeps interaction smooth even with dense data, making it suitable for trends, comparisons and any continuous relationship.' },
                tr: { name: 'Çizgi Grafiği', summary: 'Genel X-Y eğilimleri için OpenGL hızlandırmalı çok sinyalli çizgi grafiği.', theory: 'Bir veya daha çok seriyi ortak bir eksene karşı çizmek için genel amaçlı çizgi grafiği. OpenGL hızlandırma, yoğun veride bile etkileşimi akıcı tutar; eğilimler, karşılaştırmalar ve sürekli ilişkiler için uygundur.' },
            },
            {
                id: 'scatter_plot',
                en: { name: 'Scatter Plot', summary: 'X-Y scatter with reservoir sampling and OLS / Theil-Sen regression overlays.', theory: 'A scatter plot reveals the relationship between two variables. For huge datasets it uses reservoir sampling to draw a representative cloud without plotting every point, and overlays a regression line — ordinary least squares (OLS) for clean data, or robust Theil-Sen, which resists outliers — to quantify the trend and its strength.' },
                tr: { name: 'Saçılım Grafiği', summary: 'Rezervuar örnekleme ve OLS / Theil-Sen regresyon katmanları ile X-Y saçılımı.', theory: 'Saçılım grafiği iki değişken arasındaki ilişkiyi ortaya koyar. Çok büyük veri kümeleri için, her noktayı çizmeden temsili bir bulut çizmek üzere rezervuar örnekleme kullanır ve eğilimi ile gücünü nicelemek için bir regresyon çizgisi ekler — temiz veri için en küçük kareler (OLS) ya da aykırılara dayanan robust Theil-Sen.' },
            },
            {
                id: 'histogram_widget',
                en: { name: 'Histogram', summary: 'Frequency distribution chart with KDE overlay and statistical markers.', theory: 'A histogram shows how often values fall into each bin, revealing the distribution\'s shape — normal, skewed, bimodal. A Kernel Density Estimate (KDE) overlays a smooth continuous estimate, and markers for mean, median and standard deviation put the descriptive statistics in visual context.' },
                tr: { name: 'Histogram', summary: 'KDE katmanı ve istatistiksel işaretleyicilerle frekans dağılımı grafiği.', theory: 'Histogram, değerlerin her kutuya ne sıklıkla düştüğünü gösterir ve dağılımın şeklini ortaya çıkarır — normal, çarpık, çift tepeli. Çekirdek Yoğunluk Tahmini (KDE) düzgün, sürekli bir tahmin ekler; ortalama, medyan ve standart sapma işaretleyicileri betimsel istatistikleri görsel bağlama oturtur.' },
            },
            {
                id: 'box_plot',
                en: { name: 'Box Plot', summary: 'Box-and-whisker chart with percentile whiskers, outliers and mean markers.', theory: 'The box plot is the compact way to compare distributions across groups. The box spans the interquartile range (IQR), the line is the median, whiskers reach to the data extent (or 1.5×IQR), and points beyond are flagged outliers. Side-by-side boxes make differences between test conditions immediately obvious.' },
                tr: { name: 'Kutu Grafiği', summary: 'Yüzdelik bıyıkları, aykırı değerleri ve ortalama işaretleyicileriyle kutu-bıyık grafiği.', theory: 'Kutu grafiği, gruplar arası dağılımları karşılaştırmanın derli toplu yoludur. Kutu çeyrekler-arası aralığı (IQR) kapsar, çizgi medyandır, bıyıklar veri kapsamına (veya 1,5×IQR\'ye) uzanır ve ötesindeki noktalar aykırı değer olarak işaretlenir. Yan yana kutular, test koşulları arasındaki farkları anında belirgin kılar.' },
            },
            {
                id: 'bar_chart',
                en: { name: 'Bar Chart', summary: 'Single-series categorical bar chart.', theory: 'A bar chart compares a quantity across discrete categories — counts per class, peak value per test, score per configuration. Simple, unambiguous and ideal for summary results destined for a report.' },
                tr: { name: 'Çubuk Grafiği', summary: 'Tek serili kategorik çubuk grafiği.', theory: 'Çubuk grafiği bir büyüklüğü ayrık kategoriler arasında karşılaştırır — sınıf başına sayım, test başına tepe değer, yapılandırma başına skor. Basit, açık ve rapora gidecek özet sonuçlar için idealdir.' },
            },
            {
                id: 'bar_plot',
                en: { name: 'Bar Plot (Grouped/Stacked)', summary: 'Categorical bar plot with grouping and stacking for multi-series comparison.', theory: 'When several series share the same categories, grouped bars place them side by side for direct comparison, while stacked bars show how each series contributes to a total. Useful for breaking down, say, energy or damage contributions per component across conditions.' },
                tr: { name: 'Çubuk Grafik (Gruplu/Yığılı)', summary: 'Çok serili karşılaştırma için gruplama ve yığma destekli kategorik çubuk grafik.', theory: 'Birkaç seri aynı kategorileri paylaştığında, gruplu çubuklar doğrudan karşılaştırma için onları yan yana koyar; yığılı çubuklar ise her serinin toplama katkısını gösterir. Örneğin koşullar arası bileşen başına enerji veya hasar katkılarını ayrıştırmak için kullanışlıdır.' },
            },
            {
                id: 'frequency_domain',
                en: { name: 'Frequency Domain', summary: 'Spectrum viewer: magnitude, dB, PSD, phase and Bode presentation.', theory: 'A dedicated viewer for frequency-domain results. It can show linear magnitude, decibel scale, power spectral density, phase, or a combined Bode (magnitude + phase vs frequency) layout — the right presentation depending on whether you are reading resonance amplitudes, noise floors, or control-loop stability margins.' },
                tr: { name: 'Frekans Düzlemi', summary: 'Spektrum görüntüleyici: genlik, dB, PSD, faz ve Bode sunumu.', theory: 'Frekans-düzlemi sonuçları için özel bir görüntüleyici. Doğrusal genlik, desibel ölçeği, güç spektral yoğunluğu, faz veya birleşik Bode (frekansa karşı genlik + faz) düzenini gösterebilir — rezonans genliklerini, gürültü tabanını ya da kontrol-döngüsü kararlılık paylarını okumanıza göre doğru sunum değişir.' },
            },
            {
                id: 'order_map_view',
                en: { name: 'Order / Color Map View', summary: '2D heatmap and 3D surface viewer for matrix results (spectrograms, order maps, Campbell).', theory: 'Many results are 2D matrices — frequency vs time (spectrogram), order vs RPM (order map), or a Campbell diagram. This viewer renders them as a color heatmap or a 3D waterfall surface, with the color axis revealing how spectral content evolves as a machine runs up or coasts down.' },
                tr: { name: 'Order / Renk Haritası', summary: 'Matris sonuçları için 2B ısı haritası ve 3B yüzey görüntüleyici (spektrogram, order haritası, Campbell).', theory: 'Birçok sonuç 2B matristir — zamana karşı frekans (spektrogram), RPM\'e karşı order (order haritası) veya Campbell diyagramı. Bu görüntüleyici onları renkli bir ısı haritası ya da 3B şelale yüzeyi olarak çizer; renk ekseni, bir makine hızlanırken veya yavaşlarken spektral içeriğin nasıl evrildiğini gösterir.' },
            },
            {
                id: 'chart_dashboard',
                en: { name: 'Chart Dashboard', summary: 'Free-layout dashboard hosting multiple resizable, linked charts.', theory: 'A dashboard composes several plots into one synchronized view — time trace, spectrum and statistics side by side, with linked cursors so moving the time cursor updates every panel. It is how you build a custom monitoring layout for a specific machine or test.' },
                tr: { name: 'Grafik Panosu', summary: 'Birden çok yeniden boyutlandırılabilir, bağlı grafiği barındıran serbest yerleşimli pano.', theory: 'Pano, birkaç grafiği tek senkronize görünümde birleştirir — zaman izi, spektrum ve istatistikler yan yana, bağlı imleçlerle; zaman imlecini oynatınca her panel güncellenir. Belirli bir makine veya test için özel izleme düzeni kurmanın yoludur.' },
            },
        ],
    },
]

// Engineering categories are large and live in their own file for readability.
export const WIDGET_CATALOG = [...CORE_CATEGORIES, ...ENGINEERING_CATEGORIES]

export default WIDGET_CATALOG
