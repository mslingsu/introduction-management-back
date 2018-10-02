var subscribe = require('./src/subscribe.js')
var app = require('./src/app.js')
// var Canvas = require('canvas')
var AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2"
});

var s3 = new AWS.S3();
function testsubscribe() {
req = {
  "resource": "subscribe",
  "body-json": {
    "email": "sl_62469430@hotmail.com"
  }
}
context = {}
// app.route(req, context)
subscribe.add(req, context, function(err, response, data){

})

}

function testExport() {
  req = {
    "resource": "download",
    "params": {
      "querystring": {
        "id": "mslingsu"
      }
  }
}
context = {}
app.route(req, context, function(err, data){
  
})
}


testExport()
// testskills()
// testsubscribe()
