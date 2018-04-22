const mongoose = require(`mongoose`);

const humanSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  image: String,
  imageAlt: String,
  description: String,
  averageStars: Number,
  ratingsCount: Number,
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
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model(`Human`, humanSchema);