/* ============================================================
   LEGION PORTFOLIO — Premium UX refinements
   ============================================================ */

:root {
  --bg: #070b12;
  --bg-elevated: #0d1520;
  --panel: rgba(12, 18, 27, 0.75);
  --card: rgba(15, 22, 31, 0.8);
  --line: rgba(170, 184, 210, 0.1);
  --text: #edf3ff;
  --muted: #b1bfd7;
  --accent: #d6f76a;
  --accent-soft: #8ae8ff;
  --shadow-soft: 0 22px 48px rgba(0, 0, 0, 0.2);
}

.site-container {
  max-width: 1200px;
}

.site-header {
  background: rgba(8, 12, 18, 0.84);
  border-bottom: 1px solid rgba(170, 184, 210, 0.12);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.site-header.is-scrolled {
  background: rgba(11, 16, 24, 0.9);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.16);
}

.logo,
.footer-logo,
.brand-mark {
  transition: transform 180ms ease, opacity 180ms ease;
}

.logo:hover,
.footer-logo:hover,
.brand-mark:hover {
  transform: translateY(-1px);
}

.hero-studio-section {
  position: relative;
}

.hero-studio-section::before {
  content: "";
  position: absolute;
  inset: 2rem 0 auto;
  height: 72%;
  background: radial-gradient(circle at top, rgba(214, 247, 106, 0.12), transparent 56%);
  pointer-events: none;
}

.hero-copy h1 {
  text-shadow: 0 20px 45px rgba(125, 164, 255, 0.08);
}

.hero-title-accent {
  background: linear-gradient(135deg, #edf9b0 0%, #8fe9ff 40%, #b7d4ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-actions .btn,
.cta-row .btn {
  letter-spacing: -0.01em;
}

.btn-primary {
  background: linear-gradient(135deg, #dfffb2 0%, #b4f3ff 100%);
  box-shadow: 0 18px 36px rgba(214, 247, 106, 0.18);
}

.btn-ghost {
  border-color: rgba(167, 183, 214, 0.16);
  background: rgba(255, 255, 255, 0.02);
}

.studio-card,
.profile-card,
.contact-panel,
.stack-card,
.integration-card,
.project-card,
.system-card,
.work-style-card,
.testimonial-card,
.proof-card,
.timeline-item {
  border: 1px solid rgba(170, 184, 210, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.studio-card:hover,
.profile-card:hover,
.contact-panel:hover,
.stack-card:hover,
.integration-card:hover,
.project-card:hover,
.system-card:hover,
.work-style-card:hover,
.testimonial-card:hover,
.proof-card:hover,
.timeline-item:hover {
  border-color: rgba(214, 247, 106, 0.18);
}

.hero-meta-item,
.hero-statusbar span,
.footer-availability,
.contact-panel .panel-kicker,
.section-heading .eyebrow,
.eyebrow {
  letter-spacing: 0.04em;
}

.footer-main {
  border-top: 1px solid rgba(170, 184, 210, 0.1);
}

.footer-logo {
  letter-spacing: -0.06em;
}

.footer-nav a:hover,
#navLinks a:hover {
  color: var(--text);
}

@media (max-width: 860px) {
  .hero-section {
    padding-top: 110px;
  }

  .hero-statusbar {
    gap: 8px;
    font-size: 0.74rem;
  }

  .hero-actions,
  .cta-row {
    width: 100%;
  }

  .hero-actions .btn,
  .cta-row .btn {
    flex: 1 1 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Keep the original aesthetic while making the experience feel more premium */

.hero-section .hero-studio-copy {
  position: relative;
  z-index: 1;
}

.hero-studio-visual {
  position: relative;
  z-index: 1;
}

.studio-card {
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 70px rgba(3, 10, 18, 0.42);
}

.studio-card::after {
  content: "";
  position: absolute;
  inset: auto 14% -20% 14%;
  height: 40%;
  background: radial-gradient(circle, rgba(138, 232, 255, 0.26), transparent 60%);
  filter: blur(20px);
}

#navLinks a.active {
  background: rgba(214, 247, 106, 0.09);
  color: #f5f8ff;
  border: 1px solid rgba(214, 247, 106, 0.12);
}

.contact-panel .contact-links a {
  border-color: rgba(170, 184, 210, 0.12);
}

.contact-panel .contact-links a:hover {
  border-color: rgba(214, 247, 106, 0.2);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
}

.footer-bottom {
  border-top: 1px solid rgba(170, 184, 210, 0.08);
}

.footer-tagline {
  max-width: 420px;
}

.hero-statusbar {
  border-bottom: 1px solid rgba(170, 184, 210, 0.08);
}

.hero-statusbar-time {
  color: var(--accent-soft);
}

.hero-meta-item {
  color: rgba(216, 225, 238, 0.85);
}

.hero-meta-dot {
  background: linear-gradient(135deg, #d6f76a, #8ae8ff);
}

.hero-meta-dot-alt {
  background: linear-gradient(135deg, #8ae8ff, #b2d2ff);
}

@media (max-width: 640px) {
  .site-header {
    padding-inline: 16px;
  }

  .hero-copy h1 {
    font-size: clamp(2.8rem, 12vw, 4.3rem);
  }

  .hero-lede,
  .section-copy p,
  .contact-copy p,
  .profile-card > p,
  .footer-tagline {
    font-size: 0.98rem;
  }
}

/* End premium UX refinements */

message