// Real application captures for the learning-page workspace tour.
//
// Each image is the widget's own window from the MachinePulseAI desktop app
// (Space theme, synthetic demo data), stored as src/assets/widget-ui/<slug>.webp
// where <slug> is the widget id with underscores replaced by hyphens.
// HOTSPOTS[id][i] places the numbered marker for controls[i] of that page as
// [left, top] percentages of the image; null skips a marker.

const IMAGES = import.meta.glob('../../assets/widget-ui/*.webp', { eager: true, import: 'default' })

const SIZE = { width: 2000, height: 1059 }

const HOTSPOTS = {
    file_reader: [['67%', '14.3%'], ['67%', '61.6%'], ['13%', '7.5%']],
    data_merger: [['94%', '11.5%'], ['66%', '9%'], ['97.5%', '98.2%']],
    data_exporter: [['28%', '20.9%'], ['79%', '13.5%'], ['95.4%', '96.8%']],
    random_generator: [['17.5%', '28.3%'], ['15%', '73%'], ['10%', '13.7%']],
    channel_selector: [['10%', '28%'], ['15%', '8.3%'], ['10%', '11.2%']],
    merge_channels: [['16.5%', '8.3%'], ['7.5%', '11.2%'], ['10.7%', '95%']],
    table_edit: [['60%', '50%'], ['10.4%', '4%'], ['29.5%', '4%']],
    normalization_scaling: [['11%', '8.3%'], null, null],
    groupby_aggregation: [['4.6%', '6%'], ['4.6%', '23.9%'], ['4.6%', '65.5%']],
    time_alignment: [['26.5%', '62.6%'], ['8.5%', '32.2%'], ['5.8%', '52.2%']],
    rolling_window_stats: [['5.5%', '8.3%'], ['5.5%', '14.5%'], ['2.6%', '17.3%']],
    sensor_calibration: [['6.5%', '37.8%'], ['6.5%', '40.7%'], ['6.5%', '59%']],
    frequency_filter: [['5%', '36.6%'], ['5%', '44.8%'], ['9%', '94.4%']],
    smoothing_filter: [['10%', '9.3%'], ['10%', '12.4%'], null],
    math_transform: [['9%', '9.3%'], ['6.2%', '20.8%'], null],
    advanced_diagnostics: [['9.5%', '9.3%'], ['7%', '22.8%'], ['7.7%', '94.4%']],
    kalman_filter: [['8.5%', '9.5%'], ['8.5%', '12.8%'], ['6%', '16.2%']],
    spike_detection: [['4.5%', '9.3%'], ['4.5%', '12.4%'], ['5.5%', '30.2%']],
    data_quality_repair: [['4.2%', '51.4%'], ['4%', '48.3%'], ['10%', '95%']],
    range_filter: [['4%', '17.8%'], ['9.1%', '17.8%'], ['7.8%', '94.6%']],
    statistics_summary: [['3.6%', '6%'], ['3.6%', '9.2%'], ['7%', '95.6%']],
    correlation_analysis: [['3%', '9%'], ['3%', '15%'], ['3%', '18.3%']],
    hypothesis_testing: [['1.5%', '6%'], ['3%', '9.2%'], ['6.4%', '95.6%']],
    statistical_process_control: [['1.6%', '6.3%'], ['4%', '9.4%'], ['7.7%', '95.6%']],
    chart_dashboard: [['46.8%', '4.5%'], ['28.2%', '19%'], ['50.9%', '4.5%']],
    line_chart: [['6.5%', '25.8%'], ['2%', '15.5%'], ['6%', '20.7%']],
    histogram_widget: [['2.6%', '7.4%'], ['2%', '52.6%'], ['4.5%', '67.6%']],
    bar_plot: [['3%', '17.3%'], ['3%', '34.4%'], ['3%', '57.6%']],
    box_plot: [['3%', '17.8%'], ['3%', '26.2%'], ['3%', '38.8%']],
    time_graphics: [['12.2%', '4%'], ['25.4%', '45%'], ['45%', '75%']],
    align_compare: [['5%', '10%'], ['5%', '79%'], ['50%', '10%']],
    frequency_domain: [['4%', '8%'], ['30%', '50%'], ['4.5%', '29%']],
    order_map_view: [['59%', '4.5%'], ['8%', '39%'], ['14%', '25.9%']],
    intelligent_report: [['82%', '9.2%'], ['78%', '88.8%'], ['82%', '92%']],
    python_script: [['7.9%', '8.7%'], ['30%', '25%'], ['5.2%', '58.5%']],
    rotor_balancing: [['93%', '13%'], ['4%', '40%'], ['7%', '92%']],
    order_tracking: [['93%', '82.5%'], ['9%', '16.3%'], ['53.6%', '4%']],
    torsional_vibration: [['6.5%', '23.9%'], ['5.6%', '52.8%'], ['2%', '40%']],
    modal_analysis: [['89%', '19.6%'], ['12%', '18%'], ['12%', '48%']],
    operational_modal_analysis: [['7%', '18.5%'], ['7%', '21.6%'], ['7%', '46.1%']],
    time_ods: [['8%', '45.5%'], ['11%', '32.1%'], ['21.4%', '96.3%']],
    shock_srs: [['11%', '8.5%'], ['11%', '49.5%'], ['11%', '28%']],
    bearing_fault: [['5%', '24.9%'], ['17.4%', '4%'], ['47.8%', '4%']],
    kinematics_6dof: [['6%', '7.5%'], ['7%', '25.2%'], ['6%', '60.3%']],
    cross_axis_compensation: [['93%', '8.3%'], ['7%', '19.6%'], ['4%', '27%']],
    structural_health: [['93%', '10%'], ['5%', '14%'], ['5.5%', '16.9%']],
    cross_spectrum: [['5%', '8.6%'], ['5%', '19.3%'], ['5%', '28%']],
    machine_health_overview: [['54%', '18.8%'], ['12.5%', '8.6%'], ['12%', '18.2%']],
}

/** Return the real window capture for a widget, or null when none exists. */
export function getWidgetScreenshot(id) {
    const image = IMAGES[`../../assets/widget-ui/${id.replaceAll('_', '-')}.webp`]
    if (!image) return null
    return { image, hotspots: HOTSPOTS[id] || [], ...SIZE }
}
