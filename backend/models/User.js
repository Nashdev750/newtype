const mongoose = require('mongoose');

// Define a sub-schema for individual test results
const testResultSchema = new mongoose.Schema({
  wpm: {
    type: Number,
    required: true,
  },
  rawWpm: {
    type: Number,
    required: true,
    default: 0
  },
  keystrokes: {
    type: Array,
    required: true,
    default: []
  },
  accuracy: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: false,
  },
  testType: {
    type: String,
    required: true,
    ref: 'Test'
  },
  completedAt: {
    type: Date,
    default: Date.now,
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: false,
  },
  profileImage: {
    type: String,
    default: null,
  },
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  lastToken: {
    type: String,
    default: null,
  },
  tokenExpiresAt: {
    type: Date,
    default: null,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // New typing test related fields
  typingStats: {
    testsStarted: {
      type: Number,
      default: 0
    },
    testsCompleted: {
      type: Number,
      default: 0
    },
    highestWpm: {
      type: Number,
      default: 0
    },
    totalTimeTyping: {  // stored in seconds
      type: Number,
      default: 0
    },
    testResults: [testResultSchema],
    highestWpmRecord: {
      wpm: { type: Number, default: 0 },
      accuracy: { type: Number, default: 0 },
      time: { type: Number, default: 0 }
    }
  }
});

// Virtual property for average WPM (last 10 tests)
userSchema.virtual('typingStats.averageWpm').get(function() {
  const recentTests = this.typingStats.testResults.slice(-10);
  if (recentTests.length === 0) return 0;
  
  const sum = recentTests.reduce((acc, test) => acc + test.wpm, 0);
  return Math.round(sum / recentTests.length);
});

// Virtual property for lifetime accuracy
userSchema.virtual('typingStats.averageAccuracy').get(function() {
  const allTests = this.typingStats.testResults;
  if (allTests.length === 0) return 0;
  
  const sum = allTests.reduce((acc, test) => acc + test.accuracy, 0);
  return Math.round((sum / allTests.length) * 100) / 100;
});

// Virtual property for recent 20 tests
userSchema.virtual('typingStats.recentTests').get(function() {
  return this.typingStats.testResults.slice(-20);
});

// Method to add a new test result
userSchema.methods.addTestResult = async function(testData) {
  const { wpm,rawWpm,keystrokes, accuracy, testType, timeSpent,time } = testData;
  
  // Update test counts and highest WPM
  this.typingStats.testsCompleted += 1;
  this.typingStats.totalTimeTyping += timeSpent;
  if (wpm > this.typingStats.highestWpm) {
    this.typingStats.highestWpm = wpm;
  }

  // Add new test result
  this.typingStats.testResults.push({
    wpm,
    rawWpm,
    keystrokes,
    accuracy,
    testType,
    time,
    completedAt: new Date()
  });

  // Keep only the last 100 test results to manage document size
  if (this.typingStats.testResults.length > 100) {
    this.typingStats.testResults = this.typingStats.testResults.slice(-100);
  }

  if (!this.typingStats.highestWpmRecord || wpm > this.typingStats.highestWpmRecord.wpm) {
    this.typingStats.highestWpmRecord = { wpm, accuracy,time };
  }

  return this.save();
};

// Method to increment tests started counter
userSchema.methods.incrementTestsStarted = async function() {
  this.typingStats.testsStarted += 1;
  return this.save();
};

// Ensure virtuals are included when converting to JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', userSchema); 