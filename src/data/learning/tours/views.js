// Interface tours: dashboard, time, comparison, spectrum and map viewers,
// plus the report and script workflow widgets. Every string pair is [en, tr].
// Hotspot positions come from tourAnchors.js (measured in the running app).

const pt = (id, title, desc) => ({ id, title, desc })

export default {
    chart_dashboard: [
        {
            id: 'dashboard',
            tab: ['Dashboard', 'Pano'],
            summary: [
                'Six cells on one page for a 500-second recording: a trend, a spectrogram and a histogram of vibration_fault, a box plot against vibration_clean, and a statistics table and a gauge for process_temp_c.',
                '500 saniyelik bir kayıt için tek sayfada altı hücre: vibration_fault’un eğilimi, spektrogramı ve histogramı, vibration_clean’e karşı bir kutu grafiği ve process_temp_c için bir istatistik tablosu ile bir gösterge.',
            ],
            points: [
                pt('add', ['Add', 'Add (ekle)'], [
                    'Adds one cell of the chosen chart type to the page.',
                    'Sayfaya seçilen grafik türünde bir hücre ekler.',
                ]),
                pt('templates', ['Templates', 'Templates (şablonlar)'], [
                    'Places a ready set of empty cells, for example NVH Analysis or Statistics / QC. You assign channels afterwards.',
                    'Hazır bir boş hücre kümesi yerleştirir; örneğin NVH Analysis veya Statistics / QC. Kanalları sonra atarsınız.',
                ]),
                pt('edit', ['Edit', 'Edit (düzenle)'], [
                    'Move and resize cells. Layout edits can be undone.',
                    'Hücreleri taşıyın ve boyutlandırın. Yerleşim düzenlemeleri geri alınabilir.',
                ]),
                pt('overview', ['Navigator strip', 'Gezgin şeridi'], [
                    'vibration_fault over the whole record. Drag its edges to select the part of the record the cells describe.',
                    'vibration_fault, tüm kayıt boyunca. Hücrelerin tarif ettiği kayıt bölümünü seçmek için kenarlarını sürükleyin.',
                ]),
                pt('line', ['Line chart cell', 'Çizgi grafiği hücresi'], [
                    'The trend over 500 s. The strip above it is the dual-cursor readout: Δt between the cursors, 1/Δt, and the mean and RMS between them.',
                    '500 s boyunca eğilim. Üstündeki şerit çift imleç okumasıdır: imleçler arasındaki Δt, 1/Δt ve aralarındaki ortalama ve RMS.',
                ]),
                pt('spectrogram', ['Spectrogram cell', 'Spektrogram hücresi'], [
                    'Frequency (0–250 Hz) over time, colour in dB. A horizontal line is a tone that lasts the whole record.',
                    'Zaman içinde frekans (0–250 Hz), renk dB cinsinden. Yatay bir çizgi tüm kayıt boyunca süren bir tondur.',
                ]),
                pt('histogram', ['Histogram cell', 'Histogram hücresi'], [
                    'How the values of vibration_fault are spread: two close humps instead of one bell.',
                    'vibration_fault değerlerinin nasıl yayıldığı: tek bir çan yerine birbirine yakın iki tümsek.',
                ]),
                pt('box', ['Box plot cell', 'Kutu grafiği hücresi'], [
                    'vibration_fault against vibration_clean. The faulty channel has a taller box and many outlier points: occasional large values.',
                    'vibration_clean’e karşı vibration_fault. Arızalı kanalın kutusu daha yüksek ve çok sayıda aykırı noktası var: ara sıra büyük değerler.',
                ]),
                pt('scorecard', ['Statistics cell', 'İstatistik hücresi'], [
                    'process_temp_c over the whole record: minimum 18.1, mean 25.0, maximum 32.2, RMS 25.3, standard deviation 3.6. The scope line says “Whole record”.',
                    'Tüm kayıt boyunca process_temp_c: en küçük 18,1, ortalama 25,0, en büyük 32,2, RMS 25,3, standart sapma 3,6. Kapsam satırı “Whole record” diyor.',
                ]),
                pt('gauge', ['Gauge cell', 'Gösterge hücresi'], [
                    'One value of process_temp_c against green, yellow and red bands. Give the bands limits from a specification before reading them as a verdict.',
                    'process_temp_c’nin bir değeri yeşil, sarı ve kırmızı bantlara karşı. Onları bir hüküm olarak okumadan önce bantlara bir spesifikasyondan sınırlar verin.',
                ]),
            ],
        },
        {
            id: 'signals',
            tab: ['Signals', 'Signals (sinyaller)'],
            summary: [
                'Assigning channels to a cell.',
                'Bir hücreye kanal atamak.',
            ],
            points: [
                pt('signals', ['Signals panel', 'Signals paneli'], [
                    'All channels of the source. Select a cell, then tick the channels it should show; All and None act on the selected cell.',
                    'Kaynağın tüm kanalları. Bir hücre seçin, sonra göstermesi gereken kanalları işaretleyin; All ve None seçili hücreye uygulanır.',
                ]),
                pt('cell', ['Cell header', 'Hücre başlığı'], [
                    'The header names the chart type and its channels, so you can check each assignment at a glance.',
                    'Başlık grafik türünü ve kanallarını adlandırır; böylece her atamayı bir bakışta kontrol edebilirsiniz.',
                ]),
            ],
        },
        {
            id: 'settings',
            tab: ['Settings and Stats', 'Settings ve Stats'],
            summary: [
                'The line chart cell is selected: the left panel shows its settings, the right panel its statistics.',
                'Çizgi grafiği hücresi seçili: sol panel ayarlarını, sağ panel istatistiklerini gösteriyor.',
            ],
            points: [
                pt('settings', ['Cell settings', 'Hücre ayarları'], [
                    'Dashboard switches (Dual Cursor, Couple cursors across charts) followed by the line chart’s own options: grid, legend, tooltips, Y auto-scale, line width, mouse axes, secondary and logarithmic axes, and ISO 20816-3 severity zones for the chosen machine group.',
                    'Pano anahtarları (Dual Cursor, Couple cursors across charts), ardından çizgi grafiğinin kendi seçenekleri: ızgara, lejant, ipuçları, Y otomatik ölçek, çizgi kalınlığı, fare eksenleri, ikincil ve logaritmik eksenler ve seçilen makine grubu için ISO 20816-3 şiddet bölgeleri.',
                ]),
                pt('cell', ['Selected cell', 'Seçili hücre'], [
                    'Click a cell to select it; Settings and Stats follow the selection.',
                    'Seçmek için bir hücreye tıklayın; Settings ve Stats seçimi izler.',
                ]),
                pt('stats', ['Stats', 'Stats (istatistik)'], [
                    'vibration_fault: minimum −5.40, mean 0.0004, maximum 5.49, RMS 0.79.',
                    'vibration_fault: en küçük −5,40, ortalama 0,0004, en büyük 5,49, RMS 0,79.',
                ]),
            ],
        },
    ],

    time_graphics: [
        {
            id: 'graph',
            tab: ['Graph Settings', 'Graph Settings (grafik ayarları)'],
            summary: [
                'Six vibration channels over 100 s in one graph, with cursors C1 at 33.3 s and C2 at 66.7 s. Seen from this distance each channel is a band between its minimum and maximum.',
                'Tek grafikte 100 s boyunca altı titreşim kanalı; C1 imleci 33,3 s’de, C2 66,7 s’de. Bu uzaklıktan her kanal en küçüğü ile en büyüğü arasında bir banttır.',
            ],
            points: [
                pt('settings', ['Graph Settings', 'Grafik ayarları'], [
                    'Options for the selected graph: Normalize, grid, Y-axis range, legend, tooltips, cursor snap, line width, mouse zoom per axis and a secondary Y axis.',
                    'Seçili grafik için seçenekler: Normalize, ızgara, Y ekseni aralığı, lejant, ipuçları, imleç yakalama, çizgi kalınlığı, eksen başına fare yakınlaştırma ve ikincil Y ekseni.',
                ]),
                pt('zoom', ['Zoom to Cursors', 'İmleçlere yakınlaş'], [
                    'Zooms to the interval between C1 and C2.',
                    'C1 ile C2 arasındaki aralığa yakınlaşır.',
                ]),
                pt('reset', ['Reset View', 'Görünümü sıfırla'], [
                    'Back to the whole record.',
                    'Tüm kayda geri döner.',
                ]),
                pt('graphs', ['Graphs', 'Grafik sayısı'], [
                    'How many stacked graphs share the time axis. Put channels with different units in different graphs.',
                    'Kaç üst üste grafiğin zaman eksenini paylaştığı. Farklı birimli kanalları farklı grafiklere koyun.',
                ]),
                pt('plot', ['Graph with cursors', 'İmleçli grafik'], [
                    'Drag the red C1 and blue C2 lines to the moments you want to read.',
                    'Kırmızı C1 ve mavi C2 çizgilerini okumak istediğiniz anlara sürükleyin.',
                ]),
                pt('stats', ['Statistics', 'İstatistikler'], [
                    'Each channel’s value at C1 and C2 and the chosen statistics between them; gearbox_input reads −0.59 at C1 and −0.67 at C2.',
                    'Her kanalın C1 ve C2’deki değeri ve aralarındaki seçili istatistikler; gearbox_input C1’de −0,59 ve C2’de −0,67 okuyor.',
                ]),
                pt('cursors', ['Cursor readout', 'İmleç okuması'], [
                    'T1, T2, ΔT = 33.3 s and 1/ΔT = 0.03 Hz.',
                    'T1, T2, ΔT = 33,3 s ve 1/ΔT = 0,03 Hz.',
                ]),
            ],
        },
        {
            id: 'parameters',
            tab: ['Parameters', 'Parameters (parametreler)'],
            summary: [
                'The channel list of the source, ready to be dragged onto graphs.',
                'Kaynağın kanal listesi; grafiklere sürüklenmeye hazır.',
            ],
            points: [
                pt('parameters', ['Parameters', 'Parametreler'], [
                    'Drag a parameter onto a graph to plot it. In wide records, type part of a name into the search box.',
                    'Çizmek için bir parametreyi bir grafiğe sürükleyin. Geniş kayıtlarda arama kutusuna adın bir bölümünü yazın.',
                ]),
                pt('plot', ['Target graph', 'Hedef grafik'], [
                    'Drop onto the graph that should hold the channel.',
                    'Kanalı tutması gereken grafiğin üzerine bırakın.',
                ]),
            ],
        },
        {
            id: 'statsettings',
            tab: ['Statistics Settings', 'Statistics Settings (istatistik ayarları)'],
            summary: [
                'Choosing the statistics columns and the duty-cycle threshold.',
                'İstatistik sütunlarını ve görev döngüsü eşiğini seçmek.',
            ],
            points: [
                pt('columns', ['Visible Columns', 'Görünür sütunlar'], [
                    'Min, Mean, Max, RMS, Std Dev and Duty Cycle. Hide what you do not need to keep the table readable.',
                    'Min, Mean, Max, RMS, Std Dev ve Duty Cycle. Tabloyu okunur tutmak için ihtiyacınız olmayanları gizleyin.',
                ]),
                pt('duty', ['Duty Cycle Settings', 'Görev döngüsü ayarları'], [
                    'The share of time the signal stays above a threshold. Automatic uses the signal mean; enter a manual threshold when the signal has a defined “on” level, for example 2.5 V for a logic signal.',
                    'Sinyalin bir eşiğin üstünde kaldığı zamanın payı. Automatic sinyal ortalamasını kullanır; sinyalin tanımlı bir “açık” seviyesi varsa elle bir eşik girin, örneğin bir mantık sinyali için 2,5 V.',
                ]),
            ],
        },
        {
            id: 'bitmask',
            tab: ['Bitmask', 'Bitmask'],
            summary: [
                'Decoding a controller status word into readable messages.',
                'Bir kontrolcü durum sözcüğünü okunur mesajlara çevirmek.',
            ],
            points: [
                pt('bitmask', ['Load Bitmask Excel File', 'Bitmask Excel dosyası yükleme'], [
                    'The workbook has one sheet per status channel, named like the channel, with bit numbers and their meanings. After loading, choose the parameter and move the cursor: the panel lists every bit set at that moment.',
                    'Çalışma kitabında her durum kanalı için kanal gibi adlandırılmış bir sayfa ve bit numaraları ile anlamları bulunur. Yükledikten sonra parametreyi seçin ve imleci hareket ettirin: panel o anda set olan her biti listeler.',
                ]),
            ],
        },
        {
            id: 'markers',
            tab: ['Markers', 'Markers (işaretçiler)'],
            summary: [
                'Named moments in the record.',
                'Kayıttaki adlandırılmış anlar.',
            ],
            points: [
                pt('markers', ['Markers', 'İşaretçiler'], [
                    'Right-click a graph and choose Add Marker; double-click a name or time to edit it. Go To jumps to a marker, and selecting one lists every channel’s value at that moment.',
                    'Bir grafiğe sağ tıklayıp Add Marker’ı seçin; düzenlemek için bir ada veya zamana çift tıklayın. Go To bir işaretçiye atlar; birini seçmek her kanalın o andaki değerini listeler.',
                ]),
            ],
        },
    ],

    align_compare: [
        {
            id: 'overlay',
            tab: ['Overlay, before alignment', 'Bindirme, hizalamadan önce'],
            summary: [
                'Two runs of an impact test, accel channel of each. The second logger started later, so its impact (blue) appears 0.35 s after the first (yellow).',
                'Bir darbe testinin iki koşusu, her birinin accel kanalı. İkinci kaydedici daha geç başladığı için darbesi (mavi) birincininkinden (sarı) 0,35 s sonra görünüyor.',
            ],
            points: [
                pt('tree', ['Sources and channels', 'Kaynaklar ve kanallar'], [
                    'One branch per recording with its channels, offset and sample rate. Both accel channels are ticked.',
                    'Kayıt başına kanalları, kayması ve örnekleme hızıyla bir dal. İki accel kanalı da işaretli.',
                ]),
                pt('alignby', ['Align by', 'Hizalama ölçütü'], [
                    'Absolute time uses each file’s time stamps plus its offset; a trigger puts zero where a channel crosses a level.',
                    'Absolute time her dosyanın zaman damgalarını artı kaymasını kullanır; bir tetikleyici sıfırı bir kanalın bir seviyeyi geçtiği yere koyar.',
                ]),
                pt('auto', ['Auto offset (cross-correlation)', 'Otomatik kayma (çapraz korelasyon)'], [
                    'Searches for the shift at which the selected channels match best.',
                    'Seçilen kanalların en iyi eşleştiği kaymayı arar.',
                ]),
                pt('reference', ['Reference', 'Referans'], [
                    'The curve the others are compared with.',
                    'Diğerlerinin karşılaştırılacağı eğri.',
                ]),
                pt('window', ['Window', 'Pencere'], [
                    'Common overlap compares only where all sources have data; Start and End narrow it further.',
                    'Common overlap yalnızca tüm kaynakların verisi olan yerde karşılaştırır; Start ve End onu daha da daraltır.',
                ]),
                pt('grid', ['Grid rate', 'Izgara hızı'], [
                    'The common time grid; Auto uses the highest source rate (1 kHz here).',
                    'Ortak zaman ızgarası; Auto en yüksek kaynak hızını kullanır (burada 1 kHz).',
                ]),
                pt('trace', ['Trace', 'İz'], [
                    'What the Difference tab draws, here x − ref.',
                    'Difference sekmesinin ne çizeceği; burada x − ref.',
                ]),
                pt('tabs', ['Overlay, Difference, Metrics', 'Overlay, Difference, Metrics'], [
                    'Three views of the same comparison.',
                    'Aynı karşılaştırmanın üç görünümü.',
                ]),
                pt('plot', ['Overlay', 'Bindirme'], [
                    'Zoomed to 4.6–6.0 s. The same impact, shifted in time: the runs cannot be compared until they are aligned.',
                    '4,6–6,0 s’ye yakınlaştırılmış. Zamanda kaymış aynı darbe: koşular hizalanana kadar karşılaştırılamaz.',
                ]),
            ],
        },
        {
            id: 'aligned',
            tab: ['Overlay, aligned', 'Bindirme, hizalanmış'],
            summary: [
                'After Auto offset the two impacts lie on top of each other.',
                'Auto offset’ten sonra iki darbe üst üste oturuyor.',
            ],
            points: [
                pt('offset', ['Offset', 'Kayma'], [
                    'Auto offset wrote 0.350049 s into the second source. You can also type an offset by hand.',
                    'Auto offset ikinci kaynağa 0,350049 s yazdı. Bir kaymayı elle de yazabilirsiniz.',
                ]),
                pt('auto', ['Auto offset', 'Otomatik kayma'], [
                    'Run it again after changing channels or the window.',
                    'Kanalları veya pencereyi değiştirdikten sonra yeniden çalıştırın.',
                ]),
                pt('plot', ['Aligned overlay', 'Hizalanmış bindirme'], [
                    'The impact and its ringing now coincide; what still differs is the background noise of the two runs.',
                    'Darbe ve sönümlenen salınımı artık çakışıyor; hâlâ farklı olan iki koşunun arka plan gürültüsü.',
                ]),
            ],
        },
        {
            id: 'metrics',
            tab: ['Metrics', 'Metrics (metrikler)'],
            summary: [
                'Press Compare to compute the numbers for the window on the common grid.',
                'Pencere için sayıları ortak ızgarada hesaplamak üzere Compare’e basın.',
            ],
            points: [
                pt('tabs', ['Metrics', 'Metrikler'], [
                    'The header states the reference, the window (0.35 to 20.0 s), the grid (19,649 rows at 1 kHz) and the method.',
                    'Başlık referansı, pencereyi (0,35 ile 20,0 s), ızgarayı (1 kHz’de 19.649 satır) ve yöntemi belirtir.',
                ]),
                pt('table', ['Metrics table', 'Metrik tablosu'], [
                    'Coverage 100 %, mean difference −0.0002, RMSE 0.042, maximum |Δ| 0.166 at 11.0 s, correlation r 0.68, no limit violations.',
                    'Kapsam %100, ortalama fark −0,0002, RMSE 0,042, en büyük |Δ| 0,166 (11,0 s’de), korelasyon r 0,68, sınır aşımı yok.',
                ]),
                pt('copy', ['Copy table', 'Tabloyu kopyala'], [
                    'Copies the table for a report or spreadsheet.',
                    'Tabloyu bir rapor veya elektronik tablo için kopyalar.',
                ]),
            ],
        },
        {
            id: 'difference',
            tab: ['Difference', 'Difference (fark)'],
            summary: [
                'The difference of the aligned runs over the whole window.',
                'Hizalanmış koşuların tüm pencere boyunca farkı.',
            ],
            points: [
                pt('tabs', ['Difference', 'Fark'], [
                    'Draws the trace chosen under Comparison.',
                    'Comparison altında seçilen izi çizer.',
                ]),
                pt('trace', ['Trace', 'İz'], [
                    'x − ref here; other traces can be chosen for other questions.',
                    'Burada x − ref; başka sorular için başka izler seçilebilir.',
                ]),
                pt('plot', ['Difference trace', 'Fark izi'], [
                    'An even band of about ±0.15 with no spikes at the impacts: after alignment the runs differ only by noise. A misaligned event would show as a large spike.',
                    'Darbelerde sıçrama olmadan yaklaşık ±0,15’lik düzgün bir bant: hizalamadan sonra koşular yalnızca gürültü kadar farklı. Hizalanmamış bir olay büyük bir sıçrama olarak görünürdü.',
                ]),
            ],
        },
    ],

    frequency_domain: [
        {
            id: 'display',
            tab: ['Display settings', 'Görüntü ayarları'],
            summary: [
                'The FFT of accel_faulty, 0–2,500 Hz in dB, as computed by FFT / Spectrum. A series of tall lines rises above a noise floor near −55 dB.',
                'FFT / Spectrum’un hesapladığı accel_faulty FFT’si, 0–2.500 Hz, dB cinsinden. Bir dizi yüksek çizgi −55 dB civarındaki bir gürültü tabanının üstüne çıkıyor.',
            ],
            points: [
                pt('source', ['Source FFT', 'Kaynak FFT'], [
                    'The settings the spectrum was computed with: Hann window, 4,096 samples, 50 % overlap, linear averaging. To change them, go back to FFT / Spectrum.',
                    'Spektrumun hesaplandığı ayarlar: Hann penceresi, 4.096 örnek, %50 örtüşme, doğrusal ortalama. Değiştirmek için FFT / Spectrum’a dönün.',
                ]),
                pt('navigator', ['Navigator channel', 'Gezgin kanalı'], [
                    'Chooses which spectrum is shown.',
                    'Hangi spektrumun gösterileceğini seçer.',
                ]),
                pt('comparison', ['Set / Clear Reference', 'Referans ayarla / temizle'], [
                    'Stores the displayed curve, for example the spectrum of a healthy machine, to compare later spectra with.',
                    'Gösterilen eğriyi, örneğin sağlam bir makinenin spektrumunu, sonraki spektrumları karşılaştırmak için saklar.',
                ]),
                pt('tolerance', ['Reference Tolerance', 'Referans toleransı'], [
                    'Checks the curve against the reference: no more than Below ref. under it and Above ref. over it (3 dB by default) between From and To. The result reads PASS with the worst margin, or FAIL with the number of violating bins.',
                    'Eğriyi referansa karşı kontrol eder: From ile To arasında altında Below ref.’ten, üstünde Above ref.’ten fazla değil (varsayılan 3 dB). Sonuç en kötü marjla PASS veya aşan bin sayısıyla FAIL olarak okunur.',
                ]),
                pt('plot', ['Spectrum', 'Spektrum'], [
                    'Right-click to choose the displayed result (magnitude, PSD, ASD, ESD, phase) and the amplitude convention (Peak, RMS, Peak-to-Peak). Nothing is recomputed.',
                    'Gösterilen sonucu (büyüklük, PSD, ASD, ESD, faz) ve genlik gösterimini (Peak, RMS, Peak-to-Peak) seçmek için sağ tıklayın. Hiçbir şey yeniden hesaplanmaz.',
                ]),
                pt('channels', ['Channels', 'Kanallar'], [
                    'The spectra available from the connected FFT.',
                    'Bağlı FFT’den gelen mevcut spektrumlar.',
                ]),
            ],
        },
        {
            id: 'markers',
            tab: ['Markers', 'Markers (işaretçiler)'],
            summary: [
                'A marker at 50 Hz, a delta from 30 to 60 Hz and a harmonic set from the strongest peak at 857 Hz.',
                '50 Hz’de bir işaretçi, 30’dan 60 Hz’e bir fark ve 857 Hz’deki en güçlü tepeden bir harmonik kümesi.',
            ],
            points: [
                pt('interaction', ['Plot interaction', 'Grafik etkileşimi'], [
                    'Click to add markers. Snap “Nearest peak” with a 5 Hz radius puts each marker on the top of the nearest peak.',
                    'İşaretçi eklemek için tıklayın. 5 Hz yarıçaplı Snap “Nearest peak” her işaretçiyi en yakın tepenin üstüne koyar.',
                ]),
                pt('marker', ['Marker', 'İşaretçi'], [
                    'Type a frequency and press + for an exact marker.',
                    'Kesin bir işaretçi için bir frekans yazın ve +’ya basın.',
                ]),
                pt('band', ['Delta and Band', 'Fark ve bant'], [
                    'Delta gives Δf between two frequencies, here 30 Hz between 30 and 60 Hz; Band reports the content between two frequencies.',
                    'Delta iki frekans arasındaki Δf’yi verir; burada 30 ile 60 Hz arasında 30 Hz. Band iki frekans arasındaki içeriği bildirir.',
                ]),
                pt('harmonics', ['Harmonics', 'Harmonikler'], [
                    'Marks multiples of a base frequency: the strongest displayed peak or a manual value. Here 857 Hz and its multiples up to 8×.',
                    'Bir temel frekansın katlarını işaretler: en güçlü görünen tepe veya elle girilen bir değer. Burada 857 Hz ve 8×’e kadar katları.',
                ]),
                pt('sidebands', ['Sidebands', 'Yan bantlar'], [
                    'Lines at ± df (10 Hz here), Per side times, around a carrier. Equal spacing of real peaks points to modulation, for example by a shaft speed.',
                    'Bir taşıyıcı çevresinde ± df’de (burada 10 Hz), Per side kadar çizgi. Gerçek tepelerin eşit aralığı bir modülasyona, örneğin bir mil hızına işaret eder.',
                ]),
                pt('qdamping', ['Measure Q / Damping', 'Q / sönüm ölçümü'], [
                    'For a resonance peak: finds the two −3 dB points and reports Q and the damping ratio.',
                    'Bir rezonans tepesi için: iki −3 dB noktasını bulur ve Q ile sönüm oranını bildirir.',
                ]),
                pt('table', ['Marker table', 'İşaretçi tablosu'], [
                    'Positions and values of every marker, the delta and the harmonic set; Export CSV keeps them.',
                    'Her işaretçinin, farkın ve harmonik kümesinin konumları ve değerleri; Export CSV onları saklar.',
                ]),
                pt('plot', ['Markers on the spectrum', 'Spektrumdaki işaretçiler'], [
                    'The 2× harmonic mark sits on a peak at −32 dB, so that line belongs to the 857 Hz family.',
                    '2× harmonik işareti −32 dB’deki bir tepeye oturuyor; yani o çizgi 857 Hz ailesine ait.',
                ]),
            ],
        },
    ],

    order_map_view: [
        {
            id: 'map',
            tab: ['2D map', '2D harita'],
            summary: [
                'An order map of a run-up from about 600 to 6,000 rpm: order on the horizontal axis, speed on the vertical axis, amplitude as colour. The 3D Waterfall button shows the same surface as a landscape.',
                'Yaklaşık 600’den 6.000 rpm’ye bir hızlanmanın order haritası: yatay eksende order, dikey eksende hız, renk olarak genlik. 3D Waterfall düğmesi aynı yüzeyi bir manzara olarak gösterir.',
            ],
            points: [
                pt('display', ['Display', 'Görüntü'], [
                    'Source and metric select among the computed maps.',
                    'Source ve metric hesaplanmış haritalar arasında seçim yapar.',
                ]),
                pt('metric', ['Metric', 'Metrik'], [
                    'Amplitude here; dB compresses large differences in level, Phase shows the phase of each order.',
                    'Burada Amplitude; dB büyük seviye farklarını sıkıştırır, Phase her order’ın fazını gösterir.',
                ]),
                pt('surface', ['Surface', 'Yüzey'], [
                    'The result shown, named by channel, map and metric.',
                    'Gösterilen sonuç; kanal, harita ve metrikle adlandırılır.',
                ]),
                pt('colormap', ['Colormap', 'Renk haritası'], [
                    'The palette. The colour bar on the right maps colour to amplitude.',
                    'Palet. Sağdaki renk çubuğu rengi genliğe eşler.',
                ]),
                pt('guides', ['Prepared guides', 'Hazır kılavuzlar'], [
                    'Dashed lines at orders supplied by Order Tracking. They mark where to look; they do not mean there is energy.',
                    'Order Tracking’in sağladığı order’larda kesikli çizgiler. Nereye bakılacağını işaretler; enerji olduğu anlamına gelmez.',
                ]),
                pt('range', ['Color Range', 'Renk aralığı'], [
                    'Auto range fits the colours to this map (0.0017 to 1.0). Fix Minimum and Maximum when comparing maps.',
                    'Auto range renkleri bu haritaya uydurur (0,0017 ile 1,0). Haritaları karşılaştırırken Minimum ve Maximum’u sabitleyin.',
                ]),
                pt('plot', ['Order map', 'Order haritası'], [
                    'Vertical bands at orders 1, 2 and 3 over the whole speed range: vibration tied to rotation, strongest at order 1. Nothing above order 4.',
                    'Tüm hız aralığı boyunca order 1, 2 ve 3’te dikey bantlar: dönmeye bağlı titreşim, en güçlüsü order 1’de. Order 4’ün üstünde hiçbir şey yok.',
                ]),
                pt('data', ['Data panel', 'Data paneli'], [
                    'With Pointer readout on, shows order, RPM and amplitude under the mouse.',
                    'Pointer readout açıkken fare altındaki order, RPM ve genliği gösterir.',
                ]),
                pt('mode', ['2D Map / 3D Waterfall', '2D harita / 3D şelale'], [
                    'Switch to the 3D surface to compare peak heights at a glance; return to 2D to read values.',
                    'Tepe yüksekliklerini bir bakışta karşılaştırmak için 3D yüzeye geçin; değer okumak için 2D’ye dönün.',
                ]),
            ],
        },
    ],

    intelligent_report: [
        {
            id: 'report',
            tab: ['Report editor', 'Rapor editörü'],
            summary: [
                'A first report built from a File Reader with two accelerometer channels: content on the left, structure in the middle, live preview, and page settings on the right.',
                'İki ivmeölçer kanallı bir File Reader’dan kurulmuş ilk rapor: solda içerik, ortada yapı, canlı önizleme ve sağda sayfa ayarları.',
            ],
            points: [
                pt('content', ['Available Content', 'Mevcut içerik'], [
                    'Everything connected to the report, grouped by kind. Here only Time Domain has entries; the other groups say what to connect to fill them.',
                    'Rapora bağlı her şey, türüne göre gruplanmış. Burada yalnızca Time Domain’de girdi var; diğer gruplar onları doldurmak için neyin bağlanacağını söylüyor.',
                ]),
                pt('add', ['Add to Report', 'Rapora ekle'], [
                    'Adds the ticked items. With Overlay channels they share one figure.',
                    'İşaretli öğeleri ekler. Overlay channels ile tek bir şekli paylaşırlar.',
                ]),
                pt('structure', ['Structure', 'Yapı'], [
                    'The blocks in page order: Summary, Test Information and one time figure with two items.',
                    'Sayfa sırasına göre bloklar: Summary, Test Information ve iki öğeli bir zaman şekli.',
                ]),
                pt('blocks', ['Block buttons', 'Blok düğmeleri'], [
                    'Add text, test information, a page break, a summary or a table of contents.',
                    'Metin, test bilgisi, sayfa sonu, özet veya içindekiler tablosu ekleyin.',
                ]),
                pt('limits', ['Limits', 'Sınırlar'], [
                    'Gives the selected block a requirement. Without any limits the summary stays INCOMPLETE, as in the preview.',
                    'Seçili bloğa bir gereksinim verir. Hiç sınır yoksa özet önizlemedeki gibi INCOMPLETE kalır.',
                ]),
                pt('preview', ['Preview', 'Önizleme'], [
                    'The report as it will be exported: numbered sections, “Table 2: Test Information” and the time figure.',
                    'Raporun dışa aktarılacağı hali: numaralı bölümler, “Table 2: Test Information” ve zaman şekli.',
                ]),
                pt('title', ['Title, header, footer', 'Başlık, üst ve alt bilgi'], [
                    'Text printed on the title and on every page; Page Size sets A4 or another format.',
                    'Başlığa ve her sayfaya basılan metin; Page Size A4 veya başka bir biçim belirler.',
                ]),
                pt('templates', ['Word and slide templates', 'Word ve sunu şablonları'], [
                    'Apply your company layout to the Word and slide exports.',
                    'Word ve sunu çıktılarına şirket yerleşiminizi uygulayın.',
                ]),
                pt('testinfo', ['Test Information', 'Test bilgisi'], [
                    'Type project, test article, procedure and operator. Source file, record length (20 s), sample rate (5,000 Hz) and channel count are filled in automatically.',
                    'Proje, test parçası, prosedür ve operatörü yazın. Kaynak dosya, kayıt uzunluğu (20 s), örnekleme hızı (5.000 Hz) ve kanal sayısı otomatik doldurulur.',
                ]),
                pt('exports', ['Export PDF, Word, Slides', 'PDF, Word, Slides dışa aktarma'], [
                    'Writes the report in the chosen format.',
                    'Raporu seçilen biçimde yazar.',
                ]),
                pt('regenerate', ['Regenerate for Recordings', 'Kayıtlar için yeniden üret'], [
                    'Produces the same report for other recordings; Map Channels says which channel takes which role in each.',
                    'Aynı raporu diğer kayıtlar için üretir; Map Channels her birinde hangi kanalın hangi rolü aldığını söyler.',
                ]),
            ],
        },
    ],

    python_script: [
        {
            id: 'code',
            tab: ['Code', 'Code (kod)'],
            summary: [
                'A Preprocessing script after Test Run: the body lists the channels and the row count of the connected dataset.',
                'Test Run’dan sonra bir Preprocessing betiği: gövde bağlı veri kümesinin kanallarını ve satır sayısını listeliyor.',
            ],
            points: [
                pt('mode', ['Mode', 'Mod'], [
                    'Preprocessing, Data I/O, Compute or Report. The text next to it says what the mode does with the result.',
                    'Preprocessing, Data I/O, Compute veya Report. Yanındaki metin modun sonuçla ne yaptığını söyler.',
                ]),
                pt('header', ['Locked header', 'Kilitli başlık'], [
                    'Provides engine, reader, data, params, np, pa and pl. Click to read it.',
                    'engine, reader, data, params, np, pa ve pl sağlar. Okumak için tıklayın.',
                ]),
                pt('editor', ['Your code', 'Kodunuz'], [
                    'The editable body, with completion, find and comment shortcuts. Lines starting with # %% split it into cells.',
                    'Tamamlama, arama ve yorum kısayollarıyla düzenlenebilir gövde. # %% ile başlayan satırlar onu hücrelere böler.',
                ]),
                pt('footer', ['Locked footer', 'Kilitli alt bilgi'], [
                    'Sends the result downstream in the form the mode needs; in Preprocessing it writes the output into the MPAI file.',
                    'Sonucu modun gerektirdiği biçimde sonraki düğüme gönderir; Preprocessing’de çıktıyı MPAI dosyasına yazar.',
                ]),
                pt('run', ['Test Run', 'Test çalıştırması'], [
                    'Runs without sending anything on. The Console confirms what would have been sent.',
                    'Hiçbir şey iletmeden çalıştırır. Console neyin gönderileceğini doğrular.',
                ]),
                pt('emit', ['Run & Emit', 'Çalıştır ve gönder'], [
                    'Runs and sends the result to the connected widgets. Use it after a successful Test Run.',
                    'Çalıştırır ve sonucu bağlı widget’lara gönderir. Başarılı bir Test Run’dan sonra kullanın.',
                ]),
                pt('examples', ['Examples…', 'Örnekler…'], [
                    'Working scripts to start from.',
                    'Başlangıç için çalışan betikler.',
                ]),
                pt('vscode', ['Open in VS Code', 'VS Code’da aç'], [
                    'Edit the body in VS Code; each save there reloads here.',
                    'Gövdeyi VS Code’da düzenleyin; oradaki her kayıt burada yeniden yüklenir.',
                ]),
                pt('save', ['Save as Widget…', 'Widget olarak kaydet…'], [
                    'Turns the script and its parameters into a widget in the palette.',
                    'Betiği ve parametrelerini paletteki bir widget’a dönüştürür.',
                ]),
                pt('console', ['Console', 'Konsol'], [
                    'print output and errors: 9 channels, 200,000 rows, Test Run finished.',
                    'print çıktısı ve hatalar: 9 kanal, 200.000 satır, Test Run bitti.',
                ]),
            ],
        },
        {
            id: 'variables',
            tab: ['Variables', 'Variables (değişkenler)'],
            summary: [
                'The names the script left behind after the run.',
                'Betiğin çalışmadan sonra bıraktığı adlar.',
            ],
            points: [
                pt('variables', ['Variables tab', 'Variables sekmesi'], [
                    'One of the four output tabs, next to Console, Result and Plot.',
                    'Console, Result ve Plot’un yanındaki dört çıktı sekmesinden biri.',
                ]),
                pt('table', ['Variable table', 'Değişken tablosu'], [
                    'cols is a list of length 9. Use it to check shapes and types without adding print statements.',
                    'cols uzunluğu 9 olan bir liste. print eklemeden boyutları ve türleri kontrol etmek için kullanın.',
                ]),
            ],
        },
        {
            id: 'parameters',
            tab: ['Parameters', 'Parameters (parametreler)'],
            summary: [
                'One parameter declared; the form on the right shows how a user of the saved widget will set it.',
                'Bir parametre tanımlandı; sağdaki form, kaydedilmiş widget’ın kullanıcısının onu nasıl ayarlayacağını gösteriyor.',
            ],
            points: [
                pt('paramtab', ['Parameters tab', 'Parameters sekmesi'], [
                    'Declares values the script reads as params[\'name\'].',
                    'Betiğin params[\'name\'] olarak okuduğu değerleri tanımlar.',
                ]),
                pt('table', ['Declarations', 'Tanımlar'], [
                    'Name, label, type (float, int, bool, choice, text, channel), default, limits and options. param_1 is a float with default 0.0.',
                    'Ad, etiket, tür (float, int, bool, choice, text, channel), varsayılan, sınırlar ve seçenekler. param_1, varsayılanı 0,0 olan bir float.',
                ]),
                pt('preview', ['Form preview', 'Form önizlemesi'], [
                    'The settings form of the saved widget. The values typed here are the ones Test Run uses.',
                    'Kaydedilmiş widget’ın ayar formu. Buraya yazılan değerler Test Run’ın kullandıklarıdır.',
                ]),
            ],
        },
    ],
}
