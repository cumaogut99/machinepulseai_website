const FFT_CONTROL_GUIDE_EN = {
    groups: [
        {
            name: '1 · Navigation and Page Controls',
            desc:
                'The MachinePulseAI interface provides 3 primary navigation axes: Left buttons select settings pages, center buttons switch chart view modes, and right buttons manage channels and result tables.',
            controls: [
                {
                    name: 'FFT Settings · Markers · Compare',
                    desc:
                        'Left-panel pages. FFT Settings contains calculation parameters (sampling, window, block size, averaging); Markers manages peak detection and harmonic/sideband cursors; Compare configures channel and time-range comparison.',
                },
                {
                    name: 'Spectrum · PSD · Phase · STFT',
                    desc:
                        'Selects the center chart result surface. Spectrum shows magnitude spectrum, PSD shows power density per hertz, Phase shows phase angle, and STFT opens the time-frequency spectrogram map.',
                },
                {
                    name: 'Channels · Results',
                    desc:
                        'Manages the right column. Channels selects input signals for calculation. Results provides Summary metrics (RMS, THD, SNR), detected Peaks, and Compare tables.',
                },
            ],
        },
        {
            name: '2 · FFT Settings — Input and Navigator',
            desc:
                'Defines the time-domain signal and isolates a stationary operating range for calculation.',
            controls: [
                {
                    name: 'Sample Rate (fs)',
                    desc:
                        'Read-only metadata from the MPAI source in samples per second. It sets the Nyquist limit at fs/2 and defines bin spacing Δf = fs/N. It reflects the hardware acquisition rate.',
                },
                {
                    name: 'Navigator — Dual region',
                    desc:
                        'Uses two vertical cursors to select a steady operating state. Moving a boundary automatically recomputes the spectrum in C++ for the new range.',
                },
                {
                    name: 'Navigator — Single sliding window',
                    desc:
                        'Scans a fixed block size (N) across the signal using a single cursor, ideal for observing instant frequency transitions.',
                },
                {
                    name: 'Channel',
                    desc:
                        'Selects the background trace displayed in the time navigator to help position analysis cursors.',
                },
            ],
        },
        {
            name: '3 · FFT Settings — Spectrum (Estimator and Window)',
            desc:
                'Core mathematical parameters choosing estimator mode, windowing taper, and block resolution.',
            controls: [
                {
                    name: 'Mode — FFT (amplitude)',
                    desc:
                        'Used for discrete deterministic components like shaft speed (1x, 2x), harmonics, gear mesh, and electrical line tones, reporting magnitude and phase.',
                },
                {
                    name: 'Mode — Welch PSD',
                    desc:
                        'Computes stationary random vibration power density (g²/Hz). Averaging overlapped periodograms stabilizes random noise and enables comparison across different block sizes.',
                },
                {
                    name: 'Mode — Spectrogram (STFT)',
                    desc:
                        'Displays time-varying frequency content (run-up, coast-down, transient impact) on a 2D time-frequency color heatmap.',
                },
                {
                    name: 'Window (Tapering Function)',
                    desc:
                        'Tapers block ends to prevent spectral leakage:\n' +
                        '• Hann (Default): Standard choice for 90% of general vibration work. Smooth edge attenuation provides an optimal balance between leakage suppression and peak width.\n' +
                        '• Flat-Top: Used for ISO 10816 / 20816 calibrated amplitude/severity (RMS/Peak) measurements. Broad peak top reduces amplitude error to <0.1% at the expense of wider frequency resolution.\n' +
                        '• Blackman / Blackman-Harris: High sidelobe suppression (>92 dB). Ideal for resolving a weak tone located close to a strong dominant tone.\n' +
                        '• Rectangular (None): Appropriate only for coherent signals (exact integer cycles per block) or transient impact hammer tests. Causes severe leakage on continuous signals.\n' +
                        '• Kaiser / Tukey / Gaussian: Parameterized pencereler (β, α, σ) allowing fine adjustment of leakage vs. main-lobe width for specialized applications.',
                },
                {
                    name: 'β · σ · α window parameter',
                    desc:
                        'Adjusts tapering steepness for Kaiser (β: 0.01–50, default 14), Gaussian (σ: 0.01–5, default 0.4), or Tukey (α: 0–1, default 0.5). Higher values suppress leakage but broaden peaks.',
                },
                {
                    name: 'Block / Lines (N Block Size)',
                    desc:
                        'Sets samples per transform (256–131072, default 4096). Bin spacing Δf = fs/N and duration T = N/fs. Larger N provides finer bin spacing (e.g. fs=4096 Hz, N=4096 => Δf=1 Hz) but requires a longer stationary duration.',
                },
            ],
        },
        {
            name: '4 · FFT Settings — Frequency Band',
            desc:
                'Zooms the displayed frequency range; does not filter data prior to calculation.',
            controls: [
                {
                    name: 'Min',
                    desc:
                        'Lower display bound in Hz. Default 0 Starts from DC.',
                },
                {
                    name: 'Max',
                    desc:
                        'Upper display bound in Hz. Default 0 automatically uses Nyquist (fs/2). Max=500 Hz zooms the view to 0–500 Hz.',
                },
            ],
        },
        {
            name: '5 · FFT Settings — Block Processing (Averaging)',
            desc:
                'Combines multiple transform blocks to stabilize estimates.',
            controls: [
                {
                    name: 'Mode — None (Single Block)',
                    desc:
                        'No averaging; transforms one block to preserve raw instantaneous detail.',
                },
                {
                    name: 'Mode — Linear',
                    desc:
                        'Equal-weight average across blocks. Reduces random variance while preserving stationary tones.',
                },
                {
                    name: 'Mode — Exponential',
                    desc:
                        'Applies higher weight to recent blocks to track slowly changing processes dynamically.',
                },
                {
                    name: 'Mode — Max Hold',
                    desc:
                        'Retains the peak magnitude per frequency bin across blocks, capturing intermittent spikes or worst-case vibration levels.',
                },
                {
                    name: 'Blocks',
                    desc:
                        'Number of blocks combined (1–1000, default 10). Higher counts reduce random noise.',
                },
                {
                    name: 'Overlap',
                    desc:
                        'Block overlap percentage (0%, 25%, 50%, 75%; default 50%). 50% overlap improves data efficiency and compensates for windowing edge loss.',
                },
                {
                    name: 'Exp. α',
                    desc:
                        'Smoothing coefficient for Exponential averaging (0.01–1.0).',
                },
            ],
        },
        {
            name: '6 · FFT Settings — Post-processing',
            desc:
                'Manages display scaling, acoustic weighting, and frequency-domain integration.',
            controls: [
                {
                    name: 'Y Axis',
                    desc:
                        'Switches Y axis between Linear (g, mm/s), Logarithmic, and dB. dB scale reveals weak harmonics and noise floor.',
                },
                {
                    name: 'Weighting',
                    desc:
                        'Applies acoustic A, B, or C weighting in dB mode. Use Z (Flat/None) for general machine vibration.',
                },
                {
                    name: 'Integration',
                    desc:
                        'Converts Acceleration to Velocity (Single) or Displacement (Double) in frequency domain. 0 Hz DC is zeroed to prevent bias amplification.',
                },
                {
                    name: 'Octave overlay',
                    desc:
                        'Overlays 1/1, 1/3, 1/12, or 1/24 octave band power over the narrowband spectrum.',
                },
            ],
        },
        {
            name: '7 · Channels',
            desc:
                'Multi-channel selection to compute and overlay multiple sensor channels simultaneously.',
            controls: [
                {
                    name: 'Signal checklist',
                    desc:
                        'Check channels to calculate. All checked channels are processed with identical FFT settings and plotted in distinct colors.',
                },
                {
                    name: 'All · Clear',
                    desc:
                        'Selects or clears all listed signals.',
                },
            ],
        },
        {
            name: '8 · Markers',
            desc:
                'Diagnostic tools for peak detection and harmonic/sideband comb overlays.',
            controls: [
                {
                    name: 'Max Peaks · Min Magnitude',
                    desc:
                        'Sets maximum peaks listed and minimum dB threshold. Parabolic 3-bin interpolation refines peak locations between bins.',
                },
                {
                    name: 'Show detected peaks on spectrum',
                    desc:
                        'Overlays vertical labels on detected peaks.',
                },
                {
                    name: 'Show harmonic family · Fundamental (f0)',
                    desc:
                        'Draws harmonic lines (f0, 2f0, 3f0...) based on shaft speed (f0 = RPM/60).',
                },
                {
                    name: 'Manual f0 · Harmonics',
                    desc:
                        'Sets fundamental frequency manually and defines number of harmonic lines drawn.',
                },
                {
                    name: 'Show sideband family · Sideband Δf',
                    desc:
                        'Overlays symmetric sidebands (Carrier ± n·Δf) to inspect gear mesh or bearing fault modulation.',
                },
            ],
        },
        {
            name: '9 · Compare',
            desc:
                'Overlay comparison of two channels or two time ranges (e.g. baseline vs. high load).',
            controls: [
                {
                    name: 'Reference A · Compare B · Compute and Compare',
                    desc:
                        'Computes and overlays two channels with identical settings.',
                },
                {
                    name: 'Capture current range as Reference A',
                    desc:
                        'Freezes current spectrum as Reference A. Moving navigator to another state computes Current B for direct comparison.',
                },
                {
                    name: 'Clear Reference A',
                    desc:
                        'Removes the frozen reference spectrum overlay.',
                },
            ],
        },
        {
            name: '10 · Results — Summary, Peaks and Compare',
            desc:
                'Numerical metrics and tables from the latest calculation.',
            controls: [
                {
                    name: 'Summary',
                    desc:
                        'Reports Peak Frequency, Peak Magnitude, Δf resolution, THD, SINAD, SNR, and Overall RMS.',
                },
                {
                    name: 'Peaks',
                    desc:
                        'Lists refined Frequency, Magnitude, and Phase for all accepted peaks.',
                },
                {
                    name: 'Compare',
                    desc:
                        'Reports numerical deltas (Δ = B - A) between Reference A and Compare B.',
                },
            ],
        },
        {
            name: '11 · Compute and Status',
            desc:
                'Main action trigger and calculation status readout.',
            controls: [
                {
                    name: '▶ Compute · Computing…',
                    desc:
                        'Dispatches selected range and FFT parameters to the C++ background worker.',
                },
                {
                    name: 'Completion and status message',
                    desc:
                        'Reports calculation duration, samples used, Δf resolution, and dominant peak.',
                },
            ],
        },
    ],
}

export default FFT_CONTROL_GUIDE_EN
