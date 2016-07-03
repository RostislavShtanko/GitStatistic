var https = require("https");

function Requester(reqHost, reqPath, reqMethod) {
  this.options = {
      host: reqHost,
      path: reqPath,
      method: reqMethod,
      headers: {'user-agent': 'node.js'}
  };
}

Requester.prototype.requestToGithub = function(name) {
  this.setPath(name);
  var self = this;
  var request = https.request(this.options, function(response) {
    var body = '';

    response.on("data", function(chunk) {
      body += chunk.toString('utf8');
    });

    response.on("end", function() {
      self.showRes(body);
    });
  });
  request.end();
}

Requester.prototype.showRes  = function(body) {
  var result = JSON.parse(body);

  if (result.type != undefined) {
    console.log("type: " + result.type + "\n public repos: "
     + result.public_repos + "\n followers: " + result.followers);
  } else {
    console.log("This user doesn't exist");
  }
}

Requester.prototype.setPath = function(name) {
  var pathArr = this.options.path.split('/');

  pathArr[pathArr.length - 1] = name;

  var res = pathArr.join('/');
  this.options.path = res;
}

module.exports.Requester = Requester;
