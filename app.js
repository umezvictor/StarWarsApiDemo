'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/index');

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(cors()); // enables api to handle request from different origins 

// routes middleware
app.use('/api', apiRoutes);

// serve static assets if in production  -- gives access to the front end built with react
if(process.env.NODE_ENV === 'production'){
  // set static folder
  app.use(express.static('client/build'));
  
  // for any route other than the api routes, get the index.html file in build in client folder
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
  }

// app runs on process.env.PORT in production or port 5000 during development
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

