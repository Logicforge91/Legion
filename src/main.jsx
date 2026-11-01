import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
import AppErrorBoundary from './components/feedback/AppErrorBoundary';
import { registerServiceWorker } from './registerServiceWorker';

const chunkRecoveryKey = 'legion-chunk-recovery';
const chunkRecoveryCooldown = 30_000;

function shouldRecoverStaleChunk() {
  try {
    const lastRecovery = Number(window.sessionStorage.getItem(chunkRecoveryKey));
    if (lastRecovery && Date.now() - lastRecovery < chunkRecoveryCooldown) return false;

    window.sessionStorage.setItem(chunkRecoveryKey, String(Date.now()));
    return true;
  } catch {
    return false;
  }
}

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  if (shouldRecoverStaleChunk()) window.location.reload();
});

registerServiceWorker();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
);
