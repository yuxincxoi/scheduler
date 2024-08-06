const fs = require("fs");
const mimeType = require("./mimeType");
const errMsg = require("./errMsg");

const readFile = (path, contentType, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": mimeType.text });
      res.end(errMsg[500]);
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
};

module.exports = readFile;
