// Settings that need a choice explained beside the FFT or Rotor Dynamics
// screenshot. Each row is [en label, tr label, en explanation, tr explanation].
export const FLAGSHIP_DETAILS = {
    fft_spectrum: {
        input: [
            ['Sample Rate', 'Örnekleme hızı', 'Check the rate recorded in MPAI before choosing a block size. This field reads the recording metadata; it does not resample the signal.', 'Blok boyutunu seçmeden önce MPAI kaydındaki hızı kontrol edin. Bu alan kayıt bilgisini gösterir; sinyali yeniden örneklemez.'],
            ['Navigator and Channel', 'Navigator ve Channel', 'Choose a navigator trace that makes the event easy to locate. Select the analysis channels separately; changing the overview trace does not change which sensors you intend to compare.', 'Olayı rahat bulabileceğiniz bir navigatör sinyali seçin. Analiz kanallarını ayrıca kontrol edin; genel görünümdeki sinyali değiştirmek, karşılaştıracağınız sensörleri seçmenin yerine geçmez.'],
        ],
        spectrum_group: [
            ['Spectrum / PSD / Phase', 'Spectrum / PSD / Phase', 'Use the amplitude spectrum for tones and harmonics, PSD for stationary broadband energy per hertz, and phase for relative timing at individual frequencies. Read the unit on each view before comparing values.', 'Tonları ve harmonikleri genlik spektrumunda, durağan geniş bant enerjisini PSD’de, frekanslara göre zamanlama ilişkisini faz görünümünde inceleyin. Değerleri karşılaştırmadan önce her görünümün birimini okuyun.'],
            ['Window', 'Pencere', 'Start with Hann for a general continuous signal. Use a rectangular window only for a block whose ends join without a discontinuity. Keep the window the same when comparing runs, because it affects peak width and leakage.', 'Genel bir sürekli sinyal için Hann ile başlayın. Dikdörtgen pencereyi yalnızca başı ve sonu süreksizlik oluşturmadan birleşen bloklarda kullanın. Tepe genişliğini ve sızıntıyı etkilediği için kayıtları karşılaştırırken pencereyi aynı tutun.'],
            ['Block / Lines', 'Blok boyutu', 'Choose N from both the required spacing Δf = fs/N and the available stationary duration N/fs. Increase N to separate nearby components, but check that speed or load does not change appreciably inside one block.', 'N’yi hem gereken Δf = fs/N aralığına hem de durağan kalınabilen N/fs süresine göre seçin. Yakın bileşenleri ayırmak için N’yi artırabilirsiniz; ancak tek blok içinde devir veya yükün belirgin değişmediğini kontrol edin.'],
        ],
        block_reduction: [
            ['None and Linear', 'None ve Linear', 'None shows one block. Use Linear to reduce random variation across blocks recorded under the same condition. More blocks cover more time; do not combine different operating states just to obtain a smoother curve.', 'None tek bloğu gösterir. Aynı koşulda kaydedilen bloklardaki rastgele değişimi azaltmak için Linear kullanın. Daha fazla blok daha uzun süreyi kapsar; yalnızca düzgün bir eğri elde etmek için farklı çalışma koşullarını birleştirmeyin.'],
            ['Exponential and α', 'Exponential ve α', 'Choose Exponential when recent blocks should carry more weight. A smaller α gives a steadier but slower response; a larger α follows changes faster.', 'Son blokların daha etkili olmasını istediğinizde Exponential seçin. Küçük α daha kararlı fakat yavaş tepki verir; büyük α değişimleri daha hızlı izler.'],
            ['Max Hold', 'Max Hold', 'Use this to retain the largest value seen at each frequency. It helps locate intermittent components, but the retained peaks need not have occurred at the same time.', 'Her frekansta görülen en büyük değeri tutmak için kullanın. Aralıklı bileşenleri bulmayı kolaylaştırır; fakat tutulan tepeler aynı anda oluşmuş olmayabilir.'],
            ['Blocks and Overlap', 'Blocks ve Overlap', 'Check how many complete blocks fit inside the interval. Overlapping blocks share samples, so increasing overlap does not create independent measurements or finer frequency spacing.', 'Aralığa kaç tam blok sığdığını kontrol edin. Örtüşen bloklar örnek paylaşır; örtüşmeyi artırmak bağımsız ölçüm veya daha ince frekans aralığı oluşturmaz.'],
        ],
        post: [
            ['Weighting', 'Ağırlıklandırma', 'Keep the result unweighted for a general vibration comparison. Use A, B or C only when the acoustic measurement calls for that weighting; it does not supply a missing sensor calibration.', 'Genel titreşim karşılaştırmasında ağırlıklandırmasız sonucu kullanın. A, B veya C’yi yalnızca akustik ölçüm bunu gerektiriyorsa seçin; ağırlıklandırma eksik sensör kalibrasyonunu tamamlamaz.'],
            ['Integration', 'İntegral', 'Keep None to retain acceleration. Select velocity or displacement only for calibrated acceleration, and inspect the low-frequency end: offset and noise have a larger effect after integration.', 'İvmeyi korumak için None bırakın. Hız veya yer değiştirmeyi yalnızca kalibre edilmiş ivme için seçin. İntegralden sonra ofset ve gürültünün etkisi arttığından düşük frekans bölgesini kontrol edin.'],
            ['Octave overlay', 'Oktav gösterimi', 'Choose octave bands when the question concerns energy over a band rather than one narrow spectral line. Compare the band units with the underlying spectrum before quoting a level.', 'Soru tek bir dar spektral çizgi yerine bant içindeki enerjiyle ilgiliyse oktav bantlarını seçin. Seviye belirtmeden önce bant birimlerini alttaki spektrumla birlikte kontrol edin.'],
        ],
        navigator: [
            ['Selecting a useful interval', 'Uygun aralığı seçmek', 'Keep a steady speed and load inside the interval when comparing narrow peaks. If the change in speed is what you want to study, use STFT to see when components appear rather than averaging the whole event into one trace.', 'Dar tepeleri karşılaştırırken aralığı sabit devir ve yük içinde tutun. İncelemek istediğiniz şey devir değişimiyse tüm olayı tek eğride ortalamak yerine bileşenlerin ne zaman belirdiğini STFT ile görün.'],
        ],
        detect: [
            ['Count, Min Magnitude and range', 'Count, Min Magnitude ve aralık', 'Limit the frequency band first, then choose the minimum level and number of peaks. A high count can fill the list with noise; a high threshold can hide small but repeatable components. Check the selected points on the plot.', 'Önce frekans bandını daraltın, ardından alt seviyeyi ve tepe sayısını seçin. Fazla tepe istemek listeyi gürültüyle doldurabilir; yüksek eşik ise küçük ama tekrarlanabilir bileşenleri gizleyebilir. Bulunan noktaları grafikte kontrol edin.'],
        ],
        manual: [
            ['Marker, delta and band', 'İşaretçi, fark ve bant', 'Use a marker for one frequency, a delta pair for spacing and a band for a range statistic. State which band result you read: a peak, average, RMS and power describe different quantities.', 'Tek frekans için işaretçi, aralık farkı için fark çifti, aralık istatistiği için bant kullanın. Hangi bant sonucunu okuduğunuzu belirtin; tepe, ortalama, RMS ve güç farklı büyüklüklerdir.'],
        ],
        harmonics: [
            ['Fundamental and sideband spacing', 'Temel frekans ve yan bant aralığı', 'Set the fundamental from a known shaft or excitation frequency when possible. Harmonic and sideband guides help compare spacing; matching a guide by eye is not enough to identify a fault.', 'Mümkünse temel frekansı bilinen mil veya uyarım frekansından girin. Harmonik ve yan bant kılavuzları aralıkları karşılaştırmayı kolaylaştırır; bir çizginin kılavuza denk gelmesi tek başına arıza tanısı için yeterli değildir.'],
        ],
        channels: [
            ['Reference A and Compare B', 'Reference A ve Compare B', 'Compare compatible units with the same window, block size and averaging. Differences between sensor locations can come from direction and mounting as well as a change in the machine.', 'Uyumlu birimleri aynı pencere, blok boyutu ve ortalamayla karşılaştırın. Sensör konumları arasındaki fark, makinedeki değişim kadar ölçüm yönünden veya montajdan da kaynaklanabilir.'],
        ],
        ranges: [
            ['Capture a reference', 'Referans almak', 'Capture the baseline before moving to the second interval. Keep settings and units consistent, and record which speed and load each interval represents.', 'İkinci aralığa geçmeden önce referansı alın. Ayarları ve birimleri aynı tutun; her aralığın hangi devir ve yük koşuluna ait olduğunu kaydedin.'],
        ],
        mode: [
            ['When to choose STFT', 'STFT ne zaman seçilir?', 'Use STFT for a run-up, shutdown or changing event. Shorter blocks locate changes more closely in time; longer blocks separate nearby frequencies better. Choose the trade-off from the event you need to resolve.', 'Kalkış, duruş veya zamanla değişen olaylarda STFT kullanın. Kısa bloklar değişimin zamanını daha iyi gösterir; uzun bloklar yakın frekansları daha iyi ayırır. Seçimi inceleyeceğiniz olaya göre yapın.'],
        ],
    },
    rotor_dynamics: {
        measurement: [
            ['Probe angles and Rotation', 'Prob açıları ve Rotation', 'Enter the actual sensitivity direction of each probe and the machine rotation convention. Verify sensor polarity before reading the orbit orientation or forward/backward components; a wrong sign can change the interpretation.', 'Her probun gerçek duyarlılık yönünü ve makinenin dönme yönünü girin. Yörünge yönünü veya ileri/geri bileşenleri okumadan önce sensör polaritesini doğrulayın; yanlış işaret yorumu değiştirebilir.'],
            ['Units and Runout Compensation', 'Units ve Runout Compensation', 'Choose units that match the calibrated displacement. Mean-offset removal centres the orbit for shape inspection; it should not be confused with subtracting a measured slow-roll 1X vector.', 'Kalibre edilmiş yer değiştirmeyle uyumlu birim seçin. Ortalama ofsetin çıkarılması, şekli incelemek için yörüngeyi merkezler; ölçülmüş slow-roll 1X vektörünün çıkarılmasıyla karıştırmayın.'],
        ],
        orbit_group: [
            ['Direct or nX Filtered', 'Direct veya nX Filtered', 'Start with Direct to see the measured path. Use nX Filtered to isolate a running-speed multiple, then compare it with Direct so harmonics and other motion are not overlooked.', 'Ölçülen hareketi görmek için Direct ile başlayın. Bir devir katını ayırmak için nX Filtered kullanın; harmonikleri ve diğer hareketleri gözden kaçırmamak için Direct ile karşılaştırın.'],
            ['Orbit Order and bandwidth', 'Orbit Order ve bant genişliği', 'Choose the order you want to examine and a bandwidth appropriate to the speed variation in the selected interval. A narrow band can reject nearby content, but may also exclude the component if speed varies too much.', 'İnceleyeceğiniz order’ı ve seçili aralıktaki devir değişimine uygun bant genişliğini seçin. Dar bant yakın bileşenleri dışarıda bırakabilir; devir çok değişirse aranan bileşeni de kesebilir.'],
            ['Show Revolution Marks', 'Show Revolution Marks', 'Use the dots to follow successive revolutions within this result. They are synthesized from measured RPM and do not provide a physical keyphasor phase for balancing.', 'Bu sonuç içinde ardışık devirleri izlemek için noktaları kullanın. Noktalar ölçülmüş RPM’den üretilir; balans için fiziksel keyphasor fazı sağlamaz.'],
        ],
        navigator: [
            ['Orbit or speed sweep?', 'Yörünge mi, hız taraması mı?', 'For an orbit, select a short interval at nearly constant speed. For Bode, Polar or a waterfall, include the speed sweep you want to compare. Check the selected span before Compute.', 'Yörünge için yaklaşık sabit devirde kısa bir aralık seçin. Bode, Polar veya şelale için karşılaştıracağınız hız taramasını kapsayın. Compute öncesinde seçili aralığı kontrol edin.'],
        ],
        channels: [
            ['X, Y and measured RPM', 'X, Y ve ölçülmüş RPM', 'Assign the probes according to their physical mounting and use a speed signal from the same event. Check Auto-detect suggestions by hand; channel names cannot verify mounting angles, units or timing.', 'Probları fiziksel montajlarına göre atayın ve aynı olaya ait devir sinyalini kullanın. Auto-detect önerilerini elle kontrol edin; kanal adları montaj açısını, birimi veya zaman uyumunu doğrulamaz.'],
        ],
        bode_polar: [
            ['Slow-roll Speed', 'Slow-roll Speed', 'Use a measured low-speed reference when you need to subtract the 1X runout vector. Compare compensated and uncompensated curves before attributing a change to the rotor response.', '1X runout vektörünü çıkarmak gerektiğinde ölçülmüş düşük hız referansı kullanın. Bir değişimi rotor cevabına bağlamadan önce düzeltilmiş ve düzeltilmemiş eğrileri karşılaştırın.'],
            ['Speed Segment', 'Speed Segment', 'Choose run-up or coast-down when their paths differ. Keeping both together can hide the difference between acceleration and deceleration, so inspect each separately before combining them.', 'Kalkış ve duruş eğrileri farklıysa Speed Segment ile ayrı ayrı inceleyin. İkisini birlikte tutmak hızlanma ve yavaşlama arasındaki farkı gizleyebilir.'],
        ],
        limits: [
            ['Metric, profile and limits', 'Ölçüt, profil ve sınırlar', 'Choose the measured quantity first, then enter the profile and limits applicable to the actual machine. A diagnostic 1X amplitude and direct displacement are not interchangeable acceptance quantities.', 'Önce ölçülen büyüklüğü seçin; ardından gerçek makine için geçerli profili ve sınırları girin. Tanısal 1X genliği ile doğrudan yer değiştirme, kabul değerlendirmesinde birbirinin yerine kullanılamaz.'],
            ['Bearing Clearance', 'Bearing Clearance', 'Enter the actual diametral clearance in the requested unit. If the value is not known, do not invent one to obtain a gap or attitude result.', 'Gerçek çapsal yatak boşluğunu istenen birimde girin. Değer bilinmiyorsa boşluk veya tutum açısı sonucu elde etmek için tahmini bir sayı kullanmayın.'],
        ],
        phase: [
            ['Keep the phase reference consistent', 'Faz referansını aynı tutmak', 'The phase here is derived from RPM and the selection start. Keep that convention in mind when comparing runs; it is not an absolute phase measured against a physical keyphasor.', 'Buradaki faz RPM’den ve seçim başlangıcından türetilir. Koşuları karşılaştırırken bu referansı hesaba katın; fiziksel keyphasor’a göre ölçülmüş mutlak faz değildir.'],
        ],
        spectrum_group: [
            ['Block size and window', 'Blok boyutu ve pencere', 'Use a nearly steady-speed interval to compare discrete forward and backward lines. Choose the block size for the separation you need, keeping the same window across comparisons.', 'Ayrı ileri ve geri çizgileri karşılaştırmak için yaklaşık sabit devirli bir aralık kullanın. Blok boyutunu ayırmak istediğiniz frekanslara göre seçin; karşılaştırmalarda pencereyi aynı tutun.'],
        ],
        waterfall_toggle: [
            ['Compute Whirl Waterfall and Waterfall Max', 'Compute Whirl Waterfall ve Waterfall Max', 'Enable the waterfall before computing if you need the frequency–RPM map. Limit Waterfall Max to the band under review and include the relevant speed sweep in the navigator.', 'Frekans–RPM haritasına ihtiyacınız varsa hesaplamadan önce şelaleyi açın. Waterfall Max değerini inceleyeceğiniz bantla sınırlayın ve navigatörde ilgili hız taramasını kapsayın.'],
        ],
        diagnostics: [
            ['Read the reason beside the result', 'Sonucun yanındaki gerekçeyi okumak', 'If a result is unavailable, check the stated reason before changing limits. Confirm units, speed stability and the required geometry rather than treating every diagnostic label as a machine fault.', 'Bir sonuç kullanılamıyorsa sınırları değiştirmeden önce yazan gerekçeyi okuyun. Her tanı etiketini makine arızası saymak yerine birimleri, devir kararlılığını ve gereken geometriyi doğrulayın.'],
        ],
    },
}
