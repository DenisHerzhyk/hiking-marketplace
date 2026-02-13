import Header from "./shared/header/UI/Header";
import Home from "./pages/home/UI/Home";
import Footer from "./shared/footer/UI/Footer";
import Login from "./pages/login/UI/Login";
import Register from "./pages/register/UI/Register";
import Cart from "./pages/cart/UI/Cart";
import Category from "./pages/category/UI/Category";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/product_page/UI/ProductPage";
import "./styles/main.scss";
import { useEffect, useState } from "react";
import Profile from "./pages/profile/UI/Profile.tsx";
import ProtectedRoute from "./shared/protectedRoute/UI/ProtectedRoute.tsx";
import axios from "axios";

function App() {
  const [email, setEmail] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const checkAuth = async () => {
    const response = await axios
      .get("http://localhost:4996/api/user/profile", {
        withCredentials: true,
      })
      .then((res) => {
        response.status = 200 ? setIsLoggedIn(true) : setIsLoggedIn(false);
      })
      .catch((err) => {
        setError(err);
        alert(error);
        setIsLoggedIn(false);
      });
  };

  useEffect(() => {
    if (email) {
      checkAuth();
    }
  }, [email]);

  return (
    <>
      <BrowserRouter>
        <Header email={isLoggedIn && email} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setEmail={setEmail} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/product"
            element={
              <ProductPage
                img="src/assets/images/products/2.png"
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
          <Route path="/category" element={<Category />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
