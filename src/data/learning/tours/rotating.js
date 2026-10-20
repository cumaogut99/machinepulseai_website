// Interface tours: rotating machinery (order tracking, bearing & gear,
// torsional, rotor dynamics, rotor balancing). Every string pair is [en, tr].
// Hotspot positions come from tourAnchors.js.

import ROTOR_TOURS from './rotor.js'

const pt = (id, title, desc) => ({ id, title, desc })

export default {
    ...ROTOR_TOURS,

    order_tracking: [
        {
            id: 'setup',
            tab: ['Setup + Order Map', 'Kurulum + Order Haritası'],
            summary: [
                'A 600 → 3600 → 600 RPM cycle analysed on three accelerometer axes. Constant-order content forms vertical bands; resonances light up where an order crosses them.',
                'Üç ivmeölçer ekseninde 600 → 3600 → 600 RPM döngüsü. Sabit order’lı içerik dikey bantlar oluşturur; bir order rezonansı kestiğinde bant parlar.',
            ],
            points: [
                pt('setup', ['Order grid', 'Order ızgarası'], [
                    'Max Order sets the highest order on the map and Order Resolution its spacing (0.25 here). Window Function tapers each angle-domain block. Finer resolution needs more shaft revolutions per block, so during a fast ramp it trades speed locality for order detail.',
                    'Max Order haritadaki en yüksek order’ı, Order Resolution aralığı (burada 0,25) belirler. Window Function her açı bloğunu pencereler. İnce çözünürlük blok başına daha fazla devir ister; hızlı rampada hız yerelliğini order ayrıntısı için feda eder.',
                ]),
                pt('map_view', ['Map source, metric and 2D / 3D', 'Harita kaynağı, metrik ve 2D / 3D'], [
                    'Source switches between the Order Map, the Frequency–RPM map, a user Tag Axis and run statistics (mean, envelope, ±3σ). Metric shows amplitude, dB relative to the map peak, phase or the limit mask. 2D draws a colormap; 3D opens the same surface in VTK. None of these recompute.',
                    'Source; Order Map, Frekans–RPM haritası, kullanıcı Tag Axis ve koşu istatistikleri (ortalama, zarf, ±3σ) arasında geçer. Metric genlik, harita tepesine göre dB, faz veya limit maskesini gösterir. 2D renk haritası, 3D aynı yüzeyi VTK’da açar. Hiçbiri yeniden hesap yapmaz.',
                ]),
                pt('display', ['Direction, RPM bins and units', 'Yön, RPM kutuları ve birimler'], [
                    'Direction keeps all blocks or only run-up / coast-down. RPM Step, Start and Stop define the displayed speed bins (0 = automatic). Domain integrates to velocity or displacement, Amplitude chooses peak, RMS or pk-pk, and Bin Combine merges blocks in a bin by mean, peak envelope or exponential average. Trend Order Cuts lists the orders drawn in Trends.',
                    'Direction tüm blokları veya yalnız kalkış / duruşu tutar. RPM Step, Start ve Stop gösterilen hız kutularını belirler (0 = otomatik). Domain hıza veya yer değiştirmeye integral alır, Amplitude tepe, RMS veya tepe-tepe seçer; Bin Combine bir kutudaki blokları ortalama, tepe zarfı veya üstel ortalama ile birleştirir. Trend Order Cuts, Trends’te çizilecek order’ları listeler.',
                ]),
                pt('cutoff', ['Cutoff, limits and run comparison', 'Eşik, limitler ve koşu karşılaştırması'], [
                    'Display Cutoff hides cells below an absolute or peak-relative value without rerunning the analysis. Validation builds a pass/fail mask from an absolute limit or a tolerance against the first run. “Add results to Runs” accumulates compatible results into bounded mean, envelope and 3σ statistics for repeat tests.',
                    'Display Cutoff, analizi yeniden çalıştırmadan mutlak veya tepeye göre bir değerin altındaki hücreleri gizler. Validation mutlak limit veya ilk koşuya göre tolerans ile geçti/kaldı maskesi üretir. “Add results to Runs” uyumlu sonuçları tekrar testleri için sınırlı ortalama, zarf ve 3σ istatistiklerine ekler.',
                ]),
                pt('map', ['Order map', 'Order haritası'], [
                    'Order on the horizontal axis, RPM vertically, amplitude in colour. The 1× band peaks near 1800 RPM and 2× near 2400 RPM — speed-dependent resonance crossings. The fixed 87.5 Hz tone runs diagonally here because a constant frequency is a falling order as speed rises.',
                    'Yatay eksende order, dikeyde RPM, renkte genlik. 1× bandı 1800 RPM, 2× bandı 2400 RPM civarında tepe yapar — hıza bağlı rezonans geçişleri. Sabit 87,5 Hz ton burada çapraz görünür; çünkü hız arttıkça sabit frekans azalan bir order’a karşılık gelir.',
                ]),
                pt('navigator', ['Navigator range', 'Navigatör aralığı'], [
                    'The strip shows the navigator channel over the full record; the cursors bound the run that is analysed. Choose one complete run-up or coast-down, or the whole cycle when Direction will separate them.',
                    'Şerit, navigatör kanalını tüm kayıt boyunca gösterir; imleçler analiz edilen koşuyu sınırlar. Tek bir tam kalkış ya da duruş seçin veya yönleri Direction ile ayıracaksanız tüm döngüyü seçin.',
                ]),
                pt('signals', ['Vibration channels', 'Titreşim kanalları'], [
                    'Every checked channel is tracked with the same recipe in one Compute. Clicking a channel name switches the displayed result without recomputing.',
                    'İşaretlenen her kanal tek Compute ile aynı reçeteyle izlenir. Kanal adına tıklamak yeniden hesap yapmadan gösterilen sonucu değiştirir.',
                ]),
                pt('reference', ['Rotation reference', 'Dönme referansı'], [
                    'RPM Signal takes a speed channel in RPM; Tacho Signal takes raw keyphasor or encoder pulses, converted to speed and shaft angle with the Tacho settings. Tag Axis assigns an operating-state channel (for example torque) for the Tag Axis map.',
                    'RPM Signal RPM cinsinden hız kanalı alır; Tacho Signal ham keyphasor veya enkoder darbeleri alır ve Tacho ayarlarıyla hız ve mil açısına çevirir. Tag Axis, Tag Axis haritası için bir işletme durumu kanalı (ör. tork) atar.',
                ]),
                pt('compute', ['Compute', 'Compute'], [
                    'Runs the streaming order analysis in the C++ engine. The status line reports blocks and orders; the result stays transient until you choose it in the central Save prompt.',
                    'Akışlı order analizini C++ motorunda çalıştırır. Durum satırı blok ve order sayısını verir; sonuç merkezi Kaydet penceresinde seçilene kadar geçicidir.',
                ]),
            ],
        },
        {
            id: 'tracking',
            tab: ['Tracking + Trends', 'İzleme + Trendler'],
            summary: [
                'Order cuts 1×, 2× and 3× against speed, with their phase below. The Tracking page decides how speed is obtained and which extraction method runs.',
                '1×, 2× ve 3× order kesitleri hıza karşı, altında fazları. Tracking sayfası hızın nasıl elde edileceğini ve hangi çıkarım yönteminin çalışacağını belirler.',
            ],
            points: [
                pt('tracking', ['Overlap and Frequency–RPM map', 'Örtüşme ve Frekans–RPM haritası'], [
                    'Overlap sets the block hop. “Frequency–RPM map” also computes a frequency-versus-speed map in which structural resonances stay at a fixed hertz value; Freq Resolution applies only to that map and lengthens its FFT window when finer.',
                    'Overlap blok kaymasını belirler. “Frequency–RPM map” ayrıca yapısal rezonansların sabit hertz değerinde kaldığı bir frekans–hız haritası hesaplar; Freq Resolution yalnızca bu haritaya uygulanır ve inceldikçe FFT penceresini uzatır.',
                ]),
                pt('virtual_tacho', ['Virtual tacho (harmonic lock)', 'Sanal takometre (harmonik kilit)'], [
                    'When no speed channel exists, “Estimate speed without tacho” locks onto the vibration harmonics inside the min/max RPM window. Confidence, slew and invalid-fraction gates make low-quality estimates fail instead of passing silently. Its phase refers to the vibration harmonic, not a physical keyphasor, so it must not be used for balancing.',
                    'Hız kanalı yoksa “Estimate speed without tacho”, min/maks RPM penceresindeki titreşim harmoniklerine kilitlenir. Güven, değişim hızı ve geçersiz oran kapıları düşük kaliteli tahminin sessizce geçmesini engeller. Fazı fiziksel keyphasor’a değil titreşim harmoniğine göredir; balanslamada kullanılmamalıdır.',
                ]),
                pt('extraction', ['Extraction method', 'Çıkarım yöntemi'], [
                    'Campbell Map produces the order and frequency maps. Single or Multi-Order Vold–Kalman extracts chosen order time histories; Bandwidth Pole and Bandwidth (Hz) set how quickly a tracked order may change in amplitude.',
                    'Campbell Map order ve frekans haritalarını üretir. Tek veya çoklu order Vold–Kalman seçili order’ların zaman geçmişini çıkarır; Bandwidth Pole ve Bandwidth (Hz) izlenen order’ın genliğinin ne hızla değişebileceğini belirler.',
                ]),
                pt('tacho', ['Tacho / keyphasor conversion', 'Tacho / keyphasor dönüşümü'], [
                    'Used when a raw pulse channel is assigned: pulses per revolution, trigger level, edge and hysteresis define the edges; Max RPM Jump, missing-teeth geometry and the repair options reject false or absent pulses before speed and angle are formed.',
                    'Ham darbe kanalı atandığında kullanılır: devir başına darbe, tetik seviyesi, kenar ve histerezis kenarları tanımlar; Max RPM Jump, eksik diş geometrisi ve onarım seçenekleri hız ve açı oluşmadan önce hatalı veya eksik darbeleri ayıklar.',
                ]),
                pt('trend_amp', ['Order amplitude vs RPM', 'Hıza karşı order genliği'], [
                    'Each Trend Order Cut is a line through the map at constant order, plus overall RMS. The 1× peak at 1800 RPM and 2× peak at 2400 RPM are the designed resonances; a peak that moves with order is a structural mode, one that stays at the same order is an excitation.',
                    'Her Trend Order Cut haritada sabit order’dan geçen bir çizgidir; ayrıca toplam RMS çizilir. 1800 RPM’deki 1× ve 2400 RPM’deki 2× tepeleri tasarlanan rezonanslardır. Order ile yer değiştiren tepe yapısal mod, aynı order’da kalan tepe uyarımdır.',
                ]),
                pt('trend_phase', ['Order phase vs RPM', 'Hıza karşı order fazı'], [
                    'Phase of each order relative to the rotation reference. A phase shift of about 180° across a peak confirms a resonance. Phase is only meaningful with a true once-per-revolution reference and where the order amplitude stands above the noise.',
                    'Her order’ın dönme referansına göre fazı. Tepe boyunca yaklaşık 180° faz kayması rezonansı doğrular. Faz yalnızca gerçek devirde-bir referansla ve order genliğinin gürültünün üstünde olduğu yerde anlamlıdır.',
                ]),
            ],
        },
        {
            id: 'cursor',
            tab: ['Markers + Cursor Cuts', 'İşaretçiler + İmleç Kesitleri'],
            summary: [
                'A processing cursor at order 1 and 1800 RPM cuts the cached map in both directions, and an RPM marker is listed in the marker table.',
                'Order 1 ve 1800 RPM’deki işlem imleci önbellekteki haritayı iki yönde keser; bir RPM işaretçisi işaretçi tablosunda listelenir.',
            ],
            points: [
                pt('interaction', ['Plot interaction', 'Grafik etkileşimi'], [
                    'With “Click plot to add markers” on, clicks on a result place markers; Snap moves them to the nearest computed result point. The marker page always follows the active result tab.',
                    '“Click plot to add markers” açıkken sonuca tıklamak işaretçi ekler; Snap işaretçiyi en yakın hesaplanmış noktaya taşır. İşaretçi sayfası her zaman etkin sonuç sekmesini izler.',
                ]),
                pt('speed_markers', ['Speed markers and deltas', 'Hız işaretçileri ve farkları'], [
                    'For speed-based results one RPM marker is shared by the amplitude and phase plots. Delta places two speeds and reports the separation, for example the half-power width of a resonance.',
                    'Hıza bağlı sonuçlarda tek RPM işaretçisi genlik ve faz grafiklerince paylaşılır. Delta iki hız yerleştirip aralarındaki farkı verir; ör. bir rezonansın yarı güç genişliği.',
                ]),
                pt('extrema', ['Speed-range extrema', 'Hız aralığı ekstremumları'], [
                    'Finds the requested number of maxima or minima between two speeds and adds them as markers — a quick way to list the resonance crossings of a run.',
                    'İki hız arasında istenen sayıda maksimum veya minimum bulur ve işaretçi olarak ekler — bir koşudaki rezonans geçişlerini listelemenin hızlı yolu.',
                ]),
                pt('cut_x', ['Order spectrum at one speed', 'Tek hızda order spektrumu'], [
                    'The upper cut reads the map horizontally at the cursor speed: amplitude versus order at 1800 RPM. Clicking the map moves the cursor; cuts come from the retained result, so no recompute is needed.',
                    'Üst kesit haritayı imleç hızında yatay okur: 1800 RPM’de order’a karşı genlik. Haritaya tıklamak imleci taşır; kesitler saklanan sonuçtan alınır, yeniden hesap gerekmez.',
                ]),
                pt('cut_y', ['One order through the run', 'Koşu boyunca tek order'], [
                    'The lower cut reads the map vertically at the cursor order: the 1× amplitude across the whole speed range, peaking at the 1800 RPM resonance.',
                    'Alt kesit haritayı imleç order’ında dikey okur: tüm hız aralığında 1× genliği; 1800 RPM rezonansında tepe yapar.',
                ]),
                pt('table', ['Marker table', 'İşaretçi tablosu'], [
                    'Lists every marker with position and values, with Rename, Remove, Clear and CSV export. “Only the active graph” limits the list to the visible result.',
                    'Her işaretçiyi konumu ve değerleriyle listeler; Rename, Remove, Clear ve CSV dışa aktarma sunar. “Only the active graph” listeyi görünen sonuçla sınırlar.',
                ]),
            ],
        },
        {
            id: 'vk',
            tab: ['Order (VK) extraction', 'Order (VK) çıkarımı'],
            summary: [
                'Multi-order Vold–Kalman extraction of 1×, 2× and 3× over the full cycle — order amplitudes as time histories rather than spectral bins.',
                'Tüm döngü boyunca 1×, 2× ve 3× için çoklu order Vold–Kalman çıkarımı — order genlikleri spektral kutu değil zaman geçmişi olarak.',
            ],
            points: [
                pt('extraction', ['Choose Vold–Kalman', 'Vold–Kalman seçin'], [
                    'Set Method to Single or Multi-Order (Vold–Kalman) and compute again. The map remains available; the VK tab adds the tracked order envelopes.',
                    'Method’u Single veya Multi-Order (Vold–Kalman) yapıp yeniden hesaplayın. Harita kullanılabilir kalır; VK sekmesi izlenen order zarflarını ekler.',
                ]),
                pt('vk_orders', ['Orders to extract', 'Çıkarılacak order’lar'], [
                    'A comma-separated list for multi-order extraction (here 1, 2, 3). Orders are solved together, which separates them even when they pass close in frequency.',
                    'Çoklu çıkarım için virgülle ayrılmış liste (burada 1, 2, 3). Order’lar birlikte çözülür; frekansta birbirine yaklaştıklarında bile ayrışırlar.',
                ]),
                pt('vk_bandwidth', ['Filter bandwidth', 'Filtre bant genişliği'], [
                    'Bandwidth (Hz) and the pole count define how fast an order may change. Narrow bandwidth rejects neighbouring content but smooths fast transients; wide bandwidth follows quick changes but admits more noise.',
                    'Bandwidth (Hz) ve kutup sayısı bir order’ın ne hızla değişebileceğini belirler. Dar bant komşu içeriği bastırır ama hızlı geçişleri yumuşatır; geniş bant hızlı değişimleri izler ama daha çok gürültü alır.',
                ]),
                pt('vk_plot', ['Order envelopes over time', 'Zamana göre order zarfları'], [
                    'Each colour is one extracted order. The paired peaks in each run-up and coast-down are the resonance crossings seen in the map, now as continuous amplitudes that can be exported or compared against limits.',
                    'Her renk bir çıkarılmış order’dır. Her kalkış ve duruştaki çift tepeler haritada görülen rezonans geçişleridir; artık dışa aktarılabilen veya limitlerle karşılaştırılabilen sürekli genliklerdir.',
                ]),
            ],
        },
    ],

    bearing_fault: [
        {
            id: 'setup',
            tab: ['Setup + Envelope', 'Kurulum + Zarf'],
            summary: [
                'A 10 s window at 2400 RPM with an outer-race defect. The envelope spectrum shows the BPFO family at 143 Hz and its harmonics, with every calculated bearing frequency drawn as a guide.',
                '2400 RPM’de 10 s’lik pencere, dış bilezik hasarı. Zarf spektrumu 143 Hz’de BPFO ailesini ve harmoniklerini gösterir; hesaplanan her rulman frekansı kılavuz çizgi olarak çizilir.',
            ],
            points: [
                pt('data', ['Data and navigator', 'Veri ve navigatör'], [
                    'Sample Rate is read from the MPAI file. The Navigator button switches between a range and a sliding window, and Channel picks the navigator trace. Keep the window at one speed and load.',
                    'Örnekleme hızı MPAI dosyasından okunur. Navigator düğmesi aralık ile kayan pencere arasında geçer, Channel navigatör izini seçer. Pencereyi tek hız ve yükte tutun.',
                ]),
                pt('bearing', ['Bearing geometry and speed', 'Rulman geometrisi ve hız'], [
                    'Pick a bearing from the built-in database or type the number of balls, pitch and ball diameters and contact angle. RPM (manual) = 0 measures speed from the RPM channel. FTF, BPFO, BPFI and BSF are calculated from these inputs, so a wrong geometry moves every guide line.',
                    'Yerleşik veritabanından rulman seçin veya bilye sayısı, hatve ve bilye çapı ile temas açısını yazın. RPM (manual) = 0 iken hız RPM kanalından ölçülür. FTF, BPFO, BPFI ve BSF bu girdilerden hesaplanır; yanlış geometri tüm kılavuz çizgileri kaydırır.',
                ]),
                pt('gear', ['Gear and TSA', 'Dişli ve TSA'], [
                    'Gear / TSA enables time-synchronous averaging over shaft revolutions; Gear Teeth gives the mesh order (32 → 32×) and Residual Harmonics how many mesh harmonics are removed to form the residual signal.',
                    'Gear / TSA mil devirleri üzerinden zaman-senkron ortalamayı açar; Gear Teeth kavrama order’ını (32 → 32×), Residual Harmonics ise artık sinyali oluşturmak için çıkarılacak kavrama harmoniği sayısını verir.',
                ]),
                pt('channels', ['Vibration and RPM assignment', 'Titreşim ve RPM ataması'], [
                    'Vibration Signal is the accelerometer to diagnose; RPM Signal provides the shaft speed used for every characteristic frequency. Auto-detect fills both from channel names.',
                    'Vibration Signal tanılanacak ivmeölçerdir; RPM Signal her karakteristik frekans için kullanılan mil hızını verir. Auto-detect ikisini de kanal adlarından doldurur.',
                ]),
                pt('envelope', ['Envelope spectrum', 'Zarf spektrumu'], [
                    'The signal is band-passed around a structural resonance, demodulated and transformed. Repetitive impacts appear as a line family: here BPFO 1× to 4× at 143, 286, 429 and 572 Hz. Coloured dashed lines mark each calculated fault family.',
                    'Sinyal bir yapısal rezonans etrafında bant geçirilir, demodüle edilir ve dönüştürülür. Tekrarlı darbeler çizgi ailesi olarak görünür: burada 143, 286, 429 ve 572 Hz’de BPFO 1×–4×. Renkli kesikli çizgiler hesaplanan her arıza ailesini işaretler.',
                ]),
                pt('navigator', ['Analysis window', 'Analiz penceresi'], [
                    'The highlighted span is the 10 s of data analysed. A longer stable window sharpens envelope lines; a window that crosses a speed change smears them.',
                    'Vurgulu aralık analiz edilen 10 s’lik veridir. Daha uzun ve kararlı pencere zarf çizgilerini keskinleştirir; hız değişimini kesen pencere onları yayar.',
                ]),
                pt('status', ['Compute and status', 'Compute ve durum'], [
                    'Compute runs envelope, cepstrum, TSA, kurtogram and trending in one pass. The status line names the verdict, the measured RPM and the BPFO it was evaluated at.',
                    'Compute; zarf, kepstrum, TSA, kurtogram ve trend analizini tek geçişte çalıştırır. Durum satırı kararı, ölçülen RPM’yi ve değerlendirilen BPFO’yu yazar.',
                ]),
            ],
        },
        {
            id: 'kurtogram',
            tab: ['Analysis + Kurtogram', 'Analiz + Kurtogram'],
            summary: [
                'Band Selection set to Kurtogram (auto). The spectral-kurtosis map ranks frequency bands by impulsiveness and the envelope uses the best one.',
                'Band Selection Kurtogram (auto) seçili. Spektral kurtosis haritası frekans bantlarını darbelilik düzeyine göre sıralar ve zarf en iyi bandı kullanır.',
            ],
            points: [
                pt('envelope_band', ['Envelope band', 'Zarf bandı'], [
                    'Manual uses the typed Envelope Band Low/High; Kurtogram (auto) uses the band with the highest spectral kurtosis and reports it as “Used band”. The automatic choice is a suggestion: here it picked a narrow 800 Hz band, while the manual 1.5–2.3 kHz band around the structural carrier gave the clearer BPFO evidence.',
                    'Manual, yazılan Envelope Band Low/High değerlerini kullanır; Kurtogram (auto) en yüksek spektral kurtosisli bandı kullanır ve “Used band” olarak raporlar. Otomatik seçim bir öneridir: burada dar bir 800 Hz bandı seçti; yapısal taşıyıcı çevresindeki manuel 1,5–2,3 kHz bandı daha net BPFO kanıtı verdi.',
                ]),
                pt('kurtogram_level', ['Kurtogram depth', 'Kurtogram derinliği'], [
                    'Max Level k splits the Nyquist range into 2^k bands; higher levels give narrower bands but need more data. Colour shows kurtosis (impulsiveness), not vibration amplitude.',
                    'Max Level k, Nyquist aralığını 2^k banda böler; yüksek seviye daha dar bant verir ama daha fazla veri ister. Renk titreşim genliğini değil kurtosisi (darbeliliği) gösterir.',
                ]),
                pt('trending', ['Trend blocks', 'Trend blokları'], [
                    'Splits the analysis window into N blocks and trends RMS, kurtosis and crest factor per block in the Trend tab. 0 turns trending off.',
                    'Analiz penceresini N bloğa böler ve Trend sekmesinde blok başına RMS, kurtosis ve crest factor eğilimini çizer. 0 trendi kapatır.',
                ]),
                pt('map', ['Spectral-kurtosis map', 'Spektral kurtosis haritası'], [
                    'Frequency horizontally, decomposition level vertically. Bright cells mark bands where the signal is most impulsive — candidates for envelope demodulation, to be confirmed against the envelope spectrum.',
                    'Yatayda frekans, dikeyde ayrıştırma seviyesi. Parlak hücreler sinyalin en darbeli olduğu bantları gösterir — zarf demodülasyonu adaylarıdır ve zarf spektrumuyla doğrulanmalıdır.',
                ]),
            ],
        },
        {
            id: 'cepstrum',
            tab: ['Cepstrum', 'Kepstrum'],
            summary: [
                'Harmonic families become single rahmonic peaks in the quefrency domain.',
                'Harmonik aileler kepstrum (quefrency) alanında tek rahmonik tepelere dönüşür.',
            ],
            points: [
                pt('lifter', ['Cepstrum lifter', 'Kepstrum lifter'], [
                    'Cepstrum Lifter q removes the lowest quefrencies (0 = off) so that the transfer path does not dominate before the cepstrum is used to edit or compare spectra.',
                    'Cepstrum Lifter q en düşük quefrency’leri kaldırır (0 = kapalı); böylece kepstrum spektrumları düzenlemek veya karşılaştırmak için kullanılmadan önce iletim yolu baskın olmaz.',
                ]),
                pt('cepstrum', ['Rahmonics', 'Rahmonikler'], [
                    'A family spaced by Δf in the spectrum becomes a peak at quefrency 1/Δf. The repeating peaks at multiples of about 7 ms correspond to the 143 Hz BPFO spacing — a compact check that the whole family, not one line, is present.',
                    'Spektrumda Δf aralıklı bir aile, 1/Δf quefrency’de tepe olur. Yaklaşık 7 ms’nin katlarında tekrarlanan tepeler 143 Hz BPFO aralığına karşılık gelir — tek çizginin değil tüm ailenin var olduğunu kısaca doğrular.',
                ]),
            ],
        },
        {
            id: 'tsa',
            tab: ['Gear + TSA', 'Dişli + TSA'],
            summary: [
                'Time-synchronous average over one shaft revolution with the 32-tooth mesh, and the residual after mesh harmonics are removed.',
                '32 dişli kavrama ile bir mil devri üzerinden zaman-senkron ortalama ve kavrama harmonikleri çıkarıldıktan sonraki artık sinyal.',
            ],
            points: [
                pt('gear', ['Enable gear analysis', 'Dişli analizini açın'], [
                    'Gear / TSA must be On and Gear Teeth must match the gear on the measured shaft; Residual Harmonics sets how many mesh harmonics are removed for the residual.',
                    'Gear / TSA açık olmalı ve Gear Teeth ölçülen mildeki dişliyle eşleşmelidir; Residual Harmonics artık sinyal için kaç kavrama harmoniğinin çıkarılacağını belirler.',
                ]),
                pt('tsa', ['TSA and residual vs shaft angle', 'Mil açısına göre TSA ve artık'], [
                    'Averaging many revolutions keeps only content locked to the shaft, so the mesh pattern stands out over 0–360°. A localised tooth fault appears as a disturbance at one angle in the residual; condition indicators such as FM0 are derived from it.',
                    'Çok sayıda devrin ortalaması yalnızca mile kilitli içeriği tutar; kavrama deseni 0–360° boyunca belirginleşir. Yerel bir diş hasarı artık sinyalde tek bir açıda bozulma olarak görünür; FM0 gibi durum göstergeleri buradan türetilir.',
                ]),
            ],
        },
        {
            id: 'trend',
            tab: ['Trend', 'Trend'],
            summary: [
                'RMS, kurtosis and crest factor per block, normalised to the first block.',
                'Blok başına RMS, kurtosis ve crest factor; ilk bloğa göre normalize edilmiş.',
            ],
            points: [
                pt('trending', ['Number of blocks', 'Blok sayısı'], [
                    'Trend Blocks = 20 splits the 10 s window into 0.5 s blocks. More blocks show faster changes but each indicator is estimated from fewer samples.',
                    'Trend Blocks = 20, 10 s’lik pencereyi 0,5 s’lik bloklara böler. Daha fazla blok hızlı değişimi gösterir ama her gösterge daha az örnekten tahmin edilir.',
                ]),
                pt('trend', ['Relative indicators', 'Göreli göstergeler'], [
                    'Values are relative to block 1, so a steady machine stays near 1. A rising kurtosis or crest factor with flat RMS is the classic early sign of developing impacts.',
                    'Değerler 1. bloğa görelidir; kararlı bir makine 1 civarında kalır. RMS sabitken artan kurtosis veya crest factor gelişen darbelerin klasik erken işaretidir.',
                ]),
            ],
        },
        {
            id: 'markers',
            tab: ['Markers + Fault families', 'İşaretçiler + Arıza aileleri'],
            summary: [
                'The calculated BPFI, BPFO, BSF and FTF families are listed as markers, each scoped to the envelope spectrum.',
                'Hesaplanan BPFI, BPFO, BSF ve FTF aileleri işaretçi olarak listelenir; her biri zarf spektrumuna bağlıdır.',
            ],
            points: [
                pt('interaction', ['Click and snap', 'Tıklama ve yakalama'], [
                    'Clicking the envelope spectrum adds a marker; “Nearest spectrum bin” with a Peak radius snaps it to the local maximum.',
                    'Zarf spektrumuna tıklamak işaretçi ekler; “Nearest spectrum bin” ve Peak radius işaretçiyi yerel maksimuma yakalar.',
                ]),
                pt('envelope_markers', ['Marker, delta and band', 'İşaretçi, fark ve bant'], [
                    'Typed markers, delta pairs for spacing and bands that report peak, average, RMS and power between two frequencies.',
                    'Yazılarak eklenen işaretçiler, aralık ölçümü için fark çiftleri ve iki frekans arasında tepe, ortalama, RMS ve güç veren bantlar.',
                ]),
                pt('extrema', ['Frequency-range extrema', 'Frekans aralığı ekstremumları'], [
                    'Finds the strongest peaks in a frequency range and adds them as markers.',
                    'Bir frekans aralığındaki en güçlü tepeleri bulur ve işaretçi olarak ekler.',
                ]),
                pt('families', ['Calculated bearing families', 'Hesaplanan rulman aileleri'], [
                    '“Restore fault markers” re-adds the BPFI, BPFO, BSF and FTF harmonic families from the latest geometry and measured speed, after you have edited or cleared them.',
                    '“Restore fault markers”, düzenledikten veya sildikten sonra BPFI, BPFO, BSF ve FTF harmonik ailelerini son geometri ve ölçülen hızdan yeniden ekler.',
                ]),
                pt('fault_lines', ['Guide lines on the spectrum', 'Spektrumdaki kılavuz çizgiler'], [
                    'Each family is drawn at its harmonics with a label and the measured amplitude, so agreement between a calculated frequency and a real peak is visible at a glance.',
                    'Her aile harmoniklerinde etiket ve ölçülen genlikle çizilir; hesaplanan frekans ile gerçek tepe arasındaki uyum bir bakışta görülür.',
                ]),
                pt('table', ['Marker table', 'İşaretçi tablosu'], [
                    'Lists each family with its frequency and order; rename, remove, clear or export the list as CSV.',
                    'Her aileyi frekansı ve order’ı ile listeler; listeyi yeniden adlandırın, silin, temizleyin veya CSV olarak dışa aktarın.',
                ]),
            ],
        },
        {
            id: 'diagnosis',
            tab: ['Diagnosis', 'Tanı'],
            summary: [
                'The evidence table behind the verdict: BPFO with five qualified harmonics, plus time-domain condition indicators.',
                'Kararın arkasındaki kanıt tablosu: beş nitelikli harmonikle BPFO ve zaman alanı durum göstergeleri.',
            ],
            points: [
                pt('verdict', ['Verdict and match score', 'Karar ve eşleşme skoru'], [
                    'The highest-scoring fault family with its match score. It is a screening result built from harmonic evidence, to be confirmed with trend history and operating context.',
                    'En yüksek skorlu arıza ailesi ve eşleşme skoru. Harmonik kanıttan üretilen bir tarama sonucudur; trend geçmişi ve işletme bağlamıyla doğrulanmalıdır.',
                ]),
                pt('faults', ['Evidence per fault family', 'Arıza ailesi başına kanıt'], [
                    'For BPFO, BPFI, BSF, FTF and gear mesh: the calculated frequency, how many harmonics were found, the support level and the evidence (unique harmonics, shaft sidebands, overlaps excluded).',
                    'BPFO, BPFI, BSF, FTF ve dişli kavrama için: hesaplanan frekans, bulunan harmonik sayısı, destek düzeyi ve kanıt (benzersiz harmonikler, mil yan bantları, hariç tutulan çakışmalar).',
                ]),
                pt('indicators', ['Condition indicators', 'Durum göstergeleri'], [
                    'RMS, peak, crest factor, kurtosis, impulse, shape and clearance factors from the time signal, plus GMF and FM0 when gear analysis is on.',
                    'Zaman sinyalinden RMS, tepe, crest factor, kurtosis, impulse, shape ve clearance faktörleri; dişli analizi açıkken GMF ve FM0.',
                ]),
                pt('iso', ['ISO 10816-3 note', 'ISO 10816-3 notu'], [
                    'ISO 10816-3 severity needs RMS velocity in mm/s. With an acceleration channel in g the zone is reported as unavailable instead of being guessed.',
                    'ISO 10816-3 şiddeti mm/s cinsinden RMS hız gerektirir. g cinsinden ivme kanalında bölge tahmin edilmez, kullanılamaz olarak raporlanır.',
                ]),
            ],
        },
    ],

    torsional_vibration: [
        {
            id: 'setup',
            tab: ['Setup + Time', 'Kurulum + Zaman'],
            summary: [
                'Two 24-pulse encoders through a 300 → 1800 → 300 RPM cycle: angular-velocity fluctuation above, dynamic twist between the encoders below.',
                '300 → 1800 → 300 RPM döngüsünde iki 24 darbeli enkoder: üstte açısal hız dalgalanması, altta enkoderler arasındaki dinamik burulma.',
            ],
            points: [
                pt('acquisition', ['Acquisition', 'Veri alma'], [
                    'Sample Rate comes from the MPAI file; Navigator and Channel choose the trace and range used. Encoder edges are timed between samples, so the sample rate limits angle resolution.',
                    'Örnekleme hızı MPAI dosyasından gelir; Navigator ve Channel kullanılan izi ve aralığı seçer. Enkoder kenarları örnekler arasında zamanlanır; örnekleme hızı açı çözünürlüğünü sınırlar.',
                ]),
                pt('mode', ['Rotational or torsional', 'Dönel veya burulma'], [
                    'Rotational (1 encoder) measures speed fluctuation of one shaft section. Torsional / twist (2 encoders) also measures the angle difference between two sections — the dynamic twist of the shaft.',
                    'Rotational (1 enkoder) tek mil kesitinin hız dalgalanmasını ölçer. Torsional / twist (2 enkoder) ayrıca iki kesit arasındaki açı farkını, yani milin dinamik burulmasını ölçer.',
                ]),
                pt('sensor', ['Sensor type', 'Sensör tipi'], [
                    'Uniform encoder / tacho for equally spaced pulses, or Missing-tooth (for example 60-2) for a gapped wheel. Auto level picks the trigger from the signal range.',
                    'Eşit aralıklı darbeler için Uniform encoder / tacho, boşluklu teker için Missing-tooth (ör. 60-2). Auto level tetik seviyesini sinyal aralığından seçer.',
                ]),
                pt('trigger', ['Pulses and edge detection', 'Darbe ve kenar algılama'], [
                    'Pulses / Rev must equal the encoder line count (24 here) — the most important setting, because it converts edge times into angle. Edge, hysteresis, missing-teeth geometry and double-pulse rejection protect against false edges.',
                    'Pulses / Rev enkoder çizgi sayısına (burada 24) eşit olmalıdır — kenar zamanlarını açıya çevirdiği için en önemli ayardır. Kenar, histerezis, eksik diş geometrisi ve çift darbe reddi hatalı kenarlara karşı korur.',
                ]),
                pt('navigator', ['Analysed span', 'Analiz aralığı'], [
                    'The navigator selects which part of the record is decoded. A full run-up and coast-down is needed for meaningful order trends and waterfall.',
                    'Navigatör kaydın hangi bölümünün çözüleceğini seçer. Anlamlı order trendi ve şelale için tam bir kalkış ve duruş gerekir.',
                ]),
                pt('time', ['Angular velocity and twist', 'Açısal hız ve burulma'], [
                    'Upper plot: the fluctuating part of angular velocity ω in rad/s. Lower plot: twist angle between the encoders. Both grow around 1200 RPM, where a torsional resonance is crossed twice.',
                    'Üst grafik: açısal hız ω’nın dalgalanan kısmı (rad/s). Alt grafik: enkoderler arasındaki burulma açısı. İkisi de burulma rezonansının iki kez geçildiği 1200 RPM civarında büyür.',
                ]),
                pt('channels', ['Encoder assignment', 'Enkoder ataması'], [
                    'Encoder Signal is the first measuring section; Encoder 2 (Torsional) the second. Their order sets the sign of the twist.',
                    'Encoder Signal ilk ölçüm kesitidir; Encoder 2 (Torsional) ikincisidir. Sıralama burulmanın işaretini belirler.',
                ]),
            ],
        },
        {
            id: 'processing',
            tab: ['Processing + Spectrum', 'İşleme + Spektrum'],
            summary: [
                'How the second encoder is aligned to the first, and the optional filter applied to the decoded signals.',
                'İkinci enkoderin birinciye nasıl hizalandığı ve çözülen sinyallere uygulanan isteğe bağlı filtre.',
            ],
            points: [
                pt('twist', ['Twist alignment', 'Burulma hizalaması'], [
                    'Speed ratio and direction account for a gear stage or opposite mounting between the encoders; Phase offset and “Remove static/trend” remove the static angle so only dynamic twist remains. “Use Encoder 1 config” copies the sensor settings.',
                    'Speed ratio ve direction enkoderler arasındaki dişli kademesini veya ters montajı hesaba katar; Phase offset ve “Remove static/trend” statik açıyı çıkarır, yalnız dinamik burulma kalır. “Use Encoder 1 config” sensör ayarlarını kopyalar.',
                ]),
                pt('filter', ['Optional filter', 'İsteğe bağlı filtre'], [
                    'An optional causal Butterworth filter is applied to the decoded angular velocity in the C++ pipeline. Time traces, spectrum, order trends and waterfall all use the same filtered result.',
                    'İsteğe bağlı nedensel Butterworth filtre, C++ hattında çözülen açısal hıza uygulanır. Zaman izleri, spektrum, order trendleri ve şelale aynı filtrelenmiş sonucu kullanır.',
                ]),
                pt('omega_filter', ['Filter type and phase', 'Filtre tipi ve faz'], [
                    'Type selects None, High-pass, Low-pass or Band-pass. The filter is causal (streaming), so it adds phase delay — which matters when twist is compared in time with other signals.',
                    'Type; None, High-pass, Low-pass veya Band-pass seçer. Filtre nedenseldir (akışlı); faz gecikmesi ekler — burulma zamanda başka sinyallerle karşılaştırılırken önemlidir.',
                ]),
                pt('spectrum', ['Twist spectrum', 'Burulma spektrumu'], [
                    'Spectrum of the decoded signal over the selected span. During a run-up the orders sweep in frequency, which is why the order trends and waterfall views are the better tools for speed-dependent content.',
                    'Seçili aralıkta çözülen sinyalin spektrumu. Kalkış sırasında order’lar frekansta kayar; bu yüzden hıza bağlı içerik için order trendi ve şelale daha uygundur.',
                ]),
            ],
        },
        {
            id: 'orders',
            tab: ['Display + Order Trends', 'Görünüm + Order Trendleri'],
            summary: [
                'Order amplitudes against time and against local shaft speed. The 2× order dominates and peaks at the 1200 RPM torsional resonance.',
                'Zamana ve yerel mil hızına karşı order genlikleri. 2× order baskındır ve 1200 RPM burulma rezonansında tepe yapar.',
            ],
            points: [
                pt('orders', ['Orders and resolution', 'Order’lar ve çözünürlük'], [
                    'Lists the orders to trend (0.5, 1, 2, 3, 4) with the band and window in revolutions. “Max reliable order” is set by the encoder: with 24 pulses per revolution orders above 12× are not resolved.',
                    'İzlenecek order’ları (0,5, 1, 2, 3, 4), bant ve devir cinsinden pencereyle listeler. “Max reliable order” enkoder tarafından belirlenir: devir başına 24 darbede 12×’in üstü çözülemez.',
                ]),
                pt('units', ['Units and axes', 'Birimler ve eksenler'], [
                    'Velocity fluctuation in rad/s, RPM, Hz or deg/s; angle in rad or deg; angular acceleration in rad/s² or deg/s² (shown with “Show α graph”). Time axis switches between seconds and cumulative shaft angle. Changing units repaints the cached result without recomputing.',
                    'Hız dalgalanması rad/s, RPM, Hz veya deg/s; açı rad veya deg; açısal ivme rad/s² veya deg/s² (“Show α graph” ile). Time axis saniye ile kümülatif mil açısı arasında geçer. Birim değişikliği önbellekteki sonucu yeniden hesaplamadan çizer.',
                ]),
                pt('order_trends', ['Order trends', 'Order trendleri'], [
                    'Upper: each order against time; lower: against local shaft speed. Reading the speed axis turns two time peaks (run-up and coast-down) into one resonance at 1200 RPM.',
                    'Üst: her order zamana karşı; alt: yerel mil hızına karşı. Hız ekseni, iki zaman tepesini (kalkış ve duruş) 1200 RPM’de tek rezonansa dönüştürür.',
                ]),
                pt('summary', ['Summary metrics and screening', 'Özet metrikler ve tarama'], [
                    'Shaft speed, speed fluctuation, peak and relative twist and torsional-vibration RMS, with a screening note. The note is a prompt for investigation, not an acceptance verdict.',
                    'Mil hızı, hız dalgalanması, tepe ve göreli burulma ile burulma titreşimi RMS’i ve bir tarama notu. Not bir kabul kararı değil, inceleme çağrısıdır.',
                ]),
                pt('order_rms', ['Order RMS table', 'Order RMS tablosu'], [
                    'RMS of each requested order over the selected span, ready to compare with an allowable torsional limit for the drive.',
                    'Seçili aralıkta istenen her order’ın RMS değeri; tahrik için izin verilen burulma limitiyle karşılaştırmaya hazır.',
                ]),
            ],
        },
        {
            id: 'waterfall',
            tab: ['Waterfall', 'Şelale'],
            summary: [
                'Frequency against speed with amplitude in colour: order lines fan out from the origin and the resonance shows as a bright region around 1200 RPM.',
                'Hıza karşı frekans, renkte genlik: order çizgileri orijinden yelpaze gibi açılır, rezonans 1200 RPM civarında parlak bölge olarak görünür.',
            ],
            points: [
                pt('waterfall_group', ['Waterfall settings', 'Şelale ayarları'], [
                    'Source, metric and amplitude type, run direction, RPM step and a 2D colormap or 3D surface view. These are display choices applied to the cached result.',
                    'Kaynak, metrik ve genlik tipi, koşu yönü, RPM adımı ve 2D renk haritası veya 3D yüzey görünümü. Bunlar önbellekteki sonuca uygulanan görünüm seçimleridir.',
                ]),
                pt('waterfall', ['Frequency–RPM map', 'Frekans–RPM haritası'], [
                    'Straight lines through the origin are orders (frequency proportional to speed). Content that stays at the same frequency while speed changes is a structural resonance of the drive train.',
                    'Orijinden geçen doğrular order’lardır (frekans hızla orantılı). Hız değişirken aynı frekansta kalan içerik tahrik zincirinin yapısal rezonansıdır.',
                ]),
            ],
        },
        {
            id: 'markers',
            tab: ['Markers', 'İşaretçiler'],
            summary: [
                'Time markers shared by the angular-velocity and twist plots.',
                'Açısal hız ve burulma grafiklerinin paylaştığı zaman işaretçileri.',
            ],
            points: [
                pt('interaction', ['Click-to-add markers', 'Tıklayarak işaretçi'], [
                    'Clicks on the time plots place markers; Snap moves them to the nearest displayed sample. Wide views report peak-preserving Min-Max overview values.',
                    'Zaman grafiklerine tıklamak işaretçi ekler; Snap onları en yakın gösterilen örneğe taşır. Geniş görünümler tepe koruyan Min-Max özet değerlerini raporlar.',
                ]),
                pt('time_markers', ['Marker and delta', 'İşaretçi ve fark'], [
                    'A typed marker or a delta pair reports values at that time on both angular velocity and twist, and the time between two events.',
                    'Yazılan işaretçi veya fark çifti o andaki açısal hız ve burulma değerlerini ve iki olay arasındaki süreyi verir.',
                ]),
                pt('table', ['Marker table', 'İşaretçi tablosu'], [
                    'All markers with their values; rename, remove, clear or export to CSV.',
                    'Tüm işaretçiler değerleriyle; yeniden adlandırın, silin, temizleyin veya CSV’ye aktarın.',
                ]),
            ],
        },
    ],
}
