const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings_db';
const generateHost = './dataGenerator.js'

const insertImageData = function() {
  let fileName = 'imageData.csv';
  let queryStr = "COPY image_data (entry_id, image_set, thumbnail_id, img_file_name, likes, submitter_id)" +
  " FROM '/Users/johnm.long/Documents/SystemDesignCapstone/titleGallery/database/imageData.csv' WITH DELIMITER ',' CSV HEADER"

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

insertImageData()


//COPY image_data (entry_id, image_set, thumbnail_id, img_file_name, likes, submitter_id) FROM Users/johnm.long/Documents/SystemDesignCapstone/titleGallery/databaseimageData.csv WITH DELIMITER ',' CSV HEADER;

// let createHostDataTableQuery = 'CREATE TABLE hostData(id SERIAL PRIMARY KEY, '+
//   'hostID INTEGER not null, ' +
//   'firstName VARCHAR(30) not null, ' + 
//   'lastName VARCHAR(30) not null, ' + 
//   'email VARCHAR(30) not null, ' +
//   'phoneNumber VARCHAR(30) not null, ' + 
//   'street VARCHAR(30) not null, '+
//   'city VARCHAR(30) not null, ' +
//   'state VARCHAR(30) not null, ' +
//   'zip VARCHAR(20) not null)'

// let createImageTableQuery = 'CREATE TABLE image_data (id SERIAL PRIMARY KEY, '+
// 'entry_id INTEGER not null, ' +
// 'image_set INTEGER not null, ' +
// 'thumbnail_id INTEGER not null, ' +
// 'img_filename VARCHAR(30) not null, ' +
// 'likes INTEGER not null, ' +
// 'submitter_id INTEGER REFERENCES hostdata(id))'

// const createImageTable = function(queryStr) {
//   pg.connect(connectionString, (err, client, done) => {
//   // Handle connection errors
//     if(err) {
//       done();
//       console.log('error:', err);
//       return;
//     }

//     const query = client.query(queryStr, (err, result) => {
//         if(err){
//           console.log('insert err:', err)
//         } else {
//           console.log('saved to DB')
//         }
//       })
//     query.on('end', () => { client.end(); });
//   });
// }



