# Widget learning guides

The module library now links to 36 additional bilingual guides. The 13 existing
Vibration, Structural & Kinematics courses use the same control tour and knowledge
check components. FFT / Spectrum and Rotor Dynamics retain their dedicated courses.

## Editorial scope

- Ready Data I/O: File Reader, File Merger, File Exporter and Data Generator.
- Preprocessing, filters, statistics, visualization, reporting and Python Script.
- Engineering: the existing Vibration, Structural & Kinematics courses.
- Planned Data I/O, Machine Learning and other engineering subgroups are excluded.

Each new guide includes purpose, prerequisites, three explained controls, core
concepts, a typeset relationship, an illustrative worked example, a knowledge
check, workflow, outputs, mistakes, references and related guides. Thirty-five
pages also expose adjustable scalar teaching models.

## Content and implementation

`src/data/learning/` contains compact bilingual editorial records split by family.
`lesson.js` expands them into the guide schema; `widgetLearning.js` adapts that
schema to the existing detail-route registry. Existing Data I/O URLs are preserved.
Translations enter i18next through `src/i18n/widgetLearning.js`.

`WidgetLearningPage` is the shared page. `LearningWorkbench` is a labelled
conceptual control tour, not an invented application screenshot. `LearningExercise`
handles answer/retry state. `LearningConceptLab` adjusts scalar relationships
without reading measurement data or running a product analysis. Those models are
kept in `conceptLabs.js`; outputs must remain clearly labelled as synthetic.

Controls were checked against the local application under `python/widgets/`:

- Normalization exposes Z-score, Min-Max and guarded exact median/IQR.
- Calibration exposes linear, polynomial and lookup-table modes.
- Dataset Merge distinguishes validated time grids from padded row-index grids.
- Advanced Diagnostics currently enables Hilbert envelope; its other entries are disabled.
- Scalar Kalman filtering is not advertised as multi-sensor fusion.
- Scatter OLS uses finite source pairs; the robust overlay uses a bounded subset.
- Frequency Domain consumes prepared FFT results and frame banks.
- Order Map View displays prepared surfaces and producer-supplied guides.
- Rotor Balancing keeps the measured physical keyphasor and validated single-plane contract.

NIST, SciPy and Apache Arrow references explain underlying concepts. They are not
claims that the desktop application uses SciPy for computation. Numerical examples
illustrate stated assumptions and are not customer measurements or benchmarks.

## Engineering interface tours

FFT / Spectrum, Frequency Response & Cross Spectrum and the Vibration, Structural
& Kinematics widgets use `InterfaceTour`: a view selector over several real
captures of the widget window (one settings page plus one result tab each),
numbered hotspots and an explanation panel. `TourHotspot` is the single compact
marker used by every tour on the site.

- Copy: `src/data/learning/tours/*.js`, bilingual `[en, tr]` pairs per view and point.
- Captures: `src/assets/widget-tours/<widget-id-with-hyphens>--<view>.webp`
  (2000 × 1060, Space theme, synthetic validation data).
- Hotspots: `src/data/learning/tours/tourAnchors.js` is generated. The capture
  script drives the desktop application, opens each window state and measures
  the geometry of the group boxes, labels, buttons and plots it points at. Do not
  hand-place coordinates; re-capture the view so markers stay aligned.
- Structural Health Monitoring and Machine Health Overview ship in the next
  release: their cards show a “Coming soon” badge, have no learning link, are
  removed from the sitemap and their routes redirect to `/widgets`.

## Verification

```sh
node --test tests/widget-learning.test.mjs
npm run build
```

The contract checks cover in-scope route availability, bilingual schema parity,
formula parsing, related links, excluded modules, original URLs and teaching-model
outputs/boundaries. Browser review covered all 49 changed guides in English desktop
and Turkish mobile layouts (98 views), control selection, wrong/correct answers,
slider updates/reset, related routes, equation rendering and horizontal overflow.
Live language switching and sticky chapter navigation were checked separately.

Production and development render the complete site with the same routes.
Pushing `main` publishes through the existing Vercel deployment integration.
