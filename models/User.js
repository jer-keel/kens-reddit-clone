/* This is the database schema that defines what a user is in our mongo 
database. This is a simple example that can be switched out easily. */
var mongoose = require("mongoose");
var Schema =  mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String,
  salt: String,
  posts: [String],
  comments: [String],
  created: Date,
  admin_on: [String],
  member_of: [String]
});

var User = mongoose.model("User", userSchema);

User.findByGroup = function (groupId, cb) {
  return this.model('User').find({ member_of: groupId}, cb);
}

module.exports = User;
