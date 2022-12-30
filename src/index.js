const http = require('http');

const server = http.createServer((req, res) => {
  console.log("request: ", req);
  console.log("response: ", res);
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify({ message: 'hello' }));
    res.end();
    return;
  }
  res.writeHead(404, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify({ message: 'nope' }))
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`);
})