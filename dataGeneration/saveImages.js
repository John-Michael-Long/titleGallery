const axios = require('axios')
const fs = require('fs')
const loremIpsum = require('lorem-ipsum');
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

// var allUrls = [];

const savePhotos = (obj) => {
  let keys = Object.keys(obj);

  keys.forEach((key) => {

    for (let i = 0; i < obj[key] + 1; i++) {
      axios({
      method:'get',
      url: `https://s3-us-west-1.amazonaws.com/napbnb/${key}home${i}.jpg`,
      responseType:'stream'
      })
      .then(function(response) {
      response.data.pipe(fs.createWriteStream(`../../galleryImages/${key}home${i}.jpg`))
      console.log('file saved!')
      });
    }

  });
};

//savePhotos(partOneCount);


const saveDummyPhotos = () => {
  let count = 120;
  let set = 1021;

  while(count < 1000) {
    for(let i = 0; i < 7; i++){
      console.log('count:', count)
      axios({
        method:'get',
        url: 'https://loremflickr.com/640/480',
        responseType:'stream'
        })
        .then(function(response) {
        response.data.pipe(fs.createWriteStream(`../../galleryImages/${set}home${i}.jpg`))
        console.log('file saved!')
      });
      count++;
    }
  set++;  
  }
}

saveDummyPhotos()







