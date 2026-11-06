import { Reveal, SectionHeading, Spotlight } from '../components/shared/ui';
import { projects } from '../data/portfolio';
import '../styles/sections/TestimonialsSection.css';

const featuredSlugs = [
  'care-access-platform',
  'fintech-ledger-workflow',
  'java-workflow-orchestrator',
  'school-admissions-workflow',
  'payment-provider-integrations',
  'rest-api-audit',
];

const caseStudies = featuredSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter(Boolean);

const outcomes = {
  'care-access-platform': {
    focus: 'Privacy-aware access and fast record retrieval',
    outcome: 'Patient, appointment, and staff workflows organized around clear role boundaries.',
  },
  'fintech-ledger-workflow': {
    focus: 'Traceable transaction states and reconciliation',
    outcome: 'Payment events, ledger-facing state, and operator visibility treated as one workflow.',
  },
  'java-workflow-orchestrator': {
    focus: 'Explicit business transitions and audit history',
    outcome: 'Approvals, assignments, deadlines, and notifications modeled as controlled domain behavior.',
  },
  'school-admissions-workflow': {
    focus: 'Visible application status and review handoffs',
    outcome: 'Application review, document checks, decisions, and enrollment organized in one workflow.',
  },
  'payment-provider-integrations': {
    focus: 'Safe callback handling and reconciliation',
    outcome: 'Provider events, retries, and transaction state handled through explicit integration boundaries.',
  },
  'rest-api-audit': {
    focus: 'Consistent contracts and operational visibility',
    outcome: 'Endpoint conventions, validation, authorization, errors, pagination, and observability reviewed together.',
  },
};

export default function TestimonialsSection() {
  return (
    <section id="impact" className="testimonials-section work-style-section" aria-labelledby="workStyleTitle">
      <div className="site-container">
        <SectionHeading
          eyebrow="Selected Impact"
          id="workStyleTitle"
          title="Engineering decisions shaped around real workflows."
        >
          Draft case study examples based on the project areas listed in this portfolio. Replace the marked role, stack, and result fields with verified details.
        </SectionHeading>
        <div className="testimonial-rail work-style-grid">
          {caseStudies.map((project, index) => {
            const outcome = outcomes[project.slug];

            return (
              <Reveal key={project.slug}>
                <Spotlight className="testimonial-card work-style-card impact-card">
                  <div className="work-style-top">
                    <span>CASE 0{index + 1} / {project.category}</span>
                    <i className={`bi ${project.icon}`} aria-hidden="true" />
                  </div>
                  <div className="impact-card__body">
                    <h3>{project.title}</h3>
                    <p>{project.text}</p>
                  </div>
                  <div className="impact-card__outcome">
                    <span>Engineering focus</span>
                    <strong>{outcome.focus}</strong>
                    <p>{outcome.outcome}</p>
                  </div>
                  <div className="impact-card__draft" aria-label="Draft details to complete">
                    <span>Draft details · replace before publishing</span>
                    <p><b>Role</b> Add your contribution</p>
                    <p><b>Stack</b> Add technologies used</p>
                    <p><b>Result</b> Add a verified outcome</p>
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
