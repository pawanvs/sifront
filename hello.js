// const http = require('http');
const https = require('https');

const host = '0.0.0.0';
const port = 4000;

var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('niv/privkey1.pem'),
  cert: fs.readFileSync('niv/fullchain1.pem'),
  ca:fs.readFileSync('niv/chain1.pem'),
};

const server = https.createServer(options, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('si frontend port 4000');
});

server.listen(port, host, () => {
   console.log('Web server running at https://%s:%s',host,port );
});

//lakshmi
