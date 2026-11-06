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
  ['Discover', 'Understand the product, users, constraints, and the outcome the work needs to support.'],
  ['Shape the scope', 'Agree on deliverables, boundaries, milestones, and the technical approach before implementation.'],
  ['Build in steps', 'Develop the agreed solution in reviewable increments, with clear updates as decisions arise.'],
  ['Validate & hand over', 'Review behavior, address agreed issues, and provide the code and handover notes for the engagement.'],
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
  ['Which technologies do you work with?', 'The technology index lists the languages, frameworks, data platforms, cloud services, and tools used by QYVERON. The right stack depends on the business need.'],
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
        {process.map(([title, detail]) => (
          <Reveal as="li" className="company-process-step" key={title}>
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
      description="QYVERON’s principles are quality, trust, and innovation, reflected in practical engineering and delivery."
    >
      <div className="company-card-grid company-card-grid--reasons">
        {differentiators.map(([title, detail]) => (
          <Reveal as="article" className="company-info-card company-reason-card" key={title}>
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
      title="Technology expertise across the company."
      description="QYVERON brings together backend engineering, API development, database design, and system integrations."
    >
      <Reveal className="company-team-note">
        <span className="company-team-note__mark" aria-hidden="true">Q</span>
        <div>
          <h3>QYVERON TECHNOLOGIES</h3>
          <p>{profile.name} is an {profile.role}, focused on delivering dependable software and practical technology solutions.</p>
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
      eyebrow="Our commitment"
      title="Good partnerships are built on trust."
      description="Clear communication, careful engineering, and dependable delivery guide how QYVERON works with organizations."
    >
      <div className="company-feedback-note" role="note">
        <i className="bi bi-shield-check" aria-hidden="true" />
        <p>We align on goals and responsibilities, share progress openly, and design software with long-term reliability in mind.</p>
        <a href="#contact">Talk with our team <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
      </div>
    </CompanySection>
  );
}

export function CareersSection() {
  return (
    <CompanySection
      id="careers"
      eyebrow="Careers"
      title="Build the future with QYVERON."
      description="There are no advertised vacancies at this time. Confirmed career opportunities will be listed here."
    >
      <div className="company-careers-note">
        <span><i className="bi bi-briefcase" aria-hidden="true" /> Opportunities</span>
        <strong>No current openings</strong>
        <a href="#contact">Business enquiries <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
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
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}<i className="bi bi-plus-lg" aria-hidden="true" /></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </CompanySection>
  );
}
