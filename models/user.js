const mongoose = require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  image: String,
  imageAlt: String,
  username: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model(`User`, userSchema);