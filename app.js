const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      const main = fs.readFileSync("./pages/index.html", "utf8");

      res.statusCode = 200;
      res.setHeader("content-type", "text/html; chatset=utf-8");
      res.write(main);
      res.end();
    }
    if (req.url === "/calendar.js") {
      const script = fs.readFileSync("./components/calendar.js", "utf8");

      res.statusCode = 200;
      res.setHeader("content-type", "text/javascript; charset=utf-8");
      res.write(script);
      res.end();
    }
    if (req.url === "/style.css") {
      const style = fs.readFileSync("./styles/style.css", "utf8");

      res.statusCode = 200;
      res.setHeader("content-type", "text/css; charset=utf-8");
      res.write(style);
      res.end();
    }
  }
});

const PORT = 3000;
server.listen(() => {
  console.log(`http://localhost:${PORT}`);
});
