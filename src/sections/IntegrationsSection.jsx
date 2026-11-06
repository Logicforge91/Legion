import { integrations } from '../data/portfolio';
import { Reveal, SectionHeading, Spotlight } from '../components/shared/ui';
import '../styles/sections/IntegrationsSection.css';

const requestStages = [
  { name: 'User', detail: 'Sign-in request', status: 'received', icon: 'bi-person' },
  { name: 'Identity provider', detail: 'OAuth 2.0 · OIDC', status: 'redirected', icon: 'bi-shield-lock' },
  { name: 'API boundary', detail: 'Validate identity claims', status: 'guarded', icon: 'bi-hdd-network', active: true },
  { name: 'Permission check', detail: 'Enforce role and access', status: 'authorized', icon: 'bi-person-check' },
];

function ReferenceFlow() {
  return (
    <Reveal className="integration-flow-wrap">
      <Spotlight as="div" className="integration-flow" role="group" aria-label="Identity and access request path">
        <div className="flow-heading">
          <div>
            <span className="panel-kicker">Reference flow</span>
            <strong>Identity lifecycle</strong>
          </div>
          <span className="flow-health"><i aria-hidden="true" />Reference</span>
        </div>

        <ol className="flow-pipeline" aria-label="Identity request processing stages">
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

        <div className="flow-signals" aria-label="Identity and access safeguards">
          <span><i className="bi bi-key" aria-hidden="true" />OAuth / OIDC</span>
          <span><i className="bi bi-shield-check" aria-hidden="true" />MFA-ready</span>
          <span><i className="bi bi-person-lock" aria-hidden="true" />Least privilege</span>
        </div>
      </Spotlight>
    </Reveal>
  );
}

function IntegrationTopology() {
  return (
    <div className="integration-topology" role="region" aria-label="Integration topology map">
      <div className="integration-topology__heading">
        <div>
          <span className="panel-kicker">Boundary map</span>
          <h3>External service boundaries</h3>
        </div>
        <span className="integration-topology__count">{String(integrations.length).padStart(2, '0')} <small>domains</small></span>
      </div>

      <div className="integration-topology-grid" role="list" aria-label="Integration domains">
        {integrations.map((integration, index) => (
          <article className="integration-topology-card" role="listitem" key={integration.title}>
            <header>
              <span>{String(index + 1).padStart(2, '0')} / DOMAIN</span>
              <i className={`bi ${integration.icon}`} aria-hidden="true" />
            </header>
            <h4>{integration.title}</h4>
            <p>{integration.description}</p>
            <ul className="integration-card__tools" aria-label="Protocols and patterns">
              {integration.tools.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function IntegrationsSection() {
  return <section id="integrations" className="integrations-section" aria-labelledby="integrationsTitle">
    <div className="site-container">
      <SectionHeading eyebrow="External boundaries" id="integrationsTitle" title="Integrations designed to survive real production conditions.">
        External services are wrapped in predictable contracts with secure callbacks, observability, retries, and failure paths that teams can operate confidently.
      </SectionHeading>
      <div className="integration-layout">
        <ReferenceFlow />
        <IntegrationTopology />
      </div>
    </div>
  </section>;
}
