# Native product videos

The home page presents the revised 46-second overview. `/product` contains the
complete tour with 16 chapter entry points, illustrated capabilities, a practical
workflow and package selection. The former `/demo` route redirects permanently
to `/product`; the navigation has one Product destination.
Capability and workflow links use `/product?chapter=<id>#product-tour`. A valid
link seeks the selected chapter with playback initially paused; unknown chapter
parameters do not trigger a media request. The adjacent chapter buttons remain
explicit play actions.
All recordings use a same-origin HTML video player; no third-party video service
is embedded. Posters load first, and MP4 requests begin only after a play or
chapter action. Native controls support pause, seek, volume and fullscreen.

## Media provenance

The complete tour comes from the application project's `output/video/current/`
delivery dated 2026-11-09. The homepage overview is a new 2026-11-10 edition:
seven complete Turkish sentences voiced by the retained Emel voice (-3%),
opening with the platform and its audience before describing its capabilities.
All visuals reuse successful native takes selected in that delivery's provenance.
No AI interaction is fabricated and the complete tour's timeline is unchanged.

Website copies are cropped from 2560×1440 to 2212×1440 with
`crop=2212:1440:174:0`; all 58 source chapters have the same horizontal content
bounds. The full application height and English subtitle band remain visible.
The Turkish disclosure is embedded at the left of that band. Its right edge
is x=435; the widest delivered English subtitle starts at x=642, leaving 207px
of separation. Video is encoded with H.264 CRF 18 and fast-start metadata;
audio is copied unchanged. Original delivery files are untouched.
Reproduce with `scripts/prepare-native-videos.py --source <delivery> --output public/videos`.
Posters are extracted from these cropped copies. English subtitles are burned
into the recordings; both active videos also have WebVTT accessibility tracks.

Reproduce the new overview from the application repository root:

```text
python scripts/prepare_showcase_speech.py --section website-overview --trim-edges --output tmp/showcase_assets/website_overview_v2/speech
python scripts/prepare_website_overview.py --delivery output/video/current --speech tmp/showcase_assets/website_overview_v2/speech --output <new-edition-directory>
```

Then run this website's `scripts/prepare-native-videos.py --source <new-edition-directory>
--output public/videos --only overview` and copy that edition's `captions.en.vtt`
to `public/videos/overview.en.vtt`. The narration source lives in
`scripts/showcase_production/website_overview.py` in the application repository.

`src/data/productVideos.js` is the source of truth for media paths and chapter
positions. Chapter entry points match the delivered `review.html` timestamps.
Keep the chapter positions and WebVTT aligned when replacing the complete tour.
Future automotive/aerospace cases are intentionally absent until ready. The
pending aircraft/car animation concept is not imported or shipped with the site.
The illustrated workflow follows the existing synthetic `noisy_vibration`
example (12 Hz + 180 Hz + broadband noise), a fourth-order 40 Hz Butterworth
low-pass, FFT comparison, a finding and its report. Its actual raw/filtered
Frequency Filter screenshot is retained. The narrative asks the visitor to
verify the frequency changes; it does not invent FFT measurements or a fault
diagnosis. Other capability screenshots illustrate their respective tools.
The compact demo header omits the former eyebrow and scope paragraph. The
repeated bottom demo-request banner has been removed from every page; the fixed
navigation and contextual contact actions still provide access to the form.

## Content and contact

The marketing journey now identifies Phase 1 as recorded-data post-processing.
Local/cloud model options are explicit; Local Only Mode blocks cloud model
providers. Unqualified speed, FPS and fixed memory-footprint claims were removed
from the edited marketing sections. The application baseline and additional
local-model memory requirements are explained separately.

`VITE_CONTACT_EMAIL` defaults consistently to `hello@machinepulseai.com.tr`.
When `VITE_CONTACT_FORM_ENDPOINT` is configured, the form posts to that service.
Otherwise it explicitly prepares an email draft; the visitor completes sending
in their email application. The website does not claim to have sent a request
in that mode. No external form service was created by this change.

## Verification (original 2026-11-09 delivery)

- `npm run build`: client/SSR builds and 54 prerendered routes pass.
- `node --test tests/*.test.mjs`: 12 tests pass, including shipped media,
  fast-start atom order, chapter validity and bilingual copy coverage.
- All three cropped movies pass a complete video decode. Original durations
  and compressed audio SHA-256 hashes are unchanged. The source crop samples
  for all 58 chapters are retained in `video-crop-audit.json`.
- Prerendered home, demo, product and packages contain no initial video/iframe
  element, missing video translation key, dummy `href="#"` or live-acquisition
  animation claim.
- Local HTTP checks: all four pages return 200; all three MP4s return 206 for
  a 1024-byte range with `video/mp4` MIME type.
- No visual browser, responsive interaction or contact submission was verified:
  this session exposes neither a browser surface nor the native computer pipe.
  An existing Browserslist dataset-age notice remains; dependencies were unchanged.

The global dark/neon theme and stylesheet tokens remain unchanged. The shared
player is a focused media component; its longer JSX declaration keeps poster,
native controls and optional chapter accessibility in one ownership boundary.

## Consolidation verification — 2026-11-10

- Client and SSR production builds pass; 53 public routes prerender. `/demo`
  is excluded from the sitemap and has a permanent Vercel redirect.
- 14 website tests pass, including valid/invalid shareable chapter links,
  bilingual text, overview-media SHA-256 and the matching seven English cues.
- The new overview fully decodes: 45.80 seconds, 2212×1440, H.264/AAC. All
  seven excerpts retain real native takes at 1× playback. The retained Emel
  narration introduces product/audience and purpose before features begin
  after 11 seconds. Narration source matches the published receipt exactly.
- 20 selected narration/intro/commercial-media tests pass in the application
  repository. No new speech generation was needed during consolidation.
- The homepage uses three short illustrated cards. Product details use six
  outcome/capability cards and five concrete workflow steps. Architecture and
  hardware requirements are below that narrative in a closed details panel.
- No repeated bottom demo-request banner is restored; the final product card
  links to packages and the module library. Existing navbar/contact actions stay.
- Browser surfaces are unavailable in this session. Media frames, emitted HTML,
  asset references, HTTP responses and release status are checked; responsive
  browser interaction is not claimed.
