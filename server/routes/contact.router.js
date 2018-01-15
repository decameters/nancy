var express = require('express');
var router = express.Router();
var passport = require('passport');
var pool = require('../modules/pool.js');

// get all itineraries
router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT contacts.id AS con_id, contacts.person, contacts.email, contacts.phone, 
                contacts.created_id, users.name, users.username
                FROM contacts 
                JOIN users on users.id = contacts.created_id
                WHERE contacts.created_id=$1
                ORDER BY person;`, [req.user.id], function (errorMakingQuery, result) {
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

// post new contact to database
router.post('/add', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`INSERT INTO "contacts" (person, email, phone, created_id)
                VALUES ($1, $2, $3, $4);`,
                    [req.body.person, req.body.email, req.body.phone, req.user.id], function (errorMakingQuery, result) {
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
}); // end post contact to database

// delete contact for contacts view
router.delete('/deletecontact', function (req, res) {
    if (req.isAuthenticated()) {
        var contactIdToRemove = req.query.con_id;
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query('DELETE FROM contacts WHERE id=$1;', [contactIdToRemove], function (errorMakingQuery, result) {
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
}); // end delete contact for contacts view

// put route for editing contact in database
router.put('/editcontact', function (req, res) {
    if (req.isAuthenticated()) {
        var contactToUpdate = req.body;
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`UPDATE contacts SET person=$1, 
                email=$2, phone=$3 WHERE id=$4;`,
                    [req.body.person, req.body.email, req.body.phone, req.body.con_id], function (errorMakingQuery, result) {
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
}); // end put route for editing contact in database

module.exports = router;
