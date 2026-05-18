import React, { useEffect, useState } from "react";
import { colorNames } from "../../../../cart/components/cart_item/components/color.ts";
import ShowOrderInterface from "../../interface/ShowOrderInterface.ts";
import { GrStatusCriticalSmall } from "react-icons/gr";

const statusStyles: Record<string, string> = {
  Processing: "text-orange-800",
  Packing: "text-brown-800",
  "In Transit": "text-blue-800",
  Delivering: "text-pink-800",
  Delivered: "text-green-800",
  Cancelled: "text-red-800",
};

const OrderItem = ({
  id,
  userId,
  total,
  status,
  paymentId,
  createdAt,
  items,
  deliveryAddress,
  deliveryAddressId,
}: ShowOrderInterface) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-row gap-[30px] items-stretch min-h-[150px] max-w-full tablet:max-w-[800px]">
      <div className="w-[4px] rounded-full bg-black self-stretch" />

      <div className="flex flex-col w-full gap-[10px]">
        <div className="flex flex-row flex-wrap w-full justify-between items-start">
          <div>
            <h2 className="font-medium text-base">Order #{id}</h2>
            <div
              className={`text-base ${statusStyles[status]} w-fit font-light mt-[2px] pl-[2px] py-[2px] rounded-full flex flex-row items-center gap-1`}
            >
              <GrStatusCriticalSmall></GrStatusCriticalSmall>
              <p>{status}</p>
            </div>
          </div>
          <p className="text-lg">${total.toFixed(2)}</p>
        </div>

        <p className="text-xs mobile:text-[13px] text-gray-500">{createdAt}</p>

        <p className="text-xs text-gray-400">
          {items.map((i) => i.product.title).join(", ")}
        </p>
        <p className="text-sm text-black">
          <span className="font-bold">Contact Details</span>
          <br />
          {deliveryAddress?.firstName} {deliveryAddress?.lastName} (
          {deliveryAddress?.phone})
        </p>
        <p className="text-sm text-black">
          <span className="font-bold">Delivery Address</span>
          <br />
          {deliveryAddress?.address1}{" "}
          <span className="ml-2">
            {deliveryAddress?.address2} - {deliveryAddress?.city},{" "}
            {deliveryAddress?.country}, {deliveryAddress?.postalCode}
          </span>
        </p>

        {expanded && (
          <div className="flex flex-col gap-[10px] mt-[5px] border-t border-gray-200 pt-[10px]">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex flex-row justify-between items-center"
              >
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{item.product.title}</p>
                  <p className="text-xs text-gray-400">
                    {item.size} / {colorNames[item.color] ?? item.color}
                  </p>
                  <p className="text-xs text-gray-400">Qty {item.quantity}</p>
                </div>
                <p className="text-sm">
                  $
                  {item.product.discount
                    ? (
                        item.product.price *
                        (1 - item.product.discount / 100) *
                        item.quantity
                      ).toFixed(2)
                    : (item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-[8px]">
              <div className="flex justify-between text-sm font-semibold mt-1">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
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
