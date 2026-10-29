// Interface tours: basic visualization widgets. Every string pair is [en, tr].
// Hotspot positions come from tourAnchors.js (measured in the running app).

const pt = (id, title, desc) => ({ id, title, desc })

export default {
    line_chart: [
        {
            id: 'settings',
            tab: ['Settings and channels', 'Settings ve kanallar'],
            summary: [
                'Two channels of a 200-second, 1 kHz test record (sine_10hz and chirp_5_to_120hz), zoomed to the first two seconds. The left panel holds display settings, the right panel chooses what is drawn.',
                '200 saniyelik, 1 kHz’lik bir test kaydının iki kanalı (sine_10hz ve chirp_5_to_120hz), ilk iki saniyeye yakınlaştırılmış. Sol panel görüntü ayarlarını tutar, sağ panel neyin çizileceğini seçer.',
            ],
            points: [
                pt('envelope', ['Min-Max envelope band', 'Min-Max zarf bandı'], [
                    'Shades the area between the lowest and highest value of every pixel column. Turn it on when you look at a long vibration record from far away: the band shows the real amplitude range.',
                    'Her piksel sütununun en düşük ve en yüksek değeri arasını gölgeler. Uzun bir titreşim kaydına uzaktan bakarken açın: bant gerçek genlik aralığını gösterir.',
                ]),
                pt('timeformat', ['Time-axis format', 'Zaman ekseni biçimi'], [
                    'Relative seconds from the start of the record, or clock time when the file carries absolute timestamps. Only the labels change.',
                    'Kaydın başından itibaren göreli saniye veya dosya mutlak zaman damgası taşıyorsa saat zamanı. Yalnızca etiketler değişir.',
                ]),
                pt('signals', ['Right Y axis', 'Sağ Y ekseni'], [
                    'Tick a signal here to draw it against a second axis on the right. Use it for channels with very different sizes, such as temperature next to vibration.',
                    'Bir sinyali sağdaki ikinci eksene karşı çizmek için burada işaretleyin. Sıcaklığın yanında titreşim gibi büyüklükleri çok farklı kanallar için kullanın.',
                ]),
                pt('layout', ['Rows and columns', 'Satır ve sütunlar'], [
                    'Split the window into several graphs with linked time axes, for example one graph per sensor.',
                    'Pencereyi zaman eksenleri bağlı birkaç grafiğe bölün; örneğin her sensör için bir grafik.',
                ]),
                pt('target', ['Target graph', 'Hedef grafik'], [
                    'Which graph receives the channels you tick next. “1/1” means there is one graph.',
                    'Bundan sonra işaretlediğiniz kanalların hangi grafiğe gideceği. “1/1” tek grafik olduğunu gösterir.',
                ]),
                pt('navigator', ['Navigator strip', 'Gezgin şeridi'], [
                    'The first channel over the whole record. At this scale a 200-second oscillation fills the strip. Drag its edges to choose the part of the record that is loaded and used by Stats.',
                    'İlk kanal, tüm kayıt boyunca. Bu ölçekte 200 saniyelik bir salınım şeridi doldurur. Kaydın yüklenecek ve Stats’ın kullanacağı bölümünü seçmek için kenarlarını sürükleyin.',
                ]),
                pt('plot', ['Plot', 'Grafik'], [
                    'Wheel to zoom, drag to pan, double-click to reset. Here 0–2 s are visible: the orange 10 Hz sine completes 20 cycles, the blue chirp starts slower and speeds up over the record.',
                    'Tekerlekle yakınlaştırın, sürükleyerek kaydırın, çift tıklayarak sıfırlayın. Burada 0–2 s görünüyor: turuncu 10 Hz sinüs 20 çevrim tamamlıyor, mavi chirp daha yavaş başlıyor ve kayıt boyunca hızlanıyor.',
                ]),
                pt('channels', ['Channels', 'Kanallar'], [
                    'X Axis chooses time or another channel (for an X–Y plot). Y Channel(s) lists every channel of the source; selected rows are drawn.',
                    'X Axis zamanı veya başka bir kanalı (X–Y grafiği için) seçer. Y Channel(s) kaynağın tüm kanallarını listeler; seçili satırlar çizilir.',
                ]),
            ],
        },
        {
            id: 'markers',
            tab: ['Markers', 'Markers (işaretçiler)'],
            summary: [
                'One time marker at 1.0 s, one delta pair from 0.5 to 1.5 s and a peak search between 0 and 2 s. The table on the right lists every marker.',
                '1,0 s’de bir zaman işaretçisi, 0,5’ten 1,5 s’ye bir fark çifti ve 0 ile 2 s arasında bir tepe araması. Sağdaki tablo her işaretçiyi listeler.',
            ],
            points: [
                pt('click', ['Click plot to add markers', 'Tıklayarak işaretçi ekleme'], [
                    'When ticked, a click on the plot drops a marker at that time. Untick it while you pan and zoom so you do not add markers by accident.',
                    'İşaretliyken grafiğe tıklamak o zamana bir işaretçi bırakır. Yanlışlıkla işaretçi eklememek için kaydırıp yakınlaştırırken işaretini kaldırın.',
                ]),
                pt('snap', ['Snap', 'Yakalama'], [
                    '“Nearest data point” moves each marker onto a real sample, so the value it shows was measured, not interpolated.',
                    '“Nearest data point” her işaretçiyi gerçek bir örneğe taşır; böylece gösterdiği değer ara değer değil, ölçülmüş değerdir.',
                ]),
                pt('marker', ['Marker', 'Marker (işaretçi)'], [
                    'Type an exact time and press + to place a marker there. M1 at 1.000 s reads −0.454 on the chirp.',
                    'Kesin bir zaman yazın ve oraya işaretçi koymak için +’ya basın. 1,000 s’deki M1 chirp üzerinde −0,454 okuyor.',
                ]),
                pt('delta', ['Delta', 'Delta (fark)'], [
                    'Two times that form a pair. The label shows Δt = 1.000 s and the change in value; 1/Δt gives the frequency when the two markers are one period apart.',
                    'Bir çift oluşturan iki zaman. Etiket Δt = 1,000 s’yi ve değerdeki değişimi gösterir; iki işaretçi bir periyot arayla duruyorsa 1/Δt frekansı verir.',
                ]),
                pt('extrema', ['Time Range Extrema', 'Aralıktaki uç değerler'], [
                    'Find Maxima or Minima between Min Time and Max Time; Count sets how many markers are placed. A quick way to locate the largest peaks of a test.',
                    'Min Time ile Max Time arasında Maxima veya Minima bulur; Count kaç işaretçi konacağını belirler. Bir testin en büyük tepelerini bulmanın hızlı yolu.',
                ]),
                pt('table', ['Marker table', 'İşaretçi tablosu'], [
                    'One row per marker with position and value; a delta row shows both ends and Δt. Rename, Remove, Clear, or Export CSV to keep the readings.',
                    'İşaretçi başına konum ve değerle bir satır; fark satırı iki ucu ve Δt’yi gösterir. Okumaları saklamak için Rename, Remove, Clear veya Export CSV.',
                ]),
                pt('plot', ['Markers on the plot', 'Grafikteki işaretçiler'], [
                    'Each marker is a vertical line with a label, shared by all channels of the graph.',
                    'Her işaretçi etiketli dikey bir çizgidir ve grafiğin tüm kanalları tarafından paylaşılır.',
                ]),
            ],
        },
        {
            id: 'stats',
            tab: ['Stats', 'Stats (istatistik)'],
            summary: [
                'Statistics of the drawn channels for the navigator selection, here the whole 200-second record, computed from all 200,000 samples per channel.',
                'Çizilen kanalların gezgin seçimi için istatistikleri; burada 200 saniyelik kaydın tamamı, kanal başına 200.000 örneğin hepsinden hesaplandı.',
            ],
            points: [
                pt('stats', ['Statistics table', 'İstatistik tablosu'], [
                    'Both channels go from −1 to 1 with a mean near zero and an RMS of 0.707, which is 1/√2, the RMS of any sine of amplitude 1. When you select part of the record the title states the interval.',
                    'İki kanal da −1’den 1’e gidiyor, ortalamaları sıfıra yakın ve RMS değerleri 0,707; bu, genliği 1 olan her sinüsün RMS’i olan 1/√2’dir. Kaydın bir bölümünü seçtiğinizde başlık aralığı belirtir.',
                ]),
                pt('navigator', ['Selection', 'Seçim'], [
                    'The statistics follow the navigator selection, not the zoom inside the plot. Narrow the navigator to get numbers for one event.',
                    'İstatistikler grafiğin içindeki yakınlaştırmayı değil, gezgin seçimini izler. Tek bir olayın sayıları için gezgini daraltın.',
                ]),
            ],
        },
        {
            id: 'insights',
            tab: ['Insights', 'Insights (içgörüler)'],
            summary: [
                'A short written reading of the drawn channels.',
                'Çizilen kanalların kısa, yazılı bir okuması.',
            ],
            points: [
                pt('insights', ['Insights', 'İçgörüler'], [
                    'Sample rate 1.0 kHz means frequencies up to 500 Hz (the Nyquist limit) can be represented. Per channel it lists mean, RMS and peak-to-peak, then names the most and least variable channel by standard deviation.',
                    '1,0 kHz örnekleme hızı 500 Hz’e (Nyquist sınırı) kadar frekansların temsil edilebileceği anlamına gelir. Kanal başına ortalama, RMS ve tepeden tepeyi listeler, sonra standart sapmaya göre en çok ve en az değişen kanalı adlandırır.',
                ]),
            ],
        },
    ],

    histogram_widget: [
        {
            id: 'settings',
            tab: ['Settings', 'Settings (ayarlar)'],
            summary: [
                'vibration_bimodal, 500,000 values in 370 bins chosen by the Freedman–Diaconis rule. The two humps near −2 and +2 are the first thing a histogram shows that a time plot hides.',
                'vibration_bimodal, Freedman–Diaconis kuralının seçtiği 370 binde 500.000 değer. −2 ve +2 civarındaki iki tümsek, bir histogramın gösterip zaman grafiğinin gizlediği ilk şeydir.',
            ],
            points: [
                pt('binrule', ['Bin Rule', 'Bin kuralı'], [
                    'Freedman–Diaconis picks the bin width from the spread of the middle half of the data and copes well with outliers. Fixed bins lets you set the count to check that a shape survives.',
                    'Freedman–Diaconis bin genişliğini verinin orta yarısının yayılımından seçer ve aykırı değerlerle iyi başa çıkar. Fixed bins, bir şeklin korunup korunmadığını kontrol etmek için sayıyı belirlemenizi sağlar.',
                ]),
                pt('range', ['Range', 'Aralık'], [
                    'A few values near ±18 stretch the axis although almost everything lies between −5 and 5. Trim outliers (1–99 %) zooms in on the bulk; Manual bin range fixes Min and Max so several histograms share one axis.',
                    '±18 civarındaki birkaç değer ekseni geriyor, oysa neredeyse her şey −5 ile 5 arasında. Trim outliers (%1–99) yığına yakınlaştırır; Manual bin range, birkaç histogramın tek ekseni paylaşması için Min ve Max’ı sabitler.',
                ]),
                pt('yaxis', ['Y Axis', 'Y ekseni'], [
                    'Absolute count, relative count, probability density or cumulative distribution. Log-Y makes rare values in the tails visible.',
                    'Mutlak sayı, göreli sayı, olasılık yoğunluğu veya kümülatif dağılım. Log-Y kuyruklardaki seyrek değerleri görünür kılar.',
                ]),
                pt('markers', ['Markers', 'İşaretçiler'], [
                    'Sigma markers draw mean ± 1…3 standard deviations; percentile markers draw the listed percentiles (5, 50, 95 by default).',
                    'Sigma işaretçileri ortalama ± 1…3 standart sapmayı çizer; yüzdelik işaretçileri listedeki yüzdelikleri çizer (varsayılan 5, 50, 95).',
                ]),
                pt('fit', ['Distribution Fit', 'Dağılım uydurma'], [
                    'Choose Normal, Lognormal or Weibull and press Fit + KS distance. “No fit computed” means no model is drawn yet.',
                    'Normal, Lognormal veya Weibull seçin ve Fit + KS distance’a basın. “No fit computed”, henüz bir model çizilmediği anlamına gelir.',
                ]),
                pt('overlay', ['Overlay', 'Bindirme'], [
                    'KDE curve draws a smooth density estimate over the bars.',
                    'KDE curve, çubukların üzerine düzgün bir yoğunluk tahmini çizer.',
                ]),
                pt('plot', ['Histogram', 'Histogram'], [
                    'Count per bin. Two humps and almost nothing at zero: the signal spends its time in two states.',
                    'Bin başına sayı. İki tümsek ve sıfırda neredeyse hiçbir şey: sinyal zamanını iki durumda geçiriyor.',
                ]),
                pt('stats', ['Statistics', 'İstatistikler'], [
                    'Minimum −18.6, mean −0.0005, maximum 18.7. The mean is close to zero, a value the signal almost never takes; read it together with the histogram.',
                    'En küçük −18,6, ortalama −0,0005, en büyük 18,7. Ortalama sıfıra yakın; sinyalin neredeyse hiç almadığı bir değer. Onu histogramla birlikte okuyun.',
                ]),
            ],
        },
        {
            id: 'fit',
            tab: ['Fit, percentiles and KDE', 'Uydurma, yüzdelikler ve KDE'],
            summary: [
                'Percentile markers, the KDE curve and a Normal fit drawn over the same histogram. The fit shows why one bell curve cannot describe two humps.',
                'Aynı histogramın üzerine çizilmiş yüzdelik işaretçileri, KDE eğrisi ve Normal uyum. Uyum, tek bir çan eğrisinin iki tümseği neden tarif edemeyeceğini gösteriyor.',
            ],
            points: [
                pt('percentiles', ['Percentile markers', 'Yüzdelik işaretçileri'], [
                    'Dashed lines at the 5th, 50th and 95th percentile. 90 % of the values lie between the two outer lines; the middle line is the median.',
                    '5., 50. ve 95. yüzdelikte kesikli çizgiler. Değerlerin %90’ı iki dış çizgi arasında; ortadaki çizgi medyandır.',
                ]),
                pt('fitbtn', ['Fit + KS distance', 'Fit + KS distance'], [
                    'Normal fit: mean 0.005, σ 2.25, KS distance D = 0.098. The fit used 200,000 of the 500,000 rows and says so. A D near 0.1 is a poor match, as the purple curve shows.',
                    'Normal uyum: ortalama 0,005, σ 2,25, KS uzaklığı D = 0,098. Uyum 500.000 satırın 200.000’ini kullandı ve bunu yazıyor. 0,1 civarında bir D zayıf bir eşleşmedir; mor eğri de bunu gösteriyor.',
                ]),
                pt('kde', ['KDE curve', 'KDE eğrisi'], [
                    'The orange curve follows both humps closely. Compare it with the purple Normal curve that puts its peak where the data has a valley.',
                    'Turuncu eğri iki tümseği de yakından izliyor. Onu, tepesini verinin çukur olduğu yere koyan mor Normal eğriyle karşılaştırın.',
                ]),
                pt('plot', ['Reading the overlay', 'Bindirmeyi okumak'], [
                    'Where the purple model is higher than the bars, it expects values that never occur. A good model lies on the bars everywhere.',
                    'Mor modelin çubuklardan yüksek olduğu yerlerde model hiç görülmeyen değerler bekliyor. İyi bir model her yerde çubukların üzerinde durur.',
                ]),
                pt('insights', ['Insights', 'İçgörüler'], [
                    'The sample rate of the source, 1.0 kHz.',
                    'Kaynağın örnekleme hızı, 1,0 kHz.',
                ]),
            ],
        },
        {
            id: 'channels',
            tab: ['Channels', 'Channels (kanallar)'],
            summary: [
                'The channel list of the connected source.',
                'Bağlı kaynağın kanal listesi.',
            ],
            points: [
                pt('channels', ['Channels', 'Kanallar'], [
                    'Tick one channel for a single histogram or several to overlay them. Compare overlays with relative count or density so different lengths stay comparable.',
                    'Tek bir histogram için bir kanal, üst üste çizmek için birkaç kanal işaretleyin. Farklı uzunluklar karşılaştırılabilir kalsın diye bindirmeleri göreli sayı veya yoğunlukla karşılaştırın.',
                ]),
                pt('plot', ['Histogram', 'Histogram'], [
                    'The plot updates as soon as the selection changes.',
                    'Seçim değişir değişmez grafik güncellenir.',
                ]),
            ],
        },
    ],

    scatter_plot: [
        {
            id: 'settings',
            tab: ['Settings and statistics', 'Settings ve istatistikler'],
            summary: [
                'y_strong against x_uniform, all 300,000 pairs. Above 20,000 pairs the plot is a full-data raster: every pair is counted into a pixel, nothing is sampled away.',
                'x_uniform’a karşı y_strong, 300.000 çiftin hepsi. 20.000 çiftin üstünde grafik tam veri rasteridir: her çift bir piksele sayılır, hiçbir şey örnekleme ile atılmaz.',
            ],
            points: [
                pt('appearance', ['Appearance', 'Görünüm'], [
                    'Point size, opacity and shape. They apply while points are drawn one by one; in raster mode, as here, they are switched off.',
                    'Nokta boyutu, opaklık ve şekil. Noktalar tek tek çizilirken geçerlidir; burada olduğu gibi raster modunda kapalıdır.',
                ]),
                pt('regression', ['Regression', 'Regresyon'], [
                    'The least-squares line through every pair: slope 2, intercept ≈ 0, R² = 0.994. The robust line is not offered in raster mode.',
                    'Her çiftten geçen en küçük kareler doğrusu: eğim 2, kesişim ≈ 0, R² = 0,994. Raster modunda sağlam doğru sunulmaz.',
                ]),
                pt('correlation', ['Correlation', 'Korelasyon'], [
                    'Pearson r over all pairs is 0.997. Spearman would need ranking 300,000 values, so the panel says it is unavailable rather than showing an approximation.',
                    'Tüm çiftler üzerinden Pearson r 0,997. Spearman 300.000 değerin sıralanmasını gerektirirdi; bu yüzden panel bir yaklaşık değer göstermek yerine kullanılamadığını yazıyor.',
                ]),
                pt('plot', ['Scatter', 'Saçılım'], [
                    'A narrow straight band: a strong linear link. The dashed line is the regression line.',
                    'Dar, düz bir bant: güçlü bir doğrusal bağ. Kesikli çizgi regresyon doğrusudur.',
                ]),
                pt('stats', ['Statistics', 'İstatistikler'], [
                    'The title repeats slope and R²; the row gives minimum, mean, maximum and standard deviation of the Y channel.',
                    'Başlık eğimi ve R²’yi tekrarlar; satır Y kanalının en küçük, ortalama, en büyük ve standart sapma değerlerini verir.',
                ]),
            ],
        },
        {
            id: 'robust',
            tab: ['Robust line', 'Sağlam doğru'],
            summary: [
                'A beam test with 15,000 load–deflection pairs. At loads above 7 kN the displacement sensor dropped out in 4.5 % of the samples and read about 2 mm: the cloud at the lower right.',
                '15.000 yük–sehim çiftli bir kiriş testi. 7 kN’nin üstündeki yüklerde yer değiştirme sensörü örneklerin %4,5’inde kopmuş ve yaklaşık 2 mm okumuş: sağ alttaki bulut.',
            ],
            points: [
                pt('regression', ['OLS line', 'OLS doğrusu'], [
                    'Slope 1.69 mm/kN, R² 0.69. The dropout points pull the least-squares line down.',
                    'Eğim 1,69 mm/kN, R² 0,69. Kopma noktaları en küçük kareler doğrusunu aşağı çekiyor.',
                ]),
                pt('robust', ['Show robust line (Theil–Sen)', 'Sağlam doğruyu göster (Theil–Sen)'], [
                    'Slope 1.98 mm/kN, intercept 1.06, from a bounded sample of the points. The median of pairwise slopes ignores the dropouts and stays near the true 2 mm/kN.',
                    'Eğim 1,98 mm/kN, kesişim 1,06; noktaların sınırlı bir örnekleminden. İkili eğimlerin medyanı kopmaları yok sayıyor ve gerçek 2 mm/kN’ye yakın kalıyor.',
                ]),
                pt('correlation', ['Correlation', 'Korelasyon'], [
                    'Pearson 0.83 and Spearman 0.82, both computed on all pairs. The dropouts lower them as well.',
                    'Pearson 0,83 ve Spearman 0,82; ikisi de tüm çiftlerden hesaplandı. Kopmalar onları da düşürüyor.',
                ]),
                pt('plot', ['Two lines', 'İki doğru'], [
                    'The orange robust line runs through the main band; the white dashed OLS line passes below it at high loads. When the two differ this much, look for outliers before reporting a slope.',
                    'Turuncu sağlam doğru ana banttan geçiyor; beyaz kesikli OLS doğrusu yüksek yüklerde onun altından geçiyor. İkisi bu kadar farklıysa bir eğim raporlamadan önce aykırı değerleri arayın.',
                ]),
                pt('insights', ['Insights', 'İçgörüler'], [
                    'Mean, RMS and peak-to-peak of both channels: load spans 10 kN, deflection 24.3 mm.',
                    'İki kanalın ortalama, RMS ve tepeden tepe değerleri: yük 10 kN, sehim 24,3 mm aralığında.',
                ]),
            ],
        },
        {
            id: 'channels',
            tab: ['Channels', 'Channels (kanallar)'],
            summary: [
                'Choosing what goes on each axis.',
                'Her eksene ne konacağını seçmek.',
            ],
            points: [
                pt('channels', ['X and Y channels', 'X ve Y kanalları'], [
                    'Pick one channel for X (or the sample index) and one or more for Y, then press Apply Selected. With several Y series the regression and correlation readouts are switched off, because they describe one pair.',
                    'X için bir kanal (veya örnek numarası), Y için bir veya daha fazla kanal seçin, sonra Apply Selected’a basın. Birkaç Y serisiyle regresyon ve korelasyon okumaları kapanır, çünkü bunlar tek bir çifti tarif eder.',
                ]),
                pt('plot', ['Scatter', 'Saçılım'], [
                    'The plot is rebuilt after Apply Selected.',
                    'Apply Selected’dan sonra grafik yeniden oluşturulur.',
                ]),
            ],
        },
    ],

    box_plot: [
        {
            id: 'settings',
            tab: ['Box and whisker', 'Kutu ve bıyık'],
            summary: [
                'Five vibration channels, 1,000,000 samples in total. The statistics are exact; only the outlier dots drawn are limited to 10,000 per box.',
                'Beş titreşim kanalı, toplam 1.000.000 örnek. İstatistikler kesindir; yalnızca çizilen aykırı noktalar kutu başına 10.000 ile sınırlıdır.',
            ],
            points: [
                pt('view', ['View', 'Görünüm'], [
                    'Box & whisker shows median, quartiles and whiskers. Violin (density) draws the full shape.',
                    'Box & whisker medyanı, çeyrekleri ve bıyıkları gösterir. Violin (density) tam şekli çizer.',
                ]),
                pt('whiskers', ['Whiskers', 'Bıyıklar'], [
                    'Tukey fence: whiskers end at the furthest value within 1.5 box heights; anything beyond is a dot. Min/Max and percentile options are also available.',
                    'Tukey sınırı: bıyıklar 1,5 kutu yüksekliği içindeki en uzak değerde biter; ötesindeki her şey bir noktadır. Min/Max ve yüzdelik seçenekleri de vardır.',
                ]),
                pt('outliers', ['Outliers', 'Aykırılar'], [
                    'Show outlier points draws the values beyond the whiskers.',
                    'Show outlier points bıyıkların ötesindeki değerleri çizer.',
                ]),
                pt('analysis', ['Analysis', 'Analiz'], [
                    'Quantile groups splits each channel into consecutive parts, for example 4 to compare the four quarters of a test. Mean reference lines adds the mean next to the median.',
                    'Quantile groups her kanalı ardışık parçalara böler; örneğin bir testin dört çeyreğini karşılaştırmak için 4. Mean reference lines medyanın yanına ortalamayı ekler.',
                ]),
                pt('plot', ['Boxes', 'Kutular'], [
                    'ch_severe has the tallest box; ch_bearing_fault a small box with many dots far outside it; ch_skewed a box low in its range with dots only above.',
                    'ch_severe’in kutusu en yüksek; ch_bearing_fault’un küçük bir kutusu ve onun çok dışında çok sayıda noktası var; ch_skewed’in kutusu aralığının altında ve noktaları yalnızca yukarıda.',
                ]),
                pt('stats', ['Statistics', 'İstatistikler'], [
                    'Standard deviation ranges from 0.50 (healthy) to 1.50 (severe). ch_bearing_fault has only 0.65 although it reaches ±12.5: the impacts are short.',
                    'Standart sapma 0,50 (healthy) ile 1,50 (severe) arasında. ch_bearing_fault ±12,5’e ulaşmasına rağmen yalnızca 0,65: darbeler kısa.',
                ]),
            ],
        },
        {
            id: 'violin',
            tab: ['Violin and insights', 'Keman ve içgörüler'],
            summary: [
                'The same channels as violins: each shape is the density of values, mirrored around the channel’s position.',
                'Aynı kanallar keman olarak: her şekil değerlerin yoğunluğudur ve kanalın konumu etrafında aynalanmıştır.',
            ],
            points: [
                pt('view', ['Violin (density)', 'Keman (yoğunluk)'], [
                    'Wide where values are common, thin where they are rare. Two humps would show as two bulges, which a box cannot show.',
                    'Değerlerin sık olduğu yerde geniş, seyrek olduğu yerde ince. İki tümsek iki şişkinlik olarak görünürdü; bunu bir kutu gösteremez.',
                ]),
                pt('plot', ['Shapes', 'Şekiller'], [
                    'ch_skewed is wide just below zero with a thin spike upward; ch_bearing_fault is a narrow body with long thin needles: rare large values.',
                    'ch_skewed sıfırın hemen altında geniş ve yukarı doğru ince bir sivri uca sahip; ch_bearing_fault dar bir gövde ve uzun ince iğneler: seyrek büyük değerler.',
                ]),
                pt('insights', ['Insights', 'İçgörüler'], [
                    'Highest median ch_bearing_fault, lowest ch_skewed (−0.30), largest IQR ch_severe (2.03). 16,002 values (1.6 %) lie outside the whiskers.',
                    'En yüksek medyan ch_bearing_fault, en düşük ch_skewed (−0,30), en büyük IQR ch_severe (2,03). 16.002 değer (%1,6) bıyıkların dışında.',
                ]),
            ],
        },
        {
            id: 'channels',
            tab: ['Channels', 'Channels (kanallar)'],
            summary: [
                'Choosing which channels get a box.',
                'Hangi kanalların kutu alacağını seçmek.',
            ],
            points: [
                pt('channels', ['Channels', 'Kanallar'], [
                    'Tick the channels and press Apply Selected. Keep to one unit per plot so the boxes share a meaningful axis.',
                    'Kanalları işaretleyin ve Apply Selected’a basın. Kutuların anlamlı bir ekseni paylaşması için grafik başına tek birim kullanın.',
                ]),
            ],
        },
    ],

    bar_plot: [
        {
            id: 'settings',
            tab: ['Settings and categories', 'Settings ve kategoriler'],
            summary: [
                'RMS of six vibration sensors from Channel Statistics, sorted from largest to smallest, with a 0.5 alarm level drawn across.',
                'Channel Statistics’ten altı titreşim sensörünün RMS’i; büyükten küçüğe sıralanmış ve üzerine 0,5’lik bir alarm seviyesi çizilmiş.',
            ],
            points: [
                pt('sort', ['Sort & Filter', 'Sıralama ve filtre'], [
                    'Descending puts the strongest sensor first. Top-N by magnitude keeps only the largest N categories, useful with many channels.',
                    'Descending en güçlü sensörü başa koyar. Top-N by magnitude yalnızca en büyük N kategoriyi tutar; çok sayıda kanalla kullanışlıdır.',
                ]),
                pt('orientation', ['Orientation', 'Yön'], [
                    'Vertical or horizontal bars. Horizontal leaves room for long channel names.',
                    'Dikey veya yatay çubuklar. Yatay, uzun kanal adlarına yer bırakır.',
                ]),
                pt('display', ['Display', 'Görüntü'], [
                    'Stacked puts several series on top of each other. Use it only for quantities that add up to a total.',
                    'Stacked birden çok seriyi üst üste koyar. Yalnızca bir toplam oluşturan büyüklükler için kullanın.',
                ]),
                pt('labels', ['Value Labels', 'Değer etiketleri'], [
                    'Writes the exact value at the end of every bar.',
                    'Her çubuğun ucuna kesin değeri yazar.',
                ]),
                pt('reference', ['Reference Line', 'Referans çizgisi'], [
                    'Show target line at 0.5. Use a limit in the same metric and unit as the bars, here an RMS level.',
                    'Show target line 0,5’te. Çubuklarla aynı metrik ve birimde bir sınır kullanın; burada bir RMS seviyesi.',
                ]),
                pt('width', ['Bar Width', 'Çubuk genişliği'], [
                    'Thickness of the bars as a share of the space per category.',
                    'Kategori başına alanın payı olarak çubukların kalınlığı.',
                ]),
                pt('plot', ['Bars', 'Çubuklar'], [
                    'gearbox_input 0.90 and gearbox_output 0.60 are above the line; motor bearings 0.37 and 0.22, structure 0.18 and fan 0.08 are below. The information line at the top states the metric (rms) and the rows used.',
                    'gearbox_input 0,90 ve gearbox_output 0,60 çizginin üstünde; motor yatakları 0,37 ve 0,22, yapı 0,18 ve fan 0,08 altında. Üstteki bilgi satırı metriği (rms) ve kullanılan satırları belirtir.',
                ]),
                pt('channels', ['Categories', 'Kategoriler'], [
                    'Untick a category to hide its bar; Show Selected keeps only the selected ones.',
                    'Çubuğunu gizlemek için bir kategorinin işaretini kaldırın; Show Selected yalnızca seçilenleri tutar.',
                ]),
            ],
        },
    ],
}
