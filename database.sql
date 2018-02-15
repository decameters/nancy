CREATE DATABASE nancy;

CREATE TABLE "users"
(
	"id" serial NOT NULL,
	"username" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL UNIQUE,
	"name" varchar NOT NULL,
	"phone" bigint NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY ("id")
);

CREATE TABLE "itinerary_item"
(
	"id" serial NOT NULL,
	"date" DATE NOT NULL,
	"contact_id" int,
	"drivetime" varchar,
	"city_state" varchar NOT NULL,
	"destination" varchar,
	"address" varchar,
	"trip_id" int NOT NULL,
	CONSTRAINT itinerary_item_pk PRIMARY KEY ("id")
);

CREATE TABLE "tripnames"
(
	"id" serial NOT NULL,
	"name" varchar NOT NULL UNIQUE,
	"link" varchar,
	"created_id" int NOT NULL,
	CONSTRAINT tripnames_pk PRIMARY KEY ("id")
);

CREATE TABLE "locations"
(
	"id" serial NOT NULL,
	"name" varchar NOT NULL UNIQUE,
	"address" varchar,
	"phone" bigint NOT NULL,
	"city_state" varchar,
	CONSTRAINT locations_pk PRIMARY KEY ("id")
);

CREATE TABLE "contacts"
(
	"id" serial NOT NULL,
	"person" varchar NOT NULL,
	"email" varchar,
	"phone" bigint,
	"created_id" int,
	CONSTRAINT contacts_pk PRIMARY KEY ("id")
);

CREATE TABLE "list_items"
(
	"id" serial NOT NULL,
	"name_id" int NOT NULL,
	"item" varchar NOT NULL,
	"quantity" int,
	"is_packed" BOOLEAN NOT NULL,
	CONSTRAINT list_items_pk PRIMARY KEY ("id")
);

CREATE TABLE "listnames"
(
	"id" serial NOT NULL,
	"name" varchar NOT NULL UNIQUE,
	"created_id" int,
	CONSTRAINT listnames_pk PRIMARY KEY ("id")
);

CREATE TABLE "trips_shared_with"
(
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"tripnames_id" int NOT NULL,
	CONSTRAINT trips_shared_with_pk PRIMARY KEY ("id")
);

CREATE TABLE "lists_shared_with"
(
	"id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"listnames_id" serial NOT NULL,
	CONSTRAINT lists_shared_with_pk PRIMARY KEY ("id")
);

ALTER TABLE "public"."itinerary_item" ADD CONSTRAINT "itinerary_item_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."tripnames" ("id") ON DELETE CASCADE;
ALTER TABLE "itinerary_item" ADD CONSTRAINT "itinerary_item_fk2" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id");

ALTER TABLE "tripnames" ADD CONSTRAINT "tripnames_fk0" FOREIGN KEY ("created_id") REFERENCES "users"("id");

ALTER TABLE "public"."list_items" ADD CONSTRAINT "list_items_name_id_fkey" FOREIGN KEY ("name_id") REFERENCES "public"."listnames" ("id") ON DELETE CASCADE;

ALTER TABLE "listnames" ADD CONSTRAINT "listnames_fk0" FOREIGN KEY ("created_id") REFERENCES "users"("id");

ALTER TABLE "trips_shared_with" ADD CONSTRAINT "trips_shared_with_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "trips_shared_with" ADD CONSTRAINT "trips_shared_with_fk1" FOREIGN KEY ("tripnames_id") REFERENCES "tripnames"("id");

ALTER TABLE "lists_shared_with" ADD CONSTRAINT "lists_shared_with_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "lists_shared_with" ADD CONSTRAINT "lists_shared_with_fk1" FOREIGN KEY ("listnames_id") REFERENCES "listnames"("id");

ALTER TABLE "contacts" ADD CONSTRAINT "contacts_fk0" FOREIGN KEY ("created_id") REFERENCES "users"("id");





