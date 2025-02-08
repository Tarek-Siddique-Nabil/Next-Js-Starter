CREATE TABLE "account" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"account_id" varchar(256) NOT NULL,
	"provider_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"access_token" varchar(256) NOT NULL,
	"refresh_token" varchar(256) NOT NULL,
	"id_token" varchar(256) NOT NULL,
	"password" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	CONSTRAINT "account_account_id_unique" UNIQUE("account_id")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"ip_address" text NOT NULL,
	"user_agent" text NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "todo" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"status" text DEFAULT 'to-do' NOT NULL,
	"author_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verifaication" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"identifier" varchar(256) NOT NULL,
	"code" varchar(256) NOT NULL,
	"expires_at" timestamp NOT NULL
);
