var path = require("path");
//var passport = require('passport');


module.exports = function (app) {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });


};

console.log(path);