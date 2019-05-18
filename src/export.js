var docx = require("docx");
var AWS = require("aws-sdk");
var userdata = require('./userdata.js')
var documentCreator = require('./documentCreator.js')
const { Packer } = docx;

AWS.config.update({
  region: "us-west-2"
});

var s3 = new AWS.S3();

async function exportCV(req, context){
  // Testing
  var data = await userdata.get(req, context)
    // TODO implement err handling
    var doc = documentCreator.create(data)
    const packer = new Packer();
    var b64string = await packer.toBase64String(doc)
    var date = new Date().toISOString()
    var filename = req.params.querystring.id + "_" + date + ".docx"
    var params = {Bucket: "introduce-ling-thumb", Key: filename, Body: Buffer.from(b64string, "base64")};
    var upload = await s3.putObject(params).promise()
    console.log(upload);
    var url = s3.getSignedUrl('getObject', {Bucket: "introduce-ling-thumb", Key: filename, Expires: 120});
    console.log(url);
    return url
}


module.exports = {
  exportCV: exportCV
}
