import { Component } from 'react';

export default class AppErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, details) {
    console.error('Portfolio render failed', error, details);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return <main className="grid min-h-screen place-items-center bg-ink-900 px-6 text-center text-stone-50">
      <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <p className="font-mono text-sm text-aqua-300">SYSTEM_RECOVERY</p>
        <h1 className="mt-3 text-3xl font-bold">The portfolio could not be displayed.</h1>
        <p className="mt-4 text-stone-400">Reload the page to retry. If the problem continues, please get in touch by email.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button className="rounded-full bg-mint-300 px-5 py-3 font-bold text-ink-950" type="button" onClick={() => window.location.reload()}>Reload page</button>
          <a className="rounded-full border border-white/15 px-5 py-3 font-bold" href="mailto:sumanks1307@gmail.com">Email me</a>
        </div>
      </div>
    </main>;
  }
}
