// =============================================================================
// This file handles generic routing and can be used for a multitude of purposes
// right now it is only used to serve up index.html, but that could easily be
// changed to other things. The API and the auth routes were moved to separate 
// files to further modularize the code.
// =============================================================================
var path = require("path"); 
var router = require("express").Router();

app.get("/", function(req, res) {
  console.log("Called from routes")
  res.sendFile(path.resolve("./client/html/index.html"));
});

module.exports = router;
