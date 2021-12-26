const express = require('express');
const router = express.Router();
const ConcertController = require('../Controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getOneById);

router.post('/concerts', ConcertController.post);

router.put('/concerts/:id', ConcertController.putById);

router.delete('/concerts/:id', ConcertController.deleteById);

router.get('/concerts/performer/:performer', ConcertController.getPerformer);

router.get('/concerts/genre/:genre', ConcertController.getGenre);

router.get('/concerts/price/:min/:max', ConcertController.getMinMaxPrice);

router.get('/concerts/day/:day', ConcertController.getDay);

module.exports = router;
