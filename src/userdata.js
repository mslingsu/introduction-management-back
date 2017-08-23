var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

function get(req, context, callback) {
  var userid = req.params.querystring.id
  getItem(userid, function(err, data){
    if (err) {
      callback(err);
    } else {
      callback(null, null, data);
    }
  })
}

function getItem(queryid, callback) {
  var params = {
    TableName: 'introling-userdata',
    FilterExpression: 'userid = :userid',
    ExpressionAttributeValues: {
        ':userid': queryid
      }
  }
  docClient.scan(params, function(err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data.Items);
    }
  })
}

function update(req, context, callback) {
  var body = req['body-json']
  var skills = body.skills
  var education = body.education
  var experiences = body.experiences
  var certificates = body.certificates
  var academic = body.academic

  getItem(body.id, function(err, data){
    console.log("data: ", data);
    if(data[0]){
      var userdata = data[0]
      console.log("userdata: ", userdata)
      if(!skills){
        skills = userdata.skills
      }
      if(!education){
        education = userdata.education
      }
      if(!experiences){
        experiences = userdata.experiences
      }
      if(!certificates){
        certificates = userdata.certificates
      }
      if(!academic){
        academic = userdata.academic
      }
    }

    var updateparam = {
      TableName: 'introling-userdata',
      Item: {
        "userid": body.id,
        "skills": skills,
        "education": education,
        "experiences": experiences,
        "certificates": certificates,
        "academic": academic
      }
    }
    console.log("updateparam: ", updateparam);
    docClient.put(updateparam, function(err, data) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        console.log("UPDATED SKILL: ", updateparam.Item);
      }
    })
  })


}


module.exports = {
  get: get,
  update: update
}
