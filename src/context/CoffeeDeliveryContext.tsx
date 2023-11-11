"use client";
import { cafes } from "@/utils/mock";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

interface CoffeeDeliveryProviderProps {
  children: ReactNode;
}

interface CoffeeDeliveryContextProps {
  cafesAvailable: CoffeeTypes[];
  addItemToCart: (
    cart: CoffeeCartTypes[],
    coffee: CoffeeCartTypes,
    index: number
  ) => void;
  cart: CoffeeCartTypes[];
  updateItemFromCart: (
    idx: number,
    operation: "subtract" | "add",
    currentCart: CoffeeCartTypes[],
    price: number
  ) => void;
  deleteItemFromCart: (id: number, currentCart: CoffeeCartTypes[]) => void;
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
  const [cart, setCart] = useState<CoffeeCartTypes[]>(getCartFromStorage ?? []);

  function addItemToCart(
    currentCart: CoffeeCartTypes[],
    newCoffee: CoffeeCartTypes,
    index: number
  ) {
    const coffeeAlreadyExistInTheCart = currentCart.find(
      (coffee) => coffee.id === newCoffee.id
    );

    if (coffeeAlreadyExistInTheCart) {
      (currentCart[index].amount as number) += newCoffee.amount as number;
      (currentCart[index].totalPrice as number) +=
        newCoffee.totalPrice as number;

      setCart(currentCart);
      localStorage.setItem("cart", JSON.stringify(currentCart));
    } else {
      setCart([...currentCart, newCoffee]);
      localStorage.setItem("cart", JSON.stringify([...currentCart, newCoffee]));
    }
  }

  function updateItemFromCart(
    idx: number,
    operation: "subtract" | "add",
    currentCart: CoffeeCartTypes[],
    price: number
  ) {
    const allItemsInCart = [...currentCart];

    if (operation === "subtract") {
      (allItemsInCart[idx].amount as number) -= 1;
      (allItemsInCart[idx].totalPrice as number) -= price;
    } else {
      (allItemsInCart[idx].amount as number) += 1;
      (allItemsInCart[idx].totalPrice as number) += price;
    }

    setCart(allItemsInCart);
    localStorage.setItem("cart", JSON.stringify(allItemsInCart));
  }

  function deleteItemFromCart(id: number, currentCart: CoffeeCartTypes[]) {
    const allItemsInCart = [...currentCart];
    const cartWithoutTheItemDeleted = allItemsInCart.filter(
      (item) => item.id !== id
    );

    setCart(cartWithoutTheItemDeleted);
    localStorage.setItem("cart", JSON.stringify(cartWithoutTheItemDeleted));
  }

  useEffect(() => {
    setCafesAvailable(cafes);
  }, []);

  const values = useMemo(() => {
    return {
      cafesAvailable,
      addItemToCart,
      cart,
      updateItemFromCart,
      deleteItemFromCart,
    };
  }, [cafesAvailable, cart]);

  return (
    <CoffeeDeliveryContext.Provider value={values}>
      {children}
    </CoffeeDeliveryContext.Provider>
  );
};
