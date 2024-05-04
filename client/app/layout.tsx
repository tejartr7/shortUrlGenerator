import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: "700"
});
export const metadata: Metadata = {
  title: "Url Shortener by WebLancerDev 🚀",
  description: "Generate a short url in one click",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
