import { useMemo, useState } from "react";
import { useFetchAllProducts } from "../../Hooks/useFetchProducts";
import type { SortType } from "../../types";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { FiFilter } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";
import { AiFillCaretLeft } from "react-icons/ai";


export default function DailyShoes() {
     const { data: allProducts = [], isLoading } = useFetchAllProducts();
  const [sort, setSort] = useState<SortType>("default");
  const minAvailablePrice = 1_000_000;
  const maxAvailablePrice = 20_000_000;
  const [selectedPrice, setSelectedPrice] = useState(maxAvailablePrice);
  const [showFilters, setShowFilters] = useState(false);

  const products = allProducts.filter((p) => p.category === "کفش روزمره");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    filtered = filtered.filter((p) => p.price <= selectedPrice);

    if (sort === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, selectedPrice, sort]);

  return (
      <div className="bg-background-light min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-main">
                 کفش روز مره مردانه
                </h1>
                <p className="mt-2 text-sm text-text-secondary">
                  {filteredProducts.length} محصول یافت شد
                </p>
              </div>
    
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border text-text-main text-sm font-medium"
              >
                <FiFilter size={18} />
                فیلترها
                {showFilters ? (
                  <IoMdCloseCircle size={20} className="text-accent" />
                ) : (
                  <AiFillCaretLeft size={18} className="text-accent" />
                )}
              </button>
            </div>
    
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters */}
              <aside
                className={`
                  lg:w-64 shrink-0
                  ${showFilters ? "block" : "hidden lg:block"}
                `}
              >
                <div className="bg-card border border-border rounded-2xl p-5 space-y-6 sticky top-22">
                  <div className="flex items-center gap-2 pb-4 border-b border-border">
                    <FiFilter size={18} className="text-accent" />
                    <h3 className="font-semibold text-text-main">
                      فیلترها
                    </h3>
                  </div>
    
                  {/* Sort */}
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
    
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-3">
                      بودجه شما
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-lg font-semibold text-accent">
                        {selectedPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-text-secondary mr-1">
                        تومان
                      </span>
                    </div>
                    <input
                      type="range"
                      min={minAvailablePrice}
                      max={maxAvailablePrice}
                      step={100_000}
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(Number(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-border accent-accent"
                    />
                    <div className="flex justify-between mt-2 text-xs text-text-secondary">
                      <span>{minAvailablePrice.toLocaleString()}</span>
                      <span>{maxAvailablePrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </aside>
    
              {/* Products */}
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
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
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
  )
}
