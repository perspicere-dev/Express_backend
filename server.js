const express = require('express');
const cors = require('cors');
const db = require('./db')
const app = express();

//import routes
const testimonials = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');
  
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); //cors stoi za funkcjonalnością wykonywania żądań AJAX-owych. Możemy np. ustawić, że nasze API pozwala na połączenie tylko i wyłączne z konkretnej domeny 

//use routes
app.use('/api', testimonials); 
app.use('/api', concerts); 
app.use('/api', seats);


app.use((req, res) => {
    res.json({ message: 'Not found...' });
    res.status(404);
  })

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});