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

    return <main className="error-boundary">
      <div>
        <p className="error-kicker">Portfolio recovery</p>
        <h1>The portfolio could not be displayed.</h1>
        <p>Reload the page to retry. If the problem continues, please get in touch by email.</p>
        <div className="error-actions">
          <button className="btn btn-primary" type="button" onClick={() => window.location.reload()}>Reload page</button>
          <a className="btn btn-ghost" href="mailto:sumanks1307@gmail.com">Email me</a>
        </div>
      </div>
    </main>;
  }
}
