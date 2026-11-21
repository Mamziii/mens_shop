import { Link } from "react-router-dom";
import { Home, ArrowRight, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* عدد 404 */}
        <div className="relative mb-8">
          <h1 className="text-[140px] sm:text-[180px] font-bold text-primary/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Search size={40} className="text-primary" />
            </div>
          </div>
        </div>

        {/* متن */}
        <h2 className="text-2xl sm:text-3xl font-bold text-text-main mb-3">
          صفحه مورد نظر پیدا نشد
        </h2>
        <p className="text-text-secondary leading-7 mb-8 max-w-md mx-auto">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا آدرس آن اشتباه وارد شده است.
        </p>

        {/* دکمه‌ها */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-sm"
          >
            <Home size={18} />
            بازگشت به صفحه اصلی
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl border border-border bg-card text-text-main font-medium hover:bg-background-light transition-colors"
          >
            <ArrowRight size={18} />
            بازگشت به صفحه قبل
          </button>
        </div>
      </div>
    </div>
  );
}