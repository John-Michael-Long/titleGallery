const util = require('util');
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings_db';
const redis = require('redis');
const redisClient = redis.createClient();
const {promisify} = require('util');

redisClient.get = util.promisify(redisClient.get);
redisClient.del = util.promisify(redisClient.del);
redisClient.exists = util.promisify(redisClient.exists);

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
      let queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
      queryDB(queryStr, [roomId], (err, data) => {
        if(err){
          callback(err, null);
        }
        redisClient.set(roomId, JSON.stringify(data.rows),'EX',1200);
        console.log('getAllImagesUrlsByRoomId: NEW DATA:', data.rows)
        callback(null, data.rows);
      })
    } else {
      callback(null, JSON.parse(res))
    }
  })
};


const insertImageIntoDB = (roomId, params, callback) => {

  //get thumbnail set
  let queryStr = 'SELECT * FROM listing_data WHERE id = $1'
  queryDB(queryStr, [roomId], (err, data) => {
    if(err) {
     return console.log(err) 
    }
    console.log('image_set:', data.rows[0].thumbnail_set)
    console.log('image_count:', data.rows[0].thumbnail_count)
    
    let image_set = data.rows[0].thumbnail_set;
    let thumbnail_id = data.rows[0].thumbnail_count + 1;

    let qParams = [
                  222222, 
                  image_set,
                  thumbnail_id, 
                  image_set + 'home' + thumbnail_id, 
                  0, 
                  1111];  

    //Update listing (thumbnail_count)
    let queryStr = 'UPDATE listing_data SET thumbnail_count = thumbnail_count + 1 WHERE id = $1'
    queryDB(queryStr, [roomId], (err, data) => {
      if(err) {
        callback(err, null);
      }
      console.log('updated listing', data);
      let queryStr = `INSERT INTO image_data (entry_id, image_set, thumbnail_id, img_file_name, likes, submitter_id) VALUES ($1, $2, $3, $4, $5, $6)`
      queryDB(queryStr, qParams, (err, data) => {
        if(err) {
          callback(err, null);
        }
        //UPDATE REDIS
        console.log('successfully inserted:',  data)

        redisClient.del(roomId).then( res => {
          getAllImagesUrlsByRoomId(roomId, (err, data) => {
            if(err) {
              console.log('err:', err)
            }
            console.log('new data:', data);
            callback(null, data)
          })
        })
      })
    })
  })
}

// const getAllImagesUrlsByRoomId = (roomId, callback) => {

//   const queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
//   queryDB(queryStr, [roomId], (err, data) => {
//     if(err){
//       callback(err, null);
//       return;
//     }
//     callback(null, data.rows)
//   })
// };

module.exports = {
  getAllImagesUrlsByRoomId,
  insertImageIntoDB
};
