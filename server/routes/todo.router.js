var express = require('express');
var router = express.Router();
var passport = require('passport');
var pool = require('../modules/pool.js');

// get all todo for list view
router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM "listnames" WHERE created_id=$1;`, [req.user.id], function (errorMakingQuery, result){
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
}); // end get all todo for list view

// post new list name to database
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
}); // end post list name to database

// get $routeParams for list-details view
router.get('/listdetails', function (req, res) {
    var listId = req.query.listId;
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM list_items
            JOIN listnames ON listnames.id = list_items.name_id
            WHERE listnames.id=$1 AND listnames.created_id=$2;`, [listId, req.user.id], function (errorMakingQuery, result){
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
}); // end get $routeParams for list-details view

// post list-detail item to database
router.post('/additem', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO "list_items" (name_id, item, quantity)
            VALUES ($1, $2, $3)`, [req.body.listId, req.body.item, req.body.quantity], function (errorMakingQuery, result){
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
}); // end post list-detail item to database

// get $routeParams for list-detail name
router.get('/listnames', function (req, res) {
    var listId = req.query.listId;
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM listnames WHERE id=$1 and created_id=$2;`, [listId, req.user.id], function (errorMakingQuery, result){
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
}); // end get $routeParams for list-details name

// get all todo items
// router.get('/getlist', function (req, res) {
//     pool.connect(function (errorConnectingToDatabase, client, done){
//         if(errorConnectingToDatabase){
//             console.log('Error connecting to database', errorConnectingToDatabase);
//             res.sendStatus(500);
//         } else {
//             client.query(`SELECT * FROM list_items
//             JOIN listnames ON listnames.id = list_items.name_id
//             WHERE listnames.id = $1;`, [req.query.listTodo], function (errorMakingQuery, result){
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
// }); // end get all todo items

// // get all todo items
// router.get('/items', function (req, res) {
//     pool.connect(function (errorConnectingToDatabase, client, done){
//         if(errorConnectingToDatabase){
//             console.log('Error connecting to database', errorConnectingToDatabase);
//             res.sendStatus(500);
//         } else {
//             client.query(`SELECT * FROM list_items
//             JOIN listnames ON listnames.id = list_items.name_id
//             WHERE listnames.id = $1;`, [WHAT GOES HERE], function (errorMakingQuery, result){
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
// }); // end get all todo items

module.exports = router;
