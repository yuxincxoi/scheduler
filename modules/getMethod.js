const readFile = require("./readFile");
const mimeType = require("./mimeType");
const errMsg = require("./errMsg");

const getMethod = (req, res) => {
  if (req.url === "/") {
    readFile("./public/index.html", mimeType.html, res);
  } else if (req.url === "/calendar.js") {
    readFile("./modules/calendar.js", mimeType.js, res);
  } else if (req.url === "/style.css") {
    readFile("./public/style.css", mimeType.css, res);
  } else if (req.url === "/modal.js") {
    readFile("./modules/modal.js", mimeType.js, res);
  } else if (req.url === "/removeDays.js") {
    readFile("./modules/removeDays.js", mimeType.js, res);
  } else if (req.url === "/paintDays.js") {
    readFile("./modules/paintDays.js", mimeType.js, res);
  } else if (req.url === "/getLastDay.js") {
    readFile("./modules/getLastDay.js", mimeType.js, res);
  } else if (req.url === "/openModal.js") {
    readFile("./modules/openModal.js", mimeType.js, res);
  } else if (req.url === "/closeModal.js") {
    readFile("./modules/closeModal.js", mimeType.js, res);
  } else if (req.url === "/minusMonth.js") {
    readFile("./modules/minusMonth.js", mimeType.js, res);
  } else if (req.url === "/plusMonth.js") {
    readFile("./modules/plusMonth.js", mimeType.js, res);
  } else if (req.url === "/nextMonth.png") {
    readFile("./static/img/nextMonth.png", mimeType.png, res);
  } else if (req.url === "/api/schedules") {
    const query = new URL(req.url, `http://${req.headers.host}`).searchParams;
    const date = query.get("date");
  } else {
    res.writeHead(404, { "Content-Type": mimeType.text });
    res.end(errMsg[404]);
  }
};

module.exports = getMethod;
