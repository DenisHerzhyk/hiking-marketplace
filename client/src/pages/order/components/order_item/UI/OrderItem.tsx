import React, { useState } from "react";
import { mockOrders } from "../../../data/orders.ts";
import { colorNames } from "../../../../cart/components/cart_item/components/color.ts";

const statusStyles: Record<string, string> = {
  Delivered: "bg-green-100 text-green-800",
  "In Transit": "bg-blue-100 text-blue-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

const OrderItem = ({ order }: { order: (typeof mockOrders)[0] }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-row gap-[30px] items-stretch min-h-[150px] max-w-full tablet:max-w-[800px]">
      {/* left color bar */}
      <div className="w-[4px] rounded-full bg-black self-stretch" />

      <div className="flex flex-col w-full gap-[10px]">
        {/* top row */}
        <div className="flex flex-row flex-wrap w-full justify-between items-start">
          <div>
            <h2 className="font-medium text-base">{order.id}</h2>
            <p
              className={`text-[10px] mobile:text-xs font-light mt-[2px] px-2 py-[2px] rounded-full w-fit ${statusStyles[order.status]}`}
            >
              {order.status}
            </p>
          </div>
          <p className="text-lg">${order.total.toFixed(2)}</p>
        </div>

        <p className="text-xs mobile:text-[13px] text-gray-500">
          {order.date} · {order.address}
        </p>

        {/* items preview */}
        <p className="text-xs text-gray-400">
          {order.items.map((i) => i.title).join(", ")}
        </p>

        {/* expanded details */}
        {expanded && (
          <div className="flex flex-col gap-[10px] mt-[5px] border-t border-gray-200 pt-[10px]">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex flex-row justify-between items-center"
              >
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-400">
                    {item.size} / {colorNames[item.color] ?? item.color}
                  </p>
                </div>
                <p className="text-sm">${item.price.toFixed(2)}</p>
              </div>
            ))}
            <div className="flex flex-col gap-[4px] border-t border-gray-100 pt-[8px]">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Shipping</span>
                <span>
                  {order.shipping === 0
                    ? "FREE"
                    : `$${order.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold mt-1">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* actions */}
        <div className="flex flex-row items-end justify-start mt-[10px] gap-[8px]">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex flex-row gap-[8px] focus:outline-none text-sm leading-none underline text-gray-500 hover:text-black transition-colors"
          >
            {expanded ? "Hide details" : "View details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
