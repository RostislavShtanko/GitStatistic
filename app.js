var https = require("https");
var stdin = process.openStdin();

var options = {
    host: 'api.github.com',
    path: '/users/',
    method: 'GET',
    headers: {'user-agent': 'node.js'}
};

stdin.addListener("data", getDataFromIput);

function getDataFromIput(data){
  var name = data.toString().trim();
  if(!validateName(name)){
    console.log("Incorrect name");
    return;
  }
  options.path = '/users/' + name;
  requestToGithub(name);
}

function validateName(name) {
  return /^[A-Za-z]+$/.test(name);
}

function requestToGithub(name){
  var request = https.request(options, function(response){
    var body = '';
    response.on("data", function(chunk){
        body += chunk.toString('utf8');
    });

    response.on("end", function(){
      showRes(body);
    });
  });
  request.end();
}

function showRes(body){
  var result = JSON.parse(body);

  if(result.type != undefined) {
    console.log("type: " + result.type + "\n public repos: "
     + result.public_repos + "\n followers: " + result.followers);
  } else {
    console.log("This user doesn't exist");
  }
}

module.exports.validateName = validateName;
