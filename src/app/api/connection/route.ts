import { NextRequest, NextResponse } from "next/server";
import { placeTable } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  const place = await request.json();

  const placeInDb = await db
    .select()
    .from(placeTable)
    .where(eq(placeTable.placeId, place.place_id || ""));

  if (placeInDb.length >= 1) {
    return NextResponse.json({});
  }

  await db.insert(placeTable).values({
    name: place.name || "",
    placeId: place.place_id,
    // website: "random",
    // lat: place.geometry!.location!.lat().toString(),
    // lng: place.geometry!.location!.lng().toString(),
    // photo: place?.photos?.[0].getUrl() || "",
    wheelchair: 0,
    perfume: 0,
    volume: 0,
    languages: 0,
    elevationDifference: 0,
    nuts: 0,
    auditoryLoop: 0,
    signLanguage: 0,
    smoke: 0,
    dogFriendly: 0,
    carpet: 0,
  });
  return NextResponse.json({});
}
