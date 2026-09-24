import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import DiscountProducts from "./Pages/DiscountProducts/DiscountProducts";
import NewProducts from "./Pages/NewProducts/NewProducts";
// clothes
import Shirts from "./Pages/Clothes/Shirts";
import Hoodies from "./Pages/Clothes/Hoodies";
import Kapshan from "./Pages/Clothes/Kapshan";
import ShalvarJin from "./Pages/Clothes/ShalvarJin";
import ShalvarParchei from "./Pages/Clothes/ShalvarParchei";
import Tshirt from "./Pages/Clothes/Tshirt";
import Coat from "./Pages/Clothes/Coat";
import Shorts from "./Pages/Clothes/Shorts";
// shoes
import DailyShoes from "./Pages/Shoes/DailyShoes";
import OfficialShoes from "./Pages/Shoes/OfficialShoes";
import Boots from "./Pages/Shoes/Boots";
// accessories
import Cap from "./Pages/Accessories/Cap";
import Perfume from "./Pages/Accessories/Perfume";
import Belt from "./Pages/Accessories/Belt";
// user
import UserOrders from "./Pages/User/UserOrders";
import UserInfos from "./Pages/User/UserInfos";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/cart", element: <Cart /> },
  { path: "/discounts", element: <DiscountProducts /> },
  { path: "/new-products", element: <NewProducts /> },
  // details
  { path: "/پیراهن/:id", element: <ProductDetails /> },
  { path: "/هودی و سوییشرت/:id", element: <ProductDetails /> },
  { path: "/کاپشن/:id", element: <ProductDetails /> },
  { path: "/شلوار لی/:id", element: <ProductDetails /> },
  { path: "/شلوار پارچه ای/:id", element: <ProductDetails /> },
  { path: "/تی شرت/:id", element: <ProductDetails /> },
  { path: "/کت تک/:id", element: <ProductDetails /> },
  { path: "/شلوارک/:id", element: <ProductDetails /> },
  { path: "/کفش روزمره/:id", element: <ProductDetails /> },
  { path: "/کفش رسمی/:id", element: <ProductDetails /> },
  { path: "/بوت و نیم بوت/:id", element: <ProductDetails /> },
  { path: "/کلاه/:id", element: <ProductDetails /> },
  { path: "/عطر و ادکلن/:id", element: <ProductDetails /> },
  { path: "/کمربند/:id", element: <ProductDetails /> },
  // clothes
  { path: "/پیراهن", element: <Shirts /> },
  { path: "/هودی و سوییشرت", element: <Hoodies /> },
  { path: "/کاپشن", element: <Kapshan /> },
  { path: "/شلوار لی", element: <ShalvarJin /> },
  { path: "/شلوار پارچه ای", element: <ShalvarParchei /> },
  { path: "/تی شرت", element: <Tshirt /> },
  { path: "/کت تک", element: <Coat /> },
  { path: "/شلوارک", element: <Shorts /> },
  // shoes
  { path: "/کفش روزمره", element: <DailyShoes /> },
  { path: "/کفش رسمی", element: <OfficialShoes /> },
  { path: "/بوت و نیم بوت", element: <Boots /> },
  // accessories
  { path: "/کلاه", element: <Cap /> },
  { path: "/عطر و ادکلن", element: <Perfume /> },
  { path: "/کمربند", element: <Belt /> },
  // user
  { path: "/سفارشات من", element: <UserOrders /> },
  { path: "/داشبورد", element: <UserInfos /> },



];

export default routes;
