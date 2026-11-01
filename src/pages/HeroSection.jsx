import { useEffect, useRef, useState } from 'react';
import { navigationItems } from '../../config/navigation';

export default function Header({ activeSection, scrolled, onOpenCommandPalette }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);
    document.addEventListener('keydown', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
      document.removeEventListener('keydown', closeMenu);
    };
  }, []);

  const collapsed = scrolled;

  return (
    <header className={`site-header ${collapsed ? 'is-scrolled is-collapsed' : ''} border-b border-white/10 bg-slate-950/70 shadow-[0_10px_30px_rgba(2,6,23,0.3)] backdrop-blur-xl`}>
      <div className="site-container nav-shell flex items-center justify-between gap-4">
        <a href="#hero" className="logo inline-flex items-center gap-3 text-slate-50 hover:text-lime-300" aria-label="Go to home">
          <span className="logo-mark inline-flex h-8 w-8 items-center justify-center rounded-full border border-lime-300/40 bg-lime-300/10 text-[0.7rem] font-black text-lime-300" aria-hidden="true">SK</span>
          <span className="logo-text text-sm font-semibold tracking-[0.18em] text-slate-200 uppercase">Suman K S</span>
        </a>

        <div ref={menuRef} className="relative">
          <button
            id="navToggle"
            type="button"
            aria-controls="navLinks"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={(event) => {
              event.stopPropagation();
              setOpen((value) => !value);
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-lime-300/50 hover:bg-lime-300/10 md:hidden"
          >
            <span aria-hidden="true" className="sr-only">Open menu</span>
            <span aria-hidden="true" className="flex h-4 w-4 flex-col justify-between">
              <span className="block h-px w-full rounded-full bg-current" />
              <span className="block h-px w-full rounded-full bg-current" />
              <span className="block h-px w-full rounded-full bg-current" />
            </span>
          </button>

          <nav id="siteNav" aria-label="Main navigation" className="block">
            <ul id="navLinks" className={`${open ? 'show' : ''} md:flex`}>
              {navigationItems.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={activeSection === id ? 'active text-slate-50 bg-white/8' : 'text-slate-300 hover:text-slate-50 hover:bg-white/5'}
                    aria-current={activeSection === id ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="nav-cta inline-flex items-center rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-2 text-sm font-medium text-lime-200 transition hover:border-lime-300/60 hover:bg-lime-300/20" onClick={() => setOpen(false)}>
                  Build with me
                </a>
              </li>
              <li>
                <button
                  className="nav-command inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-300/50 hover:bg-sky-400/10"
                  type="button"
                  aria-label="Open command palette"
                  onClick={() => {
                    setOpen(false);
                    onOpenCommandPalette();
                  }}
                >
                  <i className="bi bi-search" aria-hidden="true" />
                  Search
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
