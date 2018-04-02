const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  image: String,
  imageAlt: String,
  username: String
});

module.exports = mongoose.model(`User`, userSchema);