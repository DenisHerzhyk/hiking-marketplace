import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ShowOrderInterface from "../../interface/ShowOrderInterface";
import { colorNames } from "../../../../cart/components/cart_item/components/color";

const ShowOrder = () => {
  const [order, setOrder] = useState<ShowOrderInterface | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentIntentId = params.get("payment_intent");

    console.log(paymentIntentId);
    if (paymentIntentId) {
      axios
        .post(
          "http://localhost:4996/api/orders/confirm",
          { paymentIntentId },
          { withCredentials: true },
        )
        .then((res) => {
          setOrder(res.data.order);
        })
        .catch((err) => console.error("Problem with payment confirmation"));
    }
  }, []);

  if (!order) return <p>Loading</p>;
  return (
    <>
      <div className="px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[150px] max-w-[640px] mx-auto">
        <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
          Payment confirmed
        </span>

        <p className="text-xs text-gray-400 font-mono mb-1">
          ORDER #{order.id}
        </p>
        <h1 className="text-2xl font-semibold mb-8">
          Your order is on the way
        </h1>
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
          <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200">
            <span className="text-xs font-medium text-gray-400 tracking-wide">
              ITEMS ({order.items.length})
            </span>
          </div>

          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 last:border-none"
            >
              <img
                className="w-13 h-13 rounded-lg bg-gray-100 flex-shrink-0 w-[52px] h-[52px]"
                src={item.product.productImages[0]}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {item.product.title}
                </p>
                <p className="text-xs text-gray-400">
                  Size {item.size} · {colorNames[item.color]} · Qty{" "}
                  {item.quantity}
                </p>
              </div>
              <span className="font-mono text-sm font-medium">
                $
                {item.product.discount
                  ? (
                      item.product.price *
                      (1 - item.product.discount / 100) *
                      item.quantity
                    ).toFixed(2)
                  : (item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="px-5 pb-4 pt-2 flex flex-col gap-1">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span className="font-mono">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold border-t border-gray-200 mt-2 pt-3">
              <span>Order total</span>
              <span className="font-mono">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mobile:flex-row gap-3 mb-4">
          <div className="flex-1 border border-gray-200 rounded-xl p-5">
            <p className="text-[11px] text-gray-400 tracking-widest font-medium mb-2">
              STATUS
            </p>
            <p className="text-sm capitalize">{order.status}</p>
            <p className="text-sm font-medium text-black mt-2">
              Address:
              <br /> {order.deliveryAddress?.address1}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex-1 border border-gray-200 rounded-xl p-5">
            <p className="text-[11px] text-gray-400 tracking-widest font-medium mb-2">
              TOTAL CHARGED
            </p>
            <p className="text-sm font-mono font-medium">
              ${order.total.toFixed(2)}
            </p>
            <p className="text-xs text-gray-400 mt-1">via Stripe</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Link
            to="/orders"
            className="flex-1 text-center text-sm font-medium py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View all orders
          </Link>
          <Link
            to="/"
            className="flex-1 text-center text-sm font-medium py-3 bg-black text-white rounded-lg hover:opacity-80 transition-opacity"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShowOrder;
