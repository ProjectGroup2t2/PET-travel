"use client";

import { usePathname } from "next/navigation";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar/Navbar";
import { ContextProvider } from "@/context/Auth.context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ContextProvider>
          {!isAdminPage && <Navbar />}
          <main>{children}</main>
        </ContextProvider>
      </body>
    </html>
  );
}