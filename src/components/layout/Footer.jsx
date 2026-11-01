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
    <Reveal className="contact-copy"><p className="eyebrow"><span />Next conversation</p><h2 id="contactTitle">If the role involves APIs, data, integrations, and ownership, let&apos;s talk.</h2><p>I enjoy partnering with product teams that care about reliability, growth, and clean execution. If you are building something meaningful and need a backend engineer who can tighten the system behind it, I&apos;d love to hear the problem.</p></Reveal>
    <Reveal><Spotlight as="div" className="contact-panel"><p className="panel-kicker">Direct message · replies typically within 1–2 business days</p><h3>Start with the problem, not the job description.</h3><p>Whether it&apos;s architecture, performance, integrations, or production debugging, I can help move from messy requirements to a dependable backend strategy.</p><div className="contact-links">{contactLinks.map(([href, icon, label]) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}><i className={`bi ${icon}`} aria-hidden="true" />{label}</a>)}</div><div className="cta-row"><a href="mailto:sumanks1307@gmail.com" className="btn btn-primary">Email me <i className="bi bi-arrow-up-right" aria-hidden="true" /></a><a href="#projects" className="btn btn-ghost">See work</a></div></Spotlight></Reveal>
  </div></section>;
}
