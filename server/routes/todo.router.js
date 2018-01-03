var express = require('express');
var router = express.Router();
var passport = require('passport');
var pool = require('../modules/pool.js');

// get all todo
router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM "listnames";`, function (errorMakingQuery, result){
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
}); // end get all todo

// post todo name to database
router.post('/add', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO "listnames" (name, created_id)
            VALUES ($1, $2);`, [req.body.name, req.user.id], function (errorMakingQuery, result){
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
}); // end post todo name to database

// // get all itinerary items
// router.get('/item', function (req, res) {
//     pool.connect(function (errorConnectingToDatabase, client, done){
//         if(errorConnectingToDatabase){
//             console.log('Error connecting to database', errorConnectingToDatabase);
//             res.sendStatus(500);
//         } else {
//             client.query(`SELECT * FROM itinerary_item
//             JOIN contacts ON contacts.id = itinerary_item.contact_id
//             JOIN tripnames ON tripnames.id = itinerary_item.trip_id;`, function (errorMakingQuery, result){
//                 done();
//                 if(errorMakingQuery){
//                     console.log('error making query', errorMakingQuery);
//                     res.sendStatus(500);
//                 } else {
//                     res.send(result.rows);
//                 }
//             })
//         }
//     })
// }); // end get all itinerary items

// // post itinerary item to database
// router.post('/additem', function (req, res) {
//     pool.connect(function (errorConnectingToDatabase, client, done){
//         if(errorConnectingToDatabase){
//             console.log('Error connecting to database', errorConnectingToDatabase);
//             res.sendStatus(500);
//         } else {
//             client.query(`INSERT INTO "itinerary_item"
//             (date, city_state, destination, address, drivetime)
//             VALUES ($1, $2, $3, $4, $5);`,
//             [req.body.date, req.body.city_state, req.body.name, req.body.address, req.body.drivetime], function (errorMakingQuery, result){
//                 done();
//                 if(errorMakingQuery){
//                     console.log('error making query', errorMakingQuery);
//                     res.sendStatus(500);
//                 } else {
//                     res.sendStatus(201);
//                 }
//             })
//         }
//     })
// }); // end post itinerary item to database

module.exports = router;
