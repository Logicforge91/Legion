import { useEffect, useRef, useState } from 'react';
import { navigationItems } from '../../config/navigation';

export default function Header({ activeSection, scrolled, onOpenCommandPalette }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeOnOutsidePointer = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsidePointer);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-container nav-shell">
        <a href="#hero" className="logo" aria-label="Go to home">
          <span className="logo-mark" aria-hidden="true">SK</span>
          <span className="logo-text">Suman K S</span>
        </a>

        <div ref={menuRef}>
          <button
            id="navToggle"
            type="button"
            aria-controls="navLinks"
            aria-expanded={open}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav id="siteNav" aria-label="Main navigation">
            <ul id="navLinks" className={open ? 'show' : ''}>
              {navigationItems.map(([id, label]) => {
                const active = activeSection === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={active ? 'active' : ''}
                      aria-current={active ? 'location' : undefined}
                      onClick={closeMenu}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
              <li>
                <a href="#contact" className="nav-cta" onClick={closeMenu}>Build with me</a>
              </li>
              <li>
                <button
                  className="nav-command"
                  type="button"
                  aria-label="Open command palette"
                  onClick={() => {
                    closeMenu();
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
