module.exports = {
  route: route
};

var skills = require('./skills.js')


function route(req, context){
  function handleResponse(error, response, body){
    if (error){
      context.fail(error);
    } else {
      context.succeed(body);
    }

  }
  switch(req.resource){
    case "getSkills":
    skills.get(req, context, handleResponse);
    break;
    case "updateSkills":
    skills.update(req, context, handleResponse);
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
    context.fail("Invalid resource ["+req.resource+"]");
    break;
  }
}
