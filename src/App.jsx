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
    <main id="content" className="relative z-10">
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
    <div className="site-shell min-h-screen bg-slate-950 text-slate-50 antialiased">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,247,106,0.14),transparent_26%),radial-gradient(circle_at_top_right,rgba(138,232,255,0.13),transparent_28%),radial-gradient(circle_at_bottom,rgba(96,165,250,0.1),transparent_30%)]"
      />
      <a className="skip-link" href="#content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <AmbientCanvas />
      <div className="site-noise" aria-hidden="true" />
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
