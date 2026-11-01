import { useActiveSection } from './useActiveSection';
import { useScrollState } from './useScrollState';

export function usePageState() {
  const activeSection = useActiveSection();
  const { headerScrolled, showScrollTop } = useScrollState();

  return { activeSection, headerScrolled, showScrollTop };
}
