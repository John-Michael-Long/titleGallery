
DROP KEYSPACE IF EXISTS listings_db;
CREATE KEYSPACE IF NOT EXISTS listings_db with replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE listings_db;

CREATE TYPE IF NOT EXISTS host_data (
    first_name text,
    last_name text,
    email text,
    phone_number text,
    street text,
    city text,
    state text,
    zip text
);

CREATE TYPE IF NOT EXISTS reviews_data (
    id INT,
    user_id INT,
    date_submitted text,
    rating INT,
    review text
);


CREATE TYPE IF NOT EXISTS image_data (
    id INT,
    image_set INT,
    thumbnail_id INT,
    img_file_name text,
    likes INT,
    submitter_id INT
);

CREATE TABLE IF NOT EXISTS listing_data (
    id INT PRIMARY KEY,
    main_image text,
    price decimal,
    title text,
    description text,
    location text,
    reviews_str text,
    date_submitted text,
    rating INT,
    thumbnail_count INT,
    thumbnail_set INT,
    host_data frozen <host_data>,
    image_data set<frozen <image_data>>,
    reviews_data set<frozen <reviews_data>>
);





-- cqlsh -f createSchema.sql -k listings_db


