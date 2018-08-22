var path = require("path");
module.exports = function (app) {
  console.log("hello");
  app.get("/", function (req, res) {
    console.log("inside")
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }); 
  }
  
    // app.post("/api", function (req, res) {
    //   newSearch = req.body;
    
    //   //res.json(winner);
  
    //   return res.json(newSearch);
  
    // });
    // app.get("*", function (req, res) {
    //     res.sendFile(path.join(__dirname, "../public/idex.html"));
    //   })
  
  