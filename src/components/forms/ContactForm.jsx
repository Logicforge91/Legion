import { useEffect, useRef, useState } from 'react';

const initialState = { name: '', email: '', company: '', message: '' };

export default function ContactForm() {
  const [fields, setFields] = useState(initialState);
  const [status, setStatus] = useState('idle');
  const submittingRef = useRef(false);
  const requestRef = useRef(null);
  const isSubmitting = status === 'submitting';

  useEffect(() => () => {
    const request = requestRef.current;
    requestRef.current = null;
    request?.abort();
  }, []);

  const updateField = ({ target: { name, value } }) => {
    setFields((current) => ({ ...current, [name]: value }));
    setStatus((current) => (current === 'success' || current === 'error' ? 'idle' : current));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (submittingRef.current) return;

    submittingRef.current = true;
    setStatus('submitting');

    const body = Object.fromEntries(new FormData(event.currentTarget));
    const controller = new AbortController();
    requestRef.current = controller;
    let timeoutId;

    try {
      timeoutId = window.setTimeout(() => controller.abort(), 12_000);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (requestRef.current !== controller) return;
      if (!response.ok) throw new Error(`Form submission failed with ${response.status}`);

      setFields(initialState);
      setStatus('success');
    } catch (error) {
      if (requestRef.current !== controller) return;
      if (error.name === 'AbortError') {
        setStatus('error');
        return;
      }

      console.error('Contact form submission failed', error);
      setStatus('error');
    } finally {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      submittingRef.current = false;
      if (requestRef.current === controller) requestRef.current = null;
    }
  };

  return (
    <form className="contact-form" aria-busy={isSubmitting} onSubmit={submitForm}>
      <p className="visually-hidden">
        <label>
          Do not fill this field
          <input name="bot-field" tabIndex="-1" autoComplete="off" />
        </label>
      </p>

      <div className="contact-form-row">
        <label>
          <span>Your name</span>
          <input
            name="name"
            value={fields.name}
            onChange={updateField}
            autoComplete="name"
            placeholder="Jane Smith"
            maxLength="100"
            disabled={isSubmitting}
            required
          />
        </label>
        <label>
          <span>Work email</span>
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={updateField}
            autoComplete="email"
            placeholder="jane@company.com"
            maxLength="254"
            disabled={isSubmitting}
            required
          />
        </label>
      </div>

      <label>
        <span>Company <small>optional</small></span>
        <input
          name="company"
          value={fields.company}
          onChange={updateField}
          autoComplete="organization"
          placeholder="Company or team"
          maxLength="150"
          disabled={isSubmitting}
        />
      </label>

      <label>
        <span>How can I help?</span>
        <textarea
          name="message"
          value={fields.message}
          onChange={updateField}
          rows="4"
          placeholder="Share the role, project, stack, or timeline…"
          minLength="20"
          maxLength="3000"
          disabled={isSubmitting}
          required
        />
      </label>

      <div className="contact-form-footer">
        <button className="contact-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send message'}
          <i className={`bi ${isSubmitting ? 'bi-arrow-repeat' : 'bi-arrow-up-right'}`} aria-hidden="true" />
        </button>
        <p className={`form-status ${status}`} aria-live="polite">
          {status === 'success' && 'Message received. I will reply soon.'}
          {status === 'error' && (
            <>Could not send. Please <a href="mailto:sumanks1307@gmail.com">email me directly</a>.</>
          )}
        </p>
      </div>
    </form>
  );
}
