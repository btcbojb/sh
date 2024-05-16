import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BTC BOJB",
  description: "Borås Tech Challenge Band of Jonas Brothers",
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
        <div className="border-t border-muted">footer</div>
      </body>
    </html>
  );
}
