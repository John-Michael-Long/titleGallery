-- CREATE TABLE "host_data" (
-- 	"id" serial NOT NULL,
-- 	"hostid" integer NOT NULL,
-- 	"firstname" character varying(50) NOT NULL,
-- 	"lastname" character varying(50) NOT NULL,
-- 	"email" character varying(100) NOT NULL,
-- 	"phonenumber" character varying(50) NOT NULL,
-- 	"street" character varying(50) NOT NULL,
-- 	"city" character varying(50) NOT NULL,
-- 	"state" character varying(15) NOT NULL,
-- 	"zip" character varying(15) NOT NULL,
-- 	CONSTRAINT host_data_pk PRIMARY KEY ("id")
-- ) WITH (
--   OIDS=FALSE
-- );

CREATE TABLE "image_data" (
	"id" SERIAL PRIMARY KEY,
	"entry_id" integer NOT NULL,
	"image_set" integer NOT NULL,
	"thumbnail_id" integer NOT NULL,
	"img_file_name" character varying(30) NOT NULL,
	"likes" integer NOT NULL,
	"submitter_id" integer REFERENCES "hostdata"("id")
	)

-- CREATE TABLE "image_data" (
-- 	"id" serial PRIMARY KEY,
-- 	"entry_id" integer NOT NULL,
-- 	"image_set" integer NOT NULL,
-- 	"thumbnail_id" integer NOT NULL,
-- 	"img_file_name" character varying(30) NOT NULL,
-- 	"likes" integer NOT NULL,
-- 	"submitter_id" integer NOT NULL,
-- 	CONSTRAINT imagedata_pk PRIMARY KEY ("id")
-- ) WITH (
--   OIDS=FALSE
-- );

--psql -U johnm.long -d listings_db -a -f listings_postgres_create.sql

-- createdb listings_db
 --psql --dbname=listings_db -c "CREATE USER <username> WITH PASSWORD '<password>';"

-- CREATE TABLE "listing_data" (
-- 	"id" serial NOT NULL,
-- 	"listing_id" integer NOT NULL,
-- 	"main_image" character varying(30) NOT NULL,
-- 	"price" character varying(10) NOT NULL,
-- 	"title" character varying(100) NOT NULL,
-- 	"description" character varying(100) NOT NULL,
-- 	"location" character varying(50) NOT NULL,
-- 	"reviews" character varying(50) NOT NULL,
-- 	"date_submitted" DATE(50) NOT NULL,
-- 	"rating" float4 NOT NULL,
-- 	"thumbnail_count" integer NOT NULL,
-- 	"thumbnail_set" integer NOT NULL,
-- 	"host_id" integer NOT NULL,
-- 	CONSTRAINT listing_data_pk PRIMARY KEY ("id")
-- ) WITH (
--   OIDS=FALSE
-- );



-- CREATE TABLE "reviews" (
-- 	"id" serial NOT NULL,
-- 	"review" character varying(250) NOT NULL,
-- 	"listing_ref_id" integer NOT NULL,
-- 	CONSTRAINT reviews_pk PRIMARY KEY ("id")
-- ) WITH (
--   OIDS=FALSE
-- );




-- ALTER TABLE "image_data" ADD CONSTRAINT "imagedata_fk0" FOREIGN KEY ("submitter_id") REFERENCES "host_data"("id");

-- ALTER TABLE "listing_data" ADD CONSTRAINT "listing_data_fk0" FOREIGN KEY ("thumbnail_set") REFERENCES "imagedata"("image_set");
-- ALTER TABLE "listing_data" ADD CONSTRAINT "listing_data_fk1" FOREIGN KEY ("host_id") REFERENCES "host_data"("id");

-- ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("listing_ref_id") REFERENCES "listing_data"("id");

