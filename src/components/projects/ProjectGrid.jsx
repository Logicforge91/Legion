import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ProjectCard from './ProjectCard';

function getVisibleSlideCount(track) {
  const firstSlide = track?.firstElementChild;
  if (!track || !firstSlide) return 1;

  const slideWidth = firstSlide.getBoundingClientRect().width;
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
  if (!slideWidth) return 1;

  return Math.max(1, Math.floor((track.clientWidth + gap) / (slideWidth + gap)));
}

function getSlideOffset(track, slide) {
  return track.scrollLeft + slide.getBoundingClientRect().left - track.getBoundingClientRect().left;
}

export default function ProjectGrid({ projects, projectNumbers }) {
  const trackRef = useRef(null);
  const frameRef = useRef(0);
  const settleTimerRef = useRef(0);
  const activeIndexRef = useRef(0);
  const previousProjectsRef = useRef(projects);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  activeIndexRef.current = activeIndex;

  const resultLayout = projects.length === 1
    ? 'single-result'
    : projects.length === 2
      ? 'paired-results'
      : '';
  const canLoop = projects.length > slidesPerView;
  const cloneCount = canLoop ? slidesPerView : 0;
  const lastVisible = projects.length ? (activeIndex + slidesPerView - 1) % projects.length + 1 : 0;
  const progress = projects.length ? ((activeIndex + 1) / projects.length) * 100 : 0;

  const slides = useMemo(() => {
    if (!cloneCount) return projects.map((project, index) => ({ project, index, clone: false, key: `main-${project.slug}` }));

    const prefix = projects.slice(-cloneCount).map((project, offset) => ({
      project,
      index: projects.length - cloneCount + offset,
      clone: true,
      key: `before-${project.slug}-${offset}`,
    }));
    const main = projects.map((project, index) => ({ project, index, clone: false, key: `main-${project.slug}` }));
    const suffix = projects.slice(0, cloneCount).map((project, index) => ({
      project,
      index,
      clone: true,
      key: `after-${project.slug}-${index}`,
    }));

    return [...prefix, ...main, ...suffix];
  }, [cloneCount, projects]);

  const scrollToSlide = useCallback((slideIndex, behavior = reducedMotion ? 'auto' : 'smooth') => {
    const track = trackRef.current;
    const slide = track?.children[slideIndex];
    if (!track || !slide) return;
    track.scrollTo({ left: getSlideOffset(track, slide), behavior });
  }, [reducedMotion]);

  const getNearestSlideIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track?.children.length) return 0;

    return Array.from(track.children).reduce((nearest, slide, index, allSlides) => {
      const distance = Math.abs(getSlideOffset(track, slide) - track.scrollLeft);
      const nearestDistance = Math.abs(getSlideOffset(track, allSlides[nearest]) - track.scrollLeft);
      return distance < nearestDistance ? index : nearest;
    }, 0);
  }, []);

  const normalizeLoopPosition = useCallback(() => {
    const track = trackRef.current;
    if (!track || !canLoop) return;

    const slideIndex = getNearestSlideIndex();
    const mainStart = cloneCount;
    const mainEnd = mainStart + projects.length;
    if (slideIndex >= mainStart && slideIndex < mainEnd) return;

    const itemIndex = slideIndex < mainStart
      ? projects.length - (mainStart - slideIndex)
      : slideIndex - mainEnd;
    activeIndexRef.current = itemIndex;
    setActiveIndex(itemIndex);
    scrollToSlide(mainStart + itemIndex, 'auto');
  }, [canLoop, cloneCount, getNearestSlideIndex, projects.length, scrollToSlide]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    track.addEventListener('scrollend', normalizeLoopPosition);
    return () => track.removeEventListener('scrollend', normalizeLoopPosition);
  }, [normalizeLoopPosition]);

  const handleScroll = () => {
    if (!frameRef.current) {
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = 0;
        const slideIndex = getNearestSlideIndex();
        const nextIndex = canLoop ? (slideIndex - cloneCount + projects.length) % projects.length : slideIndex;
        activeIndexRef.current = nextIndex;
        setActiveIndex((current) => current === nextIndex ? current : nextIndex);
      });
    }

    window.clearTimeout(settleTimerRef.current);
    const track = trackRef.current;
    if (track && !('onscrollend' in track)) {
      settleTimerRef.current = window.setTimeout(normalizeLoopPosition, 240);
    }
  };

  const moveBy = useCallback((direction) => {
    const track = trackRef.current;
    if (!track || !projects.length) return;

    window.clearTimeout(settleTimerRef.current);
    const currentIndex = activeIndexRef.current;
    const nextIndex = (currentIndex + direction + projects.length) % projects.length;
    const targetSlide = cloneCount + currentIndex + direction;

    if (canLoop) {
      scrollToSlide(targetSlide);
      return;
    }

    scrollToSlide(Math.max(0, Math.min(nextIndex, projects.length - slidesPerView)));
  }, [canLoop, cloneCount, projects.length, scrollToSlide, slidesPerView]);

  const handleKeyDown = (event) => {
    if (event.target !== trackRef.current) return;
    if (event.key === 'ArrowRight' && (canLoop || activeIndex < projects.length - slidesPerView)) {
      event.preventDefault();
      moveBy(1);
    } else if (event.key === 'ArrowLeft' && (canLoop || activeIndex > 0)) {
      event.preventDefault();
      moveBy(-1);
    }
  };

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const updateLayout = () => setSlidesPerView((current) => {
      const next = getVisibleSlideCount(track);
      return current === next ? current : next;
    });

    updateLayout();
    const observer = new ResizeObserver(updateLayout);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const projectsChanged = previousProjectsRef.current !== projects;
    if (projectsChanged) {
      previousProjectsRef.current = projects;
      activeIndexRef.current = 0;
      setActiveIndex(0);
    }

    const itemIndex = projectsChanged ? 0 : Math.min(activeIndexRef.current, projects.length - 1);
    const targetIndex = (canLoop ? cloneCount : 0) + itemIndex;
    scrollToSlide(targetIndex, 'auto');
  }, [canLoop, cloneCount, projects, slidesPerView, scrollToSlide]);

  useEffect(() => () => {
    cancelAnimationFrame(frameRef.current);
    window.clearTimeout(settleTimerRef.current);
  }, []);

  const firstVisible = projects.length ? activeIndex + 1 : 0;
  const visibleLabel = canLoop && lastVisible < firstVisible
    ? `${String(firstVisible).padStart(2, '0')}-${String(projects.length).padStart(2, '0')}, 01-${String(lastVisible).padStart(2, '0')}`
    : `${String(firstVisible).padStart(2, '0')}-${String(lastVisible).padStart(2, '0')}`;

  return (
    <div className="projects-carousel" role="region" aria-label="Featured systems" aria-roledescription="carousel">
      <div className="projects-carousel__toolbar">
        <div className="projects-carousel__progress" aria-hidden="true">
          <span>{String(firstVisible).padStart(2, '0')}</span>
          <div><i style={{ width: `${progress}%` }} /></div>
          <span>{String(projects.length).padStart(2, '0')}</span>
        </div>
        <div className="projects-carousel__controls">
          <span>{visibleLabel} <small>/ {String(projects.length).padStart(2, '0')} systems</small></span>
          {projects.length > slidesPerView && (
            <>
              <button type="button" aria-label="Previous system" onClick={() => moveBy(-1)}>
                <i className="bi bi-arrow-left" aria-hidden="true" />
              </button>
              <button type="button" aria-label="Next system" onClick={() => moveBy(1)}>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        {canLoop && lastVisible < firstVisible
          ? `Showing systems ${firstVisible} through ${projects.length}, then 1 through ${lastVisible} of ${projects.length}.`
          : `Showing systems ${firstVisible} through ${lastVisible} of ${projects.length}.`}
      </p>

      <div
        className={`projects-grid systems-grid ${resultLayout}`.trim()}
        role="group"
      >
        <div
          ref={trackRef}
          className="projects-track"
          role="group"
          aria-label="System slides"
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
        >
          {slides.map(({ project, index, clone, key }) => (
            <ProjectCard
              key={key}
              project={project}
              number={String(projectNumbers.get(project.slug) ?? 0).padStart(2, '0')}
              featured={index === 0}
              slidePosition={index + 1}
              slideCount={projects.length}
              clone={clone}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
