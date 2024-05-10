const http = require('http');

const host = '0.0.0.0';
const port = 4000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('si frontend port 4000');
});

server.listen(port, host, () => {
   console.log('Web server running at http://%s:%s',host,port );
});
