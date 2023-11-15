"use client";
import { useContext, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { MapPin, ShoppingCart, Spinner } from "@phosphor-icons/react";

import logoHeader from "../../assets/logo-header.svg";
import { CoffeeDeliveryContext } from "@/context/CoffeeDeliveryContext";

export default function Header() {
  const { infoTotalItems, userGeolocation } = useContext(CoffeeDeliveryContext);
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);

  const responsivePadding =
    "px-4 min-[920px]:px-10 min-[980px]:px-20 min-[1140px]:px-40";

  const handleScroll = () => {
    setCurrentScrollPosition(window.scrollY);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        currentScrollPosition > 104 && "drop-shadow-md"
      } fixed top-0 z-10 w-screen bg-[var(--background)] flex justify-between items-center ${responsivePadding} py-8`}
    >
      <Link href={"/"}>
        <Image src={logoHeader} alt="Coffee image in homepage header" />
      </Link>
      <div className="flex gap-3">
        <div className="flex justify-center items-center gap-1 px-2 h-[2.375rem] rounded-md font-mono font-normal text-sm text-[var(--purple-dark)] bg-[var(--purple-light)]">
          <MapPin width={15.13} height={19.25} weight="fill" />
          {!userGeolocation.status ? (
            <>
              <Spinner className="animate-spin" size={12} />
              <span>Loading your location</span>
            </>
          ) : (
            <span>
              {userGeolocation.status === "AUTHORIZED"
                ? `${userGeolocation.city}, ${userGeolocation.state}`
                : userGeolocation.status === "NOT_AUTHORIZED"
                ? userGeolocation.city
                : userGeolocation.status === "PROBLEM_GET_LOCATION" &&
                  userGeolocation.city}
            </span>
          )}
        </div>

        <div className="relative">
          <Link
            className="flex justify-center items-center w-[2.375rem] h-[2.375rem] rounded-md bg-[var(--yellow-light)]"
            href={"/shopping-cart"}
          >
            <ShoppingCart size={24} color="var(--yellow-dark)" weight="fill" />
          </Link>
          {infoTotalItems > 0 && (
            <div className="flex justify-center items-center w-5 h-5 rounded-full text-xs font-bold text-[var(--white)] bg-[var(--yellow-dark)] absolute -top-2.5 -right-2.5 cursor-default">
              {infoTotalItems}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
