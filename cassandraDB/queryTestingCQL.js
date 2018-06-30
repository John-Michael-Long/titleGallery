const generateData = require('./generateData.js')
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'listings_db' });

/*
const query = `COPY listing_data (id,main_image,price,title,description,location,reviews_str,date_submitted,rating,thumbnail_count,thumbnail_set,host_data,image_data,reviews_data)`+
    `FROM 'listingData.csv' WITH DELIMITER ',' ;`

*/

const queryDB = () => {
    console.time('query-database');

     const listingsData = generateData.generateListing();

    // const query = `INSERT INTO listing_data (id, main_image,price,title,description,location,reviews_str,date_submitted,rating,thumbnail_count,thumbnail_set,host_data,image_data,reviews_data) `+
    //             `VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    // const params = [
    // 10000005,
    // listingData.main_image,
    // listingData.price,
    // listingData.title1,
    // 'INSERTED VALUE INTO DB!!!',
    // listingData.location,
    // listingData.reviews_str,
    // listingData.dateSubmitted,
    // listingData.rating,
    // listingData.thumbnailCount,
    // listingData.thumbnailSet,
    // listingData.host_data,
    // listingData.image_data,
    // listingData.reviews_data]

    client.execute(query)
    //client.execute(query, params, { prepare: true })
    .then(function(results) {
        console.timeEnd('query-database')
        console.log('SUCCESS');
       // console.log('number of entries returned:', results.rows.length)
        console.log('results:', results)
        return;
    })
    .catch(function(err){
        console.log('error in batch:', err)
    })
}

// const query = `SELECT * FROM listings_db.listing_data `+
// `WHERE id = 9500005`

// const query = `SELECT * FROM listings_db.listing_data `+
// `WHERE location = 'Paris' LIMIT 25 ALLOW FILTERING`

//const query = `UPDATE listings_db.listing_data `+
//`SET description = 'UPDATED THE DESCRIPTION' WHERE id = 9500002`

// const query = `UPDATE listings_db.listing_data `+
// `SET rating = 90 WHERE id = 9500003`

// const query = `INSERT INTO listing_data (id,main_image,price,title,description,location,reviews_str,date_submitted,rating,thumbnail_count,thumbnail_set,host_data,image_data,reviews_data) `+
//                 `VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

// const query = `DELETE FROM listings_db.listing_data `+
// `WHERE id = 9500005`

queryDB(query)
