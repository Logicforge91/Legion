import { integrations, journey, proof, projects, skills } from '../../data/portfolio';
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
          <a href="mailto:sumanks1307@gmail.com">sumanks1307@gmail.com</a>
          <a href="https://github.com/Logicforge91">github.com/Logicforge91</a>
          <a href="https://www.linkedin.com/in/suman-k-s-a55868184/">LinkedIn profile</a>
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
