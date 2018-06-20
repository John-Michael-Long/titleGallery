const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME || "localhost",
  user: process.env.RDS_USERNAME || "root",
  password: process.env.RDS_PASSWORD || "",
  port: process.env.RDS_PORT || "3306",
  database: process.env.RDS_DB_NAME || "roomsPhotoGalleries",
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to the database-->', err);
    return;
  }
  console.log('Successfully connecting to mysql!');
});

connection.query = util.promisify(connection.query);

const insertImagesUrls = async (data) => {
  try {
    await connection.query('INSERT INTO photos (roomImageUrls) VALUES ?', [data]);
    return Promise.resolve();
  } catch (err) {
    throw err;
  }
};

const getAllImagesUrlsByRoomId = async (roomId) => {
  try {
    const response = connection.query('SELECT * FROM photos WHERE id = ?', roomId);
    const data = (await response).map(row => Object.assign({}, row));
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  connection,
  insertImagesUrls,
  getAllImagesUrlsByRoomId,
};
