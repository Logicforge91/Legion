import { startTransition, useMemo, useState } from 'react';
import { projects } from '../data/portfolio';
import { projectFilters, projectFilterLabels } from '../config/projectFilters';
import { Reveal, SectionHeading } from '../components/shared/ui';
import ProjectFilterBar from '../components/projects/ProjectFilterBar';
import ProjectGrid from '../components/projects/ProjectGrid';
import '../styles/sections/ProjectsSection.css';

const projectNumbers = new Map(projects.map((project, index) => [project.slug, index + 1]));

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleProjects = useMemo(() => projects.filter((project) => (
    activeFilter === 'all' || project.filters.includes(activeFilter)
  )), [activeFilter]);

  const activeFilterLabel = projectFilterLabels.get(activeFilter) ?? 'Featured';
  const statusFilterLabel = activeFilter === 'java' ? 'Java' : activeFilterLabel;

  const selectFilter = (filter) => {
    startTransition(() => setActiveFilter(filter));
  };

  return (
    <section id="projects" className="projects-section systems-showcase" aria-labelledby="projectsTitle">
      <div className="site-container">
        <SectionHeading
          eyebrow="Featured Systems"
          id="projectsTitle"
          title="Product domains and Java systems. One production mindset."
        >
          Explore how permissions, money, operations, content, orders, and user flows get built for production realities.
        </SectionHeading>

        <ProjectFilterBar
          count={visibleProjects.length}
          filters={projectFilters}
          activeFilter={activeFilter}
          onSelect={selectFilter}
        />

        <p id="projectFilterStatus" className="visually-hidden" aria-live="polite">
          Showing {visibleProjects.length} {activeFilter === 'all' ? 'featured' : statusFilterLabel}{' '}
          {visibleProjects.length === 1 ? 'system' : 'systems'}.
        </p>

        <ProjectGrid
          projects={visibleProjects}
          projectNumbers={projectNumbers}
        />
      </div>
    </section>
  );
}
