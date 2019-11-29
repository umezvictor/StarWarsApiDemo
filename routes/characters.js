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
router.get('/characters', async (req, res) => {
    
    // get filter parameter
    const filter = req.query.gender;

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
                    errors: [{
                        "message": "No matching record found",
                        "status": "404",
                        "code": "002"
                    }]
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
         
        return res.status(400).json({
            errors: [{
                "message": "Please provide a valid search or filter parameter",
                "status": "400",
                "code": "001"
            }]
        });

     } 
    // if something goes wrong  
    } catch (error) {
    
        return res.status(400).json({
            errors: [{
                "message": "Something went wrong, please try again",
                "status": "400",
                "code": "001"
            }]
        });
    }

});

module.exports = router;