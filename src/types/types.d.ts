type CoffeeTypes = {
  id: number;
  coffeeImage: string | import("../shared/lib/get-img-props").StaticImport;
  compositions?: string[];
  coffeeName: string;
  description?: string;
  price: number;
  amount?: number;
};
