import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';
const subscribers = new Set();
let mediaQuery;

const getMediaQuery = () => {
  if (mediaQuery === undefined) {
    mediaQuery = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(QUERY)
      : null;
  }
  return mediaQuery;
};

const notifySubscribers = () => subscribers.forEach((notify) => notify());

const subscribe = (notify) => {
  const query = getMediaQuery();
  if (!query) return () => {};

  subscribers.add(notify);
  if (subscribers.size === 1) {
    if (typeof query.addEventListener === 'function') query.addEventListener('change', notifySubscribers);
    else query.addListener?.(notifySubscribers);
  }

  return () => {
    subscribers.delete(notify);
    if (!subscribers.size) {
      if (typeof query.removeEventListener === 'function') query.removeEventListener('change', notifySubscribers);
      else query.removeListener?.(notifySubscribers);
    }
  };
};

const getSnapshot = () => getMediaQuery()?.matches ?? false;

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
