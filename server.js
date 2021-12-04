const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./db')
const app = express();


//import routes
const testimonials = require('./routes/testimonials.routes');
  
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); //cors stoi za funkcjonalnością wykonywania żądań AJAX-owych. Możemy np. ustawić, że nasze API pozwala na połączenie tylko i wyłączne z konkretnej domeny 

//use routes
app.use('/', testimonials); 

app.use((req, res) => {
    res.json({ message: 'Not found...' });
    res.status(404);
  })

app.listen(7000, () => {
  console.log('Server is running on port: 7000');
});