
var path = require("path");

var express = require("express");
var bodyParser = require("body-parser");
//var request = require('request');


var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes.js")(app);

console.log(path);


// request({
//   url: 'https://api.foursquare.com/v2/venues/explore',
//   method: 'GET',
//   qs: {
//     client_id: 'ILMLHZWCXE2UVCAMQCTI0IYDKLU4YLUQANSWQVNLPZJW0IY4',
//     client_secret: 'HO010YK2ASDUOAXEWIQCHH1XFCY3FLORRJIDZUJ0ZRIUHWHR',
//     ll: '39.9717,-75.1280',
//     query: 'bar',
//     v: '20180323',
//     limit: 5
//   }
// }, function(err, res, body) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(JSON.parse(body, null, 2));
//   }
// });



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
