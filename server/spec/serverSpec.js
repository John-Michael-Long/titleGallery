const server = require('../index.js');
const expect = require('chai').expect;
const stubs = require('./Stubs');
const request = require('request'); 
const express = require('express');
const { Pool } = require('pg');
const util = require('util');
const redis = require('redis');
const redisClient = redis.createClient();
const axios = require('axios');

redisClient.get = util.promisify(redisClient.get);
redisClient.del = util.promisify(redisClient.del);
redisClient.exists = util.promisify(redisClient.exists);

//TODO: 
  //CONVERT TO PROMISES
  //'Should send back parsable stringified JSON'
  //'Should send back an object'
  //'Should send an object containing a `results` array'
  //'Should accept posts to /classes/messages'
  //'Should respond with messages that were previously posted'
  //'Should 404 when asked for a nonexistent file'
  //INSERT DATA INTO DB THEN RETREIVE
  //INSERT DATA THEN DELETE OR JUST DELETE RANDOM ENTRY??
  //INSERT DATA THEN UPDATE 
  //
  //SHOULD STORE IN REDIS
  //SHOULR RESPOND with a 200 status code and return image data set from DB

const dbConfig = {
  "host" : "localhost",
  "user" : "johnm.long",
  "database" : "listings_db",
  "port" : 5432
}

const pool = new Pool(dbConfig);
pool.connect = util.promisify(pool.connect);

// const queryDB = (queryStr, roomId, callback) => {
//  pool.connect( (err, client, done) => {
//     // Handle connection errors
//     if(err){ throw err; }
//     client.query(queryStr, roomId, (err, result) => {
//       done()
//       if(err) {
//         console.log('query error:', err)
//         callback(err, null)
//         return;
//       } 
//       callback(null, result)
//     });
//   });
// }

const removeFromRedis = async (roomId) => {
  if (await redisClient.exists(roomId) ) {
    console.log('yes does exist!')
    await redisClient.del(roomId)
  }
}


const queryDbAsync = async (queryStr, roomId) => {
  try{
    client = await pool.connect();
    client.query = util.promisify(client.query); 
    return client.query(queryStr, roomId);
  } catch (err) {throw err}
}

describe('Express Node Server Requst Listener', function() {

  describe('Server GET requests', function() {

    // it('Should send back parsable stringified JSON'){
    //   let roomId = 9100121;
    //   let queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
    // };
    //it('Should send an object containing a `results` array'){};

    it('Should 404 when asked for a nonexistent file', async function() {
      let roomId = 19000000 
      let queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
      //let serverData = await axios.get('http://127.0.0.1:3005/headerphotos/' + roomId);

      //console.log('serverData:', serverData)
      //expect(serverData.status).to.equal(404);

     //  console.log('serverData:', serverData)
     // then( serverData => {
     //    console.log('serverData:', serverData);
     //    serverData = serverData.data;
     //    console.log('serverData:', serverData);
     //    expect(serverData[0].id).to.equal(roomId)
     //    expect(serverData).to.deep.equal(dbData);
     //  });
     // waitForThen(
     //  function() { return serverData.ended; },
     //  function() {
     //    expect(serverData.status).to.equal(404);
     //  });
    });

    it('Should store in redis after first retreival', async function() {
      let roomId = 1 + Math.floor(Math.random() * 10000000);
      let queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
      await removeFromRedis(roomId);
      let serverData = await axios.get('http://127.0.0.1:3005/headerphotos/' + roomId);
      serverData = serverData.data;
      let redisData = await redisClient.get(roomId);
      redisData = JSON.parse(redisData)
      expect(redisData).to.not.equal(null);
      expect(redisData[0].id).to.equal(roomId)
      expect(redisData).to.deep.equal(serverData);
    });

    it('Should answer GET requests for /headerphotos/:roomId by returning the corresponding image data set ', async function() {
      let roomId = 1 + Math.floor(Math.random() * 10000000);
      let queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
      let dbData = await queryDbAsync(queryStr, [roomId]);
      dbData = dbData.rows;
      let serverData = await axios.get('http://127.0.0.1:3005/headerphotos/' + roomId);
      serverData = serverData.data;

      expect(serverData[0].id).to.equal(roomId)
      expect(serverData).to.deep.equal(dbData);
    });
  });

  describe('Server POST request', async function() {

    it('Should accept posts to /headerphotos/:roomId', async function() {
      let entry_id = 10000000 + Math.floor(Math.random() * 1000000);
      let submitter_id = 1000 + Math.floor(Math.random() * 1000);
      let roomId = 1 + Math.floor(Math.random() * 10000000);
      let queryStr = 'http://127.0.0.1:3005/headerphotos/' + roomId;
      
      //POST DATA TO SERVER
      let serverRes = await axios.post(queryStr, {"entry_id": entry_id, "submitter_id": submitter_id} );

      //GET DATA FROM DB
      let dbQuery = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
      let dbData = await queryDbAsync(dbQuery, [roomId]);
      dbData = dbData.rows;

      expect(serverRes.status).to.equal(201);
      expect(serverRes.statusText).to.equal("Created");
      expect(serverRes.data).to.deep.equal(dbData);
    });

    //it('Should store listing data in Redis when listing/image data is requsted'){};
    //it('Should respond with messages that were previously posted'){};

    it('Should update Redis after posting image data', async function() {
      let entry_id = 10000000 + Math.floor(Math.random() * 1000000);
      let submitter_id = 1000 + Math.floor(Math.random() * 1000);
      let roomId = 1 + Math.floor(Math.random() * 10000000);
      let queryStr = 'http://127.0.0.1:3005/headerphotos/' + roomId;

      //GET REQUEST TO SERVER TO POPULATE REDIS
      let serverData = await axios.get(queryStr);
      let originalImgCount = serverData.data[0].thumbnail_count;

      //POST DATA TO SERVER
      let serverRes = await axios.post(queryStr, {"entry_id": entry_id, "submitter_id": submitter_id} );
      let serverImgCount = serverData.data[0].thumbnail_count;

      //GET DATA FROM REDIS, COMPARE COUNT TO 
      let redisData = await redisClient.get(roomId);
      redisData = JSON.parse(redisData)
      let redisImgCount = redisData[0].thumbnail_count;

      expect(serverImgCount).to.equal(originalImgCount)
      expect(redisImgCount).to.equal(serverImgCount + 1)
    })
  })
});