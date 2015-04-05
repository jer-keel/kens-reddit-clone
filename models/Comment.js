var mongoose = require("mongoose");
var Schema =  mongoose.Schema;

var commentSchema = new Schema({ 
  post: String,
  user: String,
  text: String 
});

var Comment = mongoose.model("Comment", commentSchema);

Comment.findByUserId = function(userId, cb){
  return this.model("Comment").find({user: userId}, cb);
}

Comment.findByPostId = function(postId, cb){
  return this.model("Comment").find({post: postId}, cb);
}

Comment.findByUserIds = function(userIdArr, cb){
  return this.model("Comment").find({user: {$in: userIdArr}}, cb);
}

Comment.findByPostIds = function(postIdArr, cb){
  return this.model("Comment").find({post: {$in: postIdArr}}, cb);
}

Comment.findByIds = function(IdArr, cb){
  return this.model("Comment").find({_id: {$in: IdArr}}, cb);
}

module.exports = Comment;