const Concert = require('../Models/concert.model');


exports.getAll = async (req, res) => {
    try {
      res.json(await Concert.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.getOneById = async (req, res) => {

  try {
    const con = await Concert.findById(req.params.id);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  } 
}

exports.post = async (req, res) => {
  try {
  
    const { performer, genre, price, day, image } = req.body;
    const newPerformer = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newPerformer.save();
    res.json({ message: 'OK' });
  
  } catch(err) {
    res.status(500).json({ message: err });
  }
}
  
exports.putById = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  console.log('req.params', req.params);
  
  try {
    const con = await Concert.findById(req.params.id);
    if(con) {
      await Concert.findByIdAndUpdate({ _id: req.params.id }, {performer: performer, genre: genre, price: price, day: day, image: image }, (err, updated) => {
        // console.log('updated', updated)
        // console.log('!!!req.params.performer:', req.params)
      });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}  
exports.deleteById = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if(con) {
      await Concert.findByIdAndDelete({ _id: req.params.id }, (err, deleted) => {
        console.log('deleted', deleted)
      });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getPerformer = async (req, res) => {

  try {
    const con = await Concert.find({performer: req.params.performer});
    if(!con) res.status(404).json({ message: 'Performer not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  } 
}

exports.getGenre = async (req, res) => {
  console.log('dupa')

  try {
    const con = await Concert.find({genre: req.params.genre});
    if(!con) res.status(404).json({ message: ' not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  } 
}

exports.getMinMaxPrice = async (req, res) => {
  const min = req.params.min
  const max = req.params.max
  try {
    const con = await Concert.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } }] });
    if (!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getDay = async (req, res) => { 

  try {
    const con = await Concert.find({ day: req.params.day });
    if (!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

// TODO - getDay - nie dziala. Pomimo tego ze działało wczesniej getMinMaxPrice tez jest w number i dziala "Cast to number failed for value \"day\" at path \"price\" for model \"Concert\"", 