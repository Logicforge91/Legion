import { useEffect, useMemo, useRef, useState } from 'react';

const commands = [
  { label: 'Go to profile', hint: 'About', icon: 'bi-person', href: '#about', keywords: 'profile about experience' },
  { label: 'View career journey', hint: 'Experience', icon: 'bi-signpost-split', href: '#journey', keywords: 'work companies career timeline' },
  { label: 'Explore technology stack', hint: 'Skills', icon: 'bi-layers', href: '#skills', keywords: 'skills stack laravel java php' },
  { label: 'Review integrations', hint: 'Architecture', icon: 'bi-diagram-3', href: '#integrations', keywords: 'api payments queue webhook external' },
  { label: 'Browse featured systems', hint: 'Projects', icon: 'bi-grid-1x2', href: '#projects', keywords: 'projects work systems portfolio' },
  { label: 'Start a conversation', hint: 'Contact', icon: 'bi-chat-dots', href: '#contact', keywords: 'contact hire message role' },
  { label: 'Open résumé', hint: 'PDF', icon: 'bi-file-earmark-person', href: '/assets/resume.pdf', keywords: 'resume cv download' },
  { label: 'Send an email', hint: 'Email', icon: 'bi-envelope', href: 'mailto:sumanks1307@gmail.com', keywords: 'email contact message' },
];

export default function CommandPalette({ open, onClose }) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const filteredCommands = useMemo(() => {
    const value = query.trim().toLowerCase();
    return value ? commands.filter((command) => `${command.label} ${command.hint} ${command.keywords}`.toLowerCase().includes(value)) : commands;
  }, [query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (open && !dialog.open) { dialog.showModal(); document.body.classList.add('dialog-open'); requestAnimationFrame(() => inputRef.current?.focus()); }
    if (!open && dialog.open) dialog.close();
    return () => document.body.classList.remove('dialog-open');
  }, [open]);

  const selectedIndex = Math.min(activeIndex, Math.max(filteredCommands.length - 1, 0));

  const runCommand = (command) => {
    if (!command) return;
    onClose();
    setQuery('');
    if (command.href.startsWith('#')) {
      document.querySelector(command.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', command.href);
    } else if (command.href.startsWith('mailto:')) {
      window.location.href = command.href;
    } else {
      window.open(command.href, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (event) => {
    if (!filteredCommands.length) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((index) => (index + 1) % filteredCommands.length); }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => (index - 1 + filteredCommands.length) % filteredCommands.length); }
    if (event.key === 'Enter') { event.preventDefault(); runCommand(filteredCommands[selectedIndex]); }
  };

  return <dialog ref={dialogRef} className="command-dialog" onClose={onClose} onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}>
    <div className="command-shell" onKeyDown={handleKeyDown}>
      <div className="command-search"><i className="bi bi-search" aria-hidden="true" /><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} placeholder="Search portfolio or run an action…" aria-label="Search commands" /><kbd>ESC</kbd></div>
      <div className="command-results" aria-label="Available commands">
        {filteredCommands.map((command, index) => <button key={command.label} className={index === selectedIndex ? 'active' : ''} type="button" onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onClick={() => runCommand(command)}><i className={`bi ${command.icon}`} aria-hidden="true" /><span>{command.label}</span><small>{command.hint}</small><i className="bi bi-arrow-return-left command-enter" aria-hidden="true" /></button>)}
        {!filteredCommands.length && <div className="command-empty"><i className="bi bi-search" aria-hidden="true" /><p>No matching action found.</p></div>}
      </div>
      <div className="command-footer"><span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span><span><kbd>↵</kbd> Select</span><span><kbd>Esc</kbd> Close</span></div>
    </div>
  </dialog>;
}
