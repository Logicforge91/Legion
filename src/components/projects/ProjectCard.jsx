import { Reveal, Spotlight } from '../shared/ui';

export default function ProjectCard({ project, number, onOpen }) {
  return (
    <Reveal>
      <Spotlight className="project-card">
        <span className="project-index">{number}</span>
        <div className="card-icon">
          <i className={`bi ${project.icon}`} aria-hidden="true" />
        </div>
        <span className="project-category">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.text}</p>
        <button type="button" className="read-more" onClick={() => onOpen(project)}>
          Open case study
        </button>
      </Spotlight>
    </Reveal>
  );
}
