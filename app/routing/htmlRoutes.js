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
    var fsData = [];
    if ('fsData' in req.session && req.session.fsData != "") {
      fsData = JSON.parse(req.session.fsData).response.venues;
    }
    
   var chosenVenue = fsData.filter((venue) => {
     if(venue.id === req.query.venue_id) {
       return true;
     }
   })

    var data = {
        routeName: req.params.venueName,
        fsVenueId: req.query.venue_id,
        fsVenueData: chosenVenue[0],
        fbUser: req.user
    }

    console.log("=================================")
    console.log(data)
    console.log("=================================")


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