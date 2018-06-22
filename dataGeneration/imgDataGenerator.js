const fs = require('fs')
const faker = require('faker');

const partOneCount = {
  1000: 8,
  1001: 6,
  1002: 6,
  1003: 6,
  1004: 6,
  1005: 5,
  1006: 6,
  1007: 5,
  1008: 6,
  1009: 6,
  1010: 6,
  1011: 6,
  1012: 6,
  1013: 6,
  1014: 6,
  1015: 6,
  1016: 6,
  1017: 6,
  1018: 6,
  1019: 6,
  1020: 6,
};

const generateImageEntry = (count = 0) => {
  let thumbnails = [];
  let fileName = 'imageData.csv'
  let set = 1000;
  let headers = [ 'entryID', 'imageSet','thumbnailID', 'imgFileName', 'likes', 'submitterID']
       
  fs.appendFile(fileName, headers.join(), function(err) {
      if (err) { 
        console.error(err);
      } else {
        console.log("saved to file!");
      }
  })

  while(count < 1000){
    let imageCount = partOneCount[set] || 6;

    for(let i = 0; i < imageCount + 1; i++){
      let thumbnail = {
        entryID: count,
        imageSet: set,
        thumbnailID: i,
        imgFileName: `${set}home${i}.jpg`,
        likes: Math.floor( Math.random() * 1000) + 1,
        submitterID: null //Math.floor( Math.random() * 1000) + 1
      };

      let dataString = [
      thumbnail.entryID, 
      thumbnail.imageSet, 
      thumbnail.thumbnailID, 
      thumbnail.imgFileName, 
      thumbnail.likes, 
      thumbnail.submitterID]

      fs.appendFile(fileName, '\n'+JSON.parse(JSON.stringify(dataString.join())), function(err) {
        if (err) { 
          console.error(err);
        } else {
          console.log("saved to file!");
        }
      })
      count++;
    }
    set++;
  }  
}
generateImageEntry()

