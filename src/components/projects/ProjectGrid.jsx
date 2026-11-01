import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects, projectNumbers }) {
  const resultLayout = projects.length === 1
    ? 'single-result'
    : projects.length === 2
      ? 'paired-results'
      : '';

  return (
    <div className={`projects-grid systems-grid ${resultLayout}`.trim()}>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          number={String(projectNumbers.get(project.slug) ?? 0).padStart(2, '0')}
          featured={index === 0}
        />
      ))}
    </div>
  );
}
