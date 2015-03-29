// =============================================================================
// This is a routing file that deals with everything related to the API
// =============================================================================
var router = require("express").Router();

// Import all models
var User = require("../models/User");

// GET /api/user return all users
router.get("/users", function(req, res, next) {
  console.log(req.params);
  User.find(function(err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

router.get("/users/username/:username", function(req, res, next) {
  console.log(req.params);
  User.findOne({username: req.params.username}, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

// POST /api/user create a new user in the database
router.post("/users", function(req, res, next) {
  User.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// GET /api/user/:id return the user with the specified id
router.get("/users/:id", function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

// DELETE /api/user/:id delete the user with the specified id
router.delete("/users/:id", function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
