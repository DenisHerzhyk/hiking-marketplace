import { useEffect, useState } from "react";
import OrderItem from "../components/order_item/UI/OrderItem";
import ShowOrderInterface from "../components/interface/ShowOrderInterface";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState<ShowOrderInterface[] | null>(null);

  useEffect(() => {
    const fetchOrders = () => {
      axios
        .get("http://localhost:4996/api/orders", { withCredentials: true })
        .then((res) => {
          console.log(res.data.orders);
          setOrders(res.data.orders);
        })
        .catch((err) => console.error(err));
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Cart px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)] mt-[30px] tablet:mt-[40px]">
      <section className="upper-shopping w-full">
        <h1 className="border-b border-[var(--normal-gray)] leading-none font-semibold text-[22px] mobile:text-[28px] laptop:text-[32px] pb-[15px]">
          My Orders
        </h1>
      </section>

      <section className="content flex flex-col mt-[40px] tablet:flex-row gap-[40px] w-full tablet:w-auto justify-normal tablet:justify-between">
        <div className="w-full flex flex-col gap-[50px]">
          {orders ? (
            <div className="flex flex-col gap-[50px] w-full">
              {orders &&
                orders.map((order) => (
                  <OrderItem
                    key={order.id}
                    id={order.id}
                    userId={order.userId}
                    total={order.total}
                    paymentId={order.paymentId}
                    status={order.status}
                    deliveryAddress={order.deliveryAddress}
                    deliveryAddressId={order.deliveryAddressId}
                    createdAt={
                      order.createdAt.split("T")[0] +
                      " " +
                      order.createdAt.split("T")[1].split(".")[0]
                    }
                    items={order.items}
                  />
                ))}
            </div>
          ) : (
            <p>You have no orders yet.</p>
          )}
        </div>

        {orders && orders.length > 0 && (
          <section className="checkout flex flex-col self-start py-[36px] px-[22px] mobile:px-[30px] bg-gray-100 w-full max-w-full tablet:max-w-[413px] laptop:max-w-[450px] rounded-[8px]">
            <h3 className="font-semibold text-sm mobile:text-lg mb-[17px]">
              ORDER HISTORY
            </h3>
            <div className="flex flex-col gap-[8px] w-full mb-[26px]">
              <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full">
                <p className="font-semibold text-sm tablet:text-base">
                  TOTAL ORDERS
                </p>
                <p className="text-sm tablet:text-base">{orders.length}</p>
              </div>
              <ul className="flex flex-col gap-[5px]">
                {orders.map((order) => (
                  <li
                    key={order.id}
                    className="text-sm tablet:text-base flex flex-row text-gray-500 font-light justify-between gap-[20px] tablet:gap-[10px] w-full"
                  >
                    <p>Order #{order.id}</p>
                    <p>${order.total.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
              <div className="flex flex-row justify-between items-center gap-[20px] tablet:gap-[10px] w-full mt-[8px]">
                <p className="font-semibold text-sm tablet:text-base">
                  TOTAL SPENT
                </p>
                <p className="text-sm tablet:text-base">
                  ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Orders;
