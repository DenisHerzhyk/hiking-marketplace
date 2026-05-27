import Header from "./shared/header/UI/Header";
import Home from "./pages/home/UI/Home";
import Footer from "./shared/footer/UI/Footer";
import Login from "./pages/login/UI/Login";
import Register from "./pages/register/UI/Register";
import Cart from "./pages/cart/UI/Cart";
import Category from "./pages/category/UI/Category";
import Orders from "./pages/order/UI/Orders.tsx";
import ShowOrder from "./pages/order/components/show_order/UI/ShowOrder.tsx";
import {
  Routes,
  Route,
  useLocation,
  matchPath,
  Outlet,
} from "react-router-dom";
import ProductPage from "./pages/product_page/UI/ProductPage";
import DeliveryInfo from "./pages/delivery_info/UI/DeliveryInfo.tsx";
import Profile from "./pages/profile/UI/Profile.tsx";
import ProtectedRoute from "./shared/protectedRoute/UI/ProtectedRoute.tsx";
import GuestRoute from "./shared/protectedRoute/UI/GuestRoute.tsx";
import ScrollHash from "./pages/cart/components/scroll_item/ScrollHash.tsx";
import { Toaster } from "react-hot-toast";
import CheckoutWrapper from "./shared/checkout/UI/CheckoutWrapper.tsx";
import { CheckoutProvider } from "./shared/checkout/context/CheckoutContext.tsx";
import { CheckoutSteps } from "./shared/checkout_steps/CheckoutSteps.tsx";
import { CheckoutLayout } from "./shared/checkout/UI/CheckoutLayout.tsx";

const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const isLoginOrRegister = ["/login", "/register"].includes(location.pathname);
  const isProduct = !!matchPath("/product/:id", location.pathname);

  return (
    <>
      <Toaster position="bottom-right" />
      <Header />
      {isLoginOrRegister || isProduct ? (
        <div className="mt-[0px]" />
      ) : (
        !isHome && <div className="mt-[100px] tablet:mt-[200px]" />
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
          <Route element={<CheckoutLayout />}>
            <Route path="/deliveryInfo" element={<DeliveryInfo />} />
            <Route path="/checkout" element={<CheckoutWrapper />} />
            <Route path="/order" element={<ShowOrder />} />
          </Route>

          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default AppLayout;
