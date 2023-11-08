"use client";
import Image from "next/image";

import { ShoppingCart, Package, Timer, Coffee } from "@phosphor-icons/react";

import bgHero from "../../assets/background-hero.png";
import bgImage from "../../assets/bg-image.svg";

export default function Main() {
  return (
    <div className="flex flex-col px-40">
      <div className="flex justify-between items-center h-[34rem]">
        <div className="absolute -z-10">
          <Image
            src={bgHero}
            alt="Background image"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>

        <div className="flex flex-col">
          <h1 className="font-sans font-extrabold text-5xl text-[var(--base-title)]">
            Find the perfect coffee for any time of day
          </h1>
          <p className="mt-4 font-mono font-normal text-xl text-[var(--base-subtitle)]">
            With Coffee Delivery you receive your coffee wherever you are,
            anytime
          </p>

          <div className="grid grid-cols-2 mt-[5.5rem] gap-5 font-normal text-base">
            <div className="flex items-center gap-3">
              <div className="min-w-[2rem] w-8 min-h-[2rem] h-8 rounded-full flex justify-center items-center text-[var(--background)] bg-[var(--yellow-dark)]">
                <ShoppingCart width={16} height={16} weight="fill" />
              </div>
              <span>Simple and secure purchase</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="min-w-[2rem] w-8 min-h-[2rem] h-8 rounded-full flex justify-center items-center text-[var(--background)] bg-[var(--base-text)]">
                <Package width={16} height={16} weight="fill" />
              </div>
              <span>Packaging keeps the coffee intact</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="min-w-[2rem] w-8 min-h-[2rem] h-8 rounded-full flex justify-center items-center text-[var(--background)] bg-[var(--yellow)]">
                <Timer width={16} height={16} weight="fill" />
              </div>
              <span>Fast and tracked delivery</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="min-w-[2rem] w-8 min-h-[2rem] h-8 rounded-full flex justify-center items-center text-[var(--background)] bg-[var(--purple)]">
                <Coffee width={16} height={16} weight="fill" />
              </div>
              <span>The coffee arrives fresh to you</span>
            </div>
          </div>
        </div>

        <Image src={bgImage} alt="Coffee image from background" />
      </div>

      <h3 className="font-sans font-extrabold text-[2rem] text-[var(--base-subtitle)] mt-8 mb-[4.5rem]">
        Our cafes
      </h3>
    </div>
  );
}