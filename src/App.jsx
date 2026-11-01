import { lazy, memo, Suspense, useEffect, useRef, useState } from 'react';
import TechMarquee from './components/shared/TechMarquee';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ScrollTopButton from './components/layout/ScrollTopButton';
import { useCommandPalette } from './hooks/useCommandPalette';
import { usePageState } from './hooks/usePageState';
import HeroSection from './sections/HeroSection';

const AboutSection = lazy(() => import('./sections/AboutSection'));
const AchievementsSection = lazy(() => import('./sections/AchievementsSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));
const IntegrationsSection = lazy(() => import('./sections/IntegrationsSection'));
const JourneySection = lazy(() => import('./sections/JourneySection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const SkillsSection = lazy(() => import('./sections/SkillsSection'));
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection'));
const CommandPalette = lazy(() => import('./components/overlays/CommandPalette'));

const deferredSections = new Map();
let deferredSectionObserver;

function observeDeferredSection(element, callback) {
  if (!('IntersectionObserver' in window)) {
    callback();
    return () => {};
  }

  if (!deferredSectionObserver) {
    deferredSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const onIntersect = deferredSections.get(entry.target);
        deferredSections.delete(entry.target);
        deferredSectionObserver.unobserve(entry.target);
        onIntersect?.();
      });

      if (!deferredSections.size) {
        deferredSectionObserver.disconnect();
        deferredSectionObserver = undefined;
      }
    }, { rootMargin: '700px 0px' });
  }

  deferredSections.set(element, callback);
  deferredSectionObserver.observe(element);

  return () => {
    deferredSections.delete(element);
    deferredSectionObserver?.unobserve(element);
    if (!deferredSections.size) {
      deferredSectionObserver?.disconnect();
      deferredSectionObserver = undefined;
    }
  };
}

function SectionFallback({ id, section, onRef }) {
  return (
    <section ref={onRef} id={id} className={`section-loading section-loading--${section}`} aria-busy="true" aria-label={`Loading ${section} section`}>
      <div className="site-container">
        <div className="skeleton-block skeleton-eyebrow" />
        <div className="skeleton-block skeleton-title" />
        <div className="skeleton-block skeleton-description" />
        <div className="skeleton-layout" aria-hidden="true">
          <div className="skeleton-block skeleton-card" />
          <div className="skeleton-block skeleton-card" />
          <div className="skeleton-block skeleton-card" />
        </div>
      </div>
    </section>
  );
}

function DeferredSection({ id, section, Component }) {
  const placeholderRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return undefined;
    const placeholder = placeholderRef.current;
    if (!placeholder) {
      setShouldLoad(true);
      return undefined;
    }

    return observeDeferredSection(placeholder, () => setShouldLoad(true));
  }, [shouldLoad]);

  if (!shouldLoad) return <SectionFallback id={id} section={section} onRef={placeholderRef} />;

  return (
    <Suspense fallback={<SectionFallback id={id} section={section} />}>
      <Component />
    </Suspense>
  );
}

const PortfolioContent = memo(function PortfolioContent() {
  return (
    <main id="content" className="relative z-10">
      <HeroSection />
      <TechMarquee />
      <DeferredSection id="about" section="profile" Component={AboutSection} />
      <DeferredSection id="journey" section="journey" Component={JourneySection} />
      <DeferredSection id="skills" section="skills" Component={SkillsSection} />
      <DeferredSection id="integrations" section="integrations" Component={IntegrationsSection} />
      <DeferredSection id="projects" section="projects" Component={ProjectsSection} />
      <DeferredSection id="achievements" section="achievements" Component={AchievementsSection} />
      <DeferredSection id="testimonials" section="testimonials" Component={TestimonialsSection} />
      <DeferredSection id="contact" section="contact" Component={ContactSection} />
    </main>
  );
});

export default function App() {
  const { activeSection, headerScrolled, showScrollTop } = usePageState();
  const { commandPaletteOpen, openCommandPalette, closeCommandPalette } = useCommandPalette();

  return (
    <div className="site-shell min-h-screen antialiased">
      <a className="skip-link" href="#content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="relative z-10">
        <Header activeSection={activeSection} scrolled={headerScrolled} onOpenCommandPalette={openCommandPalette} />
        <PortfolioContent />
        <Footer />
        <ScrollTopButton visible={showScrollTop} />
      </div>
      {commandPaletteOpen && (
        <Suspense fallback={null}>
          <CommandPalette open onClose={closeCommandPalette} />
        </Suspense>
      )}
    </div>
  );
}
