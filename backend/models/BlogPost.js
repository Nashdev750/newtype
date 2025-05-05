const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: {type:String, unique: true},
  content: String,
  excerpt: String,
  author: String,
  date: String,
  slug: {type:String, unique: true},
  tags: [String],
  category: String,
  featured: Boolean,
  published: Boolean
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', BlogPostSchema);
