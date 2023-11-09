type CoffeeTypes = {
  coffeeImage: string | import("../shared/lib/get-img-props").StaticImport;
  compositions: string[];
  coffeeName: string;
  description: string;
  price: number;
};
