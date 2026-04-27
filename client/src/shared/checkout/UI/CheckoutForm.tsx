import { useCheckout, PaymentElement } from "@stripe/react-stripe-js/checkout";
import { FormEvent } from "react";

const CheckoutForm = () => {
  const checkoutState = useCheckout();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (checkoutState.type === "loading") {
      return <div>Loading...</div>;
    } else if (checkoutState.type === "error") {
      return <div>Error: {checkoutState.error.message}</div>;
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button>Submit</button>
      </form>
    </>
  );
};
