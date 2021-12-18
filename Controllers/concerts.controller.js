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
  
  try {
    const con = await Concert.findById(req.params.id);
    if(con) {
      await Concert.findByIdAndUpdate({ _id: req.params.id }, {performer: performer, genre: genre, price: price, day: day, image: image }, (err, updated) => {
        console.log('updated', updated)
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