var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

function get(req, context, callback) {
  var userid = req.params.querystring.userid
  var params = {
    TableName: 'introling-userskills',
    FilterExpression: 'userid = :userid',
    ExpressionAttributeValues: {
        ':userid': userid
      }
  }
  docClient.scan(params, function(err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, null, data.Items);
    }
  })
}

function update(req, context, callback) {
  var body = req['body-json']
  var updatedskills = []
  body.skills.forEach(item => {
    updatedskills.push(item.skill)
  })
  get(req, context, function(err, foo, data) {
    var exitingskills = []
    data.forEach(item => {
      exitingskills.push(item.skill)
    })
    var removeskills = exitingskills.filter(skill => updatedskills.indexOf(skill) < 0)
    if (removeskills.length > 0) {
      removeskills.forEach(skill => {
        var delparams = {
          TableName: 'introling-skills',
          Key: {
            "skill": skill
          }
        }
        docClient.delete(delparams, function(err, data) {
          if (err) {
            context.fail(err);
            return;
          } else {
            console.log("REMOVED SKILL: ", skill);
          }
        })
      })
    }
    body.skills.forEach(item => {
      var updateparam = {
        TableName: 'introling-skills',
        Item: {
          "skill": item.skill,
          "Details": item.Details,
          "order": item.order ? item.order : 1000
        }
      }
      docClient.put(updateparam, function(err, data) {
        if (err) {
          callback(err);
        } else {
          console.log("UPDATED SKILL: ", updateparam.Item);
        }
      })
    })
    callback(null, null, body.skills)
  })

}


module.exports = {
  get: get,
  update: update
}
