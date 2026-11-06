import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { handler } from '../../netlify/functions/contact.mjs';

const originalEnvironment = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
};
const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;

function setMailEnvironment({ apiKey = 'test-api-key', from = 'QYVERON <contact@example.com>', to } = {}) {
  process.env.RESEND_API_KEY = apiKey;
  process.env.CONTACT_FROM_EMAIL = from;
  if (to === undefined) delete process.env.CONTACT_TO_EMAIL;
  else process.env.CONTACT_TO_EMAIL = to;
}

function request(body, httpMethod = 'POST') {
  return handler({ httpMethod, body: typeof body === 'string' ? body : JSON.stringify(body) });
}

function responseBody(response) {
  return JSON.parse(response.body);
}

const validMessage = 'I would like to discuss a potential project.';
const validPayload = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  company: 'Example Inc.',
  message: validMessage,
};

afterEach(() => {
  for (const [key, value] of Object.entries(originalEnvironment)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
});

describe('contact function request handling', () => {
  it('rejects methods other than POST', async () => {
    const response = await request('{}', 'GET');
    assert.equal(response.statusCode, 405);
    assert.deepEqual(responseBody(response), { error: 'Method not allowed' });
  });

  it('rejects oversized request bodies before parsing', async () => {
    const response = await request('x'.repeat(12_001));
    assert.equal(response.statusCode, 413);
    assert.deepEqual(responseBody(response), { error: 'Request is too large' });
  });

  it('returns a client error for malformed JSON', async () => {
    const response = await request('{invalid');
    assert.equal(response.statusCode, 400);
    assert.deepEqual(responseBody(response), { error: 'Invalid request' });
  });

  it('silently accepts honeypot submissions without contacting mail service', async () => {
    globalThis.fetch = async () => assert.fail('honeypot request must not send email');
    const response = await request({ ...validPayload, 'bot-field': 'bot' });
    assert.equal(response.statusCode, 200);
    assert.deepEqual(responseBody(response), { ok: true });
  });

  it('validates required fields, email format, and minimum message length', async () => {
    for (const payload of [
      { ...validPayload, name: '   ' },
      { ...validPayload, email: 'not-an-email' },
      { ...validPayload, message: 'too short' },
    ]) {
      const response = await request(payload);
      assert.equal(response.statusCode, 422);
      assert.deepEqual(responseBody(response), { error: 'Please provide a valid name, email, and message.' });
    }
  });

  it('returns unavailable when mail credentials are incomplete', async () => {
    setMailEnvironment({ apiKey: '', from: '' });
    console.error = () => {};
    const response = await request(validPayload);
    assert.equal(response.statusCode, 503);
    assert.deepEqual(responseBody(response), { error: 'Mail service is unavailable' });
  });

  it('sends sanitized fields to Resend and uses the configured recipient', async () => {
    setMailEnvironment({ to: 'inbox@example.com' });
    let capturedRequest;
    globalThis.fetch = async (...args) => {
      capturedRequest = args;
      return { ok: true };
    };

    const response = await request({
      name: ` ${'N'.repeat(110)} `,
      email: ` ${'e'.repeat(240)}@example.com `,
      company: ` ${'C'.repeat(160)} `,
      message: ` ${'M'.repeat(3010)} `,
    });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(responseBody(response), { ok: true });
    assert.equal(capturedRequest[0], 'https://api.resend.com/emails');
    assert.equal(capturedRequest[1].method, 'POST');
    assert.equal(capturedRequest[1].headers.Authorization, 'Bearer test-api-key');
    const mail = JSON.parse(capturedRequest[1].body);
    assert.equal(mail.from, 'QYVERON <contact@example.com>');
    assert.deepEqual(mail.to, ['inbox@example.com']);
    assert.equal(mail.reply_to, `${'e'.repeat(240)}@example.com`);
    assert.equal(mail.subject, `QYVERON project enquiry from ${'N'.repeat(100)}`);
    assert.ok(mail.text.includes(`Company: ${'C'.repeat(150)}`));
    assert.ok(mail.text.endsWith('M'.repeat(3000)));
  });

  it('requires a configured company inbox and does not use a personal default', async () => {
    setMailEnvironment();
    globalThis.fetch = async () => assert.fail('mail must not send without a company inbox');
    console.error = () => {};
    const response = await request(validPayload);
    assert.equal(response.statusCode, 503);
    assert.deepEqual(responseBody(response), { error: 'Mail service is unavailable' });
  });

  it('returns a gateway error when the mail provider rejects the message', async () => {
    setMailEnvironment({ to: 'inbox@example.com' });
    globalThis.fetch = async () => ({ ok: false, status: 422, text: async () => 'rejected' });
    console.error = () => {};
    const response = await request(validPayload);
    assert.equal(response.statusCode, 502);
    assert.deepEqual(responseBody(response), { error: 'Message could not be sent' });
  });

  it('returns a timeout response when the mail request fails', async () => {
    setMailEnvironment({ to: 'inbox@example.com' });
    globalThis.fetch = async () => {
      const error = new Error('request aborted');
      error.name = 'AbortError';
      throw error;
    };
    console.error = () => {};
    const response = await request(validPayload);
    assert.equal(response.statusCode, 504);
    assert.deepEqual(responseBody(response), { error: 'Mail service timed out' });
  });
});
