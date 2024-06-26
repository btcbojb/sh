CREATE TABLE IF NOT EXISTS "places" (
	"id" uuid DEFAULT gen_random_uuid(),
	"placeId" text NOT NULL,
	"name" text NOT NULL,
	"website" text,
	"photo" text,
	"wheelchair" integer,
	"wheelchair_upvotes" integer DEFAULT 0,
	"wheelchair_downvotes" integer DEFAULT 0,
	"perfume" integer,
	"perfume_upvotes" integer DEFAULT 0,
	"perfume_downvotes" integer DEFAULT 0,
	"volume" integer,
	"volume_upvotes" integer DEFAULT 0,
	"volume_downvotes" integer DEFAULT 0,
	"languages" integer,
	"languages_upvotes" integer DEFAULT 0,
	"languages_downvotes" integer DEFAULT 0,
	"elevationDifference" integer,
	"elevationDifference_upvotes" integer DEFAULT 0,
	"elevationDifference_downvotes" integer DEFAULT 0,
	"nuts" integer,
	"nuts_upvotes" integer DEFAULT 0,
	"nuts_downvotes" integer DEFAULT 0,
	"auditoryLoop" integer,
	"auditoryLoop_upvotes" integer DEFAULT 0,
	"auditoryLoop_downvotes" integer DEFAULT 0,
	"signLanguage" integer,
	"signLanguage_upvotes" integer DEFAULT 0,
	"signLanguage_downvotes" integer DEFAULT 0,
	"smoke" integer,
	"smoke_upvotes" integer DEFAULT 0,
	"smoke_downvotes" integer DEFAULT 0,
	"dogFriendly" integer,
	"dogFriendly_upvotes" integer DEFAULT 0,
	"dogFriendly_downvotes" integer DEFAULT 0,
	"carpet" integer,
	"carpet_upvotes" integer DEFAULT 0,
	"carpet_downvotes" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"uuid2" uuid DEFAULT gen_random_uuid(),
	"name" text,
	"email" text NOT NULL,
	"image_url" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
