import AmbientCanvas from './components/AmbientCanvas';
import TechMarquee from './components/TechMarquee';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ScrollTopButton from './components/layout/ScrollTopButton';
import { usePageState } from './hooks/usePageState';
import AboutSection from './pages/AboutSection';
import AchievementsSection from './pages/AchievementsSection';
import ContactSection from './pages/ContactSection';
import HeroSection from './pages/HeroSection';
import JourneySection from './pages/JourneySection';
import ProjectsSection from './pages/ProjectsSection';
import SkillsSection from './pages/SkillsSection';
import TestimonialsSection from './pages/TestimonialsSection';

export default function App() {
  const { activeSection, headerScrolled, scrollProgress, showScrollTop } = usePageState();

  return <>
    <a className="skip-link" href="#content">Skip to content</a>
    <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />
    <AmbientCanvas />
    <div className="site-noise" aria-hidden="true" />
    <Header activeSection={activeSection} scrolled={headerScrolled} />
    <main id="content">
      <HeroSection />
      <TechMarquee />
      <AboutSection />
      <JourneySection />
      <SkillsSection />
      <ProjectsSection />
      <AchievementsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
    <Footer />
    <ScrollTopButton visible={showScrollTop} />
  </>;
}
