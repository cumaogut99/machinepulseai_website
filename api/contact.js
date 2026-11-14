// ─── Contact form endpoint (Vercel serverless function) ──────────────────────
// Receives the website's demo / pilot / partnership form and emails it through
// Resend. The destination address exists only in the CONTACT_TO_EMAIL
// environment variable: it never reaches the browser or this public repository.
// The sender's address is set as Reply-To, so answering the email replies to them.
//
// Required environment variables (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY      API key from https://resend.com/api-keys
//   CONTACT_TO_EMAIL    inbox that receives the requests
// Optional:
//   CONTACT_FROM_EMAIL  verified sender, e.g. "MachinePulseAI <form@machinepulseai.com.tr>".
//                       Defaults to Resend's onboarding sender, which may only deliver
//                       to the Resend account owner's own address.

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const DEFAULT_FROM = 'MachinePulseAI Website <onboarding@resend.dev>'
const PURPOSES = { demo: 'Product demo', pilot: 'Early access / pilot', partnership: 'Investment / partnership' }
const LIMITS = { name: 120, company: 160, email: 254, message: 4000 }
const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/

// Best-effort flood guard per warm function instance: 5 requests per 10 minutes per IP.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const recentByIp = new Map()

function isRateLimited(ip, now = Date.now()) {
    const recent = (recentByIp.get(ip) || []).filter(time => now - time < WINDOW_MS)
    recent.push(now)
    recentByIp.set(ip, recent)
    return recent.length > MAX_PER_WINDOW
}

function readBody(req) {
    if (req.body && typeof req.body === 'object') return req.body
    if (typeof req.body === 'string') {
        try {
            return JSON.parse(req.body)
        } catch {
            return null
        }
    }
    return null
}

/** Trim the submitted fields and reject anything the form cannot produce. */
export function validateSubmission(body) {
    if (!body || typeof body !== 'object') return { error: 'invalid_body' }
    const form = {}
    for (const field of ['purpose', 'name', 'company', 'email', 'message']) {
        const value = body[field] ?? ''
        if (typeof value !== 'string') return { error: `invalid_${field}` }
        form[field] = value.trim()
    }
    if (!Object.hasOwn(PURPOSES, form.purpose)) return { error: 'invalid_purpose' }
    if (!form.name) return { error: 'missing_name' }
    if (!EMAIL_PATTERN.test(form.email)) return { error: 'invalid_email' }
    for (const [field, limit] of Object.entries(LIMITS)) {
        if (form[field].length > limit) return { error: `too_long_${field}` }
    }
    return { form }
}

/** Plain-text email body; one header line per field so it reads well in any client. */
export function composeEmail(form) {
    const purpose = PURPOSES[form.purpose]
    const subject = `[MachinePulseAI] ${purpose} — ${form.company || form.name}`
    const text = [
        `Request: ${purpose}`,
        `Name: ${form.name}`,
        `Organization: ${form.company || '-'}`,
        `Email: ${form.email}`,
        '',
        'Message:',
        form.message || '-',
        '',
        '— Sent from the contact form on www.machinepulseai.com.tr. Reply to this email to answer the sender.',
    ].join('\n')
    return { subject, text }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ error: 'method_not_allowed' })
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL
    if (!apiKey || !to) {
        console.error('Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.')
        return res.status(503).json({ error: 'not_configured' })
    }

    const body = readBody(req)
    // Honeypot: the hidden "website" field stays empty for people; bots fill it.
    // Answer as if it succeeded so the bot learns nothing.
    if (body && typeof body.website === 'string' && body.website.trim()) {
        return res.status(200).json({ ok: true })
    }

    const { form, error } = validateSubmission(body)
    if (error) return res.status(400).json({ error })

    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown'
    if (isRateLimited(ip)) return res.status(429).json({ error: 'too_many_requests' })

    const { subject, text } = composeEmail(form)
    let response
    try {
        response = await fetch(RESEND_ENDPOINT, {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
                to: [to],
                reply_to: form.email,
                subject,
                text,
            }),
        })
    } catch (networkError) {
        console.error('Could not reach Resend:', networkError)
        return res.status(502).json({ error: 'send_failed' })
    }

    if (!response.ok) {
        console.error(`Resend rejected the message (${response.status}):`, await response.text())
        return res.status(502).json({ error: 'send_failed' })
    }
    return res.status(200).json({ ok: true })
}
