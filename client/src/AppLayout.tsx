import Header from "./shared/header/UI/Header";
import Home from "./pages/home/UI/Home";
import Footer from "./shared/footer/UI/Footer";
import Login from "./pages/login/UI/Login";
import Register from "./pages/register/UI/Register";
import Cart from "./pages/cart/UI/Cart";
import Category from "./pages/category/UI/Category";
import Orders from "./pages/order/UI/Orders.tsx";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductPage from "./pages/product_page/UI/ProductPage";
import Profile from "./pages/profile/UI/Profile.tsx";
import ProtectedRoute from "./shared/protectedRoute/UI/ProtectedRoute.tsx";
import GuestRoute from "./shared/protectedRoute/UI/GuestRoute.tsx";
import ScrollHash from "./pages/cart/components/scroll_item/ScrollHash.tsx";
import { Toaster } from "react-hot-toast";

const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const isLoginOrRegister =
    location.pathname === "/login" || location.pathname === "/register";

  const isCategory =
    location.pathname === "/category/men" ||
    "/category/women" ||
    "/category/boots" ||
    "/category/deals";

  return (
    <>
      <Toaster position="bottom-right" />
      <Header />
      {isLoginOrRegister || isCategory ? (
        <div className="mt-[0px]" />
      ) : (
        !isHome && <div className="mt-[250px]" />
      )}
      {}
      <ScrollHash />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:type" element={<Category />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default AppLayout;
