const mongoose = require(`mongoose`);

const humanSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  image: String,
  imageAlt: String,
  averageStars: Number
});

module.exports = mongoose.model(`Human`, humanSchema);