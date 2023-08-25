const http = require('http');
const url = require('url');

const port = 3000;

// Simulated user data for authentication
const users = [
  { id: 1, email: 'asd@asd.com', password: 'a' }
];

const server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'POST' && parsedUrl.pathname === '/authenticate') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      console.log(body)
      const { email, password } = JSON.parse(body);

      console.table({ email, password })

      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        console.log('authenticated')
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Authentication successful', user, token: 'asd.asd.com' }));
      } else {
        console.log('not authenticated')
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Authentication failed' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});