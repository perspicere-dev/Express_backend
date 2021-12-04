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
  const { newSeat, newClient } = req.body;
  const objOfArray = db.seats[req.params.id-1];
  if(newSeat && newClient) { //simple validation
    objOfArray.seat = newSeat;
    objOfArray.client = newClient;
  }
  else {
    res.send('You can\'t leave fields empty!')
  }
  res.json({ massage: 'OK'} );
});

router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(req.params.id-1, 1);
  res.json({ massage: 'OK'} );
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats[req.params.id-1]);
});

module.exports = router;