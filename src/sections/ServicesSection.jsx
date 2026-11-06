import { Reveal, SectionHeading } from '../components/shared/ui';
import { services } from '../data/portfolio.js';
import '../styles/sections/EducationServicesSection.css';

export default function ServicesSection() {
  return (
    <section id="services" className="services-section" aria-labelledby="servicesTitle">
      <div className="site-container">
        <SectionHeading eyebrow="Services" id="servicesTitle" title="Backend support for the hard parts of a product.">
          Focused engineering help for teams building APIs, working with complex data, and connecting services safely.
        </SectionHeading>

        <div className="services-grid" role="list" aria-label="Backend engineering services">
          {services.map((service, index) => (
            <Reveal as="article" role="listitem" className="service-card" key={service.title}>
              <header className="service-card__header">
                <span>{String(index + 1).padStart(2, '0')} / SERVICE</span>
                <i className={`bi ${service.icon}`} aria-hidden="true" />
              </header>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-card__capability">RELATED CAPABILITY / {service.capability}</span>
              <a href="#contact">Discuss this service <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
