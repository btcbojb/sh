import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid("uuid2").default(sql`gen_random_uuid()`),
  name: text("name"),
  email: text("email").unique().notNull(),
  imageUrl: text("image_url"),
});
