import { useState } from 'react';

const initialState = { name: '', email: '', company: '', message: '' };

export default function ContactForm() {
  const [fields, setFields] = useState(initialState);
  const [status, setStatus] = useState('idle');

  const updateField = (event) => {
    setFields((current) => ({ ...current, [event.target.name]: event.target.value }));
    setStatus((current) => current === 'success' || current === 'error' ? 'idle' : current);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus('submitting');

    const body = new URLSearchParams({ 'form-name': 'contact', ...fields });

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!response.ok) throw new Error(`Form submission failed with ${response.status}`);
      setFields(initialState);
      setStatus('success');
    } catch (error) {
      console.error('Contact form submission failed', error);
      setStatus('error');
    }
  };

  return <form className="contact-form" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" aria-busy={status === 'submitting'} onSubmit={submitForm}>
    <input type="hidden" name="form-name" value="contact" />
    <p className="visually-hidden"><label>Do not fill this field<input name="bot-field" tabIndex="-1" autoComplete="off" /></label></p>
    <div className="contact-form-row">
      <label><span>Your name</span><input name="name" value={fields.name} onChange={updateField} autoComplete="name" placeholder="Jane Smith" required /></label>
      <label><span>Work email</span><input type="email" name="email" value={fields.email} onChange={updateField} autoComplete="email" placeholder="jane@company.com" required /></label>
    </div>
    <label><span>Company <small>optional</small></span><input name="company" value={fields.company} onChange={updateField} autoComplete="organization" placeholder="Company or team" /></label>
    <label><span>How can I help?</span><textarea name="message" value={fields.message} onChange={updateField} rows="4" placeholder="Share the role, project, stack, or timeline…" required /></label>
    <div className="contact-form-footer">
      <button className="contact-submit" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
        <i className={`bi ${status === 'submitting' ? 'bi-arrow-repeat' : 'bi-arrow-up-right'}`} aria-hidden="true" />
      </button>
      <p className={`form-status ${status}`} aria-live="polite">
        {status === 'success' && 'Message received. I will reply soon.'}
        {status === 'error' && <>Could not send. Please <a href="mailto:sumanks1307@gmail.com">email me directly</a>.</>}
      </p>
    </div>
  </form>;
}
