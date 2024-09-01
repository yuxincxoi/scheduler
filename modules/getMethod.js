const readFile = require("./readFile");
const mimeType = require("./mimeType");
const errMsg = require("./errMsg");
const { readByDate } = require("../db/crud");

const getMethod = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (pathname === "/") {
    readFile("./public/index.html", mimeType.html, res);
  } else if (pathname === "/calendar.js") {
    readFile("./modules/calendar.js", mimeType.js, res);
  } else if (pathname === "/style.css") {
    readFile("./public/style.css", mimeType.css, res);
  } else if (pathname === "/modal.js") {
    readFile("./modules/modal.js", mimeType.js, res);
  } else if (pathname === "/removeDays.js") {
    readFile("./modules/removeDays.js", mimeType.js, res);
  } else if (pathname === "/paintDays.js") {
    readFile("./modules/paintDays.js", mimeType.js, res);
  } else if (pathname === "/getLastDay.js") {
    readFile("./modules/getLastDay.js", mimeType.js, res);
  } else if (pathname === "/openModal.js") {
    readFile("./modules/openModal.js", mimeType.js, res);
  } else if (pathname === "/closeModal.js") {
    readFile("./modules/closeModal.js", mimeType.js, res);
  } else if (pathname === "/minusMonth.js") {
    readFile("./modules/minusMonth.js", mimeType.js, res);
  } else if (pathname === "/plusMonth.js") {
    readFile("./modules/plusMonth.js", mimeType.js, res);
  } else if (pathname === "/nextMonth.png") {
    readFile("./static/img/nextMonth.png", mimeType.png, res);
  } else if (pathname === "/api/schedules") {
    const query = url.searchParams;
    const date = query.get("date");
    const newDate = new Date(date);

    if (!date) {
      res.writeHead(400, { "Content-Type": mimeType.json });
      res.end(JSON.stringify({ error: "Date query parameter is required" }));
      return;
    }

    try {
      const data = await readByDate(newDate);
      res.writeHead(200, { "Content-Type": mimeType.json });
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  } else {
    res.writeHead(404, { "Content-Type": mimeType.text });
    res.end(errMsg[404]);
  }
};

module.exports = getMethod;
