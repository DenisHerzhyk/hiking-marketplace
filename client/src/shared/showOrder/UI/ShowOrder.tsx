import { useEffect } from "react";
import axios from "axios";

const ShowOrder = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentIntentId = params.get("payment_intent");

    if (paymentIntentId) {
      axios.post("/api/orders/confirm", { paymentIntentId });
    }
  });

  return <></>;
};

export default ShowOrder;
