const Seat = require('../Models/seat.model')

exports.getAll = async (req, res) => {
    try {
      res.json(await Seat.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.getOneById = async (req, res) => {

    try {
      const st = await Seat.findById(req.params.id);
      if(!st) res.status(404).json({ message: 'Not found' });
      else res.json(st);
    }
    catch(err) {
      res.status(500).json({ message: err });
    } 
  }
  
exports.post = async (req, res) => {
  try {
  
   const { seat, day, client, email } = req.body;
   const newSeat = new Seat({ seat: seat, day: day, client: client, email: email });
    await newSeat.save();
    res.json({ message: 'OK' });
  
  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.putById = async (req, res) => {
    const { seat, day, client, email } = req.body;
    
    try {
      const st = await Seat.findById(req.params.id);
      if(st) {
        await Seat.findByIdAndUpdate({ _id: req.params.id }, {seat: seat, day: day, client: client, email: email}, (err, updated) => {
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
    const st = await Seat.findById(req.params.id);
    if(st) {
      await Seat.findByIdAndDelete({ _id: req.params.id }, (err, deleted) => {
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






