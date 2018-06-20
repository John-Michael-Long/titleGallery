const db = require('./index.js');

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

const photoUrl = (obj) => {
  const allUrls = [];
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    const homePhotos = [];
    for (let i = 0; i < obj[key] + 1; i++) {
      homePhotos.push(`https://s3-us-west-1.amazonaws.com/napbnb/${key}home${i}.jpg`);
    }
    const data = homePhotos.join('&-&-&');
    allUrls.push([data]);
  });
  return allUrls;
};

db.insertImagesUrls(photoUrl(partOneCount));
