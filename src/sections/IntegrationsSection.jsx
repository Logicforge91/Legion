import { useMemo, useState } from 'react';
import { integrations } from '../data/portfolio';
import { Reveal, SectionHeading, Spotlight } from '../components/shared/ui';
import '../styles/sections/IntegrationsSection.css';

const requestStages = [
  { name: 'Product', detail: 'A clear user action', outcome: 'Received', icon: 'bi-window' },
  { name: 'QYVERON API', detail: 'Validate and protect', outcome: 'Checked', icon: 'bi-hdd-network', active: true },
  { name: 'Background work', detail: 'Queues, retries, schedules', outcome: 'Processed', icon: 'bi-stack' },
  { name: 'Connected service', detail: 'Return a trackable result', outcome: 'Delivered', icon: 'bi-cloud-check' },
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
      <Spotlight as="div" className="integration-flow" role="group" aria-label="Example request flow">
        <div className="flow-heading">
          <div>
            <span className="panel-kicker">A connected product</span>
            <strong>A dependable request path</strong>
          </div>
          <span className="flow-health"><i aria-hidden="true" />Example</span>
        </div>

        <ol className="flow-pipeline" aria-label="Request processing stages">
          {requestStages.map(({ name, detail, outcome, icon, active }, index) => (
            <li className={`flow-stage${active ? ' is-active' : ''}`} key={name} aria-current={active ? 'step' : undefined}>
              <span className="flow-stage__icon"><i className={`bi ${icon}`} aria-hidden="true" /></span>
              <span className="flow-stage__copy">
                <strong>{name}</strong>
                <small>{detail}</small>
              </span>
              <span className="flow-stage__status">{outcome}</span>
              <span className="visually-hidden">Stage {index + 1} of {requestStages.length}</span>
            </li>
          ))}
        </ol>

        <div className="flow-signals" aria-label="Reliability safeguards">
          <span><i className="bi bi-shield-check" aria-hidden="true" />Signed webhooks</span>
          <span><i className="bi bi-arrow-repeat" aria-hidden="true" />Safe retries</span>
          <span><i className="bi bi-eye" aria-hidden="true" />Clear monitoring</span>
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
    <div className="integration-topology" role="region" aria-label="Integration capabilities">
      <div className="integration-topology__heading">
        <div>
          <span className="panel-kicker">Connected services</span>
          <h3>Ways software connects</h3>
        </div>
        <span className="integration-topology__count" aria-live="polite" aria-atomic="true">
          {visibleIntegrations.length} <small>of {integrations.length} capabilities</small>
        </span>
      </div>

      <div className="integration-search">
        <i className="bi bi-search" aria-hidden="true" />
        <label className="visually-hidden" htmlFor="integrationSearch">Search integrations</label>
        <input
          id="integrationSearch"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search payments, messaging, identity…"
          aria-controls="integrationDomains"
          onKeyDown={(event) => { if (event.key === 'Escape') setQuery(''); }}
        />
        {query && <button type="button" aria-label="Clear integration search" onClick={() => setQuery('')}><i className="bi bi-x-lg" aria-hidden="true" /></button>}
      </div>

      <div id="integrationDomains" className="integration-topology-grid" role="list" aria-label="Integration capabilities">
        {visibleIntegrations.map((integration) => (
          <article className="integration-topology-card" role="listitem" key={integration.title}>
            <header>
              <i className={`bi ${integration.icon}`} aria-hidden="true" />
            </header>
            <h4>{integration.title}</h4>
            <p>{integration.description}</p>
            <ul className="integration-card__tools" aria-label="Related technologies and patterns">
              {integration.tools.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
          </article>
        ))}
        {!visibleIntegrations.length && (
          <p className="integration-search-empty" role="status">No integrations found for “{query.trim()}”. Try another service or capability.</p>
        )}
      </div>
    </div>
  );
}

export default function IntegrationsSection() {
  return <section id="integrations" className="integrations-section" aria-labelledby="integrationsTitle">
    <div className="site-container">
      <SectionHeading eyebrow="Integrations" id="integrationsTitle" title="Make every service work together.">
        Connect payments, identity, messaging, and data tools without spreading provider-specific logic throughout your product.
      </SectionHeading>
      <div className="integration-layout">
        <ReferenceFlow />
        <IntegrationTopology />
      </div>
    </div>
  </section>;
}
