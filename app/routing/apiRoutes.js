var path = require("path");
var request = require("request");
var NodeGeocoder = require("node-geocoder");

var options = {
  provider: "google",

  // Optional depending on the providers
  httpAdapter: "https", // Default
  // apiKey: "PkbrJL7xu1GhLJIDiKQ8bOuvgKb3LzAV", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);
console.log(path);




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
            clientId: "LOTPTDA4CBLSW44V2PHFTFIET1TNAQLOZ1USKWP3GEK11MEI",
            clientSecret: "2AZKLG2BS1UTUKNDNKWRR3RD2RRCUADX113OBHCFOCKOIECE",
            ll: result,
            query: newSearch.name,
            v: "20180323",
            limit: 1
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

};