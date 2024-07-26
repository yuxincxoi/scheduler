const fs = require("fs");

const makeHtml = (req, res) => {
  let fileData = [];
  fs.readdir("./jsonData", (err, dir) => {
    if (err) {
      console.error(err);
      return;
    }
    dir.forEach((value) => {
      fs.readFile(`./jsonData/${value}`, (err, data) => {
        if (err) {
          console.error(err);
        }
        // * 읽은 JSON 파일명을 fileData에 넣기
        fileData.push(`${value.replace(`.json`, "")}:${data}`);
      });
    });
  });
};

module.exports = makeHtml;
