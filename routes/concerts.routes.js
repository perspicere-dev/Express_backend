const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');


router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
  });
  
router.route('/concerts').post((req, res) => {
  const { performer, price } = req.body;
  db.concerts.push(  { id: uuidv4(), performer: performer, price: price });
  res.json({ massage: 'OK'} );
  });
  
router.route('/concerts/:id').put((req, res) => {
  const { performer, price } = req.body;
  const objOfArray = db.concerts[req.params.id-1];
  objOfArray.performer = performer;
  objOfArray.price = price;
  res.json({ massage: 'OK'} );
});

router.route('/concerts/:id').delete((req, res) => {
  db.concerts.splice(req.params.id-1, 1);
  res.json({ massage: 'OK'} );
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts[req.params.id-1]);
});

module.exports = router;
