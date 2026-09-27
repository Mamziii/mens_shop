import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, AlertCircle, ChevronDown } from "lucide-react";
import useRegister from "../../Hooks/useRegister";
import type { RegisterFormData } from "../../types";
import { API_URL } from "../../config/api";

export default function Register() {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [visiblePass, setVisiblePass] = useState(false);
  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RegisterFormData>({
    mode: "onChange",
  });

  const passwordValue = watch("password");

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="bg-card border border-border rounded-3xl shadow-xl p-6 md:p-8">
          {/* logo */}
          <div className="text-center mb-6">
            <Link to="/" className="inline-block mb-3">
              <span className="text-3xl font-bold tracking-wide">
                <span className="text-primary">ves</span>
                <span className="text-accent">per</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-text-main">ثبت‌نام</h1>
            <p className="text-sm text-text-secondary mt-1">
              حساب کاربری جدید بسازید
            </p>
          </div>

          {/* register form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-text-main"
                >
                  نام
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="نام"
                  {...register("firstName", {
                    required: "وارد کردن نام اجباری است",
                  })}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-background-light text-text-main
                             placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 transition-all
                             ${errors.firstName ? "border-error focus:ring-error/20" : "border-border focus:ring-primary/20 focus:border-primary"}`}
                />
                {errors.firstName && (
                  <p className="flex items-center gap-1.5 text-sm text-error">
                    <AlertCircle size={14} />
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-text-main"
                >
                  نام خانوادگی
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="نام خانوادگی"
                  {...register("lastName", {
                    required: "وارد کردن نام خانوادگی اجباری است",
                  })}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-background-light text-text-main
                             placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 transition-all
                             ${errors.lastName ? "border-error focus:ring-error/20" : "border-border focus:ring-primary/20 focus:border-primary"}`}
                />
                {errors.lastName && (
                  <p className="flex items-center gap-1.5 text-sm text-error">
                    <AlertCircle size={14} />
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-text-main"
                >
                  نام کاربری
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="off"
                  readOnly={isReadOnly}
                  onFocus={() => setIsReadOnly(false)}
                  placeholder="نام کاربری"
                  {...register("username", {
                    required: "وارد کردن نام کاربری اجباری است",
                    minLength: { value: 3, message: "حداقل ۳ کاراکتر" },
                    maxLength: { value: 15, message: "حداکثر ۱۵ کاراکتر" },
                    validate: async (value) => {
                      const res = await fetch(
                        `${API_URL}/users?username=${value}`,
                      );
                      const data = await res.json();
                      if (data.length > 0)
                        return "این نام کاربری قبلاً گرفته شده";
                      return true;
                    },
                  })}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-background-light text-text-main
                             placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 transition-all
                             ${errors.username ? "border-error focus:ring-error/20" : "border-border focus:ring-primary/20 focus:border-primary"}`}
                />
                {errors.username && (
                  <p className="flex items-center gap-1.5 text-sm text-error">
                    <AlertCircle size={14} />
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-main"
                >
                  ایمیل
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  {...register("email", {
                    required: "وارد کردن ایمیل اجباری است",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "ایمیل معتبر نیست",
                    },
                    validate: async (value) => {
                      const res = await fetch(
                        `${API_URL}/users?email=${value}`,
                      );
                      const data = await res.json();
                      if (data.length > 0) return "این ایمیل قبلاً گرفته شده";
                      return true;
                    },
                  })}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-background-light text-text-main
                             placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 transition-all
                             ${errors.email ? "border-error focus:ring-error/20" : "border-border focus:ring-primary/20 focus:border-primary"}`}
                />
                {errors.email && (
                  <p className="flex items-center gap-1.5 text-sm text-error">
                    <AlertCircle size={14} />
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text-main"
                >
                  رمز عبور
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={visiblePass ? "password" : "text"}
                    autoComplete="new-password"
                    readOnly={isReadOnly}
                    onFocus={() => setIsReadOnly(false)}
                    placeholder="رمز عبور"
                    {...register("password", {
                      required: "رمز عبور اجباری است",
                      minLength: { value: 8, message: "حداقل ۸ کاراکتر" },
                      maxLength: { value: 30, message: "حداکثر ۳۰ کاراکتر" },
                      pattern: {
                        value:
                          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                        message: "حرف بزرگ، کوچک، عدد و کاراکتر خاص نیاز است",
                      },
                    })}
                    className={`w-full px-4 py-2.5 pl-11 rounded-xl border bg-background-light text-text-main
                               placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 transition-all
                               ${errors.password ? "border-error focus:ring-error/20" : "border-border focus:ring-primary/20 focus:border-primary"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setVisiblePass(!visiblePass)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary"
                  >
                    {visiblePass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="flex items-center gap-1.5 text-sm text-error">
                    <AlertCircle size={14} />
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-text-main"
                >
                  تأیید رمز عبور
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  readOnly={isReadOnly}
                  onFocus={() => setIsReadOnly(false)}
                  placeholder="تکرار رمز عبور"
                  {...register("confirmPassword", {
                    required: "تأیید رمز عبور اجباری است",
                    validate: (value) =>
                      value === passwordValue || "رمز عبورها مطابقت ندارند",
                  })}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-background-light text-text-main
                             placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 transition-all
                             ${errors.confirmPassword ? "border-error focus:ring-error/20" : "border-border focus:ring-primary/20 focus:border-primary"}`}
                />
                {errors.confirmPassword && (
                  <p className="flex items-center gap-1.5 text-sm text-error">
                    <AlertCircle size={14} />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            
            <div className="space-y-1">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-text-main"
              >
                جنسیت
              </label>
              <div className="relative">
                <select
                  id="gender"
                  {...register("gender", {
                    required: "انتخاب جنسیت اجباری است",
                  })}
                  className={` w-full px-4 py-2.5 rounded-xl border bg-background-light text-text-main
                           focus:outline-none appearance-none focus:ring-2 transition-all
                           ${errors.gender ? "border-error focus:ring-error/20" : "border-border focus:ring-primary/20 focus:border-primary"}`}
                >
                  <option value="">جنسیت خود را انتخاب کنید</option>
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>

                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </div>

              {errors.gender && (
                <p className="flex items-center gap-1.5 text-sm text-error">
                  <AlertCircle size={14} />
                  {errors.gender.message}
                </p>
              )}
            </div>

            
            <button
              type="submit"
              disabled={!isValid || isPending}
              className={`w-full py-3 rounded-xl font-medium text-white transition-all mt-2
                         ${
                           !isValid || isPending
                             ? "bg-primary/50 cursor-not-allowed"
                             : "bg-primary hover:bg-primary-dark shadow-md hover:shadow-lg"
                         }`}
            >
              {isPending ? "در حال ثبت‌نام..." : "ثبت‌نام"}
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            قبلاً ثبت‌نام کرده‌اید؟
            <Link
              to="/login"
              className="text-primary font-medium hover:text-primary-dark px-1"
            >
              وارد شوید
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
