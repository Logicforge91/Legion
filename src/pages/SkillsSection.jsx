import { Reveal, Spotlight } from '../components/ui';
import ContactForm from '../components/ContactForm';
import './ContactSection.css';

const values = [
  ['bi-shield-check', 'Clear boundaries for auth, validation, and permissions so business rules stay predictable.'],
  ['bi-speedometer2', 'Strong API, query, and service design tuned for real product usage and performance.'],
  ['bi-diagram-3', 'Resilient integrations that fail safely, recover predictably, and stay easy to reason about.'],
];

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section relative py-20" aria-labelledby="contactTitle">
      <div className="site-container contact-grid grid gap-10 lg:grid-cols-[1.1fr_1.2fr] lg:items-start">
        <Reveal className="contact-copy">
          <p className="eyebrow"><span />Next conversation</p>
          <h2 id="contactTitle" className="max-w-xl text-3xl font-black tracking-[-0.06em] text-white md:text-4xl">
            If the role involves APIs, data, integrations, and ownership—we should talk.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            I build backend systems that stay understandable under pressure, from permission models and API contracts to integrations and operational visibility.
          </p>
          <ul className="mt-8 space-y-4">
            {values.map(([icon, text]) => (
              <li key={text} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-slate-200">
                <i className={`bi ${icon} mt-1 text-lg text-lime-300`} aria-hidden="true" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <Spotlight as="div" className="contact-panel rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_25px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl">
            <p className="panel-kicker text-[0.7rem] uppercase tracking-[0.18em] text-slate-400">Direct message · replies typically within 1–2 business days</p>
            <h3 className="mt-4 text-2xl font-bold text-white">Start with the problem, not the job description.</h3>
            <ContactForm />
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
