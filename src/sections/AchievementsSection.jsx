import { useState } from 'react';
import { proof } from '../data/portfolio';
import { Counter, Reveal, SectionHeading, Spotlight } from '../components/shared/ui';
import { useReducedMotion } from '../hooks/useReducedMotion';
import '../styles/sections/AchievementsSection.css';

function ProofCard({ item, animate = true }) {
  const { value, suffix, label, description } = item;

  return (
    <Reveal as="div" role="listitem" className="proof-loop-item">
      <Spotlight className="proof-card">
        <strong className="stat-number">
          {animate ? <Counter value={value} suffix={suffix} /> : <span>{value}{suffix}</span>}
        </strong>
        <h3>{label}</h3>
        <p>{description}</p>
      </Spotlight>
    </Reveal>
  );
}

export default function AchievementsSection() {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const isPaused = paused || reducedMotion;

  return (
    <section id="achievements" className="achievements-section" aria-labelledby="proofTitle">
      <div className="site-container">
        <SectionHeading
          eyebrow="Proof"
          id="proofTitle"
          title="Signals of sustained backend delivery."
        >
          Real product patterns, reliability work, and system ownership that show up over time.
        </SectionHeading>

        <div className="proof-loop" data-paused={isPaused} role="region" aria-label="Proof points">
          <div className="proof-loop__toolbar">
            <span><i aria-hidden="true" />Delivery signals · {proof.length} proof points</span>
            {!reducedMotion && (
              <button type="button" aria-pressed={paused} onClick={() => setPaused((current) => !current)}>
                <i className={`bi ${paused ? 'bi-play-fill' : 'bi-pause-fill'}`} aria-hidden="true" />
                {paused ? 'Resume loop' : 'Pause loop'}
              </button>
            )}
          </div>

          <div className="proof-loop__viewport proof-grid" aria-label="Scrollable proof cards" tabIndex={isPaused ? 0 : undefined}>
            <div className="proof-loop__lane">
              <div className="proof-loop__track">
                {[false, true].map((isDuplicate) => (
                  <div
                    className="proof-loop__group"
                    key={isDuplicate ? 'clone' : 'original'}
                    role="list"
                    aria-hidden={isDuplicate || undefined}
                  >
                    {proof.map((item) => <ProofCard item={item} key={item.label} animate={!isDuplicate} />)}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="visually-hidden" aria-live="polite">
            {reducedMotion
              ? 'Proof points are still for reduced motion. Scroll horizontally to explore.'
              : paused
                ? 'Proof loop paused. Scroll horizontally to explore.'
                : 'Proof points are moving. Use the pause button to explore at your own pace.'}
          </p>
        </div>
      </div>
    </section>
  );
}
