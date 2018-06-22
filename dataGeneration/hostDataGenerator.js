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
  return (hostData);
}

const saveHostToCSV = (writer) => {
  let entryNumber = 1000;
  let i = 1;
  let fileName = 'hostData.csv'

  const write = () => {
    let ok = true;
    do { 
      const insertLine = `${generateHost(i)}\n`
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
saveHostToCSV(fs.createWriteStream('hostData.csv'))