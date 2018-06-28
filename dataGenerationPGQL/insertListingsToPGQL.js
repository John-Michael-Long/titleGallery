const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings_db';

console.time('insert-listings')

const insertListingData = function() {
  let fileName = 'imageData.csv';
  let queryStr = "COPY listing_data (listing_id,main_image,price,title,description,location,reviews_str,date_submitted,rating,thumbnail_count,thumbnail_set,host_id)" +
  " FROM '/Users/johnm.long/Documents/SystemDesignCapstone/titleGallery/dataGenerationPGQL/listingData.csv' WITH DELIMITER ','"

//~"+ __dirname + "
  console.log('query:', queryStr)
  pg.connect(connectionString, (err, client, done) => {
  // Handle connection errors
    if(err) {
      done();
      console.log('error:', err);
      return;
    }

    const query = client.query(queryStr, (err, result) => {
        if(err){
          console.log('insert err:', err)
        } else {
          console.log('saved to DB')
        }
      })
    query.on('end', () => { client.end(); });
  });
}

insertListingData()

console.timeEnd('insert-listings')