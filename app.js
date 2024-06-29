const http = require("http");
const getMethod = require("./components/getMethod")

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    getMethod(req, res);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});