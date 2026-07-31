import { lazy, Suspense, useMemo, useState } from 'react';
import { projects } from '../data';
import { Reveal, SectionHeading, Spotlight } from '../components/ui';

const ProjectDialog = lazy(() => import('../components/ProjectDialog'));

const filters = ['all', 'backend', 'integration', 'product', 'realtime'];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const visibleProjects = useMemo(
    () => projects.filter((project) => activeFilter === 'all' || project.filters.includes(activeFilter)),
    [activeFilter],
  );

  return <section id="projects" className="projects-section" aria-labelledby="projectsTitle"><div className="site-container">
    <SectionHeading eyebrow="Featured Systems" id="projectsTitle" title="Projects aligned with Backend Developer, Laravel, and Java roles.">Practical backend work across APIs, business logic, MySQL, integrations, Java services, and production workflows.</SectionHeading>
    <Reveal className="project-filter" aria-label="Filter featured systems">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'active' : ''} type="button" aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter === 'all' ? 'All systems' : filter}</button>)}</Reveal>
    <p id="projectFilterStatus" className="visually-hidden" aria-live="polite">Showing {visibleProjects.length} {activeFilter === 'all' ? 'featured' : activeFilter} systems.</p>
    <div className="projects-grid">{visibleProjects.map((project) => <Reveal key={project.title} className={project.className || ''}><Spotlight className={`project-card ${project.className || ''}`}><div className="project-top"><span>{project.category}</span><i className={`bi ${project.icon}`} /></div><h3>{project.title}</h3><p>{project.text}</p><ul>{project.points.map((point) => <li key={point}>{point}</li>)}</ul><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="project-details-button" type="button" onClick={() => setSelectedProject(project)}>View system details <i className="bi bi-arrow-up-right" aria-hidden="true" /></button></Spotlight></Reveal>)}</div>
    {selectedProject && <Suspense fallback={null}><ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} /></Suspense>}
  </div></section>;
}
