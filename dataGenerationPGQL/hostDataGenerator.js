const fs = require('fs');
const faker = require('faker');


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
  return ( `${hostData.first_name},${hostData.last_name},${hostData.email},${hostData.phone_number},${hostData.street},${hostData.city},${hostData.state},${hostData.zip}` );
}
//generateHost();
const saveHostToCSV = (writer) => {
  let entryNumber = 1000000;
  let i = 1;

  const write = () => {
    let ok = true;
    do { 
      const insertLine = `${generateHost()}\n`
      if (i % 10000 === 0) {
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
saveHostToCSV(fs.createWriteStream('hostData.csv'))