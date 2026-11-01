import { skills } from '../data/portfolio';
import { Reveal, SectionHeading } from '../components/shared/ui';
import '../styles/sections/SkillsSection.css';

const formatSkillNumber = (index) => String(index + 1).padStart(2, '0');

export default function SkillsSection() {
  return (
    <section id="skills" className="skills-section" aria-labelledby="skillsTitle">
      <div className="site-container">
        <SectionHeading
          eyebrow="Engineering toolkit"
          id="skillsTitle"
          title="Tools chosen for responsibility, not buzzwords."
        >
          The work is rarely just code—it is boundaries, data clarity, permissions, and operations built to survive pressure.
        </SectionHeading>

        <div className="toolkit-board-heading" aria-hidden="true">
          <span>Capability matrix</span>
          <span>{String(skills.length).padStart(2, '0')} domains / selected practice</span>
        </div>

        <div className="toolkit-board" role="list" aria-label="Engineering capabilities">
          {skills.map(({ icon, title, description }, index) => (
            <Reveal as="article" role="listitem" className="toolkit-card" data-index={formatSkillNumber(index)} key={title}>
              <header className="toolkit-card__header">
                <span>{formatSkillNumber(index)} / {String(skills.length).padStart(2, '0')}</span>
                <i className={`bi ${icon}`} aria-hidden="true" />
              </header>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="toolkit-card__footer">ENGINEERING CAPABILITY</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
