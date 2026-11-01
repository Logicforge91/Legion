import { Reveal, Spotlight } from '../components/shared/ui';
import ContactForm from '../components/forms/ContactForm';
import '../styles/sections/ContactSection.css';

const contactLinks = [
  ['mailto:sumanks1307@gmail.com', 'bi-envelope-fill', 'sumanks1307@gmail.com'],
  ['tel:+917996049769', 'bi-telephone-fill', '+91 79960 49769'],
  ['https://wa.me/917996049769', 'bi-whatsapp', 'WhatsApp'],
  ['https://www.linkedin.com/in/suman-k-s-a55868184/', 'bi-linkedin', 'LinkedIn'],
  ['https://github.com/Logicforge91', 'bi-github', 'GitHub'],
];

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contactTitle">
      <div className="site-container contact-grid">
        <Reveal className="contact-copy">
          <p className="eyebrow"><span />Next conversation</p>
          <h2 id="contactTitle">If the role involves APIs, data, integrations, and ownership—we should talk.</h2>
          <p>Send the product context, the backend challenge, and what success should look like. I am most useful where business workflows need clear engineering decisions.</p>

          <div className="contact-brief" aria-label="What to include in your message">
            <div className="contact-brief__heading">
              <span>Useful starting points</span>
              <i className="bi bi-arrow-down-right" aria-hidden="true" />
            </div>
            <ol>
              <li><span>01</span><div><strong>Context</strong><small>Product, team, or role</small></div></li>
              <li><span>02</span><div><strong>Challenge</strong><small>The backend problem</small></div></li>
              <li><span>03</span><div><strong>Outcome</strong><small>What success means</small></div></li>
            </ol>
          </div>

          <Spotlight as="div" className="availability-card">
            <div className="availability-card__top">
              <span className="status-pill"><span />Open to work</span>
              <span className="availability-card__code">BENGALURU / IN</span>
            </div>
            <p>Best fit: backend-heavy products, Laravel platforms, API and integration work, and Java teams that value production-minded ownership.</p>
            <div className="availability-card__focus"><span>Focus</span><strong>Backend engineering · APIs · integrations</strong></div>
          </Spotlight>
        </Reveal>

        <Reveal>
          <Spotlight as="div" className="contact-panel">
            <header className="contact-panel__heading">
              <div><p className="panel-kicker">Direct message · replies typically within 1–2 business days</p><h3>Start with the problem, not the job description.</h3></div>
              <span className="contact-panel__index" aria-hidden="true">01 / 01</span>
            </header>
            <ContactForm />
            <div className="contact-divider"><span>or connect directly</span></div>
            <div className="contact-links">
              {contactLinks.map(([href, icon, label]) => {
                const external = href.startsWith('http');
                return <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} aria-label={label}><i className={`bi ${icon}`} aria-hidden="true" /><span>{label}</span></a>;
              })}
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
