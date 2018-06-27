const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings_db';
const generateHost = './dataGenerator.js'

const insertImageData = function() {
  let fileName = 'imageData.csv';
  let queryStr = "COPY image_data (entry_id, image_set, thumbnail_id, img_file_name, likes, submitter_id)" +
  " FROM '/Users/johnm.long/Documents/SystemDesignCapstone/titleGallery/dataGeneration/imageData.csv' WITH DELIMITER ',' "

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
