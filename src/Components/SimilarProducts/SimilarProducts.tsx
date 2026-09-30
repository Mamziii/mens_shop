import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "../../types";

type SimilarProductsProps = {
  products: Product[];
};

export default function SimilarProducts({ products }: SimilarProductsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollByAmount = (direction: "next" | "prev") => {
    const el = containerRef.current;
    if (!el) return;

    // موبایل کارت کوچک‌تر، دسکتاپ بزرگ‌تر
    const amount = window.innerWidth < 640 ? 160 : 280;
    el.scrollBy({
      left: direction === "next" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const next = () => scrollByAmount("next");
  const prev = () => scrollByAmount("prev");

  const startAutoPlay = () => {
    if (products.length <= 2) return;
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      next();
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [products.length]);

  if (!products || products.length === 0) return null;

  return (
    <section className="mt-12 sm:mt-20">
      <div className="flex items-center justify-between mb-5 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-text-main">
          محصولات مشابه
        </h2>
      </div>

      <div
        className="relative"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        {/* prev - فقط دسکتاپ */}
        {products.length > 2 && (
          <button
            type="button"
            onClick={prev}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md
                       items-center justify-center hover:bg-background-light transition-all hidden sm:flex"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* next - فقط دسکتاپ */}
        {products.length > 2 && (
          <button
            type="button"
            onClick={next}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md
                       items-center justify-center hover:bg-background-light transition-all hidden sm:flex"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* لیست — موبایل: انگشت / دسکتاپ: دکمه */}
        <div
          ref={containerRef}
          className="flex gap-3 sm:gap-5 overflow-x-auto px-1 sm:px-12 scroll-smooth touch-pan-x"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onTouchStart={stopAutoPlay}
          onTouchEnd={startAutoPlay}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="shrink-0 w-36 sm:w-56 md:w-64"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}