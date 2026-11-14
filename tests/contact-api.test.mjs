import assert from 'node:assert/strict'
import test from 'node:test'
import handler, { composeEmail, validateSubmission } from '../api/contact.js'

const VALID = { purpose: 'pilot', name: ' Ada Lovelace ', company: 'Analytical Engines', email: 'ada@example.org', message: 'Gearbox data, 24 channels.' }

function call(body, { method = 'POST', ip = '203.0.113.1' } = {}) {
    const res = { statusCode: 0, headers: {}, payload: null }
    res.status = (code) => { res.statusCode = code; return res }
    res.json = (payload) => { res.payload = payload; return res }
    res.setHeader = (name, value) => { res.headers[name] = value }
    return handler({ method, body, headers: { 'x-forwarded-for': ip } }, res).then(() => res)
}

function withEnv(env, fn) {
    const saved = { ...process.env }
    Object.assign(process.env, env)
    return Promise.resolve(fn()).finally(() => {
        for (const key of Object.keys(env)) {
            if (key in saved) process.env[key] = saved[key]
            else delete process.env[key]
        }
    })
}

test('validation trims fields and rejects what the form cannot send', () => {
    assert.equal(validateSubmission(VALID).form.name, 'Ada Lovelace')
    assert.equal(validateSubmission({ ...VALID, purpose: 'sales' }).error, 'invalid_purpose')
    assert.equal(validateSubmission({ ...VALID, email: 'not-an-address' }).error, 'invalid_email')
    assert.equal(validateSubmission({ ...VALID, name: '   ' }).error, 'missing_name')
    assert.equal(validateSubmission({ ...VALID, message: 'x'.repeat(4001) }).error, 'too_long_message')
    assert.equal(validateSubmission(null).error, 'invalid_body')
})

test('the email names the request type and keeps the sender as the reply address', () => {
    const { subject, text } = composeEmail(validateSubmission(VALID).form)
    assert.match(subject, /Early access \/ pilot/)
    assert.match(text, /Email: ada@example\.org/)
})

test('a missing configuration fails loudly instead of pretending to send', async () => {
    await withEnv({ RESEND_API_KEY: '', CONTACT_TO_EMAIL: '' }, async () => {
        const res = await call(VALID)
        assert.equal(res.statusCode, 503)
        assert.equal(res.payload.error, 'not_configured')
    })
})

test('a valid request is sent to the configured inbox with Reply-To set', async () => {
    const sent = []
    const originalFetch = globalThis.fetch
    globalThis.fetch = async (url, init) => {
        sent.push({ url, body: JSON.parse(init.body), auth: init.headers.Authorization })
        return new Response('{"id":"1"}', { status: 200 })
    }
    try {
        await withEnv({ RESEND_API_KEY: 'test-key', CONTACT_TO_EMAIL: 'inbox@example.org' }, async () => {
            const res = await call(VALID, { ip: '203.0.113.2' })
            assert.equal(res.statusCode, 200)
        })
    } finally {
        globalThis.fetch = originalFetch
    }
    assert.equal(sent.length, 1)
    assert.deepEqual(sent[0].body.to, ['inbox@example.org'])
    assert.equal(sent[0].body.reply_to, 'ada@example.org')
    assert.equal(sent[0].auth, 'Bearer test-key')
})

test('a provider error is reported as a failure', async () => {
    const originalFetch = globalThis.fetch
    globalThis.fetch = async () => new Response('{"message":"invalid"}', { status: 422 })
    const originalError = console.error
    console.error = () => {}
    try {
        await withEnv({ RESEND_API_KEY: 'test-key', CONTACT_TO_EMAIL: 'inbox@example.org' }, async () => {
            const res = await call(VALID, { ip: '203.0.113.3' })
            assert.equal(res.statusCode, 502)
        })
    } finally {
        globalThis.fetch = originalFetch
        console.error = originalError
    }
})

test('the honeypot field silently drops bot submissions', async () => {
    const originalFetch = globalThis.fetch
    let calls = 0
    globalThis.fetch = async () => { calls += 1; return new Response('{}') }
    try {
        await withEnv({ RESEND_API_KEY: 'test-key', CONTACT_TO_EMAIL: 'inbox@example.org' }, async () => {
            const res = await call({ ...VALID, website: 'http://spam.example' }, { ip: '203.0.113.4' })
            assert.equal(res.statusCode, 200)
        })
    } finally {
        globalThis.fetch = originalFetch
    }
    assert.equal(calls, 0)
})

test('only POST is accepted', async () => {
    const res = await call(null, { method: 'GET' })
    assert.equal(res.statusCode, 405)
    assert.equal(res.headers.Allow, 'POST')
})
