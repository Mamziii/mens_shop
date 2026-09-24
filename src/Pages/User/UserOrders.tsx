import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Package,
  Calendar,
  MapPin,
  Phone,
  ShoppingBag,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "../../Context/useAuth";
import type { Order } from "../../types";

export default function UserOrders() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:4000/orders?userID=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("خطا در گرفتن سفارشات", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, token, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background-light pb-16">
      <div className="container mx-auto px-4 max-w-4xl py-10">
        {/* هدر */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
            <Package size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-main">
              سفارش‌های من
            </h1>
            <p className="text-sm text-text-secondary mt-0.5">
              {user.firstName} {user.lastName}
            </p>
          </div>
        </div>

        {/* محتوا */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-2xl bg-card border border-border animate-pulse"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-card border border-border rounded-3xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background-light flex items-center justify-center">
              <ShoppingBag size={28} className="text-text-secondary" />
            </div>
            <h3 className="text-lg font-medium text-text-main mb-2">
              هنوز سفارشی ثبت نکرده‌اید
            </h3>
            <p className="text-sm text-text-secondary mb-6">
              محصولات مورد علاقه‌تان را به سبد اضافه کنید و سفارش دهید
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
            >
              شروع خرید
              <ChevronLeft size={18} />
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-text-secondary mb-6">
              تعداد سفارش‌ها:{" "}
              <span className="font-medium text-text-main">
                {orders.length}
              </span>
            </p>

            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  {/* هدر کارت سفارش */}
                  <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-background-light border-b border-border">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Calendar size={15} className="text-primary" />
                      <span>
                        {new Date(order.date).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                    <div className="font-bold text-primary">
                      {order.allPrice.toLocaleString()} تومان
                    </div>
                  </div>

                  {/* اقلام */}
                  <div className="p-5">
                    <p className="text-sm font-medium text-text-main mb-3">
                      اقلام سفارش
                    </p>
                    <ul className="space-y-3">
                      {order.items.map((item, index) => (
                        <li
                          key={`${order.id}-${item.productID}-${index}`}
                          className="flex items-center gap-3"
                        >
                          <img
                            src={item.mainImage}
                            alt={item.title}
                            className="w-14 h-16 object-cover rounded-lg bg-background-light shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-text-main line-clamp-1">
                              {item.title}
                            </p>
                            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-text-secondary">
                              <span>{item.quantity} عدد</span>
                              <span>سایز: {item.size}</span>
                              <span className="flex items-center gap-1">
                                رنگ:
                                <span
                                  className="w-3 h-3 rounded-full border border-border inline-block"
                                  style={{ backgroundColor: item.color }}
                                />
                              </span>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-text-main shrink-0">
                            {(item.price * item.quantity).toLocaleString()}{" "}
                            تومان
                          </p>
                        </li>
                      ))}
                    </ul>

                    {/* آدرس و تلفن */}
                    <div className="mt-5 pt-4 border-t border-border space-y-2 text-sm">
                      <div className="flex items-start gap-2 text-text-secondary">
                        <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                        <span>{order.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-secondary">
                        <Phone size={15} className="text-primary shrink-0" />
                        <span>{order.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}