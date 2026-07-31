import { useEffect, useRef, useState } from 'react';
import { navigationItems } from '../../config/navigation';

export default function Header({ activeSection, scrolled, onOpenCommandPalette }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (event) => {
      if (event.key === 'Escape' || !menuRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('click', closeMenu);
    document.addEventListener('keydown', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
      document.removeEventListener('keydown', closeMenu);
    };
  }, []);

  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
    <div className="site-container nav-shell">
      <a href="#hero" className="logo" aria-label="Go to home"><span className="logo-mark" aria-hidden="true">SK</span><span className="logo-text">Suman K S</span></a>
      <div ref={menuRef}>
        <button id="navToggle" type="button" aria-controls="navLinks" aria-expanded={open} aria-label="Toggle navigation" onClick={(event) => { event.stopPropagation(); setOpen((value) => !value); }}><span /><span /><span /></button>
        <nav id="siteNav" aria-label="Main navigation">
          <ul id="navLinks" className={open ? 'show' : ''}>
            {navigationItems.map(([id, label]) => <li key={id}><a href={`#${id}`} className={activeSection === id ? 'active' : ''} aria-current={activeSection === id ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a></li>)}
            <li><a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>Build with me</a></li>
            <li><button className="nav-command" type="button" aria-label="Open command palette" onClick={() => { setOpen(false); onOpenCommandPalette(); }}><i className="bi bi-search" aria-hidden="true" /><kbd>Ctrl K</kbd></button></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>;
}
