const fs = require('fs');
const loremIpsum = require('lorem-ipsum');

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

//NOTE: 126 photos total

/*
EXAMPLE:
const output = loremIpsum({
    count: 1                      // Number of words, sentences, or paragraphs to generate.
  , units: 'paragraphs'            // Generate words, sentences, or paragraphs.
  , sentenceLowerBound: 5         // Minimum words per sentence.
  , sentenceUpperBound: 15        // Maximum words per sentence.
  , paragraphLowerBound: 3        // Minimum sentences per paragraph.
  , paragraphUpperBound: 7        // Maximum sentences per paragraph.
  , format: 'plain'               // Plain text or html
  , words: ['ad', 'dolor', ... ]  // Custom word dictionary. Uses dictionary.words (in lib/dictionary.js) by default.
  , random: Math.random           // A PRNG function. Uses Math.random by default
  , suffix: EOL                   // The character to insert between paragraphs. Defaults to default EOL for your OS.
});
*/

//RANDOM PHOTO LINKS:
//https://picsum.photos/200/300/?random
//https://loremflickr.com/320/240/brazil,rio


function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

}
const locations =  ["Paris", "Rome", "Venice", "Berlin", "Madrid", "Ibiza", "Dublin", "London", "Santorini", "Mykonos", "Panama", "Barcelona", "Cadiz"]

const generateEntry = (uniqueID) => {
  let reviewsCount = Math.floor( Math.random() * 10) + 1
  let reviewsArray = [];
  let key = Math.floor( Math.random() * 20) + 1000;
  let imageCount = partOneCount[key];
  let thumbnails = [];

  for (let i = 0; i < reviewsCount; i++){
    reviewsArray.push(loremIpsum({
      count: 1                      // Number of words, sentences, or paragraphs to generate.
    , units: 'paragraphs'            // Generate words, sentences, or paragraphs.
    , sentenceLowerBound: 2         // Minimum words per sentence.
    , sentenceUpperBound: 10        // Maximum words per sentence.
    , paragraphLowerBound: 3        // Minimum sentences per paragraph.
    , paragraphUpperBound: 7        // Maximum sentences per paragraph.
    , format: 'plain' 
    }))
  }

  for (let i = 0; i < imageCount + 1; i++){
    thumbnails.push( `${key}home${i}.jpg` )
  }

  photoData = {
    uniqueID: uniqueID, 
    mainImage: `${key}home${0}.jpg`,
    title: loremIpsum({count: 3, units: 'words', format: 'plain'}),
    description: loremIpsum({count: 2, units: 'sentences', sentenceLowerBound: 5, sentenceUpperBound: 10, format: 'plain'}),
    location: locations[ Math.floor( Math.random() * locations.length ) ],
    reviews: reviewsArray,
    dateSubmited: randomDate(new Date(2012, 0, 1), new Date()),
    submitter: loremIpsum({count: 1, units: 'words', format: 'plain'}),
    likes: Math.floor( Math.random() * 1000) + 1,
    thumbnails: thumbnails
  }
  
  fs.appendFile('dummyData.txt', '\n'+JSON.stringify(photoData), function(err) {
    if (err) { 
      console.error(err);
    } else {
      console.log("saved to file!");
    }
  });

}
for(let i = 1; i < 101; i++){
  generateEntry(i);
}

