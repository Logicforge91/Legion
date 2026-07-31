import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';
const subscribers = new Set();
let mediaQuery;

const getMediaQuery = () => {
  if (!mediaQuery) mediaQuery = window.matchMedia(QUERY);
  return mediaQuery;
};

const notifySubscribers = () => subscribers.forEach((notify) => notify());

const subscribe = (notify) => {
  subscribers.add(notify);
  if (subscribers.size === 1) getMediaQuery().addEventListener('change', notifySubscribers);

  return () => {
    subscribers.delete(notify);
    if (!subscribers.size) getMediaQuery().removeEventListener('change', notifySubscribers);
  };
};

const getSnapshot = () => getMediaQuery().matches;

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
