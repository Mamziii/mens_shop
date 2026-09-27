import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { API_URL } from "../../config/api";

type SearchItem = {
  id: number;
  title: string;
  route: string;
};

type SearchBoxProps = {
  onClose?: () => void;
  isMobile?: boolean;
};

export default function SearchBox({ onClose, isMobile = false }: SearchBoxProps) {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // close results by click out of box
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSearchedData = async (value: string) => {
    if (!value.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/searchBox`);
      const data: SearchItem[] = await res.json();

      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );

      setResults(filtered);
      setIsOpen(true);
    } catch (error) {
      console.error("خطا در جستجو:", error);
      setResults([]);
    }
  };

  const handleChange = (value: string) => {
    setSearchInput(value);
    getSearchedData(value);
  };

  const handleSelect = () => {
    setSearchInput("");
    setResults([]);
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div ref={wrapperRef} className={`relative ${isMobile ? "w-full" : "w-64 xl:w-80"}`}>
      {/* search input */}
      <div className="relative">
        <input
          type="text"
          placeholder="جستجو در محصولات..."
          value={searchInput}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => searchInput && setIsOpen(true)}
          className={`w-full pl-4 pr-11 text-sm bg-background-light border border-border rounded-full
                      focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                      placeholder:text-text-secondary transition-all
                      ${isMobile ? "py-3.5 rounded-2xl" : "py-2.5"}`}
        />
        <Search
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
        />
      </div>

      {/* results */}
      {isOpen && results.length > 0 && (
        <div
          className={`absolute top-full right-0 left-0 mt-2 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden overflow-y-scroll
                      ${isMobile ? "max-h-72" : "max-h-80"}`}
        >
          <div className="overflow-y-auto max-h-inherit">
            {results.map((item) => (
              <Link
                key={item.id}
                to={item.route}
                onClick={handleSelect}
                className="flex items-center gap-3 px-4 py-3 text-sm text-text-main hover:bg-background-light hover:text-primary transition-colors border-b border-border last:border-b-0"
              >
                <Search size={15} className="text-text-secondary shrink-0" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* when nothing find */}
      {isOpen && searchInput && results.length === 0 && (
        <div className="absolute top-full right-0 left-0 mt-2 bg-card border border-border rounded-2xl shadow-xl z-50 px-4 py-6 text-center text-sm text-text-secondary">
          نتیجه‌ای یافت نشد
        </div>
      )}
    </div>
  );
}