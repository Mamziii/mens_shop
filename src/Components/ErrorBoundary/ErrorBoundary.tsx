import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // اینجا می‌تونی به سرویس لاگ (مثل Sentry) بفرستی
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // اگر fallback سفارشی داده شده باشه، همون رو نشون بده
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // صفحه خطای پیش‌فرض
      return (
        <div className="min-h-screen bg-background-light flex items-center justify-center px-4">
          <div className="max-w-lg w-full text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-error/10 flex items-center justify-center">
              <AlertTriangle size={36} className="text-error" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-text-main mb-3">
              مشکلی پیش آمده است
            </h1>
            <p className="text-text-secondary leading-7 mb-2 max-w-md mx-auto">
              متأسفانه یک خطای غیرمنتظره رخ داده است. لطفاً صفحه را مجدداً بارگذاری کنید
              یا به صفحه اصلی بازگردید.
            </p>

            {/* نمایش جزئیات خطا فقط در حالت توسعه */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-4 mb-6 p-4 rounded-xl bg-error/5 border border-error/20 text-right">
                <p className="text-sm font-mono text-error break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-sm"
              >
                <RefreshCw size={18} />
                تلاش مجدد
              </button>

              <Link
                to="/"
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl border border-border bg-card text-text-main font-medium hover:bg-background-light transition-colors"
              >
                <Home size={18} />
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}