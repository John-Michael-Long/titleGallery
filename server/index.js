require('newrelic');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const routes = require('./routes.js');
const app = express();

// use morgan to log incoming reuests
app.use(morgan('dev'));

// use body-parser to parse the request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* eslint-disable consistent-return */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Mehods','GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({}); 
  } 
  next();  
});
/* eslint-enable consistent-return */

// serve up the pages
//app.use('/:id', express.static(path.join(__dirname, '../public')));
//app.get('/favicon.ico', (req, res) => res.status(204));   

// handle /headerphotos routes
app.use('/headerphotos', routes);
//routes(app);

//if it does not go through any routes found above then error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

//second err handler to handle errors from router
/* eslint-disable no-unused-vars */
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
/* eslint-enable no-unused-vars */

const port = process.env.serverPort || 3005;
const server = http.createServer(app);

module.exports = server;

if (!module.parent) {
  server.listen(port);
  console.log(`tileGallery listening on ${port}`);
}
