import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "../../types";

type SimilarProductsProps = {
  products: Product[];
};

export default function SimilarProducts({ products }: SimilarProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const visibleCount = 4;
  const maxIndex = Math.max(0, products.length - visibleCount);

  const next = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) return 0;
      return prev + 1;
    });
  };

  const prev = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return maxIndex;
      return prev - 1;
    });
  };

  // smooth scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: -currentIndex * 280,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  // auto play
  useEffect(() => {
    if (products.length <= visibleCount) return;

    intervalRef.current = setInterval(() => {
      next();
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [products.length]);

  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    if (products.length <= visibleCount) return;
    intervalRef.current = setInterval(() => {
      next();
    }, 4000);
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-text-main">محصولات مشابه</h2>
      </div>

      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* prev btn */}
        {products.length > visibleCount && (
          <button
            onClick={prev}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md
                       flex items-center justify-center hover:bg-background-light transition-all"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* next btn */}
        {products.length > visibleCount && (
          <button
            onClick={next}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md
                       flex items-center justify-center hover:bg-background-light transition-all"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* products list */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-hidden overflow-y-hidden px-12 scroll-smooth"
        >
          {products.map((product) => (
            <div key={product.id} className="shrink-0 w-64">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}