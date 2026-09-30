import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useModelsCarousel } from "../../Hooks/useModelsCarousel";

export default function ModelsCarousel() {
  const { data: items = [], isLoading } = useModelsCarousel();
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollByAmount = (direction: "next" | "prev") => {
    const el = containerRef.current;
    if (!el) return;

    const amount = 176;
    el.scrollBy({
      left: direction === "next" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const next = () => scrollByAmount("next");
  const prev = () => scrollByAmount("prev");

  const startAutoPlay = () => {
    if (items.length <= 6) return;
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      next();
    }, 2000);
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
  }, [items.length]);

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-hidden px-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-40 h-52 rounded-2xl bg-background-light animate-pulse shrink-0"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* prev */}
      <button
        type="button"
        onClick={prev}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md
                   flex items-center justify-center hover:bg-background-light transition-all hidden sm:flex"
      >
        <ChevronRight size={20} />
      </button>

      {/* next */}
      <button
        type="button"
        onClick={next}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md
                   flex items-center justify-center hover:bg-background-light transition-all hidden sm:flex"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto px-4 sm:px-12 scroll-smooth
                   touch-pan-x"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        onTouchStart={stopAutoPlay}
        onTouchEnd={startAutoPlay}
      >
        {items.map((item) => (
          <Link key={item.id} to={item.route} className="group shrink-0 w-40">
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-background-light border border-border">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-0 right-0 left-0 p-3">
                <h3 className="text-white text-sm font-medium text-center">
                  {item.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}