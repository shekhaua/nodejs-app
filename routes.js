const fs = require('fs');

const routesHandler = (req, res) => {
  const {url, method} = req;

  if(url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<h1>Hello world</h1>");
    res.write("<form action='/message' method='post'><input type='text' name='message'></form>")
    return res.end();
  }

  if(url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log('CHUNK', chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString().split('=')[1];
      console.log('Parsed body', parsedBody);
      fs.writeFile('message.txt', parsedBody, () => {
        console.log('POST /MESSAGE');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });

  }
  res.write("<h1>Unhandled scenario</h1>");
  res.end();
};

module.exports = routesHandler;