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
            client.query(`SELECT * FROM "tripnames" WHERE created_id=$1;`, [req.user.id], function (errorMakingQuery, result){
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

// post trip name to database
router.post('/add', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO "tripnames" (name, link, created_id)
            VALUES ($1, $2, $3);`, [req.body.name, req.body.link, req.user.id], function (errorMakingQuery, result){
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
}); // end post trip name to database

// post itinerary-detail item to database
router.post('/additem', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`WITH new_contact AS (
                INSERT INTO "contacts" (person, email, phone, created_id)
                VALUES ($1, $2, $3, $4)
                RETURNING id)
                INSERT INTO "itinerary_item" (trip_id, date, city_state, destination, address, drivetime, contact_id)
                VALUES ($5, $6, $7, $8, $9, $10, (SELECT id FROM new_contact));`,
            [req.body.person, req.body.email, req.body.phone, req.user.id, req.body.itinerary, req.body.date, req.body.city_state, req.body.name, req.body.address, req.body.drivetime],
            function (errorMakingQuery, result){
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
}); // end post itinerary-detail item to database

// get $routeParams for itinerary-details view
router.get('/itinerarydetails', function (req, res) {
    var itinId = req.query.itinId;
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM itinerary_item
            JOIN tripnames ON tripnames.id = itinerary_item.trip_id
            JOIN contacts ON contacts.id = itinerary_item.contact_id
            WHERE trip_id=$1 AND tripnames.created_id=$2;`, [itinId, req.user.id], function (errorMakingQuery, result){
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
}); // end get $routeParams for itinerary-details view

// get $routeParams for itinerary-details name
router.get('/itinerarynames', function (req, res) {
    var itinId = req.query.itinId;
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM tripnames where id=$1;`, [itinId], function (errorMakingQuery, result){
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
}); // end get $routeParams for itinerary-details name

// // get all itinerary items
// router.get('/item', function (req, res) {
//     pool.connect(function (errorConnectingToDatabase, client, done){
//         if(errorConnectingToDatabase){
//             console.log('Error connecting to database', errorConnectingToDatabase);
//             res.sendStatus(500);
//         } else {
//             client.query(`SELECT * FROM itinerary_item
//             LEFT JOIN contacts ON contacts.id = itinerary_item.contact_id
//             LEFT JOIN tripnames ON tripnames.id = itinerary_item.trip_id
//             WHERE tripnames.created_id=$1;`, [req.user.id], function (errorMakingQuery, result){
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

module.exports = router;
