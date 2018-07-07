const express = require('express');
const db = require('../database/dbHandler');

const router = express.Router();

router.get('/:roomId', (req, res, next) => {
  let roomId = parseInt(req.params.roomId)

  // if(!roomId){
  //   console.log()
  // }

  if(roomId > 10000000){
    res.status(404)
    res.send()
    return;
  }

  console.log('get request:', req.params)
  db.getAllImagesUrlsByRoomId(roomId, (err, dbData) => {
    if(err){
      console.log('err', err)
      next(err)
    // } else if (dbData.length === 0){
    //   next();
    } else {      
      res.status(200)
      res.send(dbData)
    }
  })
});

router.post('/:roomId', async (req, res, next) => {
  let roomId = parseInt(req.params.roomId);

  if(roomId > 10000000){
    res.status(404)
    res.send();
    return;
  }

  //need to check if image set already exists for the entry_id, 
  db.insertImageIntoDB(roomId, req.body, (err, data) => {
    if(err){
      console.log('err', err)
      next(err)
    } else {
      res.status(201)
      res.send(data)
    }
  })
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
 
module.exports = router;
