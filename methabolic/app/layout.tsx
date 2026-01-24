// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


export const metadata: Metadata = {
  title: "Metabolomics",
  description: "Accelerating Africa through metabolomics",
  icons: { icon: "/favicon.png"}, // references app/favicon.png },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}