// Tiny scalar teaching models. These never read product data or simulate a full analysis.
const field = (key, en, tr, initial, min, max, step, unit = '') => ({ key, label: [en, tr], initial, min, max, step, unit })
const model = (fields, output, unit, calculate) => ({ fields, output, unit, calculate })
const rate = field('rate', 'Sample rate', 'Örnekleme hızı', 2000, 200, 20000, 200, 'Hz')
const peak = field('peak', 'Sine peak amplitude', 'Sinüs tepe genliği', 2, 0.1, 10, 0.1)
const rms = model([peak], ['Sine RMS', 'Sinüs RMS'], '', ({ peak: value }) => value / Math.sqrt(2))
const zscore = model([
    field('value', 'Observation', 'Gözlem', 18, 0, 30, 0.5),
    field('mean', 'Reference mean', 'Referans ortalama', 10, 0, 20, 0.5),
    field('std', 'Standard deviation', 'Standart sapma', 2, 0.5, 5, 0.5),
], ['Z-score', 'Z-skor'], '', ({ value, mean, std }) => (value - mean) / std)
const bytes = model([
    field('rows', 'Rows', 'Satırlar', 1000000, 100000, 10000000, 100000),
    field('columns', 'Float64 columns', 'Float64 sütunlar', 20, 1, 100, 1),
], ['Raw payload only', 'Yalnızca ham veri'], 'MB', ({ rows, columns }) => rows * columns * 8 / 1000000)
const difference = model([
    field('first', 'First timestamp', 'İlk zaman damgası', 2, 0, 10, 0.01, 's'),
    field('second', 'Second timestamp', 'İkinci zaman damgası', 2.01, 0, 10, 0.01, 's'),
], ['Second − first', 'İkinci − ilk'], 'ms', ({ first, second }) => 1000 * (second - first))
const order = model([
    field('rpm', 'Rotational speed', 'Dönme hızı', 1800, 300, 6000, 100, 'RPM'),
    field('order', 'Order', 'Order', 2, 0.5, 10, 0.5),
], ['Component frequency', 'Bileşen frekansı'], 'Hz', ({ rpm, order: value }) => rpm * value / 60)
const duration = model([
    field('samples', 'Window samples', 'Pencere örnekleri', 1000, 100, 10000, 100), rate,
], ['Window duration', 'Pencere süresi'], 's', ({ samples, rate: value }) => samples / value)

export const CONCEPT_LABS = {
    file_reader: model([field('step', 'Uniform sample interval', 'Eşit örnek aralığı', 1, 0.1, 10, 0.1, 'ms')], ['Inferred sample rate', 'Çıkarılan örnekleme hızı'], 'Hz', ({ step }) => 1000 / step),
    data_merger: model([field('first', 'First segment rows', 'İlk parça satırları', 60000, 10000, 100000, 10000), field('second', 'Second segment rows', 'İkinci parça satırları', 40000, 10000, 100000, 10000)], ['Appended rows', 'Eklenen satırlar'], '', ({ first, second }) => first + second),
    data_exporter: bytes, table_edit: bytes, merge_channels: bytes,
    random_generator: rms, frequency_domain: rms,
    normalization_scaling: { ...zscore, fields: zscore.fields.map((item) => item.key === 'value' ? { ...item, initial: 14 } : item) },
    data_quality_repair: zscore, spike_detection: zscore,
    groupby_aggregation: model([field('a', 'Group A mean', 'A grubu ortalama', 10, 0, 30, 1), field('b', 'Group B mean', 'B grubu ortalama', 20, 0, 30, 1), field('na', 'Group A count', 'A grubu sayı', 2, 1, 20, 1), field('nb', 'Group B count', 'B grubu sayı', 8, 1, 20, 1)], ['Sample-weighted mean', 'Örnek ağırlıklı ortalama'], '', ({ a, b, na, nb }) => (a * na + b * nb) / (na + nb)),
    time_alignment: model([field('time', 'Source event time', 'Kaynak olay zamanı', 2.2, 0, 5, 0.1, 's'), field('shift', 'Time shift', 'Zaman kaydırması', -0.2, -1, 1, 0.1, 's')], ['Aligned timestamp', 'Hizalı zaman damgası'], 's', ({ time, shift }) => time + shift),
    rolling_window_stats: duration, cross_spectrum: duration,
    sensor_calibration: model([field('volts', 'Measured voltage', 'Ölçülen voltaj', 0.2, -1, 1, 0.05, 'V'), field('gain', 'Calibration gain', 'Kalibrasyon kazancı', 10, 1, 20, 1, 'g/V'), field('offset', 'Output offset', 'Çıkış ofseti', 0, -1, 1, 0.1, 'g')], ['Calibrated acceleration', 'Kalibre edilmiş ivme'], 'g', ({ volts, gain, offset }) => volts * gain + offset),
    frequency_filter: model([rate], ['Nyquist limit', 'Nyquist sınırı'], 'Hz', ({ rate: value }) => value / 2),
    smoothing_filter: model([field('height', 'Isolated pulse height', 'Tekil darbe yüksekliği', 10, 1, 20, 1), field('window', 'SMA window', 'SMA penceresi', 5, 3, 51, 2, 'samples')], ['Pulse average among zeros', 'Sıfırlar arasındaki darbe ortalaması'], '', ({ height, window }) => height / window),
    math_transform: model([field('bias', 'Constant acceleration bias', 'Sabit ivme ofseti', 0.01, 0, 0.1, 0.01, 'm/s²'), field('time', 'Integration duration', 'İntegral süresi', 100, 10, 200, 10, 's')], ['Velocity drift from bias', 'Ofsetten kaynaklanan hız kayması'], 'm/s', ({ bias, time }) => bias * time),
    advanced_diagnostics: model([field('period', 'Impact interval', 'Darbe aralığı', 10, 1, 50, 1, 'ms')], ['Repetition frequency', 'Tekrar frekansı'], 'Hz', ({ period }) => 1000 / period),
    kalman_filter: model([field('p', 'Predicted variance P⁻', 'Öngörü varyansı P⁻', 1, 0.1, 10, 0.1), field('r', 'Measurement variance R', 'Ölçüm varyansı R', 1, 0.1, 10, 0.1)], ['Scalar Kalman gain', 'Skaler Kalman kazancı'], '', ({ p, r }) => p / (p + r)),
    range_filter: model([field('x', 'Observation', 'Gözlem', 1500, 1300, 1700, 10, 'RPM'), field('low', 'Inclusive lower bound', 'Kapsayıcı alt sınır', 1450, 1300, 1500, 10, 'RPM'), field('high', 'Inclusive upper bound', 'Kapsayıcı üst sınır', 1550, 1500, 1700, 10, 'RPM')], ['Inside = 1 · outside = 0', 'İçeride = 1 · dışarıda = 0'], '', ({ x, low, high }) => Number(x >= low && x <= high)),
    statistics_summary: model([field('mean', 'Mean', 'Ortalama', 3, 0, 10, 0.5), field('std', 'Population standard deviation', 'Popülasyon standart sapması', 4, 0, 10, 0.5)], ['Total RMS', 'Toplam RMS'], '', ({ mean, std }) => Math.hypot(mean, std)),
    hypothesis_testing: model([field('mean', 'Sample mean', 'Örnek ortalaması', 10.4, 8, 12, 0.1), field('reference', 'Reference mean', 'Referans ortalama', 10, 8, 12, 0.1), field('std', 'Sample standard deviation', 'Örnek standart sapması', 2, 0.5, 5, 0.5), field('n', 'Independent valid observations', 'Bağımsız geçerli gözlemler', 100, 10, 500, 10)], ['One-sample t statistic', 'Tek örneklem t istatistiği'], '', ({ mean, reference, std, n }) => (mean - reference) / (std / Math.sqrt(n))),
    statistical_process_control: model([field('mean', 'Process mean', 'Proses ortalama', 10, 8, 12, 0.1), field('std', 'Process standard deviation', 'Proses standart sapması', 0.5, 0.1, 1, 0.1)], ['Cpk · illustrative limits 8 and 12', 'Cpk · örnek sınırlar 8 ve 12'], '', ({ mean, std }) => Math.min(12 - mean, mean - 8) / (3 * std)),
    histogram_widget: model([field('hits', 'Samples in the bin', 'Kutudaki örnekler', 100, 10, 500, 10), field('width', 'Bin width', 'Kutu genişliği', 2, 0.5, 5, 0.5)], ['Density · total count fixed at 1,000', 'Yoğunluk · toplam sayı 1.000'], '', ({ hits, width }) => hits / (1000 * width)),
    bar_plot: model([field('a', 'DE RMS', 'DE RMS', 2, 0.5, 10, 0.5, 'mm/s'), field('b', 'NDE RMS', 'NDE RMS', 3, 0.5, 10, 0.5, 'mm/s')], ['NDE / DE ratio', 'NDE / DE oranı'], '', ({ a, b }) => b / a),
    box_plot: model([field('q1', 'First quartile', 'İlk çeyrek', 10, 0, 10, 1), field('q3', 'Third quartile', 'Üçüncü çeyrek', 14, 11, 30, 1)], ['Upper 1.5 IQR fence', 'Üst 1,5 IQR sınırı'], '', ({ q1, q3 }) => q3 + 1.5 * (q3 - q1)),
    line_chart: difference, time_graphics: difference,
    align_compare: model([field('a', 'Source A rate', 'A kaynağı hızı', 1000, 500, 5000, 500, 'Hz'), field('b', 'Source B rate', 'B kaynağı hızı', 2000, 500, 5000, 500, 'Hz')], ['Lower original Nyquist limit', 'Düşük özgün Nyquist sınırı'], 'Hz', ({ a, b }) => Math.min(a, b) / 2),
    order_map_view: order, order_tracking: order,
    rotor_balancing: model([field('unbalance', 'Specified mass-radius moment', 'Verilen kütle-yarıçap momenti', 1000, 100, 3000, 100, 'g·mm'), field('radius', 'Installation radius', 'Montaj yarıçapı', 100, 20, 200, 10, 'mm')], ['Equivalent mass · not a balancing solution', 'Eşdeğer kütle · balans çözümü değildir'], 'g', ({ unbalance, radius }) => unbalance / radius),
    shock_srs: model([field('q', 'Quality factor Q', 'Kalite faktörü Q', 10, 1, 50, 1)], ['Damping ratio', 'Sönüm oranı'], '%', ({ q }) => 100 / (2 * q)),
    cross_axis_compensation: model([field('percent', 'Cross-axis sensitivity', 'Çapraz eksen duyarlılığı', 2, 0, 10, 0.5, '%')], ['Leakage fraction', 'Sızıntı kesri'], '', ({ percent }) => percent / 100),
}

export function conceptLabTranslations(lang) {
    const index = lang === 'tr' ? 1 : 0
    return Object.fromEntries(Object.entries(CONCEPT_LABS).map(([id, lab]) => [id, {
        output: lab.output[index],
        fields: Object.fromEntries(lab.fields.map((item) => [item.key, item.label[index]])),
    }]))
}
