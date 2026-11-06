export function MotionToggle({ paused, onToggle, pauseLabel, resumeLabel, className = '' }) {
  return (
    <button
      className={className}
      type="button"
      aria-pressed={paused}
      onClick={onToggle}
    >
      <i className={`bi ${paused ? 'bi-play-fill' : 'bi-pause-fill'}`} aria-hidden="true" />
      {paused ? resumeLabel : pauseLabel}
    </button>
  );
}
