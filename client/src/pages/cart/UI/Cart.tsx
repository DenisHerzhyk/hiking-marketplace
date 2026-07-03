import React, { useContext, useEffect, useState } from "react";
import CartItem from "../components/cart_item/UI/CartItem.tsx";
import WishlistItem from "../components/saved_item/UI/SavedItem.tsx";
import api from "../../../axios.ts";
import CartItemInterface from "../components/cart_item/interface/CartItemInterface.ts";
import WishlistItemInterface from "../components/saved_item/interface/SavedItemInterface.tsx";
import { AuthContext } from "../../login/context/authContext.tsx";
import { FiShoppingCart, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import CartItemSkeleton from "../../../shared/loading/CartItemSkeleton.tsx";
import WishlistItemSkeleton from "../../../shared/loading/SavedItemSkeleton.tsx";
import toast from "react-hot-toast";

const EmptyState = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center justify-center py-20 text-center gap-4 w-full">
    <Icon className="text-gray-300 text-6xl" />
    <h2 className="font-semibold text-2xl mobile:text-3xl">{title}</h2>
    <p className="text-gray-500 max-w-md mx-auto">{description}</p>
    <Link
      to="/"
      className="home__button text-stone-700 font-bold px-8 py-3 bg-white border border-stone-300 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
    >
      Continue Shopping
    </Link>
  </div>
);

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);
  const [wishListItems, setWishListItems] = useState<WishlistItemInterface[]>(
    [],
  );
  const [cartItemLoading, setCartItemLoading] = useState(true);
  const [wishlistItemLoading, setWishlistItemLoading] = useState(true);

  const [userId, setUserId] = useState(Number);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, a) => {
    const price = a.product.discount
      ? a.product.price * (1 - a.product.discount / 100) * a.orderQuantity
      : a.product.price * a.orderQuantity;
    return sum + price;
  }, 0);

  const shipping = subtotal < 99 ? 9 : 0;
  const orderTotal = subtotal + shipping;

  const freeShippingThreshold = 99;
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - subtotal,
  );
  const shippingProgress = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100,
  );

  const ctxt = useContext(AuthContext);
  if (!ctxt) throw new Error("AuthProvider missing");
  const { authLogin } = ctxt;

  useEffect(() => {
    api
      .get("/api/cart", { withCredentials: true })
      .then((res) => {
        setCartItems(res.data.data);
        setUserId(res.data.userId);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setCartItemLoading(false));

    api
      .get("/api/wishlist", { withCredentials: true })
      .then((res) => {
        setWishListItems(res.data.data);
        setUserId(res.data.userId);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setWishlistItemLoading(false));
  }, []);

  const handleCheckoutProcess = () => {
    if (cartItems.length === 0) {
      toast.error("The cart is empty. Please add items first!");
      return;
    }
    navigate("/deliveryInfo");
  };
  const handleItemDelete = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, orderQuantity: quantity } : item,
      ),
    );
  };
  const handleWishlistItemDelete = (id: number) => {
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
      <div className="Cart px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)] mt-[120px]">
        <section className="upper-shopping w-full">
          <h1 className="border-b border-[var(--normal-gray)] leading-none font-semibold text-[22px] mobile:text-[28px] laptop:text-[32px] pb-[15px]">
            Shopping Cart{" "}
          </h1>
        </section>
        <section className="content flex flex-col mt-[40px] tablet:flex-row gap-[40px] w-full tablet:w-auto justify-normal tablet:justify-between">
          <div className="w-full flex flex-col gap-[50px]">
            {!authLogin ? (
              <EmptyState
                icon={FiLock}
                title="Login Required"
                description="Please login to manage your shopping cart and proceed to checkout."
              />
            ) : cartItemLoading ? (
              <div className="cart-items flex flex-col gap-8 w-full">
                {Array.from({ length: 2 }).map((_, i) => (
                  <CartItemSkeleton key={i} />
                ))}
              </div>
            ) : cartItems.length > 0 ? (
              <div className="cart-items flex flex-col gap-8 w-full">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    cartId={item.cartId}
                    productId={item.productId}
                    product={item.product}
                    stock={item.product.stock}
                    orderQuantity={item.orderQuantity}
                    availableQuantity={item.availableQuantity}
                    onQuantityChange={(val) =>
                      handleQuantityChange(item.id, val)
                    }
                    size={item.size}
                    color={item.color}
                    onDelete={handleItemDelete}
                    onWishlistAdd={handleWishlistAdd}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={FiShoppingCart}
                title="Your cart is empty"
                description="Looks like you haven't added anything to your cart yet."
              />
            )}
            {authLogin && wishListItems.length > 0 && (
              <div className="wishlist-content bg-gray-50 rounded-lg p-6 mt-10">
                <h2
                  className="border-b border-gray-200 mb-6 leading-none font-semibold text-xl mobile:text-2xl laptop:text-3xl pb-4"
                  id="favorite"
                >
                  Saved for Later
                </h2>

                <div className="saved-items flex flex-col gap-6 w-full">
                  {authLogin && (
                    <div className="wishlist-content">
                      {wishlistItemLoading
                        ? Array.from({ length: 2 }).map((_, i) => (
                            <WishlistItemSkeleton key={i} />
                          ))
                        : wishListItems.length > 0
                          ? wishListItems
                              .slice()
                              .sort((a, b) => {
                                const aInStock = a.product.stock[a.size] > 0;
                                const bInStock = b.product.stock[b.size] > 0;

                                return Number(bInStock) - Number(aInStock);
                              })
                              .map((item) => (
                                <WishlistItem
                                  key={item.id}
                                  id={item.id}
                                  wishlistId={item.wishlistId}
                                  productId={item.productId}
                                  product={item.product}
                                  stock={item.product.stock}
                                  orderQuantity={item.orderQuantity}
                                  size={item.size}
                                  color={item.color}
                                  onDelete={handleWishlistItemDelete}
                                  onCartAdd={handleCartAdd}
                                />
                              ))
                          : null}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <section className="checkout flex flex-col sticky top-[160px] py-[36px] px-[22px] mobile:px-[30px] bg-white shadow-sm border border-gray-200 w-full max-w-full tablet:max-w-[413px] laptop:max-w-[450px] rounded-[8px]">
            <h3 className="font-semibold text-sm mobile:text-lg mb-[17px]">
              ORDER SUMMARY
            </h3>
            <div className="flex flex-col gap-4 w-full mb-[26px]">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm tablet:text-base">
                  <p className="font-semibold break-words">
                    SUBTOTAL ({cartItems.length} ITEM)
                  </p>
                  <p>€{subtotal.toFixed(2)}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[12px] text-gray-500 font-medium">
                    <span>
                      {subtotal >= freeShippingThreshold
                        ? "Free shipping unlocked! 🎉"
                        : `Add €${remainingForFreeShipping.toFixed(2)} more for free shipping`}
                    </span>
                    <span>{Math.round(shippingProgress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-stone-400 transition-all duration-500"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {cartItems.length <= 3 ? (
                  <ul className="flex flex-col gap-1">
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="text-sm tablet:text-base flex flex-row text-gray-500 font-light justify-between w-full"
                      >
                        <p>
                          {item.product.title} x{item.orderQuantity}
                        </p>
                        <p>
                          €
                          {item.product.discount
                            ? (
                                item.product.price *
                                (1 - item.product.discount / 100) *
                                item.orderQuantity
                              ).toFixed(2)
                            : (item.product.price * item.orderQuantity).toFixed(
                                2,
                              )}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 font-light">
                    {cartItems.length} items in your cart
                  </p>
                )}
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <p className="font-semibold text-sm tablet:text-base break-words">
                  SHIPPING
                </p>
                <p className="text-sm tablet:text-base">
                  €{shipping.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full mb-8">
              <p className="font-semibold text-sm tablet:text-base">
                ORDER TOTAL
              </p>
              <p className="font-bold text-lg tablet:text-xl">
                €{orderTotal.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => handleCheckoutProcess()}
              className="home__button text-stone-700 font-bold w-full text-base tablet:text-xl bg-white border border-stone-300 py-3 px-12 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              CHECKOUT
            </button>
            <Link
              to="/orders"
              className="text-sm text-center text-gray-500 hover:text-black transition-colors duration-200 underline mt-[12px]"
            >
              View my orders
            </Link>
          </section>
        </section>
      </div>
    </>
  );
};

export default Cart;
