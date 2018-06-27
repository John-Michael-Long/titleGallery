DROP TABLE IF EXISTS "listing_data";

CREATE TABLE "listing_data" (
 "id" serial PRIMARY KEY,
 "listing_id" integer NOT NULL,
 "main_image" character varying(15) NOT NULL,
 "price" numeric NOT NULL,
 "title" character varying(50) NOT NULL,
 "description" character varying(150) NOT NULL,
 "location" character varying(50) NOT NULL,
 "reviews_str" character varying(250) NOT NULL,
 "date_submitted" character varying(50) NOT NULL,
 "rating" numeric NOT NULL,
 "thumbnail_count" integer NOT NULL,
 "thumbnail_set" integer NOT NULL,
 "host_id" integer REFERENCES "host_data"("id")
 )

--psql -U johnm.long -d listings_db -a -f create_listings_data.sql