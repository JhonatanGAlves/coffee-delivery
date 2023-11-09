import espressoImage from "../assets/coffee/espresso.svg";
import americanImage from "../assets/coffee/american.svg";
import creamyImage from "../assets/coffee/creamy-espresso.svg";
import icedImage from "../assets/coffee/iced-coffee.svg";
import coffeeWithMilkImage from "../assets/coffee/coffee-with-milk.svg";
import latteImage from "../assets/coffee/latte.svg";
import capuccinoImage from "../assets/coffee/capuccino.svg";
import macchiatoImage from "../assets/coffee/macchiato.svg";
import mocaccinoImage from "../assets/coffee/mocaccino.svg";
import hotChocolateImage from "../assets/coffee/hot-chocolate.svg";
import cubanImage from "../assets/coffee/cuban.svg";
import hawaiianImage from "../assets/coffee/hawaiian.svg";
import arabicImage from "../assets/coffee/arabic.svg";
import irishImage from "../assets/coffee/irish.svg";

export const cafes: CoffeeTypes[] = [
  {
    id: 1,
    coffeeImage: espressoImage,
    compositions: ["traditional"],
    coffeeName: "Traditional Espresso",
    description: "Traditional coffee made with hot water and ground beans",
    price: 6.9,
  },
  {
    id: 2,
    coffeeImage: americanImage,
    compositions: ["traditional"],
    coffeeName: "American Espresso",
    description: "Diluted espresso, less intense than traditionals",
    price: 6.9,
  },
  {
    id: 3,
    coffeeImage: creamyImage,
    compositions: ["traditional"],
    coffeeName: "Creamy Espresso",
    description: "Traditional espresso with creamy foam",
    price: 7.9,
  },
  {
    id: 4,
    coffeeImage: icedImage,
    compositions: ["traditional", "iced"],
    coffeeName: "Iced American",
    description: "Drink prepared with espresso and ice cubes",
    price: 7.9,
  },
  {
    id: 5,
    coffeeImage: coffeeWithMilkImage,
    compositions: ["traditional", "with milk"],
    coffeeName: "Coffee with Milk",
    description: "Half and half traditional espresso with steamed milk",
    price: 8.9,
  },
  {
    id: 6,
    coffeeImage: latteImage,
    compositions: ["traditional", "with milk"],
    coffeeName: "Latte",
    description: "A shot of espresso with double the milk and creamy foam",
    price: 8.9,
  },
  {
    id: 7,
    coffeeImage: capuccinoImage,
    compositions: ["traditional", "with milk"],
    coffeeName: "Capuccino",
    description:
      "Cinnamon drink made from equal doses of coffee, milk and foam",
    price: 8.9,
  },
  {
    id: 8,
    coffeeImage: macchiatoImage,
    compositions: ["traditional", "with milk"],
    coffeeName: "Macchiato",
    description: "Espresso mixed with some hot milk and froth",
    price: 8.9,
  },
  {
    id: 9,
    coffeeImage: mocaccinoImage,
    compositions: ["traditional", "with milk"],
    coffeeName: "Mocaccino",
    description: "Espresso with chocolate syrup, little milk and foam",
    price: 8.9,
  },
  {
    id: 10,
    coffeeImage: hotChocolateImage,
    compositions: ["special", "with milk"],
    coffeeName: "Hot Chocolate",
    description: "Drink made with chocolate dissolved in hot milk and coffee",
    price: 9.9,
  },
  {
    id: 11,
    coffeeImage: cubanImage,
    compositions: ["special", "alcoholic", "iced"],
    coffeeName: "Cuban",
    description: "Iced espresso drink with rum, cream and mint",
    price: 9.9,
  },
  {
    id: 12,
    coffeeImage: hawaiianImage,
    compositions: ["special"],
    coffeeName: "Hawaiian",
    description: "Sweet drink prepared with coffee and coconut milk",
    price: 7.9,
  },
  {
    id: 13,
    coffeeImage: arabicImage,
    compositions: ["special"],
    coffeeName: "Arabic",
    description: "Drink prepared with Arabic coffee beans and spices",
    price: 7.9,
  },
  {
    id: 14,
    coffeeImage: irishImage,
    compositions: ["special", "alcoholic"],
    coffeeName: "Irish",
    description:
      "Drink made from coffee, Irish whiskey, sugar and whipped cream",
    price: 9.9,
  },
];
