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

var fileName = 'exampleData.txt' 
//var fileName = 'dummyData.txt';




const generateListing = (uniqueID) => {
  
  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  let locations =  ["Paris", "Rome", "Venice", "Berlin", "Madrid", "Ibiza", "Dublin", "London", "Santorini", "Mykonos", "Panama", "Barcelona", "Cadiz"]
  
  let key = Math.floor( Math.random() * 125) + 1000;
  let imageCount = partOneCount[key] || 6;
  let reviewStr = loremIpsum({
      count: 1                      // Number of words, sentences, or paragraphs to generate.
    , units: 'paragraphs'            // Generate words, sentences, or paragraphs.
    , sentenceLowerBound: 2         // Minimum words per sentence.
    , sentenceUpperBound: 10        // Maximum words per sentence.
    , paragraphLowerBound: 3        // Minimum sentences per paragraph.
    , paragraphUpperBound: 7        // Maximum sentences per paragraph.
    , format: 'plain'})

  listingData = {
    listing_id: uniqueID, 
    main_image: `${key}home${0}.jpg`,
    price: faker.finance.amount(),
    title: loremIpsum({count: 3, units: 'words', format: 'plain'}),
    description: loremIpsum({count: 2, units: 'sentences', sentenceLowerBound: 5, sentenceUpperBound: 10, format: 'plain'}),
    location: locations[ Math.floor( Math.random() * locations.length ) ],
    reviews_str: reviewStr,
    dateSubmited: randomDate(new Date(2012, 0, 1), new Date()),
    host: Math.floor( Math.random() * 1000) + 1,
    likes: Math.floor( Math.random() * 1000) + 1,
    thumbnailSet: key,
    thumbnailCount: imageCount
  }

  return (`${listingData.listing_id}, ${listingData.main_image}, ${listingData.price}, ` +
    `${listingData.title}, ${listingData.description}, ${listingData.location}, ${listingData.reviews_str}, ` +
    `${listingData.dateSubmited}, ${listingData.host}, ${listingData.likes},`+
    ` ${listingData.thumbnailSet}, ${listingData.thumbnailCount}`)

}
generateListing(1024)

const saveListingsToCSV = (writer) => {
  let csvHeader = ['listing_id','main_image','price','title','description','location','reviews_str','dateSubmited','host', 'likes', 'thumbnailSet','thumbnailCount'];
  let entryNumber = 1000;
  let i = 1;
  let fileName = 'listingData.csv'

  fs.appendFile(fileName, csvHeader.join(), function(err) {
      if (err) { 
        console.error(err);
      } else {
        console.log("saved headers");
      }
  })

  const write = () => {
    let ok = true;
    do { 
      if (i % 100 === 0) {
        console.log(`${i} has been added.`)
      }
      if (i === entryNumber) {
        writer.write(`\n`);
        writer.end();
      } else {
        ok = writer.write('somethign')
      }
      i += 1;
    } while (i <= entryNumber && ok);
    if (i <= entryNumber) {
      writer.once('drain', write);
    }
  };
  write()
}
saveListingsToCSV(fs.createWriteStream('listingsData.csv'))

const generateReviewsEntry = () => {

  let reviewsCount = Math.floor( Math.random() * 10) + 1
  let reviewsArray = [];
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
}

// var entryCount = 10
// for(let i = 1; i < entryCount + 1; i++){
//   generateEntry(i);
// }

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



const generateHost = (hostID) => {
  let hostData = {
    hostID: hostID,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(), 
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode()
    }
  }
  return (hostData);
}

const saveHostToDB = () => {
  const pg = require('pg');
  const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings_db';

  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log('error:', err);
      return;
    }
    //for(let i = 1000; i < 2001; i++){
    let hostData = generateHost(1018)
    const qString = `INSERT INTO hostdata (hostid, firstname, lastname, email, phonenumber, street, city, state, zip) ` +
    `VALUES (${hostData.hostID}, '${hostData.firstName}', '${hostData.lastName}',`+
    `'${hostData.email}', '${hostData.phoneNumber}', '${hostData.address.street}', `+
    `'${hostData.address.city}', '${hostData.address.state}', '${hostData.address.zip}')`

    const query = client.query(qString,
      (err, result) => {
        if(err){
          console.log('insert err:', err)
        } else {
          console.log('saved to DB')
        }
      }
    )
  query.on('end', () => { client.end(); });
});
}


//query.on('end', () => { client.end(); });
//generateHost(5);
//generateImageEntry(1007)


    // 'INSERT INTO hostdata (hostid, firstname, lastname, email, phonenumber, street, city, state, zip)'+
    // `VALUES (${hostData.hostID}, "${hostData.firstName}", "${hostData.lastName}", `+
    // `"${hostData.email}", "${hostData.phoneNumber}", "${hostData.address.street}", `+
    // `"${hostData.address.city}", "${hostData.address.state}", "${hostData.address.zip}")`


//NEED TO CHANGE STRINGIFY PARAMS

/*
may want to use faker (node-module) instead to generate more meaningful names
Instead of looping here, may want to consider looping when entering in DBs
use more photos, want to upload all to s3
start uploading now to s3 


EXAMPLE:

listings: ID, likes, title, description, 

thumbnails: ID, url, likes, submitter, 

because we are resuing photos:

listingPhotos: foriegnKey: listingID, foriegnKey: photoID, photoDescription, foriegnKey: submitter, likes, 

SUBMITTERS: ID, name, address, info, etc

QUESTIONS: 
HOW TO code to ENTER INTO DB?
- create schema - NOTE make "listingphotos" table last
- from each object, iterate though object keys and put everything in the right place 
- extact data and construct query from extracted data

Optimizing:
- optimizing specific function: example : return top 5 liked photos 
- could construct a query to have DB find
- OR get all data and have server do sort

- Casandra lets you make a table to obtimize searchs for specific fucntions

Query Optimizations:
- Ex in School you could get same result with differnt querys

- nested queries vs join tables

- LOOK UP: optimization techniques for each DBs

- sometimes you will have the server do more work and sometimes DB mroe work 

- EXPLORE: searching through listings tabel is alot faster than listingphotos table

- Consider is it possible to give work to server while server is waiting for DB to retrueve data

DEPLOYMENT OPTIMIZATION:
  - multiple DBs runding on seperate servers

TESTING?
- Unit tests next week for server code 
- benchmarking: 
    - multiple tests getting random IDs
    - document each optimization change and result


- this week: benchmarking database - enter query in shell (exact query that will be from server)
- record all changes

*/










