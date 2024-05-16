import { MapIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const HeroComponent = () => {
  return (
    <section className="pb-16 pt-36 lg:pt-48 lg:pb-20 ">
      <div
        className="container flex max-w-[54rem] opacity-0 animate-fade-up flex-col items-center gap-5 text-center"
        style={{ animationFillMode: "forwards" }}
      >
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Utforska Borås med självförtroende
          <br />
          <span className="relative bg-gradient-to-r from-primary to-blue-800 bg-clip-text font-extrabold text-transparent">
            Vi leder vägen
          </span>
        </h1>

        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae ut aut
          perferendis repudiandae debitis quidem voluptatum pariatur.
        </p>

        <div className="flex justify-center space-x-2 md:space-x-4 mt-6">
          <Link
            href="/map"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-6 py-2"
            )}
          >
            <MapIcon className="w-4 h-4" />
            <p className="pl-2">Utforska</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
