DROP TABLE IF EXISTS "reviews_data";

CREATE TABLE "reviews_data" (
 "id" serial PRIMARY KEY,
 "listing_id" integer NOT NULL,
 "user_id" integer NOT NULL,
 "date_submitted" character varying(50) NOT NULL,
 "rating" integer NOT NULL,
 "review" character varying(510) NOT NULL
)

-- REFERENCES "host_data"("id") ON DELETE CASCADE,
-- REFERENCES "listing_data"("id") ON DELETE CASCADE,

--psql -U johnm.long -d listings_db -a -f create_reviews_data.sql
