import type { Metadata } from "next";
import { Baloo_2, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { CoffeeDeliveryProvider } from "@/context/CoffeeDeliveryContext";

const balooTwo = Baloo_2({
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
  variable: "--font-baloo-two",
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Coffee Delivery",
  description: "To make any part of your day even more delicious.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${balooTwo.variable} ${robotoMono.variable}`}>
        <CoffeeDeliveryProvider>
          <Header />
          {children}
        </CoffeeDeliveryProvider>
      </body>
    </html>
  );
}
