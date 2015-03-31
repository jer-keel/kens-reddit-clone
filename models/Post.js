/* This is the database schema that defines what a user is in our mongo 
database. This is a simple example that can be switched out easily. */
var mongoose = require("mongoose");
var Schema =  mongoose.Schema;

var postSchema = new Schema({
  title: String, 
  sidebar_info: String, 
  comments: [String], 
  owner: String, 
  upvotes: [String], 
  downvotes: [String], 
  created: Date
});

module.exports = mongoose.model("Post", postSchema);
