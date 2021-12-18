const Testimonial = require('../Models/testimonial.model')

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandom = async (req, res) => {

  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testim = await Testimonial.findOne().skip(rand);
    if(!testim) res.status(404).json({ message: 'Not found' });
    else res.json(testim);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getOneById = async (req, res) => {

  try {
    const testim = await Testimonial.findById(req.params.id);
    if(!testim) res.status(404).json({ message: 'Not found' });
    else res.json(testim);
  }
  catch(err) {
    res.status(500).json({ message: err });
  } 
}
  
exports.post = async (req, res) => {
  try {
  
   const { author, text } = req.body;
   const newTestimonial = new Testimonial({ author: author, text: text});
    await newTestimonial.save();
    res.json({ message: 'OK' });
  
  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.putById = async (req, res) => {
  const { author, text } = req.body;
  
  try {
    const testim = await Testimonial.findById(req.params.id);
    if(testim) {
      await Testimonial.findByIdAndUpdate({ _id: req.params.id }, {author: author, text: text }, (err, updated) => {
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
    const testim = await Testimonial.findById(req.params.id);
    if(testim) {
      await Testimonial.findByIdAndDelete({ _id: req.params.id }, (err, deleted) => {
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






