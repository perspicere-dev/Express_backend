const express = require('express');
const cors = require('cors');
const db = require('./db')
const app = express();
const path = require('path');

//import routes
const testimonials = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');
  
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); //cors stoi za funkcjonalnością wykonywania żądań AJAX-owych. Możemy np. ustawić, że nasze API pozwala na połączenie tylko i wyłączne z konkretnej domeny 
app.use(express.static(path.join(__dirname, '/client/build')));

//use routes
app.use('/api', testimonials); 
app.use('/api', concerts); 
app.use('/api', seats);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });


app.use((req, res) => {
    res.json({ message: 'Not found...' });
    res.status(404);
  })

  app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  });
  