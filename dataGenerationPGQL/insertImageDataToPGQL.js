//const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://18.220.20.69:5432/listings_db';
//'postgres://localhost:5432/listings_db';
//18.220.20.69
//const generateHost = './dataGenerator.js'

//const util = require('util');
const { Client } = require('pg');
//const {promisify} = require('util');

const dbConfig = {
  "host" : "18.217.133.223",
  "database" : "listings_db",
  "user" : "postgres",
 // "password" : "",
  "port" : 5432,
}

// const pool = new Pool(dbConfig);
const client = new Client(dbConfig);

// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err)
//   process.exit(-1)
// })


const insertImageData = function() {
  let fileName = 'imageData.csv';
  let queryStr = "COPY image_data (entry_id, image_set, thumbnail_id, img_file_name, likes, submitter_id)" +
  " FROM '/Users/johnm.long/Documents/SystemDesignCapstone/titleGallery/dataGenerationPGQL/imageData.csv' WITH DELIMITER ',' "

//~"+ __dirname + "
  console.log('query:', queryStr)
  client.connect()

  client.query(queryStr, (err, result) => {
    if(err){
      console.log('insert err:', err)
    } else {
      console.log('saved to DB')
    }
  });

}

insertImageData()
