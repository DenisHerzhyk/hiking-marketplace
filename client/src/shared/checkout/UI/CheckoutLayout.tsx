import { CheckoutProvider } from "../context/CheckoutContext";
import { CheckoutSteps } from "../../checkout_steps/CheckoutSteps";
import { Outlet } from "react-router-dom";

export const CheckoutLayout = () => {
  return (
    <CheckoutProvider>
      <CheckoutSteps />
      <Outlet />
    </CheckoutProvider>
  );
};
