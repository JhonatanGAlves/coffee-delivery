"use client";
import { useContext, useEffect, useState } from "react";

import Link from "next/link";
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
  Warning,
} from "@phosphor-icons/react";

import CoffeeCartCard from "@/components/main/coffee-card/CoffeeCartCard";
import { CoffeeDeliveryContext } from "@/context/CoffeeDeliveryContext";
import { FORM_INFO_DEFAULT, FORM_INFO_ERROR_DEFAULT } from "@/utils/data";

export default function ShoppingCartPage() {
  const {
    cart,
    formInfo,
    setFormInfo,
    emptyItemsFromCart,
    setShowSuccessNotificationAlert,
    error,
    setError,
  } = useContext(CoffeeDeliveryContext);
  const [totalSumItems, setTotalSumItems] = useState(0);
  const [showRequiredFieldMessage, setShowRequiredFieldMessage] =
    useState(false);
  const [showRequiredSelectMessage, setShowRequiredSelectMessage] =
    useState(false);

  const DELIVERY_FEE_VALUE = cart.length > 0 ? 3.5 : 0.0;

  function getTotalSumItems(currentCart: CoffeeCartTypes[]) {
    const allItemPrices = currentCart.map((item) => item.totalPrice);

    if (!allItemPrices.length) {
      setTotalSumItems(0);
    } else {
      const sum = allItemPrices.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

      setTotalSumItems(sum);
    }
  }

  function onChangeFormInfo(
    key: string,
    event?: React.ChangeEvent<HTMLInputElement>,
    paymentMethod?: "CREDIT" | "DEBIT" | "MONEY"
  ) {
    event?.preventDefault();

    const newFormInfo: FormInfoTypes = {
      ...formInfo,
      [key]: event?.target.value ?? paymentMethod ?? "",
    };

    setFormInfo(newFormInfo);
  }

  function validateFormFields(formInfo: FormInfoTypes): {
    pass: boolean;
    errors: FormInfoErrorTypes;
  } {
    let pass = true;
    let errors: FormInfoErrorTypes = FORM_INFO_ERROR_DEFAULT;

    if (!formInfo.zipCode) {
      pass = false;
      errors = { ...errors, zipCode: true };
    }

    if (!formInfo.street) {
      pass = false;
      errors = { ...errors, street: true };
    }

    if (!formInfo.number) {
      pass = false;
      errors = { ...errors, number: true };
    }

    if (!formInfo.district) {
      pass = false;
      errors = { ...errors, district: true };
    }

    if (!formInfo.city) {
      pass = false;
      errors = { ...errors, city: true };
    }

    if (!formInfo.uf) {
      pass = false;
      errors = { ...errors, uf: true };
    }

    return { pass, errors };
  }

  function validateSelects(formInfo: FormInfoTypes): {
    pass: boolean;
    errors: FormInfoErrorTypes;
  } {
    let pass = true;
    let errors: FormInfoErrorTypes = FORM_INFO_ERROR_DEFAULT;

    if (!formInfo.paymentMethod) {
      pass = false;
      errors = { ...errors, paymentMethod: true };
    }

    return { pass, errors };
  }

  useEffect(() => {
    getTotalSumItems(cart);
  }, [cart]);

  useEffect(() => {
    setFormInfo(FORM_INFO_DEFAULT);
  }, []);

  return (
    <div className="mt-[6.5rem] bg-[var('--background')] flex justify-between gap-8 px-40 pt-10 pb-20">
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
              type="number"
              className={`${
                error.zipCode && "border-red-500"
              } w-[37.037%] outline-none p-3 font-normal text-sm bg-[var(--base-input)] border border-solid border-[var(--base-button)] focus:border-[var(--yellow-dark)] placeholder:text-[var(--base-label)] rounded transition-all`}
              value={formInfo.zipCode}
              onChange={(e) => {
                if (e.target.value.length < 6) {
                  onChangeFormInfo("zipCode", e);
                }
              }}
              placeholder="Zip Code"
            />
            <input
              type="text"
              value={formInfo.street}
              maxLength={60}
              className={`${
                error.street && "border-red-500"
              } outline-none p-3 font-normal text-sm bg-[var(--base-input)] border border-solid border-[var(--base-button)] focus:border-[var(--yellow-dark)] placeholder:text-[var(--base-label)] rounded transition-all`}
              onChange={(e) => onChangeFormInfo("street", e)}
              placeholder="Street"
            />
            <div className="flex gap-3 w-full">
              <input
                type="number"
                value={formInfo.number}
                className={`${
                  error.number && "border-red-500"
                } w-[37.037%] outline-none p-3 font-normal text-sm bg-[var(--base-input)] border border-solid border-[var(--base-button)] focus:border-[var(--yellow-dark)] placeholder:text-[var(--base-label)] rounded transition-all`}
                onChange={(e) => {
                  if (e.target.value.length < 11) {
                    onChangeFormInfo("number", e);
                  }
                }}
                placeholder="Number"
              />
              <div className="flex items-center gap-1 flex-1 p-3 bg-[var(--base-input)] border border-solid border-[var(--base-button)] focus-within:border-[var(--yellow-dark)] rounded transition-all">
                <input
                  type="text"
                  value={formInfo.complement}
                  maxLength={30}
                  className="flex-1 outline-none font-normal text-sm bg-transparent placeholder:text-[var(--base-label)]"
                  onChange={(e) => onChangeFormInfo("complement", e)}
                  placeholder="Complement"
                />
                <span className="w-fit italic text-[var(--base-label)] text-xs">
                  Optional
                </span>
              </div>
            </div>
            <div className="flex gap-3 w-full">
              <input
                type="text"
                value={formInfo.district}
                maxLength={30}
                className={`${
                  error.district && "border-red-500"
                } w-[37.037%] outline-none p-3 font-normal text-sm bg-[var(--base-input)] border border-solid border-[var(--base-button)] focus:border-[var(--yellow-dark)] placeholder:text-[var(--base-label)] rounded transition-all`}
                onChange={(e) => onChangeFormInfo("district", e)}
                placeholder="District"
              />
              <input
                type="text"
                value={formInfo.city}
                maxLength={30}
                className={`${
                  error.city && "border-red-500"
                } flex-1 outline-none p-3 font-normal text-sm bg-[var(--base-input)] border border-solid border-[var(--base-button)] focus:border-[var(--yellow-dark)] placeholder:text-[var(--base-label)] rounded transition-all`}
                onChange={(e) => onChangeFormInfo("city", e)}
                placeholder="City"
              />
              <input
                type="text"
                value={formInfo.uf}
                maxLength={2}
                className={`${
                  error.uf && "border-red-500"
                } w-[11.11%] outline-none p-3 font-normal text-sm bg-[var(--base-input)] border border-solid border-[var(--base-button)] focus:border-[var(--yellow-dark)] placeholder:text-[var(--base-label)] rounded transition-all`}
                onChange={(e) => onChangeFormInfo("uf", e)}
                placeholder="UF"
              />
            </div>
          </form>
          {showRequiredFieldMessage && (
            <span className="flex items-center gap-1 font-bold text-xs text-red-500">
              <Warning size={12} weight="fill" /> Required fields
            </span>
          )}
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
            <button
              className={`${
                formInfo.paymentMethod === "CREDIT" &&
                "bg-[var(--purple-light)] border border-solid border-[var(--purple)] hover:bg-[var(--purple-light)]"
              } flex p-4 gap-3 rounded-md bg-[var(--base-button)] hover:bg-[var(--base-hover)] w-1/3 font-normal text-xs border border-solid border-[var(--base-button)] transition-all`}
              onClick={() =>
                onChangeFormInfo("paymentMethod", undefined, "CREDIT")
              }
            >
              <CreditCard size={16} color="var(--purple)" />
              <span>CREDIT CARD</span>
            </button>
            <button
              className={`${
                formInfo.paymentMethod === "DEBIT" &&
                "bg-[var(--purple-light)] border border-solid border-[var(--purple)] hover:bg-[var(--purple-light)]"
              } flex p-4 gap-3 rounded-md bg-[var(--base-button)] hover:bg-[var(--base-hover)] w-1/3 font-normal text-xs border border-solid border-[var(--base-button)] transition-all`}
              onClick={() =>
                onChangeFormInfo("paymentMethod", undefined, "DEBIT")
              }
            >
              <Bank size={16} color="var(--purple)" />
              <span>DEBIT CARD</span>
            </button>
            <button
              className={`${
                formInfo.paymentMethod === "MONEY" &&
                "bg-[var(--purple-light)] border border-solid border-[var(--purple)] hover:bg-[var(--purple-light)]"
              } flex p-4 gap-3 rounded-md bg-[var(--base-button)] hover:bg-[var(--base-hover)] w-1/3 font-normal text-xs border border-solid border-[var(--base-button)] transition-all`}
              onClick={() =>
                onChangeFormInfo("paymentMethod", undefined, "MONEY")
              }
            >
              <Money size={16} color="var(--purple)" />
              <span>MONEY</span>
            </button>
          </div>
          {showRequiredSelectMessage && (
            <span className="flex items-center gap-1 font-bold text-xs text-red-500">
              <Warning size={12} weight="fill" /> You need to select a payment
              method
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="mb-[0.9375rem] text-[var(--base-subtitle)] font-sans font-bold text-lg">
          Complete your order
        </span>

        <div className="flex flex-col gap-8 p-10 bg-[var(--base-card)] rounded-tl-md rounded-tr-[2.75rem] rounded-br-md rounded-bl-[2.75rem]">
          {cart.length > 0 ? (
            cart.map((coffee, index) => (
              <CoffeeCartCard
                key={coffee.id}
                id={coffee.id}
                index={index}
                coffeeImage={coffee.coffeeImage}
                coffeeName={coffee.coffeeName}
                price={coffee.price}
                totalPrice={coffee.totalPrice}
                amount={coffee.amount}
              />
            ))
          ) : (
            <div className="flex flex-col gap-1 w-[23rem] pb-8 border-b border-solid border-b-[var(--base-button)]">
              <span className="font-semibold">No items added to cart</span>
              <span>
                Go to the{" "}
                <Link
                  href={"/"}
                  className="text-[var(--yellow-dark)] underline hover:opacity-60 transition-all"
                >
                  home page
                </Link>
              </span>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="font-normal text-sm">Total items</span>
              <span className="font-normal text-base">
                $ {totalSumItems.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-normal text-sm">Delivery fee</span>
              <span className="font-normal text-base">
                $ {DELIVERY_FEE_VALUE.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-xl text-[var(--base-subtitle)]">
                Total
              </span>
              <span className="font-bold text-xl text-[var(--base-subtitle)]">
                $ {(totalSumItems + DELIVERY_FEE_VALUE).toFixed(2)}
              </span>
            </div>
          </div>
          <Link
            href={`${
              !validateFormFields(formInfo).pass ||
              !validateSelects(formInfo).pass
                ? "#"
                : "/order-confirmed"
            }`}
          >
            <button
              className="outline-none w-full p-3 bg-[var(--yellow)] text-[var(--white)] text-sm font-bold uppercase hover:bg-[var(--yellow-dark)] transition-all rounded-md disabled:opacity-60 disabled:bg-[var(--yellow)] disabled:cursor-not-allowed"
              onClick={() => {
                const validationFields = validateFormFields(formInfo);
                const validationSelects = validateSelects(formInfo);

                if (validationFields.pass && validationSelects.pass) {
                  emptyItemsFromCart(cart);

                  setShowSuccessNotificationAlert({
                    message:
                      "Congratulations your order has been confirmed successfully",
                    description:
                      "You can return to the home page and buy new cafes",
                    showAlert: true,
                  });
                } else {
                  if (!validationFields.pass) {
                    setError(validationFields.errors);
                    setShowRequiredFieldMessage(true);
                  } else {
                    setError(validationFields.errors);
                    setShowRequiredFieldMessage(false);
                  }

                  if (!validationSelects.pass) {
                    setShowRequiredSelectMessage(true);
                  } else {
                    setShowRequiredSelectMessage(false);
                  }
                }
              }}
              disabled={!cart.length}
            >
              confirm order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
