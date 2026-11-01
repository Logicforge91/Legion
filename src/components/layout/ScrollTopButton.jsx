import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function ScrollTopButton({ visible }) {
  const reducedMotion = useReducedMotion();

  return <button id="scrollTopBtn" className={visible ? 'show' : ''} type="button" aria-label="Scroll to top" aria-hidden={!visible} tabIndex={visible ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}><i className="bi bi-arrow-up" aria-hidden="true" /></button>;
}
