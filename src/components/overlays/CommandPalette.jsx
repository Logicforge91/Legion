import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const commands = [
  { label: 'About Us', hint: 'Company', group: 'Explore', detail: 'Learn about QYVERON, its brand values, and vision.', icon: 'bi-buildings', href: '#about', keywords: 'company identity industry values vision' },
  { label: 'Explore technologies', hint: 'Technology stack', group: 'Explore', detail: 'Browse the technology index and engineering capabilities.', icon: 'bi-layers', href: '#technologies', keywords: 'skills stack toolkit languages frameworks database laravel java php' },
  { label: 'Explore backend services', hint: 'Services', group: 'Explore', detail: 'See the backend engineering services available to product teams.', icon: 'bi-hdd-network', href: '#services', keywords: 'services API database integrations Java backend' },
  { label: 'Explore industries', hint: 'Industries', group: 'Explore', detail: 'See representative domains and workflows QYVERON can build for.', icon: 'bi-buildings', href: '#industries', keywords: 'healthcare fintech education commerce industry domains' },
  { label: 'Our process', hint: 'Engagement', group: 'Explore', detail: 'Review the usual path from discovery and scope through delivery and handover.', icon: 'bi-signpost-2', href: '#process', keywords: 'process discovery scope build validate handover' },
  { label: 'Why choose QYVERON', hint: 'Principles', group: 'Explore', detail: 'See the studio principles behind its engineering approach.', icon: 'bi-patch-check', href: '#why-us', keywords: 'quality trust innovation differentiators strengths' },
  { label: 'Frequently asked questions', hint: 'FAQ', group: 'Explore', detail: 'Find answers about services, project starts, and handover.', icon: 'bi-question-circle', href: '#faq', keywords: 'faq questions answers project' },
  { label: 'Review integrations', hint: 'Architecture', group: 'Explore', detail: 'See how APIs and external services fit together.', icon: 'bi-diagram-3', href: '#integrations', keywords: 'api payments queue webhook external' },
  { label: 'Browse featured systems', hint: 'Projects', group: 'Explore', detail: 'Open project case studies and backend systems.', icon: 'bi-grid-1x2', href: '#projects', keywords: 'projects work systems portfolio' },
  { label: 'Read technical articles', hint: 'Field notes', group: 'Explore', detail: 'Browse backend tutorials on APIs, data, security, and reliability.', icon: 'bi-journal-code', href: '#articles', keywords: 'articles tutorials coding knowledge engineering notes backend' },
  { label: 'Ask QYVERON', hint: 'Assistant', group: 'Explore', detail: 'Find answers about company services, project examples, and technical topics.', icon: 'bi-chat-square-text', href: '#assistant', keywords: 'assistant ask question company services projects' },
  { label: 'Explore case studies', hint: 'Projects', group: 'Explore', detail: 'Browse representative healthcare, fintech, and Java workflow examples.', icon: 'bi-activity', href: '#impact', keywords: 'case studies examples healthcare fintech workflow' },
  { label: 'Start a project', hint: 'Contact', group: 'Connect', detail: 'Send a project brief to QYVERON TECHNOLOGIES.', icon: 'bi-chat-dots', href: '#contact', keywords: 'contact project enquiry message' },
];

const filters = ['All', 'Explore', 'Connect', 'Actions'];

const getCommandId = (command) => `command-${command.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

function editDistance(left, right) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let row = 1; row <= left.length; row += 1) {
    let diagonal = previous[0];
    previous[0] = row;
    for (let column = 1; column <= right.length; column += 1) {
      const above = previous[column];
      previous[column] = Math.min(
        previous[column] + 1,
        previous[column - 1] + 1,
        diagonal + (left[row - 1] === right[column - 1] ? 0 : 1),
      );
      diagonal = above;
    }
  }
  return previous[right.length];
}

function scoreCommand(command, query) {
  const fields = [command.label, command.hint, command.keywords];
  const normalizedFields = fields.map((field) => field.toLowerCase());
  const words = normalizedFields.flatMap((field) => field.split(/[^a-z0-9+#.]+/).filter(Boolean));
  let score = 0;

  for (const term of query.split(/\s+/).filter(Boolean)) {
    const exactField = normalizedFields.findIndex((field) => field === term);
    const prefixField = normalizedFields.findIndex((field) => field.startsWith(term));
    const containsField = normalizedFields.findIndex((field) => field.includes(term));

    if (exactField !== -1) score += exactField === 0 ? 12 : 9;
    else if (prefixField !== -1) score += prefixField === 0 ? 8 : 6;
    else if (containsField !== -1) score += containsField === 0 ? 5 : 3;
    else if (words.some((word) => term.length > 2 && editDistance(word, term) <= (term.length > 5 ? 2 : 1))) score += 1;
    else return 0;
  }

  return score;
}

export default function CommandPalette({ open, onClose }) {
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const filteredCommands = useMemo(() => {
    const rawValue = query.trim().toLowerCase();
    const actionMode = rawValue.startsWith('>');
    const value = rawValue.replace(/^>\s*/, '');
    const source = commands.filter((command) => (
      (activeFilter === 'All' || command.group === activeFilter)
      && (!actionMode || command.group === 'Actions')
    ));
    if (!value) return source;

    return source
      .map((command, index) => ({ command, index, score: scoreCommand(command, value) }))
      .filter(({ score }) => score > 0)
      .sort((left, right) => right.score - left.score || left.index - right.index)
      .map(({ command }) => command);
  }, [activeFilter, query]);

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
    if (command.href === '#assistant') {
      window.setTimeout(() => window.dispatchEvent(new Event('portfolio:assistant-open')), 0);
    } else if (command.href.startsWith('#')) {
      document.querySelector(command.href)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      window.history.replaceState(null, '', command.href);
    } else if (command.href.startsWith('mailto:')) {
      window.location.href = command.href;
    } else {
      window.open(command.href, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (event) => {
    if (event.altKey && /^[1-4]$/.test(event.key)) {
      event.preventDefault();
      const filter = filters[Number(event.key) - 1];
      setActiveFilter(filter);
      setActiveIndex(0);
      inputRef.current?.focus();
      return;
    }
    if (!filteredCommands.length) return;
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const nextIndex = event.key === 'Home' ? 0 : filteredCommands.length - 1;
      setActiveIndex(nextIndex);
      document.getElementById(getCommandId(filteredCommands[nextIndex]))?.scrollIntoView({ block: 'nearest' });
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (selectedIndex + delta + filteredCommands.length) % filteredCommands.length;

      setActiveIndex(nextIndex);
      document.getElementById(getCommandId(filteredCommands[nextIndex]))?.scrollIntoView({ block: 'nearest' });
      inputRef.current?.focus({ preventScroll: true });
      return;
    }
    if (event.key === 'Enter') { event.preventDefault(); runCommand(filteredCommands[selectedIndex]); }
  };

  return <dialog ref={dialogRef} className="command-dialog" aria-label="Portfolio commands" onClose={onClose} onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}>
    <div className="command-shell" onKeyDown={handleKeyDown}>
      <div className="command-identity"><span className="command-identity__mark">Q</span><span><strong>QYVERON index</strong><small>Navigate company services and work</small></span><span className="command-identity__live"><i /> LIVE</span></div>
      <div className="command-search"><i className={`bi ${query.trim().startsWith('>') ? 'bi-terminal' : 'bi-search'}`} aria-hidden="true" /><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} placeholder="Search destinations, or type > for actionsâ€¦" aria-label="Search commands" aria-controls="commandResults" aria-activedescendant={filteredCommands[selectedIndex] ? getCommandId(filteredCommands[selectedIndex]) : undefined} /><kbd>ESC</kbd></div>
      <div className="command-filters" role="group" aria-label="Filter command categories">
        {filters.map((filter) => <button key={filter} type="button" className={activeFilter === filter ? 'is-active' : ''} aria-pressed={activeFilter === filter} onClick={() => { setActiveFilter(filter); setActiveIndex(0); }}>{filter}</button>)}
      </div>
      <div className="command-section-label"><span>{query.trim() ? 'MATCHING DESTINATIONS' : 'QUICK DESTINATIONS'}</span><span>{String(filteredCommands.length).padStart(2, '0')} / {String(commands.length).padStart(2, '0')}</span></div>
      <div id="commandResults" className="command-results" role="listbox" aria-label="Available commands" aria-live="polite">
        {filteredCommands.map((command, index) => <button id={getCommandId(command)} key={command.label} className={index === selectedIndex ? 'active' : ''} type="button" tabIndex={-1} role="option" aria-selected={index === selectedIndex} onMouseDown={(event) => event.preventDefault()} onMouseEnter={() => setActiveIndex(index)} onClick={() => runCommand(command)}><span className="command-result__index">{String(index + 1).padStart(2, '0')}</span><i className={`bi ${command.icon} command-result__icon`} aria-hidden="true" /><span className="command-result__copy"><strong>{command.label}</strong><small>{command.hint}</small></span><i className="bi bi-arrow-up-right command-enter" aria-hidden="true" /></button>)}
        {!filteredCommands.length && <div className="command-empty"><i className="bi bi-search" aria-hidden="true" /><p>No matching action found.</p></div>}
      </div>
      {filteredCommands[selectedIndex] && <aside className="command-preview" aria-live="polite"><span className="command-preview__label">SELECTED / {filteredCommands[selectedIndex].group.toUpperCase()}</span><p>{filteredCommands[selectedIndex].detail}</p><span className="command-preview__target">{filteredCommands[selectedIndex].href}</span></aside>}
      <div className="command-footer"><span><kbd>â†‘</kbd><kbd>â†“</kbd> Navigate</span><span><kbd>â†µ</kbd> Select</span><span><kbd>Alt</kbd>+<kbd>1â€“4</kbd> Filter</span><span><kbd>Esc</kbd> Close</span></div>
    </div>
  </dialog>;
}
