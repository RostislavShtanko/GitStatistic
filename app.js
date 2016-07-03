var stdin = process.openStdin();
var Requester = require('./requester').Requester;

var requesterInstance = new Requester('api.github.com', '/users/', 'GET');

stdin.addListener("data", function(data) {
  getDataFromIput(data, validateName);
});

function getDataFromIput(data, validator){
  var name = data.toString().trim();
  if(!validator(name)){
    console.log("Incorrect name");
    return;
  }

  requesterInstance.requestToGithub(name);
}

function validateName(name) {
  return /^[A-Za-z]+$/.test(name);
}

module.exports.validateName = validateName;
module.exports.getDataFromIput = getDataFromIput;
module.exports.requesterInstance = requesterInstance;
