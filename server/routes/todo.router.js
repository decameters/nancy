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
            client.query(`SELECT list_items.id AS list_id, list_items.name_id, list_items.item, 
            list_items.quantity, list_items.is_packed, listnames.id, listnames.name, listnames.created_id
            FROM list_items
            JOIN listnames ON listnames.id = list_items.name_id
            WHERE listnames.id=$1 AND listnames.created_id=$2
            ORDER BY list_id;`, [listId, req.user.id], function (errorMakingQuery, result){
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

// delete list_item for list-details view
router.delete('/deleteitem', function (req, res) {
    var itemIdToRemove = req.query.list_id;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('DELETE FROM list_items WHERE id=$1;', [itemIdToRemove], function (errorMakingQuery, result) {
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
}); // end delete list_item for list-details view

// delete entire list for lists view
router.delete('/', function (req, res) {
    var listIdToRemove = req.query.id;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('DELETE FROM listnames WHERE id=$1;', [listIdToRemove], function (errorMakingQuery, result) {
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
}); // end delete entire list for list view

// put route for pack item to database
router.put('/packitem', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE list_items SET is_packed = NOT is_packed WHERE id=$1;`, [req.body.list_id], function (errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    })
}); // end put route for pack item to database

// put route for editing item in database
router.put('/edititem', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE list_items SET item=$1, quantity=$2 WHERE id=$3;`, [req.body.item, req.body.quantity, req.body.list_id], function (errorMakingQuery, result) {
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
}); // end put route for editing item in database

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
