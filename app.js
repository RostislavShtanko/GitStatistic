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
        body += chunk.toString('utf8');
    });

    response.on("end", function(){
        var result = JSON.parse(body);

        if(result.type != undefined) {
          console.log("type: " + result.type + "\n public repos: "
           + result.public_repos + "\n followers: " + result.followers);
        } else {
          console.log("This user doesn't exist");
        }
    });
  });
  request.end();
}

module.exports.validateName = validateName;
