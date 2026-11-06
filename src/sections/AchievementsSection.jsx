import { useRef } from 'react';
import { proof } from '../data/portfolio';
import { Counter, MotionToggle, Reveal, SectionHeading, Spotlight } from '../components/shared/ui';
import { useLoopMotion } from '../hooks/useLoopMotion';
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
  const proofLoopRef = useRef(null);
  const { reducedMotion, motionVisible, paused, togglePaused, isPaused } = useLoopMotion(proofLoopRef);

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

        <div ref={proofLoopRef} className="proof-loop" data-paused={isPaused} role="region" aria-label="Proof points">
          <div className="proof-loop__toolbar">
            <span><i aria-hidden="true" />Delivery signals · {proof.length} proof points</span>
            {!reducedMotion && motionVisible && (
              <MotionToggle
                paused={paused}
                onToggle={togglePaused}
                pauseLabel="Pause loop"
                resumeLabel="Resume loop"
              />
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
              : !motionVisible
                ? 'Proof loop paused while off-screen or while this page is hidden.'
              : paused
                ? 'Proof loop paused. Scroll horizontally to explore.'
                : 'Proof points are moving. Use the pause button to explore at your own pace.'}
          </p>
        </div>
      </div>
    </section>
  );
}
