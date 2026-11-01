import { Reveal, Spotlight } from '../shared/ui';
import { projectFilterLabels } from '../../config/projectFilters';

export default function ProjectCard({ project, number, featured = false }) {
  return (
    <Reveal className={`project-reveal${featured ? ' is-featured' : ''}`}>
      <Spotlight className={`project-card${featured ? ' project-card--featured' : ''}`}>
        <header className="project-card__header">
          <span className="project-index">{number}</span>
          <div className="card-icon project-card__icon">
            <i className={`bi ${project.icon}`} aria-hidden="true" />
          </div>
        </header>
        <span className="project-category">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.text}</p>
        <footer className="project-card__footer">
          <ul aria-label="System domains">
            {project.filters.map((filter) => <li key={filter}>{projectFilterLabels.get(filter) ?? filter}</li>)}
          </ul>
          <span className="project-card__mark" aria-hidden="true"><i className="bi bi-arrow-up-right" /></span>
        </footer>
      </Spotlight>
    </Reveal>
  );
}
