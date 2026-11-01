import { startTransition, useCallback, useEffect, useMemo, useState } from 'react';
import { projects } from '../data/portfolio';
import { Reveal, SectionHeading, Spotlight } from '../components/shared/ui';
import ProjectDialog from '../components/overlays/ProjectDialog';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './ProjectsSection.css';

const systemNumbers = new Map(projects.map((project, index) => [project.slug, index + 1]));
const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));
const defaultMetadata = {
  title: 'Suman K S | Laravel & Java Backend Engineer',
  description: 'Suman K S builds production-minded Laravel and Java backends: clear APIs, intentional data paths, reliable integrations, and operable workflows.',
};

function updatePageMetadata(project) {
  document.title = project ? `${project.title} | Suman K S` : defaultMetadata.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', project?.text ?? defaultMetadata.description);
}

const filters = [['all', 'All systems'], ['java', 'Java Tech'], ['health', 'Health'], ['fintech', 'Fintech'], ['education', 'Education ERP'], ['websites', 'Custom websites'], ['ecommerce', 'Ecommerce'], ['integrations', 'Integrations'], ['gaming', 'Game applications']];
const filterLabels = new Map(filters);

export default function ProjectsSection() {
  const reducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const visibleProjects = useMemo(() => projects.filter((project) => activeFilter === 'all' || project.filters.includes(activeFilter)), [activeFilter]);
  const activeFilterLabel = filterLabels.get(activeFilter) ?? 'Featured';
  const statusFilterLabel = activeFilter === 'java' ? 'Java' : activeFilterLabel;

  useEffect(() => {
    const syncProjectFromUrl = () => {
      const slug = new URLSearchParams(window.location.search).get('case');
      const project = slug ? projectsBySlug.get(slug) ?? null : null;
      setSelectedProject(project);
      updatePageMetadata(project);
    };
    syncProjectFromUrl();
    window.addEventListener('popstate', syncProjectFromUrl);
    return () => window.removeEventListener('popstate', syncProjectFromUrl);
  }, []);

  const openProject = useCallback((project) => {
    const url = new URL(window.location.href);
    url.searchParams.set('case', project.slug);
    window.history.pushState({ portfolioCaseStudy: true }, '', url);
    updatePageMetadata(project);
    setSelectedProject(project);
  }, []);

  const closeProject = useCallback((destination) => {
    const navigateAfterClose = () => {
      if (destination !== 'contact') return;
      window.history.replaceState({}, '', '#contact');
      document.getElementById('contact')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    };

    if (window.history.state?.portfolioCaseStudy) {
      if (destination === 'contact') window.addEventListener('popstate', navigateAfterClose, { once: true });
      window.history.back();
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete('case');
    window.history.replaceState({}, '', url);
    updatePageMetadata(null);
    setSelectedProject(null);
    navigateAfterClose();
  }, [reducedMotion]);

  const selectFilter = (filter) => {
    startTransition(() => setActiveFilter(filter));
  };

  return <section id="projects" className="projects-section systems-showcase" aria-labelledby="projectsTitle"><div className="site-container">
    <SectionHeading eyebrow="Featured Systems" id="projectsTitle" title="Product domains and Java systems. One production mindset.">Explore how permissions, money, operations, content, orders, and user flows get built for production realities.</SectionHeading>
    <Reveal className="system-toolbar"><div className="system-directory"><span className="system-directory-label">System directory</span><strong>{String(visibleProjects.length).padStart(2, '0')}</strong></div><div className="system-filters" role="group" aria-label="Filter systems by category">{filters.map(([value, label]) => <button key={value} type="button" className={`filter-button${activeFilter === value ? ' is-active' : ''}`} aria-pressed={activeFilter === value} onClick={() => selectFilter(value)}>{label}</button>)}</div></Reveal>
    <p id="projectFilterStatus" className="visually-hidden" aria-live="polite">Showing {visibleProjects.length} {activeFilter === 'all' ? 'featured' : statusFilterLabel} {visibleProjects.length === 1 ? 'system' : 'systems'}.</p>
    <div className={`projects-grid systems-grid${visibleProjects.length === 1 ? ' single-result' : visibleProjects.length === 2 ? ' paired-results' : ''}`}>{visibleProjects.map((project) => { const indexLabel = systemNumbers.get(project.slug)?.toString().padStart(2, '0'); return <Reveal key={project.slug}><Spotlight className="project-card"><span className="project-index">{indexLabel}</span><div className="card-icon"><i className={`bi ${project.icon}`} aria-hidden="true" /></div><span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.text}</p><button type="button" className="read-more" onClick={() => openProject(project)}>Open case study</button></Spotlight></Reveal>; })}</div>
    {selectedProject && <ProjectDialog project={selectedProject} onClose={closeProject} />}
  </div></section>;
}
