var subscribe = require('./src/subscribe.js')
var app = require('./src/app.js')

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

// testskills()
testsubscribe()
