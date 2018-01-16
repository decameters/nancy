require('dotenv').config()

var express = require('express');
var router = express.Router();
var passport = require('passport');
var pool = require('../modules/pool.js');

var twilio = require('twilio');

var accountSid = process.env.TWILIO_ACCT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

var notify = new twilio(accountSid, authToken);

// get all itineraries
router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT * FROM "tripnames" WHERE created_id=$1 ORDER BY id;`, [req.user.id], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                })
            }
        })
    } else {
        res.sendStatus(403);
    }
}); // end get all itineraries

// post trip name to database
router.post('/add', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`INSERT INTO "tripnames" (name, link, created_id)
            VALUES ($1, $2, $3);`, [req.body.name, req.body.link, req.user.id], function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            console.log('error making query', errorMakingQuery);
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(201);
                        }
                    })
            }
        })
    } else {
        res.sendStatus(403);
    }
}); // end post trip name to database

// post itinerary-detail item to database
router.post('/additem', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
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
                    function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            console.log('error making query', errorMakingQuery);
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(201);
                        }
                    })
            }
        })
    } else {
        res.sendStatus(403);
    }
}); // end post itinerary-detail item to database

// get $routeParams for itinerary-details view
router.get('/itinerarydetails', function (req, res) {
    if (req.isAuthenticated()) {
        var itinId = req.query.itinId;
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT  itinerary_item.id AS itin_id, itinerary_item.trip_id, itinerary_item.date, itinerary_item.city_state, itinerary_item.destination, itinerary_item.address,
            itinerary_item.drivetime, itinerary_item.contact_id, tripnames.name, tripnames.link, tripnames.created_id, contacts.person, contacts.email, contacts.phone
            FROM itinerary_item
            JOIN tripnames ON tripnames.id = itinerary_item.trip_id
            LEFT JOIN contacts ON contacts.id = itinerary_item.contact_id
            WHERE trip_id=$1 AND tripnames.created_id=$2
            ORDER BY date;`, [itinId, req.user.id], function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            console.log('error making query', errorMakingQuery);
                            res.sendStatus(500);
                        } else {
                            res.send(result.rows);
                        }
                    })
            }
        })
    } else {
        res.sendStatus(403);
    }
}); // end get $routeParams for itinerary-details view

// get $routeParams for itinerary-details name
router.get('/itinerarynames', function (req, res) {
    if (req.isAuthenticated()) {
        var itinId = req.query.itinId;
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT * FROM tripnames where id=$1;`, [itinId], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                })
            }
        })
    } else {
        res.sendStatus(403);
    }
}); // end get $routeParams for itinerary-details name

// delete itin item for interary-details view
router.delete('/deleteitem', function (req, res) {
    if (req.isAuthenticated()) {
        var itinItemIdToRemove = req.query.itin_id;
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query('DELETE FROM itinerary_item WHERE id=$1;', [itinItemIdToRemove], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                })
            }
        })
    } else {
        res.sendStatus(403);
    }
}); // delete itin item for interary-details view

// delete entire itinerary for itinerary view
router.delete('/', function (req, res) {
    if (req.isAuthenticated()) {
        var itinIdToRemove = req.query.id;
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query('DELETE FROM tripnames WHERE id=$1;', [itinIdToRemove], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                })
            }
        })
    } else {
        res.sendStatus(403);
    }
}); // end delete entire itinerary for itinerary view

// put route for editing itinerary name in database
router.put('/edititinerary', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`UPDATE tripnames SET name=$1, link=$2 WHERE id=$3;`, [req.body.name, req.body.link, req.body.id], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
        })
    } else {
        res.sendStatus(403);
    }
}); // end put route for editing itinerary name in database

// put route for editing itinerary item in itinerary_item in database
router.put('/edititinitem', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`WITH update_contact AS (
                UPDATE "contacts" SET person=$1, email=$2, phone=$3
                WHERE id=$4
                )
                UPDATE "itinerary_item" SET date=$5, city_state=$6, destination=$7, address=$8, drivetime=$9
                WHERE id=$10;`, [req.body.person, req.body.email, req.body.phone, req.body.contact_id,
                    req.body.date, req.body.city_state, req.body.destination, req.body.address, req.body.drivetime, req.body.itin_id], function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            console.log('Error making query', errorMakingQuery);
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(204);
                        }
                    })
            }
        })
    } else {
        res.sendStatus(403);
    }
}); // end put route for editing itinerary item in itinerary_item in database

// // get all users for list share
// router.get('/getusers', function (req, res) {
//     if (req.isAuthenticated()) {
//         pool.connect(function (errorConnectingToDatabase, client, done) {
//             if (errorConnectingToDatabase) {
//                 console.log('Error connecting to database', errorConnectingToDatabase);
//                 res.sendStatus(500);
//             } else {
//                 client.query(`SELECT users.name FROM "users";`, function (errorMakingQuery, result) {
//                     done();
//                     if (errorMakingQuery) {
//                         console.log('error making query', errorMakingQuery);
//                         res.sendStatus(500);
//                     } else {
//                         res.send(result.rows);
//                     }
//                 })
//             }
//         })
//     } else {
//         res.sendStatus(403);
//     }
// }); // end get all users for list share

// get notify users
router.get('/notifyUsers', function (req, res) {
    if (req.isAuthenticated()) {
        var itinId = req.query.itinId
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT itinerary_item.trip_id, itinerary_item.date, itinerary_item.city_state, itinerary_item.destination, itinerary_item.address,
                itinerary_item.drivetime, itinerary_item.contact_id, tripnames.name AS trip_name, tripnames.link, contacts.person, contacts.email, contacts.phone,
                users.id AS user_id, users.name, users.phone
                FROM itinerary_item
                JOIN tripnames ON tripnames.id = itinerary_item.trip_id
                LEFT JOIN contacts ON contacts.id = itinerary_item.contact_id
                JOIN users ON users.id = tripnames.created_id
				WHERE trip_id=$1 AND tripnames.created_id=$2
                ORDER BY date;`, [itinId, req.user.id], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        // console.log(result.rows);
                        // console.log(result.rows[0].phone);
                        
                        res.send(result.rows);
                        notify.messages
                        .create({
                            to: result.rows[0].phone,
                            from: "+16124008064",
                            body: 'Hey there, ' + result.rows[0].name + '! You\'re now receiving notifications for ' + result.rows[0].trip_name +'. Have a great trip! XO, Nancy :)'
                        })
                    }
                })
            }
        })
    } else {
        res.sendStatus(403);
    }
}); // end notify users


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
