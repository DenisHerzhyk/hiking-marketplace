import React, { useContext, useEffect, useState } from "react";
import "../../../styles/main.scss";
import CartItem from "../components/cart_item/UI/CartItem.tsx";
import WishlistItem from "../components/saved_item/UI/SavedItem.tsx";
import axios from "axios";
import CartItemInterface from "../components/cart_item/interface/CartItemInterface.ts";
import WishlistItemInterface from "../components/saved_item/interface/SavedItemInterface.tsx";
import { AuthContext } from "../../login/context/authContext.tsx";

const imgPath =
  "https://res.cloudinary.com/dlrft9pjb/image/upload/v1774980169/hiking_tops-4.jpg";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);
  const [wishListItems, setWishListItems] = useState<WishlistItemInterface[]>(
    [],
  );
  const ctxt = useContext(AuthContext);
  if (!ctxt) throw new Error("AuthProvider missing");
  const { authLogin } = ctxt;

  useEffect(() => {
    axios
      .get("http://localhost:4996/api/cart", { withCredentials: true })
      .then((res) => {
        setCartItems(res.data.data);
        console.log("cart: ", res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get("http://localhost:4996/api/wishlist", { withCredentials: true })
      .then((res) => {
        setWishListItems(res.data.data);
        console.log("wishlist: ", res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="Cart px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)] mt-[200px]">
        <section className="upper-shopping w-full">
          <h1 className="border-b border-[var(--normal-gray)] leading-none font-semibold text-[22px] mobile:text-[28px] laptop:text-[32px] pb-[15px]">
            Shopping Cart{" "}
          </h1>
        </section>
        <section className="content flex flex-col mt-[40px] tablet:flex-row gap-[40px] w-full tablet:w-auto justify-normal tablet:justify-between">
          <div className="w-full flex flex-col gap-[50px]">
            {authLogin && cartItems.length > 0 ? (
              <div className="cart-items flex flex-col gap-[50px] w-full">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    cartId={item.cartId}
                    productId={item.productId}
                    product={item.product}
                    quantity={item.quantity}
                    size={item.size}
                    color={item.color}
                  />
                ))}
              </div>
            ) : !authLogin ? (
              <p>
                You are not authorized. Please login first and apply products to
                the cart
              </p>
            ) : (
              <p>Your cart is empty. Please add the products to the cart</p>
            )}
            <div className="wishlist-content">
              <h2
                className="border-b border-[var(--normal-gray)] mb-[40px] leading-none font-semibold text-[22px] mobile:text-[28px] laptop:text-[32px] pb-[15px]"
                id="favorite"
              >
                Wishlist{" "}
              </h2>
              {authLogin && wishListItems.length > 0 ? (
                <div className="saved-items flex flex-col gap-[50px] w-full">
                  {wishListItems.map((item) => (
                    <WishlistItem
                      key={item.id}
                      id={item.id}
                      wishlistId={item.wishlistId}
                      productId={item.productId}
                      product={item.product}
                      size={item.size}
                      color={item.color}
                    />
                  ))}
                </div>
              ) : (
                <p>Your wishlist is empty</p>
              )}
            </div>
          </div>
          <section className="checkout flex flex-col self-start py-[36px] px-[22px] mobile:px-[30px] bg-[var(--normal-gray)] w-full max-w-full tablet:max-w-[413px] laptop:max-w-[450px] rounded-[8px]">
            <h3 className="font-medium text-sm mobile:text-base mb-[17px]">
              ORDER SUMMARY
            </h3>
            <div className="flex flex-col gap-[8px] w-full mb-[26px]">
              <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full">
                <p className="font-medium text-sm tablet:text-base break-words">
                  SUBTOTAL(1 ITEM)
                </p>
                <p className="text-sm tablet:text-base">$220.00</p>
              </div>
              <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full">
                <p className="text-sm tablet:text-base break-words">
                  ESTIMATED SHIPPING
                </p>
                <p className="text-sm tablet:text-base">$9.00</p>
              </div>
              <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full">
                <p className="text-sm tablet:text-base break-words">
                  FREE SHIPPING(OVER 99$)
                </p>
                <p className="text-sm tablet:text-base">$0.00</p>
              </div>
              <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full">
                <p className="text-sm tablet:text-base break-words">
                  ESITMATED TAX
                </p>
                <p className="text-sm tablet:text-base">$0.00</p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full mb-[36px]">
              <p className="font-medium text-sm tablet:text-base mb-[17px]">
                ORDER TOTAL
              </p>
              <p className="font-medium text-sm tablet:text-base">$229.00</p>
            </div>
            <button className="home__button text-white font-bold w-full text-base tablet:text-xl bg-black py-3 px-12 border border-white shadow-[4px_4px_0_#fff,5px_5px_0_#000]">
              CHECKOUT
            </button>
          </section>
        </section>
      </div>
    </>
  );
};

export default Cart;
