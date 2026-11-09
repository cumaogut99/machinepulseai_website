# Native product videos

The home page presents the 48-second overview, `/product` includes the two-minute
introduction, and `/demo` provides the complete tour with 16 chapter entry points.
All recordings use a same-origin HTML video player; no third-party video service
is embedded. Posters load first, and MP4 requests begin only after a play or
chapter action. Native controls support pause, seek, volume and fullscreen.

## Media provenance

Source: the application project's `output/video/current/` delivery dated
2026-11-09. Website copies are cropped from 2560×1440 to 2212×1440 with
`crop=2212:1440:174:0`; all 58 source chapters have the same horizontal content
bounds. The full application height and English subtitle band remain visible.
The Turkish disclosure is embedded at the left of that band. Its right edge
is x=435; the widest delivered English subtitle starts at x=642, leaving 207px
of separation. Video is encoded with H.264 CRF 18 and fast-start metadata;
audio is copied unchanged. Original delivery files are untouched.
Reproduce with `scripts/prepare-native-videos.py --source <delivery> --output public/videos`.
Posters are extracted from these cropped copies. English subtitles are burned
into the recordings; the complete
tour also offers the delivered WebVTT accessibility track.

`src/data/productVideos.js` is the source of truth for media paths and chapter
positions. Chapter entry points match the delivered `review.html` timestamps.
Keep the chapter positions and WebVTT aligned when replacing the complete tour.
Future automotive/aerospace cases are intentionally absent until ready. The
pending aircraft/car animation concept is not imported or shipped with the site.
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

## Verification

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
