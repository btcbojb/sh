import { NextRequest, NextResponse } from "next/server";
import { placeTable } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const dbconnect = neon(process.env.DATABASE_URL!);
  const db = drizzle(dbconnect);

  const place = await request.json();

  const prevUpvoteCount = await db
    .select()
    .from(placeTable)
    .where(eq(placeTable.placeId, place as string));

  const hi = await db
    .update(placeTable)
    .set({
      wheelchairUpvotes: prevUpvoteCount[0].wheelchairUpvotes! + 1,
    })
    .where(eq(placeTable.placeId, place));

  return NextResponse.json({});
}
