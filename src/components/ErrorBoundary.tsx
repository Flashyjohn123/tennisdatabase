import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.hash = '';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-[#0a0d14] border border-amber-500/20 rounded-xl p-8 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-5 text-amber-400">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-mono uppercase tracking-wider text-white mb-2">
              {this.props.fallbackTitle || 'Telemetry Feed Interrupted'}
            </h2>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              An unexpected anomaly occurred while rendering this module. You can reload the view or return to the overview terminal.
            </p>

            {this.state.error && (
              <div className="bg-black/50 border border-white/5 rounded-lg p-3 mb-6 text-left overflow-auto max-h-32 text-xs font-mono text-red-400/90">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reload Terminal
              </button>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null, errorInfo: null });
                  window.location.hash = '#overview';
                }}
                className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Home className="w-3.5 h-3.5" />
                Return to Overview
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
