const http = require('http');
const https = require('https');

const host = '0.0.0.0';
const port = 4000;

var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
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
