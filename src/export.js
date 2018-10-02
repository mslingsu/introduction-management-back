var docx = require("docx");
var AWS = require("aws-sdk");
var userdata = require('./userdata.js')
var documentCreator = require('./documentCreator.js')
const { Packer } = docx;

AWS.config.update({
  region: "us-west-2"
});

var s3 = new AWS.S3();

function exportCV(req, context, callback){
  // Testing
  userdata.get(req, context, function(err, config, data){
    // TODO implement err handling
    if(data){
      var doc = documentCreator.create(data)
      var packer = new Packer();
      packer.toBase64String(doc)
      .then(function(b64string) {
        var date = new Date().toISOString()
        var filename = req.params.querystring.id + "_" + date + ".docx"
        var params = {Bucket: "introduce-ling-thumb", Key: filename, Body: Buffer.from(b64string, "base64")};

        s3.putObject(params, function(err, data) {
          if (err) {
            console.log("S3 file upload error", err);
          }
          else {
            var url = s3.getSignedUrl('getObject', {Bucket: "introduce-ling-thumb", Key: filename, Expires: 120});
            console.log(url);
            callback(null, null, url);
          }
        })
      })
    }

  })

}


module.exports = {
  exportCV: exportCV
}
