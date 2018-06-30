
-- ALTER TABLE "listing_data" DROP CONSTRAINT IF EXISTS "listing_data_fk0";

-- ALTER TABLE "listing_data" DROP CONSTRAINT IF EXISTS "listing_data_fk1";

-- ALTER TABLE "reviews" DROP CONSTRAINT IF EXISTS "reviews_fk0";

-- DROP TABLE IF EXISTS "host_data";

-- DROP TABLE IF EXISTS "imagedata";

-- DROP TABLE IF EXISTS "listing_data";

-- DROP TABLE IF EXISTS "reviews";


-- begin;

-- alter table listing_data
-- drop constraint host_id_fkey;

-- alter table listing_data
-- add constraint "listing_data_host_id_fkey" 
-- foreign key (host_id)
-- references host_data(id)
-- on delete cascade;

-- commit;

-- https://til.hashrocket.com/posts/07139c566b-add-on-delete-cascade-to-foreign-key-constraint


-- "listing_data_host_id_fkey" FOREIGN KEY (host_id) REFERENCES host_data(id)


-- Table "public.listing_data"
--      Column      |          Type          | Collation | Nullable |                 Default
-- -----------------+------------------------+-----------+----------+------------------------------------------
--  id              | integer                |           | not null | nextval('listing_data_id_seq'::regclass)
--  listing_id      | integer                |           | not null |
--  main_image      | character varying(15)  |           | not null |
--  price           | numeric                |           | not null |
--  title           | character varying(50)  |           | not null |
--  description     | character varying(150) |           | not null |
--  location        | character varying(50)  |           | not null |
--  reviews_str     | character varying(250) |           | not null |
--  date_submitted  | character varying(50)  |           | not null |
--  rating          | numeric                |           | not null |
--  thumbnail_count | integer                |           | not null |
--  thumbnail_set   | integer                |           | not null |
--  host_id         | integer                |           |          |
-- Indexes:
--     "listing_data_pkey" PRIMARY KEY, btree (id)
-- Foreign-key constraints:
--     "listing_data_host_id_fkey" FOREIGN KEY (host_id) REFERENCES host_data(id)
-- Referenced by:
--     TABLE "reviews_data" CONSTRAINT "reviews_data_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES listing_data(id)