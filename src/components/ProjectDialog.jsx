import { useEffect, useRef, useState } from 'react';

export default function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeDestinationRef = useRef(undefined);
  const [shareStatus, setShareStatus] = useState('idle');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!project || !dialog) return undefined;

    dialog.showModal();
    document.body.classList.add('dialog-open');

    const handleClose = () => onClose(closeDestinationRef.current);
    dialog.addEventListener('close', handleClose);
    return () => {
      dialog.removeEventListener('close', handleClose);
      document.body.classList.remove('dialog-open');
      if (dialog.open) dialog.close();
    };
  }, [project, onClose]);

  if (!project) return null;

  const closeOnBackdrop = (event) => {
    if (event.target === dialogRef.current) dialogRef.current.close();
  };

  const shareCaseStudy = async () => {
    const shareData = { title: `${project.title} | Suman K S`, text: project.text, url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareStatus('shared');
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus('copied');
    } catch {
      setShareStatus('error');
    }
  };

  const goToContact = (event) => {
    event.preventDefault();
    closeDestinationRef.current = 'contact';
    dialogRef.current.close();
  };

  return <dialog ref={dialogRef} className="project-dialog" aria-labelledby="projectDialogTitle" onClick={closeOnBackdrop}>
    <div className="project-dialog-shell">
      <div className="project-dialog-topline">
        <span className="project-dialog-category"><i className={`bi ${project.icon}`} aria-hidden="true" />{project.category}</span>
        <button className="project-dialog-close" type="button" aria-label="Close project details" onClick={() => dialogRef.current.close()}><i className="bi bi-x-lg" aria-hidden="true" /></button>
      </div>
      <p className="panel-kicker">Selected system</p>
      <h2 id="projectDialogTitle">{project.title}</h2>
      <p className="project-dialog-summary">{project.text}</p>
      <div className="project-dialog-scenario"><div><span className="project-dialog-label">Representative runtime flow</span><code>{project.scenario.request}</code></div><i className="bi bi-arrow-right" aria-hidden="true" /><div><span>{project.scenario.event}</span><strong>{project.scenario.result}</strong></div></div>
      <div className="project-dialog-grid">
        <div><span className="project-dialog-label">The constraint</span><p>{project.challenge}</p></div>
        <div><span className="project-dialog-label">Engineering decisions</span><ul>{project.decisions.map((decision) => <li key={decision}><i className="bi bi-check2" aria-hidden="true" />{decision}</li>)}</ul></div>
        <div><span className="project-dialog-label">Resulting system shape</span><p>{project.outcome}</p></div>
        <div><span className="project-dialog-label">Technology stack</span><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
      </div>
      <div className="project-dialog-footer">
        <p>Interested in similar backend work?</p>
        <button type="button" className="btn btn-ghost" onClick={shareCaseStudy} aria-live="polite"><i className={`bi ${shareStatus === 'idle' ? 'bi-link-45deg' : shareStatus === 'error' ? 'bi-exclamation-circle' : 'bi-check2'}`} aria-hidden="true" />{shareStatus === 'copied' ? 'Link copied' : shareStatus === 'shared' ? 'Shared' : shareStatus === 'error' ? 'Copy unavailable' : 'Share case study'}</button>
        <a href="#contact" className="btn btn-primary" onClick={goToContact}>Discuss a project <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
      </div>
    </div>
  </dialog>;
}
