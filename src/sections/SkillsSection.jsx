import { useState } from 'react';
import { skills } from '../data/portfolio';
import { Reveal, SectionHeading, Spotlight } from '../components/shared/ui';
import { useReducedMotion } from '../hooks/useReducedMotion';
import '../styles/sections/SkillsSection.css';

const lanes = [
  { label: 'Core engineering skills', direction: 'left', skills: skills.slice(0, 3) },
  { label: 'Product and operations skills', direction: 'right', skills: skills.slice(3) },
];

function SkillCard({ icon, title, description }) {
  return (
    <Reveal as="div" role="listitem" className="skills-loop-item">
      <Spotlight className="stack-card">
        <div className="card-icon">
          <i className={`bi ${icon}`} aria-hidden="true" />
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </Spotlight>
    </Reveal>
  );
}

function SkillsLane({ label, direction, items }) {
  return (
    <div className="skills-loop-lane" role="group" aria-label={label}>
      <div className={`skills-loop-track${direction === 'right' ? ' is-reversed' : ''}`}>
        {[false, true].map((isDuplicate) => (
          <div
            key={`${label}-${isDuplicate ? 'clone' : 'original'}`}
            className="skills-loop-group"
            role="list"
            aria-hidden={isDuplicate || undefined}
          >
            {items.map((skill) => <SkillCard key={skill.title} {...skill} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const isPaused = paused || reducedMotion;

  return (
    <section id="skills" className="skills-section" aria-labelledby="skillsTitle">
      <div className="site-container">
        <SectionHeading
          eyebrow="Stack"
          id="skillsTitle"
          title="A stack organized by responsibility, not buzzwords."
        >
          The work is rarely just code—it is boundaries, data clarity, permissions, and operations built to survive pressure.
        </SectionHeading>

        <div className="stack-board">
          <div className="skills-loop" data-paused={isPaused} role="region" aria-label="Skills loop">
            <div className="skills-loop-toolbar">
              <span><i aria-hidden="true" />{skills.length} capabilities · two connected lanes</span>
              {!reducedMotion && (
                <button
                  className="skills-loop-toggle"
                  type="button"
                  aria-pressed={paused}
                  onClick={() => setPaused((current) => !current)}
                >
                  <i className={`bi ${paused ? 'bi-play-fill' : 'bi-pause-fill'}`} aria-hidden="true" />
                  {paused ? 'Resume loop' : 'Pause loop'}
                </button>
              )}
            </div>

            <div
              className="skills-loop-viewport"
              aria-label="Skill cards. Pause the loop to scroll through both lanes."
              tabIndex={isPaused ? 0 : undefined}
            >
              {lanes.map(({ label, direction, skills: laneSkills }) => (
                <SkillsLane key={label} label={label} direction={direction} items={laneSkills} />
              ))}
            </div>
            <span className="visually-hidden" aria-live="polite">
              {reducedMotion
                ? 'Skills loop is still for reduced motion. Scroll horizontally to explore both lanes.'
                : paused
                  ? 'Skills loop paused. Scroll horizontally to explore both lanes.'
                  : 'Skills loop is moving.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
