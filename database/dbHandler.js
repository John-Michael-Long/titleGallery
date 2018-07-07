const util = require('util');
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings_db';
//const redis = require('redis');
//const redisClient = redis.createClient();
const {promisify} = require('util');

// redisClient.get = util.promisify(redisClient.get);
// redisClient.del = util.promisify(redisClient.del);
// redisClient.exists = util.promisify(redisClient.exists);

const dbConfig = {
  "host" : process.env.DB_HOST || "localhost",
  "user" : process.env.DB_USER || "",
  "password" : process.env.DB_PASSWORD || "",
  "database" : "listings_db",
  "port" : process.env.DB_PORT || 5432
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

const queryDbAsync = async (queryStr, roomId) => {
  try{
    client = await pool.connect();
    client.query = util.promisify(client.query); 
    return client.query(queryStr, roomId);
  } catch (err) {throw err}
}


// const checkCache = roomId => {
//   return redisClient.get(roomId).then( res => {
//     return res;
//   }).catch( err => console.log('error:', err))
// }

const formatData = (data) => {
  //NOTE: data is now object: {id: 3, roomImageUrls: "long string of urls"}
  if (data.rows !== undefined) {
    data = data.rows;
  }

  let result = {};
  result.id = data[0].id;
  result.roomImageUrls = [];

  if(data[0].image_set > 1020) {
    imageSet = ((data[0].image_set - 1000) % 20) + 1000
  } else {
    imageSet = data[0].image_set
  }

  for(let i = 0; i < 6; i++) {
    let fileName = imageSet + 'home' + i + '.jpg'
    let imgObj ={
      original: 'https://s3-us-west-1.amazonaws.com/room-and-board-home-pics/'+ fileName, 
      thumbnail: 'https://s3-us-west-1.amazonaws.com/room-and-board-home-pics/'+ fileName
    }
    result.roomImageUrls.push(imgObj)
  }
  return result;
}

// retreives document from DB with selected ID
const getAllImagesUrlsByRoomId = (roomId, callback) => {
  // checkCache(roomId).then( res => {
  //   if(res === null) {
  //     let queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
  //     queryDB(queryStr, [roomId], (err, data) => {
  //       if(err){
  //         callback(err, null);
  //       }
  //       if(data.rows.length !== 0) {
  //       //  redisClient.set(roomId, JSON.stringify(data.rows),'EX',1200);
  //       }
  //       data = formatData(data)
  //       callback(null, data);
  //     })
  //   } else {
  //     data = formatData(JSON.parse(res))
  //     callback(null, data)
  //   }
  // })
      let queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
    queryDB(queryStr, [roomId], (err, data) => {
      if(err){
        callback(err, null);
      }
      if(data.rows.length !== 0) {
        data = formatData(data)
      }
      callback(null, data);
    })
     
};


const insertImageIntoDB = async (roomId, params, callback) => {
  //GET THUMBNAIL SET NUMBER BASED ON ROOM_ID
  let queryStr = 'SELECT * FROM listing_data WHERE id = $1'
  let dbData = await queryDbAsync(queryStr, [roomId]);
  let image_set = dbData.rows[0].thumbnail_set;
  let thumbnail_id = dbData.rows[0].thumbnail_count + 1;
  let entry_id = params.entry_id;
  let submitter_id = params.submitter_id;
  let qParams = [
                  entry_id, 
                  image_set,
                  thumbnail_id, 
                  image_set + 'home' + thumbnail_id + '.jpg', 
                  0, 
                  submitter_id
                ];  

  //INSERT NEW IMAGE DATQ INTO DB
  queryStr = `INSERT INTO image_data (entry_id, image_set, thumbnail_id, img_file_name, likes, submitter_id) VALUES ($1, $2, $3, $4, $5, $6)`
  let dbResponse = await queryDbAsync(queryStr, qParams);

  //UPDATE THUMBNAIL_COUNT
  queryStr = 'UPDATE listing_data SET thumbnail_count = thumbnail_count + 1 WHERE id = $1'
  dbResponse = await queryDbAsync(queryStr, [roomId]);

  //REMOVE OLD DATA FROM REDIS
  //await redisClient.del(roomId);

  getAllImagesUrlsByRoomId(roomId, (err, data) => {
    if(err) {
      console.log('err:', err)
    }
    callback(null, data)
  })
}

module.exports = {
  getAllImagesUrlsByRoomId,
  insertImageIntoDB,
  dbConfig
};
