var path = require("path");
var request = require("request");
console.log(path);
require("dotenv").config();
//var keys = require("../../keys.js");
var ensureLogin = require("connect-ensure-login");
var db = require("../models");

console.log(path);

var NodeGeocoder = require("node-geocoder");

var options = {
  provider: "google",

  // Optional depending on the providers
  httpAdapter: "https", // Default
  apiKey: process.env.apiKey, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);

module.exports = function(app) {
  app.post("/api", function(req, res) {
    var newSearch = req.body;
    var location = newSearch.location;
    geocoder
      .geocode(location)
      .then(function(res) {
        var latitude = res[0].latitude.toFixed(2);
        var longitude = res[0].longitude.toFixed(2);
        console.log("lat and long " + latitude + " and   " + longitude);
        return latitude + "," + longitude;
      })
      .then(function(result) {
        request(
          {
            url: "https://api.foursquare.com/v2/venues/search",
            method: "GET",
            qs: {
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET,
              ll: result,
              query: newSearch.name,
              v: "20180323",
              limit: 5
            }
          },
          function(err, result, body) {
            if (err) {
              console.error(err);
            } else {
              console.log(JSON.parse(body, null, 2));
              return res.json(JSON.parse(body));
            }
          }
        );
      });
  });

  app.post(
    "/api/venue/:venueName",
    ensureLogin.ensureLoggedIn("/login"),
    function(req, res) {
      var newbar = req.body;

      db.Comment.findAll({ where: { fsVenueId: newbar.fourSquareId } }).then(
        function(results) {
          console.log(results);
          newbar.user = req.user;
          newbar.comments = results;
          console.log(newbar);
          return res.json(newbar); // when the time comes, remove this, and use the line below.
          //res.render("venues", newbar);
        }
      );
    }
  );

  app.post(
    "/api/comment/:venueName",
    ensureLogin.ensureLoggedIn("/login"),
    function(req, res) {
      var bar = req.body;

      Comment.create({
        fbUserId: bar.fbUserId,
        fbUserDisplayName: bar.fbUserDisplayName,
        fsVenueId: bar.fsVenueId,
        body: bar.body
      });
    }
  );

  // Get all examples
  app.get("/api/examples", ensureLogin.ensureLoggedIn("/login"), function(
    req,
    res
  ) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", ensureLogin.ensureLoggedIn("/login"), function(
    req,
    res
  ) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete(
    "/api/examples/:id",
    ensureLogin.ensureLoggedIn("/login"),
    function(req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function(
        dbExample
      ) {
        res.json(dbExample);
      });
    }
  );
};
