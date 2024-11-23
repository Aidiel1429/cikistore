"use client";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { useEffect, useState } from "react";
import Loader from "@/app/components/loading";

const inter = Montserrat({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased w-full`}>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Loader />
          </div>
        ) : (
          <div className="flex min-h-screen">
            <div className="hidden lg:block">
              <Sidebar />
            </div>
            <div className="w-full min-h-screen bg-slate-400/10 p-3">
              <Header />
              {children}
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
