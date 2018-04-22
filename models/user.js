const mongoose = require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  image: String,
  imageAlt: String,
  description: String,
  username: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  humanAccount: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Human`
    }
  },
  commentsMade: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: `Comment`
    }
  ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model(`User`, userSchema);