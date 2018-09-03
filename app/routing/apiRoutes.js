var path = require("path");
var request = require("request");
console.log(path);
require("dotenv").config();
var keys = require("../../keys.js");
var ensureLogin = require("connect-ensure-login");
var db = require("../models");

console.log(path);
console.log(keys);
var NodeGeocoder = require("node-geocoder");

var options = {
  provider: "google",

  // Optional depending on the providers
  httpAdapter: "https", // Default
  apiKey: process.env.apiKey, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);


module.exports = function (app) {

  app.post("/api", function (req, res) {

    var newSearch = req.body;
    var location = newSearch.location;
    geocoder.geocode(location)
      .then(function (res) {
        var latitude = res[0].latitude.toFixed(2);
        var longitude = res[0].longitude.toFixed(2);
        console.log("lat and long " + latitude + " and   " + longitude);
        return latitude + "," + longitude;
      })
      .then(function (result) {
        request({
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
        }, function (err, result, body) {
          if (err) {
            console.error(err);
          } else {
            console.log(JSON.parse(body, null, 2));
            return res.json(JSON.parse(body));
          }
        });


      });
  });

  //   var bars = [
  //     {
  //       routeName: "local44",
  //       name: "Yoda",
  //       role: "Jedi Master",
  //       id: 900,
  //       forcePoints: 2000
  //     },
  //     {
  //       routeName: "craftworks",
  //       name: "Darth Maul",
  //       role: "Sith Lord",
  //       id: 200,
  //       forcePoints: 1200
  //     },
  //     {
  //       routeName: "johnnybrendas",
  //       name: "Obi Wan Kenobi",
  //       role: "Jedi Master",
  //       id: 55,
  //       forcePoints: 1350
  //     }
  //   ];

  //   app.get("/api/bars", function(req, res) {
  //     return res.json(bars);
  //   });

  // // refers to bar id // may not be the best routName
  //   app.get("/api/venue/add/:id", function(req, res) {
  //     var chosenBar = req.params.id;

  //     console.log(chosenBar);

  //     for (var i = 0; i < bars.length; i++) {
  //       if (chosenBar === bars[i].routeName) {
  //         return res.json(bars[i]);
  //       }
  //     }

  //     return res.json(false);
  //   });


  app.post("/api/venue/add", function (request, results) {
    var newBar = request.body;
    //newBar.routeName = newBar.id.replace(/\s+/g, "").toLowerCase();
    console.log("this is the new bars route ="+ newBar.name);
    //console.log("only console-logging this for eslint "+ results);
    results.json(newBar);
  });


  app.get("/api/venue/:bar", function(req, res) {
    var chosenBar = req.params.bar;
    console.log("only console-logging this for eslint "+ res);

    console.log(chosenBar);
  });

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
