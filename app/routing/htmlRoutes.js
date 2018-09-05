var path = require("path");
var ensureLogin = require("connect-ensure-login");
var db = require("../models");


module.exports = function(app) {
  // Load index page
  app.get("/", 
  ensureLogin.ensureLoggedIn("/login"), 
  function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        user: req.user,
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });


  // Load example page and pass in an example by id
  app.get("/example/:id", 
  ensureLogin.ensureLoggedIn("/login"), 
  function(
    req,
    res
  ) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/profile", 
  ensureLogin.ensureLoggedIn("/login"), 
  function(req, res) {
    res.render("profile", {
      user: req.user
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

console.log(path);