const fs = require("fs");
const path = require("path");
const writeHtml = require("./writeHtml");
const errMsg = require("./errMsg");
const { createData, readData } = require("../db/crud");

const postMethod = (req, res) => {
  if (req.url === "/submit" && req.method === "POST") {
    let body = "";

    req.on("data", (data) => (body += data));

    req.on("end", () => {
      // * URL body에 담긴 객체 parse하기
      const parsedData = new URLSearchParams(body);
      const title = parsedData.get("title");
      const time = parsedData.get("time");
      const place = parsedData.get("place");
      const memo = parsedData.get("memo");
      console.log(parsedData);

      const year = "2024";
      const month = "8";
      const selectedDay = "2";

      const selectedDate = new Date(year, month - 1, selectedDay);

      // * JSON 형식으로 담기 위한 변수
      const jsonData = {
        title: title,
        time: time,
        place: place,
        memo: memo,
        date: selectedDate,
      };
      console.log(jsonData);

      // * JavaScript 객체를 JSON으로 변환시킨 변수
      const jsonDataString = JSON.stringify(jsonData, null, 2);

      // * 입력한 데이터를 JSON 형식의 파일로 생성
      fs.writeFile(
        path.join("./jsonData", `${title}.json`),
        jsonDataString,
        async (err) => {
          if (err) {
            console.error(err);
            return;
          }

          console.log("json 파일 생성");

          createData([
            jsonData.date,
            jsonData.title,
            jsonData.time,
            jsonData.place,
            jsonData.memo,
          ]);

          const submitHTML = await writeHtml();

          fs.writeFileSync(`./public/submit.html`, submitHTML, "utf-8");
          fs.readFile(
            path.join(__dirname, "../public/submit.html"),
            (err, data) => {
              console.log("read html file");
              if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end(errMsg[500]);
                return;
              }
              res.writeHead(200, { "Content-Type": "text/html;" });
              res.end(data);
            }
          );
        }
      );
    });
  }
};

module.exports = postMethod;
