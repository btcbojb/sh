import Image from "next/image";
import React from "react";

export default function PlacePage() {
  return (
    <div className="container mx-auto">
      <div className="mt-24 flex flex-col space-y-4">
        <Image src={"/"} alt={"place"} height={50} width={50} />
        <h2 className="text-4xl">Tant Grönolof</h2>
        <div>
          <h3 className="text-2xl">Tillgänglighet</h3>
          <div>
            {/* Mappa ut kort på alla olika "disabilities". Hämta från DB */}
          </div>
        </div>
      </div>
    </div>
  );
}
