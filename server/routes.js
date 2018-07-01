const express = require('express');
const db = require('../database/dbHandler');

const router = express.Router();

router.get('/:roomId', (req, res, next) => {
  let roomId = parseInt(req.params.roomId)
  db.getAllImagesUrlsByRoomId(roomId, (err, dbData) => {
    if(err){
      console.log('err', err)
      next(err)
    } else {
      res.status(200)
      res.send(dbData)
    }
  })
});

router.post('/:roomId', async (req, res, next) => {
  let roomId = parseInt(req.params.roomId);
  //need to check if image set already exists for the entry_id, 
    //if yes, add new entry with thumbnail_id = imageDataArray[array.length].thumbnail_id += 1;
    //if no, add new entry with thumbnail_id = 0;
  
  
  console.log('roomId:', roomId);
  console.log('req:', (req.body));

  db.insertImageIntoDB(roomId, req.body, (err, data) => {
    if(err){
      console.log('err', err)
      next(err)
    } else {
      res.status(201)
      res.send(data)
    }
  })


  // console.log('entered post:', roomId);

})

// router.put('/:roomId', async (req, res, next) => {
//   let roomId = parseInt(req.params.roomId, 10);
//   roomId += roomIdAdjustment;
//   console.log('entered put:', roomId);
  
// })

// router.delete('/:roomId', async (req, res, next) => {
//    let roomId = parseInt(req.params.roomId, 10);
//   roomId += roomIdAdjustment;
//   console.log('entered delete:', roomId);

// })


// module.exports = function (app) {
//   const router = express.Router();

//   app.use('/headerphotos', router);

//   router.get('/:roomId', (req, res, next) => {
//     let roomId = parseInt(req.params.roomId)
//     db.getAllImagesUrlsByRoomId(roomId, (err, dbData) => {
//       if(err){
//         console.log('err', err)
//         next(err)
//       } else {
//         res.status(200)
//         res.send(dbData)
//       }
//     })
//   });

// }

//use redis to cache
//post requst test
//use cluster 
//use pm2 load balancer

  //TODO: format data
  
//  try {
    //RETRIEVES DATA WITH DB HANDLER FUNCITON
  //  const data = (await db.getAllImagesUrlsByRoomId(roomId))[0];
    //NOTE: data is now object: {id: 3, roomImageUrls: "long string of urls"}
    //SPLITS INTO ARRAY AND MAPS TO ARRAY OF OBJECTS
    //data.roomImageUrls = data.roomImageUrls.split('&-&-&').map(url => ({ original: url, thumbnail: url }));
    //NOTE: data is now in this form: {id: 3, roomImageUrls: [
    //  {original: "url string", thumbnail: "url string"},
    //  {original: "url string", thumbnail: "url string"},
    //  {original: "url string", thumbnail: "url string"} ]

  //   res.status(200);
  //   res.json(data);   //returns back to client
  // } catch (err) {
  //   next(err);  //NOTE: this points back to (second) error handler
  // }





module.exports = router;
