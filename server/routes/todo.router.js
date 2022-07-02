const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
//
// DB CONNECTION


// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todo" ORDER BY "id";';
    pool.query(queryText)
        .then((result) =>{
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('AY! error in GET query', error);
            res.sendStatus(500);
        })
});

// // POST
router.post('/', (req, res) => {
    const newTask = req.body;
    const queryText = `
        INSERT INTO "todo" ("name", "description")
        VALUES ($1, $2);
    `;
    pool.query(queryText, [newTask.name, newTask.description])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('AY! error posting to db', error);
        res.sendStatus(500)
    })
});

// PUT


// // DELETE
router.delete('/:id', (req, res) => {
    let reqId = req.params.id
    console.log(`A delete request has been sent for ID ${reqId}`);
    let queryText = 'DELETE FROM "todo" WHERE "id" = $1;';
    pool.query(queryText, [reqId])
        .then(() =>{
            console.log('task deleted');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`AY! error deleting with query ${queryText}: ${error}`);
            res.sendStatus(500); // a good server always responds
        })
});

module.exports = router;