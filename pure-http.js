const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(300, { "Content-Type": "text/html" });
    res.write("<h1>Hello World!</h1>");
    res.end();
  })
  .listen(8080);
