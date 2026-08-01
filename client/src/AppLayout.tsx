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
import DeliveryInfo from "./pages/delivery_info/UI/DeliveryInfo.tsx";
import Profile from "./pages/profile/UI/Profile.tsx";
import ProtectedRoute from "./shared/protectedRoute/UI/ProtectedRoute.tsx";
import GuestRoute from "./shared/protectedRoute/UI/GuestRoute.tsx";
import ScrollHash from "./pages/cart/components/scroll_item/ScrollHash.tsx";
import TrailDetails from "./pages/Trails/components/Trail.tsx";
import { Toaster } from "react-hot-toast";
import CheckoutWrapper from "./shared/checkout/UI/CheckoutWrapper.tsx";
import { CheckoutLayout } from "./shared/checkout/UI/CheckoutLayout.tsx";
import Trails from "./pages/Trails/UI/Trails.tsx";
import { ErrorFallback } from "./shared/error/ErrorFallback.tsx";
import { ErrorBoundary } from "react-error-boundary";
import NotFound from "./shared/error/notFound.tsx";

const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const isCategory = !!matchPath("/category/:type", location.pathname);

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#44403c",
            border: "1px solid #d6d3d1",
            borderRadius: "10px",
            padding: "14px 20px",
            fontSize: "14px",
            fontFamily: "Poppins, sans-serif",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          },
          success: {
            iconTheme: { primary: "#78716c", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#dc2626", secondary: "#fff" },
          },
        }}
      />

      <Header />
      {isHome || isCategory ? (
        <div className="mt-[0px]" />
      ) : (
        <div className="mt-[70px] tablet:mt-[85px]" />
      )}
      {}
      <ScrollHash />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:type" element={<Category />} />
          <Route path="/trails" element={<Trails />} />
          <Route path="/trails/:id" element={<TrailDetails />} />
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
      </ErrorBoundary>
      <Footer />
    </>
  );
};

export default AppLayout;
