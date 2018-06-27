CREATE TABLE "image_data" (
	"id" SERIAL PRIMARY KEY,
	"entry_id" integer NOT NULL,
	"image_set" integer NOT NULL,
	"thumbnail_id" integer NOT NULL,
	"img_file_name" character varying(30) NOT NULL,
	"likes" integer NOT NULL,
	"submitter_id" integer NOT NULL 
	)

--REFERENCES "host_data"("id") ON DELETE CASCADE

--psql -U johnm.long -d listings_db -a -f create_image_data.sql
