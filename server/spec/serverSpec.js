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
//request = util.promisify(request);

//const proxyquire = require('proxyquire');
//const supertest = require('supertest');
//const axios = require('axios');

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
  //SHOULR RESPOD with a 200 status code and return image data set from DB

describe('Express Node Server Requst Listener', function() {

  describe('Server GET requests', function() {

    // it('Should send back parsable stringified JSON'){
    //   let roomId = 9100121;
    //   let queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'

    // };

    //it('Should send an object containing a `results` array'){};
    it('Should 404 when asked for a nonexistent file', async function() {
      let roomId = 19000000;
      let queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'

      //NOTE: SHOULD REQUEST FROM SERVER, NOT DB
     // let dbData = await queryDbAsync(queryStr, [roomId]);
     // console.log('dbData:', dbData)

    });

    it('Should store in redis after first retreival', async function() {
      let roomId = 9100121;
      let queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
      //remove item from redis
      // if (await redisClient.exists(roomId) ) {
      //   console.log('yes does exist!')
      //   await redisClient.del(roomId)
      // }
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
      let roomId = 9100121;
      let queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
      let dbData = await queryDbAsync(queryStr, [roomId]);
      dbData = dbData.rows;
      axios.get('http://127.0.0.1:3005/headerphotos/' + roomId).then( serverData => {
        serverData = serverData.data;
        expect(serverData[0].id).to.equal(roomId)
        expect(serverData).to.deep.equal(dbData);
      });   
    });
        
    // it('Should answer GET requests for /headerphotos/:roomId by returning the corresponding image data set ', function(done) {
    //   let roomId = 9100121;
    //   let queryStr = 'SELECT * FROM image_data INNER JOIN listing_data ON listing_data.id = $1 AND listing_data.thumbnail_set = image_data.image_set'
    //   queryDB(queryStr, [roomId], (err, data) => {
    //     if (err) { throw err; }
    //     let dbData = data.rows;
    //     axios.get('http://127.0.0.1:3005/headerphotos/' + roomId).then( serverData => {
    //       serverData = serverData.data;
    //       expect(serverData[0].id).to.equal(roomId)
    //       expect(serverData).to.deep.equal(dbData);
    //       done();
    //     });   
    //   });
    // });

  });

  // describe('Server POST request', function() {
  //   it('Should accept posts to /headerphotos/:roomId'){};
  //   it('Should respond with messages that were previously posted'){};
  //   it('Should store listing data in Redis when listing/image data is requsted'){};
  //   it('Should update Redis after posting image data'){}
  // })
});


  // it('Should insert posted messages to the DB', function(done) {   
  //   request({
  //     method: 'POST',
  //     uri: 'http://127.0.0.1:3000/classes/users',
  //     json: { username: 'Valjean' }
  //   }, function () {
  //     // Post a message to the node chat server:
  //     request({
  //       method: 'POST',
  //       uri: 'http://127.0.0.1:3000/classes/messages',
  //       json: {
  //         username: 'Valjean',
  //         message: 'In mercy\'s name, three days is all I need.',
  //         roomname: 'Hello'
  //       }
  //     }, function () {
  //       // Now if we look in the database, we should find the posted message there.
  //       var queryString = 'SELECT * FROM messages';
  //       var queryArgs = [];
  //       dbConnection.query(queryString, queryArgs, function(err, results) {
  //         // Should have one result:
  //         expect(results.length).to.equal(1);
  //         expect(results[0].message).to.equal('In mercy\'s name, three days is all I need.');
  //         done();
  //       });
  //     });
  //   });
  // });




//******************************/FROM CHATTERBOX
// describe('Express Server Request Listener Function', function() {
//   beforeEach(function() {
//     //getUserStub
//     app = express();
//     // Get our router module, with a stubbed out users dependency
//     // we stub this out so we can control the results returned by
//     // the users module to ensure we execute all paths in our code
//     route = proxyquire('./routes.js', {
//       './headerphotos': {
//         getByRoomId: getUserStub
//       }
//     });
//     // Bind a route to our application
//     route(app);
//     // Get a supertest instance so we can make requests
//     request = supertest(app);
//   });
//   it('should respond with 200 and a user object', function (done) {
//     var userData = {
//       username: 'nodejs'
//     };
//     getUserStub.returns(userData);
//     request
//       .get('/headerphotos/1000900')
//       .expect('Content-Type', /json/)
//       .expect(200, function (err, res) {
//         expect(res.body).to.deep.equal({
//           status: 'ok',
//           data: userData
//         });
//         done();
//       });
//   });
//   it('Should answer GET requests for /headerphotos/:roomId with a 200 status code', function(done) {
//     // This is a fake server request. Normally, the server would provide this,
//     // but we want to test our function's behavior totally independent of the server code
//     var req = new stubs.request('/headerphotos/12345', 'GET');
//     var res = new stubs.response();
//         request(server)
//         .get('/headerphotos/12345')
//         .expect(200, function(err, res) => {
//           expect(res.body).to.be.an('array').that.is.not.empty;
//         })
//     expect(res._responseCode).to.equal(200);
//     expect(res._ended).to.equal(true);
//   });
// })