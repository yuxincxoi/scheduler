const http = require("http");
const getMethod = require("./components/getMethod")

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    getMethod(req, res);
  }
});

server.listen(3000);