import { Reveal, Spotlight } from '../components/ui';
import ContactForm from '../components/ContactForm';
import './ContactSection.css';

const contactLinks = [
  ['mailto:sumanks1307@gmail.com', 'bi-envelope-fill', 'sumanks1307@gmail.com'],
  ['tel:+917996049769', 'bi-telephone-fill', '+91 79960 49769'],
  ['https://wa.me/917996049769', 'bi-whatsapp', 'WhatsApp'],
  ['https://www.linkedin.com/in/suman-k-s-a55868184/', 'bi-linkedin', 'LinkedIn'],
  ['https://github.com/Logicforge91', 'bi-github', 'GitHub'],
];

export default function ContactSection() {
  return <section id="contact" className="contact-section" aria-labelledby="contactTitle"><div className="site-container contact-grid">
    <Reveal className="contact-copy"><p className="eyebrow"><span />Next conversation</p><h2 id="contactTitle">If the role involves APIs, data, integrations, and ownership—we should talk.</h2><p>Whether it is shipping a new workflow, stabilizing a platform edge case, or building a reliable backend system from the ground up, I enjoy the kind of work where clear contracts and dependable operations matter.</p><div className="contact-links">{contactLinks.map(([href, icon, label]) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}><i className={`bi ${icon}`} aria-hidden="true" />{label}</a>)}</div></Reveal>
    <Reveal><Spotlight as="div" className="contact-panel"><p className="panel-kicker">Direct message · replies typically within 1–2 business days</p><h3>Start with the problem, not the job description.</h3><p>Tell me what the system is expected to do, what breaks, and what ownership already exists. I can respond with practical direction, architecture thinking, and team-fit perspective.</p><div className="cta-row"><a href="mailto:sumanks1307@gmail.com" className="btn btn-primary">Email me</a><a href="https://wa.me/917996049769" className="btn btn-ghost" target="_blank" rel="noreferrer">WhatsApp</a></div><ContactForm /></Spotlight></Reveal>
  </div></section>;
}
