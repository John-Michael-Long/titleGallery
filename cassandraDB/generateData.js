const fs = require('fs');
const loremIpsum = require('lorem-ipsum');
const faker = require('faker');


console.time('generate-reviews')

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

const generateReviewEntry = () => {

  function randomDate() {
    month = Math.floor(Math.random() * 12) + 1;
    day = Math.floor(Math.random() * 30) + 1;
    year = 2012 + Math.floor(Math.random() * 6) + 1
    return (month + "/" + day + "/" + year);
  }

  let reviewData = {
    listing_id: Math.floor(Math.random() * 10000000)+1,
    user_id: Math.floor(Math.random() * 10000000)+1, // generateHost(),
    data_submitted: randomDate(),
    rating: 1 + Math.floor(Math.random() * 100),
    review: loremIpsum({
      count: 1                      // Number of words, sentences, or paragraphs to generate.
    , units: 'paragraphs'            // Generate words, sentences, or paragraphs.
    , sentenceLowerBound: 5         // Minimum words per sentence.
    , sentenceUpperBound: 10        // Maximum words per sentence.
    , paragraphLowerBound: 5        // Minimum sentences per paragraph.
    , paragraphUpperBound: 10        // Maximum sentences per paragraph.
    , format: 'plain' 
    })
  }
  if(reviewData.review.length > 500){
    reviewData.review = reviewData.review.substring(0,500)
  }
  return reviewData;
  
}

const generateReviewsArray = () => {
  let count = 3 + Math.floor(Math.random() * 5);
  let reviews = [];

  for(let i = 0; i < count; i++) {
    reviews.push( generateReviewEntry() )
  }
  return reviews;
}

const generateImageEntry = () => {
  let thumbnails = [];
  let fileName = 'imageData.csv'

  let set = 1000 + Math.floor( Math.random() * 100) + 1

  let imageCount = partOneCount[set] || (4 + Math.floor( Math.random() * 3)); 

    for(let i = 0; i < imageCount + 1; i++){
      let thumbnail = {
        entryID: i,
        imageSet: set,
        thumbnailID: i,
        imgFileName: `${set}home${i}.jpg`,
        likes: Math.floor( Math.random() * 1000) + 1,
        submitterID: Math.floor( Math.random() * 1000) + 1
      };

      thumbnails.push(thumbnail);
      
    }

  return thumbnails;  
}

const generateHost = () => {
  let hostData = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    phone_number: faker.phone.phoneNumberFormat(),
    street: faker.address.streetAddress(),
    city: faker.address.city(), 
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode()
  }
  return hostData;
}

console.time('generate-listings')

exports.generateListing = (uniqueID) => {
  
  function randomDate() {
    month = Math.floor(Math.random() * 12) + 1;
    day = Math.floor(Math.random() * 30) + 1;
    year = 2012 + Math.floor(Math.random() * 6) + 1
    return (month + "/" + day + "/" + year);
  }

  let locations =  ["Paris", "Rome", "Venice", "Berlin", "Madrid", "Ibiza", "Dublin", "London", "Santorini", "Mykonos", "Panama", "Barcelona", "Cadiz"]
  
  let key = Math.floor( Math.random() * 140) + 1000;
  let imageCount = partOneCount[key] || 6;
  let reviewStr = loremIpsum({
      count: 1                      // Number of words, sentences, or paragraphs to generate.
    , units: 'sentences'            // Generate words, sentences, or paragraphs.
    , sentenceLowerBound: 3         // Minimum words per sentence.
    , sentenceUpperBound:  7      // Maximum words per sentence.
    , format: 'plain'})

   listingData = {
    listing_id: uniqueID, 
    main_image: `${key}home0.jpg`,
    price: faker.finance.amount(),
    title1: loremIpsum({count: 3, units: 'words', format: 'plain'}),
    description: loremIpsum({count: 1, units: 'sentences', sentenceLowerBound: 3, sentenceUpperBound: 7, format: 'plain'}),
    location: locations[ Math.floor( Math.random() * locations.length ) ],
    reviews_str: reviewStr,
    dateSubmitted: randomDate(),
    rating: Math.floor( Math.random() * 100) + 1,
    thumbnailCount: imageCount,
    thumbnailSet: key,
    host_data: generateHost(),
    image_data: generateImageEntry(),
    reviews_data: generateReviewsArray()
  }

  return listingData;

}


const saveListingsToCSV = (writer) => {
  let entryNumber = 10;
  let i = 1;

  const write = () => {
    let ok = true;
    do { 
      const listingData = generateListing(i);
      const insertLine = `${listingData.listing_id},${listingData.main_image},${listingData.price},`+
    `${listingData.title},${listingData.description},${listingData.location},${listingData.reviews_str},`+
    `${listingData.dateSubmited},${listingData.rating},${listingData.thumbnailCount},`+
    `${listingData.thumbnailSet},${listingData.host_data},${listingData.image_data},${listingData.reviews_data}\n`

      if (i % 100000 === 0) {
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
//saveListingsToCSV(fs.createWriteStream('listingData.csv'))

console.timeEnd('generate-listings');


// const saveReviewsToCSV = (writer) => {
//   let entryNumber = 25000000;
//   let i = 1;

//   const write = () => {
//     let ok = true;
//     do { 
//       const insertLine = `${generateReviewEntry()}\n`
//       if (i % 100000 === 0) {
//         console.log(`${i} has been added.`)
//       }
//       if (i === entryNumber) {
//         writer.write(insertLine);
//         console.timeEnd('generate-reviews');
//         writer.end();
//       } else {

//         ok = writer.write(insertLine);
//       }
//       i += 1;
//     } while (i <= entryNumber && ok);
//     if (i <= entryNumber) {
//       writer.once('drain', write);
//     }
//   };
//   write()
// }
// saveReviewsToCSV(fs.createWriteStream('reviewsData_25M.csv'))

