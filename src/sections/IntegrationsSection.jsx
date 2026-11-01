import { useState } from 'react';
import { integrations } from '../data/portfolio';
import { Reveal, SectionHeading, Spotlight } from '../components/shared/ui';
import '../styles/sections/IntegrationsSection.css';

const requestStages = [
  { name: 'Client', detail: 'Validated request', status: 'received', icon: 'bi-window' },
  { name: 'API layer', detail: 'Authentication · contract', status: 'guarded', icon: 'bi-hdd-network', active: true },
  { name: 'Queue', detail: 'Retry · scheduled work', status: 'buffered', icon: 'bi-stack' },
  { name: 'Provider', detail: 'Tracked outcome', status: 'confirmed', icon: 'bi-cloud-check' },
];

function ReferenceFlow() {
  return (
    <Reveal className="integration-flow-wrap">
      <Spotlight as="div" className="integration-flow" role="group" aria-label="Reliable integration request path">
        <div className="flow-heading">
          <div>
            <span className="panel-kicker">Reference flow</span>
            <strong>Request lifecycle</strong>
          </div>
          <span className="flow-health"><i aria-hidden="true" />Reference</span>
        </div>

        <ol className="flow-pipeline" aria-label="Request processing stages">
          {requestStages.map(({ name, detail, status, icon, active }, index) => (
            <li className={`flow-stage${active ? ' is-active' : ''}`} key={name} aria-current={active ? 'step' : undefined}>
              <span className="flow-stage__icon"><i className={`bi ${icon}`} aria-hidden="true" /></span>
              <span className="flow-stage__copy">
                <strong>{name}</strong>
                <small>{detail}</small>
              </span>
              <span className={`flow-stage__status is-${status}`}>{status}</span>
              <span className="visually-hidden">Stage {index + 1} of {requestStages.length}</span>
            </li>
          ))}
        </ol>

        <div className="flow-signals" aria-label="Reliability safeguards">
          <span><i className="bi bi-shield-check" aria-hidden="true" />Signed webhooks</span>
          <span><i className="bi bi-arrow-repeat" aria-hidden="true" />Idempotent retry</span>
          <span><i className="bi bi-eye" aria-hidden="true" />Operational visibility</span>
        </div>
      </Spotlight>
    </Reveal>
  );
}

function IntegrationExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIntegration = integrations[activeIndex];

  const handleTabKeyDown = (event) => {
    let nextIndex = activeIndex;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (activeIndex + 1) % integrations.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (activeIndex - 1 + integrations.length) % integrations.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = integrations.length - 1;
    else return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    document.getElementById(`integration-tab-${nextIndex}`)?.focus();
  };

  return (
    <div className="integration-explorer" role="region" aria-label="Integration architecture map">
      <div className="integration-explorer__heading">
        <div>
          <span className="panel-kicker">Integration map</span>
          <h3>External boundaries</h3>
        </div>
        <span className="integration-explorer__count">{String(integrations.length).padStart(2, '0')} <small>domains</small></span>
      </div>

      <div className="integration-explorer__body integration-grid">
        <div className="integration-domain-list" role="tablist" aria-label="Integration domains" aria-orientation="vertical" onKeyDown={handleTabKeyDown}>
          {integrations.map((integration, index) => (
            <button
              id={`integration-tab-${index}`}
              key={integration.title}
              className={`integration-domain${index === activeIndex ? ' is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls="integration-panel"
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <i className={`bi ${integration.icon}`} aria-hidden="true" />
              <small>{integration.title}</small>
            </button>
          ))}
        </div>

        <article
          id="integration-panel"
          className="integration-detail"
          role="tabpanel"
          aria-labelledby={`integration-tab-${activeIndex}`}
          tabIndex={0}
          key={activeIntegration.title}
        >
          <header className="integration-detail__header">
            <span className="integration-detail__icon"><i className={`bi ${activeIntegration.icon}`} aria-hidden="true" /></span>
            <span className="integration-detail__index">DOMAIN / {String(activeIndex + 1).padStart(2, '0')}</span>
          </header>
          <h4>{activeIntegration.title}</h4>
          <p>{activeIntegration.description}</p>
          <div className="integration-detail__footer">
            <span>Protocols &amp; patterns</span>
            <ul className="integration-card__tools" aria-label="Technologies and patterns">
              {activeIntegration.tools.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

export default function IntegrationsSection() {
  return <section id="integrations" className="integrations-section" aria-labelledby="integrationsTitle">
    <div className="site-container">
      <SectionHeading eyebrow="Connected Systems" id="integrationsTitle" title="Integrations designed to survive real production conditions.">
        External services are wrapped in predictable contracts with secure callbacks, observability, retries, and failure paths that teams can operate confidently.
      </SectionHeading>
      <div className="integration-layout">
        <ReferenceFlow />
        <IntegrationExplorer />
      </div>
    </div>
  </section>;
}
