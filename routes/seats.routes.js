const express = require('express');
const router = express.Router();
const SeatsController = require('../Controllers/seats.controller')

router.get('/seats', SeatsController.getAll);

router.get('/seats/:id', SeatsController.getOneById);

router.post('/seats', SeatsController.post);

router.put('/seats/:id', SeatsController.putById);

router.delete('/seats/:id', SeatsController.deleteById);

module.exports = router;