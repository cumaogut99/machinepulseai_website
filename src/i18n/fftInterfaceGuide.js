const FFT_INTERFACE_GUIDE = {
    en: {
        title: 'Tour the current interface, one real state at a time',
        intro:
            'The FFT window cannot show every panel at once. Use the three views below exactly as you would use the application: configure the calculation and channels, inspect markers and detected peaks, then compare channels or operating states.',
        imageCaption:
            'Captured from the current MachinePulseAI FFT / Spectrum panel in Space theme. The curves use a deterministic training result so every control remains readable.',
        viewHint: 'Choose an application state',
        selectHint:
            'Select a numbered region on the screenshot. The explanation tells you what the control changes, what it does not change, and what a new engineer should verify.',
        controlsLabel: 'Controls in this region',
        views: [
            {
                id: 'settings',
                tab: 'FFT Settings + Channels',
                title: 'Build the analysis recipe and choose its evidence',
                imageAlt:
                    'MachinePulseAI FFT Settings page with Space theme, two-channel spectrum and Channels panel',
                points: [
                    {
                        title: 'Input defines which samples the spectrum describes',
                        kicker: 'Left panel · Input',
                        description:
                            'Sample Rate is read-only metadata from the MPAI source: it fixes Nyquist at fs/2 and feeds the bin spacing Δf = fs/N. The navigator mode button switches between a dual-boundary range and a single sliding FFT window, and Channel picks the trace drawn in the navigator so the cursors can be placed on the event you actually mean.',
                        check:
                            'A mathematically correct FFT of a mixed speed or load state is still an unusable engineering answer. Bound one operating state before anything else.',
                    },
                    {
                        title: 'Spectrum chooses the estimator and defines one block',
                        kicker: 'Left panel · Spectrum',
                        description:
                            'Mode selects amplitude FFT, Welch PSD or the STFT spectrogram. Window controls how the finite block’s ends are tapered, trading leakage against peak width and amplitude accuracy. Block / Lines sets N, and N alone fixes both the bin spacing Δf = fs/N and the evidence duration N/fs.',
                        check:
                            'Choose N from two directions at once: the smallest frequency separation the decision must distinguish, and the longest interval that actually stays stationary.',
                    },
                    {
                        title: 'Frequency Band changes the view, not the signal',
                        kicker: 'Left panel · Frequency Band',
                        description:
                            'Min and Max bound the visible x-range of Spectrum, PSD and Phase and limit the optional octave calculation. Both default to 0 Hz, and Max = 0 means Nyquist. Nothing is filtered out of the data: peak detection and the summary metrics still see the full band up to Nyquist.',
                        check:
                            'If a peak disappears after you narrow this band, it was hidden from the plot — not removed from the calculation.',
                    },
                    {
                        title: 'Block Processing decides how repeated blocks combine',
                        kicker: 'Left panel · Block Processing',
                        description:
                            'None transforms a single block and keeps its instantaneous detail. Linear gives several blocks equal weight and steadies random variation, Exponential weights recent blocks more, and Max Hold keeps the largest value ever seen in each bin. Blocks and Overlap set how much source time the recipe consumes: N + (Blocks−1)·hop, with hop ≈ N(1−overlap).',
                        check:
                            'Averaging is valid only while the combined blocks describe the same process. If speed or load moves across the averaged span, the average describes no real operating point.',
                    },
                    {
                        title: 'Post-processing changes presentation, not the transform',
                        kicker: 'Left panel · Post-processing',
                        description:
                            'Y Axis switches between linear magnitude, logarithmic magnitude and dB. Weighting applies A/B/C acoustic emphasis in the dB domain. Integration divides by frequency to convert calibrated acceleration into velocity or displacement. The octave overlay summarizes band power on top of the narrowband result. These settings repaint cached output instead of recomputing the FFT.',
                        check:
                            'dB here is relative to one engineering unit. It is not automatically dB SPL or dBV, and no presentation setting can calibrate an uncalibrated channel.',
                    },
                    {
                        title: 'Spectrum, PSD, Phase and STFT are result views',
                        kicker: 'Top center',
                        description:
                            'These buttons switch the center display and do not start a calculation. Spectrum shows magnitude, PSD shows power per hertz and Phase shows angular timing. If no STFT result exists, STFT prepares Spectrogram mode and opens its setup; choose one channel and press Compute to produce the time–frequency map.',
                        check:
                            'Do not compare a PSD value directly with amplitude magnitude: their physical meaning and units are different.',
                    },
                    {
                        title: 'Channels decides which signals are transformed',
                        kicker: 'Right panel',
                        description:
                            'Every checked signal is analysed with the same recipe and overlaid using a separate color. This makes two sensor locations or directions easy to compare without changing settings between runs. Spectrogram is intentionally restricted to one channel because a time–frequency matrix is much larger than a line spectrum.',
                        check:
                            'The Channel field on the left selects the navigator trace; the checked items here select the channels sent to the FFT calculation.',
                    },
                    {
                        title: 'Compute runs the recipe; the status proves its scope',
                        kicker: 'Bottom left',
                        description:
                            'Compute sends the selected channel set, cursor range and settings to the background C++ engine. The status line reports completion, channel count, dominant peak, resolution and averages. With a fixed block, the analysed span can be shorter than a wider cursor selection, so the samples-used message is part of the result.',
                        check:
                            'Never assume the entire highlighted range was transformed; verify the analysed sample count and Δf after Compute.',
                    },
                ],
            },
            {
                id: 'markers',
                tab: 'Markers + Peaks',
                title: 'Turn spectral lines into testable mechanical hypotheses',
                imageAlt:
                    'MachinePulseAI Markers page with harmonic and sideband cursors and the Peaks result table',
                points: [
                    {
                        title: 'Peak Detection decides which local maxima are reported',
                        kicker: 'Left · upper group',
                        description:
                            'Max Peaks limits the length of the report, while Min Magnitude rejects candidates below the chosen dB threshold. Changing either detection setting requires a new Compute because the peak list is recalculated. “Show detected peaks” only controls the vertical labels drawn from the current list.',
                        check:
                            'A detected peak is a mathematical local maximum, not an automatic fault diagnosis. Relate it to speed, geometry, electrical frequency or forcing.',
                    },
                    {
                        title: 'Harmonic markers test integer-multiple structure',
                        kicker: 'Left · middle group',
                        description:
                            'A harmonic family marks f₀, 2f₀, 3f₀ and higher multiples. The fundamental can follow the dominant detected peak or be entered manually—for example shaft frequency equals RPM / 60. The Harmonics value limits how many members of the family are drawn.',
                        check:
                            'Automatic f₀ is convenient but can choose the wrong physical source when the strongest peak is not 1× shaft speed.',
                    },
                    {
                        title: 'Sideband markers expose modulation spacing',
                        kicker: 'Left · lower group',
                        description:
                            'Sidebands are placed symmetrically around the dominant carrier at carrier ± n·Δf. Regular spacing can indicate amplitude or frequency modulation, such as gear mesh modulated by shaft rotation. The controls draw guides only; they do not calculate sideband energy or confirm the cause.',
                        check:
                            'Measure the spacing and ask which known speed or repetition rate matches it before assigning a fault mechanism.',
                    },
                    {
                        title: 'Peaks is the numerical evidence behind the labels',
                        kicker: 'Results · Peaks',
                        description:
                            'The table lists refined frequency, magnitude and phase for every accepted peak. Magnitude follows the active Y-axis representation, so it may be linear or dB. Phase is useful when comparing synchronized channels, but a single-channel phase value needs a defined timing reference before it has physical meaning.',
                        check:
                            'Read the table together with Δf and window choice; displayed decimal places do not guarantee equivalent physical resolution.',
                    },
                ],
            },
            {
                id: 'compare',
                tab: 'Compare + Comparison',
                title: 'Compare like with like—without losing the analysis recipe',
                imageAlt:
                    'MachinePulseAI Compare page with two overlaid channels and the numerical comparison table',
                points: [
                    {
                        title: 'Compare Channels runs A and B with one recipe',
                        kicker: 'Left · upper group',
                        description:
                            'Reference A and Compare B must be two different channels. Compute and Compare selects both, computes them using identical FFT settings and overlays the spectra. This is the safest quick comparison because window, block, band and averaging cannot drift between separate runs.',
                        check:
                            'Use channels with compatible units and sample-rate metadata; otherwise a visual amplitude comparison is not meaningful.',
                    },
                    {
                        title: 'Compare Time Ranges captures two operating states',
                        kicker: 'Left · advanced group',
                        description:
                            'First compute one range and capture it as Reference A. Then move the navigator to another load, speed or time interval and compute Current B. This workflow compares two states of the same channel while preserving the frozen A trace until you explicitly clear it.',
                        check:
                            'Keep the FFT recipe unchanged and record what changed physically—speed, load, temperature, mounting or test step.',
                    },
                    {
                        title: 'The center overlay shows shape and location changes',
                        kicker: 'Center spectrum',
                        description:
                            'Each channel receives its own color and the A/B dominant frequencies are marked. Look for frequency shifts, amplitude changes, new harmonics, disappearing components and noise-floor changes. A larger line can result from a stronger source, a different transfer path or sensor mounting—not only degradation.',
                        check:
                            'Compare the complete pattern and test conditions, not just the tallest peak.',
                    },
                    {
                        title: 'Results → Compare is the numerical comparison table',
                        kicker: 'Right · Compare',
                        description:
                            'The table reports Reference, Compare and Δ(B−A) for dominant frequency, peak magnitude, THD, SINAD and SNR. A positive delta means B is numerically larger; whether that is better or worse depends on the metric and engineering objective. Missing values remain unavailable instead of being displayed as false zeroes.',
                        check:
                            'A delta is only defensible when both sides use the same units, recipe, calibration and representative operating state.',
                    },
                ],
            },
        ],
    },
    tr: {
        title: 'MachinePulseAI Arayüzünü Adım Adım Tanıyın',
        intro:
            'Aşağıdaki 3 görünüm ekranı, MachinePulseAI masaüstü uygulamasında kullanacağınız çalışma akışını temsil eder: Önce hesap ayarlarını ve kanalları yapılandırın, ardından işaretçileri ve bulunan tepeleri inceleyin, son olarak kanalları veya iki farklı zaman aralığını karşılaştırın.',
        imageCaption:
            'MachinePulseAI FFT / Spektrum ekranından alınmıştır. Tüm kontrollerin rahat okunabilmesi için eğriler test verisi kullanmaktadır.',
        viewHint: 'İncelemek istediğiniz ekran görünümünü seçin',
        selectHint:
            'Ekran görüntüsündeki numaralı bir bölgeyi seçin. Açıklama; kontrolün ne işe yaradığını ve neyi kontrol etmeniz gerektiğini gösterir.',
        controlsLabel: 'Bu Bölgedeki Kontroller',
        views: [
            {
                id: 'settings',
                tab: 'FFT Ayarları + Kanallar (Settings & Channels)',
                title: 'Analiz Parametrelerini Belirleyin ve Kanalları Seçin',
                imageAlt:
                    'FFT Settings sayfası, iki kanallı spektrum ve Channels paneli',
                points: [
                    {
                        title: '1. Input (Girdi ve Örnekleme Meta Verisi)',
                        kicker: 'Sol Panel · Input',
                        description:
                            'Sample Rate (Örnekleme Hızı), bağlı MPAI dosyasından gelen salt okunur veridir. Nyquist sınırını (fs/2) ve frekans adımlarını (Δf = fs/N) belirler. Gezgin imleçleri ile analiz edilecek sabit çalışma aralığını seçin. Channel açılır menüsünden ise zaman grafiğinde görüntülenecek kanalı belirleyin.',
                        check:
                            'Değişken devir veya yük içeren bir zaman aralığı almak matematiksel olarak sonuç verse de mühendislik açısından hatalı spektrum üretir. Önce sabit kalmış bir aralık seçin.',
                    },
                    {
                        title: '2. Spectrum (Kestirici Modu ve Blok Boyutu)',
                        kicker: 'Sol Panel · Spectrum',
                        description:
                            'Mode seçeneğinden Genlik FFT, Welch PSD veya STFT Spektrogram modunu belirleyin. Window (Pencere) ile sızıntı kontrolünü yapın (Hann varsayılandır). Block / Lines ile N örnek sayısını ayarlayın. N sayısı hem frekans çözünürlüğünü (Δf = fs/N) hem de analiz süresini (N/fs) belirler.',
                        check:
                            'N değerini seçerken ayırmak istediğiniz en küçük frekans farkını (Δf) dikkate alın.',
                    },
                    {
                        title: '3. Frequency Band (Görünüm Bant Genişliği)',
                        kicker: 'Sol Panel · Frequency Band',
                        description:
                            'Min ve Max değerleri ekranda gösterilecek frekans aralığını sınırlar. İkisi de varsayılan olarak 0 Hz\'dir (Max = 0 Nyquist anlamına gelir). Bu ayar sinyali filtrelemez, sadece x eksenindeki görünümü yakınlaştırır.',
                        check:
                            'Min/Max bant sınırını daralttığınızda bir tepe kayboluyorsa, o tepe grafikten gizlenmiştir; hesaptan silinmemiştir.',
                    },
                    {
                        title: '4. Block Processing (Blok İşleme ve Ortalama)',
                        kicker: 'Sol Panel · Block Processing',
                        description:
                            'Ortalama modu (Linear, Exponential, Max Hold) tekrarlı blokların nasıl birleştirileceğini seçer. Linear ortalama rastgele gürültüyü kararlılaştırır. Max Hold her frekansta görülen en yüksek tepeyi tutar. Blocks ve Overlap (Örtüşme) ise kaç bloğun birleştirileceğini belirler.',
                        check:
                            'Ortalama alma işlemi sadece birleştirilen tüm bloklar aynı çalışma durumunu (aynı devir/yük) temsil ediyorsa geçerlidir.',
                    },
                    {
                        title: '5. Post-processing (Son İşlem ve Görünüm)',
                        kicker: 'Sol Panel · Post-processing',
                        description:
                            'Y Axis ile dikey ekseni Doğrusal (Linear) veya Logaritmik (dB) yapın. Integration (Entegrasyon) ile ivme sinyalini frekans bölgesinde Hıza (mm/s) veya Yer Değiştirmeye (µm) çevirin. Weighting ile A/B/C akustik ağırlıklandırması uygulayın. Bu ayarlar FFT\'yi yeniden hesaplamaz, ekrandaki sunumu günceller.',
                        check:
                            'İvmeden Hıza entegrasyon yaparken düşük frekanslardaki (DC) gürültü patlamalarını önlemek için kalibre ivme verisi kullanın.',
                    },
                    {
                        title: '6. Görünüm Sekmeleri (Spectrum, PSD, Phase, STFT)',
                        kicker: 'Üst Orta Sekmeler',
                        description:
                            'Bu sekme düğmeleri orta grafik alanını değiştirir (hesaplama başlatmaz). Spectrum genlik spektrumunu, PSD hertz başına gücü, Phase faz açısını gösterir. STFT sekmesi ise zaman-frekans haritasını açar.',
                        check:
                            'Welch PSD birimi (g²/Hz) ile Genlik spektrumu birimini (g) doğrudan birbiriyle kıyaslamayın.',
                    },
                    {
                        title: '7. Channels (Çoklu Kanal Seçimi)',
                        kicker: 'Sağ Panel · Channels',
                        description:
                            'Sağ panelde işaretlediğiniz tüm kanallar aynı FFT reçetesiyle hesaplanır ve farklı renklerde üst üste çizilir. Böylece iki farklı sensör yönünü veya yerini tek tıkla karşılaştırabilirsiniz.',
                        check:
                            'Soldaki Channel alanı gezgin zaman grafiğini seçer; sağdaki Channels listesi ise FFT hesabına gönderilen tüm kanalları seçer.',
                    },
                    {
                        title: '8. Compute (Hesapla) ve Durum Bilgisi',
                        kicker: 'Sol Alt Buton',
                        description:
                            'Compute butonu seçili imleç aralığını ve ayarları C++ motorunda çalıştırır. Durum satırı tamamlanma süresini, baskın frekansı, çözünürlüğü ve kullanılan örnek sayısını raporlar.',
                        check:
                            'Zaman imleçlerini her değiştirdiğinizde Compute\'a basarak güncel sonucu elde edin.',
                    },
                ],
            },
            {
                id: 'markers',
                tab: 'İşaretçiler ve Tepeler (Markers & Peaks)',
                title: 'Spektrum Çizgilerini Mekanik Hipotezlere Dönüştürün',
                imageAlt:
                    'Harmonik ve yan bant işaretçileri ile Peaks sonuç tablosunu gösteren MachinePulseAI Markers sayfası',
                points: [
                    {
                        title: '1. Peak Detection (Tepe Algılama Eşikleri)',
                        kicker: 'Sol · Üst Grup',
                        description:
                            'Max Peaks raporda gösterilecek maksimum tepe sayısını sınırlar; Min Magnitude ise belirlediğiniz dB seviyesinin altındaki gürültü tepelerini eler. Bu ayarlar değiştirildiğinde tepe listesi C++ tarafında yeniden hesaplanır.',
                        check:
                            'Bulunan bir tepe matematiksel bir yerel maksimumdur; doğrudan otomatik arıza tanısı değildir. Tepeyi devir veya dişli sayısı ile doğrulayın.',
                    },
                    {
                        title: '2. Harmonic Markers (Harmonik İşaretçileri)',
                        kicker: 'Sol · Orta Grup',
                        description:
                            'Harmonik ailesi $f_0, 2f_0, 3f_0 \dots$ katlarını grafik üzerinde imleçlerle gösterir. Temel frekans ($f_0$) en yüksek tepeyi izleyebilir veya elle (örneğin mil devri $1\times = \text{RPM}/60$) girilebilir.',
                        check:
                            'Baskın tepe $1\times$ mil hızı değilse (örneğin dişli geçişiyse), otomatik $f_0$ yanlış frekansı temel alabilir. Manuel frekans girmeyi tercih edin.',
                    },
                    {
                        title: '3. Sideband Markers (Yan Bant İşaretçileri)',
                        kicker: 'Sol · Alt Grup',
                        description:
                            'Yan bantlar, seçilen ana frekansın çevresine simetrik olarak (Taşıyıcı $\pm n \cdot \Delta f$) yerleştirilir. Dişli kutusu modülasyonları veya rulman hasar frekanslarındaki modülasyon aralıklarını görsel olarak kontrol etmeyi sağlar.',
                        check:
                            'Yan bant aralığını ölçün ve bilinen mil dönüş hızıyla eşleşip eşleşmediğini kontrol edin.',
                    },
                    {
                        title: '4. Peaks Tablosu (Sayısal Tepe Listesi)',
                        kicker: 'Sağ / Alt Tablo',
                        description:
                            'Kabul edilen tüm tepelerin iyileştirilmiş frekans, genlik ve faz değerlerini bir tabloda listeler. Parabolik interpolasyon uygulanarak gerçek tepe noktası bin adımlarının arasından hassas olarak hesaplanır.',
                        check:
                            'Tablodaki genlik değerinin etkin Y ekseni birimini (g, dB, mm/s) izlediğini unutmayın.',
                    },
                ],
            },
            {
                id: 'compare',
                tab: 'Karşılaştırma (Compare)',
                title: 'Çalışma Durumlarını ve Kanalları Doğrudan Kıyaslayın',
                imageAlt:
                    'İki bindirilmiş kanal ve sayısal karşılaştırma tablosu bulunan MachinePulseAI Compare sayfası',
                points: [
                    {
                        title: '1. Compare Channels (İki Farklı Kanalı Karşılaştırma)',
                        kicker: 'Sol · Üst Grup',
                        description:
                            'Reference A ve Compare B olarak iki farklı kanalı seçip aynı FFT ayarlarıyla hesaplayın. İki spektrum aynı grafikte iki ayrı renkte üst üste bindirilir. Böylece yatay vs. dikey sensör ölçümlerini anında kıyaslayabilirsiniz.',
                        check:
                            'Karşılaştırılan kanalların birimlerinin (örneğin ikisinin de ivme g olması) aynı olduğundan emin olun.',
                    },
                    {
                        title: '2. Compare Time Ranges (İki Çalışma Durumunu Karşılaştırma)',
                        kicker: 'Sol · Gelişmiş Grup',
                        description:
                            'Önce normal yükteki spektrumu hesaplayıp "Reference A" olarak dondurun. Ardından zaman imlecini yüksek yükteki başka bir aralığa kaydırıp "Current B" spektrumunu hesaplayın. İki farklı yük durumu tek grafikte kıyaslanır.',
                        check:
                            'İki durum arasında FFT ayarlarını (blok boyutu, pencere) değiştirmeyin; sadece makinede neyin değiştiğini (yük, devir) kaydedin.',
                    },
                    {
                        title: '3. Spektrum Üst Üste Bindirme (Center Spectrum)',
                        kicker: 'Orta Grafik',
                        description:
                            'A ve B eğrileri farklı renklerle çizilir ve baskın tepeleri işaretlenir. Frekans kaymalarını, genlik artışlarını ve yeni oluşan harmonikleri görsel olarak kolayca tespit edin.',
                        check:
                            'Sadece en yüksek tepeye değil, tüm spektrum tabanındaki ve harmoniklerdeki değişime odaklanın.',
                    },
                    {
                        title: '4. Results → Compare Tablosu (Sayısal Fark Δ)',
                        kicker: 'Sağ Tablo',
                        description:
                            'Tablo; Reference A, Compare B ve aralarındaki sayısal farkı $\Delta(B - A)$ raporlar. Baskın frekans kayması, genlik değişimi ve THD farkları net olarak sunulur.',
                        check:
                            'Fark ($\Delta$) hesabının anlamlı olması için her iki tarafın da aynı birim ve reçeteyle hesaplandığını doğrulayın.',
                    },
                ],
            },
        ],
    },
}

export default FFT_INTERFACE_GUIDE
