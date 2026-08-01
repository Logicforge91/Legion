import { integrations } from '../data';
import { Reveal, SectionHeading, Spotlight } from '../components/ui';

export default function IntegrationsSection() {
  return <section id="integrations" className="integrations-section" aria-labelledby="integrationsTitle">
    <div className="site-container">
      <SectionHeading eyebrow="Connected Systems" id="integrationsTitle" title="Integrations designed to survive real production conditions.">
        External services are wrapped in predictable contracts with secure callbacks, observability, retries, and failure paths that teams can operate confidently.
      </SectionHeading>
      <div className="integration-layout">
        <Reveal className="integration-flow-wrap">
          <Spotlight as="div" className="integration-flow" aria-label="Integration request flow">
            <div className="flow-heading"><span className="panel-kicker">Reference flow</span><strong>From request to reliable delivery</strong></div>
            <div className="flow-track">
              <div className="flow-node"><i className="bi bi-window" aria-hidden="true" /><span>Client</span><small>validated request</small></div>
              <i className="bi bi-arrow-right flow-arrow" aria-hidden="true" />
              <div className="flow-node active"><i className="bi bi-hdd-network" aria-hidden="true" /><span>API layer</span><small>auth + contract</small></div>
              <i className="bi bi-arrow-right flow-arrow" aria-hidden="true" />
              <div className="flow-node"><i className="bi bi-stack" aria-hidden="true" /><span>Queue</span><small>retry + schedule</small></div>
              <i className="bi bi-arrow-right flow-arrow" aria-hidden="true" />
              <div className="flow-node"><i className="bi bi-cloud-check" aria-hidden="true" /><span>Provider</span><small>tracked outcome</small></div>
            </div>
            <div className="flow-signals"><span><i className="bi bi-shield-check" aria-hidden="true" />Signed webhooks</span><span><i className="bi bi-arrow-repeat" aria-hidden="true" />Idempotent retries</span><span><i className="bi bi-activity" aria-hidden="true" />Structured logs</span></div>
          </Spotlight>
        </Reveal>
        <div className="integration-grid">
          {integrations.map((integration) => <Reveal key={integration.title}><Spotlight className="integration-card"><i className={`bi ${integration.icon} integration-icon`} aria-hidden="true" /><div><h3>{integration.title}</h3><p>{integration.description}</p><div className="tag-row">{integration.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div></Spotlight></Reveal>)}
        </div>
      </div>
    </div>
  </section>;
}
