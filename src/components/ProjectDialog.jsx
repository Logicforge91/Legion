import { useEffect, useRef } from 'react';

export default function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!project || !dialog) return undefined;

    dialog.showModal();
    document.body.classList.add('dialog-open');

    const handleClose = () => onClose();
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

  return <dialog ref={dialogRef} className="project-dialog" aria-labelledby="projectDialogTitle" onClick={closeOnBackdrop}>
    <div className="project-dialog-shell">
      <div className="project-dialog-topline">
        <span className="project-dialog-category"><i className={`bi ${project.icon}`} aria-hidden="true" />{project.category}</span>
        <button className="project-dialog-close" type="button" aria-label="Close project details" onClick={() => dialogRef.current.close()}><i className="bi bi-x-lg" aria-hidden="true" /></button>
      </div>
      <p className="panel-kicker">Selected system</p>
      <h2 id="projectDialogTitle">{project.title}</h2>
      <p className="project-dialog-summary">{project.text}</p>
      <div className="project-dialog-grid">
        <div><span className="project-dialog-label">Delivery highlights</span><ul>{project.points.map((point) => <li key={point}><i className="bi bi-check2" aria-hidden="true" />{point}</li>)}</ul></div>
        <div><span className="project-dialog-label">Technology stack</span><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
      </div>
      <div className="project-dialog-footer">
        <p>Interested in similar backend work?</p>
        <a href="#contact" className="btn btn-primary" onClick={() => dialogRef.current.close()}>Discuss a project <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
      </div>
    </div>
  </dialog>;
}
