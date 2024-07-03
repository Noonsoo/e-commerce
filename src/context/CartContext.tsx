"use client";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  let [state, setState] = useState({
    hello: "world",
  });

  const { cart, isLoading, removeItem } = useCartStore();

  // console.log(isLoading);
  // console.log(cart);
  const subtotal =
    cart?.lineItems?.reduce((acc, item) => {
      const itemPrice = Number(item.price?.amount || 0);
      const itemQuantity = Number(item.quantity || 0);
      return acc + itemPrice * itemQuantity;
    }, 0) || 0;

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <AppContext.Provider value={[subtotal, isCartOpen, toggleCartOpen]}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
