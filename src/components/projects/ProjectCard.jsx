import { Reveal, Spotlight } from '../shared/ui';

export default function ProjectCard({ project, number }) {
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
      </Spotlight>
    </Reveal>
  );
}
