const express = require('express');
const router = express.Router();
const TestimonialsController = require('../Controllers/testimonial.controller')

router.get('/testimonials', TestimonialsController.getAll);

router.get('/testimonials/random', TestimonialsController.getRandom);

router.get('/testimonials/:id', TestimonialsController.getOneById);

router.post('/testimonials', TestimonialsController.post);

router.put('/testimonials/:id', TestimonialsController.putById);

router.delete('/testimonials/:id', TestimonialsController.deleteById);

module.exports = router;

