var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

async function get(req, context) {
  var userid = req.params.querystring.id
  var data = await getItem(userid)
  return data
}

async function getItem(queryid) {
  var params = {
    TableName: 'introling-userdata',
    FilterExpression: 'userid = :userid',
    ExpressionAttributeValues: {
        ':userid': queryid
      }
  }
  var data = await docClient.scan(params).promise()
  return data.Items
}

async function update(req, context) {
  var body = req['body-json']
  var summary = body.summary
  var skills = body.skills
  var education = body.education
  var experiences = body.experiences
  var certificates = body.certificates
  var academic = body.academic
  var awards = body.awards

  var data = await getItem(body.id)
  if(data[0]){
    var userdata = data[0]
    if(!summary){
      summary = userdata.summary
    }
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
    if(!awards){
      awards = userdata.awards
    }
  }
  var updateparam = {
    TableName: 'introling-userdata',
    Item: {
      "userid": body.id,
      "summary": summary,
      "skills": skills,
      "education": education,
      "experiences": experiences,
      "certificates": certificates,
      "awards": awards,
      "academic": academic
    }
  }
  var updates = await docClient.put(updateparam).promise()
  return updateparam.Item


}


module.exports = {
  get: get,
  update: update
}
