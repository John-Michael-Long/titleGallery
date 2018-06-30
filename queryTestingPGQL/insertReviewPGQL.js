const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings_db';
const loremIpsum = require('lorem-ipsum');

console.time('insert-review')


const generateReviewEntry = () => {

  function randomDate() {
    month = Math.floor(Math.random() * 12) + 1;
    day = Math.floor(Math.random() * 30) + 1;
    year = 2012 + Math.floor(Math.random() * 6) + 1
    return (month + "/" + day + "/" + year);
  }

  let reviewData = {
    listing_id: Math.floor(Math.random() * 10000000)+1,
    user_id: Math.floor(Math.random() * 1000000)+1,
    data_submitted: randomDate(),
    rating: 1 + Math.floor(Math.random() * 100),
    review: loremIpsum({
      count: 1                      // Number of words, sentences, or paragraphs to generate.
    , units: 'paragraphs'            // Generate words, sentences, or paragraphs.
    , sentenceLowerBound: 5         // Minimum words per sentence.
    , sentenceUpperBound: 10        // Maximum words per sentence.
    , paragraphLowerBound: 5        // Minimum sentences per paragraph.
    , paragraphUpperBound: 10        // Maximum sentences per paragraph.
    , format: 'plain' 
    })
  }
  if(reviewData.review.length > 500){
    reviewData.review = reviewData.review.substring(0,500)
  }
  return ( `'${reviewData.listing_id}','${reviewData.user_id}','${reviewData.data_submitted}','${reviewData.rating}','${reviewData.review}'`) 
}
//LISTING: listing_id,main_image,price,title,description,location,reviews_str,date_submitted,rating,thumbnail_count,thumbnail_set,host_id
const queryTest = function() {
//INSERT 
//insert into listings

//let queryStr = `INSERT INTO reviews_data (listing_id,user_id,date_submitted,rating,review)`+
` VALUES (${generateReviewEntry()})`

 //let queryStr = `UPDATE reviews_data SET review = 'just updated this review', user_id = 500000 WHERE id = 2`;
 // let queryStr = `SELECT * FROM reviews_data WHERE id = 910000;`
             //    ` AND image_data.image_set = listing_data.thumbnail_set AND host_data.id = image_data.submitter_id;`
//let queryStr =   'DELETE FROM reviews_data WHERE id = 2;'

let queryStr = `SELECT * FROM reviews_data`;

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
          console.log('result:', result.rows)
        }
      })
    query.on('end', () => { 
      console.timeEnd('insert-review')
      client.end(); 
    });
  });
}
//queryListingData()

queryTest()


// -- INVESTIGATE:
// -- POSTGRES EXPLAIN ANALYE
// -- INDEXING 

// -- CASSANDRA LOADER



// --QUERIES:
// -- GET LISTING (LAST 10%)
// -- GET HOST FROM LISTING
// -- GET IMAGES FROM LISTING (MAY NEED JOIN TABLE)
// -- GET ALL REVIEWS FROM LISTING
