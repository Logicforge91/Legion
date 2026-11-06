import { useCallback, useState } from 'react';
import { useMotionVisibility } from './useMotionVisibility';
import { useReducedMotion } from './useReducedMotion';

export function useLoopMotion(ref) {
  const reducedMotion = useReducedMotion();
  const motionVisible = useMotionVisibility(ref);
  const [paused, setPaused] = useState(false);
  const togglePaused = useCallback(() => setPaused((current) => !current), []);

  return {
    reducedMotion,
    motionVisible,
    paused,
    togglePaused,
    isPaused: paused || reducedMotion || !motionVisible,
  };
}
