import { useMemo, useState } from 'react';
import { integrations } from '../data/portfolio';
import { Reveal, SectionHeading, Spotlight } from '../components/shared/ui';
import '../styles/sections/IntegrationsSection.css';

const requestStages = [
  { name: 'Client', detail: 'Validated request', status: 'received', icon: 'bi-window' },
  { name: 'API layer', detail: 'Authentication · contract', status: 'guarded', icon: 'bi-hdd-network', active: true },
  { name: 'Queue', detail: 'Retry · scheduled work', status: 'buffered', icon: 'bi-stack' },
  { name: 'Provider', detail: 'Tracked outcome', status: 'confirmed', icon: 'bi-cloud-check' },
];

function normalizeSearchText(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .replace(/[^a-z0-9+#.]+/g, ' ')
    .trim();
}

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

function IntegrationTopology() {
  const [query, setQuery] = useState('');
  const visibleIntegrations = useMemo(() => {
    const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return integrations;
    return integrations.filter(({ title, description, tools }) => {
      const searchableText = normalizeSearchText([title, description, ...tools].join(' '));
      return terms.every((term) => searchableText.includes(term));
    });
  }, [query]);

  return (
    <div className="integration-topology" role="region" aria-label="Integration topology map">
      <div className="integration-topology__heading">
        <div>
          <span className="panel-kicker">Boundary map</span>
          <h3>External service boundaries</h3>
        </div>
        <span className="integration-topology__count" aria-live="polite" aria-atomic="true">
          {String(visibleIntegrations.length).padStart(2, '0')} <small>of {String(integrations.length).padStart(2, '0')} domains</small>
        </span>
      </div>

      <div className="integration-search">
        <i className="bi bi-search" aria-hidden="true" />
        <label className="visually-hidden" htmlFor="integrationSearch">Search integration domains</label>
        <input
          id="integrationSearch"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search domains, tools, or patterns"
          aria-controls="integrationDomains"
          onKeyDown={(event) => { if (event.key === 'Escape') setQuery(''); }}
        />
        {query && <button type="button" aria-label="Clear integration search" onClick={() => setQuery('')}><i className="bi bi-x-lg" aria-hidden="true" /></button>}
      </div>

      <div id="integrationDomains" className="integration-topology-grid" role="list" aria-label="Integration domains">
        {visibleIntegrations.map((integration) => (
          <article className="integration-topology-card" role="listitem" key={integration.title}>
            <header>
              <span>{String(integrations.indexOf(integration) + 1).padStart(2, '0')} / DOMAIN</span>
              <i className={`bi ${integration.icon}`} aria-hidden="true" />
            </header>
            <h4>{integration.title}</h4>
            <p>{integration.description}</p>
            <ul className="integration-card__tools" aria-label="Protocols and patterns">
              {integration.tools.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
          </article>
        ))}
        {!visibleIntegrations.length && (
          <p className="integration-search-empty" role="status">No integration domains match “{query.trim()}”.</p>
        )}
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
