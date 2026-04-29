import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/order",
      },
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-[600px] mx-auto"
      >
        <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg shadow-sm">
          <PaymentElement />
          <button className="w-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-black text-lg font-medium py-4 px-4 rounded-md transition-colors">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
