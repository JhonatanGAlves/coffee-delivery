import { useContext, useEffect, useState } from "react";

import Image from "next/image";

import { ShoppingCart, Plus, Minus } from "@phosphor-icons/react";
import { CoffeeDeliveryContext } from "@/context/CoffeeDeliveryContext";

interface CoffeeCatalogCardProps extends CoffeeTypes {
  index: number;
}

export default function CoffeeCatalogCard({
  id,
  index,
  coffeeImage,
  compositions,
  coffeeName,
  description,
  price,
}: CoffeeCatalogCardProps) {
  const { addItemToCart, cart } = useContext(CoffeeDeliveryContext);

  const [amountToBuy, setAmountToBuy] = useState(1);
  const [cafesFromCart, setCafesFromCart] = useState(cart ?? []);

  function addCoffeeToCart(amountToBuy: number, index: number) {
    const totalPrice = amountToBuy * price;

    const newCoffee: CoffeeCartTypes = {
      id,
      coffeeImage,
      compositions,
      coffeeName,
      description,
      price,
      totalPrice,
      amount: amountToBuy,
    };

    addItemToCart(cafesFromCart, newCoffee, index);
    setAmountToBuy(1);
  }

  useEffect(() => {
    setCafesFromCart(cart);
  }, [cart]);

  return (
    <div className="flex flex-col mb-5 items-center px-5 bg-[var(--base-card)] rounded-tl-md rounded-tr-[2.25rem] rounded-br-md rounded-bl-[2.25rem]">
      <header className="flex flex-col items-center gap-3 -mt-5">
        <Image src={coffeeImage} alt="Coffee Image" />
        <div className="flex gap-1">
          {compositions?.map((composition, index) => (
            <label
              key={index}
              className="px-2 py-1 rounded-[6.25rem] uppercase font-mono font-bold text-[0.625rem] text-[var(--yellow-dark)] bg-[var(--yellow-light)]"
            >
              {composition}
            </label>
          ))}
        </div>
      </header>

      <main className="flex flex-col text-center gap-2 mt-4">
        <span className="font-sans font-bold text-xl text-[var(--base-subtitle)]">
          {coffeeName}
        </span>

        <p className="font-mono font-normal text-sm text-[var(--base-label)]">
          {description}
        </p>
      </main>

      <footer className="flex items-center justify-between gap-6 mt-8 text-[var(--base-text)] pb-5">
        <span className="flex items-center font-mono font-normal text-sm">
          ${" "}
          <b className="ml-1 font-sans font-extrabold text-2xl">
            {price.toFixed(2)}
          </b>
        </span>
        <div className="flex gap-2">
          <div className="flex justify-between items-center w-[4.5rem] h-[2.375rem] rounded-md bg-[var(--base-button)]">
            <button
              className="hover:opacity-60 transition-all outline-none h-full flex justify-center items-center flex-1 text-[var(--purple)]"
              onClick={() => {
                amountToBuy > 1 && setAmountToBuy(amountToBuy - 1);
              }}
            >
              <Minus size={10.94} color="var(--purple)" />
            </button>
            <span className="font-mono font-normal text-base text-[var(--base-title)]">
              {amountToBuy}
            </span>
            <button
              className="hover:opacity-60 transition-all outline-none h-full flex justify-center items-center flex-1 text-[var(--purple)]"
              onClick={() => setAmountToBuy(amountToBuy + 1)}
            >
              <Plus size={10.94} color="var(--purple)" />
            </button>
          </div>

          <button
            type="button"
            className="flex justify-center items-center w-[2.375rem] h-[2.375rem] rounded-md bg-[var(--purple-dark)] hover:bg-[var(--purple)] transition-all"
            onClick={() => addCoffeeToCart(amountToBuy, index)}
          >
            <ShoppingCart
              width={19.74}
              height={17.88}
              color="var(--base-card)"
              weight="fill"
            />
          </button>
        </div>
      </footer>
    </div>
  );
}
