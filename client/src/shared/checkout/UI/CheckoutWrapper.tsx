import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm.tsx";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutWrapper = () => {
  const { state } = useLocation();
  const clientSecret = state?.clientSecret;

  if (!clientSecret) return <div>No checkout session</div>;
  return (
    <>
      <Elements stripe={stripePromise} options={{ clientSecret, locale: "en" }}>
        <CheckoutForm />
      </Elements>
    </>
  );
};

export default CheckoutWrapper;
