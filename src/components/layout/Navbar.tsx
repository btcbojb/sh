"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { id: "home", label: "Home", href: "/" },
  { id: "Map", label: "Map", href: "/map" },
];

const Navbar = () => {
  const router = usePathname();
  return (
    <div className="fixed z-50 items-center justify-center flex top-5 w-full">
      <div className="w-full max-w-7xl rounded-full shadow-lg h-12 md:h-16 py-2 px-6 mx-8 backdrop-blur-[8px] supports-[backdrop-filter]:bg-background/80 border border-muted flex items-center ">
        <div className="grid grid-cols-3 w-full items-center">
          <div className="hidden md:flex justify-start relative rounded-md gap-x-2 ">
            {navigation.map((link) => (
              <Link
                href={link.href}
                key={link.id}
                className={
                  router === link.href
                    ? "text-primary-foreground relative rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:outline-primary focus-visible:outline bg-primary"
                    : "hover:opacity-50 relative rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:outline-primary focus-visible:outline"
                }
              >
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </div>
          <div className="block md:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost">
                  <span className="sr-only">Open nav</span>
                  <HamburgerMenuIcon />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm py-2">
                  <DrawerHeader>
                    <DrawerClose asChild>
                      <Link href="/">
                        <DrawerTitle className="font-bold tracking-wide text-2xl uppercase">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-800">
                            Bridgeify
                          </span>
                        </DrawerTitle>
                      </Link>
                    </DrawerClose>
                  </DrawerHeader>
                  <div className="mb-12 mt-4 space-y-4">
                    {navigation.map((link) => (
                      <div key={link.id} className="text-center mx-auto">
                        <DrawerClose asChild>
                          <Link
                            href={link.href}
                            className={
                              "text-foreground relative rounded-md px-3 py-1.5 text-sm font-medium transition "
                            }
                          >
                            {link.label}
                          </Link>
                        </DrawerClose>
                      </div>
                    ))}
                    <div className="flex justify-center items-center space-x-4">
                      {/* <ThemeToggle /> */}
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <div className="flex justify-center">
            <Link href={"/"}>
              <div className="font-bold tracking-wide text-xl uppercase">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-800">
                  Bridgeify
                </span>
              </div>
            </Link>
          </div>
          <div className="flex justify-end items-center space-x-4">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-4"
              )}
            >
              Login
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "px-4"
              )}
            >
              Sign Up
            </Link>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
