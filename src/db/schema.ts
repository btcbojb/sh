import { sql } from "drizzle-orm";
import { integer, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid("uuid2").default(sql`gen_random_uuid()`),
  name: text("name"),
  email: text("email").unique().notNull(),
  imageUrl: text("image_url"),
});

export const placeTable = pgTable("places", {
  id: uuid("id").default(sql`gen_random_uuid()`),
  placeId: text("placeId").notNull(),
  name: text("name").notNull(),
  // website: text("website"),
  // lat: text("lat"),
  // lng: text("lng"),
  // photo: text("photo"),
  wheelchair: integer("wheelchair"),
  perfume: integer("perfume"),
  volume: integer("volume"),
  languages: integer("languages"),
  elevationDifference: integer("elevationDifference"),
  nuts: integer("nuts"),
  auditoryLoop: integer("auditoryLoop"),
  signLanguage: integer("signLanguage"),
  smoke: integer("smoke"),
  dogFriendly: integer("dogFriendly"),
  carpet: integer("carpet"),
});
