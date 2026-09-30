import {  useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useModelsCarousel } from "../../Hooks/useModelsCarousel";

export default function ModelsCarousel() {
  const { data: items = [], isLoading } = useModelsCarousel();
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // برای درگ با موس
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const scrollByAmount = (direction: "next" | "prev") => {
    const el = containerRef.current;
    if (!el) return;

    // در RTL اسکرول معکوس است؛ با علامت منفی هماهنگ می‌شود
    const amount = 176; // عرض تقریبی هر آیتم + gap
    el.scrollBy({
      left: direction === "next" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const next = () => scrollByAmount("next");
  const prev = () => scrollByAmount("prev");

  // autoplay
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

  // ---- درگ با موس ----
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;

    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
    stopAutoPlay();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = containerRef.current;
    if (!el) return;

    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = x - startX.current;
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    const el = containerRef.current;
    if (el) {
      el.style.cursor = "grab";
      el.style.userSelect = "";
    }
    startAutoPlay();
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      const el = containerRef.current;
      if (el) {
        el.style.cursor = "grab";
        el.style.userSelect = "";
      }
    }
    startAutoPlay();
  };

  // لمس موبایل: با overflow-x-auto خودش کار می‌کند
  const handleTouchStart = () => stopAutoPlay();
  const handleTouchEnd = () => startAutoPlay();

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
    <div className="relative">
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
        className="flex gap-4 overflow-x-auto px-4 sm:px-12 scroll-smooth cursor-grab
                   scrollbar-hide touch-pan-x"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.route}
            className="group shrink-0 w-40"
            draggable={false}
            onClick={(e) => {
              // اگر درگ کرده بود، لینک باز نشود
              if (isDragging.current) e.preventDefault();
            }}
          >
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-background-light border border-border pointer-events-none sm:pointer-events-auto">
              <img
                src={item.image}
                alt={item.title}
                draggable={false}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none"
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