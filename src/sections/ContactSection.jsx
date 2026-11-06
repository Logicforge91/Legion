import { Reveal, Spotlight } from '../components/shared/ui';
import ContactForm from '../components/forms/ContactForm';
import { profile } from '../data/portfolio/profile.js';
import '../styles/sections/ContactSection.css';

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contactTitle">
      <div className="site-container contact-grid">
        <Reveal className="contact-copy">
          <p className="eyebrow contact-eyebrow"><span className="contact-eyebrow__icon"><i className="bi bi-chat-square-text" aria-hidden="true" /></span><span className="contact-eyebrow__label">Start a project</span><small>QYVERON / CONTACT</small></p>
          <h2 id="contactTitle">Have a product challenge? Let’s build a smarter solution.</h2>
          <p>Share your product context, technical goals, and the outcome you need. QYVERON can help shape a clear plan for your software project.</p>

          <div className="contact-brief" aria-label="What to include in your message">
            <div className="contact-brief__heading">
              <span>A useful project brief</span>
              <i className="bi bi-arrow-down-right" aria-hidden="true" />
            </div>
            <ol>
              <li><span>01</span><div><strong>Context</strong><small>Your product and team</small></div></li>
              <li><span>02</span><div><strong>Challenge</strong><small>What needs to be built</small></div></li>
              <li><span>03</span><div><strong>Outcome</strong><small>What success looks like</small></div></li>
            </ol>
          </div>

          <Spotlight as="div" className="availability-card">
            <div className="availability-card__top">
              <span className="status-pill"><span />Freelance engagements</span>
              <span className="availability-card__code">QYVERON / STUDIO</span>
            </div>
            <p>{profile.availability}. Services include backend development, API development, and database design.</p>
            <div className="availability-card__focus"><span>Tagline</span><strong>{profile.tagline}</strong></div>
          </Spotlight>
        </Reveal>

        <Reveal>
          <Spotlight as="div" className="contact-panel">
            <header className="contact-panel__heading">
              <div><p className="panel-kicker">Project enquiry · Replies typically within 1–2 business days</p><h3>Tell us what you’re building.</h3></div>
              <span className="contact-panel__index" aria-hidden="true">01 / 01</span>
            </header>
            <ContactForm />
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
