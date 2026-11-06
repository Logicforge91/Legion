import { Reveal, SectionHeading } from '../components/shared/ui';
import { profile } from '../data/portfolio/profile.js';
import '../styles/sections/CompanySections.css';

const industries = [
  { icon: 'bi-heart-pulse', name: 'Healthcare', detail: 'Privacy-aware records, appointments, staff access, and care workflows.' },
  { icon: 'bi-currency-exchange', name: 'Financial technology', detail: 'Payment integrations, traceable transaction states, and reconciliation flows.' },
  { icon: 'bi-mortarboard', name: 'Education', detail: 'Admissions, document review, enrollment, and administrative workflows.' },
  { icon: 'bi-box-seam', name: 'Commerce & operations', detail: 'Order lifecycles, inventory data, and connected business systems.' },
];

const process = [
  ['01', 'Discover', 'Understand the product, users, constraints, and the outcome the work needs to support.'],
  ['02', 'Shape the scope', 'Agree on deliverables, boundaries, milestones, and the technical approach before implementation.'],
  ['03', 'Build in steps', 'Develop the agreed solution in reviewable increments, with clear updates as decisions arise.'],
  ['04', 'Validate & hand over', 'Review behavior, address agreed issues, and provide the code and handover notes for the engagement.'],
];

const differentiators = [
  ['Clear scope', 'Priorities and deliverables are discussed before implementation begins.'],
  ['Quality by design', 'Security boundaries, data integrity, and maintainability inform the engineering choices.'],
  ['Direct communication', 'Project decisions and progress are shared in plain language throughout the engagement.'],
  ['Built to evolve', 'Systems are structured with future maintenance and product changes in mind.'],
];

const faqs = [
  ['What services does QYVERON provide?', 'Backend development, API development and integration, database design, and related application engineering.'],
  ['How does a project get started?', 'Use the contact form to share the product context, the challenge, and the outcome you need. The first step is to clarify scope and fit.'],
  ['Can you work with an existing application?', 'Yes. Share the current stack, the area that needs attention, and any relevant constraints so the work can be scoped clearly.'],
  ['Which technologies do you work with?', 'The technology index lists the current languages, frameworks, data platforms, cloud services, and tools used across the studio’s work. The right stack depends on the project.'],
  ['How are project updates and handover handled?', 'Communication, review points, deliverables, and handover expectations are agreed during scoping and confirmed for each engagement.'],
];

function CompanySection({ id, className = '', eyebrow, title, description, children }) {
  return (
    <section id={id} className={`company-section ${className}`} aria-labelledby={`${id}Title`}>
      <div className="site-container">
        <SectionHeading eyebrow={eyebrow} id={`${id}Title`} title={title}>
          {description}
        </SectionHeading>
        {children}
      </div>
    </section>
  );
}

export function IndustriesSection() {
  return (
    <CompanySection
      id="industries"
      eyebrow="Industries"
      title="Software shaped around the work each industry does."
      description="Representative domains for the kinds of workflows QYVERON can help design and build."
    >
      <div className="company-card-grid company-card-grid--industries">
        {industries.map((item) => (
          <Reveal as="article" className="company-info-card" key={item.name}>
            <i className={`bi ${item.icon}`} aria-hidden="true" />
            <h3>{item.name}</h3>
            <p>{item.detail}</p>
          </Reveal>
        ))}
      </div>
    </CompanySection>
  );
}

export function ProcessSection() {
  return (
    <CompanySection
      id="process"
      eyebrow="Our process"
      title="A clear path from brief to handover."
      description="A practical engagement outline. Exact milestones and deliverables are agreed for each project."
    >
      <ol className="company-process-list">
        {process.map(([number, title, detail]) => (
          <Reveal as="li" className="company-process-step" key={number}>
            <span className="company-process-step__number">{number}</span>
            <div><h3>{title}</h3><p>{detail}</p></div>
            <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </Reveal>
        ))}
      </ol>
    </CompanySection>
  );
}

export function WhyUsSection() {
  return (
    <CompanySection
      id="why-us"
      eyebrow="Why choose QYVERON"
      title="Good engineering starts with clear decisions."
      description="The studio’s working principles are quality, trust, and innovation, applied through practical delivery habits."
    >
      <div className="company-card-grid company-card-grid--reasons">
        {differentiators.map(([title, detail], index) => (
          <Reveal as="article" className="company-info-card company-reason-card" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{detail}</p>
          </Reveal>
        ))}
      </div>
    </CompanySection>
  );
}

export function TeamSection() {
  return (
    <CompanySection
      id="team"
      eyebrow="Our team"
      title="An independent freelance development studio."
      description="QYVERON focuses on backend development, APIs, database design, and the integrations that connect products."
    >
      <Reveal className="company-team-note">
        <span className="company-team-note__mark" aria-hidden="true">Q</span>
        <div>
          <h3>QYVERON TECHNOLOGIES</h3>
          <p>{profile.role}. Project scope and communication are agreed directly through the company contact channel.</p>
        </div>
        <a href="#contact">Discuss a project <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
      </Reveal>
    </CompanySection>
  );
}

export function TestimonialsSection() {
  return (
    <CompanySection
      id="testimonials"
      eyebrow="Testimonials"
      title="Client feedback belongs here—with permission."
      description="No client quotations have been published yet. This section will feature approved feedback when it is available."
    >
      <div className="company-feedback-note" role="note">
        <i className="bi bi-chat-square-quote" aria-hidden="true" />
        <p>We value clear, permission-based references. Contact QYVERON to discuss project fit and the kind of work involved.</p>
        <a href="#contact">Get in touch <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
      </div>
    </CompanySection>
  );
}

export function CareersSection() {
  return (
    <CompanySection
      id="careers"
      eyebrow="Careers"
      title="No open roles at this time."
      description="QYVERON is an independent freelance development studio. Any future opportunities will be posted here when they are confirmed."
    >
      <div className="company-careers-note">
        <span><i className="bi bi-briefcase" aria-hidden="true" /> Opportunities</span>
        <strong>There are currently no advertised vacancies.</strong>
        <a href="#contact">Contact the studio <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
      </div>
    </CompanySection>
  );
}

export function FAQSection() {
  return (
    <CompanySection
      id="faq"
      eyebrow="FAQ"
      title="A few useful details before we begin."
      description="If your question is project-specific, send it with a short brief and QYVERON can respond with relevant next steps."
    >
      <div className="company-faq-list">
        {faqs.map(([question, answer], index) => (
          <details key={question}>
            <summary><span>{String(index + 1).padStart(2, '0')}</span>{question}<i className="bi bi-plus-lg" aria-hidden="true" /></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </CompanySection>
  );
}
