import { useState } from 'react';
import { Counter, Reveal, SectionHeading, Spotlight } from '../components/shared/ui';
import { projectFilterLabels } from '../config/projectFilters';
import { proof, projects } from '../data/portfolio';
import { getExternalUrl } from '../utils/externalUrl';
import '../styles/sections/TestimonialsSection.css';

const featuredSlugs = [
  'care-access-platform',
  'fintech-ledger-workflow',
  'java-workflow-orchestrator',
  'school-admissions-workflow',
  'payment-provider-integrations',
  'rest-api-audit',
];

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

const caseStudies = featuredSlugs.flatMap((slug) => {
  const project = projects.find((item) => item.slug === slug);
  const outcome = outcomes[slug];
  return project && outcome ? [{ project, outcome }] : [];
});
const caseCategories = [...new Set(caseStudies.map(({ project }) => project.category))];

export default function TestimonialsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const visibleCaseStudies = activeCategory === 'all'
    ? caseStudies
    : caseStudies.filter(({ project }) => project.category === activeCategory);

  return (
    <section id="impact" className="testimonials-section work-style-section" aria-labelledby="workStyleTitle">
      <div className="site-container">
        <SectionHeading
          eyebrow="Selected Impact"
          id="workStyleTitle"
          title="Engineering decisions shaped around real workflows."
        >
          A closer look at the workflow concerns behind selected projects. The metrics below summarize portfolio-wide experience; they are not attributed to individual case studies.
        </SectionHeading>
        <div className="impact-metrics" role="list" aria-label="Portfolio impact metrics">
          {proof.map((metric) => (
            <Reveal as="div" role="listitem" className="impact-metric" key={metric.label}>
              <strong><Counter value={metric.value} suffix={metric.suffix} /></strong>
              <span>{metric.label}</span>
            </Reveal>
          ))}
        </div>
        <div className="impact-filter-toolbar">
          <div className="impact-filters" role="group" aria-label="Filter impact case studies by category">
            <button type="button" aria-pressed={activeCategory === 'all'} onClick={() => setActiveCategory('all')}>All cases</button>
            {caseCategories.map((category) => (
              <button key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>
                {category}
              </button>
            ))}
          </div>
          <span className="impact-case-count" aria-live="polite">{visibleCaseStudies.length} of {caseStudies.length} cases</span>
        </div>
        <div className="testimonial-rail work-style-grid">
          {visibleCaseStudies.map(({ project, outcome }, index) => (
            <Reveal key={project.slug}>
              <Spotlight className="testimonial-card work-style-card impact-card">
                <div className="work-style-top">
                  <span className="impact-card__case"><b>{String(index + 1).padStart(2, '0')}</b><span>CASE / {project.category}</span></span>
                  <i className={`bi ${project.icon}`} aria-hidden="true" />
                </div>
                <div className="impact-card__body">
                  <h3>{project.title}</h3>
                  <strong>{outcome.focus}</strong>
                </div>
                <details className="impact-card__details">
                  <summary>View case details</summary>
                  <div className="impact-card__details-content">
                    <div><h4>Project scope</h4><p>{project.text}</p></div>
                    <div><h4>Engineering focus</h4><p>{outcome.focus}</p></div>
                    <div><h4>Workflow outcome</h4><p>{outcome.outcome}</p></div>
                    {project.role && <div><h4>Role</h4><p>{project.role}</p></div>}
                    {Array.isArray(project.stack) && project.stack.length > 0 && <div><h4>Technology stack</h4><p>{project.stack.join(' · ')}</p></div>}
                    {project.result && <div><h4>Measured result</h4><p>{project.result}</p></div>}
                    <ul aria-label="Project domains">
                      {project.filters.map((filter) => <li key={filter}>{projectFilterLabels.get(filter) ?? filter}</li>)}
                    </ul>
                    {(getExternalUrl(project.demoUrl) || getExternalUrl(project.repositoryUrl)) && (
                      <div className="impact-card__links">
                        {getExternalUrl(project.demoUrl) && <a href={getExternalUrl(project.demoUrl)} target="_blank" rel="noreferrer">Live demo <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>}
                        {getExternalUrl(project.repositoryUrl) && <a href={getExternalUrl(project.repositoryUrl)} target="_blank" rel="noreferrer">Repository <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>}
                      </div>
                    )}
                  </div>
                </details>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
