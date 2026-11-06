import { useCallback, useEffect, useState } from 'react';

function isInstalled() {
  const standalone = window.matchMedia?.('(display-mode: standalone)').matches ?? false;
  return standalone || window.navigator.standalone === true;
}

export function usePwaInstall() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(() => typeof window !== 'undefined' && isInstalled());

  useEffect(() => {
    const handleBeforeInstall = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const handleInstalled = () => {
      setInstallPrompt(null);
      setInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    if (!installPrompt) return false;
    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      setInstallPrompt(null);
      if (outcome === 'accepted') setInstalled(true);
      return outcome === 'accepted';
    } catch {
      setInstallPrompt(null);
      return false;
    }
  }, [installPrompt]);

  return { canInstall: Boolean(installPrompt) && !installed, installed, install };
}
