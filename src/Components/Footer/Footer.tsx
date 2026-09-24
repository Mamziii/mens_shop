// components/Footer.tsx
import { FaInstagram, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import useNewLetters from "../../Hooks/useNewLetters";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const { mutate, isPending } = useNewLetters();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    mutate(email, {
      onSuccess: () => {
        toast.success("ایمیل شما با موفقیت ثبت شد. ممنون از عضویتتون! 🎉");
        setEmail("");
      },
      onError: (error) => {
        if (error.message === "not-authenticated") {
          toast.error("برای عضویت در خبرنامه باید وارد حساب کاربری خود شوید.");
        } else if (error.message === "duplicate") {
          toast.error("این ایمیل قبلاً در خبرنامه ثبت شده است.");
        } else {
          toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
        }
      },
    });
  };

  return (
    <footer className="bg-primary text-white border-t border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Newsletter Section */}
        <div className="mb-12 pb-10 border-b border-border-dark">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-accent">
              عضویت در خبرنامه
            </h3>
            <p className="text-sm text-gray-300 mb-6">
              از آخرین اخبار، تخفیف‌ها و محصولات جدید ما باخبر شوید.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید"
                required
                disabled={isPending}
                className="flex-1 px-4 py-3 rounded-lg bg-primary-dark border border-border-dark text-white placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors text-sm disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-3 bg-accent hover:bg-accent-light text-primary font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <FaPaperPlane size={14} />
                {isPending ? "در حال ثبت..." : "عضویت"}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-primary font-bold text-xl">V</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">Vesper</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
              تجربه‌ای متفاوت از کیفیت و زیبایی. ما با عشق و دقت، بهترین‌ها را برای شما فراهم می‌کنیم.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary-dark hover:bg-accent transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary-dark hover:bg-accent transition-colors flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary-dark hover:bg-accent transition-colors flex items-center justify-center"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-accent">دسترسی سریع</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  صفحه اصلی
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  درباره ما
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  محصولات
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  وبلاگ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  تماس با ما
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-accent">خدمات مشتریان</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  سوالات متداول
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  راهنمای خرید
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  شرایط بازگشت کالا
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  حریم خصوصی
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  قوانین و مقررات
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-accent">تماس با ما</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt size={18} className="text-accent mt-0.5 shrink-0" />
                <span className="text-gray-300 leading-relaxed">
                  تهران، خیابان ولیعصر، پلاک ۱۲۳
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone size={16} className="text-accent shrink-0" />
                <a href="tel:+982112345678" className="text-gray-300 hover:text-accent transition-colors">
                  ۰۲۱-۱۲۳۴۵۶۷۸
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope size={16} className="text-accent shrink-0" />
                <a href="mailto:info@vesper.ir" className="text-gray-300 hover:text-accent transition-colors">
                  info@vesper.ir
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            © {currentYear} Vesper. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-accent transition-colors">
              حریم خصوصی
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              شرایط استفاده
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;