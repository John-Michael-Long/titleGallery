const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings_db';
const generateHost = './dataGenerator.js'

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE hostData(id SERIAL PRIMARY KEY, '+
  'hostID INTEGER not null, ' +
  'firstName VARCHAR(30) not null, ' + 
  'lastName VARCHAR(30) not null, ' + 
  'email VARCHAR(30) not null, ' +
  'phoneNumber VARCHAR(30) not null, ' + 
  'street VARCHAR(30) not null, '+
  'city VARCHAR(30) not null, ' +
  'state VARCHAR(30) not null, ' +
  'zip VARCHAR(20) not null' +
  ')');


//let hostData = generateHost(1008)


  // client.query(
  //   'INSERT INTO hostdata(hostid, firstname, lastname, email, phonenumber, street, city, state, zip)'+
  //   `VALUES (${hostData.hostID})`
  // ).on('end', () => { client.end(); });

//'CREATE TABLE hostData(id SERIAL PRIMARY KEY, hostID INTEGER not null, firstName VARCHAR(10) not null, lastName VARCHAR(10) not null, email VARCHAR(15) not null, phoneNumber VARCHAR(15) not null, street VARCHAR(10) not null)'




query.on('end', () => { client.end(); });