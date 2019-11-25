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


// @route:  GET /list-all-movies
// @description: list names of all star war movies along with their opening crawls and comment counts
// should be sorted by release date from earliest to newest - ascending order
// @access: public

router.get('/list-all-movies', async (req, res) => {

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
            commentCount: numberOfComments,
            movies: resultsArray.sort((a, b) => (a.release_date > b.release_date) ? 1 : -1)
        });            
    } catch (err) {
        // status 400 -- bad request -- failed
        res.status(404).json({
            error: "No record found"
        })
    }   
});

// @route:  POST /add-comments
// @description: endpoint for adding anonymous comments for a movie -- stored in postgresql databse
// @access: public
/**
 * schema for comments
 * ip address of commenter
 * created_at timestamp  -- insert this automatically
 * comment
 */
router.post('/add-comments', async (req, res) => {

    const { comment} = req.body;

    // check if incoming data is of json format
    if(!req.is('application/json')){
        return res.status(400).json({
            error: "Only json format is allowed"
        });
    }
    // get commenter's ip address
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // get the date and time
    const d = new Date();
    // convert date to UTC format
    const dateTime = d.toUTCString();
    // create insert query
    const text = 'INSERT INTO comments(comment, ipaddress, created_at) VALUES($1, $2, $3) RETURNING *';
    const values = [comment, ipAddress, dateTime];
    try {
        // save comment
        const data = await client.query(text, values)
        res.status(201).send(data.rows[0]);
    } catch (err) {
        res.status(400).json({
            error: "Commented could not be added, try again"
        })
    } 
});



// @route:  GET /list-all-comments
// @access: public

// @description: 
// endpoint for adding anonymous comments for a movie -- stored in sql database
// listing anonymous comments for a movie
// should be retrieved in reverse chronological order -- (descending order of id) -- newest to earliest
// should be retrieved along with the public ip address of the commenter and utc date&time they were stored
// comment length should not exceed 500 characters
// the formated comment is returned as 'substring'

router.get('/list-all-comments', async (req, res) => {

    try {
        // SELECT query to fetch comments from sql database
        // substring(comment,1,500) --- returns a maximum of 500 characters from the comment field in comments table
        const sql = `SELECT id, ipaddress, created_at, substring(comment,1,500) FROM comments ORDER BY id DESC`;
        const data = await client.query(sql);
        res.status(200).send(data.rows);
    } catch (error) {
        res.status(404).json({
            error: "No record found"
        });
    }
  
});


// @route:  GET /get-characters
// @access: public

// @description:
// endpoint for getting list of characters
// accepts height as sort parameter to sort -- either name, gender or height
// accepts gender as filter parameter 
// returns metadata of total number of characters that match the criteria
// along with the total height of the character that match the criteria
// the total height should be provided in cm and in feet/inches.

// eslint-disable-next-line consistent-return
router.get('/get-characters', async (req, res) => {
    
    // get filter parameter
    const filter = req.query.search;

    // accepts height as sort parameter
    // eslint-disable-next-line radix
    const sortOrder = parseInt(req.query.height);
    // empty array to hold filtered result
    const filteredResult = [];
    
    try {
        // make external api call to fetch list of characters
        const apiResponse = await axios.get('https://swapi.co/api/people');
        const characters = apiResponse.data;
        // access 'results' array property in api response
        const charactersArray = characters.results;

        // initialize total height if characters to zero
        let totalHeight = 0;
        // relationship between cm and feet -- 1cm = 032808399ft
         const cmToFeet = 0.032808399;
         // relationship between cm and inch -- 1cm = 0.3937007874inches
         const cmToInch = 0.3937007874;

         // executes only if sort parameter is provided
         // returns all characters in ascending order of their height
        if(sortOrder){
            for(let i = 0; i < charactersArray.length; i++){
                // add the heights of each character
                // eslint-disable-next-line radix
                totalHeight += parseInt(charactersArray[i].height);    
            }

            return res.status(200).json({
               data: charactersArray.sort((a, b) =>  (a.height - b.height)),
               meta: {
                   totalCharacters: charactersArray.length,
                   totalHeightInCentimetres: `${totalHeight}cm`,
                   totalHeightInFeetAndInch: `${Math.floor(totalHeight * cmToFeet)}ft and ${(totalHeight * cmToInch).toFixed(2)}inches` 
               }
            });
        }

        // executes only if filter parameter is provided 
        // filter parameter is gender
        if(filter){
            for(let i = 0; i < charactersArray.length; i++){
                // check if filter parameter matches the value in the gender field in our characterArray
                if(charactersArray[i].gender === filter){
                    // sum the heights of each character
                    // eslint-disable-next-line radix
                    totalHeight += parseInt(charactersArray[i].height);
                    // add any matching record to the filteresResults array
                   filteredResult.push(charactersArray[i]);
                }
                
            }

            // check if a macthing record was found -
            // length of filteredResult array will be zero if that's the case
            if(filteredResult.length === 0){
                return res.status(404).json({
                    error: "No matching record found"
                });
            }
            // -- display filtered result in ascending order
            return res.status(200).json({
                data: filteredResult.sort((a, b) =>  (a.height - b.height)),
                meta: {
                    totalCharacters: filteredResult.length,
                    totalHeight: `${totalHeight}cm`,
                    totalHeightInCentimetres: `${totalHeight}cm`,
                    totalHeightInFeetAndInch: `${Math.floor(totalHeight * cmToFeet)}ft and ${(totalHeight * cmToInch).toFixed(2)}inches`
                }
            }); 
        }
       
     // if filter and sort parameter are not provided or when sort parameter is not a number
     if(!filter && !sortOrder){
         res.status(400).json({
             error: "Please provide a valid search or filter parameter"
         });
     } 
    // if something goes wrong  
    } catch (error) {
        res.status(400).json({
            error: "Something went wrong, please try again"
        });
    }

})

module.exports = router;


