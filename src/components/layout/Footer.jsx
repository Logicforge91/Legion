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
    <Reveal className="contact-copy"><p className="eyebrow"><span />Next conversation</p><h2 id="contactTitle">Looking for a backend engineer who can scale the product without slowing it down?</h2><p>I help product teams build store-ready backend foundations that are reliable, maintainable, and ready for real growth. If you’re hiring for a senior backend role or need technical support for a product-driven engineering team, I’d love to connect.</p></Reveal>
    <Reveal><Spotlight as="div" className="contact-panel"><p className="panel-kicker">Direct message · replies typically within 1–2 business days</p><h3>Build the backend that supports your product roadmap.</h3><p>From APIs and data flows to integrations and production reliability, I help teams turn product intent into durable systems that scale with confidence.</p><div className="contact-links">{contactLinks.map(([href, icon, label]) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}><i className={`bi ${icon}`} aria-hidden="true" />{label}</a>)}</div><div className="cta-row"><a href="mailto:sumanks1307@gmail.com" className="btn btn-primary">Book a quick intro <i className="bi bi-arrow-up-right" aria-hidden="true" /></a><a href="#projects" className="btn btn-ghost">See the work</a></div></Spotlight></Reveal>
  </div></section>;
}
