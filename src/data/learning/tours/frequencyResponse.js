// Interface tour: Frequency Response & Cross Spectrum.
// Every point is [en, tr]. Hotspot positions come from tourAnchors.js.

const pt = (id, title, desc) => ({ id, title, desc })

export default {
    cross_spectrum: [
        {
            id: 'settings',
            tab: ['Settings + Channels', 'Ayarlar + Kanallar'],
            summary: [
                'Transfer mode: the reference force drives the response accelerometer. H1, H2 and Hv are drawn together with phase and coherence for the same Welch segments.',
                'Transfer modu: referans kuvvet, cevap ivmeölçerini sürer. H1, H2 ve Hv; aynı Welch segmentlerinden hesaplanan faz ve koherans ile birlikte çizilir.',
            ],
            points: [
                pt('mode', ['Analysis mode sets the question', 'Analiz modu soruyu belirler'], [
                    'Transfer / Transmissibility treats the first channel as the reference (input) and returns H1, H2 and Hv gain and phase. Cross Spectrum / Coherence returns the shared spectral power Gxy and the relative phase without assuming a direction. Sample Rate is read-only metadata from the MPAI file; the Navigator button switches between a two-cursor range and one sliding window, and Channel chooses the trace drawn in the navigator.',
                    'Transfer / Transmissibility ilk kanalı referans (giriş) kabul eder ve H1, H2, Hv kazancı ile fazını verir. Cross Spectrum / Coherence yön varsaymadan ortak spektral gücü Gxy ve göreli fazı verir. Örnekleme hızı MPAI dosyasından okunur ve değiştirilemez; Navigator düğmesi iki imleçli aralık ile tek kayan pencere arasında geçiş yapar, Channel ise navigatörde çizilen izi seçer.',
                ]),
                pt('welch', ['NFFT, overlap, window and averages', 'NFFT, örtüşme, pencere ve ortalama'], [
                    'NFFT sets the line spacing Δf = fs / NFFT (8192 lines at 5 kHz gives about 0.61 Hz). Overlap sets the hop between segments, Window chooses hann, hamming or rectangular tapering, and Average Count is the number of Welch segments averaged. Coherence needs at least two segments, so the selected span must hold NFFT + (count − 1) · hop samples. The status line below the group reports the NFFT, rate and averages actually used.',
                    'NFFT çizgi aralığını Δf = fs / NFFT olarak belirler (5 kHz’de 8192 çizgi ≈ 0,61 Hz). Overlap segmentler arası kaymayı, Window hann, hamming veya dikdörtgen pencereyi seçer; Average Count ortalaması alınan Welch segmenti sayısıdır. Koherans en az iki segment ister; seçili aralık NFFT + (sayı − 1) · kayma kadar örnek içermelidir. Grubun altındaki durum satırı gerçekte kullanılan NFFT, hız ve ortalama sayısını raporlar.',
                ]),
                pt('scale', ['Magnitude scale is display-only', 'Genlik ölçeği yalnızca görünümdür'], [
                    'Magnitude (linear), (logarithmic) and (dB) repaint the cached result without recomputing. The dB axis states its reference explicitly, for example dB re 1 m/s²/N, so the value is never confused with dB SPL or dBV.',
                    'Magnitude (linear), (logarithmic) ve (dB) seçenekleri önbellekteki sonucu yeniden hesaplamadan çizer. dB ekseni referansını açıkça yazar (ör. dB re 1 m/s²/N); böylece değer dB SPL veya dBV ile karıştırılmaz.',
                ]),
                pt('navigator', ['Navigator bounds the analysed span', 'Navigatör analiz aralığını sınırlar'], [
                    'The strip shows the whole record of the navigator channel. The blue and red cursors bound the samples sent to the estimate; in single-window mode one window as long as the Welch span slides with the cursor. Keep the span inside one stationary test condition.',
                    'Şerit, navigatör kanalının tüm kaydını gösterir. Mavi ve kırmızı imleçler hesaba giren örnekleri sınırlar; tek pencere modunda Welch aralığı uzunluğundaki pencere imleçle kayar. Aralığı tek ve durağan bir test koşulu içinde tutun.',
                ]),
                pt('magnitude', ['H1, H2 and Hv magnitude', 'H1, H2 ve Hv genliği'], [
                    'H1 = Gxy / Gxx assumes noise on the response, H2 = Gyy / Gyx assumes noise on the reference and Hv balances both. Where the three curves overlap the estimate is consistent; a gap near a resonance peak is a measurement-noise clue, not a second physical result. The unit is response per reference, here accelerance (m/s²/N).',
                    'H1 = Gxy / Gxx gürültünün cevapta, H2 = Gyy / Gyx referansta olduğunu varsayar; Hv ikisini dengeler. Üç eğrinin örtüştüğü yerde tahmin tutarlıdır; rezonans tepesindeki ayrışma ikinci bir fiziksel sonuç değil, ölçüm gürültüsü işaretidir. Birim, referans başına cevaptır; burada ivme/kuvvet (m/s²/N).',
                ]),
                pt('phase', ['Transfer phase', 'Transfer fazı'], [
                    'Phase of each estimator in degrees. A lightly damped mode rotates the phase quickly across its peak, which is how the 120 Hz and 360 Hz resonances are confirmed here. Read phase only where coherence is high.',
                    'Her tahmincinin fazı (derece). Az sönümlü bir mod, tepesi boyunca fazı hızla döndürür; buradaki 120 Hz ve 360 Hz rezonansları bu şekilde doğrulanır. Fazı yalnızca koheransın yüksek olduğu yerlerde okuyun.',
                ]),
                pt('coherence', ['Coherence γ² grades each frequency', 'Koherans γ² her frekansı derecelendirir'], [
                    'γ² runs from 0 to 1 and measures how much of the response is linearly explained by the reference at that frequency. Values near 1 support the FRF; dips mark weak excitation, noise, leakage or nonlinearity. High coherence does not prove calibration is correct.',
                    'γ², 0 ile 1 arasında değişir ve o frekansta cevabın ne kadarının referans ile doğrusal açıklandığını ölçer. 1’e yakın değerler FRF’yi destekler; çukurlar zayıf uyarım, gürültü, kaçak veya doğrusal olmayan davranışa işaret eder. Yüksek koherans kalibrasyonun doğru olduğunu kanıtlamaz.',
                ]),
                pt('channels', ['Reference and response assignment', 'Referans ve cevap ataması'], [
                    'Reference / Input and Response / Output pick the two channels; Auto-detect fills them from channel names. The order defines the direction of the transfer, so swapping them inverts the FRF.',
                    'Reference / Input ve Response / Output iki kanalı seçer; Auto-detect kanal adlarından doldurur. Sıralama aktarımın yönünü tanımlar; kanalları yer değiştirmek FRF’yi tersine çevirir.',
                ]),
                pt('compute', ['Compute runs the estimate', 'Compute tahmini çalıştırır'], [
                    'Compute sends the selected span and settings to the C++ spectral engine in the background. The result stays in the session; it is written into the MPAI file only if you select it in the central Save prompt.',
                    'Compute, seçili aralığı ve ayarları arka planda C++ spektral motoruna gönderir. Sonuç oturumda kalır; MPAI dosyasına yalnızca merkezi Kaydet penceresinde seçerseniz yazılır.',
                ]),
            ],
        },
        {
            id: 'markers',
            tab: ['Markers', 'İşaretçiler'],
            summary: [
                'Two frequency markers at the designed resonances. Each marker is read on magnitude, phase and coherence at once.',
                'Tasarlanan rezonanslarda iki frekans işaretçisi. Her işaretçi genlik, faz ve koherans üzerinde aynı anda okunur.',
            ],
            points: [
                pt('interaction', ['Plot interaction and snapping', 'Grafik etkileşimi ve yakalama'], [
                    'With “Click plot to add markers” enabled, a click on any graph places a marker. Snap “Nearest frequency bin” moves it onto a computed spectral line so the readout is a real estimate, not an interpolated point.',
                    '“Click plot to add markers” açıkken herhangi bir grafiğe tıklamak işaretçi ekler. “Nearest frequency bin” yakalaması işaretçiyi hesaplanmış bir spektral çizgiye taşır; okunan değer ara değer değil gerçek tahmindir.',
                ]),
                pt('frequency_markers', ['Typed markers and deltas', 'Yazılarak eklenen işaretçi ve farklar'], [
                    'Marker + places one marker at a typed frequency. Delta + places a pair and reports the difference between its legs, useful for sideband spacing or the half-power bandwidth of a peak.',
                    'Marker + yazılan frekansa tek işaretçi koyar. Delta + bir çift yerleştirir ve iki ucu arasındaki farkı verir; yan bant aralığı veya bir tepenin yarı güç bant genişliği için kullanışlıdır.',
                ]),
                pt('lines', ['One marker, three readouts', 'Tek işaretçi, üç okuma'], [
                    'The marker is shared by magnitude, phase and coherence. M1 at 120.24 Hz shows the Hv peak, a phase near the zero crossing and coherence 0.987 — three consistent pieces of evidence for the same mode.',
                    'İşaretçi genlik, faz ve koherans arasında paylaşılır. 120,24 Hz’deki M1; Hv tepesini, sıfır geçişe yakın fazı ve 0,987 koheransı gösterir — aynı mod için üç tutarlı kanıt.',
                ]),
                pt('table', ['Marker table', 'İşaretçi tablosu'], [
                    'The right panel lists every marker with its position and values. “Only the active graph” filters the columns; Rename, Remove, Clear and Export CSV manage the list without touching the computed result.',
                    'Sağ panel her işaretçiyi konumu ve değerleriyle listeler. “Only the active graph” sütunları süzer; Rename, Remove, Clear ve Export CSV hesaplanmış sonuca dokunmadan listeyi yönetir.',
                ]),
            ],
        },
        {
            id: 'csd',
            tab: ['Cross Spectrum / Coherence', 'Çapraz Spektrum / Koherans'],
            summary: [
                'The same channels in Cross Spectrum mode: no input/output direction, only what the two signals share.',
                'Aynı kanallar Cross Spectrum modunda: giriş/çıkış yönü yok, yalnızca iki sinyalin ortak içeriği.',
            ],
            points: [
                pt('mode', ['Switch to Cross Spectrum / Coherence', 'Cross Spectrum / Coherence moduna geçin'], [
                    'Choose this mode when neither channel is a true input, for example two response sensors on the same structure. Compute again after changing the mode: unlike the magnitude scale, the mode changes the calculation.',
                    'Kanallardan hiçbiri gerçek giriş değilse bu modu seçin; örneğin aynı yapıdaki iki cevap sensörü. Modu değiştirdikten sonra yeniden Compute yapın: genlik ölçeğinin aksine mod hesabı değiştirir.',
                ]),
                pt('gxy', ['|Gxy| cross-spectral density', '|Gxy| çapraz spektral yoğunluk'], [
                    'The magnitude of the averaged cross-spectrum, shown per hertz. Peaks mark frequencies where both channels carry correlated energy. It is not a gain: its unit is the product of both channel units per hertz.',
                    'Ortalaması alınmış çapraz spektrumun hertz başına genliği. Tepeler, iki kanalın da ilişkili enerji taşıdığı frekansları gösterir. Bu bir kazanç değildir; birimi iki kanal biriminin çarpımının hertz’e oranıdır.',
                ]),
                pt('relative_phase', ['Relative phase ∠Gxy', 'Göreli faz ∠Gxy'], [
                    'The phase of Gxy tells which channel leads at each frequency. A straight phase slope across the band indicates a pure time delay between the channels.',
                    'Gxy fazı her frekansta hangi kanalın önde olduğunu söyler. Bant boyunca doğrusal bir faz eğimi, kanallar arasında saf bir zaman gecikmesine işaret eder.',
                ]),
                pt('coherence', ['Coherence stays the quality gate', 'Koherans kalite kapısı olmaya devam eder'], [
                    'Coherence is identical in both modes because it is built from the same auto- and cross-spectra. Use it to decide which parts of |Gxy| and ∠Gxy are worth interpreting.',
                    'Koherans iki modda da aynıdır, çünkü aynı oto ve çapraz spektrumlardan hesaplanır. |Gxy| ve ∠Gxy’nin hangi bölümlerinin yorumlanmaya değer olduğuna karar vermek için kullanın.',
                ]),
            ],
        },
    ],
}
