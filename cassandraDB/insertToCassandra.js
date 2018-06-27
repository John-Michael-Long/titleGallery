const generateData = require('./generateData.js')
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'listings_db' });

//console.log('listing type:', generateData.generateListing(5) )
// const obj =  generateData.generateListing(5)
// console.log('tyhpe', typeof obj.host_data.zip)

const insert = function(count) {
    
    console.time('insert-listings')

    if(count === 10000001){
        console.log('complete')
        console.timeEnd('insert-listings')
        return;
    }


    const listingsData = generateData.generateListing(count);

    const query = `INSERT INTO listing_data (id,main_image,price,title,description,location,reviews_str,date_submitted,rating,thumbnail_count,thumbnail_set,host_data,image_data,reviews_data) `+
                `VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    const params = [
    count,
    listingData.main_image,
    listingData.price,
    listingData.title1,
    listingData.description,
    listingData.location,
    listingData.reviews_str,
    listingData.dateSubmitted,
    listingData.rating,
    listingData.thumbnailCount,
    listingData.thumbnailSet,
    listingData.host_data,
    listingData.image_data,
    listingData.reviews_data]

    console.log('params:', params)

    console.log('query', query)
    client.execute(query, params, { prepare: true })
    .then(function() {
        if(count % 100000 === 0){
            console.log('added count:', count)
        }
        return insert(count + 1);
    })
    .catch(function(err){
        console.log('error in batch:', err)
    })
};

insert(1);

