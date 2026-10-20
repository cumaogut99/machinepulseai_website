// Interface tour: FFT / Spectrum Analysis. Every string pair is [en, tr].
// Hotspot positions come from tourAnchors.js.

const pt = (id, title, desc) => ({ id, title, desc })

export default {
    fft_spectrum: [
        {
            id: 'settings',
            tab: ['FFT Settings + Channels', 'FFT Ayarları + Kanallar'],
            summary: [
                'Two accelerometer axes at a steady 3600 RPM (120–140 s). Linear averaging over 48 blocks; the 1×, 2×, 3× orders and an 87.5 Hz tone stand out.',
                'Sabit 3600 RPM’de (120–140 s) iki ivmeölçer ekseni. 48 blok üzerinden doğrusal ortalama; 1×, 2×, 3× order’ları ve 87,5 Hz ton belirgindir.',
            ],
            points: [
                pt('input', ['Input defines which samples are analysed', 'Giriş, analiz edilen örnekleri belirler'], [
                    'Sample Rate is read-only metadata from the MPAI file; it fixes Nyquist at fs/2 and the line spacing Δf = fs/N. The Navigator button switches between a dual-cursor range and one sliding window, and Channel selects the trace drawn in the navigator.',
                    'Örnekleme hızı MPAI dosyasından okunan salt okunur bilgidir; Nyquist’i fs/2’de ve çizgi aralığını Δf = fs/N olarak sabitler. Navigator düğmesi iki imleçli aralık ile tek kayan pencere arasında geçer; Channel navigatörde çizilen izi seçer.',
                ]),
                pt('spectrum_group', ['Mode, window and block size', 'Mod, pencere ve blok boyutu'], [
                    'Mode chooses “Spectrum / PSD / Phase” (one calculation feeding three result views) or “Spectrogram (STFT)”. Window tapers each block, trading leakage against peak width and amplitude accuracy. Block / Lines sets N, which fixes both Δf and the duration of one block.',
                    'Mode, “Spectrum / PSD / Phase” (üç sonuç görünümünü besleyen tek hesap) veya “Spectrogram (STFT)” seçer. Window her bloğu pencereler; kaçak ile tepe genişliği ve genlik doğruluğu arasında denge kurar. Block / Lines N’yi belirler; N hem Δf’yi hem tek bloğun süresini sabitler.',
                ]),
                pt('block_reduction', ['Block reduction', 'Blok indirgeme'], [
                    'None uses one block; Linear averages blocks equally; Exponential weights recent blocks (α); Max Hold keeps the largest value per bin. Blocks and Overlap decide how much of the selection is used. Averaging is valid only while the blocks describe the same operating state.',
                    'None tek blok kullanır; Linear blokların eşit ortalamasını alır; Exponential son blokları ağırlıklandırır (α); Max Hold her kutudaki en büyük değeri tutar. Blocks ve Overlap seçimin ne kadarının kullanılacağını belirler. Ortalama yalnızca bloklar aynı işletme durumunu tarif ettiği sürece geçerlidir.',
                ]),
                pt('post', ['Post-processing', 'Son işleme'], [
                    'Weighting applies A, B or C acoustic weighting; Integration converts calibrated acceleration to velocity or displacement (DC is suppressed); Octave overlay adds 1/1 to 1/24-octave band levels on top of the narrowband result.',
                    'Weighting A, B veya C akustik ağırlığı uygular; Integration kalibre ivmeyi hıza veya yer değiştirmeye çevirir (DC bastırılır); Octave overlay dar bant sonucun üzerine 1/1–1/24 oktav bant seviyeleri ekler.',
                ]),
                pt('views', ['Spectrum, PSD, Phase and STFT', 'Spectrum, PSD, Phase ve STFT'], [
                    'These toolbar buttons switch the result view; they do not start a calculation. Channels and Results on the right toggle the signal list and the result inspector.',
                    'Bu araç çubuğu düğmeleri sonuç görünümünü değiştirir; hesap başlatmaz. Sağdaki Channels ve Results sinyal listesi ile sonuç denetçisini açıp kapatır.',
                ]),
                pt('navigator', ['Navigator range', 'Navigatör aralığı'], [
                    'The highlighted span is the steady 3600 RPM hold. A spectrum of a mixed speed or load state is mathematically correct but not a usable engineering answer.',
                    'Vurgulu aralık sabit 3600 RPM bölümüdür. Karışık hız veya yük durumunun spektrumu matematiksel olarak doğrudur ama kullanılabilir bir mühendislik cevabı değildir.',
                ]),
                pt('spectrum', ['Amplitude spectrum', 'Genlik spektrumu'], [
                    'Every checked channel is computed with the same recipe and overlaid in its own colour. Here 60 Hz (1×), 120 Hz (2×), 180 Hz (3×) and the fixed 87.5 Hz tone are clearly separated.',
                    'İşaretlenen her kanal aynı reçeteyle hesaplanır ve kendi rengiyle üst üste çizilir. Burada 60 Hz (1×), 120 Hz (2×), 180 Hz (3×) ve sabit 87,5 Hz ton net biçimde ayrışır.',
                ]),
            ],
        },
        {
            id: 'psd',
            tab: ['PSD + Results', 'PSD + Sonuçlar'],
            summary: [
                'The same calculation shown as power spectral density, with the spectrum summary in the result inspector.',
                'Aynı hesap güç spektral yoğunluğu olarak; sonuç denetçisinde spektrum özeti.',
            ],
            points: [
                pt('psd', ['Power spectral density', 'Güç spektral yoğunluğu'], [
                    'Power per hertz (g²/Hz here). Use PSD for broadband, random content because it does not depend on the line spacing; do not compare a PSD value directly with an amplitude value.',
                    'Hertz başına güç (burada g²/Hz). Çizgi aralığına bağlı olmadığından geniş bantlı, rastgele içerik için PSD kullanın; PSD değerini genlik değeriyle doğrudan karşılaştırmayın.',
                ]),
                pt('summary', ['Spectrum summary', 'Spektrum özeti'], [
                    'Peak frequency and magnitude, resolution, number of averages, THD, SINAD, SNR and overall RMS for the computed channels — the numbers to quote together with the plot.',
                    'Hesaplanan kanallar için tepe frekansı ve genliği, çözünürlük, ortalama sayısı, THD, SINAD, SNR ve toplam RMS — grafikle birlikte belirtilecek sayılar.',
                ]),
            ],
        },
        {
            id: 'markers',
            tab: ['Markers + Peaks', 'İşaretçiler + Tepeler'],
            summary: [
                'Five detected peaks across both channels and the harmonic family of the dominant 60 Hz line.',
                'İki kanalda tespit edilen beş tepe ve baskın 60 Hz çizgisinin harmonik ailesi.',
            ],
            points: [
                pt('interaction', ['Plot interaction', 'Grafik etkileşimi'], [
                    'With “Click plot to add markers” on, clicks place markers; Snap “Nearest peak” with a peak radius moves them onto the local maximum.',
                    '“Click plot to add markers” açıkken tıklamalar işaretçi koyar; tepe yarıçapıyla “Nearest peak” yakalaması onları yerel maksimuma taşır.',
                ]),
                pt('detect', ['Peak detection', 'Tepe tespiti'], [
                    'Detect peaks (or valleys) on one or all channels: Count, Min Magnitude and a frequency range limit the search, and + adds the results as markers.',
                    'Bir veya tüm kanallarda tepe (veya çukur) tespit edin: Count, Min Magnitude ve frekans aralığı aramayı sınırlar; + sonuçları işaretçi olarak ekler.',
                ]),
                pt('manual', ['Manual markers', 'Elle işaretçiler'], [
                    'Typed marker, delta pair and band (peak, average, RMS and power between two frequencies).',
                    'Yazılarak eklenen işaretçi, fark çifti ve bant (iki frekans arasında tepe, ortalama, RMS ve güç).',
                ]),
                pt('harmonics', ['Harmonics and sidebands', 'Harmonikler ve yan bantlar'], [
                    'Show a harmonic family from the dominant peak or a manual fundamental, and sideband families at a chosen spacing — the quickest check of whether lines belong to one source.',
                    'Baskın tepeden veya elle girilen temel frekanstan harmonik aile ve seçilen aralıkta yan bant aileleri gösterir — çizgilerin tek kaynağa ait olup olmadığını kontrol etmenin en hızlı yolu.',
                ]),
                pt('peaks', ['Markers on the spectrum', 'Spektrum üzerindeki işaretçiler'], [
                    'Each peak label names the channel, frequency and value; harmonic lines are drawn at 1×, 2×, 3×… of 60.01 Hz. Markers are shared by Spectrum, PSD and Phase.',
                    'Her tepe etiketi kanalı, frekansı ve değeri belirtir; harmonik çizgiler 60,01 Hz’in 1×, 2×, 3×… katlarında çizilir. İşaretçiler Spectrum, PSD ve Phase arasında paylaşılır.',
                ]),
                pt('table', ['Marker inspector', 'İşaretçi denetçisi'], [
                    'The Markers tab of the inspector lists every marker; rename, remove, clear or export as CSV.',
                    'Denetçinin Markers sekmesi tüm işaretçileri listeler; yeniden adlandırın, silin, temizleyin veya CSV olarak aktarın.',
                ]),
            ],
        },
        {
            id: 'compare',
            tab: ['Compare', 'Karşılaştırma'],
            summary: [
                'Channel A (X axis) against channel B (Z axis) with the difference table.',
                'Kanal A (X ekseni) ile kanal B (Z ekseni) karşılaştırması ve fark tablosu.',
            ],
            points: [
                pt('channels', ['Compare channels', 'Kanalları karşılaştırın'], [
                    'Pick Reference A and Compare B, then “Compute and Compare” runs both with the same recipe — the fastest way to compare two sensor locations or directions.',
                    'Reference A ve Compare B’yi seçin; “Compute and Compare” ikisini aynı reçeteyle hesaplar — iki sensör konumunu veya yönünü karşılaştırmanın en hızlı yolu.',
                ]),
                pt('ranges', ['Compare time ranges', 'Zaman aralıklarını karşılaştırın'], [
                    'Advanced: capture the current result as Reference A, move the navigator to another operating state and compute again; the reference stays as a frozen overlay.',
                    'Gelişmiş: mevcut sonucu Reference A olarak yakalayın, navigatörü başka bir işletme durumuna taşıyıp yeniden hesaplayın; referans dondurulmuş katman olarak kalır.',
                ]),
                pt('overlay', ['Overlay', 'Üst üste çizim'], [
                    'Both spectra on one axis so line-by-line differences are visible.',
                    'Satır satır farklar görünsün diye iki spektrum aynı eksende.',
                ]),
                pt('results', ['Difference table', 'Fark tablosu'], [
                    'Dominant frequency, peak, THD, SINAD and SNR for A and B with the difference B − A.',
                    'A ve B için baskın frekans, tepe, THD, SINAD ve SNR ile B − A farkı.',
                ]),
            ],
        },
        {
            id: 'stft',
            tab: ['Spectrogram (STFT)', 'Spektrogram (STFT)'],
            summary: [
                'The whole 280 s run-up and coast-down as a time–frequency map of one channel.',
                'Tüm 280 s kalkış ve duruş, tek kanalın zaman–frekans haritası olarak.',
            ],
            points: [
                pt('mode', ['Spectrogram mode', 'Spektrogram modu'], [
                    'Set Mode to “Spectrogram (STFT)” and compute with a single checked channel — a time–frequency matrix is much larger than a line spectrum. Block size trades time resolution against frequency resolution.',
                    'Mode’u “Spectrogram (STFT)” yapın ve tek kanal işaretliyken hesaplayın — zaman–frekans matrisi çizgi spektrumundan çok daha büyüktür. Blok boyutu zaman çözünürlüğü ile frekans çözünürlüğü arasında denge kurar.',
                ]),
                pt('spectrogram', ['Time–frequency map', 'Zaman–frekans haritası'], [
                    'Time horizontally, frequency vertically, magnitude in colour. The order lines rise and fall with speed while fixed-frequency content stays horizontal — the time-domain view of what the order map shows against RPM.',
                    'Yatayda zaman, dikeyde frekans, renkte genlik. Order çizgileri hızla yükselip alçalırken sabit frekanslı içerik yatay kalır — order haritasının RPM’ye karşı gösterdiğinin zaman alanı karşılığı.',
                ]),
            ],
        },
    ],
}
