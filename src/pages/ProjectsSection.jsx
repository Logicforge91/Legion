import { startTransition, useCallback, useEffect, useMemo, useState } from 'react';
import { projects } from '../data';
import { Reveal, SectionHeading, Spotlight } from '../components/ui';
import ProjectDialog from '../components/ProjectDialog';
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

const filters = [
  ['all', 'All systems'],
  ['java', 'Java Tech'],
  ['health', 'Health'],
  ['fintech', 'Fintech'],
  ['education', 'Education ERP'],
  ['websites', 'Custom websites'],
  ['ecommerce', 'Ecommerce'],
  ['integrations', 'Integrations'],
  ['gaming', 'Game applications'],
];
const filterLabels = new Map(filters);

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const visibleProjects = useMemo(
    () => projects.filter((project) => activeFilter === 'all' || project.filters.includes(activeFilter)),
    [activeFilter],
  );
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
    updatePageMetadata(null);
    setSelectedProject(null);
    navigateAfterClose();
  }, []);

  const selectFilter = (filter) => {
    startTransition(() => setActiveFilter(filter));
  };

  return <section id="projects" className="projects-section systems-showcase" aria-labelledby="projectsTitle"><div className="site-container">
    <SectionHeading eyebrow="Featured Systems" id="projectsTitle" title="Product domains and Java systems. One production mindset.">Explore how permissions, money, operations, content, orders, providers, realtime state, and Spring Boot services become systems that teams can operate with confidence.</SectionHeading>
    <Reveal className="system-toolbar"><div className="system-directory"><span className="system-directory-label">System directory</span><strong>{String(visibleProjects.length).padStart(2, '0')}</strong><span>{activeFilter === 'all' ? 'selected case studies' : activeFilterLabel}</span></div><div className="project-filter" aria-label="Filter featured systems">{filters.map(([value, label], index) => <button key={value} className={activeFilter === value ? 'active' : ''} type="button" aria-pressed={activeFilter === value} onClick={() => selectFilter(value)}><small aria-hidden="true">{String(index).padStart(2, '0')}</small>{label}</button>)}</div></Reveal>
    <p id="projectFilterStatus" className="visually-hidden" aria-live="polite">Showing {visibleProjects.length} {activeFilter === 'all' ? 'featured' : statusFilterLabel} {visibleProjects.length === 1 ? 'system' : 'systems'}.</p>
    <div className={`projects-grid systems-grid${visibleProjects.length === 1 ? ' single-result' : visibleProjects.length === 2 ? ' paired-results' : ''}`}>{visibleProjects.map((project) => { const systemNumber = systemNumbers.get(project.slug); return <Reveal key={project.title} className="system-card-shell" data-system={project.filters[0]}><Spotlight className="project-card system-card"><span className="system-card-glow" aria-hidden="true" /><div className="project-top"><div className="system-icon"><i className={`bi ${project.icon}`} aria-hidden="true" /></div><div className="system-card-meta"><span>{project.category}</span><small>Case / {String(systemNumber).padStart(2, '0')}</small></div><span className="system-availability"><i aria-hidden="true" />Designed flow</span></div><div className="system-card-copy"><h3>{project.title}</h3><p>{project.text}</p></div><div className="system-scenario" aria-label={`Representative ${project.category} runtime flow`}><div className="system-scenario-head"><span><i aria-hidden="true" />Runtime example</span><small>illustrative</small></div><code>{project.scenario.request}</code><div className="system-scenario-route"><span>{project.scenario.event}</span><i className="bi bi-arrow-right" aria-hidden="true" /><strong>{project.scenario.result}</strong></div></div><div className="system-card-footer"><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="project-details-button" type="button" onClick={() => openProject(project)} aria-label={`Open ${project.title} case study`}><span>View case</span><i className="bi bi-arrow-up-right" aria-hidden="true" /></button></div></Spotlight></Reveal>; })}</div>
    {selectedProject && <ProjectDialog project={selectedProject} onClose={closeProject} />}
  </div></section>;
}
