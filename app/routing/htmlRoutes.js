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
      });
    });
  });


  app.get("/venue/:venueName",
  ensureLogin.ensureLoggedIn("/login"), 
  function(req, res){ 
    var data = {
        fsVenueId: req.query.venue_id,
        fsVenueName: req.params.venueName,
        fbUser: req.user
    }

    db.Comment.findAll({ where: { fsVenueId: data.fsVenueId }})
      .then(function(results) {
        data.comments = results;
        console.log("log before the data in html routes");
        console.log(JSON.stringify(data));
        res.render("comments", data);
    }); 
    
  })
  


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