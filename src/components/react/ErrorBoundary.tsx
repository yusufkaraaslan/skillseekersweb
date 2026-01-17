import * as Sentry from '@sentry/astro';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component that catches React errors and reports them to Sentry
 * Wraps critical components to prevent entire app crashes
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });

    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI or default
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-400 mb-2">
              Something went wrong
            </h2>
            <p className="text-dark-text-secondary mb-6">
              We've been notified and will fix this issue soon.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors font-medium"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
