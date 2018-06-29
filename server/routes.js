const express = require('express');
const db = require('../database/dbHandler');

const router = express.Router();
//'/:roomId'
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


router.post('/:roomId', async (req, res, next) => {
  let roomId = parseInt(req.params.roomId, 10);

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
