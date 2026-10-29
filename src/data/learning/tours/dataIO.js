// Interface tours: Data I/O group. Every string pair is [en, tr].
// Hotspot positions come from tourAnchors.js (measured in the running app).

const pt = (id, title, desc) => ({ id, title, desc })

export default {
    file_reader: [
        {
            id: 'csv',
            tab: ['Import settings', 'İçe aktarma ayarları'],
            summary: [
                'A CSV with nine channels recorded at 1 kHz. The left side shows the first 100 rows exactly as they will be read; the right side holds every setting that decides how the text becomes numbers.',
                '1 kHz’de kaydedilmiş dokuz kanallı bir CSV. Sol taraf ilk 100 satırı tam okunacağı gibi gösterir; sağ taraf metnin sayılara nasıl çevrileceğine karar veren tüm ayarları içerir.',
            ],
            points: [
                pt('select', ['Select file', 'Dosya seçimi'], [
                    'Opens the file browser. The name and size of the chosen file appear next to the button. Choosing another file reloads the preview with the same settings, which is handy when a folder holds several files from the same logger.',
                    'Dosya seçme penceresini açar. Seçilen dosyanın adı ve boyutu düğmenin yanında görünür. Başka bir dosya seçmek önizlemeyi aynı ayarlarla yeniden yükler; aynı kaydediciden gelen birkaç dosyanız varsa bu pratiktir.',
                ]),
                pt('format', ['File format settings', 'Dosya biçimi ayarları'], [
                    'Encoding and Separator decide how the text is cut into values. Here the separator is a comma and every channel lands in its own column, so the setting is right. If all values of a row appeared in one column, the separator would be wrong.',
                    'Encoding ve Separator metnin değerlere nasıl bölüneceğine karar verir. Burada ayraç virgüldür ve her kanal kendi sütununa düşmüştür; yani ayar doğrudur. Bir satırın tüm değerleri tek sütunda görünseydi ayraç yanlış olurdu.',
                ]),
                pt('autodetect', ['Auto-detect', 'Auto-detect (otomatik algıla)'], [
                    'Reads the first lines of the file and sets separator, decimal mark and encoding. Press it first when you open a file from an unknown program, then check the preview.',
                    'Dosyanın ilk satırlarını okuyup ayracı, ondalık işaretini ve kodlamayı ayarlar. Bilmediğiniz bir programdan gelen dosyayı açtığınızda önce buna basın, sonra önizlemeyi kontrol edin.',
                ]),
                pt('header', ['Header settings', 'Başlık ayarları'], [
                    'Header row # is the line with the channel names, counted from 0. The names time, sine_10hz … in the table come from row 0. If your file starts with lines of notes, raise this number until the real names appear as column titles.',
                    'Header row #, kanal adlarının bulunduğu satırdır ve 0’dan sayılır. Tablodaki time, sine_10hz … adları 0. satırdan gelir. Dosyanız not satırlarıyla başlıyorsa gerçek adlar sütun başlığı olarak görünene kadar bu sayıyı artırın.',
                ]),
                pt('units', ['Channel units', 'Kanal birimleri'], [
                    'This file has no unit line, so “No unit row” is correct. Choose Auto-detect or Use row only when a line with units such as g, bar or °C follows the names; otherwise the first line of data would be taken as units.',
                    'Bu dosyada birim satırı yok; bu yüzden “No unit row” doğrudur. Auto-detect veya Use row’u yalnızca adların altında g, bar veya °C gibi birimlerin yazdığı bir satır varsa seçin; aksi halde ilk veri satırı birim sanılır.',
                ]),
                pt('rows', ['Data start row', 'Veri başlangıç satırı'], [
                    'The first line with numbers. Names are on row 0, so data starts on row 1. With a unit line in between it would be 2.',
                    'Sayıların başladığı ilk satır. Adlar 0. satırda olduğu için veri 1. satırda başlar. Arada bir birim satırı olsaydı 2 olurdu.',
                ]),
                pt('time', ['Time column settings', 'Zaman sütunu ayarları'], [
                    'The column “time” is used as the time axis, with values in seconds. The step between rows is 0.001 s, which matches a 1 kHz logger. Everything that depends on time, from plot axes to FFT frequencies, is calculated from this column.',
                    'Zaman ekseni olarak “time” sütunu, saniye cinsinden kullanılıyor. Satırlar arasındaki adım 0,001 s; bu, 1 kHz’lik bir kaydediciyle uyuşur. Grafik eksenlerinden FFT frekanslarına kadar zamana bağlı her şey bu sütundan hesaplanır.',
                ]),
                pt('preview', ['Data preview', 'Veri önizlemesi'], [
                    'The first 100 rows as the application will read them. Check that there is one column per channel, that the numbers have the decimals you expect and that the time column grows by a constant step.',
                    'İlk 100 satır, uygulamanın okuyacağı haliyle. Her kanal için bir sütun olduğunu, sayıların beklediğiniz ondalıklara sahip olduğunu ve zaman sütununun sabit bir adımla arttığını kontrol edin.',
                ]),
                pt('import', ['Import', 'Import (içe aktar)'], [
                    'Reads the whole file with these settings, converts it to MPAI and makes it the data source on the canvas. Refresh on the left rereads the preview after a change; Cancel closes without importing.',
                    'Tüm dosyayı bu ayarlarla okur, MPAI’ye çevirir ve canvas’taki veri kaynağı yapar. Soldaki Refresh bir değişiklikten sonra önizlemeyi yeniden okur; Cancel içe aktarmadan kapatır.',
                ]),
            ],
        },
        {
            id: 'units',
            tab: ['Semicolon file with units', 'Noktalı virgüllü, birimli dosya'],
            summary: [
                'A file saved with Turkish regional settings: semicolons between values, commas as decimal marks, and a second line with units (s, degC, bar, l/min). After Auto-detect and setting the rows, 21,500 in the file is read as 21.5.',
                'Türkçe bölge ayarlarıyla kaydedilmiş bir dosya: değerler arasında noktalı virgül, ondalık işareti olarak virgül ve ikinci satırda birimler (s, degC, bar, l/min). Auto-detect ve satır ayarlarından sonra dosyadaki 21,500 değeri 21.5 olarak okunur.',
            ],
            points: [
                pt('separator', ['Separator found: semicolon', 'Bulunan ayraç: noktalı virgül'], [
                    'Auto-detect saw semicolons between the values and switched the separator. With a comma separator the value 21,500 would have been split into 21 and 500.',
                    'Auto-detect değerlerin arasında noktalı virgül gördü ve ayracı değiştirdi. Virgül ayraçla 21,500 değeri 21 ve 500 diye ikiye bölünürdü.',
                ]),
                pt('autodetect', ['Auto-detect', 'Auto-detect (otomatik algıla)'], [
                    'Also recognises the comma as decimal mark, which is why the preview shows 21.5, 1.013 and 12.0 instead of text.',
                    'Virgülü ondalık işareti olarak da tanır; önizlemede metin yerine 21.5, 1.013 ve 12.0 görünmesinin nedeni budur.',
                ]),
                pt('unitrow', ['Unit row: Auto-detect', 'Unit row: Auto-detect'], [
                    'The second line holds units. With Auto-detect the units are stored with each channel, so later plots label the temperature axis °C and the pressure axis bar without any typing.',
                    'İkinci satır birimleri içeriyor. Auto-detect ile birimler her kanalla birlikte saklanır; böylece sonraki grafikler sıcaklık eksenini °C, basınç eksenini bar olarak siz yazmadan etiketler.',
                ]),
                pt('start', ['Data start row: 2', 'Veri başlangıç satırı: 2'], [
                    'Names are on row 0 and units on row 1, so numbers start on row 2. Left at 1, the unit line would be read as a row of data and the columns could not be treated as numbers.',
                    'Adlar 0. satırda, birimler 1. satırda; bu yüzden sayılar 2. satırda başlar. 1’de bırakılsaydı birim satırı veri satırı sanılırdı ve sütunlar sayı olarak işlenemezdi.',
                ]),
                pt('preview', ['Preview after the fix', 'Düzeltmeden sonra önizleme'], [
                    'Four clean numeric columns with a time step of 0.01 s (100 Hz). This is the picture to aim for before pressing Import.',
                    'Zaman adımı 0,01 s (100 Hz) olan dört temiz sayısal sütun. Import’a basmadan önce hedeflenecek görüntü budur.',
                ]),
            ],
        },
        {
            id: 'newtime',
            tab: ['Create a time column', 'Zaman sütunu oluşturma'],
            summary: [
                'Mode set to “Create new time column”: used when the file has no time column and you only know the sample rate of the logger.',
                'Mode “Create new time column” yapıldı: dosyada zaman sütunu yoksa ve yalnızca kaydedicinin örnekleme hızını biliyorsanız kullanılır.',
            ],
            points: [
                pt('mode', ['Mode', 'Mode (mod)'], [
                    '“Use existing column” takes time from the file; “Create new time column” builds it. Do not create a new column when the file already has a reliable one: the file’s own times also show pauses and gaps, a generated clock does not.',
                    '“Use existing column” zamanı dosyadan alır; “Create new time column” zamanı oluşturur. Dosyada güvenilir bir zaman sütunu varken yenisini oluşturmayın: dosyanın kendi zamanları duraklamaları ve boşlukları da gösterir, oluşturulan saat göstermez.',
                ]),
                pt('rate', ['Sampling rate (Hz)', 'Sampling rate (Hz) (örnekleme hızı)'], [
                    'The rate the logger recorded at. Take it from the logger configuration or the test report, not from a guess: 2,000 rows at 100 Hz become 20 s, at 1,000 Hz only 2 s. A wrong value shifts every frequency by the same factor.',
                    'Kaydedicinin kayıt yaptığı hız. Tahminle değil, kaydedici ayarından veya test raporundan alın: 100 Hz’de 2.000 satır 20 s, 1.000 Hz’de yalnızca 2 s olur. Yanlış bir değer her frekansı aynı oranda kaydırır.',
                ]),
                pt('start', ['Start time', 'Start time (başlangıç zamanı)'], [
                    '“0” gives a relative time axis that starts at zero, which is enough for most analysis. Choose “Custom time” and type the real start, for example 2024-01-15 14:30:45, when you need to line the data up with another recording or a log book.',
                    '“0” sıfırdan başlayan göreli bir zaman ekseni verir; çoğu analiz için yeterlidir. Veriyi başka bir kayıtla veya bir kayıt defteriyle eşleştirmeniz gerekiyorsa “Custom time”ı seçip gerçek başlangıcı yazın, örneğin 2024-01-15 14:30:45.',
                ]),
                pt('unit', ['Time unit', 'Time unit (zaman birimi)'], [
                    'The unit the new column is written in. Analysis widgets convert it to seconds, so seconds is the simplest choice.',
                    'Yeni sütunun yazılacağı birim. Analiz widget’ları bunu saniyeye çevirir; en basit seçim saniyedir.',
                ]),
            ],
        },
    ],
    data_merger: [
        {
            id: 'scan',
            tab: ['Scan and check', 'Tarama ve kontrol'],
            summary: [
                'Nine parts of one test (part01 … part09, CSV and TXT) found in a folder. Each was inspected: the header line, the first data line, the estimated rows and the number of channels.',
                'Bir klasörde bulunan, aynı teste ait dokuz parça (part01 … part09, CSV ve TXT). Her biri incelendi: başlık satırı, ilk veri satırı, tahmini satır sayısı ve kanal sayısı.',
            ],
            points: [
                pt('folder', ['Source Folder', 'Kaynak klasör'], [
                    'Browse… chooses the folder and Scan Folder inspects it. Tick Include subfolders when the logger stores parts in daily or hourly folders. The line below reports how many supported files were found; compare it with the number of parts you expect.',
                    'Browse… klasörü seçer, Scan Folder inceler. Kaydedici parçaları günlük veya saatlik klasörlere yazıyorsa Include subfolders’ı işaretleyin. Alttaki satır kaç desteklenen dosya bulunduğunu bildirir; bunu beklediğiniz parça sayısıyla karşılaştırın.',
                ]),
                pt('files', ['Files and Detected Layout', 'Dosyalar ve algılanan düzen'], [
                    'One row per file. Header and Data starts give the line numbers that were recognised: the header is on line 1 in part01 but on line 9 in part09, because each part carries a different number of note lines at the top, and every one was found correctly. Confidence 100 % and Status Ready mean the file can be merged. Untick Use to leave a file out.',
                    'Her dosya için bir satır. Header ve Data starts tanınan satır numaralarını verir: başlık part01’de 1. satırda, part09’da ise 9. satırdadır, çünkü her parçanın başında farklı sayıda not satırı vardır; hepsi doğru bulunmuş. Confidence %100 ve Status Ready, dosyanın birleştirilebileceği anlamına gelir. Bir dosyayı dışarıda bırakmak için Use işaretini kaldırın.',
                ]),
                pt('sort', ['Order and Auto sort', 'Sıralama ve Auto sort'], [
                    'The Order column is the order of joining. Natural sorts numbers the way people read them (part2 before part10); Name A-Z sorts letter by letter; Oldest and Newest use the file dates. Move Up and Move Down correct single files by hand.',
                    'Order sütunu birleştirme sırasıdır. Natural numaraları insanların okuduğu gibi sıralar (part2, part10’dan önce); Name A-Z harf harf sıralar; Oldest ve Newest dosya tarihlerini kullanır. Move Up ve Move Down tek tek dosyaları elle düzeltir.',
                ]),
                pt('preview', ['Table Preview', 'Tablo önizlemesi'], [
                    'The first rows of the selected file with the role of each line: the blue line is the header (Time, Acceleration, Temperature), the green line is the first data line. Lines above them are skipped.',
                    'Seçili dosyanın ilk satırları ve her satırın rolü: mavi satır başlıktır (Time, Acceleration, Temperature), yeşil satır ilk veri satırıdır. Bunların üstündeki satırlar atlanır.',
                ]),
                pt('rowlayout', ['Correcting the row layout', 'Satır düzenini düzeltmek'], [
                    'If a role is wrong, click the right line in the preview and use Selected -> Header or Selected -> Data Start, or type the numbers, then press Apply Row Layout. Review Rows opens the same check in a separate window.',
                    'Bir rol yanlışsa önizlemede doğru satıra tıklayıp Selected -> Header veya Selected -> Data Start’ı kullanın ya da numaraları yazın, sonra Apply Row Layout’a basın. Review Rows aynı kontrolü ayrı bir pencerede açar.',
                ]),
                pt('plan', ['Merge Plan', 'Birleştirme planı'], [
                    'Stack rows puts the parts one after another, matching channels by name. Time handling “Auto” keeps real clock times and continues the clock when a part restarts at zero. The grey text under the settings repeats exactly what each choice does.',
                    'Stack rows parçaları arka arkaya koyar ve kanalları adlarına göre eşleştirir. Time handling “Auto” gerçek saat zamanlarını korur ve bir parça sıfırdan başlıyorsa saati devam ettirir. Ayarların altındaki gri metin her seçimin tam olarak ne yaptığını tekrarlar.',
                ]),
                pt('diagnostics', ['Diagnostics', 'Tanılar'], [
                    'Errors, warnings and notes with a code and the file they concern. Here there are no errors and one note: nine files are selected. Read this list before merging; Copy Diagnostics puts it on the clipboard for a report.',
                    'Bir kod ve ilgili dosyayla birlikte hatalar, uyarılar ve notlar. Burada hata yok, bir not var: dokuz dosya seçili. Birleştirmeden önce bu listeyi okuyun; Copy Diagnostics rapor için panoya kopyalar.',
                ]),
                pt('merge', ['Merge Files', 'Merge Files (dosyaları birleştir)'], [
                    'Writes the merged dataset and opens it as the active source. It does not change the original files.',
                    'Birleşik veri kümesini yazar ve etkin kaynak olarak açar. Orijinal dosyaları değiştirmez.',
                ]),
            ],
        },
        {
            id: 'append',
            tab: ['Side-by-side layout', 'Yan yana düzen'],
            summary: [
                'Layout switched to “Append columns (row index)”. The diagnostics now report that the row counts are not known yet and ask how shorter files should be filled.',
                'Layout “Append columns (row index)” yapıldı. Tanılar artık satır sayılarının henüz bilinmediğini bildiriyor ve kısa dosyaların nasıl doldurulacağını soruyor.',
            ],
            points: [
                pt('layout', ['Append columns', 'Append columns (sütun ekle)'], [
                    'The parts are placed next to each other instead of one after another: the channels of every file become separate columns, matched by row number, not by time. Duplicate names get the file name as a prefix. This suits files that each hold different sensors of the same moment, not a split recording.',
                    'Parçalar arka arkaya değil, yan yana konur: her dosyanın kanalları ayrı sütunlar olur ve satırlar zamana göre değil satır numarasına göre eşleşir. Aynı adlara dosya adı ön ek olarak eklenir. Bu düzen, her biri aynı anın farklı sensörlerini tutan dosyalar için uygundur; bölünmüş bir kayıt için değil.',
                ]),
                pt('fill', ['Short channels', 'Short channels (kısa kanallar)'], [
                    'Files rarely have exactly the same number of rows. This setting fills the missing rows of shorter files: with zero, with the last value, or with a value you type. The merge stays blocked until you choose, because a filled value is not a measured one.',
                    'Dosyaların satır sayıları nadiren tam aynıdır. Bu ayar kısa dosyaların eksik satırlarını doldurur: sıfırla, son değerle veya yazdığınız bir değerle. Seçim yapana kadar birleştirme engelli kalır, çünkü doldurulan değer ölçülmüş bir değer değildir.',
                ]),
                pt('files', ['The same nine files', 'Aynı dokuz dosya'], [
                    'For this folder side-by-side is the wrong choice: all nine files hold the same three channels of one test. That is why the layout is switched back to Stack rows before merging.',
                    'Bu klasör için yan yana düzen yanlış seçimdir: dokuz dosyanın hepsi aynı testin aynı üç kanalını tutar. Bu yüzden birleştirmeden önce düzen yeniden Stack rows yapılır.',
                ]),
            ],
        },
        {
            id: 'merged',
            tab: ['After Merge Files', 'Merge Files sonrası'],
            summary: [
                'The nine parts were stacked into one dataset of 72 rows. The diagnostics explain what was adjusted on the way.',
                'Dokuz parça 72 satırlık tek bir veri kümesine alt alta eklendi. Tanılar bu sırada nelerin düzeltildiğini açıklar.',
            ],
            points: [
                pt('diagnostics', ['What the merge reports', 'Birleştirmenin bildirdikleri'], [
                    'Eight warnings say that the time axis was adjusted in eight files: every part started its clock at zero, so the time was continued instead of jumping back. Read warnings like this one by one; they tell you exactly where the joins are.',
                    'Sekiz uyarı, sekiz dosyada zaman ekseninin düzeltildiğini söylüyor: her parça saatini sıfırdan başlatmış, bu yüzden zaman geriye sıçramak yerine devam ettirilmiş. Böyle uyarıları tek tek okuyun; birleşim noktalarının tam yerini söylerler.',
                ]),
                pt('status', ['Result summary', 'Sonuç özeti'], [
                    'The status line gives the size of the merged dataset. Compare it with the sum of the Rows column: 5 + 8 + 9 + … should give the same total.',
                    'Durum satırı birleşik veri kümesinin boyutunu verir. Bunu Rows sütununun toplamıyla karşılaştırın: 5 + 8 + 9 + … aynı toplamı vermelidir.',
                ]),
                pt('merge', ['Merge again', 'Yeniden birleştir'], [
                    'After a change in the order or the plan you can merge again; the new result replaces the previous one as the active source. Next, open the result in Time Graphics and zoom into a few joins.',
                    'Sırada veya planda bir değişiklikten sonra yeniden birleştirebilirsiniz; yeni sonuç etkin kaynak olarak öncekinin yerini alır. Sonra sonucu Time Graphics’te açıp birkaç birleşim noktasına yakınlaşın.',
                ]),
            ],
        },
    ],
    data_exporter: [
        {
            id: 'csv',
            tab: ['Raw channels to CSV', 'Ham kanallardan CSV’ye'],
            summary: [
                'The exporter connected to a File Reader: nine channels of 200,000 rows sharing one time axis, ready to be written as CSV.',
                'Bir File Reader’a bağlı dışa aktarıcı: tek bir zaman eksenini paylaşan, 200.000’er satırlık dokuz kanal; CSV olarak yazılmaya hazır.',
            ],
            points: [
                pt('source', ['Source', 'Kaynak'], [
                    'Where the data comes from and how much there is: 9 channels, up to 200,000 rows, 1 axis group. With an analysis widget connected, its name appears here too.',
                    'Verinin nereden geldiği ve ne kadar olduğu: 9 kanal, en fazla 200.000 satır, 1 eksen grubu. Bir analiz widget’ı bağlıysa adı da burada görünür.',
                ]),
                pt('channels', ['Channels', 'Kanallar'], [
                    'All channels grouped by the axis they belong to. “Time — time” is the group; time itself is its axis and is written with the others. Unit and Rows help you spot a channel that does not belong.',
                    'Tüm kanallar ait oldukları eksene göre gruplanmış. “Time — time” gruptur; time onun eksenidir ve diğerleriyle birlikte yazılır. Unit ve Rows, oraya ait olmayan bir kanalı fark etmenize yardım eder.',
                ]),
                pt('filter', ['Filter, All, None', 'Filtre, All, None'], [
                    'Type part of a name, for example “sine”, to show only matching channels. All and None then tick or untick just those, which is the quickest way to pick 5 channels out of 300.',
                    'Yalnızca eşleşen kanalları göstermek için adın bir kısmını yazın, örneğin “sine”. Ardından All ve None yalnızca bunları işaretler veya işaretini kaldırır; 300 kanaldan 5’ini seçmenin en hızlı yolu budur.',
                ]),
                pt('output', ['Output', 'Çıkış'], [
                    'Format and target file. The line under the format summarises it: CSV is plain text that any program reads, but it is the largest format. Browse… chooses the file name.',
                    'Biçim ve hedef dosya. Biçimin altındaki satır onu özetler: CSV her programın okuduğu düz metindir ama en büyük biçimdir. Browse… dosya adını seçer.',
                ]),
                pt('options', ['Format Options', 'Biçim seçenekleri'], [
                    'For CSV: the delimiter, the text encoding and the number of decimals. Use a semicolon when the file will be opened in Excel set to Turkish. Six decimals are enough for most measurements and make the file much smaller than full precision.',
                    'CSV için: ayraç, metin kodlaması ve ondalık sayısı. Dosya Türkçe ayarlı Excel’de açılacaksa noktalı virgül kullanın. Altı ondalık çoğu ölçüm için yeterlidir ve dosyayı tam hassasiyete göre çok küçültür.',
                ]),
                pt('ragged', ['Different-Length Channels', 'Farklı uzunlukta kanallar'], [
                    'Only matters when ticked channels have different lengths. Here all have 200,000 rows, as the note confirms. Otherwise you choose between separate files, NaN padding and cutting to the shortest channel.',
                    'Yalnızca işaretli kanalların uzunlukları farklıysa önemlidir. Burada notun da doğruladığı gibi hepsinde 200.000 satır var. Aksi halde ayrı dosyalar, NaN ile doldurma ve en kısa kanala kırpma arasında seçim yaparsınız.',
                ]),
                pt('range', ['Export Range', 'Dışa aktarma aralığı'], [
                    'The full 0–200 s of the time axis is selected. Drag either edge of the yellow area to export only a part, for example 20 s around an event; Full resets the range. Each axis group keeps its own range.',
                    'Zaman ekseninin 0–200 s’nin tamamı seçili. Yalnızca bir kısmı aktarmak için sarı alanın kenarlarından birini sürükleyin, örneğin bir olayın etrafındaki 20 s; Full aralığı sıfırlar. Her eksen grubu kendi aralığını tutar.',
                ]),
                pt('export', ['Export', 'Export (dışa aktar)'], [
                    'Writes the file. The note at the bottom left says what is still missing; here, the output file name.',
                    'Dosyayı yazar. Sol alttaki not hâlâ neyin eksik olduğunu söyler; burada çıkış dosyasının adı.',
                ]),
            ],
        },
        {
            id: 'parquet',
            tab: ['Parquet format', 'Parquet biçimi'],
            summary: [
                'The same channels with Parquet selected. The format options change to a single compression choice.',
                'Aynı kanallar, Parquet seçili. Biçim seçenekleri tek bir sıkıştırma seçimine dönüşür.',
            ],
            points: [
                pt('format', ['Parquet', 'Parquet'], [
                    'A compact, column-based binary table read by Python, R, MATLAB and data platforms. The same 1.8 million values take a fraction of the space of a CSV and are read many times faster. Choose it for long records and for anyone who works with code.',
                    'Python, R, MATLAB ve veri platformlarının okuduğu, sütun tabanlı sıkıştırılmış ikili tablo. Aynı 1,8 milyon değer CSV’nin kapladığı alanın küçük bir kısmını kaplar ve kat kat hızlı okunur. Uzun kayıtlar ve kodla çalışan herkes için seçin.',
                ]),
                pt('options', ['Compression', 'Sıkıştırma'], [
                    'zstd gives the smallest file and is the right default; snappy is slightly larger but faster to read; uncompressed is only useful for tools that cannot read compressed Parquet. The numbers themselves are stored exactly in every case.',
                    'zstd en küçük dosyayı verir ve doğru varsayılandır; snappy biraz daha büyüktür ama daha hızlı okunur; uncompressed yalnızca sıkıştırılmış Parquet okuyamayan araçlar için işe yarar. Sayıların kendisi her durumda birebir saklanır.',
                ]),
            ],
        },
        {
            id: 'computed',
            tab: ['Exporting an FFT result', 'FFT sonucunu dışa aktarma'],
            summary: [
                'The exporter connected to an FFT / Spectrum widget. Besides the raw channels of the file, it lists the computed spectrum of accel_faulty on its frequency axis, and those are preselected.',
                'FFT / Spectrum widget’ına bağlı dışa aktarıcı. Dosyanın ham kanallarının yanında accel_faulty’nin hesaplanmış spektrumunu kendi frekans ekseniyle listeler ve bunlar önceden seçili gelir.',
            ],
            points: [
                pt('channels', ['Computed results', 'Hesaplanmış sonuçlar'], [
                    'The group “Frequency — accel_faulty_frequency” holds what the FFT calculated: magnitude, magnitude in dB, PSD, ASD, ESD and their dB versions, each with its unit, 2,049 lines long. The raw time channels at the top start unticked because the spectrum is what you connected the FFT for. A small group below holds single values such as the peak frequency.',
                    '“Frequency — accel_faulty_frequency” grubu FFT’nin hesapladıklarını tutar: genlik, dB genlik, PSD, ASD, ESD ve dB sürümleri; her biri birimiyle ve 2.049 satır uzunluğunda. Üstteki ham zaman kanalları işaretsiz gelir, çünkü FFT’yi spektrum için bağladınız. Alttaki küçük grup tepe frekansı gibi tek değerleri tutar.',
                ]),
                pt('range', ['Range on the frequency axis', 'Frekans ekseninde aralık'], [
                    'The range strip now follows the frequency axis (0–2,500 Hz). Narrowing it, for example to 0–500 Hz, writes only those lines.',
                    'Aralık şeridi artık frekans eksenini izler (0–2.500 Hz). Daraltmak, örneğin 0–500 Hz’e, yalnızca o çizgileri yazar.',
                ]),
                pt('output', ['Writing the spectrum', 'Spektrumu yazmak'], [
                    'The frequency column is written next to the values, so the receiver can plot the spectrum directly. Matrix results such as spectrograms appear in the same list when the connected widget produces them.',
                    'Frekans sütunu değerlerin yanına yazılır; böylece alıcı spektrumu doğrudan çizebilir. Bağlı widget spektrogram gibi matris sonuçlar üretiyorsa bunlar da aynı listede görünür.',
                ]),
            ],
        },
    ],
    random_generator: [
        {
            id: 'bearing',
            tab: ['Bearing fault scene', 'Rulman arızası sahnesi'],
            summary: [
                'The scene “Bearing fault — outer race (BPFO)” loaded and generated: an acceleration channel with impacts repeating at 107.1 Hz and ringing at 3.5 kHz, plus a shaft signal and a tachometer. The plot shows the first 40 ms of accel_x.',
                '“Bearing fault — outer race (BPFO)” sahnesi yüklenip üretildi: 107,1 Hz’de tekrarlanan ve 3,5 kHz’de çınlayan darbeler içeren bir ivme kanalı, bir mil sinyali ve bir takometre. Grafik accel_x’in ilk 40 ms’sini gösterir.',
            ],
            points: [
                pt('recording', ['Recording settings', 'Kayıt ayarları'], [
                    'Name, sample rate, duration and random seed for the whole dataset. 25.6 kHz for 5 s gives 128,000 rows, as Estimated size shows. The sample rate must be well above the highest frequency you generate; here the 3.5 kHz resonance is about 7 times below it.',
                    'Tüm veri kümesi için ad, örnekleme hızı, süre ve rastgele tohum. Estimated size’ın gösterdiği gibi 25,6 kHz’de 5 s, 128.000 satır verir. Örnekleme hızı ürettiğiniz en yüksek frekansın epey üstünde olmalıdır; burada 3,5 kHz’lik rezonans onun yaklaşık 7 kat altındadır.',
                ]),
                pt('scene', ['Example scene', 'Örnek sahne'], [
                    'Load replaces the channel list with a complete example. Ten scenes cover healthy and faulty bearings, unbalance, gear mesh, run-up, shock, 3-phase power and a modal impulse. Every value they set can be changed afterwards.',
                    'Load kanal listesini tam bir örnekle değiştirir. On sahne sağlam ve arızalı rulmanları, balanssızlığı, dişli kavramasını, kalkışı, şoku, 3 faz gücü ve modal darbeyi kapsar. Ayarladıkları her değer sonradan değiştirilebilir.',
                ]),
                pt('signals', ['Signals in this dataset', 'Bu veri kümesindeki sinyaller'], [
                    'Three channels: accel_x in g (bearing-fault impulse train), shaft (sine) and tacho_rpm in rpm (constant). Select one to edit it below. Add, Copy, Delete and the arrows build and order the list.',
                    'Üç kanal: g biriminde accel_x (rulman arıza darbe dizisi), shaft (sinüs) ve rpm biriminde tacho_rpm (sabit). Aşağıda düzenlemek için birini seçin. Add, Copy, Delete ve oklar listeyi oluşturur ve sıralar.',
                ]),
                pt('params', ['Channel parameters', 'Kanal parametreleri'], [
                    'Name and unit of the selected channel, then the fields of its type. For the bearing fault: Amplitude 1 g, Frequency 107.1 Hz (how often the defect is hit), Resonance 3,500 Hz (the frequency each impact rings at), Decay 1.5 ms (how quickly the ringing fades) and noise at 10 dB SNR.',
                    'Seçili kanalın adı ve birimi, ardından tipinin alanları. Rulman arızası için: Amplitude 1 g, Frequency 107,1 Hz (hasara ne sıklıkla çarpıldığı), Resonance 3.500 Hz (her darbenin çınladığı frekans), Decay 1,5 ms (çınlamanın ne hızla söndüğü) ve 10 dB SNR’de gürültü.',
                ]),
                pt('type', ['Type', 'Type (tip)'], [
                    'Changes what the channel produces: core waveforms, several kinds of noise, or composite signals such as AM, FM, damped sine and the bearing-fault impulse train. The parameter fields below change with it.',
                    'Kanalın ne ürettiğini değiştirir: temel dalga biçimleri, çeşitli gürültü türleri veya AM, FM, sönümlü sinüs ve rulman arıza darbe dizisi gibi bileşik sinyaller. Alttaki parametre alanları tiple birlikte değişir.',
                ]),
                pt('generate', ['Generate', 'Generate (üret)'], [
                    'Writes the dataset. After any change the plot is cleared until you generate again, so the plot never shows an older version of the settings.',
                    'Veri kümesini yazar. Herhangi bir değişiklikten sonra tekrar üretene kadar grafik temizlenir; böylece grafik hiçbir zaman ayarların eski bir halini göstermez.',
                ]),
                pt('plot', ['The generated waveform', 'Üretilen dalga şekli'], [
                    'accel_x over 40 ms. Impacts arrive about every 9.3 ms (1/107.1 Hz), each followed by a short fast oscillation, buried in noise. This is what a real outer-race defect looks like, and why it is easier to find with envelope analysis than in a plain spectrum. Tick channels in the Channels panel to draw them.',
                    '40 ms boyunca accel_x. Darbeler yaklaşık her 9,3 ms’de (1/107,1 Hz) gelir; her birini kısa, hızlı bir salınım izler ve hepsi gürültünün içindedir. Gerçek bir dış bilezik hasarı böyle görünür; düz spektrum yerine zarf analiziyle daha kolay bulunmasının nedeni budur. Çizmek için Channels panelinde kanalları işaretleyin.',
                ]),
            ],
        },
        {
            id: 'chirp',
            tab: ['Run-up scene (chirp)', 'Kalkış sahnesi (chirp)'],
            summary: [
                'The scene “Run-up / coast-down (chirp)”: accel_x sweeps from 10 Hz to 500 Hz over 10 s while a matching tacho_rpm channel rises and falls. The plot shows the first second of accel_x.',
                '“Run-up / coast-down (chirp)” sahnesi: accel_x 10 s boyunca 10 Hz’den 500 Hz’e süpürülürken buna uyan bir tacho_rpm kanalı yükselip alçalır. Grafik accel_x’in ilk saniyesini gösterir.',
            ],
            points: [
                pt('type', ['Chirp (sweep)', 'Chirp (süpürme)'], [
                    'A sine whose frequency changes during the record. It imitates a machine speeding up or slowing down and is the natural test signal for Order Tracking and for checking filters over a range of frequencies.',
                    'Frekansı kayıt boyunca değişen bir sinüs. Hızlanan veya yavaşlayan bir makineyi taklit eder; Order Tracking için ve filtreleri bir frekans aralığında denemek için doğal test sinyalidir.',
                ]),
                pt('params', ['Sweep parameters', 'Süpürme parametreleri'], [
                    'Frequency is the start (10 Hz) and End frequency the end of the sweep (500 Hz). Log sweep “Linear” changes frequency by the same number of hertz per second; “Logarithmic” spends equal time in every octave, which suits tests across a wide range. SNR 20 dB adds mild noise.',
                    'Frequency süpürmenin başlangıcı (10 Hz), End frequency bitişidir (500 Hz). Log sweep “Linear” frekansı saniyede aynı sayıda hertz değiştirir; “Logarithmic” her oktavda eşit zaman geçirir ve geniş aralıklı testlere uyar. 20 dB SNR hafif gürültü ekler.',
                ]),
                pt('plot', ['Frequency rising with time', 'Zamanla artan frekans'], [
                    'In the first second the oscillation speeds up from 10 to about 59 Hz: the cycles get visibly narrower from left to right. In an FFT of the whole record this sweep spreads into a wide band, which is exactly what Order Tracking is designed to resolve.',
                    'İlk saniyede salınım 10 Hz’den yaklaşık 59 Hz’e hızlanır: soldan sağa doğru çevrimler gözle görülür biçimde daralır. Kaydın tamamının FFT’sinde bu süpürme geniş bir banda yayılır; Order Tracking tam olarak bunu çözmek için tasarlanmıştır.',
                ]),
            ],
        },
    ],
}
