import Header from "./shared/header/UI/Header";
import Home from "./pages/home/UI/Home";
import Footer from "./shared/footer/UI/Footer";
import Login from "./pages/login/UI/Login";
import Register from "./pages/register/UI/Register";
import Cart from "./pages/cart/UI/Cart";
import Category from "./pages/category/UI/Category";
import Orders from "./pages/order/UI/Orders.tsx";
import ShowOrder from "./pages/order/components/show_order/UI/ShowOrder.tsx";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import ProductPage from "./pages/product_page/UI/ProductPage";
import Profile from "./pages/profile/UI/Profile.tsx";
import ProtectedRoute from "./shared/protectedRoute/UI/ProtectedRoute.tsx";
import GuestRoute from "./shared/protectedRoute/UI/GuestRoute.tsx";
import ScrollHash from "./pages/cart/components/scroll_item/ScrollHash.tsx";
import { Toaster } from "react-hot-toast";
import CheckoutWrapper from "./shared/checkout/UI/CheckoutWrapper.tsx";

const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const isLoginOrRegister = ["/login", "/register"].includes(location.pathname);
  const isProduct = !!matchPath("/product/:id", location.pathname);

  const isCategory = [
    "/category/all",
    "/category/men",
    "/category/women",
    "/category/shoes",
    "/category/deals",
  ].includes(location.pathname);

  return (
    <>
      <Toaster position="bottom-right" />
      <Header />
      {isLoginOrRegister || isCategory || isProduct ? (
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
          <Route path="/orders" element={<Orders />} />
          <Route path="/order" element={<ShowOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<CheckoutWrapper />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default AppLayout;
