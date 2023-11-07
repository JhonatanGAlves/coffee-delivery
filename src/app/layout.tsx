import type { Metadata } from "next";
import { Baloo_2, Roboto } from "next/font/google";
import "./globals.css";

const balooTwo = Baloo_2({ subsets: ["latin"], weight: ["700", "800"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

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
      <body className={`${balooTwo.className} ${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
