import OrderItem from "../components/order_item/UI/OrderItem";
import { mockOrders } from "../data/orders.ts";

const Orders = () => {
  return (
    <div className="Cart px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)] mt-[150px]">
      <section className="upper-shopping w-full">
        <h1 className="border-b border-[var(--normal-gray)] leading-none font-semibold text-[22px] mobile:text-[28px] laptop:text-[32px] pb-[15px]">
          My Orders
        </h1>
      </section>

      <section className="content flex flex-col mt-[40px] tablet:flex-row gap-[40px] w-full tablet:w-auto justify-normal tablet:justify-between">
        <div className="w-full flex flex-col gap-[50px]">
          {mockOrders.length > 0 ? (
            <div className="flex flex-col gap-[50px] w-full">
              {mockOrders.map((order) => (
                <OrderItem key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <p>You have no orders yet.</p>
          )}
        </div>

        {/* summary sidebar */}
        <section className="checkout flex flex-col self-start py-[36px] px-[22px] mobile:px-[30px] bg-gray-100 w-full max-w-full tablet:max-w-[413px] laptop:max-w-[450px] rounded-[8px]">
          <h3 className="font-semibold text-sm mobile:text-lg mb-[17px]">
            ORDER HISTORY
          </h3>
          <div className="flex flex-col gap-[8px] w-full mb-[26px]">
            <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full">
              <p className="font-semibold text-sm tablet:text-base">
                TOTAL ORDERS
              </p>
              <p className="text-sm tablet:text-base">{mockOrders.length}</p>
            </div>
            <ul className="flex flex-col gap-[5px]">
              {mockOrders.map((order) => (
                <li
                  key={order.id}
                  className="text-sm tablet:text-base flex flex-row text-gray-500 font-light justify-between gap-[20px] tablet:gap-[10px] w-full"
                >
                  <p>{order.id}</p>
                  <p>${order.total.toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full mt-[8px]">
              <p className="font-semibold text-sm tablet:text-base">
                TOTAL SPENT
              </p>
              <p className="text-sm tablet:text-base">
                ${mockOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
              </p>
            </div>
          </div>
          <button className="home__button text-white font-bold w-full text-base tablet:text-xl bg-black py-3 px-12 border border-white shadow-[4px_4px_0_#fff,5px_5px_0_#000]">
            SHOP MORE
          </button>
        </section>
      </section>
    </div>
  );
};

export default Orders;
