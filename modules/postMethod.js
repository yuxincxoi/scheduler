const fs = require("fs");
const path = require("path");
const writeHtml = require("./writeHtml");
const errMsg = require("./errMsg");
const { createData, updateData, deleteData } = require("../db/crud");

const postMethod = (req, res) => {
  if (req.url === "/submit" && req.method === "POST") {
    let body = "";

    req.on("data", (data) => (body += data));

    req.on("end", () => {
      // * URL body에 담긴 객체 parse하기
      const parsedData = new URLSearchParams(body);
      const id = parsedData.get("id");
      const title = parsedData.get("title");
      const time = parsedData.get("time");
      const place = parsedData.get("place");
      const memo = parsedData.get("memo");

      const year = parsedData.get("year");
      const month = parsedData.get("month");
      const selectedDay = parsedData.get("day");

      const selectedDate = new Date(year, month - 1, selectedDay);

      // * JSON 형식으로 담기 위한 변수
      const jsonData = {
        title: title,
        time: time,
        place: place,
        memo: memo,
        date: selectedDate,
      };

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

          if (id === null) {
            await createData([
              jsonData.date,
              jsonData.title,
              jsonData.time,
              jsonData.place,
              jsonData.memo,
            ]);
          } else {
            await updateData(
              {
                title: jsonData.title,
                time: jsonData.time,
                place: jsonData.place,
                memo: jsonData.memo,
              },
              id
            );
          }

          const submitHTML = await writeHtml(jsonData.date);

          await fs.writeFileSync(`./public/submit.html`, submitHTML, "utf-8");
          await fs.readFile(
            path.join(__dirname, "../public/submit.html"),
            (err, data) => {
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
  } else if (req.url === "/delete" && req.method === "POST") {
    let body = "";

    req.on("data", (data) => (body += data));

    req.on("end", async () => {
      const parsedData = new URLSearchParams(body);
      const id = parsedData.get("id");

      await deleteData(id);

      // 삭제한 스케줄에 해당하는 데이터를 HTML에서 제거
      const indexData = fs.readFileSync("./public/index.html", "utf-8");
      const updatedIndexData = indexData.replace(
        new RegExp(`<div[^>]*>${id}[^<]*</div>`, "g"),
        ""
      );
      fs.writeFileSync("./public/index.html", updatedIndexData);
      console.log(`index.html에서 ID ${id}에 해당하는 스케줄을 삭제했습니다.`);
    });

    // 클라이언트에 응답
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("삭제 완료");
  }
};

module.exports = postMethod;
