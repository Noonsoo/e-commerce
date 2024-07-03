"use client";

import CheckoutPage from "@/components/CheckoutPage";
import { useAppContext } from "@/context/CartContext";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const [subtotal, isCartOpen, toggleCartOpen] = useAppContext();

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Nonso Store</h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> ${subtotal}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(subtotal),
          currency: "usd",
        }}>
        <CheckoutPage amount={subtotal} />
      </Elements>
    </main>
  );
}
