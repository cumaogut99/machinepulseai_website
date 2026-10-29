// Interface tours: Data Preprocessing group. Every string pair is [en, tr].
// Hotspot positions come from tourAnchors.js (measured in the running app).

const pt = (id, title, desc) => ({ id, title, desc })

const tableTool = (id, tab, summary, points) => ({ id, tab, summary, points })

export default {
    channel_selector: [
        {
            id: 'manual',
            tab: ['Manual selection', 'Elle seçim'],
            summary: [
                'Four of nine channels ticked by hand and passed on as a view. The right side explains what the view is: no data is copied, the time channel is kept automatically.',
                'Dokuz kanaldan dördü elle işaretlenmiş ve görünüm olarak iletilmiş. Sağ taraf görünümün ne olduğunu açıklar: veri kopyalanmaz, zaman kanalı otomatik olarak korunur.',
            ],
            points: [
                pt('mode', ['Mode', 'Mode (mod)'], [
                    'Manual selection uses the ticks in the list. The two regex modes choose channels by a name pattern instead.',
                    'Manual selection listedeki işaretleri kullanır. İki regex modu ise kanalları bir ad kalıbına göre seçer.',
                ]),
                pt('channels', ['Channels', 'Kanallar'], [
                    'Every channel of the source. Here sine_10hz, chirp_5_to_120hz, amp_modulated and decaying_osc are ticked; the other five will not be visible to the next widgets.',
                    'Kaynağın tüm kanalları. Burada sine_10hz, chirp_5_to_120hz, amp_modulated ve decaying_osc işaretli; diğer beşi sonraki widget’lara görünmeyecek.',
                ]),
                pt('selectall', ['Select All, Clear', 'Select All, Clear'], [
                    'Tick or untick everything at once; handy when you want all but two channels, or want to start again.',
                    'Hepsini bir kerede işaretler veya kaldırır; iki kanal hariç hepsini istediğinizde veya baştan başlamak istediğinizde kullanışlıdır.',
                ]),
                pt('create', ['Create Channel View', 'Create Channel View'], [
                    'Builds the view from the current selection. Downstream widgets connected to the Channel Selector now see only these channels plus time.',
                    'Mevcut seçimden görünümü oluşturur. Kanal Seçici’ye bağlı sonraki widget’lar artık yalnızca bu kanalları ve zamanı görür.',
                ]),
                pt('status', ['Result line', 'Sonuç satırı'], [
                    '“Projected 4 channel(s) without copying data”: the number to check against what you intended.',
                    '“Projected 4 channel(s) without copying data”: amaçladığınızla karşılaştıracağınız sayı.',
                ]),
                pt('info', ['Zero-copy projection', 'Kopyasız izdüşüm'], [
                    'The selected channels are read straight from the original MPAI file. Nothing is duplicated, which is why the selector responds instantly even on very large files.',
                    'Seçilen kanallar doğrudan özgün MPAI dosyasından okunur. Hiçbir şey çoğaltılmaz; seçicinin çok büyük dosyalarda bile anında tepki vermesinin nedeni budur.',
                ]),
            ],
        },
        {
            id: 'regex',
            tab: ['Selection by pattern', 'Kalıpla seçim'],
            summary: [
                'Mode “Include regex matches” with the pattern ^sine|chirp: every channel whose name starts with “sine” or contains “chirp” is selected, three in total.',
                '“Include regex matches” modu ve ^sine|chirp kalıbı: adı “sine” ile başlayan veya “chirp” içeren her kanal seçilir; toplam üç kanal.',
            ],
            points: [
                pt('mode', ['Include regex matches', 'Include regex matches'], [
                    'Keeps the channels whose name matches the pattern. “Exclude regex matches” does the opposite and keeps everything else.',
                    'Adı kalıpla eşleşen kanalları tutar. “Exclude regex matches” tersini yapar ve geri kalan her şeyi tutar.',
                ]),
                pt('pattern', ['Pattern', 'Pattern (kalıp)'], [
                    '^ means “starts with”, | means “or”. ^sine matches sine_10hz and sine_50hz_amp2 but not cosine; chirp without ^ matches the name anywhere. Patterns are case-sensitive.',
                    '^ “ile başlar”, | “veya” anlamına gelir. ^sine, sine_10hz ve sine_50hz_amp2 ile eşleşir ama cosine ile eşleşmez; ^ olmadan chirp adın herhangi bir yerinde eşleşir. Kalıplar büyük/küçük harfe duyarlıdır.',
                ]),
                pt('channels', ['The list', 'Liste'], [
                    'The ticks belong to manual mode; in a regex mode the pattern decides. The advantage: a later file with sine_100hz is picked up without touching the widget.',
                    'İşaretler elle seçim moduna aittir; regex modunda kalıp karar verir. Avantajı: daha sonraki sine_100hz içeren bir dosya widget’a dokunmadan seçilir.',
                ]),
                pt('status', ['3 channels projected', '3 kanal iletildi'], [
                    'The pattern matched three channels. If the count is lower than expected, compare the pattern with the exact spelling of the names.',
                    'Kalıp üç kanalla eşleşti. Sayı beklediğinizden düşükse kalıbı adların tam yazımıyla karşılaştırın.',
                ]),
            ],
        },
    ],
    merge_channels: [
        {
            id: 'stack',
            tab: ['Stack Rows', 'Alt alta ekleme'],
            summary: [
                'Two 20-second runs with the same channels (accel, pressure, temperature) connected as Input A and Input B. Stack Rows places the second run after the first: the preview holds 40,000 rows and 4 columns.',
                'Aynı kanallara (accel, pressure, temperature) sahip iki 20 saniyelik koşu Input A ve Input B olarak bağlı. Stack Rows ikinci koşuyu birincinin arkasına koyar: önizleme 40.000 satır ve 4 sütun içerir.',
            ],
            points: [
                pt('layout', ['Layout', 'Layout (düzen)'], [
                    'Stack Rows for repeated runs with the same channels; Append Columns to put different channels side by side, either on a checked shared time grid or simply by row number.',
                    'Aynı kanallı tekrarlanan koşular için Stack Rows; farklı kanalları yan yana koymak için Append Columns, ya kontrol edilmiş ortak bir zaman ızgarasında ya da yalnızca satır numarasına göre.',
                ]),
                pt('time', ['Time handling', 'Zaman işleme'], [
                    'Both runs start at t = 0. “Auto” continues the clock, so the second run starts at 20 s instead of jumping back to zero, and the merged time axis keeps increasing.',
                    'İki koşu da t = 0’da başlıyor. “Auto” saati devam ettirir; böylece ikinci koşu sıfıra dönmek yerine 20 s’de başlar ve birleşik zaman ekseni artmaya devam eder.',
                ]),
                pt('inputs', ['Input A and Input B', 'Input A ve Input B'], [
                    'The two connected datasets, each with its column count. A is placed first; swap the connections if the order should be reversed.',
                    'Bağlı iki veri kümesi, her biri sütun sayısıyla. A önce konur; sıranın tersine dönmesi gerekiyorsa bağlantıları değiştirin.',
                ]),
                pt('estimate', ['Estimate and rules', 'Tahmin ve kurallar'], [
                    'States what the merge will check, here that channel names and units must match, and summarises how each layout treats time.',
                    'Birleştirmenin neyi kontrol edeceğini belirtir; burada kanal adlarının ve birimlerin eşleşmesi gerektiğini; ayrıca her düzenin zamanı nasıl ele aldığını özetler.',
                ]),
                pt('preview', ['Merge Preview', 'Birleştirme önizlemesi'], [
                    'The merged table before anything is written: 40,000 rows, 4 columns. Scroll or use Jump to look at the join around row 20,000.',
                    'Hiçbir şey yazılmadan önce birleşik tablo: 40.000 satır, 4 sütun. Kaydırın veya Jump ile 20.000. satır civarındaki birleşim noktasına bakın.',
                ]),
                pt('create', ['Create Merged Dataset', 'Create Merged Dataset'], [
                    'Writes the result as a new MPAI dataset on the widget’s output. Inputs A and B are not changed.',
                    'Sonucu widget’ın çıkışında yeni bir MPAI veri kümesi olarak yazar. Input A ve B değiştirilmez.',
                ]),
            ],
        },
        {
            id: 'columns',
            tab: ['Append Columns (time grid)', 'Sütun ekleme (zaman ızgarası)'],
            summary: [
                'The same inputs with “Append Columns (same time grid)”: the channels of B are added next to those of A. The preview has 20,000 rows and 7 columns; the duplicated names of B received a prefix.',
                'Aynı girişler “Append Columns (same time grid)” ile: B’nin kanalları A’nınkilerin yanına eklenir. Önizlemede 20.000 satır ve 7 sütun var; B’nin tekrarlanan adlarına bir ön ek konmuş.',
            ],
            points: [
                pt('layout', ['Same time grid', 'Aynı zaman ızgarası'], [
                    'Rows are paired by time, after checking that both inputs share the same time step and overlap. This is the right choice for two loggers that recorded different sensors at the same rate.',
                    'Satırlar, iki girişin aynı zaman adımını paylaştığı ve örtüştüğü kontrol edildikten sonra zamana göre eşlenir. Aynı hızda farklı sensörleri kaydeden iki kaydedici için doğru seçim budur.',
                ]),
                pt('estimate', ['What is checked', 'Neyin kontrol edildiği'], [
                    'The note confirms that the shared physical time axis is verified before the result is published, so rows that do not belong to the same moment are not paired.',
                    'Not, ortak fiziksel zaman ekseninin sonuç yayımlanmadan önce doğrulandığını belirtir; böylece aynı ana ait olmayan satırlar eşlenmez.',
                ]),
                pt('preview', ['Prefixed duplicate names', 'Ön ekli tekrar adlar'], [
                    'Both inputs have accel and pressure, so B’s copies are renamed with a prefix that identifies their source. In this example both runs are the same test, which is why stacking, not side-by-side, is the sensible layout.',
                    'İki girişte de accel ve pressure var; bu yüzden B’nin kopyaları kaynaklarını belirten bir ön ekle yeniden adlandırılır. Bu örnekte iki koşu aynı test olduğu için mantıklı düzen yan yana değil, alt alta eklemedir.',
                ]),
            ],
        },
    ],
    table_edit: [
        tableTool('edit', ['Table and Edit', 'Tablo ve Edit'], [
            'A 250,000-row dataset as a table; only the rows on screen are read from the file. The vibration_clean column is selected.',
            '250.000 satırlık bir veri kümesi tablo olarak; dosyadan yalnızca ekrandaki satırlar okunur. vibration_clean sütunu seçili.',
        ], [
            pt('tools', ['Tool bar', 'Araç çubuğu'], [
                'Ten tools: Edit, Rows, Fill, Find, Formula, Transp., Type, Encode, Date and Resample. The selected tool opens its settings on the left. Table and Graph switch the centre view; Channels shows or hides the channel panel.',
                'On araç: Edit, Rows, Fill, Find, Formula, Transp., Type, Encode, Date ve Resample. Seçilen aracın ayarları solda açılır. Table ve Graph ortadaki görünümü değiştirir; Channels kanal panelini gösterir veya gizler.',
            ]),
            pt('table', ['The table', 'Tablo'], [
                'Double-click a cell to type a new value. Changed cells are collected as a list of edits; the recorded value stays in the file underneath.',
                'Yeni değer yazmak için bir hücreye çift tıklayın. Değişen hücreler bir düzenleme listesi olarak toplanır; kaydedilmiş değer altta dosyada kalır.',
            ]),
            pt('jump', ['Row #, Col #, Jump', 'Row #, Col #, Jump'], [
                'Type a row number, for example 17000000, and press Jump to go straight there. The table loads that block only.',
                'Bir satır numarası yazın, örneğin 17000000, ve doğrudan oraya gitmek için Jump’a basın. Tablo yalnızca o bloğu yükler.',
            ]),
            pt('stats', ['Column statistics', 'Sütun istatistikleri'], [
                'Minimum, maximum, mean, standard deviation and number of NaN values of the selected column. A maximum of 9999 in a temperature column is a quick hint of an error code.',
                'Seçili sütunun en küçük, en büyük, ortalama, standart sapma ve NaN değer sayısı. Bir sıcaklık sütununda 9999’luk bir en büyük değer, bir hata koduna dair hızlı bir ipucudur.',
            ]),
            pt('channels', ['Channels', 'Kanallar'], [
                'All channels of the dataset. In the Formula tool, clicking a name inserts it into the expression; in Graph view, ticking it draws it.',
                'Veri kümesinin tüm kanalları. Formula aracında bir ada tıklamak onu ifadeye ekler; Graph görünümünde işaretlemek onu çizer.',
            ]),
            pt('save', ['Save Edits', 'Save Edits'], [
                'Stores the collected cell edits. Up to 10,000 edits are kept as a light list of changes; beyond that they are written as a new channel. The original values remain available.',
                'Toplanan hücre düzenlemelerini saklar. 10.000 düzenlemeye kadar hafif bir değişiklik listesi tutulur; ötesinde yeni bir kanal olarak yazılır. Özgün değerler erişilebilir kalır.',
            ]),
        ]),
        tableTool('rows', ['Rows', 'Rows (satırlar)'], [
            'Removing or keeping rows by number or by condition.',
            'Satırları numaraya veya koşula göre silmek ya da tutmak.',
        ], [
            pt('action', ['Action', 'Action (işlem)'], [
                '“Delete row range(s)” removes rows by number. “Delete by condition” and “Keep by condition” use a rule on a column, such as speed < 100, to drop the idle part of a test or keep only a steady-state section.',
                '“Delete row range(s)” satırları numarayla siler. “Delete by condition” ve “Keep by condition” bir sütun üzerinde hız < 100 gibi bir kural kullanır; testin rölanti kısmını atmak veya yalnızca kararlı bir bölümü tutmak için.',
            ]),
            pt('rows', ['Rows', 'Rows (satırlar)'], [
                'Ranges and single rows separated by commas, for example 100-200, 5000, 8000-9000. Counting starts at 0 and both ends of a range are included.',
                'Virgülle ayrılmış aralıklar ve tek satırlar, örneğin 100-200, 5000, 8000-9000. Sayma 0’dan başlar ve bir aralığın iki ucu da dahildir.',
            ]),
            pt('apply', ['Apply Row Op', 'Apply Row Op'], [
                'Writes a new working copy without those rows; the original file is untouched, as the orange note says. Deleting rows from a time series leaves gaps in time, so check later widgets for that.',
                'Bu satırlar olmadan yeni bir çalışma kopyası yazar; turuncu notun dediği gibi özgün dosyaya dokunulmaz. Bir zaman serisinden satır silmek zamanda boşluk bırakır; sonraki widget’larda bunu kontrol edin.',
            ]),
        ]),
        tableTool('fill', ['Fill', 'Fill (doldur)'], [
            'Writing one value into a range of rows of one column.',
            'Bir sütunun bir satır aralığına tek bir değer yazmak.',
        ], [
            pt('column', ['Column', 'Column (sütun)'], [
                'The column to fill.',
                'Doldurulacak sütun.',
            ]),
            pt('range', ['Row range', 'Row range (satır aralığı)'], [
                'Start and End row. Leaving them empty fills the whole column.',
                'Başlangıç ve bitiş satırı. Boş bırakmak tüm sütunu doldurur.',
            ]),
            pt('mode', ['Fill mode and Value', 'Fill mode ve Value'], [
                '“Constant value” writes the number in Value. “NaN” marks the range as missing, the honest choice for a section where the sensor was disconnected. “Expression (x, i)” computes from the old value x and the row number i, for example x*9.81 to convert g to m/s² in part of a record.',
                '“Constant value” Value’daki sayıyı yazar. “NaN” aralığı eksik olarak işaretler; sensörün bağlı olmadığı bir bölüm için dürüst seçim budur. “Expression (x, i)” eski değer x ve satır numarası i üzerinden hesaplar; örneğin kaydın bir kısmında g’yi m/s²’ye çevirmek için x*9.81.',
            ]),
            pt('apply', ['Apply Bulk Fill', 'Apply Bulk Fill'], [
                'Writes the filled values as a new channel; the original stays for comparison.',
                'Doldurulmuş değerleri yeni bir kanal olarak yazar; özgün karşılaştırma için kalır.',
            ]),
        ]),
        tableTool('find', ['Find and NaN filling', 'Bul ve NaN doldurma'], [
            'Find and replace, here set up to fill NaN values by linear interpolation.',
            'Bul ve değiştir; burada NaN değerleri doğrusal ara değerle dolduracak şekilde ayarlanmış.',
        ], [
            pt('column', ['Column and All', 'Column ve All'], [
                'Search one column, or tick All to search every column. Searching all columns is convenient but can also replace a value that is legitimate in another channel.',
                'Bir sütunda arayın veya tüm sütunlarda aramak için All’ı işaretleyin. Tüm sütunlarda aramak pratiktir ama başka bir kanalda geçerli olan bir değeri de değiştirebilir.',
            ]),
            pt('find', ['Find', 'Find (bul)'], [
                'The value to look for: a number such as 9999 or NaN. “Find only” searches and highlights without changing anything, a safe first step.',
                'Aranacak değer: 9999 gibi bir sayı veya NaN. “Find only” hiçbir şeyi değiştirmeden arar ve vurgular; güvenli bir ilk adım.',
            ]),
            pt('replace', ['Replace with, Tolerance', 'Replace with, Tolerance'], [
                'The new value, and how close a number must be to count as a match. A tolerance of 0.001 also finds 9998.9995, useful when values were stored with rounding.',
                'Yeni değer ve bir sayının eşleşme sayılması için ne kadar yakın olması gerektiği. 0,001’lik tolerans 9998,9995’i de bulur; değerler yuvarlanarak saklandıysa kullanışlıdır.',
            ]),
            pt('nan', ['NaN Handling', 'NaN Handling (NaN işleme)'], [
                'Fills empty values from their neighbours: Forward Fill repeats the last good value, Backward Fill uses the next one, Linear Interpolate draws a straight line between them, Drop Rows removes the rows. Interpolation suits short gaps in smooth signals; for long gaps it invents data.',
                'Boş değerleri komşularından doldurur: Forward Fill son iyi değeri tekrarlar, Backward Fill sonrakini kullanır, Linear Interpolate aralarına düz bir çizgi çeker, Drop Rows satırları kaldırır. Ara değer, düzgün sinyallerdeki kısa boşluklara uyar; uzun boşluklarda veri uydurur.',
            ]),
            pt('apply', ['Apply NaN Fill', 'Apply NaN Fill'], [
                'With a NaN method selected the button becomes Apply NaN Fill and the Find fields are ignored. The result is a new channel.',
                'Bir NaN yöntemi seçiliyken düğme Apply NaN Fill olur ve Find alanları yok sayılır. Sonuç yeni bir kanaldır.',
            ]),
        ]),
        tableTool('formula', ['Formula', 'Formula (formül)'], [
            'A new channel fault_minus_clean computed as vibration_fault − vibration_clean.',
            'vibration_fault − vibration_clean olarak hesaplanan yeni bir fault_minus_clean kanalı.',
        ], [
            pt('output', ['Output Channel', 'Çıkış kanalı'], [
                'Name and unit of the new channel. Give it a name that says what it is; the unit is stored with it.',
                'Yeni kanalın adı ve birimi. Ne olduğunu söyleyen bir ad verin; birim onunla birlikte saklanır.',
            ]),
            pt('editor', ['Formula Editor', 'Formül düzenleyici'], [
                'Type the expression using channel names; click a channel in the Channels panel to insert its name exactly. The note below turns green when the formula is valid. Examples: sqrt(ax^2 + ay^2 + az^2) for total acceleration, (p_in − p_out) * 100 for a pressure drop in kPa.',
                'İfadeyi kanal adlarıyla yazın; adı birebir eklemek için Channels panelinde bir kanala tıklayın. Formül geçerli olduğunda alttaki not yeşile döner. Örnekler: toplam ivme için sqrt(ax^2 + ay^2 + az^2), kPa cinsinden basınç farkı için (p_in − p_out) * 100.',
            ]),
            pt('functions', ['Functions', 'Fonksiyonlar'], [
                'Buttons for arithmetic (abs, sqrt, exp…), logarithms (log, log10, db), trigonometry, hyperbolic functions and rounding. Templates offers ready-made expressions.',
                'Aritmetik (abs, sqrt, exp…), logaritma (log, log10, db), trigonometri, hiperbolik fonksiyonlar ve yuvarlama düğmeleri. Templates hazır ifadeler sunar.',
            ]),
            pt('apply', ['Apply Formula', 'Apply Formula'], [
                'Computes the expression for every row of the record and writes the new channel.',
                'İfadeyi kaydın her satırı için hesaplar ve yeni kanalı yazar.',
            ]),
        ]),
        tableTool('transpose', ['Transpose', 'Transp. (devrik)'], [
            'Swapping rows and columns.',
            'Satırlarla sütunların yerini değiştirmek.',
        ], [
            pt('info', ['Size limit', 'Boyut sınırı'], [
                'The whole result has to be built in memory, so the widget refuses tables that are too wide or too long and states the largest size that would fit. Transposing is meant for small tables, such as a matrix of results, not for a long time series.',
                'Sonucun tamamı bellekte oluşturulmalıdır; bu yüzden widget çok geniş veya çok uzun tabloları reddeder ve sığabilecek en büyük boyutu belirtir. Devrik alma uzun bir zaman serisi için değil, bir sonuç matrisi gibi küçük tablolar içindir.',
            ]),
            pt('apply', ['Apply Transpose', 'Apply Transpose'], [
                'Each original column becomes a row, named row_0, row_1 …; the original data is not modified.',
                'Her özgün sütun row_0, row_1 … adlı bir satır olur; özgün veri değiştirilmez.',
            ]),
        ]),
        tableTool('type', ['Type', 'Type (tip)'], [
            'Changing the numeric type of a column.',
            'Bir sütunun sayısal tipini değiştirmek.',
        ], [
            pt('column', ['Column', 'Column (sütun)'], [
                'The column to convert. The original column is kept and a converted copy is written.',
                'Çevrilecek sütun. Özgün sütun korunur ve çevrilmiş bir kopya yazılır.',
            ]),
            pt('target', ['Target type', 'Target type (hedef tip)'], [
                'float64 keeps about 15 significant digits; float32 halves the size but keeps about 7, enough for most sensor signals but not for long timestamps; int64 and int32 drop decimals and suit counters and codes.',
                'float64 yaklaşık 15 anlamlı basamak tutar; float32 boyutu yarıya indirir ama yaklaşık 7 basamak tutar; çoğu sensör sinyali için yeterlidir ama uzun zaman damgaları için değil; int64 ve int32 ondalıkları atar, sayaçlara ve kodlara uyar.',
            ]),
            pt('apply', ['Apply Type Convert', 'Apply Type Convert'], [
                'Writes the converted channel.',
                'Çevrilmiş kanalı yazar.',
            ]),
        ]),
        tableTool('encode', ['Encode', 'Encode (kodlama)'], [
            'Recording the correct text encoding of a column.',
            'Bir sütunun doğru metin kodlamasını kaydetmek.',
        ], [
            pt('column', ['Column', 'Column (sütun)'], [
                'The column whose text came out garbled, for example names with “Ã¼” instead of “ü”.',
                'Metni bozuk çıkan sütun; örneğin “ü” yerine “Ã¼” içeren adlar.',
            ]),
            pt('source', ['Source encoding', 'Source encoding (kaynak kodlama)'], [
                'Auto, UTF-8, Latin-1, Windows-1252 or ISO-8859-1. The setting is stored with the dataset and used when text is read or exported; numbers are not changed.',
                'Auto, UTF-8, Latin-1, Windows-1252 veya ISO-8859-1. Ayar veri kümesiyle saklanır ve metin okunurken veya dışa aktarılırken kullanılır; sayılar değişmez.',
            ]),
            pt('apply', ['Apply Encoding Repair', 'Apply Encoding Repair'], [
                'Stores the encoding for the column.',
                'Kodlamayı sütun için saklar.',
            ]),
        ]),
        tableTool('date', ['Date', 'Date (tarih)'], [
            'Turning a date-time text column into numeric time.',
            'Tarih-saat metni içeren bir sütunu sayısal zamana çevirmek.',
        ], [
            pt('column', ['Column', 'Column (sütun)'], [
                'A column with text such as 2024-01-15 14:30:45.123.',
                '2024-01-15 14:30:45.123 gibi metin içeren bir sütun.',
            ]),
            pt('format', ['Format', 'Format (biçim)'], [
                'Auto-detect recognises common forms. Otherwise choose ISO 8601, Unix seconds or milliseconds, or Custom with a pattern such as %d.%m.%Y %H:%M:%S for 15.01.2024 14:30:45.',
                'Auto-detect yaygın biçimleri tanır. Aksi halde ISO 8601, Unix saniye veya milisaniye ya da 15.01.2024 14:30:45 için %d.%m.%Y %H:%M:%S gibi bir kalıpla Custom seçin.',
            ]),
            pt('apply', ['Apply Datetime Parser', 'Apply Datetime Parser'], [
                'Writes a numeric time channel in seconds since 1 January 1970, which can then be used as the time axis.',
                '1 Ocak 1970’ten bu yana geçen saniye cinsinden sayısal bir zaman kanalı yazar; bu daha sonra zaman ekseni olarak kullanılabilir.',
            ]),
        ]),
        tableTool('resample', ['Resample', 'Resample (yeniden örnekle)'], [
            'Changing the sample rate of all channels, here from 500 Hz to a target of 1000 Hz.',
            'Tüm kanalların örnekleme hızını değiştirmek; burada 500 Hz’den 1000 Hz hedefe.',
        ], [
            pt('time', ['Time column', 'Zaman sütunu'], [
                'The column the rate is measured on.',
                'Hızın ölçüldüğü sütun.',
            ]),
            pt('current', ['Current rate', 'Mevcut hız'], [
                'The rate found in the data: 500 Hz, one sample every 2 ms.',
                'Veride bulunan hız: 500 Hz, her 2 ms’de bir örnek.',
            ]),
            pt('target', ['Target rate', 'Target rate (hedef hız)'], [
                'The new rate. Choose it from what later steps need: matching another logger before a merge, or reducing a 50 kHz recording to 1 kHz for a temperature trend.',
                'Yeni hız. Sonraki adımların neye ihtiyacı olduğuna göre seçin: bir birleştirmeden önce başka bir kaydediciye uymak veya bir sıcaklık eğilimi için 50 kHz’lik bir kaydı 1 kHz’e indirmek.',
            ]),
            pt('up', ['Upsampling', 'Hız artırma'], [
                'How new points between measured ones are made: “Interpolate (linear)” draws a straight line, “Repeat previous value (hold)” keeps the last value, which suits steps and states.',
                'Ölçülmüş noktalar arasındaki yeni noktaların nasıl oluşturulacağı: “Interpolate (linear)” düz bir çizgi çeker, “Repeat previous value (hold)” son değeri tutar; basamaklara ve durumlara uyar.',
            ]),
            pt('down', ['Downsampling', 'Hız düşürme'], [
                'How several samples become one: mean, maximum or minimum. Use the mean for trends, the maximum when peaks must survive.',
                'Birkaç örneğin nasıl teke indirileceği: ortalama, en büyük veya en küçük. Eğilimler için ortalamayı, tepelerin korunması gerektiğinde en büyüğü kullanın.',
            ]),
            pt('apply', ['Apply Resample', 'Apply Resample'], [
                'Writes a new resampled dataset; the original is preserved and downstream widgets receive the resampled data.',
                'Yeniden örneklenmiş yeni bir veri kümesi yazar; özgün korunur ve sonraki widget’lar yeniden örneklenmiş veriyi alır.',
            ]),
        ]),
        tableTool('graph', ['Graph', 'Graph (grafik)'], [
            'The centre switched from table to plot: vibration_fault and vibration_clean over the first two seconds.',
            'Orta alan tablodan grafiğe çevrilmiş: ilk iki saniye boyunca vibration_fault ve vibration_clean.',
        ], [
            pt('graph', ['Plot', 'Grafik'], [
                'The faulty signal shows a spike near 0.2 s and a dip near 1.55 s on top of the clean 5 Hz component. Seeing the data as curves is the quickest way to judge whether an edit, a fill or a formula did what you meant.',
                'Arızalı sinyal, temiz 5 Hz bileşeninin üzerinde 0,2 s civarında bir sıçrama ve 1,55 s civarında bir çukur gösteriyor. Veriyi eğri olarak görmek, bir düzenlemenin, doldurmanın veya formülün istediğinizi yapıp yapmadığını anlamanın en hızlı yoludur.',
            ]),
            pt('toggle', ['Table / Graph', 'Table / Graph'], [
                'Switches between numbers and curves; the tool on the left stays open.',
                'Sayılarla eğriler arasında geçiş yapar; soldaki araç açık kalır.',
            ]),
            pt('channels', ['Channels to draw', 'Çizilecek kanallar'], [
                'Tick channels to draw them; the two ticked here are plotted.',
                'Çizmek için kanalları işaretleyin; burada işaretli iki kanal çiziliyor.',
            ]),
        ]),
    ],
    normalization_scaling: [
        {
            id: 'zscore',
            tab: ['Settings', 'Ayarlar'],
            summary: [
                'Z-score scaling selected for motor_bearing_de and gearbox_input. The table shows the source data, 100,000 rows and 7 columns.',
                'motor_bearing_de ve gearbox_input için Z-skor ölçekleme seçili. Tablo kaynak veriyi gösteriyor: 100.000 satır ve 7 sütun.',
            ],
            points: [
                pt('method', ['Method', 'Method (yöntem)'], [
                    'Z-Score subtracts the mean and divides by the standard deviation; Min-Max maps the range to 0–1; Robust uses median and interquartile range and ignores spikes. All three use the whole record of each channel.',
                    'Z-Score ortalamayı çıkarır ve standart sapmaya böler; Min-Max aralığı 0–1’e taşır; Robust medyan ve çeyrekler açıklığını kullanır ve sıçramaları yok sayar. Üçü de her kanalın tüm kaydını kullanır.',
                ]),
                pt('targets', ['Target Channels', 'Hedef kanallar'], [
                    'Click to select, Ctrl or Shift for several. Each selected channel is scaled with its own statistics.',
                    'Seçmek için tıklayın, birden çoğu için Ctrl veya Shift. Seçilen her kanal kendi istatistikleriyle ölçeklenir.',
                ]),
                pt('preview', ['Source table', 'Kaynak tablo'], [
                    'The raw values: motor_bearing_de moves around ±0.3, other channels have different sizes. After scaling they become directly comparable.',
                    'Ham değerler: motor_bearing_de ±0,3 civarında oynuyor, diğer kanalların büyüklükleri farklı. Ölçeklemeden sonra doğrudan karşılaştırılabilir hale gelirler.',
                ]),
                pt('channels', ['Channels', 'Kanallar'], [
                    'The channels of the dataset; new scaled channels will appear here after the run.',
                    'Veri kümesinin kanalları; yeni ölçeklenmiş kanallar çalıştırmadan sonra burada görünür.',
                ]),
                pt('create', ['Create Normalized Channels', 'Create Normalized Channels'], [
                    'Computes mean and standard deviation over the full record and writes one scaled channel per selection.',
                    'Ortalama ve standart sapmayı tüm kayıt üzerinden hesaplar ve her seçim için bir ölçeklenmiş kanal yazar.',
                ]),
            ],
        },
        {
            id: 'result',
            tab: ['After Create', 'Oluşturduktan sonra'],
            summary: [
                'The scaled channels were written: the dataset now has 9 columns, and the status line confirms that the output was passed on to the next widgets.',
                'Ölçeklenmiş kanallar yazıldı: veri kümesinde artık 9 sütun var ve durum satırı çıkışın sonraki widget’lara iletildiğini doğruluyor.',
            ],
            points: [
                pt('preview', ['Two new columns', 'İki yeni sütun'], [
                    'The new channels are added at the right end of the table. Their values have mean 0 and standard deviation 1; most lie between −3 and +3.',
                    'Yeni kanallar tablonun sağ ucuna eklenir. Değerlerinin ortalaması 0, standart sapması 1’dir; çoğu −3 ile +3 arasındadır.',
                ]),
                pt('channels', ['Original and scaled', 'Özgün ve ölçeklenmiş'], [
                    'The originals keep their units and values. Use them for any physical result; use the scaled channels to compare shapes.',
                    'Özgünler birimlerini ve değerlerini korur. Her fiziksel sonuç için onları, şekilleri karşılaştırmak için ölçeklenmiş kanalları kullanın.',
                ]),
                pt('create', ['Re-running', 'Yeniden çalıştırma'], [
                    'Running again with the same settings reuses the existing result; with a different method a new channel is created next to the first one.',
                    'Aynı ayarlarla tekrar çalıştırmak mevcut sonucu yeniden kullanır; farklı bir yöntemle ilkinin yanında yeni bir kanal oluşturulur.',
                ]),
            ],
        },
        {
            id: 'robust',
            tab: ['Robust method', 'Sağlam yöntem'],
            summary: [
                'Method switched to “Robust Median / IQR (exact, guarded)”, the choice for channels with spikes.',
                'Yöntem, sıçramalı kanallar için seçilecek olan “Robust Median / IQR (exact, guarded)” olarak değiştirildi.',
            ],
            points: [
                pt('method', ['Robust Median / IQR', 'Robust Median / IQR'], [
                    'Centres on the median and divides by the spread of the middle half of the values. One 50 g spike barely changes either number, so the rest of the signal keeps a sensible scale. “Exact” means the quantiles are computed over every sample; if a channel is too large for that, the widget says so and names the size it can handle.',
                    'Medyana göre ortalar ve değerlerin ortadaki yarısının yayılımına böler. Tek bir 50 g’lik sıçrama bu iki sayıyı neredeyse hiç değiştirmez; böylece sinyalin geri kalanı makul bir ölçekte kalır. “Exact”, yüzdeliklerin her örnek üzerinden hesaplandığı anlamına gelir; bir kanal bunun için çok büyükse widget bunu söyler ve işleyebileceği boyutu belirtir.',
                ]),
                pt('targets', ['Same selection', 'Aynı seçim'], [
                    'The selected channels stay selected when you switch methods, so the same channels can be scaled in two ways and compared.',
                    'Yöntem değiştirdiğinizde seçili kanallar seçili kalır; böylece aynı kanallar iki farklı şekilde ölçeklenip karşılaştırılabilir.',
                ]),
            ],
        },
    ],
    groupby_aggregation: [
        {
            id: 'settings',
            tab: ['Settings', 'Ayarlar'],
            summary: [
                'Summarising a 500 s record in 1-second intervals: the time column is the group key, Mean, Max and Std Dev are ticked for vibration_fault and process_temp_c.',
                '500 s’lik bir kaydı 1 saniyelik aralıklarla özetlemek: zaman sütunu grup anahtarı; vibration_fault ve process_temp_c için Mean, Max ve Std Dev işaretli.',
            ],
            points: [
                pt('groupby', ['Group By Columns', 'Gruplama sütunları'], [
                    'The column that defines the groups. For time intervals select the time column here; for categories select a label column such as a test step. Every distinct value becomes one row of the result.',
                    'Grupları tanımlayan sütun. Zaman aralıkları için burada zaman sütununu seçin; kategoriler için test adımı gibi bir etiket sütunu seçin. Her farklı değer sonucun bir satırı olur.',
                ]),
                pt('functions', ['Aggregation Functions', 'Toplulaştırma fonksiyonları'], [
                    'Mean for the typical level, Max for peaks, Std Dev for how much the values move inside each second. Add Count to see how many samples each group really contains.',
                    'Tipik seviye için Mean, tepeler için Max, değerlerin her saniye içinde ne kadar oynadığı için Std Dev. Her grubun gerçekte kaç örnek içerdiğini görmek için Count ekleyin.',
                ]),
                pt('values', ['Value Columns', 'Değer sütunları'], [
                    'The channels to summarise. Two channels with three functions give six result columns.',
                    'Özetlenecek kanallar. Üç fonksiyonlu iki kanal altı sonuç sütunu verir.',
                ]),
                pt('timebins', ['Bin Size', 'Bin Size (bin boyutu)'], [
                    '1 second here. The choices go from 1 s to 1 day. The bin decides the resolution of the summary: anything shorter than the bin is averaged, but still visible in Max.',
                    'Burada 1 saniye. Seçenekler 1 s’den 1 güne kadar uzanır. Bin özetin çözünürlüğüne karar verir: binden kısa her şeyin ortalaması alınır, ama Max’ta yine görünür.',
                ]),
                pt('preview', ['Source table', 'Kaynak tablo'], [
                    '250,000 rows at 500 Hz before grouping.',
                    'Gruplamadan önce 500 Hz’de 250.000 satır.',
                ]),
                pt('apply', ['Apply', 'Apply (uygula)'], [
                    'Runs the grouping over the whole record and shows the grouped result in place of the source table.',
                    'Gruplamayı tüm kayıt üzerinde çalıştırır ve gruplanmış sonucu kaynak tablonun yerine gösterir.',
                ]),
            ],
        },
        {
            id: 'result',
            tab: ['Grouped Result', 'Gruplanmış sonuç'],
            summary: [
                '500 rows remain, one per second, with columns time_bin, vibration_fault_mean, vibration_fault_max and so on.',
                'Saniye başına bir satır olmak üzere 500 satır kalır; time_bin, vibration_fault_mean, vibration_fault_max gibi sütunlarla.',
            ],
            points: [
                pt('result', ['Reading the table', 'Tabloyu okumak'], [
                    'The mean stays close to zero in every second, but the maximum jumps between about 1.5 and 5.5. The seconds with a high maximum contain short impacts that the mean alone would hide. Plot these columns with Bar Plot or Line Chart to see the pattern over the whole test.',
                    'Ortalama her saniyede sıfıra yakın kalıyor, ama en büyük değer yaklaşık 1,5 ile 5,5 arasında sıçrıyor. En büyük değeri yüksek saniyeler, ortalamanın tek başına gizleyeceği kısa darbeler içerir. Tüm test boyunca deseni görmek için bu sütunları Bar Plot veya Line Chart ile çizin.',
                ]),
                pt('apply', ['Passed on as a dataset', 'Veri kümesi olarak iletilir'], [
                    'The status line confirms that the result is available to the next widgets. Change the bin or the functions and press Apply again to recompute.',
                    'Durum satırı sonucun sonraki widget’lar için kullanılabilir olduğunu doğrular. Yeniden hesaplamak için bini veya fonksiyonları değiştirip Apply’a tekrar basın.',
                ]),
            ],
        },
    ],
    time_alignment: [
        {
            id: 'overlay',
            tab: ['Before alignment', 'Hizalamadan önce'],
            summary: [
                'Two loggers recorded the same impact. In the overlay at the top, the red trace of the second logger rings about 0.35 s after the blue one. The two plots below show each source on its own.',
                'İki kaydedici aynı darbeyi kaydetti. Üstteki üst üste çizimde ikinci kaydedicinin kırmızı izi mavi izden yaklaşık 0,35 s sonra çınlıyor. Alttaki iki grafik her kaynağı kendi başına gösteriyor.',
            ],
            points: [
                pt('overlay', ['Overlay compare', 'Üst üste karşılaştırma'], [
                    'Draws the ticked channels of all sources in one plot, the easiest place to see an offset. Zoom in on a clear event, here the impact at 5 s.',
                    'Tüm kaynakların işaretli kanallarını tek grafikte çizer; bir kaymanın en kolay görüldüğü yer. Belirgin bir olaya yakınlaşın; burada 5 s’deki darbe.',
                ]),
                pt('channels', ['Alignment Channels', 'Hizalama kanalları'], [
                    'One branch per source. Tick a channel in each that shows the same event, here accel and accel_b. Names must differ between sources for automatic alignment.',
                    'Her kaynak için bir dal. Her birinde aynı olayı gösteren bir kanal işaretleyin; burada accel ve accel_b. Otomatik hizalama için adlar kaynaklar arasında farklı olmalıdır.',
                ]),
                pt('output', ['Output', 'Çıkış'], [
                    'Target rate “Auto” uses the highest rate among the sources. The note says that both sources start at zero, so their real offset is unknown and has to be found from the data.',
                    'Target rate “Auto” kaynaklar arasındaki en yüksek hızı kullanır. Not, iki kaynağın da sıfırdan başladığını, bu yüzden gerçek kaymalarının bilinmediğini ve veriden bulunması gerektiğini söylüyor.',
                ]),
                pt('auto', ['Auto Alignment', 'Otomatik hizalama'], [
                    'Reference is the source that stays in place. Auto-align sources finds the shift of every other source by comparing signal shapes.',
                    'Reference yerinde kalan kaynaktır. Auto-align sources diğer her kaynağın kaymasını sinyal şekillerini karşılaştırarak bulur.',
                ]),
                pt('crop', ['Global Cursor Crop', 'Ortak kırpma'], [
                    'After shifting, only the time covered by all sources should be kept. Auto overlap does this; Start and End set the interval by hand.',
                    'Kaydırmadan sonra yalnızca tüm kaynakların kapsadığı zaman tutulmalıdır. Auto overlap bunu yapar; Start ve End aralığı elle belirler.',
                ]),
                pt('step', ['Manual shift', 'Elle kaydırma'], [
                    'Under each plot: ◀ and ▶ move that source by Step, Total shows the accumulated shift, Reset returns to zero, Fit zooms to the data. 0.001 s is one sample at 1 kHz.',
                    'Her grafiğin altında: ◀ ve ▶ o kaynağı Step kadar kaydırır, Total birikmiş kaymayı gösterir, Reset sıfıra döner, Fit veriye yakınlaştırır. 0,001 s, 1 kHz’de bir örnektir.',
                ]),
                pt('plot', ['The offset', 'Kayma'], [
                    'Blue starts ringing at 5.00 s, red at about 5.35 s. Any statement about which signal reacted first would be wrong until this is corrected.',
                    'Mavi 5,00 s’de, kırmızı yaklaşık 5,35 s’de çınlamaya başlıyor. Bu düzeltilene kadar hangi sinyalin önce tepki verdiğine dair her ifade yanlış olur.',
                ]),
            ],
        },
        {
            id: 'aligned',
            tab: ['After Auto-align', 'Otomatik hizalama sonrası'],
            summary: [
                'Auto-align moved the second source by −0.350 s. The two impacts now lie on top of each other in the overlay.',
                'Otomatik hizalama ikinci kaynağı −0,350 s kaydırdı. İki darbe artık üst üste çizimde üst üste oturuyor.',
            ],
            points: [
                pt('auto', ['Result of Auto-align', 'Otomatik hizalamanın sonucu'], [
                    '“Aligned 1 source(s) to File Reader. Min correlation 0.67.” A correlation of 0.67 is good for noisy real signals; below about 0.5, check the result by eye.',
                    '“Aligned 1 source(s) to File Reader. Min correlation 0.67.” 0,67’lik korelasyon gürültülü gerçek sinyaller için iyidir; yaklaşık 0,5’in altında sonucu gözle kontrol edin.',
                ]),
                pt('total', ['Total shift', 'Toplam kayma'], [
                    'The second source now has Total −0.350049 s: it was moved 0.35 s earlier. You can still refine it with the step buttons.',
                    'İkinci kaynağın Total değeri artık −0,350049 s: 0,35 s erkene taşındı. Adım düğmeleriyle hâlâ ince ayar yapabilirsiniz.',
                ]),
                pt('plot', ['Aligned overlay', 'Hizalı üst üste çizim'], [
                    'The ringing of both loggers starts at the same moment. Check a second event later in the record, here the impact at 12 s, to make sure one offset is enough.',
                    'İki kaydedicinin çınlaması aynı anda başlıyor. Tek bir kaymanın yeterli olduğundan emin olmak için kaydın ilerisindeki ikinci bir olayı, burada 12 s’deki darbeyi kontrol edin.',
                ]),
                pt('crop', ['Overlap after the shift', 'Kaydırmadan sonra örtüşme'], [
                    'Because the second source moved, the shared interval is now 0.35 s shorter. Auto overlap updates Start and End when the alignment is applied.',
                    'İkinci kaynak kaydığı için ortak aralık artık 0,35 s daha kısa. Auto overlap, hizalama uygulandığında Start ve End’i günceller.',
                ]),
                pt('apply', ['Apply Alignment', 'Apply Alignment'], [
                    'Writes one dataset with a shared time column time_aligned and all ticked channels, cropped to the overlap.',
                    'Ortak time_aligned zaman sütunu ve tüm işaretli kanallarla, örtüşmeye kırpılmış tek bir veri kümesi yazar.',
                ]),
            ],
        },
    ],
    rolling_window_stats: [
        {
            id: 'settings',
            tab: ['Settings', 'Ayarlar'],
            summary: [
                'Running Mean, Std Dev and RMS of vibration_fault over a trailing window of 500 samples, 1 s at 500 Hz.',
                'vibration_fault’un 500 örneklik, yani 500 Hz’de 1 s’lik geriye bakan pencerede kayan Mean, Std Dev ve RMS değerleri.',
            ],
            points: [
                pt('unit', ['Window unit', 'Window unit (pencere birimi)'], [
                    'Give the window in Samples or in Seconds. Seconds are easier to reason about; samples are exact.',
                    'Pencereyi Samples veya Seconds cinsinden verin. Saniyeyle düşünmek daha kolaydır; örnek sayısı kesindir.',
                ]),
                pt('size', ['Window size', 'Window size (pencere boyutu)'], [
                    '500 samples. Long enough to average many cycles of the vibration, short enough to follow changes that take a few seconds. For impacts of 20 ms, a much shorter window or Max/Kurtosis is better.',
                    '500 örnek. Titreşimin birçok çevrimini ortalayacak kadar uzun, birkaç saniye süren değişimleri izleyecek kadar kısa. 20 ms’lik darbeler için çok daha kısa bir pencere veya Max/Kurtosis daha iyidir.',
                ]),
                pt('align', ['Alignment', 'Alignment (hizalama)'], [
                    'Trailing (causal) uses only past samples, like a live monitor, so the trend lags by half a window. Centered (zero-lag) looks both ways and puts features at the right time, for analysis of recorded data.',
                    'Trailing (causal) yalnızca geçmiş örnekleri kullanır, canlı bir izleyici gibi; bu yüzden eğilim yarım pencere geride kalır. Centered (zero-lag) iki yöne bakar ve özellikleri doğru zamana koyar; kayıtlı verinin analizi içindir.',
                ]),
                pt('features', ['Features', 'Öznitelikler'], [
                    'Each ticked statistic becomes a channel. RMS and Std Dev follow the vibration level; Kurtosis and Crest Factor rise with impacts; Max, Min and Peak-to-Peak follow extremes.',
                    'İşaretlenen her istatistik bir kanal olur. RMS ve Std Dev titreşim seviyesini izler; Kurtosis ve Crest Factor darbelerle yükselir; Max, Min ve Peak-to-Peak uç değerleri izler.',
                ]),
                pt('targets', ['Target Channels', 'Hedef kanallar'], [
                    'The source channels; each gets every ticked statistic. Here only vibration_fault is selected.',
                    'Kaynak kanallar; her biri işaretli her istatistiği alır. Burada yalnızca vibration_fault seçili.',
                ]),
                pt('create', ['Create Rolling Features', 'Create Rolling Features'], [
                    'Computes the statistics over the full record and writes the new channels at the source’s sample rate.',
                    'İstatistikleri tüm kayıt boyunca hesaplar ve yeni kanalları kaynağın örnekleme hızında yazar.',
                ]),
            ],
        },
        {
            id: 'result',
            tab: ['After Create', 'Oluşturduktan sonra'],
            summary: [
                'Three feature channels were added; the dataset now has 10 columns.',
                'Üç öznitelik kanalı eklendi; veri kümesinde artık 10 sütun var.',
            ],
            points: [
                pt('preview', ['New columns', 'Yeni sütunlar'], [
                    'Named like vibration_fault__rolling_rms_w500: source, statistic and window, so the setting can always be read from the name. They appear at the right end of the table.',
                    'vibration_fault__rolling_rms_w500 gibi adlandırılır: kaynak, istatistik ve pencere; böylece ayar her zaman addan okunabilir. Tablonun sağ ucunda görünürler.',
                ]),
                pt('channels', ['Use them like any channel', 'Herhangi bir kanal gibi kullanın'], [
                    'Plot the RMS channel over the raw signal in Time Graphics, or feed it to statistics. During the first window the trailing statistics are built from fewer samples.',
                    'RMS kanalını Time Graphics’te ham sinyalin üzerine çizin veya istatistiğe verin. İlk pencere boyunca geriye bakan istatistikler daha az örnekten oluşturulur.',
                ]),
                pt('create', ['Status', 'Durum'], [
                    'The status line confirms that the rolling feature channels were passed on to the next widgets.',
                    'Durum satırı kayan öznitelik kanallarının sonraki widget’lara iletildiğini doğrular.',
                ]),
            ],
        },
    ],
    sensor_calibration: [
        {
            id: 'preset',
            tab: ['IEPE accelerometer preset', 'IEPE ivmeölçer ön ayarı'],
            summary: [
                'Converting motor_bearing_de from millivolts to g with the IEPE Accelerometer preset: sensitivity 100 mV/g, so slope 0.01 and offset 0.',
                'motor_bearing_de’yi IEPE Accelerometer ön ayarıyla milivolttan g’ye çevirmek: hassasiyet 100 mV/g, yani eğim 0,01 ve ofset 0.',
            ],
            points: [
                pt('channels', ['Sensor Channels', 'Sensör kanalları'], [
                    'Select the raw channels to convert. Select several only if they come from sensors with the same calibration.',
                    'Çevrilecek ham kanalları seçin. Birden çoğunu yalnızca aynı kalibrasyona sahip sensörlerden geliyorlarsa seçin.',
                ]),
                pt('sensor', ['Sensor type', 'Sensor type (sensör tipi)'], [
                    'Presets for accelerometers, microphones, pressure, displacement, force, thermocouples (K, J, T) and PT100. They fill mode, unit and typical values; Custom leaves everything to you.',
                    'İvmeölçer, mikrofon, basınç, yer değiştirme, kuvvet, ısıl çift (K, J, T) ve PT100 için ön ayarlar. Modu, birimi ve tipik değerleri doldururlar; Custom her şeyi size bırakır.',
                ]),
                pt('mode', ['Mode', 'Mode (mod)'], [
                    'Linear (y = m·x + b) for this preset. The note under the sensitivity says what is expected: the raw channel in mV, output = raw ÷ sensitivity.',
                    'Bu ön ayar için Linear (y = m·x + b). Hassasiyetin altındaki not ne beklendiğini söyler: ham kanal mV cinsinden, çıkış = ham ÷ hassasiyet.',
                ]),
                pt('values', ['Sensitivity, Slope, Offset', 'Sensitivity, Slope, Offset'], [
                    'Enter the sensitivity from the sensor’s calibration certificate, for example 98.7 mV/g instead of the typical 100. The slope is calculated from it. Offset corrects a constant zero error.',
                    'Hassasiyeti sensörün kalibrasyon sertifikasından girin; örneğin tipik 100 yerine 98,7 mV/g. Eğim bundan hesaplanır. Offset sabit bir sıfır hatasını düzeltir.',
                ]),
                pt('unit', ['Output unit', 'Output unit (çıkış birimi)'], [
                    'g for the accelerometer. The unit is stored with the new channel and shown on plot axes and in statistics.',
                    'İvmeölçer için g. Birim yeni kanalla birlikte saklanır, grafik eksenlerinde ve istatistiklerde gösterilir.',
                ]),
                pt('suffix', ['Name suffix', 'Name suffix (ad eki)'], [
                    '“calibrated” gives motor_bearing_de__calibrated. Use something more specific, such as g_cert2024, when you keep several calibrations side by side.',
                    '“calibrated”, motor_bearing_de__calibrated verir. Birkaç kalibrasyonu yan yana tutuyorsanız g_cert2024 gibi daha belirgin bir ek kullanın.',
                ]),
                pt('create', ['Create Calibrated Channels', 'Create Calibrated Channels'], [
                    'Converts every selected channel over the full record. The raw channel is kept for checking.',
                    'Seçilen her kanalı tüm kayıt boyunca çevirir. Ham kanal kontrol için korunur.',
                ]),
            ],
        },
        {
            id: 'table',
            tab: ['Lookup table', 'Tablo'],
            summary: [
                'Mode “Lookup Table”: calibration from certificate points, raw value against calibrated value.',
                '“Lookup Table” modu: sertifika noktalarından, ham değere karşı kalibre edilmiş değerle kalibrasyon.',
            ],
            points: [
                pt('mode', ['Lookup Table', 'Lookup Table (tablo)'], [
                    'For sensors whose certificate lists points instead of one sensitivity, or whose response is not a straight line. Between two points the value is interpolated along a straight line.',
                    'Sertifikası tek bir hassasiyet yerine noktalar listeleyen veya tepkisi düz bir çizgi olmayan sensörler için. İki nokta arasında değer düz bir çizgi boyunca ara değerle bulunur.',
                ]),
                pt('values', ['Raw / Calibrated points', 'Ham / kalibre noktalar'], [
                    'Type the pairs from the certificate, or copy them from a spreadsheet and press Paste. Add Row and Remove Row change the length. Raw values must not repeat.',
                    'Sertifikadaki çiftleri yazın veya bir hesap tablosundan kopyalayıp Paste’e basın. Add Row ve Remove Row uzunluğu değiştirir. Ham değerler tekrarlanmamalıdır.',
                ]),
                pt('extrapolate', ['Extrapolate beyond table ends', 'Tablo uçlarının ötesine uzat'], [
                    'Off: values outside the table are held at the first or last calibrated value. On: the end segments are extended. Leave it off unless you know the sensor stays linear beyond the certified range.',
                    'Kapalı: tablonun dışındaki değerler ilk veya son kalibre değerde tutulur. Açık: uç parçalar uzatılır. Sensörün sertifikalı aralığın ötesinde doğrusal kaldığını bilmiyorsanız kapalı bırakın.',
                ]),
            ],
        },
        {
            id: 'poly',
            tab: ['Polynomial', 'Polinom'],
            summary: [
                'Mode “Polynomial”: y = a0 + a1·x + a2·x² + …, with the coefficients entered in ascending order.',
                '“Polynomial” modu: y = a0 + a1·x + a2·x² + …, katsayılar artan sırada girilir.',
            ],
            points: [
                pt('mode', ['Polynomial', 'Polynomial (polinom)'], [
                    'Used by the thermocouple presets and for sensors whose certificate gives a curve. With only a0 = 0 and a1 = 1, as shown, the output equals the input.',
                    'Isıl çift ön ayarları ve sertifikası bir eğri veren sensörler tarafından kullanılır. Gösterildiği gibi yalnızca a0 = 0 ve a1 = 1 ile çıkış girişe eşittir.',
                ]),
                pt('values', ['Coefficients', 'Katsayılar'], [
                    'a0 is the constant, a1 multiplies x, a2 multiplies x², and so on. Enter them in exactly this order and with all digits from the certificate; a polynomial is only valid inside the range it was fitted for.',
                    'a0 sabittir, a1 x’i, a2 x²’yi çarpar ve böyle devam eder. Bunları tam bu sırayla ve sertifikadaki tüm basamaklarla girin; bir polinom yalnızca uydurulduğu aralıkta geçerlidir.',
                ]),
            ],
        },
    ],
}
