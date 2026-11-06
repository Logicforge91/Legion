export function registerServiceWorker() {
  if (import.meta.env.DEV || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      if (!registration.waiting) return;
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }).catch((error) => console.warn('Offline support could not be enabled.', error));
  }, { once: true });
}
