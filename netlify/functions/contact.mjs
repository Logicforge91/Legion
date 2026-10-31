const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

const clean = (value, limit) => typeof value === 'string' ? value.trim().slice(0, limit) : '';
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function handler(event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  if ((event.body?.length ?? 0) > 12_000) return json(413, { error: 'Request is too large' });

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid request' });
  }

  // Silently accept honeypot submissions so bots cannot adapt to the field.
  if (clean(payload['bot-field'], 200)) return json(200, { ok: true });

  const name = clean(payload.name, 100);
  const email = clean(payload.email, 254);
  const company = clean(payload.company, 150);
  const message = clean(payload.message, 3000);

  if (!name || !validEmail(email) || message.length < 20) {
    return json(422, { error: 'Please provide a valid name, email, and message.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'sumanks1307@gmail.com';
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error('Contact mail environment variables are not configured');
    return json(503, { error: 'Mail service is unavailable' });
  }

  let response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: [`Name: ${name}`, `Email: ${email}`, `Company: ${company || 'Not provided'}`, '', message].join('\n'),
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error('Contact email request failed', error.name);
    return json(504, { error: 'Mail service timed out' });
  }

  if (!response.ok) {
    console.error('Resend rejected contact email', response.status, await response.text());
    return json(502, { error: 'Message could not be sent' });
  }

  return json(200, { ok: true });
}
