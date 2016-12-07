// load libraries needed
let http = require('http');
let fs = require('fs');

// Lets define a port we want to listen to
const PORT = 8888; 

// Create a server
let server = http.createServer((request, response) => {
  // load index.html
  var index = fs.readFileSync('index.html');

  // always return index.html
  response.end(index);
});

// start the server
server.listen(PORT);