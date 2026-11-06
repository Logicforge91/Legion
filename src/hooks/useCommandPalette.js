import { useCallback, useEffect, useState } from 'react';

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const openCommandPalette = useCallback(() => setOpen(true), []);
  const closeCommandPalette = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleShortcut = (event) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') return;

      const target = event.target;
      const isEditing = target instanceof HTMLElement && (
        target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
      );
      if (isEditing && !open) return;

      event.preventDefault();
      setOpen((current) => !current);
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && open) {
        event.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleShortcut);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleShortcut);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return { commandPaletteOpen: open, openCommandPalette, closeCommandPalette };
}
