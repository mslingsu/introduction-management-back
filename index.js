var app = require("./src/app.js");

exports.handler = function(event, context) {
  try {
    app.route(event, context);
  } catch (err) {
    console.log("RDash Lambda Error", JSON.stringify(err));
  }
};
