"use client";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cafes } from "@/utils/mock";
import { FORM_INFO_DEFAULT } from "@/utils/data";

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
  emptyItemsFromCart: (currentCart: CoffeeCartTypes[]) => void;
  infoTotalItems: number;
  setInfoTotalItems: (infoTotalItems: number) => void;
  formInfo: FormInfoTypes;
  setFormInfo: (formInfo: FormInfoTypes) => void;
  showSuccessNotificationAlert: MessageAlertTypes;
  setShowSuccessNotificationAlert: (
    showSuccessNotificationAlert: MessageAlertTypes
  ) => void;
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
  const [infoTotalItems, setInfoTotalItems] = useState(0);
  const [formInfo, setFormInfo] = useState<FormInfoTypes>(FORM_INFO_DEFAULT);
  const [showSuccessNotificationAlert, setShowSuccessNotificationAlert] =
    useState<MessageAlertTypes>({
      message: "",
      showAlert: false,
      description: "",
    });

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

    setShowSuccessNotificationAlert({
      message: "The item has been added to shopping cart successfully",
      description: "Click on the cart at the top to see your list",
      showAlert: true,
    });

    updateInfoTotalItems();
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
    infoTotalItems;
    const cartWithoutTheItemDeleted = allItemsInCart.filter(
      (item) => item.id !== id
    );

    setCart(cartWithoutTheItemDeleted);
    localStorage.setItem("cart", JSON.stringify(cartWithoutTheItemDeleted));

    setShowSuccessNotificationAlert({
      message: "The item has been deleted from shopping cart successfully",
      description:
        "You can return to the home page and add new items to your cart",
      showAlert: true,
    });
  }

  function emptyItemsFromCart(currentCart: CoffeeCartTypes[]) {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  }

  const updateInfoTotalItems = useCallback(() => {
    const allItemAmount = [...cart].map((item) => item.amount as number);
    const totalAmount = allItemAmount.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    setInfoTotalItems(totalAmount);
  }, [cart]);

  useEffect(() => {
    updateInfoTotalItems();
  }, [cart]);

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
      emptyItemsFromCart,
      infoTotalItems,
      setInfoTotalItems,
      formInfo,
      setFormInfo,
      showSuccessNotificationAlert,
      setShowSuccessNotificationAlert,
    };
  }, [
    cafesAvailable,
    cart,
    infoTotalItems,
    formInfo,
    showSuccessNotificationAlert,
  ]);

  return (
    <CoffeeDeliveryContext.Provider value={values}>
      {children}
    </CoffeeDeliveryContext.Provider>
  );
};
