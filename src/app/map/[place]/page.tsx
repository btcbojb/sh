"use client";

import { placeTable } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, sql } from "drizzle-orm";
import {
  Accessibility,
  ArrowDownIcon,
  ArrowUpIcon,
  Dog,
  Ear,
  Languages,
  Layers2,
  Nut,
  Speech,
  Volume2,
} from "lucide-react";
import React from "react";
import { GetServerSideProps } from "next";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      return <Accessibility size={64} className="text-gray-800" />;
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
      return <Dog size={64} className="text-gray-800" />;
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

type Place = {
  id: string | null;
  placeId: string;
  name: string;
  wheelchair: number | null;
  perfume: number | null;
  volume: number | null;
  languages: number | null;
  elevationDifference: number | null;
  nuts: number | null;
  auditoryLoop: number | null;
  signLanguage: number | null;
  smoke: number | null;
  dogFriendly: number | null;
  carpet: number | null;
  dogFriendlyUpvotes: number | null;
  dogFriendlyDownvotes: number | null;
  wheelchairUpvotes: number | null;
  wheelchairDownvotes: number | null;
};

export default function PlacePage() {
  const { place } = useParams();
  const [placeData, setPlaceData] = useState<Place | null>(null);
  const [dataTrigger, setDataTrigger] = useState(Date.now());
  useEffect(() => {
    const fetchData = async () => {
      if (!place) return;

      const sql = neon(process.env.DATABASE_URL!);
      const db = drizzle(sql);

      const data = await db
        .select()
        .from(placeTable)
        .where(eq(placeTable.placeId, place as string));

      if (!data[0]) {
        return;
      }

      setPlaceData(data[0]);
    };

    fetchData();
  }, [place, dataTrigger]);

  const handleUpvote = async () => {
    const dbconnect = neon(process.env.DATABASE_URL!);
    const db = drizzle(dbconnect);

    const prevUpvoteCount = await db
      .select()
      .from(placeTable)
      .where(eq(placeTable.placeId, place as string));

    await db.update(placeTable).set({
      wheelchairUpvotes: prevUpvoteCount[0].wheelchairUpvotes! + 1,
    });

    setDataTrigger(Date.now());
  };

  const handleDownvote = async () => {
    const dbconnect = neon(process.env.DATABASE_URL!);
    const db = drizzle(dbconnect);
    const prevDownCount = await db
      .select()
      .from(placeTable)
      .where(eq(placeTable.placeId, place as string));

    await db.update(placeTable).set({
      wheelchairDownvotes: prevDownCount[0].wheelchairDownvotes! + 1,
    });

    setDataTrigger(Date.now());
  };

  if (!placeData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-1 mt-24 gap-20 container mx-auto ">
      <div>
        <div className="grid grid-cols-3 gap-6">
          <Card className="p-4 col-span-2">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {placeData.name}
            </h2>
            <p className="text-xs">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
            <div className="mt-4 flex gap-4">
              <Accessibility className="w-4 h-4" />
              <Accessibility className="w-4 h-4" />
              <Accessibility className="w-4 h-4" />
            </div>
            <div className="flex gap-4 mt-6">
              <Button variant="default" size="sm">
                Website
              </Button>
              <Button variant="outline" size="sm">
                Something
              </Button>
            </div>
          </Card>
          <img src={"/bg.png"} className="rounded-md h-full object-cover" />
        </div>
        <Card className="p-4 mt-4">
          <div className="flex flex-wrap border-b pb-4 justify-between md:flex-row gap-4 mt-2">
            <span className="bg-secondary-foreground text-white text-xs p-1.5 px-4 rounded-md">
              🟢 = God tillgänglighet
            </span>
            <span className="bg-secondary-foreground text-white text-xs p-1.5 px-4 rounded-md">
              🟠 = Mellan tillgänglighet
            </span>
            <span className="bg-secondary-foreground text-white text-xs p-1.5 px-4 rounded-md">
              🔴 = Dålig tillgänglighet
            </span>
            <span className="bg-secondary-foreground text-white text-xs p-1.5 px-4 rounded-md">
              ⚫ = Ingen information
            </span>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-6">
            {placeData.wheelchair! >= 0 ? (
              <Card className="p-4 flex flex-col  items-center justify-center">
                {renderIcon("Wheelchair")}
                <h3 className="font-semibold text-sm">
                  {translateKey("Wheelchair")}
                </h3>

                <div className="mt-4 flex gap-4">
                  <div className="flex items-center gap-4">
                    {placeData.wheelchairUpvotes}

                    <Button
                      variant="default"
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleUpvote}
                    >
                      <ArrowUpIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleDownvote}
                    >
                      <ArrowDownIcon className="h-4 w-4" />
                    </Button>
                    {placeData.wheelchairDownvotes}
                  </div>
                </div>
              </Card>
            ) : null}
            {placeData.dogFriendly! >= 0 ? (
              <Card className="p-4 flex flex-col  items-center justify-center">
                {renderIcon("DogFriendly")}
                <h3 className="font-semibold text-sm">
                  {translateKey("DogFriendly")}
                </h3>

                <div className="mt-4 flex gap-4">
                  <div className="flex items-center gap-4">
                    {placeData.dogFriendlyUpvotes}

                    <Button
                      variant="default"
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleUpvote}
                    >
                      <ArrowUpIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleDownvote}
                    >
                      <ArrowDownIcon className="h-4 w-4" />
                    </Button>
                    {placeData.dogFriendlyDownvotes ?? 0}
                  </div>
                </div>
              </Card>
            ) : null}{" "}
          </div>
        </Card>
      </div>
      <div className="">
        <Card className="p-6 w-96 h-full justify-between flex flex-col ">
          <div className="bg-secondary rounded-md p-4">Random Comment</div>
          <div className="bg-muted p-4 rounded-md">Input to write comment</div>
        </Card>
      </div>
    </div>
  );
}
