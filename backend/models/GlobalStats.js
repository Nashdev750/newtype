const mongoose = require('mongoose');

const globalStatsSchema = new mongoose.Schema({
  totalTestsTaken: { type: Number, default: 0 },
  totalTestsStarted: { type: Number, default: 0 },
  totalTypingTime: { type: Number, default: 0 },
});

module.exports = mongoose.model('GlobalStats', globalStatsSchema); 