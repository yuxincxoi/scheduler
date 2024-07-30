const fs = require("fs");
const path = require("path");
const writeHtml = require("./writeHtml");

const postMethod = (req, res) => {
  if (req.url === "/submit") {
    let body = "";

    req.on("data", (data) => (body += data));

    req.on("end", () => {
      // * url body에 담긴 객체 parse하기
      const parsedData = new URLSearchParams(body);
      const title = parsedData.get("title");
      const time = parsedData.get("time");
      const place = parsedData.get("place");
      const memo = parsedData.get("memo");

      // * JSON 형식으로 담기 위한 변수
      const jsonData = {
        title: title,
        time: time,
        place: place,
        memo: memo,
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

          // * 비동기 작업이 완료된 후에 readJson 함수 호출
          const testData = await writeHtml();
          // fileData가 잘 들어왔는지 확인
          console.log(testData);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(jsonDataString);
        }
      );
    });
  }
};

module.exports = postMethod;
