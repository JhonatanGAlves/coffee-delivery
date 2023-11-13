type CoffeeTypes = {
  id: number;
  coffeeImage: string | import("../shared/lib/get-img-props").StaticImport;
  compositions?: string[];
  coffeeName: string;
  description?: string;
  price: number;
  amount?: number;
};

interface CoffeeCartTypes extends CoffeeTypes {
  totalPrice: number;
}

type FormInfoTypes = {
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  uf: string;
  paymentMethod: "CREDIT" | "DEBIT" | "MONEY" | undefined;
};

interface MessageAlertTypes {
  message: string;
  description: string;
  showAlert: boolean;
}

type FormInfoErrorTypes = {
  zipCode: boolean;
  street: boolean;
  number: boolean;
  complement: boolean;
  district: boolean;
  city: boolean;
  uf: boolean;
  paymentMethod: boolean;
};
