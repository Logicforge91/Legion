import { integrations, projects, services, skills } from '../../data/portfolio';
import { profile } from '../../data/portfolio/profile.js';
import './PrintPortfolio.css';

export default function PrintPortfolio() {
  return (
    <main className="print-portfolio">
      <header className="print-portfolio__header">
        <div>
          <p className="print-portfolio__eyebrow">{profile.industry}</p>
          <h1>{profile.name}</h1>
          <p>{profile.tagline} · IT and software development</p>
        </div>
        <p>{profile.vision}</p>
      </header>

      <section>
        <h2>Company identity</h2>
        <ul className="print-portfolio__skills">
          <li><strong>Industry</strong><span>{profile.industry}</span></li>
          <li><strong>Brand personality</strong><span>{profile.personality.join(' · ')}</span></li>
          <li><strong>Core values</strong><span>{profile.coreValues.join(' · ')}</span></li>
          <li><strong>Vision</strong><span>{profile.vision}</span></li>
        </ul>
      </section>

      <section>
        <h2>Services</h2>
        <ul className="print-portfolio__skills">
          {services.map((service) => <li key={service.title}><strong>{service.title}</strong><p>{service.description}</p></li>)}
        </ul>
      </section>

      <section>
        <h2>Selected systems</h2>
        <ul className="print-portfolio__projects">
          {projects.map((project) => <li key={project.slug}><strong>{project.title}</strong><span>{project.category}</span><p>{project.text}</p></li>)}
        </ul>
      </section>

      <section>
        <h2>Engineering toolkit</h2>
        <ul className="print-portfolio__skills">
          {skills.map((skill) => <li key={skill.title}><strong>{skill.title}</strong><p>{skill.description}</p></li>)}
        </ul>
      </section>

      <section>
        <h2>Integration domains</h2>
        <ul className="print-portfolio__integrations">
          {integrations.map((item) => <li key={item.title}><strong>{item.title}:</strong> {item.tools.join(' · ')}</li>)}
        </ul>
      </section>
    </main>
  );
}
