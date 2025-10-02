import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-09-30.acacia" });

export default async function handler(req, res){
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  try{
    const origin = req.headers.origin || "https://pihoch2.me";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price_data:{ currency:"eur", product_data:{ name:"Test" }, unit_amount:3900 }, quantity:1 }],
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancelled`
    });
    res.status(200).json({ url: session.url });
  }catch(e){ res.status(500).json({ error: e.message || "stripe failed" }); }
}
