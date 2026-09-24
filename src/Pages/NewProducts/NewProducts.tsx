import { useMemo, useState, useEffect } from "react";
import { Sparkles, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useFetchAllProducts } from "../../Hooks/useFetchProducts";
import type { SortType } from "../../types";

const MIN_PRICE = 1_000_000;
const MAX_PRICE = 20_000_000;
const TARGET_DATE = new Date("02/01/2026");
const ITEMS_PER_PAGE = 5;

export default function NewProducts() {
  const { data: allProducts = [], isLoading, isError } = useFetchAllProducts();

  const [sort, setSort] = useState<SortType>("default");
  const [selectedPrice, setSelectedPrice] = useState(MAX_PRICE);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const newProducts = useMemo(() => {
    return allProducts.filter((item) => new Date(item.date) >= TARGET_DATE);
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    let filtered = newProducts.filter((p) => p.price <= selectedPrice);

    if (sort === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [newProducts, selectedPrice, sort]);

  // وقتی فیلتر عوض شد، برگرد صفحه ۱
  useEffect(() => {
    setCurrentPage(1);
  }, [sort, selectedPrice]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ساخت دکمه‌های شماره صفحه
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

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
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles size={22} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-main">
                محصولات جدید
              </h1>
              <p className="mt-1 text-sm text-text-secondary">
                {isLoading
                  ? "در حال بارگذاری..."
                  : `${filteredProducts.length} محصول یافت شد`}
              </p>
            </div>
          </div>

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
          {/* فیلترها */}
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

          {/* محصولات + pagination */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-3/4 rounded-2xl bg-card animate-pulse"
                  />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-xl border border-border flex items-center justify-center
                                 text-text-main hover:bg-background-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>

                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span
                          key={`dots-${index}`}
                          className="w-10 h-10 flex items-center justify-center text-text-secondary"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => goToPage(page as number)}
                          className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-primary text-white"
                              : "border border-border text-text-main hover:bg-background-light"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-xl border border-border flex items-center justify-center
                                 text-text-main hover:bg-background-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={18} />
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