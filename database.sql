-- CREATE TABLE "users" (
-- 	"id" serial PRIMARY KEY NOT NULL,
-- 	"username" varchar NOT NULL UNIQUE,
-- 	"password" varchar NOT NULL,
-- 	"first_name" varchar NOT NULL,
-- 	"last_name" varchar NOT NULL,
-- 	"phone" bigint NOT NULL
-- );



-- CREATE TABLE "itinerary_item" (
-- 	"id" serial PRIMARY KEY NOT NULL,
-- 	"tripname_id" int NOT NULL,
-- 	"date" DATE NOT NULL,
-- 	"location_id" int NOT NULL,
-- 	"contact_id" int NOT NULL
-- );



-- CREATE TABLE "tripnames" (
-- 	"id" serial PRIMARY KEY NOT NULL,
-- 	"name" varchar NOT NULL UNIQUE,
-- 	"created_id" varchar NOT NULL
-- );



CREATE TABLE "locations" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL UNIQUE,
	"address" varchar,
	"phone" int(11),
	CONSTRAINT locations_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "contacts" (
	"id" serial NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" int(11) NOT NULL,
	CONSTRAINT contacts_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "list_items" (
	"id" serial NOT NULL,
	"name_id" int NOT NULL,
	"item" varchar NOT NULL,
	"quantity" int,
	"is_packed" BOOLEAN NOT NULL,
	CONSTRAINT list_items_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "listnames" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL UNIQUE,
	"created_id" int NOT NULL UNIQUE,
	CONSTRAINT listnames_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "trips_shared_with" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"tripnames_id" int NOT NULL,
	CONSTRAINT trips_shared_with_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "lists_shared_with" (
	"id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"listnames_id" serial NOT NULL,
	CONSTRAINT lists_shared_with_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "itinerary_item" ADD CONSTRAINT "itinerary_item_fk0" FOREIGN KEY ("tripname_id") REFERENCES "tripnames"("id");
ALTER TABLE "itinerary_item" ADD CONSTRAINT "itinerary_item_fk1" FOREIGN KEY ("location_id") REFERENCES "locations"("id");
ALTER TABLE "itinerary_item" ADD CONSTRAINT "itinerary_item_fk2" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id");

ALTER TABLE "tripnames" ADD CONSTRAINT "tripnames_fk0" FOREIGN KEY ("created_id") REFERENCES "users"("id");



ALTER TABLE "list_items" ADD CONSTRAINT "list_items_fk0" FOREIGN KEY ("name_id") REFERENCES "listnames"("id");

ALTER TABLE "listnames" ADD CONSTRAINT "listnames_fk0" FOREIGN KEY ("created_id") REFERENCES "users"("id");

ALTER TABLE "trips_shared_with" ADD CONSTRAINT "trips_shared_with_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "trips_shared_with" ADD CONSTRAINT "trips_shared_with_fk1" FOREIGN KEY ("tripnames_id") REFERENCES "tripnames"("id");

ALTER TABLE "lists_shared_with" ADD CONSTRAINT "lists_shared_with_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "lists_shared_with" ADD CONSTRAINT "lists_shared_with_fk1" FOREIGN KEY ("listnames_id") REFERENCES "listnames"("id");

