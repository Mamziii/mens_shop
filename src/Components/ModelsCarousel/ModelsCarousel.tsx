import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useModelsCarousel } from "../../Hooks/useModelsCarousel";

export default function ModelsCarousel() {
  const { data: items = [], isLoading } = useModelsCarousel();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const visibleCount = 6;

  // next slide
  const next = () => {
    setCurrentIndex((prev) => {
      if (prev >= items.length - visibleCount) {
        return 0;
      }
      return prev + 1;
    });
  };

  // pre slide
  const prev = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return Math.max(0, items.length - visibleCount);
      }
      return prev - 1;
    });
  };

  // smooth scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: -currentIndex * 176,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  //auto play every 2s
  useEffect(() => {
    if (items.length <= visibleCount) return;

    intervalRef.current = setInterval(() => {
      next();
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [items.length]);

  // stop auto play when hover carousel
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (items.length <= visibleCount) return;

    intervalRef.current = setInterval(() => {
      next();
    }, 2000);
  };

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* prev button */}
      <button
        onClick={prev}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md
                   flex items-center justify-center hover:bg-background-light transition-all"
      >
        <ChevronRight size={20} />
      </button>

      {/* next button */}
      <button
        onClick={next}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md
                   flex items-center justify-center hover:bg-background-light transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      {/* list items */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-hidden px-12 scroll-smooth"
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
