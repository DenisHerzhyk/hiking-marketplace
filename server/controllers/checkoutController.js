import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getCheckout = (req, res) => {
  return;
};

export const createCheckout = async (req, res) => {
  const { total, items, form } = req.body;

  try {
    const minimalItems = items.map((item) => ({
      productId: item.productId,
      orderQuantity: item.orderQuantity,
      size: item.size,
      color: item.color,
      price: item.product.price,
    }));

    const payment = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: JSON.stringify(minimalItems),
        form: JSON.stringify(form),
        userId: req.user.id,
      },
    });

    if (!payment)
      return res.status(405).send({ error: "Problem with the payment" });

    res.status(200).json({ clientSecret: payment.client_secret });
  } catch (err) {
    return res.status(500).send({ error: "Checkout failed" });
  }
};
