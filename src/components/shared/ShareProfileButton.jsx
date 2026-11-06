import { useEffect, useState } from 'react';

const shareData = {
  title: 'QYVERON TECHNOLOGIES',
  text: 'Engineering Tomorrow, Today. Freelance backend, API, and database development by QYVERON TECHNOLOGIES.',
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

  const label = status === 'copied' ? 'Link copied' : status === 'shared' ? 'Shared' : status === 'error' ? 'Copy failed' : 'Share QYVERON';
  const icon = status === 'copied' || status === 'shared'
    ? 'bi-check2'
    : status === 'error'
      ? 'bi-exclamation-circle'
      : 'bi-share';

  return (
    <>
      <button className="btn btn-share" type="button" onClick={shareProfile}>
        <i className={`bi ${icon}`} aria-hidden="true" />
        {label}
      </button>
      <span className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
        {status === 'copied' ? 'QYVERON website link copied to clipboard.' : ''}
        {status === 'shared' ? 'QYVERON website link shared.' : ''}
        {status === 'error' ? 'Could not share or copy the QYVERON website link.' : ''}
      </span>
    </>
  );
}
