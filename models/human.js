const mongoose = require(`mongoose`);

const humanSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  image: String,
  imageAlt: String,
  averageStars: Number,
  addedBy: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `User`
    }
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Comment`
    }
  ]
});

module.exports = mongoose.model(`Human`, humanSchema);