import { useContext, useState } from "react";

import Image from "next/image";

import { Plus, Minus, Trash } from "@phosphor-icons/react";
import { CoffeeDeliveryContext } from "@/context/CoffeeDeliveryContext";
import GlobalNotification from "@/components/global-notification/GlobalNotification";

interface CoffeeCartCardProps extends CoffeeCartTypes {
  index: number;
}

export default function CoffeeCartCard({
  id,
  coffeeImage,
  coffeeName,
  price,
  totalPrice,
  amount,
  index,
}: CoffeeCartCardProps) {
  const [amountToBuy, setAmountToBuy] = useState(amount ?? 1);
  const {
    cart,
    updateItemFromCart,
    deleteItemFromCart,
    showSuccessNotificationAlert,
    setShowSuccessNotificationAlert,
  } = useContext(CoffeeDeliveryContext);

  function updateAmountAndTotalPrice(
    idx: number,
    operation: "subtract" | "add",
    currentCart: CoffeeCartTypes[],
    price: number
  ) {
    if (operation === "subtract") {
      setAmountToBuy(amountToBuy - 1);
    } else {
      setAmountToBuy(amountToBuy + 1);
    }

    updateItemFromCart(idx, operation, currentCart, price);
  }

  return (
    <div className="flex justify-between px-1 pt-2 pb-8 border-b border-solid border-b-[var(--base-button)]">
      <div className="flex gap-5 mr-[3.125rem]">
        <Image src={coffeeImage} alt="Coffee Image" width={64} height={64} />
        <div className="flex flex-1 flex-col gap-2">
          <span>{coffeeName}</span>
          <div className="flex gap-2">
            <div className="flex justify-between items-center w-[4.5rem] h-[2.375rem] rounded-md bg-[var(--base-button)]">
              <button
                className="hover:opacity-60 transition-all outline-none h-full flex justify-center items-center flex-1 text-[var(--purple)]"
                onClick={() => {
                  amountToBuy > 1 &&
                    updateAmountAndTotalPrice(index, "subtract", cart, price);
                }}
              >
                <Minus size={10.94} color="var(--purple)" />
              </button>
              <span className="font-mono font-normal text-base text-[var(--base-title)]">
                {amountToBuy}
              </span>
              <button
                className="hover:opacity-60 transition-all outline-none h-full flex justify-center items-center flex-1 text-[var(--purple)]"
                onClick={() =>
                  updateAmountAndTotalPrice(index, "add", cart, price)
                }
              >
                <Plus size={10.94} color="var(--purple)" />
              </button>
            </div>

            <button
              className="flex items-center p-2 gap-3 rounded-md bg-[var(--base-button)] hover:bg-[var(--base-hover)] font-normal text-xs transition-all"
              onClick={() => deleteItemFromCart(id, cart)}
            >
              <Trash size={16} color="var(--purple)" />
              <span>DELETE</span>
            </button>
          </div>
        </div>
      </div>

      <span className="font-bold text-base w-[3.75rem]">
        $ {totalPrice?.toFixed(2)}
      </span>

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
      />
    </div>
  );
}
