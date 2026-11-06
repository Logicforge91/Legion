import { useState } from 'react';
import { skills } from '../data/portfolio';
import { Reveal, SectionHeading } from '../components/shared/ui';
import '../styles/sections/SkillsSection.css';

const formatSkillNumber = (index) => String(index + 1).padStart(2, '0');
const categories = ['All', ...new Set(skills.map(({ category }) => category))];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const visibleSkills = skills
    .map((skill, index) => ({ ...skill, index }))
    .filter(({ category }) => activeCategory === 'All' || category === activeCategory);

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

        <div className="toolkit-board-heading">
          <span>Capability matrix</span>
          <span aria-live="polite">{String(visibleSkills.length).padStart(2, '0')} of {String(skills.length).padStart(2, '0')} capabilities</span>
        </div>

        <div className="toolkit-categories" role="group" aria-label="Filter capabilities by category">
          {categories.map((category) => {
            const count = category === 'All'
              ? skills.length
              : skills.filter((skill) => skill.category === category).length;
            const selected = category === activeCategory;
            return (
              <button
                aria-pressed={selected}
                className="toolkit-category"
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}<span aria-hidden="true">{String(count).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>

        <div className="toolkit-board" role="list" aria-label={`${activeCategory} engineering capabilities`}>
          {visibleSkills.map(({ category, icon, title, description, index }) => (
            <Reveal as="article" role="listitem" className="toolkit-card" data-index={formatSkillNumber(index)} key={title}>
              <header className="toolkit-card__header">
                <span>{category}</span>
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
