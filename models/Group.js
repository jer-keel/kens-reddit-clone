/* This is the database schema that defines what a user is in our mongo 
database. This is a simple example that can be switched out easily. */
var mongoose = require("mongoose");
var Schema =  mongoose.Schema;

var groupSchema = new Schema({
  title: {
    type: String, 
    required: true,
    unique: true
  }
  info: String, 
  posts: [comment_ids], 
  owner: user_id, 
  upvotes: [user_ids], 
  downvotes: [user_ids], 
  created: Date
});

var Group = mongoose.model("Group", groupSchema);

Group.findByGroup = function (groupName, cb) {
  return this.model('User').find({ title: groupName}, cb);
}

module.exports = mongoose.model("Group", groupSchema);
