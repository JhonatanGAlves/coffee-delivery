"use client";
import CoffeeCartCard from "@/components/main/coffee-card/CoffeeCartCard";
import { CoffeeDeliveryContext } from "@/context/CoffeeDeliveryContext";
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from "@phosphor-icons/react";
import { useContext } from "react";

export default function ShoppingCartPage() {
  const { cart } = useContext(CoffeeDeliveryContext);

  return (
    <div className="bg-[var('--background')] flex gap-8 px-40 pt-10 pb-[15rem]">
      <div className="flex flex-col">
        <span className="mb-[0.9375rem] text-[var(--base-subtitle)] font-sans font-bold text-lg">
          Complete your order
        </span>

        <div className="flex flex-col gap-8 p-10 bg-[var(--base-card)] rounded-md mb-3">
          <div className="flex gap-2">
            <MapPinLine
              className="mt-[2px]"
              size={22}
              color="var(--yellow-dark)"
            />
            <div className="flex flex-col">
              <span className="text-[var(--base-subtitle)] font-normal text-base">
                Delivery Address
              </span>
              <p className="font-normal text-sm">
                Enter the address where you would like to receive your order
              </p>
            </div>
          </div>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Zip Cod"
              className="w-[37.037%] outline-none p-3 font-normal text-sm bg-[var(--base-input)] border border-solid border-[var(--base-button)] focus:border-[var(--yellow-dark)] placeholder:text-[var(--base-label)] rounded transition-all"
            />
            <input
              type="text"
              placeholder="Street"
              className="outline-none p-3 font-normal text-sm bg-[var(--base-input)] border border-solid border-[var(--base-button)] focus:border-[var(--yellow-dark)] placeholder:text-[var(--base-label)] rounded transition-all"
            />
            <div className="flex gap-3 w-full">
              <input
                type="text"
                placeholder="Number"
                className="w-[37.037%] outline-none p-3 font-normal text-sm bg-[var(--base-input)] border border-solid border-[var(--base-button)] focus:border-[var(--yellow-dark)] placeholder:text-[var(--base-label)] rounded transition-all"
              />
              <input
                type="text"
                placeholder="Complement"
                className="flex-1 outline-none p-3 font-normal text-sm bg-[var(--base-input)] border border-solid border-[var(--base-button)] focus:border-[var(--yellow-dark)] placeholder:text-[var(--base-label)] rounded transition-all"
              />
            </div>
            <div className="flex gap-3 w-full">
              <input
                type="text"
                placeholder="District"
                className="w-[37.037%] outline-none p-3 font-normal text-sm bg-[var(--base-input)] border border-solid border-[var(--base-button)] focus:border-[var(--yellow-dark)] placeholder:text-[var(--base-label)] rounded transition-all"
              />
              <input
                type="text"
                placeholder="City"
                className=" flex-1 outline-none p-3 font-normal text-sm bg-[var(--base-input)] border border-solid border-[var(--base-button)] focus:border-[var(--yellow-dark)] placeholder:text-[var(--base-label)] rounded transition-all"
              />
              <input
                type="text"
                placeholder="UF"
                className="w-[11.11%] outline-none p-3 font-normal text-sm bg-[var(--base-input)] border border-solid border-[var(--base-button)] focus:border-[var(--yellow-dark)] placeholder:text-[var(--base-label)] rounded transition-all"
              />
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-8 p-10 bg-[var(--base-card)] rounded-md">
          <div className="flex gap-2">
            <CurrencyDollar
              className="mt-[2px]"
              size={22}
              color="var(--purple)"
            />
            <div className="flex flex-col">
              <span className="text-[var(--base-subtitle)] font-normal text-base">
                Payment
              </span>
              <p className="font-normal text-sm">
                Payment is made upon delivery. Choose the way you want to pay
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex p-4 gap-3 rounded-md bg-[var(--base-button)] hover:bg-[var(--base-hover)] w-1/3 font-normal text-xs transition-all">
              <CreditCard size={16} color="var(--purple)" />
              <span>CREDIT CARD</span>
            </button>
            <button className="flex p-4 gap-3 rounded-md bg-[var(--base-button)] hover:bg-[var(--base-hover)] w-1/3 font-normal text-xs transition-all">
              <Bank size={16} color="var(--purple)" />
              <span>DEBIT CARD</span>
            </button>
            <button className="flex p-4 gap-3 rounded-md bg-[var(--base-button)] hover:bg-[var(--base-hover)] w-1/3 font-normal text-xs transition-all">
              <Money size={16} color="var(--purple)" />
              <span>MONEY</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="mb-[0.9375rem] text-[var(--base-subtitle)] font-sans font-bold text-lg">
          Complete your order
        </span>

        <div className="flex flex-col gap-8 p-10 bg-[var(--base-card)] rounded-tl-md rounded-tr-[2.75rem] rounded-br-md rounded-bl-[2.75rem]">
          {cart.map((coffee) => (
            <CoffeeCartCard
              key={coffee.id}
              id={coffee.id}
              coffeeImage={coffee.coffeeImage}
              coffeeName={coffee.coffeeName}
              price={coffee.price}
              amount={coffee.amount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
