const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings_db';



const insertReviewsData = function() {
  let queryStr = "COPY reviews_data (listing_id, user_id, date_submitted, rating, review)" +
  " FROM '/Users/johnm.long/Documents/SystemDesignCapstone/titleGallery/dataGeneration/reviewsData_25M.csv' WITH DELIMITER ','"

//~"+ __dirname + "
  console.log('query:', queryStr)
  console.time('insert-reviews')
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
    query.on('end', () => { 
      console.timeEnd('insert-reviews')
      client.end(); 

    });
  });
}

insertReviewsData()

