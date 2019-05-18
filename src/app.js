module.exports = {
  route: route
};

var userdata = require('./userdata.js')
var exportCV = require('./export.js')
var subscribe = require('./subscribe.js')

async function route(req, context){
  switch(req.resource){
    case "getUserData":
    return await userdata.get(req, context);
    break;
    case "updateUserData":
    return await userdata.update(req, context);
    break;
    case "subscribe":
    return await subscribe.add(req, context);
    break;
    case "download":
    return await exportCV.exportCV(req, context);
    break;
    // case "getQuestions":
    // QuestionsService.getQuestions(req, context, handleResponse);
    // break;
    // case "updateQuestions":
    // QuestionsService.updateQuestions(req, context, handleResponse);
    // break;
    // case "getRole":
    // AuthService.getRole(req, context, handleResponse);
    // break;

    default:
    return "Invalid resource ["+req.resource+"]";
    break;
  }
}
