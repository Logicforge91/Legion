import { useCallback, useEffect, useRef, useState } from 'react';
import { journey } from '../data/portfolio';
import { Reveal, SectionHeading } from '../components/shared/ui';
import { useReducedMotion } from '../hooks/useReducedMotion';
import '../styles/sections/JourneySection.css';

const formatMilestoneNumber = (index) => String(index + 1).padStart(2, '0');
const LOOP_CENTER = 160;
const LOOP_RADIUS = 118;

function getLoopPoint(index, count) {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
  const x = LOOP_CENTER + LOOP_RADIUS * Math.cos(angle);
  const y = LOOP_CENTER + LOOP_RADIUS * Math.sin(angle);

  return {
    x,
    y,
    style: {
      '--journey-count': count,
      '--node-x': `calc(7% + ${(x / 320) * 86}%)`,
      '--node-y': `calc(7% + ${(y / 320) * 86}%)`,
    },
  };
}

function JourneyLoop({ activeIndex }) {
  return (
    <div className="journey-loop" aria-hidden="true">
      <svg className="journey-loop__graphic" viewBox="0 0 320 320" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="journey-loop-gradient" x1="36" y1="50" x2="282" y2="270" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-secondary, var(--accent))" />
          </linearGradient>
          <marker id="journey-loop-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M1 1 7 4.5 1 8" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <circle className="journey-loop__track" cx="160" cy="160" r="118" />
        <path className="journey-loop__direction" d="M160 42a118 118 0 1 1-83.44 34.56" markerEnd="url(#journey-loop-arrow)" />
        <g className="journey-loop__nodes" fill="var(--surface, #fff)">
          {journey.map((item, index) => {
            const point = getLoopPoint(index, journey.length);
            return <circle key={`${item.period}-${item.title}`} className={index === activeIndex ? 'is-active' : undefined} cx={point.x} cy={point.y} r={index === activeIndex ? 9 : 7} />;
          })}
        </g>
      </svg>

      <div className="journey-loop__center">
        <span className="journey-loop__eyebrow">Career timeline</span>
        <strong>Built through<br />experience</strong>
      </div>

      {journey.map((item, index) => (
        <div className={`journey-loop__node${index === activeIndex ? ' is-active' : ''}`} key={`${item.period}-${item.title}`} style={getLoopPoint(index, journey.length).style}>
          <span className="journey-loop__node-number">{formatMilestoneNumber(index)}</span>
          <span className="journey-loop__node-year">{item.period}</span>
          <span className="journey-loop__node-title">{item.title}</span>
        </div>
      ))}
    </div>
  );
}

function JourneyCarousel({ activeIndex, onSelect }) {
  const trackRef = useRef(null);
  const frameRef = useRef(0);
  const reducedMotion = useReducedMotion();

  const scrollToMilestone = useCallback((index) => {
    const track = trackRef.current;
    const slide = track?.children[index];
    if (!track || !slide) return;

    const left = track.scrollLeft + slide.getBoundingClientRect().left - track.getBoundingClientRect().left;
    const wraps = (activeIndex === journey.length - 1 && index === 0) || (activeIndex === 0 && index === journey.length - 1);
    track.scrollTo({ left, behavior: reducedMotion || wraps ? 'auto' : 'smooth' });
  }, [activeIndex, reducedMotion]);

  const goToMilestone = (index) => scrollToMilestone((index + journey.length) % journey.length);

  const handleScroll = () => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const track = trackRef.current;
      if (!track) return;
      const nextIndex = Array.from(track.children).reduce((nearest, slide, index, slides) => {
        const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
        const nearestDistance = Math.abs(slides[nearest].offsetLeft - track.scrollLeft);
        return distance < nearestDistance ? index : nearest;
      }, 0);
      onSelect(nextIndex);
    });
  };

  const handleKeyDown = (event) => {
    if (event.target !== trackRef.current) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToMilestone(activeIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToMilestone(activeIndex - 1);
    }
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    <div className="journey-carousel" role="region" aria-roledescription="carousel" aria-labelledby="journeyTitle">
      <div className="journey-carousel__stepper" role="group" aria-label="Jump to a career chapter" style={{ '--journey-count': journey.length }}>
        {journey.map((item, index) => (
          <button
            key={`${item.period}-${item.title}`}
            type="button"
            className={index === activeIndex ? 'is-active' : ''}
            aria-current={index === activeIndex ? 'step' : undefined}
            aria-label={`Go to chapter ${formatMilestoneNumber(index)}, ${item.period}`}
            onClick={() => goToMilestone(index)}
          >
            <span>{formatMilestoneNumber(index)}</span>
            <small>{item.period}</small>
          </button>
        ))}
      </div>

      <ol
        ref={trackRef}
        className="timeline"
        aria-label="Career milestones"
        tabIndex={0}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
      >
        {journey.map((item, index) => (
          <Reveal
            as="li"
            className={`journey-milestone${index === activeIndex ? ' is-active' : ''}`}
            key={`${item.period}-${item.title}`}
            aria-roledescription="slide"
            aria-label={`${formatMilestoneNumber(index)} of ${journey.length}: ${item.period}, ${item.title}`}
          >
            <article className="timeline-item">
              <header className="journey-milestone__header">
                <span className="timeline-index" aria-hidden="true">{formatMilestoneNumber(index)}</span>
                <span className="timeline-year">{item.period}</span>
              </header>
              <h3>{item.title}</h3>
              {item.company && (
                <a href={item.companyUrl} target="_blank" rel="noreferrer" className="company-link">
                  {item.company}<i className="bi bi-arrow-up-right" aria-hidden="true" />
                </a>
              )}
              <p>{item.text}</p>
            </article>
          </Reveal>
        ))}
      </ol>

      <div className="journey-carousel__controls">
        <span className="journey-carousel__counter" aria-hidden="true">
          {formatMilestoneNumber(activeIndex)} <small>/ {formatMilestoneNumber(journey.length)}</small>
        </span>
        <div className="journey-carousel__progress" aria-hidden="true">
          <i style={{ width: `${((activeIndex + 1) / journey.length) * 100}%` }} />
        </div>
        <div className="journey-carousel__arrows">
          <button type="button" aria-label="Previous career chapter" onClick={() => goToMilestone(activeIndex - 1)}>
            <i className="bi bi-arrow-left" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next career chapter" onClick={() => goToMilestone(activeIndex + 1)}>
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        Chapter {formatMilestoneNumber(activeIndex)} of {formatMilestoneNumber(journey.length)}: {journey[activeIndex].period}, {journey[activeIndex].title}.
      </p>
    </div>
  );
}

export default function JourneySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="journey" className="journey-section" aria-labelledby="journeyTitle">
      <div className="site-container">
        <SectionHeading eyebrow="The journey" id="journeyTitle" title="A steady progression toward stronger systems.">
          Each chapter added a new layer of ownership, from shipping features to making the whole product more dependable.
        </SectionHeading>
        <div className="journey-layout">
          <div className="journey-overview">
            <JourneyLoop activeIndex={activeIndex} />
            <p className="journey-overview__caption">{journey.length} chapters. One growing engineering mindset.</p>
          </div>
          <JourneyCarousel
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </div>
      </div>
    </section>
  );
}
