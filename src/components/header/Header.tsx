"use client";
import Image from "next/image";
import Link from "next/link";

import { MapPin, ShoppingCart } from "@phosphor-icons/react";

import logoHeader from "../../assets/logo-header.svg";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-40 py-8">
      <Image src={logoHeader} alt="Coffee image in homepage header" />
      <div className="flex gap-3">
        <div className="flex justify-center items-center gap-1 px-2 h-[2.375rem] rounded-md font-mono font-normal text-sm text-[var(--purple-dark)] bg-[var(--purple-light)]">
          <MapPin width={15.13} height={19.25} weight="fill" />
          <span>Huston, TX</span>
        </div>

        <Link
          className="flex justify-center items-center w-[2.375rem] h-[2.375rem] rounded-md bg-[var(--yellow-light)]"
          href={"/shopping-cart"}
        >
          <ShoppingCart
            width={18.56}
            height={17.88}
            color="var(--yellow-dark)"
            weight="fill"
          />
        </Link>
      </div>
    </header>
  );
}
