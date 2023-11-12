"use client";
import { useContext } from "react";

import Image from "next/image";
import { CurrencyDollar, MapPin, Timer } from "@phosphor-icons/react";

import { CoffeeDeliveryContext } from "@/context/CoffeeDeliveryContext";
import orderConfirmedPageImage from "../../assets/order-confirmed-page.svg";
import Link from "next/link";
import GlobalNotification from "@/components/global-notification/GlobalNotification";

export default function OrderConfirmedPage() {
  const {
    formInfo,
    showSuccessNotificationAlert,
    setShowSuccessNotificationAlert,
  } = useContext(CoffeeDeliveryContext);

  return (
    <div
      className={`${
        !formInfo.street && "h-[calc(100vh-6.5rem)]"
      } mt-[6.5rem] bg-[var('--background')] flex justify-between gap-8 px-40 pt-10 pb-20`}
    >
      <div className={`${!formInfo.street && "justify-center"} flex flex-col`}>
        <h1 className="font-sans text-[var(--yellow-dark)] text-[2rem] font-extrabold">
          Woohoo! Order confirmed
        </h1>
        <p className="font-normal text-[var(--base-subtitle)] text-xl mb-10">
          Now just wait and the coffee will soon reach you.
        </p>
        {!formInfo.street && (
          <span>
            Go to the{" "}
            <Link
              href={"/"}
              className="text-[var(--yellow-dark)] underline hover:opacity-60 transition-all"
            >
              home page
            </Link>
          </span>
        )}

        <div
          className={`${
            !formInfo.street && "hidden"
          } flex flex-col gap-8 py-[2.8125rem] px-10 border border-solid border-[var(--purple)] rounded-tl-md rounded-tr-[2.75rem] rounded-br-md rounded-bl-[2.75rem]`}
        >
          <div className="flex items-center gap-3">
            <div className="min-w-[2rem] w-8 min-h-[2rem] h-8 rounded-full flex justify-center items-center text-[var(--background)] bg-[var(--purple)]">
              <MapPin width={16} height={16} weight="fill" />
            </div>
            <span>
              Delivery to <b>{formInfo.street} Street</b>,{" "}
              <b>{formInfo.number}</b> - {formInfo.district} - {formInfo.city},{" "}
              {formInfo.uf}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="min-w-[2rem] w-8 min-h-[2rem] h-8 rounded-full flex justify-center items-center text-[var(--background)] bg-[var(--yellow)]">
              <Timer width={16} height={16} weight="fill" />
            </div>
            <span>
              Delivery forecast
              <br /> <b>20 min - 30 min</b>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="min-w-[2rem] w-8 min-h-[2rem] h-8 rounded-full flex justify-center items-center text-[var(--background)] bg-[var(--yellow-dark)]">
              <CurrencyDollar width={16} height={16} weight="fill" />
            </div>
            <span>
              Payment on delivery <br />
              <b>
                {formInfo.paymentMethod === "CREDIT"
                  ? "Credit Card"
                  : formInfo.paymentMethod === "DEBIT"
                  ? "Debit Card"
                  : "Money"}
              </b>
            </span>
          </div>
        </div>
      </div>

      <Image
        src={orderConfirmedPageImage}
        alt="Man on a motorbike making delivery"
        className={`${!formInfo.street ? "mt-0" : "mt-[7.5rem]"}`}
      />

      <GlobalNotification
        show={showSuccessNotificationAlert.showAlert}
        message={showSuccessNotificationAlert.message}
        description={showSuccessNotificationAlert.description}
        onClose={(close) =>
          setShowSuccessNotificationAlert({
            message: "",
            showAlert: close,
            description: "",
          })
        }
        timeToClose={7000}
      />
    </div>
  );
}
