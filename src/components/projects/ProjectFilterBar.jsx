import { Reveal } from '../shared/ui';

export default function ProjectFilterBar({ count, filters, activeFilter, onSelect }) {
  return (
    <Reveal className="system-toolbar">
      <div className="system-directory">
        <span className="system-directory-label">System directory</span>
        <strong>{String(count).padStart(2, '0')}</strong>
      </div>
      <div className="system-filters" role="group" aria-label="Filter systems by category">
        {filters.map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={`filter-button${activeFilter === value ? ' is-active' : ''}`}
            aria-pressed={activeFilter === value}
            onClick={() => onSelect(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </Reveal>
  );
}
