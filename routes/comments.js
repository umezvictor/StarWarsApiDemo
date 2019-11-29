'use strict';

// This file contains all api methods
const express = require('express');
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

// @route:  POST /comments
// @description: endpoint for adding anonymous comments for a movie -- stored in postgresql databse
// @access: public
/**
 * schema for comments
 * ip address of commenter
 * created_at timestamp  -- insert this automatically
 * comment
 */
router.post('/comments', async (req, res) => {

    

    const { comment} = req.body;

    
    // check if incoming data is of json format
    if(!req.is('application/json')){
        // return keyword stops execution of the fuction completely
        // else, it will throw an error 
        return res.status(400).json({
            errors: [{
                "message": "Request body must be json format",
                "status": "400",
                "code": "001"
            }]
        });
    }

    if(!comment){
        return res.status(400).json({
            errors: [{
                "message": "comment field must body must be provided in the request body",
                "status": "400",
                "code": "001"
            }]
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
        const data = await client.query(text, values);
        res.status(201).json({
            data: data.rows[0]
        });
    } catch (err) {
        res.status(400).json({
            errors: [{
                "message": "Comment could not be created",
                "status": "400",
                "code": "001"
            }]
        });
    } 
});



// @route:  GET /comments
// @access: public

// @description: 
// endpoint for adding anonymous comments for a movie -- stored in sql database
// listing anonymous comments for a movie
// should be retrieved in reverse chronological order -- (descending order of id) -- newest to earliest
// should be retrieved along with the public ip address of the commenter and utc date&time they were stored
// comment length should not exceed 500 characters
// the formated comment is returned as 'substring'

router.get('/comments', async (req, res) => {

    try {
        // SELECT query to fetch comments from sql database
        // substring(comment,1,500) --- returns a maximum of 500 characters from the comment field in comments table
        const sql = `SELECT id, ipaddress, created_at, substring(comment,1,500) FROM comments ORDER BY id DESC`;
        const data = await client.query(sql);
        res.status(200).json({
            data: data.rows
        });
    } catch (error) {
        res.status(404).json({
            errors: [{
                "message": "No record found",
                "status": "404",
                "code": "002"
            }]
        });
    }
  
});


module.exports = router;