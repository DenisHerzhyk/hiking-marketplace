import React, { useEffect, useState } from "react";
import { colorNames } from "../../../../cart/components/cart_item/components/color.ts";
import ShowOrderInterface from "../../interface/ShowOrderInterface.ts";
import { GrStatusCriticalSmall } from "react-icons/gr";
import OrderItemInterface from "../../interface/OrderItemInterace.ts";

const statusStyles: Record<string, { bg: string; text: string }> = {
  Processing: { bg: "#FEF3C7", text: "#92400E" },
  Packing: { bg: "#FEF9C3", text: "#713F12" },
  "In Transit": { bg: "#DBEAFE", text: "#1E3A5F" },
  Delivering: { bg: "#FCE7F3", text: "#831843" },
  Delivered: { bg: "#DCFCE7", text: "#14532D" },
  Cancelled: { bg: "#FEE2E2", text: "#7F1D1D" },
};
const OrderItem = ({
  id,
  total,
  status,
  items,
  deliveryAddress,
  createdAt,
}: ShowOrderInterface) => {
  const [expanded, setExpanded] = useState(false);
  const style = statusStyles[status] ?? { bg: "#F3F4F6", text: "#374151" };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden max-w-full tablet:max-w-[800px]">
      <div className="flex flex-wrap justify-between items-start gap-2 px-5 py-4 border-b border-gray-100">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-medium">Order #{id}</span>
            <span
              className="text-[12px] font-medium px-2.5 py-0.5 rounded-full"
              style={{ background: style.bg, color: style.text }}
            >
              {status}
            </span>
          </div>
          <span className="text-xs text-gray-400">{createdAt}</span>
        </div>
        <span className="text-[17px] font-medium">${total.toFixed(2)}</span>
      </div>
      <div className="px-5 py-3 border-b border-gray-100">
        <p className="text-[13px] text-gray-500">
          {items.map((item) => item.product.title).join(", ")}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 py-4 border-b border-gray-100">
        <div>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">
            Contact
          </p>
          <p className="text-[13px]">
            {deliveryAddress?.firstName} {deliveryAddress?.lastName}
          </p>
          <p className="text-[13px] text-gray-500">{deliveryAddress?.phone}</p>
        </div>
        <div>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">
            Delivery
          </p>
          <p className="text-[13px]">
            {deliveryAddress?.address1} {deliveryAddress?.address2}
          </p>
          <p className="text-[13px] text-gray-500">
            {deliveryAddress?.city}, {deliveryAddress?.country},{" "}
            {deliveryAddress?.postalCode}
          </p>
        </div>
      </div>
      {expanded && (
        <div className="flex flex-col gap-3 px-5 py-4 border-b border-gray-100">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">{item.product.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {item.size} · {colorNames[item.color] ?? item.color} · Qty{" "}
                  {item.orderQuantity}
                </p>
              </div>
              <span className="text-sm">
                $
                {item.product.discount
                  ? (
                      item.product.price *
                      (1 - item.product.discount / 100) *
                      item.orderQuantity
                    ).toFixed(2)
                  : (item.product.price * item.orderQuantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-medium border-t border-gray-100 pt-3 mt-1">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      )}
      <div className="px-5 py-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[13px] text-gray-400 underline hover:text-black transition-colors"
        >
          {expanded ? "Hide details" : "View details"}
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
