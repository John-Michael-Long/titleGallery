const generateData = require('./generateData.js')
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'listings_db' });




const insertToDB = () => {
    console.time('insert-listings');

    const query = `COPY listing_data (id,main_image,price,title,description,location,reviews_str,date_submitted,rating,thumbnail_count,thumbnail_set,host_data,image_data,reviews_data)`+
    `FROM 'listingData.csv' WITH DELIMITER ',' ;`

    client.execute(query)
    .then(function() {
        if(count % 100000 === 0){
            console.log('added count:', count)
        }
        return insert(count + 1);
    })
    .catch(function(err){
        console.log('error in batch:', err)
    })
}



//console.log('listing type:', generateData.generateListing(5) )
// const obj =  generateData.generateListing(5)
// console.log('tyhpe', typeof obj.host_data.zip)

// var insert = function(count, callback) {
    
//     console.time('insert-listings')
//     for (var i  = 2000 * count; i <= 2000 + (2000 * count); i++) {
//         var promises = [];
//         var listingsData = generateData.generateListing(i);

//         var query = `INSERT INTO listing_data (id,main_image,price,title,description,location,reviews_str,date_submitted,rating,thumbnail_count,thumbnail_set,host_data,image_data,reviews_data) `+
//                     `VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
//         var params = [
//         i,
//         listingData.main_image,
//         listingData.price,
//         listingData.title1,
//         listingData.description,
//         listingData.location,
//         listingData.reviews_str,
//         listingData.dateSubmitted,
//         listingData.rating,
//         listingData.thumbnailCount,
//         listingData.thumbnailSet,
//         listingData.host_data,
//         listingData.image_data,
//         listingData.reviews_data]

//     //console.log('query', query)

//         promises.push(client.execute(query, params, { prepare: true }));
//     }
//     Promise.all(promises)
//     .then((results) => {
//         if (count === 500) {  //5000
//             console.timeEnd('insert-listings')
//             callback(null, results)
//         } else {
//             insert(count + 1, callback)
//         }
//     })
//     .catch(err => {
//         callback(err, null)
//     });
// }



// insert(0, (err, results) => {
//     if (err) {
//         console.log('THREW AN ERROR\n', err)
//     } else {
//         console.log('I THINK IT WORKED')
//     }
// })