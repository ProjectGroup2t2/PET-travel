"use client";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const noContainerPages = ["/login", "/register"]; 
  
  return noContainerPages.includes(pathname) ? children : <main className="container">{children}</main>;
}
