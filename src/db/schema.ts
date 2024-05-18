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
  website: text("website"),
  photo: text("photo"),

  wheelchair: integer("wheelchair"),
  wheelchairUpvotes: integer("wheelchair_upvotes").default(0),
  wheelchairDownvotes: integer("wheelchair_downvotes").default(0),

  perfume: integer("perfume"),
  perfumeUpvotes: integer("perfume_upvotes").default(0),
  perfumeDownvotes: integer("perfume_downvotes").default(0),

  volume: integer("volume"),
  volumeUpvotes: integer("volume_upvotes").default(0),
  volumeDownvotes: integer("volume_downvotes").default(0),

  languages: integer("languages"),
  languagesUpvotes: integer("languages_upvotes").default(0),
  languagesDownvotes: integer("languages_downvotes").default(0),

  elevationDifference: integer("elevationDifference"),
  elevationDifferenceUpvotes: integer("elevationDifference_upvotes").default(0),
  elevationDifferenceDownvotes: integer(
    "elevationDifference_downvotes"
  ).default(0),

  nuts: integer("nuts"),
  nutsUpvotes: integer("nuts_upvotes").default(0),
  nutsDownvotes: integer("nuts_downvotes").default(0),

  auditoryLoop: integer("auditoryLoop"),
  auditoryLoopUpvotes: integer("auditoryLoop_upvotes").default(0),
  auditoryLoopDownvotes: integer("auditoryLoop_downvotes").default(0),

  signLanguage: integer("signLanguage"),
  signLanguageUpvotes: integer("signLanguage_upvotes").default(0),
  signLanguageDownvotes: integer("signLanguage_downvotes").default(0),

  smoke: integer("smoke"),
  smokeUpvotes: integer("smoke_upvotes").default(0),
  smokeDownvotes: integer("smoke_downvotes").default(0),

  dogFriendly: integer("dogFriendly"),
  dogFriendlyUpvotes: integer("dogFriendly_upvotes").default(0),
  dogFriendlyDownvotes: integer("dogFriendly_downvotes").default(0),

  carpet: integer("carpet"),
  carpetUpvotes: integer("carpet_upvotes").default(0),
  carpetDownvotes: integer("carpet_downvotes").default(0),
});
