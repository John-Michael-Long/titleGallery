ALTER TABLE "imagedata" DROP CONSTRAINT IF EXISTS "imagedata_fk0";

ALTER TABLE "listing_data" DROP CONSTRAINT IF EXISTS "listing_data_fk0";

ALTER TABLE "listing_data" DROP CONSTRAINT IF EXISTS "listing_data_fk1";

ALTER TABLE "reviews" DROP CONSTRAINT IF EXISTS "reviews_fk0";

DROP TABLE IF EXISTS "host_data";

DROP TABLE IF EXISTS "imagedata";

DROP TABLE IF EXISTS "listing_data";

DROP TABLE IF EXISTS "reviews";
