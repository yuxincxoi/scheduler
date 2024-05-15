import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      const main = fs.readFileSync("./public/index.html", "utf8");

      res.statusCode = 200;
      res.setHeader("content-type", "text/html; chatset=utf-8");
      res.write(main);
      res.end();
    }
    if (req.url === "/script.js") {
      const script = fs.readFileSync("./public/script.js", "utf8");

      res.statusCode = 200;
      res.setHeader("content-type", "text/javascript; charset=utf-8");
      res.write(script);
      res.end();
    }
    if (req.url === "/style.css") {
      const style = fs.readFileSync("./public/style.css", "utf8");

      res.statusCode = 200;
      res.setHeader("content-type", "text/css; charset=utf-8");
      res.write(style);
      res.end();
    }
  }
});

server.listen(3000);
