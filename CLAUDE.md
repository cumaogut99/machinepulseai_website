# MachinePulseAI Website — Development Rules

Marketing website for MachinePulseAI. **Vite + React 18 + Tailwind CSS + framer-motion**, bilingual (TR/EN via `react-i18next`), deployed on Vercel at `https://www.machinepulseai.com.tr/`.

> This file governs the `Project_Management/machinepulseai_website/` directory only. The product application (`python/`, `cpp/`) has its own rules in the repo-root `CLAUDE.md`.

---

## 🔒 Rule #0 — THE THEME NEVER CHANGES (HARD LOCK)

The visual theme is **frozen**. It is the brand identity and MUST NOT be altered, "modernized", "refreshed", or "improved" under any circumstances — not as a side effect of another change, not as a suggestion, not "just a little".

### Locked theme tokens

| Token | Value | Source of truth |
|-------|-------|-----------------|
| Background (page) | `#0a0a0a` | `tailwind.config.js` `colors.background`, `index.css` body, `index.html` |
| Neon cyan (primary accent) | `#00f5ff` | `tailwind.config.js` `colors.neon.cyan` |
| Neon blue (secondary) | `#3b82f6` | `tailwind.config.js` `colors.neon.blue` |
| Neon purple (tertiary) | `#a855f7` | `tailwind.config.js` `colors.neon.purple` |
| Font family | `Inter`, system-ui, sans-serif | `tailwind.config.js` `fontFamily.sans` |
| Glow effects | cyan box/text-shadow utilities | `index.css` `@layer utilities` (`glow-text-cyan`, `glow-border-cyan`, `btn-neon`, `bg-grid`, `bg-spotlight`, `hero-media-glow`, `card-hover-glow`) |
| Color scheme | dark only (`darkMode: 'class'`, `<html class="dark">`) | `index.html`, `tailwind.config.js` |

### What "the theme never changes" means — NEVER DO

- **Never** change the values above (background, the three neon colors, font, glow shadows, dark-only scheme).
- **Never** add a light mode, theme switcher, or alternate color palette.
- **Never** swap `Inter` for another typeface.
- **Never** introduce a new accent color outside the locked `neon` palette (`cyan` / `blue` / `purple`).
- **Never** remove or restyle the neon-glow utility classes in `index.css`.
- **Never** replace the dark `#0a0a0a` background with gradients, images, or lighter shades as a "redesign".
- **Never** "tidy up" `tailwind.config.js` `theme.extend` in a way that drops or renames these tokens.

### The ONLY allowed exceptions (still confirm with the user first)

1. The user **explicitly and in this session** asks to change a specific theme value (e.g. "make the accent green"). General requests like "improve the site", "make it look better", "fix the design", or "polish the UI" do **NOT** authorize theme changes.
2. Adding a **new** component that *reuses* the existing tokens (correct — that is using the theme, not changing it).

If a task seems to require a theme change to accomplish, **stop and ask** — do not assume.

---

## Project Structure

```
machinepulseai_website/
├── index.html              # SPA entry, meta tags, fonts
├── vite.config.js          # Vite + image optimizer
├── tailwind.config.js      # Theme tokens (LOCKED — see Rule #0)
├── vercel.json             # SPA rewrite (all routes → index.html)
├── src/
│   ├── App.jsx             # Router (8 routes) + global ContactModal
│   ├── main.jsx
│   ├── i18n.js             # TR/EN translations
│   ├── index.css           # Base reset + neon-glow utilities (LOCKED)
│   ├── components/         # One file per section/page
│   └── data/               # widgetCatalog{,.engineering}.js
├── public/                 # robots.txt, static assets served at root
└── dist/                   # build output (gitignored or deployed)
```

## Routing (SPA)

- `react-router-dom` v7 `BrowserRouter`. 8 routes: `/`, `/features`, `/architecture`, `/how-it-works`, `/solutions`, `/knowledge-base`, `/widgets`, `/pricing`.
- All client-side routing depends on `vercel.json` rewriting extensionless paths to `index.html`. **Do not remove `vercel.json`** or direct navigation / refresh on sub-routes returns Vercel's 404.

## Internationalization

- All user-facing copy MUST go through `t()` from `react-i18next`. Define every key in **both** `en` and `tr` in `src/i18n.js`.
- **Never hardcode** display strings in components — they won't translate.
- UI/code comments in English.

## Content & Claims

- Marketing claims with specific numbers (e.g. "70% faster", "0.95 F1-score") MUST be substantiated or softened — do not invent metrics.
- Avoid unqualified competitor comparisons (legal risk).

## Conventions

- Keep components focused; prefer extracting shared UI (e.g. duplicated `TelemetryBar`).
- Use stable `key` props in lists (not array index) for animated lists.
- Images: optimize before commit; `vite-plugin-image-optimizer` handles build-time compression.
- Run `npm run build` before deploy to catch errors; Vercel auto-deploys on push to `main`.
