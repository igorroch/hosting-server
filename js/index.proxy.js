
const { createServer } = require('http');
const { default: withArgosProxy } = require('./withArgosProxy');

// Start Server
const port = parseInt(process.env.PORT, 10) || 80;
const host = process.env.HOST || 'localhost';

  createServer((req, res) => {
    if (withArgosProxy(req, res, req.headers.host)) {
      return;
    }
    
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Page Not Found!');
    res.end();
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${host}:${port}`);
  });
