const readFile = require("./readFile");
const mimeType = require("./mimeType");
const errMsg = require("./errMsg");

const getMethod = (req, res) => {
  if (req.url === "/") {
    readFile("./pages/index.html", mimeType.html, res);
  } else if (req.url === "/calendar.js") {
    readFile("./components/calendar.js", mimeType.js, res);
  } else if (req.url === "/style.css") {
    readFile("./styles/style.css", mimeType.css, res);
  } else if (req.url === "/modal.js") {
    readFile("./components/modal.js", mimeType.js, res);
  } else if (req.url === "/removeDays.js") {
    readFile("./components/removeDays.js", mimeType.js, res);
  } else if (req.url === "/paintDays.js") {
    readFile("./components/paintDays.js", mimeType.js, res);
  } else if (req.url === "/getLastDay.js") {
    readFile("./components/getLastDay.js", mimeType.js, res);
  } else if (req.url === "/openModal.js") {
    readFile("./components/openModal.js", mimeType.js, res);
  } else if (req.url === "/closeModal.js") {
    readFile("./components/closeModal.js", mimeType.js, res);
  } else if (req.url === "/minusMonth.js") {
    readFile("./components/minusMonth.js", mimeType.js, res);
  } else if (req.url === "/plusMonth.js") {
    readFile("./components/plusMonth.js", mimeType.js, res);
  } else if (req.url === "/nextMonth.png") {
    readFile("./public/img/nextMonth.png", mimeType.png, res);
  } else {
    res.writeHead(404, { "Content-Type": mimeType.text });
    res.end(errMsg[404]);
  }
};

module.exports = getMethod;
