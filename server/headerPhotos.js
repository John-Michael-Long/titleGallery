const express = require('express');
const db = require('../database/index');

const router = express.Router();

//const roomIdAdjustment = 0;

router.get('/:roomId', async (req, res, next) => {
  let roomId = parseInt(req.params.roomId, 10);

  //roomId += roomIdAdjustment; 

  try {

    //RETRIEVES DATA WITH DB HANDLER FUNCITON
    const data = (await db.getAllImagesUrlsByRoomId(roomId))[0];

    //NOTE: data is now object: {id: 3, roomImageUrls: "long string of urls"}

    //SPLITS INTO ARRAY AND MAPS TO ARRAY OF OBJECTS
    data.roomImageUrls = data.roomImageUrls.split('&-&-&').map(url => ({ original: url, thumbnail: url }));

    //NOTE: data is now in this form: {id: 3, roomImageUrls: [
    //  {original: "url string", thumbnail: "url string"},
    //  {original: "url string", thumbnail: "url string"},
    //  {original: "url string", thumbnail: "url string"} ]

    //data.id -= roomIdAdjustment;

    res.status(200);
    res.json(data);   //returns back to client
  } catch (err) {
    next(err);  //NOTE: this points back to (second) error handler
  }
});

router.post('/:roomId', async (req, res, next) => {
  let roomId = parseInt(req.params.roomId, 10);
  roomId += roomIdAdjustment;
  console.log('entered post:', roomId);

})

router.put('/:roomId', async (req, res, next) => {
  let roomId = parseInt(req.params.roomId, 10);
  roomId += roomIdAdjustment;
  console.log('entered put:', roomId);
  
})

router.delete('/:roomId', async (req, res, next) => {
   let roomId = parseInt(req.params.roomId, 10);
  roomId += roomIdAdjustment;
  console.log('entered delete:', roomId);

})



module.exports = router;
