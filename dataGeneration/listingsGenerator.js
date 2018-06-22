const fs = require('fs');
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

//NOTE: INVESTIGATE "INDEXING"


const generateListing = (uniqueID) => {
  
  function randomDate() {
    month = Math.floor(Math.random() * 12) + 1;
    day = Math.floor(Math.random() * 30) + 1;
    year = 2012 + Math.floor(Math.random() * 6) + 1
    return (month + "/" + day + "/" + year);
  }

  let locations =  ["Paris", "Rome", "Venice", "Berlin", "Madrid", "Ibiza", "Dublin", "London", "Santorini", "Mykonos", "Panama", "Barcelona", "Cadiz"]
  
  let key = Math.floor( Math.random() * 125) + 1000;
  let imageCount = partOneCount[key] || 6;
  let reviewStr = loremIpsum({
      count: 1                      // Number of words, sentences, or paragraphs to generate.
    , units: 'sentences'            // Generate words, sentences, or paragraphs.
    , sentenceLowerBound: 3         // Minimum words per sentence.
    , sentenceUpperBound:  7      // Maximum words per sentence.
   // , paragraphLowerBound: 3        // Mirnimum sentences per paragraph.
   // , paragraphUpperBound: 7        // Maximum sentences per paragraph.
    , format: 'plain'})

  listingData = {
    listing_id: uniqueID, 
    main_image: `${key}home${0}.jpg`,
    price: faker.finance.amount(),
    title: loremIpsum({count: 3, units: 'words', format: 'plain'}),
    description: loremIpsum({count: 1, units: 'sentences', sentenceLowerBound: 3, sentenceUpperBound: 7, format: 'plain'}),
    location: locations[ Math.floor( Math.random() * locations.length ) ],
    reviews_str: reviewStr,
    dateSubmited: randomDate(),
    host: Math.floor( Math.random() * 1000) + 1,
    rating: Math.floor( Math.random() * 100) + 1,
    thumbnailSet: key,
    thumbnailCount: imageCount
  }

  return (`${listingData.listing_id},${listingData.main_image},${listingData.price},${listingData.title},${listingData.description},${listingData.location},${listingData.reviews_str},${listingData.dateSubmited},${listingData.rating},${listingData.thumbnailCount},${listingData.thumbnailSet}`)

}


const saveListingsToCSV = (writer) => {
  let csvHeader = ['listing_id','main_image','price','title','description','location',
                  'reviews_str','dateSubmited','host', 'thumbnailSet','thumbnailCount'];

  let entryNumber = 1000;
  let i = 1;
  let fileName = 'listingData.csv'

  //WRITE HEADER
  // fs.appendFile(fileName, csvHeader.join(), function(err) {
  //     if (err) { 
  //       console.error(err);
  //     } else {
  //       console.log("saved header");
  //     }
  // });

  const write = () => {
    let ok = true;
    do { 
      const insertLine = `${generateListing(i)}\n`
      if (i % 100 === 0) {
        console.log(`${i} has been added.`)
      }
      if (i === entryNumber) {
        writer.write(insertLine);
        writer.end();
      } else {

        ok = writer.write(insertLine);
      }
      i += 1;
    } while (i <= entryNumber && ok);
    if (i <= entryNumber) {
      writer.once('drain', write);
    }
  };
  write()
}
saveListingsToCSV(fs.createWriteStream('listingData.csv'))

