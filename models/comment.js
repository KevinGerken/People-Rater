const mongoose = require(`mongoose`);

const commentSchema = new mongoose.Schema({
  stars: Number,
  comment: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `User`
    },
    username: String,
    image: String,
    imageAlt: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  forHuman: String
});

module.exports = mongoose.model(`Comment`, commentSchema);