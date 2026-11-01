import { useEffect, useState } from 'react';

const shareData = {
  title: 'Suman K S — Backend Engineer',
  text: 'Backend developer portfolio focused on Laravel, Java, APIs, integrations, and reliable systems.',
  url: 'https://legion91.netlify.app/',
};

export default function ShareProfileButton() {
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    if (status === 'idle') return undefined;
    const timer = window.setTimeout(() => setStatus('idle'), 2400);
    return () => window.clearTimeout(timer);
  }, [status]);

  const shareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setStatus('shared');
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }

    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(shareData.url);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  };

  const label = status === 'copied' ? 'Link copied' : status === 'shared' ? 'Shared' : status === 'error' ? 'Copy failed' : 'Share profile';
  return <button className="btn btn-share" type="button" onClick={shareProfile} aria-live="polite"><i className={`bi ${status === 'copied' || status === 'shared' ? 'bi-check2' : status === 'error' ? 'bi-exclamation-circle' : 'bi-share'}`} aria-hidden="true" />{label}</button>;
}
