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
    <Reveal className="contact-copy"><p className="eyebrow"><span />Next conversation</p><h2 id="contactTitle">If you need backend ownership with clarity, resilience, and execution, let&apos;s talk.</h2><p>I partner with teams that value disciplined backend engineering and product reliability. If you&apos;re hiring for a senior backend role or looking for a strong technical partner to strengthen the systems behind your product, I&apos;d be glad to connect.</p></Reveal>
    <Reveal><Spotlight as="div" className="contact-panel"><p className="panel-kicker">Direct message · replies typically within 1–2 business days</p><h3>Build a backend that scales with the product.</h3><p>From API design and data flow decisions to integration reliability and operational stability, I help teams move from functional delivery to durable systems.</p><div className="contact-links">{contactLinks.map(([href, icon, label]) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}><i className={`bi ${icon}`} aria-hidden="true" />{label}</a>)}</div><div className="cta-row"><a href="mailto:sumanks1307@gmail.com" className="btn btn-primary">Schedule a quick intro <i className="bi bi-arrow-up-right" aria-hidden="true" /></a><a href="#projects" className="btn btn-ghost">See the work</a></div></Spotlight></Reveal>
  </div></section>;
}
