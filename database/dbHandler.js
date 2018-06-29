const util = require('util');
const { Client, Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings_db';

const dbConfig = {
  "host" : "localhost",
  "user" : "johnm.long",
  "database" : "listings_db",
  "port" : 5432
}
const pool = new Pool(dbConfig);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

//const client = new Client(dbConfig);
//client.connect().then( console.log('connected to DB'));  

const queryDB = (queryStr, roomId, callback) => {
 
  pool.connect( (err, client, done) => {
    // Handle connection errors
    if(err){
      console.log('pool connection err:', err)
      return;
    }
    client.query(queryStr, roomId, (err, result) => {
      done()
      if(err) {
        console.log('query error:', err)
        callback(err, null)
        return;
      } 
      console.log('query success')
      callback(null, result)
    });
  });

    // client.query(queryStr, roomId, (err, result) => {
    //   if(err) {
    //     console.log('query error:', err)
    //     callback(err, null)
    //     return;
    //   } 
    //   console.log('query success')
    //   callback(null, result)
    // })
    // .catch((err) =>{
    //   console.log('connection error:', err);
    // })

}

// retreives document from DB with selected ID
const getAllImagesUrlsByRoomId = (roomId, callback) => {

  const queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
  queryDB(queryStr, [roomId], (err, data) => {
    if(err){
      console.log('error:', err);
      callback(err, null);
    }
    console.log('got data')
    callback(null, data.rows);
  })
};

module.exports = {
  // connection,
  // insertImagesUrls,
  getAllImagesUrlsByRoomId,
};
