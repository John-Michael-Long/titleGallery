const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings_db';


const insertHostData = function() {
  let queryStr = "COPY host_data (first_name,last_name,email,phone_number,street,city,state,zip)" +
  " FROM '/Users/johnm.long/Documents/SystemDesignCapstone/titleGallery/dataGenerationPGQL/hostData.csv' WITH DELIMITER ','"

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

insertHostData()