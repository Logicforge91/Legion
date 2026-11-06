import { memo } from 'react';
import { Reveal, Spotlight } from '../shared/ui';
import { projectFilterLabels } from '../../config/projectFilters';

function ProjectCard({ project, number, featured = false, slidePosition, slideCount, clone = false, onOpen }) {
  return (
    <Reveal
      className={`project-reveal${featured ? ' is-featured' : ''}${clone ? ' is-loop-clone' : ''}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${slidePosition} of ${slideCount}: ${project.title}`}
      aria-hidden={clone || undefined}
      inert={clone || undefined}
    >
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
          <button
            className="project-card__action"
            type="button"
            aria-label={`View overview: ${project.title}`}
            onClick={() => onOpen(project)}
            tabIndex={clone ? -1 : undefined}
          >
            View overview <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </button>
        </footer>
      </Spotlight>
    </Reveal>
  );
}

// Carousel progress changes often while the project data and card props remain stable.
// Memoizing avoids re-rendering every card for each scroll-frame update.
export default memo(ProjectCard);
