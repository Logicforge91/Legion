import { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { observedSectionIds } from './config/navigation';
import TechMarquee from './components/shared/TechMarquee';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import PrintPortfolio from './components/layout/PrintPortfolio';
import ScrollTopButton from './components/layout/ScrollTopButton';
import { useCommandPalette } from './hooks/useCommandPalette';
import { usePageState } from './hooks/usePageState';
import HeroSection from './sections/HeroSection';
import './styles/PortfolioAssistant.css';

const AboutSection = lazy(() => import('./sections/AboutSection'));
const AchievementsSection = lazy(() => import('./sections/AchievementsSection'));
const ArticlesSection = lazy(() => import('./sections/ArticlesSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));
const EducationSection = lazy(() => import('./sections/EducationSection'));
const IntegrationsSection = lazy(() => import('./sections/IntegrationsSection'));
const JourneySection = lazy(() => import('./sections/JourneySection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const SkillsSection = lazy(() => import('./sections/SkillsSection'));
const ServicesSection = lazy(() => import('./sections/ServicesSection'));
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection'));
const CommandPalette = lazy(() => import('./components/overlays/CommandPalette'));
const PortfolioAssistant = lazy(() => import('./components/overlays/PortfolioAssistant'));

const deferredSections = new Map();
let deferredSectionObserver;
const DEFERRED_SECTION_OPTIONS = { rootMargin: '700px 0px' };

function observeDeferredSection(element, callback) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
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
    }, DEFERRED_SECTION_OPTIONS);
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
  const compactSections = ['education', 'services', 'skills', 'integrations', 'contact'].includes(id);
  return (
    <section ref={onRef} id={id} className={`section-loading section-loading--${section}${compactSections ? ' section-loading--compact' : ''}`} aria-busy="true" aria-label={`Loading ${section} section`}>
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

    const loadForHash = () => {
      const targetIndex = observedSectionIds.indexOf(window.location.hash.slice(1));
      const currentIndex = observedSectionIds.indexOf(id);
      if (targetIndex >= 0 && currentIndex <= targetIndex) setShouldLoad(true);
    };

    const targetIndex = observedSectionIds.indexOf(window.location.hash.slice(1));
    const currentIndex = observedSectionIds.indexOf(id);
    if (targetIndex >= 0 && currentIndex <= targetIndex) {
      setShouldLoad(true);
      return undefined;
    }

    window.addEventListener('hashchange', loadForHash);

    const placeholder = placeholderRef.current;
    if (!placeholder) {
      setShouldLoad(true);
      return () => window.removeEventListener('hashchange', loadForHash);
    }

    const stopObserving = observeDeferredSection(placeholder, () => setShouldLoad(true));
    return () => {
      window.removeEventListener('hashchange', loadForHash);
      stopObserving();
    };
  }, [id, shouldLoad]);

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
      <DeferredSection id="education" section="education" Component={EducationSection} />
      <DeferredSection id="journey" section="journey" Component={JourneySection} />
      <DeferredSection id="skills" section="skills" Component={SkillsSection} />
      <DeferredSection id="services" section="services" Component={ServicesSection} />
      <DeferredSection id="integrations" section="integrations" Component={IntegrationsSection} />
      <DeferredSection id="projects" section="projects" Component={ProjectsSection} />
      <DeferredSection id="articles" section="articles" Component={ArticlesSection} />
      <DeferredSection id="achievements" section="achievements" Component={AchievementsSection} />
      <DeferredSection id="impact" section="impact" Component={TestimonialsSection} />
      <DeferredSection id="contact" section="contact" Component={ContactSection} />
    </main>
  );
});

export default function App() {
  const { activeSection, headerScrolled, showScrollTop } = usePageState();
  const { commandPaletteOpen, openCommandPalette, closeCommandPalette } = useCommandPalette();
  const [assistantOpen, setAssistantOpen] = useState(false);
  const assistantLauncherRef = useRef(null);
  const closeAssistant = useCallback(() => {
    setAssistantOpen(false);
    window.requestAnimationFrame(() => assistantLauncherRef.current?.focus());
  }, []);

  useEffect(() => {
    const openAssistant = () => setAssistantOpen(true);
    window.addEventListener('portfolio:assistant-open', openAssistant);
    return () => window.removeEventListener('portfolio:assistant-open', openAssistant);
  }, []);

  return (
    <>
    <div className="site-shell min-h-screen antialiased">
      <a className="skip-link" href="#content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="relative z-10">
        <Header activeSection={activeSection} scrolled={headerScrolled} onOpenCommandPalette={openCommandPalette} />
        <PortfolioContent />
        <Footer />
        <ScrollTopButton visible={showScrollTop} />
      </div>
      <button
        ref={assistantLauncherRef}
        className="assistant-launcher"
        type="button"
        aria-label={assistantOpen ? 'Close assistant' : 'Ask about my work'}
        aria-haspopup="dialog"
        aria-expanded={assistantOpen}
        title={assistantOpen ? 'Close assistant' : 'Ask about my work'}
        onClick={() => setAssistantOpen((current) => !current)}
      >
        <i className={`bi ${assistantOpen ? 'bi-x-lg' : 'bi-stars'}`} aria-hidden="true" />
      </button>
      {assistantOpen && (
        <Suspense fallback={null}>
          <PortfolioAssistant open onClose={closeAssistant} />
        </Suspense>
      )}
      {commandPaletteOpen && (
        <Suspense fallback={null}>
          <CommandPalette open onClose={closeCommandPalette} />
        </Suspense>
      )}
    </div>
    <PrintPortfolio />
    </>
  );
}
