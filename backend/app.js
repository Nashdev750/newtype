const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Test = require('./models/Test');
const { decrypt, encrypt } = require('./utils/encryption');
const Post = require('./models/Post');
require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');
const { default: axios } = require('axios');
const GlobalStats = require('./models/GlobalStats');
const Message = require('./models/Message');
const BlogPost = require('./models/BlogPost');

const app = express();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(cors());
app.use(express.json());

// Serve static files from the 'profile' directory
app.use('/profile', express.static(path.join(__dirname, 'profile')));

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Express application',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4000}`,
      },
    ],
  },
  apis: ['./app.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Add MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const authMiddleware = async (req,res,next)=>{
  let token = req.headers.authorization?.split(' ')[1]
  if(!token) return res.status(401).send()
    let existingValidUser = await User.findOne({
      lastToken: token,
      // tokenExpiresAt: { $gt: new Date() }
    }).lean();
  if(!existingValidUser) return res.status(401).send()
  req.user = existingValidUser
  req.author = {id:req.user._id,username:req.user.nickname.substring(0,4)+'...',avatar:req.user.profileImage}
  next()
}  

app.post('/api/contact',async (req, res)=>{
   await Message.create(req.body)
   res.send({success: true})
})

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Authenticate user with Google
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               credential:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated
 *       401:
 *         description: Unauthorized
 */

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
      console.log(error)
      return res.status(401).json({ message: 'Unauthorized' });
    }
  

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      const imagePath = `profile/${googleId}.jpg`; // Define the path for the image
      await downloadImage(picture, imagePath); // Function to download the image
      user = new User({
        email,
        profileImage: imagePath, // Save the path to the image
        googleId,
        lastToken: credential,
        tokenExpiresAt: new Date(payload.exp * 1000 + 30 * 24 * 60 * 60 * 1000),
        nickname: email.split('@')[0]
      });
    } else {
      const imagePath = `profile/${googleId}.jpg`; // Define the path for the image
      await downloadImage(picture, imagePath); //
      // Update existing user's token info
      user.lastToken = credential;
      user.tokenExpiresAt = new Date(payload.exp * 1000 + 30 * 24 * 60 * 60 * 1000);
      user.profileImage = imagePath; // Update to the new image path if needed
    }

    await user.save();
    user = user.toObject()
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

/**
 * @swagger
 * /api/profile/{account}:
 *   get:
 *     summary: Get user profile by account
 *     parameters:
 *       - name: account
 *         in: path
 *         required: true
 *         description: Encrypted user account
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       404:
 *         description: User not found
 */

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

/**
 * @swagger
 * /api/tests:
 *   get:
 *     summary: Get available tests
 *     responses:
 *       200:
 *         description: List of tests
 *       500:
 *         description: Error fetching tests
 */

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

/**
 * @swagger
 * /api/tests/{testType}:
 *   get:
 *     summary: Get a specific test by type
 *     parameters:
 *       - name: testType
 *         in: path
 *         required: true
 *         description: Type of the test to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Test found
 *       404:
 *         description: Test not found
 *       500:
 *         description: Error fetching test
 */

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

/**
 * @swagger
 * /api/test-started/{userId}:
 *   get:
 *     summary: Increment tests started count for a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tests started count incremented
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating tests started count
 */

app.get('/api/test-started/:userId', async (req, res) => {
  try {
    await GlobalStats.findOneAndUpdate(
      {},
      {
        $inc: {
          totalTestsStarted: 1
        }
      },
      { upsert: true }
    );
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
const calculateWPM = (
  keystrokes,
  timeInSeconds
) => {
  const timeInMinutes = timeInSeconds / 60;
  
  const totalKeystrokes = keystrokes.length;
  const rawWPM = Math.round((totalKeystrokes / 5) / timeInMinutes);
  
  const correctKeystrokes = keystrokes.filter(k => k.correct).length;
  const netWPM = Math.round((correctKeystrokes / 5) / timeInMinutes);
  
  return {
    wpm: netWPM,
    raw: rawWPM
  };
};
const validateTest = (keystrokes, time)=>{
  const totalTimeMs = keystrokes[keystrokes.length - 1].timestamp; 
  const totalTimeSec = totalTimeMs / 1000;  

  
  const within = (a, b, tolerance = 1) => Math.abs(a - b) <= tolerance;
  const isTimeValid = within(time, Math.round(totalTimeSec), 2); 

  return isTimeValid;
}
app.post('/api/typing-test', async (req, res) => {
  const { userId, keystrokes, wpm, rawWpm, accuracy, testType, timeSpent,time } = req.body;
  
  try {
    const stats = calculateWPM(keystrokes,time)
    if(Math.abs(stats.wpm - wpm) > 2 || Math.abs(stats.raw - rawWpm) > 2 || !validateTest(keystrokes,time)){
      res.status(500).json({ message: 'Error saving test result' });
    }
    await GlobalStats.findOneAndUpdate(
      {},
      {
        $inc: {
          totalTestsTaken: 1,
          totalTypingTime: timeSpent
        }
      },
      { upsert: true }
    );
    // Verify that the test exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.addTestResult({ wpm: stats.wpm, rawWpm: stats.raw, keystrokes, accuracy, testType, timeSpent,time });

    res.status(200).json({
      message: 'Test result saved successfully',
      typingStats: user.typingStats
    });
  } catch (error) {
    console.error('Error saving test result:', error);
    res.status(500).json({ message: 'Error saving test result' });
  }
});

/**
 * @swagger
 * /api/typing-test:
 *   post:
 *     summary: Submit a typing test result
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               keystrokes:
 *                 type: integer
 *               wpm:
 *                 type: number
 *               rawWpm:
 *                 type: number
 *               accuracy:
 *                 type: number
 *               testType:
 *                 type: string
 *               timeSpent:
 *                 type: number
 *               time:
 *                 type: number
 *     responses:
 *       200:
 *         description: Test result saved successfully
 *       404:
 *         description: User or test type not found
 *       500:
 *         description: Error saving test result
 */

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

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get user profile by user ID
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       404:
 *         description: User not found
 *       500:
 *         description: Error fetching user profile
 */

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

/**
 * @swagger
 * /api/leaderboard:
 *   get:
 *     summary: Get top 10 users by WPM
 *     responses:
 *       200:
 *         description: List of top users
 *       500:
 *         description: Error fetching leaderboard
 */

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
      keystrokes: user.typingStats.highestWpmRecord.keystrokes,
      publicId: encrypt(user.nickname)
    }));

    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
});

/**
 * @swagger
 * /api/challenge/{jsonfile}:
 *   get:
 *     summary: Get a JSON file based on the name in params
 *     parameters:
 *       - name: jsonfile
 *         in: path
 *         required: true
 *         description: Name of the JSON file
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: JSON file retrieved
 *       404:
 *         description: JSON file not found
 *       500:
 *         description: Error fetching JSON file
 */

// Endpoint to return a JSON file based on the name in params
app.get('/api/challenge/:jsonfile', async (req, res) => {
  const { jsonfile } = req.params;
  const filePath = `./challenges/${jsonfile.toLowerCase()}.json`; // Adjust the path as necessary

  try {
    const data = require(filePath); // Load the JSON file
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching JSON file:', error);
    res.status(404).json({ message: 'JSON file not found' });
  }
});

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       500:
 *         description: Error creating post
 */

// Endpoint to create a new post
app.post('/api/posts',authMiddleware, async (req, res) => {
  const { title, content, author, tags } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      author: req.author,
      tags,
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a specific post by ID with paginated comments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post found
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error fetching post
 */

// Endpoint to get all posts with pagination
app.get('/api/posts', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip((page - 1) * limit) // Skip the previous pages
      .limit(Number(limit)); // Limit the number of posts returned

    const totalPosts = await Post.countDocuments(); // Get total number of posts
    res.status(200).json({
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   get:
 *     summary: Get comments for a specific post with pagination
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of comments per page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comments retrieved
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error fetching comments
 */

// Endpoint to get a specific post by ID with paginated comments
app.get('/api/posts/:id', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Paginate comments
    const totalComments = post.comments.length;
    const paginatedComments = post.comments.slice((page - 1) * limit, page * limit);

    res.status(200).json({
      post,
      comments: paginatedComments,
      totalComments,
      totalPages: Math.ceil(totalComments / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Error fetching post' });
  }
});

/**
 * @swagger
 * /api/posts/{postId}/comments/{commentId}/replies:
 *   get:
 *     summary: Get replies for a specific comment with pagination
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of replies per page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Replies retrieved
 *       404:
 *         description: Post or comment not found
 *       500:
 *         description: Error fetching replies
 */

// Endpoint to add a comment to a post
app.post('/api/posts/:postId/comments',authMiddleware, async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = {
      _id: new mongoose.Types.ObjectId().toString(),
      content,
      author: req.author,
      likes:0,
      createdAt: new Date(),
      replies:[]
    };

    post.comments.push(newComment);
    await post.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment' });
  }
});


function findCommentById(comments, commentId,newcomment) {
  for (const comment of comments) {
    if (comment._id.toString() === commentId) {
      comment.replies.push(newcomment)
      return true; // Found the comment
    }
    // Recursively search in replies if they exist
    if (comment.replies && comment.replies.length > 0) {
      const found = findCommentById(comment.replies, commentId,newcomment);
      if(found) return found;
    }
  }
  return false;
}

// Endpoint to reply to a comment
app.post('/api/posts/:postId/comments/:commentId/replies',authMiddleware, async (req, res) => {
  const { content } = req.body;
  const { postId, commentId } = req.params;
 
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
  

  

    const newReply = {
      _id: new mongoose.Types.ObjectId().toString(),
      content,
      author: req.author,
      likes:0,
      createdAt: new Date(),
      replies:[]
    };
    
    const iscommented = findCommentById(post.comments, commentId, newReply) 
    if (!iscommented) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    post.markModified('comments');
    post.markModified('replies');
    await post.save();

    res.status(201).json(newReply);
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ message: 'Error adding reply' });
  }
});

// Endpoint to like a post
app.post('/api/posts/:postId/like', async (req, res) => {
  const { userId } = req.body; // Assuming userId is sent in the request body

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likes += 1; // Increment likes
    await post.save();

    res.status(200).json({ message: 'Post liked successfully', likes: post.likes });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Error liking post' });
  }
});

// Endpoint to like a comment
app.post('/api/posts/:postId/comments/:commentId/like', async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    comment.likes += 1; // Increment likes
    await post.save();

    res.status(200).json({ message: 'Comment liked successfully', likes: comment.likes });
  } catch (error) {
    console.error('Error liking comment:', error);
    res.status(500).json({ message: 'Error liking comment' });
  }
});

// Endpoint to like a reply
app.post('/api/posts/:postId/comments/:commentId/replies/:replyId/like', async (req, res) => {
  const { postId, commentId, replyId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const reply = comment.replies.id(replyId);
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    reply.likes += 1; // Increment likes
    await post.save();

    res.status(200).json({ message: 'Reply liked successfully', likes: reply.likes });
  } catch (error) {
    console.error('Error liking reply:', error);
    res.status(500).json({ message: 'Error liking reply' });
  }
});

// Endpoint to get recent posts
app.get('/api/posts/recent', async (req, res) => {
  const { limit = 10 } = req.query; // Default to limit 10

  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(Number(limit));

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    res.status(500).json({ message: 'Error fetching recent posts' });
  }
});

// Endpoint to get hot posts
app.get('/api/posts/hot', async (req, res) => {
  const { limit = 10 } = req.query; // Default to limit 10

  try {
    const posts = await Post.find()
      .sort({ likes: -1 }) // Sort by likes
      .limit(Number(limit));

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching hot posts:', error);
    res.status(500).json({ message: 'Error fetching hot posts' });
  }
});

// Endpoint to get top posts
app.get('/api/posts/top', async (req, res) => {
  const { limit = 10 } = req.query; // Default to limit 10

  try {
    const posts = await Post.find()
      .sort({ likes: -1 }) // Sort by likes
      .limit(Number(limit));

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching top posts:', error);
    res.status(500).json({ message: 'Error fetching top posts' });
  }
});

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   post:
 *     summary: Add a comment to a post
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error adding comment
 */

/**
 * @swagger
 * /api/posts/{postId}/comments/{commentId}/replies:
 *   post:
 *     summary: Reply to a comment
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reply added successfully
 *       404:
 *         description: Post or comment not found
 *       500:
 *         description: Error adding reply
 */

/**
 * @swagger
 * /api/posts/{postId}/like:
 *   post:
 *     summary: Like a post
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post liked successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error liking post
 */

/**
 * @swagger
 * /api/posts/{postId}/comments/{commentId}/like:
 *   post:
 *     summary: Like a comment
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment liked successfully
 *       404:
 *         description: Post or comment not found
 *       500:
 *         description: Error liking comment
 */

/**
 * @swagger
 * /api/posts/{postId}/comments/{commentId}/replies/{replyId}/like:
 *   post:
 *     summary: Like a reply
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *       - name: replyId
 *         in: path
 *         required: true
 *         description: ID of the reply
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reply liked successfully
 *       404:
 *         description: Post, comment, or reply not found
 *       500:
 *         description: Error liking reply
 */

/**
 * @swagger
 * /api/posts/recent:
 *   get:
 *     summary: Get recent posts
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of posts to return
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of recent posts
 *       500:
 *         description: Error fetching recent posts
 */

/**
 * @swagger
 * /api/posts/hot:
 *   get:
 *     summary: Get hot posts
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of posts to return
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of hot posts
 *       500:
 *         description: Error fetching hot posts
 */

/**
 * @swagger
 * /api/posts/top:
 *   get:
 *     summary: Get top posts
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of posts to return
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of top posts
 *       500:
 *         description: Error fetching top posts
 */


app.get('/api/sitemap', (req, res) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://monkeytype.live/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://monkeytype.live/leaderboard</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  res.header('Content-Type', 'application/xml'); // Set the content type to XML
  res.send(sitemap); // Send the sitemap as the response
});

//blog post
app.get('/api/blog', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const posts = await BlogPost.find()
      .select('-content') // Exclude HTML content
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    const total = await BlogPost.countDocuments();

    res.json({
      total,
      page: parseInt(page),
      pageSize: posts.length,
      posts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.get('api/blog/:id', async (req, res) => {
//   try {
//     const post = await BlogPost.findById(req.params.id);
//     if (!post) return res.status(404).json({ error: 'Post not found' });
//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.get('api/blog/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({slug:req.params.slug});
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
function slugify(title) {
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')  // Replace spaces and non-word chars with hyphens
    .replace(/^-+|-+$/g, '');   // Remove leading/trailing hyphens
}

app.post('/api/blog', async (req, res) => {
  try {
    const slug = slugify(req.body.title || '');
    const newPost = new BlogPost({ ...req.body, slug });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.put('/api/blog/:id', async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.body.title) {
      updates.slug = slugify(req.body.title);
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.delete('/api/blog/:id', async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: 'Post not found' });
    res.json(deletedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Function to download the image
const downloadImage = async (url, path) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' }); // Ensure response is in arraybuffer format
  const buffer = Buffer.from(response.data); // Create a buffer from the response data
  fs.writeFileSync(path, buffer); // Save the image to the specified path
};
