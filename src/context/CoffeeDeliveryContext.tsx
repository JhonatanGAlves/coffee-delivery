"use client";
import { cafes } from "@/utils/mock";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

interface CoffeeDeliveryProviderProps {
  children: ReactNode;
}

interface CoffeeDeliveryContextProps {
  cafesAvailable: CoffeeTypes[];
  addToCart: (cart: CoffeeTypes[], coffee: CoffeeTypes) => void;
  cart: CoffeeTypes[];
}

export const CoffeeDeliveryContext = createContext<CoffeeDeliveryContextProps>(
  {} as CoffeeDeliveryContextProps
);

export const CoffeeDeliveryProvider = ({
  children,
}: CoffeeDeliveryProviderProps) => {
  const getCartFromStorage =
    JSON.parse(localStorage.getItem("cart") || "[]").length > 0
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : null;

  const [cafesAvailable, setCafesAvailable] = useState<CoffeeTypes[]>([]);
  const [cart, setCart] = useState<CoffeeTypes[]>(getCartFromStorage ?? []);

  function addToCart(currentCart: CoffeeTypes[], newCoffee: CoffeeTypes) {
    const coffeeAlreadyExistInTheCart = currentCart.find(
      (coffee) => coffee.id === newCoffee.id
    );

    if (coffeeAlreadyExistInTheCart?.amount && newCoffee.amount) {
      const currentCartWithoutTheExistingCoffee = currentCart.filter(
        (cart) => cart.id !== newCoffee.id
      );

      const existingCoffeeWithTheUpdatedAmount = {
        ...coffeeAlreadyExistInTheCart,
        amount: coffeeAlreadyExistInTheCart.amount + newCoffee.amount,
      };

      setCart([
        ...currentCartWithoutTheExistingCoffee,
        existingCoffeeWithTheUpdatedAmount,
      ]);

      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...currentCartWithoutTheExistingCoffee,
          existingCoffeeWithTheUpdatedAmount,
        ])
      );
    } else {
      setCart([...currentCart, newCoffee]);
      localStorage.setItem("cart", JSON.stringify([...currentCart, newCoffee]));
    }
  }

  useEffect(() => {
    setCafesAvailable(cafes);
  }, []);

  const values = useMemo(() => {
    return { cafesAvailable, addToCart, cart };
  }, [cafesAvailable, cart]);

  return (
    <CoffeeDeliveryContext.Provider value={values}>
      {children}
    </CoffeeDeliveryContext.Provider>
  );
};
