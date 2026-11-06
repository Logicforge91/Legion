import { Component } from 'react';

export default class AppErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, details) {
    console.error('Portfolio render failed', error, details);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="error-boundary">
        <div>
          <p className="error-kicker">QYVERON recovery</p>
          <h1>The QYVERON site could not be displayed.</h1>
          <p>Reload the page to retry. If the problem continues, please get in touch by email.</p>
          <div className="error-actions">
            <button className="btn btn-primary" type="button" onClick={() => window.location.reload()}>Reload page</button>
            <button className="btn btn-ghost" type="button" onClick={this.reset}>Try again</button>
            <a className="btn btn-ghost" href="/#contact">Contact QYVERON</a>
          </div>
        </div>
      </main>
    );
  }
}
