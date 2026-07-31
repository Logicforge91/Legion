import { Reveal, Spotlight } from '../components/ui';
import ContactForm from '../components/ContactForm';

const contactLinks = [
  ['mailto:sumanks1307@gmail.com', 'bi-envelope-fill', 'sumanks1307@gmail.com'],
  ['tel:+917996049769', 'bi-telephone-fill', '+91 79960 49769'],
  ['https://wa.me/917996049769', 'bi-whatsapp', 'WhatsApp'],
  ['https://www.linkedin.com/in/suman-k-s-a55868184/', 'bi-linkedin', 'LinkedIn'],
  ['https://github.com/Logicforge91', 'bi-github', 'GitHub'],
];

export default function ContactSection() {
  return <section id="contact" className="contact-section" aria-labelledby="contactTitle"><div className="site-container contact-grid">
    <Reveal className="contact-copy"><p className="eyebrow"><span />Contact Node</p><h2 id="contactTitle">Looking for a Backend Developer, PHP Laravel Developer, or Java Backend Developer?</h2><p>I am available for roles focused on PHP, Laravel, Java, Spring Boot, REST APIs, MySQL, integrations, performance, and production support.</p><Spotlight as="div" className="availability-card"><span className="status-pill"><span />Open to work</span><p>Best fit: backend-heavy product roles, Laravel API development, and Java backend development.</p></Spotlight></Reveal>
    <Reveal><Spotlight as="div" className="contact-panel"><p className="panel-kicker">Direct message</p><h3>Tell me what you are building.</h3><ContactForm /><div className="contact-divider"><span>or connect directly</span></div><div className="contact-links">{contactLinks.map(([href, icon, label]) => { const external = href.startsWith('http'); return <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} aria-label={label}><i className={`bi ${icon}`} /><span>{label}</span></a>; })}</div></Spotlight></Reveal>
  </div></section>;
}
