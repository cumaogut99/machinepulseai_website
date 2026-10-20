// Interface tour: Kinematic Chain (6-DOF). Every string pair is [en, tr].
// Hotspot positions come from tourAnchors.js.

const pt = (id, title, desc) => ({ id, title, desc })

export default {
    kinematics_6dof: [
        {
            id: 'setup',
            tab: ['Setup + Acceleration', 'Kurulum + İvme'],
            summary: [
                'A triaxial accelerometer analysed over a 10 s window: the processed X/Y/Z acceleration before integration.',
                'Üç eksenli ivmeölçer 10 s’lik pencerede analiz edilir: integral öncesi işlenmiş X/Y/Z ivme.',
            ],
            points: [
                pt('mode', ['Input mode', 'Giriş modu'], [
                    'Single triaxial (X/Y/Z) integrates one sensor. Accelerometer array (rigid body) solves translation and rotation from several sensors with known positions and directions. IMU (3 accel + 3 gyro) adds angular rates. Each mode needs enough independent channels for what it claims.',
                    'Single triaxial (X/Y/Z) tek sensörün integralini alır. Accelerometer array (rigid body) konum ve yönleri bilinen birden çok sensörden öteleme ve dönmeyi çözer. IMU (3 accel + 3 gyro) açısal hızları ekler. Her mod iddia ettiği sonuç için yeterli bağımsız kanal ister.',
                ]),
                pt('acquisition', ['Acquisition', 'Veri alma'], [
                    'Sample rate from the MPAI file, the navigator mode and the trace drawn in the navigator.',
                    'MPAI dosyasından örnekleme hızı, navigatör modu ve navigatörde çizilen iz.',
                ]),
                pt('navigator', ['Analysis window', 'Analiz penceresi'], [
                    'Integration drift grows with time, so analyse the span you need — here 2–12 s — rather than the whole record.',
                    'İntegral sürüklenmesi zamanla büyür; tüm kaydı değil, gereken aralığı analiz edin — burada 2–12 s.',
                ]),
                pt('acceleration', ['Processed acceleration', 'İşlenmiş ivme'], [
                    'X, Y and Z acceleration after DC removal and drift filtering — the input that velocity and displacement are derived from.',
                    'DC çıkarımı ve sürüklenme filtresinden sonra X, Y ve Z ivme — hız ve yer değiştirmenin türetildiği girdi.',
                ]),
                pt('channels', ['Axis assignment', 'Eksen ataması'], [
                    'X, Y and Z Axis map channels to the sensor frame; a Gyro X/Y/Z group appears in IMU mode. Sign and orientation errors propagate into every derived quantity.',
                    'X, Y ve Z Axis kanalları sensör eksenine eşler; IMU modunda Gyro X/Y/Z grubu görünür. İşaret ve yön hataları türetilen her büyüklüğe yayılır.',
                ]),
            ],
        },
        {
            id: 'integration',
            tab: ['Integration + Displacement', 'İntegral + Yer değiştirme'],
            summary: [
                'Double integration to displacement with high-pass drift compensation.',
                'Yüksek geçiren sürüklenme düzeltmesiyle yer değiştirmeye çift integral.',
            ],
            points: [
                pt('integration', ['Integration domain', 'İntegral alanı'], [
                    'Time domain (trapezoid) integrates sample by sample; Frequency domain divides the spectrum by jω. Remove DC subtracts the mean first; Remove gyro mean does the same for angular rates.',
                    'Time domain (trapezoid) örnek örnek integral alır; Frequency domain spektrumu jω’ya böler. Remove DC önce ortalamayı çıkarır; Remove gyro mean açısal hızlar için aynısını yapar.',
                ]),
                pt('drift', ['Drift compensation', 'Sürüklenme düzeltmesi'], [
                    'A high-pass filter (cutoff and order) or a Kalman smoother removes the slow drift that sensor bias produces after integration. It also removes genuine motion below the cutoff, so choose it from the physics of the test.',
                    'Yüksek geçiren filtre (kesim ve derece) veya Kalman smoother, sensör sapmasının integralden sonra ürettiği yavaş sürüklenmeyi kaldırır. Kesimin altındaki gerçek hareketi de kaldırır; testin fiziğine göre seçin.',
                ]),
                pt('outputs', ['Output quantities', 'Çıkış büyüklükleri'], [
                    'Choose which of acceleration, velocity and displacement are produced; each becomes a result tab and an output port.',
                    'İvme, hız ve yer değiştirmeden hangilerinin üretileceğini seçin; her biri bir sonuç sekmesi ve çıkış portu olur.',
                ]),
                pt('displacement', ['Displacement result', 'Yer değiştirme sonucu'], [
                    'Displacement in metres for each axis. A curve that keeps wandering away from zero indicates residual drift; a centred oscillation indicates the compensation suits the record.',
                    'Her eksen için metre cinsinden yer değiştirme. Sıfırdan sürekli uzaklaşan eğri kalan sürüklenmeye, ortalanmış salınım ise düzeltmenin kayda uygun olduğuna işaret eder.',
                ]),
            ],
        },
        {
            id: 'trend',
            tab: ['RMS trend + Metrics', 'RMS trendi + Metrikler'],
            summary: [
                'Windowed RMS trend and the summary metrics panel.',
                'Pencereli RMS trendi ve özet metrik paneli.',
            ],
            points: [
                pt('rms_trend', ['RMS window', 'RMS penceresi'], [
                    'Window length of the running RMS. Short windows follow events, long windows show the overall level.',
                    'Kayan RMS’in pencere uzunluğu. Kısa pencere olayları izler, uzun pencere genel seviyeyi gösterir.',
                ]),
                pt('iso2631', ['ISO 2631 ride comfort', 'ISO 2631 sürüş konforu'], [
                    'Off (unweighted), Wk for vertical or Wd for horizontal frequency weighting before the RMS and VDV are formed. Weighted and unweighted values are different physical results and must not be compared directly.',
                    'RMS ve VDV oluşturulmadan önce Off (ağırlıksız), dikey için Wk veya yatay için Wd frekans ağırlığı. Ağırlıklı ve ağırlıksız değerler farklı fiziksel sonuçlardır; doğrudan karşılaştırılmamalıdır.',
                ]),
                pt('families', ['Metric families', 'Metrik aileleri'], [
                    'Enables static tilt, trajectory metrics and peak / pk-pk / crest values in the summary.',
                    'Özette statik eğim, yörünge metrikleri ve tepe / tepe-tepe / crest değerlerini açar.',
                ]),
                pt('trend', ['Trend plot', 'Trend grafiği'], [
                    'The running RMS of the selected quantity over time.',
                    'Seçilen büyüklüğün zamana göre kayan RMS’i.',
                ]),
                pt('summary', ['Summary metrics', 'Özet metrikler'], [
                    'Per-axis and total vibration values, weighted RMS and VDV when enabled, plus the orientation model used for the summary.',
                    'Eksen başına ve toplam titreşim değerleri, etkinse ağırlıklı RMS ve VDV ile özet için kullanılan yönelim modeli.',
                ]),
            ],
        },
        {
            id: 'motion',
            tab: ['3D motion', '3D hareket'],
            summary: [
                'The integrated motion replayed on a preview platform in VTK.',
                'İntegral alınmış hareket VTK’da bir önizleme platformu üzerinde oynatılır.',
            ],
            points: [
                pt('motion', ['Platform animation', 'Platform animasyonu'], [
                    'The platform moves with the computed translation (and rotation where the input mode provides it). Displacement is scaled for visibility; read amplitudes from the plots, not from the animation.',
                    'Platform hesaplanan öteleme (ve giriş modu sağlıyorsa dönme) ile hareket eder. Yer değiştirme görünürlük için ölçeklenir; genlikleri animasyondan değil grafiklerden okuyun.',
                ]),
                pt('motion_controls', ['View and playback', 'Görünüm ve oynatma'], [
                    'Fit, Iso, Front, Top and Side set the camera; Orientation, Bounds and Node IDs add overlays; the slider, auto scale and playback rate control the replay.',
                    'Fit, Iso, Front, Top ve Side kamerayı ayarlar; Orientation, Bounds ve Node IDs katman ekler; kaydırıcı, otomatik ölçek ve oynatma hızı tekrarı kontrol eder.',
                ]),
            ],
        },
        {
            id: 'markers',
            tab: ['Markers + Velocity', 'İşaretçiler + Hız'],
            summary: [
                'Time markers shared by every time-domain result, shown on the velocity tab.',
                'Tüm zaman alanı sonuçlarının paylaştığı zaman işaretçileri, hız sekmesinde.',
            ],
            points: [
                pt('interaction', ['Plot interaction', 'Grafik etkileşimi'], [
                    'Click a plot to add a marker; Snap moves it to the nearest displayed sample.',
                    'İşaretçi eklemek için grafiğe tıklayın; Snap onu en yakın gösterilen örneğe taşır.',
                ]),
                pt('time_markers', ['Marker and delta', 'İşaretçi ve fark'], [
                    'A typed time marker or a delta pair; the same instant is read on acceleration, velocity and displacement.',
                    'Yazılmış zaman işaretçisi veya fark çifti; aynı an ivme, hız ve yer değiştirmede okunur.',
                ]),
                pt('velocity', ['Velocity result', 'Hız sonucu'], [
                    'Velocity from the first integration, in m/s.',
                    'İlk integralden elde edilen hız, m/s.',
                ]),
                pt('table', ['Marker table', 'İşaretçi tablosu'], [
                    'Lists markers and values; rename, remove, clear or export as CSV.',
                    'İşaretçileri ve değerleri listeler; yeniden adlandırın, silin, temizleyin veya CSV olarak aktarın.',
                ]),
            ],
        },
    ],
}
