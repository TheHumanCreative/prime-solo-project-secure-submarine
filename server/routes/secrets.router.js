const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log("req.user:", req.user);
        queryText = 'SELECT * FROM "secret" WHERE "secrecy_level" <= $1 ;';
        pool
          .query(queryText, [req.user.clearance_level]) // moved the query text to be in a variable
          .then(results => res.send(results.rows)) // sources the user.clearance_level user's clearance level allows the to see the content.
          .catch(error => {
            console.log("Error making SELECT for secrets:", error);
            res.sendStatus(500);
          });
    } else {
        res.sendStatus(403);
    }}
);

module.exports = router;