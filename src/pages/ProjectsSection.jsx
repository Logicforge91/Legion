import { lazy, Suspense, startTransition, useCallback, useEffect, useMemo, useState } from 'react';
import { projects } from '../data';
import { Reveal, SectionHeading, Spotlight } from '../components/ui';

const loadProjectDialog = () => import('../components/ProjectDialog');
const ProjectDialog = lazy(loadProjectDialog);

const filters = ['all', 'backend', 'integration', 'product', 'realtime'];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const visibleProjects = useMemo(
    () => projects.filter((project) => activeFilter === 'all' || project.filters.includes(activeFilter)),
    [activeFilter],
  );

  useEffect(() => {
    const syncProjectFromUrl = () => {
      const slug = new URLSearchParams(window.location.search).get('case');
      const project = slug ? projects.find((item) => item.slug === slug) ?? null : null;
      setSelectedProject(project);
      document.title = project ? `${project.title} | Suman K S` : 'Suman K S | Laravel & Java Backend Engineer';
      document.querySelector('meta[name="description"]')?.setAttribute('content', project?.text ?? 'Suman K S builds production-minded Laravel and Java backends: clear APIs, intentional data paths, reliable integrations, and operable workflows.');
    };
    syncProjectFromUrl();
    window.addEventListener('popstate', syncProjectFromUrl);
    return () => window.removeEventListener('popstate', syncProjectFromUrl);
  }, []);

  const openProject = useCallback((project) => {
    const url = new URL(window.location.href);
    url.searchParams.set('case', project.slug);
    window.history.pushState({ portfolioCaseStudy: true }, '', url);
    document.title = `${project.title} | Suman K S`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', project.text);
    setSelectedProject(project);
  }, []);

  const closeProject = useCallback((destination) => {
    const navigateAfterClose = () => {
      if (destination !== 'contact') return;
      window.history.replaceState({}, '', '#contact');
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (window.history.state?.portfolioCaseStudy) {
      if (destination === 'contact') window.addEventListener('popstate', navigateAfterClose, { once: true });
      window.history.back();
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete('case');
    window.history.replaceState({}, '', url);
    document.title = 'Suman K S | Laravel & Java Backend Engineer';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Suman K S builds production-minded Laravel and Java backends: clear APIs, intentional data paths, reliable integrations, and operable workflows.');
    setSelectedProject(null);
    navigateAfterClose();
  }, []);

  const selectFilter = (filter) => {
    startTransition(() => setActiveFilter(filter));
  };

  return <section id="projects" className="projects-section" aria-labelledby="projectsTitle"><div className="site-container">
    <SectionHeading eyebrow="Featured Systems" id="projectsTitle" title="Selected backend problems—and the decisions behind them.">Not screenshot galleries: system stories about permissions, state, data access, provider failures, and operational clarity.</SectionHeading>
    <Reveal className="project-filter" aria-label="Filter featured systems">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'active' : ''} type="button" aria-pressed={activeFilter === filter} onClick={() => selectFilter(filter)}>{filter === 'all' ? 'All systems' : filter}</button>)}</Reveal>
    <p id="projectFilterStatus" className="visually-hidden" aria-live="polite">Showing {visibleProjects.length} {activeFilter === 'all' ? 'featured' : activeFilter} systems.</p>
    <div className="projects-grid">{visibleProjects.map((project) => <Reveal key={project.title} className={project.className || ''}><Spotlight className={`project-card ${project.className || ''}`}><div className="project-top"><span>{project.category}</span><i className={`bi ${project.icon}`} aria-hidden="true" /></div><h3>{project.title}</h3><p>{project.text}</p><ul>{project.points.map((point) => <li key={point}>{point}</li>)}</ul><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="project-details-button" type="button" onPointerEnter={loadProjectDialog} onFocus={loadProjectDialog} onClick={() => openProject(project)}>Read case study <i className="bi bi-arrow-up-right" aria-hidden="true" /></button></Spotlight></Reveal>)}</div>
    {selectedProject && <Suspense fallback={<div className="dialog-loading" role="status">Loading case study…</div>}><ProjectDialog project={selectedProject} onClose={closeProject} /></Suspense>}
  </div></section>;
}
