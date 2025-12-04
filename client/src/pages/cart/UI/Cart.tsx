import React from "react";
import "../../../styles/main.scss";
import CartItem from "../components/cart_item/UI/CartItem";
import SavedItem from "../components/saved_item/UI/SavedItem";
import imgPath from "../../../assets/images/products/2.png";

const Cart = () => {
  return (
    <>
      <div className="Cart px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)] mt-[77px] mobile:mt-[118px]">
        <section className="upper-shopping w-full">
          <h1 className="border-b border-[var(--light-gray)] font-extrabold text-[22px] mobile:text-[28px] laptop:text-[32px] pb-[8px] laptop:pb-[12px]">
            SHOPPING CART
          </h1>
        </section>
        <section className="content flex flex-col tablet:flex-row gap-[69px] mobile:gap-[113px] tablet:gap-[20px] w-full tablet:w-auto justify-normal tablet:justify-between mt-[35px] mobile:mt-[50px]">
          <div className="w-full flex flex-col gap-[50px]">
            <div className="cart-items flex flex-col gap-[30px] w-full">
              <CartItem
                img={imgPath}
                title="Women's Canyonite Flannel Shirt"
                price={139.0}
                discount={0}
                inStock={true}
                category="WOMENS"
                size="S"
                color="WHITE"
              />
              <CartItem
                img={imgPath}
                title="Women's Canyonite Flannel Shirt"
                price={139.0}
                discount={0}
                inStock={true}
                category="WOMENS"
                size="S"
                color="WHITE"
              />
            </div>
            <div className="wishlist-content">
              <h2 className="text-base pb-[8px] w-full border-b border-[var(--light-gray)] mb-[35px] mobile:mb -[50px]">
                SAVE FOR LATER
              </h2>
              <SavedItem
                img={imgPath}
                title="Women's Canyonite Flannel Shirt"
                price={139.0}
                discount={0}
                inStock={true}
                category="WOMENS"
                size="S"
                color="WHITE"
              />
            </div>
          </div>
          <section className="checkout flex flex-col self-start py-[36px] px-[22px] mobile:px-[30px] bg-[var(--normal-gray)] w-full max-w-full tablet:max-w-[413px] laptop:max-w-[450px]">
            <h3 className="font-medium text-sm mobile:text-base mb-[17px]">
              ORDER SUMMARY
            </h3>
            <div className="flex flex-col gap-[8px] w-full mb-[26px]">
              <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full">
                <p className="font-medium text-sm mobile:text-base break-words">
                  SUBTOTAL(1 ITEM)
                </p>
                <p className="text-sm mobile:text-base">$220.00</p>
              </div>
              <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full">
                <p className="text-sm mobile:text-base break-words">
                  ESTIMATED SHIPPING
                </p>
                <p className="text-sm mobile:text-base">$9.00</p>
              </div>
              <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full">
                <p className="text-sm mobile:text-base break-words">
                  FREE SHIPPING(OVER 99$)
                </p>
                <p className="text-sm mobile:text-base">$0.00</p>
              </div>
              <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full">
                <p className="text-sm mobile:text-base break-words">
                  ESITMATED TAX
                </p>
                <p className="text-sm mobile:text-base">$0.00</p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full mb-[36px]">
              <p className="font-medium text-sm mobile:text-base mb-[17px]">
                ORDER TOTAL
              </p>
              <p className="font-medium text-sm mobile:text-base">$229.00</p>
            </div>
            <button className="w-full text-white bg-black rounded-full font-bold text-base mobile:text-[20px] py-[8px] mobile:py-[13px]">
              CHECKOUT
            </button>
          </section>
        </section>
      </div>
    </>
  );
};

export default Cart;
