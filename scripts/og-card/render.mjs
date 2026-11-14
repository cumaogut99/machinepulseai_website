// Render scripts/og-card/og-card.html to public/og-card.png (1200×630) with a
// local Chromium-based browser in headless mode. Usage: node scripts/og-card/render.mjs
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))
const output = path.resolve(here, '../../public/og-card.png')
const page = pathToFileURL(path.join(here, 'og-card.html')).href

const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean)
const browser = candidates.find(candidate => existsSync(candidate))
if (!browser) throw new Error('No Chromium-based browser found; set CHROME_PATH.')

execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--window-size=1200,630', '--virtual-time-budget=8000', '--allow-file-access-from-files',
    `--screenshot=${output}`, page,
], { stdio: 'inherit' })
console.log(`Wrote ${path.relative(process.cwd(), output)}`)
