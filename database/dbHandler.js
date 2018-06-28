const util = require('util');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings_db';

const queryDB = (queryStr, roomId, callback) => {
  console.log('query:', queryStr)

  pg.connect(connectionString, (err, client, done) => {
  // Handle connection errors
    if(err) {
      done();
      console.log('connection error:', err);
      return;
    }
    
    console.log('query:', queryStr)
    const query = client.query(queryStr, roomId, (err, result) => {
      if(err) {
        console.log('query error:', err)
        callback(err, null)
        return;
      } 
      console.log('query success')
      callback(null, result)
    })
    query.on('end', () => { client.end(); });
  });
}


// const insertImagesUrls = async (data) => {
//   try {
//     await connection.query('INSERT INTO photos (roomImageUrls) VALUES ?', [data]);
//     return Promise.resolve();
//   } catch (err) {
//     throw err;
//   }
// };

// retreives document from DB with selected ID
const getAllImagesUrlsByRoomId = (roomId, callback) => {

  const queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
    //const data = (await response).map(row => Object.assign({}, row));
    //NOTE: data: [ {id: 3, roomImageUrls: "long string"} ]
  queryDB(queryStr, [roomId], (err, data) => {
    if(err){
      console.log('error:', err);
      callback(err, null)
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
