/* This is the database schema that defines what a user is in our mongo 
database. This is a simple example that can be switched out easily. */
var mongoose = require("mongoose");
var Schema =  mongoose.Schema;

// Entire comments are stored with both posts and users
// so we don't have to query the database a ton
// May refactor later
var commentSchema = new Schema({ 
  user: Number,
  text: String 
});

var postSchema = new Schema({
  title: String, 
  sidebar_info: String, 
  comments: [commentSchema], 
  owner: String, 
  upvotes: [String], 
  downvotes: [String], 
  created: Date
});

module.exports = mongoose.model("Post", postSchema);
