import { useCallback, useEffect, useState } from 'react';
import { projects } from '../data/portfolio';
import { useReducedMotion } from './useReducedMotion';

const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

const defaultMetadata = {
  title: 'Suman K S | Laravel & Java Backend Engineer',
  description: 'Suman K S builds production-minded Laravel and Java backends: clear APIs, intentional data paths, reliable integrations, and operable workflows.',
};

function updatePageMetadata(project) {
  document.title = project ? `${project.title} | Suman K S` : defaultMetadata.title;
  document.querySelector('meta[name="description"]')
    ?.setAttribute('content', project?.text ?? defaultMetadata.description);
}

function getProjectFromUrl() {
  const slug = new URLSearchParams(window.location.search).get('case');
  return slug ? projectsBySlug.get(slug) ?? null : null;
}

export function useProjectCaseStudy() {
  const reducedMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const syncProjectFromUrl = () => {
      const project = getProjectFromUrl();
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
      document.getElementById('contact')?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    };

    if (window.history.state?.portfolioCaseStudy) {
      if (destination === 'contact') {
        window.addEventListener('popstate', navigateAfterClose, { once: true });
      }
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

  return { selectedProject, openProject, closeProject };
}
