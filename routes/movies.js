'use strict';

// This file contains all api methods
const express = require('express');
const axios = require('axios');
// for connecting to postgress database
const { Client } = require('pg');
// access the config file for Postgress database connection uri string
// eslint-disable-next-line node/no-unpublished-require
const connection = require('../config/index');

const router = express.Router();

// setup connection to database
const client = new Client({
    user: connection.USER,
    password: connection.PASSWORD,
    database: connection.DATABASE,
    port: connection.DBPORT,
    host: connection.HOST,
    ssl: connection.SSL
  })


  client.connect()
  
  client.query('SELECT NOW()', (err) => {
    if(err){
      console.log('Database connection failed');
    }
   
  });


  
// @route:  GET /movies
// @description: list names of all star war movies along with their opening crawls and comment counts
// should be sorted by release date from earliest to newest - ascending order
// @access: public

router.get('/movies', async (req, res) => {

    try {
        // make external api call to fetch all movies
        const apiResponse = await axios.get('https://swapi.co/api/films');
        const movieData = apiResponse.data;
        // access the 'results' array property in api response
        const resultsArray = movieData.results;
        // get count of comments from sql database
        const getAllRows = await client.query('SELECT COUNT(*) FROM comments');
        const numberOfComments = getAllRows.rows[0].count;
        // status 200 - ok -- success
        // return movies in ascending order of release date along with count of comments
        res.status(200).json({
            data: {
                commentCount: numberOfComments,
                movies: resultsArray.sort((a, b) => (a.release_date > b.release_date) ? 1 : -1)
            }
            
        });            
    } catch (err) {
        return res.status(404).json({
            errors: [{
                "message": "No record found",
                "status": "404",
                "code": "001"
            }]
        });
    }   
});

module.exports = router;