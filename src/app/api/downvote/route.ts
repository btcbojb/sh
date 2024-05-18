import { NextRequest, NextResponse } from "next/server";
import { placeTable } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const dbconnect = neon(process.env.DATABASE_URL!);
  const db = drizzle(dbconnect);
  const place = await request.json();

  const prevDownCount = await db
    .select()
    .from(placeTable)
    .where(eq(placeTable.placeId, place));

  await db
    .update(placeTable)
    .set({
      wheelchairDownvotes: prevDownCount[0].wheelchairDownvotes! + 1,
    })
    .where(eq(placeTable.placeId, prevDownCount[0].placeId));

  return NextResponse.json({});
}
