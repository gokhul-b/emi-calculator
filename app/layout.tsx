import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quickSand = Quicksand({
  subsets: ["latin"],
  style: "normal",
  weight: "500",
});

export const metadata: Metadata = {
  title: "EMI Calculator",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quickSand.className}>
        <div className="mx-32 my-16">{children}</div>
      </body>
    </html>
  );
}
