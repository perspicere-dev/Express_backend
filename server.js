require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

//import routes
const testimonials = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');
  
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); //cors stoi za funkcjonalnością wykonywania żądań AJAX-owych. Możemy np. ustawić, że nasze API pozwala na połączenie tylko i wyłączne z konkretnej domeny 
app.use(express.static(path.join(__dirname, '/client/build'))); // express.static, pozwala udostępniać całe foldery.
app.use(helmet());

app.use((req, res, next) => { // w SeatChooser Pojawia się tylko jeden problem. Stała io, która jest referencją do naszego serwera i z której moglibyśmy wyemitować zdarzenie, jest obecna w pliku server.js, a nasz endpoint w innym. Nie mamy do tej stałej dostępu. w server.js dodać middleware, który będzie uruchamiany przed konkretnymi endpointami (a więc również przed /seats POST) i doda do obiektu req lub res dodatkowy parametr, który będzie referencją do naszego io, na przykład req.io. Dzięki temu mielibyśmy do niego dostęp w każdym endpoincie, nawet w takim, który jest w zewnętrznym pliku.
  req.io = io;
  next();
});

// connects our backend code with the database 
const NODE_ENV = process.env.NODE_ENV;
const dbPass = process.env.DB_PASS;
let dbUri = '';

if (NODE_ENV === 'production') dbUri = `mongodb+srv://china777:${dbPass}@learningmongodb.vgoj7.mongodb.net/newWave777?retryWrites=true&w=majority`;
else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/newWaveDBtest';
else dbUri = 'mongodb://localhost:27017/newWaveDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
  console.log('process.env.NODE_ENV', process.env.NODE_ENV )
});
db.on('error', err => console.log('Error ' + err))

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

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server); 

io.on('connection', (socket) => {
  console.log('new socket!');
  socket.on('seatsUpdated', (seats) => {
    console.log('seats from endp', seats);
  });
})

module.exports = server;

//it was like:
//in terminal ex.: export NODE_ENV=production
//in terminal ex.: export dbPass=admin
//check process.env: node --print 'process.env'
//but after require('dotenv').config() it is simpler, check file .env
  