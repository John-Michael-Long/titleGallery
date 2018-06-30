const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings_db';
const loremIpsum = require('lorem-ipsum');
const faker = require('faker');

console.time('insert-listing')

const partOneCount = {
  1000: 8,
  1001: 6,
  1002: 6,
  1003: 6,
  1004: 6,
  1005: 5,
  1006: 6,
  1007: 5,
  1008: 6,
  1009: 6,
  1010: 6,
  1011: 6,
  1012: 6,
  1013: 6,
  1014: 6,
  1015: 6,
  1016: 6,
  1017: 6,
  1018: 6,
  1019: 6,
  1020: 6,
};

const generateListing = () => {
  
  function randomDate() {
    month = Math.floor(Math.random() * 12) + 1;
    day = Math.floor(Math.random() * 30) + 1;
    year = 2012 + Math.floor(Math.random() * 6) + 1
    return (month + "/" + day + "/" + year);
  }

  let locations =  ["Paris", "Rome", "Venice", "Berlin", "Madrid", "Ibiza", "Dublin", "London", "Santorini", "Mykonos", "Panama", "Barcelona", "Cadiz"]
  
  let key = Math.floor( Math.random() * 140) + 1000;
  let imageCount = partOneCount[key] || 6;
  let reviewStr = loremIpsum({
      count: 1                      // Number of words, sentences, or paragraphs to generate.
    , units: 'sentences'            // Generate words, sentences, or paragraphs.
    , sentenceLowerBound: 3         // Minimum words per sentence.
    , sentenceUpperBound:  7      // Maximum words per sentence.
    , format: 'plain'})

  listingData = {
    listing_id: 8, 
    main_image: `${key}home${0}.jpg`,
    price: faker.finance.amount(),
    title: loremIpsum({count: 3, units: 'words', format: 'plain'}),
    description: loremIpsum({count: 1, units: 'sentences', sentenceLowerBound: 3, sentenceUpperBound: 7, format: 'plain'}),
    location: locations[ Math.floor( Math.random() * locations.length ) ],
    reviews_str: reviewStr,
    dateSubmited: randomDate(),
    host: Math.floor( Math.random() * 1000000) + 1,
    rating: Math.floor( Math.random() * 100) + 1,
    thumbnailSet: key,
    thumbnailCount: imageCount
  }

  return (`'${listingData.listing_id}','${listingData.main_image}','${listingData.price}','${listingData.title}','${listingData.description}','${listingData.location}','${listingData.reviews_str}','${listingData.dateSubmited}','${listingData.rating}','${listingData.thumbnailCount}','${listingData.thumbnailSet}','${listingData.host}'`)

}

const queryTest = function() {
//INSERT review

// let queryStr = `INSERT INTO listing_data (listing_id,main_image,price,title,description,location,reviews_str,date_submitted,rating,thumbnail_count,thumbnail_set,host_id)`+
// ` VALUES (${generateListing()})`

//  let queryStr = `DELETE FROM reviews_data WHERE reviews_data.listing_id = 9500001;`
//  let queryStr = `DELETE FROM listing_data WHERE id = ${9000000 + Math.floor(Math.random()*1000000)}`

let queryStr = `UPDATE listing_data SET description = 'updated description!!!' WHERE id = 9900001`

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
      console.timeEnd('insert-listing')
      client.end(); 
    });
  });
}
//queryListingData()

queryTest()


//CREATE INDEX reviews_index ON reviews_data (listing_id)
//CREATE INDEX listing_index ON listing_data (host_id)

//SELECT * FROM listing_data, reviews_data, host_data, image_data WHERE listing_data.id = 9900003 AND image_data.image_set = listing_data.thumbnail_set AND host_data.id = image_data.submitter_id;

//SELECT * FROM listing_data INNER JOIN reviews_data ON listing_data.id = 9900003


//, host_data, image_data WHERE listing_data.id = 9900003 AND image_data.image_set = listing_data.thumbnail_set AND host_data.id = image_data.submitter_id;

