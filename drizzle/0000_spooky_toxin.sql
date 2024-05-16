CREATE TABLE IF NOT EXISTS "user" (
	"uuid2" uuid DEFAULT gen_random_uuid(),
	"name" text,
	"email" text NOT NULL,
	"image_url" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
