var app = require("./src/app.js");

exports.handler = async (event, context) => {
  try {
    return await app.route(event, context);
  } catch (err){
    console.log("RDash Lambda Error", JSON.stringify(err));
  }
};
