import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Includer ",
  description: "Utforska Borås med självförtroende - Vi leder vägen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased min-h-screen">
      <body className="min-h-screen flex flex-col relative overflow-x-hidden">
        <Navbar />
        <div className="h-full flex-1 relative">{children}</div>
        <div className=" flex border-t border-muted justify-center pb-20">
          <img src="./startpage.png" alt="background image" className="rounded-md" />
        </div>
      </body>
    </html>
  );
}
