import { NextRequest, NextResponse } from "next/server";
import { placeTable } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { place: string } }
) {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  const data = await db
    .select()
    .from(placeTable)
    .where(eq(placeTable.placeId, params.place as string));

  console.log(params.place, data[0].placeId);
  return NextResponse.json(data);
}
