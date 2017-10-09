var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2"
});

var sns = new AWS.SNS();

function add(req, context, callback) {
  var body = req['body-json'];
  var ep = body.email

  var params = {
    Protocol: 'email',
    TopicArn: 'arn:aws:sns:us-west-2:272838180588:aws-iot-button-sns-topic',
    Endpoint: ep
  };
  console.log(params);
  sns.subscribe(params, function(err, data) {
    if (err){
      console.log(err, err.stack);
      callback(err)
    }
    else{
      console.log(data);
      var redirectPage = '<html><head><meta http-equiv="refresh" content="5;url=http://mslingsu.com/#/" /></head><body><h1>Redirecting in 5 seconds...</h1></body></html>'
      callback(null, null, redirectPage)
    }
  });
}

module.exports = {
  add: add
}
