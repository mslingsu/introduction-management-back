var skills = require("./src/skills.js")
var app = require("./src/app.js")

function testskills(){
  var context = {}
  var req = {
"body-json": {
   "skills": [{
     "skill": "foo",
     "details": "bar",
     "order": 200
   },
   {
     "skill": "foo1",
     "details": "bar1"
   },
{
  "skill": "JavaScript",
  "details": "Nodejs, vue.js",
  "order": 2
}]
}
  }
  skills.update(req, context, function(err, response, data){
    if (err){
      console.log(err);
    } else {
      console.log("DATA", data);
    }
  })

}

testskills()
