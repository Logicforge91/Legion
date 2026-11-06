export default function Footer() {
  return (
    <footer>
      <div className="site-container footer-outro">
        <span className="footer-outro__index" aria-hidden="true">END / 01</span>
        <div className="footer-outro__copy">
          <span className="footer-outro__eyebrow">
            <i aria-hidden="true" />~/contact <b>$</b> new-backend-brief
          </span>
          <h2>Bring the workflow. Let’s map the backend.</h2>
        </div>
        <a className="footer-outro__action" href="#contact">
          Open contact channel <i className="bi bi-arrow-up-right" aria-hidden="true" />
        </a>
      </div>

      <div className="site-container footer-main">
        <div className="footer-intro">
          <a href="#hero" className="footer-logo" aria-label="Back to the top">
            Suman K S<span>.</span>
          </a>
          <p className="footer-tagline">
            Senior backend engineering for product teams that need dependable APIs,
            thoughtful data design, and resilient operational systems.
          </p>
          <a className="footer-availability" href="#contact">
            <i aria-hidden="true" />Open to backend opportunities
          </a>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <p>Explore</p>
          <a href="#about">The Engineer</a>
          <a href="#journey">Career archive</a>
          <a href="#skills">Toolkit</a>
          <a href="#projects">Systems</a>
        </nav>

        <div className="footer-nav">
          <p>Connect</p>
          <a href="mailto:sumanks1307@gmail.com">Email</a>
          <a href="https://github.com/Logicforge91" target="_blank" rel="noreferrer">
            GitHub <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </a>
          <a href="https://www.linkedin.com/in/suman-k-s-a55868184/" target="_blank" rel="noreferrer">
            LinkedIn <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="site-container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Suman K S</p>
        <p>Built in Bengaluru, India</p>
      </div>
    </footer>
  );
}
