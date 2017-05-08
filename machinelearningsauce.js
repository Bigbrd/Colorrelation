// 1. Just write one javascript function  -
// ○ Initialize() - starts with initial data - returns a model json to pass to frontend
// ○ Update(model, newData) - adds new data -  returns a model json to pass to frontend. //can do just this instead of initialize if newData == {}
// And put them in a foo.js file and run node foo to test it.

//maml-server.js
let http = require("http");
let https = require("https");
let fs = require("fs");
let config = require("./config.js");


let data = {
  "Inputs": {
    "input1": [{
      "index": "1",
      "userCookieGuid": "",
      "isActive": "false",
      "date": "",
      "selected__red": "1",
      "selected__green": "1",
      "selected__blue": "1",
      "notSelected1__red": "1",
      "notSelected1__green": "1",
      "notSelected1__blue": "1",
      "notSelected2__red": "1",
      "notSelected2__green": "1",
      "notSelected2__blue": "1",
      "notSelected3__red": "1",
      "notSelected3__green": "1",
      "notSelected3__blue": "1",
    }],
  },
  "GlobalParameters": {}
};

let model = {};

function getPred(data) {
  console.log("===getPred()===");
  let dataString = JSON.stringify(data);
  
  //these are secrets that are hidden in config.js
  let method = "POST";
    let host = config.host;
  let path = config.path;
    let api_key = config.api_key;

  let headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + api_key
  };

  let options = {
    host: host,
    port: 443,
    path: path,
    method: "POST",
    headers: headers
  };

  console.log("data: " + data);
  console.log("method: " + method);
  console.log("api_key: " + api_key);
  console.log("headers: " + headers);
  console.log("options: " + options);


  let mlData = ''; //THIS IS THE OUTPUT.


  let reqPost = https.request(options, function (res) {
    console.log("===reqPost()===");
    console.log("StatusCode: ", res.statusCode);
    console.log("headers: ", res.headers);

    res.on("data", function (d) {
        console.log("===ondata===");
        process.stdout.write(d);
        mlData += d;
    });

    // Would need more parsing out of prediction from the result here
    res.on("end", () => {
        console.log("===onend===");
        let reqData = JSON.stringify(mlData);
        console.log(reqData);
        //HERE is where I should write this out somewhere.
    });

  });

    console.log("===writestuff===");
  reqPost.write(dataString);
  reqPost.end();
  reqPost.on("error", function (e) {
    console.error(e);
  });

}

//Could build feature inputs from web form or RDMS. This is the new data that needs to be passed to the web service.
function buildFeatureInput() {
  console.log("===performRequest()===");
  getPred(data);
}

function send404Reponse(response) {
  response.writeHead(404, {
    "Context-Type": "text/plain"
  });
  response.write("Error 404: Page not Found!");
  response.end();
}

function onRequest(request, response) {
  if (request.method == "GET" && request.url == "/") {
    response.writeHead(200, {
      "Context-Type": "text/plain"
    });
    fs.createReadStream("./index.html").pipe(response);
  } else {
    send404Reponse(response);
  }
}

http.createServer(onRequest).listen(8050);
console.log("Server is now running on port 8050");
buildFeatureInput();
