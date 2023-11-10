import { useState } from "react";

import Image from "next/image";

import { Plus, Minus, Trash } from "@phosphor-icons/react";

export default function CoffeeCartCard({
  id,
  coffeeImage,
  coffeeName,
  price,
  amount,
}: CoffeeTypes) {
  const [amountToBuy, setAmountToBuy] = useState(amount ?? 1);

  return (
    <>
      <div className="flex justify-between px-1 pt-2 pb-8 border-b border-solid border-b-[var(--base-button)]">
        <div className="flex gap-5 mr-[3.125rem]">
          <Image src={coffeeImage} alt="Coffee Image" width={64} height={64} />
          <div className="flex flex-1 flex-col gap-2">
            <span>{coffeeName}</span>
            <div className="flex gap-2">
              <div className="flex justify-between items-center w-[4.5rem] h-[2.375rem] rounded-md bg-[var(--base-button)]">
                <button
                  className="outline-none h-full flex justify-center items-center flex-1 text-[var(--purple)]"
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
                  className="outline-none h-full flex justify-center items-center flex-1 text-[var(--purple)]"
                  onClick={() => setAmountToBuy(amountToBuy + 1)}
                >
                  <Plus size={10.94} color="var(--purple)" />
                </button>
              </div>

              <button className="flex p-2 gap-3 rounded-md bg-[var(--base-button)] hover:bg-[var(--base-hover)] font-normal text-xs transition-all">
                <Trash size={16} color="var(--purple)" />
                <span>DELETE</span>
              </button>
            </div>
          </div>
        </div>

        <span className="font-bold text-base w-[3.75rem]">$ {price}</span>
      </div>
    </>
  );
}
