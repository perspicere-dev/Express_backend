const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');


router.route('/seats').get((req, res) => {
    res.json(db.seats);
  });
  
router.route('/seats').post((req, res) => {
  const { seat, client } = req.body;
  db.seats.push(  { id: uuidv4(), seat: seat, client: client });
  res.json({ massage: 'OK'} );
  });
  
router.route('/seats/:id').put((req, res) => {
  const { seat, client } = req.body;
  const objOfArray = db.seats[req.params.id-1];
  objOfArray.seat = seat;
  objOfArray.client = client;
  res.json({ massage: 'OK'} );
  console.log('db.seats[req.params.id-1]', db.seats[req.params.id-1])
});

router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(req.params.id-1, 1);
  res.json({ massage: 'OK'} );
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats[req.params.id-1]);
});

module.exports = router;