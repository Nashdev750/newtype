const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  excerpt: String,
  author: String,
  date: String,
  slug: String,
  tags: [String],
  category: String,
  featured: Boolean,
  published: Boolean
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', BlogPostSchema);
