import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Loader } from "@/components/layout/Loader";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaxAdvisor.lk | Tax clarity. Confident decisions.",
  description:
    "Expert tax guidance, compliance and digital tools for individuals and businesses across Sri Lanka.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <Loader />
        <noscript>
          <style>{"#page-loader{display:none!important}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
