const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  testType: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  words: {
    type: [String],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Test', testSchema); 