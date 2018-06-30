const util = require('util');
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings_db';
const redis = require('redis');
const redisClient = redis.createClient();
const {promisify} = require('util');

redisClient.get = util.promisify(redisClient.get);

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
      callback(null, result)
    });
  });
}


const checkCache = roomId => {
  return redisClient.get(roomId).then( res => {
    return res;
  }).catch( err => console.log('error:', err))
}

// retreives document from DB with selected ID
const getAllImagesUrlsByRoomId = (roomId, callback) => {
  checkCache(roomId).then( res => {
    if(res === null) {
      const queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
      queryDB(queryStr, [roomId], (err, data) => {
        if(err){
          callback(err, null);
        }
        redisClient.set(roomId, JSON.stringify(data.rows),'EX',1200);
        callback(null, data.rows);
      })
    } else {
      callback(null, JSON.parse(res))
    }
  })
};

module.exports = {
  getAllImagesUrlsByRoomId,
};
