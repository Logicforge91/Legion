import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AppErrorBoundary from './components/AppErrorBoundary';
import './styles.css';
import { registerServiceWorker } from './registerServiceWorker';

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  const recoveryKey = 'legion-chunk-recovery';
  if (window.sessionStorage.getItem(recoveryKey)) return;
  window.sessionStorage.setItem(recoveryKey, '1');
  window.location.reload();
});

window.addEventListener('load', () => {
  window.sessionStorage.removeItem('legion-chunk-recovery');
}, { once: true });

registerServiceWorker();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
);
