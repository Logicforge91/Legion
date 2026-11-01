import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ProjectCard from './ProjectCard';

function getVisibleSlideCount(track) {
  if (!track) return 1;
  return Math.max(1, getComputedStyle(track).gridTemplateColumns.trim().split(/\s+/).length);
}

export default function ProjectGrid({ projects, projectNumbers }) {
  const trackRef = useRef(null);
  const scrollFrameRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const resultLayout = projects.length === 1
    ? 'single-result'
    : projects.length === 2
      ? 'paired-results'
      : '';
  const lastStartIndex = Math.max(0, projects.length - slidesPerView);
  const canGoBack = activeIndex > 0;
  const canGoForward = activeIndex < lastStartIndex;

  const syncActiveSlide = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackStart = track.getBoundingClientRect().left;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((slide, index) => {
      const distance = Math.abs(slide.getBoundingClientRect().left - trackStart);
      if (distance < nearestDistance) {
        nearestIndex = index;
        nearestDistance = distance;
      }
    });

    setActiveIndex((current) => current === nearestIndex ? current : nearestIndex);
  }, []);

  const scrollToSlide = useCallback((index) => {
    const track = trackRef.current;
    const slide = track?.children[index];
    if (!track || !slide) return;

    const left = track.scrollLeft + slide.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [reducedMotion]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const updateLayout = () => {
      const nextSlidesPerView = getVisibleSlideCount(track);
      setSlidesPerView(nextSlidesPerView);
      setActiveIndex((current) => Math.min(current, Math.max(0, projects.length - nextSlidesPerView)));
    };

    updateLayout();
    track.scrollTo({ left: 0, behavior: 'auto' });
    setActiveIndex(0);

    const observer = new ResizeObserver(updateLayout);
    observer.observe(track);
    return () => observer.disconnect();
  }, [projects]);

  useEffect(() => () => cancelAnimationFrame(scrollFrameRef.current), []);

  const handleScroll = () => {
    if (scrollFrameRef.current) return;
    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = 0;
      syncActiveSlide();
    });
  };

  const handleKeyDown = (event) => {
    if (event.target !== trackRef.current) return;
    if (event.key === 'ArrowRight' && canGoForward) {
      event.preventDefault();
      scrollToSlide(Math.min(activeIndex + 1, lastStartIndex));
    } else if (event.key === 'ArrowLeft' && canGoBack) {
      event.preventDefault();
      scrollToSlide(Math.max(activeIndex - 1, 0));
    }
  };

  const firstVisible = Math.min(activeIndex + 1, projects.length);
  const lastVisible = Math.min(activeIndex + slidesPerView, projects.length);
  const progress = projects.length ? (firstVisible / projects.length) * 100 : 0;

  return (
    <div className="projects-carousel" role="region" aria-label="Featured systems" aria-roledescription="carousel">
      <div className="projects-carousel__toolbar">
        <div className="projects-carousel__progress" aria-hidden="true">
          <span>{String(firstVisible).padStart(2, '0')}</span>
          <div><i style={{ width: `${progress}%` }} /></div>
          <span>{String(projects.length).padStart(2, '0')}</span>
        </div>
        <div className="projects-carousel__controls">
          <span>{String(firstVisible).padStart(2, '0')}–{String(lastVisible).padStart(2, '0')} <small>/ {String(projects.length).padStart(2, '0')} systems</small></span>
          {projects.length > slidesPerView && (
            <>
              <button type="button" aria-label="Previous systems" disabled={!canGoBack} onClick={() => scrollToSlide(Math.max(activeIndex - slidesPerView, 0))}>
                <i className="bi bi-arrow-left" aria-hidden="true" />
              </button>
              <button type="button" aria-label="Next systems" disabled={!canGoForward} onClick={() => scrollToSlide(Math.min(activeIndex + slidesPerView, lastStartIndex))}>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        Showing systems {firstVisible} through {lastVisible} of {projects.length}.
      </p>

      <div
        ref={trackRef}
        className={`projects-grid systems-grid ${resultLayout}`.trim()}
        role="group"
        aria-label="System slides"
        tabIndex={0}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            number={String(projectNumbers.get(project.slug) ?? 0).padStart(2, '0')}
            featured={index === 0}
            slidePosition={index + 1}
            slideCount={projects.length}
          />
        ))}
      </div>
    </div>
  );
}
