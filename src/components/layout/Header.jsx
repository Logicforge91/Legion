import { lazy, memo, Suspense } from 'react';
import AmbientCanvas from './components/AmbientCanvas';
import TechMarquee from './components/TechMarquee';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ScrollTopButton from './components/layout/ScrollTopButton';
import { useCommandPalette } from './hooks/useCommandPalette';
import { usePageState } from './hooks/usePageState';
import HeroSection from './pages/HeroSection';

const AboutSection = lazy(() => import('./pages/AboutSection'));
const AchievementsSection = lazy(() => import('./pages/AchievementsSection'));
const ContactSection = lazy(() => import('./pages/ContactSection'));
const IntegrationsSection = lazy(() => import('./pages/IntegrationsSection'));
const JourneySection = lazy(() => import('./pages/JourneySection'));
const ProjectsSection = lazy(() => import('./pages/ProjectsSection'));
const SkillsSection = lazy(() => import('./pages/SkillsSection'));
const TestimonialsSection = lazy(() => import('./pages/TestimonialsSection'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));

function SectionFallback() {
  return <div aria-hidden="true" className="section-loading" />;
}

const PortfolioContent = memo(function PortfolioContent() {
  return (
    <main id="content" className="relative z-10 overflow-x-hidden">
      <HeroSection />
      <TechMarquee />
      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <JourneySection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <IntegrationsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <AchievementsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
    </main>
  );
});

export default function App() {
  const { activeSection, headerScrolled, showScrollTop } = usePageState();
  const { commandPaletteOpen, openCommandPalette, closeCommandPalette } = useCommandPalette();

  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <AmbientCanvas />
      <div className="site-noise" aria-hidden="true" />
      <Header activeSection={activeSection} scrolled={headerScrolled} onOpenCommandPalette={openCommandPalette} />
      <PortfolioContent />
      <Footer />
      <ScrollTopButton visible={showScrollTop} />
      {commandPaletteOpen && (
        <Suspense fallback={null}>
          <CommandPalette open onClose={closeCommandPalette} />
        </Suspense>
      )}
    </>
  );
}
