var path = require("path");
var request = require('request');
module.exports = function (app) {

    app.post("/api", function (req, res) {
       
        newSearch = req.body;
        request({
            url: 'https://api.foursquare.com/v2/venues/search',
            method: 'GET',
            qs: {
              client_id: 'ILMLHZWCXE2UVCAMQCTI0IYDKLU4YLUQANSWQVNLPZJW0IY4',
              client_secret: 'HO010YK2ASDUOAXEWIQCHH1XFCY3FLORRJIDZUJ0ZRIUHWHR',
              ll: '39.9717,-75.1280',
              query: newSearch.name,
              v: '20180323',
              limit: 1
            }
          }, function(err, result, body) {
            if (err) {
              console.error(err);
            } else {
              console.log(JSON.parse(body, null, 2));
              return res.json(JSON.parse(body));
            }
          });
        

       

    });

}