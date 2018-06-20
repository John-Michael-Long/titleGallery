const express = require('express');
const db = require('../database/index');

const router = express.Router();

const roomIdAdjustment = -10000000 + 1;

router.get('/:roomId', async (req, res, next) => {
  let roomId = parseInt(req.params.roomId, 10);
  console.log('roomID before:', roomId);
  roomId += roomIdAdjustment;
  console.log('roomID after:', roomId);
  try {
    const data = (await db.getAllImagesUrlsByRoomId(roomId))[0];
    data.roomImageUrls = data.roomImageUrls.split('&-&-&').map(url => ({ original: url, thumbnail: url }));
    data.id -= roomIdAdjustment;
    res.status(200);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
