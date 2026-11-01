@import "tailwindcss";
@import "./icons.css";
@import "../css/home.css";

/* ============================================================
   LEGION PORTFOLIO — Tailwind enabled + custom polish
   Electric Mint palette · Glassmorphic bento · 2025 design
   ============================================================ */

:root {
  --bg:            #080c12;
  --bg-elevated:   #0f1720;
  --panel:         rgba(13, 19, 28, 0.72);
  --panel-strong:  rgba(10, 15, 22, 0.92);
  --card:          rgba(15, 21, 30, 0.78);
  --line:          rgba(166, 177, 194, 0.10);
  --line-strong:   rgba(214, 247, 106, 0.24);
  --text:          #f3f6fb;
  --muted:         #a8b4c6;
  --soft:          #dfe7f6;
  --accent:        #d6f76a;
  --accent-soft:   #8ae8ff;
  --gold:          #f9d88e;
  --danger:        #ff6b6b;
  --shadow:        0 24px 70px rgba(4, 6, 11, 0.55);
  --shadow-soft:   0 14px 38px rgba(4, 6, 11, 0.35);
  --radius-xl:     28px;
  --radius-lg:     20px;
  --radius-md:     14px;
  --font-display:  Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono:     "Cascadia Code", "SFMono-Regular", Consolas, "Liberation Mono", monospace;

  --dur-fast: 0.16s;
  --dur-base: 0.22s;
  --ease:     cubic-bezier(0.22, 1, 0.36, 1);
}

@layer base {
  *, *::before, *::after { box-sizing: border-box; }

  html {
    scroll-behavior: smooth;
    color-scheme: dark;
    background-color: var(--bg);
  }

  body {
    @apply min-h-screen overflow-x-hidden bg-slate-950 text-slate-50 antialiased;
    font-family: var(--font-display);
    background:
      radial-gradient(circle at 12% 12%, rgba(214, 247, 106, 0.07), transparent 30rem),
      radial-gradient(circle at 86% 14%, rgba(138, 232, 255, 0.07), transparent 30rem),
      radial-gradient(circle at 50% 92%, rgba(249, 216, 142, 0.04), transparent 26rem),
      linear-gradient(180deg, #070b10 0%, #0c131c 44%, #080c13 100%);
  }

  #root { @apply min-h-screen; }
  a { @apply transition-colors duration-200; }
  button, a { touch-action: manipulation; }
  img { display: block; max-width: 100%; }
}

::selection {
  background: #d6f76a;
  color: #080c12;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
  z-index: 0;
}

@keyframes float {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50%       { transform: translate3d(0, -18px, 0) scale(1.02); }
}
@keyframes marquee-drift {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes grid-drift {
  to { background-position: 36px 36px; }
}
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes spin-slow {
  to { transform: rotate(360deg); }
}
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(214,247,106,0.22); }
  50%       { box-shadow: 0 0 0 12px rgba(214,247,106,0); }
}

.site-shell {
  position: relative;
  z-index: 1;
  isolation: isolate;
}

.container {
  width: min(100%, 1200px);
  margin-inline: auto;
  padding-inline: clamp(20px, 5vw, 52px);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 clamp(20px, 5vw, 52px);
  height: 64px;
  background: rgba(8, 12, 18, 0.82);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--line);
}

.site-header::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(214,247,106,0.22), transparent);
}

.brand-mark {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.brand-mark .logotype {
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #f3f6fb;
}

.brand-mark .logotype span { color: var(--accent); }

#navLinks {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
}

#navLinks a {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  color: rgba(185, 200, 220, 0.82);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 500;
  transition: color var(--dur-base) var(--ease), background var(--dur-base) var(--ease);
}

#navLinks a:hover {
  color: var(--text);
  background: rgba(255,255,255,0.06);
}

.nav-actions { display: flex; align-items: center; gap: 10px; }
button, a { touch-action: manipulation; }
img { display: block; max-width: 100%; }

@media (max-width: 900px) {
  .site-header { padding-inline: 18px; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
