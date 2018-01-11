var express = require('express');
var router = express.Router();
var passport = require('passport');
var pool = require('../modules/pool.js');

// get all itineraries
router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM contacts 
            JOIN users on users.id = contacts.created_id
            WHERE contacts.created_id=$1;;`, [req.user.id], function (errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    })
}); // end get all itineraries

// post new contact to database
router.post('/add', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO "contacts" (person, email, phone, created_id)
            VALUES ($1, $2, $3, $4);`,
             [req.body.person, req.body.email, req.body.phone, req.user.id], function (errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            })
        }
    })
}); // end post contact to database

module.exports = router;
