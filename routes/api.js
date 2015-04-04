// =============================================================================
// This is a routing file that deals with everything related to the API
// =============================================================================
var router = require("express").Router();

// Import all models
var User = require("../models/User");
    Post = require("../models/Post");
    Group = require("../models/Group");
    Comment = require("../models/Comment");

// A couple functions for generating test data

var chars = 'abcdefghijklmnopqurstuvwxyz';

var randStr = function(length){
  var str = "";
  for (var i = 0; i < length; i++){
    var tempChar = chars[Math.floor((Math.random() * 26))];
    str += tempChar;
    //console.log(str);
  }
  return str;
}

var generateTestData = function(amount){
  for (var i = 0; i < amount; i++){
    var user = new User({username: randStr(10)});
    var comment = new Comment({text: randStr(20)});
    var post = new Post({title: randStr(10)});
    user.comments.push(comment._id);
    user.posts.push(post._id)
    comment.user = user._id;
    comment.post = post._id;
    post.comments.push(comment._id);
    post.owner = user._id;
    User.create(user, function(err, post){
      if (err) console.log(err);
      console.log(post);
    });
    Post.create(post, function(err, post){
      if (err) console.log(err);
      console.log(post);
    });
    Comment.create(comment, function(err, post){
      if (err) console.log(err);
      console.log(post);
    });
  }
}

// ==========================================================
//                            GET
// ==========================================================

// __________________________Users___________________________

// GET /api/user return all users
// Note that this is probably not a good thing to call
router.get("/m", function(req, res, next) {
  // generateTestData(20);
  User.find(function(err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

// GET /api/users/username/:username gets the requested user
router.get("/m/username/:username", function(req, res, next) {
  //console.log(req.params);
  User.findOne({username: req.params.username}, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

// GET /api/users/id/:id return the user with the specified id
router.get("/m/id/:id", function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

// GET /m/groupname/:groupname returns users of a given groupname
router.get("/m/groupId/:groupId", function(req, res, next) {
  User.findByGroup(req.params.groupname, function(err, users){
    if (err) return next(err);
    res.json(users);
  });
});

// __________________________Posts___________________________

router.get("/p", function(req, res, next) {
  // console.log("Called from posts");
  Post.find(function(err, users){
    if (err) return next(err);
    res.json(users);
  });
});

router.get("/p/groupid/:groupid", function(req, res, next) {
  Post.findByGroup(req.params.groupid, function(err, posts){
    if (err) return next(err);
    res.json(posts);
  });
});

router.get("/p/userid/:userid", function(req, res, next) {
  Post.findByUser(req.params.userid, function(err, posts){
    if (err) return next(err);
    res.json(posts);
  });
});

// _________________________Groups___________________________

// GET /g returns all groups
router.get("/g", function(req, res, next) {
  Group.find(function(err, groups){
    if (err) return next(err);
    res.json(groups);
  });
});

// GET /g/groupname/:groupname returns group of a given groupname
router.get("/g/groupname/:groupname", function(req, res, next) {
  Group.findByGroup(req.params.groupname, function(err, group){
    if (err) return next(err);
    res.json(groups);
  });
});

// GET /g/id/:id returns group of a given id
router.get("/g/id/:id", function(req, res, next) {
  Group.findByGroup(req.params.id, function(err, group){
    if (err) return next(err);
    res.json(groups);
  });
});

// ________________________Comments___________________________

// Gets comment of id
// If it doesn't find a user, passes along a 404
router.get("/c/id/:id", function(req, res, next) {
  Comment.findById(req.params.id, function(err, comment){
    if (err) return next(err);
    if (!comment) {
      var noComment = new Error("No user at this UserID");
      noComment.status = 404;
      return next(noComment); // What do if no user?
    }
    res.json(comment);
  });
});

// Gets all comments for a given userid
// If it doesn't find a user, passes along a 404
router.get("/c/userid/:userid", function(req, res, next) {
  User.findById(req.params.userid, function(err, user){
    if (err) return next(err);
    if (!user) {
      var noUser = new Error("No user at this UserID");
      noUser.status = 404;
      return next(noUser); // What do if no user?
    }
    Comment.findByIds(user.comments, function(err, comments){
      if (err) return next(err);
      res.json(comments);
    });
    //res.json(user.comments);
  });
});

// Gets all coments for a given post ID
// Tested, not thoroughly
router.get("/c/postid/:postid", function(req, res, next) {
  Post.findById(req.params.userid, function(err, post){
    if (err) return next(err);
    if (!post) {
      var noPost = new Error("No post at this PostID");
      noPost.status = 404;
      return next(noPost); // What do if no user?
    }
    Comment.findByIds(post.comments, function(err, comments){
      if (err) return next(err);
      res.json(comments);
    });
    //res.json(user.comments);
  });
});

// ==========================================================
//                          POST
// ==========================================================

// POST /api/users create a new user in the database
router.post("/users", function(req, res, next) {
  User.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post("/testPost", function(req, res, next) {
  console.log("Post request to testPost");
  res.sendStatus(200);
})

// ==========================================================
//                        DELETE
// ==========================================================

// DELETE /api/user/:id delete the user with the specified id
router.delete("/users/:id", function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
