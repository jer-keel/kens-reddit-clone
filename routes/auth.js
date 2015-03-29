// =============================================================================
// This is a routing file the handles all routing calls that have to deal with
// authentication.
// =============================================================================
var router = require("express").Router();
var passport = require("passport");

router.get('/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/fff' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  console.log("Logout route");
  req.logout();
  res.redirect('/fff');
});

router.get('/a', function(req, res){
  console.log("Please Work");
});

module.exports = router;
