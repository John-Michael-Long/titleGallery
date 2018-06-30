DROP TABLE IF EXISTS "host_data";

CREATE TABLE "host_data" (
 "id" serial PRIMARY KEY,
 "first_name" character varying(50) NOT NULL,
 "last_name" character varying(50) NOT NULL,
 "email" character varying(70) NOT NULL,
 "phone_number" character varying(50) NOT NULL,
 "street" character varying(50) NOT NULL,
 "city" character varying(50) NOT NULL,
 "state" character varying(15) NOT NULL,
 "zip" character varying(15) NOT NULL
)

--psql -U johnm.long -d listings_db -a -f create_host_data.sql