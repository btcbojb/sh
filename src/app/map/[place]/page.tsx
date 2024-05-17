import {
  Accessibility,
  Dog,
  Ear,
  Languages,
  Layers2,
  Nut,
  Speech,
  Volume2,
} from "lucide-react";
import React from "react";

const tantGron = {
  id: "1",
  name: "Tant Grön",
  availability: {
    Wheelchair: "rgba(0, 128, 0, 0.7)", // green
    Perfume: "rgba(255, 0, 0, 0.7)", // red
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
      return <Accessibility size={64} color="green" />;
    case "Perfume":
      return <Speech size={64} color="green" />;
    case "Volume":
      return <Volume2 size={64} color="green" />;
    case "Languages":
      return <Languages size={64} color="orange" />;
    case "ElevationDiffrence":
      return <Layers2 size={64} color="red" />;
    case "Nuts":
      return <Nut size={64} color="red" />;
    case "AuditoryLoop":
      return <Ear size={64} color="gray" />;
    case "SignLanguage":
      return <Languages size={64} color="gray" />;
    case "Smoke":
      return <Nut size={64} color="gray" />;
    case "DogFriendly":
      return <Dog size={64} color="gray" />;
    default:
      return <></>;
  }
}

function translateKey(key: string): string {
  switch (key) {
    case "Wheelchair":
      return "Rullstolstillgänglig";
    case "Perfume":
      return "Doftfri miljö";
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
    default:
      return key;
  }
}

export default function PlacePage() {
  return (
    <div>
      <div className="mt-24 flex flex-col space-y-4">
        <div
          className="w-full h-32 sm:h-48 md:h-56 lg:h-68 sm flex items-center pl-4"
          style={{
            backgroundImage: "url('/images/tantgron.png')",
            backgroundSize: "cover",
            filter: "grayscale(65%)",
          }}
        >
          <h2
            className="text-3xl lg:text-4xl font-semibold text-white uppercase"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            {tantGron.name}
          </h2>
        </div>
        <div className="container mx-auto flex flex-col lg:flex-row gap-8">
          {/* Disability */}
          <div className="lg:w-3/4">
            <h3 className="text-2xl">Tillgänglighet</h3>
            <div className="flex flex-col md:flex-row gap-4 mt-2">
              <span className="bg-[#f6f6f6] p-1 px-2 rounded-md">
                🟢 = God tillgänglighet
              </span>
              <span className="bg-[#f6f6f6] p-1 px-2 rounded-md">
                🟠 = Mellan tillgänglighet
              </span>
              <span className="bg-[#f6f6f6] p-1 px-2 rounded-md">
                🔴 = Dålig tillgänglighet
              </span>
              <span className="bg-[#f6f6f6] p-1 px-2 rounded-md">
                ⚫ = Ingen information
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4 rounded-md bg-[#dadada] p-2">
              {Object.entries(tantGron.availability).map(
                ([key, value], index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 border-2 flex-col rounded-md p-4`}
                    style={{
                      backgroundColor: `${value}`,
                    }}
                  >
                    <p className="text-lg font-medium">{translateKey(key)}</p>
                    {renderIcon(key)}
                    <p>{value === "green" ? ":)" : ":("}</p>
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
