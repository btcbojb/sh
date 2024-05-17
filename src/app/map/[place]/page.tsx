import { Button } from "@/components/ui/button";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import {
  Accessibility,
  Dog,
  Ear,
  Languages,
  Layers2,
  Nut,
  Speech,
  Volume2,
  Grip,
  CigaretteOff,
  ThumbsUp
} from "lucide-react";
import React from "react";

const data = {
  id: "1",
  name: "Tant Grön",
  availability: {
    Wheelchair: "rgba(0, 128, 0, 0.7)", // green
    Volume: "rgba(255, 0, 0, 0.7)", // red
    Languages: "rgba(255, 165, 0, 0.7)", // orange
    ElevationDiffrence: "rgba(128, 128, 128, 0.7)", // gray
    Nuts: "rgba(128, 128, 128, 0.7)", // gray
    AuditoryLoop: "rgba(128, 128, 128, 0.7)", // gray
    SignLanguage: "rgba(128, 128, 128, 0.7)", // gray
    Smoke: "rgba(128, 128, 128, 0.7)", // gray
    DogFriendly: "rgba(128, 128, 128, 0.7)", // gray
    Carpet: "rgba(128, 128, 128, 0.7)", // gray
  },
};

function renderIcon(key: string): JSX.Element {
  switch (key) {
    case "Wheelchair":
      return <Accessibility size={64} />;
    case "Perfume":
      return <Speech size={64} />;
    case "Volume":
      return <Volume2 size={64} />;
    case "Languages":
      return <Languages size={64} />;
    case "ElevationDiffrence":
      return <Layers2 size={64} />;
    case "Nuts":
      return <Nut size={64} />;
    case "AuditoryLoop":
      return <Ear size={64} />;
    case "SignLanguage":
      return <Languages size={64} />;
    case "Smoke":
      return <CigaretteOff size={64} />;
    case "DogFriendly":
      return <Dog size={64} />;
    case "Carpet":
      return <Grip size={64} />
    default:
      return <></>;
  }
}

function translateKey(key: string): string {
  switch (key) {
    case "Wheelchair":
      return "Rörelsehinder";
    case "Volume":
      return "Ljudnivå";
    case "Languages":
      return "Tillgängliga språk";
    case "ElevationDiffrence":
      return "Höjdskillnad";
    case "Nuts":
      return "Nötfri miljö";
    case "AuditoryLoop":
      return "Hörslinga";
    case "SignLanguage":
      return "Teckenspråk";
    case "Smoke":
      return "Rökfri miljö";
    case "DogFriendly":
      return "Hundvänlig";
    case "Carpet":
      return "Heltäcknigsmatta"
    default:
      return key;
  }
}

export default async function PlacePage() {

  // const sql = neon(
  //   "postgresql://includer_owner:c1bK9uLFCxRt@ep-tight-rice-a2lfuh7m.eu-central-1.aws.neon.tech/includer?sslmode=require"
  // );
  // const db = drizzle(sql);
  // const placeData = await db
  //   .select()
  //   .from(placeTable)
  //   .where(eq(placeTable.placeId, "HERE YOU WRITE PARAMS"));

  return (
    <div>
      <div className="flex flex-col space-y-4">
        <div
          className="w-full h-32 sm:h-48 md:h-56 lg:h-68 sm flex items-center pl-4"
          style={{
            backgroundImage: "url('/images/tantgron.png')",
            backgroundSize: "cover",
          }}
        >
        </div>
        <div className="container mx-auto flex flex-col gap-8">
          {/* Availability */}
          <div>
            <h2 className="text-3xl py-6 text-center">{data.name}</h2>
            <div className="flex flex-col justify-center md:flex-row gap-6 mt-6">
              <span className="bg-[#f6f6f6] p-1 px-2 rounded-full">
                🟢 = God tillgänglighet
              </span>
              <span className="bg-[#f6f6f6] p-1 px-2 rounded-full">
                🟠 = Mellan tillgänglighet
              </span>
              <span className="bg-[#f6f6f6] p-1 px-2 rounded-full">
                🔴 = Dålig tillgänglighet
              </span>
              <span className="bg-[#f6f6f6] p-1 px-2 rounded-full">
                ⚫ = Ingen information
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-12 mt-6 m-0 bg-slate-400 py-12">
              {Object.entries(data.availability).map(
                ([key, value], index) => (
                  <div className="flex flex-col">
                    <div
                      key={index}
                      className={`flex items-center space-x-2  flex-col rounded-full p-6 w-40 h-40`}
                      style={{
                        backgroundColor: `${value}`,
                      }}
                    >
                      {renderIcon(key)}
                      <p className="text-lg">{translateKey(key)}</p>
                    </div>
                    <span className="flex w-min mt-6 gap-4 m-auto justify-center">
                      <Button>👍</Button>
                      <Button>👎</Button>
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Kommentarer */}
          <div className="lg:w-1/4">
            <h3 className="text-2xl">Kommentarer</h3>
            <div className="w-full rounded-md bg-[#f6f6f6] h-24 mt-4 p-2">
              <h1>hehe</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
