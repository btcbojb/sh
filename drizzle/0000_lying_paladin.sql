CREATE TABLE IF NOT EXISTS "places" (
	"id" uuid DEFAULT gen_random_uuid(),
	"placeId" text NOT NULL,
	"name" text NOT NULL,
	"wheelchair" integer,
	"perfume" integer,
	"volume" integer,
	"languages" integer,
	"elevationDifference" integer,
	"nuts" integer,
	"auditoryLoop" integer,
	"signLanguage" integer,
	"smoke" integer,
	"dogFriendly" integer,
	"carpet" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"uuid2" uuid DEFAULT gen_random_uuid(),
	"name" text,
	"email" text NOT NULL,
	"image_url" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
