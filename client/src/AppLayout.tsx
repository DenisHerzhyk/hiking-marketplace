import Header from "./shared/header/UI/Header";
import Home from "./pages/home/UI/Home";
import Footer from "./shared/footer/UI/Footer";
import Login from "./pages/login/UI/Login";
import Register from "./pages/register/UI/Register";
import Cart from "./pages/cart/UI/Cart";
import Category from "./pages/category/UI/Category";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductPage from "./pages/product_page/UI/ProductPage";

import Profile from "./pages/profile/UI/Profile.tsx";
import ProtectedRoute from "./shared/protectedRoute/UI/ProtectedRoute.tsx";
import GuestRoute from "./shared/protectedRoute/UI/GuestRoute.tsx";
import ScrollHash from "./pages/cart/components/scroll_item/ScrollHash.tsx";

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
        <Route
          path="/product"
          element={
            <ProductPage
              img="/images/tops/1_1.webp"
              category="WOMENS"
              type="shirt"
              title="Women's Canyonite Flannel Shirt"
              price={139}
              availabe_sizes={["S", "M", "L", "XL"]}
              description="Eleven years after its initial introduction, we reintroduce our classic Low Top in the shape of the Low Top Bianco. The Low Top Bianco features perforated side panels, new eye stays with white eyelets and the signature padded heel. A premium classic reinvented, the Low Top Bianco still has the recognizable elongated tongue and upper while standing on our striking Fundament Bicolor outsole."
            />
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:type" element={<Category />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default AppLayout;
