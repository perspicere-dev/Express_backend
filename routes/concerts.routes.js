const express = require('express');
const router = express.Router();
const ConcertController = require('../Controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getOneById);

router.post('/concerts', ConcertController.post);

router.put('/concerts/:id', ConcertController.putById);

router.delete('/concerts/:id', ConcertController.deleteById);

module.exports = router;
