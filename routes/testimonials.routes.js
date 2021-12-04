const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');


router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
  });
  
router.route('/testimonials/random').get((req, res) => {
  const randomEl = Math.floor(Math.random()*db.testimonials.length);
  res.json(db.testimonials[randomEl]);
});
  
router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  db.testimonials.push(  { id: uuidv4(), author: author, text: text });
  res.json({ massage: 'OK'} );
  });
  
router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const objOfArray = db.testimonials[req.params.id-1];
  objOfArray.author = author;
  objOfArray.text = text;
  res.json({ massage: 'OK'} );
});

router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials.splice(req.params.id-1, 1);
  res.json({ massage: 'OK'} );
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials[req.params.id-1]);
});

module.exports = router;
