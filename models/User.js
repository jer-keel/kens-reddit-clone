/* This is the database schema that defines what a user is in our mongo 
database. This is a simple example that can be switched out easily. */
var mongoose = require("mongoose");
var Schema =  mongoose.Schema;

// Entire comments are stored with both posts and users
// so we don't have to query the database a ton
// May refactor later
var commentSchema = new Schema({ 
  post: Number,
  text: String 
});

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String,
  salt: String,
  posts: [String],
  comments: [commentSchema],
  created: Date,
  admin_on: [String],
  member_of: [String]
});

var User = mongoose.model("User", userSchema);

User.findByGroup = function (groupName, cb) {
  return this.model('User').find({ member_of: groupName}, cb);
}

module.exports = User;
