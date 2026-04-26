import React, { useContext, useEffect, useState } from "react";
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

  const subtotal = Number(
    cartItems.reduce((sum, a) => sum + a.product.price, 0).toFixed(2),
  );
  const shipping = subtotal < 99 ? 9 : 0;
  const orderTotal = (subtotal + shipping).toFixed(2);
  const ctxt = useContext(AuthContext);
  if (!ctxt) throw new Error("AuthProvider missing");
  const { authLogin } = ctxt;

  useEffect(() => {
    axios
      .get("http://localhost:4996/api/cart", { withCredentials: true })
      .then((res) => {
        setCartItems(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get("http://localhost:4996/api/wishlist", { withCredentials: true })
      .then((res) => {
        setWishListItems(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleItemDelete = (id: number) => {
    console.log("handleDelete called with id:", id);
    console.log("current cartItems:", cartItems);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleWishlistItemDelete = (id: number) => {
    console.log("handleDelete called with id:", id);
    console.log("current wishlistItem:", wishListItems);
    setWishListItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCartAdd = (item: CartItemInterface) => {
    setCartItems((prev) => [...prev, item]);
  };

  const handleWishlistAdd = (item: WishlistItemInterface) => {
    setWishListItems((prev) => [...prev, item]);
  };
  return (
    <>
      <div className="Cart px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)] mt-[150px]">
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
                    onDelete={handleItemDelete}
                    onWishlistAdd={handleWishlistAdd}
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
            {authLogin && wishListItems.length > 0 && (
              <div className="wishlist-content">
                <h2
                  className="border-b border-[var(--normal-gray)] mb-[40px] leading-none font-semibold text-[22px] mobile:text-[28px] laptop:text-[32px] pb-[15px]"
                  id="favorite"
                >
                  Wishlist{" "}
                </h2>

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
                      onDelete={handleWishlistItemDelete}
                      onCartAdd={handleCartAdd}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <section className="checkout flex flex-col self-start py-[36px] px-[22px] mobile:px-[30px] bg-gray-100 w-full max-w-full tablet:max-w-[413px] laptop:max-w-[450px] rounded-[8px]">
            <h3 className="font-semibold text-sm mobile:text-lg mb-[17px]">
              ORDER SUMMARY
            </h3>
            <div className="flex flex-col gap-[8px] w-full mb-[26px]">
              <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full">
                <p className="font-semibold text-sm tablet:text-base break-words">
                  SUBTOTAL({cartItems.length} ITEM)
                </p>
                <p className="text-sm tablet:text-base">
                  ${subtotal.toFixed(2)}
                </p>
              </div>
              <ul className="flex flex-col gap-[5px]">
                {cartItems.map((item) => (
                  <li className=" text-sm tablet:text-base flex flex-row text-gray-500 font-light justify-between gap-[20px] tablet:gap-[10px] w-full">
                    <p>{item.product.title}</p>
                    <p>${item.product.price.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
              <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full"></div>
              <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full">
                <p className="font-semibold text-sm tablet:text-base break-words">
                  SHIPPING{" "}
                  <span className="font-light text-gray-600">
                    (FREE OVER 99$)
                  </span>
                </p>
                <p className="text-sm tablet:text-base">
                  ${shipping.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full mb-[36px]">
              <p className="font-semibold text-sm tablet:text-base mb-[17px]">
                ORDER TOTAL
              </p>
              <p className="font-medium text-sm tablet:text-base">
                ${orderTotal}
              </p>
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
