import { Reveal, SectionHeading } from '../components/shared/ui';
import { services } from '../data/portfolio.js';
import '../styles/sections/EducationServicesSection.css';

export default function ServicesSection() {
  return (
    <section id="services" className="services-section" aria-labelledby="servicesTitle">
      <div className="site-container">
        <SectionHeading eyebrow="Services" id="servicesTitle" title="Software services for modern business.">
          QYVERON delivers software engineering across backend systems, APIs, and data platforms.
        </SectionHeading>

        <div className="services-grid" role="list" aria-label="Backend engineering services">
          {services.map((service) => (
            <Reveal as="article" role="listitem" className="service-card" key={service.title}>
              <header className="service-card__header">
                <span>What we do</span>
                <i className={`bi ${service.icon}`} aria-hidden="true" />
              </header>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-card__capability">{service.capability}</span>
              <a href="#contact">Discuss this service <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
