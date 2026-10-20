// Interface tours: Rotor Dynamics and Rotor Balancing. Every string pair is
// [en, tr]. Hotspot positions come from tourAnchors.js.

const pt = (id, title, desc) => ({ id, title, desc })

export default {
    rotor_dynamics: [
        {
            id: 'orbit',
            tab: ['Setup + Orbit', 'Kurulum + Yörünge'],
            summary: [
                'X/Y proximity probes on a rotor passing its 1500 RPM critical speed. A 2 s window at the critical shows the 1×-filtered orbit with synthesized revolution marks.',
                '1500 RPM kritik hızından geçen bir rotorda X/Y yakınlık probları. Kritik hızdaki 2 s’lik pencere, sentezlenmiş devir işaretleriyle 1× filtreli yörüngeyi gösterir.',
            ],
            points: [
                pt('measurement', ['Measurement frame', 'Ölçüm çerçevesi'], [
                    'Sample Rate is read from the MPAI file. X and Y Probe Angle give each probe’s sensitivity direction, Rotation sets the forward/backward sign convention and Units the displayed displacement scale. Orbit Order selects which multiple of running speed is filtered; Runout Compensation removes the mean probe offset to centre the orbit.',
                    'Örnekleme hızı MPAI dosyasından okunur. X ve Y Probe Angle her probun hassasiyet yönünü, Rotation ileri/geri işaret kabulünü, Units gösterilen yer değiştirme ölçeğini verir. Orbit Order hangi hız katının filtreleneceğini seçer; Runout Compensation ortalama prob ofsetini çıkararak yörüngeyi merkezler.',
                ]),
                pt('orbit_group', ['Orbit filter and revolution marks', 'Yörünge filtresi ve devir işaretleri'], [
                    'Direct shows the unfiltered shaft path; nX Filtered isolates the Orbit Order with a band whose half-width is a percentage of that line. Show Revolution Marks places once-per-revolution dots integrated from the measured RPM — consistent within the result, but not a physical keyphasor phase.',
                    'Direct filtrelenmemiş mil yolunu gösterir; nX Filtered, yarı genişliği o çizginin yüzdesi olan bir bantla Orbit Order bileşenini ayırır. Show Revolution Marks ölçülen RPM’den entegre edilen devir başına noktalar koyar — sonuç içinde tutarlıdır ama fiziksel keyphasor fazı değildir.',
                ]),
                pt('navigator', ['Evidence window', 'Kanıt penceresi'], [
                    'The navigator strip shows the whole run-up; the cursors bound the samples sent to Compute. A short window around one speed gives a clean orbit, the whole run-up is needed for Bode, Polar and the waterfall.',
                    'Navigatör şeridi tüm kalkışı gösterir; imleçler Compute’a gönderilen örnekleri sınırlar. Tek hız etrafındaki kısa pencere temiz yörünge verir; Bode, Polar ve şelale için tüm kalkış gerekir.',
                ]),
                pt('orbit', ['Orbit plot', 'Yörünge grafiği'], [
                    'The shaft centre path in the X–Y plane. The status line reports the ellipse fit (major and minor axes, angle, eccentricity) and Smax. A flattened, tilted ellipse points to direction-dependent stiffness; loops or inner lobes point to harmonics.',
                    'Mil merkezinin X–Y düzlemindeki yolu. Durum satırı elips uyumunu (büyük ve küçük eksen, açı, eksantriklik) ve Smax’ı raporlar. Basık ve eğik elips yöne bağlı rijitliğe; ilmekler veya iç loblar harmoniklere işaret eder.',
                ]),
                pt('channels', ['Signal roles', 'Sinyal rolleri'], [
                    'Assign one X signal, one Y signal and one measured RPM signal. They must describe the same event on a compatible time base; Auto-detect is a starting point, not proof the roles are physically right.',
                    'Bir X, bir Y ve bir ölçülmüş RPM sinyali atayın. Aynı olayı uyumlu zaman tabanında tarif etmelidirler; Auto-detect bir başlangıçtır, rollerin fiziksel olarak doğru olduğunun kanıtı değildir.',
                ]),
                pt('compute', ['Compute the selected range', 'Seçili aralığı hesaplayın'], [
                    'Compute processes exactly the selected samples in the bounded-memory C++ pipeline. Moving the range marks the result stale until you compute again.',
                    'Compute, seçili örneklerin tamamını bellek bütçeli C++ hattında işler. Aralığı taşımak, yeniden hesaplanana kadar sonucu eski olarak işaretler.',
                ]),
            ],
        },
        {
            id: 'bode',
            tab: ['Response + Bode', 'Cevap + Bode'],
            summary: [
                'The full run-up: 1× amplitude rises to a peak at the critical speed while the phase turns through about 180°.',
                'Tüm kalkış: kritik hızda 1× genlik tepe yaparken faz yaklaşık 180° döner.',
            ],
            points: [
                pt('bode_polar', ['Slow roll and speed segment', 'Slow roll ve hız bölümü'], [
                    'A non-zero Slow-roll Speed subtracts the low-speed 1× vector (mechanical and electrical runout) from the response; Show Compensated Trace overlays the corrected curve. Speed Segment keeps all data or only the run-up or coast-down, exposing hysteresis between them.',
                    'Sıfırdan büyük Slow-roll Speed düşük hızdaki 1× vektörü (mekanik ve elektriksel runout) cevaptan çıkarır; Show Compensated Trace düzeltilmiş eğriyi üst üste çizer. Speed Segment tüm veriyi veya yalnız kalkış ya da duruşu tutar; aradaki histerezisi gösterir.',
                ]),
                pt('limits', ['Diagnostics and acceptance limits', 'Tanı ve kabul limitleri'], [
                    'Bearing Clearance enables gap and attitude diagnostics. For acceptance, first choose the measured metric (Smax, direct maximum or a diagnostic 1×), then the profile and machine class with alarm and danger limits. ISO limits are machine-specific and must be entered for the actual machine.',
                    'Bearing Clearance aralık ve tutum tanılarını açar. Kabul için önce ölçülen metriği (Smax, direct maksimum veya tanısal 1×), ardından profil ve makine sınıfını alarm ve tehlike limitleriyle seçin. ISO limitleri makineye özgüdür ve gerçek makine için girilmelidir.',
                ]),
                pt('amplitude', ['1× amplitude vs RPM', 'RPM’ye karşı 1× genlik'], [
                    'X and Y 1× peak amplitude against measured speed. The status line estimates the critical speed (about 1500 RPM), the amplification factor Q and damping from the peak.',
                    'Ölçülen hıza karşı X ve Y 1× tepe genliği. Durum satırı tepeden kritik hızı (yaklaşık 1500 RPM), büyütme faktörü Q’yu ve sönümü tahmin eder.',
                ]),
                pt('phase', ['1× phase vs RPM', 'RPM’ye karşı 1× faz'], [
                    'Phase lag grows by about 180° through the critical speed. Phase here is referenced to the selection start from the integrated RPM, not to a hardware keyphasor.',
                    'Faz gecikmesi kritik hız boyunca yaklaşık 180° artar. Buradaki faz, donanım keyphasor’ına değil, entegre edilen RPM ile seçim başlangıcına göredir.',
                ]),
                pt('navigator', ['Whole run-up selected', 'Tüm kalkış seçili'], [
                    'Speed-domain views need the whole speed sweep inside the navigator range.',
                    'Hız alanı görünümleri tüm hız taramasının navigatör aralığında olmasını ister.',
                ]),
                pt('channels', ['X, Y and RPM', 'X, Y ve RPM'], [
                    'The same three roles feed every result view.',
                    'Aynı üç rol tüm sonuç görünümlerini besler.',
                ]),
            ],
        },
        {
            id: 'polar',
            tab: ['Polar diagram', 'Polar diyagram'],
            summary: [
                'The same 1× evidence as a vector path: each point is amplitude and phase at one speed.',
                'Aynı 1× kanıtı vektör yolu olarak: her nokta bir hızdaki genlik ve fazdır.',
            ],
            points: [
                pt('polar', ['Polar loop', 'Polar ilmek'], [
                    'A resonance traces a circle-like loop; its diameter relates to the amplification and its direction to the rotation convention. Comparing loops between runs shows changes in balance state or stiffness.',
                    'Rezonans daireye benzer bir ilmek çizer; çapı büyütmeyle, yönü dönme kabulüyle ilgilidir. Koşular arasında ilmekleri karşılaştırmak balans durumu veya rijitlikteki değişimi gösterir.',
                ]),
                pt('slow_roll', ['Slow-roll compensation', 'Slow-roll düzeltmesi'], [
                    'Without compensation the loop starts away from the origin by the runout vector; slow-roll subtraction moves its start to the origin.',
                    'Düzeltme olmadan ilmek runout vektörü kadar orijinden uzakta başlar; slow-roll çıkarımı başlangıcı orijine taşır.',
                ]),
            ],
        },
        {
            id: 'centerline',
            tab: ['Shaft centerline', 'Mil merkez çizgisi'],
            summary: [
                'The average (DC) shaft position per revolution as speed rises: the journal lifts and moves sideways in its bearing.',
                'Hız arttıkça devir başına ortalama (DC) mil konumu: muylu yatak içinde yükselir ve yana kayar.',
            ],
            points: [
                pt('centerline', ['DC position path', 'DC konum yolu'], [
                    'Each point is the mean X/Y gap over one revolution. A smooth curve rising with speed is typical for an oil-film bearing; jumps or reversals deserve investigation.',
                    'Her nokta bir devir üzerinden ortalama X/Y aralığıdır. Hızla yükselen düzgün eğri yağ filmli yatak için tipiktir; sıçramalar veya geri dönüşler incelenmelidir.',
                ]),
                pt('clearance', ['Bearing clearance', 'Yatak boşluğu'], [
                    'With a diametral clearance entered, the plot can be related to the available clearance and the attitude angle is reported in Diagnostics.',
                    'Çap boşluğu girildiğinde grafik mevcut boşlukla ilişkilendirilir ve tutum açısı Diagnostics’te raporlanır.',
                ]),
            ],
        },
        {
            id: 'spectrum',
            tab: ['Full spectrum', 'Tam spektrum'],
            summary: [
                'A two-sided spectrum from both probes: positive frequencies are forward precession, negative are backward.',
                'İki probdan iki taraflı spektrum: pozitif frekanslar ileri, negatif frekanslar geri presesyondur.',
            ],
            points: [
                pt('spectrum_group', ['Spectrum / waterfall settings', 'Spektrum / şelale ayarları'], [
                    'Welch Averaging combines overlapping segments; Segment sets samples per block (bin spacing ≈ fs / N) and Overlap the reuse between blocks. Compute Whirl Waterfall adds the heavier map; Waterfall Max limits its frequency band (0 = Nyquist).',
                    'Welch Averaging örtüşen segmentleri birleştirir; Segment blok başına örnek sayısını (çizgi aralığı ≈ fs / N), Overlap bloklar arası tekrar kullanımı belirler. Compute Whirl Waterfall daha ağır haritayı ekler; Waterfall Max frekans bandını sınırlar (0 = Nyquist).',
                ]),
                pt('full_spectrum', ['Forward vs backward', 'İleri ve geri'], [
                    'The dominant component is forward 1× (positive side); the smaller backward line indicates orbit ellipticity. For a variable-speed selection the lines smear across the speed range, which is why the waterfall exists.',
                    'Baskın bileşen ileri 1×’tir (pozitif taraf); küçük geri çizgi yörünge eliptikliğini gösterir. Değişken hızlı seçimde çizgiler hız aralığına yayılır; şelalenin varlık nedeni budur.',
                ]),
            ],
        },
        {
            id: 'waterfall',
            tab: ['Whirl waterfall', 'Whirl şelalesi'],
            summary: [
                'Directional full spectrum against measured RPM: forward and backward 1× lines fan out with speed and peak at the critical.',
                'Ölçülen RPM’ye karşı yönlü tam spektrum: ileri ve geri 1× çizgileri hızla açılır ve kritikte tepe yapar.',
            ],
            points: [
                pt('waterfall_toggle', ['Enable the waterfall', 'Şelaleyi açın'], [
                    '“Compute Whirl Waterfall” must be on at Compute time; Waterfall Max keeps only the band you need.',
                    '“Compute Whirl Waterfall” Compute sırasında açık olmalıdır; Waterfall Max yalnızca gereken bandı tutar.',
                ]),
                pt('waterfall', ['Frequency vs RPM map', 'RPM’ye karşı frekans haritası'], [
                    'Lines through zero that move with speed are orders; their colour peaks at the critical speed. A sub-synchronous line that stays at a fixed frequency would indicate instability or rub and needs immediate attention.',
                    'Hızla kayan ve sıfırdan geçen çizgiler order’lardır; renkleri kritik hızda tepe yapar. Sabit frekansta kalan alt-senkron bir çizgi kararsızlık veya sürtünmeye işaret eder ve hemen incelenmelidir.',
                ]),
            ],
        },
        {
            id: 'diagnostics',
            tab: ['Diagnostics', 'Tanı'],
            summary: [
                'Plain-language checks that state what could and could not be concluded from this selection.',
                'Bu seçimden neyin çıkarılıp neyin çıkarılamayacağını sade dille belirten kontroller.',
            ],
            points: [
                pt('diagnostics', ['Diagnostic statements', 'Tanı ifadeleri'], [
                    'Whirl classification, gap / attitude angle and acceptance status, each with the reason when it is unavailable — for example whirl needs a constant-speed selection and acceptance needs declared source units.',
                    'Whirl sınıflandırması, aralık / tutum açısı ve kabul durumu; kullanılamadığında nedeniyle birlikte — örneğin whirl sabit hızlı seçim, kabul ise tanımlı kaynak birimleri ister.',
                ]),
            ],
        },
        {
            id: 'markers',
            tab: ['Markers', 'İşaretçiler'],
            summary: [
                'Domain-aware markers: XY points on the orbit and polar views, RPM on Bode, signed frequency on spectra.',
                'Alana duyarlı işaretçiler: yörünge ve polar görünümlerde XY noktaları, Bode’da RPM, spektrumlarda işaretli frekans.',
            ],
            points: [
                pt('interaction', ['Plot interaction', 'Grafik etkileşimi'], [
                    'Clicking a result adds a marker for that view; Snap moves it to the nearest result point.',
                    'Bir sonuca tıklamak o görünüm için işaretçi ekler; Snap onu en yakın sonuç noktasına taşır.',
                ]),
                pt('orbit_markers', ['Orbit XY markers', 'Yörünge XY işaretçileri'], [
                    'Type an X/Y displacement to place a point marker; it snaps to the nearest displayed orbit sample.',
                    'Nokta işaretçisi için bir X/Y yer değiştirmesi yazın; en yakın gösterilen yörünge örneğine yakalanır.',
                ]),
                pt('table', ['Marker table', 'İşaretçi tablosu'], [
                    'Lists markers with their values; rename, remove, clear or export as CSV. Markers measure and never recompute.',
                    'İşaretçileri değerleriyle listeler; yeniden adlandırın, silin, temizleyin veya CSV olarak aktarın. İşaretçiler ölçer, asla yeniden hesaplamaz.',
                ]),
            ],
        },
    ],

    rotor_balancing: [
        {
            id: 'capture',
            tab: ['Capture + Measurements', 'Yakalama + Ölçümler'],
            summary: [
                'A reference run and a trial run with 10 g at 0°, both at 3000 RPM and phase-locked to a once-per-revolution keyphasor.',
                'Referans koşu ve 0°’de 10 g deneme ağırlıklı koşu; ikisi de 3000 RPM’de ve devirde-bir keyphasor’a faz kilitli.',
            ],
            points: [
                pt('run_capture', ['Run capture workflow', 'Koşu yakalama akışı'], [
                    '1. Capture Reference without the trial weight. 2. Install the configured trial weight. 3. Capture Trial, then calculate the correction. 4. Apply it and Capture Verification. Moving the navigator changes only the next capture window; Trial Weight says whether the trial mass is removed or left on.',
                    '1. Deneme ağırlığı olmadan Capture Reference. 2. Tanımlanan deneme ağırlığını takın. 3. Capture Trial, ardından düzeltmeyi hesaplayın. 4. Uygulayıp Capture Verification yapın. Navigatörü taşımak yalnız sonraki yakalama penceresini değiştirir; Trial Weight deneme kütlesinin sökülüp sökülmeyeceğini belirtir.',
                ]),
                pt('tacho', ['Keyphasor decoding', 'Keyphasor çözümü'], [
                    'Pulses / Rev is locked to 1 for balancing; trigger level, edge, hysteresis and the repair options define how each revolution edge is found. Correction phase comes from these physical edges, never from a typed RPM.',
                    'Balanslamada Pulses / Rev 1’e kilitlidir; tetik seviyesi, kenar, histerezis ve onarım seçenekleri her devir kenarının nasıl bulunacağını belirler. Düzeltme fazı bu fiziksel kenarlardan gelir, asla yazılmış RPM’den gelmez.',
                ]),
                pt('quality', ['Quality limits', 'Kalite limitleri'], [
                    'Each run is checked for speed span, speed difference between runs, 1× amplitude variation, phase deviation and the minimum trial effect. A run that fails is flagged instead of silently used.',
                    'Her koşu hız yayılımı, koşular arası hız farkı, 1× genlik değişimi, faz sapması ve asgari deneme etkisi için kontrol edilir. Başarısız koşu sessizce kullanılmaz, işaretlenir.',
                ]),
                pt('runs', ['Measurement table', 'Ölçüm tablosu'], [
                    'Every captured run with its 1× vector (2.000 mm/s @ 30.0° reference, 3.179 mm/s @ 51.2° trial), mean RPM, speed span, amplitude CV, phase deviation, signals, tacho settings and source rows — the audit trail behind the correction.',
                    'Yakalanan her koşu 1× vektörüyle (referans 2,000 mm/s @ 30,0°, deneme 3,179 mm/s @ 51,2°), ortalama RPM, hız yayılımı, genlik CV, faz sapması, sinyaller, tacho ayarları ve kaynak satırlarıyla — düzeltmenin denetim izi.',
                ]),
                pt('navigator', ['Capture window', 'Yakalama penceresi'], [
                    'The highlighted window is the steady-speed span used for the next capture; the navigator starts with a 10 s window.',
                    'Vurgulu pencere, sonraki yakalama için kullanılan sabit hızlı aralıktır; navigatör 10 s’lik pencereyle başlar.',
                ]),
                pt('channels', ['Vibration and keyphasor', 'Titreşim ve keyphasor'], [
                    'Vibration Signal is the measured channel for the run being captured; Keyphasor / Tacho Signal is the raw once-per-revolution waveform, not a computed RPM channel.',
                    'Vibration Signal yakalanan koşunun ölçüm kanalıdır; Keyphasor / Tacho Signal hesaplanmış RPM değil, ham devirde-bir dalga şeklidir.',
                ]),
            ],
        },
        {
            id: 'setup',
            tab: ['Setup + Polar correction', 'Kurulum + Polar düzeltme'],
            summary: [
                'Single-plane influence-coefficient correction: 13.33 g at 130° on a 100 mm radius.',
                'Tek düzlem etki katsayısı düzeltmesi: 100 mm yarıçapta 130°’de 13,33 g.',
            ],
            points: [
                pt('input', ['Input and selected 1×', 'Giriş ve seçili 1×'], [
                    'Sample rate, navigator and channel, with a live “Selected 1×” readout of the current window (amplitude, phase, RPM and revolutions) so you can check stability before capturing.',
                    'Örnekleme hızı, navigatör ve kanal; ayrıca yakalamadan önce kararlılığı kontrol edebilmeniz için mevcut pencerenin canlı “Selected 1×” okuması (genlik, faz, RPM ve devir sayısı).',
                ]),
                pt('balance_setup', ['Trial and correction geometry', 'Deneme ve düzeltme geometrisi'], [
                    'Trial mass, trial radius and angle, correction radius, rotation direction, the viewing side and the unbalance unit. Keep one angular datum for all runs; Fixed Locations splits the correction onto a fixed number of holes or blades.',
                    'Deneme kütlesi, deneme yarıçapı ve açısı, düzeltme yarıçapı, dönme yönü, bakış tarafı ve dengesizlik birimi. Tüm koşularda tek açı referansı kullanın; Fixed Locations düzeltmeyi sabit sayıda delik veya kanada böler.',
                ]),
                pt('polar', ['Correction polar diagram', 'Düzeltme polar diyagramı'], [
                    'The correction mass vector on the rotor with angle labels, and the report below: correction mass and angle, unbalance in g·mm, measured trial effect and the angle convention. The trial changed the 1× vector by 75 %, comfortably above a usable minimum.',
                    'Rotor üzerindeki düzeltme kütle vektörü açı etiketleriyle ve altında rapor: düzeltme kütlesi ve açısı, g·mm cinsinden dengesizlik, ölçülen deneme etkisi ve açı kabulü. Deneme 1× vektörünü %75 değiştirdi; kullanılabilir asgari değerin rahatça üstünde.',
                ]),
                pt('correction', ['Calculate Correction', 'Calculate Correction'], [
                    'Enabled once a reference and a trial run exist. The result is a prediction; only a measured verification run proves the improvement.',
                    'Referans ve deneme koşusu olduğunda etkinleşir. Sonuç bir öngörüdür; iyileşmeyi yalnızca ölçülmüş bir doğrulama koşusu kanıtlar.',
                ]),
                pt('channels', ['Signal roles', 'Sinyal rolleri'], [
                    'Here the reference and trial runs are stored in two channels, so the vibration role is switched between captures; in a real test both runs usually come from the same sensor at different times.',
                    'Burada referans ve deneme koşuları iki ayrı kanalda olduğundan titreşim rolü yakalamalar arasında değiştirilir; gerçek testte iki koşu genellikle aynı sensörden farklı zamanlarda gelir.',
                ]),
            ],
        },
    ],
}
