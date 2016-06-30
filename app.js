console.log(eval("2 + 3 * 2"));
var https = require("https");
var stdin = process.openStdin();

var options = {
    host: 'api.github.com',
    path: '/users/',
    method: 'GET',
    headers: {'user-agent': 'node.js'}
};

stdin.addListener("data", checkInput);

function checkInput(data){
  var name = data.toString().trim();
  options.path = '/users/' + name;
  requestToGithub(name);
}

function validateName(name) {

  return true;
}

function requestToGithub(name){
  var request = https.request(options, function(response){
    var body = '';

    response.on("data", function(chunk){
        readData(body, chunk);
    });
    response.on("end", showResults, body);
  });
  request.end();
}

function readData(body, chunk) {
  body += chunk.toString('utf8');
}

function showResults(result) {
  result = JSON.parse(result);

  if(result.type != undefined) {
    console.log("type: " + result.type + "\n public repos: "
     + result.public_repos + "\n followers: " + result.followers);
  } else {
    console.log("This user doesn't exist");
  }
}

module.exports.validateName = validateName;
