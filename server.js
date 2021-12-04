const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

  
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); //cors stoi za funkcjonalnością wykonywania żądań AJAX-owych. Możemy np. ustawić, że nasze API pozwala na połączenie tylko i wyłączne z konkretnej domeny 


app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const randomEl = Math.floor(Math.random()*db.length);
  res.json(db[randomEl]);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  res.json(db.push(  { id: uuidv4(), author: author, text: text }));
//   res.json({ massage: 'OK'} );
  console.log('dbbbbb', db);
  });

app.put('/testimonials/:id', (req, res) => {
    const { author, text } = req.body;
    const objOfArray = db[req.params.id-1];
    objOfArray.author = author;
    objOfArray.text = text;
    res.json(db);
});

app.delete('/testimonials/:id', (req, res) => {
  res.json(db.splice(req.params.id-1, 1))
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db[req.params.id-1]);
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
  })

app.listen(7000, () => {
  console.log('Server is running on port: 7000');
});