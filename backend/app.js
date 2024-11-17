const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Test = require('./models/Test');
const { decrypt, encrypt } = require('./utils/encryption');
require('dotenv').config();

const app = express();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(cors());
app.use(express.json());

// Add MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Endpoint to verify Google token
app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body;

if(!credential){
  return res.status(401).json({ message: 'Unauthorized' });
}

  try {
    // Check if we have a valid user with this token already
    let existingValidUser = await User.findOne({
      lastToken: credential,
      tokenExpiresAt: { $gt: new Date() }
    });

    if (existingValidUser) {
      existingValidUser = existingValidUser.toObject()
      console.log('0-------0')
      console.log(encrypt(existingValidUser.nickname))
      existingValidUser.publicId = encrypt(existingValidUser.nickname)
      return res.status(200).json({ 
        message: 'User authenticated',
        user: existingValidUser
      });
    }

    // If no valid cached token, verify with Google
    let ticket = null
    try {
       ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });  
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = new User({
        email,
        profileImage: picture,
        googleId,
        lastToken: credential,
        tokenExpiresAt: new Date(payload.exp * 1000),
        nickname:email.split('@')[0]
      });
    } else {
      // Update existing user's token info
      user.lastToken = credential;
      user.tokenExpiresAt = new Date(payload.exp * 1000);
      user.profileImage = picture;
    }

    await user.save();
    user = user.toObject()
    console.log(encrypt(user.nickname))
    user.publicId = encrypt(user.nickname)
    res.status(200).json({ 
      message: 'User authenticated', 
      user
    });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/api/profile/:account', async (req, res) => {
  const email = decrypt(req.params.account)


  try {
  
    // Find or create user
    let user = await User.findOne({ nickname:email });

    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }
    const userProfile = user.toObject();
    const { nickname, profileImage, typingStats ,createdAt} = userProfile;
    
    res.status(200).json({user:{nickname:nickname.substring(0,5), profileImage, typingStats,createdAt}});
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Endpoint to get available tests
app.get('/api/tests', async (req, res) => {
  try {
    const tests = await Test.find({}, 'testType');
    res.status(200).json({ tests });
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({ message: 'Error fetching tests' });
  }
});

// Endpoint to get a specific test
app.get('/api/tests/:testType', async (req, res) => {
  try {
    const test = await Test.findOne({ testType: req.params.testType });
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.status(200).json({ test });
  } catch (error) {
    console.error('Error fetching test:', error);
    res.status(500).json({ message: 'Error fetching test' });
  }
});

app.get('/api/test-started/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    await user.incrementTestsStarted();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tests started count' });
  }
});
// Updated endpoint to submit a typing test result
app.post('/api/typing-test', async (req, res) => {
  const { userId, wpm, accuracy, testType, timeSpent,time } = req.body;

  try {
    // Verify that the test exists
    const test = await Test.findOne({ testType });
    if (!test) {
      return res.status(404).json({ message: 'Test type not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.addTestResult({ wpm, accuracy, testType, timeSpent,time });

    res.status(200).json({
      message: 'Test result saved successfully',
      typingStats: user.typingStats
    });
  } catch (error) {
    console.error('Error saving test result:', error);
    res.status(500).json({ message: 'Error saving test result' });
  }
});

// Helper endpoint to create a new test (admin only - you should add authentication)
app.post('/api/tests', async (req, res) => {
  const { testType, words } = req.body;

  try {
    const test = new Test({
      testType,
      words
    });
    await test.save();
    res.status(201).json({ message: 'Test created successfully', test });
  } catch (error) {
    console.error('Error creating test:', error);
    res.status(500).json({ message: 'Error creating test' });
  }
});

// Updated user profile endpoint to include test type information
app.get('/api/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get unique test types user has completed
    const completedTestTypes = [...new Set(user.typingStats.testResults.map(result => result.testType))];

    res.status(200).json({
      user: {
        email: user.email,
        nickname: user.nickname,
        profileImage: user.profileImage,
        typingStats: {
          testsCompleted: user.typingStats.testsCompleted,
          testsStarted: user.typingStats.testsStarted,
          highestWpm: user.typingStats.highestWpm,
          averageWpm: user.typingStats.averageWpm,
          averageAccuracy: user.typingStats.averageAccuracy,
          totalTimeTyping: user.typingStats.totalTimeTyping,
          recentTests: user.typingStats.recentTests,
          completedTestTypes
        }
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Endpoint to get top 10 users by WPM
app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await User.find({
      'typingStats.testResults': { $exists: true, $ne: [] }
    })
    .select('nickname typingStats')
    .sort({ 'typingStats.highestWpmRecord.wpm': -1 })
    .limit(10);
    console.log(users)
    // { rank: 1, username: "speedster", wpm: 156, accuracy: 98.5 }
    const leaderboard = users.map((user,i) => ({
      rank: i+1,
      username: user.nickname.substring(0, 5),
      wpm: user.typingStats.highestWpmRecord.wpm,
      accuracy: user.typingStats.highestWpmRecord.accuracy,
      publicId: encrypt(user.nickname)
    }));

    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
