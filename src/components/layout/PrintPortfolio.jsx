import { education, integrations, journey, proof, projects, services, skills } from '../../data/portfolio';
import { profileLinks } from '../../config/profileLinks';
import './PrintPortfolio.css';

export default function PrintPortfolio() {
  return (
    <main className="print-portfolio">
      <header className="print-portfolio__header">
        <div>
          <p className="print-portfolio__eyebrow">Backend engineering portfolio</p>
          <h1>Suman K S</h1>
          <p>Backend Engineer · Laravel · Java · APIs · Integrations</p>
        </div>
        <address>
          <a href={`mailto:${profileLinks.email}`}>{profileLinks.email}</a>
          <a href={profileLinks.github}>github.com/Logicforge91</a>
          <a href={profileLinks.linkedin}>LinkedIn profile</a>
        </address>
      </header>

      <section>
        <h2>Portfolio metrics</h2>
        <ul className="print-portfolio__metrics">
          {proof.map(({ value, suffix, label }) => <li key={label}><strong>{value}{suffix}</strong><span>{label}</span></li>)}
        </ul>
      </section>

      <section>
        <h2>Career archive</h2>
        <ol className="print-portfolio__career">
          {journey.map((item) => (
            <li key={`${item.period}-${item.title}`}>
              <strong>{item.period} · {item.title}</strong>
              {item.company && <span>{item.company}</span>}
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>Education</h2>
        <ul className="print-portfolio__skills">
          {education.map((item) => (
            <li key={`${item.institution}-${item.graduationYear}`}>
              <strong>{item.degree}</strong>
              <span>{item.institution}, {item.city} · {item.graduationYear}</span>
              <p>{item.university}</p>
            </li>
          ))}
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
        <h2>Services</h2>
        <ul className="print-portfolio__skills">
          {services.map((service) => <li key={service.title}><strong>{service.title}</strong><p>{service.description}</p></li>)}
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
