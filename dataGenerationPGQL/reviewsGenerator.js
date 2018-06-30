const fs = require('fs');
const loremIpsum = require('lorem-ipsum');

console.time('generate-reviews')

const generateReviewEntry = () => {

  function randomDate() {
    month = Math.floor(Math.random() * 12) + 1;
    day = Math.floor(Math.random() * 30) + 1;
    year = 2012 + Math.floor(Math.random() * 6) + 1
    return (month + "/" + day + "/" + year);
  }

  let reviewData = {
    listing_id: Math.floor(Math.random() * 10000000)+1,
    user_id: Math.floor(Math.random() * 1000000)+1,
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
  return ( `${reviewData.listing_id},${reviewData.user_id},${reviewData.data_submitted},${reviewData.rating},${reviewData.review}`) 
  
}

const saveReviewsToCSV = (writer) => {
  let entryNumber = 2500;
  let i = 1;

  const write = () => {
    let ok = true;
    do { 
      const insertLine = `${generateReviewEntry()}\n`
      if (i % 100000 === 0) {
        console.log(`${i} has been added.`)
      }
      if (i === entryNumber) {
        writer.write(insertLine);
        console.timeEnd('generate-reviews');
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
saveReviewsToCSV(fs.createWriteStream('reviewsData_25M.csv'))

