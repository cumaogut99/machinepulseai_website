// FFT / Spectrum deep-dive content.
//
// The copy below follows the current desktop implementation: single-channel
// FFT, Welch PSD and STFT. FRF/coherence deliberately live in the dedicated
// Cross Spectrum / FRF module.

const FFT_WIDGET_DETAILS = {
    fft_spectrum: {
        slug: 'fft-spectrum',
        en: {
            tagline:
                'Turn one time-domain channel into an explainable frequency view — and see exactly how the selected time range, block, window and averaging change the result.',
            intro:
                'FFT / Spectrum answers “which frequencies are present in this signal?” It can show deterministic tones and harmonics with an amplitude FFT, estimate stationary random energy density with Welch PSD, or reveal changing frequency content with an STFT spectrogram. The calculation reads only the selected window from the connected MPAI container and runs through the C++ FFT engine in the background. It is a single-channel content analysis: input–output transfer, coherence and FRF belong to Cross Spectrum / FRF; poles, damping and mode shapes belong to Modal Analysis.',
            inputs: [
                { name: 'A connected MPAI time-domain signal', desc: 'The Signal selector lists non-time channels from the connected source. The engine reads the chosen slice directly from the active MPAI reader instead of loading the complete recording into memory.', },
                { name: 'Sample-rate metadata', desc: 'Sample Rate is read-only and comes from the MPAI metadata. It defines the Nyquist limit and frequency-bin spacing; if it is missing, the widget reports an error rather than guessing.', },
                { name: 'A dual-cursor time range', desc: 'The two overview cursors bound the operating state you want to analyse. After the first result, releasing a cursor automatically recomputes the spectrum for the new range.', },
            ],
            controlGroups: [
                {
                    name: 'Toolbar, navigator and Compute',
                    desc: 'The top row opens one settings page at a time; clicking the active page again collapses the left panel.',
                    controls: [
                        { name: 'Source · Spectrum · Averaging · Post-proc · Markers · Compare · Results', desc: 'These buttons only change which settings page is visible. They do not run a calculation by themselves.', },
                        { name: 'Overview signal and two time cursors', desc: 'Choose the channel used for the overview, then drag the left and right boundaries around the event or steady operating state. The analysed sample count shown after Compute is the authoritative range actually used.', },
                        { name: '▶ Compute / Computing…', desc: 'Starts the selected analysis in the background. While it is running the button is disabled, progress is shown and the shared progress overlay provides Cancel.', },
                    ],
                },
                {
                    name: 'Source',
                    controls: [
                        { name: 'Signal / Auto-detect', desc: 'Assigns the single time-domain channel to analyse. Auto-detect chooses a suitable non-time channel when possible.', },
                        { name: 'Sample Rate', desc: 'A read-only value from MPAI metadata. A rate fs produces a Nyquist limit of fs/2; it is not an editable resampling control.', },
                    ],
                },
                {
                    name: 'Spectrum',
                    controls: [
                        { name: 'Mode', desc: 'FFT (amplitude, default) is for tones, harmonics and phase; Welch PSD is for stationary broadband/random energy per hertz; Spectrogram (STFT) shows when spectral components appear or disappear.', },
                        { name: 'Window', desc: 'Hann is the balanced default. Rectangular is suitable only for coherent, exactly periodic blocks. Blackman families suppress sidelobes with wider peaks; Flat-Top favours a broad, flat peak region. Current results should not be treated as calibrated absolute-amplitude measurements.', },
                        { name: 'β / σ / α', desc: 'A conditional shape input for Kaiser (β 0.01–50, default 14), Gaussian (σ 0.01–5, default 0.4) or Tukey (α 0–1, default 0.5). Stronger taper generally reduces leakage but broadens peaks.', },
                        { name: 'Block / Lines', desc: 'Sets samples per transform from 256 to 131072; the default is 4096. Larger N gives smaller bin spacing Δf = fs/N but needs a longer approximately stationary interval. Auto uses the full selected range for FFT, while Welch and STFT use 4096-sample segments.', },
                        { name: 'Frequency Band — Min / Max', desc: 'Sets the visible x-range of Spectrum, PSD and Phase and bounds the optional octave calculation. Both default to 0 Hz; Max = 0 means Nyquist. This does not band-pass the signal or limit peak and summary-metric searches.', },
                    ],
                },
                {
                    name: 'Averaging',
                    controls: [
                        { name: 'Mode', desc: 'None (default) uses one block. In FFT mode, Linear steadies repeated blocks, Exponential favours recent blocks and Peak Hold keeps the largest value seen in every bin. Welch uses its own linear periodogram average.', },
                        { name: 'Averages', desc: 'The number of blocks combined, from 1 to 1000 (default 10 when averaging is enabled). More blocks reduce random variation but cover more time and can mix changing operating states.', },
                        { name: 'Overlap', desc: 'Choose 0, 25, 50, 67, 75 or 87.5%; the default is 50%. With block N and overlap r, the hop is approximately N(1−r). Overlap improves time coverage efficiency and raises compute cost, not fundamental bin spacing.', },
                        { name: 'Exp. α', desc: 'Visible only for Exponential averaging; range 0.01–1, default 0.1. Small α is smoother and slower; large α follows change faster.', },
                    ],
                },
                {
                    name: 'Post-proc',
                    controls: [
                        { name: 'Y Axis', desc: 'Switches the Spectrum tab between Magnitude (dB, default) and Magnitude (linear) in engineering units. PSD and Phase keep their own dedicated tabs.', },
                        { name: 'Weighting', desc: 'None (Z, default) is flat and is the usual engineering/vibration choice. A, B and C apply acoustic-style frequency weighting to dB results; they do not calibrate an uncalibrated sensor or alter the linear-magnitude view.', },
                        { name: 'Integration', desc: 'None (acceleration, default) keeps the source; Single converts to velocity and Double to displacement in the frequency domain. This is meaningful only for calibrated acceleration. DC is suppressed, and low-frequency bias/noise can be strongly magnified.', },
                        { name: 'Octave overlay', desc: 'Off is the default; 1/1, 1/3, 1/12 or 1/24 overlays separate, unweighted octave-band power on the narrowband result. It is not smoothing of the displayed spectrum.', },
                    ],
                },
                {
                    name: 'Markers',
                    controls: [
                        { name: 'Max Peaks / Min Magnitude', desc: 'Lists up to 1–100 peaks (default 20) and rejects local maxima below −200…200 dB (default −80 dB). Accepted peaks receive three-bin parabolic refinement.', },
                        { name: 'Harmonic f0 / Harmonics', desc: 'f0 = 0 disables the comb; otherwise it draws f0, 2f0, 3f0 onward, with 1–50 lines (default 8). For a shaft, f0 can be RPM/60. These visual guides do not change FFT values, peaks or THD.', },
                        { name: 'Sideband Δf', desc: 'Δf = 0 disables the overlay; otherwise it draws symmetric spacing markers around the strongest detected peak to inspect modulation families. It is not a sideband-energy calculation.', },
                    ],
                },
                {
                    name: 'Compare and Results',
                    controls: [
                        { name: 'Capture current as Reference A', desc: 'Freezes the current Spectrum trace and its analysed range as baseline A. Move the time cursors to another state; Current B is recomputed and overlaid on the Spectrum tab.', },
                        { name: 'Clear Reference A', desc: 'Removes the frozen overlay. Comparison is visual; the widget does not create a numeric A−B channel.', },
                        { name: 'Results readouts', desc: 'Shows Peak Frequency, Peak Magnitude, Resolution (Δf), Averages, THD, SINAD, SNR and Overall RMS when the selected mode produces those metrics. A dash means the metric is not applicable or not produced.', },
                    ],
                },
            ],
            formulas: [
                {
                    title: 'Windowed discrete Fourier transform',
                    latex: 'X[k]=\\sum_{n=0}^{N-1}x[n]w[n]e^{-j2\\pi kn/N}',
                    expr: 'X[k] = Σ x[n]w[n]e^(−j2πkn/N)',
                    where: 'x[n] is the selected signal, w[n] is the window, N is block length and k is the frequency-bin index. A real signal produces a one-sided result from DC through Nyquist.',
                },
                {
                    title: 'Frequency axis, bin spacing and block duration',
                    latex: 'f_k=\\frac{k f_s}{N},\\qquad \\Delta f=\\frac{f_s}{N},\\qquad T_{block}=\\frac{N}{f_s},\\qquad f_{Nyquist}=\\frac{f_s}{2}',
                    expr: 'fk = k·fs/N; Δf = fs/N; Tblock = N/fs; fNyquist = fs/2',
                    where: 'Smaller Δf separates bins more finely, but zero-padding alone does not add physical information or guarantee that two close tones can be resolved.',
                },
                {
                    title: 'Amplitude dB and power dB',
                    latex: 'L_A=20\\log_{10}\\!\\left(\\frac{A}{A_{ref}}\\right),\\qquad L_P=10\\log_{10}\\!\\left(\\frac{P}{P_{ref}}\\right)',
                    expr: 'LA = 20 log10(A/Aref); LP = 10 log10(P/Pref)',
                    where: 'The widget uses reference 1. Therefore dB means relative to one engineering unit; it is not automatically dB SPL, dBV or another calibrated standard level.',
                },
                {
                    title: 'Welch power spectral density',
                    latex: 'P_{xx}[k]=\\frac{1}{K}\\sum_{m=1}^{K}\\frac{|\\operatorname{FFT}\\{x_m[n]w[n]\\}|^2}{f_s\\sum_n w^2[n]}',
                    expr: 'Pxx[k] = mean(periodogramm[k]) / (fs·Σw²)',
                    where: 'The positive-frequency interior bins use one-sided scaling. PSD has units U²/Hz, ASD is √PSD in U/√Hz, and Welch RMS is estimated from √(Σ Pxx[k]Δf).',
                },
                {
                    title: 'Short-time Fourier transform',
                    latex: 'X[m,k]=\\sum_n x[n+mH]w[n]e^{-j2\\pi kn/N},\\qquad H\\approx N(1-r)',
                    expr: 'X[m,k] = FFT of frame m; hop H ≈ N(1−overlap)',
                    where: 'A larger N improves frequency-bin spacing but weakens time localization. More overlap makes time frames denser and costs more computation.',
                },
                {
                    title: 'Frequency-domain integration',
                    latex: 'Y_q(f)=\\frac{X(f)}{(j2\\pi f)^q},\\qquad |Y_q(f)|=\\frac{|X(f)|}{(2\\pi f)^q}',
                    expr: 'Yq(f) = X(f)/(j2πf)^q',
                    where: 'q = 1 gives velocity and q = 2 gives displacement for an acceleration input; phase shifts by −q·90°. The DC bin is set to zero.',
                },
                {
                    title: 'Total harmonic distortion indicator',
                    latex: '\\operatorname{THD}(\\%)\\approx100\\frac{\\sqrt{\\sum_{h=2}^{11}A_h^2}}{A_1}',
                    expr: 'THD% ≈ 100·sqrt(Σh=2..11 Ah²)/A1',
                    where: 'The strongest accepted peak is treated as the fundamental and nearby harmonic bins are sampled. This is a fast diagnostic indicator, not a leakage-robust standards-compliance measurement.',
                },
            ],
            assumptions: [
                { name: 'Sampling must be uniform and anti-aliased', desc: 'Content above fs/2 aliases into the measured band. FFT cannot undo aliasing that already occurred during acquisition.', },
                { name: 'Choose a locally meaningful time range', desc: 'A spectrum describes only the samples actually analysed. Use a steady range for FFT/Welch; use Spectrogram when the event changes inside the selection.', },
                { name: 'Fixed blocks start at the left cursor', desc: 'With fixed N and multiple averages, the widget consumes only N plus the requested average hops from the left boundary; the right cursor is an upper limit. Check the reported samples-used value.', },
                { name: 'Window choice is a trade-off', desc: 'Leakage suppression, peak width and amplitude behaviour cannot all be optimized at once. Avoid claiming calibrated absolute amplitude from the current windowed FFT path.', },
                { name: 'Display band is not a filter', desc: 'Frequency Min/Max changes the visible range and octave bounds. Peaks and summary metrics may still come from anywhere up to Nyquist.', },
                { name: 'Summary metrics are diagnostic', desc: 'THD, SINAD and SNR use the strongest peak and bin-based energy estimates. Confirm critical acceptance decisions with the relevant standard and a controlled measurement setup.', },
                { name: 'FFT is not FRF', desc: 'A single-channel peak cannot distinguish strong excitation from a structural transfer amplification. Use Cross Spectrum / FRF for synchronized input–output response and coherence; use Modal Analysis for poles, damping and mode shapes.', },
            ],
            steps: [
                {
                    step: 'Connect the source and verify sample rate',
                    detail: 'Connect a File Reader/MPAI source, choose Signal and confirm the read-only sample rate is correct.',
                },
                {
                    step: 'Bound one operating state',
                    detail: 'Use the dual time cursors to isolate a steady run, event or test phase. The signal can contain different dominant frequencies in different ranges.',
                },
                {
                    step: 'Choose the mode',
                    detail: 'Use FFT for tones/harmonics, Welch PSD for stationary random or broadband density, and Spectrogram for time-varying content.',
                },
                {
                    step: 'Set resolution and leakage control',
                    detail: 'Choose N from the needed Δf and available stationary duration, then select a window. Hann and 50% overlap are a practical starting point.',
                },
                {
                    step: 'Configure averaging and post-processing',
                    detail: 'Apply FFT averaging to match steady, changing or intermittent behaviour. Keep Z weighting for unweighted engineering spectra; integrate only calibrated acceleration with appropriate low-frequency preparation.',
                },
                {
                    step: 'Add diagnostic guides',
                    detail: 'Set the peak threshold, harmonic f0 and sideband spacing. Remember that harmonic and sideband controls draw guides; they do not change the calculation.',
                },
                {
                    step: 'Compute and read the mode-relevant tab',
                    detail: 'Interpret Spectrum/Phase/Peaks for FFT, PSD for Welch and the time–frequency heatmap for Spectrogram. Use the status and Results page to verify actual samples, Δf and metrics.',
                },
                {
                    step: 'Compare two cursor ranges',
                    detail: 'Compute a baseline, capture Reference A, move the cursors and let Current B recompute. Read the two overlaid Spectrum traces as operating-state context changes.',
                },
            ],
            exampleMetrics: [
                {
                    value: 'fs = 4096 Hz',
                    label: 'Nyquist = 2048 Hz',
                    desc: 'No uniquely interpretable frequency content exists above 2048 Hz at this sample rate.',
                },
                {
                    value: 'N = 4096',
                    label: 'Δf = 1 Hz; block = 1 s',
                    desc: 'A 30 Hz component lands near bin 30. A larger N makes bins closer but requires a longer locally stationary range.',
                },
                {
                    value: '10 averages · 50% overlap',
                    label: '22,528 samples ≈ 5.5 s',
                    desc: 'That is the fixed-block source budget at fs = 4096 Hz: N + 9·N/2, beginning at the left cursor.',
                },
                {
                    value: '30 Hz → 75 Hz',
                    label: 'Cursor-dependent dominant peak',
                    desc: 'If the recording changes operating state, moving the cursor range can intentionally move the strongest peak. That is evidence about the selected state, not an FFT inconsistency.',
                },
            ],
            outputs: [
                { name: 'Spectrum, Phase and Peaks views', desc: 'One-sided frequency results with dB/linear magnitude, phase, refined peak table and optional harmonic, sideband, octave and Reference A overlays.', },
                { name: 'Welch PSD view', desc: 'Linearly averaged, window-normalized power spectral density for stationary random/broadband interpretation, plus ASD in the transient Arrow result.', },
                { name: 'Spectrogram view', desc: 'A bounded time × frequency magnitude-dB heatmap. It is a transient visualization and is not persisted as a derived MPAI channel.', },
                { name: 'fft_result output port', desc: 'An Arrow table carrying the available frequency, magnitude, PSD and phase columns for downstream widgets.', },
                { name: 'metrics_trend output port', desc: 'A one-row Arrow table with peak_freq_hz, rms_db, thd_pct and freq_resolution for trends or summaries.', },
                { name: 'Optional MPAI derived channels', desc: 'Compute is transient and the FFT panel has no per-widget Save button. If accepted through the shared save flow, FFT magnitude/PSD/phase or Welch PSD are written inside the source MPAI; Spectrogram remains transient.', },
            ],
        },
        tr: {
            tagline:
                'Tek bir zaman kanalı ölçümünü açıklanabilir bir frekans görünümüne dönüştürün; seçilen zaman aralığı, blok, pencere ve ortalamanın sonucu nasıl değiştirdiğini görün.',
            intro:
                'FFT / Spektrum “bu sinyalde hangi frekanslar var?” sorusunu yanıtlar. Genlik FFT’si ile kararlı tonları ve harmonikleri, Welch PSD ile durağan rastgele enerjinin frekans başına yoğunluğunu, STFT spektrogramı ile zaman içinde değişen frekans içeriğini gösterir. Hesap, bağlı MPAI konteynerinden yalnız seçili pencereyi okur ve arka planda C++ FFT motorunda çalışır. Bu tek-kanallı bir içerik analizidir: giriş–çıkış transferi, koherans ve FRF için Çapraz Spektrum / FRF; kutuplar, sönüm ve mod şekilleri için Modal Analiz kullanılmalıdır.',
            inputs: [
                { name: 'Bağlı bir MPAI zaman sinyali', desc: 'Signal seçicisi bağlı kaynaktaki zaman dışı kanalları listeler. Motor, kaydın tamamını belleğe yüklemek yerine seçilen dilimi etkin MPAI okuyucusundan doğrudan okur.', },
                { name: 'Örnekleme hızı meta verisi', desc: 'Sample Rate salt okunurdur ve MPAI meta verisinden gelir. Nyquist sınırını ve frekans bin aralığını belirler; eksikse widget tahmin etmek yerine hata verir.', },
                { name: 'Çift imleçli zaman aralığı', desc: 'Genel bakıştaki iki imleç analiz edilecek çalışma durumunu sınırlar. İlk sonuçtan sonra imleç bırakıldığında spektrum yeni aralık için otomatik yeniden hesaplanır.', },
            ],
            controlGroups: [
                {
                    name: 'Araç çubuğu, zaman gezgini ve Compute',
                    desc: 'Üst sıra aynı anda bir ayar sayfasını açar; etkin sayfaya tekrar basmak sol paneli kapatır.',
                    controls: [
                        { name: 'Source · Spectrum · Averaging · Post-proc · Markers · Compare · Results', desc: 'Bu butonlar yalnız görünen ayar sayfasını değiştirir; tek başına hesap başlatmaz.', },
                        { name: 'Genel bakış sinyali ve iki zaman imleci', desc: 'Genel bakışta kullanılacak kanalı seçin, sonra sol ve sağ sınırları olayın veya kararlı çalışma durumunun çevresine sürükleyin. Compute sonrasında gösterilen kullanılan örnek sayısı gerçek hesap kapsamıdır.', },
                        { name: '▶ Compute / Computing…', desc: 'Seçili analizi arka planda başlatır. Çalışırken buton devre dışıdır; ilerleme gösterilir ve ortak ilerleme katmanı Cancel olanağı sunar.', },
                    ],
                },
                {
                    name: 'Source',
                    controls: [
                        { name: 'Signal / Auto-detect', desc: 'Analiz edilecek tek zaman kanalını atar. Auto-detect mümkün olduğunda uygun bir zaman dışı kanal seçer.', },
                        { name: 'Sample Rate', desc: 'MPAI meta verisinden gelen salt okunur değerdir. fs hızı fs/2 Nyquist sınırı üretir; bu alan bir yeniden örnekleme kontrolü değildir.', },
                    ],
                },
                {
                    name: 'Spectrum',
                    controls: [
                        { name: 'Mode', desc: 'FFT (amplitude, varsayılan) tonlar, harmonikler ve faz için; Welch PSD durağan geniş bant/rastgele enerjinin hertz başına yoğunluğu için; Spectrogram (STFT) bileşenlerin ne zaman ortaya çıkıp kaybolduğunu görmek içindir.', },
                        { name: 'Window', desc: 'Hann dengeli varsayılandır. Rectangular yalnız koherent ve blok içinde tam periyodik kayıtlar için uygundur. Blackman ailesi daha geniş tepeler karşılığında yan lobları bastırır; Flat-Top tepe çevresini geniş ve düz tutar. Mevcut sonuçlar kalibre mutlak-genlik ölçümü olarak değerlendirilmemelidir.', },
                        { name: 'β / σ / α', desc: 'Kaiser (β 0,01–50; varsayılan 14), Gaussian (σ 0,01–5; varsayılan 0,4) veya Tukey (α 0–1; varsayılan 0,5) için koşullu girdidir. Daha kuvvetli taper genellikle sızıntıyı azaltır fakat tepeleri genişletir.', },
                        { name: 'Block / Lines', desc: 'Dönüşüm başına örnek sayısını 256–131072 arasında belirler; varsayılan 4096’dır. Daha büyük N, Δf = fs/N bin aralığını küçültür fakat daha uzun ve yaklaşık durağan aralık ister. Auto, FFT’de seçimin tamamını; Welch ve STFT’de 4096 örneklik segmentleri kullanır.', },
                        { name: 'Frequency Band — Min / Max', desc: 'Spectrum, PSD ve Phase görünür x aralığını ve isteğe bağlı oktav hesabının sınırlarını belirler. İkisi de varsayılan 0 Hz’dir; Max = 0 Nyquist demektir. Sinyali filtrelemez, tepe ve özet metrik aramasını sınırlamaz.', },
                    ],
                },
                {
                    name: 'Averaging',
                    controls: [
                        { name: 'Mode', desc: 'None (varsayılan) tek blok kullanır. FFT modunda Linear tekrarlı blokları kararlılaştırır, Exponential yeni bloklara ağırlık verir, Peak Hold her binde görülen en büyük değeri tutar. Welch kendi doğrusal periodogram ortalamasını kullanır.', },
                        { name: 'Averages', desc: 'Birleştirilen blok sayısıdır; 1–1000 arasındadır (ortalama etkinse varsayılan 10). Daha fazla blok rastgele değişimi azaltır fakat daha uzun zamanı kapsar ve değişen durumları karıştırabilir.', },
                        { name: 'Overlap', desc: '%0, %25, %50, %67, %75 veya %87,5 seçilir; varsayılan %50’dir. Blok N ve örtüşme r iken adım yaklaşık N(1−r)’dir. Örtüşme bin aralığını değil zaman kapsama verimini ve hesap yükünü artırır.', },
                        { name: 'Exp. α', desc: 'Yalnız Exponential ortalamada görünür; aralık 0,01–1, varsayılan 0,1’dir. Küçük α daha yumuşak ve yavaş, büyük α değişime daha hızlı tepki verir.', },
                    ],
                },
                {
                    name: 'Post-proc',
                    controls: [
                        { name: 'Y Axis', desc: 'Spectrum sekmesini Magnitude (dB, varsayılan) ile doğrusal mühendislik-birimi genliği arasında değiştirir. PSD ve Phase kendi özel sekmelerinde kalır.', },
                        { name: 'Weighting', desc: 'None (Z, varsayılan) düzdür ve mühendislik/titreşim spektrumları için olağan seçimdir. A, B ve C dB sonuçlarına akustik tipte ağırlık uygular; sensörü kalibre etmez veya doğrusal genlik görünümünü değiştirmez.', },
                        { name: 'Integration', desc: 'None (acceleration, varsayılan) kaynağı korur; Single hıza, Double yer değiştirmeye dönüştürür. Yalnız kalibre ivme için anlamlıdır. DC bastırılır; düşük frekans bias’ı ve gürültüsü kuvvetle büyüyebilir.', },
                        { name: 'Octave overlay', desc: 'Varsayılan Off’tur; 1/1, 1/3, 1/12 veya 1/24 ayrı ve ağırlıksız oktav-bant gücünü dar bant sonucuna bindirir. Gösterilen spektrumun yumuşatılması değildir.', },
                    ],
                },
                {
                    name: 'Markers',
                    controls: [
                        { name: 'Max Peaks / Min Magnitude', desc: '1–100 tepe listeler (varsayılan 20) ve −200…200 dB eşiğinin (varsayılan −80 dB) altındaki yerel maksimumları reddeder. Kabul edilen tepelere üç-bin parabolik iyileştirme uygulanır.', },
                        { name: 'Harmonic f0 / Harmonics', desc: 'f0 = 0 tarağı kapatır; diğer değerler f0, 2f0, 3f0 devamını 1–50 çizgiyle (varsayılan 8) gösterir. Mil için f0 = RPM/60 olabilir. Bu kılavuzlar FFT’yi, tepeleri veya THD’yi değiştirmez.', },
                        { name: 'Sideband Δf', desc: 'Δf = 0 bindirmeyi kapatır; diğer değerler en güçlü tepenin çevresine simetrik aralık işaretleri çizer. Bir yan-bant enerji hesabı değildir.', },
                    ],
                },
                {
                    name: 'Compare ve Results',
                    controls: [
                        { name: 'Capture current as Reference A', desc: 'Mevcut Spectrum eğrisini ve analiz aralığını A referansı olarak dondurur. Zaman imleçlerini başka duruma taşıdığınızda Current B yeniden hesaplanır ve Spectrum sekmesine bindirilir.', },
                        { name: 'Clear Reference A', desc: 'Dondurulmuş eğriyi kaldırır. Karşılaştırma görseldir; widget sayısal A−B kanalı üretmez.', },
                        { name: 'Results değerleri', desc: 'Seçili mod üretiyorsa Peak Frequency, Peak Magnitude, Resolution (Δf), Averages, THD, SINAD, SNR ve Overall RMS gösterilir. Tire işareti, metriğin uygulanmadığı veya üretilmediği anlamına gelir.', },
                    ],
                },
            ],
            formulas: [
                {
                    title: 'Pencereli ayrık Fourier dönüşümü',
                    latex: 'X[k]=\\sum_{n=0}^{N-1}x[n]w[n]e^{-j2\\pi kn/N}',
                    expr: 'X[k] = Σ x[n]w[n]e^(−j2πkn/N)',
                    where: 'x[n] seçilen sinyal, w[n] pencere, N blok uzunluğu ve k frekans-bin indeksidir. Gerçek bir sinyal DC’den Nyquist’e tek taraflı sonuç üretir.',
                },
                {
                    title: 'Frekans ekseni, bin aralığı ve blok süresi',
                    latex: 'f_k=\\frac{k f_s}{N},\\qquad \\Delta f=\\frac{f_s}{N},\\qquad T_{blok}=\\frac{N}{f_s},\\qquad f_{Nyquist}=\\frac{f_s}{2}',
                    expr: 'fk = k·fs/N; Δf = fs/N; Tblok = N/fs; fNyquist = fs/2',
                    where: 'Küçük Δf binleri sıklaştırır; ancak yalnız sıfır doldurma fiziksel bilgi eklemez ve iki yakın tonun ayrılmasını garanti etmez.',
                },
                {
                    title: 'Genlik dB ve güç dB',
                    latex: 'L_A=20\\log_{10}\\!\\left(\\frac{A}{A_{ref}}\\right),\\qquad L_P=10\\log_{10}\\!\\left(\\frac{P}{P_{ref}}\\right)',
                    expr: 'LA = 20 log10(A/Aref); LP = 10 log10(P/Pref)',
                    where: 'Widget referans 1 kullanır. Bu nedenle dB, bir mühendislik birimine göredir; otomatik olarak dB SPL, dBV veya başka kalibre standart seviye değildir.',
                },
                {
                    title: 'Welch güç spektral yoğunluğu',
                    latex: 'P_{xx}[k]=\\frac{1}{K}\\sum_{m=1}^{K}\\frac{|\\operatorname{FFT}\\{x_m[n]w[n]\\}|^2}{f_s\\sum_n w^2[n]}',
                    expr: 'Pxx[k] = periodogramların ortalaması / (fs·Σw²)',
                    where: 'Pozitif-frekans iç binleri tek taraflı ölçek kullanır. PSD birimi U²/Hz, ASD birimi U/√Hz’dir; Welch RMS yaklaşık √(Σ Pxx[k]Δf) ile bulunur.',
                },
                {
                    title: 'Kısa-zamanlı Fourier dönüşümü',
                    latex: 'X[m,k]=\\sum_n x[n+mH]w[n]e^{-j2\\pi kn/N},\\qquad H\\approx N(1-r)',
                    expr: 'X[m,k] = m karesinin FFT’si; adım H ≈ N(1−örtüşme)',
                    where: 'Büyük N frekans bin aralığını iyileştirir fakat zaman yerelleştirmesini zayıflatır. Daha fazla örtüşme zaman karelerini sıklaştırır ve hesap maliyetini artırır.',
                },
                {
                    title: 'Frekans bölgesinde entegrasyon',
                    latex: 'Y_q(f)=\\frac{X(f)}{(j2\\pi f)^q},\\qquad |Y_q(f)|=\\frac{|X(f)|}{(2\\pi f)^q}',
                    expr: 'Yq(f) = X(f)/(j2πf)^q',
                    where: 'İvme girişi için q = 1 hız, q = 2 yer değiştirme verir; faz −q·90° kayar. DC bini sıfırlanır.',
                },
                {
                    title: 'Toplam harmonik bozulma göstergesi',
                    latex: '\\operatorname{THD}(\\%)\\approx100\\frac{\\sqrt{\\sum_{h=2}^{11}A_h^2}}{A_1}',
                    expr: 'THD% ≈ 100·sqrt(Σh=2..11 Ah²)/A1',
                    where: 'En güçlü kabul edilen tepe temel bileşen sayılır ve yakın harmonik binleri örneklenir. Bu hızlı bir tanı göstergesidir; sızıntıya dayanıklı standart-uygunluk ölçümü değildir.',
                },
            ],
            assumptions: [
                { name: 'Örnekleme eşit aralıklı ve anti-alias korumalı olmalıdır', desc: 'fs/2 üzerindeki içerik ölçülen banda alias olur. FFT, veri toplama sırasında oluşmuş aliasing’i sonradan geri alamaz.', },
                { name: 'Yerel olarak anlamlı zaman aralığı seçin', desc: 'Spektrum yalnız gerçekten analiz edilen örnekleri anlatır. FFT/Welch için kararlı aralık, seçim içinde değişen olay için Spectrogram kullanın.', },
                { name: 'Sabit blok sol imleçten başlar', desc: 'Sabit N ve çoklu ortalamada widget sol sınırdan yalnız N artı istenen ortalama adımlarını tüketir; sağ imleç üst sınırdır. Bildirilen kullanılan örnek değerini kontrol edin.', },
                { name: 'Pencere seçimi ödünleşmedir', desc: 'Sızıntı bastırma, tepe genişliği ve genlik davranışı aynı anda en iyi yapılamaz. Mevcut pencereli FFT yolundan kalibre mutlak genlik sonucu vaat etmeyin.', },
                { name: 'Görünüm bandı filtre değildir', desc: 'Frequency Min/Max görünür aralığı ve oktav sınırını değiştirir. Tepeler ve özet metrikler yine Nyquist’e kadar tüm banttan gelebilir.', },
                { name: 'Özet metrikler tanısaldır', desc: 'THD, SINAD ve SNR en güçlü tepeyi ve bin tabanlı enerji tahminlerini kullanır. Kritik kabul kararlarını ilgili standart ve kontrollü ölçüm düzeniyle doğrulayın.', },
                { name: 'FFT, FRF değildir', desc: 'Tek-kanal tepesi güçlü uyarmayı yapısal transfer büyütmesinden ayıramaz. Senkron giriş–çıkış tepkisi ve koherans için Çapraz Spektrum / FRF; kutup, sönüm ve mod şekli için Modal Analiz kullanın.', },
            ],
            steps: [
                {
                    step: 'Kaynağı bağlayın ve örnekleme hızını doğrulayın',
                    detail: 'File Reader/MPAI kaynağını bağlayın, Signal kanalını seçin ve salt okunur örnekleme hızının doğru olduğunu kontrol edin.',
                },
                {
                    step: 'Tek çalışma durumunu sınırlandırın',
                    detail: 'Çift zaman imleciyle kararlı koşuyu, olayı veya test fazını ayırın. Sinyal farklı aralıklarda farklı baskın frekanslar taşıyabilir.',
                },
                {
                    step: 'Modu seçin',
                    detail: 'Ton/harmonikler için FFT, durağan rastgele veya geniş bant yoğunluğu için Welch PSD, zamanla değişen içerik için Spectrogram kullanın.',
                },
                {
                    step: 'Çözünürlüğü ve sızıntı kontrolünü ayarlayın',
                    detail: 'N’yi gereken Δf ve mevcut durağan süreye göre seçin, ardından pencereyi belirleyin. Hann ve %50 örtüşme pratik başlangıçtır.',
                },
                {
                    step: 'Ortalama ve son işlemi yapılandırın',
                    detail: 'FFT ortalamasını kararlı, değişen veya aralıklı davranışa göre seçin. Ağırlıksız mühendislik spektrumu için Z kullanın; yalnız kalibre ivmeyi uygun düşük-frekans hazırlığıyla entegre edin.',
                },
                {
                    step: 'Tanı kılavuzlarını ekleyin',
                    detail: 'Tepe eşiği, harmonik f0 ve yan-bant aralığını ayarlayın. Harmonik ve yan-bant kontrollerinin hesabı değil çizimleri değiştirdiğini unutmayın.',
                },
                {
                    step: 'Compute deyin ve moda uygun sekmeyi okuyun',
                    detail: 'FFT için Spectrum/Phase/Peaks, Welch için PSD, Spectrogram için zaman–frekans ısı haritasını yorumlayın. Gerçek örnek kapsamını, Δf’yi ve metrikleri durum/Results alanından doğrulayın.',
                },
                {
                    step: 'İki imleç aralığını karşılaştırın',
                    detail: 'Bir referans hesaplayıp Reference A olarak yakalayın; imleçleri yeni duruma taşıyın ve Current B’nin yeniden hesaplanmasını bekleyin. İki Spectrum eğrisini çalışma-durumu bağlamında okuyun.',
                },
            ],
            exampleMetrics: [
                {
                    value: 'fs = 4096 Hz',
                    label: 'Nyquist = 2048 Hz',
                    desc: 'Bu örnekleme hızında 2048 Hz üzerindeki içerik benzersiz biçimde yorumlanamaz.',
                },
                {
                    value: 'N = 4096',
                    label: 'Δf = 1 Hz; blok = 1 s',
                    desc: '30 Hz bileşeni yaklaşık 30. bine düşer. Büyük N binleri yakınlaştırır fakat daha uzun, yerel olarak durağan aralık ister.',
                },
                {
                    value: '10 ortalama · %50 örtüşme',
                    label: '22.528 örnek ≈ 5,5 s',
                    desc: 'fs = 4096 Hz için sabit-blok kaynak bütçesidir: sol imleçten başlayan N + 9·N/2.',
                },
                {
                    value: '30 Hz → 75 Hz',
                    label: 'İmleç aralığına bağlı baskın tepe',
                    desc: 'Kayıt çalışma durumu değiştiriyorsa zaman aralığını taşımak en güçlü tepeyi bilinçli olarak değiştirebilir. Bu FFT tutarsızlığı değil, seçilen durum hakkında bilgidir.',
                },
            ],
            outputs: [
                { name: 'Spectrum, Phase ve Peaks görünümleri', desc: 'dB/doğrusal genlik, faz, iyileştirilmiş tepe tablosu ve isteğe bağlı harmonik, yan-bant, oktav ve Reference A bindirmeleriyle tek taraflı frekans sonuçları.', },
                { name: 'Welch PSD görünümü', desc: 'Durağan rastgele/geniş bant yorumu için doğrusal ortalanmış ve pencereye göre normalize edilmiş güç spektral yoğunluğu; geçici Arrow sonucunda ayrıca ASD.', },
                { name: 'Spectrogram görünümü', desc: 'Sınırlandırılmış zaman × frekans genlik-dB ısı haritası. Geçici bir görselleştirmedir ve türetilmiş MPAI kanalı olarak kaydedilmez.', },
                { name: 'fft_result çıkış portu', desc: 'Sonraki widgetlar için mevcut frekans, genlik, PSD ve faz sütunlarını taşıyan Arrow tablosu.', },
                { name: 'metrics_trend çıkış portu', desc: 'Trend veya özet için peak_freq_hz, rms_db, thd_pct ve freq_resolution içeren tek satırlık Arrow tablosu.', },
                { name: 'İsteğe bağlı MPAI türetilmiş kanalları', desc: 'Compute sonucu geçicidir ve FFT panelinde widgeta özel Save butonu yoktur. Ortak kayıt akışında kabul edilirse FFT genlik/PSD/faz veya Welch PSD kaynak MPAI içine yazılır; Spectrogram geçici kalır.', },
            ],
        },
    },
}

export default FFT_WIDGET_DETAILS
