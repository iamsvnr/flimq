import { Component } from 'react';
import { IoWarning, IoRefresh } from 'react-icons/io5';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <IoWarning className="mx-auto mb-4 text-white/15" size={64} />
            <h2 className="text-xl font-bold font-heading text-white mb-2">Something went wrong</h2>
            <p className="text-sm text-white/40 mb-6">An unexpected error occurred. Please try refreshing the page.</p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-md hover:bg-white/85 transition-all active:scale-[0.98]"
            >
              <IoRefresh size={16} />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
