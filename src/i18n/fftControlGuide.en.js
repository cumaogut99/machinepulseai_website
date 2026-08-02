const FFT_CONTROL_GUIDE_EN = {
    groups: [
        {
            name: '1 · Current navigation map',
            desc:
                'The current panel uses three kinds of navigation. Left-page buttons change settings, center buttons change the plotted result, and right buttons change the evidence panel. Only Compute starts a new calculation.',
            controls: [
                {
                    name: 'FFT Settings · Markers · Compare',
                    desc:
                        'These open one page in the left column. FFT Settings contains every calculation control; Markers contains peak, harmonic and sideband controls; Compare contains channel and time-range comparison workflows. Clicking the active page again collapses its content while leaving Compute accessible.',
                },
                {
                    name: 'Spectrum · PSD · Phase · STFT',
                    desc:
                        'These select the center result surface and do not start a calculation. Spectrum is magnitude, PSD is power density and Phase is phase angle. When no STFT result exists, STFT prepares Spectrogram mode and opens its setup; one channel and a new Compute are required to produce the map.',
                },
                {
                    name: 'Channels · Results',
                    desc:
                        'These open or collapse the right column. Channels selects the signals sent to calculation. Results contains three internal tabs—Summary, Peaks and Compare—derived from the most recent result.',
                },
            ],
        },
        {
            name: '2 · FFT Settings — Input and navigator',
            desc:
                'This group answers “which samples describe the state I care about?” A mathematically correct FFT of a mixed operating state can still be an unusable engineering answer.',
            controls: [
                {
                    name: 'Sample Rate',
                    desc:
                        'Read-only metadata from the active MPAI source, shown in samples per second. It sets Nyquist at fs/2 and contributes to bin spacing Δf = fs/N. If it is wrong, every frequency label is wrong; this field is not a resampling control.',
                },
                {
                    name: 'Navigator — Dual region',
                    desc:
                        'The default ↔ mode uses two boundaries to select an arbitrary time range. Moving a boundary after the first result triggers a calculation for the new range. Multi-block averaging is available because the range can contain the complete block train.',
                },
                {
                    name: 'Navigator — Single sliding window',
                    desc:
                        'Click the navigator mode button to scan one fixed FFT span with a single driver cursor. The window width is derived from Block / Lines and sample rate. Single mode deliberately forces Block Processing to None because every position represents one independently computed block.',
                },
                {
                    name: 'Channel',
                    desc:
                        'Selects the time-domain trace displayed in the navigator. It helps place the analysis cursors but does not replace the multi-select Channels panel on the right, which chooses the actual FFT input channels.',
                },
            ],
        },
        {
            name: '3 · FFT Settings — Spectrum',
            desc:
                'These controls choose the estimator and define one transform block. They directly change what the numerical result means.',
            controls: [
                {
                    name: 'Mode — FFT (amplitude)',
                    desc:
                        'Use for discrete deterministic content such as shaft orders, electrical tones, gear mesh and harmonics. It produces magnitude, phase, a per-bin PSD representation and detected-peak metrics. Start here when the selected state is approximately steady and your question is “which tones are present?”',
                },
                {
                    name: 'Mode — Welch PSD',
                    desc:
                        'Use for stationary random or broadband vibration when the question is power per hertz. The signal is split into windowed, overlapped segments and their periodograms are averaged. The main result unit is U²/Hz, so it remains comparable when bin spacing changes.',
                },
                {
                    name: 'Mode — Spectrogram (STFT)',
                    desc:
                        'Use when frequency content changes inside the selected range: run-up, coast-down, chirp, impact or a state transition. It computes a sequence of short FFT frames and arranges them by time. It is limited to one selected channel to keep the time × frequency matrix bounded.',
                },
                {
                    name: 'Window',
                    desc:
                        'Applies Hann, Hamming, Blackman, Flat-Top, Kaiser, Blackman-Harris, Gaussian, Bartlett, Tukey or Rectangular tapering before each transform. Hann is the current general default. Windows reduce edge-discontinuity leakage at the cost of wider peaks or changed amplitude behavior; Rectangular is appropriate only when the block is coherent.',
                },
                {
                    name: 'β · σ · α window parameter',
                    desc:
                        'Appears only for Kaiser, Gaussian or Tukey. Kaiser β defaults to 14, Gaussian σ to 0.4 and Tukey α to 0.5. Adjusting shape changes main-lobe width and sidelobe suppression, so it should follow a measurement need rather than visual preference.',
                },
                {
                    name: 'Block / Lines',
                    desc:
                        'Select Auto or 256 through 131072 samples; the current default is 4096. Fixed N gives Δf = fs/N and duration N/fs. Auto consumes the complete selected range for FFT, while fixed N consumes one block plus any requested averaging hops from the left boundary.',
                },
            ],
        },
        {
            name: '4 · FFT Settings — Frequency Band',
            desc:
                'This is a display and octave-analysis boundary, not a pre-FFT band-pass filter.',
            controls: [
                {
                    name: 'Min',
                    desc:
                        'Lower visible frequency bound in hertz; default 0 starts at DC. Raising Min can make a region easier to inspect, but it does not remove low-frequency content from peak detection or summary metrics.',
                },
                {
                    name: 'Max',
                    desc:
                        'Upper visible frequency bound in hertz. The default 0 means use Nyquist automatically. Entering 500 Hz on a 2048 Hz Nyquist recording zooms the result to 0–500 Hz; it does not protect acquisition from aliasing.',
                },
            ],
        },
        {
            name: '5 · FFT Settings — Block Processing',
            desc:
                'This group decides how repeated blocks are combined. Averages are useful only when the combined blocks describe the same statistical operating condition.',
            controls: [
                {
                    name: 'Mode — None (single block)',
                    desc:
                        'Transforms one block and preserves its instantaneous detail. This is the default and the only mode available in Single navigator mode. Use it first to understand the raw variability before smoothing or holding values.',
                },
                {
                    name: 'Mode — Linear',
                    desc:
                        'Computes the selected number of overlapping FFT blocks and gives them equal weight. Random variance becomes steadier, while persistent tones remain visible. It can hide change when speed, load or excitation varies across the combined span.',
                },
                {
                    name: 'Mode — Exponential',
                    desc:
                        'Updates the running result with (1−α)·old + α·new, so recent blocks matter more. It is useful for a slowly changing but continuously observed state. It is not the same as a simple equal-weight average and depends on block order.',
                },
                {
                    name: 'Mode — Max Hold',
                    desc:
                        'Keeps the largest magnitude observed in each frequency bin across the selected blocks. Use it to find intermittent or worst-case presence. Do not interpret the resulting curve as typical energy or the spectrum of one physical instant.',
                },
                {
                    name: 'Blocks',
                    desc:
                        'Number of blocks combined, from 1 to 1000; the prepared value defaults to 10. The requested source span is N + (Blocks−1)·hop. If the selected range is shorter, only the available complete calculation span can be used.',
                },
                {
                    name: 'Overlap',
                    desc:
                        'Choose 0, 25, 50, 67, 75 or 87.5%; default is 50%. Hop is approximately N·(1−overlap). Overlap reuses samples to obtain more windowed blocks from a duration; it increases compute and does not improve the fundamental Δf of each block.',
                },
                {
                    name: 'Exp. α',
                    desc:
                        'Visible only for Exponential mode; range 0.01–1 and default 0.1. Small α is smoother but slow to react; large α follows change quickly but leaves more variation. α is the fraction assigned to the newest block.',
                },
            ],
        },
        {
            name: '6 · FFT Settings — Post-processing',
            desc:
                'These controls change how computed spectral quantities are presented or transformed. Verify physical units before applying weighting or integration.',
            controls: [
                {
                    name: 'Y Axis',
                    desc:
                        'Magnitude (linear) is the default and shows engineering-unit amplitude plus linear PSD in U²/Hz. Magnitude (logarithmic) uses those physical values on logarithmic Spectrum and PSD axes. Magnitude (dB) shows magnitude dB and PSD dB/Hz; Phase stays in degrees. The cached Spectrum, PSD and Peaks column repaint immediately.',
                },
                {
                    name: 'Weighting',
                    desc:
                        'None (Z) is flat and is the default for general vibration work. A, B and C weighting apply acoustic frequency emphasis in the dB domain. Weighting does not calibrate a sensor and should not be used merely to make the curve look cleaner.',
                },
                {
                    name: 'Integration',
                    desc:
                        'None keeps the source quantity, Single converts calibrated acceleration to velocity, and Double converts it to displacement in the frequency domain. Division by frequency magnifies low-frequency bias and noise; DC is suppressed because integration is singular at 0 Hz.',
                },
                {
                    name: 'Octave overlay',
                    desc:
                        'Off is the default. 1/1, 1/3, 1/12 or 1/24 octave computes band power and overlays band centers on the narrowband spectrum. It summarizes energy by proportional bands; it is not smoothing of the original FFT bins.',
                },
            ],
        },
        {
            name: '7 · Channels',
            desc:
                'The current FFT widget supports multi-channel FFT, PSD and phase overlays. Channel selection is part of the calculation recipe.',
            controls: [
                {
                    name: 'Signal checklist',
                    desc:
                        'Check one or more compatible channels. Every selected channel is computed sequentially with the same settings and receives a separate plot color. The first selected channel supplies the top-level summary; channel-specific results remain available for overlays and comparison.',
                },
                {
                    name: 'All · Clear',
                    desc:
                        'All selects every listed signal; Clear removes every selection. Compute remains invalid until at least one channel is checked. Avoid selecting unrelated units merely because the overlay is available.',
                },
            ],
        },
        {
            name: '8 · Markers',
            desc:
                'Peak thresholds change the next calculation. Peak-label, harmonic and sideband display controls repaint the cached result immediately.',
            controls: [
                {
                    name: 'Max Peaks · Min Magnitude',
                    desc:
                        'Max Peaks accepts 1–100 candidates and defaults to 20. Min Magnitude spans −200 to 200 dB and defaults to −80 dB. Accepted local maxima are refined with a three-bin parabola, but refinement cannot create physical resolution beyond the block and window.',
                },
                {
                    name: 'Show detected peaks on spectrum',
                    desc:
                        'Draws up to ten labelled vertical lines from the current accepted peak list. Turning it off removes visual clutter without removing rows from Peaks or changing metrics.',
                },
                {
                    name: 'Show harmonic family · Fundamental',
                    desc:
                        'Enable an f₀, 2f₀, 3f₀… comb. Fundamental can use the dominant detected peak automatically or a Manual f₀. Automatic mode is only correct when the dominant peak truly represents the physical fundamental.',
                },
                {
                    name: 'Manual f₀ · Harmonics',
                    desc:
                        'Manual f₀ defaults to 50 Hz and can be set to a known shaft, electrical or excitation frequency. Harmonics defaults to 8 and ranges from 1 to 50. These are visual cursors; they do not alter FFT bins or THD calculation.',
                },
                {
                    name: 'Show sideband family · Sideband Δf · Sidebands / side',
                    desc:
                        'Draws carrier ± n·Δf around the dominant peak. Spacing defaults to 10 Hz and count to three on each side. Use a known modulation frequency as Δf; the overlay is a hypothesis aid, not an automatic modulation diagnosis.',
                },
            ],
        },
        {
            name: '9 · Compare',
            desc:
                'Compare offers a simple two-channel workflow and an advanced two-time-range workflow. Both preserve the active FFT recipe.',
            controls: [
                {
                    name: 'Reference A · Compare B · Compute and Compare',
                    desc:
                        'Choose two distinct channels, then compute both with identical settings. Their spectra are overlaid and A/B dominant frequencies are marked. Results → Compare reports numerical deltas for key metrics.',
                },
                {
                    name: 'Capture current range as Reference A',
                    desc:
                        'Freezes the current spectrum and its time range. Move the navigator to another operating state and Compute again to create Current B while A remains overlaid. Capturing does not write a new MPAI channel.',
                },
                {
                    name: 'Clear Reference A',
                    desc:
                        'Removes the frozen time-range reference and its overlay. It does not clear the latest computed result or the channel-comparison pair.',
                },
            ],
        },
        {
            name: '10 · Results — Summary, Peaks and Compare',
            desc:
                'Results is evidence from the most recent calculation. A dash means unavailable or not produced, not a measured zero.',
            controls: [
                {
                    name: 'Summary',
                    desc:
                        'Shows Peak Frequency, Peak Magnitude, Resolution Δf, Averages, THD, SINAD, SNR and Overall RMS when available. Read Δf and Averages before interpreting the more impressive-looking metrics because they describe how the estimate was formed.',
                },
                {
                    name: 'Peaks',
                    desc:
                        'Lists Frequency, Magnitude and Phase for accepted peaks. The Magnitude header follows linear, logarithmic or dB presentation. Frequency interpolation can refine a peak estimate between bins, but it does not separate two unresolved physical tones.',
                },
                {
                    name: 'Compare',
                    desc:
                        'Shows Reference, Compare and Δ(B−A) for dominant frequency, peak magnitude, THD, SINAD and SNR when two channels were compared. Sign and desirability are not the same: for example, higher SNR can be good while higher THD may be bad.',
                },
            ],
        },
        {
            name: '11 · Compute and status',
            desc:
                'The primary action is deliberately separate from view navigation so changing a table or result tab cannot silently recompute data.',
            controls: [
                {
                    name: '▶ Compute · Computing…',
                    desc:
                        'Validates channel selection, collects every current setting and runs the C++ analysis in the background. The button is disabled during the active calculation. Marker display and Y-axis changes can repaint cached output, but parameter changes that affect calculation require Compute.',
                },
                {
                    name: 'Completion and partial-range message',
                    desc:
                        'Reports channel count, dominant peak, sample rate, average count and analysed rows. If fixed N and averaging consume fewer samples than the cursor selection, the status explicitly states analysed versus selected rows. Treat that warning as a scope boundary, not a cosmetic note.',
                },
            ],
        },
    ],
}

export default FFT_CONTROL_GUIDE_EN
