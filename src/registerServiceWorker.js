export function registerServiceWorker() {
  if (import.meta.env.DEV || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.warn('Offline support could not be enabled.', error);
    });
  }, { once: true });
}
