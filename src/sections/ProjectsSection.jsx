import { startTransition, useState } from 'react';
import { projects } from '../data/portfolio';
import { projectFilters, projectFilterLabels } from '../config/projectFilters';
import { Reveal, SectionHeading } from '../components/shared/ui';
import ProjectFilterBar from '../components/projects/ProjectFilterBar';
import ProjectGrid from '../components/projects/ProjectGrid';
import '../styles/sections/ProjectsSection.css';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleProjects = projects.filter((project) => (
    activeFilter === 'all' || project.filters.includes(activeFilter)
  ));

  const activeFilterLabel = projectFilterLabels.get(activeFilter) ?? 'Featured';
  const statusFilterLabel = activeFilter === 'java' ? 'Java' : activeFilterLabel;

  const selectFilter = (filter) => {
    startTransition(() => setActiveFilter(filter));
  };

  return (
    <section id="projects" className="projects-section systems-showcase" aria-labelledby="projectsTitle">
      <div className="site-container">
        <SectionHeading
          eyebrow="Solutions / capabilities"
          id="projectsTitle"
          title="Solutions shaped around your business."
        >
          Explore the kinds of software systems QYVERON can design and build across business domains. The examples describe solution patterns, not named client engagements.
        </SectionHeading>

        <ProjectFilterBar
          count={visibleProjects.length}
          filters={projectFilters}
          activeFilter={activeFilter}
          onSelect={selectFilter}
        />

        <p id="projectFilterStatus" className="visually-hidden" aria-live="polite">
          Showing {visibleProjects.length} {activeFilter === 'all' ? 'featured' : statusFilterLabel}{' '}
          {visibleProjects.length === 1 ? 'solution example' : 'solution examples'}.
        </p>

        <ProjectGrid
          projects={visibleProjects}
        />
      </div>
    </section>
  );
}
