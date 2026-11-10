// Each row follows the guide's authored control groups and names the screen
// regions where that group's explanation belongs. Tests check every group and
// region so a changed tour or reordered group cannot silently lose guidance.
export const CONTROL_REGIONS = {
    file_reader: [
        {"name":"File and format settings","regions":["select","format","autodetect","separator"]},
        {"name":"Header, unit and data rows","regions":["header","units","rows","unitrow","units:start"]},
        {"name":"Time column settings","regions":["time","mode","rate","newtime:start","unit"]},
        {"name":"Preview, Refresh and Import","regions":["preview","import"]},
    ],
    data_merger: [
        {"name":"Source Folder and Scan Folder","regions":["folder","files"]},
        {"name":"Order and Auto sort","regions":["sort"]},
        {"name":"Table Preview and row layout","regions":["preview","rowlayout"]},
        {"name":"Merge Plan","regions":["plan","layout","fill"]},
        {"name":"Diagnostics and Merge Files","regions":["diagnostics","merge","status"]},
    ],
    data_exporter: [
        {"name":"Channels","regions":["channels","filter"]},
        {"name":"Output: format and file","regions":["output","format"]},
        {"name":"Format Options","regions":["options"]},
        {"name":"Export Range and different lengths","regions":["range","ragged"]},
    ],
    random_generator: [
        {"name":"Recording settings","regions":["recording"]},
        {"name":"Example scene","regions":["scene"]},
        {"name":"Signals and Channel parameters","regions":["signals","params","type"]},
        {"name":"Generate and the graph","regions":["generate","plot"]},
    ],
    channel_selector: [
        {"name":"Selection Rule: Mode","regions":["mode","channels"]},
        {"name":"Pattern","regions":["pattern"]},
        {"name":"Create Channel View","regions":["create","status","info"]},
    ],
    merge_channels: [
        {"name":"Layout","regions":["layout","inputs"]},
        {"name":"Time handling and short channels","regions":["time"]},
        {"name":"Output estimate and Merge Preview","regions":["estimate","preview"]},
        {"name":"Create Merged Dataset","regions":["create"]},
    ],
    table_edit: [
        {"name":"Table, Jump and column statistics","regions":["table","jump","stats","channels","save"]},
        {"name":"Edit, Rows, Fill and Find","regions":["edit:tools","rows:action","rows:rows","rows:apply","fill:mode","find:find","find:replace","find:nan"]},
        {"name":"Formula and Transpose","regions":["formula:editor","formula:apply","transpose:info","transpose:apply"]},
        {"name":"Type, Encode and Date","regions":["type:target","encode:source","date:format"]},
        {"name":"Resample and Graph","regions":["resample:target","resample:up","resample:down","graph:graph"]},
    ],
    normalization_scaling: [
        {"name":"Scaling Method","regions":["method"]},
        {"name":"Target Channels","regions":["targets"]},
        {"name":"Create Normalized Channels","regions":["create","preview"]},
    ],
    groupby_aggregation: [
        {"name":"Group By Columns","regions":["groupby"]},
        {"name":"Aggregation Functions","regions":["functions"]},
        {"name":"Value Columns","regions":["values"]},
        {"name":"Time-Based Grouping","regions":["timebins"]},
    ],
    time_alignment: [
        {"name":"Alignment Channels and the plots","regions":["channels","overlay","plot"]},
        {"name":"Auto Alignment","regions":["auto"]},
        {"name":"Manual shift: Step, ◀ ▶, Reset, Fit","regions":["step","total"]},
        {"name":"Output and Global Cursor Crop","regions":["output","crop"]},
        {"name":"Apply Alignment","regions":["apply"]},
    ],
    rolling_window_stats: [
        {"name":"Window","regions":["unit","size","align"]},
        {"name":"Features","regions":["features"]},
        {"name":"Target Channels and Create Rolling Features","regions":["targets","create"]},
    ],
    sensor_calibration: [
        {"name":"Sensor type (presets)","regions":["sensor","channels"]},
        {"name":"Mode","regions":["mode","values","extrapolate"]},
        {"name":"Output unit and Name suffix","regions":["unit","suffix"]},
        {"name":"Create Calibrated Channels","regions":["create"]},
    ],
    statistics_summary: [
        {"name":"Bar metric and Outlier threshold","regions":["metric","outlier"]},
        {"name":"Summary tab","regions":["summary:table","overview"]},
        {"name":"Quality tab","regions":["quality:table"]},
        {"name":"Robust tab and Findings","regions":["robust:table","findings"]},
    ],
    correlation_analysis: [
        {"name":"Target channel and Candidates","regions":["target","candidates"]},
        {"name":"Relationship","regions":["relationship"]},
        {"name":"Lag and Analysis grid step","regions":["lag","grid","window"]},
        {"name":"Results and Findings","regions":["table","findings"]},
    ],
    hypothesis_testing: [
        {"name":"Test","regions":["test"]},
        {"name":"Reference mean","regions":["refmean"]},
        {"name":"Result row","regions":["table","findings"]},
    ],
    statistical_process_control: [
        {"name":"EWMA λ","regions":["ewma"]},
        {"name":"Lower and Upper specification limit","regions":["lsl","usl"]},
        {"name":"Result columns","regions":["table","findings"]},
    ],
    line_chart: [
        {"name":"Channels and layout","regions":["channels","signals","layout","target"]},
        {"name":"Navigator strip","regions":["navigator"]},
        {"name":"Settings: envelope and time format","regions":["envelope","timeformat"]},
        {"name":"Markers","regions":["click","snap","marker","delta","extrema","table"]},
        {"name":"Stats and Insights","regions":["stats","insights"]},
    ],
    histogram_widget: [
        {"name":"Bin Rule and Range","regions":["binrule","range"]},
        {"name":"Y Axis","regions":["yaxis"]},
        {"name":"Markers, Distribution Fit and Overlay","regions":["markers","fit","overlay","percentiles","fitbtn","kde"]},
    ],
    scatter_plot: [
        {"name":"Channels: X and Y","regions":["channels"]},
        {"name":"Appearance","regions":["appearance"]},
        {"name":"Regression","regions":["regression","robust"]},
        {"name":"Correlation, Stats and Insights","regions":["correlation","stats","insights"]},
    ],
    box_plot: [
        {"name":"View","regions":["view"]},
        {"name":"Whiskers","regions":["whiskers"]},
        {"name":"Outliers and Analysis","regions":["outliers","analysis"]},
        {"name":"Stats and Insights","regions":["stats","insights"]},
    ],
    bar_plot: [
        {"name":"Sort & Filter","regions":["sort"]},
        {"name":"Orientation, Display, Bar Width","regions":["orientation","display","width"]},
        {"name":"Value Labels and Reference Line","regions":["labels","reference"]},
        {"name":"Channels","regions":["channels"]},
    ],
    chart_dashboard: [
        {"name":"Add, Templates, Edit","regions":["add","templates","edit"]},
        {"name":"Signals","regions":["signals","signals:cell"]},
        {"name":"Settings","regions":["settings","settings:cell"]},
        {"name":"Navigator strip and Stats","regions":["overview","stats","scorecard"]},
    ],
    time_graphics: [
        {"name":"Graphs and Graph Settings","regions":["settings","zoom","reset","graphs"]},
        {"name":"Parameters","regions":["parameters"]},
        {"name":"Statistics and Statistics Settings","regions":["stats","columns","duty"]},
        {"name":"Bitmask","regions":["bitmask"]},
        {"name":"Markers","regions":["markers"]},
    ],
    align_compare: [
        {"name":"Source / Channel tree","regions":["tree"]},
        {"name":"Time reference","regions":["alignby","auto","reference","offset"]},
        {"name":"Comparison","regions":["window","grid","trace"]},
        {"name":"Overlay, Difference, Metrics","regions":["tabs","plot","table","copy"]},
    ],
    frequency_domain: [
        {"name":"Displayed Result and Amplitude Convention","regions":["source","plot"]},
        {"name":"Navigator and Comparison","regions":["navigator","comparison"]},
        {"name":"Reference Tolerance","regions":["tolerance"]},
        {"name":"Markers","regions":["interaction","marker","band","harmonics","sidebands","qdamping","table"]},
    ],
    order_map_view: [
        {"name":"Display: Source, Metric, Surface","regions":["display","metric","surface"]},
        {"name":"Colormap and colour scale","regions":["colormap"]},
        {"name":"Pointer readout and Prepared guides","regions":["guides","data"]},
        {"name":"Color Range","regions":["range"]},
        {"name":"2D Map and 3D Waterfall","regions":["mode","plot"]},
    ],
    intelligent_report: [
        {"name":"Available Content","regions":["content","add"]},
        {"name":"Report structure","regions":["structure","blocks","limits"]},
        {"name":"Page settings and templates","regions":["title","templates"]},
        {"name":"Test Information","regions":["testinfo"]},
        {"name":"Export and Regenerate","regions":["exports","regenerate"]},
    ],
    python_script: [
        {"name":"Mode","regions":["mode","examples"]},
        {"name":"Editor, header and footer","regions":["editor","header","footer"]},
        {"name":"Run buttons","regions":["run","emit"]},
        {"name":"Console, Result, Plot, Variables","regions":["console","variables","variables:table"]},
        {"name":"Parameters","regions":["paramtab","parameters:table","preview"]},
        {"name":"Open in VS Code, Save as Widget","regions":["vscode","save"]},
    ],
    frequency_filter: [
        {"name":"Family and Mode","regions":["parameters","presets","preset_notch"]},
        {"name":"Order, Cutoff and Zero-Phase","regions":["parameters","quality","bode"]},
        {"name":"Output and Apply Filter","regions":["output","apply","graph","status"]},
    ],
    smoothing_filter: [
        {"name":"Method","regions":["parameters"]},
        {"name":"Window Size / Polynomial Order","regions":["parameters","quality","bode"]},
        {"name":"EMA alpha","regions":["parameters","graph"]},
    ],
    math_transform: [
        {"name":"Operation","regions":["operation"]},
        {"name":"Remove DC offset","regions":["operation","graph"]},
        {"name":"Difference method","regions":["operation"]},
    ],
    advanced_diagnostics: [
        {"name":"Method","regions":["method"]},
        {"name":"Carrier Center and Bandwidth","regions":["band"]},
        {"name":"Apply Analysis","regions":["apply","graph","output"]},
    ],
    kalman_filter: [
        {"name":"Process Noise Q","regions":["parameters"]},
        {"name":"Measurement Noise R","regions":["parameters"]},
        {"name":"Initial Covariance P₀ and Processing Mode","regions":["parameters","mode","graph"]},
    ],
    spike_detection: [
        {"name":"Detection method","regions":["detection"]},
        {"name":"Threshold and Window Size","regions":["detection"]},
        {"name":"Replacement","regions":["replacement","graph"]},
    ],
    data_quality_repair: [
        {"name":"Z-score threshold","regions":["operation"]},
        {"name":"Operation","regions":["operation"]},
        {"name":"Channels and Apply","regions":["channels","apply"]},
    ],
    range_filter: [
        {"name":"Range Condition and Add / Update","regions":["condition"]},
        {"name":"Active Filters, Remove and Clear","regions":["rules","parameters"]},
        {"name":"Apply Range Filter","regions":["apply","status"]},
    ],
    rotor_balancing: [
        {"name":"Signal assignment and 1X measurement","regions":["run_capture","tacho","quality","channels"]},
        {"name":"Balance Setup","regions":["balance_setup","polar"]},
        {"name":"Runs and Calculate Correction","regions":["runs","correction"]},
    ],
    order_tracking: [
        {"name":"Vibration and rotation reference","regions":["signals","reference","tacho","virtual_tacho"]},
        {"name":"Setup and Display","regions":["setup","display","cutoff","tracking","extraction","vk_orders","vk_bandwidth"]},
        {"name":"Result views","regions":["map_view","map","trend_amp","trend_phase","cut_x","cut_y","vk_plot"]},
    ],
    bearing_fault: [
        {"name":"Bearing, speed and gear data","regions":["bearing","gear","channels"]},
        {"name":"Analysis settings: envelope band","regions":["envelope_band","kurtogram_level"]},
        {"name":"Result tabs","regions":["envelope","cepstrum","tsa","trend","verdict","faults","indicators"]},
    ],
    torsional_vibration: [
        {"name":"Analysis Mode and Sensor","regions":["mode","sensor","channels"]},
        {"name":"Missing Teeth, Gap Ratio and pulse rejection","regions":["trigger"]},
        {"name":"Trigger","regions":["trigger"]},
    ],
    modal_analysis: [
        {"name":"Excitation and response channels","regions":["excitation","responses"]},
        {"name":"FRF Parameters","regions":["frf_parameters","estimator_view"]},
        {"name":"LSCF Stabilization and LSFD fit","regions":["lscf","lsfd","stabilization","modal_table"]},
    ],
    operational_modal_analysis: [
        {"name":"Algorithm","regions":["algorithm"]},
        {"name":"Max Model Order and Block Rows (SSI)","regions":["algorithm"]},
        {"name":"FDD / EFDD Spectral Parameters","regions":["preprocess","band"]},
    ],
    time_ods: [
        {"name":"Geometry Mapping","regions":["geometry_mapping"]},
        {"name":"Reference","regions":["reference","reference_state"]},
        {"name":"Animation and export","regions":["shape","display","timeline"]},
    ],
    kinematics_6dof: [
        {"name":"Input Mode","regions":["mode","channels"]},
        {"name":"Integration and drift compensation","regions":["integration","drift","outputs"]},
        {"name":"ISO 2631 weighting and metrics","regions":["iso2631","rms_trend","families","summary"]},
    ],
    shock_srs: [
        {"name":"Source and signal correction","regions":["source","channels"]},
        {"name":"Shock Pulse window","regions":["pulse","navigator"]},
        {"name":"Model: Q, damping and spectra","regions":["model","frequency","display","posneg"]},
    ],
    cross_axis_compensation: [
        {"name":"Axis assignment and input unit","regions":["channels","source"]},
        {"name":"Off-diagonal entry format","regions":["matrix"]},
        {"name":"Sensitivity matrix and acceptance gate","regions":["matrix","gate","calibrate","import","metrics"]},
    ],
}

/** Attach the existing, localized control copy to its matching screen region. */
export function attachControlGuidance(widgetId, views, controls) {
    const bindings = CONTROL_REGIONS[widgetId]
    if (!bindings) return views
    if (bindings.length !== controls.length) throw new Error(`Control groups changed for ${widgetId}`)
    return views.map((view) => ({
        ...view,
        points: view.points.map((point) => ({
            ...point,
            controls: controls.filter((_, index) => bindings[index].regions.some((region) =>
                region === point.id || region === `${view.id}:${point.id}`)),
        })),
    }))
}
