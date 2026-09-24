import { useMemo, useState } from "react";
import { Tag, Filter, X, ChevronLeft } from "lucide-react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useInfiniteDiscountProducts } from "../../Hooks/useInfiniteProducts";
import type { SortType } from "../../types";

const MIN_PRICE = 1_000_000;
const MAX_PRICE = 20_000_000;

export default function DiscountProducts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  } = useInfiniteDiscountProducts();

  const [sort, setSort] = useState<SortType>("default");
  const [selectedPrice, setSelectedPrice] = useState(MAX_PRICE);
  const [showFilters, setShowFilters] = useState(false);

  const products = data?.pages?.flatMap((page) => page) ?? [];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => p.price <= selectedPrice);

    if (sort === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, selectedPrice, sort]);

  if (isError) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <p className="text-error">خطا در دریافت محصولات</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* هدر */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-error/10 flex items-center justify-center shrink-0">
              <Tag size={22} className="text-error" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-main">
                تخفیف‌دارها
              </h1>
              <p className="mt-1 text-sm text-text-secondary">
                {isLoading
                  ? "در حال بارگذاری..."
                  : `${filteredProducts.length} محصول یافت شد`}
              </p>
            </div>
          </div>

          {/* دکمه فیلتر موبایل */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border text-text-main text-sm font-medium"
          >
            <Filter size={18} />
            فیلترها
            {showFilters ? (
              <X size={18} className="text-accent" />
            ) : (
              <ChevronLeft size={18} className="text-accent" />
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* سایدبار فیلتر */}
          <aside
            className={`lg:w-64 shrink-0 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-card border border-border rounded-2xl p-5 space-y-6 sticky top-24">
              <div className="flex items-center gap-2 pb-4 border-b border-border">
                <Filter size={18} className="text-accent" />
                <h3 className="font-semibold text-text-main">فیلترها</h3>
              </div>

              {/* مرتب‌سازی */}
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">
                  مرتب‌سازی
                </label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortType)}
                  className="w-full px-4 py-2.5 rounded-xl bg-background-light border border-border text-text-main text-sm focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="default">پیش‌فرض</option>
                  <option value="asc">قیمت: کم به زیاد</option>
                  <option value="desc">قیمت: زیاد به کم</option>
                </select>
              </div>

              {/* بازه قیمت */}
              <div>
                <label className="block text-sm font-medium text-text-main mb-3">
                  بودجه شما
                </label>
                <div className="text-center mb-3">
                  <span className="text-lg font-semibold text-accent">
                    {selectedPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-text-secondary mr-1">تومان</span>
                </div>
                <input
                  type="range"
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  step={100_000}
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-border accent-accent"
                />
                <div className="flex justify-between mt-2 text-xs text-text-secondary">
                  <span>{MIN_PRICE.toLocaleString()}</span>
                  <span>{MAX_PRICE.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* محصولات */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-3/4 rounded-2xl bg-card animate-pulse"
                  />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {hasNextPage && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      className={`px-8 py-3 rounded-xl font-medium text-white transition-all ${
                        isFetchingNextPage
                          ? "bg-primary/50 cursor-not-allowed"
                          : "bg-primary hover:bg-primary-dark shadow-sm"
                      }`}
                    >
                      {isFetchingNextPage
                        ? "در حال بارگذاری..."
                        : "نمایش بیشتر"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-lg font-medium text-text-main mb-2">
                  محصولی یافت نشد
                </p>
                <p className="text-sm text-text-secondary">
                  فیلترهای خود را تغییر دهید یا دوباره تلاش کنید.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}