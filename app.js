const http = require("http");
const getMethod = require("./components/getMethod");
const postMethod = require("./components/postMethod");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    getMethod(req, res);
  } else if (req.method === "POST") {
    postMethod(req, res);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
