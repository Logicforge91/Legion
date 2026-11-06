import { useEffect, useRef, useState } from 'react';
import { navigationItems } from '../../config/navigation';

export default function Header({ activeSection, scrolled, onOpenCommandPalette }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const closeOnOutsidePointer = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape' && open && !document.querySelector('dialog[open]')) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', closeOnOutsidePointer);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-container nav-shell">
        <a href="#hero" className="logo" aria-label="Go to home">
          <span className="logo-mark" aria-hidden="true">Q</span>
          <span className="logo-text">QYVERON TECHNOLOGIES</span>
        </a>

        <div ref={menuRef}>
          <button
            ref={toggleRef}
            id="navToggle"
            type="button"
            aria-controls="navLinks"
            aria-expanded={open}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((current) => !current)}
          >
            <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true" />
            <span className="nav-toggle-label">Menu</span>
          </button>

          <nav id="siteNav" aria-label="Main navigation">
            <ul id="navLinks" className={open ? 'show' : ''}>
              {navigationItems.map(([id, label]) => {
                const active = activeSection === id;
                return (
                  <li className="nav-section-link" key={id}>
                    <a
                      href={`#${id}`}
                      className={`${active ? 'active' : ''}${id === 'contact' ? ' nav-cta' : ''}`.trim()}
                      aria-current={active ? 'location' : undefined}
                      onClick={closeMenu}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
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
